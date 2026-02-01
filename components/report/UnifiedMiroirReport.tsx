'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Activity, 
  Eye, 
  Target, 
  Sparkles, 
  ChevronDown,
  Brain,
  Download,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Repeat,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Snowflake,
  Clock,
  Compass,
  ArrowRight,
  Layout
} from 'lucide-react';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import PsyCoachChat from '@/components/chat/PsyCoachChat';
import PersonalityRadar from './PersonalityRadar';
import KeyNumbersSection from './design-system/KeyNumbersSection';
import PartAstroV2 from './parts/PartAstroV2';
import PartMasterNumbers from './parts/PartMasterNumbers';
import Part2Incarnation from './parts/Part2Incarnation';
import Part3KarmaV2 from './parts/Part3KarmaV2';
import Part5Future from './parts/Part5Future';
import { generateDecadeForecast } from '@/lib/numerology/modules/decade';

interface UnifiedMiroirReportProps {
  psyResult: PsyMirrorResult;
  userData: UserData;
  numerologyResult: NumerologyResult;
  etymology?: NameData | null;
}

export default function UnifiedMiroirReport({ 
  psyResult, 
  userData, 
  numerologyResult,
  etymology
}: UnifiedMiroirReportProps) {
  
  const decadeForecast = generateDecadeForecast(userData.birthDate);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 pb-20 overflow-x-hidden">
      
      {/* 1. HERO REVEAL SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative border-b border-[#1A1C2E]/5 overflow-hidden bg-gradient-to-b from-white to-[#FDFBF7]">
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
            Révélation du Miroir Intégral
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-[#1A1C2E]">
            {userData.firstName}, <br />
            voici ton reflet complet.
          </h1>

          <div className="bg-white border border-[#1A1C2E]/5 p-8 md:p-14 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(26,28,46,0.08)] relative group max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              La Synthèse du Miroir
            </div>
            
            <p className="text-2xl md:text-4xl font-serif font-medium leading-relaxed italic text-[#1A1C2E] mb-10">
              "{psyResult.insights?.mirror_sentence}"
            </p>
            
            <div className="max-w-none text-[#1A1C2E] leading-relaxed text-lg md:text-xl font-normal text-left space-y-6">
              {psyResult.insights?.mirror_full?.split('\n\n').map((para: string, i: number) => (
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

      {/* 2. PARTIE I : L'EMPREINTE DE NAISSANCE (POTENTIEL) */}
      <section className="py-32 px-6 bg-white border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Star className="w-4 h-4" />
              Dimension I : Potentiel de Naissance
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">L'Empreinte Vibratoire</h2>
            <p className="text-[#1A1C2E]/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Ce que les nombres et les astres ont gravé en vous au moment de votre premier souffle. C'est votre "Code Source".
            </p>
          </div>

          {/* Key Numbers Grid */}
          <KeyNumbersSection results={numerologyResult} userData={userData} areCardsLocked={false} />

          {/* Identity & Incarnation - VERTICAL CENTERED LAYOUT */}
          <div className="max-w-4xl mx-auto space-y-24">
            <Part2Incarnation userData={userData} results={numerologyResult} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <PartMasterNumbers userData={userData} results={numerologyResult} />
              <div className="bg-[#FAF9F7] p-8 md:p-12 rounded-[60px] border border-[#1A1C2E]/5 space-y-8 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold italic">Radar de Potentiel</h3>
                  <p className="text-sm text-[#1A1C2E]/40 leading-relaxed">
                    Visualisation de ta distribution énergétique selon ton empreinte de naissance.
                  </p>
                </div>
                <div className="py-4">
                  <PersonalityRadar data={numerologyResult} />
                </div>
              </div>
            </div>

            <Part3KarmaV2 userData={userData} results={numerologyResult} />
          </div>

          {/* Astro Architecture */}
          <div className="pt-12">
            <PartAstroV2 userData={userData} results={numerologyResult} etymology={etymology} />
          </div>
        </div>
      </section>

      {/* 3. PARTIE II : LE LABORATOIRE DES COMPORTEMENTS (RÉALITÉ) */}
      <section className="py-32 px-6 bg-[#FDFBF7] border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 text-[#1A1C2E] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Activity className="w-4 h-4" />
              Dimension II : Réalité Comportementale
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Laboratoire de l'Action</h2>
            <p className="text-[#1A1C2E]/60 text-xl max-w-2xl mx-auto leading-relaxed">
              L'analyse de tes choix réels. Ici, nous croisons tes réactions aux scénarios de vie et tes réflexes biologiques pour révéler ton mode de fonctionnement instinctif.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* REFLEX INSIGHTS */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-[#1A1C2E]/5 pb-6">
                <Zap className="w-6 h-6 text-[#C9A24D]" />
                <h3 className="text-3xl font-serif font-bold">Observation des Réactions sous Pression</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {psyResult.insights?.reflex_insights?.map((ri, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
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

            {/* BEHAVIORAL DIMENSIONS */}
            <div className="space-y-12 pt-12">
              <div className="flex items-center gap-4 border-b border-[#1A1C2E]/5 pb-6">
                <Layout className="w-6 h-6 text-[#C9A24D]" />
                <h3 className="text-3xl font-serif font-bold">Analyse Comportementale</h3>
              </div>
              <p className="text-[#1A1C2E]/60 text-lg max-w-3xl">
                Ces dimensions sont calculées à partir de tes choix face aux situations concrètes proposées. Elles révèlent tes piliers comportementaux en situation réelle.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {psyResult.insights?.dimension_insights?.map((di) => (
                  <div key={di.id} className="p-12 rounded-[50px] bg-white border border-[#1A1C2E]/10 shadow-sm space-y-8 hover:shadow-xl hover:shadow-[#1A1C2E]/5 transition-all">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-3xl font-bold tracking-tight text-[#1A1C2E]">{di.name}</h3>
                      <div className="px-5 py-2 bg-[#FDFBF7] rounded-full text-[#C9A24D] font-bold text-sm tracking-widest border border-[#C9A24D]/20">
                        {psyResult.behavior_profile[di.id]}/100
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="h-2 w-full bg-[#1A1C2E]/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${psyResult.behavior_profile[di.id]}%` }}
                          className="h-full bg-gradient-to-r from-[#C9A24D] to-[#D4B46B]"
                        />
                      </div>
                      <p className="text-[#1A1C2E] leading-relaxed font-normal text-lg">
                        {di.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTIE III : LA DISSONANCE DE DESTINÉE (SYNTHÈSE) */}
      {psyResult.insights?.cosmic_alignment && (
        <section className="py-32 px-6 relative overflow-hidden bg-white border-b border-[#1A1C2E]/5">
          <div className="max-w-6xl mx-auto relative z-10 space-y-24">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
                <Zap className="w-4 h-4" />
                Dimension III : Dissonance de Destinée
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">
                L'Alignement Sacré
              </h2>
              <p className="text-[#1A1C2E]/60 text-xl max-w-2xl mx-auto leading-relaxed">
                Le croisement final. Est-ce que votre corps (Réalité) sert réellement votre Code Source (Potentiel) ?
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 justify-center">
              {/* Cosmic Venn Diagram */}
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C9A24D]/5 blur-[100px] rounded-full"></div>

                {/* Birth Nature Circle */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#C9A24D]/10 border-2 border-[#C9A24D]/30 backdrop-blur-sm -translate-x-16 flex flex-col items-center justify-center overflow-hidden shadow-2xl shadow-[#C9A24D]/10 group"
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    {psyResult.insights.cosmic_alignment.astroElement === 'Feu' && <Flame className="w-full h-full text-[#C9A24D]" />}
                    {psyResult.insights.cosmic_alignment.astroElement === 'Eau' && <Droplets className="w-full h-full text-[#C9A24D]" />}
                    {psyResult.insights.cosmic_alignment.astroElement === 'Air' && <Wind className="w-full h-full text-[#C9A24D]" />}
                    {psyResult.insights.cosmic_alignment.astroElement === 'Terre' && <Mountain className="w-full h-full text-[#C9A24D]" />}
                  </div>
                  <div className="relative z-10 text-[9px] font-black text-[#C9A24D] uppercase tracking-[0.3em] mb-2">Potentiel de Naissance</div>
                  <div className="relative z-10 text-2xl font-serif font-bold text-[#C9A24D]">
                    {psyResult.insights.cosmic_alignment.astroElement}
                  </div>
                </motion.div>

                {/* Bio Reality Circle */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1], rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#1A1C2E]/5 border-2 border-[#1A1C2E]/10 backdrop-blur-sm translate-x-16 flex flex-col items-center justify-center overflow-hidden shadow-2xl shadow-[#1A1C2E]/5 group"
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    {psyResult.insights.cosmic_alignment.bioElement === 'Feu' && <Flame className="w-full h-full text-[#1A1C2E]" />}
                    {psyResult.insights.cosmic_alignment.bioElement === 'Glace' && <Snowflake className="w-full h-full text-[#1A1C2E]" />}
                    {psyResult.insights.cosmic_alignment.bioElement === 'Air' && <Wind className="w-full h-full text-[#1A1C2E]" />}
                    {psyResult.insights.cosmic_alignment.bioElement === 'Terre' && <Mountain className="w-full h-full text-[#1A1C2E]" />}
                  </div>
                  <div className="relative z-10 text-[9px] font-black text-[#1A1C2E]/60 uppercase tracking-[0.3em] mb-2">Réalité du Labo</div>
                  <div className="relative z-10 text-2xl font-serif font-bold text-[#1A1C2E]">
                    {psyResult.insights.cosmic_alignment.bioElement}
                  </div>
                </motion.div>
                
                {/* Score Intersection */}
                <div className="relative z-20 flex flex-col items-center bg-white/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-[#C9A24D]/20 shadow-xl">
                  <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-[0.4em] mb-1">Alignement</div>
                  <div className="text-5xl md:text-7xl font-black text-[#1A1C2E]">
                    {psyResult.insights.cosmic_alignment.score}%
                  </div>
                </div>
              </div>

              <div className="flex-1 text-left space-y-6">
                <div className="p-8 md:p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-xl space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#1A1C2E]/5 pb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${psyResult.insights.cosmic_alignment.score > 70 ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {psyResult.insights.cosmic_alignment.score > 70 ? <CheckCircle2 className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                    </div>
                    <h4 className="text-3xl font-serif font-bold text-[#1A1C2E]">
                      {psyResult.insights.cosmic_alignment.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-2xl leading-relaxed text-[#1A1C2E] font-medium">
                        {psyResult.insights.cosmic_alignment.text}
                      </p>
                    </div>

                    <div className="p-6 bg-[#FDFBF7] border-l-4 border-[#C9A24D] rounded-r-3xl space-y-2">
                      <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-widest">D'où vient cette dissonance ?</div>
                      <p className="text-[#1A1C2E] text-lg leading-relaxed font-normal">
                        {psyResult.insights.cosmic_alignment.origin}
                      </p>
                    </div>

                    <div className="p-6 bg-[#5B4B8A]/5 border-l-4 border-[#5B4B8A] rounded-r-3xl space-y-2">
                      <div className="text-[10px] font-black text-[#5B4B8A] uppercase tracking-widest">Comment y remédier ?</div>
                      <p className="text-[#1A1C2E] text-lg leading-relaxed font-normal">
                        {psyResult.insights.cosmic_alignment.remedy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. PARTIE IV : LE CHEMIN DE RÉALIGNEMENT (ACTION) */}
      <section className="py-32 px-6 bg-[#1A1C2E]/[0.02] border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 border border-[#5B4B8A]/20 text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Compass className="w-4 h-4" />
              Dimension IV : Réalignement & Futur
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Plan d'Action</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* 7-Day Protocol */}
            <div className="space-y-12 max-w-4xl mx-auto w-full">
              <div className="space-y-4 text-center mb-12">
                <h3 className="text-3xl md:text-5xl font-serif font-bold italic">Protocole 7 Jours</h3>
                <p className="text-[#1A1C2E]/60 text-lg">Un exercice par jour pour amorcer ton réalignement.</p>
              </div>
              <div className="grid gap-6">
                {psyResult.insights?.plan_7_days?.map((step, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
                    className="flex items-start gap-8 p-8 md:p-10 rounded-[40px] bg-white border border-[#1A1C2E]/5 hover:shadow-xl transition-all group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#1A1C2E] text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-lg group-hover:bg-[#C9A24D] transition-colors">
                      {step.day}
                    </div>
                    <div className="pt-3">
                      <span className="text-xl md:text-2xl font-serif font-medium text-[#1A1C2E] leading-tight block italic">{step.action}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decade Forecast */}
            <div className="space-y-12 max-w-4xl mx-auto w-full pt-20 border-t border-[#1A1C2E]/5">
              <div className="space-y-4 text-center mb-12">
                <h3 className="text-3xl md:text-5xl font-serif font-bold italic">Projection 10 ans</h3>
                <p className="text-[#1A1C2E]/60 text-lg">Ta trajectoire cyclique à long terme.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[50px] border border-[#1A1C2E]/5 shadow-sm space-y-8 max-h-[700px] overflow-y-auto custom-scrollbar">
                  {decadeForecast.map((yearData, i) => (
                    <div key={i} className="flex items-start gap-6 py-6 border-b border-[#1A1C2E]/5 last:border-0 hover:bg-[#FDFBF7]/50 transition-colors px-4 -mx-4 rounded-2xl">
                      <div className="w-20 shrink-0 text-center space-y-1">
                        <div className="text-2xl font-black text-[#1A1C2E]">{yearData.year}</div>
                        <div className="text-[10px] text-[#C9A24D] font-black uppercase tracking-widest bg-[#C9A24D]/10 py-1 rounded-full">An {yearData.personalYear}</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="text-lg font-bold leading-tight text-[#1A1C2E]">{yearData.theme}</div>
                        <div className="text-sm text-[#1A1C2E]/50 leading-relaxed italic font-serif">"{yearData.mantra}"</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-8">
                  <Part5Future userData={userData} results={numerologyResult} />
                  <div className="bg-[#1A1C2E] p-10 rounded-[50px] text-white space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 blur-3xl rounded-full"></div>
                    <h4 className="text-2xl font-serif font-bold italic text-[#C9A24D]">Conseil Stratégique</h4>
                    <p className="text-white/70 leading-relaxed italic">
                      L'alignement ne se fait pas en un jour. Utilise ces cycles pour naviguer avec intention plutôt que de subir les événements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE ORACLE - AI CHAT */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Sparkles className="w-5 h-5" />
              Soutien Illimité
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">L'Oracle du Miroir</h2>
            <p className="text-[#1A1C2E]/80 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Discutez avec l'intelligence qui a analysé votre empreinte et vos réflexes pour lever vos derniers blocages.
            </p>
          </div>

          <div className="p-2 bg-[#FDFBF7] border border-[#1A1C2E]/5 rounded-[70px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.05)]">
            <PsyCoachChat psyResult={psyResult} />
          </div>
        </div>
      </section>

      {/* FINAL ACTIONS */}
      <section className="py-24 px-6 border-t border-[#1A1C2E]/5 bg-white text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-8 text-[#1A1C2E] text-lg md:text-xl leading-relaxed">
            <p>
              Ce rapport te donne une lecture structurée de ton thème et met en lumière certaines dynamiques clés.
            </p>
            <p>
              Certaines personnes choisissent ensuite de mettre cette lecture en pratique dans leur quotidien.
            </p>
            <p>
              Pour cela, il existe un parcours de 12 mois, composé d’exercices concrets, de temps de réflexion guidés et de points de lecture réguliers, pensés pour expérimenter, ajuster et observer son évolution au fil des cycles personnels.
            </p>
            <p className="font-medium">
              Ce parcours est une démarche volontaire de progression personnelle, basée sur l’observation et l’expérimentation.
            </p>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => window.location.href = '/parcours-12-mois'}
              className="group relative inline-flex items-center gap-4 px-12 py-8 bg-[#C9A24D] text-white rounded-full font-bold text-2xl shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <span>Découvrir le parcours de 12 mois</span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
