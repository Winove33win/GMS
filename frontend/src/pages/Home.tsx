import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  CalendarCheck,
  Handshake,
  Layers,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import sessionsData from "@/data/sessions.json";
import mentorsData from "@/data/mentors.json";
import type { CollectiveSession } from "@/types/program";
import type { Mentor } from "@/types/mentor";
import { SEO } from "@/lib/seo";
import { buttonClasses } from "@/components/Button";
import { BrandShapes } from "@/components/BrandShapes";
import { SpotlightCard } from "@/components/SpotlightCard";
import { StatsCounter } from "@/components/StatsCounter";
import { Timeline } from "@/components/Timeline";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ProjectCard } from "@/components/ProjectCard";
import { SessionsRail } from "@/components/SessionsRail";

const stats = [
  {
    label: "Mentores voluntários",
    value: 100,
    prefix: "+",
    icon: Users,
    description: "Especialistas dedicados a impulsionar iniciativas socioambientais.",
  },
  {
    label: "Áreas de atuação",
    value: 17,
    prefix: "",
    icon: Layers,
    description: "Conhecimento transversal para projetos complexos.",
  },
  {
    label: "Impactos mensuráveis",
    value: 250,
    prefix: "",
    icon: Activity,
    description: "Resultados acompanhados por indicadores e métricas.",
  },
  {
    label: "Parcerias ativas",
    value: 25,
    prefix: "",
    icon: Handshake,
    description: "Instituições conectadas para dar escala aos ODS.",
  },
] as const;

const timelineSteps = [
  {
    icon: <Sparkles className="h-6 w-6" aria-hidden />,
    title: "Inscreva-se",
    description: "Preencha o formulário e escolha a próxima janela disponível do programa.",
  },
  {
    icon: <Target className="h-6 w-6" aria-hidden />,
    title: "Encaixe com mentor",
    description: "Combinamos voluntários da rede com base nos desafios e objetivos priorizados.",
  },
  {
    icon: <CalendarCheck className="h-6 w-6" aria-hidden />,
    title: "Acompanhamento semanal",
    description: "Sessões remotas de 60 minutos, uma vez por semana, mediadas pelo Mentoria Solidária.",
  },
] as const;

const highlightedMentors = [
  {
    name: "Ana Ribeiro",
    role: "Especialista em ESG e governança",
    expertise: "Estratégia climática, métricas e relato integrado",
    score: 82,
    slug: "ana-ribeiro",
    nextWindow: "7–15/nov",
  },
  {
    name: "João Martins",
    role: "Consultor em inovação social",
    expertise: "Design de serviços e parcerias comunitárias",
    score: 74,
    slug: "joao-martins",
    nextWindow: "7–15/nov",
  },
  {
    name: "Larissa Couto",
    role: "Head de impacto em educação",
    expertise: "Modelos híbridos de aprendizagem e indicadores",
    score: 88,
    slug: "larissa-couto",
    nextWindow: "7–15/nov",
  },
  {
    name: "Paulo Vicente",
    role: "Especialista em finanças de impacto",
    expertise: "Modelagem de sustentabilidade financeira",
    score: 69,
    slug: "paulo-vicente",
    nextWindow: "7–15/nov",
  },
  {
    name: "Renata Lopes",
    role: "Gestora de diversidade",
    expertise: "Programas inclusivos e indicadores ESG",
    score: 77,
    slug: "renata-lopes",
    nextWindow: "7–15/nov",
  },
  {
    name: "Tiago Pereira",
    role: "Especialista em tecnologia cívica",
    expertise: "Dados abertos e participação social",
    score: 73,
    slug: "tiago-pereira",
    nextWindow: "7–15/nov",
  },
] as const;

const projects = [
  {
    kpi: "+120",
    label: "estudantes",
    ods: 4,
    title: "Trilhas de reforço escolar comunitário",
    description: "Mentorias estruturaram indicadores de impacto e planos de estudos colaborativos.",
  },
  {
    kpi: "Plano",
    label: "climático",
    ods: 13,
    title: "Governança para metas de carbono",
    description: "Mentores apoiaram a criação de roteiros de adaptação e mitigação climática.",
  },
  {
    kpi: "Filtro",
    label: "de água",
    ods: 6,
    title: "Tecnologia acessível para saneamento",
    description: "Rede cocriou melhorias no produto e na estratégia de distribuição comunitária.",
  },
] as const;

const testimonials = [
  {
    quote:
      "A curadoria do GMS nos conectou com uma mentora que entendeu nossos desafios desde o primeiro encontro.",
    author: "Bruna Almeida",
    role: "Coordenadora, Coletivo Sementes",
  },
  {
    quote:
      "Em oito semanas, saímos com um plano validado, indicadores claros e rituais para manter a evolução.",
    author: "Marcelo Tavares",
    role: "Fundador, Instituto Horizonte",
  },
  {
    quote:
      "O acompanhamento semanal e os materiais compartilhados transformaram a forma como conduzimos o projeto.",
    author: "Clara Souza",
    role: "Diretora, Rede Jovem Verde",
  },
] as const;

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mentoria Solidária (GMS)",
  url: "https://mentoriasolidaria.org",
  description:
    "Rede colaborativa para acelerar soluções alinhadas aos ODS por meio de mentoria voluntária.",
};

const homeMentors = mentorsData as Mentor[];
const upcomingSessions = sessionsData as CollectiveSession[];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const jsonLd = [
    organizationLd,
    ...highlightedMentors.map((mentor) => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: mentor.name,
      jobTitle: mentor.role,
      worksFor: organizationLd.name,
      url: `https://mentoriasolidaria.org/mentores/${mentor.slug}`,
      description: mentor.expertise,
    })),
  ];

  const fadeIn = shouldReduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.6 },
        transition: { duration: 0.18, ease: "easeOut" },
      };

  return (
    <>
      <SEO
        title="Mentoria Solidária — GMS"
        description="Rede colaborativa para acelerar soluções alinhadas aos ODS por meio de mentoria voluntária."
        canonical="/"
        jsonLd={jsonLd}
      />
      <main className="bg-surface text-ink">
        <section className="relative isolate overflow-hidden py-16 sm:py-24">
          <BrandShapes className="-z-10" />
          <div className="container grid gap-12 lg:grid-cols-12 lg:items-center">
            <motion.div
              className="flex flex-col gap-6 lg:col-span-7"
              {...(fadeIn ?? {})}
            >
              <span className="inline-flex max-w-max items-center rounded-full bg-brand-green/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
                Rede colaborativa de impacto
              </span>
              <h1 className="font-display text-[clamp(2.25rem,3.5vw,3.5rem)] font-semibold leading-tight text-ink">
                Mentoria Solidária
              </h1>
              <p className="max-w-[80ch] text-base leading-relaxed text-ink-muted">
                Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos ODS.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/mentores"
                  className={buttonClasses("primary", "justify-center sm:w-auto")}
                >
                  Conheça os mentores
                </Link>
                <Link
                  to="/participar"
                  className={buttonClasses(
                    "secondary",
                    "justify-center border-brand-green/30 bg-transparent text-brand-green sm:w-auto",
                  )}
                >
                  Quero participar
                </Link>
              </div>
            </motion.div>
            <div className="lg:col-span-5">
              <SpotlightCard
                title="Mentorias voluntárias com foco em impacto real"
                bullets={[
                  "Curadoria de mentores alinhada aos desafios priorizados",
                  "Planos de ação acompanhados semanalmente",
                  "Apoio contínuo da equipe Mentoria Solidária",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="flex flex-col gap-4 rounded-[1.5rem] border border-brand-green/10 bg-white/80 p-6 shadow-sm backdrop-blur"
                    {...(fadeIn ?? {})}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div className="space-y-1">
                      <p className="text-3xl font-semibold text-ink">
                        <StatsCounter start={0} end={stat.value} duration={1.2} prefix={stat.prefix ?? ""} />
                      </p>
                      <p className="text-sm font-medium uppercase tracking-wide text-brand-green/90">
                        {stat.label}
                      </p>
                    </div>
                    <p className="text-sm text-ink-muted">{stat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-16 sm:py-20">
          <div className="container flex flex-col gap-10">
            <motion.div className="max-w-2xl space-y-4" {...(fadeIn ?? {})}>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                Como funciona
              </span>
              <h2 className="text-3xl font-semibold text-ink">Trilha guiada nas janelas do programa</h2>
              <p className="text-base text-ink-muted">
                Toda a jornada é voluntária, remota e mediada pelo Mentoria Solidária. Escolha a janela, receba o match e avance com encontros semanais.
              </p>
            </motion.div>
            <Timeline steps={timelineSteps} />
          </div>
        </section>

        <div className="bg-white/60 py-16 sm:py-20">
          <div className="container">
            <SessionsRail
              sessions={upcomingSessions}
              mentors={homeMentors}
              description="Inscreva-se para acompanhar o coletivo da sua coorte."
            />
          </div>
        </div>

        <section id="mentores" className="bg-surface-muted py-16 sm:py-20">
          <div className="container flex flex-col gap-12">
            <motion.div className="max-w-2xl space-y-4" {...(fadeIn ?? {})}>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                Mentores em destaque
              </span>
              <h2 className="text-3xl font-semibold text-ink">Especialistas com match alto para o seu desafio</h2>
              <p className="text-base text-ink-muted">
                Atendimento pelo programa • 1×/semana • remoto. Conexões cuidadas pela equipe GMS para garantir foco nas entregas.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlightedMentors.map((mentor) => (
                <motion.article
                  key={mentor.slug}
                  className="flex h-full flex-col justify-between gap-6 rounded-[1.5rem] border border-brand-green/10 bg-white p-6 shadow-sm"
                  {...(fadeIn ?? {})}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-ink">{mentor.name}</h3>
                        <p className="text-sm font-medium text-brand-green/90">{mentor.role}</p>
                      </div>
                      {mentor.score >= 70 && (
                        <span className="match-badge">
                          <Sparkles className="h-4 w-4" aria-hidden />
                          Match alto
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">{mentor.expertise}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-green/80">
                      Atendimento pelo programa • 1×/semana • remoto
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 text-sm text-ink-muted">
                    <span className="font-semibold text-ink">
                      Próxima janela do programa: {mentor.nextWindow}
                    </span>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        to={`/participar?mentor=${mentor.slug}`}
                        className={buttonClasses("primary", "justify-center sm:flex-1")}
                      >
                        Conectar pelo programa
                      </Link>
                      <Link
                        to={`/mentores/${mentor.slug}`}
                        className={buttonClasses(
                          "secondary",
                          "justify-center border-brand-green/30 bg-transparent text-brand-green sm:flex-1",
                        )}
                      >
                        Ver perfil
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="py-16 sm:py-20">
          <div className="container flex flex-col gap-12">
            <motion.div className="max-w-2xl space-y-4" {...(fadeIn ?? {})}>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                Projetos apoiados
              </span>
              <h2 className="text-3xl font-semibold text-ink">ODS na prática com o Mentoria Solidária</h2>
              <p className="text-base text-ink-muted">
                Exemplos de resultados alcançados pelas iniciativas acompanhadas nas janelas do programa GMS.
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="py-16 sm:py-20">
          <div className="container grid gap-12 lg:grid-cols-[1fr_minmax(0,1fr)] lg:items-center">
            <motion.div className="space-y-4" {...(fadeIn ?? {})}>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-green">
                Depoimentos
              </span>
              <h2 className="text-3xl font-semibold text-ink">Transformações acompanhadas pelo GMS</h2>
              <p className="text-base text-ink-muted">
                A voz de quem vivenciou encontros semanais, materiais compartilhados e suporte contínuo da rede colaborativa.
              </p>
            </motion.div>
            <TestimonialsCarousel items={testimonials} autoplay={9000} pauseOnHover />
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-[2rem] bg-cta-gradient p-10 text-white shadow-[var(--shadow-spotlight)]">
              <div className="absolute inset-0 opacity-50">
                <BrandShapes className="absolute inset-0" />
              </div>
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl space-y-4">
                  <h2 className="font-display text-[clamp(2rem,3vw,3.25rem)] font-semibold leading-tight">
                    Vamos mentorar juntos?
                  </h2>
                  <p className="text-sm text-white/90">
                    Faça parte da rede colaborativa Mentoria Solidária e acelere soluções socioambientais alinhadas aos ODS.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
                  <Link
                    to="/participar"
                    className={buttonClasses("primary", "justify-center bg-white text-brand-green hover:bg-white/90")}
                  >
                    Quero participar
                  </Link>
                  <Link
                    to="/sobre"
                    className={buttonClasses("ghost", "justify-center text-white hover:text-white/80")}
                  >
                    Conheça a iniciativa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
