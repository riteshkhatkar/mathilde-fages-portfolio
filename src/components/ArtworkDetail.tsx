/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Artwork } from "../types";
import { X, Search, ZoomIn, Eye, Sparkles, ChevronLeft, ChevronRight, Sliders, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ArtworkDetailProps {
  artwork: Artwork;
  allArtworks: Artwork[];
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
}

export default function ArtworkDetail({
  artwork,
  allArtworks,
  onClose,
  onNavigate,
}: ArtworkDetailProps) {
  const [explorerActive, setExplorerActive] = useState(false);
  const [xrayActive, setXrayActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(2); // 2x or 3x closeups
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Find index for Prev/Next mechanisms
  const currentIndex = allArtworks.findIndex((art) => art.id === artwork.id);
  const prevArtwork = allArtworks[currentIndex - 1] || allArtworks[allArtworks.length - 1];
  const nextArtwork = allArtworks[currentIndex + 1] || allArtworks[0];

  // Mouse coordinate tracker relative to the imagery block
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percent positions
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;

    setMousePos({ x: xp, y: yp });
  };

  useEffect(() => {
    // Reset explorer toggles when artwork slides
    setExplorerActive(false);
    setXrayActive(false);
  }, [artwork.id]);

  return (
    <motion.div
      id="artwork-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 w-full h-screen bg-brand-bg/95 backdrop-blur-md z-50 overflow-y-auto pt-20 pb-12 px-6 md:px-12 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#d8d6cf_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl w-full bg-brand-bg border border-brand-charcoal/10 shadow-2xl relative p-6 md:p-12 z-10 rounded-sm">
        
        {/* Detail Header controls */}
        <div id="detail-header-row" className="flex items-center justify-between border-b border-brand-charcoal/10 pb-6 mb-8 font-mono">
          <button
            id="back-to-gallery-btn"
            onClick={onClose}
            className="group font-mono text-[11px] text-brand-text hover:text-brand-green tracking-widest uppercase flex items-center gap-2 transition-colors duration-300 border border-brand-charcoal/20 hover:border-brand-green/40 px-4 py-2 rounded-sm"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Gallery
          </button>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-brand-green uppercase tracking-widest font-bold">{artwork.category}</span>
            <button
              id="close-detail-btn"
              onClick={onClose}
              className="group font-mono text-[10px] text-brand-charcoal hover:text-brand-green tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-300 ml-4"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>
        </div>

        {/* Major split detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Artwork Image or advanced zoom explorer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Image Frame */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              className="relative aspect-[4/3] bg-brand-paper shadow-lg border border-brand-charcoal/10 overflow-hidden cursor-crosshair p-4 md:p-6"
            >
              <div className="absolute inset-2 border border-brand-charcoal/5 pointer-events-none" />

              <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                
                {/* Underlay layer representing alternative X-RAY lithographic plates mapping */}
                {xrayActive && (
                  <div className="absolute inset-0 bg-brand-charcoal flex items-center justify-center z-10">
                    <img
                      src={artwork.image}
                      alt="Plate Layer 2"
                      className="w-full h-full object-cover invert hue-rotate-180 brightness-75 contrast-125 sepia-[30%]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:8px_8px] opacity-35 mix-blend-multiply pointer-events-none" />
                    <div className="absolute bottom-3 left-3 bg-brand-green text-brand-bg font-mono text-[8px] px-2 py-0.5 tracking-wider uppercase">
                      PLATE REGISTER PHASE 02 (X-RAY MODE)
                    </div>
                  </div>
                )}

                {/* Primary Artwork Image */}
                <img
                  ref={imageRef}
                  src={artwork.image}
                  alt={artwork.title}
                  className={`w-full h-full object-cover select-none transition-filter duration-700 ${
                    xrayActive ? "opacity-30" : "opacity-100"
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Interactive microscope magnifying glass lens */}
                {explorerActive && isHoveringImage && (
                  <div
                    id="magnifier-lens"
                    className="absolute w-44 h-44 rounded-full border-2 border-brand-green overflow-hidden pointer-events-none z-30 shadow-2xl bg-brand-paper glass-lens flex items-center justify-center"
                    style={{
                      left: `calc(${mousePos.x}% - 88px)`,
                      top: `calc(${mousePos.y}% - 88px)`,
                    }}
                  >
                    {/* Render heavily scaled copy of current states */}
                    <div
                      className="absolute w-[400%] h-[400%] bg-no-repeat"
                      style={{
                        backgroundImage: `url(${artwork.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                        transform: `scale(${zoomLevel})`,
                        filter: xrayActive ? "invert(1) brightness(0.6)" : "none",
                      }}
                    />

                    {/* Highly visible overlay suggesting cotton paper fibers mesh structure */}
                    <div className="absolute inset-0 bg-[radial-gradient(#33443a_2px,transparent_2px)] [background-size:6px_6px] opacity-25 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,42,0.1)_1px,transparent_1px)] [background-size:100%_4px] opacity-15 mix-blend-screen pointer-events-none" />
                    
                    {/* Circle crosshair */}
                    <div className="absolute w-6 h-6 border border-brand-green/30 rounded-full" />
                    <div className="absolute h-full w-[0.5px] bg-brand-green/20" />
                    <div className="absolute w-full h-[0.5px] bg-brand-green/20" />
                  </div>
                )}

              </div>
            </div>

            {/* Microscopic and Explorer controls block */}
            <div className="p-4 bg-brand-paper/70 rounded-sm border border-brand-charcoal/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  id="toggle-explorer-btn"
                  onClick={() => setExplorerActive(!explorerActive)}
                  className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase rounded-sm border flex items-center gap-1.5 transition-all duration-300 ${
                    explorerActive
                      ? "bg-brand-green border-brand-green text-brand-bg font-semibold"
                      : "bg-transparent border-brand-charcoal/15 text-brand-text hover:bg-brand-charcoal/5"
                  }`}
                  title="Enable circular microscope lens view to inspect deep paper fiber grains"
                >
                  <Search className="w-3.5 h-3.5" />
                  {explorerActive ? "Lens Active" : "Enable Fiber Lens"}
                </button>

                <button
                  id="toggle-xray-btn"
                  onClick={() => setXrayActive(!xrayActive)}
                  className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase rounded-sm border flex items-center gap-1.5 transition-all duration-300 ${
                    xrayActive
                      ? "bg-brand-green border-brand-green text-brand-bg font-semibold"
                      : "bg-transparent border-brand-charcoal/15 text-brand-text hover:bg-brand-charcoal/5"
                  }`}
                  title="Toggle multi-pass offset plate registration X-Ray visualizer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {xrayActive ? "X-Ray Active" : "Toggle X-Ray Plate"}
                </button>
              </div>

              {/* Slider for microscopic lens amplification */}
              {explorerActive && (
                <div className="flex items-center gap-2 font-mono text-[10px] text-brand-text/75">
                  <span>Zoom Level:</span>
                  <input
                    type="range"
                    min="1.5"
                    max="4"
                    step="0.5"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    className="w-24 accent-brand-green"
                  />
                  <span className="font-semibold text-brand-green">{zoomLevel}x</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Text description, storytelling and history */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-brand-text tracking-tight font-medium mb-2">
                {artwork.title}
              </h3>
              <p className="font-mono text-xs text-brand-green font-medium">
                {artwork.medium}
              </p>
            </div>

            {/* Core parameters metrics */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-brand-charcoal/15 py-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="block text-brand-text/45 uppercase tracking-wider">Production Year</span>
                <span className="font-serif text-sm font-semibold">{artwork.year}</span>
              </div>
              {artwork.size && (
                <div className="space-y-1">
                  <span className="block text-brand-text/45 uppercase tracking-wider">Dimensions</span>
                  <span className="font-serif text-sm font-semibold">{artwork.size}</span>
                </div>
              )}
              {artwork.location && (
                <div className="space-y-1 col-span-2">
                  <span className="block text-brand-text/45 uppercase tracking-wider">Exhibition Location / context</span>
                  <span className="font-serif text-sm font-semibold">{artwork.location}</span>
                </div>
              )}
            </div>

            {/* Storytelling Panels */}
            <div className="space-y-4">
              <p className="font-serif text-sm md:text-base text-brand-text/90 leading-relaxed italic font-light">
                {artwork.description}
              </p>
              {artwork.context && (
                <div className="p-4 bg-brand-paper/40 border-l-2 border-brand-charcoal/30 flex flex-col gap-1">
                  <span className="font-mono text-[9px] tracking-widest text-[#777] uppercase font-bold">INSTALLATION ARCHAEOLOGY</span>
                  <p className="font-sans text-xs text-brand-charcoal/80 leading-relaxed font-serif italic">
                    {artwork.context}
                  </p>
                </div>
              )}
            </div>

            {/* Inside review Quote block */}
            {artwork.quote && (
              <div className="p-5 bg-brand-paper border border-brand-charcoal/5 rounded-sm shadow-sm font-serif italic text-xs leading-relaxed text-brand-charcoal/90 relative">
                <Sparkles className="absolute top-2 right-2 w-3.5 h-3.5 text-brand-green/40" />
                <p>“{artwork.quote}”</p>
                {artwork.quoteAuthor && (
                  <span className="block not-italic text-[9px] font-mono text-brand-green uppercase tracking-widest mt-2">
                    — {artwork.quoteAuthor}
                  </span>
                )}
              </div>
            )}

            {/* Bottom Section Page Turners */}
            <div className="pt-6 border-t border-brand-charcoal/10 flex items-center justify-between">
              <button
                id="prev-artwork-btn"
                onClick={() => onNavigate(prevArtwork)}
                className="group flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-brand-text/75 hover:text-brand-green transition-colors duration-300"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Prev Work
              </button>

              <span className="font-mono text-[10px] text-brand-text/40">
                {currentIndex + 1} OF {allArtworks.length}
              </span>

              <button
                id="next-artwork-btn"
                onClick={() => onNavigate(nextArtwork)}
                className="group flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-brand-text/75 hover:text-brand-green transition-colors duration-300"
              >
                Next Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
