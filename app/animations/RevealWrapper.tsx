"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { clsx } from "clsx";

interface RevealWrapperProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "scale";
  staggerIndex?: number;
  className?: string;
  margin?: string;
}

export function RevealWrapper({
  children,
  direction = "up",
  staggerIndex = 0,
  className,
  margin = "-10% 0px",
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as any });

  const getHiddenClass = () => {
    switch (direction) {
      case "left":
        return "reveal-left-hidden";
      case "right":
        return "reveal-right-hidden";
      case "scale":
        return "reveal-scale-hidden";
      case "up":
      default:
        return "reveal-hidden";
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(
        "will-change-transform",
        getHiddenClass(),
        isInView && "reveal-visible",
        `stagger-${Math.min(staggerIndex, 8)}`,
        className
      )}
    >
      {children}
    </div>
  );
}
