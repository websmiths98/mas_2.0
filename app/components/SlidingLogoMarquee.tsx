"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
// Import your actual utility
import { cn } from "@/lib/utils"; // Adjusted path based on project
import { Pause, Play } from "lucide-react";

// --- Interfaces ---
export interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
  href?: string;
}

export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  speed?: number;
  pauseOnHover?: boolean;
  enableBlur?: boolean;
  blurIntensity?: number;
  height?: string;
  width?: string;
  gap?: string;
  scale?: number;
  direction?: "horizontal" | "vertical";
  autoPlay?: boolean;
  backgroundColor?: string;
  showGridBackground?: boolean;
  className?: string;
  onItemClick?: (item: SlidingLogoMarqueeItem) => void;
  enableSpillEffect?: boolean;
  animationSteps?: number;
  showControls?: boolean;
}

export function SlidingLogoMarquee({
  items,
  speed = 1,
  pauseOnHover = true,
  enableBlur = true,
  blurIntensity = 1,
  height = "100px",
  width = "100%",
  gap = "2rem",
  scale = 1,
  direction = "horizontal",
  autoPlay = true,
  backgroundColor = '!transparent',
  showGridBackground = false,
  className,
  onItemClick,
  enableSpillEffect = false,
  animationSteps = 8,
  showControls = true,
}: SlidingLogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [containerWidth, setContainerWidth] = useState(1000);

  // Monitor container width for responsive scaling
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleItemClick = (item: SlidingLogoMarqueeItem) => {
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
    onItemClick?.(item);
  };

  const togglePlayState = () => {
    setIsPlaying(!isPlaying);
  };

  const n = items.length;
  // Fixed item dimensions for stable 3D math
  const ITEM_WIDTH = 240; 
  const ITEM_GAP = 60; 
  
  // Robust JS math for 3D radius (avoids CSS tan() compatibility issues)
  const radius = useMemo(() => {
    if (n === 0) return 0;
    return Math.round((ITEM_WIDTH / 2 + ITEM_GAP / 2) / Math.tan(Math.PI / n));
  }, [n]);

  // Calculate responsive scale based on container width
  // Assume optimal width is ~1200px. If screen is smaller, we scale down the 3D ring.
  const responsiveScale = Math.min(1, containerWidth / 1000) * scale;

  const itemRenderer = (item: SlidingLogoMarqueeItem, index: number) => (
    <li
      key={`${item.id}-${index}`}
      className={cn(
        "absolute top-0 left-0 sliding-marquee-item text-foreground",
        "grid place-items-center cursor-pointer transition-transform duration-300 ease-in-out",
        "hover:scale-[1.1] focus:scale-[1.1] focus:outline-none focus:ring-2 focus:ring-primary",
      )}
      style={{
        width: `${ITEM_WIDTH}px`,
        height: height,
        transform: `rotateY(${index * (360 / n)}deg) translateZ(${radius}px)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      onClick={() => handleItemClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleItemClick(item);
        }
      }}
    >
      <div className="h-4/5 w-auto">{item.content}</div>
    </li>
  );



  return (
    <>
      <style>
        {`
        .sliding-marquee-container {
          --speed: ${speed};
          --duration: calc(100s / var(--speed)); 
        }

        @keyframes marquee-3d-spin {
          from { transform: translateZ(-${radius}px) rotateY(0deg); }
          to { transform: translateZ(-${radius}px) rotateY(-360deg); } 
        }

        .sliding-marquee-3d-list {
          position: absolute;
          width: ${ITEM_WIDTH}px;
          height: ${height};
          transform-style: preserve-3d;
          animation: marquee-3d-spin var(--duration) linear infinite paused;
          pointer-events: auto;
        }

        [data-play-state="running"] .sliding-marquee-3d-list {
          animation-play-state: running !important;
        }
        [data-play-state="paused"] .sliding-marquee-3d-list {
          animation-play-state: paused !important;
        }

        .sliding-marquee-resizable {
          overflow: hidden;
          width: 100%;
          height: ${height};
          position: relative;
          perspective: 2000px; /* High perspective for a premium isometric-like 3D look */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sliding-marquee-inner {
          position: relative;
          width: ${ITEM_WIDTH}px;
          height: ${height};
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(${responsiveScale});
          transition: transform 0.3s ease-out;
        }
        `}
      </style>

      <div
        ref={containerRef}
        className={cn("sliding-marquee-container relative", className)}
        style={{ width, background: backgroundColor }}
        onMouseEnter={() => pauseOnHover && setIsPlaying(false)}
        onMouseLeave={() => pauseOnHover && setIsPlaying(true)}
      >
        <div
          className="sliding-marquee-resizable"
          data-play-state={isPlaying ? "running" : "paused"}
        >
          {enableBlur && (
             <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)' }} />
          )}
          {enableBlur && (
             <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)' }} />
          )}

          <div className="sliding-marquee-inner">
            <ul className="sliding-marquee-3d-list text-foreground" aria-hidden={false}>
              {items.map((item, index) => itemRenderer(item, index))}
            </ul>
          </div>
        </div>

        {showControls && (
          <button
            onClick={togglePlayState}
            className={cn(
              "absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 text-xs",
              "bg-gray-800/50 text-white",
              "rounded-full hover:bg-gray-700/70 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary"
            )}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        )}
      </div>
    </>
  );
}

export default SlidingLogoMarquee;
