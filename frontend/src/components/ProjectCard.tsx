import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  kpi: string;
  label: string;
  ods: number | string;
  title: string;
  description?: string;
  href?: string;
}

export function ProjectCard({ kpi, label, ods, title, description, href }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <motion.article
      className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[1.75rem] border border-brand-green/15 bg-white/80 p-6 text-left shadow-sm backdrop-blur transition duration-default ease-soft"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={shouldReduceMotion ? undefined : { once: true, amount: 0.4 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.18, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Impacto</span>
          <span className="text-3xl font-bold text-ink">
            {kpi}
            <span className="ml-1 text-base font-semibold text-ink-muted">{label}</span>
          </span>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-sm font-semibold uppercase text-brand-green">
          ODS {ods}
        </span>
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        {description && <p className="text-sm leading-relaxed text-ink-muted">{description}</p>}
      </div>
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
        Ver resultados
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </span>
    </motion.article>
  );

  if (href) {
    return (
      <Link
        to={href}
        className={cn("group block focus-visible:focus-ring")}
        aria-label={`Ver projeto ${title}`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
