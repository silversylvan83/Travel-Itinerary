// app/pricing/page.tsx
import PricingClient from "./PricingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobeTrail — Pricing",
  description: "Simple, transparent pricing for GlobeTrail — pay monthly or save yearly.",
};

export default function PricingPage() {
  return <PricingClient />;
}
