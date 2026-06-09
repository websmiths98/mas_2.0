"use client";
import { useState, useEffect, ReactNode } from "react"; // Added ReactNode
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    name: string;
    href: string;
};

interface NavProps {
    items: NavItem[];
    className?: string;
    theme?: "light" | "dark";
    logo?: ReactNode; // New prop for the logo
}

export const AppleGlassNav = ({ items, className, theme = "light", logo }: NavProps) => {
    const pathname = usePathname();
    const [active, setActive] = useState("");

    useEffect(() => {
        if (pathname === "/") {
            const handleScroll = () => {
                let currentActive = items[0]?.name || "Home";
                
                // Create a mapping from items and check their position from bottom to top
                for (let i = items.length - 1; i >= 0; i--) {
                    const item = items[i];
                    // Example: href="/" -> "section-home", href="/#section-services" -> "section-services"
                    let id = "";
                    if (item.href === "/") {
                        id = "section-home";
                    } else if (item.href.startsWith("/#")) {
                        id = item.href.substring(2);
                    } else {
                        id = `section-${item.href.replace("/", "")}`;
                    }
                    
                    const el = document.getElementById(id);
                    
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        // If the section top is above or near the middle of the screen
                        if (rect.top <= window.innerHeight * 0.4) {
                            currentActive = item.name;
                            break;
                        }
                    }
                }
                
                setActive(currentActive);
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll(); // initial check
            
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            const currentItem = items.find(item => item.href === pathname || item.href === `/#section-${pathname.replace(/\//g, "")}`);
            if (currentItem) {
                setActive(currentItem.name);
            } else if (pathname === "/") {
                const homeItem = items.find(item => item.href === "/");
                if (homeItem) setActive(homeItem.name);
            }
        }
    }, [pathname, items]);

    const isLight = theme === "light";

    return (
        <nav className={cn(
                "flex items-center justify-between p-1 sm:p-2 px-2 sm:px-4 gap-0 sm:gap-1 backdrop-blur-[24px] rounded-[18px] sm:rounded-[22px] transition-all duration-500 w-[96vw] sm:w-full max-w-fit mx-auto",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-white/20",
                isLight
                    ? "bg-white/40 ring-1 ring-black/5"
                    : "bg-black/30 ring-1 ring-white/10",
                className
            )}>
                
                {/* ── Logo Section ── */}
                {logo && (
                    <div className="pl-1 sm:pl-3 pr-1 sm:pr-2 flex items-center mr-0 sm:mr-1 shrink-0 scale-90 sm:scale-100 origin-left">
                        {logo}
                    </div>
                )}

                {/* ── Nav Links ── */}
                <div className="flex gap-0.5 sm:gap-1 overflow-x-auto hide-scrollbar scroll-smooth px-0.5 sm:px-1 w-full justify-between sm:justify-start">
                    {items.map((item) => {
                        const isActive = active === item.name;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setActive(item.name)}
                                className={cn(
                                    "relative px-1.5 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[13px] font-semibold tracking-tight transition-all duration-300 rounded-[12px] sm:rounded-[16px] whitespace-nowrap min-h-[44px] flex items-center justify-center",
                                    isActive
                                        ? (isLight ? "text-white" : "text-black")
                                        : isLight
                                            ? "text-zinc-800/70 hover:text-black hover:bg-white/10"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="glass-active"
                                        className={cn(
                                            "absolute inset-0 shadow-lg z-0 rounded-[16px]",
                                            isLight ? "bg-zinc-900" : "bg-white"
                                        )}
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
        </nav>
    );
};
