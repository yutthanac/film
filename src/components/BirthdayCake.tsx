"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, HeartHandshake, Flame, RefreshCw } from "lucide-react";

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
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#f72585"],
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
    <section id="cake-section" className="py-16 px-4 flex flex-col items-center">
      <div className="max-w-xl w-full glass-card rounded-3xl p-8 md:p-10 shadow-xl border border-rose-100 flex flex-col items-center text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-rose-200/40 via-amber-100/20 to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-800 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Cake</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          อธิษฐานแล้วเป่าเทียนกันเถอะ! 🎂
        </h3>
        <p className="text-sm md:text-base text-rose-900/70 mb-8 max-w-sm">
          หลับตา นึกถึงคำอธิษฐาน 1 ข้อที่อยากให้เป็นจริงในปีนี้ แล้วคลิกที่เทียนเพื่อเป่าได้เลย ✨
        </p>

        {/* The Animated Cake Graphic */}
        <div className="relative my-6 flex flex-col items-center select-none cursor-pointer" onClick={blowCandles}>
          {/* Candle Flame & Wick */}
          <div className="relative flex flex-col items-center -mb-1">
            {isLit ? (
              <div className="relative flex flex-col items-center group">
                {/* Flame glow */}
                <div className="w-8 h-8 rounded-full bg-amber-400/40 blur-md absolute -top-2 animate-ping" />
                {/* Flame tear-drop */}
                <div className="w-5 h-8 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-[50%_50%_35%_35%] shadow-[0_0_15px_#f59e0b] animate-bounce duration-300" />
                <span className="text-xs text-amber-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 whitespace-nowrap bg-amber-50 px-2 py-0.5 rounded shadow-sm">
                  คลิกเพื่อเป่า! 💨
                </span>
              </div>
            ) : (
              <div className="h-6 flex flex-col items-center justify-end">
                {/* Smoke effect */}
                <div className="text-slate-400 text-xs animate-pulse opacity-70">
                  ☁️ ~ 💨
                </div>
              </div>
            )}
            {/* Candle Wick */}
            <div className="w-1 h-3 bg-slate-700" />
            {/* Candle Stick */}
            <div className="w-4 h-14 bg-gradient-to-r from-rose-300 via-pink-100 to-rose-300 rounded-t-sm shadow-inner border border-rose-200/50 flex flex-col justify-around items-center">
              <div className="w-full h-1 bg-rose-400/50" />
              <div className="w-full h-1 bg-rose-400/50" />
              <div className="w-full h-1 bg-rose-400/50" />
            </div>
          </div>

          {/* Cake Layer 1 (Top) */}
          <div className="w-36 h-14 bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200 rounded-t-2xl shadow-md relative border-b-4 border-rose-300 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 w-full flex justify-around text-rose-300 text-xs">
              <span>🍓</span>
              <span>🍒</span>
              <span>🍓</span>
            </div>
            <div className="absolute bottom-1 w-full flex justify-center gap-1.5 opacity-60">
              <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
            </div>
          </div>

          {/* Cake Layer 2 (Bottom) */}
          <div className="w-48 h-18 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 rounded-b-2xl shadow-lg relative border-t-2 border-amber-200/40 flex items-center justify-center">
            <div className="absolute top-1 text-xs text-rose-400 tracking-widest font-semibold uppercase">
              HAPPY BIRTHDAY
            </div>
            <div className="text-xl">🎂</div>
          </div>

          {/* Plate */}
          <div className="w-60 h-4 bg-white/90 rounded-full shadow-md -mt-1 border border-slate-200/60" />
        </div>

        {/* Feedback / Instructions */}
        {isLit ? (
          <button
            onClick={blowCandles}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400/90 hover:bg-amber-400 text-amber-950 text-sm font-semibold shadow-md hover:scale-105 transition-all"
          >
            <Flame className="w-4 h-4 fill-amber-600 text-amber-700" />
            <span>คลิกเป่าเทียนวันเกิด (Make a wish)</span>
          </button>
        ) : (
          <div className="mt-4 flex flex-col items-center animate-fade-in w-full">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl w-full mb-4">
              <p className="text-rose-700 font-bold text-lg mb-1">
                🎉 ยินดีด้วยน้าา ขอให้คำอธิษฐานเป็นจริงทุกประการ! 🌟
              </p>
              <p className="text-rose-900/70 text-sm">
                ไม่ว่าจะขออะไรไว้ ขอให้สิ่งดีๆ เกิดขึ้นกับเธอเสมอนะ
              </p>
            </div>

            {/* Wish input */}
            {!wishMade ? (
              <form onSubmit={handleMakeWish} className="w-full flex gap-2">
                <input
                  type="text"
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  placeholder="เขียนคำอธิษฐานลับๆ บันทึกไว้ตรงนี้..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/80"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors shadow-sm"
                >
                  บันทึก 💖
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-rose-600 bg-rose-100/70 px-4 py-2 rounded-xl text-sm font-medium">
                <HeartHandshake className="w-4 h-4" />
                <span>คำขอ &quot;{customWish}&quot; ถูกบันทึกไว้ในหัวใจแล้วนะ ✨</span>
              </div>
            )}

            <button
              onClick={relightCandle}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 underline font-medium"
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
