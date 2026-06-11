"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  motion,
  useScroll,
  useTransform,
  animate,
  useInView,
  AnimatePresence,
} from "framer-motion";
// import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { TextReveal } from "@/app/components/TextReveal";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Globe2, Activity, Plane, Ship, Truck } from "lucide-react";

// Inline fallback for conditional class joining
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// ============================================================================
// DATA & CONSTANTS
// ============================================================================

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#section-services" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
];

const HUBS = [
  { id: "chennai", label: "Chennai", location: [13.0827, 80.2707] },
  { id: "australia", label: "Australia", location: [-25.2744, 133.7751] },
  // { id: "bangladesh", label: "Bangladesh", location: [23.6850, 90.3563] },
  { id: "belgium", label: "Belgium", location: [50.5039, 4.4699] },
  { id: "cambodia", label: "Cambodia", location: [12.5657, 104.9910] },
  { id: "canada", label: "Canada", location: [56.1304, -106.3468] },
  { id: "china", label: "China", location: [35.8617, 104.1954] },
  { id: "colombia", label: "Colombia", location: [4.5709, -74.2973] },
  { id: "france", label: "France", location: [46.2276, 2.2137] },
  { id: "germany", label: "Germany", location: [51.1657, 10.4515] },
  { id: "iran", label: "Iran", location: [32.4279, 53.6880] },
  { id: "iraq", label: "Iraq", location: [33.2232, 43.6793] },
  { id: "indonesia", label: "Indonesia", location: [-0.7893, 113.9213] },
  { id: "japan", label: "Japan", location: [36.2048, 138.2529] },
  { id: "korea", label: "Korea", location: [35.9078, 127.7669] },
  { id: "malaysia", label: "Malaysia", location: [4.2105, 101.9758] },
  { id: "mauritius", label: "Mauritius", location: [-20.3484, 57.5522] },
  { id: "morocco", label: "Morocco", location: [31.7917, -7.0926] },
  { id: "netherlands", label: "Netherlands", location: [52.1326, 5.2913] },
  // { id: "pakistan", label: "Pakistan", location: [30.3753, 69.3451] },
  { id: "panama", label: "Panama", location: [8.5380, -80.7821] },
  { id: "philippines", label: "Philippines", location: [12.8797, 121.7740] },
  { id: "singapore", label: "Singapore", location: [1.3521, 103.8198] },
  { id: "south-africa", label: "South Africa", location: [-30.5595, 22.9375] },
  // { id: "sri-lanka", label: "Sri Lanka", location: [7.8731, 80.7718] },
  { id: "switzerland", label: "Switzerland", location: [46.8182, 8.2275] },
  // { id: "taiwan", label: "Taiwan", location: [23.6978, 120.9605] },
  { id: "thailand", label: "Thailand", location: [15.8700, 100.9925] },
  { id: "turkey", label: "Turkey", location: [38.9637, 35.2433] },
  { id: "uk", label: "UK", location: [55.3781, -3.4360] },
  { id: "usa", label: "USA", location: [37.0902, -95.7129] },
  { id: "vietnam", label: "Vietnam", location: [14.0583, 108.2772] },
];

const ROUTES = HUBS.filter(hub => hub.id !== "chennai").map(hub => ({
  id: `chennai-${hub.id}`,
  label: `Chennai ↔ ${hub.label}`,
  from: [13.0827, 80.2707] as [number, number],
  to: hub.location as [number, number],
}));

const NETWORK_STATS = [
  { value: 58, suffix: "+", label: "Operational Members" },
  { value: 270, suffix: "+", label: "Group Strength" },
  { value: 80, suffix: "+", label: "Global Destinations" },
];

const SIMULATED_SHIPMENTS = [
  { id: 1, industry: "Automotive", route: "Chennai (MAA) ➔ Antwerp (ANR)", status: "In Transit", type: "Ocean", code: "MAS-902A" },
  { id: 2, industry: "Retail", route: "New York (JFK) ➔ Mumbai (BOM)", status: "Customs Cleared", type: "Air", code: "MAS-441F" },
  { id: 3, industry: "Healthcare", route: "Frankfurt (FRA) ➔ Hyderabad (HYD)", status: "Temp Stable (+4.2°C)", type: "Cold Chain", code: "MAS-881C" },
  { id: 4, industry: "Electronics", route: "Shenzhen (SZX) ➔ Bangalore (BLR)", status: "Out for Delivery", type: "Express", code: "MAS-512E" },
  { id: 5, industry: "Chemicals", route: "Chennai (MAA) ➔ Singapore (SIN)", status: "Vessel Departed", type: "Ocean", code: "MAS-308G" },
  { id: 6, industry: "E-Commerce", route: "London (LHR) ➔ Delhi (DEL)", status: "Sorted & Dispatched", type: "Air", code: "MAS-705B" },
];

function TelemetryFeed() {
  const [events, setEvents] = useState(SIMULATED_SHIPMENTS.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        const currentIds = prev.map(e => e.id);
        const remaining = SIMULATED_SHIPMENTS.filter(e => !currentIds.includes(e.id));
        const nextItem = remaining.length > 0
          ? remaining[Math.floor(Math.random() * remaining.length)]
          : SIMULATED_SHIPMENTS[Math.floor(Math.random() * SIMULATED_SHIPMENTS.length)];

        return [nextItem, prev[0], prev[1]];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 h-[155px] overflow-hidden mt-1 font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 shrink-0">
        <span className="text-zinc-500 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          Live Logistics Stream
        </span>
        <span className="text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded tracking-wide text-[7px] font-bold">
          SYS.OK
        </span>
      </div>
      <div className="relative flex-1 flex flex-col gap-1.5">
        {events.map((event, index) => (
          <div
            key={event.id}
            style={{ opacity: index === 0 ? 1 : index === 1 ? 0.5 : 0.25 }}
            className="flex flex-col py-1 text-[10px] border-b border-white/[0.02] transition-opacity duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-bold uppercase tracking-tight">
                {event.industry}
              </span>
              <span className="text-zinc-600 text-[8px]">{event.code}</span>
            </div>
            <div className="text-zinc-300 font-medium tracking-tight truncate mt-0.5">{event.route}</div>
            <div className="flex items-center justify-between text-zinc-500 text-[9px] mt-0.5">
              <span>{event.type} freight</span>
              <span className="flex items-center gap-1 text-[8px]">
                <span className={cn(
                  "h-1 w-1 rounded-full",
                  event.status.includes("Stable") || event.status.includes("Cleared") || event.status.includes("Delivery")
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                )} />
                {event.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QualityRadar() {
  const [scanState, setScanState] = useState("Idle");
  const [lastScan, setLastScan] = useState("--:--:--");

  useEffect(() => {
    setLastScan(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setScanState("Scanning");
      setTimeout(() => {
        setScanState("Passed");
        setLastScan(new Date().toLocaleTimeString());
      }, 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2.5 mt-1 font-mono text-[10px] h-[155px] justify-between">
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 shrink-0">
        <span className="text-zinc-500 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
          <span className={cn(
            "h-1 w-1 rounded-full transition-colors duration-300",
            scanState === "Scanning" ? "bg-amber-500 animate-pulse" : "bg-purple-500"
          )} />
          Continuous Quality Scan
        </span>
        <span className={cn(
          "px-1 py-0.5 rounded text-[7px] font-bold transition-all duration-300",
          scanState === "Scanning"
            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
        )}>
          {scanState.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-4 h-[115px] pb-1">
        <div className="relative h-20 w-20 rounded-full border border-white/5 bg-transparent overflow-hidden flex items-center justify-center shrink-0">
          <div className="absolute h-14 w-14 rounded-full border border-white/[0.02]" />
          <div className="absolute h-8 w-8 rounded-full border border-white/[0.01]" />
          <div className="absolute h-full w-[1px] bg-white/[0.03]" />
          <div className="absolute w-full h-[1px] bg-white/[0.03]" />

          <div className="absolute inset-0 origin-center animate-[spin_5s_linear_infinite]" style={{
            background: "conic-gradient(from 0deg at 50% 50%, rgba(168,85,247,0.1) 0deg, rgba(168,85,247,0) 90deg)"
          }} />

          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute top-5 left-12 h-1 w-1 rounded-full bg-purple-400/80 shadow-[0_0_6px_rgba(168,85,247,0.6)]"
          />
          <motion.div
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
            className="absolute bottom-6 left-5 h-0.5 w-0.5 rounded-full bg-blue-400/80 shadow-[0_0_4px_rgba(59,130,246,0.6)]"
          />

          <span className="absolute bottom-1 text-[6.5px] text-purple-400/80 font-bold uppercase tracking-widest bg-black/40 px-1 rounded">
            QA-SCAN
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between h-full py-0.5 text-zinc-400 font-mono">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-0.5">
              <span>SOP Audits:</span>
              <span className="text-white font-bold text-right">100% OK</span>
            </div>
            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-0.5">
              <span>Cold Chain Temp:</span>
              <span className="text-emerald-400 font-bold text-right">STABLE</span>
            </div>
            <div className="flex justify-between items-center text-[9px] border-b border-white/5 pb-0.5">
              <span>Fleet GPS Locks:</span>
              <span className="text-white font-bold text-right">28/28 OK</span>
            </div>
          </div>
          <div className="text-[7.5px] text-zinc-500 flex justify-between shrink-0">
            <span>LAST SCAN:</span>
            <span className="text-purple-300/80 font-bold">{lastScan}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const PING_DESTINATIONS = [
  { code: "SIN", name: "Singapore Hub", basePing: 42, ip: "103.8.19.12" },
  { code: "RTM", name: "Rotterdam Hub", basePing: 138, ip: "52.13.29.11" },
  { code: "LAX", name: "Los Angeles Hub", basePing: 215, ip: "37.9.71.29" },
  { code: "LHR", name: "London Hub", basePing: 112, ip: "55.3.78.10" },
];

function PingMonitor() {
  const [selectedHub, setSelectedHub] = useState(PING_DESTINATIONS[0]);
  const [currentPing, setCurrentPing] = useState(PING_DESTINATIONS[0].basePing);

  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 7) - 3;
      setCurrentPing(Math.max(10, selectedHub.basePing + fluctuation));
    }, 1500);
    return () => clearInterval(interval);
  }, [selectedHub]);

  return (
    <div className="flex flex-col gap-2.5 mt-1 font-mono text-[10px] h-[155px] justify-between">
      <div className="flex gap-1 overflow-x-auto pb-1 select-none scrollbar-none shrink-0 border-b border-white/5">
        {PING_DESTINATIONS.map((dest) => (
          <button
            key={dest.code}
            onClick={() => {
              setSelectedHub(dest);
              setCurrentPing(dest.basePing);
            }}
            className={cn(
              "px-1.5 py-0.5 text-[8px] font-bold transition-all duration-300 cursor-pointer relative",
              selectedHub.code === dest.code
                ? "text-blue-400"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {dest.code}
            {selectedHub.code === dest.code && (
              <motion.div layoutId="activeHubIndicator" className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-between pt-2 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-zinc-300 font-bold truncate max-w-[120px]">{selectedHub.name.toUpperCase()}</span>
            <span className="text-zinc-600 text-[8px] tracking-wide mt-0.5">IP: {selectedHub.ip}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-black text-blue-400 tabular-nums">{currentPing} ms</span>
            <span className="text-[7.5px] text-emerald-500 font-semibold tracking-widest mt-0.5">SYS.LIVE</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-1.5 text-[8px] text-zinc-500 pt-2">
          <div className="flex flex-col gap-0.5 shrink-0">
            <span className="text-zinc-400 font-bold">MAA.MAIN</span>
            <span>GATEWAY ➔</span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/80 via-indigo-500/30 to-blue-500/80 relative overflow-hidden">
            <motion.div
              animate={{ left: ["-20%", "120%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute h-full w-[20%] bg-white/70 blur-[1px]"
            />
          </div>
          <div className="flex flex-col gap-0.5 items-end text-right shrink-0">
            <span className="text-zinc-300 font-bold">{selectedHub.code}.HUB</span>
            <span className="text-emerald-400">ACTIVE ➔</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const NETWORK_HIGHLIGHTS = [
  { label: "Multi-Industry Support", icon: Activity, detail: "Sector-Specific Logistics" },
  { label: "ISO 9001:2015 Certified", icon: ShieldCheck, detail: "Quality Management System" },
  { label: "India & International", icon: Globe2, detail: "Global Operations Network" },
];

const STEP_IMAGES = [
  "/images_frontend/Large-scale_freight_forwarding_warehouse_with_202605212030.jpeg",
  "/sea_freight_services.webp",
  "/images_frontend/magnific_create-a-image-of-logisti_3013259754.webp",
  "/images_frontend/proven_track_logistics_in_202605212031_v2.webp",
  "/bg_global.png",
];

const WORKFLOW_STEPS = [
  {
    num: "01",
    shortLabel: "E2E Support",
    title: "End-to-End Supply Chain Support",
    sub: "Complete logistics coordination from origin to final destination with streamlined cargo movement and operational control.",
  },
  {
    num: "02",
    shortLabel: "Planning",
    title: "Efficient Planning & Execution",
    sub: "Structured shipment planning and coordinated execution designed to meet timelines and operational requirements.",
  },
  {
    num: "03",
    shortLabel: "Warehousing",
    title: "Integrated Warehousing & Dispatch",
    sub: "Optimized warehousing, storage, and dispatch operations ensuring efficient inventory flow and timely cargo movement.",
  },
  {
    num: "04",
    shortLabel: "Visibility",
    title: "Real-Time Process Visibility",
    sub: "Transparent logistics workflows and coordinated systems providing better shipment visibility and operational tracking.",
  },
  {
    num: "05",
    shortLabel: "Delivery",
    title: "Consistent & Timely Delivery",
    sub: "Reliable freight execution focused on safe cargo handling, timely delivery, and consistent logistics performance.",
  },
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function Counter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [to, isInView]);
  return <span ref={nodeRef}>0</span>;
}

function ScrollRevealText({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// MAIN VISUAL COMPONENTS
// ============================================================================

function Globe({ isMobile }: { isMobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const phiRef = useRef(1.40); // Start near Chennai
  const widthRef = useRef(0);

  const isMobileRef = useRef(isMobile);
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  const markers = useMemo(
    () =>
      HUBS.map((hub) => ({
        location: hub.location as [number, number],
        size: 0.04,
        id: hub.id,
      })),
    []
  );

  const arcs = useMemo(
    () =>
      ROUTES.map((route) => ({
        from: route.from as [number, number],
        to: route.to as [number, number],
        id: route.id,
        color: [0.7, 0.75, 0.85] as [number, number, number],
      })),
    []
  );

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let raf = 0;
    let ro: ResizeObserver | null = null;

    const initGlobe = () => {
      const fit = () => {
        if (!container) return;
        const w = Math.max(320, container.clientWidth);
        widthRef.current = w;
        canvas.width = w * 2;
        canvas.height = w * 2;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${w}px`;
        globe?.update({ width: w * 2, height: w * 2 });
      };

      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: 1000,
        height: 1000,
        phi: 1.40,
        theta: 0.23,
        dark: 1,
        diffuse: 1.2,
        scale: 0.83,
        mapSamples: 32000,
        mapBrightness: 6.0,
        baseColor: [0.1, 0.15, 0.3], // Deeper, more subtle slate blue
        markerColor: [1.0, 1.0, 1.0], // Clean white markers
        glowColor: [0.05, 0.1, 0.25], // Subtle deep glow
        offset: isMobileRef.current ? [0, 150] : [100, 0],
        markers,
        arcs,
        arcColor: [0.7, 0.75, 0.85], // Elegant silver/light-blue arcs
        arcWidth: 0.5, // Thinner, more delicate lines
        arcHeight: 0.4,
        markerElevation: 0.04,
      });

      fit();

      ro = new ResizeObserver(() => fit());
      ro.observe(container);

      const animateRaf = () => {
        if (!dragging.current) {
          phiRef.current += 0.005;
        }
        phiRef.current += velocity.current;
        velocity.current *= 0.92;
        globe?.update({
          phi: phiRef.current,
          theta: 0.23,
          offset: isMobileRef.current ? [0, 150] : [100, 0],
        });
        raf = requestAnimationFrame(animateRaf);
      };
      animateRaf();
    };

    // Use a small timeout to prevent React 18 Strict Mode from instantly
    // creating and destroying the WebGL context, which leaves the canvas dead.
    const timeoutId = setTimeout(initGlobe, 50);

    return () => {
      clearTimeout(timeoutId);
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (globe) {
        globe.destroy();
      }
    };
  }, [markers, arcs]);

  return (
    <div ref={containerRef} className="relative aspect-square w-full select-none">
      {/* Scalable background to allow mix-blend-screen to work without a sharp halo. The globe radius is ~41.5%, so we fade to transparent precisely at that edge. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#020617_38%,transparent_42%)] pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none mix-blend-screen drop-shadow-[0_0_60px_rgba(59,130,246,0.25)]"
        onPointerDown={(e) => {
          dragging.current = true;
          lastX.current = e.clientX;
          velocity.current = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const dx = e.clientX - lastX.current;
          lastX.current = e.clientX;
          velocity.current = dx * 0.00035;
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.style.cursor = "grab";
        }}
      />
      {HUBS.map((hub) => (
        <div
          key={hub.id}
          className="absolute"
          style={{
            positionAnchor: `--cobe-${hub.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            opacity: `var(--cobe-visible-${hub.id}, 0)`,
            transform: "translate(-50%, -12px)",
            transition: "opacity 300ms ease",
          } as React.CSSProperties}
        >
          <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 shadow-2xl backdrop-blur-xl">
            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-white/90">
              {hub.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// SECTION PARALLAX IMAGE COMPONENT
// ============================================================================

function ParallaxImage({ src, active, isMobile }: { src: string; active: boolean; isMobile: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-slate-950">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: isMobile ? "0%" : y }}
      >
        <Image
          src={src}
          alt="Workflow Background"
          fill
          sizes="(max-w-768px) 100vw, 50vw"
          priority
          className={cn(
            "object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active ? "scale-[1.15] opacity-100 brightness-110 blur-0" : "scale-[1.05] opacity-40 blur-[2px]"
          )}
        />
      </motion.div>
    </div>
  );
}

function ParallaxSection({ children, speed = 1, className, isMobile }: { children: React.ReactNode, speed?: number, className?: string, isMobile?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y: isMobile ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

function DimensionShifter({ steps, images, isMobile }: { steps: typeof WORKFLOW_STEPS, images: typeof STEP_IMAGES, isMobile: boolean }) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".h-item");
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (sectionRef.current as unknown as HTMLElement).offsetWidth
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="w-full bg-[var(--background)] py-10 md:py-14 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)] border-t border-[var(--secondary)]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 space-y-8 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[var(--primary)]" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-[var(--primary)] uppercase">Our Working Approach</span>
          </div>
          <h2 aria-label="How We Work" className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {"How We".split(" ").map((word, i) => (
              <motion.span
                aria-hidden="true"
                key={`s2w1-${i}`}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
            {"Work".split(" ").map((word, i) => (
              <motion.span
                aria-hidden="true"
                key={`s2w2-${i}`}
                style={{ display: "inline-block", marginRight: "0.25em", paddingBottom: "0.1em" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4 + (2 + i) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>

      <div ref={sectionRef} className="flex flex-nowrap w-[500%] h-[500px] md:h-[450px]">
        {steps.map((step, i) => (
          <div key={step.num} className="h-item w-screen flex-shrink-0">
            <div className="relative w-full h-full overflow-hidden border-r border-blue-500/20 shadow-2xl shadow-blue-500/5">
              <ParallaxImage src={images[i]} active={true} isMobile={isMobile} />
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-0 bg-neutral-950/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-100" />
              </div>

              <div className="relative h-full w-full flex flex-col justify-between p-6 md:p-8 z-20">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-blue-400 flex-shrink-0 backdrop-blur-md">
                  <span className="text-lg font-black tracking-tight">{step.num}</span>
                </div>

                <div className="mt-6 md:mt-0 max-w-xl overflow-hidden w-full">
                  <h4 className="text-white font-extrabold text-xl md:text-2xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 drop-shadow-md truncate">
                    {step.title}
                  </h4>
                  <p className="text-zinc-200 text-sm md:text-base font-normal leading-relaxed drop-shadow">
                    {step.sub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function NetworkClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden selection:bg-[var(--primary)]/30">

      {/* Absolute Background Decor with Cinematic Scroll Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <ParallaxSection speed={0.4} isMobile={isMobile} className="absolute w-full h-full">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/10 rounded-full blur-[150px]" />
        </ParallaxSection>
        <ParallaxSection speed={-0.2} isMobile={isMobile} className="absolute w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--secondary)]/20 rounded-full blur-[120px]" />
        </ParallaxSection>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center">

          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 z-20 text-center lg:text-left pt-12 lg:pt-0">
            <h3 aria-label="A Strong Network Built for Global Logistics" className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight text-white leading-[1.1]">
              {"A Strong Network".split(" ").map((word, i) => (
                <motion.span
                  aria-hidden="true"
                  key={`w1-${i}`}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {word}
                </motion.span>
              ))}

              <br className="hidden lg:block" />

              {"Built for".split(" ").map((word, i, arr) => (
                <motion.span
                  aria-hidden="true"
                  key={`w2a-${i}`}
                  style={{ display: "inline-block", marginRight: i === arr.length - 1 ? "0" : "0.25em", paddingBottom: "0.1em" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + (3 + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-red-500 to-[var(--foreground)]"
                >
                  {word}
                </motion.span>
              ))}

              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.6 }}
                style={{ display: "inline-flex", marginLeft: "0.15em", marginRight: "0.3em", verticalAlign: "middle" }}
                className="relative -top-1 lg:-top-2 items-center justify-center bg-[var(--primary)] text-white rounded-lg md:rounded-xl p-1.5 md:p-2 shadow-[0_8px_16px_rgba(176,59,51,0.3),inset_0_3px_5px_rgba(255,255,255,0.4)]"
              >
                <Plane className="w-6 h-6 lg:w-8 lg:h-8" />
              </motion.span>

              <br className="hidden lg:block" />

              {"Global".split(" ").map((word, i, arr) => (
                <motion.span
                  aria-hidden="true"
                  key={`w2b-${i}`}
                  style={{ display: "inline-block", marginRight: i === arr.length - 1 ? "0" : "0.25em", paddingBottom: "0.1em" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + (5 + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--foreground)]"
                >
                  {word}
                </motion.span>
              ))}

              <motion.span
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.8 }}
                style={{ display: "inline-flex", marginLeft: "0.15em", marginRight: "0.3em", verticalAlign: "middle" }}
                className="relative -top-1 lg:-top-2 items-center justify-center bg-[var(--secondary)] text-white rounded-lg md:rounded-xl p-1.5 md:p-2 shadow-[0_8px_16px_rgba(46,52,84,0.3),inset_0_3px_5px_rgba(255,255,255,0.4)]"
              >
                <Ship className="w-6 h-6 lg:w-8 lg:h-8" />
              </motion.span>

              <br className="hidden lg:block" />

              {"Logistics".split(" ").map((word, i, arr) => (
                <motion.span
                  aria-hidden="true"
                  key={`w2c-${i}`}
                  style={{ display: "inline-block", marginRight: i === arr.length - 1 ? "0" : "0.25em", paddingBottom: "0.1em" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + (7 + i) * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--foreground)]"
                >
                  {word}
                </motion.span>
              ))}

              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", bounce: 0.6, delay: 1.0 }}
                style={{ display: "inline-flex", marginLeft: "0.15em", verticalAlign: "middle" }}
                className="relative -top-1 lg:-top-2 items-center justify-center bg-[var(--primary)] text-white rounded-lg md:rounded-xl p-1.5 md:p-2 shadow-[0_8px_16px_rgba(176,59,51,0.3),inset_0_3px_5px_rgba(255,255,255,0.4)]"
              >
                <Truck className="w-6 h-6 lg:w-8 lg:h-8" />
              </motion.span>
            </h3>

            <TextReveal
              as="p"
              delay={0.2}
              className="text-[var(--foreground)]/80 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              With a well-established operational base in India and an expanding global logistics network, MAS Logistics combines industry experience, trusted partnerships, and proven systems to ensure consistent service delivery and supply chain efficiency
            </TextReveal>
          </div>

          {/* Right Globe */}
          <div className="w-full lg:w-1/2 absolute lg:relative right-0 top-1/4 lg:top-auto z-10 opacity-30 lg:opacity-100 mix-blend-screen lg:mix-blend-normal">

            {/* Floating Network Stats Overlay */}
            <div className="hidden lg:flex absolute -left-32 xl:-left-52 top-1/2 -translate-y-1/2 -mt-15 flex-col gap-14 z-40 w-64">
              {NETWORK_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className={cn(
                    "px-4 py-2 flex flex-col items-center justify-center w-full",
                    i === 0 ? "ml-8" : i === 1 ? "-ml-12" : "ml-8"
                  )}
                >
                  <div className="text-4xl font-extrabold text-white flex items-baseline justify-center gap-1">
                    <Counter to={stat.value} />
                    <span className="text-[var(--primary)]">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] uppercase text-[var(--foreground)]/60 font-bold tracking-widest mt-2 text-center">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="w-[150%] max-w-[900px] -ml-[25%] lg:-ml-[10%] lg:w-[130%]">
              <Globe isMobile={isMobile} />
            </div>
          </div>
        </div>
      </section>

      {/* Subsequent Content Sections */}
      <div className="relative z-30 w-full">

        {/* ── SECTION 1: GLOBAL REACH MAP ── */}
        {false && (
          <section className="relative w-full overflow-hidden border-y border-white/5 bg-[#020617]">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80"
                src="/images_frontend/CSS_object-cover_property_scales…_202605221545.webm"
              />
              {/* Minimal gradient overlays for maximum brightness while keeping text readable */}
              <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-[#020617]/30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 py-24 space-y-10">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-black" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-black uppercase">Global Reach Map</span>
              </div>
              <h2 aria-label="Connected Across Global Trade Routes" className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {"Connected Across".split(" ").map((word, i) => (
                  <motion.span
                    aria-hidden="true"
                    key={`s1w1-${i}`}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                {"Global Trade Routes".split(" ").map((word, i) => (
                  <motion.span
                    aria-hidden="true"
                    key={`s1w2-${i}`}
                    style={{ display: "inline-block", marginRight: "0.25em", paddingBottom: "0.1em" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.4 + (2 + i) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-900 to-blue-800 drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              <ScrollRevealText delay={0.1}>
                <p className="text-zinc-400 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                  Our international network enables seamless cargo movement and supply chain coordination across key global markets.
                </p>
              </ScrollRevealText>

              <div className="relative z-10 flex flex-wrap gap-2 md:gap-3 pt-6">
                {HUBS.filter(h => h.id !== "chennai").map((hub, i) => (
                  <motion.div
                    key={hub.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.02 }}
                    viewport={{ once: false }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default group relative px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:border-blue-800/60 hover:bg-blue-900/20 transition-all duration-300"
                  >
                    <span className="text-xs md:text-sm font-medium tracking-wide text-zinc-400 group-hover:text-blue-400 transition-colors duration-300">
                      {hub.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SECTION 2: OUR WORKING APPROACH (GSAP Dimension Shifter) ── */}
        <DimensionShifter steps={WORKFLOW_STEPS} images={STEP_IMAGES} isMobile={isMobile} />

        {/* <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 space-y-40 mt-32">
          <section className="py-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 blur-3xl opacity-35 pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {NETWORK_HIGHLIGHTS.map((item, i) => (
                <ScrollRevealText key={i} delay={i * 0.05} className="h-full">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative flex flex-col justify-between h-full group p-6 -m-6 rounded-3xl hover:bg-white/[0.02] hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] transition-all duration-500"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.02] text-purple-400 group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-all duration-500 shadow-md">
                        <item.icon size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-bold text-lg tracking-tight mb-1 transition-colors duration-500">{item.label}</h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold transition-colors duration-500">{item.detail}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/[0.03]">
                      {i === 0 && <TelemetryFeed />}
                      {i === 1 && <QualityRadar />}
                      {i === 2 && <PingMonitor />}
                    </div>
                  </motion.div>
                </ScrollRevealText>
              ))}
            </div>
          </section>
        </div> */}
      </div>
    </div>
  );
}
