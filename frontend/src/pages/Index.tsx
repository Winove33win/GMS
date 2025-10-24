import { PagePlaceholder } from "@/components/PagePlaceholder";
import { SEO } from "@/lib/seo";

const Index = () => (
  <>
    <SEO
      title="Nova experiência em construção"
      description="Estamos preparando um novo website utilizando a infraestrutura existente."
      noindex
    />
    <PagePlaceholder
      title="Estamos construindo algo novo"
      description="Toda a camada visual anterior foi removida para que possamos reconstruir o site com calma. A infraestrutura, rotas e integrações seguem ativas."
    />
  </>
);

export default Index;
