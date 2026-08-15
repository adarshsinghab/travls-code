"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

export function BrandHeader() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Brand Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3.5 group cursor-pointer"
      >
        {/* Modern TRAVLS Icon with Golden Twin Arrows */}
        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_25px_rgba(245,158,11,0.5)] p-[2px]">
          <div className="w-full h-full bg-[#090b10] rounded-[10px] flex items-center justify-center gap-[3px] overflow-hidden group-hover:bg-[#06070a] transition-colors">
            {/* Double Arrow Glyph */}
            <div className="flex flex-col items-center">
              <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-amber-400"></span>
              <span className="w-[3px] h-[8px] bg-amber-400 rounded-sm"></span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-amber-300"></span>
              <span className="w-[3px] h-[10px] bg-amber-300 rounded-sm"></span>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-baseline">
          <span className="font-extrabold text-2xl lg:text-3xl tracking-tight text-amber-400 font-display">
            TRAVLS
          </span>
          <span className="font-bold text-2xl lg:text-3xl text-gray-200 font-display">
            .io
          </span>
        </div>
      </motion.div>

      {/* Network / Security Pill */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121620]/90 border border-amber-500/20 backdrop-blur-md text-xs font-medium text-amber-300/90 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="hidden sm:inline">Web3 Travel Network</span>
        <span className="sm:hidden">v2.6</span>
        <span className="text-amber-500/40">|</span>
        <span className="text-gray-400 flex items-center gap-1 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          Multi-Sig
        </span>
      </motion.div>
    </div>
  );
}
