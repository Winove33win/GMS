import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { buttonClasses } from "@/components/Button";

const projects = [
  { ods: "ODS 4", result: "+120 estudantes com reforço escolar comunitário" },
  { ods: "ODS 13", result: "Plano de ação climática implementado" },
  { ods: "ODS 6", result: "Filtro de água em 3 comunidades" },
  { ods: "ODS 10", result: "Programa de inclusão estruturado" },
  { ods: "ODS 9", result: "MVP validado com primeiros usuários" },
  { ods: "ODS 3", result: "Roteiro de saúde comunitária implantado" },
];

export function FeaturedProjects() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.result} elevated>
            <Badge tone="brand" className="mb-4 inline-flex px-4 py-1 text-[0.75rem] tracking-[0.25em]">
              {project.ods}
            </Badge>
            <p className="text-base font-semibold text-brand-dark">{project.result}</p>
            <p className="mt-3 text-sm text-ink-muted">
              Conexão direta com mentorias especializadas, indicadores acompanhados e relato compartilhado com parceiros.
            </p>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/projetos" className={buttonClasses("secondary")}>Ver projetos</Link>
      </div>
    </div>
  );
}
