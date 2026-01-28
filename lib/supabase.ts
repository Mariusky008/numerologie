import { createClient } from '@supabase/supabase-js';

// Environment variables are now used for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ymmepfqrvutjihubijtv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey && typeof window !== 'undefined') {
  console.warn("Supabase Anon Key is missing. Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
