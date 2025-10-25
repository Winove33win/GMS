import { Hero } from "@/components/Hero";
import { SEO } from "@/lib/seo";
import { Link } from "react-router-dom";

const Index = () => (
  <div className="bg-white">
    <SEO
      title="Mentoria Solidária - Rede colaborativa de impacto"
      description="Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos Objetivos de Desenvolvimento Sustentável."
    />
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Hero />
      <section id="como-participar" className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">Quero ser mentor(a)</h2>
          <p className="mt-2 text-neutral-600">
            Ofereça sua experiência em encontros semanais para apoiar projetos em ODS.
          </p>
          <Link
            to="/mentores"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Ver mentores
          </Link>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900">Tenho um projeto</h2>
          <p className="mt-2 text-neutral-600">
            Traga sua ideia: seguimos um roteiro simples de cinco perguntas para evoluir juntos.
          </p>
          <a
            href="/contato"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
          >
            Apresentar projeto
          </a>
        </div>
      </section>
    </div>
  </div>
);

export default Index;
