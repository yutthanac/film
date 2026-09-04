"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import BirthdayCake from "@/components/BirthdayCake";
import MemoryGallery from "@/components/MemoryGallery";
import FlashlightSecretBoard from "@/components/FlashlightSecretBoard";
import RibbonGiftSection from "@/components/RibbonGiftSection";
import LetterModal from "@/components/LetterModal";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingParticles from "@/components/FloatingParticles";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([
    "มีความสุขมากๆ นะคนดี 🎂",
    "ขอให้ปีนี้สอบผ่าน/งานราบรื่น ปังๆ ทุกเรื่องนะ ✨",
    "อยู่เป็นรอยยิ้มให้กันไปนานๆ นะคะ 💕",
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleScrollToCake = () => {
    const el = document.getElementById("cake-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, newMessage.trim()]);
    setNewMessage("");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  return (
    <main className="relative min-h-screen pb-28 overflow-x-hidden selection:bg-rose-200">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Hero Section */}
      <Hero
        onOpenLetter={() => setIsLetterOpen(true)}
        onScrollToCake={handleScrollToCake}
      />

      {/* Interactive Birthday Cake */}
      <BirthdayCake />

      {/* Memory Gallery */}
      <MemoryGallery />

      {/* Secret Flashlight Board Section */}
      <FlashlightSecretBoard />

      {/* Pullable Ribbon Gift Section */}
      <RibbonGiftSection />

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-rose-900/60 pb-8 flex flex-col items-center gap-1">
        <p className="flex items-center gap-1">
          Made with all my <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for the most special girl
        </p>
        <p className="text-[11px] text-slate-400">Happy Birthday 2026 • Forever & Always</p>
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
