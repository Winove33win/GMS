const faqs = [
  { q: "Quanto custa?", a: "A mentoria é voluntária." },
  { q: "Como funciona a seleção?", a: "Analisamos aderência e disponibilidade de mentores." },
  { q: "Qual a carga horária?", a: "Encontros semanais de 60–90 minutos." },
  { q: "Quem pode ser mentor?", a: "Profissionais com vivência prática e vontade de contribuir." },
  { q: "Como começo?", a: "Clique em “Quero participar” e preencha o formulário." },
];

export default function FAQ() {
  return (
    <div className="py-16 lg:py-20">
      <h2 id="duvidas" className="text-2xl font-bold text-neutral-900">
        Dúvidas frequentes
      </h2>
      <div className="mt-6 divide-y divide-neutral-200">
        {faqs.map((item) => (
          <details key={item.q} className="group py-4" aria-label={`Pergunta frequente: ${item.q}`}>
            <summary className="flex cursor-pointer items-center justify-between text-left font-medium text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              {item.q}
              <span className="ml-4 text-sm text-neutral-500 transition-transform duration-200 group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-2 text-sm text-neutral-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
