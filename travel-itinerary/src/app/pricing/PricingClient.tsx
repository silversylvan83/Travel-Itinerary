"use client";

import React, { useState } from "react";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  highlights: string[];
  mostPopular?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Starter",
    blurb: "Try GlobeTrail — generate basic itineraries.",
    monthly: 0,
    yearly: 0,
    highlights: [
      "3 itineraries / month",
      "Basic cost estimates",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "Powerful planning for frequent travelers.",
    monthly: 1599,
    yearly: 15999,
    highlights: [
      "Unlimited itineraries",
      "Per-day cost breakdown",
      "Priority email support",
      "Export JSON & PDF",
    ],
    mostPopular: true,
  },
  {
    id: "team",
    name: "Team",
    blurb: "Collaboration tools for small teams and families.",
    monthly: 3999,
    yearly: 39999,
    highlights: [
      "Multi-user access",
      "Shareable plans",
      "Team billing",
      "SAML/SSO (coming soon)",
    ],
  },
];

export default function PricingClient() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const formattedPrice = (plan: Plan) =>
    billing === "monthly"
      ? plan.monthly === 0
        ? "Free"
        : `₹${plan.monthly.toLocaleString("en-IN")}/mo`
      : plan.yearly === 0
      ? "Free"
      : `₹${plan.yearly.toLocaleString("en-IN")}/yr`;

  const savingsBadge = (plan: Plan) => {
    if (plan.monthly === 0 || plan.yearly === 0) return null;
    const monthlyTotal = plan.monthly * 12;
    const savings = Math.round(
      ((monthlyTotal - plan.yearly) / monthlyTotal) * 100
    );
    if (savings <= 0) return null;
    return (
      <span
        className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold"
        style={{
          background:
            "color-mix(in oklab, var(--color-foreground) 10%, transparent)",
          color: "var(--color-foreground)",
        }}
      >
        Save {savings}%
      </span>
    );
  };

  const tableRows = [
    {
      label: "Itineraries / month",
      free: "3",
      pro: "Unlimited",
      team: "Unlimited",
    },
    {
      label: "AI Models",
      free: "Flash",
      pro: "Flash + Pro",
      team: "Flash + Pro",
    },
    {
      label: "Exports",
      free: "JSON",
      pro: "JSON & PDF",
      team: "JSON, PDF & CSV",
    },
    { label: "Priority Support", free: "No", pro: "Yes", team: "Yes" },
    { label: "Team features", free: "No", pro: "No", team: "Yes" },
  ];

  return (
    <>
      {/* Solid themed background to override layout gradient, if any */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{ background: "var(--color-surface)" }}
      />

      <section
        className="mx-auto max-w-7xl px-4 md:px-8 py-8"
        style={{ color: "var(--color-foreground)" }}
      >
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">
            Pricing that fits your travel style
          </h1>
          <p
            className="mt-2 text-sm mx-auto max-w-2xl"
            style={{
              color:
                "color-mix(in oklab, var(--color-foreground) 80%, transparent)",
            }}
          >
            Start for free, upgrade for unlimited plans and team features.
            Transparent pricing — no surprise fees.
          </p>
        </header>

        {/* Billing toggle */}
        <div
          className="mx-auto mb-8 max-w-md rounded-full p-1 shadow-sm"
          style={{
            background:
              "color-mix(in oklab, var(--color-surface) 92%, transparent)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between gap-3 px-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition`}
              style={{
                background:
                  billing === "monthly" ? "rgb(79 70 229)" : "transparent",
                color:
                  billing === "monthly" ? "#fff" : "var(--color-foreground)",
                boxShadow:
                  billing === "monthly" ? "0 1px 2px rgba(0,0,0,.15)" : "none",
              }}
              aria-pressed={billing === "monthly"}
            >
              Monthly
            </button>
            <div
              className="px-2 text-xs"
              style={{
                color:
                  "color-mix(in oklab, var(--color-foreground) 60%, transparent)",
              }}
            >
              or
            </div>
            <button
              onClick={() => setBilling("yearly")}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition`}
              style={{
                background:
                  billing === "yearly" ? "rgb(79 70 229)" : "transparent",
                color:
                  billing === "yearly" ? "#fff" : "var(--color-foreground)",
                boxShadow:
                  billing === "yearly" ? "0 1px 2px rgba(0,0,0,.15)" : "none",
              }}
              aria-pressed={billing === "yearly"}
            >
              Yearly (save)
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <section className="mb-12 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {PLANS.map((p) => (
            <article
              key={p.id}
              className="relative overflow-hidden rounded-3xl p-6 shadow-sm transition hover:shadow-lg"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                // outline: p.mostPopular ? "2px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)" : "none",
                // outlineOffset: p.mostPopular ? "2px" : "0",
              }}
            >
              <div className="mt-4 space-y-3">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {p.name}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color:
                      "color-mix(in oklab, var(--color-foreground) 78%, transparent)",
                  }}
                >
                  {p.blurb}
                </p>

                <div className="mt-3 flex items-baseline gap-3">
                  <div className="text-2xl font-bold text-indigo-700">
                    {formattedPrice(p)}
                  </div>
                  {billing === "yearly" &&
                    p.monthly > 0 &&
                    p.yearly > 0 &&
                    savingsBadge(p)}
                </div>

                <ul
                  className="mt-4 space-y-2 text-sm"
                  style={{
                    color:
                      "color-mix(in oklab, var(--color-foreground) 85%, transparent)",
                  }}
                >
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href={`/signup?plan=${p.id}&billing=${billing}`}
                    className="inline-block w-full rounded-xl px-4 py-2 text-center font-semibold"
                    style={
                      p.id === "free"
                        ? {
                            background: "var(--color-surface)",
                            color: "rgb(79 70 229)",
                            border:
                              "1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent)",
                          }
                        : {
                            background: "rgb(79 70 229)",
                            color: "#fff",
                            boxShadow: "0 2px 10px rgba(0,0,0,.15)",
                          }
                    }
                  >
                    {p.id === "free"
                      ? "Get started — free"
                      : `Choose ${p.name}`}
                  </Link>
                </div>

                <p
                  className="mt-3 text-xs"
                  style={{
                    color:
                      "color-mix(in oklab, var(--color-foreground) 65%, transparent)",
                  }}
                >
                  No credit card required for Starter.
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Comparison table */}
        <section
          className="mb-12 overflow-hidden rounded-2xl p-6 shadow-sm"
          style={{
            background:
              "color-mix(in oklab, var(--color-surface) 95%, transparent)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 className="mb-4 text-lg font-semibold text-indigo-700">
            Compare features
          </h3>

          <div className="w-full overflow-auto">
            <table className="w-full min-w-[640px] table-auto text-sm">
              <thead>
                <tr>
                  {["Feature", "Starter", "Pro", "Team"].map((h) => (
                    <th
                      key={h}
                      className="text-left pb-3 pr-4 text-xs font-semibold uppercase"
                      style={{
                        color:
                          "color-mix(in oklab, var(--color-foreground) 60%, transparent)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.label}
                    style={{ borderTop: "1px solid var(--color-border)" }}
                  >
                    <td
                      className="py-3 pr-4"
                      style={{
                        color:
                          "color-mix(in oklab, var(--color-foreground) 85%, transparent)",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      className="py-3 pr-4"
                      style={{
                        color:
                          "color-mix(in oklab, var(--color-foreground) 85%, transparent)",
                      }}
                    >
                      {row.free}
                    </td>
                    <td
                      className="py-3 pr-4"
                      style={{
                        color:
                          "color-mix(in oklab, var(--color-foreground) 85%, transparent)",
                      }}
                    >
                      {row.pro}
                    </td>
                    <td
                      className="py-3 pr-4"
                      style={{
                        color:
                          "color-mix(in oklab, var(--color-foreground) 85%, transparent)",
                      }}
                    >
                      {row.team}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
}
