import React from 'react';

const Sobre: React.FC = () => {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Quem somos</h1>
        <p className="text-neutral-600">
          A Mentoria Solidária (GMS) nasceu em 2019 a partir da articulação de profissionais ligados à Baita Aceleradora e à
          Unicamp. Somos uma rede voluntária, sem CNPJ, que promove encontros colaborativos para apoiar projetos de impacto
          socioambiental em todo o Brasil.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-brand-dark">Como atuamos</h2>
        <p className="text-neutral-600">
          Reunimos mentores às quintas-feiras, das 16h às 17h30, em ciclos de mentoria que combinam planejamento ágil, conexões
          com parceiros estratégicos e acompanhamento contínuo dos projetos.
        </p>
        <p className="text-neutral-600">
          Cada projeto é apresentado por meio de um roteiro com cinco perguntas-chave, que permitem entender a proposta de valor,
          necessidades e indicadores de impacto. A partir disso, conectamos especialistas e recursos que potencializam resultados.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-brand-dark">Princípios</h2>
        <ul className="list-disc space-y-2 pl-5 text-neutral-600">
          <li>Colaboração e compartilhamento de conhecimento.</li>
          <li>Alinhamento aos Objetivos de Desenvolvimento Sustentável.</li>
          <li>Transparência e responsabilidade com os territórios atendidos.</li>
        </ul>
      </section>
    </article>
  );
};

export default Sobre;
