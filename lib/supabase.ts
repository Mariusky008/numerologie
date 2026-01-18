import { createClient } from '@supabase/supabase-js';

// HARDCODED KEYS (Temporary fix for Vercel env vars issue)
const supabaseUrl = 'https://ymmepfqrvutjihubijtv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybmRmc3Z6anpneGVhZ215c3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MzYxODIsImV4cCI6MjA4MjUxMjE4Mn0.-8Pt0H9Ee2ETyjIRB1zt_ihIiXiA04Lar7iBf4mfyBM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
