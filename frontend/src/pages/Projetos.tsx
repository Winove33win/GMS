import { useMemo, useState } from "react";
import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

const projects = [
  {
    title: "Reforço comunitário de aprendizagem",
    ods: "ODS 4",
    result: "+120 estudantes com reforço escolar comunitário",
    description:
      "Mentoria focada em estruturação pedagógica, indicadores de evolução e engajamento de voluntários locais.",
  },
  {
    title: "Plano de ação climática municipal",
    ods: "ODS 13",
    result: "Plano de ação climática implementado",
    description:
      "Desenvolvimento de roteiro de monitoramento de emissões e matriz de responsabilidade com gestores públicos.",
  },
  {
    title: "Água segura para comunidades ribeirinhas",
    ods: "ODS 6",
    result: "Filtro de água em 3 comunidades",
    description:
      "Mentores apoiaram a modelagem financeira, aquisição de equipamentos e capacitação comunitária.",
  },
  {
    title: "Programa de inclusão produtiva",
    ods: "ODS 10",
    result: "Programa de inclusão estruturado",
    description:
      "Estratégia de captação de parceiros, governança e métricas de diversidade acompanhadas mensalmente.",
  },
  {
    title: "MVP de solução circular",
    ods: "ODS 9",
    result: "MVP validado com primeiros usuários",
    description:
      "Apoio em product discovery, testes com usuários e definição de roadmap para tração.",
  },
  {
    title: "Roteiro de saúde comunitária",
    ods: "ODS 3",
    result: "Roteiro de saúde comunitária implantado",
    description:
      "Mentoria para mapear indicadores, criar protocolos e alinhar a atuação da rede voluntária de saúde.",
  },
];

const odsOptions = Array.from(new Set(projects.map((project) => project.ods))).sort();

export default function Projetos() {
  const [odsFilter, setOdsFilter] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => !odsFilter || project.ods === odsFilter);
  }, [odsFilter]);

  return (
    <>
      <SEO
        title="Projetos apoiados - Mentoria Solidária"
        description="Conheça cases com resultados concretos acompanhados pela rede de mentores voluntários."
        canonical="/projetos"
      />
      <main>
        <Section
          title="Projetos apoiados"
          description="Conheça iniciativas que contaram com mentorias alinhadas aos ODS para sair do papel, ganhar escala e medir impacto."
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setOdsFilter("")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                odsFilter === "" ? "bg-brand-green text-white shadow-card-soft" : "bg-surface-muted text-ink"
              }`}
            >
              Todas as ODS
            </button>
            {odsOptions.map((ods) => (
              <button
                key={ods}
                type="button"
                onClick={() => setOdsFilter(ods)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  odsFilter === ods ? "bg-brand-green text-white shadow-card-soft" : "bg-surface-muted text-ink"
                }`}
              >
                {ods}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card key={project.title} elevated>
                <Badge tone="brand" className="rounded-full px-4 py-1 text-[0.75rem] tracking-[0.25em]">
                  {project.ods}
                </Badge>
                <h2 className="mt-4 text-xl font-semibold text-brand-dark">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-brand-dark/80">{project.result}</p>
                <p className="mt-3 text-sm text-ink-muted">{project.description}</p>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
