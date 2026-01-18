import React from 'react';
import { UserData, NumerologyResult } from '@/lib/types';
import { Barcode, Star } from 'lucide-react';

interface BookBackCoverProps {
  userData: UserData;
  results: NumerologyResult;
}

export default function BookBackCover({ userData, results }: BookBackCoverProps) {
  // Génération dynamique du résumé (Synopsis)
  const generateSynopsis = () => {
    const name = userData.firstName;
    const lifePath = results.lifePath;
    const focus = userData.focus || 'mission';
    
    // --- NOUVEAU : Intégration Astro & Numéro Expert ---
    const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
    const planetKey = results.advancedProfile?.dominantPlanet?.toLowerCase();
    
    const zodiac = results.realAstro?.['Sun']?.signe || (zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "Signe Inconnu");
    const ascendant = results.realAstro?.['Ascendant']?.signe;
    const planet = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "";

    let opening = "";
    let conflict = "";
    let resolution = "";
    let astroTouch = "";

    // 1. L'Accroche (Basée sur le Chemin de Vie)
    switch (lifePath) {
        case 1: opening = `${name} a toujours su qu'il était né pour diriger, mais le poids de la couronne est parfois trop lourd.`; break;
        case 2: opening = `Dans un monde de bruit et de fureur, ${name} cherche l'harmonie parfaite, celle qui résonne au fond de son âme.`; break;
        case 3: opening = `La vie de ${name} est une scène de théâtre, mais derrière les rires et la lumière se cache une vérité qu'il n'ose pas affronter.`; break;
        case 4: opening = `Bâtisseur infatigable, ${name} a construit des murs solides autour de son cœur. Mais que se passe-t-il quand les fondations tremblent ?`; break;
        case 5: opening = `La liberté est la seule boussole de ${name}. Pourtant, à force de courir après l'horizon, il a oublié ce qu'il fuyait vraiment.`; break;
        case 6: opening = `Gardien du foyer et des siens, ${name} porte le monde sur ses épaules. Un jour, le fardeau devient une clé.`; break;
        case 7: opening = `${name} a toujours senti qu'il n'appartenait pas tout à fait à ce monde. Son regard perce les voiles que les autres ignorent.`; break;
        case 8: opening = `Le pouvoir et l'ambition coulent dans les veines de ${name}. Mais au sommet de la montagne, l'air se raréfie.`; break;
        case 9: opening = `Porteur d'une sagesse ancienne, ${name} traverse les époques avec la nostalgie d'un paradis perdu.`; break;
        case 11: opening = `${name} capte des fréquences que nul autre n'entend. Un don qui est aussi sa plus grande malédiction.`; break;
        case 22: opening = `Les rêves de ${name} sont trop grands pour une seule vie. Il est l'architecte d'un futur que personne ne voit encore.`; break;
        case 33: opening = `Guide malgré lui, ${name} éclaire la route des autres, parfois au prix de sa propre lumière.`; break;
        default: opening = `${name} se tient à la croisée des chemins, prêt à écrire le chapitre le plus important de son existence.`;
    }

    // 2. Le Conflit (Basé sur le Focus)
    switch (focus) {
        case 'amour': conflict = `Mais c'est une rencontre inattendue qui va tout bouleverser. Face à un miroir émotionnel troublant, les certitudes s'effondrent pour laisser place à une vulnérabilité nouvelle.`; break;
        case 'carriere': conflict = `Alors que l'opportunité d'une vie se présente, le prix à payer semble impossible. La réussite matérielle vaut-elle le sacrifice de ses idéaux profonds ?`; break;
        case 'spiritualite': conflict = `Des signes mystérieux commencent à apparaître. Coïncidences ? Messages ? Une force invisible semble guider ses pas vers une révélation interdite.`; break;
        case 'mission': conflict = `Une crise intérieure le pousse à tout remettre en question. Pourquoi est-il ici ? La réponse se trouve peut-être dans ce souvenir d'enfance qu'il avait soigneusement enfoui.`; break;
        default: conflict = `Mais le destin a d'autres plans. Une série d'événements inexplicables va l'obliger à sortir de sa zone de confort pour affronter ses dragons intérieurs.`;
    }

    // 3. La Touche Astrologique (NOUVEAU)
    if (zodiac && ascendant) {
       astroTouch = `Porté par la fougue du ${zodiac} et nuancé par un Ascendant ${ascendant}, `;
    } else if (zodiac) {
       astroTouch = `Sous l'influence ardente du ${zodiac}, `;
    } else {
       astroTouch = `Guidé par des forces célestes invisibles, `;
    }

    // 4. La Résolution / Promesse
    resolution = `${astroTouch}ce récit initiatique nous entraîne dans les méandres d'une psychologie fascinante. Entre passé karmique et futur à construire, ${name} devra faire un choix : rester le spectateur de sa vie ou en devenir enfin le héros.`;

    return `${opening} ${conflict} ${resolution}`;
  };

  const synopsis = generateSynopsis();

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[2/3] bg-[#1a1a1a] text-white rounded-l-md rounded-r-xl shadow-2xl overflow-hidden flex flex-col font-serif transform hover:scale-[1.02] transition-transform duration-500 border-l-4 border-stone-800">
      {/* Texture Dos de livre */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-50"></div>
      
      {/* Contenu */}
      <div className="relative z-10 p-8 flex flex-col h-full">
        
        {/* En-tête accrocheur */}
        <div className="text-center border-b border-white/20 pb-6 mb-6">
          <h3 className="text-[#C9A24D] text-xs font-sans font-bold tracking-[0.3em] uppercase mb-2">
            Le Roman de votre Vie
          </h3>
          <h2 className="text-2xl font-bold leading-tight">
            Et si tout était déjà écrit ?
          </h2>
        </div>

        {/* Résumé (Synopsis) */}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm leading-relaxed text-stone-300 text-justify font-sans">
            <span className="text-4xl float-left mr-2 mt-[-10px] text-[#C9A24D] font-serif">"</span>
            {synopsis}
          </p>
        </div>

        {/* Citations Presse / Avis */}
        <div className="mt-6 py-4 border-t border-b border-white/10 text-center">
            <div className="flex justify-center gap-1 text-[#C9A24D] mb-2">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
            </div>
            <p className="text-[10px] text-stone-400 italic font-sans">
                "Une plongée vertigineuse dans l'âme humaine. On en ressort transformé."
            </p>
        </div>

        {/* Bas de page : Code barre & Prix */}
        <div className="mt-auto pt-6 flex justify-between items-end">
            <div className="bg-white p-2 rounded-sm">
                <Barcode className="w-16 h-8 text-black" />
                <div className="text-[6px] text-black text-center font-mono tracking-widest mt-1">978-2-NUMERO-24</div>
            </div>
            <div className="text-right">
                <div className="text-[#C9A24D] font-bold text-xl">49.00 €</div>
                <div className="text-[8px] text-stone-500 uppercase tracking-widest">Édition Unique</div>
            </div>
        </div>
      </div>
    </div>
  );
}