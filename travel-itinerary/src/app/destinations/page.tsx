// app/explore/page.tsx (or wherever this component lives)
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Destination = {
  name: string;
  image: string;
  description: string;
};

// --- NEW: auth/verification gate ---
function useVerifiedGate() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/me", { credentials: "include", cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        setVerified(j?.ok === true && !!j?.user?.isEmailVerified);
      })
      .catch(() => setVerified(false));
    return () => {
      alive = false;
    };
  }, []);

  return { verified, href: verified ? "/planner" : "/login?next=/planner" };
}

function PlannerLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const gate = useVerifiedGate();
  return (
    <Link href={gate.href} className={className}>
      {children}
    </Link>
  );
}
// --- /gate ---

const allDestinations: Destination[] = [
  // ... your destination list unchanged ...
];

export default function ExploreDestinations() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return allDestinations;
    return allDestinations.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.description.toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{ background: "var(--color-surface)" }}
      />

      <section id="destinations" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--color-foreground)" }}
            >
              Explore destinations
            </h2>
            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "color-mix(in oklab, var(--color-foreground) 75%, transparent)",
              }}
            >
              Search for places to add to your itinerary.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-80">
            <label className="sr-only" htmlFor="dest-search">
              Search destinations
            </label>
            <input
              id="dest-search"
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search (e.g., Taj Mahal, Kyoto, beaches)"
              className="w-full rounded-xl px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-indigo-400"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-foreground)",
                border: "1px solid var(--color-border)",
                // ensure placeholder visible in dark
                // Tailwind's placeholder: classes won't apply to inline styles
              }}
            />
            <style jsx global>{`
              input#dest-search::placeholder {
                color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
                opacity: 1;
              }
            `}</style>
            <p
              className="mt-1 text-xs"
              style={{
                color:
                  "color-mix(in oklab, var(--color-foreground) 60%, transparent)",
              }}
            >
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <article
              key={card.name}
              className="group overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-lg"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="relative">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {card.name}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{
                    color:
                      "color-mix(in oklab, var(--color-foreground) 75%, transparent)",
                  }}
                >
                  {card.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      color:
                        "color-mix(in oklab, var(--color-foreground) 65%, transparent)",
                    }}
                  >
                    Add to itinerary
                  </span>

                  {/* GATED: goes to /planner only if verified, else /login?next=/planner */}
                  <PlannerLink className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700">
                    Plan here
                  </PlannerLink>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div
              className="col-span-full rounded-2xl border p-6 text-center text-sm"
              style={{
                background:
                  "color-mix(in oklab, var(--color-surface) 92%, transparent)",
                borderColor: "var(--color-border)",
                color:
                  "color-mix(in oklab, var(--color-foreground) 75%, transparent)",
              }}
            >
              No destinations found. Try a different keyword (e.g., “temple”,
              “beach”, “sunset”).
            </div>
          )}
        </div>
      </section>
    </>
  );
}
