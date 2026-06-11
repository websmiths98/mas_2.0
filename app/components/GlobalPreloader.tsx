'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function GlobalPreloader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trigger the preloader on initial load and any path/query changes
    setLoading(true);
    
    // Simulate a brief delay to show the preloader (increased to 4500ms)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-[#020721] flex flex-col items-center justify-center"
        >
          {/* Logo with 3D Flip and Float Animation */}
          <motion.div
            initial={{ rotateY: -180, opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              rotateY: 0, 
              opacity: 1, 
              scale: 1,
              y: [20, 0, 5, 0] // subtle floating landing
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1], // cinematic ease out
              times: [0, 0.6, 0.8, 1] 
            }}
          >
            {/* Continuous gentle floating after reveal */}
            <motion.div
              animate={{ y: [-5, 5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.2 // start after reveal
              }}
            >
              <Image
                src="/images_frontend/mas_without_wording.png"
                alt="MAS Logistics Icon"
                width={220}
                height={110}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
