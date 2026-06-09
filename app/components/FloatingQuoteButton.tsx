"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GetQuoteForm from "./GetQuoteForm";

export default function FloatingQuoteButton() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  React.useEffect(() => {
    const handleOpenQuote = () => setIsQuoteOpen(true);
    window.addEventListener("openQuoteModal", handleOpenQuote);
    return () => window.removeEventListener("openQuoteModal", handleOpenQuote);
  }, []);

  return (
    <>
      <div className="fixed -bottom-4 right-2 sm:-bottom-6 sm:right-4 z-50 flex items-end justify-end">
        <button
          onClick={() => setIsQuoteOpen(true)}
          className="group relative flex items-center justify-center transition-transform hover:scale-105 focus:outline-none"
          aria-label="Get a Quote"
        >
          <motion.div
            className="w-32 h-32 sm:w-48 sm:h-48 origin-center"
            animate={{
              y: [0, -12, 0],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <Image
              src="/quote_container.webp"
              alt="Get a Quote"
              width={192}
              height={192}
              className="w-full h-full object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isQuoteOpen && (
          <GetQuoteForm onClose={() => setIsQuoteOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

