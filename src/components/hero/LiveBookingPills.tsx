"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Building2, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface BookingItem {
  id: string;
  type: "flight" | "hotel" | "card";
  title: string;
  destination: string;
  cryptoAmount: string;
  fiatValue: string;
  token: "BTC" | "ETH" | "USDT" | "SOL";
  timeAgo: string;
}

const SAMPLE_BOOKINGS: BookingItem[] = [
  {
    id: "1",
    type: "flight",
    title: "Emirates First Class Suite",
    destination: "Dubai (DXB) ➔ Tokyo (HND)",
    cryptoAmount: "0.042 BTC",
    fiatValue: "$4,120",
    token: "BTC",
    timeAgo: "Just now",
  },
  {
    id: "2",
    type: "hotel",
    title: "Burj Al Arab Deluxe Suite",
    destination: "Dubai, UAE · 3 Nights",
    cryptoAmount: "2,450 USDT",
    fiatValue: "$2,450",
    token: "USDT",
    timeAgo: "1m ago",
  },
  {
    id: "3",
    type: "flight",
    title: "Singapore Airlines Suites",
    destination: "Singapore (SIN) ➔ London (LHR)",
    cryptoAmount: "1.18 ETH",
    fiatValue: "$3,890",
    token: "ETH",
    timeAgo: "3m ago",
  },
  {
    id: "4",
    type: "hotel",
    title: "Four Seasons Bora Bora Overwater",
    destination: "French Polynesia · 4 Nights",
    cryptoAmount: "4,200 USDC",
    fiatValue: "$4,200",
    token: "USDT",
    timeAgo: "5m ago",
  },
];

export function LiveBookingPills() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SAMPLE_BOOKINGS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const booking = SAMPLE_BOOKINGS[currentIndex];

  return (
    <div className="w-full max-w-[430px] mx-auto select-none">
      <div className="relative flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>Live Verified Bookings</span>
        </div>
        <span className="text-[11px] text-gray-400 font-mono">Real-Time On-Chain</span>
      </div>

      <div className="relative h-[68px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full h-full rounded-xl bg-gradient-to-r from-[#111520]/90 to-[#0e111a]/90 border border-amber-500/25 p-3 flex items-center justify-between shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-400 shrink-0">
                {booking.type === "flight" ? (
                  <Plane className="w-5 h-5" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-100 truncate flex items-center gap-1.5">
                  <span>{booking.destination}</span>
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  {booking.title}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 pl-2">
              <div className="text-xs font-bold text-amber-300 font-mono">
                {booking.cryptoAmount}
              </div>
              <div className="text-[10px] text-gray-400 font-mono">
                {booking.timeAgo}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
