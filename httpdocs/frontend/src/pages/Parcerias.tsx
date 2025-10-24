import React, { useEffect, useState } from 'react';
import PartnerCard from '../components/PartnerCard';

interface Partner {
  nome: string;
  tipo: string;
  descricao: string;
  link?: string;
}

const Parcerias: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/content/partners.json')
      .then((res) => res.json() as Promise<Partner[]>)
      .then(setPartners)
      .catch((err) => console.error('Erro ao carregar parcerias', err));
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Parcerias e redes</h1>
        <p className="text-neutral-600">
          Iniciativas que se conectam ao ecossistema da GMS para fortalecer projetos de impacto socioambiental.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
  );
};

export default Parcerias;
