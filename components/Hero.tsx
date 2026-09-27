"use client";

import React, { useEffect, useRef, useState } from "react";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Cinematic load sequence state
  const [loadStage, setLoadStage] = useState(0);

  useEffect(() => {
    // Cinematic load sequence
    // 0: Dark screen
    // 1: Background & ambient fog (100ms)
    // 2: City environment & comic accents (400ms)
    // 3: MARVEL x GFG Title (700ms)
    // 4: Subtitle & Badges (1000ms)
    // 5: CTAs & Full display (1200ms)
    const t1 = setTimeout(() => setLoadStage(1), 100);
    const t2 = setTimeout(() => setLoadStage(2), 400);
    const t3 = setTimeout(() => setLoadStage(3), 700);
    const t4 = setTimeout(() => setLoadStage(4), 1000);
    const t5 = setTimeout(() => setLoadStage(5), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Cursor-based parallax system
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const hero = heroRef.current;
    const bg = heroBgRef.current;
    const content = heroContentRef.current;
    if (!hero || !bg || !content) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle, restrained depth movement
      bg.style.transform = `scale(1.05) translate(${x * -16}px, ${y * -12}px)`;
      content.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
    };

    const handleMouseLeave = () => {
      bg.style.transform = "scale(1.05) translate(0px, 0px)";
      content.style.transform = "translate(0px, 0px)";
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleMarvelHover = () => {
    playComicSound("blip");
  };

  const handleGfgHover = () => {
    playComicSound("blip");
  };

  const handleXHover = () => {
    playComicSound("blip");
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    playComicSound("thwip");
    triggerComicBurst("BENNETT 616!", e);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12 select-none"
      data-purpose="hero-experience"
    >
      {/* Background Comic City Layer with controlled opacity and smooth transitions */}
      <div
        ref={heroBgRef}
        className={`absolute inset-0 z-0 bg-cover bg-center scale-105 transition-all duration-1000 ease-out will-change-transform opacity-40 mix-blend-screen ${
          loadStage >= 1 ? "filter brightness-100" : "filter brightness-0 opacity-0"
        }`}
        style={{ backgroundImage: `url('/assets/hero-city.png')` }}
      ></div>

      {/* Atmospheric Vignette, Gradients, and Halftone */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/75 to-black/85 transition-opacity duration-700 ${
          loadStage >= 1 ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none"></div>
      <div className="absolute inset-0 comic-halftone opacity-35 pointer-events-none"></div>

      {/* Floating Comic Speech Badge (Top-Left) */}
      <div
        onClick={handleBadgeClick}
        className={`absolute top-28 left-6 md:left-14 z-20 hidden sm:block transform -rotate-2 hover:rotate-0 transition-all duration-500 cursor-pointer ${
          loadStage >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="bg-[#f5c518] text-black font-bebas text-lg md:text-xl px-4 py-1.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2">
          <span>MEANWHILE IN BENNETT UNIVERSE...</span>
          <span className="bg-black text-[#f5c518] text-[11px] px-2 py-0.5 rounded font-mono font-bold">
            ISSUE #104
          </span>
        </div>
      </div>

      {/* Floating Comic Badge (Top-Right) */}
      <div
        onClick={(e) => {
          playComicSound("thwip");
          triggerComicBurst("THWIP! 🕸️", e);
        }}
        className={`absolute top-36 right-8 md:right-20 z-20 hidden lg:block transform rotate-3 hover:scale-110 transition-all duration-500 cursor-pointer ${
          loadStage >= 2
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="bg-[#e23636] text-white font-montserrat font-black text-xl tracking-tight px-3.5 py-1.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#f5c518]">
          THWIP! 🕸️
        </div>
      </div>

      {/* Main Hero Content Container */}
      <div
        ref={heroContentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center transition-transform duration-500 ease-out"
      >
        {/* Chapter / Affiliation Subtitle Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 border border-red-600/70 backdrop-blur-md mb-6 shadow-sm transition-all duration-700 ${
            loadStage >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          <span className="text-zinc-200 uppercase tracking-widest text-[11px] md:text-xs font-bold font-mono">
            GEEKSFORGEEKS STUDENT CHAPTER • BENNETT UNIVERSITY
          </span>
        </div>

        {/* 
          MAIN COLLABORATIVE TITLE: 
          Requirements:
          - perfectly horizontal
          - on one line on desktop
          - NOT tilted
          - balanced spacing
          - strong comic typography
          - subtle depth and controlled shadows
          - X slightly larger between MARVEL and GFG
          - do NOT distort or rotate
        */}
        <div
          className={`flex items-center justify-center flex-nowrap w-full my-3 select-none text-center transition-all duration-700 ${
            loadStage >= 3
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          {/* MARVEL Wordmark */}
          <span
            onMouseEnter={handleMarvelHover}
            onClick={(e) => {
              playComicSound("thunder");
              triggerComicBurst("MARVEL!", e);
            }}
            className="title-shimmer font-montserrat font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight cursor-pointer drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)]"
          >
            MARVEL
          </span>

          {/* Slightly Larger Glowing "×" Collaboration Symbol */}
          <span
            onMouseEnter={handleXHover}
            className="pulse-cross font-bebas text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] text-[#e23636] mx-2 sm:mx-6 md:mx-8 inline-block drop-shadow-[0_0_20px_#e23636] leading-none cursor-pointer"
          >
            ×
          </span>

          {/* GFG Wordmark */}
          <span
            onMouseEnter={handleGfgHover}
            onClick={(e) => {
              playComicSound("thunder");
              triggerComicBurst("GFG!", e);
            }}
            className="title-shimmer font-montserrat font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight cursor-pointer drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)]"
          >
            GFG
          </span>
        </div>

        {/* Hero Tagline / Purpose */}
        <p
          className={`max-w-2xl text-sm sm:text-base md:text-lg text-zinc-300 font-medium tracking-wide mt-4 mb-8 text-center px-4 leading-relaxed backdrop-blur-sm bg-black/45 py-2.5 rounded-xl border border-white/10 transition-all duration-700 ${
            loadStage >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          Where collegiate developer passion collides with heroic multiversal storytelling. 
          A premier hackathon &amp; code summit hosted by Bennett University&apos;s GFG Chapter.
        </p>

        {/* Hero Action CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto transition-all duration-700 ${
            loadStage >= 5
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Primary CTA */}
          <a
            href="#chapters"
            onClick={(e) => {
              playComicSound("blip");
              triggerComicBurst("ARENA READY!", e);
            }}
            className="group relative px-8 py-4 bg-[#e23636] hover:bg-[#ff2a2a] text-white font-montserrat font-black tracking-wider text-xs sm:text-sm uppercase rounded-md border-2 border-red-400/40 shadow-comic-red transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
          >
            <span className="flex items-center gap-2">
              <span>ENTER THE EVENT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#story"
            onClick={() => playComicSound("blip")}
            className="px-7 py-4 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-montserrat font-bold tracking-wider text-xs sm:text-sm uppercase rounded-md border-2 border-zinc-700 shadow-comic-black transition-all hover:border-zinc-500"
          >
            EXPLORE THE STORY
          </a>
        </div>

        {/* Date & Venue Stamp with editable placeholders */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono uppercase tracking-widest text-zinc-300 bg-black/80 px-6 py-2.5 rounded-full border border-zinc-800 transition-all duration-700 ${
            loadStage >= 5
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#e23636]" />
            <span>DATE: [TBA - COMING SOON]</span>
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#e23636]" />
            <span>BENNETT UNIVERSITY, GREATER NOIDA</span>
          </span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#story"
        onClick={() => playComicSound("blip")}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-white transition-colors flex flex-col items-center gap-1.5 focus:outline-none"
        aria-label="Scroll to story section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
          Scroll Down
        </span>
        <div className="w-5 h-8 border-2 border-zinc-600 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-2 bg-[#e23636] rounded-full animate-bounce"></div>
        </div>
      </a>
    </section>
  );
}
