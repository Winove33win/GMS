import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PartnerLogo {
  name: string;
  src: string;
}

interface PartnersMarqueeProps {
  logos: PartnerLogo[];
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export function PartnersMarquee({
  logos,
  speed = "normal",
  pauseOnHover = true,
  className,
}: PartnersMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();
  const duplicated = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div
      className={cn(
        "marquee-root relative overflow-hidden rounded-[1.5rem] border border-brand-green/10 bg-white/70 p-4 backdrop-blur",
        !pauseOnHover && "no-hover-pause",
        className,
      )}
      aria-label="Parcerias em destaque"
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" aria-hidden />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" aria-hidden />
      <div className="flex gap-8">
        <ul
          className={cn(
            "marquee-track items-center gap-8",
            speed === "slow" && "is-slow",
            speed === "fast" && "[animation-duration:18s]",
            shouldReduceMotion && "is-paused",
          )}
          role="list"
        >
          {duplicated.map((logo, index) => (
            <li key={`${logo.name}-${index}`} className="flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.name}
                width={140}
                height={48}
                loading="lazy"
                className="h-12 w-auto grayscale transition duration-default ease-soft hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
