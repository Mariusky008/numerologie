
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import PersonalityRadar from '../PersonalityRadar';
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

  return (
    <>
      {/* PAGE 8: INTRO INCARNATION */}
      <PageContainer className="p-4 md:p-16 justify-center bg-[#FAF9F7]">
        <h2 className="text-3xl md:text-5xl font-serif text-[#2C2F4A] mb-8 text-center">L'Incarnation</h2>
        <p className="text-base md:text-xl text-[#C9A24D] text-center max-w-3xl mx-auto leading-relaxed font-light">
          "L'âme ne choisit pas sa date de naissance au hasard. Le moment de votre premier souffle a déterminé la qualité de l'énergie avec laquelle vous allez sculpter votre réalité."
        </p>
      </PageContainer>

      {/* PAGE 9-10: CHEMIN DE VIE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          {lpContent.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="prose text-[#2C2F4A]">
            <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] mb-4">La Mission</h3>
            <p className="leading-relaxed mb-6 whitespace-pre-wrap text-sm md:text-base">
              {lpContent.extendedDesc}
            </p>
            <h4 className="font-bold text-[#C9A24D] mt-6 mb-2 uppercase tracking-wide">Défi Majeur</h4>
            <p className="text-[#2C2F4A] italic text-sm md:text-base">
              {lpContent.challenge}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="bg-white p-8 text-[#2C2F4A] flex flex-col justify-center items-center border border-[#C9A24D]/20 rounded-xl shadow-sm">
              <div className="text-7xl md:text-9xl font-serif text-[#C9A24D] mb-4">{results.lifePath}</div>
              <div className="uppercase tracking-widest text-xs md:text-sm text-[#8FA6A0]">Vibration Majeure</div>
            </div>
            <div className="bg-[#fffcf5] p-8 border border-[#C9A24D]/10 rounded-xl">
              <h4 className="font-bold text-[#C9A24D] mb-4 uppercase tracking-wide text-sm">Conseils Clés</h4>
              <ul className="space-y-3">
                {lpContent.keyAdvice?.map((advice, i) => (
                  <li key={i} className="flex gap-3 text-[#2C2F4A] text-sm md:text-base">
                    <span className="text-[#C9A24D]">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>

      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Alignement du Chemin
        </h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="p-8 bg-white border border-[#C9A24D]/30 rounded-lg shadow-sm">
            <h4 className="font-bold text-[#C9A24D] mb-4 uppercase tracking-wide text-lg md:text-xl flex items-center gap-3">
              <span className="text-2xl">⚡</span> Potentiel & Talents
            </h4>
            <p className="text-[#2C2F4A] leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {lpContent.work}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-amber-50/50 border border-amber-200 rounded-lg">
              <h4 className="font-bold text-amber-700 mb-2 uppercase tracking-wide">En Lumière</h4>
              <p className="text-amber-900/80 text-sm md:text-base">
                {lpContent.positive}
              </p>
            </div>
            <div className="p-6 bg-red-50/50 border border-red-200 rounded-lg">
              <h4 className="font-bold text-red-700 mb-2 uppercase tracking-wide">En Ombre</h4>
              <p className="text-red-900/80 text-sm md:text-base">
                {lpContent.negative}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 11: JOUR DE NAISSANCE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Le Jour de Naissance
        </h2>
        <p className="text-base md:text-lg text-[#2C2F4A] mb-8 italic">
          "Si le Chemin de Vie est la route, le Jour de Naissance est la voiture. C'est votre outil inné."
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white p-8 md:p-12 shadow-sm border border-[#C9A24D]/20 rounded-xl items-center md:items-start">
           <div className="text-8xl md:text-9xl font-serif text-[#C9A24D] leading-none">{userData.birthDate.split('-')[2]}</div>
           <div className="prose text-[#2C2F4A] flex-1">
             <h3 className="text-2xl md:text-3xl font-serif mb-6 text-[#2C2F4A]">{dayContent.title}</h3>
             <p className="whitespace-pre-wrap leading-relaxed mb-6 text-sm md:text-base">
               {dayContent.extendedDesc}
             </p>
             <div className="p-4 bg-[#fffcf5] border-l-4 border-[#C9A24D]">
               <h4 className="font-bold text-[#C9A24D] mb-1">Votre Don Naturel</h4>
               <p className="text-sm">{dayContent.desc}</p>
             </div>
           </div>
        </div>
      </PageContainer>

      {/* PAGE 12-13: NOMBRE D'EXPRESSION */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Nombre d'Expression {results.expression}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 h-full">
           <div className="prose text-[#2C2F4A]">
             <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] mb-4">{expContent.title}</h3>
             <p className="leading-relaxed whitespace-pre-wrap mb-6 text-sm md:text-base">
               {expContent.extendedDesc}
             </p>
             <h4 className="text-lg md:text-xl font-serif text-[#C9A24D] mb-3 mt-8">Réalisation Professionnelle</h4>
             <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
               {expContent.work}
             </p>
           </div>
           <div className="flex flex-col gap-8">
             <div className="w-full bg-white rounded-xl p-0 md:p-4 border border-[#C9A24D]/10 shadow-sm">
               <PersonalityRadar data={results} />
             </div>
             <div className="bg-white p-6 rounded-xl border border-[#C9A24D]/20 shadow-sm">
                <h4 className="font-bold text-[#C9A24D] mb-4">Mots-Clés de votre Expression</h4>
                <div className="flex flex-wrap gap-2">
                  {expContent.keywords?.map((k, i) => (
                    <span key={i} className="px-3 py-1 bg-[#FAF9F7] text-[#2C2F4A] rounded-full text-sm border border-[#C9A24D]/30">
                      {k}
                    </span>
                  ))}
                </div>
             </div>
           </div>
        </div>
      </PageContainer>

      {/* PAGE 14-15: ELAN SPIRITUEL */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          L'Élan Spirituel {results.soulUrge}
        </h2>
        <p className="text-lg md:text-xl font-light mb-12 italic text-[#2C2F4A]">
          "Ce que votre cœur réclame secrètement quand personne ne regarde."
        </p>
        <div className="grid grid-cols-1 gap-8">
           <div className="p-8 border border-[#C9A24D]/30 rounded-xl bg-white shadow-sm">
             <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] mb-4">{soulContent.title}</h3>
             <p className="leading-relaxed text-[#2C2F4A] whitespace-pre-wrap mb-8 text-sm md:text-base">
               {soulContent.extendedDesc}
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-[#C9A24D]/10 pt-8">
               <div>
                 <h4 className="font-bold text-[#C9A24D] mb-3 uppercase tracking-wide">Vie Affective</h4>
                 <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                   {soulContent.love}
                 </p>
               </div>
               <div>
                 <h4 className="font-bold text-[#C9A24D] mb-3 uppercase tracking-wide">Quête de Sens</h4>
                 <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                   {soulContent.spiritual}
                 </p>
               </div>
             </div>
           </div>
        </div>
      </PageContainer>

      {/* PAGE 16: IMAGE SOCIALE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          L'Image Sociale {results.personality}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
           <div className="w-full md:w-1/3 text-center">
             <div className="text-8xl md:text-9xl font-serif text-[#2C2F4A]">{results.personality}</div>
             <div className="mt-4 text-[#C9A24D] uppercase tracking-widest">Rayonnement</div>
           </div>
           <div className="w-full md:w-2/3 prose text-[#2C2F4A]">
             <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] mb-4">{persContent.title}</h3>
             <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
               {persContent.extendedDesc}
             </p>
             <div className="mt-8 p-6 bg-white rounded-lg border border-[#C9A24D]/20 shadow-sm">
               <p className="italic text-[#78716c] text-sm md:text-base">
                 "{persContent.desc}"
               </p>
             </div>
           </div>
        </div>
      </PageContainer>
    </>
  );
}
