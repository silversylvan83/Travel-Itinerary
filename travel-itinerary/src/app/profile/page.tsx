// src/app/profile/page.tsx
import { redirect } from "next/navigation";
import { connectDb } from "@/app/lib/mongo";
import { User } from "@/app/lib/models/User";
import { getUserIdFromCookies } from "../lib/auth";
import SignOutButton from "../components/SignOutButton";

type PublicUser = {
  _id: string;
  email: string;
  userName?: string;
  isEmailVerified: boolean;
  createdAt?: Date | string;
};

function avatarInitials(name?: string, email?: string) {
  const base = (name || email || "").trim();
  if (!base) return "U";
  return (
    base
      .split(/[\s._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() ?? "")
      .join("") || "U"
  );
}

export default async function ProfilePage() {
  const userId = await getUserIdFromCookies();
  if (!userId) redirect("/login?next=/profile");

  await connectDb();
  const user = (await User.findById(userId)
    .select("_id email userName isEmailVerified createdAt")
    .lean<PublicUser>()
    .exec()) as PublicUser | null;

  if (!user) redirect("/login?next=/profile");

  const initials = avatarInitials(user.userName, user.email);
  const joined = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";

  return (
    <main className="relative min-h-[calc(100dvh-64px-88px)] overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 10% -10%, rgba(99,102,241,.15) 0%, transparent 60%), radial-gradient(700px 350px at 90% 110%, rgba(236,72,153,.12) 0%, transparent 60%), linear-gradient(180deg, #fafaff 0%, #ffffff 50%, #eef2ff 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(900px 450px at 10% -10%, rgba(99,102,241,.30) 0%, transparent 60%), radial-gradient(800px 400px at 90% 110%, rgba(236,72,153,.25) 0%, transparent 60%), linear-gradient(180deg, #0e1125 0%, #151733 40%, #1a1840 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 md:px-8 py-10">
        {/* gradient border frame */}
        <div
          className="rounded-3xl p-[1px] shadow-2xl backdrop-blur"
          style={{
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.6), rgba(236,72,153,0.6))",
          }}
        >
          {/* glass card */}
          <section
            className="rounded-3xl border p-6 md:p-8"
            style={{
              background: "color-mix(in oklab, var(--color-surface) 96%, transparent)",
              borderColor: "var(--color-border)",
              backdropFilter: "saturate(120%) blur(6px)",
            }}
          >
            {/* Header */}
            <header className="flex items-center gap-5">
              {/* avatar with gradient ring */}
              <div className="relative">
                <div
                  className="absolute -inset-0.5 rounded-2xl opacity-80 blur"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,.6), rgba(236,72,153,.6), rgba(99,102,241,.6))",
                  }}
                  aria-hidden
                />
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-indigo-500 text-white text-xl font-semibold shadow">
                  {initials}
                </div>
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight">
                  {user.userName || "Traveler"}
                </h1>
                <p className="text-sm opacity-80">{user.email}</p>
                
              </div>
            </header>

            {/* Divider */}
            <div className="my-6 h-px" style={{ background: "var(--color-border)" }} />

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-2xl p-4 shadow-sm transition hover:shadow-md"
                style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
              >
                <div className="text-xs opacity-70">Account status</div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  {user.isEmailVerified ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-green-700 dark:text-green-300">Verified</span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-amber-700 dark:text-amber-300">Not verified</span>
                    </>
                  )}
                </div>
              </div>

              <div
                className="rounded-2xl p-4 shadow-sm transition hover:shadow-md"
                style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
              >
                <div className="text-xs opacity-70">Member since</div>
                <div className="mt-2 text-sm">{joined}</div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px" style={{ background: "var(--color-border)" }} />

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <SignOutButton redirectTo="/login" />

              <a
                href="/planner"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-indigo-700"
              >
                Open planner
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 17L17 7M8 7h9v9" strokeWidth="2" />
                </svg>
              </a>

              {/* subtle help link */}
              <a
                href="/features"
                className="ml-auto inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
                style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
              >
                Explore features
                <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
