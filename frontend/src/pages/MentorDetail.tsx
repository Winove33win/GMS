import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import mentorsData from "@/data/mentors.json"
import type { Mentor } from "@/types/mentor"
import { SEO } from "@/lib/seo"
import { Section } from "@/components/Section"
import { PolicyModal } from "@/components/PolicyModal"

const mentors = mentorsData as Mentor[]

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function formatLocation(location?: Mentor["location"]) {
  if (!location) {
    return undefined
  }

  const parts = [location.city, location.state, location.country].filter(Boolean)
  if (parts.length === 0) {
    return undefined
  }
  return parts.join(", ")
}

function formatWindowDates(start?: string, end?: string) {
  if (!start || !end) {
    return undefined
  }

  const startDate = new Date(start)
  const endDate = new Date(end)
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return undefined
  }

  const startLabel = startDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
  const endLabel = endDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })

  return `${startLabel} a ${endLabel}`
}

function formatWindowLabel(label?: string, start?: string, end?: string) {
  if (label) {
    return label
  }

  const dates = formatWindowDates(start, end)
  return dates ?? "Janela do programa"
}

function getVerifiedLinks(links?: Mentor["links"]) {
  if (!links) {
    return []
  }

  const labels: Record<string, string> = {
    linkedin: "LinkedIn",
    lattes: "Lattes",
    website: "Website",
  }

  return Object.entries(links)
    .filter(([, url]) => Boolean(url))
    .map(([key, url]) => ({
      label: labels[key] ?? key,
      url: url as string,
    }))
}

export default function MentorDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [isPolicyOpen, setPolicyOpen] = useState(false)

  const mentor = useMemo(() => mentors.find((item) => item.slug === slug), [slug])

  if (!mentor) {
    return (
      <Section className="pb-24" title="Mentor(a) não encontrado(a)">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-base text-slate-600">
            O perfil solicitado não está disponível. Confira se o endereço está correto ou explore a lista completa de mentores.
          </p>
          <Link
            to="/mentores"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Voltar para mentores
          </Link>
        </div>
      </Section>
    )
  }

  const metaTitle = `${mentor.name} · Mentoria Solidária`
  const metaDescription = mentor.summary
  const canonical = `/mentores/${mentor.slug}`
  const locationLabel = formatLocation(mentor.location)
  const verifiedLinks = getVerifiedLinks(mentor.links)
  const languagesLabel = mentor.languages.join(" · ")
  const programWindows = mentor.program.windows

  return (
    <>
      <SEO title={metaTitle} description={metaDescription} canonical={canonical} />
      <Section className="pb-24" introClassName="hidden">
        <article className="flex flex-col gap-8">
          <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
                  {mentor.avatarUrl ? (
                    <img src={mentor.avatarUrl} alt={`Foto de ${mentor.name}`} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-2xl font-semibold uppercase text-slate-600">
                      {getInitials(mentor.name)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">{mentor.seniority}</span>
                  <h1 className="text-3xl font-extrabold text-slate-900">{mentor.name}</h1>
                  <p className="text-base text-slate-600">{mentor.headline}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    {locationLabel && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        <span aria-hidden>📍</span>
                        {locationLabel}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <span aria-hidden>🗣️</span>
                      {languagesLabel}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                      <span aria-hidden>🗓️</span>
                      Sessões 1×/semana · 60 min · remoto
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to={`/participar?mentor=${mentor.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
              >
                Solicitar mentoria pelo programa
              </Link>
            </div>
          </header>

          <section aria-labelledby="sobre" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 id="sobre" className="text-xl font-semibold text-slate-900">
              Sobre a mentoria
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{mentor.summary}</p>
          </section>

          <section aria-labelledby="como-ajudo" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 id="como-ajudo" className="text-xl font-semibold text-slate-900">
              Como posso ajudar
            </h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-base text-slate-700">
              {mentor.helpsWith.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {mentor.cases && mentor.cases.length > 0 && (
            <section aria-labelledby="cases" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="cases" className="text-xl font-semibold text-slate-900">
                Casos acompanhados
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {mentor.cases.map((caseItem) => (
                  <article key={`${caseItem.title}-${caseItem.result}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{caseItem.title}</h3>
                    <p className="text-sm text-slate-600">{caseItem.result}</p>
                    {caseItem.ods && (
                      <span className="mt-2 inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
                        ODS {caseItem.ods}
                      </span>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="idiomas" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 id="idiomas" className="text-xl font-semibold text-slate-900">
              Idiomas
            </h2>
            <p className="mt-4 text-base text-slate-700">{languagesLabel}</p>
          </section>

          <section aria-labelledby="agenda-programa" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 id="agenda-programa" className="text-xl font-semibold text-slate-900">
              Agenda do programa
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-base text-slate-700">
              {programWindows.map((window) => {
                const period = formatWindowDates(window.start, window.end)
                const label = formatWindowLabel(window.label, window.start, window.end)
                return (
                  <li key={`${window.start}-${window.end}`} className="flex flex-col gap-1 rounded-2xl bg-slate-50 p-4">
                    <span className="font-semibold text-slate-900">{label}</span>
                    {period && <span className="text-sm text-slate-600">{period}</span>}
                  </li>
                )
              })}
            </ul>
          </section>

          {verifiedLinks.length > 0 && (
            <section aria-labelledby="links" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="links" className="text-xl font-semibold text-slate-900">
                Links verificados (somente leitura)
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {verifiedLinks.map((link) => (
                  <li key={link.url} className="flex items-center gap-2 text-sm font-semibold text-brand-green">
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="nofollow noopener"
                      className="underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="rounded-3xl border border-brand-green/25 bg-brand-green/10 p-6 text-sm text-brand-dark">
            <h2 className="text-base font-semibold text-brand-dark">Política do programa</h2>
            <p className="mt-2 text-sm text-brand-dark/90">
              Mentoria voluntária, encontros remotos de 60 minutos por semana e comunicação mediada pelo Mentoria Solidária.
            </p>
            <button
              type="button"
              onClick={() => setPolicyOpen(true)}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-brand-green/40 px-4 py-2 text-sm font-semibold text-brand-green transition hover:border-brand-green/60 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            >
              Entenda como funciona
            </button>
          </div>
        </article>
      </Section>
      <PolicyModal open={isPolicyOpen} onOpenChange={setPolicyOpen} />
    </>
  )
}
