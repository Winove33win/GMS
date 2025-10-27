const partners = [
  "Instituto Aurora",
  "Impact Lab",
  "ColabODS",
  "Rede Verde",
  "Futuro Circular",
  "Instituto Horizonte",
  "Pacto Local",
];

export function LogosBar() {
  return (
    <div className="rounded-[1.25rem] border border-[rgba(15,15,15,0.06)] bg-white/80 px-6 py-6 shadow-card-soft backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">Parceiros que conectam impacto</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3 md:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner}
            className="flex h-16 items-center justify-center rounded-xl bg-surface-muted text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted"
            role="img"
            aria-label={`Logo de ${partner}`}
          >
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}
