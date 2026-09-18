import type { Metadata } from "next";
import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import { CTABand, CardAction, Media, PageHero, Section, SectionHeading, cardBody, cardImageWash, cardShell } from "@/components/ui";
import { photos, servicePhoto } from "@/lib/images";
import { processSteps, services } from "@/lib/services";
import { RevealGroup } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Admission counseling, test preparation, university selection, application assistance, education loan assistance and visa guidance — the complete study abroad service.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Complete support, from first question to final boarding pass"
        subtitle="Six services that cover every stage of your study abroad journey — handled by counsellors who do this every day."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={photos.counsellingTable}
      />

      <Section className="bg-gradient-to-b from-navy-50/70 to-white">
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={cardShell}
            >
              <Media
                photo={servicePhoto(s.slug)}
                alt={`${s.name} at Vikas Overseas`}
                ratio="aspect-[16/10]"
                rounded="rounded-none"
                zoom
              >
                <div
                  className={cardImageWash}
                  aria-hidden
                />
                <span className="absolute bottom-3 left-4 grid size-11 place-items-center rounded-xl bg-white/95 text-navy-800 shadow-sm transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <ServiceIcon name={s.icon} />
                </span>
              </Media>

              <div className={cardBody}>
                <h2 className="text-[17.5px] font-bold text-white">
                  {s.name}
                </h2>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-300">
                  {s.cardBlurb}
                </p>
                <CardAction>Learn more</CardAction>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </Section>

      <Section className="bg-gradient-to-b from-navy-50 via-navy-50/70 to-white">
        <SectionHeading
          eyebrow="How it works"
          title="Your journey, in six clear steps"
          subtitle="Each service slots into a single, structured process — so you always know what happens next."
          align="center"
        />

        <RevealGroup as="ol" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-navy-100 bg-white p-6"
            >
              <span className="font-display text-[2.6rem] leading-none font-bold text-navy-100">
                {s.step}
              </span>
              <h3 className="mt-3 text-[16.5px] font-bold text-navy-900">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-600">
                {s.body}
              </p>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <CTABand />
    </>
  );
}
