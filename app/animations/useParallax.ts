import { useState, useEffect } from "react";

/**
 * Ultimate fallback Parallax Hook using standard React State.
 * This guarantees the offset updates even if Framer Motion fails to bind.
 */
export function useParallax(distance: number): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId: number;
    let lastScroll = -1;

    const updateScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      
      if (scrollY !== lastScroll) {
        lastScroll = scrollY;
        // Map 0 -> 1000px scroll to 0 -> distance
        const mapped = (scrollY / 1000) * distance;
        setOffset(mapped);
      }
      
      rafId = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    return () => cancelAnimationFrame(rafId);
  }, [distance]);

  return offset;
}
