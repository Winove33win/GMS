const steps = [
  {
    title: "Manifestação",
    description: "Recebemos a proposta via formulário e avaliamos critérios mínimos de elegibilidade.",
  },
  {
    title: "Encaixe e escopo",
    description: "Realizamos reuniões exploratórias para alinhar objetivos, indicadores e recursos disponíveis.",
  },
  {
    title: "Acordo (MoU)",
    description: "Formalizamos responsabilidades, governança e cronograma em um memorando de entendimento.",
  },
  {
    title: "Execução",
    description: "Coordenamos squads de mentoria, entregáveis e rituais de acompanhamento do programa.",
  },
  {
    title: "Reporte",
    description: "Consolidamos aprendizados, métricas e próximos passos para ciclos futuros.",
  },
];

export function ProcessTimeline() {
  return (
    <ol className="relative mx-auto grid gap-6 rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-8 shadow-card-soft md:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold text-brand-dark">{step.title}</h3>
          <p className="text-sm text-ink-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
