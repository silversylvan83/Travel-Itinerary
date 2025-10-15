"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type MeResponse =
  | { ok: true; user: { isEmailVerified?: boolean } }
  | { ok: false };

function useVerifiedGate() {
  const [verified, setVerified] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/me", { credentials: "include", cache: "no-store" })
      .then((r) => r.json().catch(() => ({ ok: false }) as MeResponse))
      .then((j: MeResponse) => {
        if (!alive) return;
        setVerified(j.ok === true && !!j.user?.isEmailVerified);
      })
      .catch(() => setVerified(false))
      .finally(() => setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // If not ready, we still send to login (safe default).
  const href = verified ? "/planner" : "/login?next=/planner";
  const label = verified ? "Open planner" : "Sign in to plan";
  return { href, label, ready, verified };
}

export default function HeroSwiper() {
  const gate = useVerifiedGate();

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden relative"
      >
        {/* Slide 1 — Vietnam */}
        <SwiperSlide>
          <div className="relative h-full w-full bg-[url('https://images.unsplash.com/photo-1496133216394-bd66a733c696?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur dark:bg-neutral-900/80 dark:text-white">
                  Southeast Asia • Nature
                </span>
                <h2 className="mt-3 text-2xl md:text-4xl font-bold leading-tight text-white drop-shadow-sm">
                  Visit Vietnam
                </h2>
                <p className="mt-2 max-w-xl text-sm md:text-base text-neutral-100/90">
                  Rice terraces, lantern-lit streets, and emerald bays—craft a
                  colorful route from Sapa to Hội An.
                </p>
                <a
                  href={gate.href}
                  className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  {gate.label}
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 — Taj Mahal, India */}
        <SwiperSlide>
          <div className="relative h-full w-full bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur dark:bg-neutral-900/80 dark:text-white">
                  India • Iconic Wonder
                </span>
                <h2 className="mt-3 text-2xl md:text-4xl font-bold leading-tight text-white drop-shadow-sm">
                  Sunrise at the Taj Mahal
                </h2>
                <p className="mt-2 max-w-xl text-sm md:text-base text-neutral-100/90">
                  Watch the marble glow pink at dawn, then wander through Agra’s
                  timeless lanes.
                </p>
                <a
                  href={gate.href}
                  className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  {gate.label}
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 — Alps / Adventure */}
        <SwiperSlide>
          <div className="relative h-full w-full bg-[url('https://images.unsplash.com/photo-1570161766218-f8488ebb8078?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur dark:bg-neutral-900/80 dark:text-white">
                  Mountains • Adventure
                </span>
                <h2 className="mt-3 text-2xl md:text-4xl font-bold leading-tight text-white drop-shadow-sm">
                  Chase the Alpine Glow
                </h2>
                <p className="mt-2 max-w-xl text-sm md:text-base text-neutral-100/90">
                  Gondolas, glacier views, and cozy chalets—stitch together a
                  week of epic peaks.
                </p>
                <a
                  href={gate.href}
                  className="mt-4 inline-block rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                >
                  {gate.label}
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* keep arrows & pagination visible on photos */}
      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          width: 30px;
          height: 30px;
        }
        :global(.swiper-button-next::after),
        :global(.swiper-button-prev::after) {
          font-size: 20px;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.8);
        }
        :global(.swiper-pagination-bullet-active) {
          background: #ffffff;
        }
      `}</style>
    </>
  );
}
