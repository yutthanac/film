"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Gift, Stars } from "lucide-react";
import DancingLetters from "@/components/DancingLetters";

interface HeroProps {
  onOpenLetter: () => void;
  onScrollToCake: () => void;
}

export default function Hero({ onOpenLetter, onScrollToCake }: HeroProps) {
  const [clickCount, setClickCount] = useState(0);

  const fireSurpriseConfetti = () => {
    setClickCount((prev) => prev + 1);

    // Realistic heart & star confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fb7185", "#fda4af", "#fbbf24", "#e879f9"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <header className="relative pt-12 pb-16 md:pt-20 md:pb-24 flex flex-col items-center text-center px-4 overflow-hidden">

      {/* Main Title - Dancing Letters Animation */}
      <div className="py-6">
        <DancingLetters
          text="Happy Birthday to You"
          className="font-script text-rose-500 drop-shadow-sm cursor-pointer"
          letterClassName="text-3xl sm:text-5xl md:text-6xl text-rose-500 font-script hover:text-rose-600 transition-colors"
        />
      </div>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-800 mb-6 drop-shadow-sm flex flex-wrap items-center justify-center gap-2">
        <span>สุขสันต์วันเกิด</span>{" "}
        <span className="text-5xl sm:text-5xl md:text-6xl font-normal bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
          ฟิล์มมมมม
        </span>
        <span className="inline-block animate-bounce duration-1000 select-none cursor-pointer hover:scale-125 transition-transform">
          💖
        </span>
      </h1>

      {/* Subtitle message */}
      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-10">
        สุขสันต์วันเกิดฟิล์มมม ขอให้ปีนี้เป็นปีที่ใจดีกับฟิล์มนะ ทั้งเรื่องการเรียน การสอน สุขภาพร่างกายแข็งแรงนะ
      </p>

    </header>
  );
}
