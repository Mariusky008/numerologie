
'use client';

import { InclusionGrid } from '@/lib/types';
import clsx from 'clsx';

interface InclusionGridVizProps {
  grid: InclusionGrid;
  missing: number[];
  excess: number[];
  className?: string;
}

export default function InclusionGridViz({ grid, missing, excess, className }: InclusionGridVizProps) {
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
          "relative h-24 flex flex-col items-center justify-center border border-stone-200 rounded-lg transition-all",
          isMissing ? "bg-red-50 border-red-200" : 
          isExcess ? "bg-amber-50 border-amber-200" : 
          "bg-stone-50"
        )}
      >
        <div className="text-sm text-stone-500 font-serif mb-1">Nombre {num}</div>
        <div className={clsx(
          "text-3xl font-bold",
          isMissing ? "text-red-600" : 
          isExcess ? "text-amber-600" : 
          "text-stone-600"
        )}>
          {count}
        </div>
        {isMissing && <div className="text-[10px] uppercase tracking-widest text-red-500 mt-1">Dette</div>}
        {isExcess && <div className="text-[10px] uppercase tracking-widest text-amber-600 mt-1">Force</div>}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
      <h3 className="text-center font-serif text-[#78350f] mb-6 text-xl">Grille d'Inclusion</h3>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => renderCell(num))}
      </div>
    </div>
  );
}
