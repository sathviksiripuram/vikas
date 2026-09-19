"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal helpers.
 *
 * Both components ship their markup from the server already in place — the
 * only thing the client does is flip one attribute when the element scrolls
 * into view, and CSS does the rest. That means no state, so no re-render per
 * element, which matters on phones where these fire for dozens of cards.
 *
 * Fallbacks, because content that never appears is far worse than content
 * that appears without animation:
 *   - a `<noscript>` rule in the layout covers JavaScript being unavailable,
 *   - a reduced-motion rule in globals.css covers users who opt out, and
 *   - the shared sweep below covers a scroll fast enough to outrun the
 *     observer entirely.
 */

/* ------------------------------------------------------------------ *
 * Safety net.
 *
 * IntersectionObserver only notifies when an element *crosses* a threshold
 * in a sampled frame. A hard flick on a phone can carry a whole section from
 * below the fold to above it between two samples, in which case no callback
 * ever runs and the element would stay invisible for good.
 *
 * So every pending element is also registered here, and one shared listener
 * sweeps them once scrolling settles. One listener and one pass — not a
 * per-element scroll handler — and it detaches as soon as nothing is left.
 * ------------------------------------------------------------------ */

/** Attribute flipped on each revealed child of a RevealGroup. */
const CHILD_ATTR = "data-reveal-item";

const pending = new Map<HTMLElement, string>();
let sweepTimer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

function stopListening() {
  if (!listening) return;
  window.removeEventListener("scroll", onScroll);
  listening = false;
  if (sweepTimer) {
    clearTimeout(sweepTimer);
    sweepTimer = null;
  }
}

function sweep() {
  for (const [el, attr] of [...pending]) {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.setAttribute(attr, "shown");
      pending.delete(el);
    }
  }
  if (pending.size === 0) stopListening();
}

function onScroll() {
  if (sweepTimer) clearTimeout(sweepTimer);
  // Runs once scrolling pauses, so it never competes with the scroll itself.
  sweepTimer = setTimeout(sweep, 140);
}

function startListening() {
  if (listening || typeof window === "undefined") return;
  window.addEventListener("scroll", onScroll, { passive: true });
  listening = true;
}

function useRevealOnce<T extends HTMLElement>(attr: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.setAttribute(attr, "shown");
      pending.delete(el);
      if (pending.size === 0) stopListening();
    };

    // Very old browsers, or a non-browser environment: just show it.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    pending.set(el, attr);
    startListening();

    const observer = new IntersectionObserver(
      (entries) => {
        const reached = entries.some(
          (entry) =>
            entry.isIntersecting ||
            // Already carried past the top of the screen — still "reached".
            entry.boundingClientRect.top < window.innerHeight,
        );

        if (reached) {
          show();
          observer.disconnect();
        }
      },
      // A slight bottom inset means the animation starts as the element
      // clears the fold, not the instant its first pixel appears.
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      pending.delete(el);
      if (pending.size === 0) stopListening();
    };
  }, [attr]);

  return ref;
}

/**
 * Observes each direct child separately, so a card animates as *it* reaches
 * the viewport rather than the whole grid firing the moment the container
 * does. On a phone a six-card grid is several screens tall — observing the
 * container meant everything below the fold had already played by the time
 * you scrolled to it.
 */
function useRevealChildren<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const kids = Array.from(el.children) as HTMLElement[];

    if (typeof IntersectionObserver === "undefined") {
      for (const kid of kids) kid.setAttribute(CHILD_ATTR, "shown");
      return;
    }

    for (const kid of kids) pending.set(kid, CHILD_ATTR);
    startListening();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top < window.innerHeight
          ) {
            const kid = entry.target as HTMLElement;
            kid.setAttribute(CHILD_ATTR, "shown");
            pending.delete(kid);
            observer.unobserve(kid);
          }
        }
        if (pending.size === 0) stopListening();
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    for (const kid of kids) observer.observe(kid);

    return () => {
      observer.disconnect();
      for (const kid of kids) pending.delete(kid);
      if (pending.size === 0) stopListening();
    };
  }, []);

  return ref;
}

type Variant = "up" | "fade" | "left" | "right" | "zoom";

/** Reveals a single block — a heading, an image, a paragraph. */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Milliseconds to wait once the element is in view. */
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRevealOnce<HTMLElement>("data-reveal");

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-variant={variant}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals its direct children one after another.
 *
 * Use this on a grid or list container: the children stay the grid items, so
 * no wrapper elements are introduced and the layout is untouched. Stagger
 * delays come from `:nth-child` rules in globals.css.
 */
export function RevealGroup({
  children,
  className = "",
  variant = "up",
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  as?: ElementType;
}) {
  const ref = useRevealChildren<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-reveal-group=""
      data-reveal-variant={variant}
      className={className}
    >
      {children}
    </Tag>
  );
}
