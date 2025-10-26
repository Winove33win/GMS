import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="container px-4 py-16 text-center sm:px-6 lg:py-24">
      <p className="mx-auto inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
        Rede colaborativa de impacto
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
        Mentoria Solidária
      </h1>
      <p className="mt-4 mx-auto max-w-2xl text-base text-neutral-600 md:text-lg">
        Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos ODS.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/mentores"
          className="btn btn-primary"
          aria-label="Conheça os mentores"
        >
          Conheça os mentores
        </Link>
        <Link
          to="/participar"
          className="btn btn-secondary"
          aria-label="Quero participar"
        >
          Quero participar
        </Link>
      </div>
    </section>
  );
}

export default Hero;
