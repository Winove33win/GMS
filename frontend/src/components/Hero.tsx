import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buttonClasses } from "@/components/Button";
import { Badge } from "@/components/Badge";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const onScroll = () => {
      setOffset(Math.min(window.scrollY * 0.12, 48));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface-muted">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-120px] flex justify-center"
        aria-hidden
      >
        <div
          className="h-[420px] w-[420px] rounded-full bg-brand-green/20 blur-3xl"
          style={{ transform: `translateY(${offset * -0.4}px)` }}
        />
      </div>

      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-24 pt-32 sm:px-6 md:grid-cols-[minmax(0,1fr)_0.8fr]">
        <div className="space-y-6">
          <Badge tone="brand" className="inline-flex text-[0.7rem] uppercase tracking-[0.35em] text-brand-green">
            Rede colaborativa de impacto
          </Badge>
          <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl md:text-6xl">Mentoria Solidária</h1>
          <p className="text-lg text-ink-muted md:text-xl">
            Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos ODS.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/mentores" className={buttonClasses("primary", "justify-center sm:w-auto")}>Conheça os mentores</Link>
            <Link to="/participar" className={buttonClasses("secondary", "justify-center sm:w-auto")}>Quero participar</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "+80 iniciativas apoiadas", description: "em desenvolvimento socioambiental" },
              { label: "12 áreas de atuação", description: "com especialistas voluntários" },
              { label: "Impacto mensurável", description: "relatórios alinhados aos ODS" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[rgba(15,15,15,0.08)] bg-white/80 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-brand-dark">{item.label}</p>
                <p className="mt-1 text-xs text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden h-full w-full md:block">
          <div
            className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-green/15 via-transparent to-brand-orange/10"
            style={{ transform: `translateY(${offset * 0.4}px)` }}
          />
          <div className="relative flex h-full min-h-[380px] flex-col justify-between rounded-[2rem] border border-[rgba(15,15,15,0.08)] bg-white/90 p-10 shadow-card-soft backdrop-blur">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-orange">ODS em foco</p>
              <p className="mt-3 text-2xl font-bold text-brand-dark">Mentorias desenhadas para gerar soluções concretas</p>
            </div>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden />
                Match estratégico entre mentor e projeto
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden />
                Plano de ação com metas semanais
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden />
                Indicadores conectados aos Objetivos de Desenvolvimento Sustentável
              </li>
            </ul>
            <p className="text-xs text-ink-muted">
              Mentorias on-line, com métricas acompanhadas pela comunidade Mentoria Solidária.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
