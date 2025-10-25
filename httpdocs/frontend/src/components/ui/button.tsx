import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition duration-200 ease-gentle-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-green focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        default: 'bg-brand-green text-white shadow-sm hover:brightness-105',
        secondary: 'border border-ink-500/20 bg-white text-ink-900 hover:border-brand-green/60',
        outline:
          'border border-brand-green/60 bg-transparent text-brand-green hover:bg-brand-green/10',
        tonal: 'bg-brand-amber text-ink-900 hover:brightness-110',
        ghost: 'text-ink-700 hover:bg-surface-100',
        link: 'text-brand-green underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-11 px-4 text-base',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), 'focus-visible:ring-offset-2', className)}
        ref={ref as any}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
