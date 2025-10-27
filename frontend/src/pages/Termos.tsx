import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";

export default function Termos() {
  return (
    <>
      <SEO title="Termos de uso - Mentoria Solidária" description="Entenda as diretrizes de uso da plataforma Mentoria Solidária." canonical="/termos" />
      <main>
        <Section title="Termos de uso" description="Conheça as diretrizes que orientam a participação na rede Mentoria Solidária.">
          <div className="prose prose-neutral max-w-3xl">
            <p>
              A rede Mentoria Solidária é composta por mentores voluntários, iniciativas socioambientais e parceiros apoiadores. Ao
              participar da plataforma, você concorda em utilizar os recursos de forma colaborativa, respeitando a confidencialidade
              das informações compartilhadas e honrando os compromissos estabelecidos em cada mentoria.
            </p>
            <p>
              O agendamento, replanejamento e cancelamento de encontros devem ser comunicados com antecedência mínima de 24 horas.
              Os materiais produzidos durante a mentoria permanecem sob titularidade da iniciativa atendida, salvo acordo escrito
              entre as partes.
            </p>
            <p>
              Reservamo-nos o direito de ajustar estes termos a qualquer momento para refletir aprendizados e boas práticas da rede.
              Alterações serão comunicadas por e-mail aos participantes ativos.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
