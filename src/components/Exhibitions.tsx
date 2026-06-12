/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { INITIAL_EXHIBITIONS } from "../data";
import { MapPin, Milestone, Sparkles } from "lucide-react";

interface ExhibitionsProps {
  theme: "light" | "dark";
}

export default function Exhibitions({ theme }: ExhibitionsProps) {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Exhibition", "Residency", "Education"];

  const filteredExhibitions = INITIAL_EXHIBITIONS.filter((ex) => {
    if (selectedCategory === "All") return true;
    return ex.category === selectedCategory;
  });

  return (
    <section
      id="exhibitions"
      className="relative min-h-screen bg-brand-bg py-24 md:py-36 border-t border-brand-charcoal/5"
    >
      <div className="absolute inset-0 bg-[#33443a]/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro heading */}
        <div className="mb-16 md:mb-24">
          <p className="font-mono text-xs text-brand-green uppercase tracking-widest mb-3 font-semibold">
            Chronology
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text tracking-tight font-light text-left">
            Exhibitions & <span className="italic">Residencies</span>
          </h2>
          <div className="w-16 h-[2.5px] bg-brand-green/40 mt-8" />
        </div>

        {/* Filter Tabs - Clean, simple, editorial */}
        <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-brand-charcoal/10 pb-6">
          <span className="font-mono text-[10px] text-brand-charcoal/40 uppercase tracking-widest mr-4">
            Filter Chronology:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 font-mono text-xs tracking-wider uppercase transition-all duration-300 border rounded-full ${
                  isActive
                    ? "bg-brand-charcoal border-brand-charcoal text-brand-bg font-medium"
                    : "bg-transparent border-brand-charcoal/15 text-brand-text/75 hover:bg-brand-charcoal/5 hover:border-brand-charcoal/30"
                }`}
              >
                {cat === "All" ? "All events" : cat}
              </button>
            );
          })}
        </div>

        {/* Large Vertical Chronology Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative text-left">
          
          {/* Vertical chronology list of years */}
          <div className="lg:col-span-8 space-y-6 relative border-l-2 border-brand-green/30 pl-6 md:pl-10 ml-4 py-2">
            
            {filteredExhibitions.map((ex, idx) => {
              const isHovered = hoveredEvent === idx;
              return (
                <div
                  key={idx}
                  id={`timeline-item-${idx}`}
                  onMouseEnter={() => setHoveredEvent(idx)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  className={`relative p-6 bg-brand-paper border rounded-sm transition-all duration-500 text-left ${
                    isHovered
                      ? "border-brand-green shadow-xl translate-x-2"
                      : "border-brand-charcoal/5 shadow-sm"
                  }`}
                >
                  {/* Circle pinpoint inside central vertical bar */}
                  <div
                    className={`absolute top-8 -left-[31px] md:-left-[47px] w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                      isHovered ? "bg-brand-green border-brand-bg" : "bg-brand-bg border-brand-green/40"
                    }`}
                  />

                  {/* Year Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <span className="px-3 py-1 bg-brand-charcoal text-brand-bg text-[10px] font-mono tracking-widest uppercase rounded-sm">
                      YEAR {ex.year}
                    </span>
                    <span className="font-mono text-[9px] text-brand-charcoal/60 uppercase flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-green" /> {ex.location}
                    </span>
                  </div>

                  {/* Event metadata details */}
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-brand-text">
                    {ex.title}
                  </h3>
                  <p className="font-mono text-[10px] text-brand-green mt-0.5">{ex.subtitle}</p>

                  <p className="font-sans text-xs text-brand-charcoal/75 leading-relaxed mt-3">
                    {ex.description}
                  </p>

                  {/* Classification tag */}
                  <div className="absolute bottom-4 right-4 bg-brand-bg border border-brand-charcoal/5 px-2 py-0.5 rounded-sm font-mono text-[8px] text-brand-charcoal/40 uppercase tracking-widest font-semibold">
                    {ex.category}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Static info panel describing exhibitions guidelines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-paper shadow-md border border-brand-charcoal/5 p-6 rounded-sm text-left">
              <h3 className="font-serif text-lg font-medium text-brand-text mb-3">
                Global Projects
              </h3>
              <p className="font-sans text-xs text-brand-charcoal/70 leading-relaxed mb-4">
                Her works have been presented in France, Switzerland, Germany, Iceland, Georgia, India, and Ukraine.
              </p>
              <div className="flex flex-wrap gap-2">
                {["France", "Switzerland", "Germany", "Iceland", "Georgia", "India", "Ukraine"].map((c, i) => (
                  <span key={i} className="px-2.5 py-1 bg-brand-bg border border-brand-charcoal/10 font-mono text-[9px] tracking-wider uppercase text-brand-charcoal/75 rounded-sm font-semibold">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-brand-paper border-l-2 border-brand-green p-6 space-y-2 text-left shadow-sm">
              <p className="font-serif text-xs italic text-brand-charcoal/80 leading-relaxed">
                "Her works Explorer unstable perception: forests, skies, ruins, and margins become spaces of artistic intervention where landscape appears, disappears, and returns."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
