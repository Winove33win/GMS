import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";

export default function Privacidade() {
  return (
    <>
      <SEO title="Política de privacidade - Mentoria Solidária" description="Saiba como tratamos os dados pessoais da rede Mentoria Solidária." canonical="/privacidade" />
      <main>
        <Section title="Política de privacidade" description="Respeitamos a privacidade de mentores e iniciativas. Conheça como tratamos seus dados.">
          <div className="prose prose-neutral max-w-3xl">
            <p>
              Coletamos apenas os dados necessários para conectar mentores a projetos e facilitar o acompanhamento das mentorias.
              Isso inclui nome, e-mail, área de atuação, preferências de agenda e informações essenciais sobre a iniciativa.
            </p>
            <p>
              As informações são utilizadas exclusivamente para organizar a jornada de mentoria e nunca são compartilhadas com
              terceiros sem consentimento. Mantemos os dados em ambientes seguros, com acesso restrito à equipe responsável pela
              curadoria da rede.
            </p>
            <p>
              Você pode solicitar a atualização ou remoção das suas informações a qualquer momento enviando um e-mail para
              contato@mentoriasolidaria.org. Atualizaremos esta política sempre que houver mudanças significativas.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
