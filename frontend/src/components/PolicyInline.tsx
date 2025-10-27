import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PolicyInlineProps {
  children?: ReactNode;
  className?: string;
}

const defaultMessage = "Atuação 100% pelo programa. Não realizamos contato direto com mentores.";

export function PolicyInline({ children, className }: PolicyInlineProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-3xl border border-brand-green/30 bg-brand-green/10 p-4 text-sm text-brand-dark",
        className
      )}
    >
      <span aria-hidden className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-xs font-semibold text-white">
        i
      </span>
      <p className="leading-relaxed">{children ?? defaultMessage}</p>
    </div>
  );
}
