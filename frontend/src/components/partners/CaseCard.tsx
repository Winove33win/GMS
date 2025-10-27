import type { PartnerCase } from "./PartnerLogos";

type CaseCardProps = PartnerCase & {
  partner: string;
};

export function CaseCard({ partner, title, kpi, ods, link }: CaseCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="space-y-3">
        <span className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
          ODS {ods}
        </span>
        <h3 className="text-lg font-semibold text-brand-dark">{title}</h3>
        <p className="text-sm text-ink-muted">
          <strong className="font-semibold text-brand-dark">{partner}</strong> — {kpi}
        </p>
      </div>
      {link ? (
        <a
          href={link}
          className="mt-6 inline-flex items-center text-sm font-semibold text-brand-green underline-offset-4 transition hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          Ver case
        </a>
      ) : null}
    </article>
  );
}
