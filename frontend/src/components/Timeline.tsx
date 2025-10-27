import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineStep {
  icon: ReactNode;
  title: string;
  description?: string;
  meta?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function Timeline({ steps, className }: TimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerMotion = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.4 },
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        },
      };

  const itemVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.18, ease: "easeOut" },
        },
      };

  return (
    <motion.ol
      className={cn(
        "relative flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8",
        className,
      )}
      {...containerMotion}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[6rem] right-[6rem] top-[3.75rem] hidden h-px bg-brand-green/25 lg:block"
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.title}
          className={cn(
            "relative flex flex-1 gap-5 rounded-[1.5rem] border border-white/50 bg-white/80 p-6 shadow-sm backdrop-blur",
            "lg:flex-col lg:items-start lg:justify-between lg:gap-6 lg:p-8",
          )}
          variants={itemVariants}
        >
          <div className="relative flex shrink-0 items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-brand-green/20 bg-white text-brand-green shadow-inner">
              {step.icon}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-green/40 to-transparent lg:-right-10 lg:block"
            />
          </div>
          <div className="space-y-3 text-left">
            <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
            {step.description && <p className="text-sm leading-relaxed text-ink-muted">{step.description}</p>}
            {step.meta && (
              <span className="inline-flex rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
                {step.meta}
              </span>
            )}
          </div>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-[-2rem] left-[2.25rem] h-10 w-px bg-gradient-to-b from-brand-green/40 to-transparent lg:hidden",
              index === steps.length - 1 && "hidden",
            )}
          />
        </motion.li>
      ))}
    </motion.ol>
  );
}
