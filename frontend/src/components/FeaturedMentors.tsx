import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { buttonClasses } from "@/components/Button";

const mentors = [
  {
    name: "Ana Lima",
    area: "Estratégia & Impacto",
    tags: ["ODS 17", "Governança"],
  },
  {
    name: "Bruno Medeiros",
    area: "Dados & Avaliação",
    tags: ["ODS 4", "Analytics"],
  },
  {
    name: "Carla Souza",
    area: "ESG & Governança",
    tags: ["ODS 13", "ESG"],
  },
  {
    name: "Diego Freitas",
    area: "Produto & MVP",
    tags: ["ODS 9", "Produto"],
  },
  {
    name: "Elisa Cardoso",
    area: "Captação & Parcerias",
    tags: ["ODS 8", "Captação"],
  },
  {
    name: "Fábio Nunes",
    area: "Operações & Escala",
    tags: ["ODS 11", "Processos"],
  },
];

function avatarUrl(name: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=2fb464ff&fontWeight=700`;
}

export function FeaturedMentors() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {mentors.map((mentor) => (
          <Card key={mentor.name} elevated className="flex flex-col">
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl(mentor.name)}
                alt={`Foto de ${mentor.name}`}
                className="h-14 w-14 rounded-full border border-[rgba(15,15,15,0.08)] bg-white object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="text-lg font-semibold text-brand-dark">{mentor.name}</h3>
                <p className="text-sm text-ink-muted">{mentor.area}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <Badge key={tag} tone="neutral" className="rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em]">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/mentores" className={buttonClasses("secondary")}>Ver todos os mentores</Link>
      </div>
    </div>
  );
}
