import type { Metadata } from "next";
import PlannerLink from "../components/PlannerLink";

export const metadata: Metadata = {
  title: "Features — GlobeTrail",
  description:
    "Discover GlobeTrail's features: AI-powered itineraries, cost estimates, sharing, team tools and more.",
};

const FEATURES = [
  { title: "AI-Powered Itineraries", lead: "Personalized day-by-day plans in seconds.", detail: "Tell GlobeTrail where you're going and what you like — get a polished schedule (sightseeing, dining, transit) tailored to your pace.", icon: "🧠" },
  { title: "Smart Budgeting", lead: "Daily & trip cost estimates.", detail: "Set a budget and GlobeTrail suggests activities and accommodations that fit. See per-day cost breakdowns and totals in INR.", icon: "💰" },
  { title: "Beautiful & Shareable Plans", lead: "Download JSON/PDF or share a link.", detail: "Handsomely formatted itineraries you can export and send to travel companions or keep for offline use.", icon: "📤" },
  { title: "Interactive Editing", lead: "Add, move, or remove activities with ease.", detail: "Tweak times, notes, costs — the itinerary updates instantly so your plan stays realistic and flexible.", icon: "✏️" },
  { title: "Multi-Device Access", lead: "Plan on desktop, view on mobile.", detail: "Your trips sync across devices so you can check plans while out and about.", icon: "📱" },
  { title: "Team & Family Sharing", lead: "Collaborative planning for groups.", detail: "Invite others to view or edit. Manage approvals, split costs, and keep everyone on the same page.", icon: "👥" },
];

export default function FeaturesPage() {
  return (
    <main
      className="min-h-dvh py-16 bg-gradient-to-b from-fuchsia-100 via-white to-indigo-50 dark:from-violet-950 dark:via-neutral-950 dark:to-indigo-950"
      // style={{ background: "var(--color-surface)", color: "var(--color-foreground)" }}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">Why choose GlobeTrail?</h1>
          <p
            className="mx-auto mt-2 max-w-2xl text-sm"
            style={{ color: "color-mix(in oklab, var(--color-foreground) 80%, transparent)" }}
          >
            GlobeTrail helps you plan memorable trips quickly — smart suggestions, cost-aware planning, and beautiful
            outputs that are easy to share.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg"
              style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-amber-50 text-2xl">
                  <span aria-hidden>{f.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-indigo-700">{f.title}</h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "color-mix(in oklab, var(--color-foreground) 85%, transparent)" }}
                  >
                    {f.lead}
                  </p>
                </div>
              </div>
              <p
                className="mt-4 text-sm"
                style={{ color: "color-mix(in oklab, var(--color-foreground) 75%, transparent)" }}
              >
                {f.detail}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div
                  className="text-xs"
                  style={{ color: "color-mix(in oklab, var(--color-foreground) 60%, transparent)" }}
                >
                  Trusted by travelers — intuitive & fast
                </div>
                {/* 🔒 GATED link */}
                <PlannerLink className="rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-indigo-700">
                  Try it
                </PlannerLink>
              </div>
            </article>
          ))}
        </section>

        <section
          className="mt-12 rounded-2xl p-6 shadow-sm ring-1"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--color-surface) 95%, transparent), color-mix(in oklab, var(--bg-end) 35%, var(--color-surface)))",
            borderColor: "var(--color-border)",
            boxShadow: "0 0 0 1px color-mix(in oklab, var(--color-border) 70%, transparent)",
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-indigo-700">Designed for real travelers</h3>
              <p
                className="mt-2 max-w-prose text-sm"
                style={{ color: "color-mix(in oklab, var(--color-foreground) 80%, transparent)" }}
              >
                We balance planning and spontaneity — reliable schedules that still leave room for discovery.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 md:auto-cols-min md:grid-flow-col">
              {[{ h: "Offline Ready", s: "Download itineraries" }, { h: "Local Tips", s: "Hidden gems & food spots" }, { h: "Secure", s: "Privacy & safe sharing" }].map(
                (b) => (
                  <div
                    key={b.h}
                    className="rounded-lg p-3 text-center shadow-sm"
                    style={{ background: "color-mix(in oklab, var(--color-surface) 92%, transparent)" }}
                  >
                    <div className="text-lg font-semibold text-[--color-foreground]">{b.h}</div>
                    <div
                      className="mt-1 text-xs"
                      style={{ color: "color-mix(in oklab, var(--color-foreground) 65%, transparent)" }}
                    >
                      {b.s}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-xl font-semibold text-indigo-700">Frequently asked questions</h3>
          <div className="mt-4 space-y-4">
            {[
              { q: "How does the AI personalize my plan?", a: "We ask for dates, destinations, travel style, and budget — then generate an itinerary that balances must-see sites with local experiences." },
              { q: "Can I edit the itinerary?", a: "Yes — you can add, remove, or reorder activities. Exports (JSON/PDF) update to reflect edits." },
              { q: "Is there a free tier?", a: "Yes — the Starter plan allows a few free itineraries so you can try the product before upgrading." },
            ].map((item) => (
              <details key={item.q} className="rounded-lg p-4 shadow-sm" style={{ background: "var(--color-surface)" }}>
                <summary className="cursor-pointer text-sm font-medium text-[--color-foreground]">{item.q}</summary>
                <div className="mt-2 text-sm" style={{ color: "color-mix(in oklab, var(--color-foreground) 80%, transparent)" }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 rounded-2xl bg-indigo-600 px-6 py-5 text-white shadow-lg">
            <div className="text-left">
              <div className="text-lg font-semibold">Ready to plan your next trip?</div>
              <div className="text-sm opacity-90">Generate a personalized itinerary in seconds.</div>
            </div>
            {/* 🔒 GATED CTA */}
            <PlannerLink className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700">
              Open Planner
            </PlannerLink>
          </div>
        </section>
      </div>
    </main>
  );
}
