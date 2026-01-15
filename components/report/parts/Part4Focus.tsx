
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
      {/* PAGE 24: INTRO FOCUS */}
      <PageContainer className="p-4 md:p-16 justify-center bg-[#1c1917]">
        <div className="text-center">
          <div className="uppercase tracking-[0.5em] text-[#a8a29e] mb-4 text-sm md:text-base">Focus Spécifique</div>
          <h2 className="text-4xl md:text-6xl font-serif text-[#fef3c7] mb-8">{focusInfo.title}</h2>
          <p className="text-base md:text-xl text-[#fbbf24] max-w-2xl mx-auto leading-relaxed">
            Vous avez choisi d'explorer le domaine "{focusInfo.title}". 
            Nous allons croiser vos vibrations majeures pour vous donner une lecture précise et multidimensionnelle de ce secteur de votre vie.
          </p>
        </div>
      </PageContainer>

      {/* PAGE 25: PERSPECTIVE DU CHEMIN DE VIE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-3xl font-serif text-[#fef3c7] mb-8 border-b border-[#fbbf24] pb-4">
          La Vision de votre Chemin de Vie
        </h2>
        <div className="prose prose-lg text-[#d6d3d1]">
          <h3 className="text-lg md:text-xl font-bold text-[#fbbf24] mb-4">Votre Approche Fondamentale</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            Votre Chemin de Vie {results.lifePath} colore profondément votre manière d'aborder {focusInfo.title.toLowerCase()}.
            C'est la toile de fond de votre expérience.
          </p>
          <div className="bg-[#292524] p-6 md:p-8 rounded-xl border-l-4 border-[#fbbf24] mt-8">
            <p className="whitespace-pre-wrap leading-relaxed italic text-[#fdfbf7] text-sm md:text-base">
              {lpContent[contentKey]}
            </p>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 26: PERSPECTIVE DE L'EXPRESSION */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-3xl font-serif text-[#fef3c7] mb-8 border-b border-[#fbbf24] pb-4">
          Vos Outils d'Action (Expression)
        </h2>
        <div className="prose prose-lg text-[#d6d3d1]">
          <h3 className="text-lg md:text-xl font-bold text-[#fbbf24] mb-4">Comment vous agissez concrètement</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            Si le Chemin de Vie est la "route", votre Nombre d'Expression {results.expression} est la manière dont vous conduisez.
            Dans le domaine {focusInfo.title.toLowerCase()}, voici comment vous vous manifestez :
          </p>
          <div className="bg-[#292524] p-6 md:p-8 rounded-xl border-l-4 border-[#fbbf24] mt-8">
            <p className="whitespace-pre-wrap leading-relaxed italic text-[#fdfbf7] text-sm md:text-base">
              {expContent[contentKey]}
            </p>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 27: PERSPECTIVE DE L'ELAN SPIRITUEL */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-3xl font-serif text-[#fef3c7] mb-8 border-b border-[#fbbf24] pb-4">
          Vos Désirs Profonds (Âme)
        </h2>
        <div className="prose prose-lg text-[#d6d3d1]">
          <h3 className="text-lg md:text-xl font-bold text-[#fbbf24] mb-4">Ce qui vous nourrit vraiment</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            Souvent, nous échouons dans {focusInfo.title.toLowerCase()} parce que nous ignorons les besoins de notre âme.
            Votre Élan Spirituel {results.soulUrge} réclame ceci pour être comblé :
          </p>
          <div className="bg-[#292524] p-6 md:p-8 rounded-xl border-l-4 border-[#fbbf24] mt-8">
            <p className="whitespace-pre-wrap leading-relaxed italic text-[#fdfbf7] text-sm md:text-base">
              {soulContent[contentKey]}
            </p>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 28: CONTEXTE TEMPOREL */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-3xl font-serif text-[#fef3c7] mb-8 border-b border-[#fbbf24] pb-4">
          Le Climat Actuel (Année {results.personalYear})
        </h2>
        <div className="prose prose-lg text-[#d6d3d1]">
          <h3 className="text-lg md:text-xl font-bold text-[#fbbf24] mb-4">Stratégie pour cette année</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            Peu importe vos souhaits, vous devez agir en accord avec la "météo" numérologique de l'année.
            Pour votre focus "{focusInfo.title}", l'Année {results.personalYear} conseille :
          </p>
          <div className="bg-[#292524] p-6 md:p-8 rounded-xl border-l-4 border-[#fbbf24] mt-8">
            <p className="whitespace-pre-wrap leading-relaxed italic text-[#fdfbf7] text-sm md:text-base">
              {pyContent}
            </p>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 29: BLOCAGES */}
      <PageContainer className="p-4 md:p-16 bg-[#292524] border-l-[8px] md:border-l-[12px] border-red-900">
        <h2 className="text-2xl md:text-4xl font-serif text-red-400 mb-8 md:mb-12">Les Blocages à Lever</h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-[#1c1917] p-6 md:p-8 rounded-lg shadow-sm border border-red-900/30">
            <h4 className="font-bold text-red-400 mb-2">Le Piège du Mental</h4>
            <p className="text-[#d6d3d1] text-sm md:text-base">
              Attention à ne pas sur-analyser vos ressentis. Votre défi mineur {results.challenges.minor1} suggère une tendance à douter de vous-même.
              La vibration {results.challenges.minor1} en défi peut créer des obstacles dans {focusInfo.title.toLowerCase()} si elle n'est pas maîtrisée.
            </p>
          </div>
          <div className="bg-[#1c1917] p-6 md:p-8 rounded-lg shadow-sm border border-red-900/30">
            <h4 className="font-bold text-red-400 mb-2">La Peur Cachée</h4>
            <p className="text-[#d6d3d1] text-sm md:text-base">
              Votre défi majeur {results.challenges.major} révèle une peur de l'échec qui peut paralyser l'action.
              Dans le contexte de votre focus, cela peut se traduire par une difficulté à oser ou à trancher.
            </p>
          </div>
        </div>
      </PageContainer>

      {/* PAGE 30: CLES DE PASSAGE */}
      <PageContainer className="p-4 md:p-16 bg-[#292524] border-l-[8px] md:border-l-[12px] border-green-900">
        <h2 className="text-2xl md:text-4xl font-serif text-green-400 mb-8 md:mb-12">Les Clés de Passage</h2>
        <ul className="space-y-6">
          <li className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-green-900 text-green-200 flex items-center justify-center font-bold flex-shrink-0 border border-green-500 text-sm md:text-base">1</div>
            <p className="text-green-100/90 text-base md:text-lg">Acceptez que le rythme de votre Année {results.personalYear} soit le bon rythme. Ne forcez pas.</p>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-green-900 text-green-200 flex items-center justify-center font-bold flex-shrink-0 border border-green-500 text-sm md:text-base">2</div>
            <p className="text-green-100/90 text-base md:text-lg">Utilisez votre talent d'Expression {results.expression} pour communiquer clairement vos besoins.</p>
          </li>
          <li className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-green-900 text-green-200 flex items-center justify-center font-bold flex-shrink-0 border border-green-500 text-sm md:text-base">3</div>
            <p className="text-green-100/90 text-base md:text-lg">Faites confiance à votre intuition (Moi Intime {results.personality}) pour guider vos choix.</p>
          </li>
        </ul>
      </PageContainer>
    </>
  );
}
