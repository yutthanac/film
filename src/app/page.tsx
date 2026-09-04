"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import BirthdayCake from "@/components/BirthdayCake";
import MemoryGallery from "@/components/MemoryGallery";
import ReasonsList from "@/components/ReasonsList";
import LetterModal from "@/components/LetterModal";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingParticles from "@/components/FloatingParticles";
import { Heart, Sparkles, Send } from "lucide-react";
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

      {/* Reasons Why I Love You */}
      <ReasonsList />

      {/* Wishes Board / Guestbook style */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl border border-rose-100 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Birthday Wishes Board</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            กระดานคำอวยพรถึงเธอ 💬✨
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            ฝากข้อความหรือคำอวยพรน่ารักๆ แปะไว้บนบอร์ดนี้ได้นะ
          </p>

          {/* Sticky Notes Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="p-3.5 rounded-2xl bg-gradient-to-tr from-amber-50 to-rose-50 border border-rose-200/80 shadow-sm text-slate-700 text-sm max-w-xs text-left transform hover:rotate-1 hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-1.5 text-rose-400 text-xs mb-1">
                  <Heart className="w-3 h-3 fill-rose-400" />
                  <span>Wish #{index + 1}</span>
                </div>
                {msg}
              </div>
            ))}
          </div>

          {/* Add wish input form */}
          <form onSubmit={handleAddMessage} className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="พิมพ์คำอวยพรเพิ่มเติม..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ส่ง</span>
            </button>
          </form>
        </div>
      </section>

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
