// components/NavBar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../favicon.ico";

export default function NavBar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <div className="">
          <Link href="/">
            <Image src={logo} alt="logo" className="cursor-pointer" />
          </Link>
        </div>
        <div>
          <Link href="/">
            <div className="text-base font-bold tracking-tight text-indigo-700">
              GlobeTrail
            </div>
            <div className="text-xs text-gray-500 dark:text-neutral-400">
              AI Itineraries
            </div>
          </Link>
        </div>
      </div>

      <div className="hidden items-center gap-6 text-sm md:flex">
        <Link className="opacity-80 hover:opacity-100" href="/features">
          Features
        </Link>
        <Link className="opacity-80 hover:opacity-100" href="/destinations">
          Destinations
        </Link>
        <Link className="opacity-80 hover:opacity-100" href="/contact">
          Contact
        </Link>
        <Link className="opacity-80 hover:opacity-100" href="/pricing">
          Pricing
        </Link>
        <Link
          href="/planner"
          className="rounded-xl bg-indigo-500 px-3 py-2 text-white shadow-sm hover:bg-indigo-600"
        >
          Open Planner
        </Link>
      </div>

      {/* mobile placeholder */}
      <div className="md:hidden">
        <Link
          href="/planner"
          className="rounded-lg bg-white/90 px-3 py-2 text-sm shadow"
        >
          Planner
        </Link>
      </div>
    </nav>
  );
}
