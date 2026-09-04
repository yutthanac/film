"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Gift, Stars } from "lucide-react";

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

      {/* Main Title */}
      <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-rose-500 mb-2 drop-shadow-sm py-8">
        Happy Birthday to You
      </h2>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-800 mb-6 drop-shadow-sm flex flex-wrap items-center justify-center gap-2">
        <span>สุขสันต์วันเกิด</span>{" "}
        <span className="font-peakuay text-5xl sm:text-5xl md:text-6xl font-normal bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent underline decoration-rose-200 decoration-wavy decoration-2 inline-block px-1">
          น้องฟิล์ม
        </span>{" "}
        <span>💖</span>
      </h1>

      {/* Subtitle message */}
      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-rose-900/80 font-normal leading-relaxed mb-10">
        ขอให้ปีนี้เป็นปีที่ใจดีกับเธอ มีรอยยิ้มสดใสในทุกๆ วัน สุขภาพแข็งแรง 
        กินของอร่อยเยอะๆ และมีความสุขที่สุดในโลกนะ! ขอบคุณที่เข้ามาเป็นความน่ารักให้กันในทุกวัน 🌷✨
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 z-10">
        <button
          onClick={fireSurpriseConfetti}
          className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <Gift className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span>กดรับของขวัญเซอร์ไพรส์ 🎁</span>
          {clickCount > 0 && (
            <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
              +{clickCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenLetter}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/80 hover:bg-white text-rose-700 font-medium border border-rose-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 backdrop-blur-md"
        >
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
          <span>เปิดอ่านจดหมายถึงเธอ 💌</span>
        </button>

        <button
          onClick={onScrollToCake}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-100/80 hover:bg-amber-100 text-amber-900 font-medium border border-amber-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        >
          <Stars className="w-5 h-5 text-amber-600" />
          <span>ไปเป่าเค้กกัน 🎂</span>
        </button>
      </div>
    </header>
  );
}
