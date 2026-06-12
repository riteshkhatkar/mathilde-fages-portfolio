/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Navbar({
  onNavClick,
  activeSection,
  theme,
  onToggleTheme
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PDF page 1: Elegant navigation: Work / About / Exhibitions / Residencies / Texts / Contact
  // We also add Process (Matter, Gesture, Impression) as a dedicated section as requested in page 6!
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "gallery", label: "Work" },
    { id: "about", label: "About" },
    { id: "exhibitions", label: "Exhibitions", fullLabel: "Exhibitions & Residencies" },
    { id: "texts", label: "Texts" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" }
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-brand-bg/90 backdrop-blur-md py-4 border-b border-brand-charcoal/10 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo - Playfair Serif */}
        <button
          id="logo-button"
          onClick={() => handleLinkClick("hero")}
          className="group text-left"
        >
          <span className="font-serif text-lg lg:text-xl tracking-wider font-semibold text-brand-text group-hover:opacity-80 block whitespace-nowrap">
            MATHILDE FAGES
          </span>
          <span className="font-mono text-[8px] tracking-widest text-[#777] uppercase block transition-all duration-300 group-hover:text-brand-green">
            CONTEMPORARY PORTFOLIO
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-3.5 lg:space-x-6 xl:space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className="relative py-2 font-mono text-[9px] lg:text-[11px] tracking-widest transition-colors duration-300 uppercase hover:text-brand-green cursor-pointer whitespace-nowrap"
              >
                <span className={isActive ? "text-brand-green font-semibold" : "text-brand-text/70"}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-green"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div id="nav-actions" className="flex items-center space-x-3 md:ml-4 lg:ml-6 ml-0">

          {/* Theme Toggle (Light/Dark Switch) */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 border border-brand-charcoal/10 rounded-full hover:bg-brand-charcoal/5 hover:border-brand-charcoal/30 text-brand-text/70 hover:text-brand-text transition-all duration-300 cursor-pointer"
            title={theme === "light" ? "Switch to Dark Studio Mode" : "Switch to Light Gallery Mode"}
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5 text-brand-green" /> : <Sun className="w-3.5 h-3.5 text-brand-green" />}
          </button>

          {/* Mobile Menu Icon */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-brand-text hover:text-brand-green transition-colors duration-300"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Screen-Wide Full Overlay Menu for Mobile Transitions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="fullscreen-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] bg-brand-bg border-b border-brand-charcoal/10 z-40 flex flex-col justify-center md:hidden px-8 py-8 shadow-2xl"
          >
            <div className="flex flex-col space-y-4 text-left">
              <p className="font-mono text-[9px] text-[#777] uppercase tracking-widest mb-2">
                INDEX
              </p>
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mob-link-${item.id}`}
                    onClick={() => handleLinkClick(item.id)}
                    className="group text-left block w-full py-2 border-b border-brand-charcoal/5 cursor-pointer"
                  >
                    <span
                      className={`font-serif text-lg tracking-normal duration-300 group-hover:text-brand-green ${
                        isActive ? "text-brand-green underline underline-offset-4" : "text-brand-text"
                      }`}
                    >
                      {item.fullLabel || item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
