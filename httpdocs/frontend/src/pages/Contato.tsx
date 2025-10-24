import React, { FormEvent, useState } from 'react';

const Contato: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    setStatus('sending');
    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Request failed');
        }
        return res.json();
      })
      .then(() => setStatus('done'))
      .catch(() => setStatus('error'));
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Fale com a Mentoria Solidária</h1>
        <p className="text-neutral-600">
          Preencha o formulário para se voluntariar como mentor(a), apresentar um projeto ou propor uma parceria.
        </p>
      </header>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-brand-dark">Nome completo</span>
          <input
            required
            name="nome"
            className="rounded-lg border border-neutral-300 px-3 py-2 focus:border-brand-green focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-brand-dark">E-mail</span>
          <input
            required
            type="email"
            name="email"
            className="rounded-lg border border-neutral-300 px-3 py-2 focus:border-brand-green focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-brand-dark">Como deseja participar?</span>
          <select
            name="perfil"
            className="rounded-lg border border-neutral-300 px-3 py-2 focus:border-brand-green focus:outline-none"
          >
            <option value="mentor">Quero ser mentor(a)</option>
            <option value="amentorado">Quero apresentar um projeto</option>
            <option value="parceria">Quero propor parceria</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-brand-dark">Mensagem</span>
          <textarea
            name="mensagem"
            rows={4}
            className="rounded-lg border border-neutral-300 px-3 py-2 focus:border-brand-green focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-2 text-white font-semibold hover:bg-brand-green/90"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
        </button>
        {status === 'done' && <p className="text-sm text-brand-green">Mensagem recebida! Em breve entraremos em contato.</p>}
        {status === 'error' && (
          <p className="text-sm text-red-500">Houve um erro ao enviar. Tente novamente em instantes.</p>
        )}
      </form>

      <section className="space-y-2 text-sm text-neutral-600">
        <p>Conecte-se com a comunidade:</p>
        <ul className="list-disc pl-5">
          <li>
            <a className="text-brand-green underline" href="https://t.me/mentoria-solidaria">
              Canal no Telegram
            </a>
          </li>
          <li>
            <a className="text-brand-green underline" href="https://www.linkedin.com/company/mentoria-solidaria">
              Página no LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default Contato;
