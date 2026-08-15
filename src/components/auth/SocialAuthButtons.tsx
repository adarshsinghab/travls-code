"use client";

import { useState } from "react";
import { Fingerprint, RefreshCw } from "lucide-react";

interface SocialAuthButtonsProps {
  onSuccess: (provider: string) => void;
}

export function SocialAuthButtons({ onSuccess }: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialClick = (providerName: string) => {
    setLoadingProvider(providerName);
    setTimeout(() => {
      setLoadingProvider(null);
      onSuccess(`${providerName} User`);
    }, 700);
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Divider */}
      <div className="relative flex items-center my-3">
        <div className="flex-grow border-t border-gray-200 dark:border-[#242835]" />
        <span className="flex-shrink mx-3 text-[11px] font-medium text-gray-400 dark:text-gray-400">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-[#242835]" />
      </div>

      {/* Social Button Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialClick("Google")}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-gray-200 dark:border-[#242835] bg-white dark:bg-[#12141c] hover:bg-gray-50 dark:hover:bg-[#181b24] text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all cursor-pointer disabled:opacity-60"
        >
          {loadingProvider === "Google" ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
          )}
          <span>Google</span>
        </button>

        {/* Apple */}
        <button
          type="button"
          onClick={() => handleSocialClick("Apple")}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-gray-200 dark:border-[#242835] bg-white dark:bg-[#12141c] hover:bg-gray-50 dark:hover:bg-[#181b24] text-xs font-semibold text-gray-800 dark:text-gray-200 transition-all cursor-pointer disabled:opacity-60"
        >
          {loadingProvider === "Apple" ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
            </svg>
          )}
          <span>Apple ID</span>
        </button>
      </div>

      {/* Biometric Passkey */}
      <button
        type="button"
        onClick={() => handleSocialClick("Passkey / FaceID")}
        disabled={loadingProvider !== null}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-gray-200 dark:border-[#242835] bg-white dark:bg-[#12141c] hover:bg-gray-50 dark:hover:bg-[#181b24] text-xs font-semibold text-gray-700 dark:text-gray-300 transition-all cursor-pointer disabled:opacity-60"
      >
        {loadingProvider === "Passkey / FaceID" ? (
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Fingerprint className="w-3.5 h-3.5 text-[#9e7428] dark:text-[#d8aa4e]" />
        )}
        <span>Sign in with Passkey / Face ID</span>
      </button>
    </div>
  );
}
