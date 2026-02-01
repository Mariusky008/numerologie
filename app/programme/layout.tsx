'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  BookText, 
  MessageSquare, 
  ShieldCheck, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Brain,
  Lock,
  Activity
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ProgrammeService } from '@/lib/programme/service';

export default function ProgrammeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [session, setSession] = useState<any>(null);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session && pathname !== '/programme/login' && pathname !== '/programme/access') {
        router.push('/programme/login');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && pathname !== '/programme/login' && pathname !== '/programme/access') {
        router.push('/programme/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  // Load progress & Sync
  useEffect(() => {
    if (session) {
      const syncData = async () => {
        try {
          // 1. Sync DB to Local (to get latest from other devices)
          await ProgrammeService.syncDbToLocal(session.user.id);
          
          // 2. Sync Local to DB (to save what was done offline/anonymous)
          await ProgrammeService.syncLocalToDb(session.user.id);

          // 3. Update UI
          const completed = JSON.parse(localStorage.getItem('completed_days') || '[]');
          const totalDays = 84; 
          setProgress(Math.round((completed.length / totalDays) * 100));
        } catch (err) {
          console.error("Sync Error:", err);
        }
      };
      
      syncData();
    }
  }, [pathname, session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/programme/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, path: '/programme' },
    { id: 'planning', label: 'Mon Planning', icon: Calendar, path: '/programme/planning' },
    { id: 'journal', label: 'Mon Journal', icon: BookText, path: '/programme/journal' },
    { id: 'coach', label: 'Coach IA', icon: MessageSquare, path: '/programme/coach' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans flex">
      
      {/* SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#1A1C2E] text-white transition-all duration-500 overflow-hidden ${isSidebarOpen ? 'w-72' : 'w-20'} hidden md:flex flex-col shadow-2xl`}
      >
        {/* Logo Section */}
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#C9A24D] flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-[#1A1C2E]" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif font-bold text-xl tracking-tight"
            >
              Votre Légende
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${isActive ? 'bg-[#C9A24D] text-[#1A1C2E]' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
              >
                <item.icon className={`w-6 h-6 shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                {isSidebarOpen && (
                  <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/5 space-y-4">
          {isSidebarOpen && (
            <div className="p-6 bg-white/5 rounded-[40px] border border-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-[#C9A24D]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Activité Biométrique</span>
                </div>
                <span className="text-[10px] font-bold text-[#C9A24D]">{progress}%</span>
              </div>
              
              <div className="h-12 flex items-end gap-1 px-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [
                        `${20 + Math.random() * 60}%`, 
                        `${20 + Math.random() * 60}%`, 
                        `${20 + Math.random() * 60}%`
                      ] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5 + Math.random(), 
                      ease: "easeInOut" 
                    }}
                    className="flex-1 bg-[#C9A24D]/20 rounded-full"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-[#C9A24D]"
                  />
                </div>
                <p className="text-[8px] font-medium text-center text-white/20 uppercase tracking-[0.2em]">Sincronicité du parcours</p>
              </div>
            </div>
          )}
          
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all group`}
          >
            <LogOut className="w-6 h-6 shrink-0" />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest text-inherit">Se déconnecter</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-20 bg-[#1A1C2E] text-white px-6 flex items-center justify-between z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C9A24D] flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#1A1C2E]" />
          </div>
          <span className="font-serif font-bold tracking-tight">Votre Légende</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white/5 rounded-xl"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'} min-h-screen flex flex-col`}>
        {/* TOP BAR / BREADCRUMBS */}
        <header className="h-24 px-10 flex items-center justify-between border-b border-[#1A1C2E]/5 bg-white/50 backdrop-blur-md sticky top-0 z-40 hidden md:flex">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1C2E]/30">Méthode d’Alignement Décision–Action</h2>
            <p className="font-serif font-bold text-xl italic">Décider et agir de manière cohérente</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#F8F9FA] rounded-full border border-[#1A1C2E]/5">
              <ShieldCheck className="w-4 h-4 text-[#C9A24D]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/60">Espace Sécurisé</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 md:p-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* LEGAL FOOTER (Required everywhere) */}
        <footer className="p-8 text-center border-t border-[#1A1C2E]/5 bg-white/30">
          <p className="text-[10px] font-medium text-[#1A1C2E]/30 uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
            “Ce programme est un parcours d’observation et de réflexion personnelle. 
            Il ne constitue ni une thérapie, ni un accompagnement médical ou psychologique. 
            Aucun résultat spécifique n’est garanti.”
          </p>
        </footer>
      </main>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-[#1A1C2E] z-50 pt-24 px-6 flex flex-col"
          >
            <nav className="flex-1 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-6 p-6 rounded-3xl bg-white/5 text-white"
                >
                  <item.icon className="w-8 h-8 text-[#C9A24D]" />
                  <span className="text-xl font-bold uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="pb-12 space-y-8">
              <div className="p-8 bg-white/5 rounded-[40px] space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black uppercase tracking-widest text-white/40">Progression globale</span>
                  <span className="text-2xl font-serif font-bold text-[#C9A24D]">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C9A24D]" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <button 
                onClick={() => router.push('/')}
                className="w-full py-6 text-white/40 font-bold uppercase tracking-widest"
              >
                Quitter l'espace
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
