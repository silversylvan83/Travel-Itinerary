"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  // Optional: what to do while we’re still checking
  pendingHref?: string; // defaults to /login?next=/planner
};

export default function PlannerLink({ children, className = "", pendingHref }: Props) {
  const [href, setHref] = useState<string>(pendingHref || "/login?next=/planner");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("/api/me", { credentials: "include", cache: "no-store" });
        const j = await r.json();
        const verified = j?.ok === true && !!j?.user?.isEmailVerified;
        if (alive) setHref(verified ? "/planner" : "/login?next=/planner");
      } catch {
        if (alive) setHref("/login?next=/planner");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
