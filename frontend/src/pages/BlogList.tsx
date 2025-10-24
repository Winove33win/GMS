import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

export const BlogList = () => (
  <>
    <SEO
      title="Blog em revisão"
      description="Estamos reorganizando o conteúdo do blog enquanto preparamos o novo site."
      noindex
    />
    <PagePlaceholder
      title="Conteúdo em revisão"
      description="Os artigos do blog foram temporariamente desativados durante o processo de reconstrução. Em breve publicaremos novidades."
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
