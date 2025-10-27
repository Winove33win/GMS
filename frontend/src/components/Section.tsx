import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
  introClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  description,
  eyebrow,
  className,
  introClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {(title || description || eyebrow) && (
          <div className={cn("mb-10 max-w-3xl", introClassName)}>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 text-base text-ink-muted">{description}</p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export type { SectionProps };
