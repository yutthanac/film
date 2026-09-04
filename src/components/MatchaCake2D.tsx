"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MatchaCake2DProps {
  isLit: boolean;
  onCandleClick: () => void;
}

export default function MatchaCake2D({ isLit, onCandleClick }: MatchaCake2DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none cursor-pointer py-4"
      onClick={onCandleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background soft glow */}
      <div
        className={`absolute w-80 h-80 rounded-full transition-all duration-700 blur-3xl pointer-events-none ${
          isLit
            ? "bg-amber-300/40 scale-110 opacity-100"
            : "bg-emerald-100/30 scale-90 opacity-40"
        }`}
      />

      {/* SVG Canvas Illustration of Premium Matcha Cake with 22 Birthday Candles */}
      <motion.div
        animate={{
          y: isHovered ? -6 : [0, -4, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.25 }
            : { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 filter drop-shadow-xl"
      >
        <svg
          viewBox="0 0 340 330"
          className="w-[290px] sm:w-[350px] h-auto overflow-visible"
        >
          <defs>
            {/* Gradients */}
            {/* Cake Plate Gold / Ceramic */}
            <linearGradient id="plateTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="plateRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="plateStandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Cake Tier Gradients (Matcha Green Palette) */}
            {/* Bottom Tier */}
            <linearGradient id="matchaDarkTier" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b5e28" />
              <stop offset="35%" stopColor="#53823c" />
              <stop offset="70%" stopColor="#679c52" />
              <stop offset="100%" stopColor="#335222" />
            </linearGradient>
            {/* Top Tier */}
            <linearGradient id="matchaTopTier" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#436b2f" />
              <stop offset="30%" stopColor="#629948" />
              <stop offset="70%" stopColor="#7cb35f" />
              <stop offset="100%" stopColor="#3c5f29" />
            </linearGradient>

            {/* Glaze Dripping (Matcha ganache) */}
            <linearGradient id="matchaGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7cb85e" />
              <stop offset="40%" stopColor="#56893e" />
              <stop offset="100%" stopColor="#3b6228" />
            </linearGradient>

            {/* Cream Fillings */}
            <linearGradient id="vanillaCream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>

            {/* Number 22 Candle Metallic Golden Candle Gradients */}
            <linearGradient id="goldCandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id="goldCandleBevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.7" />
            </linearGradient>

            {/* Candle Flame Multi-Glow */}
            <radialGradient id="flameInner" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>
            <radialGradient id="flameHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.85)" />
              <stop offset="50%" stopColor="rgba(249, 115, 22, 0.4)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </radialGradient>

            {/* Strawberry Fruit */}
            <linearGradient id="strawberryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#9f1239" />
            </linearGradient>

            {/* Blueberry */}
            <radialGradient id="blueberryGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="40%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>

            {/* Chocolate */}
            <linearGradient id="chocoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5c3826" />
              <stop offset="100%" stopColor="#2b1810" />
            </linearGradient>

            {/* Shadows & Glow */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.18" />
            </filter>
            <filter id="candle3DShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#78350f" floodOpacity="0.4" />
            </filter>
            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ================= 1. PEDESTAL / STAND ================= */}
          {/* Floor Shadow */}
          <ellipse cx="170" cy="308" rx="105" ry="12" fill="#cbd5e1" opacity="0.6" />

          {/* Stand Base */}
          <path
            d="M 130 295 Q 170 302 210 295 L 202 304 Q 170 310 138 304 Z"
            fill="url(#plateStandGrad)"
            filter="url(#softShadow)"
          />
          {/* Stand Stem */}
          <path
            d="M 158 275 L 182 275 L 176 296 L 164 296 Z"
            fill="url(#plateStandGrad)"
          />

          {/* Stand Top Plate Rim */}
          <ellipse cx="170" cy="275" rx="122" ry="20" fill="url(#plateRimGrad)" />
          {/* White Porcelain Plate Surface */}
          <ellipse cx="170" cy="272" rx="116" ry="17" fill="url(#plateTopGrad)" />

          {/* ================= 2. BOTTOM TIER (CAKE BASE) ================= */}
          <g filter="url(#softShadow)">
            <path
              d="M 75 220 
                 C 75 242, 265 242, 265 220 
                 L 265 264 
                 C 265 284, 75 284, 75 264 
                 Z"
              fill="url(#matchaDarkTier)"
            />

            {/* Whipped Vanilla Cream Middle Layer in Bottom Tier */}
            <path
              d="M 75 242 
                 C 105 252, 235 252, 265 242 
                 L 265 248 
                 C 235 258, 105 258, 75 248 
                 Z"
              fill="url(#vanillaCream)"
              opacity="0.92"
            />

            {/* Bottom Tier Top Surface */}
            <ellipse cx="170" cy="220" rx="95" ry="19" fill="#5c8d45" />
          </g>

          {/* Bottom Cream Pearls Rim */}
          <g fill="#ffffff" opacity="0.96">
            {[82, 100, 122, 145, 170, 195, 218, 240, 258].map((cx, i) => {
              const cy = 221 + Math.sin((i / 8) * Math.PI) * 17;
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={cy}
                  rx="7"
                  ry="5.5"
                  fill="url(#vanillaCream)"
                  stroke="#e2e8f0"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>

          {/* ================= 3. TOP TIER ================= */}
          <g filter="url(#softShadow)">
            {/* Top Tier Cake Body */}
            <path
              d="M 102 162 
                 C 102 181, 238 181, 238 162 
                 L 238 202 
                 C 238 221, 102 221, 102 202 
                 Z"
              fill="url(#matchaTopTier)"
            />

            {/* White Cream Layer in Top Tier */}
            <path
              d="M 102 181 
                 C 125 190, 215 190, 238 181 
                 L 238 186 
                 C 215 195, 125 195, 102 186 
                 Z"
              fill="url(#vanillaCream)"
              opacity="0.9"
            />

            {/* Top Tier Surface (Glazed Matcha) */}
            <ellipse cx="170" cy="162" rx="68" ry="15" fill="url(#matchaGlaze)" />

            {/* Matcha Glaze Dripping over edges */}
            <path
              d="M 102 163
                 Q 106 178 111 176
                 Q 117 188 123 172
                 Q 132 195 139 175
                 Q 148 182 155 174
                 Q 163 192 170 176
                 Q 178 186 186 173
                 Q 196 193 203 175
                 Q 214 186 220 171
                 Q 229 180 238 163
                 C 238 174, 102 174, 102 163 Z"
              fill="url(#matchaGlaze)"
              opacity="0.96"
            />
          </g>

          {/* ================= 4. LUXURY TOPPINGS ================= */}
          {/* Cream Swirls on Top */}
          <g>
            <path
              d="M 112 163 C 107 155 119 148 125 155 C 129 151 135 158 129 165 Z"
              fill="url(#vanillaCream)"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
            <path
              d="M 213 163 C 208 155 219 148 225 155 C 231 151 235 158 229 165 Z"
              fill="url(#vanillaCream)"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
          </g>

          {/* Fresh Strawberries */}
          <g transform="translate(108, 149) rotate(-14) scale(0.85)">
            <path
              d="M 12 0 C 22 2, 24 16, 12 24 C 0 16, 2 2, 12 0 Z"
              fill="url(#strawberryGrad)"
            />
            <circle cx="8" cy="8" r="0.7" fill="#fef08a" />
            <circle cx="14" cy="9" r="0.7" fill="#fef08a" />
            <circle cx="10" cy="14" r="0.7" fill="#fef08a" />
            <circle cx="13" cy="17" r="0.6" fill="#fef08a" />
            <path d="M 12 1 L 6 -3 L 9 2 L 12 -4 L 15 2 L 18 -3 Z" fill="#22c55e" />
          </g>

          <g transform="translate(208, 148) rotate(14) scale(0.85)">
            <path
              d="M 12 0 C 22 2, 24 16, 12 24 C 0 16, 2 2, 12 0 Z"
              fill="url(#strawberryGrad)"
            />
            <circle cx="8" cy="8" r="0.7" fill="#fef08a" />
            <circle cx="14" cy="9" r="0.7" fill="#fef08a" />
            <circle cx="10" cy="14" r="0.7" fill="#fef08a" />
            <path d="M 12 1 L 6 -3 L 9 2 L 12 -4 L 15 2 L 18 -3 Z" fill="#22c55e" />
          </g>

          {/* Blueberries & Golden Beads */}
          <ellipse cx="132" cy="166" rx="5" ry="4.5" fill="url(#blueberryGrad)" />
          <circle cx="131" cy="165" r="1.2" fill="#c7d2fe" opacity="0.6" />

          <ellipse cx="206" cy="166" rx="5.5" ry="5" fill="url(#blueberryGrad)" />
          <circle cx="205" cy="165" r="1.3" fill="#c7d2fe" opacity="0.6" />

          {/* Chocolate sticks */}
          <path
            d="M 122 153 L 150 144 L 151 148 L 123 157 Z"
            fill="url(#chocoGrad)"
            rx="2"
          />
          <path
            d="M 188 144 L 216 153 L 215 157 L 187 148 Z"
            fill="url(#chocoGrad)"
            rx="2"
          />

          {/* Gold Sparkle Beads */}
          <circle cx="140" cy="167" r="2.5" fill="#fbbf24" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="198" cy="167" r="2.5" fill="#fbbf24" stroke="#fef08a" strokeWidth="0.5" />

          {/* ================= 5. NUMBER "22" GOLDEN CANDLES ================= */}
          {/* Definition of Single Digit "2" Candle (Width: 32, Height: 54) */}
          <g id="number-candles-group" filter="url(#candle3DShadow)">
            {/* Candle Pins into the Cake */}
            <rect x="145" y="152" width="4" height="15" rx="1" fill="#b45309" />
            <rect x="189" y="152" width="4" height="15" rx="1" fill="#b45309" />

            {/* --- DIGIT 2 (LEFT) --- */}
            <g transform="translate(132, 98)">
              {/* Backing bevel shadow */}
              <path
                d="M 4 14 
                   C 4 4, 28 4, 28 14 
                   C 28 22, 18 29, 6 43 
                   L 28 43 
                   L 28 50 
                   L 2 50 
                   L 2 43 
                   C 14 28, 22 21, 22 15 
                   C 22 10, 10 10, 10 15 
                   Z"
                fill="#78350f"
                transform="translate(1, 2)"
              />
              {/* Main Golden Candle Body */}
              <path
                d="M 4 14 
                   C 4 4, 28 4, 28 14 
                   C 28 22, 18 29, 6 43 
                   L 28 43 
                   L 28 50 
                   L 2 50 
                   L 2 43 
                   C 14 28, 22 21, 22 15 
                   C 22 10, 10 10, 10 15 
                   Z"
                fill="url(#goldCandleGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* 3D Highlight sheen */}
              <path
                d="M 6 13 
                   C 6 6, 26 6, 26 13 
                   C 26 15, 25 18, 23 20 
                   C 21 12, 9 11, 8 16 
                   Z"
                fill="#ffffff"
                opacity="0.65"
              />
              <rect x="4" y="46" width="22" height="2" rx="1" fill="#ffffff" opacity="0.6" />

              {/* Candle Wick on Left '2' */}
              <line
                x1="15"
                y1="4"
                x2="15"
                y2="-7"
                stroke="#334155"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>

            {/* --- DIGIT 2 (RIGHT) --- */}
            <g transform="translate(176, 98)">
              {/* Backing bevel shadow */}
              <path
                d="M 4 14 
                   C 4 4, 28 4, 28 14 
                   C 28 22, 18 29, 6 43 
                   L 28 43 
                   L 28 50 
                   L 2 50 
                   L 2 43 
                   C 14 28, 22 21, 22 15 
                   C 22 10, 10 10, 10 15 
                   Z"
                fill="#78350f"
                transform="translate(1, 2)"
              />
              {/* Main Golden Candle Body */}
              <path
                d="M 4 14 
                   C 4 4, 28 4, 28 14 
                   C 28 22, 18 29, 6 43 
                   L 28 43 
                   L 28 50 
                   L 2 50 
                   L 2 43 
                   C 14 28, 22 21, 22 15 
                   C 22 10, 10 10, 10 15 
                   Z"
                fill="url(#goldCandleGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* 3D Highlight sheen */}
              <path
                d="M 6 13 
                   C 6 6, 26 6, 26 13 
                   C 26 15, 25 18, 23 20 
                   C 21 12, 9 11, 8 16 
                   Z"
                fill="#ffffff"
                opacity="0.65"
              />
              <rect x="4" y="46" width="22" height="2" rx="1" fill="#ffffff" opacity="0.6" />

              {/* Candle Wick on Right '2' */}
              <line
                x1="15"
                y1="4"
                x2="15"
                y2="-7"
                stroke="#334155"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          </g>

          {/* ================= 6. FLAMES ON TOP OF BOTH DIGITS ================= */}
          {isLit ? (
            <g id="both-flames">
              {/* --- LEFT FLAME (at x=147, y=91) --- */}
              {/* Outer Glow */}
              <circle
                cx="147"
                cy="75"
                r="25"
                fill="url(#flameHalo)"
                className="animate-pulse"
              />
              <motion.g
                animate={{
                  scaleX: [1, 1.15, 0.9, 1.05, 1],
                  scaleY: [1, 0.93, 1.12, 0.95, 1],
                  rotate: [-3, 4, -2, 2, -3],
                }}
                transition={{
                  duration: 1.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ originX: "147px", originY: "91px" }}
              >
                {/* Outer Flame */}
                <path
                  d="M 147 62 
                     C 141 71, 138 78, 141 87 
                     C 143 92, 151 92, 153 87 
                     C 156 78, 153 71, 147 62 Z"
                  fill="url(#flameInner)"
                  filter="url(#flameGlow)"
                />
                {/* White Hot Core */}
                <path
                  d="M 147 71 
                     C 144 76, 142 81, 144 87 
                     C 145 89, 149 89, 150 87 
                     C 152 81, 150 76, 147 71 Z"
                  fill="#ffffff"
                  opacity="0.92"
                />
              </motion.g>

              {/* Sparkle near Left Flame */}
              <motion.g
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  d="M 132 68 Q 135 71 138 71 Q 135 71 132 74 Q 129 71 126 71 Q 129 71 132 68 Z"
                  fill="#fde047"
                />
              </motion.g>

              {/* --- RIGHT FLAME (at x=191, y=91) --- */}
              {/* Outer Glow */}
              <circle
                cx="191"
                cy="75"
                r="25"
                fill="url(#flameHalo)"
                className="animate-pulse"
              />
              <motion.g
                animate={{
                  scaleX: [1, 0.88, 1.14, 0.96, 1],
                  scaleY: [1, 1.1, 0.94, 1.06, 1],
                  rotate: [2, -3, 3, -2, 2],
                }}
                transition={{
                  duration: 1.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                style={{ originX: "191px", originY: "91px" }}
              >
                {/* Outer Flame */}
                <path
                  d="M 191 62 
                     C 185 71, 182 78, 185 87 
                     C 187 92, 195 92, 197 87 
                     C 200 78, 197 71, 191 62 Z"
                  fill="url(#flameInner)"
                  filter="url(#flameGlow)"
                />
                {/* White Hot Core */}
                <path
                  d="M 191 71 
                     C 188 76, 186 81, 188 87 
                     C 189 89, 193 89, 194 87 
                     C 196 81, 194 76, 191 71 Z"
                  fill="#ffffff"
                  opacity="0.92"
                />
              </motion.g>

              {/* Sparkle near Right Flame */}
              <motion.g
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
              >
                <path
                  d="M 207 66 Q 210 69 213 69 Q 210 69 207 72 Q 204 69 201 69 Q 204 69 207 66 Z"
                  fill="#fde047"
                />
              </motion.g>
            </g>
          ) : (
            /* Soft Smoke Wisps from Both Wicks when blown */
            <g id="both-smoke" opacity="0.65">
              {/* Left smoke */}
              <motion.path
                initial={{ opacity: 0.8, y: 0 }}
                animate={{
                  opacity: [0.7, 0.2, 0],
                  y: -28,
                  x: [0, 5, -3, 2],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                d="M 147 88 Q 143 72 151 60 T 145 40"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Right smoke */}
              <motion.path
                initial={{ opacity: 0.8, y: 0 }}
                animate={{
                  opacity: [0.7, 0.2, 0],
                  y: -28,
                  x: [0, -4, 4, -2],
                }}
                transition={{ duration: 2.4, repeat: Infinity, delay: 0.25, ease: "easeOut" }}
                d="M 191 88 Q 196 72 188 60 T 194 40"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}
