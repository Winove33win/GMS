import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type FilterChip = {
  value: string;
  label?: string;
};

type FilterChipsProps = {
  items: (string | FilterChip)[];
  selected?: string[];
  onChange?: (values: string[]) => void;
  mode?: 'single' | 'multiple';
  includeAll?: boolean;
  allLabel?: string;
};

export function FilterChips({
  items,
  selected = [],
  onChange,
  mode = 'single',
  includeAll = true,
  allLabel = 'Todos',
}: FilterChipsProps) {
  const chips = useMemo(
    () =>
      items.map((item) =>
        typeof item === 'string'
          ? ({ value: item, label: item } satisfies FilterChip)
          : ({ label: item.label ?? item.value, value: item.value } satisfies FilterChip)
      ),
    [items]
  );

  const handleToggle = (value: string) => {
    if (!onChange) return;
    if (mode === 'single') {
      onChange(selected.includes(value) ? [] : [value]);
      return;
    }
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros">
      {includeAll && (
        <button
          type="button"
          aria-pressed={selected.length === 0}
          onClick={() => onChange?.([])}
          className={cn(
            'transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
            selected.length === 0 ? 'scale-105' : undefined
          )}
        >
          <Badge variant={selected.length === 0 ? 'selected' : 'default'}>{allLabel}</Badge>
        </button>
      )}
      {chips.map((chip) => {
        const isActive = selected.includes(chip.value);
        return (
          <button
            key={chip.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleToggle(chip.value)}
            className="transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          >
            <Badge variant={isActive ? 'selected' : 'default'}>{chip.label}</Badge>
          </button>
        );
      })}
    </div>
  );
}
