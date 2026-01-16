
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { CheckCircle } from 'lucide-react';

export default function Part6Integration({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 37: SEMAINE IDEALE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
          Votre Semaine Idéale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 md:h-96">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
            <div key={day} className="flex flex-row md:flex-col h-auto md:h-full gap-4 md:gap-0 p-4 md:p-0 bg-white md:bg-transparent rounded-lg md:rounded-none mb-2 md:mb-0 border border-stone-100 md:border-none shadow-sm md:shadow-none">
              <div className="text-left md:text-center font-bold text-[#78350f] mb-0 md:mb-2 uppercase text-sm w-16 md:w-auto">{day}</div>
              <div className={`flex-1 rounded-lg p-2 text-xs md:text-xs ${i < 5 ? 'text-[#78350f] md:bg-white md:border border-[#d97706]/30 shadow-sm' : 'text-[#a8a29e] md:bg-stone-50 md:border border-stone-200'}`}>
                {i === 0 && "Planification & Stratégie"}
                {i === 2 && "Communication & Réunions"}
                {i === 4 && "Bilan & Clôture"}
                {i > 4 && "Repos & Ressourcement"}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* PAGE 38: PROTOCOLE 30 JOURS (Consolidated) */}
      <PageContainer className="p-4 md:p-16 bg-[#fffbf0] text-[#57534e]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
          Protocole d'Intégration
        </h2>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((week) => {
            return (
              <div key={week} className="flex flex-col md:flex-row gap-4 md:gap-8 border-b border-[#d97706]/20 pb-6 last:border-0">
                <div className="text-3xl md:text-5xl font-serif text-[#d97706] opacity-30 w-16 md:w-24 flex-shrink-0">0{week}</div>
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-bold mb-2 text-[#78350f]">Semaine {week} : {
                    week === 1 ? "Observation" : week === 2 ? "Désidentification" : week === 3 ? "Action Juste" : "Célébration"
                  }</h4>
                  <p className="text-[#57534e] mb-3 text-sm md:text-base">
                    {week === 1 ? "Observez vos pensées limitantes sans les juger. Notez chaque fois que vous doutez de votre légitimité." :
                     week === 2 ? "Remplacez chaque pensée négative par son opposé positif. 'Je ne suis pas capable' devient 'J'apprends'." :
                     week === 3 ? "Posez 3 actions concrètes qui vous font peur mais qui vous attirent. Sortez de votre zone de confort." :
                     "Fêtez vos victoires, même minuscules. La gratitude ancre l'abondance. Remerciez-vous chaque soir."}
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                      <div key={d} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#d97706] flex items-center justify-center text-[10px] md:text-xs text-[#d97706] flex-shrink-0 bg-white">
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

      {/* PAGE 40: CLOTURE */}
      <PageContainer className="justify-center items-center text-center p-4 md:p-16">
        <div className="w-32 h-1 bg-[#d97706] mb-8 md:mb-12"></div>
        <h2 className="text-3xl md:text-5xl font-serif text-[#78350f] mb-8">Merci, {userData.firstName}</h2>
        <p className="text-base md:text-xl text-[#57534e] max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
          Cette lecture n'est pas une fin, c'est un commencement. Vous avez maintenant la carte de votre territoire intérieur.
          Il ne vous reste plus qu'à explorer, bâtir et aimer ce que vous êtes.
        </p>
        <p className="text-base md:text-lg italic text-[#d97706] mb-12 md:mb-16">
          "Connais-toi toi-même et tu connaîtras l'Univers et les Dieux."
        </p>
        <div className="text-xs md:text-sm text-[#a8a29e] uppercase tracking-widest">
          Fin du Rapport • Généré le {new Date().toLocaleDateString()}
        </div>
      </PageContainer>
    </>
  );
}
