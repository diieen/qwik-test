import { component$, Signal, useSignal, useTask$ } from "@builder.io/qwik";
import type { Movie } from "~/services/supabase";

export type Sort = {
  label: string;
  value: keyof Movie;
};

type SearchSectionProps = {
  sortLabels: Sort[];
  search: Signal<string>;
};

export const SearchSection = component$<SearchSectionProps>(({ sortLabels, search }) => {
  const draft = useSignal(search.value);

  useTask$(({ track, cleanup }) => {
    const term = track(() => draft.value);
    const timer = setTimeout(() => {
      search.value = term;
    }, 400);
    cleanup(() => clearTimeout(timer));
  });

  return (
    <section class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-amber-500/5 backdrop-blur">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="w-full md:max-w-xl">
          <label class="text-sm font-medium text-amber-100">Buscar</label>
          <div class="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 shadow-inner shadow-black/30 focus-within:border-amber-300/70">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="opacity-70" aria-hidden="true">
              <path d="M15.5 15.5 20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.6" />
            </svg>
            <input
              type="search"
              placeholder="Procure por título"
              class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              value={draft.value}
              onInput$={(e) => (draft.value = (e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
      </div>
      <div class="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
        <span class="rounded-full bg-white/5 px-3 py-1 font-semibold text-amber-100">Opções de ordenação</span>
        {sortLabels.map(({ label }) => (
          <span key={label} class="rounded-full bg-slate-900/60 px-3 py-1 font-medium">
            {label}
          </span>
        ))}
      </div>
    </section>
  );
});
