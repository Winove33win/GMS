import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { Seo } from '@/components/Seo';
import { FilterChips } from '@/components/FilterChips';
import { Input } from '@/components/ui/input';
import { content } from '@/lib/content';

const statusFilters = [
  { value: 'andamento', label: 'Em andamento' },
  { value: 'ideacao', label: 'Em ideação' },
  { value: 'concluido', label: 'Concluídos' },
];

export default function Projetos() {
  const projects = content.projects;
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState<string[]>([]);
  const [odsSelected, setOdsSelected] = useState<string[]>([]);

  const odsList = useMemo(() => Array.from(new Set(projects.flatMap((project) => project.ods))).sort(), [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const searchTarget = [project.titulo, project.descricao_curta, project.cidade, project.mentores.join(' ')]
        .join(' ')
        .toLowerCase();
      const matchesSearch = searchTarget.includes(search.toLowerCase());
      const matchesStatus = statuses.length === 0 || statuses.includes(project.status);
      const matchesOds = odsSelected.length === 0 || project.ods.some((ods) => odsSelected.includes(ods));
      return matchesSearch && matchesStatus && matchesOds;
    });
  }, [projects, search, statuses, odsSelected]);

  return (
    <div className="space-y-12">
      <Seo
        title="Projetos acompanhados"
        description="Explore os projetos acompanhados pela GMS com filtros por status, ODS e palavras-chave."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Portfólio</span>
          <h1 className="text-4xl font-bold text-ink-900">Projetos acelerados pela GMS</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Uma seleção de iniciativas que participam das rodadas de mentoria, com foco em impacto socioambiental e inovação
            comunitária.
          </p>
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-ink-700" htmlFor="search-project">
                Buscar por título, cidade ou mentor
              </label>
              <Input
                id="search-project"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Ex: educação, economia circular"
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-ink-700">Status</span>
              <FilterChips items={statusFilters} selected={statuses} onChange={setStatuses} mode="multiple" allLabel="Todos" />
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium text-ink-700">ODS</span>
            <FilterChips
              items={odsList.map((ods) => ({ value: ods, label: `ODS ${ods}` }))}
              selected={odsSelected}
              onChange={setOdsSelected}
              mode="multiple"
              allLabel="Todas"
            />
          </div>
        </div>
        <p className="text-sm text-ink-500">{filtered.length} projeto(s) encontrado(s).</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
