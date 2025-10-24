import React, { useEffect, useMemo, useState } from 'react';
import Hero from '../components/Hero';
import StatBar from '../components/StatBar';
import ProjectCard from '../components/ProjectCard';
import PartnerCard from '../components/PartnerCard';
import CTA from '../components/CTA';
import { api, ProjectRecord } from '../lib/api';

type Partner = {
  nome: string;
  tipo: string;
  descricao: string;
  link?: string;
};

const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    api
      .listProjects()
      .then(setProjects)
      .catch((err) => console.error('Erro ao carregar projetos', err));

    fetch('/content/partners.json')
      .then((res) => res.json() as Promise<Partner[]>)
      .then(setPartners)
      .catch((err) => console.error('Erro ao carregar parceiros', err));
  }, []);

  const highlighted = useMemo(() => projects.slice(0, 3), [projects]);

  const stats = [
    { label: 'Encontros de mentoria', value: '5 anos' },
    { label: 'Projetos apoiados', value: `${projects.length || '12+'}` },
    { label: 'Mentores voluntários', value: '60+' },
  ];

  return (
    <div className="space-y-12">
      <Hero
        title="Mentoria Solidária: inovação e impacto socioambiental"
        subtitle="Rede colaborativa que conecta mentores voluntários e iniciativas de impacto para acelerar soluções alinhadas aos ODS."
        ctaLabel="Quero participar"
        ctaHref="/contato"
      />

      <StatBar stats={stats} />

      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-brand-dark">Projetos em destaque</h2>
            <p className="text-sm text-neutral-600">Conheça iniciativas acompanhadas pela rede GMS.</p>
          </div>
        </header>
        <div className="grid gap-5 md:grid-cols-3">
          {highlighted.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.titulo}
              description={project.descricao_curta}
              status={project.status}
              ods={project.ods}
              city={project.cidade}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-brand-dark">Para mentores</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Compartilhe sua expertise em encontros quinzenais, contribua com planejamento estratégico e conecte iniciativas a novas
            oportunidades.
          </p>
          <a href="/contato" className="mt-4 inline-flex text-brand-green underline">
            Quero ser mentor(a)
          </a>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-brand-dark">Para amentorados</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Receba apoio para estruturar seu projeto, validar propostas e acessar uma rede de parceiros comprometida com impacto
            socioambiental.
          </p>
          <a href="/contato" className="mt-4 inline-flex text-brand-green underline">
            Quero apresentar um projeto
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <header>
          <h2 className="text-2xl font-semibold text-brand-dark">Parceiros e redes</h2>
          <p className="text-sm text-neutral-600">Articulações que fortalecem a jornada de mentoria solidária.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.nome}
              name={partner.nome}
              type={partner.tipo}
              description={partner.descricao}
              link={partner.link}
            />
          ))}
        </div>
      </section>

      <CTA
        title="Pronto para mentorar ou apresentar seu projeto?"
        description="Encontros colaborativos acontecem às quintas-feiras, das 16h às 17h30, com foco em planejamento ágil e impacto nos ODS."
        primaryLabel="Falar com a equipe"
        primaryHref="/contato"
        secondaryLabel="Conhecer o roteiro"
        secondaryHref="/roteiro"
      />
    </div>
  );
};

export default Home;
