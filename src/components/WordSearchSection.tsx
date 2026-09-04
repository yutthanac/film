"use client";

import React, { useState } from "react";
import { MagneticText } from "@/components/ui/morphing-cursor";
import { Search, Sparkles, Trophy, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface WordItem {
  id: number;
  word: string;
  secret: string;
  hint: string;
}

const WORDS: WordItem[] = [
  { id: 1, word: "ORDINARY DAY", secret: "MY FAVORITE DAY 💖", hint: "วันธรรมดาที่ไม่ธรรมดา" },
  { id: 2, word: "ALWAYS TIRED", secret: "LOVE YOU MORE 🌷", hint: "เหนื่อยแค่ไหนก็ยังมีเค้า" },
  { id: 3, word: "JUST FRIEND", secret: "MY WHOLE WORLD 💍", hint: "ความในใจที่ซ่อนไว้" },
  { id: 4, word: "SECRET WISH", secret: "STAY WITH ME FOREVER ✨", hint: "คำอธิษฐานลับสุดยอด" },
];

export default function WordSearchSection() {
  const [foundIds, setFoundIds] = useState<number[]>([]);

  const handleReveal = (id: number) => {
    if (!foundIds.includes(id)) {
      const next = [...foundIds, id];
      setFoundIds(next);
      if (next.length === WORDS.length) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.7 },
        });
      }
    }
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Badge Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold mb-3 backdrop-blur-sm border border-rose-200">
        <Search className="w-3.5 h-3.5" />
        <span>Interactive Secret Words</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
      </div>

      <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        เกมตามหาคำลับในใจ 🔍💌
      </h3>
      <p className="text-slate-600 max-w-md mx-auto text-sm md:text-base mb-8">
        ลองนำเมาส์ไปวาง (Hover) ทาบลงบนคำภาษาอังกฤษด้านล่างนี้ดูสิ... จะมีข้อความลับที่ซ่อนอยู่เผยออกมา!
      </p>

      {/* Interactive Word Cards Grid */}
      <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-rose-100/80 flex flex-col items-center gap-8 relative overflow-hidden">
        {/* Subtle background blur accent */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-6 w-full">
          {WORDS.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => handleReveal(item.id)}
              className="flex flex-col items-center p-3 rounded-2xl transition-all hover:bg-rose-50/50 w-full"
            >
              <span className="text-xs text-rose-400 font-medium mb-1 tracking-wider">
                คำใบ้: {item.hint}
              </span>
              <MagneticText
                text={item.word}
                hoverText={item.secret}
                className="hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>

        {/* Progress Tracker */}
        <div className="mt-4 pt-6 border-t border-rose-100/80 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>
              ค้นพบข้อความลับแล้ว: <strong className="text-rose-600">{foundIds.length}</strong> / {WORDS.length} คำ
            </span>
          </div>

          {foundIds.length === WORDS.length ? (
            <div className="inline-flex items-center gap-1.5 text-rose-600 font-semibold bg-rose-100 px-3 py-1 rounded-full animate-bounce">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>เก่งมาก! ค้นพบความในใจครบทุกข้อแล้วนะ 💖</span>
            </div>
          ) : (
            <span className="text-slate-400">
              นำเมาส์ส่องดูให้ครบทุกคำนะ ✨
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
