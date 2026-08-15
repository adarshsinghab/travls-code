"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import { Plane, CreditCard, Sparkles } from "lucide-react";

interface TokenItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  className: string;
  animate: TargetAndTransition;
}

export function FloatingTokenOrbit() {
  const tokens: TokenItem[] = [
    {
      id: "btc",
      icon: (
        <span className="font-bold text-amber-400 text-lg select-none font-mono">₿</span>
      ),
      label: "BTC",
      className: "top-[12%] right-[10%] xl:right-[15%]",
      animate: {
        y: [0, -12, 0],
        rotate: [0, 4, -4, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      id: "eth",
      icon: (
        <svg className="w-5 h-5 text-amber-300 fill-current" viewBox="0 0 32 32">
          <path d="M16 2L6 18.5l10 6 10-6L16 2zm0 3.2l6.8 11.2L16 19.8 9.2 16.4 16 5.2zM6 20.8l10 9.2 10-9.2-10 6-10-6z" />
        </svg>
      ),
      label: "ETH",
      className: "bottom-[22%] right-[14%] xl:right-[20%]",
      animate: {
        y: [0, 14, 0],
        rotate: [0, -6, 6, 0],
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
      },
    },
    {
      id: "usdt",
      icon: (
        <span className="font-bold text-amber-400 text-base select-none font-mono">₮</span>
      ),
      label: "USDT",
      className: "bottom-[8%] left-[28%] xl:left-[35%]",
      animate: {
        y: [0, -10, 0],
        rotate: [0, 5, -3, 0],
        transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
      },
    },
    {
      id: "plane",
      icon: <Plane className="w-4 h-4 text-amber-400 rotate-45" />,
      label: "Travel",
      className: "top-[38%] right-[8%] xl:right-[12%]",
      animate: {
        y: [0, -16, 0],
        x: [0, 6, 0],
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
      },
    },
    {
      id: "card",
      icon: <CreditCard className="w-4 h-4 text-amber-300" />,
      label: "Metal Card",
      className: "top-[25%] right-[28%] xl:right-[32%]",
      animate: {
        y: [0, 10, 0],
        transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 },
      },
    },
    {
      id: "sparkles",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      label: "VIP",
      className: "top-[8%] left-[45%]",
      animate: {
        scale: [1, 1.15, 1],
        opacity: [0.7, 1, 0.7],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      },
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {tokens.map((token) => (
        <motion.div
          key={token.id}
          className={`absolute ${token.className}`}
          animate={token.animate}
          whileHover={{ scale: 1.25, rotate: 12 }}
        >
          <div className="relative group cursor-pointer pointer-events-auto">
            {/* Glow Aura */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/40 to-yellow-500/20 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Token Badge */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#0d1017]/90 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-md transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] group-hover:bg-[#141824]">
              {token.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
