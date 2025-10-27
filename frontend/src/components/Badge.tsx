import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "brand" | "neutral" | "success";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  brand: "bg-brand-green/10 text-brand-green",
  neutral: "bg-[rgba(44,44,44,0.08)] text-brand-dark",
  success: "bg-brand-green text-white",
};

export function Badge({ className, tone = "brand", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}

export type { BadgeProps };
