import type { KeyboardEvent, ReactNode } from "react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { AppliedFilters } from "@/lib/mentors/search"

interface FiltersProps {
  value: AppliedFilters
  initialValue: AppliedFilters
  totalResults: number
  onApply: (value: AppliedFilters) => void
  options: {
    expertise: string[]
    ods: number[]
    languages: string[]
  }
}

function filtersAreEqual(a: AppliedFilters, b: AppliedFilters): boolean {
  return (
    (a.q ?? "") === (b.q ?? "") &&
    arraysAreEqual(a.expertise, b.expertise) &&
    arraysAreEqual(a.ods, b.ods) &&
    arraysAreEqual(a.lang ?? [], b.lang ?? [])
  )
}

function arraysAreEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  return a.every((item, index) => item === b[index])
}

function Chip({
  label,
  active,
  onToggle,
  count,
  className,
}: {
  label: string
  active: boolean
  onToggle: () => void
  count?: number
  className?: string
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onToggle()
    }
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "chip-toggle inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
        active
          ? "border-brand-green bg-brand-green/10 text-brand-green"
          : "border-slate-200 bg-white text-slate-600 hover:border-brand-green/40 hover:text-brand-green",
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
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function Filters({ value, initialValue, totalResults, onApply, options }: FiltersProps) {
  const [draft, setDraft] = useState<AppliedFilters>(value)
  const hasHydratedRef = useRef(false)
  const skipAutoApplyRef = useRef(false)

  useEffect(() => {
    if (!filtersAreEqual(value, draft)) {
      setDraft(value)
    }
  }, [draft, value])

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true
      return
    }

    if (skipAutoApplyRef.current) {
      skipAutoApplyRef.current = false
      return
    }

    const timeout = window.setTimeout(() => {
      onApply(draft)
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [draft, onApply])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    skipAutoApplyRef.current = true
    onApply(draft)
  }

  const toggleArrayValue = <T,>(list: T[] | undefined, value: T): T[] => {
    const current = list ?? []
    return current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
  }

  const handleClearAll = () => {
    skipAutoApplyRef.current = true
    setDraft(initialValue)
    onApply(initialValue)
  }

  return (
    <section aria-label="Filtros de mentores" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2" htmlFor="mentor-search">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Busca</span>
            <input
              id="mentor-search"
              type="search"
              placeholder="Busque por nome, expertise, ODS ou palavra-chave"
              value={draft.q ?? ""}
              onChange={(event) => setDraft((current) => ({ ...current, q: event.target.value }))}
              className="h-12 rounded-full border border-slate-200 px-5 text-sm text-slate-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label="Buscar mentores"
            />
          </label>

          <div role="status" aria-live="polite" className="text-sm text-slate-500">
            {totalResults === 1 ? "1 resultado" : `${totalResults} resultados`}
          </div>
        </div>

        <Section title="Expertise">
          {options.expertise.map((area) => (
            <Chip
              key={area}
              label={area}
              active={draft.expertise.includes(area)}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  expertise: toggleArrayValue(current.expertise, area),
                }))
              }
            />
          ))}
        </Section>

        <Section title="ODS">
          {options.ods.map((goal) => (
            <Chip
              key={goal}
              label={`ODS ${goal}`}
              active={draft.ods.includes(goal)}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  ods: toggleArrayValue(current.ods, goal),
                }))
              }
            />
          ))}
        </Section>

        <Section title="Idiomas">
          {options.languages.map((language) => (
            <Chip
              key={language}
              label={language}
              active={(draft.lang ?? []).includes(language)}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  lang: toggleArrayValue(current.lang, language),
                }))
              }
            />
          ))}
        </Section>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ações</span>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                Aplicar filtros
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-green/40 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                Limpar tudo
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
