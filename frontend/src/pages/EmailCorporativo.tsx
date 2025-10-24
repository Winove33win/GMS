import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const EmailCorporativo = () => (
  <>
    <SEO
      title="E-mail corporativo em breve"
      description="Estamos preparando uma nova experiência para os serviços de e-mail corporativo."
      noindex
    />
    <PagePlaceholder
      title="Nova página de e-mail corporativo"
      description="Estamos redesenhando todo o conteúdo deste serviço. Em breve traremos as informações atualizadas."
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

export default EmailCorporativo;
