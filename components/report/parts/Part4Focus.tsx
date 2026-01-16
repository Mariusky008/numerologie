
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { 
  getLifePathContent, 
  getExpressionContent, 
  getSoulUrgeContent, 
  getPersonalYearContent 
} from '@/lib/numerology/contentGenerator';

export default function Part4Focus({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const focusMap: Record<string, { title: string, key: 'love' | 'work' | 'spiritual' }> = {
    amour: { title: "Amour & Relations", key: 'love' },
    carriere: { title: "Carrière & Abondance", key: 'work' },
    mission: { title: "Mission de Vie", key: 'spiritual' },
    spiritualite: { title: "Spiritualité & Karma", key: 'spiritual' }
  };

  const focusInfo = focusMap[userData.focus] || focusMap.mission;
  const contentKey = focusInfo.key;

  const lpContent = getLifePathContent(results.lifePath);
  const expContent = getExpressionContent(results.expression);
  const soulContent = getSoulUrgeContent(results.soulUrge);
  const pyContent = getPersonalYearContent(results.personalYear);

  return (
    <>
      {/* PAGE 24-25: ANALYSE MULTIDIMENSIONNELLE (Consolidated) */}
      <PageContainer className="p-4 md:p-16 bg-[#fffbf0]">
        <div className="text-center mb-8">
          <div className="uppercase tracking-[0.5em] text-[#a8a29e] mb-2 text-sm">Focus Spécifique</div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#78350f]">{focusInfo.title}</h2>
        </div>

        <div className="space-y-6">
          {/* Life Path */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#d97706] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#d97706] text-white flex items-center justify-center text-xs">1</span>
              L'Approche (Chemin de Vie {results.lifePath})
            </h3>
            <p className="text-[#57534e] text-sm md:text-base leading-relaxed italic">
              {lpContent[contentKey]}
            </p>
          </div>

          {/* Expression */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#d97706] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#d97706] text-white flex items-center justify-center text-xs">2</span>
              L'Action (Expression {results.expression})
            </h3>
            <p className="text-[#57534e] text-sm md:text-base leading-relaxed italic">
              {expContent[contentKey]}
            </p>
          </div>

          {/* Soul Urge */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#d97706] mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#d97706] text-white flex items-center justify-center text-xs">3</span>
              La Motivation (Élan Spirituel {results.soulUrge})
            </h3>
            <p className="text-[#57534e] text-sm md:text-base leading-relaxed italic">
              {soulContent[contentKey]}
            </p>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 26: STRATEGIE & BLOCAGES (Consolidated) */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-3xl font-serif text-[#78350f] mb-8 border-b border-[#d97706] pb-4">
          Stratégie & Dépassement
        </h2>

        {/* Climate */}
        <div className="mb-8">
           <h3 className="text-lg font-bold text-[#d97706] mb-2">Le Climat Annuel (Année {results.personalYear})</h3>
           <div className="bg-white p-6 rounded-xl border-l-4 border-[#d97706] shadow-sm">
            <p className="text-[#57534e] text-sm md:text-base italic">
              {pyContent}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blocages */}
          <div className="space-y-4">
             <h3 className="text-lg font-bold text-red-700 mb-2">Les Blocages à Surveiller</h3>
             <div className="bg-red-50 p-4 rounded-lg border border-red-200">
               <h4 className="font-bold text-red-600 text-sm mb-1">Doute (Défi {results.challenges.minor1})</h4>
               <p className="text-[#57534e] text-xs md:text-sm">Attention à ne pas laisser l'hésitation paralyser vos initiatives dans ce domaine.</p>
             </div>
             <div className="bg-red-50 p-4 rounded-lg border border-red-200">
               <h4 className="font-bold text-red-600 text-sm mb-1">Peur (Défi {results.challenges.major})</h4>
               <p className="text-[#57534e] text-xs md:text-sm">Votre peur de l'échec peut vous empêcher de saisir des opportunités en or.</p>
             </div>
          </div>

          {/* Keys */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-700 mb-2">Les Clés de Réussite</h3>
             <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex gap-3">
               <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
               <p className="text-[#57534e] text-xs md:text-sm">Alignez votre rythme sur celui de votre Année Personnelle.</p>
             </div>
             <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex gap-3">
               <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
               <p className="text-[#57534e] text-xs md:text-sm">Exprimez clairement vos besoins (Expression {results.expression}).</p>
             </div>
             <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex gap-3">
               <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
               <p className="text-[#57534e] text-xs md:text-sm">Écoutez votre petite voix intérieure (Moi Intime {results.personality}).</p>
             </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
