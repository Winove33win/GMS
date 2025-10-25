import { FormEvent, useState } from 'react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Contato() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [perfil, setPerfil] = useState('mentor');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus('sending');

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then((response) => {
        if (!response.ok) throw new Error('request-error');
        setStatus('done');
        event.currentTarget.reset();
        setPerfil('mentor');
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="space-y-12">
      <Seo
        title="Contato"
        description="Fale com a equipe GMS para se voluntariar como mentor(a), inscrever um projeto ou propor parceria."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Contato</span>
          <h1 className="text-4xl font-bold text-ink-900">Vamos conversar?</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Use o formulário para receber orientações sobre como participar das mentorias, apresentar um projeto ou apoiar a rede
            com recursos e parcerias.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5"
        aria-label="Formulário de contato"
      >
        <div className="grid gap-2">
          <label htmlFor="nome" className="text-sm font-semibold text-ink-700">
            Nome completo
          </label>
          <Input id="nome" name="nome" required placeholder="Seu nome" autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-ink-700">
            E-mail
          </label>
          <Input id="email" name="email" type="email" required placeholder="nome@exemplo.com" autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="perfil" className="text-sm font-semibold text-ink-700">
            Como deseja participar?
          </label>
          <Select value={perfil} onValueChange={setPerfil}>
            <SelectTrigger id="perfil">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mentor">Quero ser mentor(a)</SelectItem>
              <SelectItem value="projeto">Tenho um projeto</SelectItem>
              <SelectItem value="parceria">Quero propor parceria</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="perfil" value={perfil} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="mensagem" className="text-sm font-semibold text-ink-700">
            Mensagem
          </label>
          <Textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            placeholder="Conte rapidamente sobre o projeto ou dúvida"
            aria-describedby="mensagem-ajuda"
          />
          <span id="mensagem-ajuda" className="text-xs text-ink-500">
            Você receberá um retorno em até 48 horas úteis.
          </span>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
          </Button>
          {status === 'done' && <span className="text-sm text-brand-green">Mensagem enviada com sucesso!</span>}
          {status === 'error' && <span className="text-sm text-brand-amber">Algo deu errado. Tente novamente.</span>}
        </div>
      </form>

      <section className="space-y-3 rounded-3xl bg-surface-100 p-6">
        <h2 className="text-lg font-semibold text-ink-900">Outros canais</h2>
        <p className="text-sm text-ink-600">Fique por dentro dos encontros e oportunidades em nossos canais digitais.</p>
        <ul className="space-y-2 text-sm text-brand-green">
          <li>
            <a href="https://t.me/mentoria-solidaria" target="_blank" rel="noreferrer" className="hover:text-brand-amber">
              Canal no Telegram
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/mentoria-solidaria"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-amber"
            >
              Página no LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
