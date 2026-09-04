"use client";

import React from "react";
import { X, Heart, MailOpen, Sparkles } from "lucide-react";

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterModal({ isOpen, onClose }: LetterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div className="relative max-w-lg w-full neu-card p-6 md:p-8 overflow-hidden transform transition-all animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 neu-btn rounded-full text-slate-400 hover:text-rose-500"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Envelope stamp / header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2.5 neu-pill text-rose-500">
            <MailOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Personal Letter
            </div>
            <div className="text-sm font-medium text-slate-700">
              ถึง: คนพิเศษที่สุดในโลก 💌
            </div>
          </div>
        </div>

        {/* Letter Paper Body */}
        <div className="neu-inset rounded-2xl p-6 relative font-sans leading-relaxed text-slate-700 text-sm md:text-base space-y-4">
          <p className="font-semibold text-rose-600 text-lg">
            สุขสันต์วันเกิดนะที่รัก 🎂🤍
          </p>
          <p>
            อีกหนึ่งปีที่ได้ฉลองวันเกิดด้วยกัน อยากบอกว่าเค้าดีใจและรู้สึกโชคดีมากๆ 
            ที่มีเธออยู่ข้างๆ คอยจับมือกันในทุกๆ วัน
          </p>
          <p>
            ขอให้ปีนี้ของเธอเต็มไปด้วยสิ่งดีๆ มีรอยยิ้มเยอะๆ อย่าเครียดกับเรื่องงานหรือเรื่องรอบตัวมากเกินไปนะ 
            ถ้าวันไหนเหนื่อยหรือท้อ หันมาจะเจอเค้าคอยกอด คอยซัพพอร์ต และเป็นกำลังใจให้เสมอ
          </p>
          <p>
            สัญญาว่าจะเป็นแฟนที่น่ารัก จะดูแลเธอให้ดีที่สุดในทุกๆ วัน 
            รักเธอมากๆ เลยนะ อยู่เป็นความสุขของกันและกันแบบนี้ไปนานๆ เลยนะคะ 🌷✨
          </p>
          <div className="pt-4 border-t border-slate-300/40 flex items-center justify-between">
            <div className="flex items-center gap-1 text-rose-500 text-xs font-medium">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>รักเธอที่สุดในโลก</span>
            </div>
            <div className="font-script text-xl text-rose-500">
              With all my love ~
            </div>
          </div>
        </div>

        {/* Bottom footer button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 neu-accent-btn text-white text-sm font-medium rounded-2xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>พับเก็บไว้ในใจแล้ว ❤️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
