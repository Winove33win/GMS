import React from 'react';

type Stat = {
  label: string;
  value: string;
};

interface StatBarProps {
  stats: Stat[];
}

const StatBar: React.FC<StatBarProps> = ({ stats }) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm"
        >
          <span className="block text-3xl font-bold text-brand-green">{stat.value}</span>
          <span className="text-sm text-neutral-600">{stat.label}</span>
        </div>
      ))}
    </section>
  );
};

export default StatBar;
