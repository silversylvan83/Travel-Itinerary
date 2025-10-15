// src/app/components/NavBar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../favicon.ico";

type MeResponse =
  | { ok: true; user: { _id: string; email: string; userName?: string } }
  | { ok: false };

export default function NavBar() {
  const [me, setMe] = useState<MeResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/me", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled) setMe(j);
      })
      .catch(() => {
        if (!cancelled) setMe({ ok: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const signedIn = me && "ok" in me && me.ok === true;

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--color-surface)",
        color: "var(--color-foreground)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="logo" className="h-7 w-7 cursor-pointer" />
            <div>
              <div className="text-base font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                GlobeTrail
              </div>
              <div className="text-xs text-gray-500 dark:text-neutral-400">
                AI Itineraries
              </div>
            </div>
          </Link>
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

          {signedIn ? (
            <>
              <Link
                href="/planner"
                className="rounded-xl bg-indigo-500 px-3 py-2 text-white shadow-sm hover:bg-indigo-600"
              >
                Open Planner
              </Link>
              <Link
                href="/profile"
                className="rounded-xl border px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5"
                style={{ borderColor: "var(--color-border)" }}
              >
                Profile
              </Link>
            </>
          ) : (
            <Link
              href="/login?next=/planner"
              className="rounded-xl bg-indigo-500 px-3 py-2 text-white shadow-sm hover:bg-indigo-600"
            >
              Sign in
            </Link>
          )}
        </div>

        <div className="md:hidden">
          {signedIn ? (
            <Link
              href="/profile"
              className="rounded-lg px-3 py-2 text-sm"
              style={{ border: "1px solid var(--color-border)" }}
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login?next=/planner"
              className="rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white shadow hover:bg-indigo-600"
            >
              Planner
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
