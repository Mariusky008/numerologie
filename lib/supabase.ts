import { createClient } from '@supabase/supabase-js';

// HARDCODED KEYS (Updated with correct project keys provided by user)
const supabaseUrl = 'https://ymmepfqrvutjihubijtv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltbWVwZnFydnV0amlodWJpanR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0ODI2ODgsImV4cCI6MjA4NDA1ODY4OH0.djAoYDLd-GwsFdXYevDBTHslXuamEhto5A_xNDf6Q-c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
