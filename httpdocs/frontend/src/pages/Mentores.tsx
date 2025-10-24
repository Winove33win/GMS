import React, { useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';

interface Mentor {
  nome: string;
  bio: string;
  areas: string[];
  cidade?: string;
  linkedin?: string;
  disponibilidade?: string;
}

const Mentores: React.FC = () => {
  const [mentores, setMentores] = useState<Mentor[]>([]);

  useEffect(() => {
    fetch('/content/mentors.json')
      .then((res) => res.json() as Promise<Mentor[]>)
      .then(setMentores)
      .catch((err) => console.error('Erro ao carregar mentores', err));
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Rede de mentores</h1>
        <p className="text-neutral-600">
          Profissionais voluntários com experiência em inovação, impacto socioambiental e gestão colaborativa.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {mentores.map((mentor) => (
          <PersonCard
            key={mentor.nome}
            name={mentor.nome}
            role={mentor.areas.join(' • ')}
            description={`${mentor.bio}${mentor.disponibilidade ? ` | ${mentor.disponibilidade}` : ''}`}
            location={mentor.cidade}
            link={mentor.linkedin}
          />
        ))}
      </div>
    </section>
  );
};

export default Mentores;
