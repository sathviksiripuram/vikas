"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Zap } from "lucide-react";

export type TickerItem = { label: string; href: string };

/** Pixels per frame at 60fps — slow enough to read while scrolling past. */
const SPEED = 0.6;

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

/**
 * One pass of the headline list. The track renders this twice so the loop is
 * seamless: once the scroll passes the halfway mark we subtract half the
 * width, and copy two is sitting exactly where copy one was. The duplicate is
 * hidden from assistive tech and taken out of the tab order.
 */
function TickerRow({
  items,
  duplicate = false,
}: {
  items: TickerItem[];
  duplicate?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {items.map((item) => (
        <li key={item.href + item.label} className="flex items-center">
          <Link
            href={item.href}
            draggable={false}
            tabIndex={duplicate ? -1 : undefined}
            className="px-6 py-2.5 text-[13.5px] whitespace-nowrap text-navy-700 transition-colors hover:text-navy-900 hover:underline"
          >
            {item.label}
          </Link>
          <span className="text-gold-500/70" aria-hidden>
            ‖
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Scrolling strip of headlines under the hero.
 *
 * Driven by `scrollLeft` rather than a CSS transform, which is what lets the
 * strip be dragged with the mouse: a drag simply moves the scroll position,
 * and the animation picks up from wherever it was let go. It pauses on hover,
 * on keyboard focus, and while being dragged; reduced-motion visitors get a
 * still strip they can scroll by hand.
 */
export default function NewsTicker({ items }: { items: TickerItem[] }) {
  const reduced = usePrefersReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const drag = useRef<{
    id: number;
    x: number;
    scroll: number;
    moved: boolean;
  } | null>(null);

  /**
   * The scroll offset, kept as a float.
   *
   * `scrollLeft` snaps to whole pixels on read, so accumulating directly on
   * the element loses the fractional part of every frame — at under 1px per
   * frame that rounds to zero and the strip never moves at all.
   */
  const pos = useRef(0);

  const running = !paused && !dragging && !reduced && items.length > 0;

  useEffect(() => {
    if (!running) return;
    const el = viewport.current;
    if (!el) return;

    let frame = 0;
    const step = () => {
      // scrollWidth covers both copies, so half of it is one full pass.
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

  if (items.length === 0) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    const el = viewport.current;
    if (!el || e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      scroll: pos.current,
      moved: false,
    };
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

    // Wrap into the first copy so the loop stays seamless in both directions,
    // including when dragging backwards past zero.
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

  // A drag that ends over a headline must not navigate to it.
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className="relative flex items-stretch border-b border-navy-100 bg-navy-50/70"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <p className="z-10 flex shrink-0 items-center gap-1.5 bg-gold-500 px-4 text-[12.5px] font-bold tracking-wide text-navy-900 uppercase">
        <Zap className="size-3.5 fill-navy-900" aria-hidden />
        Latest
      </p>

      <div
        ref={viewport}
        className={`no-scrollbar relative flex-1 overflow-x-auto select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={{ touchAction: "pan-y" }}
      >
        <div className="flex w-max">
          <TickerRow items={items} />
          <TickerRow items={items} duplicate />
        </div>
      </div>
    </div>
  );
}
