
import { UserData, NumerologyResult } from '@/lib/types';
import { motion } from 'framer-motion';
import InclusionGridViz from '../InclusionGridViz';
import { 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Target, 
  Lightbulb,
  Compass,
  AlertTriangle,
  Award
} from 'lucide-react';
import { 
  getKarmicLessonContent, 
  getExcessNumberContent, 
  getBridgeContent, 
  getBalancedNumberContent, 
  getChallengeContent 
} from '@/lib/numerology/contentGenerator';
import { KARMIC_DEBT_DEFINITIONS } from '@/lib/numerology/definitions-karma';

export default function Part3KarmaV2({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const bridgeContent = getBridgeContent(results.bridgeNumber);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  // Calculate balanced numbers
  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const balancedNumbers = allNumbers.filter(n => 
    (!results.missingNumbers?.includes(n)) && 
    (!results.excessNumbers?.includes(n))
  );

  const debts = new Map<number, { origins: string[] }>();
  const checkDebt = (detail: any, name: string) => {
    if (detail?.karmicDebt) {
      if (!debts.has(detail.karmicDebt)) debts.set(detail.karmicDebt, { origins: [] });
      debts.get(detail.karmicDebt)?.origins.push(name);
    }
  };

  if (results.details) {
    checkDebt(results.details.lifePath, "Chemin de Vie");
    checkDebt(results.details.expression, "Expression");
    checkDebt(results.details.soulUrge, "Élan Spirituel");
    checkDebt(results.details.personality, "Moi Intime");
  }

  const majorChallenge = results.challenges?.major || 0;
  const majorChallengeContent = getChallengeContent(majorChallenge, 'major');

  return (
    <div className="space-y-32">
      {/* 1. LE MIROIR KARMIQUE (GRILLE) */}
      <section className="py-32 px-6 bg-[#FDFBF7] text-center space-y-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/cosmic-bg.png')] opacity-5 mix-blend-overlay"></div>
        
        <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
            <Compass className="w-4 h-4" />
            Radiographie de l'Âme
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Miroir Karmique</h2>
          <p className="text-[#1A1C2E]/60 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic">
            "La Grille d'Inclusion montre ce que vous avez emporté dans vos valises pour cette vie : vos acquis, vos manques et vos surplus."
          </p>
        </motion.div>
        
        <motion.div 
          {...fadeIn}
          className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[80px] border border-[#1A1C2E]/5 shadow-2xl relative z-10"
        >
          <InclusionGridViz 
            grid={results.inclusionGrid} 
            missing={results.missingNumbers} 
            excess={results.excessNumbers} 
          />
        </motion.div>
      </section>

      {/* 2. FORCES ACQUISES */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-100">
            <Award className="w-4 h-4" />
            Maîtrise Naturelle
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Vos Forces Acquises</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.excessNumbers && results.excessNumbers.length > 0 ? (
            results.excessNumbers.map(n => {
              const content = getExcessNumberContent(n);
              return (
                <motion.div 
                  key={n} 
                  {...fadeIn}
                  className="bg-white p-10 md:p-14 rounded-[60px] border border-[#1A1C2E]/5 shadow-xl space-y-8 group hover:scale-[1.02] transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-serif text-[#C9A24D] font-bold italic">{content.title}</h3>
                    <span className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">⚡</span>
                  </div>
                  <p className="text-xl text-[#1A1C2E] leading-relaxed font-light italic">
                    {content.desc}
                  </p>
                  <div className="p-8 bg-[#FAF9F7] rounded-[30px] border border-stone-100 space-y-4">
                    <p className="text-[#1A1C2E] italic text-lg leading-relaxed font-medium">
                      {content.potential}
                    </p>
                    <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-stone-200">
                      <AlertTriangle className="w-3 h-3" /> {content.warning}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-20 bg-white rounded-[60px] border border-stone-100 italic text-[#C9A24D] text-2xl font-light">
              Votre grille est remarquablement équilibrée.
            </div>
          )}
        </div>
      </section>

      {/* 3. ZONES D'ÉQUILIBRE */}
      {balancedNumbers.length > 0 && (
        <section className="px-6 max-w-6xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100">
              <ShieldCheck className="w-4 h-4" />
              Stabilité & Fluidité
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Zones d'Équilibre</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">Les énergies qui circulent sans friction.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {balancedNumbers.map(n => {
              const content = getBalancedNumberContent(n);
              return (
                <motion.div 
                  key={n} 
                  {...fadeIn}
                  className="bg-white p-10 md:p-14 rounded-[60px] border-l-8 border-emerald-400 shadow-xl space-y-6 hover:shadow-2xl transition-shadow"
                >
                  <h3 className="text-2xl md:text-3xl font-serif text-emerald-600 font-bold italic">{content.title}</h3>
                  <p className="text-emerald-800 text-lg font-bold italic">
                    {content.desc}
                  </p>
                  <p className="text-lg text-[#1A1C2E]/70 leading-relaxed font-light">
                    {content.meaning}
                  </p>
                  <p className="text-[#1A1C2E] italic text-lg border-t border-emerald-50 pt-6">
                    {content.benefit}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. DETTES KARMIQUES */}
      {debts.size > 0 && (
        <section className="px-6 max-w-6xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] border border-purple-100">
              <Activity className="w-4 h-4" />
              Mémoire d'Âme
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Dettes Karmiques</h2>
          </motion.div>
          
          <div className="space-y-12">
            {Array.from(debts.entries()).map(([debtNumber, info]) => {
              const def = KARMIC_DEBT_DEFINITIONS[debtNumber];
              if (!def) return null;
              return (
                <motion.div 
                  key={debtNumber} 
                  {...fadeIn}
                  className="bg-[#1A1C2E] p-12 md:p-20 rounded-[80px] border border-purple-500/20 shadow-2xl space-y-10 text-white relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-purple-300">
                      {def.title} : {def.subtitle}
                    </h3>
                    <div className="px-6 py-2 bg-purple-500/20 text-purple-200 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
                      Présent dans : {info.origins.join(', ')}
                    </div>
                  </div>
                  
                  <p className="text-2xl text-white/80 leading-relaxed font-light italic border-l-4 border-purple-500/50 pl-10 relative z-10">
                    {def.desc}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-12 relative z-10 pt-10 border-t border-white/10">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Le Défi</h4>
                      <p className="text-lg text-white/70 font-light leading-relaxed">{def.challenge}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Le Conseil</h4>
                      <p className="text-lg text-white/70 font-light leading-relaxed">{def.advice}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. LEÇONS KARMIQUES & EXERCICE */}
      <section className="px-6 max-w-6xl mx-auto space-y-32">
        <div className="space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em] border border-amber-100">
              <Zap className="w-4 h-4" />
              Évolution de l'Être
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Leçons Karmiques</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">Les fréquences à intégrer pour votre évolution.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.missingNumbers && results.missingNumbers.length > 0 ? (
              results.missingNumbers.map(n => {
                const content = getKarmicLessonContent(n);
                return (
                  <motion.div 
                    key={n} 
                    {...fadeIn}
                    className="bg-white p-10 md:p-14 rounded-[60px] border-l-8 border-red-400 shadow-xl space-y-6"
                  >
                    <h3 className="text-2xl md:text-3xl font-serif text-red-500 font-bold italic">{content.title}</h3>
                    <p className="text-red-600/60 text-[10px] font-black uppercase tracking-[0.3em]">
                      Fréquence manquante : {n}
                    </p>
                    <p className="text-xl text-[#1A1C2E] leading-relaxed font-light italic">
                      {content.lesson}
                    </p>
                    <div className="p-8 bg-red-50/50 rounded-[30px] border border-red-100 flex items-start gap-4">
                       <span className="text-red-500 text-2xl">⚡</span>
                       <p className="text-[#1A1C2E]/80 italic text-lg leading-relaxed font-medium">{content.advice}</p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 bg-white p-16 border-l-8 border-emerald-500 shadow-xl rounded-[60px] text-center space-y-6">
                <h3 className="text-4xl font-serif text-emerald-600 font-bold italic">Karma Libre</h3>
                <p className="text-xl text-emerald-700 font-light leading-relaxed max-w-2xl mx-auto">
                  Vous n'avez pas de dettes karmiques majeures. Vous êtes venu(e) perfectionner vos acquis.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Exercice de Déblocage */}
        <motion.div 
          {...fadeIn}
          className="bg-[#1A1C2E] p-12 md:p-20 rounded-[80px] shadow-2xl space-y-12 relative overflow-hidden text-white"
        >
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#C9A24D]/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
                <Lightbulb className="w-4 h-4" />
                Action Prioritaire
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold italic">Exercice de Déblocage</h3>
            </div>
            
            <p className="text-2xl text-white/60 font-light leading-relaxed max-w-3xl italic">
              "Pour activer votre plein potentiel et dépasser votre frein principal (Défi Majeur {majorChallenge}), voici une action concrète à pratiquer dès aujourd'hui."
            </p>
            
            <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-xl space-y-8 border border-white/5 text-[#1A1C2E]">
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#C9A24D] uppercase tracking-[0.4em]">Le Défi de l'Expression</h4>
                <h5 className="text-3xl md:text-5xl font-serif font-bold italic">{majorChallengeContent.exercise?.title}</h5>
              </div>
              
              <p className="text-2xl md:text-3xl text-[#1A1C2E] font-medium leading-relaxed italic border-l-4 border-[#C9A24D] pl-10">
                {majorChallengeContent.exercise?.action}
              </p>
              
              <div className="pt-8 border-t border-stone-100 flex items-center gap-4 text-stone-400">
                <Target className="w-5 h-5 text-[#C9A24D]" />
                <p className="text-lg font-light italic">
                  <span className="font-bold text-[#1A1C2E]/60">Pourquoi ?</span> {majorChallengeContent.exercise?.why}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. MOI SUBCONSCIENT */}
      <section className="max-w-4xl mx-auto py-32 text-center space-y-16">
        <motion.div {...fadeIn} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
            <Activity className="w-4 h-4" />
            L'Instinct Profond
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Moi Subconscient</h2>
        </motion.div>
        
        <motion.div 
          {...fadeIn}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-[#C9A24D] blur-[100px] opacity-20 animate-pulse" />
          <div className="text-[12rem] md:text-[18rem] font-serif text-[#C9A24D] leading-none relative z-10">{results.subconsciousSelf}</div>
        </motion.div>
        
        <motion.p 
          {...fadeIn}
          className="text-2xl md:text-4xl max-w-4xl mx-auto text-[#1A1C2E] font-light italic leading-relaxed"
        >
          "Avec un résultat de {results.subconsciousSelf}, votre réaction face aux imprévus est {results.subconsciousSelf >= 7 ? "empreinte de recul et de maturité" : "instinctive et rapide"}. 
          {results.subconsciousSelf >= 7 
            ? " Vous avez cette capacité naturelle à ne pas vous laisser submerger par l'émotion immédiate." 
            : " Vous ressentez les choses intensément et réagissez souvent dans l'instant, avec spontanéité."}"
        </motion.p>
      </section>

      {/* 7. LE PONT */}
      <section className="px-6 max-w-6xl mx-auto py-32">
        <div className="bg-white p-12 md:p-24 rounded-[100px] border border-[#1A1C2E]/5 shadow-2xl space-y-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-[#FAF9F7]/50 to-transparent" />
          
          <motion.div {...fadeIn} className="text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4" />
              Réconciliation Intérieure
            </div>
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-[#1A1C2E]">Le Pont</h2>
            <p className="text-[#1A1C2E]/60 text-xl md:text-3xl font-light italic leading-relaxed max-w-3xl mx-auto">
              "La clé pour harmoniser votre être intérieur et votre action."
            </p>
          </motion.div>
          
          <div className="flex flex-col items-center space-y-16 relative z-10">
            <div className="flex items-center gap-8 md:gap-20 text-3xl md:text-4xl font-serif text-[#8FA6A0] italic">
              <div className="text-center group">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-stone-300 group-hover:text-[#C9A24D] transition-colors">Chemin</div>
                <div className="font-bold text-[#1A1C2E] text-5xl md:text-7xl">{results.lifePath}</div>
              </div>
              <motion.div 
                animate={{ width: [40, 100, 40] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="h-px bg-stone-200" 
              />
              <div className="text-center group">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-stone-300 group-hover:text-[#C9A24D] transition-colors">Expression</div>
                <div className="font-bold text-[#1A1C2E] text-5xl md:text-7xl">{results.expression}</div>
              </div>
            </div>
            
            <motion.div 
              {...fadeIn}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#C9A24D] blur-[80px] opacity-20" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 border-2 border-[#C9A24D]/30 rounded-full flex flex-col items-center justify-center bg-white shadow-2xl">
                <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-[0.5em] mb-6">LE PONT</div>
                <span className="text-9xl md:text-[10rem] font-serif font-black text-[#1A1C2E] leading-none">{results.bridgeNumber}</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-20 border-t border-stone-100 relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-stone-400">
                <Activity className="w-5 h-5" />
                <h4 className="text-[10px] font-black text-[#1A1C2E] uppercase tracking-[0.3em]">Symptômes de désalignement</h4>
              </div>
              <p className="text-2xl text-[#1A1C2E]/70 leading-relaxed font-light italic">
                {bridgeContent.symptoms}
              </p>
            </div>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-[#C9A24D]">
                <Zap className="w-5 h-5" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">La Solution</h4>
              </div>
              <div className="bg-[#FAF9F7] p-10 rounded-[40px] border border-stone-100 space-y-4">
                <h3 className="text-3xl font-serif font-bold italic text-[#1A1C2E]">{bridgeContent.title}</h3>
                <p className="text-2xl text-[#C9A24D] font-serif font-bold italic">"{bridgeContent.mantra}"</p>
                <p className="text-xl text-[#1A1C2E] leading-relaxed font-medium pt-4">
                  {bridgeContent.desc} {bridgeContent.action}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
