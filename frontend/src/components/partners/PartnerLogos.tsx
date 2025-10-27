import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { partnerLogoComponents, type PartnerLogoName } from "./PartnerLogoIcons";

export type PartnerCase = {
  title: string;
  kpi: string;
  ods: number;
  link?: string;
};

export type PartnerLogo = {
  kind: "component";
  name: PartnerLogoName;
};

export type Partner = {
  id: string;
  name: string;
  slug: string;
  categories: string[];
  logo: PartnerLogo;
  summary: string;
  url: string;
  cases: PartnerCase[];
  tier?: "Apoiador" | "Rede" | "Estratégico";
};

type PartnerLogosProps = {
  partners: Partner[];
  activeCategories: string[];
  searchTerm: string;
};

const fallbackLogo = "LogoInstitutoAurora" satisfies PartnerLogoName;

export function PartnerLogos({ partners, activeCategories, searchTerm }: PartnerLogosProps) {
  if (partners.length === 0) {
    const hasFilters = activeCategories.length > 0 || searchTerm.trim().length > 0;
    return (
      <div className="rounded-3xl border border-dashed border-brand-green/40 bg-white/60 p-8 text-center text-sm text-ink-muted">
        {hasFilters ? (
          <p>
            Nenhum parceiro encontrado com os filtros atuais. Ajuste a pesquisa ou limpe as categorias selecionadas para ver a
            lista completa.
          </p>
        ) : (
          <p>Aguardando parceiros para exibir.</p>
        )}
      </div>
    );
  }

  return (
    <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {partners.map((partner) => {
        const logoName = partner.logo.kind === "component" ? partner.logo.name : fallbackLogo;
        const LogoComponent = partnerLogoComponents[logoName] ?? partnerLogoComponents[fallbackLogo];

        return (
          <li
            key={partner.id}
            role="listitem"
            className="group rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-none transition hover:-translate-y-1 hover:shadow-card-soft"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                  aria-label={`Visitar site de ${partner.name}`}
                >
                  <span className="sr-only">{partner.name}</span>
                  <div className="flex h-16 items-center justify-center text-neutral-500 transition group-hover:text-brand-green">
                    <LogoComponent className="h-12 w-full max-w-[200px]" aria-hidden />
                  </div>
                  <p className="text-sm text-ink-muted line-clamp-3">{partner.summary}</p>
                </a>
              </TooltipTrigger>
              <TooltipContent align="start" className="max-w-xs text-left text-xs">
                <p className="font-semibold text-brand-dark">{partner.name}</p>
                <p className="mt-1 text-ink-muted">
                  Categorias:
                  <br />
                  <span className="font-medium text-ink">{partner.categories.join(", ")}</span>
                </p>
              </TooltipContent>
            </Tooltip>
            <div className="mt-4 flex flex-wrap gap-1 text-[11px] uppercase tracking-wide text-brand-green">
              {partner.categories.map((category) => (
                <span key={category} className="rounded-full bg-brand-green/10 px-2 py-1 font-semibold">
                  {category}
                </span>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
