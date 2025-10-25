import { Seo } from '@/components/Seo';
import { Badge } from '@/components/ui/badge';
import { content } from '@/lib/content';

export default function Metas() {
  const goals = content.goals;

  return (
    <div className="space-y-12">
      <Seo
        title="Metas por ODS"
        description="Metas atuais da GMS alinhadas aos Objetivos de Desenvolvimento Sustentável prioritários."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Impacto monitorado</span>
          <h1 className="text-4xl font-bold text-ink-900">Metas e indicadores por ODS</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Acompanhamos metas vivas e indicadores que orientam os esforços da comunidade GMS. Cada card conecta um objetivo de
            desenvolvimento sustentável com metas concretas para a rede.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => (
          <div key={goal.ods} className="card-surface flex h-full flex-col gap-4 rounded-3xl p-6">
            <Badge variant="selected">ODS {goal.ods}</Badge>
            <h2 className="text-xl font-semibold text-ink-900">{goal.meta}</h2>
            <ul className="space-y-2 text-sm text-ink-600">
              {goal.indicadores.map((indicador) => (
                <li key={indicador} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-green" aria-hidden />
                  <span>{indicador}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
