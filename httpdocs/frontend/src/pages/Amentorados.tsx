import React, { useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';

interface Mentee {
  nome: string;
  organizacao: string;
  descricao: string;
  cidade?: string;
  contatos?: {
    email?: string;
  };
}

const Amentorados: React.FC = () => {
  const [mentees, setMentees] = useState<Mentee[]>([]);

  useEffect(() => {
    fetch('/content/mentees.json')
      .then((res) => res.json() as Promise<Mentee[]>)
      .then(setMentees)
      .catch((err) => console.error('Erro ao carregar amentorados', err));
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Projetos acompanhados</h1>
        <p className="text-neutral-600">
          Empreendedores e organizações que recebem apoio da rede de mentores para acelerar impacto.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {mentees.map((mentee) => (
          <PersonCard
            key={mentee.nome}
            name={mentee.nome}
            role={mentee.organizacao}
            description={`${mentee.descricao}${mentee.contatos?.email ? ` | ${mentee.contatos.email}` : ''}`}
            location={mentee.cidade}
          />
        ))}
      </div>
    </section>
  );
};

export default Amentorados;
