"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Gift, RotateCcw, ChevronDown, Heart } from "lucide-react";

export default function RibbonGiftSection() {
  const [isOpened, setIsOpened] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Motion value for vertical drag distance
  const dragY = useMotionValue(0);
  const ribbonScale = useTransform(dragY, [0, 180], [1, 1.45]);
  const ribbonOpacity = useTransform(dragY, [0, 160, 185], [1, 0.8, 0]);

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);
    confetti({
      particleCount: 170,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#fb7185", "#fde047", "#10b981", "#ffffff"],
    });
  };

  const handleReset = () => {
    setIsOpened(false);
    setPullProgress(0);
    dragY.set(0);
  };

  return (
    <section id="ribbon-gift-section" className="relative py-20 px-4 max-w-5xl mx-auto text-center flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 editorial-grid pointer-events-none opacity-40 -z-10" />
      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-normal text-slate-800 mb-2">
        ดึงริบบิ้นลง
      </h3>
      <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base mb-12">
        {isOpened
          ? "แท่นแท้นนนน! 🎉"
          : "ลองดึงริบบิ้นสีทองลงมา เพื่อแกะของขวัญดู!"}
      </p>

      {/* Main Interactive Gift Box Container */}
      <div className="relative w-full max-w-xl flex flex-col items-center justify-center min-h-[460px]">
        {/* Glow ambient background */}
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
            isOpened
              ? "bg-rose-300/45 scale-125 opacity-100"
              : "bg-amber-200/40 scale-100 opacity-70"
          }`}
        />

        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* ================= GIFT BOX CLOSED (BIG, ELEGANT & PULLABLE) ================= */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative flex flex-col items-center select-none"
            >
              {/* Floating Gift Box Illustration */}
              <div
                onClick={handleOpenGift}
                className="relative cursor-pointer group transform transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* 3D Gift Box Body (Larger 320px x 280px with Rich Textures & Shadows) */}
                <div className="relative w-72 sm:w-84 md:w-96 h-64 sm:h-72 rounded-[2.5rem] neu-card bg-gradient-to-br from-[#fff0f3] via-[#ffd6dd] to-[#fecdd3] border-4 border-white/90 p-8 flex items-center justify-center shadow-[0_25px_50px_-12px_rgba(244,63,94,0.25)] overflow-hidden">
                  
                  {/* Luxury Polka Dots & Shimmer Texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

                  {/* Vertical Gift Ribbon (Rich Satin Rose Gradient) */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 shadow-xl flex justify-center items-center">
                    {/* Gold Inset Seam on Ribbon */}
                    <div className="w-1.5 h-full bg-gradient-to-b from-amber-200/70 via-yellow-100/90 to-amber-300/70" />
                  </div>

                  {/* Horizontal Gift Ribbon */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16 sm:h-20 bg-gradient-to-b from-rose-600 via-rose-500 to-rose-700 shadow-xl flex flex-col justify-center">
                    <div className="h-1.5 w-full bg-gradient-to-r from-amber-200/70 via-yellow-100/90 to-amber-300/70" />
                  </div>

                  {/* Box Lid Upper Border Accent (3D Bevel) */}
                  <div className="absolute top-0 left-0 right-0 h-16 sm:h-18 bg-white/30 border-b-2 border-rose-300/60 rounded-t-[2.3rem] backdrop-blur-[2px] shadow-sm flex items-center justify-between px-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-300/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-300/60" />
                  </div>

                  {/* Center Gift Plaque / Card Tag */}
                  <div className="relative z-10 neu-pill px-6 py-2.5 bg-white/95 border-2 border-rose-200 text-rose-800 text-xs sm:text-lg font-normal shadow-sm flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <span>ของขวัญน้องฟิล์มมม 🎀✨</span>
                  </div>

                  {/* Soft Corner Shine */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Big Magnificent Fluffy Ribbon Bow on Top */}
                <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center justify-center">
                  <svg width="220" height="130" viewBox="0 0 220 130" className="drop-shadow-2xl overflow-visible">
                    <defs>
                      <linearGradient id="bowGradBig" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="35%" stopColor="#e11d48" />
                        <stop offset="85%" stopColor="#be123c" />
                        <stop offset="100%" stopColor="#881337" />
                      </linearGradient>
                      <linearGradient id="bowHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#fda4af" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="goldEdgeBig" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>

                    {/* Left Big Loop */}
                    <path
                      d="M 110 75 C 75 20, 15 25, 25 72 C 38 115, 95 85, 110 75 Z"
                      fill="url(#bowGradBig)"
                      stroke="url(#goldEdgeBig)"
                      strokeWidth="2.5"
                    />
                    {/* Left Loop Top Highlight */}
                    <path
                      d="M 38 48 C 50 32, 85 35, 104 65"
                      stroke="url(#bowHighlight)"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Right Big Loop */}
                    <path
                      d="M 110 75 C 145 20, 205 25, 195 72 C 182 115, 125 85, 110 75 Z"
                      fill="url(#bowGradBig)"
                      stroke="url(#goldEdgeBig)"
                      strokeWidth="2.5"
                    />
                    {/* Right Loop Top Highlight */}
                    <path
                      d="M 182 48 C 170 32, 135 35, 116 65"
                      stroke="url(#bowHighlight)"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Left Bottom Ribbon Tail Flap */}
                    <path
                      d="M 98 82 C 80 102, 65 125, 45 130 C 58 112, 70 95, 82 85 Z"
                      fill="url(#bowGradBig)"
                      stroke="url(#goldEdgeBig)"
                      strokeWidth="1.5"
                    />
                    {/* Right Bottom Ribbon Tail Flap */}
                    <path
                      d="M 122 82 C 140 102, 155 125, 175 130 C 162 112, 150 95, 138 85 Z"
                      fill="url(#bowGradBig)"
                      stroke="url(#goldEdgeBig)"
                      strokeWidth="1.5"
                    />

                    {/* Center Knot (Fluffy Rosette) */}
                    <ellipse
                      cx="110"
                      cy="75"
                      rx="20"
                      ry="18"
                      fill="url(#bowGradBig)"
                      stroke="url(#goldEdgeBig)"
                      strokeWidth="2.5"
                    />
                    <circle cx="106" cy="71" r="5" fill="#ffffff" opacity="0.6" />
                  </svg>
                </div>
              </div>

              {/* PULLABLE GOLDEN SILK RIBBON TAIL */}
              <div className="relative z-30 mt-[-10px] flex flex-col items-center">
                <motion.div
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 200 }}
                  dragElastic={0.2}
                  style={{ y: dragY, scale: ribbonScale, opacity: ribbonOpacity }}
                  onDragStart={() => setIsDragging(true)}
                  onDrag={(_, info) => {
                    const progress = Math.min(100, Math.max(0, (info.offset.y / 150) * 100));
                    setPullProgress(progress);
                    if (info.offset.y >= 140) {
                      handleOpenGift();
                    }
                  }}
                  onDragEnd={(_, info) => {
                    setIsDragging(false);
                    if (info.offset.y < 140) {
                      dragY.set(0);
                      setPullProgress(0);
                    }
                  }}
                  className="cursor-grab active:cursor-grabbing flex flex-col items-center"
                >
                  {/* Golden Silk Ribbon Cord */}
                  <div className="w-5 h-20 sm:h-24 bg-gradient-to-b from-rose-600 via-amber-400 to-amber-500 rounded-full shadow-lg flex justify-center border border-amber-200">
                    <div className="w-1 h-full bg-white/80" />
                  </div>

                  {/* Pull Handle Ring with Tag */}
                  <motion.div
                    animate={{
                      y: isDragging ? 0 : [0, 8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="px-5 py-3 rounded-full neu-btn bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 text-amber-950 shadow-2xl border-2 border-white flex items-center justify-center gap-2 mt-[-8px]"
                  >
                    <ChevronDown className="w-5 h-5 text-amber-900 animate-bounce" />
                  </motion.div>
                </motion.div>

                {/* Hint Guide */}
              </div>
            </motion.div>
          ) : (
            /* ================= GIFT OPENED (SURPRISE REVEAL CARD) ================= */
            <motion.div
              key="opened-box"
              initial={{ scale: 0.6, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="w-full max-w-lg neu-card p-6 sm:p-10 text-center relative border-2 border-rose-200/80 bg-gradient-to-b from-white to-[#fff1f2] shadow-2xl"
            >
              {/* Secret Reward Title */}
              <h4 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 font-peakuay">
                คูปองตามใจน้องฟิล์ม 1 วันเต็ม! 👑💖
              </h4>

              {/* Friendly / Warm Descriptions */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-normal">
                ไม่ว่าจะอยากไปไหน กินชาไทยร้านไหน หรือให้พาไปหาของอร่อย <br className="hidden sm:inline" />
                วันนี้ยอมเป็นคนขับรถและกระเป๋าตังค์ให้ทั้งวันเลยยยย 🚙💨
              </p>

              {/* Detail Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-left text-xs sm:text-sm">
                <div className="p-4 neu-inset rounded-2xl bg-[#fdf2f8]/70 border border-rose-100">
                  <span className="text-rose-500 font-bold block mb-1">🍰 สิทธิ์พิเศษ #1</span>
                  <span className="text-slate-600 font-medium">กินของหวาน/ชาไทยไม่อั้น</span>
                </div>
                <div className="p-4 neu-inset rounded-2xl bg-[#fdf2f8]/70 border border-rose-100">
                  <span className="text-rose-500 font-bold block mb-1">🐾 สิทธิ์พิเศษ #2</span>
                  <span className="text-slate-600 font-medium">ห้ามบ่น ห้ามขัดใจทุกกรณี!</span>
                </div>
              </div>

              {/* Re-wrap button */}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-rose-600 underline font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ห่อของขวัญใหม่อีกรอบ 🎀</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mystery Button to Anniversary Tracker */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/anniversary"
            className="neu-btn px-7 py-2.5 rounded-full inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-900 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-sm"
          >
            <span>กดตรงนี้</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
