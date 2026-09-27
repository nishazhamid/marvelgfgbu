"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";

export default function GlobalTracker() {
  const rigRef = useRef<HTMLDivElement>(null);
  const webLineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let animFrame: number;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let scrollVelocity = 0;
    let smoothedVel = 0;

    const onScroll = () => {
      const curY = window.scrollY;
      const curT = performance.now();
      const dt = Math.max(1, curT - lastTime);
      const dy = curY - lastScrollY;
      const instVel = Math.abs(dy) / dt;
      scrollVelocity = Math.max(scrollVelocity, instVel);

      lastScrollY = curY;
      lastTime = curT;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = (t: number) => {
      scrollVelocity *= 0.94;
      smoothedVel += (scrollVelocity - smoothedVel) * 0.16;
      const velNorm = Math.min(1, smoothedVel / 2.5);

      if (rigRef.current) {
        const swing =
          Math.sin((t / 2200) * Math.PI * 2) * (4 + velNorm * 14);
        rigRef.current.style.transform = `rotate(${swing.toFixed(2)}deg)`;
      }

      if (webLineRef.current) {
        const scrolled = window.scrollY;
        const newY = Math.min(
          160,
          Math.max(80, 80 + scrolled * 0.04 + velNorm * 12)
        );
        webLineRef.current.setAttribute("y2", String(newY));
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    playComicSound("thwip");
    triggerComicBurst("TOP THWIP! 🕸️", e);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="global-spidey-tracker"
      className="fixed top-0 right-6 sm:right-10 z-40 pointer-events-none hidden md:block select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Dynamic Web Thread */}
        <svg
          className="w-3 h-24 stroke-white/85 drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
          strokeDasharray="2 1"
          strokeWidth="1.8"
          viewBox="0 0 10 96"
        >
          <line ref={webLineRef} x1="5" x2="5" y1="0" y2="96"></line>
        </svg>

        {/* Mini Hanging Spider-Man */}
        <div
          ref={rigRef}
          onClick={handleClick}
          title="Spider-Sense Active: Jump to Top"
          className="relative w-14 -mt-2.5 origin-top cursor-pointer pointer-events-auto group will-change-transform"
        >
          <Image
            src="/assets/spiderman-tracker.png"
            alt="Spider-Man Tracker"
            width={70}
            height={90}
            className="w-14 h-auto drop-shadow-[0_0_12px_rgba(255,42,42,0.95)] transition-transform group-hover:scale-110 pointer-events-none"
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-[#f5c518] border border-red-500/80 font-mono text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
            TOP THWIP!
          </span>
        </div>
      </div>
    </div>
  );
}
