'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Target,
  Sparkles,
  Activity,
  Brain,
  TrendingUp,
  Repeat,
  ChevronDown,
  Eye,
  ShieldCheck,
  Layout,
  MessageCircle,
  Clock,
  Star,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Snowflake
} from 'lucide-react';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import UnifiedMiroirReport from '@/components/report/UnifiedMiroirReport';
import { generateFullUnifiedResult } from '@/lib/psy-mirror/resultGenerator';

export default function ResultPsyMirror() {
  const router = useRouter();
  const [data, setData] = useState<{ 
    psyResult: PsyMirrorResult; 
    numResult: NumerologyResult; 
    userData: UserData;
    etymology: NameData | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processResult = async () => {
      try {
        trackEvent('report_view');
        // 1. Check if we already have the full result
        const savedResult = localStorage.getItem('unified_miroir_result');
        if (savedResult) {
          setData(JSON.parse(savedResult));
          setLoading(false);
          return;
        }

        // 2. Otherwise, get session data and generate
        const sessionDataRaw = localStorage.getItem('psy_mirror_session_data');
        const finalDataRaw = localStorage.getItem('psy_mirror_final_data');

        if (!sessionDataRaw || !finalDataRaw) {
          router.push('/miroir/experience');
          return;
        }

        const sessionData = JSON.parse(sessionDataRaw);
        const finalData = JSON.parse(finalDataRaw);
        const userData = finalData.user_info;

        const { psyResult, numResult, etymology } = await generateFullUnifiedResult(sessionData, userData);
        
        const combinedData = { psyResult, numResult, userData, etymology };
        localStorage.setItem('unified_miroir_result', JSON.stringify(combinedData));
        setData(combinedData);
        
        // Track purchase only when it's first generated (from checkout)
        trackEvent('report_purchase');
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Une erreur est survenue lors de la génération de votre rapport.");
      } finally {
        setLoading(false);
      }
    };

    processResult();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center space-y-12">
        <div className="relative w-32 h-32">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-[#C9A24D] rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-[#C9A24D] animate-pulse" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-serif font-bold italic">Fusion des données en cours...</h2>
          <p className="text-[#1A1C2E]/60 max-w-sm mx-auto">
            Nous assemblons ton empreinte de naissance, tes choix comportementaux et tes réflexes biologiques pour créer ton miroir intégral.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center space-y-8">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Oups ! Quelque chose a mal tourné.</h2>
          <p className="text-[#1A1C2E]/60 max-w-md">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-[#1A1C2E] text-white rounded-full font-bold"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <UnifiedMiroirReport 
      psyResult={data.psyResult} 
      userData={data.userData} 
      numerologyResult={data.numResult}
      etymology={data.etymology}
    />
  );
}
