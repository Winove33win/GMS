import { ChangeEvent } from "react";

const searchId = "partner-search";

type PartnerFiltersProps = {
  categories: string[];
  activeCategories: string[];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onToggleCategory: (category: string) => void;
  onClearCategories: () => void;
  resultCount: number;
};

export function PartnerFilters({
  categories,
  activeCategories,
  searchTerm,
  onSearchTermChange,
  onToggleCategory,
  onClearCategories,
  resultCount,
}: PartnerFiltersProps) {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <div className="space-y-4 rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-card-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor={searchId} className="text-sm font-semibold text-brand-dark">
          Busque por nome ou palavra-chave
        </label>
        <div aria-live="polite" className="text-xs font-semibold uppercase tracking-wide text-brand-green">
          {resultCount} resultado{resultCount === 1 ? "" : "s"}
        </div>
      </div>
      <input
        id={searchId}
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar parceiro"
        className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      />
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = activeCategories.includes(category);
          return (
            <button
              key={category}
              type="button"
              role="button"
              aria-pressed={active}
              onClick={() => onToggleCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 ${
                active ? "bg-brand-green text-white shadow-card-soft" : "bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
              }`}
            >
              {category}
            </button>
          );
        })}
        {activeCategories.length > 0 || searchTerm ? (
          <button
            type="button"
            onClick={onClearCategories}
            className="rounded-full border border-transparent px-4 py-2 text-xs font-semibold text-ink-muted transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>
    </div>
  );
}
