"use client";

import Lottie from "lottie-react";
import type { CSSProperties } from "react";

type Props = {
  animationData: object;     // your imported JSON
  size?: number;             // px
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: CSSProperties;
};

export default function AvatarLottie({
  animationData,
  size = 64,
  className = "",
  loop = true,
  autoplay = true,
  style,
}: Props) {
  return (
    <div
      className={`relative grid place-items-center rounded-2xl overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: "transparent",
        // optional soft ring behind the avatar
        boxShadow: "0 0 0 0.5px rgba(0,0,0,0.06)",
        ...style,
      }}
      aria-hidden
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "115%", height: "115%" }}  // slightly zoomed for a tighter crop
      />
    </div>
  );
}
