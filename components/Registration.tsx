"use client";

import React, { useState } from "react";
import { playComicSound, triggerComicBurst } from "@/utils/soundSystem";
import { ArrowRight, CheckCircle2, Ticket, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    enrollmentId: "",
    eventSelection: "All Chapters / Full Multiverse Pass",
    phoneNumber: "",
    teamName: "",
    agreedTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.enrollmentId.trim()) {
      errs.enrollmentId = "Student enrollment ID is required.";
    }
    if (!formData.agreedTerms) {
      errs.terms = "You must agree to the event guidelines.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      playComicSound("blip");
      return;
    }

    // Trigger celebration sound & burst
    playComicSound("thunder");
    playComicSound("chime");
    triggerComicBurst("PASS RESERVED! 🎟️");

    // Launch confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e23636", "#f5c518", "#ffffff"],
      });
    } catch {
      // ignore
    }

    setSubmittedData({ ...formData });
  };

  const closeModal = () => {
    setSubmittedData(null);
    setFormData({
      fullName: "",
      email: "",
      enrollmentId: "",
      eventSelection: "All Chapters / Full Multiverse Pass",
      phoneNumber: "",
      teamName: "",
      agreedTerms: false,
    });
  };

  return (
    <section
      id="register"
      className="relative py-28 px-4 bg-[#050507] overflow-hidden"
      data-purpose="registration-terminal"
    >
      {/* Background artwork */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30 mix-blend-screen filter contrast-125"
        style={{ backgroundImage: `url('/assets/comic-bg-street.png')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-black/85 to-[#050507] pointer-events-none"></div>
      <div className="absolute inset-0 comic-halftone opacity-25 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-red-500 font-mono font-bold text-xs uppercase tracking-widest bg-red-950/60 border border-red-700/50 px-3.5 py-1 rounded-full">
            FINAL CALL TO ASSEMBLE
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase mt-3">
            REGISTER FOR THE EVENT
          </h2>
          <p className="text-zinc-400 font-outfit text-sm sm:text-base mt-2.5">
            Don&apos;t just watch the action. Be part of it.
          </p>
        </div>

        {/* Registration Panel */}
        <div className="comic-panel-border bg-black/90 backdrop-blur-xl rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Peter Parker"
                  className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-outfit text-sm transition-colors ${
                    errors.fullName ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{errors.fullName}</p>
                )}
              </div>

              {/* University Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  University Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@bennett.edu.in"
                  className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-outfit text-sm transition-colors ${
                    errors.email ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Student Enrollment ID */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Student Enrollment ID *
                </label>
                <input
                  type="text"
                  value={formData.enrollmentId}
                  onChange={(e) =>
                    setFormData({ ...formData, enrollmentId: e.target.value })
                  }
                  placeholder="e.g. E23CSEUXXXX"
                  className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-outfit text-sm transition-colors ${
                    errors.enrollmentId ? "border-red-500" : "border-zinc-700"
                  }`}
                />
                {errors.enrollmentId && (
                  <p className="text-red-400 text-xs mt-1 font-mono">
                    {errors.enrollmentId}
                  </p>
                )}
              </div>

              {/* Event Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Event Track Selection *
                </label>
                <select
                  value={formData.eventSelection}
                  onChange={(e) =>
                    setFormData({ ...formData, eventSelection: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-red-500 font-outfit text-sm"
                >
                  <option>All Chapters / Full Multiverse Pass</option>
                  <option>Chapter 01: Code Hunt / Algorithm Sprint</option>
                  <option>Chapter 02: 24-Hour Buildathon</option>
                  <option>Chapter 03: Final Code Arena &amp; Showcase</option>
                </select>
              </div>

              {/* Phone Number (Optional) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Phone Number <span className="text-zinc-600">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-outfit text-sm"
                />
              </div>

              {/* Team Name (Optional) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Team Name <span className="text-zinc-600">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                  placeholder="e.g. Web Warriors"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-outfit text-sm"
                />
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, agreedTerms: e.target.checked })
                  }
                  className="mt-1 rounded bg-zinc-900 border-zinc-700 text-red-600 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-zinc-400 font-outfit">
                  I agree to adhere to Bennett University event guidelines, maintain fair conduct, and confirm my interest in participating in the GFG Student Chapter event.
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-400 text-xs mt-1 font-mono">{errors.terms}</p>
              )}
            </div>

            {/* Submission CTA Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#b31414] via-[#e23636] to-[#ff2a2a] hover:from-[#e23636] hover:to-[#ff4d4d] text-white font-montserrat font-black text-base sm:text-lg uppercase tracking-wider rounded-xl shadow-comic-red transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <span>REGISTER FOR THE EVENT</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Demo Submission Confirmation Modal */}
      {submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-zinc-950 border-2 border-red-600 p-8 rounded-2xl max-w-lg w-full shadow-2xl text-center comic-panel-border">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="bg-[#f5c518] text-black font-bebas px-4 py-1 rounded inline-block text-sm mb-2 uppercase">
              CONFIRMATION DEMO STATE
            </div>

            <h3 className="font-bebas text-3xl sm:text-4xl text-white uppercase mt-2">
              PASS RESERVED!
            </h3>

            <p className="text-zinc-300 font-outfit text-sm mt-3 leading-relaxed">
              Heroic registration recorded for <strong className="text-white">{submittedData.fullName}</strong>.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 my-5 text-left font-mono text-xs space-y-1.5 text-zinc-300">
              <p><span className="text-zinc-500">ENROLLMENT ID:</span> {submittedData.enrollmentId}</p>
              <p><span className="text-zinc-500">EMAIL:</span> {submittedData.email}</p>
              <p><span className="text-zinc-500">TRACK:</span> {submittedData.eventSelection}</p>
              {submittedData.teamName && (
                <p><span className="text-zinc-500">TEAM:</span> {submittedData.teamName}</p>
              )}
            </div>

            <p className="text-[11px] text-zinc-500 font-mono">
              Note: This is a prototype front-end verification state. No real backend data was permanently written.
            </p>

            <button
              onClick={closeModal}
              className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-montserrat font-bold text-xs uppercase rounded-md tracking-wider transition-colors"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
