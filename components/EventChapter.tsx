"use client";

import React, { useRef } from "react";
import { EventChapterData } from "@/data/events";
import SpiderRig from "./SpiderRig";
import MjolnirRig from "./MjolnirRig";
import ShieldRig from "./ShieldRig";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";
import { Clock, MapPin, ArrowRight } from "lucide-react";

interface EventChapterProps {
  chapter: EventChapterData;
  index: number;
}

export default function EventChapter({ chapter, index }: EventChapterProps) {
  const isVisualLeft = chapter.visualSide === "left";

  const handleCtaClick = (e: React.MouseEvent) => {
    playComicSound("blip");
    triggerComicBurst("SLOT CHOSEN!", e);
  };

  const renderArtifact = (side: "left" | "right") => {
    switch (chapter.artifactType) {
      case "mjolnir":
        return <MjolnirRig id={chapter.id} side={side} />;
      case "shield":
        return <ShieldRig id={chapter.id} side={side} />;
      case "spiderman":
      default:
        return (
          <SpiderRig
            id={chapter.id}
            side={side}
            variant={chapter.spidermanVariant}
            flip={side === "left"}
          />
        );
    }
  };

  return (
    <div
      id={chapter.id}
      className="relative py-16 px-4 md:px-8 mb-16 rounded-3xl overflow-hidden border border-zinc-800/80 scroll-mt-24 shadow-2xl transition-all duration-300"
    >
      {/* Background artwork with dark fade and halftone */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-35 mix-blend-screen filter contrast-125"
        style={{ backgroundImage: `url("${chapter.bgImage}")` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#0a0a0c]/80 to-[#050507] pointer-events-none"></div>
      <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none"></div>

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column */}
        {isVisualLeft ? (
          <div className="lg:col-span-5 order-1">
            {renderArtifact("left")}
          </div>
        ) : (
          <div className="lg:col-span-7 order-2 lg:order-1">
            <InfoCard chapter={chapter} onCtaClick={handleCtaClick} />
          </div>
        )}

        {/* Right Column */}
        {isVisualLeft ? (
          <div className="lg:col-span-7 order-2">
            <InfoCard chapter={chapter} onCtaClick={handleCtaClick} />
          </div>
        ) : (
          <div className="lg:col-span-5 order-1 lg:order-2">
            {renderArtifact("right")}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  chapter,
  onCtaClick,
}: {
  chapter: EventChapterData;
  onCtaClick: (e: React.MouseEvent) => void;
}) {
  const isMjolnir = chapter.artifactType === "mjolnir";

  return (
    <div
      className={`backdrop-blur-xl bg-black/85 border-2 border-zinc-800 p-7 sm:p-10 rounded-2xl relative shadow-comic-black transition-all duration-300 ${
        isMjolnir
          ? "hover:border-sky-500 hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]"
          : "hover:border-red-600 hover:shadow-[0_0_35px_rgba(226,54,54,0.35)]"
      }`}
    >
      {/* Comic Speech Callout */}
      <div className="inline-flex items-center gap-2 bg-[#f5c518] text-black font-bebas px-3.5 py-1 rounded text-sm mb-4 border border-black shadow-[2px_2px_0px_#000]">
        <span>{chapter.comicCallout}</span>
      </div>

      {/* Phase & Status Tags */}
      <div
        className={`font-mono text-xs font-bold uppercase tracking-widest mb-1.5 flex flex-wrap items-center gap-2 ${
          isMjolnir ? "text-sky-400" : "text-red-500"
        }`}
      >
        <span>
          {chapter.phaseTag} • {chapter.date}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
            isMjolnir
              ? "bg-sky-950/80 text-sky-300 border-sky-800/80"
              : "bg-red-950/80 text-red-300 border-red-800/80"
          }`}
        >
          {chapter.statusBadge}
        </span>
      </div>

      {/* Chapter Title */}
      <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide uppercase mb-3">
        {chapter.chapterNumber}: {chapter.title}
      </h3>

      {/* Event Name Tag */}
      <div className="text-base sm:text-lg font-bold font-montserrat text-zinc-100 mb-4 flex items-center gap-2.5">
        <span
          className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            isMjolnir ? "bg-sky-400" : "bg-red-500"
          }`}
        ></span>
        <span>{chapter.eventName}</span>
      </div>

      {/* Description */}
      <p className="text-zinc-300 font-outfit text-sm sm:text-base leading-relaxed mb-6">
        {chapter.description}
      </p>

      {/* Details Grid: Time & Venue Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-400 mb-6">
        <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
          <div
            className={`p-2 rounded bg-zinc-900 ${
              isMjolnir ? "text-sky-400" : "text-red-400"
            }`}
          >
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-zinc-500 text-[10px] font-bold">
              TIME
            </span>
            <span className="text-white font-medium">{chapter.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
          <div
            className={`p-2 rounded bg-zinc-900 ${
              isMjolnir ? "text-sky-400" : "text-red-400"
            }`}
          >
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-zinc-500 text-[10px] font-bold">
              VENUE
            </span>
            <span className="text-white font-medium">{chapter.venue}</span>
          </div>
        </div>
      </div>

      {/* Action CTA Link */}
      <a
        href="#register"
        onClick={onCtaClick}
        className={`inline-flex items-center gap-2 font-montserrat font-bold text-xs uppercase tracking-wider group transition-colors focus:outline-none focus:underline ${
          isMjolnir
            ? "text-sky-400 hover:text-sky-300"
            : "text-red-400 hover:text-red-300"
        }`}
      >
        <span>{chapter.ctaText}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
      </a>
    </div>
  );
}
