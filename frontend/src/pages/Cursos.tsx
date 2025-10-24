import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const Cursos = () => (
  <>
    <SEO
      title="Cursos em reestruturação"
      description="Estamos reorganizando os materiais educacionais para o novo site."
      noindex
    />
    <PagePlaceholder
      title="Nova área de cursos em breve"
      description="A antiga landing page de cursos foi removida. Reestruturaremos este conteúdo na nova versão do site."
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

export default Cursos;
