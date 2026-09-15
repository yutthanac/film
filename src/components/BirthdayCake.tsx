"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, HeartHandshake, Flame, RefreshCw } from "lucide-react";
import MatchaCake2D from "@/components/MatchaCake2D";

export default function BirthdayCake() {
  const [isLit, setIsLit] = useState(true);
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [customWish, setCustomWish] = useState("");

  const blowCandles = () => {
    if (!isLit) return;
    setIsLit(false);
    setIsBlown(true);

    // Sweet celebratory sound/visual explosion
    confetti({
      particleCount: 140,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#629948", "#10b981", "#fbbf24", "#f43f5e", "#ffffff"],
    });
  };

  const handleMakeWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;
    setWishMade(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const relightCandle = () => {
    setIsLit(true);
    setIsBlown(false);
    setWishMade(false);
  };

  return (
    <section id="cake-section" className="relative py-16 px-4 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 editorial-grid pointer-events-none opacity-40 -z-10" />
      <div className="max-w-xl w-full flex flex-col items-center text-center relative">
        {/* Aesthetic 2D Matcha Cake */}
        <MatchaCake2D isLit={isLit} onCandleClick={blowCandles} />

        {/* Feedback / Instructions */}
        {isLit ? (
          <button
            onClick={blowCandles}
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-2xl neu-btn text-emerald-900 text-sm font-semibold hover:text-emerald-700"
          >
            <span>คลิกเลยยยยยยยยยยย</span>
          </button>
        ) : (
          <div className="mt-6 flex flex-col items-center animate-fade-in w-full max-w-md">
            <div className="p-4 neu-inset rounded-2xl w-full mb-4 text-center">
              <p className="text-emerald-700 font-normal text-lg mb-1">
                ขอให้คำอธิษฐานเป็นจริงทุกประการน๊ะจ๊ะะะะะ
              </p>
            </div>

            {/* Wish input */}
            {!wishMade ? (
              <form onSubmit={handleMakeWish} className="w-full flex gap-2.5">
                <input
                  type="text"
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  placeholder="เขียนคำอธิษฐานลับๆ บันทึกไว้ตรงนี้..."
                  className="flex-1 px-4 py-3 rounded-2xl neu-inset text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl neu-accent-btn text-white text-sm font-medium"
                >
                  บันทึก
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 neu-pill px-5 py-2.5 text-sm font-medium">
                <span>คำขอ &quot;{customWish}&quot; ถูกบันทึกไว้ในหัวใจแล้วน๊าาา</span>
              </div>
            )}

            <button
              onClick={relightCandle}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-800 underline font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              <span>จุดเทียนใหม่อีกรอบ</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
