import type { FC } from "react";

type Props = {
  nome: string;
  bio: string;
  areas: string[];
  cidade?: string;
  linkedin?: string;
  fotoUrl?: string;
};

const PersonCard: FC<Props> = ({ nome, bio, areas, cidade, linkedin, fotoUrl }) => {
  return (
    <article className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 text-neutral-500">
        {fotoUrl ? (
          <img src={fotoUrl} alt={nome} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <span className="text-sm font-semibold">{nome.charAt(0)}</span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-neutral-900">{nome}</h3>
        <p className="mt-1 text-sm text-neutral-600">{bio}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {areas.map((area) => (
            <span key={area} className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-600">
              {area}
            </span>
          ))}
        </div>
        <div className="mt-3 text-xs text-neutral-500">
          {cidade}
          {linkedin ? (
            <>
              {cidade ? " · " : null}
              <a
                href={linkedin}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default PersonCard;
