"use client";

import React, { useMemo, useState } from "react";
import Lottie from "lottie-react";
import ladyAnimation from "../assets/lottie/Lady.json";
import jsPDF from "jspdf";

type Activity = { time?: string; title: string; notes?: string; cost?: number };
type Day = { date: string; destination?: string; activities: Activity[] };
type Itinerary = {
  title: string;
  currency?: string;
  days: Day[];
  tips?: string[];
  summary?: string;
  totalEstimatedCost?: number;
};

interface ItineraryFormData {
  title: string;
  startDate: string;
  endDate: string;
  destinations: string[];
  dailyBudget?: number;
  currency?: string;
}

interface ModelDay {
  date?: string;
  destination?: string;
  morning?: string;
  afternoon?: string;
  evening?: string;
  estCost?: number;
  notes?: string;
}

interface ModelItinerary {
  title?: string;
  summary?: string;
  currency?: string;
  totalEstimatedCost?: number;
  tips?: string[];
  days?: ModelDay[];
}

async function createItinerary(
  formData: ItineraryFormData
): Promise<Itinerary> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch("/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        throw new Error(
          json?.error ||
            JSON.stringify(json) ||
            `Request failed with ${res.status}`
        );
      } catch {
        throw new Error(text || `Request failed with ${res.status}`);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = (await res.json()) as any;
    if (raw == null) throw new Error("Empty response from server.");
    if (raw.error) throw new Error(raw.error);

    const modelItin: ModelItinerary | undefined =
      "itinerary" in raw
        ? (raw.itinerary as ModelItinerary)
        : (raw as ModelItinerary);

    if (!modelItin) throw new Error("Invalid itinerary response from server.");

    return mapModelItineraryToItinerary(modelItin, formData);
  } finally {
    clearTimeout(timeout);
  }
}

function mapModelItineraryToItinerary(
  model: ModelItinerary,
  formData: ItineraryFormData
): Itinerary {
  const days: Day[] = (model.days ?? []).map((d) => {
    const activities: Activity[] = [];
    if (d.morning)
      activities.push({
        time: "Morning",
        title: d.morning,
        notes: d.notes,
        cost: typeof d.estCost === "number" ? d.estCost : undefined,
      });
    if (d.afternoon)
      activities.push({
        time: "Afternoon",
        title: d.afternoon,
        notes: d.notes,
      });
    if (d.evening)
      activities.push({ time: "Evening", title: d.evening, notes: d.notes });
    return { date: d.date ?? "", destination: d.destination, activities };
  });

  return {
    title: model.title ?? formData.title,
    currency: model.currency ?? formData.currency ?? "INR",
    days,
    tips: model.tips ?? [],
    summary: model.summary,
    totalEstimatedCost:
      typeof model.totalEstimatedCost === "number"
        ? model.totalEstimatedCost
        : undefined,
  };
}

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destinations, setDestinations] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [dailyBudget, setDailyBudget] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string>("");

  // PDF
  const downloadPdf = (itin: Itinerary | null) => {
    if (!itin) return;

    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    let y = margin;

    const addPageIfNeeded = (extraHeight: number) => {
      if (y + extraHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
    };

    // Title
    pdf.setFontSize(20);
    pdf.text(itin.title || "Itinerary", pageWidth / 2, y, { align: "center" });
    y += 30;

    // Summary
    if (itin.summary) {
      pdf.setFontSize(12);
      pdf.text("Summary:", margin, y);
      y += 15;

      const summaryLines = pdf.splitTextToSize(
        itin.summary,
        pageWidth - 2 * margin
      );
      addPageIfNeeded(summaryLines.length * 15);
      pdf.text(summaryLines, margin, y);
      y += summaryLines.length * 15 + 10;
    }

    // Days
    if (Array.isArray(itin.days) && itin.days.length) {
      itin.days.forEach((day, index) => {
        // Day header: Day X - date - destination
        const dateLabel = day.date
          ? new Date(day.date).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })
          : "";

        const header = `Day ${index + 1}${dateLabel ? ` - ${dateLabel}` : ""}${
          day.destination ? ` - ${day.destination}` : ""
        }`;

        pdf.setFontSize(14);
        addPageIfNeeded(25);
        pdf.text(header, margin, y);
        y += 20;

        // Activities
        day.activities.forEach((activity) => {
          pdf.setFontSize(12);

          const costText =
            typeof activity.cost === "number"
              ? ` (${itin.currency || "INR"} ${activity.cost})`
              : "";

          const mainLine = `• ${activity.time ? `${activity.time}: ` : ""}${
            activity.title
          }${costText}`;

          const mainLines = pdf.splitTextToSize(
            mainLine,
            pageWidth - 2 * margin
          );
          addPageIfNeeded(mainLines.length * 15);
          pdf.text(mainLines, margin, y);
          y += mainLines.length * 15;

          if (activity.notes) {
            const noteLines = pdf.splitTextToSize(
              `   ${activity.notes}`,
              pageWidth - 2 * margin
            );
            addPageIfNeeded(noteLines.length * 15);
            pdf.text(noteLines, margin, y);
            y += noteLines.length * 15;
          }

          y += 5; // small spacing between activities
        });

        y += 10; // spacing between days
      });
    }

    // Tips
    if (itin.tips && itin.tips.length) {
      pdf.setFontSize(14);
      addPageIfNeeded(25);
      pdf.text("Tips:", margin, y);
      y += 20;

      itin.tips.forEach((tip) => {
        const lines = pdf.splitTextToSize(`• ${tip}`, pageWidth - 2 * margin);
        addPageIfNeeded(lines.length * 15);
        pdf.text(lines, margin + 10, y);
        y += lines.length * 15;
      });

      y += 10;
    }

    // Total Estimated Cost
    const summedCost =
      itin.days?.reduce(
        (sum, d) =>
          sum +
          d.activities.reduce(
            (s, a) => s + (typeof a.cost === "number" ? a.cost : 0),
            0
          ),
        0
      ) ?? 0;

    const displayedTotal = itin.totalEstimatedCost ?? summedCost;

    if (displayedTotal > 0) {
      addPageIfNeeded(25);
      pdf.setFontSize(14);
      pdf.text(
        `Total Estimated Cost: ${itin.currency || "INR"} ${displayedTotal}`,
        margin,
        y
      );
    }

    pdf.save(
      `${(itin.title || "itinerary").toLowerCase().replace(/\s+/g, "-")}.pdf`
    );
  };

  const handleDownloadPdf = () => downloadPdf(itinerary);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setItinerary(null);

    if (!title.trim()) return setError("Please enter a title.");
    if (!startDate || !endDate)
      return setError("Please provide both start and end dates.");
    if (new Date(startDate) > new Date(endDate))
      return setError("Start date cannot be after end date.");

    const dests = destinations
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (dests.length === 0)
      return setError("Please add at least one destination.");

    const payload: ItineraryFormData = {
      title: title.trim(),
      startDate,
      endDate,
      destinations: dests,
      dailyBudget: typeof dailyBudget === "number" ? dailyBudget : undefined,
      currency: currency?.trim() || "INR",
    };

    setLoading(true);
    try {
      const data = await createItinerary(payload);
      setItinerary(data);
      setTimeout(() => {
        const el = document.getElementById("itinerary-result");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to create itinerary"
      );
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setTitle("My Trip");
    setStartDate("");
    setEndDate("");
    setDestinations("Udaipur");
    setCurrency("INR");
    setDailyBudget(undefined);
    setItinerary(null);
    setError("");
    setLoading(false);
    const el = document.querySelector("aside");
    if (el)
      (el as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  const computedTotalCost = useMemo(() => {
    if (!itinerary?.days?.length) return 0;
    return itinerary.days.reduce(
      (sum, d) =>
        sum +
        d.activities.reduce(
          (s, a) => s + (typeof a.cost === "number" ? a.cost : 0),
          0
        ),
      0
    );
  }, [itinerary]);

  const displayedTotal = itinerary?.totalEstimatedCost ?? computedTotalCost;

  const inrFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    []
  );

  const formattedTotal = useMemo(() => {
    try {
      return inrFormatter.format(displayedTotal);
    } catch {
      return `₹${displayedTotal.toFixed(0)}`;
    }
  }, [displayedTotal, inrFormatter]);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-fuchsia-100 via-white to-indigo-50 dark:from-violet-950 dark:via-neutral-950 dark:to-indigo-950 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form card */}
          <aside className="col-span-1 rounded-3xl p-6 shadow-md bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100 dark:border dark:border-neutral-800">
            <h2 className="text-lg font-semibold">Create your itinerary</h2>
            <p className="mt-1 text-sm text-gray-700 dark:text-neutral-400">
              Enter basics and get a day-by-day plan.
            </p>

            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white [color-scheme:light]"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white [color-scheme:light]"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                placeholder="Destinations (comma-separated)"
                value={destinations}
                onChange={(e) => setDestinations(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  placeholder="Currency (kept but displays in INR)"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <input
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  type="number"
                  placeholder="Daily budget (optional)"
                  value={dailyBudget ?? ""}
                  onChange={(e) =>
                    setDailyBudget(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Itinerary"}
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  Reset
                </button>
              </div>

              {error && (
                <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-700">
                  {error}
                </div>
              )}
            </form>
          </aside>

          {/* Result area */}
          <main id="itinerary-result" className="col-span-1 lg:col-span-2">
            {!itinerary && (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow dark:bg-neutral-900 dark:border-neutral-800">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-neutral-100">
                  Your itinerary will appear here
                </h3>
                <p className="mb-4 text-sm text-gray-700 dark:text-neutral-400">
                  Generate to preview a polished day-by-day plan.
                </p>
                <div className="mx-auto h-72 w-72 opacity-90">
                  <Lottie animationData={ladyAnimation} loop />
                </div>
              </div>
            )}

            {itinerary && (
              <article className="space-y-6">
                {/* Header card */}
                <div className="rounded-3xl bg-white p-6 shadow dark:bg-neutral-900 dark:border dark:border-neutral-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                        {itinerary.title}
                      </h2>
                      {itinerary.summary && (
                        <p className="mt-2 max-w-prose text-sm text-gray-700 dark:text-neutral-400">
                          {itinerary.summary}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                          INR
                        </div>
                        {displayedTotal > 0 && (
                          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-green-700">
                            Est. total: <strong>{formattedTotal}</strong>
                          </div>
                        )}
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                          {itinerary.days.length} days
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <button
                        onClick={handleDownloadPdf}
                        className="inline-flex items-center gap-2 rounded-xl border border-indigo-300 bg-white px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>

                {/* Days timeline */}
                <div className="space-y-4">
                  {itinerary.days.map((day, i) => (
                    <div
                      key={day.date + i}
                      className="rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border dark:border-neutral-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-indigo-50 px-3 py-2 text-indigo-700">
                            <div className="text-sm font-semibold">
                              {day.date
                                ? new Date(day.date).toLocaleDateString(
                                    undefined,
                                    {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : "Date"}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-neutral-100">
                              {day.destination || "Destination"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-neutral-400">
                              Day {i + 1}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-700 dark:text-neutral-400">
                          {formatDayCostINR(day)}
                        </div>
                      </div>

                      <ul className="mt-4 space-y-3">
                        {day.activities.map((a, idx) => (
                          <li key={idx} className="flex gap-3">
                            <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {a.time && (
                                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                                    {a.time}
                                  </span>
                                )}
                                <div className="font-medium text-gray-900 dark:text-neutral-100">
                                  {a.title}
                                </div>
                                {typeof a.cost === "number" && (
                                  <div className="ml-auto text-xs text-gray-700 dark:text-neutral-400">
                                    {inrFormatter.format(a.cost)}
                                  </div>
                                )}
                              </div>
                              {a.notes && (
                                <p className="mt-1 text-sm text-gray-700 dark:text-neutral-300">
                                  {a.notes}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                {itinerary.tips && itinerary.tips.length > 0 && (
                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-900 dark:border dark:border-neutral-800">
                    <h4 className="mb-2 text-base font-semibold text-gray-900 dark:text-neutral-100">
                      Tips
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-neutral-300">
                      {itinerary.tips.map((tip, j) => (
                        <li key={j}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            )}
          </main>
        </div>
      </div>
    </main>
  );
}

/* ---------- helpers ---------- */
function formatDayCostINR(day: Day) {
  const total = day.activities.reduce(
    (s, a) => s + (typeof a.cost === "number" ? a.cost : 0),
    0
  );
  if (total === 0) return "";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(total);
  } catch {
    return `₹${total.toFixed(0)}`;
  }
}
