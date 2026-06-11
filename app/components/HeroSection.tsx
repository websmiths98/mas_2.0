"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { RevealWrapper } from "@/app/animations/RevealWrapper";
import { useParallax } from "@/app/animations/useParallax";
import { TextReveal } from "@/app/components/TextReveal";

export default function HeroSection() {
  // Shared height and sizing to ensure both buttons look uniform
  const btnStyle = "h-[46px] min-w-[170px] flex items-center justify-center px-6 rounded-xl transition-all duration-300 text-[13px] font-semibold cursor-pointer";

  // yBg moves down 350px when scrolled 1000px down
  const yBg = useParallax(350);

  // yText moves down 150px when scrolled 1000px down (creating 3D depth between BG and text)
  const yText = useParallax(150);

  const videos = [
    { src: "/hero-video.webm", type: "video/webm" },
    { src: "/assets_log/hero2_log.webm", type: "video/webm" },
    { src: "/assets_log/hero3_log.webm", type: "video/webm" }
  ];

  const contentData = [
    {
      badge: "Seamless Logistics Across Continents | Your Trusted Partner in Global Logistics",
      heading: "International Freight Forwarding & Supply Chain Solutions",
      subtitle: "MAS Logistics is a trusted international freight forwarding and supply chain management company in India delivering reliable air, sea, warehousing, and global logistics solutions tailored for seamless cross-border trade",
    },
    {
      badge: "Intelligent Network | Advanced Route Optimization",
      heading: "Next-Generation Digital Supply Chain Excellence",
      subtitle: "Leverage real-time visibility, automated workflows, and predictive analytics to optimize your inventory, reduce transit times, and empower your global trade networks.",
    },
    {
      badge: "Specialized Infrastructure | Precision Cargo Handling",
      heading: "Engineered Solutions for Complex Logistics Needs",
      subtitle: "From temperature-controlled pharmaceuticals to heavy-lift industrial machinery, our dedicated infrastructure ensures your critical cargo is handled with uncompromising safety.",
    }
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoEnd = (index: number) => {
    const nextIndex = (index + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
    if (videoRefs.current[nextIndex]) {
      videoRefs.current[nextIndex]!.currentTime = 0;
      videoRefs.current[nextIndex]!.play().catch(e => console.log("Video play error:", e));
    }
  };

  useEffect(() => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(e => console.log("Initial play error:", e));
    }
  }, []);

  return (
    <div className="relative bg-[#020617] min-h-[100svh] w-full overflow-hidden flex items-center justify-center">

      {/* ── Video BG ── */}
      <motion.div style={{ transform: `translateY(${yBg}px)` }} className="absolute inset-0 z-0 h-[120%] -top-[10%] bg-[#020617]">
        {videos.map((video, index) => (
          <video
            key={video.src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            muted
            playsInline
            preload="auto"
            onEnded={() => handleVideoEnd(index)}
            // @ts-ignore
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu ${
              index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <source src={video.src} type={video.type} />
            {index === 0 && <source src="/hero-video.mp4" type="video/mp4" />}
          </video>
        ))}
      </motion.div>

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(160deg, rgba(2,6,18,0.96) 0%, rgba(3,9,28,0.88) 50%, rgba(5,12,35,0.72) 100%)",
          opacity: 0.50,
        }}
      />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.35,
        }}
      />

      {/* ── Hero Content ── */}
      <motion.div style={{ transform: `translateY(${yText}px)` }} className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-center text-center gap-6">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center text-center gap-6"
          >
            {/* ─ Badge ─ */}
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {contentData[currentVideoIndex].badge}
            </div>

            {/* ─ Primary Heading ─ */}
            <h1
              className="hero-h1 flex flex-wrap justify-center text-center text-[#fffff5]"
              style={{
                textShadow: "0 0 30px rgba(255, 255, 255, 0), 0 15px 50px rgba(200, 220, 255, 0), 0 -5px 25px rgba(255, 255, 255, 0.07)"
              }}
            >
              {contentData[currentVideoIndex].heading.split(" ").map((word, i) => (
                <motion.span
                  key={`${currentVideoIndex}-${i}`}
                  className="inline-block mr-[0.25em] mb-[0.1em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.03 + 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* ─ Subtitle ─ */}
            <h2 className="hero-h2 max-w-2xl flex flex-wrap justify-center text-center">
              {contentData[currentVideoIndex].subtitle.split(" ").map((word, i) => (
                <motion.span
                  key={`${currentVideoIndex}-${i}`}
                  className="inline-block mr-[0.25em] mb-[0.1em]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.015 }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* ─ CTAs ─ */}
        <RevealWrapper staggerIndex={3}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">

            {/* Explore Services Button
            <a
              href="/#section-services"
              className={`${btnStyle} group relative overflow-hidden border-2 border-[#E5E4E2]/20 bg-[#E5E4E2]/10 backdrop-blur-md text-[#E5E4E2] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700`}
            >
              Explore Services
              <svg
                className="w-5 h-5 ml-3 group-hover:rotate-90 group-hover:bg-[#E5E4E2] text-[#E5E4E2] ease-linear duration-300 rounded-full border border-[#E5E4E2]/30 group-hover:border-none p-1 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-[#E5E4E2] group-hover:fill-gray-800"
                ></path>
              </svg>
            </a>
            */}

          </div>
        </RevealWrapper>
      </motion.div>

    </div>
  );
}
