import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';

const meetingLink = 'https://meet.google.com/exemplo-gms';

export default function Encontros() {
  const meetings = content.meetings
    .slice()
    .sort((a, b) => a.data.localeCompare(b.data));

  return (
    <div className="space-y-12">
      <Seo
        title="Encontros de mentoria"
        description="Agenda fixa da GMS: quintas-feiras, 16h às 17h30, encontros híbridos para projetos mentorados."
      />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Agenda viva</span>
          <h1 className="text-4xl font-bold text-ink-900">Encontros GMS</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Reuniões híbridas (online + presencial em Campinas/SP) todas as quintas-feiras, das 16h às 17h30. Aberto para
            mentores, mentorados e novos parceiros conhecerem a rede.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5">
          <div className="space-y-1 text-sm text-ink-600">
            <p>
              <span className="font-semibold text-ink-900">Dia fixo:</span> quintas-feiras
            </p>
            <p>
              <span className="font-semibold text-ink-900">Horário:</span> 16h — 17h30 (BRT)
            </p>
            <p>
              <span className="font-semibold text-ink-900">Formato:</span> híbrido (Google Meet + presença em Campinas/SP)
            </p>
          </div>
          <Button asChild size="lg">
            <a href={meetingLink} target="_blank" rel="noreferrer">
              Entrar no encontro
            </a>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-ink-900">Próximas pautas</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => {
            const formattedDate = format(new Date(meeting.data), "d 'de' MMMM", { locale: ptBR });
            return (
              <div key={meeting.data} className="card-surface flex flex-col gap-4 rounded-3xl p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-base font-semibold text-ink-900">{formattedDate}</span>
                  <span className="rounded-full bg-surface-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
                    {meeting.formato}
                  </span>
                </div>
                <p className="text-sm text-ink-600">{meeting.resumo}</p>
                <div className="space-y-1 text-sm text-ink-500">
                  <p>
                    <span className="font-semibold text-ink-700">Pauta:</span> {meeting.pauta}
                  </p>
                  <p>
                    <span className="font-semibold text-ink-700">Projetos:</span> {meeting.projetos.join(', ')}
                  </p>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <a href={meeting.link} target="_blank" rel="noreferrer">
                    Link do encontro
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
