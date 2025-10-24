import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const Templates = () => (
  <>
    <SEO
      title="Templates em reconstrução"
      description="Estamos reorganizando nossa biblioteca de templates para o novo site."
      noindex
    />
    <PagePlaceholder
      title="Biblioteca de templates em breve"
      description="A área de templates está vazia temporariamente. Voltaremos com uma curadoria atualizada assim que o novo site estiver pronto."
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

export default Templates;
