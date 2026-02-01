import { UserData, NumerologyResult } from '@/lib/types';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Target, 
  Sparkles, 
  Heart,
  Compass,
  Eye,
  Activity,
  User,
  Flame,
  Check
} from 'lucide-react';
import { 
  getLifePathContent, 
  getDayOfBirthContent, 
  getExpressionContent, 
  getSoulUrgeContent, 
  getPersonalityContent 
} from '@/lib/numerology/contentGenerator';

export default function Part2Incarnation({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const lpContent = getLifePathContent(results.lifePath);
  const dayContent = getDayOfBirthContent(parseInt(userData.birthDate.split('-')[2]));
  const expContent = getExpressionContent(results.expression);
  const soulContent = getSoulUrgeContent(results.soulUrge);
  const persContent = getPersonalityContent(results.personality);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="space-y-32">
      {/* 1. L'INCARNATION INTRO */}
      <section className="py-32 px-6 bg-[#FDFBF7] text-center space-y-8">
        <motion.div {...fadeIn} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-4 h-4" />
            Vibration d'Origine
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">L'Incarnation</h2>
          <p className="text-xl md:text-3xl text-[#C9A24D] italic max-w-4xl mx-auto leading-relaxed font-light">
            "L'âme ne choisit pas sa date de naissance au hasard. Le moment de votre premier souffle a déterminé la qualité de l'énergie avec laquelle vous allez sculpter votre réalité."
          </p>
        </motion.div>
      </section>

      {/* 2. CHEMIN DE VIE */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <motion.div {...fadeIn} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#5B4B8A] text-[10px] font-black uppercase tracking-[0.3em]">
                <Compass className="w-4 h-4" />
                Trajectoire de Destinée
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E] italic">{lpContent.title}</h3>
              
              <div className="bg-white p-8 md:p-14 rounded-[60px] border border-[#1A1C2E]/5 shadow-[0_40px_100px_-20px_rgba(26,28,46,0.08)] space-y-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#C9A24D]">La Mission</h4>
                  <p className="text-xl text-[#1A1C2E] leading-relaxed font-light whitespace-pre-wrap italic">
                    {lpContent.extendedDesc}
                  </p>
                </div>
                
                <div className="pt-8 border-t border-[#1A1C2E]/5 space-y-4">
                  <div className="flex items-center gap-3 text-red-500">
                    <Target className="w-5 h-5" />
                    <h4 className="text-xs font-black uppercase tracking-widest">Défi Majeur</h4>
                  </div>
                  <p className="text-xl text-[#1A1C2E] font-medium leading-relaxed">
                    {lpContent.challenge}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              {...fadeIn}
              className="bg-[#1A1C2E] p-12 rounded-[60px] text-white flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A24D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 text-center space-y-2">
                <div className="text-8xl md:text-9xl font-serif text-[#C9A24D] leading-none">{results.lifePath}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Vibration Majeure</div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="bg-white p-10 rounded-[60px] border border-[#1A1C2E]/5 shadow-xl space-y-8"
            >
              <h4 className="text-xs font-black uppercase tracking-widest text-[#C9A24D] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Conseils Clés
              </h4>
              <ul className="space-y-4">
                {lpContent.keyAdvice?.map((advice, i) => (
                  <li key={i} className="flex gap-4 text-[#1A1C2E] text-lg leading-relaxed font-light">
                    <span className="text-[#C9A24D] font-bold">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. ALIGNEMENT DU CHEMIN */}
      <section className="px-6 max-w-6xl mx-auto">
        <motion.div {...fadeIn} className="bg-white border border-[#1A1C2E]/5 p-12 md:p-20 rounded-[80px] shadow-2xl space-y-16">
          <div className="space-y-6 text-center">
            <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#1A1C2E]">Alignement du Chemin</h3>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#C9A24D] flex items-center gap-3">
                <Zap className="w-5 h-5" /> Potentiel & Talents
              </h4>
              <p className="text-2xl text-[#1A1C2E] leading-relaxed font-light italic">
                {lpContent.work}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[50px] bg-emerald-50/50 border border-emerald-100 space-y-4">
                <div className="flex items-center gap-3 text-emerald-600">
                  <Flame className="w-5 h-5" />
                  <h4 className="text-xs font-black uppercase tracking-widest">En Lumière</h4>
                </div>
                <p className="text-emerald-900/80 text-lg leading-relaxed font-medium">
                  {lpContent.positive}
                </p>
              </div>
              <div className="p-10 rounded-[50px] bg-red-50/50 border border-red-100 space-y-4">
                <div className="flex items-center gap-3 text-red-600">
                  <Activity className="w-5 h-5" />
                  <h4 className="text-xs font-black uppercase tracking-widest">En Ombre</h4>
                </div>
                <p className="text-red-900/80 text-lg leading-relaxed font-medium">
                  {lpContent.negative}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. JOUR DE NAISSANCE */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <motion.div 
              {...fadeIn}
              className="aspect-square bg-[#FAF9F7] rounded-full border-2 border-[#C9A24D]/30 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#C9A24D]/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
              <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9A24D] mb-4">Jour de Naissance</div>
                <div className="text-9xl font-serif text-[#1A1C2E] leading-none mb-4">{userData.birthDate.split('-')[2]}</div>
                <div className="w-12 h-1 bg-[#C9A24D] mx-auto" />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <motion.div {...fadeIn} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
                <Zap className="w-4 h-4" />
                L'Outil Inné
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Le Jour de Naissance</h3>
              <p className="text-xl md:text-2xl text-[#1A1C2E]/60 italic font-light leading-relaxed">
                "Si le Chemin de Vie est la route, le Jour de Naissance est la voiture. C'est votre outil inné."
              </p>
              
              <div className="bg-white p-10 md:p-14 rounded-[60px] border border-[#1A1C2E]/5 shadow-xl space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-serif font-bold italic text-[#1A1C2E]">{dayContent.title}</h4>
                  <p className="text-xl text-[#1A1C2E]/80 leading-relaxed font-light italic whitespace-pre-wrap">
                    {dayContent.extendedDesc}
                  </p>
                </div>
                
                <div className="p-8 bg-[#FAF9F7] border-l-4 border-[#C9A24D] rounded-r-[30px] space-y-2">
                  <h4 className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">Votre Don Naturel</h4>
                  <p className="text-lg text-[#1A1C2E] font-medium leading-relaxed">{dayContent.desc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. NOMBRE D'EXPRESSION */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
              <User className="w-4 h-4" />
              Vibration Sociale
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Nombre d'Expression {results.expression}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeIn} className="bg-white p-10 md:p-14 rounded-[60px] border border-[#1A1C2E]/5 shadow-xl space-y-8">
              <div className="space-y-4">
                <h4 className="text-2xl md:text-3xl font-serif font-bold italic text-[#C9A24D]">{expContent.title}</h4>
                <p className="text-xl text-[#1A1C2E]/80 leading-relaxed font-light italic whitespace-pre-wrap">
                  {expContent.extendedDesc}
                </p>
              </div>

              <div className="pt-8 border-t border-[#1A1C2E]/5 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#C9A24D]">Réalisation Professionnelle</h4>
                <p className="text-lg text-[#1A1C2E] leading-relaxed font-medium">
                  {expContent.work}
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="space-y-8">
              <div className="bg-white p-10 rounded-[60px] border border-[#1A1C2E]/5 shadow-lg">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#C9A24D] mb-8 text-center">Mots-Clés de votre Expression</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {expContent.keywords?.map((k, i) => (
                    <span key={i} className="px-6 py-2 bg-[#FAF9F7] text-[#1A1C2E] rounded-full text-sm font-bold border border-[#1A1C2E]/10 hover:border-[#C9A24D]/50 transition-colors">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. ELAN SPIRITUEL */}
      <section className="px-6 max-w-6xl mx-auto">
        <motion.div {...fadeIn} className="bg-[#1A1C2E] p-12 md:p-20 rounded-[80px] text-white space-y-16 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A24D]/10 blur-[120px] rounded-full" />
          
          <div className="text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em] border border-white/20">
              <Heart className="w-4 h-4" />
              Le Désir d'Absolu
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold">L'Élan Spirituel {results.soulUrge}</h2>
            <p className="text-2xl md:text-3xl font-light italic text-white/60">
              "Ce que votre cœur réclame secrètement quand personne ne regarde."
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 relative z-10">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#C9A24D]">{soulContent.title}</h3>
              <p className="text-2xl leading-relaxed font-light italic text-white/80 whitespace-pre-wrap">
                {soulContent.extendedDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#C9A24D]">
                  <Heart className="w-5 h-5" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Vie Affective</h4>
                </div>
                <p className="text-xl text-white/70 leading-relaxed font-light whitespace-pre-wrap">
                  {soulContent.love}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#C9A24D]">
                  <Flame className="w-5 h-5" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Quête de Sens</h4>
                </div>
                <p className="text-xl text-white/70 leading-relaxed font-light whitespace-pre-wrap">
                  {soulContent.spiritual}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. IMAGE SOCIALE */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 text-center space-y-4">
            <motion.div 
              {...fadeIn}
              className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-white border-8 border-[#1A1C2E]/5 flex flex-col items-center justify-center shadow-inner group"
            >
              <div className="text-8xl md:text-9xl font-serif text-[#1A1C2E] group-hover:scale-110 transition-transform duration-700">{results.personality}</div>
            </motion.div>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A24D]">Rayonnement Social</div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <motion.div {...fadeIn} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-[0.3em]">
                <Eye className="w-4 h-4" />
                Le Masque Extérieur
              </div>
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">L'Image Sociale</h3>
              <p className="text-xl text-[#1A1C2E]/60 font-light leading-relaxed">
                Cette image correspond à votre manière spontanée d'entrer en relation avec le monde, avant même toute interaction approfondie.
              </p>
              
              <div className="bg-white p-10 md:p-14 rounded-[60px] border border-[#1A1C2E]/5 shadow-xl space-y-8">
                <div className="space-y-4">
                  <h4 className="text-2xl md:text-3xl font-serif font-bold italic text-[#C9A24D]">{persContent.title}</h4>
                  <p className="text-xl text-[#1A1C2E]/80 leading-relaxed font-light italic whitespace-pre-wrap">
                    {persContent.extendedDesc}
                  </p>
                </div>
                
                <div className="p-8 bg-[#FAF9F7] rounded-[30px] border border-stone-100 italic text-stone-500 text-lg">
                  "{persContent.desc}"
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
