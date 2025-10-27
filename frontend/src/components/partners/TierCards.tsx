import { Link } from "react-router-dom";
import { buttonClasses } from "@/components/Button";

type Tier = {
  name: "Apoiador" | "Rede" | "Estratégico";
  description: string;
  bullets: string[];
};

const tiers: Tier[] = [
  {
    name: "Apoiador",
    description: "Para organizações que desejam contribuir com iniciativas específicas do ciclo vigente.",
    bullets: [
      "Acesso a desafios priorizados da GMS",
      "Participação em mentorias temáticas pontuais",
      "Reconhecimento em relatórios trimestrais",
    ],
  },
  {
    name: "Rede",
    description: "Parcerias que combinam conhecimento e mobilização da comunidade de impacto.",
    bullets: [
      "Co-criação de trilhas formativas e eventos",
      "Integração à rede de especialistas da GMS",
      "Compartilhamento de métricas e aprendizados",
    ],
  },
  {
    name: "Estratégico",
    description: "Organizações que desejam desenhar programas multi-ano com metas compartilhadas.",
    bullets: [
      "Planejamento conjunto com governança dedicada",
      "Painéis de indicadores customizados",
      "Comunicação de impacto e storytelling de cases",
    ],
  },
];

export function TierCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <article
          key={tier.name}
          className="flex h-full flex-col justify-between rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">{tier.name}</span>
            <p className="text-sm text-ink-muted">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {tier.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/parcerias/propor"
            className={`${buttonClasses("secondary")} mt-6 w-full justify-center`}
          >
            Quero ser parceiro
          </Link>
        </article>
      ))}
    </div>
  );
}
