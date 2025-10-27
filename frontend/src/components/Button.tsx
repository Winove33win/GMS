import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[1.25rem] px-6 py-3 text-sm font-semibold transition duration-default ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-green disabled:pointer-events-none disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-green text-white shadow-card-soft hover:-translate-y-0.5 hover:bg-[#299f5b]",
  secondary:
    "border border-brand-green/40 bg-transparent text-brand-green hover:-translate-y-0.5 hover:bg-brand-green/10",
  ghost: "text-brand-green hover:text-brand-dark",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn(baseClasses, variantClasses[variant], className);
}

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}

export type { ButtonProps, ButtonVariant };
