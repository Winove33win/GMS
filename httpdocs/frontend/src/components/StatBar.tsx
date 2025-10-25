import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Stat = {
  label: string;
  value: string;
  description?: string;
};

type StatBarProps = {
  stats: Stat[];
  className?: string;
};

export function StatBar({ stats, className }: StatBarProps) {
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="card-surface flex flex-col gap-2 rounded-2xl p-6 text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.18, ease: 'easeOut', delay: index * 0.05 }}
        >
          <span className="text-3xl font-semibold text-ink-900">{stat.value}</span>
          <span className="text-sm font-medium uppercase tracking-wide text-brand-green">{stat.label}</span>
          {stat.description && <p className="text-sm text-ink-600">{stat.description}</p>}
        </motion.div>
      ))}
    </div>
  );
}
