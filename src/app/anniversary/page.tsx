"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Heart, RotateCcw } from "lucide-react";

export default function AnniversaryPage() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);
  const [confirmedDate, setConfirmedDate] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Initialize and load any saved date
  useEffect(() => {
    const saved = localStorage.getItem("film_anniversary_segmented");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.day && parsed.month && parsed.year) {
          setDay(parsed.day);
          setMonth(parsed.month);
          setYear(parsed.year);
        }
      } catch {
        // ignore
      }
    }
    const timer = setTimeout(() => {
      setMounted(true);
      setCurrentTime(new Date());
    }, 0);

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Handle auto-focus jumping for Day input
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(val);
    setError(null);
    if (val.length === 2) {
      monthRef.current?.focus();
    }
  };

  // Handle auto-focus jumping for Month input
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(val);
    setError(null);
    if (val.length === 2) {
      yearRef.current?.focus();
    }
  };

  // Handle Year input
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(val);
    setError(null);
  };

  // Handle backspace navigation between fields
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "day" | "month" | "year"
  ) => {
    if (e.key === "Backspace") {
      if (field === "year" && year === "") {
        monthRef.current?.focus();
      } else if (field === "month" && month === "") {
        dayRef.current?.focus();
      }
    } else if (e.key === "Enter") {
      handleCalculate();
    }
  };

  // Validate and trigger calculation
  const handleCalculate = () => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    let y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      setError("กรุณากรอกวัน เดือน และปีให้ครบถ้วน");
      return;
    }

    // Convert Thai Buddhist Era (พ.ศ.) to Common Era (ค.ศ.) if applicable
    if (y > 2400) {
      y -= 543;
    }

    if (m < 1 || m > 12) {
      setError("เดือนต้องอยู่ระหว่าง 01 - 12");
      return;
    }

    // Days in specified month
    const daysInMonth = new Date(y, m, 0).getDate();
    if (d < 1 || d > daysInMonth) {
      setError(`วันที่ของเดือนนี้ต้องอยู่ระหว่าง 01 - ${daysInMonth}`);
      return;
    }

    const startDate = new Date(y, m - 1, d, 0, 0, 0);
    const now = new Date();

    if (startDate.getTime() > now.getTime()) {
      setError("วันที่เริ่มต้นต้องไม่เกินวันปัจจุบัน");
      return;
    }

    setError(null);
    setIsCalculating(true);
    setCalcProgress(0);

    // Simulate charming fake calculation progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 18) + 12;
      if (p >= 100) {
        p = 100;
        setCalcProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setConfirmedDate(startDate);
          setIsCalculating(false);
          setIsCalculated(true);
        }, 300);
      } else {
        setCalcProgress(p);
      }
    }, 120);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "film_anniversary_segmented",
        JSON.stringify({ day, month, year })
      );
    }
  };

  // Secret mock easter egg: Auto-fill and calculate 16 / 11 / 2024 with fake progress
  const handleFillSecretDate = () => {
    const sDay = "16";
    const sMonth = "11";
    const sYear = "2024";
    setDay(sDay);
    setMonth(sMonth);
    setYear(sYear);
    setError(null);

    const startDate = new Date(2024, 10, 16, 0, 0, 0);

    setIsCalculating(true);
    setCalcProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 20) + 15;
      if (p >= 100) {
        p = 100;
        setCalcProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setConfirmedDate(startDate);
          setIsCalculating(false);
          setIsCalculated(true);
        }, 300);
      } else {
        setCalcProgress(p);
      }
    }, 110);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "film_anniversary_segmented",
        JSON.stringify({ day: sDay, month: sMonth, year: sYear })
      );
    }
  };

  const handleReset = () => {
    setIsCalculated(false);
    setTimeout(() => {
      dayRef.current?.focus();
    }, 100);
  };

  // Detailed difference calculation
  const calculateDiff = () => {
    if (!confirmedDate || !currentTime) {
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };
    }

    const start = confirmedDate;
    const end = currentTime;
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.max(
      0,
      Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    );
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const seconds = end.getSeconds();

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      hours,
      minutes,
      seconds,
      totalDays,
    };
  };

  const calculateNextAnniversary = () => {
    if (!confirmedDate || !currentTime) return null;
    let next = new Date(
      currentTime.getFullYear(),
      confirmedDate.getMonth(),
      confirmedDate.getDate()
    );
    if (next.getTime() < currentTime.getTime()) {
      next = new Date(
        currentTime.getFullYear() + 1,
        confirmedDate.getMonth(),
        confirmedDate.getDate()
      );
    }
    const daysLeft = Math.ceil(
      (next.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft;
  };

  const diff = calculateDiff();
  const nextDays = calculateNextAnniversary();

  return (
    <main className="relative min-h-screen py-10 px-4 flex flex-col items-center justify-between text-slate-800 bg-[#eef2f6] overflow-x-hidden selection:bg-amber-100 font-noto">
      {/* Editorial Background Textures */}
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none -z-10" />
      <div className="absolute inset-0 editorial-grid opacity-35 pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-slate-300/40 text-xs font-mono text-slate-500">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-btn hover:text-slate-900 transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับหน้าหลัก</span>
        </Link>
        <span className="hidden sm:inline tracking-widest text-[11px] text-slate-400">
          ARCHIVE #2026 • CHRONICLE
        </span>
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>TIMELINE</span>
        </div>
      </header>

      {/* Center Stage Content */}
      <section className="w-full max-w-3xl mx-auto my-auto py-10 text-center flex flex-col items-center">
        {/* Title Header */}
        <div className="mb-8">
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block mb-2">
            ANNIVERSARY JOURNAL
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight mb-2">
            บันทึกวันครบรอบ
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-light max-w-md mx-auto">
            กรอกวันที่เริ่มต้นเรื่องราว แล้วกดคำนวณเพื่อนับเวลา
          </p>
        </div>

        {/* Segmented Date Input Form (Always Visible) */}
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl neu-card bg-white/75 backdrop-blur-sm border border-white/80 shadow-lg mb-8 flex flex-col items-center">
          <div className="text-xs font-mono text-slate-500 mb-4 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>วันที่เริ่มต้น (วัน / เดือน / ปี ค.ศ. หรือ พ.ศ.):</span>
          </div>

          {/* 3 Segmented Inputs: [ DD ] / [ MM ] / [ YYYY ] */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            {/* Day */}
            <div className="flex flex-col items-center">
              <input
                ref={dayRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={day}
                placeholder="วว"
                onChange={handleDayChange}
                onKeyDown={(e) => handleKeyDown(e, "day")}
                disabled={isCalculated || isCalculating}
                className="w-16 sm:w-20 h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-semibold rounded-2xl neu-inset bg-[#eef2f6] border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60 transition-all"
                aria-label="วัน (Day)"
              />
              <span className="text-[10px] font-mono text-slate-400 mt-1.5 uppercase">วัน</span>
            </div>

            <span className="text-xl text-slate-300 font-mono pb-5">/</span>

            {/* Month */}
            <div className="flex flex-col items-center">
              <input
                ref={monthRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                value={month}
                placeholder="ดด"
                onChange={handleMonthChange}
                onKeyDown={(e) => handleKeyDown(e, "month")}
                disabled={isCalculated || isCalculating}
                className="w-16 sm:w-20 h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-semibold rounded-2xl neu-inset bg-[#eef2f6] border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60 transition-all"
                aria-label="เดือน (Month)"
              />
              <span className="text-[10px] font-mono text-slate-400 mt-1.5 uppercase">เดือน</span>
            </div>

            <span className="text-xl text-slate-300 font-mono pb-5">/</span>

            {/* Year */}
            <div className="flex flex-col items-center">
              <input
                ref={yearRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={year}
                placeholder="ปปปป"
                onChange={handleYearChange}
                onKeyDown={(e) => handleKeyDown(e, "year")}
                disabled={isCalculated || isCalculating}
                className="w-24 sm:w-28 h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-semibold rounded-2xl neu-inset bg-[#eef2f6] border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60 transition-all"
                aria-label="ปี (Year)"
              />
              <span className="text-[10px] font-mono text-slate-400 mt-1.5 uppercase">ปี</span>
            </div>
          </div>

          {/* Validation Error Message */}
          {error && (
            <div className="text-xs text-rose-500 font-medium mb-3 animate-fade-in">
              {error}
            </div>
          )}

          {/* Action Buttons & Fake Progress UI */}
          <div className="flex flex-col items-center gap-3 mt-2 w-full">
            {isCalculating ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xs flex flex-col items-center py-2"
              >
                <div className="flex items-center justify-between w-full text-xs font-mono text-slate-500 mb-1.5 px-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="inline-block w-2 h-2 rounded-full bg-slate-900 animate-ping" />
                    กำลังคำนวณช่วงเวลา...
                  </span>
                  <span className="font-semibold text-slate-800">{calcProgress}%</span>
                </div>
                {/* Progress bar track */}
                <div className="w-full h-3 bg-slate-200/80 neu-inset rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-slate-900 rounded-full transition-all duration-150"
                    style={{ width: `${calcProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  กำลังย้อนความทรงจำ 16 พ.ย. 2024 ถึงปัจจุบัน
                </span>
              </motion.div>
            ) : !isCalculated ? (
              <>
                <button
                  onClick={handleCalculate}
                  className="px-8 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-md"
                >
                  คำนวณ
                </button>

                {/* Secret Mock Easter Egg: Discreet Clue */}
                <button
                  type="button"
                  onClick={handleFillSecretDate}
                  className="mt-1 text-[11px] font-mono text-slate-400/70 hover:text-slate-700 transition-colors underline decoration-dotted underline-offset-4 cursor-pointer"
                  title="เฉลยวันที่ถ้าจำไม่ได้ (16/11/2024)"
                >
                  นึกไม่ออก? กดดูเฉลย
                </button>
              </>
            ) : (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl neu-btn text-xs font-mono text-slate-600 hover:text-slate-900 transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>คำนวณใหม่</span>
              </button>
            )}
          </div>
        </div>

        {/* RESULTS SECTION: Completely hidden until "คำนวณ" is clicked */}
        <AnimatePresence>
          {isCalculated && mounted && (
            <motion.div
              key="anniversary-results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              {/* Big Live Breakdown Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 w-full mb-6">
                <div className="p-4 rounded-2xl neu-card bg-white/85 text-center flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-semibold text-slate-900 font-mono">
                    {diff.years}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 uppercase">ปี</span>
                </div>

                <div className="p-4 rounded-2xl neu-card bg-white/85 text-center flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-semibold text-slate-900 font-mono">
                    {diff.months}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 uppercase">เดือน</span>
                </div>

                <div className="p-4 rounded-2xl neu-card bg-white/85 text-center flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-semibold text-slate-900 font-mono">
                    {diff.days}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 uppercase">วัน</span>
                </div>

                <div className="p-4 rounded-2xl neu-card bg-white/85 text-center flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-semibold text-slate-900 font-mono">
                    {String(diff.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 uppercase">ชั่วโมง</span>
                </div>

                <div className="p-4 rounded-2xl neu-card bg-white/85 text-center flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-semibold text-slate-900 font-mono">
                    {String(diff.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 uppercase">นาที</span>
                </div>

                <div className="p-4 rounded-2xl neu-card bg-white/85 text-center flex flex-col items-center border border-amber-500/20">
                  <span className="text-3xl sm:text-4xl font-semibold text-amber-700 font-mono">
                    {String(diff.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 uppercase">วินาที</span>
                </div>
              </div>

              {/* Total Summary Highlight Card */}
              <div className="p-6 rounded-3xl neu-card bg-white/90 border border-white max-w-xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="text-left">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">
                    TOTAL TIME TOGETHER
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
                    รวมทั้งหมด {diff.totalDays.toLocaleString()} วัน
                  </span>
                </div>

                {nextDays !== null && (
                  <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">
                      NEXT ANNIVERSARY
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-rose-600 flex items-center justify-center sm:justify-end gap-1 font-mono">
                      <span>อีก {nextDays} วัน</span>
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    </span>
                  </div>
                )}
              </div>

              {/* Polaroid Memory Photo Card */}
              <div className="neu-card p-4 rounded-3xl max-w-xs w-full bg-white text-center shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 neu-inset">
                  <Image
                    src="/images/LINE_ALBUM_251067_260916_1.jpg"
                    alt="Memory photo"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-slate-600 font-light italic">
                  &ldquo;รักนะคะ&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-slate-400 pt-8 pb-4">
        <span>Anniversary Chronicle • 2026</span>
      </footer>
    </main>
  );
}
