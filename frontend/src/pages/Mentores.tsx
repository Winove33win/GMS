import { useEffect, useMemo, useState } from "react";
import PersonCard from "@/components/PersonCard";
import { SEO } from "@/lib/seo";

type Mentor = {
  id: string;
  nome: string;
  bio: string;
  areas: string[];
  cidade?: string;
  linkedin?: string;
  fotoUrl?: string;
};

type FetchStatus = "idle" | "loading" | "success" | "error";

const Mentores = () => {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    fetch("/api/mentores", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: Mentor[] = await response.json();
        setMentores(Array.isArray(data) ? data : []);
        setStatus("success");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        console.error("Erro ao carregar mentores", error);
        setStatus("error");
      });

    return () => controller.abort();
  }, []);

  const areas = useMemo(() => {
    const unique = new Set<string>();
    mentores.forEach((mentor) => {
      mentor.areas?.forEach((a) => unique.add(a));
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [mentores]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mentores.filter((mentor) => {
      const matchesText =
        !normalizedQuery ||
        `${mentor.nome} ${mentor.bio}`.toLowerCase().includes(normalizedQuery);
      const matchesArea = !area || mentor.areas?.includes(area);
      return matchesText && matchesArea;
    });
  }, [area, mentores, query]);

  return (
    <div className="bg-white">
      <SEO
        title="Mentores voluntários - Mentoria Solidária"
        description="Conheça a rede de mentores voluntários que apoiam projetos socioambientais e iniciativas alinhadas aos ODS."
        canonical="/mentores"
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold text-neutral-900">Mentores</h1>
          <p className="mt-3 text-neutral-600">
            Explore a rede de especialistas voluntários que disponibilizam tempo e experiência para impulsionar projetos com
            impacto social e ambiental.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome ou termo"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 sm:max-w-xs"
          />
          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 sm:w-56"
          >
            <option value="">Todas as áreas</option>
            {areas.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {status === "error" ? (
          <p className="mt-6 text-sm text-red-500">Não foi possível carregar os mentores. Tente novamente mais tarde.</p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {status === "loading" && filtered.length === 0 ? (
            <p className="text-sm text-neutral-500">Carregando mentores...</p>
          ) : null}
          {status === "success" && filtered.length === 0 ? (
            <p className="text-sm text-neutral-500">
              Nenhum mentor encontrado para os filtros selecionados.
            </p>
          ) : null}
          {filtered.map((mentor) => (
            <PersonCard key={mentor.id} {...mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentores;
