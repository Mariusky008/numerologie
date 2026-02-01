
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserData, NumerologyResult } from '@/lib/types';
import { getNameAnalysis as getFallbackAnalysis } from '@/lib/numerology/etymology';
import { fetchNameAnalysis } from '@/lib/numerology/db_etymology';
import { Sparkles, Fingerprint, BookOpen, Activity, Heart, Brain } from 'lucide-react';

export default function Part1Identity({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const firstNames = userData.firstName.split(' ').filter(n => n.trim().length > 0);
  const lastName = userData.lastName;
  const [analyses, setAnalyses] = useState<Record<string, any>>({});

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  useEffect(() => {
    async function loadData() {
      const newAnalyses: Record<string, any> = {};
      for (const name of firstNames) {
        const dbData = await fetchNameAnalysis(name);
        if (dbData) {
          newAnalyses[name] = {
            origin: dbData.origin,
            meaning: dbData.meaning,
            vibration: dbData.spiritual || "Vibration spirituelle élevée."
          };
        } else {
          newAnalyses[name] = getFallbackAnalysis(name);
        }
      }
      setAnalyses(newAnalyses);
    }
    loadData();
  }, [userData.firstName]);

  return (
    <div className="space-y-32">
      {/* 1. ETYMOLOGIE */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
            <BookOpen className="w-4 h-4" />
            L'Origine du Verbe
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Identité & Étymologie</h2>
          <p className="text-xl md:text-2xl text-[#C9A24D] italic font-light">
            "Votre nom est le premier mantra que l'univers a chanté pour vous."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {firstNames.map((name, i) => {
            const analysis = analyses[name] || getFallbackAnalysis(name);
            return (
              <motion.div 
                key={i} 
                {...fadeIn}
                className="bg-white p-10 md:p-14 rounded-[60px] border border-[#1A1C2E]/5 shadow-xl space-y-6 group hover:border-[#C9A24D]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <h3 className="text-3xl md:text-5xl font-serif text-[#1A1C2E] font-bold capitalize italic">{name}</h3>
                  <div className="px-6 py-2 bg-[#FAF9F7] rounded-full text-xs font-black uppercase tracking-widest text-[#C9A24D] border border-stone-100">
                    {analysis.origin}
                  </div>
                </div>
                <p className="text-2xl text-[#C9A24D] font-serif font-bold italic leading-relaxed">
                  "{analysis.meaning}"
                </p>
                <p className="text-xl text-[#1A1C2E]/70 leading-relaxed font-light whitespace-pre-wrap pt-6 border-t border-stone-50">
                  {analysis.vibration}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2. HERITAGE & SIGNATURE */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
            <Fingerprint className="w-4 h-4" />
            Le Sceau de l'Âme
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Héritage & Signature</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div {...fadeIn} className="bg-white p-12 rounded-[60px] border-l-8 border-[#C9A24D] shadow-xl space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif text-[#1A1C2E] font-bold italic">Le Nom : {lastName}</h3>
            <p className="text-xl text-[#1A1C2E]/70 leading-relaxed font-light">
              Votre nom de famille représente votre héritage, vos racines et la mémoire de votre lignée.
              C'est le bagage avec lequel vous voyagez, contenant les forces et les défis de vos ancêtres.
            </p>
          </motion.div>
          
          <motion.div {...fadeIn} className="bg-[#1A1C2E] p-12 rounded-[60px] text-white space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A24D]/20 to-transparent opacity-30" />
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#C9A24D] mb-4">Vibration Globale</h3>
              <div className="flex items-end gap-6">
                <div className="text-8xl md:text-9xl font-serif leading-none">{results.expression}</div>
                <div className="pb-2">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Code-barres Spirituel</p>
                  {results.details?.expression.subNumber && results.details.expression.subNumber !== results.expression && (
                    <p className="text-[#C9A24D] font-mono text-sm mt-1">
                      Issu du {results.details.expression.subNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PLANS D'EXPRESSION */}
        {results.planesOfExpression && (
          <motion.div {...fadeIn} className="bg-white p-12 md:p-20 rounded-[80px] border border-[#1A1C2E]/5 shadow-2xl space-y-12">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#1A1C2E]">Plans d'Expression</h3>
              <p className="text-xl text-[#1A1C2E]/60 font-light italic">
                Comment votre énergie se manifeste-t-elle au quotidien ?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { label: 'Mental', val: results.planesOfExpression.mental, icon: Brain, color: 'bg-blue-400' },
                { label: 'Physique', val: results.planesOfExpression.physical, icon: Activity, color: 'bg-red-400' },
                { label: 'Émotionnel', val: results.planesOfExpression.emotional, icon: Heart, color: 'bg-rose-400' },
                { label: 'Intuitif', val: results.planesOfExpression.intuitive, icon: Sparkles, color: 'bg-purple-400' }
              ].map((plan, i) => (
                <div key={i} className="space-y-4 group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <plan.icon className="w-4 h-4 text-stone-300 group-hover:text-[#C9A24D] transition-colors" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]">{plan.label}</span>
                    </div>
                    <span className="text-xl font-serif font-bold text-[#C9A24D]">{plan.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-50">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${plan.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${plan.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
