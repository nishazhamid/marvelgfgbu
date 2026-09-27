"use client";

import React from "react";
import { EVENT_CHAPTERS } from "@/data/events";
import EventChapter from "./EventChapter";

export default function EventsSection() {
  return (
    <section
      id="chapters"
      className="relative py-24 bg-[#050507]"
      data-purpose="chapters-timeline"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-red-500 font-mono font-bold text-xs uppercase tracking-widest bg-red-950/60 border border-red-700/50 px-3.5 py-1 rounded-full shadow-sm">
            INTERACTIVE EVENT CHAPTERS
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase mt-4">
            CHRONICLES OF THE MULTIVERSE
          </h2>
          <p className="text-zinc-400 font-outfit text-sm sm:text-base mt-2.5 max-w-xl mx-auto">
            Experience three interconnected chapters of heroic engineering, algorithmic code sprints, and collaborative creation.
          </p>
        </div>

        {/* The 3 Connected Chapters */}
        <div className="space-y-4">
          {EVENT_CHAPTERS.map((chapter, index) => (
            <EventChapter key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
