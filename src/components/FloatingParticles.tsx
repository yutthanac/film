"use client";

import React, { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

export default function FloatingParticles() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const emojis = ["💖", "✨", "🌸", "🤍", "🎂", "🎈", "🌷", "🧁"];
    const generated: FloatingItem[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 16) + 16,
      duration: Math.floor(Math.random() * 12) + 14,
      delay: Math.random() * 8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-[-50px] opacity-40 select-none transition-transform"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animation: `floatUp ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.45;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-115vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
