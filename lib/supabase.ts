
import { createClient } from '@supabase/supabase-js';

// Ces variables d'environnement doivent être définies dans Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Création du client Supabase uniquement si les variables sont présentes
// Cela évite les erreurs lors du build si les variables manquent
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;
