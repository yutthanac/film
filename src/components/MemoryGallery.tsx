"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Camera, Calendar, MapPin } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  caption: string;
  rotation: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "ทริปแรกของเรา 🏖️",
    date: "14 กุมภาพันธ์",
    location: "ทะเลหัวหิน",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&auto=format&fit=crop&q=80",
    caption: "วันนั้นลมแรงมาก แต่รอยยิ้มเธอน่ารักที่สุดเลย",
    rotation: "-rotate-2",
  },
  {
    id: 2,
    title: "คาเฟ่วันอาทิตย์ ☕",
    date: "28 เมษายน",
    location: "Ari, Bangkok",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
    caption: "กินเค้กหมดก่อนถ่ายรูป แย่งเค้กกันกินอย่างมีความสุข",
    rotation: "rotate-2",
  },
  {
    id: 3,
    title: "ดูพระอาทิตย์ตกด้วยกัน 🌅",
    date: "12 สิงหาคม",
    location: "จุดชมวิวบนเขา",
    image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&auto=format&fit=crop&q=80",
    caption: "ท้องฟ้าสวยมาก แต่คนที่ยืนข้างๆ สวยกว่าท้องฟ้าเยอะเลย",
    rotation: "-rotate-1",
  },
  {
    id: 4,
    title: "วันธรรมดาที่ไม่ธรรมดา 🍜",
    date: "ทุกๆ วันที่มีเธอ",
    location: "ร้านโปรดข้างทาง",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80",
    caption: "แค่ได้นั่งคุยเรื่องไร้สาระด้วยกัน ก็เป็นช่วงเวลาที่ดีที่สุดแล้ว",
    rotation: "rotate-3",
  },
];

export default function MemoryGallery() {
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-normal text-slate-800 mb-3">
          ชิวาวาาาาาาาาาาา
        </h3>
        <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base">
          ทุกช่วงเวลาที่ได้อยู่ด้วยกัน คือของขวัญที่ดีที่สุดของเค้าเลยนะ
        </p>
      </div>

      {/* Polaroid Grid with Neumorphic frames */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {memories.map((memory) => {
          const isLiked = likedIds.includes(memory.id);
          return (
            <div
              key={memory.id}
              className={`neu-card p-4 pb-6 transition-all duration-300 transform hover:-translate-y-2 ${memory.rotation} flex flex-col justify-between`}
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 neu-inset">
                <Image
                  src={memory.image}
                  alt={memory.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <button
                  onClick={() => toggleLike(memory.id)}
                  className="absolute top-2.5 right-2.5 p-2 neu-pill bg-[#eef2f6]/90 transition-transform active:scale-90"
                  aria-label="Like memory"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isLiked ? "fill-rose-500 text-rose-500" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Caption details */}
              <div className="px-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {memory.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {memory.location}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-800 text-base mb-1">
                  {memory.title}
                </h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  &quot;{memory.caption}&quot;
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
