import type { KeyboardEvent } from "react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ADVANCED_SENIORITY_VALUE,
  type AppliedFilters,
  type FilterCounts,
} from "@/lib/mentors/search";

interface FilterOptions {
  expertise: string[];
  ods: number[];
  languages: string[];
  seniority: string[];
}

interface FiltersProps {
  value: AppliedFilters;
  initialValue: AppliedFilters;
  counts: FilterCounts;
  options: FilterOptions;
  totalResults: number;
  onApply: (value: AppliedFilters) => void;
  onClear: () => void;
}

function filtersAreEqual(a: AppliedFilters, b: AppliedFilters): boolean {
  return (
    (a.q ?? "") === (b.q ?? "") &&
    (a.location ?? "") === (b.location ?? "") &&
    (a.seniority ?? "") === (b.seniority ?? "") &&
    a.remote === b.remote &&
    a.available === b.available &&
    arraysAreEqual(a.expertise, b.expertise) &&
    arraysAreEqual(a.ods, b.ods) &&
    arraysAreEqual(a.lang ?? [], b.lang ?? [])
  );
}

function arraysAreEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item, index) => item === b[index]);
}

function toggleValue<T>(values: T[], item: T): T[] {
  return values.includes(item) ? values.filter((value) => value !== item) : [...values, item];
}

function Chip({
  label,
  active,
  onToggle,
  count,
  className,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  count?: number;
  className?: string;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "chip-toggle inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
        active
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700",
        className,
      )}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500" aria-hidden>
          {count}
        </span>
      )}
    </span>
  );
}

export function Filters({
  value,
  initialValue,
  counts,
  options,
  totalResults,
  onApply,
  onClear,
}: FiltersProps) {
  const [draft, setDraft] = useState<AppliedFilters>(value);
  const hasHydratedRef = useRef(false);
  const skipAutoApplyRef = useRef(false);
  useEffect(() => {
    if (!filtersAreEqual(value, draft)) {
      setDraft(value);
    }
  }, [draft, value]);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true;
      return;
    }

    if (skipAutoApplyRef.current) {
      skipAutoApplyRef.current = false;
      return;
    }

    if (filtersAreEqual(draft, value)) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onApply(draft);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [draft, onApply, value]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    skipAutoApplyRef.current = true;
    onApply(draft);
  };

  const handleClear = () => {
    setDraft(initialValue);
    skipAutoApplyRef.current = true;
    onClear();
    onApply(initialValue);
  };

  const handleQuickToggle = (key: "available" | "remote" | "seniority" | "lang") => {
    setDraft((current) => {
      if (key === "available") {
        return { ...current, available: current.available ? undefined : true };
      }

      if (key === "remote") {
        return { ...current, remote: current.remote ? undefined : true };
      }

      if (key === "seniority") {
        const nextValue = current.seniority === ADVANCED_SENIORITY_VALUE ? undefined : ADVANCED_SENIORITY_VALUE;
        return { ...current, seniority: nextValue };
      }

      const targetLanguage = options.languages.find((language) => language.toLowerCase().includes("ingl"));
      if (!targetLanguage) {
        return current;
      }

      const currentLang = current.lang ?? [];
      const nextLang = currentLang.includes(targetLanguage)
        ? currentLang.filter((item) => item !== targetLanguage)
        : [...currentLang, targetLanguage];

      return { ...current, lang: nextLang };
    });
  };

  const quickFilters = [
    {
      key: "available" as const,
      label: "Disponível",
      active: Boolean(draft.available),
    },
    {
      key: "remote" as const,
      label: "Remoto",
      active: Boolean(draft.remote),
    },
    {
      key: "seniority" as const,
      label: "Sênior/Especialista",
      active: draft.seniority === ADVANCED_SENIORITY_VALUE,
    },
    {
      key: "lang" as const,
      label: "Fala inglês",
      active: (draft.lang ?? []).some((language) => language.toLowerCase().includes("ingl")),
    },
  ];

  return (
    <section aria-label="Filtros de mentores" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2" htmlFor="mentor-search">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Busca</span>
            <input
              id="mentor-search"
              type="search"
              placeholder="Busque por nome, expertise, ODS ou cidade"
              value={draft.q ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, q: event.target.value }))}
              className="h-12 rounded-full border border-slate-200 px-5 text-sm text-slate-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Buscar mentores"
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Filtros rápidos</span>
            <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
              {quickFilters.map((filter) => (
                <Chip
                  key={filter.key}
                  label={filter.label}
                  active={filter.active}
                  onToggle={() => handleQuickToggle(filter.key)}
                  className="whitespace-nowrap"
                />
              ))}
            </div>
          </div>

          <div role="status" aria-live="polite" className="text-sm text-slate-500">
            {totalResults === 1 ? "1 resultado" : `${totalResults} resultados`}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <fieldset className="flex flex-col gap-3" aria-label="Filtrar por expertise">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Expertise</legend>
            <div className="flex flex-wrap gap-2">
              {options.expertise.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  active={draft.expertise.includes(item)}
                  count={counts.expertise[item] ?? 0}
                  onToggle={() =>
                    setDraft((current) => ({
                      ...current,
                      expertise: toggleValue(current.expertise, item),
                    }))
                  }
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3" aria-label="Filtrar por ODS">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">ODS</legend>
            <div className="flex flex-wrap gap-2">
              {options.ods.map((item) => (
                <Chip
                  key={item}
                  label={`ODS ${item}`}
                  active={draft.ods.includes(item)}
                  count={counts.ods[item] ?? 0}
                  onToggle={() =>
                    setDraft((current) => ({
                      ...current,
                      ods: toggleValue(current.ods, item),
                    }))
                  }
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3" aria-label="Filtrar por idiomas">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Idiomas</legend>
            <div className="flex flex-wrap gap-2">
              {options.languages.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  active={(draft.lang ?? []).includes(item)}
                  count={counts.lang[item] ?? 0}
                  onToggle={() =>
                    setDraft((current) => {
                      const currentLang = current.lang ?? [];
                      return {
                        ...current,
                        lang: toggleValue(currentLang, item),
                      };
                    })
                  }
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3" aria-label="Filtrar por senioridade">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Senioridade</legend>
            <div className="flex flex-wrap gap-2">
              {options.seniority.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  active={draft.seniority === item}
                  onToggle={() =>
                    setDraft((current) => ({
                      ...current,
                      seniority: current.seniority === item ? undefined : item,
                    }))
                  }
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3 lg:col-span-2" aria-label="Filtrar por localização">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Localização</legend>
            <input
              type="search"
              placeholder="Cidade, estado ou país"
              value={draft.location ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))}
              className="h-12 rounded-full border border-slate-200 px-5 text-sm text-slate-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Buscar por localização"
            />
          </fieldset>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Aplicar
          </button>
        </div>
      </form>
    </section>
  );
}
