import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Eye, Zap, ChevronDown, Key } from 'lucide-react';
import { NumerologyResult, UserData } from '@/lib/types';

interface WahooRevelationProps {
  userData: UserData;
  results: NumerologyResult;
}

export default function WahooRevelation({ userData, results }: WahooRevelationProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // --- LOGIQUE DE GÉNÉRATION DES TEXTES "WAHOO" ---

  // 1. LE SECRET DE L'ÂME (Basé sur l'Élan Spirituel - Soul Urge)
  const getSoulSecret = (num: number) => {
    const secrets: Record<number, string> = {
      1: "Vous souffrez en silence quand vous devez obéir. Votre âme hurle de commander, mais vous avez peur de blesser en vous imposant.",
      2: "Vous donnez tellement que vous en oubliez qui vous êtes. Votre plus grande peur n'est pas l'échec, mais la solitude.",
      3: "Votre sourire est votre armure. Derrière votre humour se cache une hypersensibilité que vous ne montrez à personne.",
      4: "Vous portez le poids du monde. Vous avez l'impression que si vous lâchez prise une seconde, tout s'effondre.",
      5: "Vous vous sentez souvent en cage, même dans une vie parfaite. Votre âme a soif d'un ailleurs que vous n'osez pas toujours rejoindre.",
      6: "Vous voulez 'sauver' tout le monde. C'est votre noblesse, mais c'est aussi ce qui vous épuise et vous empêche de vivre pour vous.",
      7: "Vous vous sentez souvent 'à part', comme un observateur de votre propre vie. Vous cherchez une vérité que les autres semblent ignorer.",
      8: "Vous avez peur de votre propre puissance. Vous alternez entre le désir de tout conquérir et la peur de tout détruire.",
      9: "Vous portez une nostalgie d'un 'paradis perdu'. Vous avez du mal à accepter l'imperfection de ce monde.",
      11: "Vous captez les pensées des autres comme une radio. C'est un don, mais sans protection, cela devient un bruit assourdissant.",
      22: "Vous avez des rêves qui effraieraient les gens 'normaux'. Vous savez que vous êtes ici pour bâtir quelque chose d'immense.",
      33: "Vous absorbez la douleur du monde. Votre défi est d'apprendre à aider sans vous détruire."
    };
    return secrets[num] || secrets[reduceToSingle(num)];
  };

  // 2. LE BLOCAGE INCONSCIENT (Basé sur les Dettes Karmiques ou Défis)
  const getBlockage = () => {
    // Priorité aux dettes karmiques
    if (results.details?.lifePath.karmicDebt) {
        const debt = results.details.lifePath.karmicDebt;
        if (debt === 13) return "Dette Karmique 13 : Vous avez une peur irrationnelle du changement qui vous fige dans des situations mortes.";
        if (debt === 14) return "Dette Karmique 14 : Une mémoire ancienne d'abus de liberté vous rend aujourd'hui paradoxalement rigide ou instable.";
        if (debt === 16) return "Dette Karmique 16 : Vous sabotez souvent vos relations quand elles deviennent trop intimes, par peur de l'abandon.";
        if (debt === 19) return "Dette Karmique 19 : Vous refusez l'aide des autres par orgueil, vous condamnant à une solitude inutile.";
    }
    
    // Sinon, basé sur les Nombres Manquants (Inclusion)
    if (results.missingNumbers.includes(4)) return "Racines Fragiles : Vous avez du mal à construire sur la durée. Tout semble toujours recommencer à zéro.";
    if (results.missingNumbers.includes(5)) return "Peur de l'Inconnu : Vous restez dans votre zone de confort alors que votre magie se trouve au-delà.";
    if (results.missingNumbers.includes(6)) return "Cœur Fermé : Vous intellectualisez vos émotions pour ne pas avoir à les ressentir vraiment.";
    if (results.missingNumbers.includes(8)) return "Rapport à l'Argent : Vous avez un conflit inconscient avec la réussite matérielle, la jugeant peut-être 'sale'.";
    
    // Sinon, basé sur le Défi Majeur
    const challenge = results.challenges.major;
    if (challenge === 0) return "Le Choix Absolu : Tout est possible pour vous, et c'est bien ça le problème. L'indécision est votre pire ennemi.";
    if (challenge === 1) return "L'Affirmation : Vous attendez encore la permission des autres pour exister pleinement.";
    if (challenge === 4) return "Le Cadre : Vous voyez la discipline comme une prison, alors qu'elle est la clé de votre liberté.";
    if (challenge === 8) return "La Légitimité : Au fond, vous vous demandez encore 'Qui suis-je pour réussir ?'.";
    
    return "L'Alignement : Votre tête et votre cœur jouent souvent une partition différente.";
  };

  // 3. LE FUTUR PROCHE (Basé sur l'Année Personnelle)
  const getFuture = (py: number) => {
    const futures: Record<number, string> = {
      1: "2025 est l'année du GRAND DÉMARRAGE. Ce que vous plantez maintenant définira vos 9 prochaines années. Osez !",
      2: "Une rencontre ou une alliance clé se prépare. Arrêtez de faire seul, la clé est dans 'l'autre'.",
      3: "Vos talents vont être mis en lumière. C'est l'année pour parler, écrire, créer. On va vous entendre !",
      4: "L'heure est à la consolidation. Ça peut sembler lent, mais vous construisez votre empire. Tenez bon.",
      5: "Le changement arrive, brutal et libérateur. Préparez vos valises (réelles ou symboliques), ça va bouger !",
      6: "La famille ou le foyer va demander votre attention. Un engagement important (ou une libération) est en vue.",
      7: "Une prise de conscience spirituelle majeure. Vous allez comprendre quelque chose sur vous-même qui changera tout.",
      8: "L'année de la récolte ! Si vous avez travaillé dur, l'abondance arrive. Sinon, la justice tranche.",
      9: "C'est la fin du livre. Il faut tourner la page. Laissez partir ce qui doit partir pour renaître l'an prochain."
    };
    return futures[py] || "Une période de transition s'annonce.";
  };

  const reduceToSingle = (n: number) => (n > 9 && n !== 11 && n !== 22 && n !== 33) ? String(n).split('').reduce((a, b) => Number(a) + Number(b), 0) : n;

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <div className="relative bg-[#2C2F4A] rounded-2xl p-1 overflow-hidden shadow-2xl">
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A24D] via-[#5B4B8A] to-[#C9A24D] opacity-30 animate-pulse"></div>
        
        <div className="relative bg-[#2C2F4A] rounded-xl p-8 md:p-12 text-center text-[#FAF9F7]">
          
          <div className="inline-block p-3 rounded-full bg-[#C9A24D]/20 text-[#C9A24D] mb-6 animate-bounce">
             <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
            <span className="text-[#C9A24D]">Révélation Flash</span>
            <br />
            Ce que vos nombres cachent...
          </h2>
          
          <p className="text-[#8FA6A0] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Au-delà des calculs, il y a la vérité de l'âme. Voici les 3 messages que l'Univers essaie de vous transmettre en ce moment précis.
          </p>

          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#C9A24D] text-[#2C2F4A] rounded-full text-xl font-bold tracking-wide hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(201,162,77,0.4)]"
            >
              <Eye className="w-6 h-6" />
              DÉCOUVRIR MA VÉRITÉ MAINTENANT
              <Lock className="w-4 h-4 opacity-50 group-hover:hidden" />
            </button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              {/* CARD 1: SECRET */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#FAF9F7]/5 border border-[#FAF9F7]/10 p-6 rounded-xl backdrop-blur-sm hover:bg-[#FAF9F7]/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4 text-[#C9A24D]">
                  <Key className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Votre Secret Profond</h3>
                </div>
                <p className="text-[#FAF9F7] font-serif text-lg leading-relaxed">
                  "{getSoulSecret(results.soulUrge)}"
                </p>
              </motion.div>

              {/* CARD 2: BLOCAGE */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#FAF9F7]/5 border border-[#FAF9F7]/10 p-6 rounded-xl backdrop-blur-sm hover:bg-[#FAF9F7]/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4 text-[#C9A24D]">
                  <Lock className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Votre Blocage Actuel</h3>
                </div>
                <p className="text-[#FAF9F7] font-serif text-lg leading-relaxed">
                  "{getBlockage()}"
                </p>
              </motion.div>

              {/* CARD 3: DESTIN */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#C9A24D]/20 to-[#C9A24D]/5 border border-[#C9A24D]/30 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4 text-[#C9A24D]">
                  <Zap className="w-6 h-6" />
                  <h3 className="font-bold uppercase tracking-widest text-xs">Votre Destin 2026</h3>
                </div>
                <p className="text-[#FAF9F7] font-serif text-lg leading-relaxed">
                  "{getFuture(results.personalYear)}"
                </p>
              </motion.div>

            </div>
          )}
          
          {isRevealed && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5 }}
               className="mt-8 pt-8 border-t border-[#FAF9F7]/10"
             >
               <p className="text-sm text-[#8FA6A0] italic">
                 Ceci n'est que la surface. Votre rapport complet de 40 pages contient les clés pour déverrouiller tout ce potentiel.
               </p>
               <div className="mt-4 animate-bounce text-[#C9A24D]">
                 <ChevronDown className="w-6 h-6 mx-auto" />
               </div>
             </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
