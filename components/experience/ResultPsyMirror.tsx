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
      if (!parsed.insights?.dimension_insights) {
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

      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        
        {/* SYNTHESE / MIROIR CENTRAL */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1C2E] text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-emerald-400" />
              L'Écart Central (Le Miroir)
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
              "{result.insights?.mirror_sentence}"
            </p>
            <div className="pt-8 border-t border-white/10 grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Votre Angle Mort</div>
                <p className="text-sm leading-relaxed text-white/80">{result.insights?.blind_spot}</p>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">Levier Prioritaire</div>
                <p className="text-sm leading-relaxed text-white/80">{result.insights?.lever}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* DIMENSIONS GRID */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Vos 6 Dimensions Comportementales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(result.behavior_profile).map(([dimId, score]) => (
              <div key={dimId} className="bg-white p-8 rounded-3xl border border-[#1A1C2E]/5 shadow-sm space-y-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{getDimensionName(dimId)}</h3>
                  <div className="text-xs font-bold px-2 py-1 bg-[#F8F9FA] rounded">{score}/100</div>
                </div>
                <div className="h-2 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    className="h-full bg-[#1A1C2E]"
                  />
                </div>
                <p className="text-sm text-[#1A1C2E]/60 leading-relaxed">
                  {result.insights?.dimension_insights?.find(i => i.id === dimId)?.text || "Analyse en cours..."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEO SCRIPT SECTION */}
        <section className="bg-white p-8 md:p-12 rounded-[40px] border border-[#1A1C2E]/5 shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Video className="w-6 h-6" />
                Script Vidéo Personnalisé
              </h2>
              <p className="text-sm text-[#1A1C2E]/60">6-7 minutes de décryptage visuel de votre profil.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#1A1C2E]/5 hover:bg-[#1A1C2E]/10 rounded-full font-bold text-sm transition-all">
              <Share2 className="w-4 h-4" />
              Générer la vidéo
            </button>
          </div>
          <div className="p-8 bg-[#F8F9FA] rounded-3xl border border-dashed border-[#1A1C2E]/10">
            <pre className="whitespace-pre-wrap font-sans text-sm text-[#1A1C2E]/80 leading-relaxed italic">
              {result.video_script}
            </pre>
          </div>
        </section>

        {/* PLAN 7 JOURS */}
        <section className="bg-emerald-50 p-8 md:p-12 rounded-[40px] border border-emerald-100 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-3">
              <Target className="w-6 h-6" />
              Plan d'Action - 7 Jours
            </h2>
            <p className="text-emerald-800/60 text-sm">Des micro-actions concrètes pour ajuster votre fonctionnement.</p>
          </div>
          <div className="grid gap-4">
            {[
              "Jour 1-2 : Observation de l'angle mort dans vos interactions.",
              "Jour 3-5 : Application du levier prioritaire défini ci-dessus.",
              "Jour 6-7 : Bilan des réactions et ajustement du seuil décisionnel."
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-emerald-900">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <div className="text-center pt-12">
          <button 
            onClick={() => router.push('/miroir')}
            className="text-sm font-bold text-[#1A1C2E]/40 hover:text-[#1A1C2E] transition-colors flex items-center gap-2 mx-auto"
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
