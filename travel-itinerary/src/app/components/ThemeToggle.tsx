"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "globetrail-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Initial theme load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");
        return;
      }
      const prefersDark =
        typeof window !== "undefined" &&
        !!window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const next: "light" | "dark" = prefersDark ? "dark" : "light";
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    } catch {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // React to OS theme changes when user hasn't explicitly chosen
  useEffect(() => {
    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    if (!mq) return;

    const handler = (ev: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          const next: "light" | "dark" = ev.matches ? "dark" : "light";
          setTheme(next);
          document.documentElement.classList.toggle("dark", next === "dark");
        }
      } catch {
        // ignore
      }
    };

    // No side-effect ternaries; support legacy addListener/removeListener
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else if ((mq as unknown as { addListener?: (fn: (e: MediaQueryListEvent) => void) => void }).addListener) {
      (mq as unknown as { addListener: (fn: (e: MediaQueryListEvent) => void) => void }).addListener(handler);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else if ((mq as unknown as { removeListener?: (fn: (e: MediaQueryListEvent) => void) => void }).removeListener) {
        (mq as unknown as { removeListener: (fn: (e: MediaQueryListEvent) => void) => void }).removeListener(handler);
      }
    };
  }, []);

  function toggle() {
    try {
      const next: "light" | "dark" = theme === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    } catch {
      const next: "light" | "dark" = theme === "dark" ? "light" : "dark";
      setTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  }

  if (theme === null) return null;

  const ariaLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={toggle}
      className="
        fixed right-4 bottom-6 z-50 flex h-12 w-12 items-center justify-center
        rounded-full border bg-white shadow-lg transition hover:scale-105
        dark:bg-neutral-800 dark:border-neutral-700
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300
      "
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
          <path
            strokeWidth="1.5"
            d="M12 2v2M12 20v2M4.93 4.93l1.414 1.414M17.657 17.657l1.414 1.414M2 12h2M20 12h2M4.93 19.07l1.414-1.414M17.657 6.343l1.414-1.414"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="1.5" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}
