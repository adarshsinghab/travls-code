"use client";

import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  height?: number;
}

export function BrandLogo({ className = "", height = 36 }: BrandLogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="TRAVLS.io"
        width={160}
        height={height}
        priority
        className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
      />
    </div>
  );
}
