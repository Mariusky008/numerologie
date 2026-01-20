import NumberCard from './NumberCard';
import { NumerologyResult } from '@/lib/types';

interface KeyNumbersSectionProps {
  results: NumerologyResult;
}

export default function KeyNumbersSection({ results }: KeyNumbersSectionProps) {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-[#2C2F4A] mb-12">
          Vos Piliers Vibratoires
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NumberCard 
            title="Chemin de Vie"
            number={results.lifePath}
            description="Votre mission d'âme, la route principale que vous avez choisi d'emprunter dans cette incarnation."
            keywords={['Mission', 'Destin', 'Route']}
            color="#C9A24D"
            delay={0.1}
          />
          
          <NumberCard 
            title="Expression"
            number={results.expression}
            description="Votre façon d'agir dans le monde, vos talents naturels et votre caractère social."
            keywords={['Talents', 'Action', 'Social']}
            color="#5B4B8A"
            delay={0.2}
          />
          
          <NumberCard 
            title="Élan Spirituel"
            number={results.soulUrge}
            description="Vos motivations profondes, ce que votre âme désire vraiment, souvent caché aux autres."
            keywords={['Désir', 'Intérieur', 'Motivation']}
            color="#9966CC"
            delay={0.3}
          />
          
          <NumberCard 
            title="Moi Intime"
            number={results.personality}
            description="Comment les autres vous perçoivent au premier abord, votre 'masque' social."
            keywords={['Image', 'Perception', 'Extérieur']}
            color="#B87333"
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
}