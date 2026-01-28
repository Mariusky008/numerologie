'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Video, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Share2,
  ChevronRight,
  Target
} from 'lucide-react';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';
import { useRouter } from 'next/navigation';

export default function ResultPsyMirror() {
  const router = useRouter();
  const [result, setResult] = useState<PsyMirrorResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('psy_mirror_result');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Vérification de la structure (compatibilité avec les anciens résultats)
      if (!parsed.insights?.dimension_insights || parsed.video_script?.startsWith('Ouverture')) {
        localStorage.removeItem('psy_mirror_result');
        router.push('/miroir/experience');
        return;
      }
      setResult(parsed);
    } else {
      router.push('/miroir/experience');
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C2E] font-sans pb-20">
      
      {/* HEADER SECTION */}
      <section className="bg-white border-b border-[#1A1C2E]/5 pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                Analyse Terminée
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Votre Miroir Psychologique</h1>
              <p className="text-[#1A1C2E]/60 text-lg">Analyse générée le {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#1A1C2E] text-white rounded-full font-bold text-sm hover:bg-[#2C2F4A] transition-all shadow-lg">
                <Download className="w-4 h-4" />
                Dossier PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-16">
        
        {/* SYNTHESE / MIROIR CENTRAL */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1C2E] text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-emerald-400" />
                L'Écart Central (Le Miroir)
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-emerald-50">
                "{result.insights?.mirror_sentence}"
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-lg">
              {result.insights?.mirror_full?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="mb-4">{para.replace('### ', '')}</p>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ANGLE MORT */}
        <section className="bg-white p-8 md:p-12 rounded-[40px] border border-[#1A1C2E]/5 shadow-xl space-y-8">
          <h2 className="text-3xl font-bold text-[#1A1C2E]">Votre Angle Mort : {result.insights?.blind_spot_label}</h2>
          <div className="prose max-w-none text-[#1A1C2E]/80 leading-relaxed text-lg">
            {result.insights?.blind_spot?.split('\n\n').map((para: string, i: number) => (
              <p key={i} className={para.startsWith('**') ? "font-bold text-[#1A1C2E]" : "mb-4"}>
                {para.replace('### ', '')}
              </p>
            ))}
          </div>
        </section>

        {/* LEVIER PRIORITAIRE */}
        <section className="bg-emerald-600 text-white p-8 md:p-12 rounded-[40px] shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Target className="w-6 h-6" />
              Levier de Transformation Prioritaire
            </h2>
            <p className="text-xl leading-relaxed font-medium">
              {result.insights?.lever}
            </p>
          </div>
        </section>

        {/* DIMENSIONS GRID */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-center">Analyse des 6 Dimensions</h2>
          <div className="grid gap-8">
            {result.insights?.dimension_insights?.map((di) => (
              <div key={di.id} className="bg-white p-8 md:p-10 rounded-[40px] border border-[#1A1C2E]/5 shadow-sm space-y-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-center border-b border-[#1A1C2E]/5 pb-6">
                  <h3 className="font-bold text-2xl">{di.name}</h3>
                  <div className="text-lg font-bold px-4 py-2 bg-[#F8F9FA] rounded-full text-[#1A1C2E]">
                    {result.behavior_profile[di.id]}/100
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-3 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.behavior_profile[di.id]}%` }}
                      className="h-full bg-[#1A1C2E]"
                    />
                  </div>
                  <p className="text-lg text-[#1A1C2E]/80 leading-relaxed">
                    {di.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PLAN 7 JOURS */}
        <section className="bg-emerald-50 p-8 md:p-12 rounded-[40px] border border-emerald-100 space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              Votre Plan d'Action — 7 Jours
            </h2>
            <p className="text-emerald-800/70 text-lg">Un parcours quotidien pour ancrer votre levier de transformation.</p>
          </div>
          <div className="grid gap-4">
            {result.insights?.plan_7_days?.map((step, i) => (
              <div key={i} className="flex items-start gap-6 p-6 bg-white rounded-3xl border border-emerald-100 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-lg shadow-emerald-200">
                  {step.day}
                </div>
                <div className="pt-2">
                  <span className="text-lg font-semibold text-emerald-900 leading-tight">{step.action}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO SCRIPT SECTION */}
        <section className="bg-white p-8 md:p-12 rounded-[40px] border border-[#1A1C2E]/5 shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#1A1C2E]" />
                Script de Coaching Personnalisé
              </h2>
              <p className="text-sm text-[#1A1C2E]/60">Ce script est conçu pour un décryptage narratif complet de votre profil.</p>
            </div>
          </div>
          <div className="p-8 bg-[#F8F9FA] rounded-3xl border border-dashed border-[#1A1C2E]/10">
            <div className="prose prose-sm max-w-none text-[#1A1C2E]/80 leading-relaxed">
              {result.video_script.split('\n\n').map((paragraph, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  {paragraph.split('\n').map((line, j) => {
                    const isHeader = line.startsWith('[') || line.includes(' :') || (line.includes(':') && line.split(':')[0].length < 30);
                    return (
                      <p key={j} className={isHeader ? "font-bold text-[#1A1C2E] text-base mb-2" : "italic ml-4 border-l-2 border-[#1A1C2E]/5 pl-4 mb-2"}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHRASE FINALE */}
        <div className="text-center space-y-8 py-12 border-t border-[#1A1C2E]/5">
          <p className="text-2xl md:text-3xl font-bold text-[#1A1C2E] leading-tight max-w-2xl mx-auto italic">
            "{result.final_phrase}"
          </p>
          <button 
            onClick={() => router.push('/miroir')}
            className="text-sm font-bold text-[#1A1C2E]/40 hover:text-[#1A1C2E] transition-colors flex items-center gap-2 mx-auto uppercase tracking-widest"
          >
            Retour à l'accueil
          </button>
        </div>

      </div>

    </div>
  );
}

function getDimensionName(id: string): string {
  const names: Record<string, string> = {
    D1: 'Décision',
    D2: 'Incertitude',
    D3: 'Contrôle',
    D4: 'Orientation sociale',
    D5: 'Stress émotionnel',
    D6: 'Flexibilité'
  };
  return names[id] || id;
}
