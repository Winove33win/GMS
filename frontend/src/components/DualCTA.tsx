import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { buttonClasses } from "@/components/Button";

export function DualCTA() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card elevated className="flex flex-col justify-between border-white/20 bg-brand-green text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Quero ser mentor(a)</p>
          <h3 className="mt-4 text-2xl font-bold">Ofereça sua experiência</h3>
          <p className="mt-3 text-sm text-white/80">
            Ofereça sua experiência em encontros semanais para apoiar projetos em ODS.
          </p>
        </div>
        <Link to="/mentores" className={buttonClasses("secondary", "mt-6 w-full justify-center bg-white text-brand-dark hover:bg-white/90")}>Ver mentores</Link>
      </Card>

      <Card elevated className="flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">Tenho um projeto</p>
          <h3 className="mt-4 text-2xl font-bold text-brand-dark">Traga sua ideia para evoluir</h3>
          <p className="mt-3 text-sm text-ink-muted">
            Traga sua ideia: seguimos um roteiro simples de cinco perguntas para evoluir juntos.
          </p>
        </div>
        <Link to="/participar" className={buttonClasses("primary", "mt-6 w-full justify-center")}>Apresentar projeto</Link>
      </Card>
    </div>
  );
}
