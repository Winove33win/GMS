import { PartnerCard } from '@/components/PartnerCard';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';

const benefits = [
  {
    title: 'Aprendizagem contínua',
    description: 'Cocriamos agendas formativas com parceiros, conectando especialistas e práticas em mentorias coletivas.',
  },
  {
    title: 'Visibilidade de impacto',
    description: 'Compartilhamos resultados em relatórios e eventos, valorizando marcas que investem em impacto social.',
  },
  {
    title: 'Rede territorial',
    description: 'Integramos iniciativas da Região Metropolitana de Campinas para gerar soluções colaborativas.',
  },
];

const supportSteps = [
  'Agende uma conversa para entender os objetivos da sua organização.',
  'Desenhe conosco um plano de apoio (mentorias, recursos, comunicação).',
  'Ative a rede e acompanhe resultados com indicadores e storytelling de impacto.',
];

export default function Parcerias() {
  const partners = content.partners;

  return (
    <div className="space-y-12">
      <Seo
        title="Parcerias"
        description="Como organizações, empresas e institutos podem apoiar a rede GMS e impulsionar projetos de impacto."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Conectar para transformar</span>
          <h1 className="text-4xl font-bold text-ink-900">Parcerias e apoiadores</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            A GMS articula empresas, institutos, universidades e coletivos para fortalecer projetos socioambientais. Conheça as
            possibilidades de apoiar financeiramente, com conhecimento ou infraestrutura.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="card-surface rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-ink-900">{benefit.title}</h2>
            <p className="mt-3 text-sm text-ink-600">{benefit.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 md:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-ink-900">Como apoiar</h2>
          <p className="text-base text-ink-600">
            Cada parceria é desenhada de forma personalizada. Iniciamos com um diagnóstico rápido para entender foco e metas e, a
            partir daí, definimos entregas conjuntas.
          </p>
          <ol className="space-y-3 text-base text-ink-700">
            {supportSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/10 text-sm font-semibold text-brand-green">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-surface-100 p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-ink-900">Vamos conversar?</h3>
            <p className="text-sm text-ink-600">
              Escreva para nosso time de parcerias e receba um diagnóstico de aderência em até 48h.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="/contato">Quero apoiar</a>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-ink-900">Parceiros ativos</h2>
          <p className="text-lg text-ink-600">Organizações que caminham conosco na construção da rede GMS.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard key={partner.nome} partner={partner} />
          ))}
        </div>
      </section>
    </div>
  );
}
