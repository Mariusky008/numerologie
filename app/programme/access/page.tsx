'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Sparkles } from 'lucide-react';

export default function AccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Simulate token verification
    if (token) {
      setTimeout(() => {
        localStorage.setItem('programme_access', 'true');
        router.push('/programme');
      }, 3000);
    }
  }, [token, router]);

  return (
    <div className="min-h-screen bg-[#1A1C2E] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-[30px] bg-[#C9A24D] flex items-center justify-center mx-auto shadow-2xl"
        >
          <Brain className="w-12 h-12 text-[#1A1C2E]" />
        </motion.div>

        <div className="space-y-6">
          <h1 className="text-4xl font-serif font-bold italic leading-tight">Vérification de ton accès personnel...</h1>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Nous préparons ton espace de parcours sécurisé. <br />
            Prépare-toi pour 3 mois d'observation.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 rounded-full bg-[#C9A24D]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            className="w-3 h-3 rounded-full bg-[#C9A24D]/60" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
            className="w-3 h-3 rounded-full bg-[#C9A24D]/30" 
          />
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-white/30 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#C9A24D]" />
            Données protégées — Accès Privé
          </div>
          <p className="text-[10px] font-bold text-white/20 italic max-w-xs leading-relaxed">
            “Ce programme est un parcours d’observation personnelle. Aucun résultat spécifique n’est garanti.”
          </p>
        </div>
      </div>
    </div>
  );
}
