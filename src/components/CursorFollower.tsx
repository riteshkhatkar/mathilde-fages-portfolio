/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";

interface CursorFollowerProps {
  theme: "light" | "dark";
}

export default function CursorFollower({ theme }: CursorFollowerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (
        targetEl.tagName === "BUTTON" ||
        targetEl.tagName === "A" ||
        targetEl.closest("button") ||
        targetEl.closest("a") ||
        targetEl.classList.contains("cursor-pointer")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-[10000] mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate3d(-50%, -50%, 0)",
        transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
      }}
    >
      <div
        className={`rounded-full border border-white transition-all duration-300 ${
          hovering ? "w-8 h-8 bg-white/10 scale-110" : "w-4 h-4 bg-transparent"
        }`}
      />
    </div>
  );
}
