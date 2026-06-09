"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  gap?: number;
  reverse?: boolean;
  speedOnHover?: number;
  children: React.ReactNode;
}

export function MarqueeEffect({
  className,
  speed = 30,
  gap = 24,
  reverse = false,
  speedOnHover,
  children,
  ...props
}: MarqueeEffectProps) {
  const duration = speed;

  return (
    <div
      className={cn("flex overflow-hidden relative w-full", className)}
      style={{
        "--gap": `${gap}px`,
        "--duration": `${duration}s`,
      } as React.CSSProperties}
      {...props}
    >
      <div
        className={cn(
          "flex w-max min-w-full shrink-0 items-center justify-around",
          "animate-marquee",
          reverse && "direction-reverse",
          speedOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ gap: `var(--gap)` }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - (var(--gap) / 2))); }
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
        .direction-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}
