import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import partnersJson from "@/data/partners.json";
import { SEO } from "@/lib/seo";
import { buttonClasses } from "@/components/Button";
import { PolicyInline } from "@/components/PolicyInline";
import { Section } from "@/components/Section";
import { PartnerFilters } from "@/components/partners/PartnerFilters";
import { PartnerLogos, type Partner } from "@/components/partners/PartnerLogos";
import { CaseCard } from "@/components/partners/CaseCard";
import { TierCards } from "@/components/partners/TierCards";
import { ProcessTimeline } from "@/components/partners/ProcessTimeline";
import { toast } from "@/components/ui/use-toast";

const partners = partnersJson as Partner[];

const valueProps = [
  {
    title: "Co-desenho de soluções",
    description:
      "Trabalhamos lado a lado com a organização parceira para entender desafios e prototipar caminhos que façam sentido para cada território.",
  },
  {
    title: "Infra e rede",
    description:
      "Disponibilizamos mentores, infraestrutura de programas e conexões com especialistas que aceleram entregas.",
  },
  {
    title: "Escala e governança",
    description:
      "Apoiamos a implementação com acompanhamento contínuo, governança colaborativa e indicadores claros de impacto.",
  },
];

const faqs = [
  {
    question: "O que é uma parceria com a GMS?",
    answer:
      "É uma colaboração estruturada via programa para unir conhecimento, recursos e rede da GMS ao desafio socioambiental da organização proponente.",
  },
  {
    question: "Quais contrapartidas existem?",
    answer:
      "As contrapartidas variam conforme a modalidade (Apoiador, Rede ou Estratégico) e incluem dedicação de horas de mentoria, acesso à rede, infraestrutura e visibilidade conjunta.",
  },
  {
    question: "Como medimos impacto?",
    answer:
      "Definimos indicadores já no desenho do escopo, monitoramos durante a execução e consolidamos resultados em relatórios e painéis compartilhados.",
  },
  {
    question: "Há custos?",
    answer:
      "Os compromissos financeiros são acordados no memorando de entendimento quando necessários para cobrir infraestrutura e entregáveis combinados.",
  },
  {
    question: "Quanto tempo leva para iniciar?",
    answer:
      "Após a manifestação, o processo completo de análise, encaixe e acordo leva em média de 4 a 6 semanas, conforme complexidade do projeto.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mentoria Solidária (GMS)",
  url: "https://mentoriasolidaria.org/parcerias",
  description:
    "Aliamos conhecimento, rede e infraestrutura para que iniciativas socioambientais alcancem resultados concretos.",
  sameAs: [] as string[],
};

export default function Parcerias() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("proposta") === "ok") {
      toast({
        title: "Proposta recebida",
        description: "Obrigado por enviar sua parceria. Em breve retornaremos com os próximos passos.",
      });
      const next = new URLSearchParams(searchParams);
      next.delete("proposta");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    partners.forEach((partner) => {
      partner.categories.forEach((category) => unique.add(category));
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredPartners = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesCategories =
        activeCategories.length === 0 || activeCategories.every((category) => partner.categories.includes(category));

      const matchesSearch =
        normalizedSearch.length === 0 ||
        partner.name.toLowerCase().includes(normalizedSearch) ||
        partner.summary.toLowerCase().includes(normalizedSearch) ||
        partner.categories.some((category) => category.toLowerCase().includes(normalizedSearch));

      return matchesCategories && matchesSearch;
    });
  }, [activeCategories, searchTerm]);

  const cases = useMemo(
    () =>
      partners.flatMap((partner) => partner.cases.map((caseItem) => ({
        partner: partner.name,
        ...caseItem,
      }))
      ),
    []
  );

  const handleToggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setActiveCategories([]);
    setSearchTerm("");
  };

  return (
    <>
      <SEO
        title="Parcerias — Mentoria Solidária (GMS)"
        description="Aliamos conhecimento, rede e infraestrutura para que iniciativas socioambientais alcancem resultados concretos."
        canonical="/parcerias"
        jsonLd={organizationJsonLd}
      />
      <main className="bg-surface text-ink">
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-brand-green/10 py-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <h1 className="font-display text-[clamp(2.5rem,3.5vw,3.8rem)] font-semibold leading-tight text-brand-dark">
                Parcerias que aceleram impacto
              </h1>
              <p className="text-lg text-ink-muted">
                Aliamos conhecimento, rede e infraestrutura para que iniciativas socioambientais alcancem resultados concretos.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#logos" className={buttonClasses("primary")}>
                  Ver parceiros
                </a>
                <a href="#proposta" className={buttonClasses("secondary")}>
                  Quero ser parceiro
                </a>
              </div>
            </div>
            <div className="max-w-sm rounded-3xl border border-brand-green/20 bg-white/70 p-6 text-sm text-ink-muted shadow-card-soft">
              <h2 className="text-base font-semibold text-brand-dark">Fluxo guiado</h2>
              <p className="mt-3">
                Do primeiro contato ao relatório final, acompanhamos cada etapa junto com a organização parceira para garantir que o
                impacto combinado aconteça.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-green" />
                  <span>Mentorias e squads multidisciplinares</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-green" />
                  <span>Gestão compartilhada com governança clara</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-green" />
                  <span>Mensuração contínua de resultados e aprendizagens</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PolicyInline className="-mt-8 shadow-card-soft" />
        </div>
        <Section
          id="logos"
          title="Parceiros presentes na rede"
          description="Explore quem já colabora com a GMS e filtre por categorias ou tipo de organização."
        >
          <div className="space-y-6">
            <PartnerFilters
              categories={categories}
              activeCategories={activeCategories}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onToggleCategory={handleToggleCategory}
              onClearCategories={handleClearFilters}
              resultCount={filteredPartners.length}
            />
            <PartnerLogos partners={filteredPartners} activeCategories={activeCategories} searchTerm={searchTerm} />
          </div>
        </Section>
        <Section
          id="proposta"
          title="Como colaboramos"
          description="Trabalhamos em ciclos programados que combinam desenho, execução e reporte compartilhado."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-brand-dark">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
        <Section
          title="Casos em destaque"
          description="Resultados alcançados com parceiros em diferentes Objetivos de Desenvolvimento Sustentável."
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((caseItem) => (
              <CaseCard key={`${caseItem.partner}-${caseItem.title}`} {...caseItem} />
            ))}
          </div>
        </Section>
        <Section title="Modalidades e contrapartidas" description="Escolha a modalidade que faz mais sentido para a parceria.">
          <TierCards />
        </Section>
        <Section title="Como firmamos parceria" description="Etapas conduzidas com transparência do primeiro contato ao reporte final.">
          <ProcessTimeline />
        </Section>
        <section className="py-16">
          <div className="mx-auto max-w-5xl rounded-3xl bg-brand-green/10 px-6 py-12 text-center shadow-card-soft">
            <h2 className="text-3xl font-semibold text-brand-dark">Vamos criar impacto juntos?</h2>
            <p className="mt-3 text-base text-ink-muted">
              Conte como sua organização quer colaborar e vamos desenhar o melhor formato.
            </p>
            <Link to="/parcerias/propor" className={`${buttonClasses()} mt-6 inline-flex`}>Propor parceria</Link>
          </div>
        </section>
        <Section title="Perguntas frequentes">
          <div className="rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-card-soft">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-[rgba(15,15,15,0.08)] last:border-none">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-left text-base font-semibold text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">
                  {faq.question}
                  <span
                    aria-hidden
                    className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-brand-green/40 text-sm font-semibold text-brand-green transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-sm text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
