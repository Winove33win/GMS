import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PersonCard } from '@/components/PersonCard';
import { Seo } from '@/components/Seo';
import { FilterChips } from '@/components/FilterChips';
import { Input } from '@/components/ui/input';
import { content } from '@/lib/content';

export default function Mentores() {
  const mentors = content.mentors;
  const [search, setSearch] = useState('');
  const [areasSelected, setAreasSelected] = useState<string[]>([]);

  const areas = useMemo(() => Array.from(new Set(mentors.flatMap((mentor) => mentor.areas))).sort(), [mentors]);

  const filtered = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchesSearch = [mentor.nome, mentor.bio, mentor.cidade, mentor.areas.join(' ')].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      );
      const matchesArea = areasSelected.length === 0 || areasSelected.every((area) => mentor.areas.includes(area));
      return matchesSearch && matchesArea;
    });
  }, [mentors, search, areasSelected]);

  return (
    <div className="space-y-12">
      <Seo
        title="Mentores da GMS"
        description="Conheça os mentores voluntários da rede GMS e encontre especialistas por área de atuação e ODS."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Rede colaborativa</span>
          <h1 className="text-4xl font-bold text-ink-900">Mentores e mentoras GMS</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Especialistas que contribuem com estratégia, tecnologia, finanças, educação, comunicação e políticas públicas para
            acelerar projetos de impacto.
          </p>
        </div>
        <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 md:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            <label className="text-sm font-medium text-ink-700" htmlFor="search-mentor">
              Buscar por nome, tema ou cidade
            </label>
            <Input
              id="search-mentor"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ex: educação inclusiva"
            />
          </div>
          <div className="space-y-3">
            <span className="text-sm font-medium text-ink-700">Filtrar por área ou ODS</span>
            <FilterChips
              items={areas.map((area) => ({ value: area, label: area }))}
              selected={areasSelected}
              onChange={setAreasSelected}
              mode="multiple"
              allLabel="Todas"
            />
          </div>
        </div>
        <p className="text-sm text-ink-500">
          {filtered.length} mentor{filtered.length === 1 ? '(a)' : '(es)'} encontrado{filtered.length === 1 ? '' : 's'}.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((mentor, index) => (
          <motion.div key={mentor.id} transition={{ delay: index * 0.04 }}>
            <PersonCard person={{ ...mentor, tipo: 'mentor' }} />
          </motion.div>
        ))}
      </section>
    </div>
  );
}
