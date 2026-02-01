
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { motion } from 'framer-motion';
import { getPersonalYearContent, getCycleContent, getExpressionContent } from '@/lib/numerology/contentGenerator';
import { generateDecadeForecast } from '@/lib/numerology/modules/decade';
import { 
  Zap, 
  Compass, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Target,
  Activity,
  History,
  Lightbulb
} from 'lucide-react';

export default function Part5Future({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const pyContent = getPersonalYearContent(results.personalYear);
  const decadeForecast = generateDecadeForecast(userData.birthDate);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };
  
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
    currentCycleNum = results.cycles.cycle3;
    currentCycleName = "Cycle de Sagesse";
  }
  
  const cycleContent = getCycleContent(currentCycleNum);

  return (
    <div className="space-y-32">
      {/* 1. VOS CYCLES DE VIE */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
            <History className="w-4 h-4" />
            Les Grandes Saisons
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Vos Cycles de Vie</h2>
          <p className="text-[#1A1C2E]/60 text-xl leading-relaxed font-light max-w-2xl mx-auto italic">
            "Votre existence est rythmée par trois grands cycles. Chaque phase impose une thématique majeure à votre évolution."
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            { range: `0 - ${c1End} ans`, label: "Cycle Formatif", num: results.cycles.cycle1, active: age <= c1End, color: "#f59e0b" },
            { range: `${c1End} - ${c2End} ans`, label: "Cycle Productif", num: results.cycles.cycle2, active: age > c1End && age <= c2End, color: "#C9A24D" },
            { range: `${c2End}+ ans`, label: "Cycle Sagesse", num: results.cycles.cycle3, active: age > c2End, color: "#1A1C2E" }
          ].map((c, i) => (
            <motion.div 
              key={i} 
              {...fadeIn}
              className={`flex flex-col md:flex-row gap-8 items-center p-10 rounded-[60px] border transition-all duration-700 ${c.active ? 'bg-white border-[#C9A24D] shadow-2xl scale-105 relative z-10' : 'bg-[#FAF9F7] border-stone-100 opacity-40'}`}
            >
              <div className="w-40 text-center font-serif text-2xl text-[#1A1C2E] font-bold">{c.range}</div>
              <div className="flex-1 w-full h-2 bg-stone-100 rounded-full relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  className="absolute top-0 left-0 h-full rounded-full" 
                  style={{ backgroundColor: c.color }}
                />
              </div>
              <div className="w-64 text-center md:text-right space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">{c.label}</div>
                <div className="text-3xl font-serif font-bold text-[#1A1C2E]">Vibration {c.num}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          {...fadeIn}
          className="p-12 md:p-20 bg-[#1A1C2E] rounded-[80px] text-white relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A24D]/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
                <Zap className="w-4 h-4" />
                Cycle Actuel
              </div>
              <h3 className="text-3xl md:text-6xl font-serif italic font-bold">Vous êtes ici : {currentCycleName}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-4">
                <div className="text-[10rem] md:text-[14rem] font-serif text-[#C9A24D] leading-none">{currentCycleNum}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Fréquence Maîtresse</div>
              </div>
              
              <div className="lg:col-span-8 space-y-10">
                <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light italic border-l-4 border-[#C9A24D]/50 pl-10">
                  "Ce cycle vous invite à développer l'énergie du {currentCycleNum}. C'est une période propice pour : {currentCycleNum === 1 ? "Indépendance, Leadership, Innovation, Courage, Action" : 
                    currentCycleNum === 2 ? "Collaboration, Patience, Sensibilité, Équilibre" :
                    currentCycleNum === 3 ? "Expression, Créativité, Vie Sociale, Communication" :
                    currentCycleNum === 4 ? "Construction, Travail, Rigueur, Stabilité" :
                    currentCycleNum === 5 ? "Changement, Liberté, Voyage, Adaptabilité" :
                    currentCycleNum === 6 ? "Responsabilité, Harmonie, Famille, Service" :
                    currentCycleNum === 7 ? "Réflexion, Spiritualité, Analyse, Sagesse" :
                    currentCycleNum === 8 ? "Pouvoir, Réussite, Matérialité, Justice" : "Bilan, Humanisme, Idéalisme, Transmission"}."
                </p>
                <div className="p-10 bg-white/5 backdrop-blur-sm rounded-[50px] border border-white/10 text-white/70 text-xl leading-relaxed font-light italic">
                  {cycleContent.detailed}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. ANNÉE PERSONNELLE */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F7] text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em] border border-stone-100">
            <Calendar className="w-4 h-4" />
            La Météo de l'Année
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Année Personnelle</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.div 
              {...fadeIn}
              className="aspect-square bg-white rounded-full border border-stone-100 shadow-2xl flex flex-col items-center justify-center relative group"
            >
              <div className="absolute inset-0 bg-[#C9A24D]/5 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
              <div className="text-[12rem] md:text-[16rem] font-serif text-[#C9A24D] leading-none relative z-10">{results.personalYear}</div>
              <div className="px-6 py-2 bg-[#1A1C2E] text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-full relative z-10">
                Vibration {new Date().getFullYear()}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.div {...fadeIn} className="bg-white p-12 md:p-16 rounded-[60px] border border-stone-100 shadow-xl">
              <p className="text-2xl md:text-3xl text-[#1A1C2E] leading-relaxed font-light italic">
                {pyContent}
              </p>
            </motion.div>

            {results.transits && (
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Plan Physique", val: results.transits.physical, icon: Activity },
                  { label: "Plan Mental", val: results.transits.mental, icon: Brain },
                  { label: "Plan Spirituel", val: results.transits.spiritual, icon: Sparkles }
                ].map((t, i) => (
                  <motion.div key={i} {...fadeIn} className="flex items-center justify-between p-6 bg-[#FAF9F7] rounded-full border border-stone-100 px-10">
                    <div className="flex items-center gap-4">
                      <t.icon className="w-4 h-4 text-[#C9A24D]" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/60">{t.label}</span>
                    </div>
                    <span className="text-2xl font-serif font-bold text-[#1A1C2E]">{t.val}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. VISION DÉCENNALE */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
            <Compass className="w-4 h-4" />
            Trajectoire Future
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Vision Décennale</h2>
          <p className="text-[#1A1C2E]/60 text-xl font-light max-w-2xl mx-auto italic">
            "Les 10 prochaines années de votre trajectoire. Une vision panoramique pour anticiper les courants."
          </p>
        </motion.div>

        <div className="space-y-6">
          {decadeForecast.map((item, i) => (
            <motion.div 
              key={item.year} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white p-8 md:p-12 rounded-[50px] border border-stone-100 hover:border-[#C9A24D]/30 hover:shadow-2xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                  <div className="text-3xl font-serif font-black text-[#1A1C2E] group-hover:text-[#C9A24D] transition-colors">{item.year}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-8 h-8 rounded-full bg-[#1A1C2E] text-[#C9A24D] flex items-center justify-center text-xs font-bold border border-white/10">
                      {item.personalYear}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40">AP</span>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-1">
                  <h4 className="text-xl font-serif font-bold text-[#1A1C2E] italic">{item.theme}</h4>
                  <p className="text-sm text-[#C9A24D] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.mantra}
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <p className="text-lg text-[#1A1C2E]/60 font-light leading-relaxed italic border-l-2 border-stone-100 pl-8 group-hover:border-[#C9A24D]/30 transition-colors">
                    {item.focus}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ORIENTATION PRO & ENVIRONNEMENT */}
      <section className="px-6 max-w-6xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F7] text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em] border border-stone-100">
            <Target className="w-4 h-4" />
            Réalisation
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Orientation Pro</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.professionalAxes.map((axis, i) => (
            <motion.div 
              key={i} 
              {...fadeIn}
              className="p-10 rounded-[50px] bg-white border border-stone-100 hover:border-[#C9A24D]/30 hover:shadow-xl transition-all group"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF9F7] text-[#C9A24D] flex items-center justify-center font-serif text-2xl font-bold border border-stone-100 group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A1C2E] italic leading-tight">{axis}</h3>
                <p className="text-sm text-[#1A1C2E]/40 font-light italic">Secteur à haut potentiel vibratoire pour votre profil.</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          {...fadeIn}
          className="bg-[#FDFBF7] p-12 md:p-20 rounded-[80px] border-2 border-[#C9A24D]/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#C9A24D]/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#1A1C2E]">L'Environnement Idéal</h3>
              <p className="text-xl text-[#1A1C2E]/60 font-light max-w-2xl mx-auto">
                "Pour vous épanouir pleinement, votre cadre de vie et de travail doit nourrir vos besoins fondamentaux."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "AUTONOMIE", val: results.lifePath, text: "Gestion du temps & indépendance.", icon: ArrowRight },
                { label: "EXPRESSION", val: results.expression, text: "Liberté d'idées & créativité.", icon: Lightbulb },
                { label: "SENS", val: results.soulUrge, text: "Contribution & éthique profonde.", icon: Sparkles }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[50px] shadow-sm border border-stone-100 space-y-6 group hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">{item.label}</div>
                    <item.icon className="w-4 h-4 text-stone-200 group-hover:text-[#C9A24D] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-[#1A1C2E]/40 font-bold">Besoin du {item.val}</div>
                    <p className="text-lg font-serif font-bold text-[#1A1C2E] italic leading-tight">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Sub-components used in Part5Future
function Brain(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 3.8-2.04Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-3.8-2.04Z" />
    </svg>
  )
}
