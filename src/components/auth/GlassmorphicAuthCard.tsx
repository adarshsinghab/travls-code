"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  RefreshCw,
  Wallet,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface GlassmorphicAuthCardProps {
  onLoginSuccess: (user: string) => void;
}

export function GlassmorphicAuthCard({ onLoginSuccess }: GlassmorphicAuthCardProps) {
  const [authMode, setAuthMode] = useState<"password" | "otp" | "wallet">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Smooth 3D tilt on card hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 700);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email address");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email || "alexander@travls.io");
    }, 600);
  };

  const handleWalletLogin = (walletName: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(`0x742d...${Math.floor(1000 + Math.random() * 9000)}`);
    }, 750);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(`${provider} Member`);
    }, 700);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-[1000px] w-full max-w-[420px] mx-auto select-none"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="rounded-3xl p-7 sm:p-8 backdrop-blur-2xl bg-black/45 dark:bg-black/65 border border-white/20 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white relative transition-shadow duration-300"
      >
        {/* Auth Method Toggle Tabs */}
        <div className="flex p-1 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode("password");
              setErrorMessage("");
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              authMode === "password"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("otp");
              setErrorMessage("");
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              authMode === "otp"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            Magic Code
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("wallet");
              setErrorMessage("");
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              authMode === "wallet"
                ? "bg-white text-gray-950 shadow-sm"
                : "text-white/70 hover:text-white"
            }`}
          >
            Web3
          </button>
        </div>

        {/* PASSWORD FORM (Matching the reference layout) */}
        {authMode === "password" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-white/90">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A600] font-medium shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-white/90">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A600] font-medium shadow-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setAuthMode("otp")}
                className="text-xs text-white/80 hover:text-white hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-300 font-medium text-left">
                {errorMessage}
              </p>
            )}

            {/* Official TRAVLS.io Brand Gold Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#F5A600] hover:bg-[#FFAF1A] active:scale-[0.99] text-gray-950 font-bold text-sm shadow-md transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-gray-950" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>
        )}

        {/* OTP MAGIC CODE FORM */}
        {authMode === "otp" && (
          <div className="space-y-4 text-left">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-white/90">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A600] font-medium shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-[#F5A600] hover:bg-[#FFAF1A] text-gray-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Send Login Code</span>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/90 font-semibold">6-Digit Code</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[#F5A600] hover:underline"
                    >
                      Change Email
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="948210"
                    className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm font-mono text-center tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-[#F5A600]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-[#F5A600] hover:bg-[#FFAF1A] text-gray-950 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Verify &amp; Enter Suite</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOtpCode("948210");
                    setTimeout(() => onLoginSuccess(email || "alexander@travls.io"), 300);
                  }}
                  className="w-full text-center text-xs text-[#F5A600] hover:underline font-semibold"
                >
                  Auto-Fill Demo Code (948210)
                </button>
              </form>
            )}
          </div>
        )}

        {/* WEB3 WALLET CONNECT */}
        {authMode === "wallet" && (
          <div className="space-y-2.5">
            <p className="text-xs text-white/80 text-center mb-1">
              Select your self-custody wallet to authenticate
            </p>
            {[
              { id: "metamask", name: "MetaMask", badge: "EVM" },
              { id: "phantom", name: "Phantom", badge: "Solana" },
              { id: "coinbase", name: "Coinbase Wallet", badge: "Smart" },
            ].map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => handleWalletLogin(w.name)}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span>{w.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-[#F5A600] font-mono font-bold">
                  {w.badge}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Divider from screenshot */}
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-white/20" />
          <span className="flex-shrink mx-3 text-xs font-medium text-white/60">or</span>
          <div className="flex-grow border-t border-white/20" />
        </div>

        {/* Social Login Buttons (Google & Apple ID from screenshot) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-gray-900 font-semibold text-xs hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("Apple")}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-gray-900 font-semibold text-xs hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Footer sign up prompt from reference */}
        <div className="pt-4 text-center text-xs text-white/80">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={() => onLoginSuccess("New Member")}
            className="font-bold text-[#F5A600] hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
}
