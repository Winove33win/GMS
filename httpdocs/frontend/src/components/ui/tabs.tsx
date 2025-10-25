import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn('inline-flex h-12 items-center justify-center rounded-full bg-surface-100 p-1 text-sm text-ink-500', className)}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      'inline-flex min-w-[120px] items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-brand-green data-[state=active]:shadow-card data-[state=inactive]:text-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
      className
    )}
    {...props}
  />
);

const TabsContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content className={cn('mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green', className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
