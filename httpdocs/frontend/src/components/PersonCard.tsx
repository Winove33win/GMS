import { GraduationCap, MapPin, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { Mentor } from '@/types/content';

export type PersonCardProps = {
  person: Pick<Mentor, 'nome' | 'bio' | 'areas' | 'cidade' | 'linkedin' | 'fotoUrl'> & {
    tipo?: 'mentor' | 'amentorado';
    necessidades?: string[];
  };
};

export function PersonCard({ person }: PersonCardProps) {
  const { nome, bio, areas, cidade, linkedin, fotoUrl, tipo, necessidades } = person;
  const roleLabel = tipo === 'mentor' ? 'Mentor(a)' : tipo === 'amentorado' ? 'Projeto' : undefined;
  const linkLabel = tipo === 'mentor' ? 'LinkedIn' : 'Saiba mais';

  return (
    <motion.article
      className="card-surface flex flex-col gap-4 rounded-3xl p-6 transition-transform duration-200 ease-gentle-out hover:-translate-y-1"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-100">
          {fotoUrl ? (
            <img src={fotoUrl} alt={nome} className="h-full w-full object-cover" />
          ) : (
            <UserCircle2 className="h-10 w-10 text-brand-green" aria-hidden="true" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-ink-900">{nome}</h3>
            {roleLabel && <Badge variant="amber">{roleLabel}</Badge>}
          </div>
          <p className="text-sm text-ink-600">{bio}</p>
          {necessidades && necessidades.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-ink-600">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span>{necessidades.join(' • ')}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {areas.map((area) => (
              <Badge key={area}>{area}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-surface-100 pt-4 text-sm text-ink-600 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {cidade}
        </span>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-brand-green hover:text-brand-amber"
          >
            <span>{linkLabel}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
            <span className="sr-only">Acessar informações adicionais de {nome}</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}
