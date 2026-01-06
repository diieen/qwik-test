import { supabase, type Movie } from '~/services/supabase';

export const fetchMovies = async (): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from('Movies')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Erro Supabase:', error);
    throw error;
  }

  return data ?? [];
};