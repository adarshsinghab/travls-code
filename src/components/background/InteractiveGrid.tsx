"use client";

import { useEffect, useState } from "react";

export function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-[#07080b]" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-grid-cyber opacity-35" />

      {/* Gold Dot Accents */}
      <div className="absolute inset-0 bg-dots-gold opacity-30" />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="absolute rounded-full transition-opacity duration-300 blur-[130px] opacity-25"
        style={{
          width: "600px",
          height: "600px",
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.15) 50%, transparent 70%)",
        }}
      />

      {/* Ambient Top Left Golden Beam */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-amber-500/10 blur-[150px] animate-pulse-glow" />

      {/* Ambient Bottom Right Subtle Cyan/Gold Depth Glow */}
      <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full bg-amber-600/10 blur-[160px]" />

      {/* Center Subtle Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,8,11,0.75)_80%,#07080b_100%)]" />
    </div>
  );
}
