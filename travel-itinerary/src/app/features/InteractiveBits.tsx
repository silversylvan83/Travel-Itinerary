// app/features/InteractiveBits.tsx
"use client";
import { useState } from "react";

export default function InteractiveBits() {
  const [expanded, setExpanded] = useState(false);
  return (
    <button onClick={() => setExpanded((v) => !v)} className="text-sm underline">
      {expanded ? "Less" : "More"} details
    </button>
  );
}
