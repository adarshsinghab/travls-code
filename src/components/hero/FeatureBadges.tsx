"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe2, ChevronRight } from "lucide-react";

export function FeatureBadges() {
  const features = [
    {
      id: "security",
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: "PCI-DSS Compliant & Bank-Grade Security",
      desc: "Hardware-enforced Multi-Sig custody with Fireblocks MPC protection",
      badge: "ISO 27001",
    },
    {
      id: "instant-load",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Instant Crypto-to-Fiat Card Loads",
      desc: "0% slippage auto-conversion for BTC, ETH, SOL, USDT to USD/EUR/GBP",
      badge: "Sub-Second",
    },
    {
      id: "global-reservations",
      icon: <Globe2 className="w-5 h-5 text-amber-400" />,
      title: "Global Flight & Hotel Reservations",
      desc: "Instant booking across 2.2M+ luxury hotels and 600+ airlines worldwide",
      badge: "180+ Countries",
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {features.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
          whileHover={{ x: 6, transition: { duration: 0.2 } }}
          className="group relative flex items-start gap-3.5 p-3 rounded-xl bg-[#0e111a]/60 border border-amber-500/15 hover:border-amber-500/40 hover:bg-[#131722]/80 transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)]"
        >
          {/* Glowing Icon Container */}
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/25 group-hover:border-amber-400/60 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 shrink-0 mt-0.5">
            {item.icon}
          </div>

          {/* Text Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-gray-100 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h4>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-amber-500/10 text-amber-400/90 border border-amber-500/20">
                {item.badge}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
