const cases = [
  { title: "Projeto A", tag: "ODS 4", result: "+120 alunos atendidos" },
  { title: "Projeto B", tag: "ODS 13", result: "Plano de clima implantado" },
  { title: "Projeto C", tag: "ODS 6", result: "Filtro de água em 3 comunidades" },
  { title: "Projeto D", tag: "ODS 9", result: "MVP validado" },
  { title: "Projeto E", tag: "ODS 10", result: "Programa de inclusão estruturado" },
  { title: "Projeto F", tag: "ODS 3", result: "Roteiro de saúde comunitária" },
];

export default function FeaturedCases() {
  return (
    <div className="py-16 lg:py-20">
      <h2 id="cases" className="text-2xl font-bold text-neutral-900">
        Projetos apoiados
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-neutral-600">
        Resultados reais alcançados pelas iniciativas que recebem mentoria contínua.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {cases.map((project) => (
          <article key={project.title} className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{project.tag}</p>
            <h3 className="mt-2 text-lg font-semibold text-neutral-900">{project.title}</h3>
            <p className="mt-2 text-sm text-neutral-600">{project.result}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
