import { CTA } from '@/components/CTA';
import { Seo } from '@/components/Seo';

const questions = [
  'Qual desafio socioambiental o projeto enfrenta atualmente?',
  'Quem participa da iniciativa e quais comunidades são impactadas?',
  'Quais entregas, aprendizados e indicadores já estão mapeados?',
  'Que apoio é prioritário para os próximos 90 dias?',
  'Como a rede GMS pode contribuir de forma colaborativa?',
];

export default function Roteiro() {
  return (
    <div className="space-y-12">
      <Seo
        title="Roteiro do pitch"
        description="As cinco perguntas que orientam a apresentação dos projetos nos encontros da GMS."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Preparação</span>
          <h1 className="text-4xl font-bold text-ink-900">Roteiro de 5 perguntas</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Utilize este roteiro para contar a história do seu projeto de forma clara e objetiva durante os encontros de mentoria.
            As perguntas direcionam o diagnóstico e os próximos passos.
          </p>
        </div>
        <ol className="space-y-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5">
          {questions.map((question, index) => (
            <li key={question} className="flex gap-4 text-base text-ink-700">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-sm font-semibold text-brand-green">
                {index + 1}
              </span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </section>

      <CTA
        title="Envie seu projeto para a próxima rodada"
        description="Preencha o formulário de contato e receba orientações para apresentar seu projeto nos encontros de quinta-feira."
        primaryLabel="Submeter projeto"
        primaryHref="/contato"
        secondaryLabel="Ver agenda"
        secondaryHref="/encontros"
      />
    </div>
  );
}
