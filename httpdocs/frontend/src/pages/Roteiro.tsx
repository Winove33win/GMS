import React from 'react';
import CTA from '../components/CTA';

const perguntas = [
  'Qual desafio socioambiental o projeto enfrenta?',
  'Quem participa da iniciativa e quais são os beneficiários?',
  'Quais entregas e indicadores de impacto já existem?',
  'De que suporte o projeto precisa nos próximos 90 dias?',
  'Como a rede da Mentoria Solidária pode contribuir?'
];

const Roteiro: React.FC = () => {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Roteiro para apresentar o projeto</h1>
        <p className="text-neutral-600">
          Use estas perguntas para organizar a apresentação durante os encontros de quinta-feira. Elas ajudam a equipe de mentores a
          entender contexto, necessidades e próximos passos.
        </p>
      </header>

      <ol className="list-decimal space-y-4 pl-6 text-neutral-700">
        {perguntas.map((pergunta) => (
          <li key={pergunta}>
            <span className="font-medium text-brand-dark">{pergunta}</span>
          </li>
        ))}
      </ol>

      <CTA
        title="Quer compartilhar sua iniciativa?"
        description="Envie seu projeto e agende um horário nos encontros colaborativos para receber mentorias da rede."
        primaryLabel="Submeter projeto"
        primaryHref="/contato"
      />
    </section>
  );
};

export default Roteiro;
