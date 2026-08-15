"use client";

import { useState } from "react";
import { Mail, Wallet, Shield } from "lucide-react";
import { EmailOtpForm } from "./EmailOtpForm";
import { WalletConnectModal } from "./WalletConnectModal";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { TrustFooter } from "./TrustFooter";

interface AuthCardProps {
  onLoginSuccess: (identifier: string) => void;
}

export function AuthCard({ onLoginSuccess }: AuthCardProps) {
  const [activeTab, setActiveTab] = useState<"email" | "wallet">("email");

  return (
    <div className="w-full max-w-[420px] mx-auto select-none">
      {/* Clean, Human-Crafted Luxury Card */}
      <div className="rounded-2xl bg-white dark:bg-[#12141c] border border-gray-200 dark:border-[#232735] p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        {/* Top Auth Mode Tabs */}
        <div className="flex p-1 rounded-xl bg-gray-100 dark:bg-[#181a24] border border-gray-200/80 dark:border-[#262b3b] mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "email"
                ? "bg-white dark:bg-[#202434] text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("wallet")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "wallet"
                ? "bg-white dark:bg-[#202434] text-gray-900 dark:text-white shadow-xs"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Web3 Wallet</span>
          </button>
        </div>

        {/* Heading and Subtitle from Screenshot */}
        <div className="text-left mb-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
            Welcome back
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            {activeTab === "email"
              ? "Enter your email to receive a secure login code"
              : "Connect your Web3 wallet for passwordless zero-gas login"}
          </p>
        </div>

        {/* Tab Content */}
        {activeTab === "email" ? (
          <>
            <EmailOtpForm onSuccess={(email) => onLoginSuccess(email)} />
            <SocialAuthButtons onSuccess={(provider) => onLoginSuccess(provider)} />
          </>
        ) : (
          <WalletConnectModal onSuccess={(wallet) => onLoginSuccess(wallet)} />
        )}

        {/* Trust & SSL Footer from Screenshot */}
        <TrustFooter />
      </div>
    </div>
  );
}
