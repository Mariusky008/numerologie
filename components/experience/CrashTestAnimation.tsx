'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CrashTestAnimation() {
  const duration = 7;

  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center bg-white rounded-[60px] overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mask for the Left Side (Pure) */}
          <mask id="maskLeft">
            <motion.rect
              x="0" y="0" width="200" height="400" fill="white"
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration, repeat: Infinity, times: [0, 0.6, 0.65, 0.9, 1] }}
            />
          </mask>
          
          {/* Mask for the Right Side (Fragmented) */}
          <mask id="maskRight">
            <motion.rect
              x="200" y="0" width="200" height="400" fill="white"
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration, repeat: Infinity, times: [0, 0.6, 0.65, 0.9, 1] }}
            />
          </mask>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- PHASE 1 & 2: THE EVOLVING CHARACTER --- */}
        <g>
          {/* 1. Base Human Shape (The Core) */}
          <motion.path
            d="M200 110 C225 110 245 130 245 155 C245 180 225 200 200 200 C175 200 155 180 155 155 C155 130 175 110 200 110 Z M130 300 C130 250 160 220 200 220 C240 220 270 250 270 300"
            fill="none"
            stroke="#1A1C2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* 2. PURE VERSION (ORIGIN) */}
          <motion.g
            animate={{ 
              opacity: [1, 1, 0.2, 0.2, 1],
              scale: [1, 1, 0.98, 0.98, 1]
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.2, 0.3, 0.8, 1] }}
          >
            {/* Luminous Core Geometry */}
            <motion.circle
              cx="200" cy="155" r="70"
              stroke="#C9A24D" strokeWidth="0.5" strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <circle cx="200" cy="155" r="55" stroke="#C9A24D" strokeWidth="1" opacity="0.3" filter="url(#glow)" />
          </motion.g>

          {/* 3. FRAGMENTED VERSION (TODAY) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [0, 0, 0, 0]
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.3, 0.8, 1] }}
          >
            {/* Angular Shards / Experiences */}
            <motion.path
              d="M140 120 L160 100 M240 110 L260 130 M120 230 L150 210 M250 250 L280 230"
              stroke="#5B4B8A" strokeWidth="2" opacity="0.6"
              animate={{ x: [-2, 2, -2], rotate: [-1, 1, -1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Blurred adaptation zones */}
            <circle cx="240" cy="170" r="20" fill="#1A1C2E" opacity="0.05" />
            <circle cx="160" cy="240" r="15" fill="#1A1C2E" opacity="0.05" />
            
            {/* Jagged silhouette lines */}
            <path d="M155 155 L145 145 M245 155 L255 165" stroke="#1A1C2E" strokeWidth="1" opacity="0.3" />
          </motion.g>
        </g>

        {/* --- PHASE 3: THE SPLIT (REVELATION) --- */}
        <g>
          {/* Split Screen Logic */}
          <g mask="url(#maskLeft)">
            {/* Re-rendering Pure on Left */}
            <circle cx="200" cy="155" r="60" fill="#C9A24D" opacity="0.1" filter="url(#glow)" />
            <path d="M200 110 C225 110 245 130 245 155 C245 180 225 200 200 200 C175 200 155 180 155 155 C155 130 175 110 200 110 Z" stroke="#C9A24D" strokeWidth="2" />
          </g>

          {/* Vertical Fissure Line */}
          <motion.line
            x1="200" y1="80" x2="200" y2="320"
            stroke="#C9A24D" strokeWidth="1.5"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: [0, 0, 1, 1, 0],
              opacity: [0, 0, 1, 1, 0]
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.6, 0.65, 0.9, 1] }}
          />

          {/* Scanning Effect (Light beam) */}
          <motion.rect
            x="198" y="80" width="4" height="240"
            fill="#C9A24D" opacity="0"
            animate={{ 
              opacity: [0, 0, 0.8, 0],
              x: [0, 0, -50, -100]
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.6, 0.7, 0.85] }}
            filter="url(#glow)"
          />
        </g>

        {/* RE-ALIGNMENT DOT (FINAL CLARITY) */}
        <motion.circle
          cx="200" cy="155" r="4"
          fill="#C9A24D"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0, 0, 1, 0],
            scale: [0, 0, 0, 1.5, 0]
          }}
          transition={{ duration, repeat: Infinity, times: [0, 0.85, 0.9, 0.95, 1] }}
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}
