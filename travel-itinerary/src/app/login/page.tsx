"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type ApiErrorJSON = { error?: string };

function parseError(err: unknown, fallback = "Something went wrong") {
  if (err instanceof Error) return err.message || fallback;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return fallback;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const code = useMemo(() => digits.join(""), [digits]);
  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  useEffect(() => {
    if (!resendIn) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  function setDigit(i: number, v: string) {
    const val = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  }

  function onKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputs.current[i + 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split("");
    while (next.length < 6) next.push("");
    setDigits(next);
    inputs.current[Math.min(5, text.length)]?.focus();
  }

  async function requestOtp() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const j: ApiErrorJSON = await res
          .json()
          .catch(() => ({} as ApiErrorJSON));
        throw new Error(j.error || "Failed to send code");
      }

      setSent(true);
      setResendIn(60);
      setTimeout(() => inputs.current[0]?.focus(), 50);
    } catch (e: unknown) {
      setErr(parseError(e, "Failed to send code"));
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.replace(/\D/g, "").slice(0, 6) }),
      });

      if (!res.ok) {
        const j: ApiErrorJSON = await res
          .json()
          .catch(() => ({} as ApiErrorJSON));
        throw new Error(j.error || "Verification failed");
      }

      const next =
        new URLSearchParams(window.location.search).get("next") || "/";
      window.location.href = next;
    } catch (e: unknown) {
      setErr(parseError(e, "Verification failed"));
    } finally {
      setLoading(false);
    }
  }

  const btnPrimary =
    "rounded-xl px-4 py-3 text-white shadow-sm transition bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 disabled:cursor-not-allowed";
  const inputBase =
    "w-full rounded-xl px-4 py-3 outline-none transition border";

  return (
    <main
      className="min-h-[calc(100dvh-64px-88px)] flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(180deg, rgba(99,102,241,0.07) 0%, rgba(236,72,153,0.07) 100%)",
        color: "var(--color-foreground)",
      }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-3xl p-[1px] shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.5), rgba(236,72,153,0.5))",
          }}
        >
          <div
            className="rounded-3xl p-6 md:p-8"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            <header className="mb-6">
              <h1 className="text-xl font-bold tracking-tight">Sign in</h1>
              <p className="text-sm opacity-70">
                Get a 6-digit code in your inbox.
              </p>
            </header>

            {!sent ? (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailValid && !loading) requestOtp();
                }}
              >
                <label className="block">
                  <span className="mb-2 block text-sm opacity-80">
                    Email address
                  </span>
                  <input
                    className={inputBase}
                    style={{
                      background: "var(--color-surface)",
                      borderColor: email.length
                        ? emailValid
                          ? "rgba(16,185,129,.6)"
                          : "rgba(244,63,94,.6)"
                        : "var(--color-border)",
                    }}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={email.length > 0 && !emailValid}
                  />
                </label>

                <button
                  type="submit"
                  disabled={!emailValid || loading}
                  className={btnPrimary}
                >
                  {loading ? <Spinner label="Sending…" /> : "Send code"}
                </button>

                <p className="text-xs opacity-70">
                  By continuing you agree to our Terms and Privacy Policy.
                </p>
              </form>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (code.length === 6 && !loading) verifyOtp();
                }}
              >
                <p className="text-sm opacity-80">
                  We sent a code to <span className="font-medium">{email}</span>
                </p>

                <div
                  className="grid grid-cols-6 gap-2 sm:gap-3 select-none"
                  onPaste={onPaste}
                >
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputs.current[i] = el;
                      }}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => onKey(i, e)}
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      aria-label={`Digit ${i + 1}`}
                      className="h-12 sm:h-14 rounded-xl text-center text-lg sm:text-2xl tracking-widest"
                      style={{
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="underline underline-offset-4 opacity-90 hover:opacity-100"
                  >
                    Use a different email
                  </button>

                  <button
                    type="button"
                    onClick={() => resendIn === 0 && requestOtp()}
                    disabled={resendIn > 0 || loading}
                    className="rounded-lg px-3 py-2"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      opacity: resendIn ? 0.6 : 1,
                    }}
                    aria-live="polite"
                  >
                    {resendIn ? `Resend in ${resendIn}s` : "Resend code"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={
                    code.length !== 6 || loading || digits.some((d) => !d)
                  }
                  className={btnPrimary}
                >
                  {loading ? (
                    <Spinner label="Verifying…" />
                  ) : (
                    "Verify & Sign in"
                  )}
                </button>

                <p className="text-xs opacity-70">
                  Check spam/promotions if you don’t see it.
                </p>
              </form>
            )}

            {err && (
              <div
                role="alert"
                className="mt-5 rounded-xl p-3"
                style={{
                  background: "rgba(244,63,94,.12)",
                  border: "1px solid rgba(244,63,94,.35)",
                }}
              >
                {err}
              </div>
            )}

            <div className="mt-6 text-xs opacity-70">
              <Link href="/" className="hover:opacity-100 opacity-80">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Spinner({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        className="animate-spin h-5 w-5"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.25"
        />
        <path
          d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
          fill="currentColor"
          opacity="0.75"
        />
      </svg>
      {label ?? "Loading…"}
    </span>
  );
}
