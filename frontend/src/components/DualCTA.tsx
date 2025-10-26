import { Link } from "react-router-dom";

export default function DualCTA() {
  return (
    <div className="py-16 lg:py-20">
      <div className="grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900">Quero ser mentor(a)</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Ofereça sua experiência em encontros semanais para apoiar projetos em ODS.
          </p>
          <Link to="/mentores" className="btn btn-secondary mt-4">
            Ver mentores
          </Link>
        </article>
        <article className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900">Tenho um projeto</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Traga sua ideia: seguimos um roteiro simples de cinco perguntas para evoluir juntos.
          </p>
          <Link to="/participar" className="btn btn-primary mt-4">
            Apresentar projeto
          </Link>
        </article>
      </div>
    </div>
  );
}
