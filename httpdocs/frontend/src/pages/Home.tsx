import React from "react";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="como-participar" className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold">Quero ser mentor(a)</h2>
          <p className="mt-2 text-neutral-600">
            Ofereça sua experiência em encontros semanais para apoiar projetos em ODS.
          </p>
          <a href="/mentores" className="inline-block mt-4 px-4 py-2 rounded-xl bg-black text-white">
            Ver mentores
          </a>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-bold">Tenho um projeto</h2>
          <p className="mt-2 text-neutral-600">
            Traga sua ideia: seguimos um roteiro simples de 5 perguntas para evoluir juntos.
          </p>
          <a href="/contato" className="inline-block mt-4 px-4 py-2 rounded-xl border">
            Apresentar projeto
          </a>
        </div>
      </section>
    </>
  );
}
