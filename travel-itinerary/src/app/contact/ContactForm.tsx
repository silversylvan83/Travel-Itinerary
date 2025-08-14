/* eslint-disable react/no-unescaped-entities */
// app/contact/ContactForm.tsx
"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return "Please enter a valid email address.";
    if (!form.subject.trim()) return "Please add a subject.";
    if (!form.message.trim() || form.message.trim().length < 10)
      return "Please write a message (10+ characters).";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(
          (json && json.error) || `Request failed (${res.status})`
        );
      }

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      {/* heading */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-indigo-700">
            Send us a message
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300">
            Tell us how we can help — travel tips, feedback, or partnerships.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-neutral-400">
          Response time: <strong>1–2 business days</strong>
        </div>
      </div>

      {/* success / error overlays */}
      {sent && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2 text-green-700">
              ✓
            </div>
            <div>
              <div className="font-semibold">Message sent</div>
              <div className="text-xs text-green-700">
                Thanks — we'll reply soon.
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <FieldLabel>Name</FieldLabel>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your name"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:bg-neutral-900 dark:border-neutral-700"
            />
          </div>

          <div>
            <FieldLabel>Email</FieldLabel>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:bg-neutral-900 dark:border-neutral-700"
            />
          </div>
        </div>

        <div>
          <FieldLabel>Subject</FieldLabel>
          <input
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder="What's this about?"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:bg-neutral-900 dark:border-neutral-700"
          />
        </div>

        <div>
          <FieldLabel>Message</FieldLabel>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={6}
            placeholder="Tell us more..."
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:bg-neutral-900 dark:border-neutral-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            {/* paper-plane icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2l-7 20  -4-9-9-4 20-7z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {loading ? "Sending..." : "Send message"}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm({ name: "", email: "", subject: "", message: "" });
              setError(null);
            }}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50"
          >
            Reset
          </button>

          <div className="ml-auto text-xs text-gray-500 dark:text-neutral-400">
            We respect your privacy.
          </div>
        </div>
      </form>
    </div>
  );
}
