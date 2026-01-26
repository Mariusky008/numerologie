import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';
import { Star, Zap, Crown } from 'lucide-react';

export default function PartMasterNumbers({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  // Détection des Nombres Maîtres
  const masterNumbers = [
    { num: 11, label: "Le Messager", title: "Maître Nombre 11", desc: "Intuition, Inspiration, Révélation", has: results.lifePath === 11 || results.expression === 11 || results.soulUrge === 11 },
    { num: 22, label: "Le Bâtisseur", title: "Maître Nombre 22", desc: "Construction, Réalisation, Ambition", has: results.lifePath === 22 || results.expression === 22 || results.soulUrge === 22 },
    { num: 33, label: "Le Guide", title: "Maître Nombre 33", desc: "Compassion, Guérison, Enseignement", has: results.lifePath === 33 || results.expression === 33 || results.soulUrge === 33 }
  ].filter(m => m.has);

  if (masterNumbers.length === 0) return null;

  return (
    <PageContainer className="p-4 md:p-16 bg-[#2C2F4A] text-white">
      <h2 className="text-2xl md:text-4xl font-serif text-[#C9A24D] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
        Vos Nombres Maîtres
      </h2>

      <div className="mb-12">
        <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
          Vous possédez une configuration numérologique rare. La présence de Nombres Maîtres dans votre thème indique un potentiel élevé, une mission spécifique et une énergie intense qui demande à être maîtrisée.
        </p>
      </div>

      <div className="space-y-16">
        {masterNumbers.map((master, index) => (
          <div key={index} className="relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#C9A24D]/5 blur-3xl rounded-full transform -translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Visual Number */}
              <div className="text-center md:text-left">
                <div className="text-[8rem] md:text-[10rem] font-serif font-bold text-[#C9A24D] leading-none opacity-90">
                  {master.num}
                </div>
                <div className="text-xl uppercase tracking-[0.2em] text-white/60 font-light mt-2">
                  {master.label}
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
                    <Crown className="w-6 h-6 text-[#C9A24D]" />
                    {master.title}
                  </h3>
                  <p className="text-[#C9A24D] italic mb-4">{master.desc}</p>
                  
                  <div className="space-y-4 text-white/80 leading-relaxed">
                    {master.num === 11 && (
                      <>
                        <p>
                          Le 11 est le plus intuitif de tous les nombres. Il représente l'illumination, un canal vers le subconscient, l'intuition, la nervosité et le stress.
                        </p>
                        <p>
                          <strong>Votre Défi :</strong> Ne pas vous laisser submerger par vos émotions ou celles des autres. Votre sensibilité est votre force, pas votre faiblesse.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#C9A24D] mt-2">
                          <Zap className="w-4 h-4" />
                          <span>Potentiel : Visionnaire, Inspirateur, Inventeur</span>
                        </div>
                      </>
                    )}
                    {master.num === 22 && (
                      <>
                        <p>
                          Le 22 est le plus puissant de tous les nombres. On l'appelle souvent le "Maître Bâtisseur". Il a le potentiel de transformer les rêves les plus ambitieux en réalité.
                        </p>
                        <p>
                          <strong>Votre Défi :</strong> Vaincre la peur de l'échec. Vous avez une vision large, ne vous perdez pas dans les détails.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#C9A24D] mt-2">
                          <Zap className="w-4 h-4" />
                          <span>Potentiel : Grand Réalisateur, Stratège, Leader International</span>
                        </div>
                      </>
                    )}
                    {master.num === 33 && (
                      <>
                        <p>
                          Le 33 est le plus influent de tous les nombres. C'est le "Maître Enseignant". Il combine le 11 et le 22 et porte l'énergie de l'amour inconditionnel à son plus haut niveau.
                        </p>
                        <p>
                          <strong>Votre Défi :</strong> Apprendre le détachement émotionnel pour ne pas porter la souffrance du monde sur vos épaules.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-[#C9A24D] mt-2">
                          <Zap className="w-4 h-4" />
                          <span>Potentiel : Guide Spirituel, Guérisseur, Grand Conseiller</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1c2e] p-4 rounded-xl border border-[#C9A24D]/20">
                    <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Vibration Haute</div>
                    <div className="text-sm text-white/90">Inspiration, idéalisme, pragmatisme spirituel.</div>
                  </div>
                  <div className="bg-[#1a1c2e] p-4 rounded-xl border border-red-500/20">
                    <div className="text-xs uppercase tracking-widest text-red-300/60 mb-1">Vibration Basse</div>
                    <div className="text-sm text-white/90">Tension nerveuse, attentes irréalistes, domination.</div>
                  </div>
                </div>
              </div>
            </div>
            
            {index < masterNumbers.length - 1 && (
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A24D]/30 to-transparent my-16"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-6 bg-[#C9A24D]/10 rounded-xl border border-[#C9A24D]/20 text-center">
        <Star className="w-8 h-8 text-[#C9A24D] mx-auto mb-4" />
        <p className="italic text-white/80">
          "Avoir un Maître Nombre n'est pas une garantie de succès, c'est une responsabilité. C'est une invitation à vivre à un niveau de conscience supérieur."
        </p>
      </div>
    </PageContainer>
  );
}