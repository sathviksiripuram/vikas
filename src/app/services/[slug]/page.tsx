import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ServiceIcon from "@/components/ServiceIcon";
import { Media, PageHero, Section } from "@/components/ui";
import { ogImage, photos, servicePhoto } from "@/lib/images";
import { serviceBySlug, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.name,
    description: service.cardBlurb,
    openGraph: {
      title: `${service.name} | Vikas Overseas`,
      description: service.cardBlurb,
      images: [ogImage(servicePhoto(service.slug))],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={service.name}
        subtitle={service.cardBlurb}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        image={servicePhoto(service.slug)}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Media
              photo={servicePhoto(service.slug)}
              alt={`${service.name} at Vikas Overseas`}
              ratio="aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="mb-8 shadow-lg shadow-navy-900/10"
            />

            <p className="text-[16px] leading-[1.8] text-navy-700">
              {service.intro}
            </p>

            {service.sections?.map((section) => (
              <div key={section.title} className="mt-12">
                <h2 className="text-2xl font-bold text-navy-900">
                  {section.title}
                </h2>

                {section.body && (
                  <p className="mt-4 text-[15.5px] leading-[1.8] text-navy-700">
                    {section.body}
                  </p>
                )}

                {section.facts && (
                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.facts.map((f) => (
                      <div
                        key={f.label}
                        className="rounded-xl border border-navy-100 bg-navy-50/60 p-4"
                      >
                        <dt className="text-[12px] font-semibold tracking-[0.1em] text-navy-500 uppercase">
                          {f.label}
                        </dt>
                        <dd className="mt-1.5 text-[15px] font-medium text-navy-900">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {section.bullets && (
                  <ul className="mt-6 space-y-2.5">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[15px] leading-relaxed text-navy-700"
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
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-navy-100 bg-navy-900">
                <Media
                  photo={photos.counsellingDesk}
                  ratio="aspect-[16/10]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  rounded="rounded-none"
                />
                <div className="p-6">
                <h2 className="text-[17px] font-bold text-white">
                  Talk to a counsellor
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-200">
                  Free, no-obligation guidance on {service.name.toLowerCase()}.
                </p>
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-gold-500 px-4 py-3 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                >
                  Book Free Consultation
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6">
                <h2 className="text-[13px] font-semibold tracking-[0.14em] text-navy-500 uppercase">
                  Other services
                </h2>
                <ul className="mt-4 space-y-1">
                  {others.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14.5px] text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                      >
                        <ServiceIcon
                          name={s.icon}
                          className="size-4 text-navy-400"
                        />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-navy-50 via-navy-50/70 to-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-balance text-navy-900 sm:text-3xl">
              Request {service.name.toLowerCase()}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-600">
              Fill in your details and our team will get back to you within one
              working day.
            </p>
          </div>
          <div className="mt-9 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <ContactForm defaultService={service.name} />
          </div>
        </div>
      </Section>
    </>
  );
}
