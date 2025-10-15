// app/layout.tsx
import "./globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ThemeToggle from "./components/ThemeToggle";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // used by Tailwind v4 @theme or plain CSS var
});

export const data = {
  title: "GlobeTrail",
  description:
    "Plan unforgettable trips with AI. Colorful, fast, and delightful.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* pre-hydration script to set theme before React mounts (prevents flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='globetrail-theme',v=localStorage.getItem(k);
if(v==='dark'){document.documentElement.classList.add('dark');return;}
if(v==='light'){document.documentElement.classList.remove('dark');return;}
var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark',!!m);}catch(e){}})();`,
          }}
        />
        {/* Minimal global CSS variables so you don't need tailwind.config.js */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root{
  /* Light theme gradient (unchanged) */
  --bg-start:#f5d0fe; /* fuchsia-200-ish */
  --bg-mid:#ffffff;
  --bg-end:#e0e7ff;   /* indigo-100-ish */

  /* Surfaces/text (optional helpers) */
  --color-surface:#ffffff;
  --color-border:#e5e7eb;
  --color-foreground:#111827;

  /* Your dark palette */
  --color-caribbean_current:#006466;
  --color-midnight_green:#065a60;
  --color-midnight_green2:#0b525b;
  --color-midnight_green3:#144552;
  --color-charcoal:#1b3a4b;
  --color-prussian_blue:#212f45;
  --color-space_cadet:#272640;
  --color-dark_purple:#312244;
  --color-dark_purple2:#3e1f47;
  --color-palatinate:#4d194d;
}
/* Dark theme overrides */
:root.dark{
  --bg-start:var(--color-caribbean_current);
  --bg-mid:var(--color-prussian_blue);
  --bg-end:var(--color-palatinate);

  --color-surface:var(--color-space_cadet);
  --color-border:var(--color-midnight_green3);
  --color-foreground:#e5e7eb;
}
          `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/* Use CSS variables for the gradient so light/dark swap automatically */}
        <div className="min-h-screen bg-gradient-to-b from-[--bg-start] via-[--bg-mid] to-[--bg-end]">
          <NavBar />
          <main>{children}</main>
          <Footer />

          {/* Floating theme toggle */}
          <div className="fixed right-4 bottom-4 z-50">
            <ThemeToggle />
          </div>
        </div>
      </body>
    </html>
  );
}
