'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Brain, Lock, Mail, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/programme/access`,
          },
        });
        if (authError) throw authError;
        alert("Vérifie tes emails pour confirmer ton inscription !");
      }
      
      router.push('/programme');
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'authentification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C2E] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-[25px] bg-[#C9A24D] flex items-center justify-center mx-auto shadow-2xl"
          >
            <Brain className="w-10 h-10 text-[#1A1C2E]" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold italic">
              {mode === 'login' ? 'Ton Espace Personnel' : 'Créer ton Compte'}
            </h1>
            <p className="text-white/40 text-sm font-light uppercase tracking-widest">
              Méthode d’Alignement Décision–Action
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="email"
                placeholder="Ton email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-lg focus:outline-none focus:border-[#C9A24D] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input 
                type="password"
                placeholder="Ton mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-16 pr-8 text-lg focus:outline-none focus:border-[#C9A24D] transition-colors"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs text-center font-bold uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-[#C9A24D] text-[#1A1C2E] rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#C9A24D]/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Se connecter' : 'S\'inscrire'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center">
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-[#C9A24D] transition-colors"
          >
            {mode === 'login' ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-4 opacity-30">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#C9A24D]" />
            Espace Sécurisé & Données Privées
          </div>
          <p className="text-[9px] text-center italic max-w-xs leading-relaxed">
            “Ce programme est un parcours d’observation personnelle. Aucun résultat spécifique n’est garanti.”
          </p>
        </div>

      </div>
    </div>
  );
}
