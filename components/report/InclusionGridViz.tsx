
'use client';

import { InclusionGrid } from '@/lib/types';
import clsx from 'clsx';

interface InclusionGridVizProps {
  grid: InclusionGrid;
  missing: number[];
  excess: number[];
}

export default function InclusionGridViz({ grid, missing, excess }: InclusionGridVizProps) {
  // Grid layout 3x3
  // 3 6 9
  // 2 5 8
  // 1 4 7
  // OR Standard:
  // 1 2 3
  // 4 5 6
  // 7 8 9
  // Or User Prompt:
  // Ligne 1 : [1] | [2] | [3]
  // Ligne 2 : [4] | [5] | [6]
  // Ligne 3 : [7] | [8] | [9]
  // Let's use 1-2-3 / 4-5-6 / 7-8-9 as requested.

  const renderCell = (num: number) => {
    const count = grid[num];
    const isMissing = count === 0;
    const isExcess = excess.includes(num);

    return (
      <div 
        key={num}
        className={clsx(
          "relative h-24 flex flex-col items-center justify-center border border-stone-800/50 rounded-lg transition-all",
          isMissing ? "bg-red-900/10 border-red-900/30" : 
          isExcess ? "bg-amber-900/20 border-amber-500/50" : 
          "bg-stone-800/30"
        )}
      >
        <div className="text-sm text-stone-500 font-serif mb-1">Nombre {num}</div>
        <div className={clsx(
          "text-3xl font-bold",
          isMissing ? "text-red-400" : 
          isExcess ? "text-amber-400" : 
          "text-stone-300"
        )}>
          {count}
        </div>
        {isMissing && <div className="text-[10px] uppercase tracking-widest text-red-400/80 mt-1">Dette</div>}
        {isExcess && <div className="text-[10px] uppercase tracking-widest text-amber-400/80 mt-1">Force</div>}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-stone-900/50 rounded-xl border border-stone-800 shadow-xl">
      <h3 className="text-center font-serif text-amber-100 mb-6 text-xl">Grille d'Inclusion</h3>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => renderCell(num))}
      </div>
    </div>
  );
}
