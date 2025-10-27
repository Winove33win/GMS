import { FormEvent } from "react";

export interface MentorFiltersState {
  expertise: string[];
  ods: number[];
  seniority: string;
  languages: string[];
  location: string;
  availability: string;
}

interface MentorFiltersProps {
  value: MentorFiltersState;
  onChange: (value: MentorFiltersState) => void;
  onApply: (value: MentorFiltersState) => void;
  onClear: () => void;
  options: {
    expertise: string[];
    ods: number[];
    seniority: string[];
    languages: string[];
    availability: string[];
  };
}

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function Filters({ value, onChange, onApply, onClear, options }: MentorFiltersProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply(value);
  };

  const handleExpertiseToggle = (item: string) => {
    onChange({
      ...value,
      expertise: toggleValue(value.expertise, item),
    });
  };

  const handleOdsToggle = (item: number) => {
    onChange({
      ...value,
      ods: toggleValue(value.ods, item),
    });
  };

  const handleLanguageToggle = (item: string) => {
    onChange({
      ...value,
      languages: toggleValue(value.languages, item),
    });
  };

  return (
    <section aria-label="Filtros de mentores" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <form className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-3" aria-label="Filtrar por expertise">
          <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Expertise</legend>
          <div className="flex flex-wrap gap-2">
            {options.expertise.map((item) => {
              const checked = value.expertise.includes(item);
              return (
                <label
                  key={item}
                  className={`flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 ${
                    checked ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => handleExpertiseToggle(item)}
                  />
                  <span aria-hidden>{checked ? "●" : "○"}</span>
                  {item}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3" aria-label="Filtrar por ODS">
          <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ODS</legend>
          <div className="flex flex-wrap gap-2">
            {options.ods.map((item) => {
              const checked = value.ods.includes(item);
              return (
                <label
                  key={item}
                  className={`flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 ${
                    checked ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => handleOdsToggle(item)}
                  />
                  ODS {item}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3" aria-label="Filtrar por senioridade">
          <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Senioridade</legend>
          <select
            value={value.seniority}
            onChange={(event) =>
              onChange({
                ...value,
                seniority: event.target.value,
              })
            }
            className="h-11 rounded-full border border-slate-200 px-4 text-sm text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <option value="">Todas</option>
            {options.seniority.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="flex flex-col gap-3" aria-label="Filtrar por idiomas">
          <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Idiomas</legend>
          <div className="flex flex-wrap gap-2">
            {options.languages.map((item) => {
              const checked = value.languages.includes(item);
              return (
                <label
                  key={item}
                  className={`flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 ${
                    checked ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => handleLanguageToggle(item)}
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3" aria-label="Filtrar por localização">
          <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Localização</legend>
          <input
            type="search"
            placeholder="Cidade, estado ou país"
            value={value.location}
            onChange={(event) =>
              onChange({
                ...value,
                location: event.target.value,
              })
            }
            className="h-11 rounded-full border border-slate-200 px-4 text-sm text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label="Buscar por localização"
          />
        </fieldset>

        <fieldset className="flex flex-col gap-3" aria-label="Filtrar por disponibilidade">
          <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Disponibilidade</legend>
          <select
            value={value.availability}
            onChange={(event) =>
              onChange({
                ...value,
                availability: event.target.value,
              })
            }
            className="h-11 rounded-full border border-slate-200 px-4 text-sm text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <option value="">Todas</option>
            {options.availability.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </fieldset>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4 lg:col-span-2 xl:col-span-3">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Aplicar
          </button>
        </div>
      </form>
    </section>
  );
}
