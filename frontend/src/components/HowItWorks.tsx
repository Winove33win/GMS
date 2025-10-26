const steps = [
  { title: "Inscreva-se", desc: "Conte seu objetivo e contexto." },
  { title: "Encaixe com mentor", desc: "Encontramos o melhor par para o seu projeto." },
  { title: "Acompanhe semanalmente", desc: "Sessões curtas, objetivas e com indicadores." },
];

export default function HowItWorks() {
  return (
    <div className="py-16 lg:py-20">
      <h2 id="como-funciona" className="text-2xl font-bold text-neutral-900">Como funciona</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="card p-6"
            aria-label={`${index + 1}º passo: ${step.title}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">{step.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{step.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
