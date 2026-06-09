"use client";

import { motion } from "framer-motion";
import React, { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

export const TextReveal = ({
  children,
  as: Component = "span",
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
}: TextRevealProps) => {
  const textStr = children != null ? String(children) : "";
  const words = textStr.split(" ");

  const container = {
    hidden: {},
    visible: (i = 1) => ({
      transition: { staggerChildren: staggerChildren, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      y: "0%",
      transition: {
        ease: [0.22, 1, 0.36, 1],
        duration: duration || 0.8,
      },
    },
    hidden: {
      y: "120%",
    },
  };

  return React.createElement(
    Component,
    { className: cn("flex flex-wrap", className) },
    <motion.span
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10% 0px" }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: "inline-flex", overflow: "hidden", marginRight: "0.25em", paddingBottom: "0.1em", marginTop: "-0.1em" }}>
          <motion.span
            variants={child}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
