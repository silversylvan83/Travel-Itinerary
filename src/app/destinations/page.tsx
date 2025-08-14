"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Destination = {
  name: string;
  image: string;
  description: string;
};

const allDestinations: Destination[] = [
  // 🇮🇳 India — Icons
  {
    name: "Taj Mahal, Agra (India)",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
    description: "Marble mausoleum glowing at sunrise on the Yamuna river.",
  },
  {
    name: "Jaipur, Rajasthan (India)",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Hawa Mahal, Amber Fort, and pink-washed bazaars.",
  },
  {
    name: "Varanasi Ghats (India)",
    image:
      "https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Boats at dawn and the evening Ganga Aarti on the ghats.",
  },
  {
    name: "Kerala Backwaters, Alleppey (India)",
    image:
      "https://plus.unsplash.com/premium_photo-1719955783013-218981c48c89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VyZWFsYSUyMGJhY2t3YXRlcnN8ZW58MHx8MHx8fDA%3D",
    description: "Palm-fringed canals and houseboats drifting past villages.",
  },
  {
    name: "Goa Beaches (India)",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Golden sands, shacks, and chilled sunsets on the Arabian Sea.",
  },
  {
    name: "Ladakh — Pangong Lake (India)",
    image:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFkYWtofGVufDB8fDB8fHww",
    description: "Turquoise high-altitude lake amid stark lunar landscapes.",
  },
  {
    name: "Rishikesh (India)",
    image:
      "https://images.unsplash.com/photo-1720819029162-8500607ae232?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlzaGlrZXNofGVufDB8fDB8fHww",
    description:
      "Yoga capital of the world on the Ganges, with hanging bridges.",
  },
  {
    name: "Udaipur (India)",
    image:
      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWRhaXB1cnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Romantic lake palaces and whitewashed havelis.",
  },
  {
    name: "Hampi (India)",
    image:
      "https://images.unsplash.com/photo-1616606484004-5ef3cc46e39d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Ruins scattered across boulder-strewn landscapes.",
  },
  {
    name: "Darjeeling (India)",
    image:
      "https://images.unsplash.com/photo-1696426886039-a3b5c8774e3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    description: "Toy train rides, tea estates, and Kanchenjunga views.",
  },
  {
    name: "Amritsar — Golden Temple (India)",
    image:
      "https://plus.unsplash.com/premium_photo-1697730331435-92e07494db43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZGVuJTIwdGVtcGxlfGVufDB8fDB8fHww",
    description: "Gleaming sanctum and serene sarovar with langar service.",
  },
  {
    name: "Mysuru Palace (India)",
    image:
      "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXlzdXJ1JTIwcGFsYWNlfGVufDB8fDB8fHww",
    description: "Illuminated Indo‑Saracenic palace and heritage lanes.",
  },
  {
    name: "Munnar (India)",
    image:
      "https://images.unsplash.com/photo-1637066742971-726bee8d9f56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVubmFyfGVufDB8fDB8fHww",
    description: "Rolling tea gardens, misty hills, and cool weather.",
  },
  {
    name: "Andaman — Radhanagar Beach (India)",
    image:
      "https://plus.unsplash.com/premium_photo-1665311539742-316504a6ec14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8QW5kYW1hbiUyMCVFMiU4MCU5NCUyMFJhZGhhbmFnYXIlMjBCZWFjaCUyMChJbmRpYSl8ZW58MHx8MHx8fDA%3D",
    description: "Powdery sands and turquoise waters on Havelock Island.",
  },
  {
    name: "Kolkata (India)",
    image:
      "https://images.unsplash.com/photo-1542709618-9fa4290f0cfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGtvbGthdGF8ZW58MHx8MHx8fDA%3D",
    description: "Colonial charm, tram rides, and epic street food.",
  },
  {
    name: "Mumbai Marine Drive (India)",
    image:
      "https://images.unsplash.com/photo-1673719895538-6373082b20d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFyaW5lJTIwZHJpdmUlMjBtdW1iYWl8ZW58MHx8MHx8fDA%3D",
    description: "Queen’s Necklace, Bollywood buzz, and seafront sunsets.",
  },
  {
    name: "Meghalaya — Living Root Bridges (India)",
    image:
      "https://images.unsplash.com/photo-1521437620269-f477f5437820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWVnaGFsYXlhfGVufDB8fDB8fHww",
    description: "Handwoven bridges in emerald rainforests near Cherrapunji.",
  },
  {
    name: "Ranthambore National Park (India)",
    image:
      "https://images.unsplash.com/photo-1588141396202-0413cf31f58a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFJhbnRoYW1ib3JlfGVufDB8fDB8fHww",
    description: "Bengal tiger safaris among crumbling fort ruins.",
  },

  // 🌍 Global — Crowd favorites
  {
    name: "Santorini, Greece",
    image:
      "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FudG9yaW5pfGVufDB8fDB8fHww",
    description: "Clifftop white-and-blue villages and caldera sunsets.",
  },
  {
    name: "Paris, France",
    image:
      "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
    description: "Eiffel Tower twinkles, cafés, and world-class museums.",
  },
  {
    name: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a3lvdG98ZW58MHx8MHx8fDA%3D",
    description: "Torii gates, tea houses, and tranquil gardens.",
  },
  {
    name: "Cappadocia, Türkiye",
    image:
      "https://images.unsplash.com/photo-1647955950690-989aaa0475e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FwcGFkb2NpYSUyQyUyMFQlQzMlQkNya2l5ZXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Fairy chimneys and sunrise hot‑air balloons.",
  },
  {
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1600&auto=format&fit=crop",
    description: "Rice terraces, temples, and wave‑washed beaches.",
  },
  {
    name: "Rome, Italy",
    image:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1600&auto=format&fit=crop",
    description: "Colosseum, Vatican, and pasta in piazzas.",
  },
  {
    name: "London, UK",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    description: "Thames walks, markets, and royal landmarks.",
  },
  {
    name: "New York City, USA",
    image:
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D",
    description: "Skylines, Broadway, and endless neighborhoods.",
  },
  {
    name: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1489516408517-0c0a15662682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHViYWklMjB1YWV8ZW58MHx8MHx8fDA%3D",
    description: "Futuristic towers, desert safaris, and mega‑malls.",
  },
  {
    name: "Phuket, Thailand",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    description: "Turquoise bays, island hops, and spicy street food.",
  },
  {
    name: "Istanbul, Türkiye",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXN0YW5idWx8ZW58MHx8MHx8fDA%3D",
    description: "Mosques, bazaars, and Bosphorus breezes.",
  },
  {
    name: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1593368858664-a7fe556ab936?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hJTIwc3BhaW58ZW58MHx8MHx8fDA%3D",
    description: "Gaudí’s curves, tapas crawls, and city beaches.",
  },
  {
    name: "Machu Picchu, Peru",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjY2h1JTIwcGljY2h1fGVufDB8fDB8fHww",
    description: "Lost city of the Incas perched among Andean peaks.",
  },
  {
    name: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop",
    description: "Harbour icons, coastal walks, and laid‑back vibes.",
  },
  {
    name: "Seoul, South Korea",
    image:
      "https://plus.unsplash.com/premium_photo-1661886333708-877148b43ae1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2VvdWx8ZW58MHx8MHx8fDA%3D",
    description: "Palaces, neon districts, and K‑food adventures.",
  },
  {
    name: "Reykjavik, Iceland",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1600&auto=format&fit=crop",
    description: "Northern lights, waterfalls, and steaming lagoons.",
  },
  {
    name: "Queenstown, New Zealand",
    image:
      "https://plus.unsplash.com/premium_photo-1661883289130-2ef3b6612fb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXVlZW5zdG93bnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Adventure capital by mirror‑still lakes and peaks.",
  },
  {
    name: "Petra, Jordan",
    image:
      "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0cmF8ZW58MHx8MHx8fDA%3D",
    description: "Rose‑red city carved into sandstone cliffs.",
  },
  {
    name: "Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop",
    description: "Gardens by the Bay, hawker food, and spotless streets.",
  },
];

export default function ExploreDestinations() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return allDestinations;
    return allDestinations.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.description.toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <section id="destinations" className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Explore destinations
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300">
            Search for places to add to your itinerary.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full sm:w-80">
          <label className="sr-only" htmlFor="dest-search">
            Search destinations
          </label>
          <input
            id="dest-search"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (e.g., Taj Mahal, Kyoto, beaches)"
            className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm outline-none
                       focus:ring-2 focus:ring-indigo-400 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <p className="mt-1 text-xs text-gray-500">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card) => (
          <article
            key={card.name}
            className="group overflow-hidden rounded-2xl border bg-white/80 shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="relative">
              <Image
                src={card.image}
                alt={card.name}
                width={1200}
                height={800}
                className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold">{card.name}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300">
                {card.description}
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

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border bg-white/70 p-6 text-center text-sm text-gray-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            No destinations found. Try a different keyword (e.g., “temple”,
            “beach”, “sunset”).
          </div>
        )}
      </div>
    </section>
  );
}
