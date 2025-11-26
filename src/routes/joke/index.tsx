import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { supabase, type Movie } from '~/services/supabase';

export const useMovies = routeLoader$(async () => {
  const { data, error } = await supabase
    .from('Movies')
    .select('*')
    .order('release_date', { ascending: false });

  if (error) {
    console.error('Erro Supabase:', error);
    throw error;
  }

  return (data ?? []) as Movie[];
});

export default component$(() => {
  const movies = useMovies();

  console.log('Movies:', movies.value);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Movies</h1>

      {movies.value.length === 0 && <p>Nenhum filme cadastrado ainda.</p>}

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {movies.value.map((movie) => (
          <article
            key={movie.id}
            style={{
              display: 'flex',
              gap: '1rem',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1rem',
            }}
          >
            {movie.banner && (
              <img
                src={movie.banner}
                alt={movie.name}
                style={{ width: '200px', borderRadius: '8px', objectFit: 'cover' }}
              />
            )}

            <div>
              <h2>{movie.name}</h2>
              <p>
                <strong>Lançamento:</strong>{' '}
                {new Date(movie.release_date).toLocaleDateString('pt-BR')}
              </p>

              {movie.duration_minutes && (
                <p>
                  <strong>Duração:</strong> {movie.duration_minutes} min
                </p>
              )}

              {movie.synopsis && <p>{movie.synopsis}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
});
