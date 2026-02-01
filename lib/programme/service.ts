import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  birth_date?: string;
  birth_time?: string;
  birth_city?: string;
  life_path_number?: number;
  sun_sign?: string;
  moon_sign?: string;
  ascendant?: string;
  dossier_data?: any; // Full results from the Mirror analysis
}

export interface ProgrammeProgress {
  user_id: string;
  completed_days: string[]; // Array of day IDs
  journal_entries: Record<string, string>; // dayId -> text
  last_updated: string;
}

export const ProgrammeService = {
  // --- USER PROFILE ---
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_programme_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data as UserProfile | null;
  },

  async upsertProfile(profile: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_programme_profiles')
      .upsert(profile)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  },

  // --- PROGRAMME PROGRESS ---
  async getProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_programme_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data as ProgrammeProgress | null;
  },

  async upsertProgress(progress: Partial<ProgrammeProgress>) {
    const { data, error } = await supabase
      .from('user_programme_progress')
      .upsert({
        ...progress,
        last_updated: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as ProgrammeProgress;
  },

  // --- SYNC LOCAL TO DB ---
  async syncLocalToDb(userId: string) {
    const completedDays = JSON.parse(localStorage.getItem('completed_days') || '[]');
    const journalEntries: Record<string, string> = {};
    
    // Scan localStorage for journal entries
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('journal_')) {
        const dayId = key.replace('journal_', '');
        journalEntries[dayId] = localStorage.getItem(key) || '';
      }
    }

    if (completedDays.length > 0 || Object.keys(journalEntries).length > 0) {
      await this.upsertProgress({
        user_id: userId,
        completed_days: completedDays,
        journal_entries: journalEntries
      });
    }
  },

  // --- SYNC DB TO LOCAL ---
  async syncDbToLocal(userId: string) {
    const progress = await this.getProgress(userId);
    if (progress) {
      localStorage.setItem('completed_days', JSON.stringify(progress.completed_days));
      Object.entries(progress.journal_entries).forEach(([dayId, text]) => {
        localStorage.setItem(`journal_${dayId}`, text);
      });
    }
  }
};
