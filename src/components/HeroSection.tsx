import { component$ } from "@builder.io/qwik";

type HeroSectionProps = {
  title: string;
  subtitle: string;
};

export const HeroSection = component$<HeroSectionProps>(({ title, subtitle }) => {
  return (
    <header class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200">
          Catálogo vivo
        </span>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-semibold md:text-4xl">{title}</h1>
          </div>
          <p class="max-w-2xl text-base text-slate-200">{subtitle}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button class="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
          Gerenciar
        </button>
      </div>
    </header>
  );
});
