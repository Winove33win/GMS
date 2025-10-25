import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="px-4 py-16 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <span className="rounded-full bg-neutral-100 px-4 py-1 text-sm font-medium text-neutral-600">
          Rede colaborativa de impacto
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 md:text-5xl">
          Mentoria Solidária
        </h1>
        <p className="text-lg text-neutral-600">
          Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos Objetivos de
          Desenvolvimento Sustentável.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/mentores"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Conheça os mentores
          </Link>
          <a
            href="#como-participar"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
          >
            Quero participar
          </a>
        </div>
      </div>
    </section>
  );
};
