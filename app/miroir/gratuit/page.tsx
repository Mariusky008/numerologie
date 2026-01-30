'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Check, 
  Star, 
  Moon, 
  Sun,
  ShieldCheck,
  BookOpen,
  MessageSquare,
  Video as VideoIcon
} from 'lucide-react';
import { calculateLifePathNumber, getLifePathData, getSunSign, getAscendant } from '@/lib/psy-mirror/cosmic';

export default function GratuitPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const finalData = localStorage.getItem('psy_mirror_final_data');
    if (finalData) {
      try {
        const parsed = JSON.parse(finalData);
        const userInfo = parsed.user_info;
        
        const pathNum = calculateLifePathNumber(userInfo.birthDate);
        const pathData = getLifePathData(pathNum);
        const sunSign = getSunSign(userInfo.birthDate);
        const ascendant = getAscendant(userInfo.birthTime);

        setData({
          firstName: userInfo.firstName,
          pathNum,
          pathTitle: pathData.title,
          pathDesc: pathData.potential,
          sunSign: sunSign.name,
          sunElement: sunSign.element,
          ascendant: ascendant
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!data) return null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  } as any;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans pb-20">
      
      {/* 1. HERO - GRATUITÉ IMMÉDIATE */}
      <section className="pt-20 pb-12 px-6 text-center space-y-8 bg-white rounded-b-[60px] shadow-sm">
        <motion.div {...fadeIn} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-4 h-4" />
            Analyse Gratuite Partielle
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
            Bonjour {data.firstName}, <br />
            <span className="text-[#C9A24D] italic">voici vos premières clés.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-8">
          {[
            { label: "Chemin de Vie", value: data.pathNum, sub: data.pathTitle, icon: Star, color: "text-[#C9A24D] bg-[#C9A24D]/5" },
            { label: "Signe Solaire", value: data.sunSign, sub: data.sunElement, icon: Sun, color: "text-[#1A1C2E] bg-[#1A1C2E]/5" },
            { label: "Ascendant", value: data.ascendant, sub: "Personnalité", icon: Moon, color: "text-[#5B4B8A] bg-[#5B4B8A]/5" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[40px] bg-white border border-[#1A1C2E]/5 shadow-sm space-y-4"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30 mb-1">{item.label}</p>
                <p className="text-3xl font-serif font-bold">{item.value}</p>
                <p className="text-sm font-medium opacity-60 italic">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. VIDEO - PREVIEW PERSONNALISÉE */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12 text-center">
        <motion.div {...fadeIn} className="space-y-4">
          <h2 className="text-3xl font-serif font-bold">Aperçu de votre analyse</h2>
          <p className="text-[#1A1C2E]/60">Votre avatar a commencé à décoder vos mécanismes. Regardez ces quelques secondes.</p>
        </motion.div>

        <motion.div 
          {...fadeIn}
          className="relative aspect-video bg-[#1A1C2E] rounded-[40px] overflow-hidden shadow-2xl group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {/* Mock Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="z-10 flex flex-col items-center gap-6">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Play className="w-10 h-10 text-white fill-current" />
                  </div>
                  <p className="text-white font-bold uppercase tracking-widest text-xs">Lancer l'aperçu (30s)</p>
                </div>
              </>
            ) : (
              <div className="text-white font-serif italic text-2xl animate-pulse px-10">
                "D'après vos réflexes lors du test, on remarque un décalage entre votre {data.pathTitle} et vos réactions sous pression..."
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* 3. CTA - LE DOSSIER COMPLET */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="p-12 md:p-20 bg-[#1A1C2E] text-white rounded-[80px] text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/20 blur-[100px] rounded-full"></div>
          
          <div className="space-y-6 relative z-10">
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
              Découvrez le miroir <br />
              <span className="text-[#C9A24D] italic">complet de votre âme.</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Le Crash-Test a révélé l'écart. Accédez maintenant à votre dossier complet de 40 pages et à votre conversation vocale avec l'IA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 relative z-10 text-left">
            {[
              { text: "Dossier Personnalisé de 40 pages", icon: BookOpen },
              { text: "30 min de Coaching Vocal avec l'IA", icon: MessageSquare },
              { text: "Vidéo d'Analyse Profonde (7 min)", icon: VideoIcon },
              { text: "Plan de Réalignement sur 7 jours", icon: ShieldCheck }
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-10 relative z-10 space-y-8">
            <button 
              onClick={() => router.push('/miroir/checkout')}
              className="group relative inline-flex flex-col items-center gap-2 px-16 py-8 bg-[#C9A24D] text-white rounded-full font-bold shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <span className="text-2xl md:text-4xl">Je fais le Crash-Test — 49 €</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">Accès Immédiat • Expérience Interactive</span>
            </button>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Garanti sans diagnostic ni prédiction médicale</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
