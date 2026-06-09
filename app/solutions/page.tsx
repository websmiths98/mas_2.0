"use client";

import React, { useRef } from "react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// Static imports for images located outside public/
import Image2PL from "@/public/images_frontend/solutions_logistics_page/2PL.webp";
import Image3PL from "@/public/images_frontend/solutions_logistics_page/3PL.webp";
import Image4PL from "@/public/images_frontend/solutions_logistics_page/end_to_end.webp";
import ImageSupplyChain from "@/public/images_frontend/solutions_logistics_page/supply_chain.webp";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    // { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
];

/**
 * Cinematic Reveal Component
 */
const RevealText = ({
    text,
    className = "",
    delay = 0,
    direction = "up",
    as: Tag = "p",
}: {
    text: string;
    className?: string;
    delay?: number;
    direction?: "up" | "down";
    as?: "p" | "h1" | "h2" | "h3";
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });

    const MotionTag =
        Tag === "h1" ? motion.h1 : Tag === "h2" ? motion.h2 : Tag === "h3" ? motion.h3 : motion.p;

    return (
        <div ref={ref} className="overflow-hidden">
            <MotionTag
                className={className}
                initial={{ y: direction === "up" ? "100%" : "-100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: direction === "up" ? "100%" : "-100%", opacity: 0 }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.21, 0.47, 0.32, 0.98],
                }}
            >
                {text}
            </MotionTag>
        </div>
    );
};

/**
 * Parallax Image Component
 */
const ParallaxImage = ({ 
    src, 
    alt, 
    className = "", 
    priority = false,
    speed = 0.1
}: { 
    src: string | StaticImageData; 
    alt: string; 
    className?: string; 
    priority?: boolean;
    speed?: number;
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}%`, `${speed * 100}%`]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="absolute -inset-y-1/4 w-full h-[150%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={priority}
                />
            </motion.div>
        </div>
    );
};

type TagVariant = "blue" | "green" | "purple" | "orange" | "slate" | "indigo";

const TagPill = ({ children, variant = "slate", delay = 0 }: { children: React.ReactNode; variant?: TagVariant; delay?: number }) => {
    const variants = {
        blue: "bg-blue-500/10 text-blue-300 border-blue-400/20 hover:border-blue-400/50 hover:bg-blue-500/20",
        green: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20 hover:border-emerald-400/50 hover:bg-emerald-500/20",
        purple: "bg-purple-500/10 text-purple-300 border-purple-400/20 hover:border-purple-400/50 hover:bg-purple-500/20",
        orange: "bg-orange-500/10 text-orange-300 border-orange-400/20 hover:border-orange-400/50 hover:bg-orange-500/20",
        slate: "bg-red-500/10  text-red-300 border-red-400/20 hover:border-red-400/50 hover:bg-red-500/20",
        indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-400/20 hover:border-indigo-400/50 hover:bg-indigo-500/20",
    };

    return (
        <motion.span 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ 
                y: { duration: 0.6, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] },
                opacity: { duration: 0.6, delay: delay }
            }}
            whileHover={{ 
                scale: 1.1, 
                rotateX: 10,
                rotateY: 5,
                z: 20,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
            }}
            className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-default transition-colors duration-300 ${variants[variant]}`}
        >
            {children}
        </motion.span>
    );
};

const AnimatedValueIcon = ({ type, label, delay = 0 }: { type: "excellence" | "reliability" | "innovation"; label: string; delay?: number }) => {
    const iconVariants = {
        excellence: (
            <motion.svg 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-400"
            >
                <motion.path 
                    d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                />
            </motion.svg>
        ),
        reliability: (
            <motion.svg 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-emerald-400"
            >
                <motion.path 
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path 
                    d="m9 12 2 2 4-4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
            </motion.svg>
        ),
        innovation: (
            <motion.svg 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-400"
            >
                <motion.path 
                    d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3, 1, 0.5], filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }}
                    transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 1] }}
                />
                <motion.circle 
                    cx="12" cy="8" r="2" fill="currentColor" opacity="0.2"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.svg>
        )
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay }}
            className="flex flex-col items-center gap-4 px-8"
        >
            <div className="w-14 h-14 rounded-[1.25rem] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner group hover:border-white/20 transition-colors duration-500">
                {iconVariants[type]}
            </div>
            <RevealText 
                text={label} 
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-black" 
                delay={delay + 0.2}
            />
        </motion.div>
    );
};

export default function Solutions() {
    return (
        <main className="min-h-screen bg-[#E5E4E2] selection:bg-black/10 [&_h1]:font-satoshi [&_h2]:font-satoshi [&_h3]:font-satoshi [&_h4]:font-satoshi [&_h5]:font-satoshi [&_h6]:font-satoshi">
            {/* Apple Glass Nav */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto">
                <div className="relative">
                    <AppleGlassNav 
                        items={NAV_LINKS} 
                        theme="light" 
                        logo={
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/mas_logo.webp"
                                    alt="Logo"
                                    width={200}
                                    height={50}
                                    className="h-9 w-30 object-contain transform scale-225 origin-centre" 
                                    priority
                                />
                            </Link>
                        }
                    />
                </div>
            </div>

            {/* Container 1: Header & Service Grid */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                {/* Header */}
                <div className="border-b border-black/100 pb-4 mb-10">
                    <RevealText
                        text="Trending Solutions"
                        className="text-3xl font-semibold uppercase tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]"
                    />
                </div>

                {/* Grid Container */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    
                    {/* Left Column (Feature Card 2PL + Global) */}
                    <div className="lg:w-7/12 flex flex-col gap-20">
                        {/* 2PL Card */}
                        <div className="group cursor-pointer space-y-6">
                            <ParallaxImage 
                                src={Image2PL} 
                                alt="2PL Logistics" 
                                className="aspect-[16/9] rounded-[2rem] shadow-2xl border border-white/5"
                                priority
                                speed={0.08}
                            />
                            <div className="space-y-4 px-2">
                                <div className="space-y-3">
                                <RevealText
                                        text="2PL: Basic Transport Services - Reliable Asset Logistics"
                                        className="text-3xl md:text-4xl font-extrabold text-black leading-tight tracking-tight"
                                    />
                                    <div className="flex flex-wrap items-center gap-2">
                                        <TagPill variant="blue" delay={0.1}>Core</TagPill>
                                        <TagPill variant="indigo" delay={0.2}>Transport</TagPill>
                                        <TagPill variant="slate" delay={0.3}>Asset Based</TagPill>
                                    </div>
                                </div>
                                <RevealText 
                                    text="2PL is designed for businesses that need reliable movement of goods from supplier to customer. MAS Logistics supports essential transportation requirements with structured execution, clear coordination, and dependable delivery."
                                    className="text-[#2A2A2A] text-lg leading-relaxed max-w-xl"
                                    delay={0.3}
                                />
                            </div>
                        </div>

                        {/* Global Card (Moved here) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-6 group cursor-pointer"
                        >
                            <ParallaxImage 
                                src={ImageSupplyChain} 
                                alt="Global" 
                                className="w-full aspect-[16/9] rounded-[2rem] shadow-2xl border border-white/5 bg-slate-900"
                                speed={0.12}
                            />
                            <div className="space-y-4 px-2">
                                <div className="space-y-3">
                                    <RevealText text="Global Trade & Compliance" className="text-3xl font-extrabold text-black tracking-tight" />
                                    <div className="flex flex-wrap gap-2">
                                        <TagPill variant="orange" delay={0.1}>Trade</TagPill>
                                        <TagPill variant="blue" delay={0.2}>Compliance</TagPill>
                                    </div>
                                </div>
                                <RevealText 
                                    text="Structured global logistics solutions with reliable trade and compliance support and efficient cargo movement across international markets with operational transparency, Trusted supply chain coordination backed by industry expertise and global connectivity."
                                    className="text-black text-lg leading-relaxed max-w-xl"
                                    delay={0.1}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column (Sidebar items with vertical parallax flow) */}
                    <div className="lg:w-5/12 flex flex-col gap-20 lg:pt-12">
                        {/* 3PL */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-6 group cursor-pointer"
                        >
                            <ParallaxImage 
                                src={Image3PL} 
                                alt="3PL" 
                                className="w-full aspect-[4/3] rounded-3xl shadow-2xl border border-white/5"
                                speed={0.12}
                            />
                            <div className="space-y-4 px-2">
                                <div className="space-y-2">
                                    <RevealText text="3PL: Freight & Warehousing" className="text-2xl font-bold text-black" />
                                    <div className="flex flex-wrap gap-2">
                                        <TagPill variant="purple" delay={0.1}>Ops</TagPill>
                                        <TagPill variant="indigo" delay={0.2}>Fulfillment</TagPill>
                                    </div>
                                </div>
                                <RevealText 
                                    text="3PL suits growing businesses that need more than transport alone. MAS Logistics manages freight forwarding, shipment coordination, warehousing, and distribution to help simplify operations."
                                    className="text-black text-base leading-relaxed"
                                    delay={0.1}
                                />
                            </div>
                        </motion.div>

                        {/* 4PL */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="flex flex-col gap-6 group cursor-pointer"
                        >
                            <ParallaxImage 
                                src={Image4PL} 
                                alt="4PL" 
                                className="w-full aspect-[4/3] rounded-3xl shadow-2xl border border-white/5"
                                speed={0.05}
                            />
                            <div className="space-y-4 px-2">
                                <div className="space-y-2">
                                    <RevealText text="4PL: Supply Chain Optimization" className="text-2xl font-bold text-black" />
                                    <div className="flex flex-wrap gap-2">
                                        <TagPill variant="green" delay={0.1}>Strategy</TagPill>
                                        <TagPill variant="orange" delay={0.2}>Opt</TagPill>
                                    </div>
                                </div>
                                <RevealText 
                                    text="4PL is built for businesses that want a fully managed logistics model. MAS Logistics handles planning, execution, and visibility across the supply chain."
                                    className="text-black text-base leading-relaxed"
                                    delay={0.1}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Container 2: Mission Section */}
            <div className="max-w-7xl mx-auto px-6 py-24 border-t border-black/100 flex flex-col items-center">
                <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-16">
                    {/* Animated Icons Section */}
                    <div className="flex justify-center items-end divide-x divide-black/100">
                        <AnimatedValueIcon type="excellence" label="Excellence" delay={0.1} />
                        <AnimatedValueIcon type="reliability" label="Reliability" delay={0.2} />
                        <AnimatedValueIcon type="innovation" label="Innovation" delay={0.3} />
                    </div>

                    <div className="space-y-6">
                        <RevealText
                            text="Logistics Solutions for Every Stage of Your Supply Chain"
                            className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-tight"
                        />
                        <RevealText 
                            text="We engineer sophisticated logistics frameworks that transform supply chains into competitive advantages, ensuring connectivity and compliance across global borders."
                            className="text-black text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto"
                            delay={0.1}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-10 border-t border-white/10 text-center bg-black/10">
                <RevealText 
                    text={`\u00A9 ${new Date().getFullYear()} MAS Logistics. Engineering Global Movement.`}
                    className="text-black text-[10px] font-bold tracking-[0.2em] uppercase"
                    delay={0.1}
                />
            </footer>
        </main>
    );
}