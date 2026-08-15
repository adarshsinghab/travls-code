"use client";

import { useState } from "react";
import { ArrowRight, RefreshCw, CheckCircle2, Shield, AlertCircle } from "lucide-react";

interface WalletConnectModalProps {
  onSuccess: (walletAddress: string) => void;
}

interface WalletItem {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
}

const WALLETS: WalletItem[] = [
  {
    id: "metamask",
    name: "MetaMask",
    badge: "EVM & Layer 2",
    icon: (
      <svg className="w-5 h-5 text-orange-500" viewBox="0 0 32 32" fill="currentColor">
        <path d="M28.4 4.5l-10.2 7.7 2 4.6 9.8-3.4 1.8-8.2zM3.6 4.5l1.8 8.2 9.8 3.4 2-4.6L7 4.5zM12.4 20.9l-4.7 1.8 4.2 3.6.4-5.4zm7.2 0l.4 5.4 4.2-3.6-4.6-1.8z" />
      </svg>
    ),
  },
  {
    id: "phantom",
    name: "Phantom",
    badge: "Solana & Multi-Chain",
    icon: (
      <svg className="w-5 h-5 text-purple-400" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="16" cy="16" r="14" fill="#ab9ff2" />
        <path d="M12 14a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" fill="#301934" />
      </svg>
    ),
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    badge: "Smart Wallet",
    icon: (
      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="16" cy="16" r="14" fill="#0052FF" />
        <rect x="11" y="11" width="10" height="10" rx="2" fill="white" />
      </svg>
    ),
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    badge: "Mobile & QR Code",
    icon: (
      <svg className="w-5 h-5 text-cyan-500" viewBox="0 0 32 32" fill="currentColor">
        <path d="M7 12c5-5 13-5 18 0l1 1-2 2-1-1c-4-4-10-4-14 0l-1 1-2-2 1-1zm3 3c3.3-3.3 8.7-3.3 12 0l1 1-2 2-1-1c-2.2-2.2-5.8-2.2-8 0l-1 1-2-2 1-1z" />
      </svg>
    ),
  },
];

export function WalletConnectModal({ onSuccess }: WalletConnectModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "requesting" | "verifying" | "done">("idle");

  const handleConnect = (wallet: WalletItem) => {
    setSelectedWallet(wallet.name);
    setStatus("requesting");

    setTimeout(() => {
      setStatus("verifying");
      setTimeout(() => {
        setStatus("done");
        setTimeout(() => {
          onSuccess(`0x742d...${Math.floor(1000 + Math.random() * 9000)}`);
        }, 500);
      }, 800);
    }, 700);
  };

  return (
    <div className="w-full space-y-3">
      {status === "idle" ? (
        <>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
            Select your self-custodial wallet to authenticate on-chain with zero gas fees.
          </p>

          <div className="space-y-2">
            {WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                onClick={() => handleConnect(wallet)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-[#232735] bg-white dark:bg-[#12141c] hover:bg-gray-50 dark:hover:bg-[#181b24] hover:border-gray-300 dark:hover:border-[#383f54] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#1a1d28] border border-gray-200 dark:border-[#2b3040]">
                    {wallet.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      {wallet.name}
                    </div>
                    <div className="text-[11px] text-gray-400 font-normal">
                      {wallet.badge}
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="py-6 px-4 text-center rounded-xl bg-gray-50 dark:bg-[#141620] border border-gray-200 dark:border-[#262b3b] space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-[#202434] text-gray-800 dark:text-white">
            {status === "done" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <RefreshCw className="w-5 h-5 animate-spin text-[#9e7428] dark:text-[#d8aa4e]" />
            )}
          </div>

          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {status === "requesting"
                ? `Connecting to ${selectedWallet}...`
                : status === "verifying"
                ? "Awaiting Signature Verification"
                : "Authenticated Successfully"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {status === "requesting"
                ? "Please approve the connection prompt in your wallet extension"
                : status === "verifying"
                ? "Sign the standard EIP-4361 authentication challenge"
                : "Redirecting to your VIP private travel suite..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
