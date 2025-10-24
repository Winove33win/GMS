import { Link, useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const TemplateDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <SEO
        title="Template indisponível"
        description="Estamos atualizando os detalhes dos templates."
        noindex
      />
      <PagePlaceholder
        title="Página de template em construção"
        description={slug ? `O template “${slug}” fará parte da nova biblioteca assim que o site for relançado.` : "Os templates serão republicados junto com o novo site."}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/templates"
            className="inline-flex items-center justify-center rounded-md border border-input px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Voltar para templates
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir para a página inicial
          </Link>
        </div>
      </PagePlaceholder>
    </>
  );
};

export default TemplateDetail;
