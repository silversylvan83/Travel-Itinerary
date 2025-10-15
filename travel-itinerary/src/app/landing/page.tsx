import Image from "next/image";
import Link from "next/link";
import HeroSwiper from "../components/HeroSwiper";

export const data = {
  title: "GlobeTrail — AI Travel Itinerary Planner",
  description:
    "Plan unforgettable trips with AI. Colorful, fast, and delightful.",
};

export default function LandingPage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-fuchsia-100 via-white to-indigo-50 dark:from-violet-950 dark:via-neutral-950 dark:to-indigo-950">
      {/* Top ribbon */}
      {/* <div className="bg-indigo-500 text-white">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium md:px-8">
          ✨ New: AI Itinerary suggestions + colorful gallery
        </div>
      </div> */}

      {/* Navbar */}

      {/* <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" />
          <span className="text-base font-bold tracking-tight">GlobeTrail</span>
        </div>
        <div className="hidden items-center gap-6 text-sm md:flex">
          <Link className="opacity-80 hover:opacity-100" href="/features">
            Features
          </Link>
          <Link className="opacity-80 hover:opacity-100" href="/destinations">
            Destinations
          </Link>
          <Link className="opacity-80 hover:opacity-100" href="/contact">
            Contact
           </Link>
          <Link className="opacity-80 hover:opacity-100" href="/pricing">
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-indigo-500 px-3 py-2 text-white shadow-sm hover:bg-indigo-600"
          >
            Open Planner
          </Link>
        </div>
      </nav> */}

      <HeroSwiper />

      {/* Destinations Gallery */}
      <section
        id="destinations"
        className="mx-auto max-w-7xl px-4 py-12 md:px-8"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Beautiful destinations
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300">
              Hand‑picked places your itinerary can include—instantly.
            </p>
          </div>
          <Link
            href="/"
            className="hidden rounded-xl border border-indigo-200 bg-white/70 px-4 py-2 text-sm hover:bg-white dark:border-neutral-700 dark:bg-neutral-900 md:block"
          >
            Generate my plan
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Taj Mahal, India",
              img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
              badge: "Iconic Wonder",
              desc: "Agra’s marble masterpiece—sunrise views are unreal.",
            },
            {
              title: "Santorini, Greece",
              img: "https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              badge: "Sunset Favorite",
              desc: "Clifftop white‑and‑blue villages and golden hours.",
            },
            {
              title: "Kyoto, Japan",
              img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              badge: "Temple Trails",
              desc: "Torii gates, tea houses, and tranquil gardens.",
            },
            // {
            //   title: "Paris, France",
            //   img: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            //   badge: "Café Culture",
            //   desc: "Museums by day, Seine strolls by night.",
            // },
            {
              title: "Cappadocia, Türkiye",
              img: "https://plus.unsplash.com/premium_photo-1661964146949-a35b9ae06f89?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              badge: "Balloon Rides",
              desc: "Otherworldly valleys and sunrise balloons.",
            },
            {
              title: "Bali, Indonesia",
              img: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              badge: "Island Chill",
              desc: "Waterfalls, rice terraces, and beach sunsets.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-2xl border bg-white/80 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="relative">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fuchsia-700 shadow-sm backdrop-blur dark:bg-neutral-900/80">
                  {card.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold">{card.title}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300">
                  {card.desc}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-indigo-600">
                    Add to itinerary
                  </span>
                  <Link
                    href="/"
                    className="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600"
                  >
                    Plan here
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Book With Us */}
      <section id="why-book" className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <h2 className="text-2xl font-bold">Why Book With Us?</h2>
        <p className="mt-1 text-sm text-gray-700 dark:text-neutral-300">
          Experience travel planning like never before with GlobeTrail’s smart
          and seamless features.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI-Powered Itineraries",
              icon: "🧠",
              desc: "Get personalized day-by-day plans created instantly by our advanced AI.",
            },
            {
              title: "Budget-Friendly Planning",
              icon: "💰",
              desc: "Stay within your budget with smart cost estimates and local deals.",
            },
            {
              title: "Hand-Picked Destinations",
              icon: "📍",
              desc: "Discover the best spots, from hidden gems to world-famous landmarks.",
            },
            {
              title: "Seamless Editing",
              icon: "✏️",
              desc: "Easily tweak and customize your trip details anytime.",
            },
            {
              title: "Multi-Device Access",
              icon: "📱",
              desc: "Plan on your laptop, check on your phone — anytime, anywhere.",
            },
            {
              title: "Export & Share",
              icon: "📤",
              desc: "Download your plan or share it with friends in one click.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="mb-3 text-3xl">{feature.icon}</div>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-neutral-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-indigo-500 p-8 text-white shadow-lg dark:border-neutral-800">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
          <h3 className="text-2xl font-bold">
            Ready to color your next adventure?
          </h3>
          <p className="mt-1 text-sm opacity-90">
            Generate a day-by-day plan in seconds.
          </p>
          <div className="mt-5">
            <Link
              href="/"
              className="inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow hover:bg-indigo-50"
            >
              Plan my trip
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t py-8 text-center text-xs text-gray-500 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          © {new Date().getFullYear()} GlobeTrail • Images via Unsplash
        </div>
      </footer> */}

      {/* Floating theme toggle */}
      {/* <ThemeToggle /> */}
    </main>
  );
}
