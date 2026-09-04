"use client";

import React, { useState } from "react";
import { Sparkles, Smile, Star, Coffee, Moon, Sun } from "lucide-react";

interface Reason {
  id: number;
  icon: React.ReactNode;
  short: string;
  detail: string;
}

const reasons: Reason[] = [
  {
    id: 1,
    icon: <Smile className="w-5 h-5 text-amber-500" />,
    short: "รอยยิ้มที่สดใสที่สุด",
    detail: "เวลาที่เธอยิ้มหรือหัวเราะ โลกทั้งใบสดใสขึ้นมาทันที เป็นพลังบวกให้เค้าเสมอในทุกๆ วัน",
  },
  {
    id: 2,
    icon: <Coffee className="w-5 h-5 text-rose-500" />,
    short: "ความใส่ใจในเรื่องเล็กๆ",
    detail: "จำได้เสมอว่าเค้าชอบกินอะไร ไม่ชอบอะไร คอยถามไถ่ว่าเหนื่อยไหม เป็นความอบอุ่นที่หาจากไหนไม่ได้อีกแล้ว",
  },
  {
    id: 3,
    icon: <Sun className="w-5 h-5 text-orange-500" />,
    short: "เป็นเซฟโซนที่ดีที่สุด",
    detail: "ไม่ว่าจะเจอเรื่องเหนื่อยแค่ไหนมา พอได้คุยกับเธอ ได้ยินเสียงเธอ ก็รู้สึกสบายใจและหายเหนื่อยเป็นปลิดทิ้ง",
  },
  {
    id: 4,
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    short: "คนเก่งและตั้งใจเสมอ",
    detail: "เวลาเธอตั้งใจทำอะไรสักอย่าง เธอมีเสน่ห์และเท่มากๆ ภูมิใจในตัวเธอเสมอเลยนะ",
  },
  {
    id: 5,
    icon: <Moon className="w-5 h-5 text-indigo-500" />,
    short: "คอยรับฟังและเข้าใจ",
    detail: "ขอบคุณที่ไม่เคยตัดสิน รับฟังทุกเรื่องทั้งเรื่องมีสาระและเรื่องไร้สาระ เป็นเพื่อนคู่คิดที่ดีที่สุด",
  },
  {
    id: 6,
    icon: <Sparkles className="w-5 h-5 text-pink-500" />,
    short: "เพราะเธอคือ &quot;เธอ&quot;",
    detail: "ไม่ต้องพยายามเป็นใคร แค่เป็นเธอในแบบที่เป็นอยู่ทุกวันนี้ ก็น่ารักที่สุดในสายตาเค้าแล้ว 💖",
  },
];

export default function ReasonsList() {
  const [openedIds, setOpenedIds] = useState<number[]>([1]);

  const toggleReason = (id: number) => {
    setOpenedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Reasons Why You Are Special</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          เหตุผลที่เค้าตกหลุมรักเธอซ้ำๆ 💕
        </h3>
        <p className="text-rose-900/70 text-sm md:text-base">
          (ลองกดคลิกที่การ์ดแต่ละใบเพื่ออ่านความในใจนะ)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reasons.map((reason) => {
          const isOpen = openedIds.includes(reason.id);
          return (
            <div
              key={reason.id}
              onClick={() => toggleReason(reason.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                isOpen
                  ? "bg-white/95 border-rose-300 shadow-md scale-[1.02]"
                  : "bg-white/60 hover:bg-white/80 border-rose-100 hover:border-rose-200"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100/60 flex items-center justify-center">
                    {reason.icon}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-base">
                    {reason.short}
                  </h4>
                </div>
                <span className="text-xs text-rose-400 font-medium">
                  {isOpen ? "ย่อเก็บ ▲" : "เปิดอ่าน ▼"}
                </span>
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-rose-50 text-sm text-slate-600 font-light leading-relaxed animate-fade-in">
                  {reason.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
