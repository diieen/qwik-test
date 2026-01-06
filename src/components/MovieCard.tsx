import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { type Movie } from "~/services/supabase";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard = component$<MovieCardProps>(({ movie }) => {
  return (
    <article
      class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-amber-500/5 transition duration-300 hover:-translate-y-1 hover:border-amber-300/50"
    >
      <div class="relative">
        {movie.banner ? (
          <Image
            src={movie.banner}
            alt={movie.name}
            layout="constrained"
            width={640}
            height={360}
            class="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div class="flex h-52 w-full items-center justify-center bg-slate-900 text-sm text-slate-400">
            Sem banner disponível
          </div>
        )}
        <div class="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/50 to-transparent" />
        <div class="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold text-amber-100">
          {movie.release_date ? `Lançamento ${movie.release_date}` : "Data não informada"}
        </div>
      </div>
      <div class="flex flex-col gap-3 p-5">
        <div class="flex items-start justify-between gap-3">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold text-slate-50">{movie.name}</h3>
            <p class="text-xs font-medium text-slate-300">
              {movie.duration_minutes ? `${movie.duration_minutes} min` : "Duração não informada"}
            </p>
          </div>
        </div>
        {movie.synopsis && <p class="text-sm leading-relaxed text-slate-200/90">{movie.synopsis}</p>}
      </div>
    </article>
  );
});
