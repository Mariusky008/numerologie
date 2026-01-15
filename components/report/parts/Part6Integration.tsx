
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { CheckCircle } from 'lucide-react';

export default function Part6Integration({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 37: SEMAINE IDEALE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Votre Semaine Idéale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 md:h-96">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
            <div key={day} className="flex flex-row md:flex-col h-auto md:h-full gap-4 md:gap-0 p-4 md:p-0 bg-[#292524] md:bg-transparent rounded-lg md:rounded-none mb-2 md:mb-0">
              <div className="text-left md:text-center font-bold text-[#a8a29e] mb-0 md:mb-2 uppercase text-sm w-16 md:w-auto">{day}</div>
              <div className={`flex-1 rounded-lg p-2 text-xs md:text-xs ${i < 5 ? 'text-[#d6d3d1] md:bg-[#292524] md:border border-[#fbbf24]/20' : 'text-[#a8a29e] md:bg-[#1c1917] md:border border-stone-800'}`}>
                {i === 0 && "Planification & Stratégie"}
                {i === 2 && "Communication & Réunions"}
                {i === 4 && "Bilan & Clôture"}
                {i > 4 && "Repos & Ressourcement"}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* PAGE 38-39: PROTOCOLE 30 JOURS */}
      {[1, 2].map((page) => (
        <PageContainer key={page} className="p-4 md:p-16 bg-[#1c1917] text-[#fdfbf7]">
          <h2 className="text-2xl md:text-4xl font-serif text-[#fdfbf7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
            Protocole d'Intégration {page === 2 && "(Suite)"}
          </h2>
          <div className="space-y-8">
            {[1, 2].map((weekOffset) => {
              const week = weekOffset + (page - 1) * 2;
              return (
                <div key={week} className="flex flex-col md:flex-row gap-4 md:gap-8 border-b border-[#44403c] pb-8">
                  <div className="text-4xl md:text-6xl font-serif text-[#fbbf24] opacity-50">0{week}</div>
                  <div>
                    <h4 className="text-lg md:text-2xl font-bold mb-4 text-[#fef3c7]">Semaine {week} : {
                      week === 1 ? "Observation" : week === 2 ? "Désidentification" : week === 3 ? "Action Juste" : "Célébration"
                    }</h4>
                    <p className="text-[#d6d3d1] mb-4 text-sm md:text-base">
                      {week === 1 ? "Observez vos pensées limitantes sans les juger. Notez chaque fois que vous doutez de votre légitimité." :
                       week === 2 ? "Remplacez chaque pensée négative par son opposé positif. 'Je ne suis pas capable' devient 'J'apprends'." :
                       week === 3 ? "Posez 3 actions concrètes qui vous font peur mais qui vous attirent." :
                       "Fêtez vos victoires, même minuscules. La gratitude ancre l'abondance."}
                    </p>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {[1, 2, 3, 4, 5, 6, 7].map(d => (
                        <div key={d} className="w-8 h-8 rounded-full border border-[#fbbf24] flex items-center justify-center text-xs text-[#fbbf24] flex-shrink-0">
                          J{d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PageContainer>
      ))}

      {/* PAGE 40: CLOTURE */}
      <PageContainer className="justify-center items-center text-center p-4 md:p-16">
        <div className="w-32 h-1 bg-[#fbbf24] mb-8 md:mb-12"></div>
        <h2 className="text-3xl md:text-5xl font-serif text-[#fef3c7] mb-8">Merci, {userData.firstName}</h2>
        <p className="text-base md:text-xl text-[#d6d3d1] max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
          Cette lecture n'est pas une fin, c'est un commencement. Vous avez maintenant la carte de votre territoire intérieur.
          Il ne vous reste plus qu'à explorer, bâtir et aimer ce que vous êtes.
        </p>
        <p className="text-base md:text-lg italic text-[#fbbf24] mb-12 md:mb-16">
          "Connais-toi toi-même et tu connaîtras l'Univers et les Dieux."
        </p>
        <div className="text-xs md:text-sm text-[#a8a29e] uppercase tracking-widest">
          Fin du Rapport • Généré le {new Date().toLocaleDateString()}
        </div>
      </PageContainer>
    </>
  );
}
