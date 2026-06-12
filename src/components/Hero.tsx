/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from "react";
import { ArrowDownRight, Compass, Sparkles, MoveRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  onExploreClick: () => void;
  onPracticeClick: () => void;
  onRequestClick: () => void;
  theme: "light" | "dark";
}

const heroArtworks = [
  {
    src: "/images/surimpression_etching_1781157149855.jpg",
    title: "Surimpression",
    medium: "Etching on Cotton Paper",
    year: "2014"
  },
  {
    src: "/images/auto_portrait_iceland_1781157248352.jpg",
    title: "Auto-portrait (Iceland study)",
    medium: "Lithography on Limestone",
    year: "2011"
  },
  {
    src: "/images/roche_mysterieuse_litho_1781157228500.jpg",
    title: "Roche mystérieuse",
    medium: "Lithography on Stone",
    year: "2019"
  },
  {
    src: "/images/sous_les_cieux_cubes_1781157169320.jpg",
    title: "Sous les Cieux",
    medium: "Wood Engraving Print Block Matrix",
    year: "2018"
  },
  {
    src: "/images/maniere_noire_storm_1781157186874.jpg",
    title: "Manière Noire (Storm)",
    medium: "Fine Carbon Lithography series",
    year: "2019"
  },
  {
    src: "/images/tchernobyl_memories_drawing_1781157209322.jpg",
    title: "Tchernobyl Memories",
    medium: "Drawing with Acetone & Ink",
    year: "2023"
  }
];

export default function Hero({ onExploreClick, onPracticeClick, onRequestClick, theme }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeArtIdx, setActiveArtIdx] = useState(0);
  const [time, setTime] = useState(0);

  // Slow ambient background drifting animation to satisfy user desire for ambient animation at rest
  useEffect(() => {
    let animId: number;
    const update = () => {
      setTime((t) => t + 0.006);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Auto-play interval to cycle her lithography art pieces smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArtIdx((prev) => (prev + 1) % heroArtworks.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Mouse move handler for premium soft image-displacement parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 35; // Max 35px offset
      const y = (e.clientY / clientHeight - 0.5) * 35;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute 3D architectural vanishing coordinates with drift
  const driftX = Math.sin(time) * 12;
  const driftY = Math.cos(time * 0.8) * 8;
  const vpX = 500 + mousePosition.x * 2.5 + driftX;
  const vpY = 420 + mousePosition.y * 2.5 + driftY;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100vh] bg-brand-bg flex flex-col justify-between pt-20 md:pt-24 pb-16 overflow-hidden"
    >
      {/* High-End Atmospheric Geometric Squared Gallery Blueprint Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-[0.14] dark:opacity-[0.22]">
        <svg className="w-full h-full text-brand-green/25 dark:text-brand-green/35" viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.5">
          {/* Subtle multi-pane, balanced gallery blueprint grid lines */}
          <line x1="150" y1="0" x2="150" y2="1000" className="opacity-20" strokeWidth="0.4" />
          <line x1="850" y1="0" x2="850" y2="1000" className="opacity-20" strokeWidth="0.4" />
          <line x1="0" y1="200" x2="1000" y2="200" className="opacity-20" strokeWidth="0.4" />
          <line x1="0" y1="800" x2="1000" y2="800" className="opacity-20" strokeWidth="0.4" />

          {/* Multiple concentric modern nested gallery frames */}
          {[120, 240, 360, 480].map((offset, i) => {
            const w = 1000 - offset * 2;
            const h = 800 - offset * 1.25;
            // Responsive continuous layout depth shift
            const shiftX = mousePosition.x * (i + 1) * 0.12;
            const shiftY = mousePosition.y * (i + 1) * 0.12;
            return (
              <rect
                key={`gallery-frame-${i}`}
                x={offset + shiftX}
                y={offset * 0.75 + shiftY}
                width={w}
                height={h}
                className="opacity-30"
                strokeWidth={0.5 + i * 0.15}
                strokeDasharray={i % 2 === 1 ? "4,4" : "none"}
                rx="2"
              />
            );
          })}

          {/* Elegant floating exhibition pavillion boxes (squared structures) */}
          <g className="opacity-40">
            <rect x="180" y="240" width="120" height="280" strokeWidth="0.6" />
            <line x1="180" y1="380" x2="300" y2="380" className="opacity-25" strokeDasharray="2,2" />
          </g>

          <g className="opacity-35">
            <rect x="740" y="320" width="140" height="340" strokeWidth="0.6" />
            <line x1="740" y1="490" x2="880" y2="490" className="opacity-25" strokeDasharray="2,2" />
          </g>

          {/* Grid target indicators at blueprint intersections */}
          <g className="opacity-30" strokeWidth="0.5">
            <path d="M 145,200 L 155,200 M 150,195 L 150,205" />
            <path d="M 845,200 L 855,200 M 850,195 L 850,205" />
            <path d="M 145,800 L 155,800 M 150,795 L 150,805" />
            <path d="M 845,800 L 855,800 M 850,795 L 850,805" />
          </g>
        </svg>
      </div>

      {/* Grid Pattern overlays representing lithographic screen alignment marks */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#2a2a2a_0.4px,transparent_0.4px)] [background-size:32px_32px] opacity-[0.04]" />

      {/* Dynamic Topographic Ink Wave / Terrain contour line animation */}
      <div className="absolute inset-x-0 top-0 h-[650px] z-[1] pointer-events-none opacity-[0.12] dark:opacity-[0.20] overflow-hidden">
        <svg className="w-full h-full text-brand-green" viewBox="0 0 1440 650" fill="none" stroke="currentColor">
          {/* Concentric-like topographical curves morphing based on sinusoidal time drift */}
          {[1, 2, 3, 4, 5].map((multiplier) => {
            const dVal = `
              M 0,${180 + multiplier * 45} 
              Q 360,${180 + multiplier * 45 + Math.sin(time + multiplier) * 45} 
              720,${220 + multiplier * 35 + Math.cos(time - multiplier) * 35} 
              T 1080,${200 + multiplier * 50 + Math.sin(time * 0.7 + multiplier) * 40} 
              T 1440,${240 + multiplier * 40}
            `;
            return (
              <path
                key={multiplier}
                d={dVal}
                strokeWidth={1.3 - multiplier * 0.18}
                strokeDasharray={multiplier % 2 === 0 ? "5,5" : "none"}
                className="transition-all duration-300"
              />
            );
          })}
          
          {/* Lithographic Plate Alignments representing her wood grain concentric circle prints */}
          <g transform="translate(1250, 420) scale(1.1)" className="opacity-70">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const radius = i * 20 + Math.sin(time + i * 0.4) * 5;
              return (
                <circle
                  key={`wood-ring-${i}`}
                  cx="0"
                  cy="0"
                  r={radius}
                  strokeWidth="0.4"
                  strokeDasharray={i === 4 ? "2,2" : i === 6 ? "4,2" : "none"}
                />
              );
            })}
            {/* Dynamic sector line drawing */}
            <line 
              x1="0" 
              y1="0" 
              x2={Math.cos(time * 0.15) * 140} 
              y2={Math.sin(time * 0.15) * 140} 
              strokeWidth="0.35" 
              strokeDasharray="2,3" 
            />
          </g>
        </svg>
      </div>

      {/* Abstract typography coordinates following mouse softly */}
      <motion.div
        style={{
          x: mousePosition.x * 0.8,
          y: mousePosition.y * 0.8,
        }}
        className="absolute bottom-20 left-[15%] text-[9px] font-mono text-brand-green/15 tracking-widest hidden lg:block"
      >
        LATITUDE REF: 43.2965° N // GESTURE INDEX: 42
      </motion.div>

      {/* Centered Main Story Layout */}
      <div className="flex-grow flex items-center max-w-7xl mx-auto px-6 md:px-12 w-full z-20 mt-2 md:mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Text / Typography Columns */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center"
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-brand-green font-semibold">
                  Marseille, France
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="font-serif text-5xl md:text-7xl lg:text-7xl leading-[0.9] tracking-tight text-brand-text font-semibold"
              >
                Mathilde Fages
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-mono text-xs md:text-sm tracking-widest text-brand-green uppercase mt-2 font-bold"
              >
                Contemporary visual artist
              </motion.p>
            </div>

            {/* Poetic statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="font-serif text-lg md:text-xl text-brand-charcoal/80 leading-relaxed max-w-lg italic font-light"
            >
              “Landscapes appear, disappear, and return through shadows, impressions, and fragile gestures.”
            </motion.p>

            {/* Premium Button Controls block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                id="hero-explore-works"
                onClick={onExploreClick}
                className="group relative px-6 py-3.5 bg-brand-charcoal hover:bg-brand-green text-brand-bg font-mono text-[11px] tracking-widest uppercase flex items-center gap-3 transition-all duration-300 shadow-sm animate-button"
              >
                View Collection
                <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </button>

              <button
                id="hero-exp-practice"
                onClick={onExploreClick}
                className="px-6 py-3.5 border border-brand-charcoal/20 hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-brand-bg font-mono text-[11px] tracking-widest uppercase transition-all duration-300 text-brand-text"
              >
                Explore Practice
              </button>

              <button
                id="hero-req-exh"
                onClick={onRequestClick}
                className="px-6 py-3.5 text-brand-text/75 hover:text-brand-green font-mono text-[11px] tracking-widest uppercase underline underline-offset-4 decoration-brand-charcoal/10 hover:decoration-brand-green transition-all duration-350"
              >
                Request Exhibition
              </button>
            </motion.div>
          </div>

          {/* Right Immersive Artwork Frame with custom mouse-following depth parallax */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4 }}
              className="relative w-full max-w-[420px] aspect-[4/5] bg-brand-paper shadow-2xl overflow-hidden border border-brand-charcoal/10 p-6 md:p-8"
              style={{
                x: mousePosition.x * 0.4,
                y: mousePosition.y * 0.4,
              }}
            >
              {/* Deckled Edge / Passe-Partout Framed Aesthetic */}
              <div className="absolute inset-4 border border-brand-charcoal/10 pointer-events-none" />
              
              {/* Actual physical image representation with interactive motion */}
              <div className="relative w-full h-full overflow-hidden bg-brand-charcoal/5 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={activeArtIdx}
                    src={heroArtworks[activeArtIdx].src}
                    alt={heroArtworks[activeArtIdx].title}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 0.95, scale: 1.04, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 select-none"
                    style={{
                      x: mousePosition.x * -0.2, // counter-movement for 3D relative depth
                      y: mousePosition.y * -0.2,
                    }}
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Subtle paper grain texture layer */}
                <div className="absolute inset-0 bg-brand-paper/5 mix-blend-color-burn pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 to-transparent pointer-events-none z-10" />
              </div>

              {/* Minimal caption below frame inside pass-partout edge */}
              <div className="absolute bottom-1.5 right-8 font-mono text-[8px] text-brand-charcoal/60 uppercase tracking-widest z-20">
                {heroArtworks[activeArtIdx].title} — {heroArtworks[activeArtIdx].medium}, {heroArtworks[activeArtIdx].year}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Floating Section Bottom Footnotes */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 flex flex-col md:flex-row justify-between items-start md:items-center text-brand-text/40 font-mono text-[9px] tracking-widest uppercase mt-8">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-green/60" />
          <span>MATHILDE FAGES // SELECTED PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            id="scroll-down-ind"
            onClick={onExploreClick}
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors"
          >
            SCROLL TO ENTER <MoveRight className="w-3 h-3 rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
}
