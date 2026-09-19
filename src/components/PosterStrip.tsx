"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { blurFor } from "@/lib/blur-data";
import { POSTER_RATIO, type Poster } from "@/lib/posters";

/** Pixels per frame at 60fps. Slower than the ticker — these are images. */
const SPEED = 0.9;
const DRAG_SLOP = 5;

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

function Row({
  posters,
  duplicate = false,
}: {
  posters: Poster[];
  duplicate?: boolean;
}) {
  return (
    <ul className="flex shrink-0 items-stretch gap-4" aria-hidden={duplicate || undefined}>
      {posters.map((poster) => (
        <li key={poster.src} className="w-[210px] shrink-0 sm:w-[240px]">
          <Link
            href={poster.href}
            draggable={false}
            tabIndex={duplicate ? -1 : undefined}
            className="group block"
          >
            <div
              className={`relative ${POSTER_RATIO} overflow-hidden rounded-2xl border border-navy-800/60 bg-navy-900 shadow-[0_2px_8px_rgba(11,31,58,0.18),0_20px_44px_-22px_rgba(11,31,58,0.55)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold-500/60`}
            >
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                sizes="240px"
                placeholder={blurFor(poster.src) ? "blur" : "empty"}
                blurDataURL={blurFor(poster.src)}
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
            </div>
            <p className="mt-2.5 text-center text-[13px] font-semibold text-navy-700 transition-colors group-hover:text-navy-900">
              {poster.caption}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Continuously panning strip of the company's own campaign posters.
 *
 * Same interaction model as the news ticker — driven by `scrollLeft` so it can
 * be dragged with the mouse or flicked on a phone, and it resumes from
 * wherever it was let go. Position is held as a float in a ref because
 * `scrollLeft` snaps to whole pixels, which at under 1px a frame would round
 * the movement away entirely.
 */
export default function PosterStrip({ posters }: { posters: Poster[] }) {
  const reduced = usePrefersReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const drag = useRef<{ id: number; x: number; scroll: number; moved: boolean } | null>(
    null,
  );

  const running = !paused && !dragging && !reduced && posters.length > 0;

  useEffect(() => {
    if (!running) return;
    const el = viewport.current;
    if (!el) return;

    let frame = 0;
    const step = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) {
        pos.current += SPEED;
        if (pos.current >= half) pos.current -= half;
        el.scrollLeft = pos.current;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  if (posters.length === 0) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    const el = viewport.current;
    if (!el || e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, scroll: pos.current, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = viewport.current;
    if (!d || !el || d.id !== e.pointerId) return;

    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_SLOP) return;
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const half = el.scrollWidth / 2;
    let next = d.scroll - dx;
    if (half > 0) next = ((next % half) + half) % half;
    pos.current = next;
    el.scrollLeft = next;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.moved) requestAnimationFrame(() => setDragging(false));
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // A drag that ends on a poster must not navigate to it.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={viewport}
        className={`no-scrollbar overflow-x-auto select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={{ touchAction: "pan-y" }}
      >
        <div className="flex w-max gap-4 px-1 pb-2">
          <Row posters={posters} />
          <Row posters={posters} duplicate />
        </div>
      </div>

      {/* Soft edges so posters fade out rather than being sliced off. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent"
        aria-hidden
      />
    </div>
  );
}
