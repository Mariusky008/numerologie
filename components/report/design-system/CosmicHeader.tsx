'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CosmicHeaderProps {
  firstName: string;
  lastName: string;
  lifePath: number;
}

export default function CosmicHeader({ firstName, lastName, lifePath }: CosmicHeaderProps) {
  const [stars, setStars] = useState<{ x: number; y: number; s: number; d: number }[]>([]);

  useEffect(() => {
    // Générer des étoiles aléatoires côté client uniquement pour éviter les problèmes d'hydratation
    const newStars = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2 + 1, // taille
      d: Math.random() * 3 + 2, // durée
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#0F0F13] text-[#FAF9F7] flex flex-col items-center justify-center">
      
      {/* FOND ANIMÉ */}
      <div className="absolute inset-0 z-0">
        {/* Dégradé Cosmique */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2C2F4A] via-[#0F0F13] to-[#000000] opacity-80" />
        
        {/* Étoiles Scintillantes */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.s,
              height: star.s,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Cercle Mystique Rotatif */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#C9A24D]/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#C9A24D]/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* CONTENU CENTRAL */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-[#C9A24D]/30 text-[#C9A24D] text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm bg-black/20">
            Dossier Numérologique / Astrologique
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FAF9F7] to-[#8FA6A0] mb-4"
        >
          {firstName} <br/> 
          <span className="text-[#C9A24D]">{lastName}</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-[1px] bg-[#C9A24D] mx-auto mb-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-[#8FA6A0] uppercase tracking-widest text-sm">Chemin de Vie</p>
          <div className="w-16 h-16 rounded-full border-2 border-[#C9A24D] flex items-center justify-center bg-[#0F0F13] shadow-[0_0_30px_rgba(201,162,77,0.3)]">
            <span className="text-3xl font-serif text-[#C9A24D]">{lifePath}</span>
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-widest text-white">Découvrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>

    </div>
  );
}