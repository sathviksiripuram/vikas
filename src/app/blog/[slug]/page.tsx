import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { CTABand, Media, PageHero, Section, cardBody, cardShell } from "@/components/ui";
import { formatDate, getPost, getPosts, renderMarkdown } from "@/lib/blog";
import { ogImage, postPhoto } from "@/lib/images";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [ogImage(postPhoto(post))],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blog" },
          { label: post.title },
        ]}
        image={postPhoto(post)}
      />

      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-navy-100 pb-6 text-[13.5px] text-navy-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-4" aria-hidden />
              {post.author}
            </span>
          </div>

          <Media
            photo={postPhoto(post)}
            alt={`Illustration for “${post.title}”`}
            ratio="aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, 768px"
            className="mt-8 shadow-lg shadow-navy-900/10"
            eager
          />

          {post.excerpt && (
            <p className="mt-8 text-[17px] leading-relaxed font-medium text-navy-800">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose-vikas mt-8"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-navy-600 hover:text-navy-900"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to all articles
          </Link>
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="bg-gradient-to-b from-navy-50 via-navy-50/70 to-white">
          <h2 className="text-xl font-bold text-navy-900">Continue reading</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
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
                  <h3 className="text-[16.5px] leading-snug font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-navy-300">
                    {p.excerpt}
                  </p>
                  <span className="relative mt-4 text-[13px] text-navy-400">
                    {formatDate(p.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABand />
    </>
  );
}
