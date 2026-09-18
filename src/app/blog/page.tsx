import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import { CTABand, Media, PageHero, Section, cardBody, cardShell } from "@/components/ui";
import { formatDate, getPosts } from "@/lib/blog";
import { photos, postPhoto } from "@/lib/images";
import { RevealGroup } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Practical study abroad guidance from the Vikas Overseas counselling team — applications, visas, tests, scholarships and life abroad.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageHero
        eyebrow="Blogs"
        title="Guidance from our counselling desk"
        subtitle="Applications, visas, entrance tests, scholarships and settling in abroad — explained plainly."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
        image={photos.studyWriting}
      />

      <Section>
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={cardShell}
              >
                <Media
                  photo={postPhoto(p)}
                  alt={`Illustration for “${p.title}”`}
                  ratio="aspect-[16/10]"
                  rounded="rounded-none"
                  zoom
                >
                  <span className="absolute top-3 left-4 rounded-full bg-white/95 px-2.5 py-1 text-[11.5px] font-semibold tracking-wide text-navy-700 uppercase shadow-sm">
                    {p.category}
                  </span>
                </Media>

                <div className={cardBody}>
                  <h2 className="text-[17.5px] leading-snug font-bold text-white group-hover:text-gold-300">
                    {p.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-300">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[13px] text-navy-400">
                      {formatDate(p.date)}
                    </span>
                    <ArrowRight
                      className="size-4 text-gold-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-300"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            ))}
          </RevealGroup>
        )}
      </Section>

      <CTABand />
    </>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 p-10 text-center">
      <PenLine className="mx-auto size-8 text-navy-400" aria-hidden />
      <h2 className="mt-4 text-lg font-bold text-navy-900">
        Articles coming soon
      </h2>
      <p className="mt-2 text-[14.5px] leading-relaxed text-navy-600">
        We&apos;re preparing guidance on applications, visas and scholarships.
        In the meantime, our counsellors are happy to answer your questions
        directly.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-navy-800"
      >
        Ask a counsellor
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
