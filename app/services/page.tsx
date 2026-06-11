"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { RevealWrapper } from "@/app/animations/RevealWrapper";

type ServiceItem = {
  title: string;
  category: string;
  description: string;
  video: string;
  features: string[];
};

const SERVICES: ServiceItem[] = [
  {
    title: "Transport Logistics",
    category: "Surface Network",
    description: "We provide reliable transport logistics solutions supported by a strong carrier network and efficient route planning. Our transportation services are designed to ensure the smooth movement of cargo across locations while maintaining safety, consistency, and timely delivery.",
    video: "/assets_log/transport_log.webm",
    features: ["Route planning", "Carrier network", "Cargo safety", "Timed dispatch"],
  },
  {
    title: "Air Freight",
    category: "Time Critical",
    description: "Our air freight services are designed to support time-sensitive and high-priority shipments across international markets. Through strong partnerships with leading global carriers, we ensure fast, secure, and reliable cargo movement with smooth coordination at every stage.",
    video: "/assets_log/air_log.webm",
    features: ["Priority shipments", "Global network", "Secure handling", "Time-critical delivery"],
  },
  {
    title: "Sea Freight",
    category: "Ocean Network",
    description: "We offer dependable sea freight solutions that combine flexibility, cost efficiency, and global connectivity. Whether handling FCL or LCL shipments, our team ensures smooth cargo movement through trusted shipping partners and established port networks.",
    video: "/assets_log/sea_log.webm",
    features: ["FCL & LCL", "Global routing", "Port connectivity", "Shipment visibility"],
  },
  {
    title: "Warehousing",
    category: "Inventory Control",
    description: "Our warehousing and distribution solutions are designed to support efficient inventory management and smooth supply chain operations. With scalable warehousing capabilities and structured storage systems, we help businesses improve operational efficiency.",
    video: "/assets_log/warehouse_log.webm",
    features: ["Inventory support", "Distribution handling", "Scalable storage", "Cost-efficient"],
  },
  {
    title: "Project / ODC Cargo",
    category: "Heavy Lift",
    description: "MAS Logistics specializes in handling oversized, heavy-lift, and complex cargo that demands precision planning and specialized logistics expertise. Our project and ODC cargo services are carefully designed to manage critical shipments safely and efficiently.",
    video: "/assets_log/odc_log.webm",
    features: ["Heavy handling", "Route planning", "Specialized equipment", "Project execution"],
  },
];

const HERO_IMAGES = [
  "/assets_ai/hero_1_1781159193928.png",
  "/assets_ai/hero_2_1781159206712.png",
  "/assets_ai/hero_3_1781159220424.png"
];

function VideoLikeImageSequence({ images, interval = 8000 }: { images: string[], interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#020617]">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt="Logistics background"
            fill
            unoptimized
            className="object-cover object-center w-full h-full mix-blend-lighten opacity-40"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-auto min-h-[50vh] md:min-h-[60vh] py-32 md:py-40 flex items-center justify-center overflow-hidden bg-[#020617]">

      {/* Cinematic Background Video */}
      <motion.div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#020617]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80 mix-blend-screen pointer-events-none"
        >
          <source src="/assets_log/transport_log.webm" type="video/webm" />
        </video>
        {/* Subtle gradient to ensure text readability while keeping the video clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-transparent to-[#020617]" />
      </motion.div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 w-full max-w-[90%] md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <RevealWrapper staggerIndex={0}>
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md mb-6 sm:mb-8">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-200 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Global Network Operations</span>
          </div>
        </RevealWrapper>

        <RevealWrapper staggerIndex={1}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight text-white leading-[1.1] mb-6 sm:mb-8">
            Engineered for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Fluid Logistics</span>
          </h1>
        </RevealWrapper>

        <RevealWrapper staggerIndex={2}>
          <p className="text-base sm:text-lg md:text-2xl font-light text-white/70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            From heavy-lift project cargo to time-critical air freight, we deliver structured, dependable, and highly optimized supply chain solutions globally.
          </p>
        </RevealWrapper>
      </motion.div>
    </section>
  );
}

function ServiceCard({ item, index, total }: { item: ServiceItem, index: number, total: number }) {
  // Use a top offset of 0 so each card perfectly snaps to the top of the viewport
  const topOffset = 0;

  return (
    <div
      className={`sticky w-full min-h-screen flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-[#060b18]/95 backdrop-blur-3xl border-t border-white/10 overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.5)]`}
      style={{ top: `${topOffset}px`, zIndex: 10 + index }}
    >
      {/* Content Side */}
      <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <RevealWrapper staggerIndex={0} direction="up">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-blue-400 font-semibold tracking-widest uppercase text-sm">{String(index + 1).padStart(2, '0')}</span>
            <div className="w-12 h-[1px] bg-blue-500/40" />
            <span className="text-white/60 tracking-widest uppercase text-sm">{item.category}</span>
          </div>
        </RevealWrapper>

        <RevealWrapper staggerIndex={1} direction="up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 tracking-tight">
            {item.title}
          </h2>
        </RevealWrapper>

        <RevealWrapper staggerIndex={2} direction="up">
          <p className="text-lg md:text-xl xl:text-2xl text-white/60 font-light leading-relaxed mb-12">
            {item.description}
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
          {item.features.map((feature, i) => (
            <RevealWrapper key={i} staggerIndex={3 + i} direction="up">
              <div className="group flex items-center gap-3 cursor-default">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  <motion.svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    />
                  </motion.svg>
                </div>
                <span className="text-white/80 text-sm md:text-base font-medium transition-colors group-hover:text-white">{feature}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>

      {/* Media Side */}
      <div className={`w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen border-white/5 bg-[#02040a] ${index % 2 === 1 ? 'border-r' : 'border-l'}`}>
        {/* Internal shadow overlay */}
        <div className="absolute inset-0 shadow-[inset_20px_0_40px_rgba(2,6,23,0.5)] z-10 pointer-events-none" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        >
          <source src={item.video} type="video/webm" />
        </video>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-blue-500/30">
      <HeroSection />

      {/* Sticky Stacking Cards Container - Full Width */}
      <div className="relative w-full mt-20">
        {SERVICES.map((item, index) => (
          <ServiceCard key={item.title} item={item} index={index} total={SERVICES.length} />
        ))}
      </div>
    </main>
  );
}
