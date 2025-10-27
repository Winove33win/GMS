import { useMemo } from "react"
import { Link } from "react-router-dom"
import type { CollectiveSession } from "@/types/program"
import type { Mentor } from "@/types/mentor"
import { formatLanguageCode, formatLanguageName, formatSessionCompact } from "@/lib/format"

interface SessionsRailProps {
  sessions: CollectiveSession[]
  mentors: Mentor[]
  heading?: string
  description?: string
}

export function SessionsRail({ sessions, mentors, heading = "Próximos encontros coletivos", description }: SessionsRailProps) {
  const mentorsBySlug = useMemo(() => {
    const map = new Map<string, Mentor>()
    mentors.forEach((mentor) => {
      map.set(mentor.slug, mentor)
    })
    return map
  }, [mentors])

  const formatNameFromSlug = (slug: string): string => {
    return slug
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  if (sessions.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="collective-sessions-heading" className="w-full">
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <h2 id="collective-sessions-heading" className="text-2xl font-semibold text-slate-900">
            {heading}
          </h2>
          {description && <p className="text-sm text-slate-600">{description}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sessions.map((session) => {
            const mentorNames = session.mentors.map((slug) => mentorsBySlug.get(slug)?.name ?? formatNameFromSlug(slug))
            const displayMentors = mentorNames.slice(0, 6)
            const remaining = mentorNames.length - displayMentors.length

            return (
              <article
                key={session.id}
                className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                aria-label={formatSessionCompact(session.date, session.time)}
              >
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                      Encontro coletivo
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {formatSessionCompact(session.date, session.time)}
                    </h3>
                    <p className="text-sm text-slate-600">Duração {session.durationMin} min · remoto</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {session.lang.map((code) => (
                      <span
                        key={`${session.id}-lang-${code}`}
                        className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green"
                        aria-label={`Idioma ${formatLanguageName(code)}`}
                      >
                        {formatLanguageCode(code)}
                      </span>
                    ))}
                    {(session.ods ?? []).map((goal) => (
                      <span
                        key={`${session.id}-ods-${goal}`}
                        className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white"
                      >
                        ODS {goal}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Mentores confirmados
                    </p>
                    <ul className="flex flex-wrap gap-2 text-sm text-slate-700">
                      {displayMentors.map((name) => (
                        <li
                          key={`${session.id}-${name}`}
                          className="rounded-full bg-slate-100 px-3 py-1"
                        >
                          {name}
                        </li>
                      ))}
                      {remaining > 0 && (
                        <li className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                          +{remaining}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <Link
                  to={`/participar?coorte=${encodeURIComponent(session.id)}`}
                  className="inline-flex items-center justify-center rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                >
                  Quero estar nessa data
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
