import { ReactNode } from "react";

interface PagePlaceholderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PagePlaceholder({ title, description, children }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="flex flex-col items-center gap-4">{children}</div> : null}
      </div>
    </section>
  );
}
