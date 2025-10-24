import { Link } from "react-router-dom";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

export const Admin = () => (
  <>
    <SEO
      title="Área administrativa desativada"
      description="A área administrativa será reintroduzida após a reconstrução do site."
      noindex
    />
    <PagePlaceholder
      title="Área administrativa em manutenção"
      description="Desativamos temporariamente o painel administrativo enquanto migramos para uma nova base visual."
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
