'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CrashTestAnimation() {
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* DEFS for filters and gradients */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <linearGradient id="luminous" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A24D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9A24D" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* PHASE 1: THE CORE SILHOUETTE */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Stylized Human Silhouette */}
          <path
            d="M200 120 C225 120 245 140 245 165 C245 190 225 210 200 210 C175 210 155 190 155 165 C155 140 175 120 200 120 Z M140 280 C140 240 160 220 200 220 C240 220 260 240 260 280"
            stroke="#1A1C2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.15"
          />

          {/* Innate Potential - Luminous Geometric Lines */}
          <motion.circle
            cx="200"
            cy="165"
            r="65"
            stroke="url(#luminous)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="200"
            cy="165"
            r="85"
            stroke="#C9A24D"
            strokeWidth="0.5"
            opacity="0.1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* PHASE 2: ADAPTATIONS / FRAGMENTS */}
        <motion.g>
          {/* Fragmented Lines appearing progressively */}
          <motion.path
            d="M130 140 L160 110 M240 220 L270 250 M120 200 L150 210 M250 130 L280 120"
            stroke="#1A1C2E"
            strokeWidth="1"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0.4, 0.4, 0],
              pathLength: [0, 0, 1, 1, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              times: [0, 0.2, 0.4, 0.8, 1],
              ease: "easeInOut" 
            }}
          />
          
          {/* Blurred overlay shapes */}
          <motion.path
            d="M180 140 Q220 120 240 180"
            stroke="#5B4B8A"
            strokeWidth="4"
            filter="url(#blur)"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0.2, 0.2, 0],
              x: [0, 0, 5, 5, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              times: [0, 0.2, 0.5, 0.8, 1],
              ease: "easeInOut" 
            }}
          />
        </motion.g>

        {/* PHASE 3: THE SPLIT / GAP */}
        <motion.g>
          {/* Central Vertical Line (The Gap) */}
          <motion.line
            x1="200"
            y1="80"
            x2="200"
            y2="320"
            stroke="#C9A24D"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0, 0.6, 0.6, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              times: [0, 0.5, 0.6, 0.7, 0.9, 1]
            }}
          />

          {/* Right side fragmentation reveal */}
          <motion.rect
            x="200"
            y="80"
            width="120"
            height="240"
            fill="white"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0, 0.05, 0.05, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              times: [0, 0.5, 0.6, 0.7, 0.9, 1]
            }}
          />
          
          {/* Subtle angular fragments on the right during phase 3 */}
          <motion.path
            d="M210 130 L230 120 L225 150 Z M260 180 L280 170 L270 200 Z"
            fill="#1A1C2E"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0, 0.1, 0.1, 0],
              x: [0, 0, 0, 5, 5, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              times: [0, 0.5, 0.6, 0.7, 0.9, 1]
            }}
          />
        </motion.g>

        {/* RE-ALIGNMENT HINT (Luminous spark at the end) */}
        <motion.circle
          cx="200"
          cy="165"
          r="2"
          fill="#C9A24D"
          filter="url(#glow)"
          opacity="0"
          animate={{ 
            opacity: [0, 0, 0, 0, 1, 0],
            scale: [0.5, 0.5, 0.5, 0.5, 2, 0.5]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            times: [0, 0.8, 0.85, 0.9, 0.95, 1]
          }}
        />
      </svg>
    </div>
  );
}
