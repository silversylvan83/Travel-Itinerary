/* eslint-disable react/no-unescaped-entities */
// app/contact/page.tsx
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — GlobeTrail",
  description: "Get in touch with GlobeTrail. Questions, feedback or partnership inquiries — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-fuchsia-50 via-white to-indigo-50 dark:from-violet-950 dark:via-neutral-950 dark:to-indigo-950 py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">Contact GlobeTrail</h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-neutral-300 max-w-2xl mx-auto">
            Questions, partnership inquiries, or feedback — drop us a message and we'll reply as soon as possible.
          </p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {/* Info card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-indigo-50 p-6 shadow-md ring-1 ring-indigo-50 dark:from-neutral-900 dark:to-neutral-900/40 dark:ring-neutral-800">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-indigo-100 p-3 text-indigo-700 dark:bg-indigo-900/20">
                {/* info icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 11h1v5h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 7h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-indigo-700">We&apos;re here to help</h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-neutral-300">
                  For quick questions use the chat (coming soon) or send us a message using the form. We usually respond within 1–2 business days.
                </p>

                <div className="mt-6 space-y-4 text-sm text-gray-700 dark:text-neutral-300">
                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-white/60 p-2 text-indigo-600 ring-1 ring-indigo-50 dark:bg-neutral-800/60">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-neutral-400">Email</div>
                      <div className="mt-0.5">support@globetrail.example</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-white/60 p-2 text-indigo-600 ring-1 ring-indigo-50 dark:bg-neutral-800/60">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M3 6h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M7 6v12a2 2 0 002 2h6a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-neutral-400">Business</div>
                      <div className="mt-0.5">partnerships@globetrail.example</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-white/60 p-2 text-indigo-600 ring-1 ring-indigo-50 dark:bg-neutral-800/60">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7L12 2z" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-neutral-400">Location</div>
                      <div className="mt-0.5">Hyderabad, India</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
                  >
                    {/* back icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back to home
                  </Link>
                </div>
              </div>
            </div>

            {/* subtle decorative circle */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-100 opacity-40 blur-3xl dark:bg-indigo-900/20" />
          </div>

          {/* Form card (client component) */}
          <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-indigo-50 dark:bg-neutral-900 dark:ring-neutral-800">
            <ContactForm />
          </div>
        </section>

      
      </div>
    </main>
  );
}
