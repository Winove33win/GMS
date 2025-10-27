import { Link } from "react-router-dom"
import type { MentorWithScore } from "@/lib/mentors/search"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

interface MentorCardProps {
  mentor: MentorWithScore
}

export function MentorCard({ mentor }: MentorCardProps) {
  const initials = getInitials(mentor.name)
  const expertisePreview = mentor.expertise.slice(0, 3)
  const odsPreview = mentor.ods.slice(0, 4)

  return (
    <article
      role="listitem"
      aria-labelledby={`${mentor.slug}-title`}
      className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg"
    >
      <div className="flex flex-col gap-5">
        <header className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            {mentor.avatarUrl ? (
              <img src={mentor.avatarUrl} alt={`Foto de ${mentor.name}`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-lg font-semibold uppercase text-slate-600">
                {initials}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <h3 id={`${mentor.slug}-title`} className="text-xl font-semibold text-slate-900">
              {mentor.name}
            </h3>
            <p className="text-sm font-medium text-brand-green">{mentor.headline}</p>
            <p className="text-sm text-slate-600">{mentor.valueStatement}</p>
          </div>
        </header>

        <div className="flex flex-wrap gap-2" aria-label="Principais expertises">
          {expertisePreview.map((area) => (
            <span
              key={area}
              className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green"
              title={area}
            >
              {area}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Objetivos de Desenvolvimento Sustentável atendidos">
          {odsPreview.map((goal) => (
            <span
              key={goal}
              className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white"
            >
              ODS {goal}
            </span>
          ))}
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Formato: encontro coletivo • 1×/semana • 60 min • remoto</p>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/participar"
          className="btn btn-primary inline-flex flex-1 items-center justify-center rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          Participar do encontro coletivo
        </Link>
        <Link
          to={`/mentores/${mentor.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          Ver perfil
        </Link>
      </div>
    </article>
  )
}
