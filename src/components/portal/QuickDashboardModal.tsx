"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  CreditCard,
  Plane,
  Building2,
  Lock,
  ArrowUpRight,
  LogOut,
  Sparkles,
  QrCode,
  ShieldCheck,
  Check,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

interface QuickDashboardModalProps {
  userIdentifier: string;
  onLogout: () => void;
}

export function QuickDashboardModal({
  userIdentifier,
  onLogout,
}: QuickDashboardModalProps) {
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#d8aa4e", "#9e7428", "#121316", "#10b981"],
      });
    } catch {
      // ignore in environments without canvas
    }
  }, []);

  const handleCopyHash = () => {
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#12141c] border border-gray-200 dark:border-[#232735] shadow-lg text-gray-900 dark:text-gray-100"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-200 dark:border-[#202432]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#121316] dark:bg-[#1e2230] border border-gray-200 dark:border-[#2f3548] flex items-center justify-center text-[#d8aa4e]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold font-display text-gray-900 dark:text-white">
                TRAVLS Private Suite
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-gray-100 dark:bg-[#1e2230] text-gray-700 dark:text-[#d8aa4e] border border-gray-200 dark:border-[#2f3548]">
                Tier: Platinum Elite
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Authenticated:{" "}
              <span className="text-gray-900 dark:text-white font-semibold">
                {userIdentifier}
              </span>
            </p>
          </div>
        </div>

        {/* Log Out */}
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-[#181b26] hover:bg-gray-200 dark:hover:bg-[#202434] border border-gray-200 dark:border-[#282d3e] text-xs font-semibold text-gray-700 dark:text-gray-200 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-gray-500" />
          <span>Exit to Login</span>
        </button>
      </div>

      {/* Grid of Card Management & Travel Perks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Left: Metal Card Spend & Controls */}
        <div className="md:col-span-1 rounded-xl bg-gray-50 dark:bg-[#151822] border border-gray-200 dark:border-[#242836] p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#9e7428] dark:text-[#d8aa4e]" />
              Black Metal Card
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                isCardFrozen
                  ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300"
                  : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {isCardFrozen ? "FROZEN" : "ACTIVE"}
            </span>
          </div>

          <div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Available Daily Limit
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
              $100,000.00 <span className="text-xs text-gray-400 font-normal">USD</span>
            </div>
            <div className="text-[11px] text-[#9e7428] dark:text-[#d8aa4e] font-mono mt-0.5">
              ≈ 1.542 BTC · Instant Multi-Sig Liquidity
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-[#242836]">
            <button
              type="button"
              onClick={() => setIsCardFrozen(!isCardFrozen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#1c202d] border border-gray-200 dark:border-[#2b3040] hover:bg-gray-50 dark:hover:bg-[#222736] text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-gray-500" />
                {isCardFrozen ? "Unfreeze Card" : "Freeze Card"}
              </span>
              <span className="text-[10px] text-gray-400">Instant</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-[#1c202d] border border-gray-200 dark:border-[#2b3040] hover:bg-gray-50 dark:hover:bg-[#222736] text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                {showPin ? (
                  <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                )}
                {showPin ? "Hide PIN: 4892" : "Reveal PIN"}
              </span>
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                {showPin ? "4892" : "••••"}
              </span>
            </button>
          </div>
        </div>

        {/* Right 2 Cols: Confirmed Reservations & Search */}
        <div className="md:col-span-2 space-y-4">
          {/* Confirmed Itinerary */}
          <div className="rounded-xl bg-gray-50 dark:bg-[#151822] border border-gray-200 dark:border-[#242836] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-200 dark:bg-[#202434] text-gray-800 dark:text-white">
                  <Plane className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Upcoming Itinerary
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Confirmed on-chain
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-gray-200 dark:border-[#242836]">
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  DXB ✈️ HND (Dubai to Tokyo)
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Emirates First Class · Suite 2A
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Depart: Sep 24, 2026
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  Settled: 0.042 BTC
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-gray-500 dark:text-gray-400 font-mono">
                Booking Hash: 0x9d4a83c1...
              </span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-[#9e7428] dark:text-[#d8aa4e] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-3 h-3" />
                    <span>Boarding Pass QR</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bespoke Luxury Booking Callout */}
          <div className="rounded-xl bg-gray-50 dark:bg-[#151822] border border-gray-200 dark:border-[#242836] p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-[#202434] flex items-center justify-center text-gray-800 dark:text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900 dark:text-white">
                  Book Flights &amp; 5-Star Villas with Crypto
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  2.2M+ properties with automatic multi-currency conversion
                </div>
              </div>
            </div>

            <button
              type="button"
              className="luxury-btn-primary flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            >
              <span>Explore Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
