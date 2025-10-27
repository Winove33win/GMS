import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  title: string;
  subtitle?: string;
  bullets: string[];
  className?: string;
}

export function SpotlightCard({ title, subtitle, bullets, className }: SpotlightCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.18, ease: "easeOut" },
      };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-[var(--shadow-spotlight)] backdrop-blur-xl",
        "md:p-10",
        className,
      )}
      {...motionProps}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/5" aria-hidden="true" />
      <div className="relative space-y-6 text-left">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
            Spotlight
          </span>
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold text-ink">{title}</h2>
          {subtitle && <p className="max-w-[60ch] text-sm text-ink-muted">{subtitle}</p>}
        </div>
        <ul className="space-y-4">
          {bullets.map((item) => (
            <li key={item} className="group flex items-start gap-3">
              <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10 text-brand-green transition duration-default ease-soft group-hover:bg-brand-green/20">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-ink/90">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
