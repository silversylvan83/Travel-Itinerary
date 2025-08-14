"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSwiper() {
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
        <SwiperSlide>
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1496133216394-bd66a733c696?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        </SwiperSlide>
      </Swiper>

      {/* Custom styles for arrows */}
      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          width: 30px;
          height: 30px;
        }

        :global(.swiper-button-next::after),
        :global(.swiper-button-prev::after) {
          font-size: 20px;
        }
      `}</style>
    </>
  );
}
