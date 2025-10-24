import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const PaymentCanceled = () => (
  <>
    <SEO
      title="Pagamento cancelado"
      description="O fluxo de pagamento será reconstruído juntamente com o novo site."
      noindex
    />
    <PagePlaceholder
      title="Pagamento não concluído"
      description="Detectamos que o pagamento foi cancelado. Em breve apresentaremos uma experiência mais completa para resolver esse tipo de situação."
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

export default PaymentCanceled;
