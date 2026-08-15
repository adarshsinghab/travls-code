"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Wifi, Sparkles, ArrowUpRight, Shield, Zap } from "lucide-react";

export function HolographicCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [currencyMode, setCurrencyMode] = useState<"usd" | "btc" | "eth">("usd");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.6,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const balances = {
    usd: "$48,250.00",
    btc: "0.7850 BTC",
    eth: "16.420 ETH",
  };

  return (
    <div className="w-full max-w-[430px] mx-auto select-none">
      {/* 3D Perspective Wrapper */}
      <div
        className="card-3d-wrap py-2 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
          className="card-3d-inner relative w-full aspect-[1.586/1] rounded-2xl p-6 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(245,158,11,0.2)] border border-amber-500/30 overflow-hidden bg-gradient-to-br from-[#121620] via-[#0b0e14] to-[#06070a] group"
        >
          {/* Subtle Brushed Metal Background Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Dynamic Holographic Glare Layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.15) 30%, transparent 60%)`,
            }}
          />

          {/* Card Gold Edge Bevel */}
          <div className="absolute inset-0 rounded-2xl border border-amber-400/20 pointer-events-none" />

          {/* Top Row: Brand & Contactless Icon */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-sm font-display text-amber-400">
                TRAVLS
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wide uppercase">
                Black VIP
              </span>
            </div>

            <div className="flex items-center gap-2 text-amber-300/80">
              <Wifi className="w-5 h-5 rotate-90" />
            </div>
          </div>

          {/* Chip & Instant Card Load Row */}
          <div className="relative z-10 flex items-center justify-between mt-4 md:mt-5">
            {/* Metallic Gold EMV Chip */}
            <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-[#0a0c12] rounded-[4px] relative overflow-hidden flex items-center justify-center">
                <div className="w-full h-[1px] bg-amber-400/60 absolute top-2.5" />
                <div className="w-full h-[1px] bg-amber-400/60 absolute bottom-2.5" />
                <div className="h-full w-[1px] bg-amber-400/60 absolute left-4" />
                <div className="h-full w-[1px] bg-amber-400/60 absolute right-4" />
                <div className="w-2.5 h-2.5 rounded-full border border-amber-400/80" />
              </div>
            </div>

            {/* Live Balance Mini Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrencyMode((prev) =>
                  prev === "usd" ? "btc" : prev === "btc" ? "eth" : "usd"
                );
              }}
              className="px-2.5 py-1 rounded-lg bg-black/60 border border-amber-500/30 text-right hover:border-amber-400 transition-all backdrop-blur-md"
            >
              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1 justify-end">
                <span>Available Balance</span>
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              </div>
              <div className="text-xs md:text-sm font-bold text-amber-300 font-mono tracking-tight flex items-center gap-1">
                {balances[currencyMode]}
                <span className="text-[9px] text-emerald-400 font-normal">● Live</span>
              </div>
            </button>
          </div>

          {/* Embossed Card Number */}
          <div className="relative z-10 mt-4 md:mt-5 font-mono text-sm md:text-base tracking-[0.22em] text-gray-300 font-semibold text-shadow-sm flex items-center justify-between">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span className="text-amber-300 font-bold">8829</span>
          </div>

          {/* Bottom Row: Holder Name, Expiry & Hologram */}
          <div className="relative z-10 mt-3 md:mt-4 flex items-end justify-between">
            <div>
              <div className="text-[8px] uppercase tracking-widest text-amber-400/70 font-mono">
                Cardholder Name
              </div>
              <div className="text-xs md:text-sm font-semibold tracking-wider text-gray-200 font-mono uppercase">
                Alexander V. Vane
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <div className="text-[8px] uppercase tracking-widest text-amber-400/70 font-mono">
                  Expires
                </div>
                <div className="text-xs font-mono font-medium text-gray-300">08/29</div>
              </div>

              {/* Holographic Payment Logo */}
              <div className="flex -space-x-2 opacity-90">
                <div className="w-6 h-6 rounded-full bg-amber-500/80 border border-amber-300/40" />
                <div className="w-6 h-6 rounded-full bg-yellow-400/70 border border-yellow-200/40 backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-gray-400">
        <span className="flex items-center gap-1.5 text-amber-400/80">
          <Zap className="w-3 h-3 text-amber-400" />
          Interactive 3D Metal Card
        </span>
        <span className="text-gray-400 hover:text-amber-300 transition-colors">
          Click balance to cycle USD / BTC / ETH
        </span>
      </div>
    </div>
  );
}
