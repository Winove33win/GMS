import { useCallback, useEffect, useMemo, useState } from "react";
import mentorsData from "@/data/mentors.json";
import type { Mentor } from "@/types/mentor";
import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";
import { MentorCard } from "@/components/mentors/MentorCard";
import { Filters } from "@/components/mentors/Filters";
import {
  type AppliedFilters,
  type Filters as QueryFilters,
  filterMentors,
  sortMentors,
} from "@/lib/mentors/search";
import { useQueryState } from "@/lib/hooks/useQueryState";

const mentors = mentorsData as Mentor[];

const BASE_FILTERS: AppliedFilters = {
  q: "",
  expertise: [],
  ods: [],
  seniority: undefined,
  lang: [],
  location: "",
  remote: undefined,
  available: undefined,
};

const INITIAL_STATE: QueryFilters = {
  ...BASE_FILTERS,
  sort: "recommended",
};

const PAGE_SIZE = 20;

const sortOptions: Array<{ value: NonNullable<QueryFilters["sort"]>; label: string }> = [
  { value: "recommended", label: "Mais recomendados" },
  { value: "availability", label: "Maior disponibilidade" },
  { value: "recent", label: "Mais recentes" },
];

const expertiseOptions = Array.from(new Set(mentors.flatMap((mentor) => mentor.expertise))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);
const odsOptions = Array.from(new Set(mentors.flatMap((mentor) => mentor.ods))).sort((a, b) => a - b);
const seniorityOptions = Array.from(new Set(mentors.map((mentor) => mentor.seniority))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);
const languageOptions = Array.from(new Set(mentors.flatMap((mentor) => mentor.languages))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);

function normalizeFilters(state: QueryFilters): AppliedFilters {
  const { sort: _sort, ...rest } = state;
  return {
    ...BASE_FILTERS,
    ...rest,
    expertise: rest.expertise ?? [],
    ods: rest.ods ?? [],
    lang: rest.lang ?? [],
    q: rest.q ?? "",
    location: rest.location ?? "",
  };
}

export default function Mentores() {
  const [queryState, setQueryState] = useQueryState(INITIAL_STATE);
  const [page, setPage] = useState(1);
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const sortOrder = queryState.sort ?? "recommended";
  const activeFilters = useMemo(() => normalizeFilters(queryState), [queryState]);

  const filtersSignature = useMemo(
    () =>
      JSON.stringify({
        q: activeFilters.q ?? "",
        expertise: activeFilters.expertise,
        ods: activeFilters.ods,
        seniority: activeFilters.seniority ?? "",
        lang: activeFilters.lang ?? [],
        location: activeFilters.location ?? "",
        remote: activeFilters.remote ?? null,
        available: activeFilters.available ?? null,
      }),
    [activeFilters],
  );

  useEffect(() => {
    setPage(1);
  }, [filtersSignature]);

  const { items, counts } = useMemo(
    () => filterMentors(mentors, { ...activeFilters, sort: sortOrder }),
    [activeFilters, sortOrder],
  );

  const sortedMentors = useMemo(() => sortMentors(items, sortOrder), [items, sortOrder]);
  const totalResults = sortedMentors.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page]);

  const paginatedMentors = useMemo(
    () => sortedMentors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [sortedMentors, currentPage],
  );

  const applyFilters = useCallback(
    (next: AppliedFilters) => {
      setPage(1);
      setQueryState((prev) => ({
        ...prev,
        ...next,
        expertise: next.expertise ?? [],
        ods: next.ods ?? [],
        lang: next.lang ?? [],
        q: next.q ?? "",
        location: next.location ?? "",
        seniority: next.seniority,
        remote: next.remote,
        available: next.available,
      }));
    },
    [setQueryState],
  );

  const handleClearFilters = useCallback(() => {
    applyFilters(BASE_FILTERS);
  }, [applyFilters]);

  const handleSortChange = (value: NonNullable<QueryFilters["sort"]>) => {
    setQueryState((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const suggestionChips = useMemo(() => {
    const chips: Array<{ label: string; onClick: () => void }> = [];

    if (activeFilters.q) {
      chips.push({
        label: `Remover busca "${activeFilters.q}"`,
        onClick: () => applyFilters({ ...activeFilters, q: "" }),
      });
    }

    activeFilters.expertise.forEach((item) => {
      chips.push({
        label: `Remover ${item}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            expertise: activeFilters.expertise.filter((value) => value !== item),
          }),
      });
    });

    activeFilters.ods.forEach((item) => {
      chips.push({
        label: `Remover ODS ${item}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            ods: activeFilters.ods.filter((value) => value !== item),
          }),
      });
    });

    (activeFilters.lang ?? []).forEach((item) => {
      chips.push({
        label: `Remover idioma ${item}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            lang: (activeFilters.lang ?? []).filter((value) => value !== item),
          }),
      });
    });

    if (activeFilters.location) {
      chips.push({
        label: "Limpar localização",
        onClick: () => applyFilters({ ...activeFilters, location: "" }),
      });
    }

    if (activeFilters.remote) {
      chips.push({
        label: "Ver também presenciais",
        onClick: () => applyFilters({ ...activeFilters, remote: undefined }),
      });
    }

    if (activeFilters.available) {
      chips.push({
        label: "Incluir agendas completas",
        onClick: () => applyFilters({ ...activeFilters, available: undefined }),
      });
    }

    if (activeFilters.seniority) {
      chips.push({
        label: "Todas as senioridades",
        onClick: () => applyFilters({ ...activeFilters, seniority: undefined }),
      });
    }

    chips.push({ label: "Ver todos os mentores", onClick: () => applyFilters(BASE_FILTERS) });

    return chips.slice(0, 6);
  }, [activeFilters, applyFilters]);

  return (
    <>
      <SEO
        title="Rede de mentores e mentoras voluntárias"
        description="Conheça especialistas que apoiam iniciativas socioambientais com mentorias estratégicas. Filtre por expertise, ODS, senioridade, idiomas, disponibilidade e formato de atuação."
        canonical="/mentores"
      />
      <Section
        title="Mentores e mentoras"
        description="Encontre profissionais experientes para fortalecer suas iniciativas. Ajuste os filtros, explore a lista e escolha a pessoa ideal para sua jornada."
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 rounded-3xl bg-emerald-50/60 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Rede ativa</p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900">{mentors.length} mentores cadastrados</h3>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Atualizamos constantemente esta rede com profissionais validados e alinhados aos valores da comunidade.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-600" role="status" aria-live="polite">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Resultados atuais</span>
              <strong className="text-lg text-slate-900">{totalResults} mentor(es) encontrado(s)</strong>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 md:hidden"
                aria-controls="mobile-filters"
                aria-expanded={isFiltersOpen}
              >
                <span aria-hidden>🔍</span>
                Filtrar resultados
              </button>

              <div className="hidden md:block w-full">
                <Filters
                  value={activeFilters}
                  initialValue={BASE_FILTERS}
                  counts={counts}
                  options={{
                    expertise: expertiseOptions,
                    ods: odsOptions,
                    languages: languageOptions,
                    seniority: seniorityOptions,
                  }}
                  totalResults={totalResults}
                  onApply={applyFilters}
                  onClear={handleClearFilters}
                />
              </div>
            </div>

            {isFiltersOpen && (
              <div
                id="mobile-filters"
                className="fixed inset-0 z-50 flex flex-col bg-slate-900/40 md:hidden"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex-1" onClick={() => setFiltersOpen(false)} aria-hidden />
                <div className="mt-auto max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Filtrar mentores</h2>
                    <button
                      type="button"
                      onClick={() => setFiltersOpen(false)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    >
                      Fechar
                    </button>
                  </div>
                  <Filters
                    value={activeFilters}
                    initialValue={BASE_FILTERS}
                    counts={counts}
                    options={{
                      expertise: expertiseOptions,
                      ods: odsOptions,
                      languages: languageOptions,
                      seniority: seniorityOptions,
                    }}
                    totalResults={totalResults}
                    onApply={(next) => {
                      applyFilters(next);
                    }}
                    onClear={handleClearFilters}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Lista de mentores
                <span className="ml-2 text-sm font-normal text-slate-500">({totalResults})</span>
              </h2>
              <label className="flex items-center gap-3 text-sm text-slate-600">
                Ordenar por
                <select
                  value={sortOrder}
                  onChange={(event) => handleSortChange(event.target.value as NonNullable<QueryFilters["sort"]>)}
                  className="h-11 rounded-full border border-slate-200 px-4 text-sm text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  aria-label="Ordenar lista de mentores"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {paginatedMentors.length > 0 ? (
              <div role="list" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedMentors.map((mentor) => (
                  <MentorCard key={mentor.slug} mentor={mentor} />
                ))}
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"
                role="status"
                aria-live="polite"
              >
                <p className="text-xl font-semibold text-slate-900">Nenhum mentor encontrado</p>
                <p className="max-w-md text-sm text-slate-600">
                  Ajuste os filtros para ampliar sua busca. Você também pode entrar em contato com a nossa equipe para receber indicações personalizadas.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestionChips.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={chip.onClick}
                      className="chip-toggle inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-4" aria-label="Paginação da lista de mentores">
                <button
                  type="button"
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition enabled:hover:border-emerald-200 enabled:hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-sm font-medium text-slate-600">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition enabled:hover:border-emerald-200 enabled:hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:opacity-50"
                >
                  Próxima
                </button>
              </nav>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
