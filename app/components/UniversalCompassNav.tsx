"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UniversalCompassNav() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "#home", pos: "top-[-45px] left-1/2 -translate-x-1/2" },
    { name: "Services", href: "#services", pos: "right-[-75px] top-1/2 -translate-y-1/2" },
    { name: "Industries", href: "#industry", pos: "bottom-[-45px] left-1/2 -translate-x-1/2" },
    { name: "About", href: "#about", pos: "left-[-60px] top-1/2 -translate-y-1/2" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "industry", "about"];
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center justify-center pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(2,7,33,0.5)] transition-all duration-300 hover:bg-slate-800/60 hover:scale-110 cursor-pointer">
        
        {/* Rotating Compass Dial */}
        <motion.div
          className="absolute inset-0 w-full h-full text-[var(--foreground)]/50 p-[8px]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <path d="M50 0 L50 12 M50 88 L50 100 M0 50 L12 50 M88 50 L100 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Center Needle */}
        <div className="relative z-10 w-10 h-10 flex items-center justify-center">
           <svg className="w-10 h-10 drop-shadow-[0_0_8px_rgba(176,59,51,0.5)]" viewBox="0 0 24 24" style={{ transform: 'rotate(45deg)' }}>
            <path d="M12 2 L22 22 L12 17 L2 22 Z" fill="url(#needleGrad)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            <defs>
              <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b03b33" />
                <stop offset="50%" stopColor="#b03b33" />
                <stop offset="50%" stopColor="#edeef0" />
                <stop offset="100%" stopColor="#edeef0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute w-2 h-2 bg-[#020721] rounded-full z-20 shadow-inner"></div>
        </div>

        {/* Interactive Nav Points */}
        <AnimatePresence>
          {isHovered && (
            <>
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                    className={`absolute ${item.pos}`}
                  >
                    <a 
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={`block px-3 py-1.5 text-xs font-semibold rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center backdrop-blur-md transition-all ${
                        isActive 
                          ? 'bg-[var(--primary)] text-white shadow-[0_0_15px_rgba(176,59,51,0.6)]' 
                          : 'bg-[var(--secondary)]/80 text-[var(--foreground)] hover:bg-[var(--primary)]/80 border border-white/10'
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
