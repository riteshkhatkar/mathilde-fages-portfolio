/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Hammer, Trees, Sparkles, Sliders, Layers, Move, Info } from "lucide-react";

function ThreeDArtRectangle() {
  const [rotateX, setRotateX] = useState(-18);
  const [rotateY, setRotateY] = useState(32);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isFollowingCursor, setIsFollowingCursor] = useState(false);
  const [isHoldingFollow, setIsHoldingFollow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFaceIdx, setActiveFaceIdx] = useState(0);

  const dragStart = useRef({ x: 0, y: 0 });
  const touchStartPos = useRef({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTouchTimeRef = useRef<number>(0);

  const faces = [
    {
      name: "Front Face",
      title: "Surimpression",
      medium: "Etching",
      size: "30 x 25 cm",
      year: 2014,
      description: "Nebulous appearances emerging from the space of representation — a dreamlike landscape held in etching.",
      image: "/images/surimpression_etching_1781157149855.jpg"
    },
    {
      name: "Back Face",
      title: "Manière noire 4",
      medium: "Lithography, black way technique",
      size: "56 x 38 cm",
      year: 2019,
      description: "Storm images created by inking the entire substrate and drawing by removing ink — grey camaïeux and luminous whites.",
      image: "/images/maniere_noire_storm_1781157186874.jpg"
    },
    {
      name: "Left Face",
      title: "Auto-portrait (Iceland)",
      medium: "Lithography stone",
      size: "37 x 27 cm",
      year: 2011,
      description: "Nordic landscapes made in Iceland — wild coastline and pine forest silhouetted against an eerie luminous sky.",
      image: "/images/auto_portrait_iceland_1781157248352.jpg"
    },
    {
      name: "Right Face",
      title: "Roche mystérieuse",
      medium: "Lithography",
      size: "56 x 38 cm",
      year: 2019,
      description: "Multi-pass color lithograph exploiting offset imperfections to produce a vivid, dreamlike rock formation.",
      image: "/images/roche_mysterieuse_litho_1781157228500.jpg"
    },
    {
      name: "Top Face",
      title: "Tchernobyl Memories",
      medium: "Drawing with acetone",
      size: "Variable",
      year: 2023,
      description: "Spectral acetone transfer drawings evoking the ghostly ruins and persistent vegetation of the Chernobyl zone.",
      image: "/images/tchernobyl_memories_drawing_1781157209322.jpg"
    },
    {
      name: "Bottom Face",
      title: "Sous les Cieux",
      medium: "Wood engraving — sculptural printing device",
      size: "1m50 x 1m x 50cm",
      year: 2018,
      description: "Six large wooden dice with notched faces as interchangeable sky engraving printing plates — both sculpture and printing device.",
      image: "/images/sous_les_cieux_cubes_1781157169320.jpg"
    }
  ];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAutoRotateFallback = (delay = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, delay);
  };

  const timeoutHoldRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAutoRotate = (delay = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAutoRotate(true);
    }, delay);
  };

  // Slow drift when idle
  useEffect(() => {
    if (!autoRotate || isDragging || isFollowingCursor || isHoldingFollow) return;
    let animId: number;
    const animate = () => {
      setRotateY((y) => (y + 0.3) % 360);
      setRotateX((x) => x + Math.sin(Date.now() * 0.001) * 0.03); // gentle vertical rock
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timeoutHoldRef.current) clearTimeout(timeoutHoldRef.current);
    };
  }, [autoRotate, isDragging, isFollowingCursor, isHoldingFollow]);

  const handleStart = (clientX: number, clientY: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDragging(true);
    setAutoRotate(false);
    dragStart.current = { x: clientX, y: clientY };
    touchStartPos.current = { x: clientX, y: clientY };

    if (timeoutHoldRef.current) clearTimeout(timeoutHoldRef.current);
    timeoutHoldRef.current = setTimeout(() => {
      setIsHoldingFollow(true);
    }, 250); // Hold for 250ms to trigger follow
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging && !isFollowingCursor && !isHoldingFollow) return;

    // If they drag significantly, cancel the hold timer so it is a standard drag-rotate
    if (!isFollowingCursor && !isHoldingFollow) {
      const dist = Math.sqrt(
        Math.pow(clientX - touchStartPos.current.x, 2) + 
        Math.pow(clientY - touchStartPos.current.y, 2)
      );
      if (dist > 8) {
        if (timeoutHoldRef.current) {
          clearTimeout(timeoutHoldRef.current);
          timeoutHoldRef.current = null;
        }
      }
    }

    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const relativeX = clientX - centerX;
      const relativeY = clientY - centerY;

      if (isFollowingCursor || isHoldingFollow) {
        // Limit transformation within container
        const limitX = rect.width / 2 - 25;
        const limitY = rect.height / 2 - 25;
        const tx = Math.max(-limitX, Math.min(limitX, relativeX));
        const ty = Math.max(-limitY, Math.min(limitY, relativeY));
        setTranslateX(tx);
        setTranslateY(ty);

        // Also add responsive tilting relative to position
        const tiltY = 32 + (tx / Math.max(1, limitX)) * 36;
        const tiltX = -18 - (ty / Math.max(1, limitY)) * 36;
        setRotateY(tiltY);
        setRotateX(tiltX);
        return;
      }
    }

    if (isDragging) {
      const dx = clientX - dragStart.current.x;
      const dy = clientY - dragStart.current.y;
      
      setRotateY((y) => y + dx * 0.6);
      setRotateX((x) => Math.max(-90, Math.min(90, x - dy * 0.6)));
      
      dragStart.current = { x: clientX, y: clientY };
    }
  };

  const handleEnd = () => {
    if (timeoutHoldRef.current) {
      clearTimeout(timeoutHoldRef.current);
      timeoutHoldRef.current = null;
    }

    setIsDragging(false);

    if (isHoldingFollow) {
      setIsHoldingFollow(false);
      setTranslateX(0);
      setTranslateY(0);
      triggerAutoRotate(4000);
    } else if (!isFollowingCursor) {
      triggerAutoRotate(4000);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (timeoutHoldRef.current) clearTimeout(timeoutHoldRef.current);

    const nextFollowing = !isFollowingCursor;
    setIsFollowingCursor(nextFollowing);

    if (nextFollowing) {
      setAutoRotate(false);
      if (viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tx = Math.max(-rect.width / 2 + 25, Math.min(rect.width / 2 - 25, e.clientX - centerX));
        const ty = Math.max(-rect.height / 2 + 25, Math.min(rect.height / 2 - 25, e.clientY - centerY));
        setTranslateX(tx);
        setTranslateY(ty);
      }
    } else {
      setTranslateX(0);
      setTranslateY(0);
      triggerAutoRotate(4000);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    const now = Date.now();
    const diff = now - lastTouchTimeRef.current;
    lastTouchTimeRef.current = now;

    if (diff < 300) {
      // Double tap detected!
      e.preventDefault();
      if (timeoutHoldRef.current) {
        clearTimeout(timeoutHoldRef.current);
        timeoutHoldRef.current = null;
      }
      
      const nextFollowing = !isFollowingCursor;
      setIsFollowingCursor(nextFollowing);
      
      if (nextFollowing) {
        setAutoRotate(false);
        const touch = e.touches[0];
        if (viewportRef.current) {
          const rect = viewportRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const tx = Math.max(-rect.width / 2 + 25, Math.min(rect.width / 2 - 25, touch.clientX - centerX));
          const ty = Math.max(-rect.height / 2 + 25, Math.min(rect.height / 2 - 25, touch.clientY - centerY));
          setTranslateX(tx);
          setTranslateY(ty);
        }
      } else {
        setTranslateX(0);
        setTranslateY(0);
        triggerAutoRotate(4000);
      }
      return;
    }

    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleContainerMouseLeave = () => {
    handleEnd();
  };

  const handleSnapToFace = (idx: number) => {
    setAutoRotate(false);
    setIsFollowingCursor(false);
    setIsHoldingFollow(false);
    setTranslateX(0);
    setTranslateY(0);
    setActiveFaceIdx(idx);
    
    const angles = [
      { x: 0, y: 0 },       // Front
      { x: 0, y: 180 },     // Back
      { x: 0, y: 90 },      // Left
      { x: 0, y: -90 },     // Right
      { x: -90, y: 0 },     // Top
      { x: 90, y: 0 },      // Bottom
    ];
    
    setRotateX(angles[idx].x);
    setRotateY(angles[idx].y);
    triggerAutoRotate(5000);
  };

  const activeFace = faces[activeFaceIdx];

  return (
    <div className="w-full max-w-[430px] bg-brand-paper border border-brand-charcoal/10 rounded-sm p-6 shadow-xl flex flex-col gap-6 text-left relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-3">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-brand-green uppercase font-bold block">
            SOUS LES CIEUX // ENGRAVING MATRIX ⊕
          </span>
          <span className="font-mono text-[7px] text-[#777] uppercase">
            3D Interactive Wood-Dice Rectangular Model
          </span>
        </div>
      </div>

      {/* 3D Cube Perspective Box */}
      <div 
        ref={viewportRef}
        className="relative w-full h-[320px] bg-brand-bg/40 rounded-sm flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none border border-brand-charcoal/5"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => {
          if (isDragging || isFollowingCursor || isHoldingFollow) {
            handleMove(e.clientX, e.clientY);
          }
        }}
        onMouseUp={handleEnd}
        onMouseLeave={handleContainerMouseLeave}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => {
          if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handleEnd}
      >
        {/* The 3D viewport */}
        <div className="[perspective:800px] w-full h-full flex items-center justify-center">
          <div 
            className="relative transition-transform"
            style={{
              width: "200px",
              height: "260px",
              transformStyle: "preserve-3d",
              transform: `translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: (isDragging || isFollowingCursor || isHoldingFollow) ? "none" : "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
            }}
          >
            {/* 1. FRONT face (W=200, H=260) */}
            <div 
              className="absolute inset-0 bg-brand-paper shadow-md"
              style={{
                width: "200px",
                height: "260px",
                transform: "rotateY(0deg) translateZ(70px)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="w-full h-full p-2 border border-brand-charcoal/10 flex flex-col justify-between">
                <div className="w-full h-[200px] overflow-hidden bg-brand-bg/5 rounded-sm">
                  <img src={faces[0].image} alt={faces[0].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="font-mono text-[7px] text-brand-charcoal/80 flex justify-between items-center bg-brand-bg/50 px-1.5 py-0.5 mt-1 border border-brand-charcoal/5">
                  <span className="font-bold truncate max-w-[125px]">{faces[0].title}</span>
                  <span>1/6</span>
                </div>
              </div>
            </div>

            {/* 2. BACK face (W=200, H=260) */}
            <div 
              className="absolute inset-0 bg-brand-paper shadow-md"
              style={{
                width: "200px",
                height: "260px",
                transform: "rotateY(180deg) translateZ(70px)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="w-full h-full p-2 border border-brand-charcoal/10 flex flex-col justify-between">
                <div className="w-full h-[200px] overflow-hidden bg-brand-bg/5 rounded-sm">
                  <img src={faces[1].image} alt={faces[1].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="font-mono text-[7px] text-brand-charcoal/80 flex justify-between items-center bg-brand-bg/50 px-1.5 py-0.5 mt-1 border border-brand-charcoal/5">
                  <span className="font-bold truncate max-w-[125px]">{faces[1].title}</span>
                  <span>2/6</span>
                </div>
              </div>
            </div>

            {/* 3. LEFT face (W=140, H=260, left offset 30px) */}
            <div 
              className="absolute bg-brand-paper shadow-md"
              style={{
                width: "140px",
                height: "260px",
                left: "30px",
                transform: "rotateY(-90deg) translateZ(100px)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="w-full h-full p-2 border border-brand-charcoal/10 flex flex-col justify-between">
                <div className="w-full h-[200px] overflow-hidden bg-brand-bg/5 rounded-sm">
                  <img src={faces[2].image} alt={faces[2].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="font-mono text-[7px] text-brand-charcoal/80 flex justify-between items-center bg-brand-bg/50 px-1.5 py-0.5 mt-1 border border-brand-charcoal/5">
                  <span className="font-bold truncate max-w-[85px]">{faces[2].title}</span>
                  <span>3/6</span>
                </div>
              </div>
            </div>

            {/* 4. RIGHT face (W=140, H=260, left offset 30px) */}
            <div 
              className="absolute bg-brand-paper shadow-md"
              style={{
                width: "140px",
                height: "260px",
                left: "30px",
                transform: "rotateY(90deg) translateZ(100px)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="w-full h-full p-2 border border-brand-charcoal/10 flex flex-col justify-between">
                <div className="w-full h-[200px] overflow-hidden bg-brand-bg/5 rounded-sm">
                  <img src={faces[3].image} alt={faces[3].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="font-mono text-[7px] text-brand-charcoal/80 flex justify-between items-center bg-brand-bg/50 px-1.5 py-0.5 mt-1 border border-brand-charcoal/5">
                  <span className="font-bold truncate max-w-[85px]">{faces[3].title}</span>
                  <span>4/6</span>
                </div>
              </div>
            </div>

            {/* 5. TOP face (W=200, H=140, top offset 60px) */}
            <div 
              className="absolute bg-brand-paper shadow-md"
              style={{
                width: "200px",
                height: "140px",
                top: "60px",
                transform: "rotateX(90deg) translateZ(130px)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="w-full h-full p-1.5 border border-brand-charcoal/10 flex flex-col justify-between">
                <div className="w-full h-[95px] overflow-hidden bg-brand-bg/5 rounded-sm">
                  <img src={faces[4].image} alt={faces[4].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="font-mono text-[6px] text-brand-charcoal/80 flex justify-between items-center bg-brand-bg/50 px-1 py-0.5 mt-0.5 border border-brand-charcoal/5">
                  <span className="font-bold truncate max-w-[125px]">{faces[4].title}</span>
                  <span>5/6</span>
                </div>
              </div>
            </div>

            {/* 6. BOTTOM face (W=200, H=140, top offset 60px) */}
            <div 
              className="absolute bg-brand-paper shadow-md"
              style={{
                width: "200px",
                height: "140px",
                top: "60px",
                transform: "rotateX(-90deg) translateZ(130px)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="w-full h-full p-1.5 border border-brand-charcoal/10 flex flex-col justify-between">
                <div className="w-full h-[95px] overflow-hidden bg-brand-bg/5 rounded-sm">
                  <img src={faces[5].image} alt={faces[5].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="font-mono text-[6px] text-brand-charcoal/80 flex justify-between items-center bg-brand-bg/50 px-1 py-0.5 mt-0.5 border border-brand-charcoal/5">
                  <span className="font-bold truncate max-w-[125px]">{faces[5].title}</span>
                  <span>6/6</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Manual Snap Controls (Six Faces Buttons) */}
      <div className="grid grid-cols-3 gap-1.5">
        {faces.map((f, i) => (
          <button
            key={i}
            onClick={() => handleSnapToFace(i)}
            className={`py-1.5 px-1 border font-mono text-[7px] tracking-tighter uppercase transition-all duration-300 rounded-sm cursor-pointer ${
              activeFaceIdx === i 
                ? "bg-brand-charcoal text-brand-bg border-brand-charcoal font-bold" 
                : "border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-charcoal/5"
            }`}
          >
            {f.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Dynamic Metadata Details Panel */}
      <div className="p-4 bg-brand-bg/70 border border-brand-charcoal/5 rounded-sm space-y-2">
        <div className="flex items-start justify-between border-b border-brand-charcoal/10 pb-1.5">
          <div>
            <span className="font-mono text-[6.5px] text-[#777] uppercase tracking-widest font-bold">
              {activeFace.name} // METADATA
            </span>
            <h4 className="font-serif text-sm font-semibold text-brand-text truncate">
              {activeFace.title}
            </h4>
          </div>
          <span className="font-mono text-[7px] bg-brand-green/10 text-brand-green px-1.5 py-0.5 rounded-sm font-extrabold whitespace-nowrap">
            {activeFace.year}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono text-[7.5px] text-[#666] uppercase">
          <div>
            <span className="block font-bold text-brand-text/50">MEDIUM:</span>
            <span className="text-brand-text truncate block">{activeFace.medium}</span>
          </div>
          <div>
            <span className="block font-bold text-brand-text/50">DIMENSIONS:</span>
            <span className="text-brand-text truncate block">{activeFace.size}</span>
          </div>
        </div>

        <p className="font-serif text-[10.5px] text-brand-text/80 leading-relaxed italic border-t border-brand-charcoal/5 pt-1.5">
          "{activeFace.description}"
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const columns = [
    {
      title: "Printmaking",
      icon: <Hammer className="w-5 h-5 text-brand-green" />,
      items: [
        "lithography",
        "etching",
        "wood engraving",
        "stencil",
        "relief printing"
      ],
      description: "Graphic techniques of carving, biting and chemical subtraction onto solid foundations."
    },
    {
      title: "Landscape",
      icon: <Trees className="w-5 h-5 text-brand-green" />,
      items: [
        "forests",
        "skies",
        "ruins",
        "clouds",
        "architectural borders"
      ],
      description: "The raw physical motifs of transient spaces that emerge and dissolve under light."
    },
    {
      title: "Transformation",
      icon: <Sparkles className="w-5 h-5 text-brand-green" />,
      items: [
        "layering",
        "offset",
        "blurring",
        "disappearance",
        "movement",
        "volume"
      ],
      description: "Ethereal processes capturing the tactile errors and ghostly persistence of images."
    }
  ];

  return (
    <section
      id="process"
      className="relative min-h-screen bg-brand-bg py-24 md:py-36 border-t border-brand-charcoal/10 overflow-hidden"
    >
      {/* Decorative background grid and metrics */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-[radial-gradient(#33443a_0.4px,transparent_0.4px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 text-left">
            <p className="font-mono text-xs text-brand-green uppercase tracking-widest mb-3">
              SECTION 04 // CRAFT METHODOLOGY
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-text tracking-tight font-light leading-none">
              Matter, Gesture, Impression
            </h2>
            <div className="w-16 h-[2px] bg-brand-green/40 mt-6" />
            <p className="font-serif text-base text-brand-text/70 mt-6 leading-relaxed max-w-xl">
              Exploring the physical mechanics of the matrix. Press, wood grain, chemical erosion and human presence are captured as indelible traces.
            </p>
          </div>
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <ThreeDArtRectangle />
          </div>
        </div>

        {/* 3 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
          {columns.map((col, idx) => (
            <div 
              key={idx}
              className="bg-brand-paper hover:bg-brand-paper/90 border border-brand-charcoal/10 p-8 rounded-sm shadow-lg flex flex-col justify-between transition-all duration-500 hover:-translate-y-1"
            >
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-bg rounded-sm border border-brand-charcoal/5 shadow-inner">
                      {col.icon}
                    </div>
                    <h3 className="font-serif text-xl font-medium text-brand-text tracking-tight">
                      {col.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[8px] text-[#999]">COL_0{idx+1}</span>
                </div>

                <div className="font-mono text-[8px] tracking-wider text-brand-green/60 uppercase">
                  COLUMN 0{idx + 1} // STRUCTURAL UNIT
                </div>

                <p className="font-serif text-sm text-[#777] italic leading-relaxed text-left">
                  {col.description}
                </p>

                <div className="h-[1px] bg-brand-charcoal/10 w-full" />

                {/* List items */}
                <ul className="space-y-3.5 text-left">
                  {col.items.map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-brand-text/85"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
