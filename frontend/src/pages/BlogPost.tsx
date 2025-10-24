import { Link, useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <SEO
        title="Artigo indisponível"
        description="Estamos atualizando nossos artigos para o novo site."
        noindex
      />
      <PagePlaceholder
        title="Este artigo ainda não voltou ao ar"
        description={slug ? `O conteúdo “${slug}” está sendo reescrito e ficará disponível novamente em breve.` : "Estamos atualizando os conteúdos enquanto migramos para a nova versão do site."}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-md border border-input px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Ver todos os artigos
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
