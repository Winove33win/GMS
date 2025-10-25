import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export type CTAProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTA({ title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CTAProps) {
  return (
    <motion.section
      className="card-surface relative overflow-hidden rounded-3xl border border-brand-green/20 bg-white px-6 py-10 md:px-10"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <span className="absolute -top-6 right-10 h-20 w-20 rounded-full bg-brand-amber/30 blur-2xl" aria-hidden />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-bold text-ink-900">{title}</h2>
          <p className="text-lg text-ink-600">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={primaryHref}>{primaryLabel}</a>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button asChild size="lg" variant="secondary">
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
