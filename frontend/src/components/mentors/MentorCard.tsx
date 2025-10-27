import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { MentorWithScore } from "@/lib/mentors/search";

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
    return "bg-emerald-100 text-emerald-900 border border-emerald-200";
  }

  if (value.includes("agenda") || value.includes("limit")) {
    return "bg-amber-100 text-amber-900 border border-amber-200";
  }

  return "bg-slate-100 text-slate-700 border border-slate-200";
}

function getLanguagePreview(languages: string[]) {
  return languages.slice(0, 2).join(" · ");
}

function extractSameAsLinks(links: MentorWithScore["links"]) {
  return links
    .filter((link) => /linkedin|behance|github|instagram|site|portfolio/i.test(link.label) || /linkedin|github/i.test(link.url))
    .map((link) => link.url);
}

interface MentorCardProps {
  mentor: MentorWithScore;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const initials = getInitials(mentor.name);
  const availabilityTone = getAvailabilityTone(mentor.availability);
  const expertisePreview = mentor.expertise.slice(0, 3);
  const odsPreview = mentor.ods.slice(0, 4);
  const locationLabel = mentor.remote ? `${mentor.location} · remoto disponível` : mentor.location;
  const showHighMatch = mentor.score >= 70;
  const sameAs = extractSameAsLinks(mentor.links);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: mentor.name,
    jobTitle: mentor.headline,
    image: mentor.avatarUrl,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return (
    <article
      role="listitem"
      aria-labelledby={`${mentor.slug}-title`}
      className="group relative flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
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
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{mentor.seniority}</p>
              <h3 id={`${mentor.slug}-title`} className="text-xl font-semibold text-slate-900">
                {mentor.name}
              </h3>
              <p className="line-clamp-2 text-sm text-slate-600">{mentor.headline}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            {showHighMatch && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span aria-hidden>⭐</span> Match alto
              </span>
            )}
            <span
              className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", availabilityTone)}
              aria-label={`Disponibilidade: ${mentor.availability}`}
            >
              {mentor.availability}
            </span>
            {mentor.nextWindow && (
              <span className="text-xs text-slate-500">Próxima janela: {mentor.nextWindow}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium">
            <span aria-hidden>📍</span>
            {locationLabel}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium">
            <span aria-hidden>🗣️</span>
            {getLanguagePreview(mentor.languages)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Principais expertises">
          {expertisePreview.map((area) => (
            <span
              key={area}
              className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
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
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Link
          to={`/participar?mentor=${mentor.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          aria-label={`Conectar com ${mentor.name}`}
        >
          Conectar
        </Link>
        <Link
          to={`/mentores/${mentor.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          aria-label={`Ver perfil completo de ${mentor.name}`}
        >
          Ver perfil
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
