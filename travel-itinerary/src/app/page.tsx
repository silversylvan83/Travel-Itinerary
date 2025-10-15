// src/app/page.tsx (Server Component)
import type { Metadata } from "next";
import LandingContent from "./components/LandingContent";

export const metadata: Metadata = {
  title: "GlobeTrail — AI Travel Itinerary Planner",
  description: "Plan unforgettable trips with AI. Colorful, fast, and delightful.",
};

export default function Page() {
  // Just render the client child that contains all interactivity
  return <LandingContent />;
}
