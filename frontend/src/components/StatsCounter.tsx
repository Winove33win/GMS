import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

interface StatsCounterProps {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function StatsCounter({
  start = 0,
  end,
  duration = 1.2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: StatsCounterProps) {
  const [value, setValue] = useState(start);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      }),
    [decimals],
  );

  useEffect(() => {
    if (!nodeRef.current) return;

    if (shouldReduceMotion) {
      setValue(end);
      return;
    }

    const controls = animate(start, end, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setValue(latest);
      },
    });

    return () => controls.stop();
  }, [start, end, duration, shouldReduceMotion]);

  const displayValue = Number(value.toFixed(decimals));

  return (
    <span ref={nodeRef} aria-live="polite" aria-atomic="true">
      {prefix}
      {formatter.format(displayValue)}
      {suffix}
    </span>
  );
}
