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

export interface JournalEntry {
  text: string;
  coach_feedback?: string;
  updated_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  context?: any;
}

export interface ProgrammeProgress {
  user_id: string;
  completed_days: string[]; // Array of day IDs
  journal_entries: Record<string, JournalEntry>; // dayId -> entry
  chat_history?: ChatMessage[];
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

  async saveJournalEntry(userId: string, dayId: string, text: string, coachFeedback?: string) {
    // 1. Get current progress to preserve other entries
    const progress = await this.getProgress(userId);
    const journalEntries = progress?.journal_entries || {};
    
    // 2. Update with new entry
    journalEntries[dayId] = {
      text,
      coach_feedback: coachFeedback || journalEntries[dayId]?.coach_feedback,
      updated_at: new Date().toISOString()
    };
    
    return this.upsertProgress({
      user_id: userId,
      journal_entries: journalEntries
    });
  },

  async saveChatMessage(userId: string, message: ChatMessage) {
    const progress = await this.getProgress(userId);
    const chatHistory = progress?.chat_history || [];
    
    chatHistory.push(message);
    
    return this.upsertProgress({
      user_id: userId,
      chat_history: chatHistory
    });
  },

  // --- SYNC LOCAL TO DB ---
  async syncLocalToDb(userId: string) {
    const completedDays = JSON.parse(localStorage.getItem('completed_days') || '[]');
    
    // 1. Get current progress from DB to merge
    const progress = await this.getProgress(userId);
    const journalEntries: Record<string, JournalEntry> = progress?.journal_entries || {};
    const chatHistory: ChatMessage[] = progress?.chat_history || [];
    
    // 2. Scan localStorage for local journal entries
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('journal_')) {
        const dayId = key.replace('journal_', '');
        const localText = localStorage.getItem(key) || '';
        const coachFeedback = localStorage.getItem(`coach_feedback_${dayId}`);
        
        // Only update if text is different or not present
        if (!journalEntries[dayId] || journalEntries[dayId].text !== localText) {
          journalEntries[dayId] = {
            text: localText,
            coach_feedback: coachFeedback || journalEntries[dayId]?.coach_feedback,
            updated_at: new Date().toISOString()
          };
        }
      }
    }

    // 3. Sync local chat history
    const localChat = JSON.parse(localStorage.getItem('coach_chat_history') || '[]');
    if (localChat.length > chatHistory.length) {
      // Basic merge: prefer the longer one for now (or could be smarter)
      // In a real app, we'd use timestamps or IDs
    }

    if (completedDays.length > 0 || Object.keys(journalEntries).length > 0 || localChat.length > 0) {
      await this.upsertProgress({
        user_id: userId,
        completed_days: completedDays,
        journal_entries: journalEntries,
        chat_history: localChat.length > chatHistory.length ? localChat : chatHistory
      });
    }
  },

  // --- SYNC DB TO LOCAL ---
  async syncDbToLocal(userId: string) {
    const progress = await this.getProgress(userId);
    if (progress) {
      localStorage.setItem('completed_days', JSON.stringify(progress.completed_days));
      
      Object.entries(progress.journal_entries).forEach(([dayId, entry]) => {
        localStorage.setItem(`journal_${dayId}`, entry.text);
        if (entry.coach_feedback) {
          localStorage.setItem(`coach_feedback_${dayId}`, entry.coach_feedback);
        }
      });

      if (progress.chat_history) {
        localStorage.setItem('coach_chat_history', JSON.stringify(progress.chat_history));
      }
    }
  }
};
