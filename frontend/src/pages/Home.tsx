import { SEO } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedMentors } from "@/components/FeaturedMentors";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { LogosBar } from "@/components/LogosBar";
import { Testimonials } from "@/components/Testimonials";
import { DualCTA } from "@/components/DualCTA";
import { FAQ } from "@/components/FAQ";
import { buttonClasses } from "@/components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <SEO
        title="Mentoria Solidária — Rede colaborativa de impacto"
        description="Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos ODS."
        canonical="/"
      />
      <main>
        <Hero />
        <Section
          id="como-funciona"
          eyebrow="Como funciona"
          title="Metodologia enxuta, resultado consistente"
          description="Três passos para conectar mentores voluntários a projetos que precisam de apoio estratégico."
        >
          <HowItWorks />
        </Section>

        <Section
          id="mentores"
          eyebrow="Mentores em destaque"
          title="Especialistas que doam tempo e experiência"
          description="Uma rede diversa de mentores voluntários dedicada a acelerar soluções socioambientais com foco nos ODS."
        >
          <FeaturedMentors />
        </Section>

        <Section
          id="projetos"
          eyebrow="Projetos apoiados"
          title="Resultados que ganham escala"
          description="Conheça algumas entregas impulsionadas pela comunidade Mentoria Solidária."
        >
          <FeaturedProjects />
        </Section>

        <Section className="pt-0" introClassName="mb-12 text-center" title="Uma rede guiada por parcerias" description="Organizações que já conectaram mentores, recursos e conhecimento para ampliar o impacto.">
          <LogosBar />
        </Section>

        <Section
          eyebrow="Depoimentos"
          title="Histórias que mostram o valor da mentoria"
          description="Colaboração técnica, ritmo e acompanhamento semanal geram resultados reais para quem atua com impacto."
        >
          <Testimonials />
        </Section>

        <Section
          className="bg-surface-muted"
          introClassName="mb-12"
          eyebrow="Participe"
          title="Dois caminhos para criar impacto com a gente"
        >
          <DualCTA />
        </Section>

        <Section eyebrow="FAQ" title="Perguntas frequentes">
          <FAQ />
        </Section>

        <Section className="pb-24">
          <div className="rounded-[1.75rem] border border-[rgba(15,15,15,0.06)] bg-brand-green text-white shadow-card-soft">
            <div className="flex flex-col gap-6 px-8 py-12 text-center sm:px-12">
              <h2 className="text-3xl font-bold">Vamos mentorar juntos?</h2>
              <p className="text-sm text-white/80">
                Junte-se à Mentoria Solidária para acelerar soluções socioambientais alinhadas aos ODS.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/participar" className={buttonClasses("secondary", "justify-center bg-white text-brand-dark hover:bg-white/90")}>Quero participar</Link>
                <Link
                  to="/mentores"
                  className={buttonClasses("ghost", "justify-center text-white hover:bg-white/10 hover:text-white/90")}
                >
                  Conheça os mentores
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
