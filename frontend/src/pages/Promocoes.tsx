import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const Promocoes = () => (
  <>
    <SEO
      title="Promoções temporariamente suspensas"
      description="Estamos preparando novas campanhas promocionais."
      noindex
    />
    <PagePlaceholder
      title="Promoções em breve"
      description="As campanhas anteriores foram removidas para dar espaço às novas ofertas que estamos planejando."
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

export default Promocoes;
