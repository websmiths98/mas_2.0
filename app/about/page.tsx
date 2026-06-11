"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { TextReveal } from "@/app/components/TextReveal";
import aboutTeamHero from "../../public/images_frontend/about-team-logistics.webp";
import officeSpace from "../../public/images_frontend/new/office_space.webp";
import masLogo from "../../public/images_frontend/mas_without_wording.png";
import SlidingLogoMarquee, { SlidingLogoMarqueeItem } from "../components/SlidingLogoMarquee";
const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    // { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
];

// ─────────────────────────────────────────────────────────────────────────────
// UI Components for the Phone Feature Section
// ─────────────────────────────────────────────────────────────────────────────

const SignalIcon = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#edeef0" />
        <rect x="5" y="6" width="3" height="6" rx="0.6" fill="#edeef0" />
        <rect x="10" y="3" width="3" height="9" rx="0.6" fill="#edeef0" />
        <rect x="15" y="0" width="3" height="12" rx="0.6" fill="#edeef0" />
    </svg>
);
const WifiIcon = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <circle cx="8" cy="10.5" r="1.5" fill="#edeef0" />
        <path d="M4.5,7.5 Q8,5 11.5,7.5" stroke="#edeef0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M1.5,4.5 Q8,0.5 14.5,4.5" stroke="#edeef0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
);
const BatteryIcon = () => (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
        <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="#edeef0" strokeWidth="1.1" />
        <rect x="23" y="4" width="2" height="5" rx="1" fill="#edeef0" />
        <rect x="2" y="2" width="17" height="9" rx="2" fill="#edeef0" />
    </svg>
);

const GradientPen = () => (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <defs>
            <linearGradient id="pg" x1="0.2" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#a8d8f8" />
                <stop offset="40%" stopColor="#5ba6e8" />
                <stop offset="100%" stopColor="#2176c8" />
            </linearGradient>
            <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d0ecff" />
                <stop offset="100%" stopColor="#aad0f0" />
            </linearGradient>
        </defs>
        <g transform="rotate(-38 26 26)">
            <rect x="21" y="4" width="10" height="5" rx="4" fill="url(#pg2)" />
            <rect x="21" y="8" width="10" height="26" rx="2" fill="url(#pg)" />
            <polygon points="21,34 26,40 31,34" fill="#4a8fd8" />
            <polygon points="23.5,40 26,48 28.5,40" fill="#c0cdd8" />
            <rect x="22" y="9" width="3" height="20" rx="1.5" fill="white" opacity="0.25" />
        </g>
    </svg>
);

const PhoneMockup = ({ accent }: { accent: string }) => (
    <div className="relative w-full bg-[#050b29] rounded-[28px] overflow-hidden"
        style={{
            border: "1.5px solid rgba(10, 17, 40, 0.8)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)",
        }}
    >
        <div className="flex justify-between items-center px-7 pt-4 pb-1">
            <div className="flex items-center gap-2">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
            </div>
        </div>

        <div className="flex justify-between items-center px-5 py-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-blue-300/60">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M8,2 L2,8 L8,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-blue-300/60">
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M8,1 L8,12 M3,6 L8,1 L13,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2,10 L2,15 Q2,17 4,17 L12,17 Q14,17 14,15 L14,10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-blue-300/60">
                    <svg width="18" height="5" viewBox="0 0 18 5" fill="none">
                        <circle cx="2.5" cy="2.5" r="2.2" fill="currentColor" />
                        <circle cx="9" cy="2.5" r="2.2" fill="currentColor" />
                        <circle cx="15.5" cy="2.5" r="2.2" fill="currentColor" />
                    </svg>
                </button>
            </div>
        </div>

        <div className="px-6 pt-1 pb-3">
            <h3 className="text-[19px] font-bold text-[#edeef0] leading-snug">
                MAS Logistics Culture
            </h3>
        </div>

        <div className="mx-6 h-px bg-blue-900/40 mb-4" />

        <div className="px-6 mb-5">
            <p className="text-[13px] text-blue-200/70 leading-relaxed">
                Empowering businesses worldwide through innovative logistics, unwavering trust, and supply chain excellence.
            </p>
        </div>

        <div className="mx-3 mb-3">
            <div className="flex gap-2.5 mb-2.5">
                <div className="flex-1 bg-blue-900/20 rounded-2xl p-3 flex flex-col items-center gap-1.5 border border-blue-800/40">
                    <GradientPen />
                    <span className="text-[11px] font-medium text-blue-400">Values</span>
                </div>
                <div className="flex-[1.7] bg-blue-900/20 rounded-2xl overflow-hidden p-3 flex flex-col items-center justify-center border border-blue-800/40">
                    <Image
                        src={masLogo}
                        alt="MAS Logo"
                        className="w-[130px] h-auto object-contain scale-[1.3] translate-y-2"
                    />
                </div>
            </div>

            <div className="flex gap-2.5">
                <div className="flex-1 rounded-2xl overflow-hidden border border-blue-800/40 flex flex-col">
                    <div
                        className="flex-1 h-16"
                        style={{
                            background: "linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #0f172a 100%)",
                            backgroundSize: "200% 200%",
                        }}
                    />
                    <span className="text-[11px] font-medium text-blue-300 text-center py-1.5 bg-blue-900/30">Global</span>
                </div>

                <div
                    className="flex-1 rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
                >
                    <div className="flex-1 h-16" />
                    <span
                        className="text-[11px] font-bold text-[#edeef0] text-center py-1.5"
                        style={{ backgroundColor: "rgba(30, 58, 138, 0.6)" }}
                    >
                        Trust
                    </span>
                </div>

                <div className="flex-1 bg-blue-900/20 rounded-2xl p-2.5 flex flex-col items-center justify-center gap-2.5 border border-blue-800/40">
                    <div className="flex items-center w-full gap-1">
                        <div className="flex-1 h-2 rounded-full overflow-hidden bg-blue-950">
                            <div className="h-full w-2/3 rounded-full bg-[#b03b33]" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-[#b03b33] ring-2 ring-blue-900 shrink-0" />
                    </div>
                    <div className="flex items-center w-full gap-1">
                        <div className="w-4 h-4 rounded-full bg-slate-600 ring-2 ring-slate-800 shrink-0" />
                        <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-800">
                            <div className="h-full w-4/5 rounded-full bg-slate-500" />
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-blue-400">Excellence</span>
                </div>
            </div>
        </div>

        <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #050b29)" }}
        />
    </div>
);

const FeatureCard = ({
    icon,
    title,
    desc,
    delay,
    direction = "bottom",
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    delay: number;
    direction?: "left" | "right" | "bottom";
}) => {
    const initialX = direction === "left" ? -80 : direction === "right" ? 80 : 0;
    const initialY = direction === "bottom" ? 60 : 20;

    return (
        <motion.div
            initial={{ opacity: 0, y: initialY, x: initialX, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
            className="bg-[#0a1128] rounded-2xl border border-blue-900/50 hover:border-[#b03b33]/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)] p-6 flex flex-col items-center text-center gap-2.5 group"
        >
            <div className="text-blue-400 group-hover:text-[#b03b33] transition-colors mb-0.5">{icon}</div>
            <TextReveal as="h3" className="text-[15px] font-semibold text-[#edeef0]">{title}</TextReveal>
            <TextReveal as="p" className="text-[13px] text-gray-400 leading-relaxed">{desc}</TextReveal>
        </motion.div>
    );
};

const IconList = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <line x1="7" y1="6" x2="18" y2="6" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="11" x2="18" y2="11" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="16" x2="18" y2="16" stroke="#555" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="3.5" cy="6" r="1.4" fill="#555" />
        <circle cx="3.5" cy="11" r="1.4" fill="#555" />
        <circle cx="3.5" cy="16" r="1.4" fill="#555" />
    </svg>
);
const IconGrid = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="2" stroke="#555" strokeWidth="1.7" />
        <rect x="12" y="2" width="8" height="8" rx="2" stroke="#555" strokeWidth="1.7" />
        <rect x="2" y="12" width="8" height="8" rx="2" stroke="#555" strokeWidth="1.7" />
        <rect x="12" y="12" width="8" height="8" rx="2" stroke="#555" strokeWidth="1.7" />
    </svg>
);
const IconLink = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M9,12 Q7,14 8,17 Q9,20 12,20 L14,20 Q18,20 19,16 Q20,12 16,11 L14,11"
            stroke="#555" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <path d="M13,10 Q15,8 14,5 Q13,2 10,2 L8,2 Q4,2 3,6 Q2,10 6,11 L8,11"
            stroke="#555" strokeWidth="1.7" strokeLinecap="round" fill="none" />
        <line x1="8" y1="13.5" x2="14" y2="8.5" stroke="#555" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
);
const IconTable = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="#555" strokeWidth="1.7" />
        <line x1="2" y1="8" x2="20" y2="8" stroke="#555" strokeWidth="1.4" />
        <line x1="2" y1="14" x2="20" y2="14" stroke="#555" strokeWidth="1.4" />
        <line x1="8" y1="2" x2="8" y2="20" stroke="#555" strokeWidth="1.4" />
    </svg>
);
const IconGem = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#555" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h10l4 5-9 11L2 8l4-5z" />
        <path d="M2 8h18" />
        <path d="M11 19V8" />
        <path d="M6 3l5 5 5-5" />
    </svg>
);

const IconEye = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#555" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 11c2.5-5.5 15.5-5.5 18 0-2.5 5.5-15.5 5.5-18 0z" />
        <circle cx="11" cy="11" r="3" />
    </svg>
);

const CULTURE = [
    { title: "Value Creation", desc: "Creating long-term business value through reliable logistics solutions and efficient supply chain execution", icon: <IconGem /> },
    { title: "Openness", desc: "Promoting transparent communication and collaborative logistics operations across every stage of service", icon: <IconEye /> },
    { title: "Commitment", desc: "Delivering quality-driven logistics solutions focused on client success, operational excellence, and continuous growth", icon: <IconLink /> },
    { title: "Integrity", desc: "Maintaining ethical business practices and accountability in global freight and logistics management", icon: <IconTable /> },
    { title: "Quality Standards", desc: "ISO 9001:2015 certified logistics services ensuring consistent quality, operational efficiency, and reliable supply chain performance", icon: <IconList /> },
    { title: "Compliance", desc: "Ensuring regulatory compliance, cargo security, and responsible supply chain management standards", icon: <IconGrid /> },
];

type LogoItem = {
    file: string;
    bg: string;
    scale?: number;
    noFilter?: boolean;
};

const LOGOS_ROW_1: LogoItem[] = [
    { file: "Gap_logo.png", bg: "#0a1128" },
    { file: "clarks.png", bg: "#111827" },
    { file: "erasebg-transformed.png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (1).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (10).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (11).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (12).png", bg: "#111827" },
    { file: "hd_restoration_result_image (13).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (14).png", bg: "#1e1b4b" },
    { file: "adidas.png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (16).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (18).png", bg: "#111827" },
    { file: "hd_restoration_result_image (19).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (2).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (20).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (21).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (23).png", bg: "#111827" },
    { file: "hd_restoration_result_image (24).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (25).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (26).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (27).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (28).png", bg: "#111827" },
    { file: "hd_restoration_result_image (29).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (3).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (30).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (31).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (15).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (32).png", bg: "#111827" },
];

const LOGOS_ROW_2: LogoItem[] = [
    { file: "hd_restoration_result_image (33).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (34).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (35).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (36).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (37).png", bg: "#111827" },
    { file: "hd_restoration_result_image (38).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (39).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (4).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (40).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (41).png", bg: "#111827" },
    { file: "hd_restoration_result_image (42).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (43).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (44).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (45).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (46).png", bg: "#111827" },
    { file: "hd_restoration_result_image (47).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (48).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (49).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image (5).png", bg: "#1e293b" },
    { file: "hd_restoration_result_image (6).png", bg: "#111827" },
    { file: "hd_restoration_result_image (7).png", bg: "#0f172a" },
    { file: "hd_restoration_result_image (8).png", bg: "#1e1b4b" },
    { file: "hd_restoration_result_image (9).png", bg: "#0a1128" },
    { file: "hd_restoration_result_image.png", bg: "#1e293b" },
    { file: "siemens_logo.png", bg: "#111827" },
    { file: "toyo_logo.gif", bg: "#0f172a" },
    { file: "trivitron-healthcare_logo.webp", bg: "#1e1b4b" },
];


const CLIENT_LOGOS = [
    { name: "Procter & Gamble", svg: <svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="46" fontFamily="Georgia, serif" fontWeight="900" fontSize="42" fill="#003da5">P&amp;G</text></svg> },
    { name: "Suntech", svg: <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="36" fill="#666">SUNTECH</text></svg> },
    { name: "TongSon", svg: <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="36" fill="#CC0000">Tong</text><text x="86" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="36" fill="#333">Son</text></svg> },
    { name: "Vardhman", svg: <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="32" fill="#005A32">Vardhman</text></svg> },
    { name: "Siemens", svg: <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="36" fill="#009999">SIEMENS</text></svg> },
    { name: "SonoSite", svg: <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="34" fill="#0055A5">SonoSite</text></svg> },
    { name: "Classic Marble Company", svg: <svg viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="40" fontFamily="Georgia, serif" fontWeight="700" fontSize="24" fill="#333">CLASSIC MARBLE</text></svg> },
    { name: "KCC", svg: <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="46" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="42" fill="#E60000">KCC</text></svg> },
    { name: "ECCO", svg: <svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="38" fill="#1A1A1A">ecco</text></svg> },
    { name: "Hyundai", svg: <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="36" fill="#002C5F">HYUNDAI</text></svg> },
    { name: "Clarks", svg: <svg viewBox="0 0 160 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Georgia, serif" fontWeight="700" fontSize="36" fill="#005C42">Clarks</text></svg> },
    { name: "Lotus Yarns", svg: <svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="42" fontFamily="Georgia, serif" fontWeight="400" fontSize="32" fill="#E8488B">Lotus Yarns</text></svg> },
    { name: "Raymond UCO Denim Private Limited", svg: <svg viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" fill="#1A1A1A">Raymond UCO</text></svg> },
    { name: "Mindray", svg: <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="34" fill="#E60012">mindray</text></svg> },
    { name: "Renault Nissan", svg: <svg viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="28" fill="#555">RENAULT NISSAN</text></svg> },
    { name: "Huawei", svg: <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="36" fill="#E60012">HUAWEI</text></svg> },
    { name: "General Electric", svg: <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><circle cx="50" cy="30" r="26" fill="#0F62FE" /><text x="50" y="40" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="28" fill="#FFF">GE</text></svg> },
    { name: "GAP", svg: <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto"><rect x="10" y="10" width="100" height="40" fill="#002A5E" /><text x="60" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="24" fill="#FFF" letterSpacing="2">GAP</text></svg> },
];

function useParallax(value: any, distance: number) {
    return {
        y: useTransform(value, [0.3, 1], [0, distance]),
        rotateX: useTransform(value, [0.3, 1], [8, -8]),
        rotateY: useTransform(value, [0.3, 1], [-4, 4]),
        z: useTransform(value, [0.3, 1], [50, -50])
    };
}

interface AnimatedTextProps {
    text: string;
    className?: string;
    animationType?: "letters" | "words";
    duration?: number;
    delay?: number;
    staggerDelay?: number;
    initialY?: number | string;
    initialOpacity?: number;
    animateY?: number | string;
    animateOpacity?: number;
    direction?: "up" | "down";
}

const AnimatedText = ({
    text,
    className = "text-4xl font-bold",
    animationType = "words",
    duration = 0.5,
    delay = 0,
    staggerDelay = 0.03,
}: AnimatedTextProps) => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    };

    const itemVariants = {
        hidden: {
            y: "120%",
        },
        visible: {
            y: "0%",
            transition: {
                ease: [0.22, 1, 0.36, 1],
                duration: duration || 0.8
            }
        }
    };

    const renderWords = () => {
        const words = text.split(" ");
        return words.map((word, index) => (
            <span key={`word-wrap-${index}`} className="inline-flex overflow-hidden mr-[0.25em] pb-[0.1em]">
                <motion.span
                    variants={itemVariants}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            </span>
        ));
    };

    const renderLetters = () => {
        return text.split("").map((char, index) => (
            <span key={`letter-wrap-${index}`} className="inline-flex overflow-hidden pb-[0.1em]">
                <motion.span
                    variants={itemVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
                    {char}
                </motion.span>
            </span>
        ));
    };

    return (
        <motion.div
            className={cn("flex flex-wrap", className)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10% 0px" }}
        >
            {animationType === "letters" ? renderLetters() : renderWords()}
        </motion.div>
    );
};

interface AboutProps {
    isEmbedded?: boolean;
}

export default function About({ isEmbedded = false }: AboutProps) {
    const [navTheme, setNavTheme] = useState<"light" | "dark">("dark");
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Scroll Tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Parallax transforms mapped to scroll progress
    const yHeroBg = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
    const yHeroText = useTransform(scrollYProgress, [0, 0.3], ["0%", "50%"]);
    const zHeroText = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
    const rotateXHeroText = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
    const opacityHeroText = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

    // Scroll-Driven 3D Parallax using custom hook
    const col1Parallax = useParallax(scrollYProgress, -60);
    const col2Parallax = useParallax(scrollYProgress, 80);
    const col3Parallax = useParallax(scrollYProgress, -40);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section[data-theme]");
            const navbarPosition = 100; // Point where we check for theme change

            let currentTheme: "light" | "dark" = "light";

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                // If the top of the section has reached or passed our sensor point
                if (rect.top <= navbarPosition) {
                    const theme = section.getAttribute("data-theme") as "light" | "dark";
                    if (theme) currentTheme = theme;
                }
            });

            setNavTheme(currentTheme);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main ref={containerRef} className="relative min-h-screen bg-[#020721] text-[#edeef0] antialiased overflow-x-hidden [&_h1]:font-satoshi [&_h2]:font-satoshi [&_h3]:font-satoshi [&_h4]:font-satoshi [&_h5]:font-satoshi [&_h6]:font-satoshi">
            {!isEmbedded && (
                <div className="fixed top-8 left-1/2 z-[100] w-auto -translate-x-1/2">
                    <AppleGlassNav
                        items={NAV_LINKS}
                        theme={navTheme}
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

            {/* Hero — mission (Shiprocket-style lead) */}
            <section data-theme="light" className="relative flex min-h-[60vh] items-center justify-center px-6 py-32 md:py-40 overflow-hidden" style={{ perspective: "1000px" }}>
                <motion.div style={{ y: yHeroBg }} className="absolute inset-0 z-0">
                    <Image
                        src={officeSpace}
                        alt="Modern Logistics Office"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-zinc-900/75" />
                </motion.div>

                <motion.div
                    style={{ y: yHeroText, z: zHeroText, rotateX: rotateXHeroText, opacity: opacityHeroText, transformStyle: "preserve-3d" }}
                    className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                    {/* Left Side: Headline */}
                    <div className="text-left flex flex-col justify-center">
                        <div className="w-16 h-1 bg-[#b03b33] mb-8 rounded-full"></div>
                        <AnimatedText
                            text="We're on a mission to simplify logistics"
                            className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[4rem] lg:leading-[1.15] mb-4 font-satoshi"
                        />
                        <AnimatedText
                            text="make complex logistics feel simple, reliable, and human"
                            className="text-3xl font-medium tracking-tight text-zinc-200 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15] font-manrope"
                            delay={0.1}
                        />
                    </div>

                    {/* Right Side: Descriptions */}
                    <div className="text-left flex flex-col gap-10 lg:border-l lg:border-zinc-700/50 lg:pl-12 lg:py-4">
                        <div className="flex flex-col gap-3">
                            <AnimatedText
                                text="Our Approach"
                                className="text-2xl font-semibold tracking-tight text-white font-satoshi"
                                delay={0.2}
                            />
                            <AnimatedText
                                text="MAS connects businesses to dependable freight, warehousing, and customs expertise — so you can focus on products and customers, not paperwork and unknowns"
                                className="text-[17px] leading-relaxed text-zinc-200 font-manrope"
                                delay={0.3}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <AnimatedText
                                text="Network"
                                className="text-2xl font-semibold tracking-tight text-white font-satoshi"
                                delay={0.4}
                            />
                            <AnimatedText
                                text="We operate with a strong logistics network across India and international markets, supported by experienced professionals, trusted partnerships, and industry-driven expertise. Our ability to manage logistics operations efficiently across regions allows us to deliver dependable freight forwarding and supply chain solutions tailored to diverse business requirements"
                                className="text-[17px] leading-relaxed text-zinc-300 font-manrope"
                                delay={0.5}
                            />
                        </div>
                    </div>
                </motion.div>
            </section>



            {/* Trust line
            <section data-theme="light" className="bg-[#020721] px-6 py-14 md:py-20">
                <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
                    <AnimatedText text="Supporting teams who move goods across borders every day" className="text-2xl font-semibold tracking-tight text-[#edeef0] md:text-3xl font-satoshi" direction="down" />
                    <AnimatedText text="From growing brands to industrial shippers, we align service to how you actually operate." className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 font-manrope" delay={0.1} />
                </div>
            </section> */}

            {/* Our Clients — infinite marquee logo cloud (Shiprocket-style) */}
            <section data-theme="light" className="overflow-hidden bg-white py-14 md:py-20">
                <div className="mx-auto mb-10 max-w-3xl px-6 text-center flex flex-col items-center">
                    <AnimatedText text="Our clients" className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 font-manrope" />
                    <AnimatedText text="Trusted by leading companies" className="mt-2 text-2xl font-semibold tracking-tight text-black md:text-3xl font-satoshi" delay={0.1} direction="up" />
                </div>

                <div className="relative w-full flex flex-col gap-16 py-12 overflow-hidden">
                    <SlidingLogoMarquee
                        items={[...LOGOS_ROW_1, ...LOGOS_ROW_2].map((logo, idx) => ({
                            id: `logo-${idx}`,
                            content: (
                                <img
                                    src={`/logo_mas/${logo.file}`}
                                    alt="Client Logo"
                                    className="w-[180px] h-[100px] object-contain"
                                />
                            )
                        }))}
                        speed={1}
                        pauseOnHover={true}
                        enableBlur={true}
                        blurIntensity={1}
                        height="120px"
                        width="100%"
                        gap="3rem"
                        showControls={false}
                    />
                </div>
            </section>



            {/* Culture — Value grid redesigned with Uilora Phone Feature Layout */}
            <section data-theme="light" className="relative min-h-screen flex items-center justify-center bg-[#020721] py-20 px-6 font-sans overflow-hidden">
                <div className="w-full max-w-5xl flex flex-col items-center gap-14">
                    {/* ── Section heading ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.4 }}
                        className="text-center max-w-xl"
                    >
                        <AnimatedText text="Our culture" className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4 justify-center font-manrope" />
                        <h2 className="text-[2.75rem] md:text-[3.25rem] font-bold leading-[1.1] tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-slate-400 to-white text-transparent bg-clip-text">
                            Values that drive us forward
                        </h2>
                        <AnimatedText
                            text="At MAS Logistics, our values shape the way we work, build relationships, and deliver results. They reflect our commitment to operational excellence, customer satisfaction, and long-term partnerships across the global logistics and supply chain industry"
                            className="text-[15px] text-gray-400 leading-relaxed justify-center text-center font-manrope"
                            delay={0.9}
                        />
                    </motion.div>

                    {/* ── Phone + grid cards layout ── */}
                    <div className="w-full max-w-[1040px] grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-10 items-center relative z-10">
                        {/* Left cards — 3 items */}
                        <motion.div style={{ y: col1Parallax.y }} className="flex flex-col gap-4">
                            {CULTURE.slice(0, 3).map((item, idx) => (
                                <FeatureCard
                                    key={item.title}
                                    icon={item.icon}
                                    title={item.title}
                                    desc={item.desc}
                                    delay={0.4 + idx * 0.15}
                                    direction="left"
                                />
                            ))}
                        </motion.div>

                        {/* Phone — centered */}
                        <div className="flex justify-center relative order-first lg:order-none z-10">
                            <div className="relative w-full max-w-[380px]">
                                {/* Floating "700" counter tweaked for MAS */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    className="absolute -left-[72px] top-[52%] -translate-y-1/2 z-20 bg-white rounded-2xl border border-gray-100 px-4 py-3 flex flex-col items-center"
                                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.05)" }}
                                >
                                    <span className="text-[36px] font-black text-[#b03b33] leading-none">6</span>
                                    <span className="text-[11px] text-slate-500 font-semibold mt-0.5">Core Values</span>
                                </motion.div>

                                {/* Phone mockup */}
                                <motion.div
                                    initial={{ opacity: 0, y: 150, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: false, margin: "-100px" }}
                                    transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
                                >
                                    <PhoneMockup accent="#f45c51ff" />
                                </motion.div>

                                {/* Floating checkmark badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.5, delay: 0.8, type: "spring", bounce: 0.4 }}
                                    className="absolute top-[6%] -right-10 w-[66px] h-[66px] bg-[#b03b33] rounded-[20px] flex items-center justify-center z-20"
                                    style={{ boxShadow: "0 10px 28px rgba(176,59,51,0.25), 0 2px 6px rgba(0,0,0,0.15)" }}
                                >
                                    <svg width="32" height="24" viewBox="0 0 34 26" fill="none">
                                        <path d="M2,13 L12,23 L32,3" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right cards — 3 items */}
                        <motion.div style={{ y: col3Parallax.y }} className="flex flex-col gap-4">
                            {CULTURE.slice(3, 6).map((item, idx) => (
                                <FeatureCard
                                    key={item.title}
                                    icon={item.icon}
                                    title={item.title}
                                    desc={item.desc}
                                    delay={0.45 + idx * 0.15}
                                    direction="right"
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* ── Section bottom fade ── */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, #b03b33)" }}
                />
            </section>

            {/* Vision & Mission — Collage Grid */}
            <section data-theme="light" className="bg-[#020721] px-6 py-16 md:py-24 overflow-hidden">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 items-start" style={{ perspective: "1200px" }}>

                    {/* Column 1: Vision Text + Image */}
                    <motion.div style={{ ...col1Parallax, transformStyle: "preserve-3d" }} className="flex flex-col text-left">
                        <div className="mb-10 md:mb-16">
                            <AnimatedText text="Our Vision" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#edeef0] mb-4 font-satoshi" />
                            <AnimatedText
                                text="To establish a strong presence as a trusted logistics partner originating from Asia, delivering consistent value across global supply chains."
                                className="text-base leading-relaxed text-gray-500 font-manrope"
                                delay={0.1}
                            />
                        </div>
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100 shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                                alt="Team collaborating"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </motion.div>

                    {/* Column 2: 3 Images staggered */}
                    <motion.div style={{ ...col2Parallax, transformStyle: "preserve-3d" }} className="flex flex-col gap-4 md:gap-6 md:pt-16">
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
                                alt="Working together"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100 hidden md:block shadow-xl">
                            <Image
                                src={aboutTeamHero}
                                alt="MAS Team"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </motion.div>

                    {/* Column 3: 1 Image + Mission Text */}
                    <motion.div style={{ ...col3Parallax, transformStyle: "preserve-3d" }} className="flex flex-col gap-4 md:gap-6 md:pt-8">
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-100 shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop"
                                alt="Discussion"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="mt-6 md:mt-10 text-left">
                            <AnimatedText text="Our Mission" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#edeef0] mb-4 font-satoshi" />
                            <AnimatedText
                                text="Driven by our strategic base in Asia, we focus on enabling seamless logistics across key international trade routes. Our goal is to deliver dependable, efficient, and tailored solutions that support our clients’ growth and long-term success."
                                className="text-base leading-relaxed text-gray-500 mb-4 font-manrope"
                                delay={0.1}
                            />
                            <AnimatedText
                                text="&quot;Every detail matters&quot; is our motto"
                                className="text-[15px] font-semibold text-[#edeef0] font-manrope"
                                delay={0.2}
                            />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* CTA — join / help (Shiprocket closing blocks) */}
            <section data-theme="light" className="bg-[#020721]">
                {/* <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
                    <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24">
                        <h2 className="text-2xl font-semibold tracking-tight text-[#edeef0] md:text-3xl">
                            Join a team that ships the world
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-600 md:text-base">
                            We&apos;re always interested in people who care about precision, communication, and doing
                            right by the customer.
                        </p>
                        <a
                            href="mailto:careers@example.com"
                            className="mt-8 inline-flex w-fit items-center text-sm font-semibold text-[#edeef0] underline decoration-zinc-300 underline-offset-4 hover:decoration-[#edeef0]"
                        >
                            Talk to us about roles
                        </a>
                    </div>
                    <div className="relative min-h-[280px] bg-zinc-200 md:min-h-[360px]">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                            alt="Team"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div> */}
                {/* <div className="border-t border-zinc-200/80 bg-[#f0f2f5] px-6 py-14 text-center md:py-20">
                    <h2 className="text-xl font-semibold tracking-tight text-[#edeef0] md:text-2xl">
                        Let&apos;s help you move with confidence
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-zinc-600">
                        Tell us about your lanes, volumes, and constraints—we&apos;ll respond with a clear path
                        forward.
                    </p>
                    <a
                        href="/services"
                        className="mt-8 inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                    >
                        Explore services
                    </a>
                </div> */}
            </section>
        </main>
    );
}
