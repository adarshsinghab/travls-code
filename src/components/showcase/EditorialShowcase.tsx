"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ShieldCheck, CreditCard, Sparkles, ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";

interface Destination {
  id: string;
  title: string;
  location: string;
  quote: string;
  image: string;
  tag: string;
  ratePerNight: string;
  vipBenefit: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: "amalfi",
    title: "Cliffside Sanctuary & Private Marina",
    location: "Amalfi Coast, Italy",
    quote:
      "“TRAVLS settled our private helicopter transfer from Naples and sea villa directly via Bitcoin with zero foreign exchange fees.”",
    image: "/images/amalfi.jpg",
    tag: "Private Villa · Concierge Access",
    ratePerNight: "€3,450 / night",
    vipBenefit: "Complimentary Riva yacht day charter",
  },
  {
    id: "kyoto",
    title: "Arashiyama Zen Forest Pavilion",
    location: "Kyoto, Japan",
    quote:
      "“Instant card authorization for Michelin private dining reservations across Tokyo and Kyoto. Seamless luxury execution.”",
    image: "/images/kyoto.jpg",
    tag: "Aman Partner Estate",
    ratePerNight: "¥420,000 / night",
    vipBenefit: "Private tea ceremony & master chef access",
  },
  {
    id: "alps",
    title: "Matterhorn Peakside Glass Chalet",
    location: "Zermatt, Switzerland",
    quote:
      "“The high-limit metal card made luxury ski lodge bookings and private aviation effortless throughout the winter season.”",
    image: "/images/alps.jpg",
    tag: "Alpine Retreat · Ski-In/Ski-Out",
    ratePerNight: "CHF 5,800 / night",
    vipBenefit: "Certified mountain guide & heli-skiing",
  },
];

export function EditorialShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDest = DESTINATIONS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % DESTINATIONS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
  };

  return (
    <div className="w-full space-y-6">
      {/* Editorial Destination Visual Card */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-[#232735] bg-white dark:bg-[#12141c] shadow-sm">
        {/* Destination Image Carousel */}
        <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeDest.image}
                alt={activeDest.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle Natural Vignette for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* Top Destination Pill & Navigation Arrows */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#d8aa4e]" />
              {activeDest.location}
            </span>

            <div className="flex items-center gap-1.5 bg-black/60 rounded-full p-1 backdrop-blur-md border border-white/20">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous destination"
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-white/90 px-1">
                {activeIndex + 1}/{DESTINATIONS.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next destination"
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Overlay Title & Tag */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
            <span className="text-[11px] uppercase tracking-wider text-[#d8aa4e] font-semibold">
              {activeDest.tag}
            </span>
            <h3 className="text-lg md:text-xl font-bold font-display leading-snug">
              {activeDest.title}
            </h3>
          </div>
        </div>

        {/* Editorial Quote & Perks Bar */}
        <div className="p-4 sm:p-5 space-y-3 bg-white dark:bg-[#12141c]">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
            {activeDest.quote}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-[#1f2330] text-xs">
            <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
              <Sparkles className="w-3.5 h-3.5 text-[#9e7428] dark:text-[#d8aa4e]" />
              <span className="font-semibold">VIP Privilege:</span>
              <span className="text-gray-500 dark:text-gray-400">{activeDest.vipBenefit}</span>
            </div>

            <div className="text-[11px] font-mono font-medium text-gray-400">
              {activeDest.ratePerNight}
            </div>
          </div>
        </div>
      </div>

      {/* Humanized Three-Column Institutional Value Props */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-gray-200 dark:border-[#202432] bg-white dark:bg-[#11131a] space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
            Card Limits
          </div>
          <div className="text-base font-bold text-gray-900 dark:text-white font-mono">
            $100,000 / day
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            High-limit metal debit cards
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-gray-200 dark:border-[#202432] bg-white dark:bg-[#11131a] space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
            FX Conversion
          </div>
          <div className="text-base font-bold text-[#9e7428] dark:text-[#d8aa4e] font-mono">
            0.0% Foreign Fee
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            Accepted across 180+ countries
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-gray-200 dark:border-[#202432] bg-white dark:bg-[#11131a] space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400">
            Security Standard
          </div>
          <div className="text-base font-bold text-gray-900 dark:text-white font-mono">
            PCI-DSS Level 1
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            Fireblocks MPC institutional custody
          </div>
        </div>
      </div>
    </div>
  );
}
