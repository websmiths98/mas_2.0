"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { TextReveal } from "@/app/components/TextReveal";
import masIcon from "@/public/images_frontend/mas_without_wording.png";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
    //   { name: "FAQ", href: "/#section-FAQ" },
];

interface FAQItem {
    question: string;
    answer: string;
}

interface AccordionFAQBoldProps {
    accentColor?: string;
    items?: FAQItem[];
    heading?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
    {
        question: "Why choose our trucking service?",
        answer: "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer-directed convergence without revolutionary ROI.\n\ Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions",
    },
    {
        question: "Any facilities available on warehousing and storage service?",
        answer: "Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.\n\ Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis.",
    },
    {
        question: "Is it possible for logistic service providers to understand our business?",
        answer: "Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing.\n\ Holistically pontificate installed base portals after maintainable products. Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce via process-centric \"outside the box\" thinking. Completely pursue scalable customer",
    },
    {
        question: "Any speciality in our advanced green carriers?",
        answer: "Collaboratively administrate turnkey channels whereas virtual e-tailers. Objectively seize scalable metrics whereas proactive e-services. Seamlessly empower fully researched growth strategies and interoperable internal or \"organic\" sources.\n\ Credibly innovate granular internal or \"organic\" sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas",
    },
    {
        question: "How about domestic and international deliveries of collective and partial shipments?",
        answer: "Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures. Completely iterate covalent strategic theme areas via accurate e-markets.\n\ Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures",
    },
    {
        question: "Having problems with your truck, van or any kind of transportation vehicles?",
        answer: "Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster superior methodologies without market-driven best practices.\n\ Distinctively exploit optimal alignments for intuitive bandwidth. Quickly coordinate e-business applications through revolutionary catalysts for change. Seamlessly underwhelm optimal testing procedures whereas bricks-and-clicks",
    },
    {
        question: "How to get informations about our branches around the world?",
        answer: "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\n\ No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    },
};

import { ArrowUpRight } from "lucide-react";

export const AccordionFAQBold: React.FC<AccordionFAQBoldProps> = ({
    accentColor = "#ffffff",
    items = DEFAULT_ITEMS,
    heading = "FAQ",
}) => {
    const [active, setActive] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="w-full relative z-10 flex flex-col items-start">
            {/* Ambient Background layer */}
            <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden rounded-3xl">
                <motion.div
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 -left-10 w-96 h-96 bg-zinc-800 rounded-full blur-[120px]"
                />
            </div>

            <TextReveal as="h2" className="text-[#e5e4e2] text-xl sm:text-xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 sm:mb-12 uppercase text-left">
                FAQ
            </TextReveal>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-10%" }}
                className="flex flex-col items-start w-full gap-4"
            >
                {items.map((item, i) => {
                    const isActive = active === i;
                    const isHovered = hovered === i;

                    return (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="flex flex-col items-start w-full"
                        >
                            {/* Question Pill */}
                            <motion.button
                                onClick={() => setActive(isActive ? null : i)}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className={`flex items-center gap-4 px-6 py-3.5 rounded-full border transition-all duration-300 ease-out text-left max-w-full relative z-20
                                    ${isActive 
                                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                                        : isHovered 
                                            ? "bg-[#2a2a2c] text-white border-[#3a3a3c]" 
                                            : "bg-transparent text-[#e5e4e2] border-[#2a2a2c] hover:border-[#3a3a3c]"
                                    }`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="font-medium text-sm lg:text-[15px] tracking-wide leading-snug">
                                    <TextReveal>{item.question}</TextReveal>
                                </span>
                            </motion.button>

                            {/* Answer Reveal Sequence */}
                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, marginTop: 0 }}
                                        animate={{ height: "auto", marginTop: 16 }}
                                        exit={{ height: 0, marginTop: 0, transition: { delay: 0.4, duration: 0.6 } }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative w-[95%] sm:w-[85%] max-w-2xl ml-4 sm:ml-8"
                                    >
                                        {/* The Icon (Pops first at bottom right) */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 45, transition: { duration: 0.3 } }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                                            className="absolute -bottom-3 -right-3 z-10 w-9 h-9 rounded-full border-2 border-black bg-[#e5e4e2] flex items-center justify-center shadow-md"
                                        >
                                            <Image src={masIcon} alt="MAS Icon" className="w-5 h-5 object-contain opacity-80" />
                                        </motion.div>

                                        {/* The Answer Box (Reveals from bottom right) */}
                                        <motion.div
                                            initial={{ clipPath: "circle(0% at 100% 100%)" }}
                                            animate={{ clipPath: "circle(150% at 100% 100%)" }}
                                            exit={{ clipPath: "circle(0% at 100% 100%)", transition: { duration: 0.4 } }}
                                            transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="bg-[#e5e4e2] text-black p-5 sm:p-6 rounded-3xl rounded-br-xl border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] w-full relative z-0"
                                        >
                                            <p className="text-[14px] lg:text-[15px] font-medium text-gray-800 leading-relaxed whitespace-pre-line">
                                                <TextReveal>{item.answer}</TextReveal>
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

import Testimonials from "@/app/review/page";

export default function AccordionFAQBoldPage({ isEmbedded = false }: { isEmbedded?: boolean }) {
    return (
        <main className="w-full relative overflow-x-clip text-gray-900 [&_h1]:font-satoshi [&_h2]:font-satoshi [&_h3]:font-satoshi [&_h4]:font-satoshi [&_h5]:font-satoshi [&_h6]:font-satoshi" style={{ background: "#151514" }}>
            {/* ── Fixed Header Container ── */}
            {!isEmbedded && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
                    <AppleGlassNav
                        items={NAV_LINKS}
                        theme="dark"
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
            )}

            <div className="w-full flex min-h-[600px] relative border-b border-[#1f1f22]">
                {/* Left side Testimonials show off */}
                <div className="hidden lg:block lg:w-1/2 relative z-0 overflow-hidden bg-[#151514]">
                    {/* Inner wrapper to add padding to clear the fixed nav, without breaking the component's internal layout */}
                    <div className="w-full pt-8 pb-16">
                        <Testimonials />
                    </div>
                </div>

                {/* Right side FAQ show off */}
                <div className="w-full lg:w-1/2 flex flex-col items-center pt-[4rem] sm:pt-[5rem] lg:pt-[7rem] pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 overflow-x-hidden">
                    <div className="w-full max-w-[800px] flex flex-col">
                        <AccordionFAQBold />
                        {!isEmbedded && (
                            <div className="mt-16">
                                <Link href="/" className="inline-block px-8 py-4 rounded-full text-base font-semibold text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg">
                                    Back to Home
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
