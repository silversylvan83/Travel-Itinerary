"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/app/favicon.ico";

const navLink = "opacity-80 hover:opacity-100 text-sm";
const ctaBtn =
  "rounded-xl bg-indigo-500 px-3 py-2 text-white shadow-sm hover:bg-indigo-600";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <main className="w-full bg-gradient-to-b from-fuchsia-100 via-white to-indigo-50 dark:from-violet-950 dark:via-neutral-950 dark:to-indigo-950">
      {/* Top ribbon (solid indigo) */}
      <div className="bg-indigo-500 text-white">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium md:px-8">
          ✨ New: AI Itinerary suggestions + colorful gallery
        </div>
      </div>

      {/* Navbar (no extra bg so the global gradient shows “below”) */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="GlobeTrail" className="h-6 w-6" />
          <Link href="/" className="text-base font-bold tracking-tight">
            GlobeTrail
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            className={`${navLink} ${
              isActive("/#features") ? "font-semibold" : ""
            }`}
            href="/#features"
          >
            Features
          </Link>
          <Link
            className={`${navLink} ${
              isActive("/#destinations") ? "font-semibold" : ""
            }`}
            href="/#destinations"
          >
            Destinations
          </Link>
          <Link
            className={`${navLink} ${
              isActive("/#how-it-works") ? "font-semibold" : ""
            }`}
            href="/#how-it-works"
          >
            How it works
          </Link>
          <Link
            className={`${navLink} ${
              isActive("/#pricing") ? "font-semibold" : ""
            }`}
            href="/#pricing"
          >
            Pricing
          </Link>

          <Link href="/" className={ctaBtn}>
            Open Planner
          </Link>
        </div>
      </nav>
    </main>
  );
}
