"use client";

import React from "react";
import { CHAPTER_STATS } from "@/data/events";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";
import { Code2, Users, Rocket, Award } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 px-4 bg-[#0a0a0c] overflow-hidden"
      data-purpose="about-chapter"
    >
      {/* Background artwork & gradient overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30 mix-blend-screen filter contrast-125"
        style={{ backgroundImage: `url('/assets/comic-bg-3.png')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#0a0a0c]/80 to-[#050507] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest mb-1.5">
            THE ENGINE BEHIND THE MULTIVERSE
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide uppercase text-white">
            ABOUT THE CHAPTER
          </h2>
          <div className="w-24 h-1.5 bg-[#e23636] mt-2"></div>
        </div>

        {/* Main About Glassmorphic Panel */}
        <div className="backdrop-blur-xl bg-zinc-900/80 border-2 border-zinc-800 rounded-2xl p-7 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 comic-halftone opacity-25 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Editorial Copy */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white">
                GeeksForGeeks Student Chapter <br />
                <span className="text-red-500">Bennett University</span>
              </h3>
              <p className="text-zinc-300 font-outfit text-base leading-relaxed">
                We are Bennett University&apos;s technical society supported by GeeksForGeeks, devoted to fostering hands-on engineering capability, competitive algorithmic mastery, open-source innovation, and student community empowerment.
              </p>
              <p className="text-zinc-400 font-outfit text-sm leading-relaxed">
                Through the Marvel × GFG event initiative, we unite cinematic comic-book aesthetics with rigorous software engineering. From early-year students exploring their first web applications to experienced programmers tuning algorithmic performance, we build an inclusive environment where every student develops their superpowers.
              </p>

              {/* Topic Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span
                  onClick={() => playComicSound("blip")}
                  className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-xs font-mono text-zinc-300 hover:border-red-500 transition-colors cursor-pointer"
                >
                  #GeeksAtBennett
                </span>
                <span
                  onClick={() => playComicSound("blip")}
                  className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-xs font-mono text-zinc-300 hover:border-red-500 transition-colors cursor-pointer"
                >
                  #GFGxMarvel
                </span>
                <span
                  onClick={() => playComicSound("blip")}
                  className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-xs font-mono text-zinc-300 hover:border-red-500 transition-colors cursor-pointer"
                >
                  #MultiverseHack
                </span>
              </div>
            </div>

            {/* Stat Counters with non-invented editable placeholders */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {CHAPTER_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    playComicSound("blip");
                    triggerComicBurst(stat.label, e);
                  }}
                  className="bg-black/85 border border-zinc-800 p-5 rounded-xl shadow-comic-black hover:border-red-600 transition-colors cursor-pointer group"
                >
                  <span className="block font-bebas text-3xl sm:text-4xl text-red-500 group-hover:text-[#f5c518] transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-zinc-300 font-outfit text-xs font-semibold uppercase tracking-wide block mt-1">
                    {stat.label}
                  </span>
                  <span className="block text-zinc-500 text-[10px] font-mono mt-1">
                    {stat.subtext}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
