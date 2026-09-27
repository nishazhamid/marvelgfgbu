"use client";

import React, { useState } from "react";
import Image from "next/image";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";

interface ShieldRigProps {
  id: string;
  side: "left" | "right";
}

export default function ShieldRig({ id, side }: ShieldRigProps) {
  const [isRicocheting, setIsRicocheting] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // 1. Play metallic vibranium clang audio
    playComicSound("clang");

    // 2. Comic floating text burst
    triggerComicBurst("CLANGGG! 🛡️", e);

    // 3. Rapid ricochet spin animation
    setIsRicocheting(true);
    setTimeout(() => {
      setIsRicocheting(false);
    }, 650);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center relative min-h-[440px] select-none ${
        side === "left" ? "order-1" : "order-1 lg:order-2"
      }`}
    >
      {/* Floating Vibranium Energy Aura Container */}
      <div
        onClick={handleClick}
        className="relative flex flex-col items-center group cursor-pointer"
        title="Click to trigger Vibranium Ricochet!"
      >
        {/* Vibranium Shockwave Glow Halo */}
        <div
          className={`absolute -inset-6 bg-gradient-to-r from-red-600/30 via-blue-600/30 to-red-600/30 rounded-full blur-2xl transition-all duration-500 ${
            isRicocheting
              ? "opacity-100 scale-125 bg-red-500/50"
              : "opacity-60 group-hover:opacity-95 group-hover:scale-110"
          }`}
        />

        {/* Dynamic Kinetic Shockwave Ring on Ricochet */}
        {isRicocheting && (
          <div className="absolute inset-0 rounded-full border-2 border-red-500/70 animate-ping pointer-events-none" />
        )}

        {/* Ambient Ring Accent */}
        <div className="absolute -inset-3 border border-red-500/20 rounded-full pointer-events-none" />

        {/* Captain America Shield Container with Floating/Spinning & Ricochet */}
        <div
          className={`relative w-56 sm:w-64 md:w-72 transition-all duration-300 ${
            isRicocheting
              ? "shield-spin-rapid"
              : "shield-spin-slow group-hover:scale-105"
          }`}
        >
          <Image
            src="/assets/captain-america-shield.png"
            alt="Captain America Vibranium Shield Artifact"
            width={340}
            height={340}
            className="w-full h-auto drop-shadow-[0_20px_45px_rgba(226,54,54,0.65)] rounded-full select-none pointer-events-none"
            priority={id === "chapter-3"}
          />
        </div>

        {/* Comic Sound Effect Sticker Bubble */}
        <div className="absolute -top-3 -right-3 bg-[#f5c518] text-black font-montserrat font-black text-xs sm:text-sm px-3.5 py-1 rounded-md border-2 border-black shadow-[3px_3px_0px_#000] transform rotate-6 group-hover:scale-120 transition-transform">
          CLANGGG! 🛡️
        </div>

        {/* Dynamic HUD status badge */}
        <div className="bg-[#b31414] text-white font-bebas text-xs px-4 py-1.5 rounded-full shadow-lg tracking-wider uppercase mt-4 border border-red-400/50 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span>VIBRANIUM KINETIC ABSORPTION [CLICK TO RICOCHET]</span>
        </div>
      </div>
    </div>
  );
}
