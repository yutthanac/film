"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PhotoGallery, GalleryPhoto } from "@/components/ui/gallery";
import { Compass, Calendar, Sparkles, ChevronDown } from "lucide-react";

interface StoryChapter {
  id: number;
  chapter: string;
  title: string;
  date: string;
  location: string;
  quote: string;
  image: string;
  iso: string;
  shutter: string;
}

const chapters: StoryChapter[] = [
  {
    id: 1,
    chapter: "CHAPTER 01",
    title: "The Beginning",
    date: "จุดเริ่มต้นความทรงจำ",
    location: "Where Our Story Began",
    quote: "รอยยิ้มแรกที่ทำให้ทุกวันธรรมดาหลังจากนั้น ไม่เหมือนเดิมอีกต่อไป",
    image: "/images/LINE_ALBUM_251067_260916_1.jpg",
    iso: "ISO 200",
    shutter: "1/500s • 35mm",
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    title: "Sunlight & Zoo",
    date: "ทริปสวนสัตว์วันแดดอุ่น",
    location: "Khao Kheow Open Zoo",
    quote: "แววตาตอนตื่นเต้นกับสัตว์ตัวจิ๋ว น่ารักกว่าทุกสิ่งที่เคยเห็นทั้งวัน",
    image: "/images/LINE_ALBUM_สวนสัตว์_260916_1.jpg",
    iso: "ISO 400",
    shutter: "1/250s • 50mm",
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    title: "Quiet Afternoon",
    date: "บ่ายวันธรรมดาที่แสนพิเศษ",
    location: "Our Favorite Cozy Corner",
    quote: "ไม่ต้องไปที่ไหนไกล แค่นั่งมองตากินขนมด้วยกัน ก็เป็นที่ที่ชอบที่สุดแล้ว",
    image: "/images/LINE_ALBUM_26268_260916_1.jpg",
    iso: "ISO 160",
    shutter: "1/125s • 28mm",
  },
  {
    id: 4,
    chapter: "CHAPTER 04",
    title: "Always With You",
    date: "วันนี้และตลอดไป",
    location: "Everywhere Beside You",
    quote: "ขอบคุณที่เกิดมาเป็นความสบายใจและรอยยิ้มให้กัน สุขสันต์วันเกิดนะคะ",
    image: "/images/LINE_ALBUM_251067_260916_2.jpg",
    iso: "ISO 100",
    shutter: "1/1000s • 85mm",
  },
];

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    order: 0,
    x: "-300px",
    y: "12px",
    zIndex: 50,
    direction: "left",
    src: "/images/LINE_ALBUM_251067_260916_1.jpg",
    alt: "Chapter 01: The Beginning",
  },
  {
    id: 2,
    order: 1,
    x: "-150px",
    y: "28px",
    zIndex: 40,
    direction: "left",
    src: "/images/LINE_ALBUM_สวนสัตว์_260916_1.jpg",
    alt: "Chapter 02: Zoo Day",
  },
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "6px",
    zIndex: 30,
    direction: "right",
    src: "/images/LINE_ALBUM_26268_260916_1.jpg",
    alt: "Chapter 03: Quiet Afternoon",
  },
  {
    id: 4,
    order: 3,
    x: "150px",
    y: "20px",
    zIndex: 20,
    direction: "right",
    src: "/images/LINE_ALBUM_251067_260916_2.jpg",
    alt: "Chapter 04: Always Beside You",
  },
  {
    id: 5,
    order: 4,
    x: "300px",
    y: "38px",
    zIndex: 10,
    direction: "left",
    src: "/images/LINE_ALBUM_สวนสัตว์_260916_1.jpg",
    alt: "Memory Recap",
  },
];

export default function ScrollStoryGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active chapter based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map 0 -> 1 into 4 chapters
      const chapterIndex = Math.min(
        Math.floor(latest * chapters.length),
        chapters.length - 1
      );
      setActiveChapterIndex(chapterIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Transform hooks for morphing visual effects
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [28, 40, 24, 36]);
  const filmVignette = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.15, 0.05, 0.15, 0.05, 0.2]
  );

  const activeChapter = chapters[activeChapterIndex] || chapters[0];

  const handleJumpToChapter = (idx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll =
      containerTop + (idx / chapters.length) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section className="relative w-full text-slate-800">
      {/* SECTION INTRO HEADER */}
      <div className="pt-20 pb-10 px-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-[11px] font-mono tracking-widest text-slate-600 mb-4">
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>SCROLL-DRIVEN VISUAL JOURNAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight leading-tight">
          เรื่องราวในทุกการเติบโต
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
          เลื่อนลงเพื่อเปิดดูบันทึกภาพถ่ายและความรู้สึกในแต่ละช่วงเวลาที่เรามีร่วมกัน
        </p>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>

      {/* 360vh STICKY SCROLL STORYTELLING TRACK */}
      <div ref={containerRef} className="relative h-[340vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8">
          
          {/* Subtle Film Grain Backdrop */}
          <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

          {/* Film Edge Spockets Overlay (Editorial Detail) */}
          <div className="absolute top-4 left-6 right-6 hidden md:flex items-center justify-between text-[10px] font-mono text-slate-400/80 select-none pointer-events-none">
            <span>FILM ROLL 2026 • 35MM EXPOSURE</span>
            <span className="tracking-widest">KODAK PORTRA 400 EMULSION</span>
            <span>{activeChapter.iso}</span>
          </div>

          {/* MAIN STAGE: Sticky Centered Morphing Photo & Editorial Note */}
          <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* PHOTO STAGE (Morphing Image Container) */}
            <div className="lg:col-span-7 flex justify-center">
              <motion.div
                style={{
                  scale: imageScale,
                  borderRadius: frameRadius,
                }}
                className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[4/5] overflow-hidden film-border bg-slate-900 shadow-2xl transition-shadow duration-500"
              >
                {/* Crossfading Chapter Images */}
                {chapters.map((chap, idx) => {
                  const isCurrent = idx === activeChapterIndex;
                  return (
                    <motion.div
                      key={chap.id}
                      initial={false}
                      animate={{
                        opacity: isCurrent ? 1 : 0,
                        scale: isCurrent ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={chap.image}
                        alt={chap.title}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 768px) 100vw, 460px"
                        className="object-cover"
                      />
                    </motion.div>
                  );
                })}

                {/* Dark Film Border Vignette */}
                <motion.div
                  style={{ opacity: filmVignette }}
                  className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none"
                />

                {/* Film Stamp Tag at corner of image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-[10px] font-mono text-white/90">
                  <span>{activeChapter.chapter}</span>
                  <span className="opacity-75">{activeChapter.shutter}</span>
                </div>
              </motion.div>
            </div>

            {/* EDITORIAL NARRATIVE PANEL */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="p-6 sm:p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-white/80 shadow-lg"
                >
                  {/* Chapter Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="film-tag text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md font-semibold">
                      {activeChapter.chapter}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{activeChapter.id} / 0{chapters.length}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <h3 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight mb-2">
                    {activeChapter.title}
                  </h3>

                  <div className="flex flex-col gap-1.5 text-xs text-slate-500 mb-5 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {activeChapter.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-600" />
                      {activeChapter.location}
                    </span>
                  </div>

                  {/* Sincere Quote */}
                  <div className="relative pl-4 border-l-2 border-amber-500/60 py-1">
                    <p className="text-sm sm:text-base text-slate-700 font-light leading-relaxed italic">
                      &ldquo;{activeChapter.quote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CHAPTER NAVIGATOR PILLS */}
              <div className="mt-5 flex items-center gap-2 justify-start">
                {chapters.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => handleJumpToChapter(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeChapterIndex
                        ? "w-8 bg-slate-900"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to chapter ${i + 1}`}
                  />
                ))}
                <span className="ml-2 text-[11px] font-mono text-slate-400">
                  {Math.round((activeChapterIndex + 1) * 25)}%
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Guide Bar */}
          <div className="absolute bottom-4 left-6 right-6 hidden md:flex items-center justify-between text-[10px] font-mono text-slate-400/80 select-none pointer-events-none">
            <span>MEMORIES ARCHIVE</span>
            <span>KEEP SCROLLING FOR INTERACTIVE DECK</span>
            <span>35MM FORMAT</span>
          </div>

        </div>
      </div>

      {/* FINALE: UNROLL INTO INTERACTIVE PHOTO GALLERY */}
      <div className="relative z-20 pt-16 pb-28 px-4 bg-gradient-to-b from-transparent via-[#eef2f6]/80 to-[#eef2f6]">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <span className="film-tag text-slate-500 block mb-1">
            INTERACTIVE PHOTO DECK
          </span>
          <h3 className="text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            หยิบรูปขึ้นมาดูได้เลยนะ
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
            ลองคลิกค้างแล้วลาก (Drag & Toss) ใบไหนที่ชอบได้อิสระเลย
          </p>
        </div>

        {/* Integrated PhotoGallery Deck */}
        <PhotoGallery
          animationDelay={0.2}
          photos={galleryPhotos}
          title="Captured"
          highlightTitle="Moments"
          subtitle="ARCHIVE OF US"
          actionText=""
          onActionClick={() => {
            const el = document.getElementById("secret-section") || document.getElementById("ribbon-gift-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </section>
  );
}
