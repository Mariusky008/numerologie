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
  Snowflake,
  Lock
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
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const processResult = async () => {
      try {
        trackEvent('report_view');
        
        // 1. Check for Order ID in URL (to verify payment status)
        const searchParams = new URLSearchParams(window.location.search);
        const orderId = searchParams.get('order_id');
        
        if (orderId) {
          const res = await fetch(`/api/book-request?id=${orderId}`);
          if (res.ok) {
            const order = await res.json();
            if (order.status !== 'pending') {
              setIsAuthorized(true);
              const combinedData = { 
                psyResult: order.numerology_result.psyResult, 
                numResult: order.numerology_result.reportResults, 
                userData: order.user_data, 
                etymology: null 
              };
              setData(combinedData);
              setLoading(false);
              return;
            } else {
              setError("Ce rapport est en attente de paiement. Veuillez finaliser votre commande.");
              setLoading(false);
              return;
            }
          }
        }

        // 2. Fallback to LocalStorage (only if already paid or in test mode)
        const savedResult = localStorage.getItem('unified_miroir_result');
        if (savedResult) {
          setData(JSON.parse(savedResult));
          setIsAuthorized(true);
          setLoading(false);
          return;
        }

        // 3. Generate from session (requires payment validation in real world, but here we teaser)
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
        
        // IMPORTANT: We don't set isAuthorized here if we want to force payment
        // For now, let's assume they need to reach this via a paid path
        // router.push('/miroir/checkout'); 
        
        setData(combinedData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Une erreur est survenue lors de la génération de votre rapport.");
      } finally {
        setLoading(false);
      }
    };

    processResult();
  }, [router]);

  useEffect(() => {
    // Force scroll to top when result data is loaded
    if (data) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [data]);

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

  if (!isAuthorized) {
    // Paywall Teaser
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center space-y-12">
        <div className="max-w-2xl w-full bg-white p-12 rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 space-y-10">
          <div className="w-20 h-20 bg-[#C9A24D]/10 rounded-3xl flex items-center justify-center text-[#C9A24D] mx-auto">
            <Lock className="w-10 h-10" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold italic text-[#1A1C2E]">Ton Miroir est prêt !</h2>
            <p className="text-[#1A1C2E]/60 text-lg leading-relaxed">
              Nous avons généré ton analyse complète (≈ 40 pages) fusionnant ton empreinte de naissance et tes réflexes observés.
            </p>
          </div>
          <div className="space-y-4 pt-6">
            <button 
              onClick={() => router.push('/miroir/checkout')}
              className="w-full py-6 bg-[#C9A24D] text-[#1A1C2E] rounded-full font-bold text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              Accéder à mon analyse intégrale
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Paiement unique • Accès immédiat</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <UnifiedMiroirReport 
      psyResult={data.psyResult} 
      userData={data.userData} 
      numerologyResult={data.numResult}
      etymology={data.etymology}
    />
  );
}
