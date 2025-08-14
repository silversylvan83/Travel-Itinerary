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
    highlights: ["3 itineraries / month", "Basic cost estimates", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "Powerful planning for frequent travelers.",
    monthly: 1599, // ₹1599/month
    yearly: 15999, // ₹15999/year (discounted)
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
    monthly: 3999, // ₹3999/month
    yearly: 39999, // ₹39999/year (discounted)
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
    const savings = Math.round(((monthlyTotal - plan.yearly) / monthlyTotal) * 100);
    if (savings <= 0) return null;
    return (
      <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
        Save {savings}%
      </span>
    );
  };

  const tableRows = [
    { label: "Itineraries / month", free: "3", pro: "Unlimited", team: "Unlimited" },
    { label: "AI Models", free: "Flash", pro: "Flash + Pro", team: "Flash + Pro" },
    { label: "Exports", free: "JSON", pro: "JSON & PDF", team: "JSON, PDF & CSV" },
    { label: "Priority Support", free: "No", pro: "Yes", team: "Yes" },
    { label: "Team features", free: "No", pro: "No", team: "Yes" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-700">Pricing that fits your travel style</h1>
        <p className="mt-2 text-sm text-gray-700 max-w-2xl mx-auto dark:text-neutral-300">
          Start for free, upgrade for unlimited plans and team features. Transparent pricing — no surprise fees.
        </p>
      </header>

      {/* Billing toggle */}
      <div className="mx-auto mb-8 max-w-md rounded-full bg-white/80 p-1 shadow-sm dark:bg-neutral-900/60">
        <div className="flex items-center justify-between gap-3 px-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
              billing === "monthly" ? "bg-indigo-600 text-white shadow" : "text-gray-700 dark:text-neutral-300"
            }`}
            aria-pressed={billing === "monthly"}
          >
            Monthly
          </button>
          <div className="px-2 text-xs text-gray-500">or</div>
          <button
            onClick={() => setBilling("yearly")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
              billing === "yearly" ? "bg-indigo-600 text-white shadow" : "text-gray-700 dark:text-neutral-300"
            }`}
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
            className={`relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 ${
              p.mostPopular ? "ring-2 ring-indigo-100" : ""
            }`}
          >
            {/* {p.mostPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <div className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">Most popular</div>
              </div>
            )} */}

            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-indigo-700">{p.name}</h3>
              <p className="text-sm text-gray-600 dark:text-neutral-300">{p.blurb}</p>

              <div className="mt-3 flex items-baseline gap-3">
                <div className="text-2xl font-bold text-indigo-700">{formattedPrice(p)}</div>
                {billing === "yearly" && p.monthly > 0 && p.yearly > 0 && savingsBadge(p)}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-neutral-300">
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
                  className={`inline-block w-full rounded-xl px-4 py-2 text-center font-semibold ${
                    p.id === "free"
                      ? "bg-white border border-indigo-200 text-indigo-700"
                      : "bg-indigo-600 text-white shadow hover:bg-indigo-700"
                  }`}
                >
                  {p.id === "free" ? "Get started — free" : `Choose ${p.name}`}
                </Link>
              </div>

              <p className="mt-3 text-xs text-gray-500 dark:text-neutral-400">No credit card required for Starter.</p>
            </div>
          </article>
        ))}
      </section>

      {/* Comparison table */}
      <section className="mb-12 overflow-hidden rounded-2xl bg-white/80 p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="mb-4 text-lg font-semibold text-indigo-700">Compare features</h3>

        <div className="w-full overflow-auto">
          <table className="w-full min-w-[640px] table-auto text-sm">
            <thead>
              <tr>
                <th className="text-left pb-3 pr-4 text-xs font-semibold uppercase text-gray-500">Feature</th>
                <th className="text-left pb-3 pr-4 text-xs font-semibold uppercase text-gray-500">Starter</th>
                <th className="text-left pb-3 pr-4 text-xs font-semibold uppercase text-gray-500">Pro</th>
                <th className="text-left pb-3 pr-4 text-xs font-semibold uppercase text-gray-500">Team</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.label} className="border-t border-gray-100">
                  <td className="py-3 pr-4 text-gray-700 dark:text-neutral-300">{row.label}</td>
                  <td className="py-3 pr-4 text-gray-700 dark:text-neutral-300">{row.free}</td>
                  <td className="py-3 pr-4 text-gray-700 dark:text-neutral-300">{row.pro}</td>
                  <td className="py-3 pr-4 text-gray-700 dark:text-neutral-300">{row.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
