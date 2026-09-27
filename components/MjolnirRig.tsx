"use client";

import React, { useState } from "react";
import Image from "next/image";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";

interface MjolnirRigProps {
  id: string;
  side: "left" | "right";
}

export default function MjolnirRig({ id, side }: MjolnirRigProps) {
  const [isTremoring, setIsTremoring] = useState(false);
  const [flashOpacity, setFlashOpacity] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    // 1. Play thunder audio sweep
    playComicSound("thunder");

    // 2. Comic floating text burst
    triggerComicBurst("KRAK-THOOM! ⚡", e);

    // 3. Quick hammer tremor
    setIsTremoring(true);
    setTimeout(() => setIsTremoring(false), 280);

    // 4. Subtle Asgardian lightning flash (soft sky-blue, non-distracting)
    setFlashOpacity(0.65);
    setTimeout(() => setFlashOpacity(0.2), 60);
    setTimeout(() => setFlashOpacity(0.55), 120);
    setTimeout(() => setFlashOpacity(0), 240);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center relative min-h-[440px] select-none ${
        side === "left" ? "order-1" : "order-1 lg:order-2"
      }`}
    >
      {/* Subtle Screen Lightning Flash Overlay */}
      {flashOpacity > 0 && (
        <div
          className="fixed inset-0 bg-sky-200/40 pointer-events-none z-[9998] transition-opacity duration-75"
          style={{ opacity: flashOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Floating Asgardian Energy Aura Container */}
      <div
        onClick={handleClick}
        className="relative flex flex-col items-center group cursor-pointer"
        title="Click to summon Asgardian Lightning!"
      >
        {/* Lightning particle glow halo */}
        <div
          className={`absolute -inset-8 bg-gradient-to-r from-sky-500/25 via-blue-500/35 to-amber-400/20 rounded-full blur-2xl transition-all duration-300 ${
            isTremoring
              ? "opacity-100 scale-125 bg-sky-400/50"
              : "opacity-60 group-hover:opacity-95"
          }`}
        />

        {/* Ambient Asgardian Runes / Arc Accents */}
        <div className="absolute -inset-4 border border-sky-400/20 rounded-full animate-pulse pointer-events-none" />

        {/* Mjolnir Image with Levitating Float Animation & Hover/Tremor */}
        <div
          className={`relative w-64 sm:w-72 md:w-84 mjolnir-levitate filter drop-shadow-[0_15px_30px_rgba(56,189,248,0.55)] transition-transform duration-200 ${
            isTremoring
              ? "scale-115 rotate-12 brightness-125"
              : "group-hover:scale-105 group-hover:rotate-3"
          }`}
        >
          <Image
            src="/assets/mjolnir.png"
            alt="Thor's Hammer Mjolnir Asgardian Artifact"
            width={380}
            height={346}
            className="w-full h-auto object-contain select-none pointer-events-none"
            priority={id === "chapter-2"}
          />
        </div>

        {/* Comic Sound Effect Sticker Bubble */}
        <div className="absolute -top-3 -right-2 bg-[#38bdf8] text-black font-montserrat font-black text-xs sm:text-sm px-3.5 py-1 rounded-md border-2 border-black shadow-[3px_3px_0px_#f5c518] transform rotate-12 group-hover:scale-120 transition-transform">
          KRAK-THOOM! ⚡
        </div>

        {/* Dynamic HUD status badge */}
        <div className="bg-black/90 border border-sky-400/70 font-mono text-[10px] sm:text-[11px] text-sky-200 px-4 py-1.5 rounded-full uppercase tracking-wider mt-4 shadow-[0_0_20px_rgba(56,189,248,0.35)] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping" />
          <span>ASGARDIAN CHARGE: WORTHY [CLICK FOR THUNDER]</span>
        </div>
      </div>
    </div>
  );
}
