"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TextReveal } from "@/app/components/TextReveal";
import Image from "next/image";

// ─── Cinematic Scroll-Reveal Hook ────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold, rootMargin: "-50px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

// ─── Cinematic Reveal Component ──────────────────────────────────────────────
interface RevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "scale" | "none";
}

function Reveal({
    children,
    delay = 0,
    className = "",
    direction = "up",
}: RevealProps) {
    const { ref, visible } = useScrollReveal(0.1);

    const dirMap = {
        up: "translateY(50px)",
        down: "translateY(-50px)",
        left: "translateX(-50px)",
        right: "translateX(50px)",
        scale: "scale(0.9)",
        none: "translate(0,0)",
    };

    const transformValue = visible
        ? (direction === "scale" ? "scale(1)" : "translate(0,0)")
        : dirMap[direction];

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: transformValue,
                filter: visible ? "blur(0px)" : "blur(12px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                willChange: "opacity, transform, filter",
            }}
        >
            {children}
        </div>
    );
}

// ─── 3D Tilt Card Component with Extensive Hover Popup ─────────────────────────────────────
function PremiumTiltCard({ children, className = "", onClick, popupText }: { children: React.ReactNode, className?: string, onClick?: () => void, popupText: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.3]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    // Floating popup coordinates based on actual mouse position in px relative to container
    const popupX = useMotionValue(0);
    const popupY = useMotionValue(0);
    const smoothPopupX = useSpring(popupX, { stiffness: 300, damping: 30 });
    const smoothPopupY = useSpring(popupY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
        
        popupX.set(mouseX + 20); // offset popup
        popupY.set(mouseY + 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative w-full h-full cursor-pointer group ${className}`}
        >
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-2xl overflow-hidden transition-colors duration-500 group-hover:border-[var(--primary)]/50 group-hover:bg-[var(--secondary)]/80 group-hover:shadow-[0_0_40px_rgba(176,59,51,0.3)]">
                {children}

                {/* Realistic Glare Effect */}
                <motion.div
                    style={{
                        opacity: glareOpacity,
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 60%)",
                        left: glareX,
                        top: glareY,
                        transform: "translate(-50%, -50%)",
                    }}
                    className="absolute w-[150%] h-[150%] pointer-events-none mix-blend-overlay z-50"
                />
            </div>

            {/* Extensive Hover Popup (Cursor Follower) */}
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
                        <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                        <span className="text-white text-xs font-semibold drop-shadow-md">
                            {popupText}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const INDUSTRIES = [
    {
        name: "Automotive",
        image: "/images_frontend/truck.webp",
        description: "End-to-end supply chain integration for the global automotive sector. From Just-In-Time (JIT) parts procurement to finished vehicle distribution, we ensure production lines never halt",
        className: "md:col-span-2 md:row-span-2",
        popupText: "View Automotive Solutions"
    },
    {
        name: "Lifestyle & Fashions",
        image: "/images_frontend/overall_logistic.webp",
        description: "Agile, fast-paced logistics tailored for seasonal retail cycles, luxury apparel, and high-volume fashion distribution",
        className: "md:col-span-1 md:row-span-1",
        popupText: "View Fashion Logistics"
    },
    {
        name: "Medical Supplies",
        image: "/images_frontend/1-landscape-from-bird-eye-view-for-laem-chabang-logistic-port-anek-suwannaphoom.webp",
        description: "Precision temperature-controlled environments, cold-chain logistics, and highly secure transport networks dedicated to critical healthcare",
        className: "md:col-span-1 md:row-span-1",
        popupText: "View Medical Logistics"
    },
    {
        name: "Energy Generation",
        image: "/images_frontend/loading_container_truck.webp",
        description: "Specialized project cargo for massive energy infrastructure. We seamlessly move oversized turbines, renewable wind components, and heavy-duty traditional power generators across borders",
        className: "md:col-span-2 md:row-span-1",
        popupText: "View Energy Logistics"
    },
    {
        name: "Hightech",
        image: "/images_frontend/airline_uploader.webp",
        description: "Globally compliant, ultra-secure, and agile logistics built for the fast-evolving electronics industry. We protect fragile silicon, server racks, and advanced consumer technology",
        className: "md:col-span-1 md:row-span-2",
        popupText: "View Tech Logistics"
    },
    {
        name: "FMCG",
        image: "/fmcg.webp",
        description: "High-volume, rapid-turnaround distribution networks engineered for fast-moving consumer goods to optimize shelf availability",
        className: "md:col-span-1 md:row-span-1",
        popupText: "View FMCG Network"
    },
    {
        name: "Retail",
        image: "/images_frontend/proven_track_logistics_in_202605212031.webp",
        description: "Comprehensive retail supply chain management integrating warehousing, e-commerce fulfillment, and store replenishment to ensure products meet consumer demand instantly",
        className: "md:col-span-2 md:row-span-1",
        popupText: "View Retail Distribution"
    },
    {
        name: "Plant & Machinery",
        image: "/plant&mmachinery.webp",
        description: "Expert handling of massive out-of-gauge (OOG) cargo, break-bulk, and heavy-lift industrial machinery for manufacturing plants, mining sites, and global construction projects",
        className: "md:col-span-3 md:row-span-1",
        popupText: "View Heavy Machinery"
    }
];

interface IndustryProps {
    isEmbedded?: boolean;
}

export default function Industry({ isEmbedded = false }: IndustryProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<typeof INDUSTRIES[0] | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedIndustry) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedIndustry]);

    return (
        <main className="min-h-screen bg-[var(--background)] text-white selection:bg-[var(--primary)] selection:text-white overflow-x-hidden font-manrope [&_h1]:font-satoshi [&_h2]:font-satoshi [&_h3]:font-satoshi [&_h4]:font-satoshi [&_h5]:font-satoshi [&_h6]:font-satoshi">
            {/* ─── Cinematic Video Hero Section ─────────────────────────────────── */}
            <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center pt-40 pb-12 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Using an animated video for hero */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    >
                        <source src="/images_frontend/industry-hero.webm" type="video/webm" />
                    </video>
                    <div className="absolute inset-0 bg-[var(--background)]/50 mix-blend-multiply" />
                    {/* Cinematic Gradient Fades */}
                    <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-[var(--background)] to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[var(--background)] to-transparent z-10" />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <Reveal direction="down">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                            <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-white">Global Supply Chain Network</span>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.1}>
                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                            <span className="text-white">Industry</span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-red-400 to-[var(--secondary)]">
                                Solutions
                            </span>
                        </h1>
                    </Reveal>

                    <Reveal direction="up" delay={0.2}>
                        <p className="text-[var(--foreground)]/80 text-lg md:text-2xl font-light leading-relaxed max-w-3xl drop-shadow-lg mb-0">
                            We deliver <span className="text-white font-medium">industry-focused logistics</span> to support complex global supply chains. From transportation to customs coordination, we provide <span className="text-[var(--primary)] font-medium">reliable support</span> tailored to your business needs
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ─── Premium 3D Bento Grid Industries ───────────────────────────── */}
            <section className="relative z-20 px-4 md:px-8 max-w-[1600px] mx-auto py-24">
                <Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
                        {INDUSTRIES.map((industry, index) => (
                            <div key={industry.name} className={`${industry.className} group perspective-1000`}>
                                <PremiumTiltCard onClick={() => setSelectedIndustry(industry)} popupText={industry.popupText}>
                                    <motion.div layoutId={`card-${industry.name}`} className="w-full h-full relative">
                                        <img
                                            src={industry.image}
                                            alt={industry.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />

                                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                            <motion.h3 layoutId={`title-${industry.name}`} className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <TextReveal>{industry.name}</TextReveal>
                                            </motion.h3>

                                            <div className="overflow-hidden">
                                                <p className="text-[var(--foreground)]/90 text-sm md:text-base font-light line-clamp-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                    <TextReveal>{industry.description}</TextReveal>
                                                </p>
                                            </div>

                                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </PremiumTiltCard>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ─── Cinematic Modal Expansion ─────────────────────────────────── */}
            <AnimatePresence>
                {selectedIndustry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setSelectedIndustry(null)}
                            className="absolute inset-0 bg-black/80 cursor-zoom-out"
                        />

                        <motion.div
                            layoutId={`card-${selectedIndustry.name}`}
                            className="relative w-full max-w-6xl h-[85vh] md:h-[90vh] bg-[var(--background)] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <div className="relative w-full md:w-1/2 h-[40%] md:h-full shrink-0 overflow-hidden">
                                <motion.img
                                    layoutId={`image-${selectedIndustry.name}`}
                                    src={selectedIndustry.image}
                                    alt={selectedIndustry.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[var(--background)]" />

                                <button
                                    onClick={() => setSelectedIndustry(null)}
                                    className="absolute top-6 left-6 md:hidden w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-50 border border-white/20"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <div className="relative w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-start bg-[var(--background)] z-10 overflow-y-auto hide-scrollbar overscroll-contain">
                                <button
                                    onClick={() => setSelectedIndustry(null)}
                                    className="hidden md:flex absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-[var(--primary)]/50 backdrop-blur-md rounded-full items-center justify-center text-white transition-colors z-50 border border-white/10"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                    className="my-auto pt-12 md:pt-0"
                                >
                                    <motion.h3
                                        layoutId={`title-${selectedIndustry.name}`}
                                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-[var(--secondary)]"
                                    >
                                        <TextReveal>{selectedIndustry.name}</TextReveal>
                                    </motion.h3>

                                    <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mb-6 rounded-full" />

                                    <p className="text-base md:text-lg text-[var(--foreground)]/80 font-light leading-relaxed mb-6 md:mb-8">
                                        <TextReveal>{selectedIndustry.description}</TextReveal>
                                    </p>

                                    <div className="space-y-6">
                                        <div className="p-5 md:p-6 rounded-2xl bg-[var(--secondary)]/30 border border-white/10 backdrop-blur-md">
                                            <h5 className="font-manrope text-[var(--primary)] font-semibold tracking-wide uppercase text-xs md:text-sm mb-3">Key Logistics Offerings</h5>
                                            <ul className="text-white space-y-2 text-sm md:text-base">
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_rgba(176,59,51,0.8)] shrink-0"></span>
                                                    <span>Dedicated supply chain planning</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_rgba(176,59,51,0.8)] shrink-0"></span>
                                                    <span>Real-time global tracking visibility</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_rgba(176,59,51,0.8)] shrink-0"></span>
                                                    <span>Customs compliance & expedited clearance</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-white font-medium text-base md:text-lg mb-2">Service Excellence</h5>
                                            <p className="text-[var(--foreground)]/70 leading-relaxed font-light text-sm md:text-base">
                                                Our specialized teams operate around the clock to ensure your <span className="text-white font-medium">{selectedIndustry.name.toLowerCase()}</span> cargo reaches its destination safely and on schedule, minimizing operational downtime and maximizing your ROI.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </main>
    );
}
