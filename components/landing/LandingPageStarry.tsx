import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPageStarry({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#FAF9F7] font-sans overflow-x-hidden relative">
      {/* Background Stars / Nebula */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E293B] via-[#0F172A] to-[#020617]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
        {/* Animated Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
        
        {/* Top Glow/Star */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-[#FCD34D] blur-[40px] opacity-40"></div>
          <Star className="w-16 h-16 text-[#FCD34D] fill-[#FCD34D] relative z-10" />
        </motion.div>

        {/* Headlines */}
        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-4 text-white drop-shadow-[0_0_15px_rgba(252,211,77,0.3)]">
          Le seul livre qui raconte <br/>
          <span className="text-[#FCD34D] font-bold italic">VOTRE</span> histoire intérieure
        </h1>
        
        <p className="text-[#94A3B8] uppercase tracking-widest text-sm md:text-base font-bold mb-12 border-b border-[#FCD34D]/30 pb-2">
          Numérologie & Astrologie - Édition personnalisée
        </p>

        {/* Book Visual (Symbolic) */}
        <div className="relative mb-16 group cursor-pointer" onClick={onStart}>
          <div className="absolute inset-0 bg-[#FCD34D] blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="relative bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#FCD34D]/50 p-1 rounded-lg shadow-2xl"
          >
             <div className="bg-[#0F172A] border border-[#FCD34D]/20 rounded p-6 w-[280px] md:w-[320px] aspect-[2/3] flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10"></div>
                <div className="border-2 border-[#FCD34D] p-4 h-full w-full flex flex-col items-center justify-center rounded-sm">
                   <h3 className="font-serif text-2xl text-[#FCD34D] mb-2">Livre de<br/>Destinée</h3>
                   <div className="w-12 h-[1px] bg-[#FCD34D]/50 my-4"></div>
                   <Sparkles className="w-8 h-8 text-[#FCD34D] opacity-80" />
                </div>
             </div>
          </motion.div>
        </div>

        {/* Main Hook Text */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-xl md:text-2xl text-[#E2E8F0] font-serif leading-relaxed">
            Vous recevez votre rapport complet de numérologie & astrologie, puis sa version ultime : <br/>
            <strong className="text-[#FCD34D]">un livre personnalisé</strong> <br/>
            qui transforme l'analyse en récit vivant.
          </p>
        </div>

        {/* Comparison / Offer Box */}
        <div className="w-full bg-[#1E293B]/50 backdrop-blur-sm border border-[#FCD34D]/30 rounded-2xl p-6 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#FCD34D] text-[#0F172A] text-xs font-bold px-4 py-1 rounded-b-lg shadow-[0_0_15px_rgba(252,211,77,0.5)] uppercase tracking-wider">
            Ce que comprend votre commande
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-6">
            {/* Left Side */}
            <div className="flex-1 text-left space-y-4 md:border-r border-[#FCD34D]/20 md:pr-8 opacity-70 grayscale-[0.5]">
              <h3 className="font-bold text-[#FCD34D] flex items-center gap-2">
                <Check className="w-4 h-4" /> Rapport technique
              </h3>
              <ul className="space-y-2 text-sm text-[#CBD5E1]">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]/50"></div> Analyse technique</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]/50"></div> Données et interprétations</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]/50"></div> Consultation ponctuelle</li>
              </ul>
            </div>

            {/* Right Side (Highlighted) */}
            <div className="flex-1 text-left space-y-4 relative">
               <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#FCD34D]/50 to-transparent md:hidden"></div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Check className="w-5 h-5 text-[#FCD34D]" /> Rapport + Livre Personnalisé
              </h3>
              <p className="text-xs text-[#FCD34D] italic -mt-2 mb-2">(Ce que vous recevez ici)</p>
              <ul className="space-y-3 text-sm text-white font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FCD34D]" /> Analyse complète incluse</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FCD34D]" /> Mise en récit fluide et incarnée</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FCD34D]" /> Compréhension globale et durable</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#FCD34D]/20 text-center">
            <p className="font-serif text-lg text-[#FCD34D]">
              Vous ne choisissez pas entre le rapport et le livre. <br/>
              <span className="text-white">Vous recevez les deux.</span>
            </p>
          </div>
        </div>

        {/* Testimonials - Parchment Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 w-full">
          {[
            "J'ai compris des choses que je ressentais depuis des années.",
            "Ce livre a changé ma vision de moi-même.",
            "Je le relis à chaque tournant de ma vie."
          ].map((text, i) => (
            <div key={i} className="bg-[#FAF9F7] text-[#2C2F4A] p-6 rounded-lg shadow-[0_0_20px_rgba(252,211,77,0.1)] transform hover:-translate-y-1 transition-transform duration-300 relative">
               {/* Pin/Nail effect */}
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B45309] shadow-inner"></div>
               <div className="flex gap-1 justify-center mb-3 text-[#B45309]">
                 {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
               </div>
               <p className="font-serif italic font-medium leading-relaxed">"{text}"</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative w-full max-w-2xl">
           <div className="absolute inset-0 bg-[#FCD34D] blur-[50px] opacity-10"></div>
           <div className="relative border-t border-b border-[#FCD34D]/30 py-8 space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-[#FCD34D]"></div>
                <h3 className="text-[#FCD34D] font-serif text-xl">Offre Limitée</h3>
                <div className="h-[1px] w-12 bg-[#FCD34D]"></div>
              </div>
              
              <h4 className="text-white text-lg">Recevoir mon rapport complet + le livre personnalisé</h4>
              
              <button 
                onClick={onStart}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#B45309] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#B45309] text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
              >
                <span>Recevoir mon édition maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-xs text-[#94A3B8] uppercase tracking-wider">Accès immédiat après validation</p>
           </div>
        </div>

      </div>
    </div>
  );
}
