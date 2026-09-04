"use client";

import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Gift, RotateCcw, Trophy, Heart } from "lucide-react";

interface ScratchCardProps {
  id: number;
  title: string;
  secretText: string;
  emoji: string;
  subText: string;
  onCleared?: (id: number) => void;
}

function ScratchCardItem({
  id,
  title,
  secretText,
  emoji,
  subText,
  onCleared,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCleared, setIsCleared] = useState(false);
  const [percent, setPercent] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Reset canvas dimensions to match display
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill scratchable surface with metallic silver-rose gradient & pattern
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#fbcfe8"); // pink-200
    grad.addColorStop(0.5, "#fda4af"); // rose-300
    grad.addColorStop(1, "#f472b6"); // pink-400
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add cute decorative overlay text
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ ขูดตรงนี้เพื่อเปิดความลับ ✨", canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("🪙 ใช้เมาส์หรือนิ้วถูขูดได้เลย", canvas.width / 2, canvas.height / 2 + 16);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isCleared) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check scratched percentage occasionally
    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isCleared) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    const total = data.length / 4;

    // Sample every 16th pixel for performance
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparent++;
    }

    const currentPercent = Math.round((transparent / (total / 4)) * 100);
    setPercent(Math.min(currentPercent, 100));

    if (currentPercent > 45 && !isCleared) {
      setIsCleared(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (onCleared) onCleared(id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
      });
    }
  };

  const resetCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    setIsCleared(false);
    setPercent(0);

    ctx.globalCompositeOperation = "source-over";
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#fbcfe8");
    grad.addColorStop(0.5, "#fda4af");
    grad.addColorStop(1, "#f472b6");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ ขูดตรงนี้เพื่อเปิดความลับ ✨", canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("🪙 ใช้เมาส์หรือนิ้วถูขูดได้เลย", canvas.width / 2, canvas.height / 2 + 16);
  };

  return (
    <div className="flex flex-col items-center bg-white/90 p-4 pb-5 rounded-3xl shadow-lg border border-rose-100 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between w-full mb-3 px-1">
        <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
          <Gift className="w-3.5 h-3.5" />
          {title}
        </span>
        {isCleared ? (
          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            เปิดรางวัลแล้ว 🎉
          </span>
        ) : (
          <span className="text-[10px] text-slate-400">
            ขูดแล้ว: {percent}%
          </span>
        )}
      </div>

      {/* Card Body Container */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden select-none bg-gradient-to-b from-rose-50 to-pink-100/60 border border-rose-200/60 flex flex-col items-center justify-center p-4 text-center">
        {/* Hidden reward revealed beneath */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-4xl mb-2 animate-bounce">{emoji}</span>
          <h4 className="font-peakuay text-2xl sm:text-3xl text-rose-600 font-semibold mb-1 leading-tight">
            {secretText}
          </h4>
          <p className="text-xs text-rose-900/70 font-light mt-1">
            {subText}
          </p>
        </div>

        {/* Scratchable Canvas Layer */}
        <canvas
          ref={canvasRef}
          onMouseDown={() => (isDrawing.current = true)}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
          onMouseMove={(e) => {
            if (isDrawing.current) scratch(e.clientX, e.clientY);
          }}
          onTouchStart={() => (isDrawing.current = true)}
          onTouchEnd={() => (isDrawing.current = false)}
          onTouchMove={(e) => {
            if (isDrawing.current && e.touches[0]) {
              scratch(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-300 ${
            isCleared ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Reset button if cleared */}
      {isCleared && (
        <button
          onClick={resetCard}
          className="mt-3 text-[11px] text-rose-400 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>ขูดใหม่อีกรอบ</span>
        </button>
      )}
    </div>
  );
}

export default function ScratchRewardSection() {
  const [clearedIds, setClearedIds] = useState<number[]>([]);

  const CARDS = [
    {
      id: 1,
      title: "ใบที่ 1 : สิทธิ์พิเศษวันเกิด",
      emoji: "👑",
      secretText: "บัตรตามใจแฟน 1 วันเต็ม!",
      subText: "ไม่ว่าจะอยากไปไหน กินอะไร หรือให้ทำอะไร วันนี้ยอมหมดเลย!",
    },
    {
      id: 2,
      title: "ใบที่ 2 : ของรางวัลสายกิน",
      emoji: "🥩🍣",
      secretText: "บุฟเฟต์/โอมากาเสะมื้อใหญ่",
      subText: "พาไปเลี้ยงร้านโปรดที่อยากกินทันที ปักหมุดรอไว้เลยย",
    },
    {
      id: 3,
      title: "ใบที่ 3 : บริการพิเศษ",
      emoji: "💆‍♀️✨",
      secretText: "คูปองนวดแก้เมื่อย + กอดฟรี",
      subText: "นวดไหล่ นวดหลัง คลายความเหนื่อยล้า พร้อมกอดอุ่นๆ ตลอดชีพ",
    },
  ];

  const handleCleared = (id: number) => {
    if (!clearedIds.includes(id)) {
      const next = [...clearedIds, id];
      setClearedIds(next);
      if (next.length === CARDS.length) {
        confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.6 },
        });
      }
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center">
      {/* Badge Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold mb-3 backdrop-blur-sm border border-rose-200 shadow-sm animate-pulse-glow">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
        <span>Birthday Lucky Scratch Cards</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
      </div>

      <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        กระดาษขูดลุ้นรางวัลวันเกิด 🪙🎁
      </h3>
      <p className="text-slate-600 max-w-md mx-auto text-sm md:text-base mb-10">
        ลองใช้เมาส์หรือนิ้วถูขูดบนการ์ดสีชมพูดูสิ... มีของขวัญและสิทธิพิเศษรอเธออยู่ข้างใต้!
      </p>

      {/* Grid of Scratch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <ScratchCardItem
            key={card.id}
            id={card.id}
            title={card.title}
            emoji={card.emoji}
            secretText={card.secretText}
            subText={card.subText}
            onCleared={handleCleared}
          />
        ))}
      </div>

      {/* Reward Status Banner */}
      <div className="mt-10 max-w-xl mx-auto p-4 rounded-2xl glass-card border border-rose-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>
            เปิดรางวัลไปแล้ว: <strong className="text-rose-600 text-sm">{clearedIds.length}</strong> / {CARDS.length} ใบ
          </span>
        </div>

        {clearedIds.length === CARDS.length ? (
          <div className="inline-flex items-center gap-1.5 text-rose-600 font-bold bg-rose-100/80 px-3 py-1 rounded-full animate-bounce">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>ยินดีด้วย! ได้ครบทุกสิทธิ์แล้ว แคปหน้าจอมาเคลมรางวัลเลยน้า 💖</span>
          </div>
        ) : (
          <span className="text-slate-400">
            ขูดเปิดให้ครบทั้ง 3 ใบเลยนะ ✨
          </span>
        )}
      </div>
    </section>
  );
}
