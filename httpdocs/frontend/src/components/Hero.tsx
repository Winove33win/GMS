import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaLabel, ctaHref }) => {
  return (
    <section className="rounded-2xl bg-brand-dark text-white px-6 py-12 flex flex-col gap-6 shadow-lg">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{title}</h1>
        <p className="max-w-2xl text-lg text-neutral-100">{subtitle}</p>
      </div>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="inline-flex w-fit items-center justify-center rounded-full bg-brand-amber px-6 py-3 text-brand-dark font-semibold shadow-md hover:shadow-lg transition"
        >
          {ctaLabel}
        </a>
      )}
    </section>
  );
};

export default Hero;
