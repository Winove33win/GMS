import { Link, useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

export const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <SEO
        title="Case em atualização"
        description="Estamos preparando uma nova apresentação para este case."
        noindex
      />
      <PagePlaceholder
        title="Case indisponível"
        description={slug ? `O case “${slug}” está sendo preparado para o novo site.` : "Nossos cases estão passando por uma atualização completa."}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/cases"
            className="inline-flex items-center justify-center rounded-md border border-input px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Ver todos os cases
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </PagePlaceholder>
    </>
  );
};
