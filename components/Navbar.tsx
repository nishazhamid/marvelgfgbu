"use client";

import React, { useState } from "react";
import { isAudioMuted, toggleAudio, playComicSound } from "@/utils/soundSystem";
import { Volume2, VolumeX, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [muted, setMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const isNowActive = toggleAudio();
    setMuted(!isNowActive);
  };

  const handleNavClick = () => {
    playComicSound("blip");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none"
        data-purpose="navigation-header"
      >
        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-black/85 border border-red-900/60 rounded-full px-4 sm:px-8 py-3 flex justify-between items-center shadow-2xl pointer-events-auto">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={handleNavClick}
            aria-label="GFG Marvel Home"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="flex items-center tracking-wider font-montserrat font-black text-xl text-white">
              <span className="text-white group-hover:text-red-400 transition-colors">
                GFG
              </span>
              <span className="text-[#e23636] mx-1.5 font-bebas text-2xl leading-none">
                ×
              </span>
              <span className="text-white">MARVEL</span>
            </div>
            <span className="hidden sm:inline-block bg-[#b31414]/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-400/40 uppercase tracking-widest shadow-sm">
              EARTH-616 BU
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-zinc-300">
            <a
              href="#hero"
              onClick={handleNavClick}
              className="hover:text-red-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#story"
              onClick={handleNavClick}
              className="hover:text-red-500 transition-colors"
            >
              Story
            </a>
            <a
              href="#chapters"
              onClick={handleNavClick}
              className="hover:text-red-500 transition-colors"
            >
              Events
            </a>
            <a
              href="#about"
              onClick={handleNavClick}
              className="hover:text-red-500 transition-colors"
            >
              About
            </a>
            <a
              href="#register"
              onClick={handleNavClick}
              className="hover:text-red-500 transition-colors"
            >
              Register
            </a>
          </nav>

          {/* Right Action: Audio Toggle & Register CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-[#f5c518] text-xs font-mono font-bold rounded-full border border-zinc-700 hover:border-[#f5c518] transition-all cursor-pointer"
              title="Toggle Web Audio SFX"
              aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
            >
              {muted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline text-zinc-400">MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#f5c518]" />
                  <span className="hidden sm:inline">SFX ON</span>
                </>
              )}
            </button>

            {/* Desktop CTA */}
            <a
              href="#register"
              onClick={handleNavClick}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-[#b31414] via-[#e23636] to-[#ff2a2a] rounded-full shadow-lg hover:shadow-red-600/40 hover:scale-105 active:scale-95 border border-red-400/40"
            >
              <span>SECURE PASS</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 rounded-full border border-zinc-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 animate-fadeIn">
          <div className="space-y-6 text-center">
            <div className="mb-4">
              <span className="text-[#e23636] font-mono text-xs uppercase tracking-widest font-bold">
                GEEKSFORGEEKS × MARVEL
              </span>
            </div>
            <div>
              <a
                href="#hero"
                onClick={handleNavClick}
                className="font-bebas text-4xl text-white hover:text-red-500 transition-colors block py-2"
              >
                HOME
              </a>
            </div>
            <div>
              <a
                href="#story"
                onClick={handleNavClick}
                className="font-bebas text-4xl text-white hover:text-red-500 transition-colors block py-2"
              >
                THE STORY
              </a>
            </div>
            <div>
              <a
                href="#chapters"
                onClick={handleNavClick}
                className="font-bebas text-4xl text-white hover:text-red-500 transition-colors block py-2"
              >
                EVENT CHAPTERS
              </a>
            </div>
            <div>
              <a
                href="#about"
                onClick={handleNavClick}
                className="font-bebas text-4xl text-white hover:text-red-500 transition-colors block py-2"
              >
                ABOUT THE CHAPTER
              </a>
            </div>
            <div>
              <a
                href="#register"
                onClick={handleNavClick}
                className="font-bebas text-4xl text-[#f5c518] hover:text-white transition-colors block py-2"
              >
                REGISTER NOW →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
