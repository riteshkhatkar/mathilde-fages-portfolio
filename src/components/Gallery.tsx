/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Artwork, ArtworkCategory } from "../types";
import { Maximize2, Layers, Tag, Calendar, Compass, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function Gallery({ artworks, onSelectArtwork }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory>(ArtworkCategory.ALL);

  const categories = Object.values(ArtworkCategory);

  const filteredArtworks = artworks.filter(
    (art) => selectedCategory === ArtworkCategory.ALL || art.category === selectedCategory
  );

  return (
    <section
      id="gallery"
      className="relative min-h-screen bg-brand-bg py-24 md:py-36 border-t border-brand-charcoal/5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(42,42,42,0.01)_1px,transparent_1px)] [background-size:100%_40px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro Section Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <p className="font-mono text-xs text-brand-green uppercase tracking-widest mb-3">
              03. Immersive Gallery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text tracking-tight font-light text-left">
              Selected Works & <span className="italic block mt-1">Material Proofs</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-[#666] max-w-sm leading-relaxed text-left">
            Wander through Mathilde’s atmospheric prints, timber cubes, and ecological installations. Click any piece to trigger the detailed texture Explorer Mode.
          </p>
        </div>

        {/* Categories / Filter Tabs */}
        <div id="gallery-filters" className="flex flex-wrap items-center gap-3 mb-12 border-b border-brand-charcoal/10 pb-6">
          <span className="font-mono text-[9px] text-brand-charcoal/40 uppercase tracking-widest mr-4 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-green" /> Filter Gallery:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 font-mono text-xs tracking-wider transition-all duration-300 rounded-full border ${
                  isActive
                    ? "bg-brand-charcoal border-brand-charcoal text-brand-bg font-medium"
                    : "bg-transparent border-brand-charcoal/10 text-brand-text/75 hover:bg-brand-charcoal/5 hover:border-brand-charcoal/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (Editorial/Masonry Style with Asymmetrical Columns) */}
        <div id="gallery-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <AnimatePresence mode="wait">
            {filteredArtworks.map((art, index) => {
              // Asymmetrical Grid Assignment across 12-columns layouts based on indices
              let gridClass = "lg:col-span-6"; // Default standard
              if (index % 3 === 0) gridClass = "lg:col-span-8"; // Extra wide featured
              else if (index % 3 === 1) gridClass = "lg:col-span-4"; // Slim right accents
              else gridClass = "lg:col-span-6"; // Equal balancing split

              return (
                <motion.div
                  key={art.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={`${gridClass} group`}
                >
                  {/* Outer premium shadow and physical frame */}
                  <div
                    id={`art-card-${art.id}`}
                    onClick={() => onSelectArtwork(art)}
                    className="cursor-pointer bg-brand-paper shadow-md hover:shadow-2xl border border-brand-charcoal/5 p-4 md:p-6 duration-700 transition-all hover:border-brand-green/20"
                  >
                    {/* Visual Container */}
                    <div className="relative overflow-hidden aspect-[4/3] bg-brand-charcoal/5 flex items-center justify-center">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover grayscale brightness-95 opacity-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-1000 origin-center"
                        referrerPolicy="no-referrer"
                      />

                      {/* Grain increase overlap / Light sweep animation layer */}
                      <div className="absolute inset-0 bg-brand-paper/5 opacity-0 group-hover:opacity-15 mix-blend-color-dodge pointer-events-none duration-700 transition-opacity" />
                      
                      {/* Premium Slide-Up Overlay */}
                      <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          whileHover={{ scale: 1 }}
                          className="bg-brand-bg/95 backdrop-blur-sm p-4 rounded-full border border-brand-charcoal/10 flex items-center justify-center text-brand-text shadow-lg"
                        >
                          <Maximize2 className="w-5 h-5 text-brand-green" />
                        </motion.div>
                        <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-[#fff] uppercase">
                          View Details
                        </span>
                      </div>

                      {/* Category Label Pin */}
                      <div className="absolute top-3 left-3 bg-brand-bg/90 backdrop-blur-sm border border-brand-charcoal/10 px-2.5 py-1 font-mono text-[8px] tracking-widest text-brand-text uppercase">
                        {art.category}
                      </div>
                    </div>

                    {/* Metadata Panel inside card frame */}
                    <div className="mt-5 space-y-2 text-left">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg md:text-xl font-medium text-brand-text tracking-tight group-hover:text-brand-green transition-colors duration-300">
                          {art.title}
                        </h3>
                        <span className="font-mono text-[10px] bg-brand-charcoal/5 text-brand-text/70 px-2 py-0.5 rounded-sm">
                          {art.year}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-brand-charcoal/80 line-clamp-2 leading-relaxed">
                        {art.description}
                      </p>

                      <div className="pt-2 border-t border-brand-charcoal/5 flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-mono text-brand-charcoal/50 uppercase tracking-wider">
                        <span>Medium: {art.medium}</span>
                        {art.size && <span>• Size: {art.size}</span>}
                        {art.location && <span>• Place: {art.location}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Display banner showcasing full-width immersive landscape block */}
        <div id="gallery-immersive-hero" className="mt-28 bg-brand-paper/50 backdrop-blur-md text-brand-text p-8 md:p-16 border border-brand-charcoal/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-green/5 pointer-events-none stroke-brand-green" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none">
            <img
              src="/images/maniere_noire_storm_1781157186874.jpg"
              alt="Manière noire backdrop"
              className="w-full h-full object-cover grayscale brightness-50"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-2xl text-left relative z-10 space-y-6">
            <p className="font-mono text-[9px] tracking-widest text-[#777] uppercase">
              REVERBERATING SPACE & SILENCE
            </p>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug font-light text-brand-text">
              “Fascinated by what is seen, but even more by what is not seen.”
            </h3>
            <p className="font-sans text-xs text-brand-text/80 leading-relaxed">
              Mathilde’s lithographic stone blocks capture the quiet of northern territories and the heavy, humid forests of Corrèze — translating nature’s raw, invisible vibrations into physical charcoal impressions.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="font-mono text-[10px] text-brand-green tracking-widest uppercase font-semibold">
                Ussel Graphic Workshop Residency, 2019
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
