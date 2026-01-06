import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env vars não configuradas');
}

export type Movie = {
  id: number;
  name: string;
  release_date: string;
  synopsis: string | null;
  duration_minutes: number | null;
  banner: string | null;
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
