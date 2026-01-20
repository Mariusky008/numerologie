
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { CheckCircle } from 'lucide-react';

export default function Part6Integration({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 38: PROTOCOLE 30 JOURS (Consolidated) */}
      <PageContainer className="p-4 md:p-16 bg-[#FAF9F7] text-[#2C2F4A]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Protocole d'Intégration
        </h2>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((week) => {
            return (
              <div key={week} className="flex flex-col md:flex-row gap-4 md:gap-8 border-b border-[#C9A24D]/20 pb-6 last:border-0">
                <div className="text-3xl md:text-5xl font-serif text-[#C9A24D] opacity-30 w-16 md:w-24 flex-shrink-0">0{week}</div>
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-bold mb-2 text-[#2C2F4A]">Semaine {week} : {
                    week === 1 ? "Observation" : week === 2 ? "Désidentification" : week === 3 ? "Action Juste" : "Célébration"
                  }</h4>
                  <p className="text-[#2C2F4A] mb-3 text-sm md:text-base">
                    {week === 1 ? "Observez vos pensées limitantes sans les juger. Notez chaque fois que vous doutez de votre légitimité." :
                     week === 2 ? "Remplacez chaque pensée négative par son opposé positif. 'Je ne suis pas capable' devient 'J'apprends'." :
                     week === 3 ? "Posez 3 actions concrètes qui vous font peur mais qui vous attirent. Sortez de votre zone de confort." :
                     "Fêtez vos victoires, même minuscules. La gratitude ancre l'abondance. Remerciez-vous chaque soir."}
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                      <div key={d} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#C9A24D] flex items-center justify-center text-[10px] md:text-xs text-[#C9A24D] flex-shrink-0 bg-white">
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
    </>
  );
}
