"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Flashlight, Sparkles, Trophy, Heart, HelpCircle, Eye } from "lucide-react";

interface SecretMessage {
  id: number;
  text: string;
  emoji: string;
  author: string;
  x: number; // percentage
  y: number; // percentage
}

const SECRETS: SecretMessage[] = [
  {
    id: 1,
    text: "อย่ากินส้มตำหลายยยยยยยยยยยย",
    emoji: "🌶",
    author: "ฟิล์ม",
    x: 20,
    y: 25,
  },
  {
    id: 2,
    text: "ขอให้ปีนี้สอนเด็กๆ แบบราบรื่น ไม่ปวดหัวนะ 555 🎒",
    emoji: "📚",
    author: "กำลังใจ",
    x: 75,
    y: 30,
  },
  {
    id: 3,
    text: "ถ้าเหนื่อยก็มีพี่อยู่ตรงนี้ตลอดนะ ☀️",
    emoji: "🌻",
    author: "",
    x: 50,
    y: 55,
  },
  {
    id: 4,
    text: "เดี๋ยวเลี้ยงชาไทยแก้วนึงงงง 🧋",
    emoji: "🧋",
    author: "เจ้ามือ",
    x: 22,
    y: 78,
  },
  {
    id: 5,
    text: "ขอบคุณที่เป็นความสบายใจให้กันเสมอเลยนะ 🌷",
    emoji: "🐾",
    author: "ชิวาวา",
    x: 76,
    y: 80,
  },
];

export default function FlashlightSecretBoard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -500, y: -500 });
  const [isInside, setIsInside] = useState(false);
  const [foundIds, setFoundIds] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const isAllFound = foundIds.length === SECRETS.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const checkDiscovery = useCallback((x: number, y: number, width: number, height: number) => {
    SECRETS.forEach((item) => {
      const itemX = (item.x / 100) * width;
      const itemY = (item.y / 100) * height;
      const dist = Math.hypot(x - itemX, y - itemY);

      // Flashlight beam radius is ~120px
      if (dist < 100 && !foundIds.includes(item.id)) {
        setFoundIds((prev) => {
          if (prev.includes(item.id)) return prev;
          const updated = [...prev, item.id];
          if (updated.length === SECRETS.length) {
            confetti({
              particleCount: 160,
              spread: 85,
              origin: { y: 0.65 },
            });
          }
          return updated;
        });
      }
    });
  }, [foundIds]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    checkDiscovery(x, y, rect.width, rect.height);
  }, [checkDiscovery]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setMousePos({ x, y });
    setIsInside(true);
    checkDiscovery(x, y, rect.width, rect.height);
  }, [checkDiscovery]);

  return (
    <section id="secret-section" className="relative py-20 px-4 max-w-5xl mx-auto text-center overflow-hidden">
      <div className="absolute inset-0 editorial-grid pointer-events-none opacity-40 -z-10" />

      <h3 className="text-3xl md:text-4xl font-normal text-slate-800 mb-3">
        ค่อยๆส่องงงงงงงงงงงง
      </h3>
      <p className="text-slate-600 max-w-md mx-auto text-sm md:text-base mb-8">
        ค่อยๆส่องไปเรื่อยๆน้ะ หาให้ครบนะะะ
      </p>

      {/* Main Flashlight Canvas Board */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => {
          setIsInside(false);
          setMousePos({ x: -500, y: -500 });
        }}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsInside(true)}
        className={`relative w-full h-[450px] sm:h-[480px] rounded-3xl overflow-hidden transition-all duration-1000 select-none touch-none ${
          isAllFound
            ? "shadow-2xl border-4 border-rose-300 bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fdf2f8] cursor-default ring-4 ring-rose-200/50"
            : "shadow-2xl border-4 border-slate-800 bg-[#090b14] cursor-crosshair"
        }`}
      >
        {/* Background stars / dust (Dark mode vs Light celebration mode) */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            isAllFound
              ? "bg-[radial-gradient(#f43f5e_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-25"
              : "bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"
          }`}
        />

        {/* Secret Messages Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {SECRETS.map((item) => {
            const isFound = foundIds.includes(item.id);
            return (
              <div
                key={item.id}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute max-w-[260px] sm:max-w-xs p-3.5 rounded-2xl text-left transition-all duration-700 ${
                  isAllFound
                    ? "bg-white/90 backdrop-blur-md border border-rose-200 text-slate-800 shadow-xl ring-2 ring-rose-300/30 scale-105"
                    : "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-medium mb-1">
                  <span>{item.emoji}</span>
                  <span className={isAllFound ? "text-rose-600 font-semibold" : "text-amber-300"}>
                    {item.author}
                  </span>
                  {isFound && (
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${
                      isAllFound
                        ? "bg-rose-500 text-white font-medium"
                        : "bg-rose-500/80 text-white"
                    }`}>
                      {isAllFound ? "เปิดเผยแล้ว ✨" : "เจอตะกี้!"}
                    </span>
                  )}
                </div>
                <p className={`font-peakuay text-xl sm:text-2xl leading-snug font-normal ${
                  isAllFound ? "text-rose-900 font-semibold" : "text-rose-200"
                }`}>
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* The Dark Overlay with Flashlight Cutout - Disappears smoothly when all are found */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
            isAllFound ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
          style={{
            background: "#090b14",
            maskImage: isInside
              ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0, 0, 0, 0.5) 70%, black 100%)`
              : "none",
            WebkitMaskImage: isInside
              ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0, 0, 0, 0.5) 70%, black 100%)`
              : "none",
          }}
        >
          {/* Hint shown when mouse is outside and not yet all found */}
          {!isInside && !isAllFound && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Flashlight className="w-8 h-8 text-amber-400 animate-bounce" />
              <p className="text-sm font-medium text-slate-300">
                {isMobile ? "แตะและลากนิ้วบนกระดานเพื่อเปิดไฟฉาย" : "เลื่อนเมาส์เข้ามาในกรอบนี้เพื่อเปิดไฟฉาย 🔦"}
              </p>
              <span className="text-xs text-slate-500">
                (มีข้อความรักซ่อนอยู่ 5 จุดตามมุมต่างๆ)
              </span>
            </div>
          )}
        </div>

        {/* Glow halo around flashlight center (only when dark and active) */}
        {isInside && !isAllFound && (
          <div
            className="absolute pointer-events-none rounded-full border border-amber-300/40 bg-amber-400/10 shadow-[0_0_50px_rgba(251,191,36,0.3)] transition-transform"
            style={{
              width: "280px",
              height: "280px",
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

      </div>

      {/* Status Bar / Tracker */}
      <div className="mt-8 max-w-xl mx-auto p-4 rounded-2xl neu-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>
            ส่องเจอแล้ว: <strong className="text-rose-600 text-sm">{foundIds.length}</strong> / {SECRETS.length} ข้อความ
          </span>
        </div>

        {/* Pill list of secrets */}
        <div className="flex gap-2">
          {SECRETS.map((s) => (
            <span
              key={s.id}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                foundIds.includes(s.id)
                  ? "neu-accent-btn text-white scale-110"
                  : "neu-inset text-slate-400"
              }`}
              title={foundIds.includes(s.id) ? "ส่องเจอแล้ว!" : "ยังไม่เจอ"}
            >
              {s.id}
            </span>
          ))}
        </div>

        {foundIds.length === SECRETS.length ? (
          <div className="inline-flex items-center gap-1.5 text-rose-600 font-bold neu-pill px-3.5 py-1 animate-bounce">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>ค้นพบครบหมดแล้ว รักน้องฟิล์มที่สุดด 💖</span>
          </div>
        ) : (
          <span className="text-slate-400">
            ส่องสำรวจให้ครบทุกมุมน้า ✨
          </span>
        )}
      </div>
    </section>
  );
}
