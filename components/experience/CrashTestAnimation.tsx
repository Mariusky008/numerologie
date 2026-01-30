'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CrashTestAnimation() {
  // Timing configuration for the 7s loop
  const totalDuration = 7;
  
  return (
    <div className="relative w-full max-w-[350px] aspect-square mx-auto flex items-center justify-center bg-white rounded-[60px] shadow-inner overflow-hidden border border-[#1A1C2E]/5">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mask for the split effect */}
          <mask id="splitMask">
            <motion.rect 
              x="0" y="0" width="200" height="400" fill="white" 
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: totalDuration, repeat: Infinity, times: [0, 0.6, 0.65, 0.9, 1] }}
            />
          </mask>
          
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* PHASE 1: THE PURE ORIGIN */}
        <g>
          {/* Background Aura */}
          <motion.circle
            cx="200" cy="180" r="100"
            fill="#C9A24D"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Symmetrical Circles (Structure) */}
          <motion.circle
            cx="200" cy="180" r="120"
            stroke="#C9A24D" strokeWidth="0.5" strokeDasharray="5 5"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* THE CHARACTER (SILHOUETTE) */}
        <g className="character">
          {/* Pure Version (Left Side during Split) */}
          <motion.path
            d="M200 110 C220 110 235 125 235 145 C235 165 220 180 200 180 C180 180 165 165 165 145 C165 125 180 110 200 110 Z M140 280 C140 240 165 220 200 220 C235 220 260 240 260 280"
            fill="none"
            stroke="#1A1C2E"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* PHASE 2: ADAPTATIONS (FRAGMENTED OVERLAY) */}
          <motion.g
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: totalDuration, 
              repeat: Infinity, 
              times: [0, 0.3, 0.8, 1],
              ease: "easeInOut"
            }}
          >
            {/* Angular Fragments (Experiences/Adaptations) */}
            <motion.path
              d="M170 120 L150 100 M230 130 L250 110 M140 200 L120 220 M260 210 L280 190"
              stroke="#5B4B8A"
              strokeWidth="2"
              animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.path
              d="M180 230 L160 250 M220 230 L240 250"
              stroke="#1A1C2E"
              strokeWidth="1.5"
              opacity="0.4"
            />
            {/* Blurred zones */}
            <motion.circle
              cx="230" cy="150" r="15"
              fill="#1A1C2E"
              opacity="0.05"
              filter="url(#softGlow)"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.g>
        </g>

        {/* PHASE 3: THE GAP (SPLIT LINE) */}
        <motion.g>
          {/* Vertical Fissure */}
          <motion.line
            x1="200" y1="80" x2="200" y2="320"
            stroke="#C9A24D"
            strokeWidth="1.5"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ 
              scaleY: [0, 0, 1, 1, 0],
              opacity: [0, 0, 1, 1, 0]
            }}
            transition={{ 
              duration: totalDuration, 
              repeat: Infinity, 
              times: [0, 0.55, 0.6, 0.9, 1] 
            }}
          />

          {/* Left Side Highlight (Re-alignment) */}
          <motion.rect
            x="80" y="80" width="120" height="240"
            fill="url(#luminous)"
            opacity="0"
            animate={{ 
              opacity: [0, 0, 0, 0.15, 0.15, 0]
            }}
            transition={{ 
              duration: totalDuration, 
              repeat: Infinity, 
              times: [0, 0.55, 0.6, 0.65, 0.9, 1]
            }}
          />
        </motion.g>

        {/* FINAL SPARK (INSIGHT) */}
        <motion.circle
          cx="200" cy="145" r="3"
          fill="#C9A24D"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0, 0, 1, 0],
            scale: [0, 0, 0, 1.5, 0]
          }}
          transition={{ 
            duration: totalDuration, 
            repeat: Infinity, 
            times: [0, 0.8, 0.85, 0.9, 1]
          }}
          filter="url(#softGlow)"
        />
      </svg>
    </div>
  );
}
