"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";

interface SpiderRigProps {
  id: string;
  side: "left" | "right";
  variant?: "hanging" | "inverted" | "drop";
  flip?: boolean;
}

export default function SpiderRig({
  id,
  side,
  variant = "hanging",
  flip = false,
}: SpiderRigProps) {
  const rigRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<SVGSVGElement>(null);
  const hudTextRef = useRef<HTMLSpanElement>(null);
  const hudPulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let animFrame: number;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let scrollVelocity = 0;
    let signedVelocity = 0;
    let smoothedVelocity = 0;
    let smoothedSignedVel = 0;
    let momentumAngle = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaTime = Math.max(1, currentTime - lastTime);
      const deltaY = currentScrollY - lastScrollY;

      const instVelocity = Math.abs(deltaY) / deltaTime;
      signedVelocity = deltaY / deltaTime;
      scrollVelocity = Math.max(scrollVelocity, instVelocity);

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const updatePhysics = (time: number) => {
      // Decay velocity
      scrollVelocity *= 0.94;
      signedVelocity *= 0.92;

      smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.18;
      smoothedSignedVel += (signedVelocity - smoothedSignedVel) * 0.18;

      const velNorm = Math.min(1, smoothedVelocity / 2.8);
      const targetTilt = Math.max(-20, Math.min(20, -smoothedSignedVel * 6.5));
      momentumAngle += (targetTilt - momentumAngle) * 0.12;

      if (rigRef.current) {
        // Natural harmonic pendulum swing
        const period = variant === "drop" ? 2400 : 3200;
        const harmonic = Math.sin((time / period) * Math.PI * 2);
        const dynamicAmp = 4.0 + velNorm * 16.0;
        const swingAngle = Math.max(
          -24,
          Math.min(24, harmonic * dynamicAmp + momentumAngle * 0.6)
        );
        const yStretch = Math.sin(time / 1400) * (3 + velNorm * 10);
        const flipFactor = flip ? "scaleX(-1)" : "";

        rigRef.current.style.transform = `rotate(${swingAngle.toFixed(
          2
        )}deg) translateY(${yStretch.toFixed(1)}px) ${flipFactor}`;

        if (webRef.current) {
          const webSkew = (swingAngle * 0.25).toFixed(2);
          const strainScaleY = (1 + velNorm * 0.12).toFixed(3);
          webRef.current.style.transform = `rotate(${webSkew}deg) scaleY(${strainScaleY})`;
        }

        if (hudTextRef.current) {
          if (velNorm > 0.35) {
            const gForce = (1.0 + velNorm * 2.0).toFixed(1);
            hudTextRef.current.innerText = `SPIDER-SENSE: SURGE (${gForce}G DRIFT)`;
            hudPulseRef.current?.classList.add("bg-[#f5c518]");
            hudPulseRef.current?.classList.remove("bg-[#e23636]");
          } else {
            hudTextRef.current.innerText = "SPIDER-SENSE: CALIBRATING";
            hudPulseRef.current?.classList.remove("bg-[#f5c518]");
            hudPulseRef.current?.classList.add("bg-[#e23636]");
          }
        }
      }

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [variant, flip]);

  const handleClick = (e: React.MouseEvent) => {
    playComicSound("thwip");
    triggerComicBurst("THWIP! 🕸️", e);
  };

  return (
    <div
      className={`flex flex-col items-center justify-start relative min-h-[440px] pt-0 select-none ${
        side === "left" ? "order-1" : "order-1 lg:order-2"
      }`}
    >
      {/* Web Thread from above */}
      <div className="w-full flex justify-center">
        <svg
          ref={webRef}
          className="w-2.5 h-20 sm:h-24 stroke-white/85 drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] origin-top will-change-transform"
          strokeLinecap="round"
          strokeWidth="2"
          viewBox="0 0 4 80"
        >
          <line x1="2" x2="2" y1="0" y2="80"></line>
        </svg>
      </div>

      {/* Hanging Spider-Man Character Rig */}
      <div
        ref={rigRef}
        onClick={handleClick}
        className="relative flex flex-col items-center group cursor-pointer origin-top will-change-transform transition-all"
        title="Click to trigger Spider-Sense Web Thwip!"
      >
        {/* Character Image */}
        <div className="relative w-60 sm:w-72 md:w-80 transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/assets/spiderman-hanging.png"
            alt="Hanging Spider-Man"
            width={340}
            height={460}
            className="w-full h-auto drop-shadow-[0_15px_35px_rgba(226,54,54,0.6)] select-none pointer-events-none"
            priority={id === "chapter-1"}
          />
        </div>

        {/* Floating Comic SFX Badge */}
        <div className="absolute -top-3 -right-3 bg-[#f5c518] text-black font-montserrat font-black text-xs sm:text-sm px-3 py-1 rounded-md border-2 border-black shadow-[3px_3px_0px_#000] transform rotate-12 group-hover:scale-115 transition-transform">
          THWIP! 🕸️
        </div>

        {/* Dynamic HUD status badge */}
        <div className="bg-black/90 border border-red-600/70 font-mono text-[10px] sm:text-[11px] text-zinc-200 px-3.5 py-1 rounded-full uppercase tracking-wider mt-3 shadow-lg flex items-center gap-2">
          <span
            ref={hudPulseRef}
            className="w-2 h-2 rounded-full bg-[#e23636] animate-ping"
          ></span>
          <span ref={hudTextRef}>SPIDER-SENSE: CALIBRATING</span>
        </div>
      </div>
    </div>
  );
}
