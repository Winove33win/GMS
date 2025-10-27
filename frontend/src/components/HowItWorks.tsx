import { Card } from "@/components/Card";

const steps = [
  {
    title: "Inscreva-se",
    description: "Conte seu objetivo e contexto em poucos minutos.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 text-brand-green">
        <path
          fill="currentColor"
          d="M19 3H5a2 2 0 0 0-2 2v14l4-3h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-2.25 7.25h-9.5a1.25 1.25 0 1 1 0-2.5h9.5a1.25 1.25 0 1 1 0 2.5Zm0 3.5h-9.5a1.25 1.25 0 1 1 0-2.5h9.5a1.25 1.25 0 1 1 0 2.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Encaixe com mentor",
    description: "Sugerimos o par ideal para o seu momento.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 text-brand-green">
        <path
          fill="currentColor"
          d="M7 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm10 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM3 18a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1H3Zm10.5 0c0-1.5.43-2.88 1.18-4h1.32a4 4 0 0 1 4 4v1h-6.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Acompanhamento semanal",
    description: "Encontros curtos, objetivos e mensuráveis.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 text-brand-green">
        <path
          fill="currentColor"
          d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v3H2V6a2 2 0 0 1 2-2h3Zm15 7.5V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5ZM7 13a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2Z"
        />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step) => (
        <Card key={step.title} elevated>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
            {step.icon}
          </div>
          <h3 className="mt-6 text-lg font-semibold text-brand-dark">{step.title}</h3>
          <p className="mt-3 text-sm text-ink-muted">{step.description}</p>
        </Card>
      ))}
    </div>
  );
}
