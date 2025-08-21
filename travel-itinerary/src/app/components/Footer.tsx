// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        border-t py-8 text-center text-xs
        bg-white text-gray-800 border-gray-200
        dark:bg-neutral-950 dark:text-neutral-300 dark:border-neutral-800
      "
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-3">
          <Link
            href="/pricing"
            className="mr-4 opacity-80 hover:opacity-100 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="mr-4 opacity-80 hover:opacity-100 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </Link>
          <Link
            href="/features"
            className="opacity-80 hover:opacity-100 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Features
          </Link>
        </div>
        <div className="opacity-70">
          © {new Date().getFullYear()} GlobeTrail • Images via Unsplash
        </div>
      </div>
    </footer>
  );
}
