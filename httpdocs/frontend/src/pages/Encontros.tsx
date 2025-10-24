import React, { useEffect, useState } from 'react';

interface Meeting {
  data: string;
  formato: string;
  resumo: string;
  pauta: string;
  link: string;
  projetos: string[];
}

const Encontros: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetch('/content/meetings.json')
      .then((res) => res.json() as Promise<Meeting[]>)
      .then((items) =>
        [...items].sort((a, b) => a.data.localeCompare(b.data)).reverse()
      )
      .then(setMeetings)
      .catch((err) => console.error('Erro ao carregar agenda', err));
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Encontros de mentoria</h1>
        <p className="text-neutral-600">
          As sessões acontecem às quintas-feiras, das 16h às 17h30, via Google Meet. Escolha uma data e traga seu projeto para a roda
          colaborativa.
        </p>
        <a
          href="https://meet.google.com/example"
          className="inline-flex w-fit rounded-full border border-brand-green px-5 py-2 text-brand-green hover:bg-brand-green/10"
        >
          Entrar no encontro (link fixo)
        </a>
      </header>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.data} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-semibold text-brand-dark">
                {new Date(meeting.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
              </span>
              <span className="uppercase tracking-wide text-xs text-neutral-500">{meeting.formato}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">{meeting.resumo}</p>
            <p className="mt-2 text-sm text-neutral-500">Pauta: {meeting.pauta}</p>
            <p className="mt-2 text-xs text-neutral-500">Projetos: {meeting.projetos.join(', ')}</p>
            {meeting.link && (
              <a
                href={meeting.link}
                className="mt-3 inline-flex text-sm font-semibold text-brand-green underline"
              >
                Acessar link do encontro
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Encontros;
