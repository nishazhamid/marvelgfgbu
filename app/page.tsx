"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio API Synthesizer Engine
  const initAudio = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const toggleAudioSystem = () => {
    const nextState = !sfxEnabled;
    setSfxEnabled(nextState);
    if (nextState) {
      initAudio();
      triggerComicSound("blip");
    }
  };

  const triggerComicSound = (type: string) => {
    if (!sfxEnabled || typeof window === "undefined") return;
    const ctx = initAudio();
    if (!ctx) return;

    const now = ctx.currentTime;

    try {
      if (type === "thwip") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.16);

        filter.type = "highpass";
        filter.frequency.setValueAtTime(300, now);

        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.17);
      } else if (type === "thunder") {
        const bufferSize = Math.floor(ctx.sampleRate * 0.55);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.exponentialRampToValueAtTime(50, now + 0.55);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start(now);
        whiteNoise.stop(now + 0.56);
      } else if (type === "clang") {
        const freqs = [880, 1760, 2640, 3520];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq + idx * 35, now);

          gain.gain.setValueAtTime(0.38 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.66);
        });
      } else if (type === "blip") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === "woosh") {
        const bufferSize = Math.floor(ctx.sampleRate * 0.18);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + 0.18);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start(now);
        whiteNoise.stop(now + 0.19);
      }
    } catch {
      // Ignore silent audio errors
    }
  };

  const showComicBurst = (text: string, event?: React.MouseEvent | MouseEvent) => {
    if (typeof document === "undefined") return;
    const bubble = document.createElement("div");
    bubble.className =
      "comic-burst-popup bg-comicYellow text-black px-4 py-2 rounded-xl border-4 border-black shadow-[5px_5px_0px_#000] text-xl sm:text-2xl font-black";
    bubble.innerText = text;

    let x = event ? event.clientX : window.innerWidth / 2;
    let y = event ? event.clientY : window.innerHeight / 2;

    x = Math.max(80, Math.min(window.innerWidth - 80, x));
    y = Math.max(60, Math.min(window.innerHeight - 60, y));

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1100);
  };

  const triggerShockwave = (targetEl: HTMLElement | null, color?: string) => {
    if (!targetEl || typeof document === "undefined") return;
    const ring = document.createElement("div");
    ring.className = "shockwave-ring";
    ring.style.width = "200px";
    ring.style.height = "200px";
    ring.style.boxShadow = `0 0 25px ${color || "#38bdf8"}`;
    targetEl.appendChild(ring);
    setTimeout(() => ring.remove(), 750);
  };

  const triggerLightningStorm = () => {
    if (typeof document === "undefined") return;
    const flash = document.getElementById("lightning-flash");
    if (flash) {
      flash.style.opacity = "0.9";
      setTimeout(() => (flash.style.opacity = "0.2"), 60);
      setTimeout(() => (flash.style.opacity = "0.8"), 120);
      setTimeout(() => (flash.style.opacity = "0"), 250);
    }
  };

  const handleMjolnirClick = (e: React.MouseEvent) => {
    triggerComicSound("thunder");
    showComicBurst("KRAK-THOOM! ⚡", e);

    const flash = document.getElementById("lightning-flash");
    if (flash) {
      flash.style.opacity = "1";
      setTimeout(() => (flash.style.opacity = "0.3"), 60);
      setTimeout(() => (flash.style.opacity = "0.9"), 110);
      setTimeout(() => (flash.style.opacity = "0"), 240);
    }

    const mount = document.getElementById("mjolnir-shockwave-mount");
    triggerShockwave(mount, "#38bdf8");

    const img = document.getElementById("mjolnir-img");
    if (img) {
      img.style.transform = "scale(1.22) rotate(16deg)";
      setTimeout(() => {
        img.style.transform = "";
      }, 320);
    }
  };

  const handleShieldClick = (e: React.MouseEvent) => {
    triggerComicSound("clang");
    showComicBurst("CLANGGG! 🛡️", e);

    const mount = document.getElementById("shield-shockwave-mount");
    triggerShockwave(mount, "#e23636");

    const shield = document.getElementById("cap-shield-container");
    if (shield) {
      shield.classList.remove("shield-spin-slow");
      shield.classList.add("shield-spin-rapid");
      setTimeout(() => {
        shield.classList.remove("shield-spin-rapid");
        shield.classList.add("shield-spin-slow");
      }, 700);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerComicSound("thunder");
    showComicBurst("PASS ISSUED! 🎟️", undefined);
    alert("Congratulations! Your Multiverse GFG pass has been registered.");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 2. MOUSE TRACKING & PARALLAX ENGINE
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Hero Section Parallax
    const hero = document.getElementById("hero");
    const heroBg = document.getElementById("hero-bg");
    const heroContent = document.getElementById("hero-content");

    const onHeroMouseMove = (e: MouseEvent) => {
      if (!hero || !heroBg || !heroContent) return;
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroBg.style.transform = `scale(1.05) translate(${x * -24}px, ${y * -18}px)`;
      heroContent.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
    };

    const onHeroMouseLeave = () => {
      if (heroBg) heroBg.style.transform = "scale(1.05) translate(0px, 0px)";
      if (heroContent) heroContent.style.transform = "translate(0px, 0px)";
    };

    if (hero) {
      hero.addEventListener("mousemove", onHeroMouseMove);
      hero.addEventListener("mouseleave", onHeroMouseLeave);
    }

    // 3. REAL-TIME SCROLL VELOCITY ENGINE
    let lastScrollY = window.scrollY;
    let lastTimestamp = performance.now();
    let scrollVelocity = 0;
    let signedVelocity = 0;
    let smoothedVelocity = 0;
    let smoothedSignedVel = 0;
    let lastSwooshTime = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = performance.now();
      const deltaTime = Math.max(1, currentTimestamp - lastTimestamp);
      const deltaY = currentScrollY - lastScrollY;

      const instVelocity = Math.abs(deltaY) / deltaTime;
      signedVelocity = deltaY / deltaTime;
      scrollVelocity = Math.max(scrollVelocity, instVelocity);

      if (instVelocity > 2.8 && currentTimestamp - lastSwooshTime > 800) {
        triggerComicSound("woosh");
        lastSwooshTime = currentTimestamp;
      }

      lastScrollY = currentScrollY;
      lastTimestamp = currentTimestamp;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Dynamic Rigging Elements
    const c1Rig = document.querySelector('[data-spidey-rig="c1"]') as HTMLElement | null;
    const c1Web = document.querySelector('[data-spidey-web="c1"]') as HTMLElement | null;
    const c1Hud = document.getElementById("hud-text-c1");
    const c1Pulse = document.getElementById("hud-pulse-c1");

    const trackerRig = document.querySelector('[data-spidey-hero="tracker"]') as HTMLElement | null;
    const trackerWebLine = document.querySelector("#tracker-web line") as SVGLineElement | null;

    const mjolnirLevitateBox = document.getElementById("mjolnir-levitate-box");
    const capShieldContainer = document.getElementById("cap-shield-container");

    let momentumAngle = 0;
    let physicsAnimId: number;

    const updatePhysics = (time: number) => {
      scrollVelocity *= 0.94;
      signedVelocity *= 0.92;

      smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.18;
      smoothedSignedVel += (signedVelocity - smoothedSignedVel) * 0.18;

      const velNormalized = Math.min(1, smoothedVelocity / 3.0);
      const targetTilt = Math.max(-24, Math.min(24, -smoothedSignedVel * 7.5));
      momentumAngle += (targetTilt - momentumAngle) * 0.12;

      // Spider-Man (Ch 01) Hanging Physics with Mouse Tilt & Dynamic Strain
      if (c1Rig) {
        const harmonic = Math.sin((time / 3000) * Math.PI * 2);
        const dynamicAmp = 5.0 + velNormalized * 18.0;
        const mouseTilt = mouseX * 8;
        const swingAngle = Math.max(
          -28,
          Math.min(28, harmonic * dynamicAmp + momentumAngle * 0.65 + mouseTilt)
        );
        const yStretch = Math.sin(time / 1500) * (4 + velNormalized * 12);
        const strainScaleY = 1 + velNormalized * 0.12;

        c1Rig.style.transform = `rotate(${swingAngle.toFixed(2)}deg) translateY(${yStretch.toFixed(
          1
        )}px)`;

        if (c1Web) {
          const webSkew = (swingAngle * 0.28).toFixed(2);
          c1Web.style.transform = `rotate(${webSkew}deg) scaleY(${strainScaleY.toFixed(3)})`;
        }

        if (c1Hud) {
          if (velNormalized > 0.4) {
            const gForce = (1.0 + velNormalized * 2.2).toFixed(1);
            c1Hud.innerText = `SPIDER-SENSE: SURGE (${gForce}G DRIFT)`;
            if (c1Pulse) {
              c1Pulse.classList.add("bg-comicYellow");
              c1Pulse.classList.remove("bg-crimson-500");
            }
          } else {
            c1Hud.innerText = "SPIDER-SENSE: CALIBRATING";
            if (c1Pulse) {
              c1Pulse.classList.remove("bg-comicYellow");
              c1Pulse.classList.add("bg-crimson-500");
            }
          }
        }
      }

      // Mjolnir Subtle 3D perspective tilt with mouse
      if (mjolnirLevitateBox) {
        const tiltX = -mouseY * 12;
        const tiltY = mouseX * 14;
        mjolnirLevitateBox.style.transform = `perspective(600px) rotateX(${tiltX.toFixed(
          1
        )}deg) rotateY(${tiltY.toFixed(1)}deg)`;
      }

      // Shield subtle hover tilt with mouse
      if (capShieldContainer && !capShieldContainer.classList.contains("shield-spin-rapid")) {
        const tiltX = -mouseY * 15;
        const tiltY = mouseX * 18;
        capShieldContainer.style.transform = `perspective(600px) rotateX(${tiltX.toFixed(
          1
        )}deg) rotateY(${tiltY.toFixed(1)}deg)`;
      }

      // Top Mini Tracker Spidey
      if (trackerRig) {
        const trackerSwing =
          Math.sin((time / 2200) * Math.PI * 2) * (5 + velNormalized * 15) +
          momentumAngle * 0.5;
        trackerRig.style.transform = `rotate(${trackerSwing.toFixed(2)}deg)`;
      }

      if (trackerWebLine) {
        const scrolled = window.scrollY;
        const newY = Math.min(180, Math.max(96, 96 + scrolled * 0.05 + velNormalized * 16));
        trackerWebLine.setAttribute("y2", String(newY));
      }

      physicsAnimId = requestAnimationFrame(updatePhysics);
    };

    physicsAnimId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(physicsAnimId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (hero) {
        hero.removeEventListener("mousemove", onHeroMouseMove);
        hero.removeEventListener("mouseleave", onHeroMouseLeave);
      }
    };
  }, [sfxEnabled]);

  return (
    <>


      {/* Full screen lightning flash node */}
      <div id="lightning-flash" style={{ opacity: 0 }} />

      {/* BEGIN: Floating Mini Inverted Spider-Man Scroll Presence Indicator */}
      <div
        className="fixed top-0 right-8 z-50 pointer-events-none hidden md:block"
        id="global-spidey-tracker"
      >
        <div className="relative flex flex-col items-center">
          {/* Web Thread that extends on scroll */}
          <svg
            className="web-strand-svg w-3 h-24 stroke-white/95 dynamic-web-line"
            id="tracker-web"
            strokeDasharray="2 1"
            strokeWidth="2"
            viewBox="0 0 10 96"
          >
            <line x1="5" x2="5" y1="0" y2="96"></line>
          </svg>
          {/* Mini Hanging Spidey with dynamic physics swing */}
          <div
            className="relative w-16 -mt-3 dynamic-spidey-rig origin-top cursor-pointer pointer-events-auto group"
            data-spidey-hero="tracker"
            onClick={(e) => {
              triggerComicSound("thwip");
              showComicBurst("THWIP!", e);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            title="Spider-Sense Active: Jump to Top"
            style={{ transform: "rotate(4.9deg)" }}
          >
            <img
              alt="Hanging Spider-Man"
              className="w-16 h-auto drop-shadow-[0_0_16px_rgba(255,42,42,0.95)] transition-transform group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwrFdRSn1i6T-zSZztTY-edZlt9zqsX6LqrAaXveMEDdVD3c0-xa10khNqdymGS5uTsfBTSOVgMjA-5oI-ixCltt0zp13dUd7Cx2g_JLV1gWPbtUR_-jEs2CsmYEztJNklVAEeTNqb6JcHR-fcr5B_MCUkrFC4yr_TaIsi1vb4UwHTog8WRu26-MggsU_-FIm2eGOyV6_JGTtnAR5idSidBzdgHQ-dF9RAQh0z0LgIfJeyR45DWMsL821KPpbfKvOOLA"
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/95 text-comicYellow border border-red-500/80 font-bebas text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider shadow-lg">
              TOP THWIP!
            </span>
          </div>
        </div>
      </div>
      {/* END: Floating Mini Inverted Spider-Man Scroll Presence Indicator */}

      {/* BEGIN: FloatingNavbar */}
      <header
        className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none"
        data-purpose="navigation-header"
      >
        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-black/75 border border-red-900/60 rounded-full px-4 sm:px-8 py-2.5 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.85)] pointer-events-auto">
          {/* Brand Logo Group */}
          <a
            aria-label="GFG Bennett University Home"
            className="flex items-center gap-3 group focus:outline-none"
            href="#hero"
            onClick={() => triggerComicSound("blip")}
          >
            <div className="flex items-center tracking-wider font-montserrat font-black text-xl text-white">
              <span className="text-white group-hover:text-red-400 transition-colors">GFG</span>
              <span className="text-crimson-500 mx-1 font-bebas text-2xl">×</span>
              <span className="text-white">MARVEL</span>
            </div>
            <span className="hidden sm:inline-block bg-crimson-700/80 text-white font-techmono text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-red-400/40 uppercase tracking-widest shadow-sm">
              EARTH-616 BU
            </span>
          </a>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-zinc-300">
            <a
              className="hover:text-crimson-400 transition-colors py-1"
              href="#hero"
              onClick={() => triggerComicSound("blip")}
            >
              Home
            </a>
            <a
              className="hover:text-crimson-400 transition-colors py-1"
              href="#story"
              onClick={() => triggerComicSound("blip")}
            >
              The Story
            </a>
            <a
              className="hover:text-crimson-400 transition-colors py-1"
              href="#chapters"
              onClick={() => triggerComicSound("blip")}
            >
              Chapters
            </a>
            <a
              className="hover:text-crimson-400 transition-colors py-1"
              href="#about"
              onClick={() => triggerComicSound("blip")}
            >
              About
            </a>
            <a
              className="hover:text-crimson-400 transition-colors py-1"
              href="#register"
              onClick={() => triggerComicSound("blip")}
            >
              Register
            </a>
          </nav>

          {/* Right Action CTA & SFX Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle Button */}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-comicYellow text-xs font-techmono font-bold rounded-full border border-zinc-700 hover:border-comicYellow transition-all duration-200 shadow-md cursor-pointer"
              id="audio-toggle-btn"
              onClick={toggleAudioSystem}
              title="Toggle Web Audio SFX"
            >
              <span id="audio-icon">{sfxEnabled ? "🔊" : "🔇"}</span>
              <span className="hidden sm:inline" id="audio-text">
                {sfxEnabled ? "SFX ON" : "MUTED"}
              </span>
            </button>
            <a
              className="relative inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 rounded-full btn-laser-glow hover:scale-105 active:scale-95 cursor-pointer"
              href="#register"
              onClick={(e) => {
                triggerComicSound("blip");
                showComicBurst("SECURE!", e);
              }}
            >
              <span>SECURE PASS</span>
              <svg
                className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </header>
      {/* END: FloatingNavbar */}

      {/* BEGIN: HeroSection */}
      <section
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
        data-purpose="hero-experience"
        id="hero"
      >
        {/* LAYER 1: Vivid Background Artwork with balanced scrim */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center scale-105 transition-transform duration-700 ease-out will-change-transform opacity-75 mix-blend-screen filter contrast-110"
          id="hero-bg"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXSmEHLb-WiuWtmenwVQdLBybiQ4ykh14xjUhEkCAID-Lr22frmn46hL86-W33WDnYT8_LUv6UkZ0AUch2hCKlMVSOo-ovgEvUF3EaYgh3mkmYmkTsmneGXD298wU9M-egh0r7LZOOZ1qRpM05ezGtzIfAtNjtrOTEsqMJfzk4glfp1OIz6zTgqjluf97atocN2NQlAJvfMsAaMLMBoFcPozYrJaZBAwQZtq4il2_swu4bLHzfiOe8GNv1SSLkSiIynw")',
            transform: "scale(1.05) translate(0px, 0px)",
          }}
        ></div>

        {/* LAYER 2: Cinematic Vignette & Comic Halftone */}
        <div className="absolute inset-0 cinematic-vignette z-[1] pointer-events-none"></div>
        <div className="absolute inset-0 comic-halftone opacity-25 z-[2] pointer-events-none"></div>

        {/* Floating Comic Speech Badge (Hero Top-Left) */}
        <div
          className="absolute top-28 left-6 md:left-14 z-20 hidden sm:block transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer"
          onClick={(e) => {
            triggerComicSound("thwip");
            showComicBurst("BENNETT 616!", e);
          }}
        >
          <div className="relative bg-comicYellow text-black font-bebas text-lg md:text-xl px-4 py-1.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2">
            <span>MEANWHILE IN BENNETT UNIVERSE...</span>
            <span className="bg-black text-comicYellow text-[11px] px-2 py-0.5 rounded font-techmono font-bold tracking-tight">
              ISSUE #104
            </span>
          </div>
        </div>

        {/* Floating Comic SFX Badge Right */}
        <div
          className="absolute top-36 right-8 md:right-24 z-20 hidden lg:block transform rotate-6 hover:scale-110 transition-transform cursor-pointer"
          onClick={(e) => {
            triggerComicSound("thwip");
            showComicBurst("THWIP! 🕸️", e);
          }}
        >
          <div className="bg-crimson-600 text-white font-montserrat font-black text-2xl tracking-tighter px-4 py-1.5 rounded-lg border-2 border-black shadow-[4px_4px_0px_#f5c518] transform -skew-x-12">
            THWIP! 🕸️
          </div>
        </div>

        {/* LAYER 3: Foreground Content Container with subtle 3D parallax tilt */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-4 text-center flex flex-col items-center justify-center transition-transform duration-500 ease-out"
          id="hero-content"
          style={{ transform: "translate(0px, 0px)" }}
        >
          {/* Subtitle Badge with Military HUD typography & Issue status */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-crimson-500/70 backdrop-blur-md mb-6 shadow-comic-glow">
            <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-ping"></span>
            <span className="text-zinc-200 uppercase tracking-widest text-[11px] md:text-xs font-bold font-techmono">
              ISSUE #104 · DIMENSIONAL PROTOCOL // BENNETT UNIVERSITY
            </span>
          </div>

          {/* MAIN BLOCKBUSTER COLLABORATIVE TITLE: Chrome metallic sweep, bevel, glowing cross */}
          <div
            className="spiderverse-title-wrapper flex items-center justify-center flex-nowrap w-full my-2 select-none text-center cursor-pointer relative group"
            id="spiderverse-hero-title"
            title="Multiverse Reality Frequency: Click to Glitch Dimension"
            style={{ opacity: 1 }}
          >
            <div className="spiderverse-title-wrapper relative inline-block select-none">
              {/* Cyan Glitch Layer */}
              <div
                aria-hidden="true"
                className="sv-chroma-cyan flex items-center justify-center flex-nowrap w-full opacity-0"
              >
                <div className="marvel-logo-badge rounded-md">
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white font-montserrat font-black">
                    MARVEL
                  </span>
                </div>
                <span className="electric-cross font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl mx-3 sm:mx-6 md:mx-8">
                  ×
                </span>
                <div className="gfg-logo-badge rounded-md">
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white font-montserrat font-black flex items-center gap-1">
                    <span className="text-white">GFG</span>
                    <span className="text-comicYellow text-2xl sm:text-4xl md:text-5xl font-techmono">
                      #BU
                    </span>
                  </span>
                </div>
              </div>

              {/* Magenta Glitch Layer */}
              <div
                aria-hidden="true"
                className="sv-chroma-magenta flex items-center justify-center flex-nowrap w-full opacity-0"
              >
                <div className="marvel-logo-badge rounded-md">
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white font-montserrat font-black">
                    MARVEL
                  </span>
                </div>
                <span className="electric-cross font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl mx-3 sm:mx-6 md:mx-8">
                  ×
                </span>
                <div className="gfg-logo-badge rounded-md">
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white font-montserrat font-black flex items-center gap-1">
                    <span className="text-white">GFG</span>
                    <span className="text-comicYellow text-2xl sm:text-4xl md:text-5xl font-techmono">
                      #BU
                    </span>
                  </span>
                </div>
              </div>

              {/* Base Interactive Layer */}
              <div className="sv-base-layer flex items-center justify-center flex-nowrap w-full">
                <div
                  className="marvel-logo-badge rounded-md cursor-pointer select-none"
                  onClick={(e) => {
                    triggerComicSound("thunder");
                    showComicBurst("MARVEL UNIVERSE!", e);
                    triggerLightningStorm();
                  }}
                  title="Click to unleash Multiversal Thunder!"
                >
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white font-montserrat font-black">
                    MARVEL
                  </span>
                </div>
                <span className="electric-cross font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl mx-3 sm:mx-6 md:mx-8 select-none">
                  ×
                </span>
                <div
                  className="gfg-logo-badge rounded-md cursor-pointer select-none"
                  onClick={(e) => {
                    triggerComicSound("clang");
                    showComicBurst("GFG MULTIVERSE!", e);
                    triggerLightningStorm();
                  }}
                  title="Click to engage GFG Neural Network!"
                >
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-white font-montserrat font-black flex items-center gap-1">
                    <span className="text-white">GFG</span>
                    <span className="text-comicYellow text-2xl sm:text-4xl md:text-5xl font-techmono">
                      #BU
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle / Tagline in glass HUD pill */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-200 font-medium tracking-wide mt-3 mb-8 text-center px-6 leading-relaxed backdrop-blur-md bg-black/55 py-3 rounded-2xl border border-white/15 shadow-xl">
            Where elite engineering collides with multiversal chaos. A 3-day high-octane celebration
            of code, creation, and comic mastery.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary Laser Button */}
            <a
              className="group relative px-8 py-4 bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-montserrat font-black tracking-wider text-sm uppercase rounded-xl btn-laser-glow cursor-pointer"
              href="#chapters"
              onClick={(e) => {
                triggerComicSound("blip");
                showComicBurst("ENTER THE MULTIVERSE!", e);
              }}
            >
              <span className="flex items-center gap-2">
                <span>ENTER THE MULTIVERSE</span>
                <span className="transition-transform group-hover:translate-x-1.5 text-lg">→</span>
              </span>
            </a>
            {/* Secondary Glass Button */}
            <a
              className="px-7 py-4 bg-zinc-950/70 hover:bg-zinc-900/90 text-zinc-200 font-montserrat font-bold tracking-wider text-sm uppercase rounded-xl border border-zinc-500/50 backdrop-blur-md shadow-comic-black transition-all hover:border-zinc-300"
              href="#story"
              onClick={() => triggerComicSound("blip")}
            >
              EXPLORE CHAPTERS
            </a>
          </div>

          {/* Quick Date & Venue Stamp */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs font-techmono uppercase tracking-widest text-zinc-300 bg-black/65 backdrop-blur-md px-6 py-2.5 rounded-full border border-zinc-700/60 shadow-lg">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-crimson-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              OCTOBER 24-26, 2026
            </span>
            <span className="text-zinc-500">•</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-crimson-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              BENNETT UNIVERSITY, GREATER NOIDA
            </span>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <a
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-white transition-colors flex flex-col items-center gap-1.5 z-10"
          href="#story"
          onClick={() => triggerComicSound("blip")}
        >
          <span className="text-[10px] font-techmono tracking-widest uppercase text-zinc-400">
            Scroll Down
          </span>
          <div className="w-5 h-8 border-2 border-zinc-500 rounded-full flex justify-center p-1 backdrop-blur-sm bg-black/40">
            <div className="w-1.5 h-2 bg-crimson-500 rounded-full animate-bounce"></div>
          </div>
        </a>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: StoryIntroSection */}
      <section
        className="relative py-28 px-4 bg-noir border-y border-zinc-800/80 overflow-hidden"
        data-purpose="story-intro"
        id="story"
      >
        {/* Backdrop Visual: Iron Man Blueprint prominently clear with subtle edge fade */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 mix-blend-screen filter contrast-125 brightness-95"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZbA7zAX6mV66B18wIa0CaSxZ_knlkhxRbD0GrejNoyyb4e5KrbQe-tP3k-RKf2tKlb1TECg57ABHvLZw2CVWULJw7ZzSWNhGqaQh23vTiSblB3_KxlBVZOyN8HDfNlPjzb2fDM8gkUDMHZyVSXO0_BKnqeG7bH2q02cxxa1BBLEPcKyIma3Llqcoaphtu2tP8tkTdluZ8Uyeh6IWd3UNkrl1uhqmSTGaPvc5XoETcdprXBTSVZAa6y7ZhzuLQdS7ng')",
          }}
        ></div>
        <div className="absolute inset-0 cinematic-vignette pointer-events-none"></div>
        <div className="absolute inset-0 comic-grid-pattern opacity-30 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col items-start mb-14">
            <div className="bg-crimson-700 text-white font-bebas px-4 py-1 text-sm tracking-widest uppercase mb-3 inline-block rounded-sm shadow-[2px_2px_0px_#000]">
              ISSUE #01 • THE COLLABORATION
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide uppercase text-white comic-glitch">
              THE STORY BEGINS
            </h2>
            <div className="w-24 h-1.5 bg-crimson-600 mt-2"></div>
          </div>

          {/* Grid: Narrative and Cinematic Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Copy */}
            <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-outfit text-base md:text-lg backdrop-blur-xl bg-black/65 p-8 rounded-2xl border border-zinc-700/60 shadow-2xl">
              <p className="text-white font-semibold text-xl leading-relaxed">
                When dimensional boundaries collapsed over Bennett University, the binary
                architecture of reality splintered into multiple timelines.
              </p>
              <p>
                The GeeksForGeeks Student Chapter (GFG BU) detected anomalous frequency spikes
                across collegiate servers. Tony Stark's blueprint schematics fused with collegiate
                algorithms, synthesizing superhero compute capacity across campus.
              </p>
              <p>
                Across three intense days, web architects, competitive coders, and system designers
                must team up with iconic multiversal heroes to patch the cosmic continuum before the
                network suffers critical runtime failure.
              </p>

              {/* Quote Card inside story */}
              <div className="relative bg-zinc-950/80 border-l-4 border-crimson-500 p-5 rounded-r-lg my-6 shadow-inner">
                <span className="text-4xl text-crimson-600 font-serif leading-none absolute -top-2 left-2">
                  “
                </span>
                <p className="italic text-zinc-200 font-medium pl-6">
                  With great power comes great compute capacity. Choose your chapter and enter the
                  arena.
                </p>
                <span className="block mt-2 pl-6 text-xs font-techmono text-zinc-400 uppercase tracking-widest">
                  — GFG Chapter Bennett Core Council
                </span>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div
                  className="bg-black/70 border border-zinc-700/80 p-3 rounded-xl text-center hover:border-crimson-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("48 HOURS!", e);
                  }}
                >
                  <span className="block text-crimson-400 font-bebas text-2xl">48 HRS</span>
                  <span className="text-zinc-400 text-xs uppercase font-techmono">Sprint Time</span>
                </div>
                <div
                  className="bg-black/70 border border-zinc-700/80 p-3 rounded-xl text-center hover:border-comicYellow transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("BOUNTY POOL!", e);
                  }}
                >
                  <span className="block text-comicYellow font-bebas text-2xl">₹1.5L+</span>
                  <span className="text-zinc-400 text-xs uppercase font-techmono">Bounty Pool</span>
                </div>
                <div
                  className="bg-black/70 border border-zinc-700/80 p-3 rounded-xl text-center hover:border-crimson-400 transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("3 TRACKS!", e);
                  }}
                >
                  <span className="block text-crimson-400 font-bebas text-2xl">3 TIERS</span>
                  <span className="text-zinc-400 text-xs uppercase font-techmono">Arena Tracks</span>
                </div>
              </div>
            </div>

            {/* Featured Comic Blueprint Element: Iron Man Schematic Feature */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative rounded-2xl overflow-hidden comic-panel-bevel bg-black group cursor-pointer"
                onClick={(e) => {
                  triggerComicSound("thunder");
                  showComicBurst("ARC REACTOR ONLINE!", e);
                }}
              >
                <img
                  alt="Iron Man Suit Blueprint Architecture"
                  className="w-full h-84 object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWiZYR-PvE5dFL8IXLalXBCBhzy9F8ItylQ6Yu_G_lCDC6tI_Rt02C0BFth_hch5U3xNv4qZr4cZ5omgYeezi86s2uS00w_QyrzYhF317PpZf3jfKc54m8TBYa6NY0MY4d1QaJ_mVUx5iS1DarrdgQlrS4TVcR3AA52FVD8Ggjgxm7SSCU0L905CoTxpKf6E0dsRhUYMAQWbodOsIw6yzPyisa0k1Av7LM5L-CJKvqBQi55X9ETktrVlMwzku23oDjPQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85"></div>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="bg-comicYellow text-black font-bebas text-xs px-2.5 py-0.5 rounded uppercase font-bold tracking-wider">
                    Stark Industries Architecture
                  </span>
                  <h3 className="text-white font-bebas text-3xl tracking-wide mt-1.5">
                    MARK 85 NEURAL CORE
                  </h3>
                  <p className="text-zinc-300 text-xs font-outfit">
                    Decentralized Stark mainframe blueprints power our 48-hour event servers.
                  </p>
                </div>
              </div>
              {/* Offset comic label */}
              <div className="absolute -bottom-4 -right-2 bg-crimson-700 text-white font-techmono text-[11px] font-bold px-3 py-1 uppercase rounded tracking-widest border border-black shadow-[3px_3px_0px_#000]">
                STATUS: ARC REACTOR ENGAGED
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: StoryIntroSection */}

      {/* BEGIN: InteractiveChaptersSection */}
      <section className="relative py-24 bg-noirDeep" data-purpose="chapters-timeline" id="chapters">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Title Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-crimson-500 font-techmono font-bold text-xs uppercase tracking-widest bg-crimson-950/70 border border-crimson-700/60 px-3.5 py-1 rounded-full">
              Interactive Schedule &amp; Multiverse Arena
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase mt-3 comic-glitch">
              CHRONICLES OF THE EVENT
            </h2>
            <p className="text-zinc-400 font-outfit text-sm sm:text-base mt-2">
              Interact with three operational phases featuring legendary multiversal artifacts and heroes.
            </p>
          </div>

          {/* ==================== CHAPTER 01: THE AWAKENING ==================== */}
          <div
            className="relative py-16 px-4 md:px-10 mb-16 rounded-3xl overflow-hidden border border-zinc-800/80 scroll-mt-24 shadow-2xl"
            id="chapter-1"
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 mix-blend-screen filter contrast-125"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQAxLOaPx1VuIfH-2Gd-ZhjVo4GPQvB1rlpUa5OWIHKK633sORwAUBZB6r-z9ORlksB_7ytbh2mX7D2mmfo9EU06C0SEU2L_MB4KRHLBRSVBOQj4o0sedJEP8dOn-MiqCeExTQ4obFLdgGm7ARbgaZDR7rd21Fzonap_lJKuLEb2a-6jPwtbYgo9CzjzI4PbSwXFr3aJaSfpwGf8LSABTDGeSDuOTAb7vZ-HNfsCDGPmx8lI4qrv479Lq8agdwiGt2rA')",
              }}
            ></div>
            <div className="absolute inset-0 cinematic-vignette pointer-events-none"></div>
            <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Event Info Card (Left) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="backdrop-blur-xl bg-black/75 comic-panel-bevel p-8 sm:p-10 rounded-2xl relative shadow-comic-black hover:border-crimson-600 transition-all duration-300">
                  <div className="inline-flex items-center gap-2 bg-comicYellow text-black font-bebas px-3.5 py-1 rounded text-sm mb-4 border border-black shadow-[2px_2px_0px_#000]">
                    <span>MEANWHILE IN NYC DIMENSION...</span>
                  </div>
                  <div className="text-crimson-500 font-techmono text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span>PHASE 01 • OCTOBER 24, 2026</span>
                    <span className="bg-red-950/80 text-red-300 text-[10px] px-2 py-0.5 rounded border border-red-800">
                      NODE SYNC: 100%
                    </span>
                  </div>
                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide uppercase mb-2 comic-glitch">
                    CHAPTER 01: THE AWAKENING
                  </h3>
                  <div className="text-lg font-bold font-montserrat text-zinc-100 mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-pulse"></span>
                    <span>[EVENT TITLE: MULTIVERSE CODE HUNT]</span>
                  </div>
                  <p className="text-zinc-300 font-outfit text-base leading-relaxed mb-6">
                    Immersive algorithmic challenge navigating across dimensional comic grids.
                    Decrypt anomalous matrix patterns, solve high-stakes data structure dilemmas,
                    and activate node towers before time runs out.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-zinc-800/80 font-techmono text-xs text-zinc-400 mb-6">
                    <div className="flex items-center gap-2.5 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                      <div className="p-2 rounded bg-zinc-800/90 text-crimson-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px]">TIME</span>
                        <span className="text-white font-semibold">10:00 AM - 04:00 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                      <div className="p-2 rounded bg-zinc-800/90 text-crimson-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px]">LOCATION</span>
                        <span className="text-white font-semibold">
                          AUDITORIUM B1, BENNETT UNIVERSITY
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-crimson-400 hover:text-crimson-300 font-montserrat font-bold text-xs uppercase tracking-wider group"
                    href="#register"
                    onClick={() => triggerComicSound("blip")}
                  >
                    <span>RESERVE HUNT SLOT</span>
                    <span className="transition-transform group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              </div>

              {/* Hanging Spider-Man Anchor (Right) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-start relative min-h-[580px] pt-0">
                <div className="w-full flex justify-center">
                  <svg
                    className="web-strand-svg w-3 h-28 stroke-white/95 dynamic-web-line"
                    data-spidey-web="c1"
                    strokeLinecap="round"
                    strokeWidth="3"
                    viewBox="0 0 6 112"
                    style={{ transform: "rotate(2.84deg) scaleY(1)" }}
                  >
                    <line x1="3" x2="3" y1="0" y2="112"></line>
                  </svg>
                </div>
                <div
                  className="dynamic-spidey-rig relative flex flex-col items-center group cursor-pointer"
                  data-spidey-rig="c1"
                  id="spidey-c1-container"
                  onClick={(e) => {
                    triggerComicSound("thwip");
                    showComicBurst("THWIP! 🕸️", e);
                    triggerLightningStorm();
                  }}
                  title="Multiverse Spider-Sense Active!"
                  style={{ transform: "rotate(10.15deg) translateY(1.1px)" }}
                >
                  <div className="relative w-80 sm:w-96 md:w-[460px] lg:w-[520px] transition-transform duration-300 group-hover:scale-105">
                    <img
                      alt="Spider-Man Hanging Upside Down Transparent Scaled"
                      className="w-full h-auto drop-shadow-[0_25px_45px_rgba(226,54,54,0.85)] filter contrast-125 select-none"
                      id="spidey-c1-img"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtM8M6vXOSMes0vK_9ICQP1NyTeLNFjkidm1T3-mCTqNbP19_bQTiv-d5rW5Jmjg7y-vLik6AhREFDovLDFAdwVWcM8ky8LyRLNhEHptDTq-Dhn9zuG5ybkK2O41ItNNAZK2DT0o0mNap8manvrMaq10yeyvWfHYo_4GVk0iTjP62hsVNifnQNsct93dAJ8vtNZ_TBED0_GdI3DX6LIwr_NnU_hXRN5H9vob4fDs8aiBIelxFIdMiaWRh4okVD2_mN_Q"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-comicYellow text-black font-montserrat font-black text-base sm:text-lg px-4 py-1.5 rounded-lg border-3 border-black shadow-[4px_4px_0px_#000] transform rotate-12 group-hover:scale-125 transition-transform">
                    THWIP! 🕸️
                  </div>
                  <div
                    className="bg-black/95 border-2 border-crimson-600 font-techmono text-xs sm:text-sm text-zinc-100 px-5 py-2 rounded-full uppercase tracking-widest mt-4 shadow-comic-red flex items-center gap-2.5 backdrop-blur-md"
                    id="hud-c1"
                  >
                    <span className="w-3 h-3 rounded-full bg-crimson-500 animate-ping" id="hud-pulse-c1"></span>
                    <span className="font-bold tracking-wider" id="hud-text-c1">
                      SPIDER-SENSE: CALIBRATING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== CHAPTER 02: THE SYMBIOTE HACK ==================== */}
          <div
            className="relative py-16 px-4 md:px-10 mb-16 rounded-3xl overflow-hidden border border-zinc-800/80 scroll-mt-24 shadow-2xl"
            id="chapter-2"
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 mix-blend-screen filter contrast-125"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoeWHLZN8GiUAAbZKWnWKCkzySkjFqGfJEeNOiIdJHoebxMWh_aIeig7Zn8-Ks8GiBvDb8GSxdOTfEV2-cC5qu30mPutPTlYa3I6F928qf2IfWu-d5Gr3Xw9feXsWRH1LYJu9BVJNMl6t5sEJp64-Ze5sdW0PSZdwCjH5TUzduwnaY-IAwis4h1zhdc4JxAlyq7pWiRWIdHFvZRQERXjLdrEzBUKJaLmJ0tnnK-lR1YdgEYLltzhi5JwqJftpoof4XVw')",
              }}
            ></div>
            <div className="absolute inset-0 cinematic-vignette pointer-events-none"></div>
            <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* THOR'S MJOLNIR HAMMER INTERACTIVE ARTIFACT (Left) */}
              <div className="lg:col-span-5 order-1 flex flex-col items-center justify-center relative min-h-[440px]">
                <div
                  className="relative flex flex-col items-center group cursor-pointer"
                  id="mjolnir-wrapper"
                  onClick={handleMjolnirClick}
                >
                  <div className="absolute inset-0 pointer-events-none" id="mjolnir-shockwave-mount"></div>
                  <div className="absolute -inset-8 bg-gradient-to-r from-sky-500/25 via-blue-500/35 to-amber-400/20 rounded-full blur-2xl group-hover:opacity-100 opacity-60 transition-opacity"></div>
                  <div
                    className="relative w-72 sm:w-80 md:w-96 mjolnir-levitate filter drop-shadow-[0_15px_35px_rgba(56,189,248,0.7)]"
                    id="mjolnir-levitate-box"
                    style={{ transform: "perspective(600px) rotateX(10.4deg) rotateY(13.9deg)" }}
                  >
                    <img
                      alt="Thor's Hammer Mjolnir Asgardian Artifact"
                      className="w-full h-auto object-contain transform group-hover:scale-105 transition-all duration-300"
                      id="mjolnir-img"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO6n1_cAVy8DXhokZt0NY5odoDk25O7DsRKncdUGT75TTJbUTIIu6-Gsc6-yq7CWLRS0zS_9InQ32OkJPZrA3i2-bGwSlLf_GwuiEJ9Scztstm0_PS5Zf87PBHEM4RS45CuASFFuOd-l88v8kWsF2pqU9v4SjvbZ2VqC0zUrhO_wO_bTb8JG4JMHj0v3HA-W5efRKYyITKLUcxkTDRMxB3d_LIxEk5B3LqtY4dAVJkx0aYtkipFZLCrEr67bnJXjfHSg"
                    />
                    <div className="plasma-arc inset-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="absolute -top-4 -right-2 bg-asgardianBlue text-black font-montserrat font-black text-xs sm:text-sm px-3.5 py-1 rounded-md border-2 border-black shadow-[3px_3px_0px_#f5c518] transform rotate-12 group-hover:scale-125 transition-transform">
                    KRAK-THOOM! ⚡
                  </div>
                  <div className="bg-black/90 border border-sky-400/70 font-techmono text-[11px] text-sky-200 px-4 py-1.5 rounded-full uppercase tracking-widest mt-4 shadow-comic-blue flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-asgardianBlue animate-ping"></span>
                    <span>ASGARDIAN CHARGE: WORTHY [CLICK FOR THUNDER]</span>
                  </div>
                </div>
              </div>

              {/* Event Info Card (Right) */}
              <div className="lg:col-span-7 order-2">
                <div className="backdrop-blur-xl bg-black/75 comic-panel-bevel p-8 sm:p-10 rounded-2xl relative shadow-comic-black hover:border-sky-500 transition-all duration-300 hover:shadow-comic-blue">
                  <div className="inline-flex items-center gap-2 bg-crimson-600 text-white font-bebas px-3.5 py-1 rounded text-sm mb-4 border border-black shadow-[2px_2px_0px_#000]">
                    <span>MULTIVERSE SPRINT</span>
                  </div>
                  <div className="text-sky-400 font-techmono text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span>PHASE 02 • OCTOBER 25, 2026</span>
                    <span className="bg-comicYellow/20 text-comicYellow text-[10px] px-2 py-0.5 rounded border border-comicYellow/40">
                      NON-STOP 24H
                    </span>
                  </div>
                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide uppercase mb-2 comic-glitch">
                    CHAPTER 02: THE SYMBIOTE HACK
                  </h3>
                  <div className="text-lg font-bold font-montserrat text-zinc-100 mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-comicYellow animate-pulse"></span>
                    <span>[EVENT TITLE: WEB OF SHADOWS BUILDATHON]</span>
                  </div>
                  <p className="text-zinc-300 font-outfit text-base leading-relaxed mb-6">
                    24-hour sprint crafting next-generation heroic web applications. Engineer
                    scalable Web3 &amp; AI integrations, build real-time interactive canvases, and
                    channel Asgardian lightning to purge symbiote memory leaks under continuous
                    judging rounds.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-zinc-800/80 font-techmono text-xs text-zinc-400 mb-6">
                    <div className="flex items-center gap-2.5 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                      <div className="p-2 rounded bg-zinc-800/90 text-sky-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px]">TIME</span>
                        <span className="text-white font-semibold">24-HOUR CONTINUOUS HACK</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                      <div className="p-2 rounded bg-zinc-800/90 text-sky-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px]">LOCATION</span>
                        <span className="text-white font-semibold">TECH LAB 4, BENNETT UNIVERSITY</span>
                      </div>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-montserrat font-bold text-xs uppercase tracking-wider group"
                    href="#register"
                    onClick={() => triggerComicSound("blip")}
                  >
                    <span>ENROLL BUILD TEAM</span>
                    <span className="transition-transform group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== CHAPTER 03: CLASH OF CODES ==================== */}
          <div
            className="relative py-16 px-4 md:px-10 rounded-3xl overflow-hidden border border-zinc-800/80 scroll-mt-24 shadow-2xl"
            id="chapter-3"
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 mix-blend-screen filter contrast-125"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdfVi58R5v2ki8w1d2PPqePJAY2N84-cuyOTvv4lKzQXRq5whd9Q32PDBM98TqGeVdULX5O1wwmsrWihWGUJqm-x7Af8_zrriDyJU_LWnLmi2fU40VDOH_0eqnWRmtTKxHqipuba7laYimXqE8RKE9Yu67-7kmtSyCp8yXxpk2ytqUmmb6rnUSiWc6NX3kOTnXFQ7sPYSAgy8V2kcYbGWh7E5yfQAopc0qFQdM5zd6wdBV-yrbTGdp8UJps1_8k8C7Kg')",
              }}
            ></div>
            <div className="absolute inset-0 cinematic-vignette pointer-events-none"></div>
            <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Event Info Card (Left) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="backdrop-blur-xl bg-black/75 comic-panel-bevel p-8 sm:p-10 rounded-2xl relative shadow-comic-black hover:border-crimson-600 transition-all duration-300">
                  <div className="inline-flex items-center gap-2 bg-comicYellow text-black font-bebas px-3.5 py-1 rounded text-sm mb-4 border border-black shadow-[2px_2px_0px_#000]">
                    <span>GRAND FINALE ARENA</span>
                  </div>
                  <div className="text-crimson-500 font-techmono text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span>PHASE 03 • OCTOBER 26, 2026</span>
                    <span className="bg-red-950/80 text-red-300 text-[10px] px-2 py-0.5 rounded border border-red-800">
                      PRIZE POOL: ₹1,50,000
                    </span>
                  </div>
                  <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide uppercase mb-2 comic-glitch">
                    CHAPTER 03: CLASH OF CODES
                  </h3>
                  <div className="text-lg font-bold font-montserrat text-zinc-100 mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-ping"></span>
                    <span>[EVENT TITLE: ENDGAME CODE ARENA]</span>
                  </div>
                  <p className="text-zinc-300 font-outfit text-base leading-relaxed mb-6">
                    Final competitive face-off between top collegiate engineers. Live 1v1 speed
                    debugging in the central arena, lightning pitch rounds before industry venture
                    leads, and grand prize coronation ceremony.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-zinc-800/80 font-techmono text-xs text-zinc-400 mb-6">
                    <div className="flex items-center gap-2.5 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                      <div className="p-2 rounded bg-zinc-800/90 text-crimson-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px]">TIME</span>
                        <span className="text-white font-semibold">02:00 PM - 07:00 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-zinc-900/70 p-3 rounded-xl border border-zinc-800">
                      <div className="p-2 rounded bg-zinc-800/90 text-crimson-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-zinc-500 text-[10px]">LOCATION</span>
                        <span className="text-white font-semibold">MAIN STAGE, BENNETT UNIVERSITY</span>
                      </div>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 text-crimson-400 hover:text-crimson-300 font-montserrat font-bold text-xs uppercase tracking-wider group"
                    href="#register"
                    onClick={() => triggerComicSound("blip")}
                  >
                    <span>CLAIM FINALS SPECTATOR PASS</span>
                    <span className="transition-transform group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              </div>

              {/* CAPTAIN AMERICA VIBRANIUM SHIELD INTERACTIVE ARTIFACT (Right) */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center relative min-h-[440px]">
                <div
                  className="relative flex flex-col items-center group cursor-pointer"
                  id="cap-shield-wrapper"
                  onClick={handleShieldClick}
                >
                  <div className="absolute inset-0 pointer-events-none" id="shield-shockwave-mount"></div>
                  <div className="absolute -inset-6 bg-gradient-to-r from-red-600/35 via-blue-600/30 to-amber-400/25 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
                  <div
                    className="relative w-64 sm:w-72 md:w-80 shield-spin-slow"
                    id="cap-shield-container"
                    style={{ transform: "perspective(600px) rotateX(13deg) rotateY(17.8deg)" }}
                  >
                    <img
                      alt="Captain America Vibranium Shield"
                      className="w-full h-auto drop-shadow-[0_20px_45px_rgba(226,54,54,0.7)] rounded-full select-none"
                      id="cap-shield-img"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6SdP1Fx_aXqSAzeEwksSvumI1q7BSXNaHDqjgTZxx4wAVW3aN8bTRgtN1MBuL6k4hZ3J1e2kR88y6Ydt17Fjehys88xtIX_InFtEe21-w4LJMh9zb8PTFdf4scnGApceRp5dHtrH8XjvXtqp_yA43ZVfuhj9ErGELjSYhki-ccl9u7T8rWpWo2l2HBhVTT-krDZGNRCaV-XAF22AZ7GNBOOb6rNA6JKJnL7uB2OLMoPdobja4LbKQmvK-LjRcg6iwyA"
                    />
                    <div className="shield-glint-sweep"></div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-comicYellow text-black font-montserrat font-black text-sm px-3.5 py-1 rounded-md border-2 border-black shadow-[3px_3px_0px_#000] transform rotate-6 group-hover:scale-125 transition-transform">
                    CLANGGG! 🛡️
                  </div>
                  <div className="bg-crimson-700 text-white font-bebas text-xs px-4 py-1.5 rounded-full shadow-lg tracking-wider uppercase mt-4 border border-red-400/50 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                    <span>VIBRANIUM KINETIC ABSORPTION [CLICK TO RICOCHET]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: InteractiveChaptersSection */}

      {/* BEGIN: MultiverseBackdropBanner */}
      <div
        className="relative w-full py-20 bg-black overflow-hidden border-y border-red-950/60"
        data-purpose="multiverse-showcase"
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-90 contrast-125 scale-105 opacity-75"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXD-10SGro_hSQw-rQrN63njS90-K54fEhkC_ZdFyIlxHaViOpqHTDY08xQUr-lc27gRRUaURnCciTiJkFeegT7xpNsspBD1oKePxAoqmf7sPxn4VSfY948xuQUCw-_WjM3YUYO-vYXciY_-F78BkpTw6zNbNcm-SE1joqi4zaDEU3DzSwTXeABdGT4zIQzk-XqCiWQCcR0KukTm2uWgfdSFGCDfDhM7rW-l12KxomynTX3CxP-yAODprj4JejXXEKfA')",
          }}
        ></div>
        <div className="absolute inset-0 cinematic-vignette"></div>
        <div className="absolute inset-0 comic-halftone opacity-25"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block bg-comicYellow text-black font-bebas text-sm px-4 py-0.5 rounded uppercase tracking-wider mb-4 border border-black shadow-[3px_3px_0px_#000]">
            DIMENSIONAL BROADCAST
          </div>
          <h3
            className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase comic-glitch cursor-pointer"
            onClick={(e) => {
              triggerComicSound("thunder");
              showComicBurst("EXCELSIOR!", e);
            }}
          >
            “IN EVERY UNIVERSE, A HERO WRITES CLEAN CODE”
          </h3>
          <p className="font-techmono text-xs sm:text-sm text-crimson-400 mt-3 uppercase tracking-widest">
            Join over 1,500 students crossing the dimensional web at Bennett University
          </p>
        </div>
      </div>
      {/* END: MultiverseBackdropBanner */}

      {/* BEGIN: AboutSection */}
      <section
        className="relative py-28 px-4 bg-noir overflow-hidden"
        data-purpose="about-chapter"
        id="about"
      >
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 mix-blend-screen filter contrast-125"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuyeF12bfN1QaikHl8Jgm5z3OZh_jBN0M5jHht-_yEXXaAeu1aZ9yvl4bkAP0orEfwEPEUXqCRjFGK6kEOlyAmwy14PAP1ryHda82KdAqXHgMjeVlNkHzeMIdePkZxFg3GpFvK4Hhh4t79k50S4gFj6CmElalvu-oD3mKnvTHi62c3ihUwXX5FRTHdssC_Q806V3IiqgpUwQFeQrmils4Y4uMmX16ycL_cUABDRBQcsRO0eZ4qhpDtPNlwC6VC1Z59iA')",
          }}
        ></div>
        <div className="absolute inset-0 cinematic-vignette pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-start mb-14">
            <span className="text-crimson-500 font-techmono text-xs font-bold uppercase tracking-widest mb-1">
              THE ENGINE BEHIND THE MULTIVERSE
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide uppercase text-white comic-glitch">
              ABOUT THE CHAPTER
            </h2>
            <div className="w-24 h-1.5 bg-crimson-600 mt-2"></div>
          </div>

          <div className="backdrop-blur-xl bg-darkCharcoal/75 border border-zinc-700/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 comic-halftone opacity-25 pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-5">
                <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white">
                  GeeksForGeeks Student Chapter <br />
                  <span className="text-crimson-500">Bennett University</span>
                </h3>
                <p className="text-zinc-300 font-outfit text-base leading-relaxed">
                  We are Bennett University's premier technical community powered by GeeksForGeeks.
                  Committed to cultivating real-world engineering excellence, competitive algorithmic
                  problem solving, open-source innovation, and frontier technologies.
                </p>
                <p className="text-zinc-400 font-outfit text-sm leading-relaxed">
                  Through the Marvel × GFG summit, we merge cinematic visual storytelling with
                  rigorous software hackathons. From first-year novices building their first superhero
                  web canvas to veteran competitive coders optimizing dynamic programming trees, we
                  build the engineers of tomorrow.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span
                    className="px-3 py-1 bg-zinc-900/90 border border-zinc-700 rounded-md text-xs font-techmono text-zinc-300 hover:border-crimson-500 transition-colors cursor-pointer"
                    onClick={() => triggerComicSound("blip")}
                  >
                    #GeeksAtBennett
                  </span>
                  <span
                    className="px-3 py-1 bg-zinc-900/90 border border-zinc-700 rounded-md text-xs font-techmono text-zinc-300 hover:border-crimson-500 transition-colors cursor-pointer"
                    onClick={() => triggerComicSound("blip")}
                  >
                    #GFGxMarvel
                  </span>
                  <span
                    className="px-3 py-1 bg-zinc-900/90 border border-zinc-700 rounded-md text-xs font-techmono text-zinc-300 hover:border-crimson-500 transition-colors cursor-pointer"
                    onClick={() => triggerComicSound("blip")}
                  >
                    #MultiverseHack
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div
                  className="bg-black/80 border border-red-950/80 p-5 rounded-2xl shadow-comic-black hover:border-crimson-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("1,500+ STRONG!", e);
                  }}
                >
                  <span className="block font-bebas text-4xl sm:text-5xl text-crimson-500">1,500+</span>
                  <span className="text-zinc-300 font-outfit text-xs font-semibold uppercase tracking-wide">
                    Active Members
                  </span>
                  <span className="block text-zinc-500 text-[10px] font-techmono mt-1">
                    Undergrad &amp; Postgrad
                  </span>
                </div>
                <div
                  className="bg-black/80 border border-red-950/80 p-5 rounded-2xl shadow-comic-black hover:border-crimson-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("50+ SPRINT EVENTS!", e);
                  }}
                >
                  <span className="block font-bebas text-4xl sm:text-5xl text-white">50+</span>
                  <span className="text-zinc-300 font-outfit text-xs font-semibold uppercase tracking-wide">
                    Hackathons &amp; Tracks
                  </span>
                  <span className="block text-zinc-500 text-[10px] font-techmono mt-1">
                    Conducted to date
                  </span>
                </div>
                <div
                  className="bg-black/80 border border-red-950/80 p-5 rounded-2xl shadow-comic-black hover:border-crimson-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("TOP FAANG MENTORS!", e);
                  }}
                >
                  <span className="block font-bebas text-4xl sm:text-5xl text-white">100+</span>
                  <span className="text-zinc-300 font-outfit text-xs font-semibold uppercase tracking-wide">
                    Industry Mentors
                  </span>
                  <span className="block text-zinc-500 text-[10px] font-techmono mt-1">
                    FAANG &amp; Unicorns
                  </span>
                </div>
                <div
                  className="bg-black/80 border border-red-950/80 p-5 rounded-2xl shadow-comic-black hover:border-crimson-600 transition-colors cursor-pointer"
                  onClick={(e) => {
                    triggerComicSound("blip");
                    showComicBurst("INFINITE HORIZONS!", e);
                  }}
                >
                  <span className="block font-bebas text-4xl sm:text-5xl text-crimson-500">∞</span>
                  <span className="text-zinc-300 font-outfit text-xs font-semibold uppercase tracking-wide">
                    Possibilities
                  </span>
                  <span className="block text-zinc-500 text-[10px] font-techmono mt-1">
                    Across all timelines
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: AboutSection */}

      {/* BEGIN: RegistrationSection */}
      <section
        className="relative py-28 px-4 bg-noirDeep overflow-hidden"
        data-purpose="registration-terminal"
        id="register"
      >
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-60 mix-blend-screen filter contrast-125"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy3GOpf6X3BE2EZUEzhyuFN19SvAjToZvKUGjAkCFIjM6zyRz6N1x2EUSZ4uFeW0r3qoPsI_OhN9Kptf_0913M8aomdmj-dFAxlhJJkViNhsYJoUegeVprve_K9fnVrfujWPnzCkpKwe-si5U6uPOYMAXM5WFF0InsnMQIrZylZ0RaQRUYkaT6QFZlpNYmLkOUtzOYRHnntdxShu-1USLtsfK0FPZelqc6uzF5sDM1A3DPz1aNMw-g-tyA5uTwv6P0qA')",
          }}
        ></div>
        <div className="absolute inset-0 cinematic-vignette pointer-events-none"></div>
        <div className="absolute inset-0 comic-halftone opacity-20 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-crimson-500 font-techmono font-bold text-xs uppercase tracking-widest bg-crimson-950/70 border border-crimson-700/60 px-3.5 py-1 rounded-full">
              YOUR STORY STARTS HERE
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase mt-3 comic-glitch">
              REGISTER FOR THE EVENT
            </h2>
            <p className="text-zinc-400 font-outfit text-sm sm:text-base mt-2">
              Don't just watch the action. Be part of it. Claim your multiversal pass below.
            </p>
          </div>

          <div className="comic-panel-bevel bg-black/85 backdrop-blur-xl rounded-2xl p-6 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-crimson-500 to-transparent"></div>

            <form className="space-y-8" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-xs font-techmono font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  1. SELECT YOUR HERO PASS TIER:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tier 1 */}
                  <label
                    className="relative flex flex-col p-5 bg-zinc-950/80 border-2 border-zinc-800 rounded-xl cursor-pointer hover:border-crimson-600 transition-all group"
                    onClick={() => triggerComicSound("blip")}
                  >
                    <input
                      defaultChecked
                      className="sr-only peer"
                      name="pass_tier"
                      type="radio"
                      value="cadet"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bebas text-xl text-white tracking-wide">VIP CADET</span>
                      <span className="w-4 h-4 rounded-full border-2 border-zinc-600 peer-checked:border-crimson-500 peer-checked:bg-crimson-500"></span>
                    </div>
                    <span className="text-2xl font-bold font-montserrat text-white mb-2">FREE</span>
                    <p className="text-xs text-zinc-400 font-outfit">
                      Access to Day 01 Code Hunt &amp; All Multiverse Workshops.
                    </p>
                    <div className="absolute inset-0 border-2 border-crimson-500 rounded-xl opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </label>

                  {/* Tier 2 (Highlighted) */}
                  <label
                    className="relative flex flex-col p-5 bg-zinc-950/80 border-2 border-crimson-700/80 rounded-xl cursor-pointer hover:border-crimson-500 transition-all group"
                    onClick={() => triggerComicSound("blip")}
                  >
                    <input className="sr-only peer" name="pass_tier" type="radio" value="hero" />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bebas text-xl text-crimson-400 tracking-wide">
                        HERO PASS
                      </span>
                      <span className="w-4 h-4 rounded-full border-2 border-zinc-600 peer-checked:border-crimson-500 peer-checked:bg-crimson-500"></span>
                    </div>
                    <span className="text-2xl font-bold font-montserrat text-white mb-2">₹199</span>
                    <p className="text-xs text-zinc-400 font-outfit">
                      Full 3-Day All-Access Pass, Swag Bag, Hackathon Participation.
                    </p>
                    <div className="absolute inset-0 border-2 border-crimson-500 rounded-xl opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </label>

                  {/* Tier 3 */}
                  <label
                    className="relative flex flex-col p-5 bg-zinc-950/80 border-2 border-zinc-800 rounded-xl cursor-pointer hover:border-crimson-600 transition-all group"
                    onClick={() => triggerComicSound("blip")}
                  >
                    <input className="sr-only peer" name="pass_tier" type="radio" value="team" />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bebas text-xl text-white tracking-wide">
                        MULTIVERSE TEAM
                      </span>
                      <span className="w-4 h-4 rounded-full border-2 border-zinc-600 peer-checked:border-crimson-500 peer-checked:bg-crimson-500"></span>
                    </div>
                    <span className="text-2xl font-bold font-montserrat text-white mb-2">₹499</span>
                    <p className="text-xs text-zinc-400 font-outfit">
                      Squad Pass for 3-4 Coders. Reserved Lab Station &amp; Mentorship.
                    </p>
                    <div className="absolute inset-0 border-2 border-crimson-500 rounded-xl opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"></div>
                  </label>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-techmono uppercase tracking-widest text-zinc-400 mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-crimson-500 font-outfit text-sm"
                    placeholder="e.g. Peter Parker"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-techmono uppercase tracking-widest text-zinc-400 mb-2">
                    University Email
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-crimson-500 font-outfit text-sm"
                    placeholder="hero@bennett.edu.in"
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-techmono uppercase tracking-widest text-zinc-400 mb-2">
                    Student Enrollment ID
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-crimson-500 font-outfit text-sm"
                    placeholder="E23CSEUXXXX"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-techmono uppercase tracking-widest text-zinc-400 mb-2">
                    Primary Superpower / Skill
                  </label>
                  <select className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-crimson-500 font-outfit text-sm">
                    <option>Full-Stack Web Development</option>
                    <option>Competitive DSA &amp; Algorithms</option>
                    <option>AI / Machine Learning</option>
                    <option>UI/UX &amp; Creative Direction</option>
                    <option>Cybersecurity &amp; Forensics</option>
                  </select>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  className="mt-1 rounded bg-zinc-900 border-zinc-700 text-crimson-600 focus:ring-0 cursor-pointer"
                  id="terms"
                  required
                  type="checkbox"
                />
                <label className="text-xs text-zinc-400 font-outfit cursor-pointer" htmlFor="terms">
                  I agree to adhere to the Bennett University Code of Conduct, maintain fair
                  sportsmanship across dimensions, and abide by chapter hackathon guidelines.
                </label>
              </div>

              {/* Main Submission Button */}
              <div className="pt-4">
                <button
                  className="w-full py-5 bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 hover:from-crimson-600 hover:to-red-500 text-white font-montserrat font-black text-lg uppercase tracking-wider rounded-xl btn-laser-glow transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                  type="submit"
                >
                  <span>REGISTER FOR THE EVENT</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* END: RegistrationSection */}

      {/* BEGIN: Footer */}
      <footer
        className="bg-black border-t border-zinc-800 text-zinc-400 py-16 px-4"
        data-purpose="site-footer"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand & University affiliation */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center tracking-wider font-montserrat font-black text-2xl text-white mb-2">
              <span>GFG</span>
              <span className="text-crimson-500 mx-1.5 font-bebas text-3xl">×</span>
              <span>MARVEL</span>
            </div>
            <p className="font-techmono text-xs uppercase tracking-widest text-zinc-400">
              GeeksForGeeks Student Chapter • Bennett University
            </p>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">
              Plot Nos 8, 11, TechZone II, Greater Noida, Uttar Pradesh 201310
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 font-techmono text-xs uppercase tracking-wider">
            <a
              className="hover:text-crimson-500 transition-colors"
              href="#hero"
              onClick={() => triggerComicSound("blip")}
            >
              Hero
            </a>
            <a
              className="hover:text-crimson-500 transition-colors"
              href="#story"
              onClick={() => triggerComicSound("blip")}
            >
              The Story
            </a>
            <a
              className="hover:text-crimson-500 transition-colors"
              href="#chapters"
              onClick={() => triggerComicSound("blip")}
            >
              Chapters
            </a>
            <a
              className="hover:text-crimson-500 transition-colors"
              href="#about"
              onClick={() => triggerComicSound("blip")}
            >
              About
            </a>
            <a
              className="hover:text-crimson-500 transition-colors"
              href="#register"
              onClick={() => triggerComicSound("blip")}
            >
              Register
            </a>
          </div>

          {/* Social Icons Group */}
          <div className="flex items-center gap-4">
            {/* GitHub */}
            <a
              aria-label="GitHub"
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-crimson-600 hover:text-white transition-all cursor-pointer"
              href="#"
              onClick={() => triggerComicSound("blip")}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
              </svg>
            </a>
            {/* Discord */}
            <a
              aria-label="Discord"
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-crimson-600 hover:text-white transition-all cursor-pointer"
              href="#"
              onClick={() => triggerComicSound("blip")}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              aria-label="LinkedIn"
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-crimson-600 hover:text-white transition-all cursor-pointer"
              href="#"
              onClick={() => triggerComicSound("blip")}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
            {/* Instagram */}
            <a
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-zinc-900 hover:bg-crimson-600 hover:text-white transition-all cursor-pointer"
              href="#"
              onClick={() => triggerComicSound("blip")}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright and Disclaimer */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-400 font-techmono">
          <p>© 2026 GeeksForGeeks Student Chapter, Bennett University. All rights reserved.</p>
          <p className="mt-1">
            MARVEL and related characters are fictional cultural motifs used for educational and student
            community hackathon themes.
          </p>
        </div>
      </footer>
      {/* END: Footer */}
    </>
  );
}
