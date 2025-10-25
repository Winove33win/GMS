import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { CTA } from '@/components/CTA';
import { PartnerCard } from '@/components/PartnerCard';
import { ProjectCard } from '@/components/ProjectCard';
import { Seo } from '@/components/Seo';
import { StatBar } from '@/components/StatBar';
import { Button } from '@/components/ui/button';
import { content, getProjectHighlights } from '@/lib/content';

const steps = [
  {
    title: 'Aplicar para mentoria',
    description:
      'Compartilhe o contexto do seu projeto, os desafios atuais e os Objetivos de Desenvolvimento Sustentável que deseja priorizar.',
  },
  {
    title: 'Mentorar ou ser mentorado',
    description:
      'Encontros quinzenais com mentores da rede, combinando práticas ágeis, design estratégico e inteligência coletiva.',
  },
  {
    title: 'Validar e medir impacto',
    description:
      'Apoiamos na definição de indicadores, storytelling de impacto e conexão com parceiros estratégicos.',
  },
];

const stats = [
  { label: 'Horas de mentoria', value: '1.200h', description: 'de apoio voluntário desde 2021' },
  { label: 'Projetos acelerados', value: '42', description: 'com foco em educação, meio ambiente e inclusão' },
  { label: 'Mentores ativos', value: '68', description: 'de 15 áreas de conhecimento' },
  { label: 'ODS priorizados', value: '11', description: 'com metas alinhadas ao território' },
];

const partners = content.partners.slice(0, 4);

export default function Home() {
  const highlights = getProjectHighlights(3);

  return (
    <div className="space-y-16">
      <Seo title="Mentoria Solidária" description="Rede colaborativa de mentoria para acelerar projetos de impacto na RMC." />
      <Hero />

      <section className="section space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-ink-900">Como funciona</h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-600">
            Conectamos projetos com especialistas voluntários. A jornada é simples, transparente e orientada a dados.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="card-surface rounded-3xl p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.08 }}
            >
              <span className="text-sm font-semibold text-brand-green">Passo {index + 1}</span>
              <h3 className="mt-3 text-xl font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-ink-900">Indicadores da comunidade</h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-600">
            Monitoramos continuamente o impacto da rede de mentoria em projetos socioambientais e educacionais da região.
          </p>
          <StatBar stats={stats} />
        </div>
      </section>

      <section className="section space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-ink-900">Projetos em destaque</h2>
            <p className="text-lg text-ink-600">
              Casos acompanhados pela GMS que geram impacto direto em comunidades, escolas e coletivos.
            </p>
          </div>
          <Button asChild variant="secondary">
            <a href="/projetos">Ver todos os projetos</a>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section space-y-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold text-ink-900">Parceiros da rede</h2>
          <p className="mx-auto max-w-2xl text-lg text-ink-600">
            Organizações e coletivos que cocriam experiências de mentoria, pesquisa aplicada e mobilização territorial.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.nome} partner={partner} />
          ))}
        </div>
      </section>

      <CTA
        title="Participar da GMS"
        description="Vamos construir resultados concretos para projetos de impacto. Inscreva-se como mentor(a) voluntário ou apresente seu projeto para a próxima rodada de mentoria."
        primaryLabel="Quero entrar na rede"
        primaryHref="/contato"
        secondaryLabel="Conhecer projetos"
        secondaryHref="/projetos"
      />
    </div>
  );
}
