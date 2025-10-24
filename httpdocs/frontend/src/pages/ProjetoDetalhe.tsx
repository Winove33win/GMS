import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, ProjectRecord } from '../lib/api';

const STATUS_LABEL: Record<string, string> = {
  andamento: 'Em andamento',
  concluido: 'Concluído',
  ideacao: 'Em ideação',
};

const ProjetoDetalhe: React.FC = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<ProjectRecord | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .getProject(slug)
      .then(setProject)
      .catch((err) => console.error('Erro ao carregar projeto', err));
  }, [slug]);

  if (!project) {
    return <p className="text-neutral-500">Carregando informações do projeto…</p>;
  }

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-neutral-500">{project.area}</p>
        <h1 className="text-3xl font-semibold text-brand-dark">{project.titulo}</h1>
        <p className="text-neutral-600">{project.descricao_curta}</p>
      </header>
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-brand-dark">Status</h2>
          <p className="text-sm text-neutral-600">{STATUS_LABEL[project.status] || project.status}</p>
        </div>
        {project.cidade && (
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">Localização</h2>
            <p className="text-sm text-neutral-600">{project.cidade}</p>
          </div>
        )}
        {(project.ano_inicio || project.ano_fim) && (
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">Período</h2>
            <p className="text-sm text-neutral-600">
              {project.ano_inicio ?? 'Início indefinido'}
              {project.ano_fim ? ` — ${project.ano_fim}` : ''}
            </p>
          </div>
        )}
        {project.mentores && project.mentores.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">Mentores</h2>
            <p className="text-sm text-neutral-600">{project.mentores.join(', ')}</p>
          </div>
        )}
        {project.amentorados && project.amentorados.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">Amentorados</h2>
            <p className="text-sm text-neutral-600">{project.amentorados.join(', ')}</p>
          </div>
        )}
        {project.metricas && (
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">Métricas de impacto</h2>
            <ul className="list-disc pl-5 text-sm text-neutral-600">
              {Object.entries(project.metricas).map(([key, value]) => (
                <li key={key}>
                  {key}: <span className="font-semibold">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.descricao_long && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-brand-dark">Descrição detalhada</h2>
            <p className="text-sm text-neutral-600">{project.descricao_long}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 text-xs text-brand-green">
          {project.ods.map((item) => (
            <span key={item} className="rounded-full border border-brand-green px-3 py-1">
              ODS {item}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
};

export default ProjetoDetalhe;
