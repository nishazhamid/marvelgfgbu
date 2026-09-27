import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoryIntro from "@/components/StoryIntro";
import EventsSection from "@/components/EventsSection";
import About from "@/components/About";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";
import GlobalTracker from "@/components/GlobalTracker";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050507] text-zinc-100 flex flex-col">
      {/* Mini Inverted Spider-Man Presence & Scroll-to-Top Indicator */}
      <GlobalTracker />

      {/* Floating Header Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Story Introduction */}
      <StoryIntro />

      {/* The 3 Connected Event Chapters */}
      <EventsSection />

      {/* Chapter Overview & About Section */}
      <About />

      {/* Final Event Registration Terminal */}
      <Registration />

      {/* Site Footer */}
      <Footer />
    </main>
  );
}
