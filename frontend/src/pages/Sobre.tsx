import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";

const principles = [
  {
    title: "Impacto compartilhado",
    description: "Medimos resultados com indicadores alinhados aos ODS e compartilhamos aprendizados com toda a rede.",
  },
  {
    title: "Transparência",
    description: "Publicamos rotas, aprendizados e critérios de seleção para mentores e projetos.",
  },
  {
    title: "Colaboração",
    description: "Reuniões curtas, focadas, com pactos semanais entre mentor e iniciativa.",
  },
];

const governance = [
  "Conselho consultivo voluntário com especialistas em impacto e gestão",
  "Mentores certificados com curadoria contínua",
  "Fórum trimestral com representantes de projetos e parceiros",
];

const partners = ["Instituto Aurora", "Impact Lab", "Pacto Global Local", "Rede Verde", "Futuro Circular"];

const coreTeam = [
  { name: "Fernanda Alves", role: "Coordenação geral" },
  { name: "Ricardo Paiva", role: "Articulação com mentores" },
  { name: "Juliana Souza", role: "Gestão de projetos" },
  { name: "Luiz Campos", role: "Indicadores e dados" },
];

export default function Sobre() {
  return (
    <>
      <SEO
        title="Sobre a Mentoria Solidária"
        description="Conheça a missão, os princípios e a governança da rede que conecta mentores voluntários a iniciativas socioambientais."
        canonical="/sobre"
      />
      <main>
        <Section
          title="Sobre"
          description="Somos uma rede colaborativa que conecta profissionais voluntários a iniciativas socioambientais, acelerando soluções alinhadas aos Objetivos de Desenvolvimento Sustentável."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((principle) => (
              <Card key={principle.title} elevated>
                <h3 className="text-lg font-semibold text-brand-dark">{principle.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{principle.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Missão"
          title="Acelerar soluções para os ODS"
          description="Mentorias desenhadas para gerar resultados mensuráveis e fortalecer redes locais."
        >
          <Card elevated>
            <p className="text-base text-ink">
              A Mentoria Solidária nasce para conectar quem precisa de orientação prática a quem pode oferecer experiência de mercado.
              Unimos especialistas em estratégia, gestão, produto, captação e dados a projetos comprometidos com a transformação social e ambiental.
            </p>
          </Card>
        </Section>

        <Section eyebrow="Governança" title="Modelo colaborativo">
          <div className="grid gap-4 md:grid-cols-2">
            <Card elevated>
              <h3 className="text-lg font-semibold text-brand-dark">Estrutura e decisões</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                {governance.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-green" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card elevated>
              <h3 className="text-lg font-semibold text-brand-dark">Ferramentas e transparência</h3>
              <p className="mt-3 text-sm text-ink-muted">
                Utilizamos plataformas colaborativas para registrar objetivos, entregas e indicadores. Cada mentoria possui um painel compartilhado com o projeto, mentor e equipe de suporte.
              </p>
            </Card>
          </div>
        </Section>

        <Section eyebrow="Parceiros" title="Quem impulsiona a rede">
          <Card elevated className="flex flex-wrap gap-3">
            {partners.map((partner) => (
              <span key={partner} className="rounded-full bg-surface-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                {partner}
              </span>
            ))}
          </Card>
        </Section>

        <Section eyebrow="Equipe" title="Núcleo facilitador">
          <div className="grid gap-4 md:grid-cols-2">
            {coreTeam.map((member) => (
              <Card key={member.name} elevated>
                <h3 className="text-lg font-semibold text-brand-dark">{member.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{member.role}</p>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
