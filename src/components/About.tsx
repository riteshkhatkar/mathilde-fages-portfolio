/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BIOGRAPHY_TEXTS } from "../data";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-brand-bg py-24 md:py-36 overflow-hidden border-t border-brand-charcoal/10"
    >
      {/* Background elegant texture accents */}
      <div className="absolute top-1/4 right-[5%] w-96 h-96 bg-[radial-gradient(#8796a0_0.6px,transparent_0.6px)] [background-size:16px_16px] opacity-[0.06] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 text-left">
          <p className="font-mono text-xs text-brand-green uppercase tracking-widest mb-3">
            SECTION 02 // ABOUT THE ARTIST
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text tracking-tight font-light leading-none">
            Artist Profile
          </h2>
          <div className="w-16 h-[2px] bg-brand-green/40 mt-6" />
        </div>

        {/* Editorial Split Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Portrait Holder */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative bg-brand-paper shadow-xl p-4 border border-brand-charcoal/10 max-w-sm mx-auto md:mx-0">
              <div className="overflow-hidden bg-brand-charcoal/5 aspect-[3/4] relative">
                <img
                  src="/images/auto_portrait_iceland_1781157248352.jpg"
                  alt="Mathilde Fages portrait"
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:scale-105 duration-1000 transition-all filter sepia-[5%] shadow-inner"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 font-mono text-[9px] text-[#777] uppercase tracking-wider flex items-center justify-between">
                <span>Mathilde Fages</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-brand-green" /> MARSEILLE, FRANCE
                </span>
              </div>
              <div className="mt-4 p-3 bg-brand-bg border border-brand-charcoal/5 rounded-sm flex justify-between items-center text-[8px] font-mono tracking-widest text-[#666] uppercase">
                <span>RESIDENCY BASE // FRANCE</span>
                <span>CONTEMPORARY FRENCH VISUALS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Biography Content */}
          <div className="md:col-span-7 space-y-8 text-left py-4">
            <div className="space-y-6">
              <p className="font-serif text-xl md:text-2xl text-brand-text/90 leading-relaxed font-light first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-brand-green">
                {BIOGRAPHY_TEXTS.bio1}
              </p>
              <div className="h-[1px] bg-brand-charcoal/10 my-4 w-1/3" />
              <p className="font-serif text-base text-brand-charcoal/75 leading-relaxed font-light font-serif">
                {BIOGRAPHY_TEXTS.bio2}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
