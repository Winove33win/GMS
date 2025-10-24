import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const PaymentSuccess = () => (
  <>
    <SEO
      title="Pagamento registrado"
      description="A confirmação de pagamento será incorporada ao novo site."
      noindex
    />
    <PagePlaceholder
      title="Pagamento confirmado"
      description="Registramos o pagamento com sucesso, mas a página final será redesenhada para o novo site."
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

export default PaymentSuccess;
