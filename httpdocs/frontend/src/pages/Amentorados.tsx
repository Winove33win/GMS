import { useMemo, useState } from 'react';
import { PersonCard } from '@/components/PersonCard';
import { Seo } from '@/components/Seo';
import { FilterChips } from '@/components/FilterChips';
import { Input } from '@/components/ui/input';
import { content } from '@/lib/content';

export default function Amentorados() {
  const mentees = content.mentees;
  const [search, setSearch] = useState('');
  const [odsSelected, setOdsSelected] = useState<string[]>([]);

  const odsList = useMemo(() => Array.from(new Set(mentees.flatMap((mentee) => mentee.ods))).sort(), [mentees]);

  const filtered = useMemo(() => {
    return mentees.filter((mentee) => {
      const matchSearch = [mentee.nome, mentee.descricao, mentee.cidade, mentee.necessidades.join(' ')].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      );
      const matchOds = odsSelected.length === 0 || mentee.ods.some((ods) => odsSelected.includes(ods));
      return matchSearch && matchOds;
    });
  }, [mentees, search, odsSelected]);

  return (
    <div className="space-y-12">
      <Seo
        title="Amentorados"
        description="Projetos e coletivos mentorados pela GMS com foco em educação, meio ambiente, economia solidária e inovação social."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Projetos apoiados</span>
          <h1 className="text-4xl font-bold text-ink-900">Quem recebe mentoria</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Iniciativas que estão desenvolvendo soluções para desafios locais e contam com a rede GMS para validar hipóteses e
            ampliar resultados.
          </p>
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 md:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            <label className="text-sm font-medium text-ink-700" htmlFor="search-mentee">
              Buscar projetos
            </label>
            <Input
              id="search-mentee"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex: água, juventude, tecnologia"
            />
          </div>
          <div className="space-y-3">
            <span className="text-sm font-medium text-ink-700">ODS priorizadas</span>
            <FilterChips
              items={odsList.map((ods) => ({ value: ods, label: `ODS ${ods}` }))}
              selected={odsSelected}
              onChange={setOdsSelected}
              mode="multiple"
              allLabel="Todas"
            />
          </div>
        </div>
        <p className="text-sm text-ink-500">{filtered.length} iniciativa acompanhada pela GMS.</p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((mentee) => (
          <PersonCard
            key={mentee.id}
            person={{
              nome: mentee.nome,
              bio: mentee.descricao,
              areas: mentee.ods.map((ods) => `ODS ${ods}`),
              cidade: mentee.cidade,
              linkedin: mentee.contatos.site,
              tipo: 'amentorado',
              necessidades: mentee.necessidades,
            }}
          />
        ))}
      </section>
    </div>
  );
}
