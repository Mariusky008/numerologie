'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  CheckCircle2, 
  Download,
  Target,
  Sparkles,
  Activity,
  Brain,
  TrendingUp,
  Repeat,
  ChevronDown,
  Eye,
  Star,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Snowflake
} from 'lucide-react';
import { mockDemoResult } from '@/lib/psy-mirror/mock-demo';
import { useRouter } from 'next/navigation';
import PsyCoachChat from '@/components/chat/PsyCoachChat';

export default function DemoLaboPage() {
  const router = useRouter();
  const result = mockDemoResult;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 pb-20 overflow-x-hidden">
      
      {/* HEADER OVERLAY FOR DEMO */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#C9A24D] text-white py-2 px-4 text-center text-[10px] font-black uppercase tracking-[0.3em] shadow-md">
        Mode Démo : Aperçu des Résultats du Laboratoire
      </div>

      {/* 1. HERO REVEAL SECTION */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 relative border-b border-[#1A1C2E]/5 overflow-hidden bg-gradient-to-b from-white to-[#FDFBF7] pt-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5B4B8A]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#C9A24D]/5 blur-[120px] rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl z-10 text-center space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 backdrop-blur-sm text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <Eye className="w-4 h-4" />
            Révélation du Miroir Psychologique
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-[#1A1C2E]">
            {result.cosmic_data?.firstName ? `Voici ton reflet, ${result.cosmic_data.firstName}.` : "Voici ton vrai reflet."}
          </h1>

          <div className="bg-white border border-[#1A1C2E]/5 p-8 md:p-14 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(26,28,46,0.08)] relative group max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              L'Analyse Centrale
            </div>
            
            <p className="text-2xl md:text-4xl font-serif font-medium leading-relaxed italic text-[#1A1C2E] mb-10">
              "{result.insights?.mirror_sentence}"
            </p>
            
            <div className="max-w-none text-[#1A1C2E] leading-relaxed text-lg md:text-xl font-normal text-left space-y-6">
              {result.insights?.mirror_full?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="last:mb-0">{para.replace('### ', '')}</p>
              ))}
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-12 text-[#1A1C2E]/20"
          >
            <ChevronDown className="w-12 h-12 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* COSMIC ALIGNMENT SECTION */}
      {result.insights?.cosmic_alignment && (
        <section className="py-32 px-6 relative overflow-hidden bg-white border-b border-[#1A1C2E]/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.05),_transparent_70%)]"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10 space-y-24">
            {/* THE PROTOCOL / RULES OF THE GAME */}
            <div className="bg-[#1A1C2E]/[0.02] border border-[#1A1C2E]/5 rounded-[40px] p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A] text-[10px] font-black uppercase tracking-widest">
                    Le Protocole
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#1A1C2E]">Comprendre les règles de ton analyse</h3>
                  <p className="text-lg text-[#1A1C2E]/70 leading-relaxed">
                    Ton score d'alignement n'est pas une note de performance. C'est la mesure de la cohérence entre trois forces qui dirigent ta vie :
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Identité Astro", desc: "Ton potentiel de naissance (Tes Astres)", icon: Star, color: "text-[#C9A24D]" },
                    { title: "Réalité Bio", desc: "Tes réflexes instinctifs (Le Labo)", icon: Activity, color: "text-[#1A1C2E]" },
                    { title: "Ton Idéal", desc: "Ce que tu crois être (Tes Réponses)", icon: Eye, color: "text-[#5B4B8A]" },
                    { title: "L'Alignement", desc: "Le match entre ces 3 forces", icon: Zap, color: "text-[#C9A24D]" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-[#1A1C2E]/5 shadow-sm space-y-2">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <div className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]">{item.title}</div>
                      <div className="text-[11px] text-[#1A1C2E]/60 font-medium leading-tight">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
                <Star className="w-4 h-4" />
                Dissonance de Destinée
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">
                Es-tu aligné avec ton <br />
                <span className="text-[#C9A24D] italic">empreinte de naissance ?</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 justify-center">
              {/* Cosmic Venn Diagram */}
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[#C9A24D]/5 blur-[100px] rounded-full"></div>

                {/* Intent Circle (Module A) - Small & Faded */}
                <motion.div 
                  animate={{ scale: [1, 1.03, 1], x: [0, 5, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-dashed border-[#1A1C2E]/20 -translate-y-24 flex flex-col items-center justify-center opacity-30"
                >
                  <div className="text-[7px] font-black text-[#1A1C2E] uppercase tracking-[0.2em] mb-1">Ton Idéal</div>
                  <div className="text-[9px] font-bold text-[#1A1C2E]/60 uppercase tracking-widest text-center px-4">
                    {result.insights.cosmic_alignment.intentElement}
                  </div>
                </motion.div>

                {/* Birth Nature Circle */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#C9A24D]/10 border-2 border-[#C9A24D]/30 backdrop-blur-sm -translate-x-16 flex flex-col items-center justify-center overflow-hidden shadow-2xl shadow-[#C9A24D]/10 group"
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    {result.insights.cosmic_alignment.astroElement === 'Feu' && <Flame className="w-full h-full text-[#C9A24D]" />}
                    {result.insights.cosmic_alignment.astroElement === 'Eau' && <Droplets className="w-full h-full text-[#C9A24D]" />}
                    {result.insights.cosmic_alignment.astroElement === 'Air' && <Wind className="w-full h-full text-[#C9A24D]" />}
                    {result.insights.cosmic_alignment.astroElement === 'Terre' && <Mountain className="w-full h-full text-[#C9A24D]" />}
                  </div>
                  <div className="relative z-10 text-[9px] font-black text-[#C9A24D] uppercase tracking-[0.3em] mb-2">Identité de Naissance</div>
                  <div className="relative z-10 text-2xl font-serif font-bold text-[#C9A24D]">
                    {result.insights.cosmic_alignment.astroElement}
                  </div>
                </motion.div>

                {/* Bio Reality Circle */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1], rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#1A1C2E]/5 border-2 border-[#1A1C2E]/10 backdrop-blur-sm translate-x-16 flex flex-col items-center justify-center overflow-hidden shadow-2xl shadow-[#1A1C2E]/5 group"
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    {result.insights.cosmic_alignment.bioElement === 'Feu' && <Flame className="w-full h-full text-[#1A1C2E]" />}
                    {result.insights.cosmic_alignment.bioElement === 'Glace' && <Snowflake className="w-full h-full text-[#1A1C2E]" />}
                    {result.insights.cosmic_alignment.bioElement === 'Air' && <Wind className="w-full h-full text-[#1A1C2E]" />}
                    {result.insights.cosmic_alignment.bioElement === 'Terre' && <Mountain className="w-full h-full text-[#1A1C2E]" />}
                  </div>
                  <div className="relative z-10 text-[9px] font-black text-[#1A1C2E]/60 uppercase tracking-[0.3em] mb-2">Réalité Biologique</div>
                  <div className="relative z-10 text-2xl font-serif font-bold text-[#1A1C2E]">
                    {result.insights.cosmic_alignment.bioElement}
                  </div>
                </motion.div>
                
                {/* Score Intersection */}
                <div className="relative z-20 flex flex-col items-center bg-white/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-[#C9A24D]/20 shadow-xl">
                  <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-[0.4em] mb-1">Alignement</div>
                  <div className="text-5xl md:text-7xl font-black text-[#1A1C2E]">
                    {result.insights.cosmic_alignment.score}%
                  </div>
                </div>
              </div>

              <div className="flex-1 text-left space-y-6">
                <div className="p-8 md:p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-xl space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#1A1C2E]/5 pb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${result.insights.cosmic_alignment.score > 70 ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {result.insights.cosmic_alignment.score > 70 ? <CheckCircle2 className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                    </div>
                    <h4 className="text-3xl font-serif font-bold text-[#1A1C2E]">
                      {result.insights.cosmic_alignment.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-2xl leading-relaxed text-[#1A1C2E] font-medium">
                        {result.insights.cosmic_alignment.text}
                      </p>
                      <p className="text-[#1A1C2E]/70 leading-relaxed text-lg font-normal italic">
                        {result.insights.cosmic_alignment.details?.split('\n\n')[0]}
                      </p>
                    </div>

                    {/* WHY Section */}
                    {result.insights.cosmic_alignment.origin && (
                      <div className="p-6 bg-[#FDFBF7] border-l-4 border-[#C9A24D] rounded-r-3xl space-y-2">
                        <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-widest">D'où vient cette dissonance ?</div>
                        <p className="text-[#1A1C2E] text-lg leading-relaxed font-normal">
                          {result.insights.cosmic_alignment.origin}
                        </p>
                      </div>
                    )}

                    {/* REMEDY Section */}
                    {result.insights.cosmic_alignment.remedy && (
                      <div className="p-6 bg-[#5B4B8A]/5 border-l-4 border-[#5B4B8A] rounded-r-3xl space-y-2">
                        <div className="text-[10px] font-black text-[#5B4B8A] uppercase tracking-widest">Comment y remédier ?</div>
                        <p className="text-[#1A1C2E] text-lg leading-relaxed font-normal">
                          {result.insights.cosmic_alignment.remedy}
                        </p>
                      </div>
                    )}

                    {result.insights.cosmic_alignment.details?.includes('**Note de Dissonance') && (
                      <div className="text-[#C9A24D] text-sm font-bold bg-[#C9A24D]/5 p-4 rounded-2xl border border-[#C9A24D]/10">
                        {result.insights.cosmic_alignment.details.split('**Note de Dissonance :**')[1]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THE LABORATORY SECTION */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-[#FDFBF7] via-[#F0F2F5] to-[#FDFBF7]">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Le Laboratoire des Réflexes</h2>
            <p className="text-[#1A1C2E]/80 text-xl max-w-2xl mx-auto">Preuves factuelles issues de vos épreuves de stress en temps réel.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {result.insights?.reflex_insights?.map((ri, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 hover:shadow-2xl hover:shadow-[#1A1C2E]/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-[#1A1C2E]">
                  {ri.title.includes('Attention') && <Brain className="w-28 h-28" />}
                  {ri.title.includes('Rupture') && <Activity className="w-28 h-28" />}
                  {ri.title.includes('Risque') && <TrendingUp className="w-28 h-28" />}
                  {ri.title.includes('Agilité') && <Repeat className="w-28 h-28" />}
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="text-[#C9A24D] text-xs font-bold uppercase tracking-[0.4em]">{ri.title}</div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-[#1A1C2E]">{ri.observation}</h3>
                  
                  <div className="pt-10 border-t border-[#1A1C2E]/5">
                    <div className="flex items-center gap-3 text-[#1A1C2E]/40 mb-5">
                      <Target className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#1A1C2E]/80">Protocole d'Entraînement</span>
                    </div>
                    <p className="text-xl text-[#5B4B8A] italic font-medium leading-relaxed">
                      "{ri.exercise}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE BLIND SPOT & LEVER */}
      <section className="py-32 px-6 bg-[#1A1C2E]/[0.02] border-y border-[#1A1C2E]/5">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest border border-red-100">
              Point de Transformation
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-[#1A1C2E]">
              Ton Angle Mort : <br />
              <span className="text-[#C9A24D] italic">{result.insights?.blind_spot_label}</span>
            </h2>
            <div className="text-[#1A1C2E] leading-relaxed text-xl md:text-2xl font-normal space-y-8">
              {result.insights?.blind_spot?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className={para.startsWith('**') ? "font-bold text-[#1A1C2E]" : ""}>
                  {para.replace('### ', '')}
                </p>
              ))}
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-12 md:p-16 rounded-[60px] bg-[#C9A24D] text-white shadow-[0_50px_100px_-20px_rgba(201,162,77,0.3)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
              <Zap className="w-56 h-56" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.4em] opacity-80">
                <Target className="w-6 h-6" />
                Levier Prioritaire
              </div>
              <p className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                {result.insights?.lever}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ORACLE SECTION */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Sparkles className="w-5 h-5" />
              Soutien Illimité
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">L'Oracle du Miroir</h2>
            <p className="text-[#1A1C2E]/80 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Discutez avec l'intelligence qui a analysé vos réflexes pour lever vos derniers blocages.
            </p>
          </div>

          <div className="p-2 bg-[#FDFBF7] border border-[#1A1C2E]/5 rounded-[70px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.05)]">
            <PsyCoachChat psyResult={result} />
          </div>
        </div>
      </section>

      {/* FINAL ACTIONS */}
      <section className="py-24 px-6 border-t border-[#1A1C2E]/5 bg-[#FDFBF7] text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <p className="text-3xl md:text-4xl font-serif italic text-[#1A1C2E]/30 leading-relaxed px-6">
            "{result.final_phrase}"
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-lg hover:bg-[#2A2D45] transition-all shadow-xl">
              <Download className="w-6 h-6" />
              Télécharger mon Dossier PDF
            </button>
            <button 
              onClick={() => router.push('/miroir')}
              className="text-xs font-black uppercase tracking-[0.5em] text-[#1A1C2E]/30 hover:text-[#C9A24D] transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
