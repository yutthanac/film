"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PhotoGallery, GalleryPhoto } from "@/components/ui/gallery";
import DancingLetters from "@/components/DancingLetters";
import { Compass, Calendar, Sparkles, ChevronDown, Mail, Cake } from "lucide-react";

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
    title: "Cat cafe",
    date: "คาเฟ่แมวตัวป่วน",
    location: "Cat cafe",
    quote: "ไว้เดี๋ยวพาไปหาน้อน ๆ อีกกันนนน",
    image: "/images/LINE_ALBUM_251067_260916_1.jpg",
    iso: "ISO 200",
    shutter: "1/500s • 35mm",
  },
  {
    id: 2,
    chapter: "CHAPTER 02",
    title: "สวนสัตว์โคราช",
    date: "อิอิอิอิอิอิอิอิ",
    location: "Korat Zoo",
    quote: "อยากไปอีกมั้ยมีตังก่อน 555555555555555555555555555555",
    image: "/images/LINE_ALBUM_สวนสัตว์_260916_1.jpg",
    iso: "ISO 400",
    shutter: "1/250s • 50mm",
  },
  {
    id: 3,
    chapter: "CHAPTER 03",
    title: "ยิ้มเหมือนหมาชิวาว่าละมาว่าพี่",
    date: "บุ่งตาหลัว",
    location: "Bung Talua",
    quote: "ระบายฉวยจังเยยยย",
    image: "/images/LINE_ALBUM_26268_260916_1.jpg",
    iso: "ISO 160",
    shutter: "1/125s • 28mm",
  },
  {
    id: 4,
    chapter: "CHAPTER 04",
    title: "คาเฟ่แมวอีกละซ้ำๆ 55555",
    date: "คาเฟ่แมว",
    location: "Cat Cafe",
    quote: "แลบลิ้นเพิ่มดาเมจ",
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

interface ScrollHeroStoryProps {
  onOpenLetter: () => void;
  onScrollToCake: () => void;
}

export default function ScrollHeroStory({ onOpenLetter, onScrollToCake }: ScrollHeroStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active chapter
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.28) {
        setActiveChapterIndex(0);
      } else if (latest < 0.42) {
        setActiveChapterIndex(0);
      } else if (latest < 0.56) {
        setActiveChapterIndex(1);
      } else if (latest < 0.70) {
        setActiveChapterIndex(2);
      } else {
        setActiveChapterIndex(3);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Dynamic Background: Starts dark (#080b12), smoothly transitions to warm light editorial (#eef2f6)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.16, 0.28],
    ["#080b12", "#0f1624", "#eef2f6"]
  );

  // Hero Title Animations: Fades and translates up as user scrolls past hero phase
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 0.5, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -60]);
  const heroPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.14 ? "none" : "auto"));

  // STICKY IMAGE MECHANIC:
  // Starts large in the center, then smoothly scales down and moves to the left corner/side
  const imageX = useTransform(scrollYProgress, (v) => {
    if (v <= 0.14) return 0;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return 0;
    if (v >= 0.28) return -260;
    const progress = (v - 0.14) / 0.14;
    return -260 * progress;
  });

  const imageY = useTransform(scrollYProgress, (v) => {
    const startY = 135;
    if (v <= 0.14) return startY;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    const endY = isMobile ? -110 : 0;
    if (v >= 0.28) return endY;
    const progress = (v - 0.14) / 0.14;
    return startY + (endY - startY) * progress;
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.14, 0.28, 0.55, 0.75], [1.02, 1.0, 0.86, 0.88, 0.85]);
  const imageRotate = useTransform(scrollYProgress, (v) => {
    if (v <= 0.14) return 0;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return 0;
    if (v >= 0.28) return -2;
    return -2 * ((v - 0.14) / 0.14);
  });
  const frameRadius = useTransform(scrollYProgress, [0, 0.28, 0.55, 0.75], ["32px", "26px", "36px", "28px"]);

  // Narrative Panel Animations (Appears on the right side)
  const narrativeOpacity = useTransform(scrollYProgress, [0.20, 0.28], [0, 1]);
  const narrativeX = useTransform(scrollYProgress, [0.20, 0.28], [40, 0]);

  const darkGridOpacity = useTransform(scrollYProgress, [0, 0.20], [0.65, 0]);
  const lightGridOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 0.25]);

  const activeChapter = chapters[activeChapterIndex] || chapters[0];

  const handleScrollToStartStory = () => {
    if (!containerRef.current) return;
    const target = containerRef.current.offsetTop + window.innerHeight * 1.1;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* 420vh SCROLL TRACK */}
      <div ref={containerRef} className="relative h-[420vh]">
        <motion.div
          style={{ backgroundColor: bgColor }}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-200"
        >
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 film-grain opacity-30 pointer-events-none z-0" />

          {/* Dark Grid Background (Hero) */}
          <motion.div
            style={{ opacity: darkGridOpacity }}
            className="absolute inset-0 editorial-grid-dark pointer-events-none z-0"
          />

          {/* Light Grid Background (Story) */}
          <motion.div
            style={{ opacity: lightGridOpacity }}
            className="absolute inset-0 editorial-grid pointer-events-none z-0"
          />

          {/* Top Film Metadata Stamp */}
          <div className="absolute top-4 left-6 right-6 hidden md:flex items-center justify-between text-[11px] font-mono text-slate-400/80 z-20 pointer-events-none select-none">
            <span>ROLL #2026 • 35MM EXPOSURE</span>
            <span className="tracking-widest">KODAK PORTRA 400 FILM EMULSION</span>
            <span>{activeChapter.iso}</span>
          </div>

          {/* HERO PHASE TEXT (Starts above the center image in dark theme) */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
              pointerEvents: heroPointerEvents,
            }}
            className="absolute top-6 sm:top-8 inset-x-0 z-30 flex flex-col items-center text-center px-4"
          >

            <DancingLetters
              text="Happy Birthday to You"
              className="font-script text-rose-400 drop-shadow-md cursor-pointer mb-1"
              letterClassName="text-4xl sm:text-4xl text-rose-400 font-script hover:text-rose-300 transition-colors"
            />

            <h1 className="text-2xl sm:text-4xl font-normal tracking-tight text-white mb-1.5 drop-shadow-md flex flex-wrap items-center justify-center gap-2 py-4">
              <span>สุขสันต์วันเกิด</span>{" "}
              <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent font-medium">
                นุ้งฟิล์มมมม
              </span>
              <span className="inline-block animate-bounce duration-1000 select-none">
                💖
              </span>
            </h1>

            <p className="max-w-md text-xs sm:text-lg text-slate-300 font-normal leading-relaxed mb-3">
              ปีนี้ไม่มีอะไรให้เลย เอาแมวไปเป่าก่อนนะะะะ อะนี่!!
            </p>

            <button
              onClick={handleScrollToStartStory}
              className="mt-3 flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400/90 hover:text-white transition-colors font-mono"
            >
              <span>SCROLL TO UNFOLD STORY</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </motion.div>

          {/* MASTER STICKY CENTER STAGE */}
          <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-center px-4 sm:px-8">
            
            {/* STICKY MORPHING IMAGE: Starts centered, smoothly scales and moves to corner */}
            <motion.div
              suppressHydrationWarning
              style={{
                x: imageX,
                y: imageY,
                scale: imageScale,
                rotateZ: imageRotate,
                borderRadius: frameRadius,
              }}
              className="relative w-[280px] sm:w-[380px] md:w-[440px] aspect-[4/5] shrink-0 overflow-hidden film-border bg-slate-950 shadow-2xl transition-all duration-300"
            >
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
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={chap.image}
                      alt={chap.title}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-cover"
                    />
                  </motion.div>
                );
              })}

              {/* Film Vignette */}
              <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/60 pointer-events-none" />

              {/* Bottom metadata stamp */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/90">
                <span>{activeChapter.chapter}</span>
                <span className="opacity-75">{activeChapter.shutter}</span>
              </div>
            </motion.div>

            {/* EDITORIAL NARRATIVE PANEL (Right Column on Desktop, Bottom on Mobile) */}
            <motion.div
              suppressHydrationWarning
              style={{
                opacity: narrativeOpacity,
                x: narrativeX,
              }}
              className="absolute left-1/2 ml-10 w-full max-w-sm hidden lg:flex flex-col justify-center text-left pointer-events-auto"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="film-tag text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md font-semibold">
                      {activeChapter.chapter}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{activeChapter.id} / 0{chapters.length}
                    </span>
                  </div>

                  <h3 className="text-2xl font-normal text-slate-900 tracking-tight mb-2">
                    {activeChapter.title}
                  </h3>

                  <div className="flex flex-col gap-1 text-xs text-slate-500 mb-4 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {activeChapter.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-600" />
                      {activeChapter.location}
                    </span>
                  </div>

                  <div className="relative pl-3.5 border-l-2 border-amber-500/70 py-0.5">
                    <p className="text-sm text-slate-700 font-light leading-relaxed italic">
                      &ldquo;{activeChapter.quote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicator Dots */}
              <div className="mt-4 flex items-center gap-2 justify-start">
                {chapters.map((c, i) => (
                  <div
                    key={c.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeChapterIndex
                        ? "w-8 bg-slate-900"
                        : "w-2 bg-slate-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-[11px] font-mono text-slate-400">
                  {Math.round((activeChapterIndex + 1) * 25)}%
                </span>
              </div>
            </motion.div>

          </div>

          {/* Bottom Guidance Stamp */}
          <div className="absolute bottom-4 left-6 right-6 hidden md:flex items-center justify-between text-[10px] font-mono text-slate-400/80 z-20 pointer-events-none select-none">
            <span>MEMORIES ARCHIVE</span>
            <span>SCROLL TO EXPLORE INTERACTIVE DECK</span>
            <span>35MM FORMAT</span>
          </div>
        </motion.div>
      </div>

      {/* FINALE: UNROLL INTO INTERACTIVE PHOTO GALLERY */}
      <div className="relative z-20 pt-16 pb-24 px-4 bg-gradient-to-b from-transparent via-[#eef2f6] to-[#eef2f6]">
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
          onActionClick={onScrollToCake}
        />
      </div>
    </div>
  );
}
