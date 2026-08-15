"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Wifi, Sparkles } from "lucide-react";

export function LuxuryHeroCard() {
  const [currency, setCurrency] = useState<"USD" | "BTC" | "ETH">("USD");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const balances = {
    USD: "$100,000.00",
    BTC: "1.542 BTC",
    ETH: "31.25 ETH",
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[380px] perspective-[1000px] select-none"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[1.586/1] w-full rounded-2xl p-6 bg-[#111215] border border-[#2c2f38] shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden text-white transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
      >
        {/* Subtle Brushed Metal Texture & Natural Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.08] pointer-events-none" />

        {/* Top Card Row */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-sm font-display text-white">
              TRAVLS
            </span>
            <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-[#d8aa4e] font-mono font-semibold border border-white/10">
              BLACK
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-gray-400 rotate-90" />
            <span className="text-[10px] font-mono text-gray-400">DEBIT</span>
          </div>
        </div>

        {/* EMV Gold Chip */}
        <div className="relative z-10 my-auto flex items-center justify-between">
          <div className="w-10 h-7 rounded bg-gradient-to-br from-[#f2d08a] via-[#c69a3b] to-[#8d691e] border border-[#d8aa4e]/60 p-1 flex flex-col justify-between shadow-inner">
            <div className="w-full h-[1px] bg-[#61450a]/40" />
            <div className="w-full h-[1px] bg-[#61450a]/40" />
          </div>

          {/* Interactive Balance Switcher Pill */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrency((c) => (c === "USD" ? "BTC" : c === "BTC" ? "ETH" : "USD"));
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-colors cursor-pointer"
          >
            <span className="text-[#d8aa4e] font-bold">{balances[currency]}</span>
            <span className="text-[9px] text-gray-400 uppercase">({currency})</span>
          </button>
        </div>

        {/* Card Number & Holder Name */}
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <div className="text-sm font-mono tracking-widest text-gray-300">
              •••• •••• •••• 8842
            </div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-gray-400 mt-0.5">
              Alexander Vance · Platinum VIP
            </div>
          </div>

          {/* Card Scheme / Logo */}
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#d8aa4e]/80" />
            <div className="w-6 h-6 rounded-full bg-white/40" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
