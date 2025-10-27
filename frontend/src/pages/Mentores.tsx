import { useCallback, useEffect, useMemo, useState } from "react"
import mentorsData from "@/data/mentors.json"
import type { Mentor } from "@/types/mentor"
import { SEO } from "@/lib/seo"
import { Section } from "@/components/Section"
import { MentorCard } from "@/components/mentors/MentorCard"
import { Filters } from "@/components/mentors/Filters"
import {
  type AppliedFilters,
  type Filters as QueryFilters,
  filterMentors,
  sortMentors,
  type ProgramWindowOption,
  createProgramWindowId,
} from "@/lib/mentors/search"
import { useQueryState } from "@/lib/hooks/useQueryState"
import { PolicyModal } from "@/components/PolicyModal"
import { Button } from "@/components/Button"

const mentors = mentorsData as Mentor[]

const BASE_FILTERS: AppliedFilters = {
  q: "",
  expertise: [],
  ods: [],
  lang: [],
  remote: undefined,
  programWindows: [],
}

const INITIAL_STATE: QueryFilters = {
  ...BASE_FILTERS,
  sort: "recommended",
}

const PAGE_SIZE = 20

function normalizeFilters(state: QueryFilters): AppliedFilters {
  const { sort: _sort, ...rest } = state
  return {
    ...BASE_FILTERS,
    ...rest,
    expertise: rest.expertise ?? [],
    ods: rest.ods ?? [],
    lang: rest.lang ?? [],
    programWindows: rest.programWindows ?? [],
    q: rest.q ?? "",
  }
}

function aggregateOptions(data: Mentor[]): {
  expertise: string[]
  ods: number[]
  languages: string[]
  programWindows: ProgramWindowOption[]
} {
  const expertiseSet = new Set<string>()
  const odsSet = new Set<number>()
  const languagesSet = new Set<string>()
  const programWindowMap = new Map<string, ProgramWindowOption>()

  data.forEach((mentor) => {
    mentor.expertise.forEach((item) => expertiseSet.add(item))
    mentor.ods.forEach((item) => odsSet.add(item))
    mentor.languages.forEach((item) => languagesSet.add(item))
    mentor.program?.windows.forEach((window) => {
      const id = createProgramWindowId(window)
      if (!programWindowMap.has(id)) {
        programWindowMap.set(id, {
          id,
          label: window.label,
          start: window.start,
          end: window.end,
        })
      }
    })
  })

  const programWindows = Array.from(programWindowMap.values()).sort((a, b) => {
    const aTime = a.start ? new Date(a.start).getTime() : Number.POSITIVE_INFINITY
    const bTime = b.start ? new Date(b.start).getTime() : Number.POSITIVE_INFINITY
    return aTime - bTime
  })

  return {
    expertise: Array.from(expertiseSet).sort((a, b) => a.localeCompare(b, "pt-BR")),
    ods: Array.from(odsSet).sort((a, b) => a - b),
    languages: Array.from(languagesSet).sort((a, b) => a.localeCompare(b, "pt-BR")),
    programWindows,
  }
}

export default function Mentores() {
  const [queryState, setQueryState] = useQueryState(INITIAL_STATE)
  const [page, setPage] = useState(1)
  const [isFiltersOpen, setFiltersOpen] = useState(false)
  const [isPolicyOpen, setPolicyOpen] = useState(false)

  const sortOrder = queryState.sort ?? "recommended"
  const activeFilters = useMemo(() => normalizeFilters(queryState), [queryState])

  const options = useMemo(() => aggregateOptions(mentors), [])

  const filtersSignature = useMemo(
    () =>
      JSON.stringify({
        q: activeFilters.q ?? "",
        expertise: activeFilters.expertise,
        ods: activeFilters.ods,
        lang: activeFilters.lang ?? [],
        remote: activeFilters.remote ?? null,
        programWindows: activeFilters.programWindows ?? [],
      }),
    [activeFilters],
  )

  useEffect(() => {
    setPage(1)
  }, [filtersSignature])

  const { items } = useMemo(
    () => filterMentors(mentors, { ...activeFilters, sort: sortOrder }),
    [activeFilters, sortOrder],
  )

  const sortedMentors = useMemo(() => sortMentors(items, sortOrder), [items, sortOrder])
  const totalResults = sortedMentors.length
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage)
    }
  }, [currentPage, page])

  const paginatedMentors = useMemo(
    () => sortedMentors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [sortedMentors, currentPage],
  )

  const applyFilters = useCallback(
    (next: AppliedFilters) => {
      setPage(1)
      setQueryState((prev) => ({
        ...prev,
        ...next,
        expertise: next.expertise ?? [],
        ods: next.ods ?? [],
        lang: next.lang ?? [],
        q: next.q ?? "",
        programWindows: next.programWindows ?? [],
        remote: next.remote,
      }))
    },
    [setQueryState],
  )

  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const suggestionChips = useMemo(() => {
    const chips: Array<{ label: string; onClick: () => void }> = []

    if (activeFilters.q) {
      chips.push({
        label: `Remover busca "${activeFilters.q}"`,
        onClick: () => applyFilters({ ...activeFilters, q: "" }),
      })
    }

    activeFilters.expertise.forEach((item) => {
      chips.push({
        label: `Remover ${item}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            expertise: activeFilters.expertise.filter((value) => value !== item),
          }),
      })
    })

    activeFilters.ods.forEach((item) => {
      chips.push({
        label: `Remover ODS ${item}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            ods: activeFilters.ods.filter((value) => value !== item),
          }),
      })
    })

    ;(activeFilters.lang ?? []).forEach((item) => {
      chips.push({
        label: `Remover idioma ${item}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            lang: (activeFilters.lang ?? []).filter((value) => value !== item),
          }),
      })
    })

    ;(activeFilters.programWindows ?? []).forEach((id) => {
      const option = options.programWindows.find((window) => window.id === id)
      const label = option?.label ?? "janela"
      chips.push({
        label: `Remover ${label}`,
        onClick: () =>
          applyFilters({
            ...activeFilters,
            programWindows: (activeFilters.programWindows ?? []).filter((value) => value !== id),
          }),
      })
    })

    if (activeFilters.remote) {
      chips.push({
        label: "Incluir atendimentos presenciais",
        onClick: () => applyFilters({ ...activeFilters, remote: undefined }),
      })
    }

    chips.push({ label: "Ver todos os mentores", onClick: () => applyFilters(BASE_FILTERS) })

    return chips.slice(0, 6)
  }, [activeFilters, applyFilters, options.programWindows])

  return (
    <>
      <SEO
        title="Mentores voluntários — Mentoria Solidária (GMS)"
        description="Rede de especialistas voluntários com atendimento mediado pelo programa Mentoria Solidária."
        canonical="/mentores"
      />
      <Section
        title="Encontre mentores do programa"
        description="Use os filtros para explorar a rede GMS. Toda mentoria é voluntária, acontece uma vez por semana e segue as janelas oficiais do Mentoria Solidária."
      >
        <div className="flex flex-col gap-8">
          <div
            role="region"
            aria-label="Informações do programa"
            className="rounded-3xl border border-brand-green/25 bg-brand-green/10 p-6 text-brand-dark"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-base font-semibold text-brand-dark">Mentoria voluntária, 1× por semana.</p>
                <p className="mt-2 text-sm text-brand-dark/90">
                  As sessões acontecem em janelas fixas do programa. Contatos diretos com mentores não são permitidos — toda a comunicação acontece pelo Mentoria Solidária.
                </p>
              </div>
              <Button onClick={() => setPolicyOpen(true)}>Entenda como funciona</Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-green/40 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 md:hidden"
                aria-controls="mobile-filters"
                aria-expanded={isFiltersOpen}
              >
                <span aria-hidden>🔍</span>
                Filtrar resultados
              </button>

              <div className="hidden w-full md:block">
                <Filters
                  value={activeFilters}
                  initialValue={BASE_FILTERS}
                  totalResults={totalResults}
                  onApply={applyFilters}
                  options={options}
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
                      className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                    >
                      Fechar
                    </button>
                  </div>
                  <Filters
                    value={activeFilters}
                    initialValue={BASE_FILTERS}
                    totalResults={totalResults}
                    onApply={(next) => {
                      applyFilters(next)
                    }}
                    options={options}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2" role="status" aria-live="polite">
              <span className="text-sm text-slate-500">{mentors.length} mentores voluntários na rede</span>
              <strong className="text-lg text-slate-900">{totalResults} mentor(es) encontrado(s)</strong>
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
                      className="chip-toggle inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-green/40 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
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
                  className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition enabled:hover:border-brand-green/40 enabled:hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:opacity-50"
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
                  className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition enabled:hover:border-brand-green/40 enabled:hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:opacity-50"
                >
                  Próxima
                </button>
              </nav>
            )}
          </div>
        </div>
      </Section>
      <PolicyModal open={isPolicyOpen} onOpenChange={setPolicyOpen} />
    </>
  )
}
