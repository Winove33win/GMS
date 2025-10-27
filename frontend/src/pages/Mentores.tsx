import { useMemo, useState } from "react";
import mentorsData from "@/data/mentors.json";
import type { Mentor } from "@/types/mentor";
import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";
import { MentorCard } from "@/components/mentors/MentorCard";
import { Filters, type MentorFiltersState } from "@/components/mentors/Filters";

const mentors = mentorsData as Mentor[];

const expertiseOptions = Array.from(new Set(mentors.flatMap((mentor) => mentor.expertise))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);
const odsOptions = Array.from(new Set(mentors.flatMap((mentor) => mentor.ods))).sort((a, b) => a - b);
const seniorityOptions = Array.from(new Set(mentors.map((mentor) => mentor.seniority))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);
const languagesOptions = Array.from(new Set(mentors.flatMap((mentor) => mentor.languages))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);
const availabilityOptions = Array.from(new Set(mentors.map((mentor) => mentor.availability))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);

const initialFilters: MentorFiltersState = {
  expertise: [],
  ods: [],
  seniority: "",
  languages: [],
  location: "",
  availability: "",
};

type SortOption = "recommended" | "active" | "recent";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "recommended", label: "Mais recomendados" },
  { value: "active", label: "Mais ativos" },
  { value: "recent", label: "Recentes" },
];

function sortMentors(list: Mentor[], sort: SortOption) {
  return [...list].sort((a, b) => {
    if (sort === "recommended") {
      return b.recommendationScore - a.recommendationScore || a.name.localeCompare(b.name, "pt-BR");
    }

    if (sort === "active") {
      return new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime();
    }

    return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
  });
}

function applyFilters(list: Mentor[], filters: MentorFiltersState) {
  const locationQuery = filters.location.trim().toLowerCase();

  return list.filter((mentor) => {
    if (filters.expertise.length > 0 && !mentor.expertise.some((item) => filters.expertise.includes(item))) {
      return false;
    }

    if (filters.ods.length > 0 && !mentor.ods.some((item) => filters.ods.includes(item))) {
      return false;
    }

    if (filters.seniority && mentor.seniority !== filters.seniority) {
      return false;
    }

    if (filters.languages.length > 0 && !filters.languages.every((lang) => mentor.languages.includes(lang))) {
      return false;
    }

    if (locationQuery) {
      const haystack = `${mentor.location}${mentor.remote ? " remoto" : ""}`.toLowerCase();
      if (!haystack.includes(locationQuery)) {
        return false;
      }
    }

    if (filters.availability && mentor.availability !== filters.availability) {
      return false;
    }

    return true;
  });
}

export default function Mentores() {
  const [draftFilters, setDraftFilters] = useState<MentorFiltersState>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<MentorFiltersState>(initialFilters);
  const [sort, setSort] = useState<SortOption>("recommended");

  const filteredMentors = useMemo(() => applyFilters(mentors, activeFilters), [activeFilters]);
  const sortedMentors = useMemo(() => sortMentors(filteredMentors, sort), [filteredMentors, sort]);

  const handleApply = (value: MentorFiltersState) => {
    setActiveFilters(value);
  };

  const handleClear = () => {
    setDraftFilters(initialFilters);
    setActiveFilters(initialFilters);
  };

  return (
    <>
      <SEO
        title="Rede de mentores e mentoras voluntárias"
        description="Conheça especialistas que apoiam iniciativas socioambientais com mentorias estratégicas. Filtre por expertise, ODS, senioridade, idiomas e disponibilidade."
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
                {"Atualizamos constantemente esta rede com profissionais validados e alinhados aos valores da comunidade."}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-600" role="status" aria-live="polite">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Resultados atuais</span>
              <strong className="text-lg text-slate-900">{sortedMentors.length} mentor(es) encontrado(s)</strong>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Filters
              value={draftFilters}
              onChange={setDraftFilters}
              onApply={handleApply}
              onClear={handleClear}
              options={{
                expertise: expertiseOptions,
                ods: odsOptions,
                seniority: seniorityOptions,
                languages: languagesOptions,
                availability: availabilityOptions,
              }}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Lista de mentores</h2>
              <label className="flex items-center gap-3 text-sm text-slate-600">
                Ordenar por
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="h-10 rounded-full border border-slate-200 px-4 text-sm text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
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

            {sortedMentors.length > 0 ? (
              <div role="list" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sortedMentors.map((mentor) => (
                  <MentorCard key={mentor.slug} mentor={mentor} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-xl font-semibold text-slate-900">Nenhum mentor encontrado</p>
                <p className="max-w-md text-sm text-slate-600">
                  Ajuste os filtros para ampliar sua busca. Você também pode entrar em contato com a nossa equipe para receber indicações personalizadas.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
