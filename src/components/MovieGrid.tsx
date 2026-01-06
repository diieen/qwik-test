import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { type Movie } from "~/services/supabase";
import { MovieCard } from "./MovieCard";

type MovieGridProps = {
  movies: Movie[];
  itemsPerPage: number;
};

export const MovieGrid = component$<MovieGridProps>(({ movies, itemsPerPage }) => {
  const page = useSignal(1);
  const paginatedMovies = useComputed$(() => {
    const initialIndex = (page.value - 1) * itemsPerPage;
    return movies.slice(0, initialIndex + itemsPerPage);
  });  
  const showLoadMore = useComputed$(() => {
    return paginatedMovies.value.length < movies.length;
  });
  
  return (
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Filmes</p>
          <h2 class="text-xl font-semibold text-slate-50">Para assistir agora</h2>
        </div>
      </div>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {paginatedMovies.value.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {showLoadMore.value && (
        <div class="flex justify-center">
          <button
            class="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700 cursor-pointer"
            onClick$={() => {
              page.value += 1;
            }}
          >
            Carregar mais
          </button>
        </div>
      )}
    </section>
  );
});
