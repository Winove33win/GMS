import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjectBySlug } from '@/lib/content';

const STATUS_LABEL: Record<string, string> = {
  andamento: 'Em andamento',
  concluido: 'Concluído',
  ideacao: 'Em ideação',
};

export default function ProjetoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = useMemo(() => (slug ? getProjectBySlug(slug) : undefined), [slug]);

  if (!project) {
    return (
      <div className="space-y-4">
        <Seo title="Projeto não encontrado" description="Projeto não localizado na base da GMS." />
        <p className="text-ink-600">Projeto não encontrado. Verifique o link ou explore outros casos.</p>
        <Button variant="secondary" onClick={() => navigate('/projetos')}>
          Voltar para projetos
        </Button>
      </div>
    );
  }

  const metaDescription = `${project.titulo} — ${project.descricao_curta}`;

  return (
    <article className="space-y-10">
      <Seo title={`${project.titulo}`} description={metaDescription} />
      <header className="space-y-3">
        <Button variant="ghost" onClick={() => navigate(-1)} aria-label="Voltar" className="px-0 text-brand-green">
          ← Voltar
        </Button>
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">{project.area}</span>
        <h1 className="text-4xl font-bold text-ink-900">{project.titulo}</h1>
        <p className="max-w-3xl text-lg text-ink-600">{project.descricao_curta}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="selected">{STATUS_LABEL[project.status] ?? project.status}</Badge>
          {project.ods.map((ods) => (
            <Badge key={ods}>ODS {ods}</Badge>
          ))}
        </div>
      </header>

      <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6 text-base text-ink-700">
          {project.descricao_long && <p>{project.descricao_long}</p>}
          {project.metricas && project.metricas.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-ink-900">Métricas de impacto</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.metricas.map((metrica) => (
                  <li key={metrica.label} className="rounded-2xl bg-surface-100 p-4">
                    <span className="text-sm font-semibold text-brand-green">{metrica.label}</span>
                    <p className="text-lg font-bold text-ink-900">{metrica.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.links && project.links.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-ink-900">Saiba mais</h2>
              <ul className="space-y-2 text-brand-green">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noreferrer" className="hover:text-brand-amber">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <aside className="space-y-4 rounded-2xl bg-surface-100 p-5 text-sm text-ink-700">
          {project.cidade && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Localização</h2>
              <p className="text-base text-ink-900">{project.cidade}</p>
            </div>
          )}
          {(project.ano_inicio || project.ano_fim) && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Período</h2>
              <p className="text-base text-ink-900">
                {project.ano_inicio}
                {project.ano_fim ? ` – ${project.ano_fim}` : ''}
              </p>
            </div>
          )}
          {project.mentores.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Mentores</h2>
              <ul className="space-y-1 text-base text-ink-900">
                {project.mentores.map((mentor) => (
                  <li key={mentor}>{mentor}</li>
                ))}
              </ul>
            </div>
          )}
          {project.amentorados.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Equipe mentorada</h2>
              <ul className="space-y-1 text-base text-ink-900">
                {project.amentorados.map((nome) => (
                  <li key={nome}>{nome}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </article>
  );
}
