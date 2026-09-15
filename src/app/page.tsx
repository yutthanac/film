"use client";

import React, { useState } from "react";
import ScrollHeroStory from "@/components/ScrollHeroStory";
import BirthdayCake from "@/components/BirthdayCake";
import FlashlightSecretBoard from "@/components/FlashlightSecretBoard";
import RibbonGiftSection from "@/components/RibbonGiftSection";
import LetterModal from "@/components/LetterModal";
import MusicPlayer from "@/components/MusicPlayer";
import { Heart } from "lucide-react";

export default function Home() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleScrollToCake = () => {
    const el = document.getElementById("cake-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen pb-28 overflow-x-clip selection:bg-amber-100">
      {/* Unified Dark Fullscreen Hero + Scroll-driven Morphing Storytelling & Gallery */}
      <ScrollHeroStory
        onOpenLetter={() => setIsLetterOpen(true)}
        onScrollToCake={handleScrollToCake}
      />

      {/* Interactive Birthday Cake Section */}
      <BirthdayCake />

      {/* Secret Flashlight Board Section */}
      <FlashlightSecretBoard />

      {/* Pullable Ribbon Gift Section */}
      <RibbonGiftSection />

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-rose-900/60 pb-8 flex flex-col items-center gap-1">
        <p className="flex items-center gap-1">
          Made with all my <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for the most special girl
        </p>
      </footer>

      {/* Modals & Floating Tools */}
      <LetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
      <MusicPlayer />
    </main>
  );
}
