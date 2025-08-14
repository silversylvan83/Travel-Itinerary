// app/layout.tsx
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

import { ReactNode } from "react";

export const metadata = {
  title: "GlobeTrail",
  description: "Plan unforgettable trips with AI. Colorful, fast, and delightful.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* pre-hydration script to set theme before React mounts (prevents flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='globetrail-theme',v=localStorage.getItem(k);if(v==='dark'){document.documentElement.classList.add('dark');return;}if(v==='light'){document.documentElement.classList.remove('dark');return;}if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');}catch(e){} })();`,
          }}
        />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-b from-fuchsia-100 via-white to-indigo-50 dark:from-violet-950 dark:via-neutral-950 dark:to-indigo-950">
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
