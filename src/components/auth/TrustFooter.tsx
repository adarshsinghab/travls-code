"use client";

import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

export function TrustFooter() {
  return (
    <div className="w-full pt-4 space-y-2.5 select-none border-t border-gray-100 dark:border-[#202432] mt-4">
      {/* 256-bit SSL Badge from reference */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <Lock className="w-3.5 h-3.5 text-[#9e7428] dark:text-[#d8aa4e]" />
        <span className="font-medium">256-bit SSL encryption</span>
      </div>

      {/* Compliance & Custody Badges */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-400 dark:text-gray-400 font-mono">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          PCI-DSS Level 1
        </span>
        <span>·</span>
        <span>Fireblocks MPC</span>
        <span>·</span>
        <span>SOC-2 Type II</span>
      </div>
    </div>
  );
}
