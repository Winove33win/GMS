import React from "react";

type Props = {
  nome: string;
  bio: string;
  areas: string[];
  cidade?: string;
  linkedin?: string;
  fotoUrl?: string;
};

export default function PersonCard({ nome, bio, areas, cidade, linkedin, fotoUrl }: Props) {
  return (
    <article className="rounded-2xl border p-4 flex gap-4 items-start">
      <div className="w-16 h-16 rounded-xl bg-neutral-200 overflow-hidden shrink-0">
        {fotoUrl ? (
          <img src={fotoUrl} alt={nome} className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{nome}</h3>
        <p className="text-sm text-neutral-600 mt-1">{bio}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {areas.map((a) => (
            <span key={a} className="px-2 py-1 text-xs rounded-full bg-neutral-100 border">
              {a}
            </span>
          ))}
        </div>
        <div className="mt-2 text-xs text-neutral-500">
          {cidade}
          {linkedin ? (
            <>
              {' '}
              ·{' '}
              <a className="underline" href={linkedin} target="_blank">
                LinkedIn
              </a>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
