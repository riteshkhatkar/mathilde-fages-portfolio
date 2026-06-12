/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, ArrowRight, BookOpen, Quote, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Essay {
  id: string;
  title: string;
  author: string;
  source?: string;
  content: string[];
  keyQuote: string;
}

export default function Texts() {
  const [activeEssayId, setActiveEssayId] = useState<string>("chabal");

  const essays: Essay[] = [
    {
      id: "chabal",
      title: "Text artistic",
      author: "Marielle Chabal",
      keyQuote: "“It is the atmospheres that the artist dares to harpoon and concretize.”",
      content: [
        "It looks like winter. One morning, soaked in a livid light, and it is not yet known whether the sun’s rays will streak around or if the landscape, drowned in a pastel blur, will stand until potential twilight. Moreover, the day is barely dawning, and in the wheels of a suspended dawn, perhaps it will not for weeks. There is less noise and the city, if any, has a hard time getting going.",
        "In the film, one could naively think that the panorama is the only thing you can really trust, that the lights and sounds can boast – as in a movie – only of adjusting the emotional intensities of the scene. Yet, Mathilde Fages means to you that it is the opposite. It reveals the invisible and you understand that the backdrop exists only through what it emits. The steam that surrounds it. Its unreal camaïeux. Its music a little dirty. Its dreamlike lights.",
        "It is the atmospheres that the artist dares to harpoon and concretize. By concretising, I avoid the term to realize which the etymological root – devoid of prefix – somewhat offends Mathilde’s fantasy. It is not a question of contemporary salmigondis, sampling, remixing, re-sampling, but rather of a form of slimmed and inspired attention that perceives the frames of syncretic narratives – hopes and multiple daydreams – in the middle, and above all on the periphery of the order of things.",
        "The disturbing atypical nature of images comes, in fact, from their hypnagogic nature and the emerging image, that of the artist, will never be born of a transparent process, incapable of giving more than a disembodied reflection of the sublime. The way will be more artisanal and above all more bidouillable, made of flaws,– as the dust accumulated in the micro-grooves disturb the sound and increase its charm – sometimes an engraving, sometimes a lithography or a screen printing, if not a volume, capable of endorsing the feelings hanged on to the delitéaments of the Universe.",
        "The mastery of the medium will do the rest, by means of superpositions, offsets, deviations and some blurring – used with parsimony – seeking both movement, shadows and a latent erasure, as if to scrutinise death and its eventual ghostly persistence. The gestures – in Indian thread – produce a texture soaked in fictional mist and aesthetic scars, which the artist will grind, patiently, with attention and fingering.",
        "The materials, the colours and the fragility of the lines humiliate – together – the real, like a kyrielle of feet of nose. But don’t think of it as a provocation, Mathilde doesn’t do it on purpose – that’s not the idea – that’s her relationship to the world you’re looking at. The works of Mathilde Fages are made up of a series of nebulous appearances, of compound hiatus, which seem to emerge from the space of representation, like blocks of manifest presence."
      ]
    },
    {
      id: "uhlrich",
      title: "Sous les cieux",
      author: "Lucille Uhlrich",
      keyQuote: "“Physically explores the ambivalence of the words impression, or artist’s proof.”",
      content: [
        "Sous les cieux, assembles six engravings of sky divided into six large wooden dice whose notched faces function as interchangeable printing plates. Both printing device and random sculpture, the stacked cubes expose the plates of engravings, usually hidden, like the faces of an image to be built in volume. The images of the sky, taken from enlargements of ancient encyclopedic illustrations, are cut into the ribs of the wood and appear as a black and white organic matter whose support diffracts the planes in space.",
        "The ensemble stresses the function of an image, its permanence, by declining the classicism associated with the technique of engraving in favor of a use of the «offset», a technical error that marks the sensitivity of the printing gesture when passing from the engraved medium to the imprint.",
        "The whole of Mathilde Fages’ work is equally required to make discontinuities of perception appear and disappear. She physically explores the ambivalence of the words impression, or artist’s proof, understood as supports of experiences allowing her to stabilize the passage from a perception to a gesture. His works immerse the viewer in the detail of a landscape with a glare close to the sublime linking image and tangible space."
      ]
    },
    {
      id: "garcelon",
      title: "Hermitage in the Woods",
      author: "Christian Garcelon",
      source: "“I had promised myself before I was forty years old to live as a hermit in the woods” Sylvain Tesson, In the forests of Siberia.",
      keyQuote: "“Fascinated by what is seen, but even more by what is not seen. Everything is inhabited.”",
      content: [
        "Mathilde Fages, by the chance of life as an itinerant artist, laid for a time her suitcases in Haute-Corrèze, between Limousin and Auvergne. On the edge of a solid land, which covered with forests, burying the rocky chaos, plots, houses, streams and rivers in place of an inhabited land. This new chaos of greenery, alternates the forests planted, the forests of depopulation, and all the various and varied thorny thickets that cover this which was built yesterday.",
        "No, Mathilde did not stay in a wooden cabin in a thick forest between the gorges of the Dordogne and the plateau of Millevaches. But, it defies the recent history of change. The promptness with which she perceived the nature of it moved him. Emotion in the face, for a little time again, let us see by superposition the world that was and the one that is. This emotion is to look at what goes through his work. A work of the image that decentres the subject in the register of the motif; the motif as a revelator of the real.",
        "A set of sensitive captured in the clouds, the forms of trees, the blacks of shadows. But also in yesterday’s images, which tell in the form of postcards the forgotten country. There is a total shift between these views of the past and today’s landscapes. His commitment for a sensitive image, and in many poetic respects because it ran through easy narrations to build for those who linger, unfolds with the processes of drawing, printing, light and volume. The whole of the practices is moving.",
        "The technique is at the service. Jean Pierre Pincemin said that an engraving is successful when it comes close to a kind of very Free and fast, where only one idea is expressed at a time as in a conversation. Undoubtedly Mathilde applied in the lithography workshop this wise and striking thought. The lithography is not suitable for chatters, people in a hurry. This relationship to time and landscape, she acquired it during a stay of several months in Nordic countries. Regions that leave those who linger fascinated. Fascinated by what is seen, but even more by what is not seen. Everything is inhabited.",
        "During her stay in Ussel, she approached a technique that was unknown to her. This technique called the black way was conceived in the 17th century by Lieutenant-Colonel Ludwig von Siegen. It consists of inking the substrate and then drawing with various tools that remove ink. Depending on the process, a very white drawing or some kind of grey camaïeux is obtained. From this practice, which intimately links the material and the artist’s gesture, Mathilde constituted a series of images of storms, which during her stay punctuated his days and his nights.",
        "What she appreciates in lithographic techniques is the impossible calage; play the imperfections of the technique that wants to match each pass a color and a place of the image. A slight offset of the sheet and then there is a blurring, a subtle appearance of offsets that bring to the image a dreamlike character. Of this abhorred error of the lithographers, she makes a work because she chooses her images, her real. From there, she deflects the image fixed in the register of the animated image. Animation that emanates from the light. In this, it perpetuates a relationship to colour, inherited from the Impressionists, who themselves were seized with the light of the first photographic techniques.",
        "From the Haute-Corrèze, it retains its forests and skies. In short, where the shadows express themselves; shadows of clouds, shadows of trees. It also retains the lights; lights of lights, light that crosses trees and forests. Everything in a few moments plunges the countries in a soothing or brutal light, and in the darkest blacks. Geographers speak of the Massif Central of a series of countries cut off. Mathilde prefers that of fragmented countries. She tries to reattach what was and what is."
      ]
    },
    {
      id: "collectifs",
      title: "Collectifs & In-situ Installations",
      author: "Rebecca François (MAMAC) & Collective",
      keyQuote: "“Their approach is oriented towards the collection and study of phenomena in which time becomes the expression of a potential reality.”",
      content: [
        "Le Collectif Culbuto: I work within the Culbuto Collective with the desire to share, mix knowledge, techniques and push our abilities around common creations. The Culbuto Collective was born in March 2013 following the invitation of its members: Aurélien Cornut-Gentille / Mathilde Fages / Paul Le Bras / Vivien Roubaud / Guillaume Gouerou / Ugo Schiavi for a one month residence, at Villa Garikula, Georgia.",
        "The first project to see the light of day, and which gives its name to the collective, is a culbuto tree realized with the support of Michel Fedorof and the art center of the Villa Arson. In Georgia, we extracted a tree from its natural environment to provide it with an independent base and dangling in the image of a toy, the culbuto. On a concrete platform, the tree is pushed and moved by the wind. The Culbuto becomes synonymous with oscillation and research. After this first experience, we made a second version by moving an 8-meter high Washingtonia palm.",
        "Ex situ in vito: For the MAMAC exhibition, the Culbuto Collective takes a sample of landscape from the high country of Nice, almost seven meters long. On this ordinary skyline composed of local vegetation and a car carcass, they project their entropic desire. This cross section, frank and radical, is presented in a system of boxes that serves both as a transport device and totally modular and autonomous conservation reconstructing the natural landscape in plan-sequence.",
        "Self-powered by water and electricity, the installation takes on the appearance of a vestige that would be kept alive, preserved, analyzed and exposed. The lamps and sprinkler system also participate in an atmosphere of experimentation, conditioning and acclimatization."
      ]
    }
  ];

  const activeEssay = essays.find((e) => e.id === activeEssayId) || essays[0];

  return (
    <section
      id="texts"
      className="relative min-h-screen bg-brand-bg py-24 md:py-36 border-t border-brand-charcoal/10 overflow-hidden"
    >
      {/* Editorial backdrop accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[radial-gradient(#2a2a2a_0.4px,transparent_0.4px)] [background-size:12px_12px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-20 text-left">
          <p className="font-mono text-xs text-brand-green uppercase tracking-widest mb-3">
            SECTION 04 // EDITORIAL ANALYSIS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text tracking-tight font-light leading-none">
            Artistic Essays
          </h2>
          <div className="w-16 h-[2px] bg-brand-green/40 mt-6" />
        </div>

        {/* Editorial Double Row Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Selector sidebar (3 columns) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="font-mono text-[9px] text-[#777] uppercase tracking-widest block font-bold mb-6">
              EXHIBITION LITERATURE & CRITICAL REVIEWS ⊕
            </span>

            <div className="flex flex-col gap-2.5">
              {essays.map((essay) => {
                const isActive = essay.id === activeEssayId;
                return (
                  <button
                    key={essay.id}
                    onClick={() => setActiveEssayId(essay.id)}
                    className={`w-full text-left p-5 transition-all duration-300 rounded-sm border ${
                      isActive
                        ? "bg-brand-paper border-brand-green/30 shadow-md translate-x-1"
                        : "bg-transparent border-brand-charcoal/5 hover:bg-brand-paper/50 hover:border-brand-charcoal/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-brand-green" : "text-brand-charcoal/40"}`} />
                      <div>
                        <h4 className={`font-serif text-md font-medium leading-tight ${isActive ? "text-brand-green" : "text-brand-text"}`}>
                          {essay.title}
                        </h4>
                        <span className="block font-mono text-[9px] text-[#888] mt-1.5 uppercase tracking-wide">
                          By {essay.author}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Structured index card */}
            <div className="mt-8 p-6 bg-brand-paper/40 border border-brand-charcoal/10 rounded-sm space-y-4">
              <span className="font-mono text-[8px] text-[#777] uppercase tracking-widest block">
                CORE CONCEPTUAL MOTIFS
              </span>
              <ul className="space-y-2.5 text-xs text-brand-charcoal/80">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  <span>The tension of representation & raw material</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  <span>Unstable, hypnagogic images of skies</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-brand-green" />
                  <span>The mechanics of the physical offset error</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Actual reader view pane (8 columns) */}
          <div className="lg:col-span-8 bg-brand-paper border border-brand-charcoal/80 rounded-sm shadow-xl p-8 md:p-12 text-left relative">
            <div className="absolute top-4 right-4 font-mono text-[8px] bg-brand-charcoal/5 text-[#777] px-2 py-1 uppercase rounded-sm">
              INDEX REF // TYPE-0{essays.findIndex(e => e.id === activeEssayId) + 1}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeEssay.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Essay Header */}
                <div className="space-y-2">
                  {activeEssay.source && (
                    <p className="font-sans text-xs italic text-brand-green mb-2">
                      {activeEssay.source}
                    </p>
                  )}
                  <h3 className="font-serif text-2xl md:text-3xl text-brand-text font-semibold">
                    {activeEssay.title}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#777]">
                    Critical Essay by <span className="font-semibold text-brand-green">{activeEssay.author}</span>
                  </div>
                  <div className="w-12 h-[1px] bg-brand-green/40 mt-4" />
                </div>

                {/* Highlighted Key Pull-quote */}
                <div className="relative pl-6 border-l-2 border-brand-green p-4 bg-brand-bg/50">
                  <Quote className="absolute top-2 left-2 w-3.5 h-3.5 text-brand-green/30" />
                  <p className="font-serif italic text-base md:text-lg text-brand-text font-light leading-relaxed">
                    {activeEssay.keyQuote}
                  </p>
                </div>

                {/* Essay Body Paragraphs */}
                <div className="space-y-6 font-serif text-sm md:text-base text-brand-charcoal/90 leading-relaxed font-light">
                  {activeEssay.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
