import Image from "next/image";

/**
 * Renders a country flag as a real image.
 *
 * The flag emoji in `countries.ts` render as nothing on Windows — the OS ships
 * no glyphs for regional-indicator pairs — which left a blank gap wherever a
 * destination was labelled. These PNGs are a few hundred bytes each and render
 * identically everywhere, so they're served unoptimized (no resize needed).
 */

/** Country slug → ISO 3166-1 alpha-2 code used by the flag CDN. */
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
  sm: { w: 20, h: 15, cdn: 40 },
  md: { w: 24, h: 18, cdn: 48 },
  lg: { w: 32, h: 24, cdn: 80 },
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
  const code = flagCodes[slug];
  if (!code) return null;

  const { w, h, cdn } = sizes[size];

  return (
    <Image
      src={`https://flagcdn.com/w${cdn}/${code}.png`}
      alt={name ? `${name} flag` : ""}
      width={w}
      height={h}
      unoptimized
      className={`shrink-0 rounded-[3px] object-cover ring-1 ring-black/10 ${className}`}
      style={{ width: w, height: h }}
    />
  );
}
