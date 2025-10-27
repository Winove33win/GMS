import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import mentorsData from "@/data/mentors.json";
import type { Mentor } from "@/types/mentor";
import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";

const mentors = mentorsData as Mentor[];

function formatDescription(summary: string) {
  const maxLength = 155;
  return summary.length > maxLength ? `${summary.slice(0, maxLength - 3)}...` : summary;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function MentorDetail() {
  const { slug } = useParams<{ slug: string }>();

  const mentor = useMemo(() => mentors.find((item) => item.slug === slug), [slug]);

  if (!mentor) {
    return (
      <Section className="pb-24" title="Mentor(a) não encontrado(a)">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-base text-slate-600">
            O perfil solicitado não está disponível. Confira se o endereço está correto ou explore a lista completa de mentores.
          </p>
          <Link
            to="/mentores"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Voltar para mentores
          </Link>
        </div>
      </Section>
    );
  }

  const metaTitle = `${mentor.name} · Mentoria Solidária`;
  const metaDescription = formatDescription(mentor.summary);
  const canonical = `/mentores/${mentor.slug}`;
  const remoteLabel = mentor.remote ? "Atendimento remoto disponível" : "Atendimento presencial";

  return (
    <>
      <SEO title={metaTitle} description={metaDescription} canonical={canonical} />
      <Section className="pb-24" introClassName="hidden">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <article className="flex flex-col gap-8">
            <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50">
                    {mentor.avatarUrl ? (
                      <img
                        src={mentor.avatarUrl}
                        alt={`Foto de ${mentor.name}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-2xl font-semibold uppercase text-slate-600">
                        {getInitials(mentor.name)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{mentor.seniority}</p>
                    <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{mentor.name}</h1>
                    <p className="mt-2 text-base text-slate-600">{mentor.headline}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        <span aria-hidden>📍</span>
                        {mentor.location}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        <span aria-hidden>💻</span>
                        {remoteLabel}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        <span aria-hidden>🗣️</span>
                        {mentor.languages.join(" · ")}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`self-start rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800`}
                  aria-label={`Disponibilidade: ${mentor.availability}`}
                >
                  {mentor.availability}
                </span>
              </div>
              <div className="flex flex-wrap gap-2" aria-label="Áreas de expertise">
                {mentor.expertise.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2" aria-label="ODS de atuação">
                {mentor.ods.map((goal) => (
                  <span
                    key={goal}
                    className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white"
                  >
                    ODS {goal}
                  </span>
                ))}
              </div>
            </header>

            <section aria-labelledby="sobre" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="sobre" className="text-xl font-semibold text-slate-900">
                Sobre
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">{mentor.summary}</p>
            </section>

            <section aria-labelledby="areas" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="areas" className="text-xl font-semibold text-slate-900">
                Áreas de atuação
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {mentor.expertise.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </section>

            <section aria-labelledby="interesses" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="interesses" className="text-xl font-semibold text-slate-900">
                Interesses atuais
              </h2>
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-base text-slate-700">
                {mentor.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="experiencia" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="experiencia" className="text-xl font-semibold text-slate-900">
                Experiência profissional
              </h2>
              <div className="mt-4 flex flex-col gap-6">
                {mentor.experience.map((item) => (
                  <article key={`${item.organization}-${item.role}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{item.role}</h3>
                    <p className="text-sm font-medium text-slate-600">{item.organization}</p>
                    <p className="text-sm text-slate-500">{item.period}</p>
                    <p className="mt-3 text-sm text-slate-700">{item.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="educacao" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="educacao" className="text-xl font-semibold text-slate-900">
                Educação
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-base text-slate-700">
                {mentor.education.map((item) => (
                  <li key={`${item.institution}-${item.course}`}>
                    <p className="font-semibold text-slate-900">{item.course}</p>
                    <p className="text-sm text-slate-600">
                      {item.institution} · {item.year}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="idiomas" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="idiomas" className="text-xl font-semibold text-slate-900">
                Idiomas
              </h2>
              <p className="mt-4 text-base text-slate-700">{mentor.languages.join(", ")}</p>
            </section>

            <section aria-labelledby="links" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="links" className="text-xl font-semibold text-slate-900">
                Links verificados
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {mentor.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <div className="sticky bottom-6 z-10 w-full lg:hidden">
              <Link
                to={`/participar?mentor=${mentor.slug}`}
                className="flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                aria-label={`Solicitar mentoria com ${mentor.name}`}
              >
                Solicitar mentoria
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-slate-900">Pronto para conectar?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Conte um pouco sobre sua iniciativa e objetivos para receber o melhor apoio desta mentoria.
              </p>
              <Link
                to={`/participar?mentor=${mentor.slug}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                aria-label={`Solicitar mentoria com ${mentor.name}`}
              >
                Solicitar mentoria
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
