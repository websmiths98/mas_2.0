"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export const ScrubTextReveal = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const textEls = gsap.utils.toArray('.text-content', containerRef.current);
      const pillEls = gsap.utils.toArray('.pill-bg', containerRef.current);

      gsap.set(textEls, { opacity: 0 });
      gsap.set(pillEls, { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 40%",
          scrub: 0.5,
        }
      });

      tl.to(pillEls, {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        duration: 1
      }, 0);

      tl.to(textEls, {
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        duration: 1
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="relative inline-block mr-[0.25em] mb-[0.1em]"
        >
          <span className="pill-bg absolute inset-y-[0.05em] inset-x-[-0.05em] bg-current opacity-[0.04] rounded-full" />
          <span className="text-content relative z-10">{word}</span>
        </span>
      ))}
    </div>
  );
};
