"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DURATION = 1600;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/**
 * Splits "2,000+" into "", 2000, "+" so the number can be animated while any
 * prefix or suffix stays put. A value with no digits at all (say "Coming
 * soon") comes back with `number: null` and is rendered untouched.
 */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", number: null, grouped: false, suffix: "" };
  return {
    prefix: match[1],
    number: Number(match[2].replace(/,/g, "")),
    // Only group the digits if the source did. Otherwise a year like "2020"
    // would count up and land on "2,020".
    grouped: match[2].includes(","),
    suffix: match[3],
  };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a stat up from zero the first time it scrolls into view.
 *
 * The final value is rendered on the server and is what a crawler or a
 * no-JavaScript visitor sees; the animation only ever replaces it once the
 * browser has confirmed the element is on screen. Runs once — scrolling back
 * up does not replay it.
 */
export default function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, number, grouped, suffix } = parse(value);

  // `null` means "not started" — render the final value so the markup is
  // correct before and without JavaScript.
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (number === null || reduced) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((entry) => entry.isIntersecting)) return;
        started = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setDisplay(Math.round(easeOutCubic(t) * number));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [number, reduced]);

  if (number === null) return <span className={className}>{value}</span>;

  const shown = display === null ? number : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {grouped ? shown.toLocaleString("en-IN") : shown}
      {suffix}
    </span>
  );
}
