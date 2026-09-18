import type { Metadata } from "next";
import Link from "next/link";
import Flag from "@/components/Flag";
import { CTABand, CardAction, Media, PageHero, Section, cardBody, cardImageWash, cardShell } from "@/components/ui";
import { countries } from "@/lib/countries";
import { countryPhoto, photos } from "@/lib/images";
import { RevealGroup } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Study Abroad Destinations",
  description:
    "Explore 11 study abroad destinations — USA, UK, Canada, Australia, New Zealand, Ireland, Germany, France, Italy, UAE and Europe — with entry requirements, costs and work rights.",
};

const regions = ["Americas", "Europe", "Oceania", "Middle East"] as const;

export default function StudyInPage() {
  return (
    <>
      <PageHero
        eyebrow="Study destinations"
        title="Choose where your future begins"
        subtitle="Eleven destinations, each with its own strengths, costs and post-study work rights. Explore what suits your profile — then talk to us about the right fit."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Study In" }]}
        image={photos.globe}
      />

      <Section>
        <div className="space-y-14">
          {regions.map((region) => {
            const list = countries.filter((c) => c.region === region);
            if (list.length === 0) return null;

            return (
              <div key={region}>
                <div className="flex items-center gap-4">
                  <h2 className="text-[13px] font-semibold tracking-[0.14em] text-navy-500 uppercase">
                    {region}
                  </h2>
                  <span className="h-px flex-1 bg-navy-100" aria-hidden />
                  <span className="text-[13px] text-navy-400">
                    {list.length} {list.length === 1 ? "destination" : "destinations"}
                  </span>
                </div>

                <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/study-in/${c.slug}`}
                      className={cardShell}
                    >
                      <Media
                        photo={countryPhoto(c.slug)}
                        ratio="aspect-[16/10]"
                        rounded="rounded-none"
                        zoom
                      >
                        <div
                          className={cardImageWash}
                          aria-hidden
                        />
                        <div className="absolute inset-x-5 bottom-4 flex items-center gap-2.5">
                          <Flag slug={c.slug} size="lg" className="shadow-md" />
                          <h3 className="text-[18px] font-bold text-white">
                            Study in {c.name}
                          </h3>
                        </div>
                      </Media>

                      <div className={cardBody}>
                        <p className="flex-1 text-[14.5px] leading-relaxed text-navy-300">
                          {c.cardBlurb}
                        </p>
                        <CardAction>Learn more</CardAction>
                      </div>
                    </Link>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </Section>

      <CTABand
        title="Not sure which country is right for you?"
        body="Our counsellors will compare destinations against your academics, budget and career goals — and tell you honestly where you stand the best chance."
        photo={photos.counsellingDesk}
      />
    </>
  );
}
