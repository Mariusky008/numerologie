
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { getPersonalYearContent, getCycleContent, getExpressionContent } from '@/lib/numerology/contentGenerator';

export default function Part5Future({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const pyContent = getPersonalYearContent(results.personalYear);
  const expContent = getExpressionContent(results.expression);
  
  // Calculate Cycle Ranges
  const birthYear = new Date(userData.birthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  
  const c1End = 36 - results.lifePath;
  const c2End = c1End + 27;
  
  // Determine Current Cycle
  let currentCycleNum = results.cycles.cycle1;
  let currentCycleName = "Cycle Formatif";
  
  if (age > c1End && age <= c2End) {
    currentCycleNum = results.cycles.cycle2;
    currentCycleName = "Cycle Productif";
  } else if (age > c2End) {
    currentCycleNum = results.cycles.cycle3; // Assuming cycle3 corresponds to the last cycle in the results object structure if available, otherwise fallback logic
    // Actually results.cycles usually has cycle1, cycle2, cycle3. Let's assume standard 3 cycles.
    // Wait, type definition says cycle1, cycle2, cycle3, cycle4? 
    // Standard is 3 Major Cycles. 
    currentCycleNum = results.cycles.cycle3;
    currentCycleName = "Cycle de Sagesse";
  }
  
  const cycleContent = getCycleContent(currentCycleNum);

  return (
    <>
      {/* PAGE 31: CYCLES DE VIE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
          Vos Cycles de Vie
        </h2>
        <div className="space-y-8 md:space-y-12">
          <div className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${age <= c1End ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-32 text-left md:text-right font-serif text-[#57534e]">0 - {c1End} ans</div>
            <div className="flex-1 w-full md:w-auto h-2 bg-stone-200 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-full bg-[#f59e0b] rounded-full"></div>
            </div>
            <div className="w-32 font-bold text-[#d97706]">Cycle Formatif ({results.cycles.cycle1})</div>
          </div>
          <div className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${age > c1End && age <= c2End ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-32 text-left md:text-right font-serif text-[#57534e]">{c1End} - {c2End} ans</div>
            <div className="flex-1 w-full md:w-auto h-2 bg-stone-200 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-full bg-[#ea580c] rounded-full"></div>
            </div>
            <div className="w-32 font-bold text-[#d97706]">Cycle Productif ({results.cycles.cycle2})</div>
          </div>
          <div className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${age > c2End ? 'opacity-100' : 'opacity-50'}`}>
            <div className="w-32 text-left md:text-right font-serif text-[#57534e]">{c2End}+ ans</div>
            <div className="flex-1 w-full md:w-auto h-2 bg-stone-200 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-full bg-[#78350f] rounded-full"></div>
            </div>
            <div className="w-32 font-bold text-[#d97706]">Cycle Sagesse ({results.cycles.cycle3})</div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 p-6 md:p-8 bg-white border border-[#d97706]/20 rounded-xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#d97706]"></div>
          <h3 className="text-xl md:text-2xl font-serif text-[#d97706] mb-2">Vous êtes ici : {currentCycleName}</h3>
          <h4 className="text-lg font-bold text-[#78350f] mb-4">{cycleContent.title}</h4>
          <p className="text-[#57534e] text-sm md:text-base mb-4 leading-relaxed">
            {cycleContent.desc}
          </p>
           <p className="text-[#57534e] text-sm md:text-base italic bg-[#fffbf0] p-4 rounded-lg">
            {cycleContent.detailed}
          </p>
        </div>
      </PageContainer>

      {/* PAGE 32: ANNEE PERSONNELLE */}
      <PageContainer className="p-4 md:p-16 justify-center items-center text-center bg-[#fffbf0]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8">Année Personnelle</h2>
        <div className="text-[8rem] md:text-[12rem] font-serif text-[#d97706] leading-none mb-8">{results.personalYear}</div>
        <h3 className="text-xl md:text-2xl uppercase tracking-widest text-[#a8a29e] mb-8">Vibration {new Date().getFullYear()}</h3>
        <p className="text-base md:text-xl max-w-4xl mx-auto text-[#57534e] whitespace-pre-wrap leading-relaxed">
          {pyContent}
        </p>

        {results.transits && (
          <div className="w-full max-w-4xl mt-12 pt-8 border-t border-[#d97706]/20">
            <h3 className="text-xl md:text-2xl font-serif text-[#78350f] mb-6 text-center">Météo Vibratoire (Transits)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm text-center">
                <div className="text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Plan Physique</div>
                <div className="text-4xl font-serif text-[#d97706] mb-2">{results.transits.physical}</div>
                <p className="text-xs text-[#57534e]">Influence sur votre santé et vos actions concrètes.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm text-center">
                <div className="text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Plan Mental</div>
                <div className="text-4xl font-serif text-[#d97706] mb-2">{results.transits.mental}</div>
                <p className="text-xs text-[#57534e]">Influence sur vos pensées et vos projets intellectuels.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm text-center">
                <div className="text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Plan Spirituel</div>
                <div className="text-4xl font-serif text-[#d97706] mb-2">{results.transits.spiritual}</div>
                <p className="text-xs text-[#57534e]">Influence sur votre âme et votre évolution intérieure.</p>
              </div>
            </div>
          </div>
        )}
      </PageContainer>

      {/* PAGE 33-34: TABLEAU PREVISIONNEL 10 ANS (Module 4) */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 border-b border-[#d97706] pb-4 inline-block">
          Vision Décennale (2026-2035)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d97706]/30 text-[#d97706]">
                <th className="p-4 font-serif text-lg">Année</th>
                <th className="p-4 font-serif text-lg">Année Personnelle</th>
                <th className="p-4 font-serif text-lg">Énergie Dominante</th>
              </tr>
            </thead>
            <tbody className="text-[#57534e]">
              {results.careerForecast?.map((item) => (
                <tr key={item.year} className="border-b border-stone-200 hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-bold">{item.year}</td>
                  <td className="p-4">
                    <span className="inline-block w-8 h-8 rounded-full bg-[#fffbf0] text-[#d97706] text-center leading-8 font-bold border border-[#d97706]/30">
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

      {/* PAGE 35: ORIENTATION PRO & ENVIRONNEMENT (Consolidated) */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 border-b-2 border-[#d97706] pb-4 inline-block">
          Orientation Professionnelle
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {results.professionalAxes.map((axis, i) => (
            <div key={i} className="p-6 border border-stone-200 rounded-xl hover:bg-white hover:shadow-md transition-all bg-[#fffbf0]">
              <h3 className="text-lg md:text-xl font-serif text-[#78350f] mb-2">{axis}</h3>
              <p className="text-[#57534e] text-xs md:text-sm">
                Ce secteur résonne naturellement avec vos nombres. Vous y trouverez fluidité et reconnaissance.
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#f0f9ff] p-6 rounded-xl border border-[#0ea5e9]/20">
           <h3 className="text-xl font-serif text-[#0369a1] mb-4">Environnement Idéal</h3>
           <p className="text-sm text-[#0284c7] mb-4">
             Pour vous épanouir pleinement, votre environnement de travail doit respecter ces critères :
           </p>
           <ul className="grid grid-cols-1 gap-3">
             <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-[#0ea5e9]/20">
               <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full"></div>
               <span className="text-[#334155] text-xs md:text-sm">Autonomie dans la gestion du temps (Besoin du {results.lifePath})</span>
             </li>
             <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-[#0ea5e9]/20">
               <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full"></div>
               <span className="text-[#334155] text-xs md:text-sm">Possibilité d'exprimer vos idées (Besoin du {results.expression})</span>
             </li>
             <li className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-[#0ea5e9]/20">
               <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full"></div>
               <span className="text-[#334155] text-xs md:text-sm">Sens et contribution éthique (Besoin du {results.soulUrge})</span>
             </li>
           </ul>
        </div>
      </PageContainer>
    </>
  );
}
