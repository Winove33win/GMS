const faqs = [
  {
    question: "Quanto custa?",
    answer: "A mentoria é voluntária.",
  },
  {
    question: "Como funciona a seleção?",
    answer: "Analisamos aderência e disponibilidade de mentores.",
  },
  {
    question: "Qual a carga horária?",
    answer: "Encontros semanais de 60–90 minutos.",
  },
  {
    question: "Quem pode ser mentor?",
    answer: "Profissionais com vivência prática e vontade de contribuir.",
  },
  {
    question: "Como começo?",
    answer: "Clique em “Quero participar” e preencha o formulário.",
  },
];

export function FAQ() {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-[1.25rem] border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-none transition hover:shadow-card-soft"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-brand-dark">
            {faq.question}
            <span
              className="ml-auto rounded-full border border-brand-green/20 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green transition group-open:rotate-45"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm text-ink-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
