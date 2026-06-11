"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ScrubTextReveal } from "@/app/components/ScrubTextReveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let gsapReady = false;

function registerGsapScroll() {
  if (typeof window === "undefined" || gsapReady) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  gsapReady = true;
}

type ServiceItem = {
  title: string;
  category: string;
  description: string;
  images: string[];
  features: string[];
};

const SERVICES: ServiceItem[] = [
  {
    title: "Transport Logistics",
    category: "Surface Network",
    description: "We provide reliable transport logistics solutions supported by a strong carrier network and efficient route planning. Our transportation services are designed to ensure the smooth movement of cargo across locations while maintaining safety, consistency, and timely delivery.",
    images: [
      "/assets_ai/transport_1_1781159237907.png",
      "/assets_ai/transport_2_1781159250180.png"
    ],
    features: ["Route planning", "Carrier network", "Cargo safety", "Timed dispatch"],
  },
  {
    title: "Air Freight",
    category: "Time Critical",
    description: "Our air freight services are designed to support time-sensitive and high-priority shipments across international markets. Through strong partnerships with leading global carriers, we ensure fast, secure, and reliable cargo movement with smooth coordination at every stage.",
    images: [
      "/assets_ai/air_1_1781159272495.png",
      "/assets_ai/air_2_1781159293336.png"
    ],
    features: ["Priority shipments", "Global network", "Secure handling", "Time-critical delivery"],
  },
  {
    title: "Sea Freight",
    category: "Ocean Network",
    description: "We offer dependable sea freight solutions that combine flexibility, cost efficiency, and global connectivity. Whether handling FCL or LCL shipments, our team ensures smooth cargo movement through trusted shipping partners and established port networks.",
    images: [
      "/assets_ai/sea_1_1781159308465.png",
      "/assets_ai/sea_2_1781159321822.png"
    ],
    features: ["FCL & LCL", "Global routing", "Port connectivity", "Shipment visibility"],
  },
  {
    title: "Warehousing",
    category: "Inventory Control",
    description: "Our warehousing and distribution solutions are designed to support efficient inventory management and smooth supply chain operations. With scalable warehousing capabilities and structured storage systems, we help businesses improve operational efficiency.",
    images: [
      "/assets_ai/warehouse_1_1781159344141.png",
      "/assets_ai/warehouse_2_1781159356953.png"
    ],
    features: ["Inventory support", "Distribution handling", "Scalable storage", "Cost-efficient"],
  },
  {
    title: "Project / ODC Cargo",
    category: "Heavy Lift",
    description: "MAS Logistics specializes in handling oversized, heavy-lift, and complex cargo that demands precision planning and specialized logistics expertise. Our project and ODC cargo services are carefully designed to manage critical shipments safely and efficiently.",
    images: [
      "/assets_ai/heavy_1_1781159370046.png",
      "/assets_ai/heavy_2_1781159382662.png"
    ],
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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#02040a]">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          transition={{ 
            opacity: { duration: 3, ease: "easeInOut" },
            scale: { duration: interval / 1000, ease: "easeOut" },
            filter: { duration: 3, ease: "easeInOut" }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt="Logistics background"
            fill
            unoptimized
            className="object-cover object-center w-full h-full mix-blend-screen opacity-60"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#02040a]" style={{ perspective: "1500px" }}>
       
       {/* 3D Tilted Background */}
       <motion.div 
         initial={{ rotateX: 30, scale: 1.2, y: 50, opacity: 0 }}
         whileInView={{ rotateX: 0, scale: 1, y: 0, opacity: 1 }}
         viewport={{ once: false }}
         transition={{ duration: 3.5, ease: "easeOut" }}
         className="absolute inset-0 w-full h-full z-0 origin-bottom"
       >
         <VideoLikeImageSequence images={HERO_IMAGES} interval={8000} />
         <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-[#02040a]/40" />
         
         {/* Cyber Grid */}
         <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />
       </motion.div>

       <motion.div 
         initial={{ opacity: 0, y: 50, translateZ: -100 }}
         whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
         viewport={{ once: false }}
         transition={{ duration: 3, type: "spring", bounce: 0.15, delay: 0.2 }}
         className="relative z-30 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
       >
         <div className="px-5 py-2 border border-blue-500/40 bg-blue-500/10 rounded-sm backdrop-blur-md mb-8 inline-flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
           <div className="w-2 h-2 bg-blue-400 animate-pulse rounded-full shadow-[0_0_10px_#60a5fa]" />
           <span className="text-blue-300 font-mono text-xs uppercase tracking-[0.3em]">Logistics Nexus</span>
         </div>
         
         <ScrubTextReveal className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-tight tracking-tighter text-white drop-shadow-2xl mb-8">
            Built to Simplify Global Logistics Operations
         </ScrubTextReveal>

         <ScrubTextReveal className="text-base md:text-xl font-light leading-relaxed text-white/70 max-w-3xl">
            At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain. Experience fluid logistics with our state-of-the-art alternating flow network.
         </ScrubTextReveal>
       </motion.div>

       {/* Floating 3D HUD Elements */}
       <div className="absolute bottom-8 left-8 font-mono text-[10px] text-blue-500/60 tracking-widest hidden md:flex flex-col gap-1">
         <span>DATABANK // LOGISTICS_CORE</span>
         <span>SYS.TICK: ONLINE</span>
       </div>
       <div className="absolute bottom-8 right-8 font-mono text-[10px] text-blue-500/60 tracking-widest hidden md:flex flex-col gap-1 text-right">
         <span>INITIALIZING... 100%</span>
         <span>NETWORK SECURE</span>
       </div>
    </section>
  );
}

function ServiceDataBlock({ item, index }: { item: ServiceItem, index: number }) {
  const isEven = index % 2 === 0;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Bend starts at 45deg, flattens to 0deg in center, and bends back to -45deg when scrolling past
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [45, 0, 0, -45]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.85, 1, 1.08, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.2, 1, 1, 0.2]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-[24px] overflow-hidden bg-[#080d1e]/90 border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl group flex flex-col lg:flex-row"
    >
      {/* Media Side */}
      <div className={`w-full lg:w-[45%] relative aspect-video lg:aspect-auto overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
         <div className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-[3s] ease-out">
            <VideoLikeImageSequence images={item.images} interval={8000} />
         </div>
         <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-${isEven ? 'r' : 'l'} from-[#080d1e] via-transparent to-transparent opacity-90 lg:opacity-100 z-10 pointer-events-none`} />
         <div className="absolute top-6 left-6 font-mono text-[10px] text-blue-400 tracking-widest border border-blue-500/40 px-2 py-1 rounded bg-[#0a0f1c]/80 backdrop-blur-md z-20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
           {`FEED.${index + 1}`}
         </div>
      </div>

      {/* Content Side */}
      <div className={`w-full lg:w-[55%] p-8 md:p-12 lg:p-16 relative flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
         {/* Cyber Grid Background */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
         />

         <div className="inline-flex items-center gap-4 mb-6 z-10">
            <div className="w-2 h-2 bg-blue-500 rounded-sm shadow-[0_0_10px_#3b82f6]" />
            <h4 className="text-blue-400 font-mono tracking-[0.2em] uppercase text-xs">
              {item.category}
            </h4>
         </div>

         <ScrubTextReveal className="text-3xl md:text-4xl lg:text-5xl font-satoshi font-bold text-white mb-6 tracking-tight z-10">
            {item.title}
         </ScrubTextReveal>
         
         <ScrubTextReveal className="text-white/60 text-base md:text-lg leading-relaxed mb-10 z-10 font-light">
            {item.description}
         </ScrubTextReveal>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 mt-auto">
           {item.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#0a0f1c]/50 border border-blue-500/20 rounded-xl p-4 group-hover:border-blue-500/40 transition-colors duration-300">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
                </div>
                <span className="text-white/80 text-sm tracking-wide font-medium">{feature}</span>
              </div>
           ))}
         </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    registerGsapScroll();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#02040a] selection:bg-blue-500/30">
      
      {/* Global ambient background noise */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <HeroSection />

      <div className="relative z-10 bg-[#02040a] py-20 px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col gap-12 lg:gap-16" style={{ perspective: "2000px" }}>
        {SERVICES.map((item, index) => (
          <ServiceDataBlock key={item.title} item={item} index={index} />
        ))}
      </div>

    </main>
  );
}
