"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { ArrowRight, Check, Pause, Play } from "lucide-react";
import Flag from "@/components/Flag";
import { countries } from "@/lib/countries";
import { blurFor } from "@/lib/blur-data";
import type { Slide } from "@/lib/slides";

const INTERVAL = 4000;

/** Horizontal travel, in px, that commits to the next/previous slide. */
const DRAG_THRESHOLD = 60;

/** Past this, treat the gesture as a drag and swallow the click on release. */
const DRAG_SLOP = 8;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reads the reduced-motion preference without a state-syncing effect, so it is
 * correct on the very first client render and stays correct if the user
 * changes the setting while the page is open.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false, // server + first paint: assume motion is fine
  );
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const count = slides.length;
  const reduced = usePrefersReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Live drag state. `dragX` drives the rubber-band offset while the pointer
  // is down; `dragging` switches the cursor and suppresses the click that
  // would otherwise fire on the link underneath.
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);

  /**
   * Which slides have had their <Image> mounted. Only the first slide loads up
   * front — the rest mount one step ahead of being shown, so the banner never
   * pulls seven full-width photographs before first paint.
   */
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));

  const go = useCallback(
    (next: number) => {
      const target = (next + count) % count;
      setIndex(target);
      setMounted((prev) => {
        const after = (target + 1) % count;
        const before = (target - 1 + count) % count;
        if (prev.has(target) && prev.has(after) && prev.has(before)) return prev;
        const set = new Set(prev);
        set.add(target);
        // Pre-mount both neighbours so dragging either way never shows a gap.
        set.add(after);
        set.add(before);
        return set;
      });
    },
    [count],
  );

  // Auto-advance. Re-runs on every index change, so manual navigation also
  // resets the countdown rather than cutting the next slide short.
  const running = playing && !paused && !dragging && !reduced && count > 1;
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [running, index, go]);

  // Warm the second slide shortly after load, once the first is out of the way.
  useEffect(() => {
    if (count < 2) return;
    const timer = setTimeout(
      () => setMounted((prev) => (prev.has(1) ? prev : new Set(prev).add(1))),
      1500,
    );
    return () => clearTimeout(timer);
  }, [count]);

  /* ------------------------------------------------------------------ *
   * Dragging. One set of pointer handlers covers mouse, touch and pen,
   * which is why there are no arrow buttons sitting on top of the copy.
   * ------------------------------------------------------------------ */

  const onPointerDown = (e: React.PointerEvent) => {
    if (count < 2 || e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;

    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;

    // Until the gesture is clearly horizontal, leave it alone — otherwise we
    // would steal vertical scrolling that happened to start over the banner.
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_SLOP || Math.abs(dx) <= Math.abs(dy)) return;
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    // Rubber band: the copy follows the pointer at a damped rate, so the drag
    // feels attached without the layout sliding off screen.
    setDragX(Math.max(-140, Math.min(140, dx * 0.4)));
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;

    const dx = e.clientX - d.x;
    setDragX(0);

    if (d.moved) {
      if (dx <= -DRAG_THRESHOLD) go(index + 1);
      else if (dx >= DRAG_THRESHOLD) go(index - 1);
      // Cleared a frame later so the click this pointerup generates is still
      // swallowed by onClickCapture below.
      requestAnimationFrame(() => setDragging(false));
    }

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // A drag that happens to end over a link must not also activate it.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section
      className={`relative overflow-hidden bg-navy-900 select-none ${
        count > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""
      }`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Vikas Overseas highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      // Vertical scrolling may still start here; we only claim the horizontal
      // axis once the gesture proves itself horizontal.
      style={{ touchAction: "pan-y" }}
    >
      {/* All slides share one grid cell, so they stack on top of each other
          while the row still grows to fit the tallest one. Absolute
          positioning would clip the longest slide on narrow screens. */}
      <div className="grid">
        {slides.map((slide, i) => {
          const active = i === index;

          return (
            <div
              key={slide.id}
              /* The photo and the copy fade on different curves — see the two
                 layers below — so the container itself never fades. */
              className={`relative col-start-1 row-start-1 ${
                active ? "" : "pointer-events-none"
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.eyebrow}`}
              aria-hidden={!active}
              inert={!active}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              >
                {mounted.has(i) && (
                  <Image
                  src={slide.photo.src}
                  alt=""
                  fill
                  sizes="100vw"
                  placeholder={blurFor(slide.photo.src) ? "blur" : "empty"}
                  blurDataURL={blurFor(slide.photo.src)}
                  {...(i === 0
                    ? // First slide is the LCP element — load it immediately.
                      {
                        loading: "eager" as const,
                        fetchPriority: "high" as const,
                      }
                    : { loading: "lazy" as const })}
                    className={`object-cover ${slide.focus ?? "object-center"}`}
                    draggable={false}
                  />
                )}

                {/* Scrim: heavy on the left so the headline always clears
                    contrast, lighter on the right so the photo still reads. */}
                <div className="absolute inset-0 bg-navy-950/78 lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-950/76 lg:to-navy-900/25" />
              </div>

              <div className="relative mx-auto flex min-h-[360px] max-w-7xl items-center px-6 pt-5 pb-11 sm:min-h-[380px] sm:pt-6 lg:min-h-[380px]">
                <div
                  className="max-w-2xl"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? `translateX(${dragX}px)` : undefined,
                    // Outgoing copy clears in 150ms; the incoming waits 200ms
                    // before fading in, so two headlines are never legible on
                    // top of each other. The photo layer above dissolves
                    // slowly across the whole swap, so nothing ever flashes
                    // empty. One declaration covers both properties because a
                    // Tailwind transition class would drop the transform.
                    transition: dragging
                      ? "none"
                      : active
                        ? "opacity 400ms ease-out 200ms, transform 350ms ease-out"
                        : "opacity 150ms ease-out",
                  }}
                >
                  <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-wide text-gold-300">
                    <span
                      className="size-1.5 rounded-full bg-gold-400"
                      aria-hidden
                    />
                    {slide.eyebrow}
                  </p>

                  <h1
                    className={`mt-3 text-[1.7rem] leading-[1.08] font-bold text-balance text-white sm:text-[2.1rem] lg:text-[2.3rem] ${
                      active ? "animate-fade-up" : ""
                    }`}
                  >
                    {slide.title}{" "}
                    {slide.highlight && (
                      <span className="text-gold-400">{slide.highlight}</span>
                    )}
                  </h1>

                  <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-navy-200 sm:text-[15px]">
                    {slide.body}
                  </p>

                  {slide.points && (
                    <ul className="mt-3.5 grid gap-1">
                      {slide.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-[14px] leading-relaxed text-navy-100"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-gold-400"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={slide.cta.href}
                      draggable={false}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gold-500 px-5 py-2.5 text-[14px] font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-400"
                    >
                      {slide.cta.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    {slide.secondary && (
                      <Link
                        href={slide.secondary.href}
                        draggable={false}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/25 px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
                      >
                        {slide.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The copy only needs the left half of the container. This fills the
          rest with something useful rather than empty scrim. It sits outside
          the slide loop so it stays put while slides change, and it is hidden
          below lg where there is no spare width. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-end px-6">
          <div className="pointer-events-auto w-[21rem] rounded-2xl border border-white/15 bg-navy-950/55 p-5 shadow-2xl shadow-navy-950/40 backdrop-blur-md">
            <h2 className="text-[12.5px] font-semibold tracking-[0.14em] text-gold-400 uppercase">
              Where do you want to study?
            </h2>

            <ul className="mt-4 grid grid-cols-2 gap-1">
              {countries.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/study-in/${c.slug}`}
                    draggable={false}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Flag slug={c.slug} size="sm" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/study-in"
              draggable={false}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/20"
            >
              View all destinations
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {count > 1 && (
        /* Dots + pause. WCAG 2.2.2 requires a way to stop content that moves
           automatically for more than five seconds. */
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.eyebrow}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none ${
                  i === index
                    ? "w-7 bg-gold-500"
                    : "w-3 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={
                playing ? "Pause automatic slides" : "Play automatic slides"
              }
              className="ml-1 rounded-full border border-white/20 bg-navy-950/50 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
            >
              {playing ? (
                <Pause className="size-3.5" aria-hidden />
              ) : (
                <Play className="size-3.5" aria-hidden />
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
