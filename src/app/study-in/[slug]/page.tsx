import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Flag from "@/components/Flag";
import { Media, PageHero, Section } from "@/components/ui";
import { countries, countryBySlug } from "@/lib/countries";
import { countryPhoto, ogImage, photos } from "@/lib/images";
import { blurFor } from "@/lib/blur-data";
import { countryPoster } from "@/lib/posters";

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = countryBySlug(slug);
  if (!country) return { title: "Destination not found" };

  return {
    title: `Study in ${country.name}`,
    description: country.intro.slice(0, 155),
    openGraph: {
      title: `Study in ${country.name} | Vikas Overseas`,
      description: country.cardBlurb,
      images: [ogImage(countryPhoto(country.slug))],
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = countryBySlug(slug);
  if (!country) notFound();

  const others = countries.filter((c) => c.slug !== country.slug).slice(0, 5);
  const poster = countryPoster(country.slug);

  return (
    <>
      <PageHero
        eyebrow={country.region}
        title={`Study in ${country.name}`}
        subtitle={country.cardBlurb}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Study In", href: "/study-in" },
          { label: country.name },
        ]}
        image={countryPhoto(country.slug)}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main column */}
          <div className="lg:col-span-8">
            {/* Destinations we have poster artwork for show it in the sidebar
                instead of a banner photo here — see the aside below. The rest
                keep the wide photograph. */}
            {!poster && (
              <Media
                photo={countryPhoto(country.slug)}
                alt={`Studying in ${country.name}`}
                ratio="aspect-[21/9]"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="mb-8 shadow-lg shadow-navy-900/10"
              />
            )}

            <p className="text-[16px] leading-[1.8] text-navy-700">
              {country.intro}
            </p>

            <h2 className="mt-12 text-2xl font-bold text-navy-900">
              Why study in {country.name}?
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {country.highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-navy-100 bg-white p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-navy-900 text-[12.5px] font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-[15.5px] leading-snug font-bold text-navy-900">
                      {h.title}
                    </h3>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {h.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-[14px] leading-relaxed text-navy-600"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-gold-500"
                          aria-hidden
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Extended sections */}
            {country.sections?.map((section) => (
              <div key={section.title} className="mt-12">
                <h2 className="text-2xl font-bold text-navy-900">
                  {section.title}
                </h2>

                {section.body && (
                  <p className="mt-4 text-[15.5px] leading-[1.8] text-navy-700">
                    {section.body}
                  </p>
                )}

                {section.bullets && (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2.5 rounded-lg bg-navy-50/70 px-4 py-3 text-[14.5px] leading-relaxed text-navy-700"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-gold-500"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.steps && (
                  <ol className="mt-5 space-y-3">
                    {section.steps.map((s, i) => (
                      <li
                        key={s.title}
                        className="flex gap-4 rounded-xl border border-navy-100 bg-white p-5"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gold-50 text-[13px] font-bold text-gold-700">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="text-[15.5px] font-bold text-navy-900">
                            {s.title}
                          </h3>
                          <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-600">
                            {s.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}

            <p className="mt-12 rounded-xl border border-navy-100 bg-navy-50/70 p-5 text-[13.5px] leading-relaxed text-navy-600">
              <strong className="font-semibold text-navy-800">
                Please note:
              </strong>{" "}
              Visa rules, tuition fees, living costs and scholarship criteria
              change regularly. The information above is indicative — always
              confirm the latest requirements with the relevant authorities, or
              speak to our counsellors for current guidance.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-28">
              {poster && (
                <figure>
                  <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-navy-100 shadow-xl shadow-navy-900/15">
                    <Image
                      src={poster}
                      alt={`Vikas Overseas poster: Study in ${country.name}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      placeholder={blurFor(poster) ? "blur" : "empty"}
                      blurDataURL={blurFor(poster)}
                      className="object-cover"
                    />
                  </div>
                </figure>
              )}

              <div className="overflow-hidden rounded-2xl border border-navy-100 bg-navy-900">
                <Media
                  photo={photos.counsellingDesk}
                  alt={`Counselling for students applying to ${country.name}`}
                  ratio="aspect-[16/10]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  rounded="rounded-none"
                />
                <div className="p-6">
                <h2 className="text-[17px] font-bold text-white">
                  Get free guidance for {country.name}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-200">
                  Tell us about your profile and we&apos;ll get back within one
                  working day.
                </p>
                <Link
                  href={`/contact?country=${country.slug}`}
                  className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-gold-500 px-4 py-3 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                >
                  Book Free Consultation
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6">
                <h2 className="text-[13px] font-semibold tracking-[0.14em] text-navy-500 uppercase">
                  Other destinations
                </h2>
                <ul className="mt-4 space-y-1">
                  {others.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/study-in/${c.slug}`}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14.5px] text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                      >
                        <Flag slug={c.slug} size="sm" />
                        Study in {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/study-in"
                  className="mt-3 block border-t border-navy-100 px-3 pt-3.5 text-[13.5px] font-semibold text-navy-600 hover:text-navy-900"
                >
                  View all destinations →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Enquiry */}
      <Section className="bg-gradient-to-b from-navy-50 via-navy-50/70 to-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-balance text-navy-900 sm:text-3xl">
              Start your {country.name} application
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-600">
              Share a few details and our counsellors will map out your best-fit
              universities, costs and timeline — free of charge.
            </p>
          </div>
          <div className="mt-9 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <ContactForm defaultCountry={country.name} />
          </div>
        </div>
      </Section>
    </>
  );
}
