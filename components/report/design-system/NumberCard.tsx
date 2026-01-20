'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NumberCardProps {
  title: string;
  number: number;
  description: string;
  keywords?: string[];
  color?: string;
  delay?: number;
}

export default function NumberCard({ 
  title, 
  number, 
  description, 
  keywords = [], 
  color = '#C9A24D',
  delay = 0 
}: NumberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group perspective-1000 w-full h-[400px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="relative w-full h-full transition-all duration-700 transform-style-3d"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* RECTO */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-[#C9A24D]/30 shadow-xl bg-[#1A1B2E]">
          {/* Fond texturé */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
          
          {/* Bordure Dorée */}
          <div className="absolute inset-4 border border-[#C9A24D]/50 rounded-xl" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-[#8FA6A0] text-xs uppercase tracking-[0.2em] mb-4">{title}</span>
            
            <div 
              className="text-8xl font-serif mb-6 relative"
              style={{ color: color }}
            >
              {number}
              <div className="absolute inset-0 blur-2xl opacity-30" style={{ backgroundColor: color }} />
            </div>

            <div className="w-12 h-[1px] bg-[#C9A24D]/50 mb-6" />
            
            <p className="text-[#FAF9F7]/80 text-sm italic px-4">
              "Cliquez pour révéler le sens"
            </p>
          </div>
        </div>

        {/* VERSO */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-[#C9A24D]/30 shadow-xl bg-[#0F0F13] text-[#FAF9F7] rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
          <div className="absolute inset-4 border border-[#C9A24D]/20 rounded-xl flex flex-col items-center justify-center p-6 text-center">
            
            <h3 className="text-xl font-serif text-[#C9A24D] mb-4">{title}</h3>
            
            <p className="text-sm leading-relaxed text-[#FAF9F7]/90 mb-6">
              {description}
            </p>

            {keywords.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {keywords.map((kw, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-[#C9A24D]/10 text-[#C9A24D] rounded border border-[#C9A24D]/20">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}