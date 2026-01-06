import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Movie } from "~/services/supabase";
import { fetchMovies } from "~/utils/fetchMovies";
import { HeroSection } from "~/components/HeroSection";
import { SearchSection, Sort } from "~/components/SearchSection";
import { MovieGrid } from "~/components/MovieGrid";
import { searchForName } from "~/utils/searchForName";

const SORT: Sort[] = [
  { label: "Mais recentes", value: "release_date" },
  { label: "Tempo de duração", value: "duration_minutes" },
  { label: "A-Z", value: "name" },
]

export const useMovies = routeLoader$<Movie[]>(async () => {
  const movies = await fetchMovies();
  return movies;
});

export default component$(() => {
  const { value: initialMovies } = useMovies();
  const search = useSignal<string>("");
  const filtered = searchForName(initialMovies, search);

  return (
    <main class="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:px-8 lg:py-14">
        <HeroSection
          title="Seu hub de filmes"
          subtitle="Explore lançamentos e descubra joias escondidas. A busca, filtros e ordenação vão entrar em breve — por enquanto aproveite para navegar pela seleção."
        />
        <SearchSection
          sortLabels={SORT}
          search={search}
        />
        <MovieGrid
          movies={filtered}
          itemsPerPage={9}
        />
      </div>
    </main>
  );
});


export const head: DocumentHead = {
  title: "Catálogo de Filmes | Qwip",
  meta: [
    {
      name: "description",
      content: "Descubra e organize sua curadoria de filmes favoritos.",
    },
  ],
};
