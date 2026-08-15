"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, ShieldCheck, Headphones, Globe } from "lucide-react";

export function TopNav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full border-b border-gray-200/80 dark:border-[#202430] bg-white/80 dark:bg-[#0c0d12]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#121316] dark:bg-[#d8aa4e] flex items-center justify-center shadow-sm">
            <svg
              className="w-5 h-5 text-[#d8aa4e] dark:text-[#0c0d11]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L3 9l9 7 9-7-9-7z" />
              <path d="M3 15l9 7 9-7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg text-gray-900 dark:text-white font-display">
                TRAVLS
              </span>
              <span className="text-[10px] uppercase tracking-widest font-mono font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#1f2330] text-gray-600 dark:text-[#d8aa4e] border border-gray-200 dark:border-[#2f3547]">
                Black
              </span>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-gray-400 font-medium">
              Curated Travel &amp; High-Limit Cards
            </span>
          </div>
        </div>

        {/* Right Controls: Security, Support & Theme Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-gray-600 dark:text-gray-300 bg-gray-100/80 dark:bg-[#161822] border border-gray-200 dark:border-[#262b3b]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Operational</span>
          </div>

          {/* 24/7 Concierge Support */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1d28] transition-colors"
          >
            <Headphones className="w-3.5 h-3.5 text-[#9e7428] dark:text-[#d8aa4e]" />
            <span>Bespoke Concierge</span>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-[#262b3b] bg-gray-50 dark:bg-[#141620] text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1c202d] transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#d8aa4e]" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
