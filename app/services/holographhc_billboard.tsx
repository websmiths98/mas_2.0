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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rotateXText = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] flex items-center overflow-hidden bg-[#02040a] perspective-[2000px]">
       
       {/* 3D Tilted Background */}
       <motion.div 
         className="absolute inset-0 w-full h-full z-0 origin-center"
       >
         <VideoLikeImageSequence images={HERO_IMAGES} interval={8000} />
         <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-[#02040a]/80 to-[#02040a]/20" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-[#02040a]/80" />
         
         {/* Cyber Grid */}
         <div className="absolute inset-0 opacity-[0.2] bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_0%_50%,#000_40%,transparent_100%)] pointer-events-none" />
       </motion.div>

       <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-12 gap-8 relative z-30">
          
          {/* Main Hero HUD Panel */}
          <motion.div 
            style={{ y: yText, opacity: opacityText, rotateX: rotateXText, transformStyle: "preserve-3d" }}
            className="col-span-12 lg:col-span-9 xl:col-span-8 flex flex-col justify-center relative origin-left"
          >
            {/* Gaming HUD Glass Backdrop */}
            <div className="absolute -inset-6 lg:-inset-10 bg-[#060b18]/60 backdrop-blur-2xl border-l-[6px] border-blue-500 shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(59,130,246,0.1)] transform -skew-x-3" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }} />

            <div className="relative z-10 px-2 lg:px-6 py-4">
              <div className="inline-flex items-center gap-4 mb-10">
                <div className="flex items-center justify-center w-10 h-10 border border-blue-500/50 bg-blue-500/10 rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                   <div className="w-2 h-2 bg-blue-400 animate-pulse shadow-[0_0_10px_#60a5fa]" />
                </div>
                <div className="flex flex-col">
                   <span className="text-blue-300 font-mono text-[10px] uppercase tracking-[0.4em] leading-none mb-1">System Active</span>
                   <span className="text-white/40 font-mono text-[9px] uppercase tracking-widest leading-none">Logistics Nexus V2</span>
                </div>
              </div>
              
              <ScrubTextReveal className="text-5xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-bold leading-[1.05] tracking-tighter text-white drop-shadow-2xl mb-12">
                 Built to Simplify Global Logistics Operations
              </ScrubTextReveal>

              <div className="relative pl-6 border-l-2 border-blue-500/30">
                 <div className="absolute -left-[2px] top-0 w-[2px] h-10 bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
                 <ScrubTextReveal className="text-base md:text-xl font-light leading-relaxed text-white/70 max-w-2xl">
                    At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain. Experience fluid logistics with our state-of-the-art alternating flow network.
                 </ScrubTextReveal>
              </div>
            </div>
          </motion.div>

          {/* Right Side HUD Deco */}
          <div className="hidden lg:flex col-span-3 xl:col-span-4 relative items-center justify-center pointer-events-none">
             <motion.div 
               animate={{ rotateZ: 360, rotateX: [0, 20, 0], rotateY: [0, 30, 0] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] border border-blue-500/20 rounded-full flex items-center justify-center"
               style={{ transformStyle: 'preserve-3d' }}
             >
                <div className="w-[80%] h-[80%] border border-dashed border-blue-400/30 rounded-full" />
                <div className="absolute w-full h-[1px] bg-blue-500/20" />
                <div className="absolute w-[1px] h-full bg-blue-500/20" />
             </motion.div>
          </div>
       </div>

       {/* Bottom HUD Bar */}
       <div className="absolute bottom-0 inset-x-0 h-16 border-t border-blue-500/20 bg-[#02040a]/80 backdrop-blur-md flex items-center justify-between px-10 font-mono text-[10px] text-blue-500/60 tracking-widest z-40 hidden md:flex">
         <div className="flex gap-10">
           <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" /> CORE_ONLINE</span>
           <span>LAT: 34.0522 N</span>
           <span>LNG: 118.2437 W</span>
         </div>
         <div className="flex gap-10">
           <span>TICK: ACTIVE</span>
           <span>SECURE_CONNECTION</span>
         </div>
       </div>
    </section>
  );
}

function ServiceMatrixBlock({ item, index }: { item: ServiceItem, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Holographic Billboard "Fly In" effect
  // Fly in from sides with Y rotation
  const rotateY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [isEven ? -60 : 60, 0, 0, isEven ? 60 : -60]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [20, 0, 0, -20]);
  const x = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [isEven ? -300 : 300, 0, 0, isEven ? -300 : 300]);
  const z = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-500, 0, 0, -500]);
  
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.6, 1, 1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ rotateY, rotateX, x, translateZ: z, scale, opacity, transformStyle: "preserve-3d" }}
      className="relative w-full py-16 flex items-center justify-center min-h-[80vh] mb-12"
    >
      <div className={`relative w-full max-w-[1300px] bg-[#030712]/80 backdrop-blur-2xl border ${isEven ? 'border-l-[8px]' : 'border-r-[8px]'} border-blue-500/80 rounded-3xl shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-visible`}>
         
         {/* Cyber Circuit Lines */}
         <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 20px)' }} />

         {/* Corner Accents */}
         <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400" />
         <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400" />

         <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} p-8 md:p-12 lg:p-16 gap-12 items-center`} style={{ transformStyle: "preserve-3d" }}>
            
            {/* Holographic Media Projection */}
            <div className="w-full lg:w-[45%] relative" style={{ transform: "translateZ(80px)" }}>
               <div className="absolute -inset-4 border border-dashed border-blue-500/30 rounded-2xl animate-[spin_60s_linear_infinite]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
               <div className="relative aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-blue-500/40" style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
                  <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10" />
                  <VideoLikeImageSequence images={item.images} interval={8000} />
               </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-[55%] flex flex-col" style={{ transform: "translateZ(60px)" }}>
               <div className="inline-flex items-center gap-4 mb-6">
                 <div className="w-10 h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                 <h4 className="text-blue-300 font-mono tracking-[0.4em] uppercase text-xs">
                   {item.category} // DATABLOCK
                 </h4>
               </div>

               <ScrubTextReveal className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tighter">
                 {item.title}
               </ScrubTextReveal>

               <ScrubTextReveal className="text-white/60 text-lg leading-relaxed mb-10 font-light max-w-xl">
                 {item.description}
               </ScrubTextReveal>

               <div className="flex flex-wrap gap-4 mt-auto">
                 {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa] animate-pulse" />
                      <span className="text-blue-100 text-sm tracking-widest font-mono uppercase text-[10px]">{feature}</span>
                    </div>
                 ))}
               </div>
            </div>

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
          <ServiceMatrixBlock key={item.title} item={item} index={index} />
        ))}
      </div>

    </main>
  );
}
