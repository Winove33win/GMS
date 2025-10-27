import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrandShapesProps {
  className?: string;
}

const shapeVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: -6 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
};

export function BrandShapes({ className }: BrandShapesProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="absolute inset-0">
        <motion.span
          className="absolute left-[-5%] top-[12%] h-48 w-48 rounded-[36%] bg-brand-green/25 blur-[120px]"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        />
        <motion.span
          className="absolute right-[12%] top-[6%] h-40 w-40 rotate-12 rounded-[44%] border border-white/50 bg-white/20 backdrop-blur"
          variants={shapeVariants}
          initial={shouldReduceMotion ? false : "initial"}
          animate={shouldReduceMotion ? { opacity: 1, scale: 1, rotate: 0 } : "animate"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        />
        <motion.span
          className="absolute bottom-[-12%] right-[2%] h-64 w-64 -rotate-12 rounded-[46%] border border-white/30 bg-white/10 backdrop-blur"
          variants={shapeVariants}
          initial={shouldReduceMotion ? false : "initial"}
          animate={shouldReduceMotion ? { opacity: 1, scale: 1, rotate: 0 } : "animate"}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
        />
      </div>
    </div>
  );
}
