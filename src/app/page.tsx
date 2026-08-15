"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { BrandLogo } from "@/components/nav/BrandLogo";
import { GlassmorphicAuthCard } from "@/components/auth/GlassmorphicAuthCard";
import { QuickDashboardModal } from "@/components/portal/QuickDashboardModal";

interface DestinationSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  location: string;
  image: string;
}

const DESTINATIONS: DestinationSlide[] = [
  {
    id: "bali",
    category: "I TRAVEL",
    title: "BEYOND\nBORDERS",
    subtitle: "Unlock the world. Let your wanderlust lead you to your dream destinations.",
    location: "Uluwatu Oceanfront Estate · Bali, Indonesia",
    image: "/images/bali.jpg",
  },
  {
    id: "amalfi",
    category: "I EXPLORE",
    title: "TIMELESS\nHORIZONS",
    subtitle: "Clifftop serenity and Mediterranean breezes with high-limit crypto debit spending.",
    location: "Villa Cimbrone · Amalfi Coast, Italy",
    image: "/images/amalfi.jpg",
  },
  {
    id: "kyoto",
    category: "I DISCOVER",
    title: "HERITAGE\n& PEACE",
    subtitle: "Tranquil bamboo sanctuaries, private tea ceremonies, and curated kaiseki.",
    location: "Arashiyama Zen Pavilion · Kyoto, Japan",
    image: "/images/kyoto.jpg",
  },
  {
    id: "alps",
    category: "I ESCAPE",
    title: "PEAK\nSANCTUARY",
    subtitle: "Private glass chalets with ski-in access and unobstructed views of the Matterhorn.",
    location: "Matterhorn Peakside Chalet · Zermatt, Switzerland",
    image: "/images/alps.jpg",
  },
];

export default function LoginPage() {
  const { theme, toggleTheme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  // Smooth ease-in ease-out slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = DESTINATIONS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);
  };

  return (
    <div className="relative h-screen w-screen max-h-screen overflow-hidden bg-black text-white select-none">
      {/* ========================================================================= */}
      {/* BACKGROUND IMAGE SLIDESHOW: Smooth Ease-in Ease-out Transitions & Ken Burns */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.4, 0.0, 0.2, 1], // cubic bezier easeInOut
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Natural Atmospheric Dark Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/50" />
            <div className="absolute inset-0 bg-black/15" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* TOP FLOATING HEADER: Official Logo & Theme Switcher */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Official TRAVLS.io Logo */}
        <BrandLogo height={38} />

        {/* Top Right: Status & Minimal Theme Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-xs font-mono text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational</span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Light and Dark mode"
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 text-white transition-all cursor-pointer shadow-lg"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#F5A600]" />
            ) : (
              <Moon className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT CONTAINER: Fits 100% Inside Screen (No Scrollbar) */}
      {/* ========================================================================= */}
      <main className="relative z-20 w-full max-w-7xl mx-auto h-[calc(100vh-140px)] px-6 sm:px-10 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {authenticatedUser ? (
            /* Post-Login VIP Suite Modal */
            <motion.div
              key="portal-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full flex items-center justify-center my-auto"
            >
              <QuickDashboardModal
                userIdentifier={authenticatedUser}
                onLogout={() => setAuthenticatedUser(null)}
              />
            </motion.div>
          ) : (
            /* Split Screen: Left Changing Minimalist Content / Right Floating Glass Card */
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT HALF: Changing Minimalist Content Synchronized with Images */}
              <div className="lg:col-span-7 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="space-y-4 max-w-xl text-left"
                  >
                    {/* Category Accent Badge in Official Brand Gold */}
                    <div className="inline-block">
                      <span className="text-xl sm:text-2xl font-bold italic tracking-wide text-[#F5A600] drop-shadow-md">
                        {activeSlide.category}
                      </span>
                    </div>

                    {/* Headline ("BEYOND BORDERS") */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] uppercase text-white font-display drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] whitespace-pre-line">
                      {activeSlide.title}
                    </h1>

                    {/* Subtitle ("Unlock the world...") */}
                    <p className="text-sm sm:text-base text-gray-200/95 font-normal leading-relaxed max-w-lg drop-shadow-md">
                      {activeSlide.subtitle}
                    </p>

                    {/* Destination Location Pill */}
                    <div className="pt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-xs font-semibold text-white/90 shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-[#F5A600]" />
                        {activeSlide.location}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT HALF: Floating Glassmorphic Authentication Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
                <GlassmorphicAuthCard
                  onLoginSuccess={(user) => setAuthenticatedUser(user)}
                />
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM BAR: Destination Carousel Controls & Compliance */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-6 flex items-center justify-between text-xs text-white/80">
        {/* Destination Dots & Arrows */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xl px-2.5 py-1.5 rounded-full border border-white/15 shadow-md">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous destination"
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-1.5">
              {DESTINATIONS.map((dest, idx) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Jump to ${dest.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-6 bg-[#F5A600]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next destination"
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="hidden sm:inline-block font-mono text-[11px] text-white/60">
            {currentIndex + 1} / {DESTINATIONS.length}
          </span>
        </div>

        {/* Global Security & Compliance Note */}
        <div className="font-mono text-[11px] text-white/70">
          256-bit SSL · PCI-DSS Level 1 · © 2026 Travls.io
        </div>
      </footer>
    </div>
  );
}
