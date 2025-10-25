import React, { useEffect, useState } from "react";
import PersonCard from "@/components/PersonCard";

type Mentor = {
  id: string;
  nome: string;
  bio: string;
  areas: string[];
  cidade?: string;
  linkedin?: string;
  fotoUrl?: string;
};

export default function Mentores() {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [q, setQ] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    fetch("/api/mentores")
      .then((r) => r.json())
      .then(setMentores)
      .catch(() => setMentores([]));
  }, []);

  const areas = Array.from(new Set(mentores.flatMap((m) => m.areas))).sort();
  const filtered = mentores.filter((m) => {
    const byText = (m.nome + m.bio).toLowerCase().includes(q.toLowerCase());
    const byArea = !area || m.areas.includes(area);
    return byText && byArea;
  });

  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-extrabold">Mentores</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome/termo"
          className="border rounded-xl px-3 py-2 w-full md:w-64"
        />
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="">Todas as áreas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <PersonCard key={m.id} {...m} />
        ))}
      </div>
    </section>
  );
}
