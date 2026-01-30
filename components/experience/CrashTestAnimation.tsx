'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CrashTestAnimation() {
  const duration = 7;

  return (
    <div className="relative w-full max-w-[320px] aspect-square mx-auto flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A24D" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A24D" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* BACKGROUND STRUCTURE */}
        <motion.circle
          cx="200" cy="180" r="130"
          stroke="#1A1C2E" strokeWidth="0.5" opacity="0.03"
        />

        {/* CHARACTER GROUP */}
        <g>
          {/* PHASE 1: PURE ORIGIN */}
          <motion.g
            animate={{ 
              opacity: [1, 1, 0.3, 0.3, 1],
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.2, 0.3, 0.8, 1] }}
          >
            {/* Luminous Geometry */}
            <motion.circle
              cx="200" cy="160" r="70"
              stroke="#C9A24D" strokeWidth="0.5" strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <circle cx="200" cy="160" r="50" stroke="#C9A24D" strokeWidth="1" opacity="0.2" filter="url(#softGlow)" />
          </motion.g>

          {/* BASE SILHOUETTE */}
          <motion.path
            d="M200 110 C220 110 235 125 235 145 C235 165 220 180 200 180 C180 180 165 165 165 145 C165 125 180 110 200 110 Z M150 280 C150 240 170 220 200 220 C230 220 250 240 250 280"
            fill="none"
            stroke="#1A1C2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* PHASE 2: ADAPTATIONS (LAYERS) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.3, 0.8, 1] }}
          >
            {/* Fragments & Shifting Lines */}
            <motion.path
              d="M160 120 L140 100 M240 130 L260 110 M130 200 L110 220 M270 210 L290 190"
              stroke="#1A1C2E"
              strokeWidth="1"
              opacity="0.3"
              animate={{ x: [-2, 2, -2], y: [-1, 1, -1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Blurred Overlay Zones */}
            <circle cx="230" cy="150" r="20" fill="#1A1C2E" opacity="0.04" filter="url(#softGlow)" />
            <circle cx="170" cy="230" r="15" fill="#1A1C2E" opacity="0.04" filter="url(#softGlow)" />
          </motion.g>
        </g>

        {/* PHASE 3: THE GAP / SPLIT */}
        <motion.g>
          {/* Central Vertical Line (The Fissure) */}
          <motion.line
            x1="200" y1="80" x2="200" y2="320"
            stroke="#C9A24D"
            strokeWidth="1"
            strokeDasharray="2 2"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: [0, 0, 1, 1, 0],
              opacity: [0, 0, 1, 1, 0]
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.55, 0.6, 0.9, 1] }}
          />

          {/* Left Side Highlight (Revealing the pure origin) */}
          <motion.rect
            x="80" y="80" width="120" height="240"
            fill="url(#goldGrad)"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0, 0.1, 0.1, 0]
            }}
            transition={{ duration, repeat: Infinity, times: [0, 0.55, 0.6, 0.65, 0.9, 1] }}
          />
        </motion.g>

        {/* FINAL CONSCIOUSNESS SPARK */}
        <motion.circle
          cx="200" cy="145" r="3"
          fill="#C9A24D"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0, 0, 1, 0],
            scale: [0, 0, 0, 1.5, 0]
          }}
          transition={{ duration, repeat: Infinity, times: [0, 0.85, 0.9, 0.95, 1] }}
          filter="url(#softGlow)"
        />
      </svg>
    </div>
  );
}
