import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  elevated?: boolean;
};

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-[rgba(15,15,15,0.08)] bg-white p-6 shadow-none transition duration-default ease-soft motion-reduce:transition-none",
        elevated
          ? "shadow-card-soft hover:-translate-y-1 hover:shadow-lg motion-reduce:translate-y-0"
          : "hover:shadow-card-soft",
        className,
      )}
      {...props}
    />
  );
}

export type { CardProps };
