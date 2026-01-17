import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Debug Log (First 5 chars only)
if (typeof window !== 'undefined') {
  console.log('Supabase Config:', {
    url: supabaseUrl,
    keyPrefix: supabaseAnonKey ? supabaseAnonKey.substring(0, 5) + '...' : 'UNDEFINED'
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
