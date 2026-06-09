"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/app/components/TextReveal";

import aboutTeamHero from "../../public/images_frontend/about-team-logistics.webp";
import officeSpace from "../../public/images_frontend/new/office_space.webp";
import masLogo from "../../public/images_frontend/mas_without_wording.png";

// ─────────────────────────────────────────────────────────────────────────────
// Animated Text Component
// ─────────────────────────────────────────────────────────────────────────────
interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

const AnimatedText = ({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
}: AnimatedTextProps) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: staggerDelay, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        },
        hidden: { opacity: 0, y: 20 }
    };

    return (
        <motion.h3
            style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
                    {word}
                </motion.span>
            ))}
        </motion.h3>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Logo Ticker Array
// ─────────────────────────────────────────────────────────────────────────────
const LOGOS_ROW_1 = [
    { file: "198-1984070_philips-logo-philips-healthcare-logo-vector-hd-png.png", bg: "#0B5EAA" },
    { file: "Fuji Logo PNG Vector (EPS) Free Download.jpeg", bg: "#E31A22", scale: 1.6 },
    { file: "Raymond_logo.jpg", bg: "#222222" },
    { file: "addidas_logo.jpg", bg: "#000000" },
    { file: "alcatel_new.svg", bg: "#1F275C" },
    { file: "alstom_new.svg", bg: "#004890" },
    { file: "bosch-logo-png_seeklogo-21523.png", bg: "#E20015", scale: 1.6 },
    { file: "c-r-i-pumps-logo-png_seeklogo-288586.png", bg: "#00558C", scale: 1.8 },
    { file: "cisco-logo-png_seeklogo-30674.png", bg: "#00BCEB" },
    { file: "clarks_logo.jpg", bg: "#005C42" },
    { file: "cmc_logo.png", bg: "#2A2A2A", scale: 1.6 },
    { file: "daewoo_logo.png", bg: "#003E7E" },
    { file: "danfoss-logo-png_seeklogo-38448.png", bg: "#DF1400", scale: 1.6 },
    { file: "dg-logo-png_seeklogo-37861.png", bg: "#000000" },
    { file: "diesel-logo-png_seeklogo-41153.png", bg: "#C11F25" },
    { file: "doosan_logo.png", bg: "#0051A2" },
    { file: "ecco_logo.png", bg: "#000000" },
    { file: "emerson-logo-png_seeklogo-300567.png", bg: "#004B87", scale: 1.4 },
    { file: "essar-logo.png", bg: "#E31837", scale: 1.6 },
    { file: "essar-steel-logo-png_seeklogo-227961.png", bg: "#E31837", scale: 1.6 },
    { file: "gap_new.svg", bg: "#002A5E", noFilter: true },
    { file: "general_electric_logo.jpg", bg: "#0F62FE" },
    { file: "hella_logo.png", bg: "#222222" },
    { file: "huawei_logo.png", bg: "#E60012" },
];

const LOGOS_ROW_2 = [
    { file: "hyosung_logo.png", bg: "#00529B" },
    { file: "hyundai_with_text.svg", bg: "#002C5F", scale: 1.6 },
    { file: "infiniti-logo-png_seeklogo-249498.png", bg: "#111111" },
    { file: "ion_exchange_new.png", bg: "#00519E" },
    { file: "ishwari_logo.png", bg: "#222222" },
    { file: "jsw_logo.jpg", bg: "#D52B1E" },
    { file: "kcc_logo.jpg", bg: "#E60000" },
    { file: "kia-motors-logo-png_seeklogo-78337.png", bg: "#05141F" },
    { file: "lotus_logo.webp", bg: "#E8488B" },
    { file: "mahindra-logo-png_seeklogo-289100.png", bg: "#E31837" },
    { file: "mindray_logo.svg", bg: "#E60012", scale: 1.6 },
    { file: "nec-logo-png_seeklogo-97885 (1).png", bg: "#131A95" },
    { file: "olympus-logo-png_seeklogo-482717.png", bg: "#003366", scale: 1.6 },
    { file: "p&g_logo.jpg", bg: "#003DA5" },
    { file: "puma-logo-png_seeklogo-113791.png", bg: "#000000" },
    { file: "renault_logo.png", bg: "#333333" },
    { file: "samsung_new.svg", bg: "#1428A0" },
    { file: "schneider-electric-logo-png_seeklogo-123509.png", bg: "#3DCD58" },
    { file: "siemens_logo.png", bg: "#009999" },
    { file: "siyaram-silk-mills-ltd-logo-png_seeklogo-653187.png", bg: "#163A70", scale: 1.6 },
    { file: "sk-networks-logo-png_seeklogo-391428.png", bg: "#E4002B", scale: 1.6 },
    { file: "ssang-yong-logo-png_seeklogo-131212.png", bg: "#005596", scale: 1.6 },
    { file: "star_logo.jpg", bg: "#222222" },
    { file: "suntech_logo.jpg", bg: "#14355F" },
    { file: "tangson_logo.png", bg: "#CC0000" },
    { file: "tata_steel_logo.png", bg: "#005CA8" },
    { file: "tommy_new_2.svg", bg: "#00174F", scale: 1.6 },
    { file: "toyota-logo-png_seeklogo-141406.png", bg: "#EB0A1E" },
    { file: "trivitron-healthcare_logo.webp", bg: "#0054A4" },
    { file: "woory_logo.jpg", bg: "#222222" },
    { file: "yingli_logo.jpg", bg: "#00843D", scale: 1.6 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Interactive Ticker Component with Framer Motion
// ─────────────────────────────────────────────────────────────────────────────
const DraggableTicker = ({ logos, direction = 1 }: { logos: any[], direction?: number }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const [isHovered, setIsHovered] = useState(false);
    const popupX = useMotionValue(0);
    const popupY = useMotionValue(0);
    const smoothPopupX = useSpring(popupX, { stiffness: 300, damping: 30 });
    const smoothPopupY = useSpring(popupY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        popupX.set(e.clientX - rect.left + 20);
        popupY.set(e.clientY - rect.top + 20);
    };

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    const x = useMotionValue(0);
    const baseX = useSpring(x, { damping: 50, stiffness: 400 });

    useEffect(() => {
        let animationFrameId: number;
        let lastTime: number;
        
        // Rolling flow speed
        const speed = 50 * direction;

        const animate = (time: number) => {
            if (!lastTime) lastTime = time;
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;
            
            let newX = x.get() + speed * deltaTime;
            if (direction === -1 && newX <= -containerWidth) newX += containerWidth;
            if (direction === 1 && newX >= 0) newX -= containerWidth;

            x.set(newX);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [x, containerWidth, direction]);

    return (
        <div 
            ref={wrapperRef}
            className="overflow-hidden w-full relative group py-4 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ x: smoothPopupX, y: smoothPopupY }}
                        className="pointer-events-none absolute top-0 left-0 z-50 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2 max-w-[200px]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="8" r="1"/><circle cx="9" cy="16" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="8" r="1"/><circle cx="15" cy="16" r="1"/></svg>
                        <span className="text-white text-xs font-semibold drop-shadow-md">
                            Drag to explore
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                ref={containerRef}
                style={{ x: baseX }}
                drag="x"
                dragConstraints={{ left: -containerWidth, right: 0 }}
                dragElastic={0.1}
                onDrag={(e, info) => {
                    let newX = x.get() + info.delta.x;
                    if (direction === -1 && newX <= -containerWidth) newX += containerWidth;
                    if (direction === 1 && newX >= 0) newX -= containerWidth;
                    x.set(newX);
                }}
                className="flex w-max items-center gap-6"
            >
                {[...logos, ...logos].map((logo, idx) => (
                    <div
                        key={`logo-${idx}`}
                        className="flex h-[90px] w-[200px] flex-shrink-0 items-center justify-center rounded-[1.5rem] bg-[var(--secondary)]/30 backdrop-blur-md border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-[var(--secondary)]/50 hover:shadow-[0_0_30px_rgba(46,52,84,0.5)] overflow-hidden relative"
                        style={{ backgroundColor: `color-mix(in srgb, ${logo.bg} 20%, transparent)` }}
                    >
                        <img
                            src={`/logo_mas/${logo.file}`}
                            alt="Client Logo"
                            className="max-h-[50%] max-w-[70%] object-contain mix-blend-screen opacity-90 transition-transform duration-300 hover:scale-110"
                            draggable={false}
                            style={{
                                filter: logo.noFilter ? "none" : "grayscale(1) invert(1) brightness(4)",
                                transform: `scale(${logo.scale || 1})`
                            }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function About({ isEmbedded = false }: { isEmbedded?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const yHeroText = useTransform(scrollYProgress, [0, 0.3], ["0%", "50%"]);
    const opacityHeroText = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

    const col1Y = useTransform(scrollYProgress, [0.4, 0.8], [0, -100]);
    const col2Y = useTransform(scrollYProgress, [0.4, 0.8], [0, 100]);
    const col3Y = useTransform(scrollYProgress, [0.4, 0.8], [0, -50]);

    return (
        <main ref={containerRef} className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased overflow-x-hidden font-manrope">
            
            {/* ─── Hero Section with perfect center alignment ─── */}
            <section className="relative flex min-h-screen items-center justify-center px-6 py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={officeSpace}
                        alt="Modern Logistics Office"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/90 to-[var(--background)]" />
                </div>

                <motion.div
                    style={{ y: yHeroText, opacity: opacityHeroText }}
                    className="relative z-10 mx-auto w-full max-w-5xl text-center flex flex-col items-center gap-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                        <span className="text-xs font-medium tracking-widest uppercase text-white">About MAS Logistics</span>
                    </div>
                    
                    <AnimatedText
                        text="We're on a mission to simplify global logistics"
                        className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[1.1]"
                    />
                    
                    <AnimatedText
                        text="Making complex supply chains feel seamless, reliable, and human."
                        className="text-xl md:text-2xl lg:text-3xl font-light text-[var(--foreground)]/80 mt-4 max-w-3xl"
                        delay={0.3}
                    />

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl border-t border-white/10 pt-12"
                    >
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-[var(--primary)]" />
                                Our Approach
                            </h3>
                            <p className="text-[var(--foreground)]/70 leading-relaxed font-light">
                                MAS connects businesses to dependable freight, warehousing, and customs expertise — so you can focus on products and customers, not paperwork and unknowns.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-[var(--primary)]" />
                                Global Network
                            </h3>
                            <p className="text-[var(--foreground)]/70 leading-relaxed font-light">
                                Operating across international markets, supported by trusted partnerships and industry-driven expertise to deliver tailored supply chain solutions.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ─── Client Marquee with Smooth Drag ─── */}
            <section className="relative py-24 overflow-hidden border-y border-[var(--secondary)]/30 bg-[var(--secondary)]/10">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />
                
                <div className="mx-auto max-w-4xl text-center mb-16 px-6">
                    <h4 className="text-[var(--primary)] font-bold tracking-[0.3em] uppercase text-xs mb-4">Our Partners</h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Trusted by Industry Leaders</h2>
                </div>

                <div className="flex flex-col gap-8 relative z-0">
                    <DraggableTicker logos={LOGOS_ROW_1} direction={-1} />
                    <DraggableTicker logos={LOGOS_ROW_2} direction={1} />
                </div>
            </section>

            {/* ─── Vision & Mission ─── */}
            <section className="relative px-6 py-32 overflow-hidden">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    
                    {/* Vision Column */}
                    <motion.div style={{ y: col1Y }} className="flex flex-col gap-8">
                        <div>
                            <h4 className="text-[var(--primary)] font-bold tracking-[0.2em] uppercase text-xs mb-3">Vision</h4>
                            <h2 className="text-4xl font-bold text-white mb-6">Building The Future Of Trade</h2>
                            <p className="text-[var(--foreground)]/70 leading-relaxed font-light">
                                To establish a strong presence as a trusted logistics partner originating from Asia, delivering consistent value across global supply chains.
                            </p>
                        </div>
                        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="Vision" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 animate-[pulse_5s_ease-in-out_infinite]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
                        </div>
                    </motion.div>

                    {/* Center Images */}
                    <motion.div style={{ y: col2Y }} className="flex flex-col gap-8 md:-mt-24">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 group">
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" alt="Working" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 animate-[pulse_6s_ease-in-out_infinite]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent" />
                        </div>
                        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group">
                            <img src="/images_frontend/about-team-logistics.webp" alt="MAS Team" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 animate-[pulse_4s_ease-in-out_infinite]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
                        </div>
                    </motion.div>

                    {/* Mission Column */}
                    <motion.div style={{ y: col3Y }} className="flex flex-col gap-8">
                        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group">
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" alt="Discussion" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 animate-[pulse_7s_ease-in-out_infinite]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent" />
                        </div>
                        <div>
                            <h4 className="text-[var(--primary)] font-bold tracking-[0.2em] uppercase text-xs mb-3">Mission</h4>
                            <h2 className="text-4xl font-bold text-white mb-6">Precision In Motion</h2>
                            <p className="text-[var(--foreground)]/70 leading-relaxed font-light mb-6">
                                Driven by our strategic base in Asia, we focus on enabling seamless logistics across key international trade routes. Our goal is to deliver dependable, efficient, and tailored solutions that support our clients' growth.
                            </p>
                            <p className="text-white font-medium italic border-l-2 border-[var(--primary)] pl-4">
                                "Every detail matters is our motto"
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
