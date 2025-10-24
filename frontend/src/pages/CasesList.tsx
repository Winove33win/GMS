import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

export const CasesList = () => (
  <>
    <SEO
      title="Cases em atualização"
      description="Estamos organizando novos cases para o relançamento do site."
      noindex
    />
    <PagePlaceholder
      title="Portfólio em reformulação"
      description="Todos os estudos de caso estão sendo revisados e migrados para a nova experiência digital."
    >
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Voltar ao início
      </Link>
    </PagePlaceholder>
  </>
);
