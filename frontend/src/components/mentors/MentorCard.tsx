import { Link } from "react-router-dom";
import type { Mentor } from "@/types/mentor";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getAvailabilityTone(availability: string) {
  const value = availability.toLowerCase();

  if (value.includes("dispon")) {
    return "bg-emerald-100 text-emerald-800";
  }

  if (value.includes("limit")) {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-slate-200 text-slate-700";
}

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const initials = getInitials(mentor.name);
  const availabilityTone = getAvailabilityTone(mentor.availability);
  const expertisePreview = mentor.expertise.slice(0, 3);
  const odsPreview = mentor.ods.slice(0, 3);
  const locationLabel = mentor.remote
    ? `${mentor.location} · remoto disponível`
    : mentor.location;

  return (
    <article
      role="listitem"
      aria-label={`Mentor ${mentor.name}`}
      className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
              {mentor.avatarUrl ? (
                <img
                  src={mentor.avatarUrl}
                  alt={`Foto de ${mentor.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-lg font-semibold uppercase text-slate-600">
                  {initials}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{mentor.seniority}</p>
              <h3 id={`${mentor.slug}-title`} className="mt-1 text-xl font-semibold text-slate-900">
                {mentor.name}
              </h3>
              <p className="mt-1 line-clamp-1 text-sm text-slate-600">{mentor.headline}</p>
            </div>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${availabilityTone}`}
            aria-label={`Disponibilidade: ${mentor.availability}`}
          >
            {mentor.availability}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium">
            <span aria-hidden>📍</span>
            {locationLabel}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium">
            <span aria-hidden>🗣️</span>
            {mentor.languages.slice(0, 2).join(" · ")}
          </span>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Principais expertises">
          {expertisePreview.map((area) => (
            <span
              key={area}
              className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
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
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to={`/mentores/${mentor.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          aria-label={`Ver perfil completo de ${mentor.name}`}
        >
          Ver perfil
        </Link>
        <Link
          to={`/participar?mentor=${mentor.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          aria-label={`Conectar com ${mentor.name}`}
        >
          Conectar
        </Link>
      </div>
    </article>
  );
}
