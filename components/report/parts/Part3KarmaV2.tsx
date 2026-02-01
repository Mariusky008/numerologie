
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import InclusionGridViz from '../InclusionGridViz';
import { getKarmicLessonContent, getExcessNumberContent, getBridgeContent, getBalancedNumberContent, getChallengeContent } from '@/lib/numerology/contentGenerator';
import { KARMIC_DEBT_DEFINITIONS } from '@/lib/numerology/definitions-karma';

export default function Part3KarmaV2({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const bridgeContent = getBridgeContent(results.bridgeNumber);
  
  // Calculate balanced numbers (neither missing nor excess)
  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const balancedNumbers = allNumbers.filter(n => 
    (!results.missingNumbers?.includes(n)) && 
    (!results.excessNumbers?.includes(n))
  );

  // Identify Karmic Debts from Core Numbers
  const debts = new Map<number, { origins: string[] }>();
  const checkDebt = (detail: any, name: string) => {
    if (detail?.karmicDebt) {
      if (!debts.has(detail.karmicDebt)) {
        debts.set(detail.karmicDebt, { origins: [] });
      }
      debts.get(detail.karmicDebt)?.origins.push(name);
    }
  };

  if (results.details) {
    checkDebt(results.details.lifePath, "Chemin de Vie");
    checkDebt(results.details.expression, "Expression");
    checkDebt(results.details.soulUrge, "Élan Spirituel");
    checkDebt(results.details.personality, "Moi Intime");
  }

  // Get major challenge for exercise
  const majorChallenge = results.challenges?.major || 0;
  const majorChallengeContent = getChallengeContent(majorChallenge, 'major');

  return (
    <div className="space-y-32">
      {/* 1. LE MIROIR KARMIQUE (GRILLE) */}
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Miroir Karmique</h2>
          <p className="text-[#1A1C2E]/60 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            La Grille d'Inclusion est la radiographie de votre âme. Elle montre ce que vous avez emporté dans vos valises pour cette vie.
          </p>
        </div>
        
        <div className="bg-white p-12 md:p-20 rounded-[80px] border border-stone-100 shadow-2xl">
          <InclusionGridViz 
            grid={results.inclusionGrid} 
            missing={results.missingNumbers} 
            excess={results.excessNumbers} 
          />
        </div>
      </div>

      {/* 2. FORCES ACQUISES */}
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Vos Forces Acquises</h2>
          <p className="text-[#1A1C2E]/60 text-xl font-light">Les talents que vous maîtrisez naturellement.</p>
        </div>

        <div className="space-y-8">
          {results.excessNumbers && results.excessNumbers.length > 0 ? (
            results.excessNumbers.map(n => {
              const content = getExcessNumberContent(n);
              return (
                <div key={n} className="bg-white p-12 md:p-16 border-l-8 border-[#C9A24D] shadow-xl rounded-[40px] space-y-6 group hover:scale-[1.02] transition-all">
                  <h3 className="text-3xl md:text-4xl font-serif text-[#C9A24D] font-bold italic">{content.title}</h3>
                  <p className="text-xl text-[#1A1C2E] leading-relaxed font-light">
                    {content.desc}
                  </p>
                  <div className="p-8 bg-[#FAF9F7] rounded-[30px] border border-stone-100 space-y-4">
                    <p className="text-[#1A1C2E] italic text-lg leading-relaxed">
                      {content.potential}
                    </p>
                    <p className="text-[#C9A24D] text-xs font-black uppercase tracking-widest">
                      ⚠️ {content.warning}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-2xl text-center italic text-[#C9A24D] font-light">
              Votre grille est remarquablement équilibrée. Vous ne dépendez pas d'une seule force dominante.
            </p>
          )}
        </div>
      </div>

      {/* 3. ZONES D'ÉQUILIBRE */}
      {balancedNumbers.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Zones d'Équilibre</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">Les énergies qui circulent sans friction.</p>
          </div>
          
          <div className="space-y-8">
            {balancedNumbers.map(n => {
              const content = getBalancedNumberContent(n);
              return (
                <div key={n} className="bg-white p-12 md:p-16 border-l-8 border-green-500 shadow-xl rounded-[40px] space-y-6">
                  <h3 className="text-3xl md:text-4xl font-serif text-green-600 font-bold italic">{content.title}</h3>
                  <p className="text-green-800 text-xl font-medium">
                    {content.desc}
                  </p>
                  <p className="text-lg text-[#1A1C2E]/70 leading-relaxed font-light">
                    {content.meaning}
                  </p>
                  <p className="text-[#1A1C2E] italic text-lg border-t border-green-100 pt-6">
                    {content.benefit}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. DETTES KARMIQUES */}
      {debts.size > 0 && (
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Dettes Karmiques</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Ces nombres indiquent des leçons spécifiques qui demandent une attention particulière aujourd'hui.
            </p>
          </div>
          
          <div className="space-y-12">
            {Array.from(debts.entries()).map(([debtNumber, info]) => {
              const def = KARMIC_DEBT_DEFINITIONS[debtNumber];
              if (!def) return null;
              
              return (
                <div key={debtNumber} className="bg-[#1A1C2E] p-12 md:p-20 rounded-[80px] border border-purple-800 shadow-2xl space-y-10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-purple-300">
                      {def.title} : {def.subtitle}
                    </h3>
                    <div className="px-6 py-2 bg-purple-500/20 text-purple-200 rounded-full text-xs font-black uppercase tracking-widest border border-purple-500/30">
                      Présent dans : {info.origins.join(', ')}
                    </div>
                  </div>
                  
                  <p className="text-2xl text-white/80 leading-relaxed font-light italic border-l-4 border-purple-500/50 pl-10 relative z-10">
                    {def.desc}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-12 relative z-10 pt-10 border-t border-white/10">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest">Le Défi</h4>
                      <p className="text-lg text-white/70 font-light leading-relaxed">{def.challenge}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest">Le Conseil</h4>
                      <p className="text-lg text-white/70 font-light leading-relaxed">{def.advice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. LEÇONS KARMIQUES */}
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Leçons Karmiques</h2>
          <p className="text-[#1A1C2E]/60 text-xl font-light">Les fréquences à intégrer pour votre évolution.</p>
        </div>
        
        {/* Exercice de Déblocage */}
        <div className="bg-[#FDFBF7] p-12 md:p-20 rounded-[80px] border-2 border-[#C9A24D] shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 text-[15rem] opacity-5 pointer-events-none">💡</div>
          <div className="relative z-10 space-y-6 text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-serif text-[#C9A24D] font-bold italic">
              Exercice de Déblocage
            </h3>
            <p className="text-xl text-[#1A1C2E]/70 font-light leading-relaxed">
              Pour activer votre plein potentiel et dépasser votre frein principal (Défi Majeur {majorChallenge}), voici une action concrète à pratiquer :
            </p>
            
            <div className="bg-white p-10 rounded-[40px] shadow-xl space-y-6 border border-stone-100">
              <h4 className="text-2xl font-serif font-bold text-[#1A1C2E] italic">{majorChallengeContent.exercise?.title}</h4>
              <p className="text-2xl text-[#1A1C2E] font-medium leading-relaxed">
                {majorChallengeContent.exercise?.action}
              </p>
              <p className="text-lg text-[#1A1C2E]/50 italic font-light border-t border-stone-100 pt-6">
                Pourquoi ? {majorChallengeContent.exercise?.why}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {results.missingNumbers && results.missingNumbers.length > 0 ? (
            results.missingNumbers.map(n => {
              const content = getKarmicLessonContent(n);
              return (
                <div key={n} className="bg-white p-12 md:p-16 border-l-8 border-red-400 shadow-xl rounded-[40px] space-y-6">
                  <h3 className="text-3xl md:text-4xl font-serif text-red-500 font-bold italic">{content.title}</h3>
                  <p className="text-red-600 text-xl font-bold uppercase tracking-widest text-xs">
                    {content.desc}
                  </p>
                  <p className="text-xl text-[#1A1C2E] leading-relaxed font-light">
                    {content.lesson}
                  </p>
                  <div className="p-8 bg-red-50 rounded-[30px] border border-red-100 flex items-start gap-4">
                     <span className="text-red-600 text-2xl">⚡</span>
                     <p className="text-[#1A1C2E] italic text-lg leading-relaxed">{content.advice}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-16 border-l-8 border-green-500 shadow-xl rounded-[60px] text-center space-y-6">
              <h3 className="text-4xl font-serif text-green-600 font-bold italic">Karma Libre</h3>
              <p className="text-xl text-green-700 font-light leading-relaxed max-w-2xl mx-auto">
                Vous n'avez pas de dettes karmiques majeures dans votre grille d'inclusion. Vous êtes venu(e) perfectionner vos acquis plutôt que de combler des manques.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 6. MOI SUBCONSCIENT */}
      <div className="max-w-4xl mx-auto py-32 text-center space-y-12">
        <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Moi Subconscient</h2>
        <div className="text-[12rem] md:text-[18rem] font-serif text-[#C9A24D] leading-none">{results.subconsciousSelf}</div>
        
        <p className="text-2xl md:text-3xl max-w-3xl mx-auto text-[#1A1C2E] font-light italic leading-relaxed">
          "Avec un résultat de {results.subconsciousSelf}, votre réaction face aux imprévus est {results.subconsciousSelf >= 7 ? "empreinte de recul et de maturité" : "instinctive et rapide"}. 
          {results.subconsciousSelf >= 7 
            ? " Vous avez cette capacité naturelle à ne pas vous laisser submerger par l'émotion immédiate." 
            : " Vous ressentez les choses intensément et réagissez souvent dans l'instant, avec spontanéité."}"
        </p>
      </div>

      {/* 7. LE PONT */}
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Pont de Réconciliation</h2>
          <p className="text-[#1A1C2E]/60 text-xl font-light">La clé pour harmoniser votre être intérieur et votre action.</p>
        </div>
        
        <div className="bg-white p-12 md:p-20 rounded-[80px] border border-stone-100 shadow-2xl space-y-16">
          <div className="flex flex-col items-center space-y-12">
            <div className="flex items-center gap-12 text-2xl font-serif text-[#8FA6A0] italic">
              <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-widest mb-2">Chemin</div>
                <div className="font-bold text-[#1A1C2E]">{results.lifePath}</div>
              </div>
              <div className="h-px w-24 bg-[#C9A24D]/30"></div>
              <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-widest mb-2">Expression</div>
                <div className="font-bold text-[#1A1C2E]">{results.expression}</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-[#C9A24D] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <div className="relative w-64 h-64 border-4 border-[#C9A24D] rounded-full flex flex-col items-center justify-center bg-white shadow-2xl transition-transform duration-700 group-hover:scale-110">
                <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-[0.5em] mb-4">LE PONT</div>
                <span className="text-8xl font-black text-[#1A1C2E]">{results.bridgeNumber}</span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1C2E] italic">{bridgeContent.title}</h3>
              <p className="text-2xl text-[#C9A24D] font-serif font-bold italic">"{bridgeContent.mantra}"</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 pt-16 border-t border-stone-100">
            <div className="space-y-6">
              <div className="text-xs font-black text-[#1A1C2E] uppercase tracking-widest">Quand l'utiliser ?</div>
              <p className="text-xl text-[#1A1C2E]/70 leading-relaxed font-light italic">
                {bridgeContent.symptoms}
              </p>
            </div>
            <div className="space-y-6">
              <div className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">La Solution</div>
              <p className="text-xl text-[#1A1C2E] leading-relaxed font-medium">
                {bridgeContent.desc} {bridgeContent.action}
              </p>
            </div>
          </div>
          
          <p className="text-center text-lg text-[#8FA6A0] italic max-w-2xl mx-auto pt-10 border-t border-stone-50">
            "Le nombre du Pont est la pièce manquante qui transforme la friction entre ce que vous êtes et ce que vous vivez en une force propulsive."
          </p>
        </div>
      </div>
    </div>
  );
}
