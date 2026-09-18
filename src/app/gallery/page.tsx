import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { CTABand, Media, PageHero, Section } from "@/components/ui";
import { galleryPhotos, photos, type Photo } from "@/lib/images";
import { RevealGroup } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and videos from Vikas Overseas — student send-offs, university fairs, counselling sessions and office events.",
};

/**
 * To use your own photos:
 *   1. Drop image files into  /public/gallery/
 *   2. Add an entry below — e.g.
 *      { src: "/gallery/send-off-2025.jpg", caption: "…", category: "Send-offs" }
 *
 * While this list is empty the page falls back to the stock set in
 * src/lib/images.ts, so the gallery never renders blank.
 */
type GalleryItem = { src: string; caption: string; category: string };

const items: GalleryItem[] = [];

type Tile = { photo: Photo; caption: string; category: string };

const tiles: Tile[] =
  items.length > 0
    ? items.map((i) => ({
        photo: { src: i.src, alt: i.caption, og: i.src },
        caption: i.caption,
        category: i.category,
      }))
    : galleryPhotos;

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from our journey"
        subtitle="Student send-offs, university delegate visits, education fairs and everyday life at our Hyderabad and Karimnagar offices."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        image={photos.graduation}
      />

      {/* Feature strip */}
      <section className="relative overflow-hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {[
            photos.graduation,
            photos.seminar,
            photos.studentsCollaborating,
            photos.flight,
          ].map((p, i) => (
            <div key={p.src} className="relative aspect-[4/3] bg-navy-100">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading={i < 2 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <Section>
        {items.length === 0 && (
          <div className="mb-10 flex flex-col gap-3 rounded-xl border border-dashed border-navy-200 bg-navy-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-3 text-[14px] leading-relaxed text-navy-600">
              <ImageIcon className="mt-0.5 size-4 shrink-0 text-navy-400" aria-hidden />
              <span>
                These are placeholder photographs. Our own send-off and event
                photos are being added shortly.
              </span>
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit shrink-0 items-center gap-1.5 text-[14px] font-semibold text-navy-700 hover:text-navy-900"
            >
              Visit our office
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        )}

        {/* Masonry-style columns keep portrait and landscape shots uncropped
            relative to each other without a rigid grid. */}
        <RevealGroup className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {tiles.map((tile, i) => (
            <figure
              key={`${tile.photo.src}-${i}`}
              className="group break-inside-avoid overflow-hidden rounded-2xl border border-navy-100 bg-white"
            >
              <Media
                photo={tile.photo}
                alt={tile.caption}
                ratio={i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}
                rounded="rounded-none"
                zoom
              />
              <figcaption className="p-4">
                <span className="text-[11.5px] font-semibold tracking-wide text-navy-500 uppercase">
                  {tile.category}
                </span>
                <p className="mt-1 text-[14.5px] leading-relaxed text-navy-700">
                  {tile.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Section>

      <CTABand photo={photos.seminar} />
    </>
  );
}
