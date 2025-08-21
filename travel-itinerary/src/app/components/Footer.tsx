// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-8 text-center text-xs"
      style={{
        color: "var(--color-foreground)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-3">
          <Link href="/pricing" className="mr-4 link-dim hover:text-indigo-600">
            Pricing
          </Link>
          <Link href="/contact" className="mr-4 link-dim hover:text-indigo-600">
            Contact
          </Link>
          <Link href="/features" className="link-dim hover:text-indigo-600">
            Features
          </Link>
        </div>
        <div style={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} GlobeTrail • Images via Unsplash
        </div>
      </div>
    </footer>
  );
}
