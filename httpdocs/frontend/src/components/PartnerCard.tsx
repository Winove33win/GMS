import { motion } from 'framer-motion';
import type { Partner } from '@/types/content';

export type PartnerCardProps = {
  partner: Partner;
};

export function PartnerCard({ partner }: PartnerCardProps) {
  const { nome, descricao, link, tipo } = partner;
  const content = (
    <div className="card-surface flex h-full flex-col gap-4 rounded-3xl p-6">
      <div className="space-y-1">
        {tipo && <p className="text-xs uppercase tracking-wide text-ink-500">{tipo}</p>}
        <h3 className="text-lg font-semibold text-ink-900">{nome}</h3>
      </div>
      <p className="flex-1 text-sm text-ink-600">{descricao}</p>
      {link && (
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
          Acessar parceiro
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
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {link ? (
        <a
          href={link}
          className="block h-full transition duration-200 ease-gentle-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-green"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  );
}
