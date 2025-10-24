import React, { useEffect, useMemo, useState } from 'react';
import FilterChips from '../components/FilterChips';
import ProjectCard from '../components/ProjectCard';
import { api, ProjectRecord } from '../lib/api';

const Projetos: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [areaFilter, setAreaFilter] = useState<string | null>(null);

  useEffect(() => {
    api
      .listProjects()
      .then(setProjects)
      .catch((err) => console.error('Erro ao carregar projetos', err));
  }, []);

  const areas = useMemo(() => Array.from(new Set(projects.map((project) => project.area))).sort(), [projects]);

  const filtered = useMemo(() => {
    if (!areaFilter) return projects;
    return projects.filter((project) => project.area === areaFilter);
  }, [projects, areaFilter]);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Portfólio de projetos</h1>
        <p className="text-neutral-600">
          Filtre por área de atuação e explore iniciativas conectadas aos Objetivos de Desenvolvimento Sustentável.
        </p>
      </header>

      <FilterChips items={areas} active={areaFilter} onSelect={setAreaFilter} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.titulo}
            description={project.descricao_curta}
            status={project.status}
            ods={project.ods}
            city={project.cidade}
          />
        ))}
      </div>
    </section>
  );
};

export default Projetos;
