import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";
import { buttonClasses } from "@/components/Button";

const NotFound = () => (
  <>
    <SEO title="Página não encontrada" description="A página solicitada não existe." noindex />
    <PagePlaceholder
      title="Página não encontrada"
      description="O conteúdo que você procura não está mais disponível. Volte para a Home para continuar navegando."
    >
      <Link to="/" className={buttonClasses("primary")}>
        Voltar ao início
      </Link>
    </PagePlaceholder>
  </>
);

export default NotFound;
