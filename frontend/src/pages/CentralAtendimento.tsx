import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

export const CentralAtendimento = () => (
  <>
    <SEO
      title="Central de atendimento em atualização"
      description="Estamos simplificando nossa área de atendimento para a nova versão do site."
      noindex
    />
    <PagePlaceholder
      title="Central de atendimento em breve"
      description="Em breve você encontrará aqui os novos canais de suporte e atendimento."
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
