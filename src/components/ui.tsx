import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { photos, type Photo } from "@/lib/images";

/**
 * Dark banner at the top of every inner page.
 *
 * Pass `image` to run a photograph behind it — the navy scrim keeps the
 * headline at full contrast, so any photo works without art direction.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  image?: Photo;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
          />
          {/* Scrim: solid enough on the left for text, lighter on the right
              so the photograph still reads. */}
          <div
            className="absolute inset-0 bg-navy-950/75 sm:bg-gradient-to-r sm:from-navy-950/95 sm:via-navy-950/85 sm:to-navy-950/55"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 70% 70%, #ffffff 1px, transparent 1px)",
            backgroundSize: "44px 44px, 60px 60px",
          }}
          aria-hidden
        />
      )}
      <div className="absolute -top-24 -right-24 size-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-8 sm:py-10">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-navy-300">
              {breadcrumb.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="size-3.5 text-navy-500" aria-hidden />
                  )}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-gold-400">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-navy-100">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="mb-3 text-[12.5px] font-semibold tracking-[0.16em] text-gold-400 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold text-balance text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-navy-200 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    // 0.5rem top and bottom, so two adjacent sections sit 1rem apart. This
    // one value sets the vertical rhythm for every page on the site.
    <section id={id} className={`py-2 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  size = "md",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** "lg" for a section that leads the page rather than supports it. */
  size?: "md" | "lg";
  className?: string;
}) {
  const large = size === "lg";

  return (
    <div
      className={`${
        align === "center" ? "mx-auto text-center" : ""
      } ${large ? "max-w-3xl" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 font-semibold tracking-[0.16em] uppercase ${
            large ? "text-[13px] text-gold-600" : "text-[12.5px] text-navy-500"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-bold text-balance text-navy-900 ${
          large
            ? "text-[1.85rem] leading-[1.12] sm:text-[2.4rem] lg:text-[2.75rem]"
            : "text-2xl sm:text-3xl"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`leading-relaxed text-navy-600 ${
            large ? "mt-5 text-[16px] sm:text-[17px]" : "mt-3.5 text-[15.5px]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles = {
    primary:
      "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-sm shadow-gold-900/10",
    secondary: "bg-navy-900 text-white hover:bg-navy-800",
    ghost:
      "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-3 text-[14.5px] font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Gold-accented call to action used at the foot of most pages. */
export function CTABand({
  title = "Ready to start your journey abroad?",
  body = "Book a free profile evaluation with our counsellors. We will map out your best-fit countries, universities and budget — no obligation.",
  photo = photos.graduation,
}: {
  title?: string;
  body?: string;
  photo?: Photo;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-navy-950/85 lg:bg-gradient-to-r lg:from-navy-950/95 lg:via-navy-950/90 lg:to-navy-900/70"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-8 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-balance text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-200">
              {body}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href="/contact">Book Free Consultation</Button>
            <Button href="/study-in" variant="ghost">
              Explore Destinations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Shared card shell.
 *
 * One string so every card on the site — services, destinations, articles,
 * events — lifts, warms its border to gold and deepens its shadow in exactly
 * the same way. Use it on the outer element and put `cardBody` on the part
 * holding the text.
 */
export const cardShell =
  "group flex flex-col overflow-hidden rounded-2xl border border-navy-800/60 bg-navy-900 " +
  // Two-part shadow — a tight contact shadow plus a wide soft one. Tailwind's
  // presets at low alpha look washed out; this reads as a physical card at
  // rest and lifts convincingly on hover.
  "shadow-[0_1px_3px_rgba(11,31,58,0.10),0_12px_32px_-14px_rgba(11,31,58,0.40)] " +
  "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-500/60 " +
  "hover:shadow-[0_2px_8px_rgba(11,31,58,0.14),0_28px_56px_-20px_rgba(11,31,58,0.60)]";

/**
 * Deep navy card face with a gold glow bleeding in from the top-right, so the
 * body is a designed surface rather than a flat panel. Dark cards on the pale
 * sections give the grids far more presence than white-on-white did.
 */
export const cardBody =
  "relative flex flex-1 flex-col bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950 p-6 " +
  "before:pointer-events-none before:absolute before:-top-16 before:-right-10 before:size-40 " +
  "before:rounded-full before:bg-gold-500/10 before:blur-2xl before:transition-opacity " +
  "before:duration-500 group-hover:before:bg-gold-500/20";

/** Gradient laid over card artwork; lifts slightly on hover. */
export const cardImageWash =
  "absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/25 to-transparent " +
  "transition-opacity duration-300";

/** "Learn more" affordance — the arrow sits in a chip that fills with gold. */
export function CardAction({ children }: { children: ReactNode }) {
  return (
    <span className="relative mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-gold-400 transition-colors group-hover:text-gold-300">
      {children}
      <span className="grid size-6 place-items-center rounded-full bg-white/10 text-gold-400 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-navy-900">
        <ChevronRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-px" aria-hidden />
      </span>
    </span>
  );
}

/**
 * A framed, cropped photograph.
 *
 * `ratio` is a Tailwind aspect class so callers control the crop; the image
 * always fills the frame, and `zoom` adds the slow scale-up used on cards
 * that sit inside a `group` link.
 */
export function Media({
  photo,
  alt,
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className = "",
  zoom = false,
  rounded = "rounded-2xl",
  eager = false,
  children,
}: {
  photo: Photo;
  /** Overrides the registry's alt text — use when context makes it clearer. */
  alt?: string;
  ratio?: string;
  sizes?: string;
  className?: string;
  zoom?: boolean;
  rounded?: string;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-navy-100 ${rounded} ${ratio} ${className}`}
    >
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className={`object-cover ${
          zoom
            ? "transition-transform duration-700 ease-out group-hover:scale-105"
            : ""
        }`}
      />
      {children}
    </div>
  );
}

/**
 * Photo band used to break up long stretches of text — image on one side,
 * content on the other, alternating by `flip`.
 */
export function SplitFeature({
  photo,
  alt,
  flip = false,
  children,
}: {
  photo: Photo;
  alt?: string;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={flip ? "lg:order-2" : ""}>
        <Media
          photo={photo}
          alt={alt}
          ratio="aspect-[4/3]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="shadow-xl shadow-navy-900/10"
        />
      </div>
      <div className={flip ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}

/** Bulleted list with gold check marks. */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-navy-700">
          <span
            className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-gold-500"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
