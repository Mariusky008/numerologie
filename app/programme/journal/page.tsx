'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookText, 
  Search, 
  Calendar, 
  ChevronRight,
  Filter,
  ArrowRight
} from 'lucide-react';
import { PROGRAM_DATA } from '@/lib/programme/data';

export default function JournalHistoryPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Collect all journal entries from localStorage
    const allEntries: any[] = [];
    PROGRAM_DATA.forEach(month => {
      month.weeks.forEach(week => {
        week.days.forEach(day => {
          const text = localStorage.getItem(`journal_${day.id}`);
          if (text) {
            allEntries.push({
              dayId: day.id,
              dayNumber: day.dayNumber,
              title: day.title,
              theme: day.theme,
              text,
              weekTitle: week.title,
              monthNumber: month.monthNumber
            });
          }
        });
      });
    });
    setEntries(allEntries.reverse()); // Newest first
  }, []);

  const filteredEntries = entries.filter(e => 
    e.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-32">
      
      {/* Header */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em]">
          <BookText className="w-4 h-4" />
          HISTORIQUE DES OBSERVATIONS
        </div>
        <h1 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">Mon Journal Personnel</h1>
        <p className="text-xl text-[#1A1C2E]/50 max-w-2xl font-light">
          Retrouve ici toutes tes notes et réflexions consignées au fil de ton parcours.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A1C2E]/20" />
          <input 
            type="text"
            placeholder="Rechercher une observation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#1A1C2E]/5 rounded-3xl py-5 pl-16 pr-8 text-lg focus:outline-none focus:border-[#C9A24D] transition-colors shadow-sm"
          />
        </div>
        <button className="px-8 py-5 bg-[#F8F9FA] border border-[#1A1C2E]/5 rounded-3xl flex items-center gap-3 text-[#1A1C2E]/60 font-bold text-sm uppercase tracking-widest hover:bg-white transition-all">
          <Filter className="w-4 h-4" />
          Filtrer
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-8">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, i) => (
            <motion.div 
              key={entry.dayId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-10 md:p-12 rounded-[60px] border border-[#1A1C2E]/5 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="grid md:grid-cols-[200px_1fr] gap-12">
                <div className="space-y-6 border-r border-[#1A1C2E]/5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">Mois {entry.monthNumber}</p>
                    <p className="text-sm font-bold text-[#1A1C2E]/30 uppercase tracking-widest">Jour {entry.dayNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#1A1C2E]/60 uppercase tracking-widest">{entry.theme}</p>
                    <h3 className="text-xl font-serif font-bold italic leading-tight">{entry.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <p className="text-2xl text-[#1A1C2E]/80 font-light leading-relaxed italic">
                    « {entry.text} »
                  </p>
                  <div className="pt-6 border-t border-[#1A1C2E]/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20">Semaine : {entry.weekTitle}</span>
                    <button className="text-[#C9A24D] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-all">
                      Voir le jour <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-32 text-center space-y-6 bg-white/50 rounded-[60px] border-2 border-dashed border-[#1A1C2E]/5">
            <Calendar className="w-12 h-12 text-[#1A1C2E]/10 mx-auto" />
            <p className="text-xl text-[#1A1C2E]/30 italic">Aucune observation ne correspond à ta recherche.</p>
          </div>
        )}
      </div>

    </div>
  );
}
