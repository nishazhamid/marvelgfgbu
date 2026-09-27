"use client";

import React from "react";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";
import { Code, Cpu, Trophy, Terminal } from "lucide-react";

export default function StoryIntro() {
  return (
    <section
      id="story"
      className="relative py-28 px-4 bg-[#0a0a0c] border-y border-zinc-800/80 overflow-hidden"
      data-purpose="story-intro"
    >
      {/* Background with subtle comic grid texture */}
      <div className="absolute inset-0 comic-grid-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#0a0a0c]/70 to-[#050507] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="bg-[#b31414] text-white font-bebas px-4 py-1 text-sm tracking-widest uppercase mb-3 inline-block rounded-sm shadow-[2px_2px_0px_#000]">
            ISSUE #01 • THE COLLABORATION
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide uppercase text-white">
            THE STORY BEGINS
          </h2>
          <div className="w-24 h-1.5 bg-[#e23636] mt-2"></div>
        </div>

        {/* Narrative & Visual Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Story Narrative Box */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-outfit text-base md:text-lg backdrop-blur-md bg-black/75 p-8 rounded-2xl border border-zinc-800/80">
            <p className="text-white font-semibold text-xl leading-relaxed">
              When multiversal timelines converged upon Bennett University, the binary architecture of reality opened portals to unprecedented technical challenges.
            </p>
            <p>
              The <strong className="text-white">GeeksForGeeks Student Chapter</strong> at Bennett University issued a campus-wide call for engineers, designers, and algorithmic problem-solvers to assemble. Across high-intensity hackathon chapters, collegiate coders unite under the comic superhero mantle to engineer solutions for the real world.
            </p>
            <p>
              Whether deploying high-performance distributed architectures, crafting immersive web canvases, or cracking complex competitive programming hurdles, every participant is the hero of their own development chronicle.
            </p>

            {/* Quote Card */}
            <div className="relative bg-zinc-950/90 border-l-4 border-red-500 p-5 rounded-r-lg my-6 shadow-inner">
              <span className="text-4xl text-red-600 font-serif leading-none absolute -top-2 left-2">
                “
              </span>
              <p className="italic text-zinc-200 font-medium pl-6">
                With great power comes great compute capacity. Choose your chapter and enter the arena.
              </p>
              <span className="block mt-2 pl-6 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                — GFG Student Chapter • Bennett University Core Team
              </span>
            </div>

            {/* Feature Badges with Editable Placeholders */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div
                onClick={(e) => {
                  playComicSound("blip");
                  triggerComicBurst("SPRINT READY!", e);
                }}
                className="bg-black/80 border border-zinc-800 p-3 rounded-xl text-center hover:border-red-600 transition-colors cursor-pointer"
              >
                <span className="block text-red-400 font-bebas text-2xl">[DURATION]</span>
                <span className="text-zinc-400 text-xs uppercase font-mono">SPRINT TIME [TBA]</span>
              </div>
              <div
                onClick={(e) => {
                  playComicSound("blip");
                  triggerComicBurst("PRIZES AWAIT!", e);
                }}
                className="bg-black/80 border border-zinc-800 p-3 rounded-xl text-center hover:border-[#f5c518] transition-colors cursor-pointer"
              >
                <span className="block text-[#f5c518] font-bebas text-2xl">[PRIZES]</span>
                <span className="text-zinc-400 text-xs uppercase font-mono">BOUNTY POOL [TBA]</span>
              </div>
              <div
                onClick={(e) => {
                  playComicSound("blip");
                  triggerComicBurst("3 CHAPTERS!", e);
                }}
                className="bg-black/80 border border-zinc-800 p-3 rounded-xl text-center hover:border-red-400 transition-colors cursor-pointer"
              >
                <span className="block text-red-400 font-bebas text-2xl">3 TIERS</span>
                <span className="text-zinc-400 text-xs uppercase font-mono">ARENA CHAPTERS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Comic Visual Code Portal (Replaced Iron Man with Multiversal Code Terminal) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden comic-panel-border bg-black group p-6 sm:p-8">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-xs font-mono text-zinc-400 ml-2">gfg-multiverse-core.sh</span>
                </div>
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">
                  EARTH-616 // BU
                </span>
              </div>

              {/* Code Panel */}
              <div className="font-mono text-xs text-zinc-300 space-y-3 leading-relaxed">
                <p className="text-red-400 font-bold">$ init_multiverse_summit --track=all</p>
                <p className="text-zinc-400">{">"} Initializing Bennett University dimensional nodes...</p>
                <p className="text-green-400">{">"} GFG Chapter algorithms: SYNCHRONIZED</p>
                <p className="text-zinc-400">{">"} 3 Interactive Event Chapters: READY</p>
                <p className="text-[#f5c518]">{">"} Awaiting heroic engineering recruits...</p>
                
                <div className="p-4 bg-zinc-950/80 rounded-lg border border-red-900/60 mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Terminal className="w-4 h-4 text-red-500" />
                    <span>SYSTEM STATUS: OPERATIONAL</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Registration and chapter challenges will open according to the official event timetable.
                  </p>
                </div>
              </div>

              {/* Bottom Comic Tag */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
                <span className="bg-[#b31414] text-white font-mono text-[10px] font-bold px-3 py-1 uppercase rounded tracking-wider">
                  GFG BU ENGINE ACTIVE
                </span>
                <span className="text-zinc-500 text-[11px] font-mono">BENNETT UNIVERSITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
