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
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#02040a] py-32">
       
       {/* Comic Halftone Background */}
       <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

       <motion.div 
         initial={{ scale: 0, rotate: -20, y: 200 }}
         animate={{ scale: 1, rotate: -2, y: 0 }}
         transition={{ type: "spring", bounce: 0.6, duration: 1.5 }}
         className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
       >
         {/* Cartoon Hero Badge */}
         <div className="bg-yellow-400 border-[4px] border-white text-[#02040a] font-black text-xl md:text-2xl px-8 py-3 rounded-full shadow-[8px_8px_0px_#fff] mb-12 transform -rotate-3 hover:rotate-3 transition-transform cursor-pointer z-40 relative">
           MAS LOGISTICS NEXUS!
         </div>
         
         <div className="bg-[#0a0f1c] border-[8px] border-white rounded-[50px] p-10 md:p-16 shadow-[20px_20px_0px_rgba(255,255,255,0.2)] transform rotate-1 relative">
           {/* Cartoon Accent Pins */}
           <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full border-[4px] border-white bg-blue-400 shadow-[4px_4px_0px_#fff]" />
           <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full border-[4px] border-white bg-pink-400 shadow-[4px_4px_0px_#fff]" />

           <ScrubTextReveal className="text-5xl md:text-7xl lg:text-[7rem] font-black text-white drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] mb-8 leading-[1.1]">
              Built to Simplify Global Logistics
           </ScrubTextReveal>

           <div className="bg-blue-500 border-[4px] border-white p-6 md:p-8 rounded-3xl shadow-[8px_8px_0px_#fff] transform -rotate-1 mt-8 inline-block max-w-3xl">
             <ScrubTextReveal className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
                At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain.
             </ScrubTextReveal>
           </div>
         </div>
       </motion.div>

       {/* Floating Bouncy Elements */}
       <motion.div 
         animate={{ y: [0, -30, 0], rotate: [5, -5, 5] }}
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-32 left-[10%] w-32 h-32 bg-pink-400 border-[6px] border-white rounded-full shadow-[10px_10px_0px_rgba(255,255,255,0.2)] hidden lg:block"
       />
       <motion.div 
         animate={{ y: [0, 40, 0], rotate: [-15, 15, -15], scale: [1, 1.1, 1] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         className="absolute bottom-32 right-[10%] w-40 h-40 bg-green-400 border-[6px] border-white rounded-[40px] shadow-[10px_10px_0px_rgba(255,255,255,0.2)] hidden lg:block"
       />
       <motion.div 
         animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [45, 90, 45] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-1/2 right-[5%] w-24 h-24 bg-yellow-400 border-[6px] border-white rounded-[10px] shadow-[8px_8px_0px_rgba(255,255,255,0.2)] hidden lg:block"
       />
    </section>
  );
}

const CARTOON_COLORS = [
  "bg-blue-400",
  "bg-pink-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-purple-400"
];

function ServiceCartoonBlock({ item, index }: { item: ServiceItem, index: number }) {
  const isEven = index % 2 === 0;
  const color = CARTOON_COLORS[index % CARTOON_COLORS.length];
  
  return (
    <motion.div
       initial={{ opacity: 0, y: 150, rotate: isEven ? -8 : 8, scale: 0.8 }}
       whileInView={{ opacity: 1, y: 0, rotate: isEven ? -2 : 2, scale: 1 }}
       viewport={{ once: false, margin: "-50px" }}
       transition={{ type: "spring", bounce: 0.6, duration: 1.5 }}
       whileHover={{ scale: 1.02, rotate: 0, y: -10 }}
       className={`relative w-full max-w-[1300px] mx-auto p-6 md:p-12 border-[6px] md:border-[8px] border-white rounded-[40px] md:rounded-[60px] shadow-[15px_15px_0px_rgba(255,255,255,0.2)] bg-[#0a0f1c] flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 mb-32 group`}
    >
       {/* Decorative Cartoon Pins */}
       <div className={`absolute -top-6 -left-6 w-12 h-12 rounded-full border-[6px] border-white ${color} shadow-[6px_6px_0px_#fff] z-20 group-hover:scale-125 transition-transform`} />
       <div className={`absolute -bottom-6 -right-6 w-12 h-12 rounded-full border-[6px] border-white ${color} shadow-[6px_6px_0px_#fff] z-20 group-hover:scale-125 transition-transform`} />

       {/* Image */}
       <div className="w-full lg:w-[45%] aspect-video lg:aspect-square relative rounded-[30px] border-[6px] border-white overflow-hidden shadow-[10px_10px_0px_rgba(255,255,255,0.2)] transform transition-transform duration-300 group-hover:-translate-y-4 group-hover:-rotate-2">
         <VideoLikeImageSequence images={item.images} interval={8000} />
         <div className={`absolute top-6 left-6 ${color} text-[#02040a] font-black text-2xl px-6 py-2 rounded-2xl border-[4px] border-white shadow-[6px_6px_0px_#fff] transform -rotate-6 z-20`}>
           #{index + 1}
         </div>
       </div>

       {/* Content */}
       <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <div className={`inline-block border-[4px] border-white px-6 py-2 rounded-full mb-8 self-start shadow-[6px_6px_0px_#fff] ${color} text-[#02040a] font-black text-lg uppercase tracking-wider transform ${isEven ? 'rotate-3' : '-rotate-3'} group-hover:rotate-0 transition-transform`}>
            {item.category}
          </div>

          <ScrubTextReveal className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] leading-[1.1]">
            {item.title}
          </ScrubTextReveal>

          <div className="bg-white/5 border-[4px] border-white/30 p-6 rounded-3xl shadow-[6px_6px_0px_rgba(255,255,255,0.1)] mb-10 transform rotate-1">
             <ScrubTextReveal className="text-white/90 text-lg md:text-xl font-bold leading-relaxed">
               {item.description}
             </ScrubTextReveal>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
             {item.features.map((feature, i) => (
                <div key={i} className={`border-[3px] border-white bg-transparent px-5 py-3 rounded-2xl shadow-[6px_6px_0px_rgba(255,255,255,0.2)] text-white font-black text-sm uppercase transform hover:-translate-y-2 transition-all cursor-pointer hover:bg-white hover:text-[#02040a]`}>
                  {feature}
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

      <div className="relative z-10 bg-[#02040a] py-32 px-4 md:px-12 lg:px-20 overflow-hidden">
        {SERVICES.map((item, index) => (
          <ServiceCartoonBlock key={item.title} item={item} index={index} />
        ))}
      </div>

    </main>
  );
}
