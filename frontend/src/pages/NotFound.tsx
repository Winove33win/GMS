import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const NotFound = () => (
  <>
    <SEO title="Página não encontrada" description="A página solicitada não existe." noindex />
    <PagePlaceholder
      title="Página não encontrada"
      description="O conteúdo que você procura foi removido durante a limpeza do site."
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

export default NotFound;
