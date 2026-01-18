
import { useEffect, useState } from 'react';
import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';
import { getNameAnalysis as getFallbackAnalysis } from '@/lib/numerology/etymology';
import { fetchNameAnalysis, NameData } from '@/lib/numerology/db_etymology';

export default function Part1Identity({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const firstNames = userData.firstName.split(' ').filter(n => n.trim().length > 0);
  const lastName = userData.lastName;
  const [analyses, setAnalyses] = useState<Record<string, any>>({});

  useEffect(() => {
    async function loadData() {
      const newAnalyses: Record<string, any> = {};
      
      for (const name of firstNames) {
        // Try DB first
        const dbData = await fetchNameAnalysis(name);
        
        if (dbData) {
          newAnalyses[name] = {
            origin: dbData.origin,
            meaning: dbData.meaning,
            vibration: dbData.spiritual || "Vibration spirituelle élevée."
          };
        } else {
          // Fallback to local algo
          newAnalyses[name] = getFallbackAnalysis(name);
        }
      }
      setAnalyses(newAnalyses);
    }
    loadData();
  }, [userData.firstName]);

  return (
    <>
      {/* PAGE 4: ANALYSE PRENOMS */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Identité Profonde & Étymologie
        </h2>
        
        <div className="space-y-8">
          <p className="text-base md:text-xl text-[#2C2F4A] italic">
            "Votre nom est le premier mantra que l'univers a chanté pour vous."
          </p>
          
          <div className="grid grid-cols-1 gap-6">
            {firstNames.map((name, i) => {
              const analysis = analyses[name] || getFallbackAnalysis(name); // Immediate fallback while loading
              
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-[#C9A24D]/20 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] capitalize">{name}</h3>
                    <span className="text-xs text-[#8FA6A0] border border-[#8FA6A0]/30 px-2 py-1 rounded max-w-[50%] text-right truncate">
                      {analysis.origin}
                    </span>
                  </div>
                  <div className="text-sm md:text-base text-[#2C2F4A] mb-2 italic">
                    "{analysis.meaning}"
                  </div>
                  <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed">
                    {analysis.vibration}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>

      {/* PAGE 5: NOM DE FAMILLE & SIGNATURE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Héritage & Signature
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl border-l-4 border-[#C9A24D] shadow-sm">
            <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] mb-4">Le Nom : {lastName}</h3>
            <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed">
              Votre nom de famille représente votre héritage, vos racines et la mémoire de votre lignée.
              C'est le bagage avec lequel vous voyagez, contenant les forces et les défis de vos ancêtres.
            </p>
          </div>
          
          <div className="bg-[#fffcf5] p-8 rounded-xl border border-[#C9A24D]/30">
            <h3 className="text-xl md:text-2xl font-serif text-[#2C2F4A] mb-4">Signature Anthroponymique</h3>
            <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed mb-6">
              La fusion de vos prénoms et nom crée une fréquence unique, votre "code-barres" spirituel.
            </p>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#C9A24D]/10">
              <div className="text-4xl md:text-6xl font-serif text-[#C9A24D] mb-2">{results.expression}</div>
              <div className="text-xs md:text-sm text-[#8FA6A0] uppercase">
                Vibration Globale
                {results.details?.expression.subNumber && results.details.expression.subNumber !== results.expression && (
                  <span className="block text-[#C9A24D]/60 mt-1 font-mono">
                    (Issu du {results.details.expression.subNumber})
                  </span>
                )}
                {results.details?.expression.karmicDebt && (
                  <span className="block text-red-600 font-bold mt-1 text-xs bg-red-50 py-1 px-2 rounded-full inline-block">
                    Dette Karmique {results.details.expression.karmicDebt}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PLANS D'EXPRESSION */}
        {results.planesOfExpression && (
          <div className="mt-8 bg-white p-8 rounded-xl border border-[#C9A24D]/20 shadow-sm">
            <h3 className="text-xl md:text-2xl font-serif text-[#2C2F4A] mb-6 border-b border-[#C9A24D]/20 pb-2">
              Vos Plans d'Expression
            </h3>
            <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed mb-6 italic">
              Comment votre énergie se manifeste-t-elle au quotidien ?
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Mental */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest mb-1 text-[#2C2F4A]">
                  <span>Mental</span>
                  <span className="font-bold text-[#C9A24D]">{results.planesOfExpression.mental}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div style={{ width: `${results.planesOfExpression.mental}%` }} className="h-full bg-blue-400 print:bg-blue-600" />
                </div>
              </div>
              {/* Physique */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest mb-1 text-[#2C2F4A]">
                  <span>Physique</span>
                  <span className="font-bold text-[#C9A24D]">{results.planesOfExpression.physical}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div style={{ width: `${results.planesOfExpression.physical}%` }} className="h-full bg-red-400 print:bg-red-600" />
                </div>
              </div>
              {/* Émotionnel */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest mb-1 text-[#2C2F4A]">
                  <span>Émotionnel</span>
                  <span className="font-bold text-[#C9A24D]">{results.planesOfExpression.emotional}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div style={{ width: `${results.planesOfExpression.emotional}%` }} className="h-full bg-green-400 print:bg-green-600" />
                </div>
              </div>
              {/* Intuitif */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest mb-1 text-[#2C2F4A]">
                  <span>Intuitif</span>
                  <span className="font-bold text-[#C9A24D]">{results.planesOfExpression.intuitive}%</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div style={{ width: `${results.planesOfExpression.intuitive}%` }} className="h-full bg-purple-400 print:bg-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </>
  );
}
