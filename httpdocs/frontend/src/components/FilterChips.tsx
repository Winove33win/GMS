import React from 'react';

type FilterChipsProps = {
  items: string[];
  active?: string | null;
  onSelect?: (value: string | null) => void;
};

const FilterChips: React.FC<FilterChipsProps> = ({ items, active, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className={`rounded-full border px-4 py-2 text-sm transition ${
          !active ? 'bg-brand-amber text-brand-dark border-brand-amber' : 'border-neutral-300'
        }`}
        onClick={() => onSelect?.(null)}
      >
        Todos
      </button>
      {items.map((item) => {
        const isActive = active === item;
        return (
          <button
            key={item}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm transition ${
              isActive
                ? 'bg-brand-amber text-brand-dark border-brand-amber'
                : 'border-neutral-300 hover:border-brand-green'
            }`}
            onClick={() => onSelect?.(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
