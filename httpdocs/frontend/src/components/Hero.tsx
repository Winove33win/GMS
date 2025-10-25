import React from "react";

export default function Hero() {
  return (
    <section className="text-center py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold">Mentoria Solidária</h1>
      <p className="mt-4 text-lg text-neutral-600">
        Conectamos mentores voluntários e iniciativas socioambientais para acelerar soluções alinhadas aos ODS.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <a href="/mentores" className="px-5 py-3 rounded-xl bg-black text-white">
          Conheça os mentores
        </a>
        <a href="#como-participar" className="px-5 py-3 rounded-xl border">
          Quero participar
        </a>
      </div>
    </section>
  );
}
