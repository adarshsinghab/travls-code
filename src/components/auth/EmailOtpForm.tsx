"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, Shield } from "lucide-react";

interface EmailOtpFormProps {
  onSuccess: (email: string) => void;
}

export function EmailOtpForm({ onSuccess }: EmailOtpFormProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(30);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCooldown]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid work or personal email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendCooldown(30);
    }, 700);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance focus
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits entered
    if (index === 5 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 6) {
        verifyOtp(fullOtp);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      otpInputsRef.current[5]?.focus();
      verifyOtp(pastedData);
    }
  };

  const verifyOtp = (code: string) => {
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsLoading(false);
      if (code === "948210" || code.length === 6) {
        onSuccess(email);
      } else {
        setErrorMessage("Invalid verification code. Please try again.");
      }
    }, 800);
  };

  const handleDemoFill = () => {
    const demo = ["9", "4", "8", "2", "1", "0"];
    setOtp(demo);
    verifyOtp("948210");
  };

  return (
    <div className="w-full">
      {step === "email" ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email-input"
              className="block text-xs font-semibold text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-[#262b3b] bg-white dark:bg-[#12141c] text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#9e7428] dark:focus:ring-[#d8aa4e] focus:border-transparent transition-all"
              />
            </div>
            {errorMessage && (
              <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full luxury-btn-primary flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold shadow-sm cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sending Code...</span>
              </>
            ) : (
              <>
                <span>Continue with Email</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("email")}
              className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Email</span>
            </button>
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
              {email}
            </span>
          </div>

          {/* 6-Digit PIN Boxes */}
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpInputsRef.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-12 text-center text-lg font-bold font-mono rounded-xl border border-gray-300 dark:border-[#262b3b] bg-white dark:bg-[#12141c] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9e7428] dark:focus:ring-[#d8aa4e] transition-all"
              />
            ))}
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 text-center font-medium">
              {errorMessage}
            </p>
          )}

          {/* Verify Action & Auto-Fill Demo */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => verifyOtp(otp.join(""))}
              disabled={isLoading || otp.join("").length < 6}
              className="w-full luxury-btn-primary flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify &amp; Sign In</span>
                </>
              )}
            </button>

            {/* Quick Fill Demo Code */}
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full py-1.5 text-xs text-[#9e7428] dark:text-[#d8aa4e] font-semibold hover:underline cursor-pointer"
            >
              Auto-Fill Demo Code (948210)
            </button>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            {resendCooldown > 0 ? (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Resend code in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setResendCooldown(30)}
                className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Didn't receive code? Resend
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
