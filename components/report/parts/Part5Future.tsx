
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { getPersonalYearContent } from '@/lib/numerology/contentGenerator';

export default function Part5Future({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const pyContent = getPersonalYearContent(results.personalYear);

  return (
    <>
      {/* PAGE 31: CYCLES DE VIE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Vos Cycles de Vie
        </h2>
        <div className="space-y-8 md:space-y-12">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            <div className="w-32 text-left md:text-right font-serif text-[#d6d3d1]">0 - 28 ans</div>
            <div className="flex-1 w-full md:w-auto h-2 bg-[#292524] rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-[#fbbf24] rounded-full"></div>
            </div>
            <div className="w-32 font-bold text-[#fbbf24]">Cycle Formatif</div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            <div className="w-32 text-left md:text-right font-serif text-[#d6d3d1]">28 - 56 ans</div>
            <div className="flex-1 w-full md:w-auto h-2 bg-[#292524] rounded-full relative">
              <div className="absolute top-0 left-1/3 h-full w-1/3 bg-[#d97706] rounded-full"></div>
            </div>
            <div className="w-32 font-bold text-[#fbbf24]">Cycle Productif</div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center">
            <div className="w-32 text-left md:text-right font-serif text-[#d6d3d1]">56+ ans</div>
            <div className="flex-1 w-full md:w-auto h-2 bg-[#292524] rounded-full relative">
              <div className="absolute top-0 left-2/3 h-full w-1/3 bg-[#78350f] rounded-full"></div>
            </div>
            <div className="w-32 font-bold text-[#fbbf24]">Cycle Sagesse</div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 p-6 md:p-8 bg-[#292524] border border-[#fbbf24]/20 rounded-xl">
          <h3 className="text-xl md:text-2xl font-serif text-[#fbbf24] mb-4">Votre Cycle Actuel</h3>
          <p className="text-[#d6d3d1] text-sm md:text-base">
            Vous êtes actuellement dans une phase influencée par la vibration du nombre {results.cycles.cycle2}.
            C'est un temps pour construire et consolider. (Texte générique, à enrichir avec logique de cycles).
          </p>
        </div>
      </PageContainer>

      {/* PAGE 32: ANNEE PERSONNELLE */}
      <PageContainer className="p-4 md:p-16 justify-center items-center text-center bg-[#1c1917]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8">Année Personnelle</h2>
        <div className="text-[8rem] md:text-[12rem] font-serif text-[#fbbf24] leading-none mb-8">{results.personalYear}</div>
        <h3 className="text-xl md:text-2xl uppercase tracking-widest text-[#a8a29e] mb-8">Vibration {new Date().getFullYear()}</h3>
        <p className="text-base md:text-xl max-w-4xl mx-auto text-[#d6d3d1] whitespace-pre-wrap leading-relaxed">
          {pyContent}
        </p>
      </PageContainer>

      {/* PAGE 33-34: TABLEAU PREVISIONNEL 10 ANS (Module 4) */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 border-b border-[#fbbf24] pb-4 inline-block">
          Vision Décennale (2026-2035)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#fbbf24]/30 text-[#fbbf24]">
                <th className="p-4 font-serif text-lg">Année</th>
                <th className="p-4 font-serif text-lg">Année Personnelle</th>
                <th className="p-4 font-serif text-lg">Énergie Dominante</th>
              </tr>
            </thead>
            <tbody className="text-[#d6d3d1]">
              {results.careerForecast?.map((item) => (
                <tr key={item.year} className="border-b border-[#292524] hover:bg-[#292524]/50 transition-colors">
                  <td className="p-4 font-bold">{item.year}</td>
                  <td className="p-4">
                    <span className="inline-block w-8 h-8 rounded-full bg-[#fbbf24]/10 text-[#fbbf24] text-center leading-8 font-bold border border-[#fbbf24]/30">
                      {item.personalYear}
                    </span>
                  </td>
                  <td className="p-4 text-sm md:text-base opacity-90">
                    {item.personalYear === 1 ? "Nouveau Départ, Initiative" :
                     item.personalYear === 2 ? "Collaboration, Patience" :
                     item.personalYear === 3 ? "Expression, Créativité" :
                     item.personalYear === 4 ? "Construction, Travail" :
                     item.personalYear === 5 ? "Changement, Liberté" :
                     item.personalYear === 6 ? "Responsabilité, Famille" :
                     item.personalYear === 7 ? "Réflexion, Spiritualité" :
                     item.personalYear === 8 ? "Pouvoir, Réussite" : "Bilan, Fin de cycle"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageContainer>

      {/* PAGE 35-36: ORIENTATION PRO */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Orientation Professionnelle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {results.professionalAxes.map((axis, i) => (
            <div key={i} className="p-8 border border-[#fbbf24]/30 rounded-xl hover:bg-[#292524] transition-colors">
              <h3 className="text-xl md:text-2xl font-serif text-[#fef3c7] mb-4">{axis}</h3>
              <p className="text-[#d6d3d1] text-sm md:text-base">
                Ce secteur résonne naturellement avec vos nombres. Vous y trouverez fluidité et reconnaissance.
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
      
      <PageContainer className="p-4 md:p-16 bg-[#292524] border-l-[8px] md:border-l-[12px] border-[#0ea5e9]">
         <h2 className="text-2xl md:text-4xl font-serif text-[#38bdf8] mb-8 md:mb-12">Environnement Idéal</h2>
         <p className="text-base md:text-lg text-[#38bdf8]/80 mb-8">
           Pour vous épanouir pleinement, votre environnement de travail doit respecter ces critères :
         </p>
         <ul className="grid grid-cols-1 gap-4">
           <li className="flex items-center gap-4 p-4 bg-[#1c1917] rounded-lg shadow-sm border border-[#0ea5e9]/20">
             <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
             <span className="text-[#e0f2fe] text-sm md:text-base">Autonomie dans la gestion du temps (Besoin du {results.lifePath})</span>
           </li>
           <li className="flex items-center gap-4 p-4 bg-[#1c1917] rounded-lg shadow-sm border border-[#0ea5e9]/20">
             <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
             <span className="text-[#e0f2fe] text-sm md:text-base">Possibilité d'exprimer vos idées (Besoin du {results.expression})</span>
           </li>
           <li className="flex items-center gap-4 p-4 bg-[#1c1917] rounded-lg shadow-sm border border-[#0ea5e9]/20">
             <div className="w-2 h-2 bg-[#0ea5e9] rounded-full"></div>
             <span className="text-[#e0f2fe] text-sm md:text-base">Sens et contribution éthique (Besoin du {results.soulUrge})</span>
           </li>
         </ul>
      </PageContainer>
    </>
  );
}
