"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/app/components/TextReveal";

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

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsapScroll();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return <>{children}</>;
}

type ServiceItem = {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  features: string[];
};

const SERVICES: ServiceItem[] = [
  {
    title: "Transport Logistics",
    category: "Surface Network",
    description: "We provide reliable transport logistics solutions supported by a strong carrier network and efficient route planning. Our transportation services are designed to ensure the smooth movement of cargo across locations while maintaining safety, consistency, and timely delivery.",
    imageSrc: "/transport.webp",
    features: ["Route planning", "Carrier network", "Cargo safety", "Timed dispatch"],
  },
  {
    title: "Air Freight",
    category: "Time Critical",
    description: "Our air freight services are designed to support time-sensitive and high-priority shipments across international markets. Through strong partnerships with leading global carriers, we ensure fast, secure, and reliable cargo movement with smooth coordination at every stage.",
    imageSrc: "/air_freight_service.webp",
    features: ["Priority shipments", "Global network", "Secure handling", "Time-critical delivery"],
  },
  {
    title: "Sea Freight",
    category: "Ocean Network",
    description: "We offer dependable sea freight solutions that combine flexibility, cost efficiency, and global connectivity. Whether handling FCL or LCL shipments, our team ensures smooth cargo movement through trusted shipping partners and established port networks.",
    imageSrc: "/sea_freight_services.webp",
    features: ["FCL & LCL", "Global routing", "Port connectivity", "Shipment visibility"],
  },
  {
    title: "Warehousing",
    category: "Inventory Control",
    description: "Our warehousing and distribution solutions are designed to support efficient inventory management and smooth supply chain operations. With scalable warehousing capabilities and structured storage systems, we help businesses improve operational efficiency.",
    imageSrc: "/warehouse_3.webp",
    features: ["Inventory support", "Distribution handling", "Scalable storage", "Cost-efficient"],
  },
  {
    title: "Project / ODC Cargo",
    category: "Heavy Lift",
    description: "MAS Logistics specializes in handling oversized, heavy-lift, and complex cargo that demands precision planning and specialized logistics expertise. Our project and ODC cargo services are carefully designed to manage critical shipments safely and efficiently.",
    imageSrc: "/project___ODC_Cargo_services.webp",
    features: ["Heavy handling", "Route planning", "Specialized equipment", "Project execution"],
  },
];

function AlternatingServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapScroll();
    
    if (textRef.current && imageRef.current && cardRef.current) {
      // Create opposite-direction scroll effect (Parallax)
      // The visual moves slightly up, the content moves slightly down
      gsap.fromTo(
        imageRef.current,
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 min-h-[70vh] py-16`}>
      {/* Content Section */}
      <div ref={textRef} className="flex-1 w-full flex flex-col justify-center">
        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4">
          {item.category}
        </span>
        <h2 className="text-4xl lg:text-5xl font-satoshi font-bold text-white mb-6">
          {item.title}
        </h2>
        <p className="text-[var(--foreground)]/80 text-lg leading-relaxed mb-8 max-w-2xl">
          {item.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {item.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--foreground)]">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Section */}
      <div ref={imageRef} className="flex-1 w-full relative">
        <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group border border-white/5">
          <div className="absolute inset-0 bg-[var(--primary)]/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Using img tag to bypass strict next/image checks for pending .gif files */}
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] animate-[pulse_5s_ease-in-out_infinite]" 
          />
        </div>
      </div>
    </div>
  );
}

interface ServicesProps {
  isEmbedded?: boolean;
}

export default function ServicesPage({ isEmbedded = false }: ServicesProps) {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen overflow-x-hidden bg-[var(--background)] pt-32 pb-24">
        
        <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 mb-20">
          <div className="max-w-4xl">
            <TextReveal as="h1" className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-6xl lg:text-[72px] mb-8">
              Built to Simplify Global Logistics Operations
            </TextReveal>
            <TextReveal as="p" className="text-lg font-medium leading-relaxed text-[var(--foreground)]/80 lg:text-xl" delay={0.2}>
              At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain. Experience fluid logistics with our state-of-the-art alternating flow network.
            </TextReveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col gap-8 lg:gap-16">
          {SERVICES.map((item, index) => (
            <AlternatingServiceCard key={item.title} item={item} index={index} />
          ))}
        </section>

      </main>
    </SmoothScrollProvider>
  );
}
