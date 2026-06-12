/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import ArtworkDetail from "./components/ArtworkDetail";
import Process from "./components/Process";
import Texts from "./components/Texts";
import Exhibitions from "./components/Exhibitions";
import Contact from "./components/Contact";
import CursorFollower from "./components/CursorFollower";

import { INITIAL_ARTWORKS } from "./data";
import { Artwork } from "./types";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [artworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("mathilde_theme");
    return saved === "light" ? "light" : "dark";
  });
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Sync theme changes directly to localStorage and body root class list
  useEffect(() => {
    localStorage.setItem("mathilde_theme", theme);
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  // Viewport tracking (ScrollSpy) via IntersectionObserver with correct sections from PDF
  useEffect(() => {
    const sections = ["hero", "about", "gallery", "texts", "exhibitions", "process", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Focus middle of structural viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Direct smooth scroll navigation
  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Safe empty form handler for Contact section
  const handleSendMessage = (msgPayload: { name: string; email: string; message: string }) => {
    // Contact submission logged locally (can be integrated with service layer easily)
    console.log("Transmission securely received:", msgPayload);
  };

  return (
    <div id="immersive-canvas-root" className={`min-h-screen bg-brand-bg text-brand-text relative selection:bg-brand-green selection:text-white-bg overflow-x-hidden ${theme}`}>
      
      {/* Background Atmosphere: Fog and Grain */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-green/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-brand-grey/10 blur-[150px]"></div>
      </div>

      {/* Background elegant fine paper grain overlays */}
      <div className="grain-overlay" />

      {/* Elegant mouse-tracking cursor follower */}
      <CursorFollower theme={theme} />

      {/* Sticky Minimal Navigation */}
      <Navbar
        onNavClick={handleNavClick}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />

      {/* Main Single-Scroll Cinematic Chapters */}
      <main id="exhibition-canvas-container" className="relative">
        
        {/* Chapter 01 — Home / Hero */}
        <Hero
          onExploreClick={() => handleNavClick("gallery")}
          onPracticeClick={() => handleNavClick("process")}
          onRequestClick={() => handleNavClick("contact")}
          theme={theme}
        />

        {/* Chapter 02 — About */}
        <About />

        {/* Chapter 03 — Selected Works Gallery */}
        <Gallery
          artworks={artworks}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
        />

        {/* Chapter 04 — Artistic Texts */}
        <Texts />

        {/* Chapter 05 — Residencies & Exhibitions Timeline */}
        <Exhibitions theme={theme} />

        {/* Chapter 06 — Process: Matter, Gesture, Impression */}
        <Process />

        {/* Chapter 07 — Contact */}
        <Contact onSendMessage={handleSendMessage} />

      </main>

      {/* Artwork detail modal popup */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkDetail
            artwork={selectedArtwork}
            allArtworks={artworks}
            onClose={() => setSelectedArtwork(null)}
            onNavigate={(art) => setSelectedArtwork(art)}
          />
        )}
      </AnimatePresence>

      {/* Footer Branding credits block */}
      <footer id="exhibition-footer-credits" className="py-12 bg-transparent text-center border-t border-brand-charcoal/10 font-mono text-[9px] uppercase tracking-widest text-[#777]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>CURATION COOPERATIVE © 2026 MATHILDE FAGES</span>
          <div className="flex items-center gap-4">
            <span>MARSEILLE, FRANCE</span>
            <span>•</span>
            <span>CONTEMPORARY FRENCH VISUALS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
