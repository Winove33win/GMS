import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const ChatWhatsapp = () => (
  <>
    <SEO
      title="Integração WhatsApp em planejamento"
      description="Esta área será recriada no novo site com fluxos simplificados."
      noindex
    />
    <PagePlaceholder
      title="Página de Chat WhatsApp em construção"
      description="Estamos trabalhando em uma nova proposta para apresentar nossas integrações com WhatsApp."
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

export default ChatWhatsapp;
