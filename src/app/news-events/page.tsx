import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { CTABand, Media, PageHero, Section, cardBody } from "@/components/ui";
import { formatDate, getNews } from "@/lib/blog";
import { photos, postPhoto } from "@/lib/images";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Upcoming university spot-admission drives, education fairs, webinars and intake announcements from Vikas Overseas.",
};

export default function NewsPage() {
  const items = getNews();

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="What's happening at Vikas Overseas"
        subtitle="Spot-admission drives, university delegate visits, education fairs, webinars and intake deadline announcements."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
        image={photos.conference}
      />

      <Section>
        {items.length === 0 ? (
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <Media
                photo={photos.conference}
                alt="Students at a Vikas Overseas education fair"
                ratio="aspect-[4/3] lg:aspect-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
                rounded="rounded-none"
              />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="grid size-11 place-items-center rounded-xl bg-gold-50 text-gold-600">
                  <CalendarDays className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-xl font-bold text-navy-900">
                  No events scheduled right now
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-navy-600">
                  Our next university spot-admission drives, delegate visits and
                  education fairs will be announced here. Register your interest
                  and we&apos;ll notify you first.
                </p>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex w-fit items-center gap-1.5 rounded-lg bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-navy-800"
                >
                  Register your interest
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <article
                key={n.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white"
              >
                <Media
                  photo={postPhoto(n)}
                  alt={n.title}
                  ratio="aspect-[16/10]"
                  rounded="rounded-none"
                >
                  <span className="absolute top-3 left-4 rounded-full bg-gold-500 px-2.5 py-1 text-[11.5px] font-semibold tracking-wide text-navy-900 uppercase shadow-sm">
                    {n.category}
                  </span>
                </Media>

                <div className={cardBody}>
                  <h2 className="text-[17.5px] leading-snug font-bold text-white">
                    {n.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-300">
                    {n.excerpt}
                  </p>
                  <span className="relative mt-5 flex items-center gap-1.5 border-t border-white/10 pt-4 text-[13px] text-navy-400">
                    <CalendarDays className="size-4" aria-hidden />
                    {formatDate(n.date)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <CTABand />
    </>
  );
}
