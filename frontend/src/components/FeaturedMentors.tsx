import { Link } from "react-router-dom";

const mentors = Array.from({ length: 6 }).map((_, index) => ({
  name: `Mentor ${index + 1}`,
  area: "Impacto / Gestão",
  avatar: `https://api.dicebear.com/9.x/initials/svg?seed=M${index + 1}`,
}));

export default function FeaturedMentors() {
  return (
    <div className="py-16 lg:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="mentores" className="text-2xl font-bold text-neutral-900">
            Mentores em destaque
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Uma rede multidisciplinar com experiência prática para apoiar desafios de impacto socioambiental.
          </p>
        </div>
        <Link to="/mentores" className="link" aria-label="Ver todos os mentores">
          Ver todos os mentores
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {mentors.map((mentor) => (
          <article key={mentor.name} className="card flex items-center gap-4 p-4">
            <img
              src={mentor.avatar}
              alt={`Avatar ilustrativo de ${mentor.name}`}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-neutral-200 bg-white object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-medium text-neutral-900">{mentor.name}</p>
              <p className="text-sm text-neutral-600">{mentor.area}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
