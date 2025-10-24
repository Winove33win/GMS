import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const LibrasPage = () => (
  <>
    <SEO
      title="Serviço de Libras em reformulação"
      description="Estamos revisando a apresentação dos serviços de acessibilidade."
      noindex
    />
    <PagePlaceholder
      title="Nova página de serviços de Libras"
      description="Estamos reconstruindo a comunicação sobre soluções de Libras e acessibilidade digital."
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

export default LibrasPage;
