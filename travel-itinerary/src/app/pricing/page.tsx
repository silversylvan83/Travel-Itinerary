// app/pricing/page.tsx
import PricingClient from "./PricingClient";

export const data = {
  title: "GlobeTrail — Pricing",
  description: "Simple, transparent pricing for GlobeTrail — pay monthly or save yearly.",
};

export default function PricingPage() {
  return <PricingClient />;
}
