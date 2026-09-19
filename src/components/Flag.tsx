import { FLAG_DATA } from "@/lib/flag-data";

/**
 * Renders a country flag.
 *
 * The flag emoji in `countries.ts` render as nothing on Windows — the OS ships
 * no glyphs for regional-indicator pairs — so these are images instead.
 *
 * They are inlined as data URIs rather than fetched: the home page lists every
 * country three times over (hero picker, destination cards, footer), which was
 * 33 cross-origin requests for a few hundred bytes each. On a phone the round
 * trips cost far more than the pixels. A plain <img> is used because there is
 * nothing for an image optimizer to do with an already-inlined 40x30 PNG.
 */

/** Country slug → ISO 3166-1 alpha-2, kept for callers that need the code. */
export const flagCodes: Record<string, string> = {
  usa: "us",
  uk: "gb",
  canada: "ca",
  australia: "au",
  "new-zealand": "nz",
  ireland: "ie",
  germany: "de",
  france: "fr",
  italy: "it",
  uae: "ae",
  europe: "eu",
};

const sizes = {
  sm: { w: 20, h: 15 },
  md: { w: 24, h: 18 },
  lg: { w: 32, h: 24 },
} as const;

export default function Flag({
  slug,
  name,
  size = "md",
  className = "",
}: {
  slug: string;
  /** Used for alt text — omit when the country name is already adjacent. */
  name?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const src = FLAG_DATA[slug];
  if (!src) return null;

  const { w, h } = sizes[size];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name ? `${name} flag` : ""}
      width={w}
      height={h}
      decoding="async"
      className={`shrink-0 rounded-[3px] object-cover ring-1 ring-black/10 ${className}`}
      style={{ width: w, height: h }}
    />
  );
}
