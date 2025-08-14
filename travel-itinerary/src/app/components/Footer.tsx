// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-500 dark:border-neutral-800 dark:text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-3">
          <Link href="/pricing" className="mr-4 hover:text-indigo-600">Pricing</Link>
          <Link href="/contact" className="mr-4 hover:text-indigo-600">Contact</Link>
          <Link href="/features" className="hover:text-indigo-600">Features</Link>
        </div>
        <div>© {new Date().getFullYear()} GlobeTrail • Images via Unsplash</div>
      </div>
    </footer>
  );
}
