
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
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Vos Cycles de Vie</h2>
            <p className="text-[#1A1C2E]/60 text-xl leading-relaxed font-light">
              Votre existence est rythmée par trois grands cycles. Chaque phase impose une thématique majeure à votre évolution.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { range: `0 - ${c1End} ans`, label: "Cycle Formatif", num: results.cycles.cycle1, active: age <= c1End, color: "#f59e0b" },
              { range: `${c1End} - ${c2End} ans`, label: "Cycle Productif", num: results.cycles.cycle2, active: age > c1End && age <= c2End, color: "#C9A24D" },
              { range: `${c2End}+ ans`, label: "Cycle Sagesse", num: results.cycles.cycle3, active: age > c2End, color: "#1A1C2E" }
            ].map((c, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-6 items-center p-8 rounded-[40px] border transition-all duration-500 ${c.active ? 'bg-white border-[#C9A24D] shadow-xl scale-105' : 'bg-stone-50 border-stone-200 opacity-60'}`}>
                <div className="w-40 text-center font-serif text-xl text-[#1A1C2E] font-bold">{c.range}</div>
                <div className="flex-1 w-full h-3 bg-stone-200 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-full rounded-full" style={{ backgroundColor: c.color }}></div>
                </div>
                <div className="w-60 text-center md:text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D] mb-1">{c.label}</div>
                  <div className="text-2xl font-serif font-bold text-[#1A1C2E]">Cycle {c.num}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-10 md:p-16 bg-white border border-[#C9A24D]/20 rounded-[60px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-full bg-[#C9A24D]"></div>
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em]">
                Vibration Actuelle
              </div>
              <h3 className="text-3xl md:text-5xl font-serif text-[#1A1C2E] italic font-bold">Vous êtes ici : {currentCycleName}</h3>
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-[#C9A24D]">Cycle en vibration {currentCycleNum}</h4>
                <p className="text-xl text-[#1A1C2E] leading-relaxed font-medium italic">
                  "Ce cycle vous invite à développer l'énergie du {currentCycleNum}. C'est une période propice pour : {currentCycleNum === 1 ? "Indépendance, Leadership, Innovation, Courage, Action" : 
                    currentCycleNum === 2 ? "Collaboration, Patience, Sensibilité, Équilibre" :
                    currentCycleNum === 3 ? "Expression, Créativité, Vie Sociale, Communication" :
                    currentCycleNum === 4 ? "Construction, Travail, Rigueur, Stabilité" :
                    currentCycleNum === 5 ? "Changement, Liberté, Voyage, Adaptabilité" :
                    currentCycleNum === 6 ? "Responsabilité, Harmonie, Famille, Service" :
                    currentCycleNum === 7 ? "Réflexion, Spiritualité, Analyse, Sagesse" :
                    currentCycleNum === 8 ? "Pouvoir, Réussite, Matérialité, Justice" : "Bilan, Humanisme, Idéalisme, Transmission"}."
                </p>
                <div className="p-8 bg-[#FAF9F7] rounded-[40px] border border-stone-100 text-[#1A1C2E] text-lg leading-relaxed font-light">
                  {cycleContent.detailed}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 32: ANNEE PERSONNELLE */}
      <PageContainer className="p-4 md:p-16 bg-[#FAF9F7]">
        <div className="max-w-4xl mx-auto space-y-16 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Année Personnelle</h2>
            <div className="relative inline-block">
              <div className="text-[12rem] md:text-[18rem] font-serif text-[#C9A24D] leading-none">{results.personalYear}</div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-6 py-2 bg-[#1A1C2E] text-white text-xs font-black uppercase tracking-[0.5em] rounded-full">
                Vibration {new Date().getFullYear()}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[60px] border border-[#C9A24D]/10 shadow-xl">
            <p className="text-xl md:text-2xl text-[#1A1C2E] leading-relaxed font-light italic">
              {pyContent}
            </p>
          </div>

          {results.transits && (
            <div className="space-y-12 pt-16">
              <h3 className="text-3xl md:text-5xl font-serif text-[#1A1C2E] italic font-bold">Météo Vibratoire (Transits)</h3>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { label: "Plan Physique", val: results.transits.physical, desc: "Influence sur votre santé et vos actions concrètes." },
                  { label: "Plan Mental", val: results.transits.mental, desc: "Influence sur vos pensées et vos projets intellectuels." },
                  { label: "Plan Spirituel", val: results.transits.spiritual, desc: "Influence sur votre âme et votre évolution intérieure." }
                ].map((t, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-stone-200 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-[#C9A24D]/50 transition-all">
                    <div className="text-7xl font-serif text-[#C9A24D] font-bold group-hover:scale-110 transition-transform">{t.val}</div>
                    <div className="text-center md:text-left space-y-2">
                      <div className="text-xs uppercase tracking-widest text-[#C9A24D] font-black">{t.label}</div>
                      <p className="text-lg text-[#1A1C2E]/60 font-light">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageContainer>

      {/* PAGE 33-34: VISION DÉCENNALE */}
      <PageContainer className="p-4 md:p-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Vision Décennale</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">Les 10 prochaines années de votre trajectoire.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 p-6 text-[10px] font-black uppercase tracking-widest text-[#C9A24D] border-b border-[#C9A24D]/20">
              <div>Année</div>
              <div className="text-center">Année Personnelle</div>
              <div className="text-right">Énergie Dominante</div>
            </div>
            {results.careerForecast?.map((item) => {
              const py = item.personalYear > 9 ? (item.personalYear === 11 ? 2 : item.personalYear === 22 ? 4 : item.personalYear === 33 ? 6 : item.personalYear % 9 || 9) : item.personalYear;
              return (
                <div key={item.year} className="grid grid-cols-3 items-center p-8 rounded-3xl bg-white border border-stone-100 hover:shadow-lg transition-all group">
                  <div className="text-2xl font-bold text-[#1A1C2E]">{item.year}</div>
                  <div className="flex justify-center">
                    <span className="w-12 h-12 rounded-full bg-[#FAF9F7] text-[#C9A24D] flex items-center justify-center text-xl font-bold border border-[#C9A24D]/20 group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                      {py}
                    </span>
                  </div>
                  <div className="text-right text-sm font-medium text-[#1A1C2E]/60">
                    {py === 1 ? "Nouveau Départ" : py === 2 ? "Collaboration" : py === 3 ? "Créativité" : py === 4 ? "Construction" : py === 5 ? "Changement" : py === 6 ? "Responsabilité" : py === 7 ? "Réflexion" : py === 8 ? "Réussite" : "Bilan"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>

      {/* PAGE 35: ORIENTATION PRO & ENVIRONNEMENT */}
      <PageContainer className="p-4 md:p-16 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Orientation Professionnelle</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">Les secteurs où votre vibration est la plus forte.</p>
          </div>

          <div className="space-y-6">
            {results.professionalAxes.map((axis, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-white border border-stone-200 hover:shadow-xl transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C9A24D]/10 text-[#C9A24D] flex items-center justify-center font-serif text-2xl font-bold group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif font-bold text-[#1A1C2E]">{axis}</h3>
                    <p className="text-[#1A1C2E]/50 font-light">Ce secteur résonne naturellement avec vos nombres.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-12 md:p-20 bg-[#1A1C2E] rounded-[80px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A24D]/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#C9A24D]">Environnement Idéal</h3>
                <p className="text-white/60 text-xl font-light leading-relaxed">
                  Pour vous épanouir pleinement, votre environnement de travail doit respecter ces critères :
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: "✨", text: `Autonomie dans la gestion du temps (Besoin du ${results.lifePath})` },
                  { icon: "💡", text: `Possibilité d'exprimer vos idées (Besoin du ${results.expression})` },
                  { icon: "🌍", text: `Sens et contribution éthique (Besoin du ${results.soulUrge})` }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 bg-white/5 backdrop-blur-md rounded-[30px] border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-3xl">{item.icon}</div>
                    <span className="text-xl font-light">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
