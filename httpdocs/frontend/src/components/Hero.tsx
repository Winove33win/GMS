import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="section flex flex-col gap-12 lg:flex-row lg:items-center">
      <motion.div
        className="flex-1 space-y-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-100 px-4 py-2 text-sm font-medium text-brand-green">
          Rede colaborativa de mentoria
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Mentoria Solidária para acelerar projetos de impacto.
        </h1>
        <p className="max-w-2xl text-lg text-ink-700">
          Conectamos especialistas voluntários e iniciativas socioambientais para destravar desafios, validar soluções e
          escalar resultados alinhados aos Objetivos de Desenvolvimento Sustentável.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="/mentores">Quero ser mentor(a)</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="/contato">Tenho um projeto</a>
          </Button>
        </div>
        <dl className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-ink-500">Projetos apoiados</dt>
            <dd className="text-3xl font-bold text-ink-900">42</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-500">Mentores ativos</dt>
            <dd className="text-3xl font-bold text-ink-900">68</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink-500">ODS priorizados</dt>
            <dd className="text-3xl font-bold text-ink-900">11</dd>
          </div>
        </dl>
      </motion.div>
      <motion.div
        className="flex flex-1 items-center justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut', delay: 0.05 }}
      >
        <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">Tagline</p>
              <p className="mt-2 text-lg font-semibold text-ink-900">
                “Rede colaborativa de mentoria para acelerar projetos de impacto.”
              </p>
            </div>
            <div className="space-y-2 text-sm text-ink-600">
              <p>
                Mentorias semanais, trilhas práticas e comunidade ativa para apoiar projetos sociais, ambientais e de educação
                tecnológica.
              </p>
              <p className="font-medium text-ink-900">+ 4 horas de mentoria coletiva por mês.</p>
            </div>
            <div className="rounded-2xl bg-surface-100 p-4 text-sm text-ink-700">
              <p className="font-semibold text-ink-900">Próximo encontro</p>
              <p>Quintas-feiras • 16h às 17h30</p>
              <p>Híbrido (online + presencial em Campinas/SP)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
