import React, { useEffect, useState } from 'react';

interface Goal {
  ano: number;
  objetivo: string;
  resultados_chave: string[];
}

const Metas: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    fetch('/content/goals.json')
      .then((res) => res.json() as Promise<Goal[]>)
      .then(setGoals)
      .catch((err) => console.error('Erro ao carregar metas', err));
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Metas 2025-2028</h1>
        <p className="text-neutral-600">
          Nosso plano plurianual combina expansão da rede de mentores, fortalecimento de projetos e aprimoramento das métricas de
          impacto socioambiental.
        </p>
      </header>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.ano} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-dark">{goal.ano}</h2>
            <p className="mt-1 text-sm text-neutral-600">{goal.objetivo}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-600">
              {goal.resultados_chave.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Metas;
