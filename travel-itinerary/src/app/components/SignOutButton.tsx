// src/app/components/SignOutButton.tsx
"use client";

import { useState } from "react";

export default function SignOutButton({
  redirectTo = "/login",
  label = "Sign out",
}: { redirectTo?: string; label?: string }) {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });
      // Even if JSON fails, we just navigate away
      if (!res.ok) {
        console.warn("logout non-200:", await res.text().catch(() => ""));
      }
    } catch (err) {
      console.warn("logout error:", err);
    } finally {
      // Send them to login; /planner will be blocked by middleware anyway
      window.location.href = redirectTo;
    }
  }

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2 text-sm hover:bg-neutral-200 disabled:opacity-60 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M4 12a8 8 0 0 1 8-8" fill="currentColor" />
          </svg>
          Signing out…
        </>
      ) : (
        label
      )}
    </button>
  );
}
