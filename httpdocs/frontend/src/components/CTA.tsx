import React from 'react';

interface CTAProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const CTA: React.FC<CTAProps> = ({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <section className="rounded-2xl border border-brand-green bg-brand-green/10 px-6 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-brand-dark">{title}</h2>
          <p className="max-w-xl text-sm text-neutral-700">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-brand-green px-6 py-3 text-brand-green font-semibold hover:bg-white/60 transition"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
