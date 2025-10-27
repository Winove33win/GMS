import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsCarouselProps {
  items: TestimonialItem[];
  autoplay?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function TestimonialsCarousel({
  items,
  autoplay = 9000,
  pauseOnHover = true,
  className,
}: TestimonialsCarouselProps) {
  const safeItems = Array.isArray(items) ? items : [];
  const total = safeItems.length;
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!autoplay || total <= 1 || shouldReduceMotion) return;
    if (pauseOnHover && isHovering) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, autoplay);

    return () => clearInterval(timer);
  }, [autoplay, pauseOnHover, isHovering, total, shouldReduceMotion]);

  if (total === 0) {
    return null;
  }

  const safeIndex = ((current % total) + total) % total;
  const currentItem = safeItems[safeIndex] ?? safeItems[0];

  const goTo = (index: number) => {
    setCurrent((index + total) % total);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: "easeOut" };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-8 overflow-hidden rounded-[1.75rem] border border-brand-green/10 bg-white/80 p-8 shadow-sm backdrop-blur",
        className,
      )}
      onMouseEnter={pauseOnHover ? () => setIsHovering(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsHovering(false) : undefined}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <Quote aria-hidden className="h-5 w-5" />
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-green/20 bg-white text-brand-green transition duration-default ease-soft hover:bg-brand-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            onClick={() => goTo(current - 1)}
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-green/20 bg-white text-brand-green transition duration-default ease-soft hover:bg-brand-green/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
            onClick={() => goTo(current + 1)}
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          <motion.figure
            key={`${currentItem?.quote}-${current}`}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={transition}
            className="space-y-6"
          >
            <blockquote className="text-lg font-medium leading-relaxed text-ink">
              “{currentItem?.quote}”
            </blockquote>
            <figcaption className="flex flex-col gap-1 text-sm text-ink-muted">
              <span className="font-semibold text-ink">{currentItem?.author}</span>
              <span>{currentItem?.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      {total > 1 && (
        <div className="flex items-center gap-2">
          {safeItems.map((item, index) => (
            <button
              key={item.quote}
              type="button"
              className={cn(
                "h-2.5 w-8 rounded-full bg-brand-green/15 transition duration-default ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/70 focus-visible:ring-offset-2",
                index === current && "bg-brand-green",
              )}
              onClick={() => goTo(index)}
              aria-label={`Ir para depoimento ${index + 1}`}
              aria-pressed={index === current}
            />
          ))}
        </div>
      )}
    </div>
  );
}
