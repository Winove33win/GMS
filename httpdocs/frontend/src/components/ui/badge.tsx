import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'border-ink-500/20 bg-surface-100 text-ink-700',
        selected: 'border-transparent bg-brand-green text-white shadow-sm',
        amber: 'border-transparent bg-brand-amber text-ink-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
