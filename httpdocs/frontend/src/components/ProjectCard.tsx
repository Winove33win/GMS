import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/content';

const STATUS_LABEL: Record<string, string> = {
  andamento: 'Em andamento',
  concluido: 'Concluído',
  ideacao: 'Em ideação',
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, titulo, descricao_curta, status, ods, cidade } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <Link
        to={`/projetos/${slug}`}
        className="card-surface flex h-full flex-col gap-4 rounded-3xl p-6 transition duration-200 ease-gentle-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-green"
      >
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink-500">
          <span>{STATUS_LABEL[status] ?? status}</span>
          {cidade && <span>{cidade}</span>}
        </div>
        <h3 className="text-2xl font-semibold text-ink-900">{titulo}</h3>
        <p className="flex-1 text-sm text-ink-600">{descricao_curta}</p>
        <div className="flex flex-wrap gap-2">
          {ods.map((item) => (
            <Badge key={item} variant="default">
              ODS {item}
            </Badge>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
