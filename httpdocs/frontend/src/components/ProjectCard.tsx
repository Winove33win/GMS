import React from 'react';
import { Link } from 'react-router-dom';

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  status: string;
  ods: string[];
  city?: string;
};

const STATUS_LABEL: Record<string, string> = {
  andamento: 'Em andamento',
  concluido: 'Concluído',
  ideacao: 'Em ideação',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ slug, title, description, status, ods, city }) => {
  return (
    <Link
      to={`/projetos/${slug}`}
      className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-neutral-500">
        <span>{STATUS_LABEL[status] || status}</span>
        {city && <span>{city}</span>}
      </div>
      <h3 className="text-xl font-semibold text-brand-dark">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
      <div className="flex flex-wrap gap-2 text-xs text-brand-green">
        {ods.map((item) => (
          <span key={item} className="rounded-full border border-brand-green px-3 py-1">
            ODS {item}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default ProjectCard;
