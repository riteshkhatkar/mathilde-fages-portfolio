/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Instagram, FileText, Download, Send, CheckCircle, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  onSendMessage: (msg: { name: string; email: string; message: string }) => void;
}

export default function Contact({ onSendMessage }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSendMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success status after 6 seconds
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-brand-bg py-24 md:py-36 border-t border-brand-charcoal/10 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#8796a0_0.4px,transparent_0.4px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Intro heading */}
        <div className="mb-16 md:mb-20 text-left">
          <p className="font-mono text-xs text-brand-green uppercase tracking-widest mb-3">
            SECTION 08 // CONTACT
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text tracking-tight font-light leading-none">
            Get in Touch
          </h2>
          <div className="w-16 h-[2px] bg-brand-green/40 mt-6" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Info details verbatim as requested */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10 text-left">
            
            <div className="space-y-8">
              <div>
                <span className="font-mono text-[9px] text-[#777] uppercase tracking-widest block mb-2">
                  Studio Location
                </span>
                <p className="font-serif text-2xl text-brand-text flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-green" /> Studio / Marseille, France
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] text-[#777] uppercase tracking-widest block mb-1">
                  Availability
                </span>
                <p className="font-serif text-lg text-brand-charcoal leading-relaxed">
                  “Available for exhibitions, residencies, commissions, collaborations, and institutional projects.”
                </p>
              </div>

              {/* Download placeholders */}
              <div className="space-y-3 pt-6 border-t border-brand-charcoal/10">
                <span className="font-mono text-[9px] text-[#777] uppercase tracking-widest block font-bold">
                  Documents
                </span>

                <div className="flex flex-col gap-2 max-w-sm">
                  {/* CV download placeholder */}
                  <a
                    href="mailto:cognirexsolutions@gmail.com?subject=Dossier Request: Mathilde Fages CV"
                    className="flex items-center justify-between p-3.5 bg-brand-paper hover:bg-brand-charcoal hover:text-brand-bg border border-brand-charcoal/10 rounded-sm font-mono text-[10px] tracking-wider uppercase transition-all duration-300 group shadow-sm text-brand-text cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                       <FileText className="w-4 h-4 text-brand-green" /> CV_Mathilde_Fages.pdf
                    </span>
                    <Download className="w-4 h-4 text-brand-green group-hover:translate-y-0.5 transition-transform" />
                  </a>

                  {/* Portfolio download placeholder */}
                  <a
                    href="mailto:cognirexsolutions@gmail.com?subject=Dossier Request: Mathilde Fages Portfolio"
                    className="flex items-center justify-between p-3.5 bg-brand-paper hover:bg-brand-charcoal hover:text-brand-bg border border-brand-charcoal/10 rounded-sm font-mono text-[10px] tracking-wider uppercase transition-all duration-300 group shadow-sm text-brand-text cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-brand-green" /> Portfolio_Mathilde_Fages.pdf
                    </span>
                    <Download className="w-4 h-4 text-brand-green group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Instagram & email channels placeholder */}
              <div className="space-y-3 pt-6 border-t border-brand-charcoal/10">
                <span className="font-mono text-[9px] text-[#777] uppercase tracking-widest block font-bold">
                  Social & Mail
                </span>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-4 sm:gap-6 font-mono text-[10px] text-brand-charcoal/85 w-full">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-brand-green transition-colors font-semibold whitespace-nowrap"
                  >
                    <Instagram className="w-4 h-4 text-brand-green" /> @mathilde_fages_studio
                  </a>
                  <a
                    href="mailto:cognirexsolutions@gmail.com"
                    className="flex items-center gap-1.5 hover:text-brand-green transition-colors font-semibold whitespace-nowrap"
                  >
                    <Mail className="w-4 h-4 text-brand-green" /> contact@mathildefages.com
                  </a>
                </div>
              </div>
            </div>

            <div className="font-mono text-[8px] text-[#999] uppercase tracking-wider pt-4">
              EST. MARSEILLE 2026 // PORTFOLIO SYSTEM
            </div>

          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7 bg-brand-paper shadow-2xl border border-brand-charcoal/10 p-8 md:p-12 text-left rounded-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-brand-charcoal/15 pb-4">
                <span className="font-mono text-[8px] text-brand-green/65 uppercase tracking-widest block font-bold">
                  STUDIO MESSAGE MATRIX
                </span>
                <h3 className="font-serif text-xl font-medium text-brand-text mt-1">
                  Send a Direct Message
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-8 border border-brand-green/30 bg-brand-bg/50 rounded-sm text-center py-16 space-y-4"
                  >
                    <CheckCircle className="w-12 h-12 text-brand-green mx-auto stroke-[1.5]" />
                    <h4 className="font-serif text-lg font-semibold text-brand-text">
                      Message Received
                    </h4>
                    <p className="font-sans text-xs text-[#777] leading-relaxed max-w-sm mx-auto">
                      Thank you. Your inquiry has been transmitted successfully. Mathilde will respond to your provided email address shortly.
                    </p>
                    <div className="pt-4">
                      <span className="font-mono text-[9px] text-brand-green uppercase tracking-widest italic flex items-center justify-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5" /> SECURE_TRANSMISSION // SUCCESS
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="input-form"
                    onSubmit={handleFormSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-brand-charcoal/60 uppercase tracking-widest font-semibold block">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-brand-bg border border-brand-charcoal/15 rounded-sm px-4 py-3 font-sans text-xs text-brand-text focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                          placeholder="Your Name"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-brand-charcoal/60 uppercase tracking-widest font-semibold block">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-brand-bg border border-brand-charcoal/15 rounded-sm px-4 py-3 font-sans text-xs text-brand-text focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="font-mono text-[9px] text-brand-charcoal/60 uppercase tracking-widest font-semibold block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-brand-bg border border-brand-charcoal/15 rounded-sm px-4 py-3 font-sans text-xs text-brand-text focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all resize-none"
                        placeholder="Inscribe your message or inquiry..."
                      />
                    </div>

                    <button
                      id="submit-contact-form"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-charcoal hover:bg-brand-green text-brand-bg font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING MESSAGE...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-brand-charcoal/5 font-mono text-[8px] text-[#777] uppercase flex justify-between items-center mt-6">
              <span>Marseille, France base // 100% Client Secure</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
