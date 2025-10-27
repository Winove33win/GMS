import { useMemo, useState } from "react";
import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

type Mentor = {
  name: string;
  bio: string;
  areas: string[];
  ods: string[];
  mode: "Remoto" | "Híbrido" | "Presencial";
};

const mentors: Mentor[] = [
  {
    name: "Ana Lima",
    bio: "Consultora em estratégia e impacto socioambiental com 12 anos de atuação em organizações da sociedade civil.",
    areas: ["Estratégia", "Governança"],
    ods: ["ODS 4", "ODS 10", "ODS 17"],
    mode: "Remoto",
  },
  {
    name: "Bruno Medeiros",
    bio: "Especialista em dados e avaliação de impacto, com experiência em métricas de educação inclusiva.",
    areas: ["Dados", "Avaliação"],
    ods: ["ODS 4", "ODS 13"],
    mode: "Híbrido",
  },
  {
    name: "Carla Souza",
    bio: "Profissional de ESG e governança, apoiando empresas e ONGs na estruturação de políticas ambientais.",
    areas: ["ESG", "Governança"],
    ods: ["ODS 13", "ODS 16"],
    mode: "Remoto",
  },
  {
    name: "Diego Freitas",
    bio: "Product manager com foco em validação de MVPs e experiência em negócios de impacto.",
    areas: ["Produto", "Inovação"],
    ods: ["ODS 8", "ODS 9"],
    mode: "Remoto",
  },
  {
    name: "Elisa Cardoso",
    bio: "Captadora de recursos e articuladora de parcerias com redes de filantropia colaborativa.",
    areas: ["Captação", "Parcerias"],
    ods: ["ODS 8", "ODS 17"],
    mode: "Híbrido",
  },
  {
    name: "Fábio Nunes",
    bio: "Especialista em operações e escala de programas sociais, com foco em eficiência e processos.",
    areas: ["Operações", "Processos"],
    ods: ["ODS 11", "ODS 3"],
    mode: "Presencial",
  },
];

const allAreas = Array.from(new Set(mentors.flatMap((mentor) => mentor.areas))).sort();
const allOds = Array.from(new Set(mentors.flatMap((mentor) => mentor.ods))).sort();
const allModes = Array.from(new Set(mentors.map((mentor) => mentor.mode))).sort();

export default function Mentores() {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [odsFilter, setOdsFilter] = useState<string>("");
  const [modeFilter, setModeFilter] = useState<string>("");
  const [search, setSearch] = useState("");

  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mentors.filter((mentor) => {
      const matchesArea = !areaFilter || mentor.areas.includes(areaFilter);
      const matchesOds = !odsFilter || mentor.ods.includes(odsFilter);
      const matchesMode = !modeFilter || mentor.mode === modeFilter;
      const matchesQuery =
        !query ||
        mentor.name.toLowerCase().includes(query) ||
        mentor.bio.toLowerCase().includes(query) ||
        mentor.areas.some((area) => area.toLowerCase().includes(query));

      return matchesArea && matchesOds && matchesMode && matchesQuery;
    });
  }, [areaFilter, odsFilter, modeFilter, search]);

  return (
    <>
      <SEO
        title="Mentores voluntários - Mentoria Solidária"
        description="Conheça a rede de mentores voluntários que apoiam projetos socioambientais alinhados aos ODS."
        canonical="/mentores"
      />
      <main>
        <Section
          title="Mentores"
          description="Explore especialistas com diferentes trajetórias e disponibilidade para mentorias sob demanda. Utilize os filtros para encontrar a pessoa certa para a sua iniciativa."
        >
          <form className="grid gap-4 rounded-[1.25rem] border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-card-soft md:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2 text-sm font-semibold text-brand-dark">
              Busca
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nome ou palavra-chave"
                className="h-11 rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm font-normal text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-brand-dark">
              Área de atuação
              <select
                value={areaFilter}
                onChange={(event) => setAreaFilter(event.target.value)}
                className="h-11 rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm font-normal text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <option value="">Todas</option>
                {allAreas.map((area) => (
                  <option key={area}>{area}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-brand-dark">
              ODS de atuação
              <select
                value={odsFilter}
                onChange={(event) => setOdsFilter(event.target.value)}
                className="h-11 rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm font-normal text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <option value="">Todos</option>
                {allOds.map((ods) => (
                  <option key={ods}>{ods}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-brand-dark">
              Forma de atuação
              <select
                value={modeFilter}
                onChange={(event) => setModeFilter(event.target.value)}
                className="h-11 rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm font-normal text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <option value="">Todas</option>
                {allModes.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>
            </label>
          </form>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.name} elevated>
                <div className="flex flex-wrap items-center gap-3">
                  {mentor.ods.map((ods) => (
                    <Badge key={ods} tone="brand" className="rounded-full px-3 py-1 text-[0.7rem] tracking-[0.2em]">
                      {ods}
                    </Badge>
                  ))}
                  <Badge tone="neutral" className="rounded-full px-3 py-1 text-[0.7rem] tracking-[0.2em]">
                    {mentor.mode}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-brand-dark">{mentor.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{mentor.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.areas.map((area) => (
                    <span key={area} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink">
                      {area}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {filteredMentors.length === 0 ? (
            <p className="mt-10 text-sm text-ink-muted">Nenhum mentor encontrado para os filtros selecionados.</p>
          ) : null}
        </Section>
      </main>
    </>
  );
}
