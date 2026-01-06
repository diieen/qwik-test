import { Signal, useComputed$ } from "@builder.io/qwik";
import { Movie } from "~/services/supabase";

const compareNames = (a: string, b: string) =>
  a.localeCompare(b, "pt", { sensitivity: "base" });

function firstIndexAtOrAfter(items: Movie[], target: string): number {
  let left = 0;
  let right = items.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    const name = items[mid].name;

    if (compareNames(name, target) < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function firstIndexAfter(items: Movie[], target: string): number {
  let left = 0;
  let right = items.length;

  while (left < right) {
    const mid = (left + right) >> 1;
    const name = items[mid].name;

    if (compareNames(name, target) <= 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function nextPrefix(prefix: string): string {
  return (
    prefix.slice(0, -1) +
    String.fromCharCode(prefix.charCodeAt(prefix.length - 1) + 1)
  );
}

export const searchForName = (items: Movie[], searchTerm: Signal<string>): Movie[] => {
  const filtered = useComputed$(() => {
    const term = searchTerm.value.trim().toLowerCase();
    if (!term) return items;

    const start = firstIndexAtOrAfter(items, term);
    const end = firstIndexAfter(items, nextPrefix(term));

    return items.slice(start, end);
  });

  return filtered.value;
};
