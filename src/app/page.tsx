import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  GraduationCap,
  Heart,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import Flag from "@/components/Flag";
import HeroSlider from "@/components/HeroSlider";
import NewsTicker from "@/components/NewsTicker";
import PosterStrip from "@/components/PosterStrip";
import ServiceIcon from "@/components/ServiceIcon";
import { Button, CTABand, CardAction, Media, Section, SectionHeading, cardBody, cardImageWash, cardShell } from "@/components/ui";
import { countries } from "@/lib/countries";
import { countryPhoto, photos, postPhoto, servicePhoto } from "@/lib/images";
import { processSteps, services } from "@/lib/services";
import { posterStrip } from "@/lib/posters";
import { slides } from "@/lib/slides";
import { getNews, getPosts, formatDate } from "@/lib/blog";
import { stats } from "@/lib/site";
import { Reveal, RevealGroup } from "@/components/Reveal";

const values = [
  {
    icon: Sparkles,
    title: "Excellence",
    body: "Certified counsellors and a process refined across thousands of applications.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    body: "Honest advice on fees, odds and timelines — no inflated promises.",
  },
  {
    icon: GraduationCap,
    title: "Innovation",
    body: "Up-to-date knowledge of changing visa rules and global education trends.",
  },
  {
    icon: Heart,
    title: "Student-First",
    body: "We recommend what is right for your future, not what is easy to sell.",
  },
];

/** Icons for the stats band, in the same order as `stats` in site.ts. */
const statIcons = [GraduationCap, Landmark, Globe2, CalendarDays];

export default function HomePage() {
  const posts = getPosts().slice(0, 3);

  // The ticker shows real published items: news and events first, then
  // articles. It renders nothing at all until there is something to show.
  const ticker = [
    ...getNews().map((n) => ({ label: n.title, href: "/news-events" })),
    ...getPosts().map((p) => ({ label: p.title, href: `/blog/${p.slug}` })),
  ].slice(0, 8);

  return (
    <>
      <HeroSlider slides={slides} />

      {/* Stats band — sits directly under the banner so the headline figures
          are on screen without scrolling; the ticker follows it. */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup as="dl" variant="fade" className="grid grid-cols-2 gap-x-6 gap-y-6 py-5 sm:py-6 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i] ?? GraduationCap;
              return (
                <div key={s.label} className="flex items-center gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <dt>
                      <CountUp
                        value={s.value}
                        className="font-display block text-[1.6rem] leading-none font-bold text-navy-900 sm:text-[1.8rem]"
                      />
                    </dt>
                    <dd className="mt-1.5 text-[13px] leading-snug text-navy-500">
                      {s.label}
                    </dd>
                  </div>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <NewsTicker items={ticker} />

      {/* Campaign posters — the company's own artwork, so this is the one
          place on the page showing the brand exactly as it prints. */}
      <Section className="bg-white">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="From our campaigns"
            title="Where our students are heading"
            subtitle="Drag to browse — every poster links through to the destination or service it covers."
          />
        </Reveal>
        <div className="mt-8">
          <PosterStrip posters={posterStrip} />
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-gradient-to-b from-navy-50/70 to-white">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Everything you need, under one roof"
            subtitle="Six services that cover the full journey — from your first counselling session to the day you board your flight."
          />
          <Link
            href="/services"
            className="hidden shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-navy-700 hover:text-navy-900 sm:flex"
          >
            All services
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <RevealGroup className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <span className="absolute bottom-3 left-4 grid size-10 place-items-center rounded-xl bg-white/95 text-navy-800 shadow-sm transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <ServiceIcon name={s.icon} />
                </span>
              </Media>

              <div className={cardBody}>
                <h3 className="text-[17px] font-bold text-white">{s.name}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-300">
                  {s.cardBlurb}
                </p>
                <CardAction>Learn more</CardAction>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </Section>

      {/* Destinations */}
      <Section className="bg-gradient-to-b from-navy-50 via-navy-50/70 to-white">
        <Reveal>
        <SectionHeading
          eyebrow="Study destinations"
          title="Eleven countries. One trusted guide."
          subtitle="Each destination has its own entry requirements, costs and work rights. We help you pick the one that actually fits your profile and budget."
          align="center"
        />
        </Reveal>

        <RevealGroup className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
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
                <div className="absolute inset-x-4 bottom-3 flex items-center gap-2.5">
                  <Flag slug={c.slug} size="lg" className="shadow-md" />
                  <div>
                    <h3 className="text-[17px] font-bold text-white">{c.name}</h3>
                    <p className="text-[12px] font-medium text-navy-200">
                      {c.region}
                    </p>
                  </div>
                </div>
              </Media>

              <div className={cardBody}>
                <p className="flex-1 text-[14.5px] leading-relaxed text-navy-300">
                  {c.cardBlurb}
                </p>
                <CardAction>Study in {c.name}</CardAction>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </Section>

      {/* Values */}
      <Section className="overflow-x-clip bg-gradient-to-b from-white via-navy-50/60 to-white pb-12">
        {/* The heading leads the section at full width rather than sitting in
            a side column — this is the page's argument for the company, so it
            should not read as a caption next to a photo. */}
        <Reveal>
        <SectionHeading
          align="center"
          size="lg"
          eyebrow="Why Vikas Overseas"
          title="A consultancy that puts the student first"
          subtitle="In 2020 we noticed a gap — students were passionate about studying abroad but lacked the right guidance. That is how Vikas Overseas began: a small office with a big dream, to make international education accessible to all."
        />
        </Reveal>

        {/* items-start, so the shorter column does not float in the middle and
            leave a hole above it. */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="left" className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -top-6 -left-6 size-48 rounded-full bg-gold-400/25 blur-3xl"
                aria-hidden
              />
              <div
                className="absolute right-0 bottom-0 size-56 rounded-full bg-navy-400/20 blur-3xl"
                aria-hidden
              />
              <Media
                photo={photos.counsellingTable}
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="relative shadow-2xl shadow-navy-900/25 ring-1 ring-navy-900/10"
              />
              {/* Decorative only, and hidden below sm — rendered inside the
                  same breakpoint so phones do not carry a 0x0 image that can
                  never load. */}
              <div className="absolute -right-4 -bottom-10 hidden w-44 sm:block lg:-right-6">
                <Media
                  photo={photos.studentSmiling}
                  ratio="aspect-[3/4]"
                  sizes="176px"
                  rounded="rounded-xl"
                  className="ring-4 ring-white shadow-2xl shadow-navy-900/30"
                />
              </div>
            </div>

          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {values.map((v) => (
              <div
                key={v.title}
                className="group relative overflow-hidden rounded-2xl border border-navy-800/60 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950 p-6 shadow-[0_1px_3px_rgba(11,31,58,0.10),0_12px_32px_-14px_rgba(11,31,58,0.40)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60"
              >
                <span
                  className="pointer-events-none absolute -top-14 -right-10 size-36 rounded-full bg-gold-500/10 blur-2xl transition-colors duration-500 group-hover:bg-gold-500/20"
                  aria-hidden
                />
                <span className="relative grid size-11 place-items-center rounded-xl bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/25">
                  <v.icon className="size-5" aria-hidden />
                </span>
                <h3 className="relative mt-4 text-[16.5px] font-bold text-white">
                  {v.title}
                </h3>
                <p className="relative mt-2 text-[14.5px] leading-relaxed text-navy-300">
                  {v.body}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/about" variant="secondary">
            Read our story
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </Reveal>
      </Section>

      {/* Process — dark photo band, breaking up the white sections */}
      <section className="relative overflow-hidden bg-navy-900">
        <Image
          src={photos.flight.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-950/92" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-6 py-2">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[12.5px] font-semibold tracking-[0.16em] text-gold-400 uppercase">
              How it works
            </p>
            <h2 className="text-2xl font-bold text-balance text-white sm:text-3xl">
              Your journey, in six clear steps
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-navy-200">
              No guesswork and no surprises. You always know what happens next
              and what we need from you.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors hover:border-gold-500/30 hover:bg-white/[0.09]"
              >
                <span className="font-display text-[2.6rem] leading-none font-bold text-gold-500/60">
                  {s.step}
                </span>
                <h3 className="mt-3 text-[16.5px] font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-navy-200">
                  {s.body}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <Section>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="From our desk"
              title="Guidance, deadlines and updates"
              subtitle="Practical articles on applications, visas and life abroad — written by our counselling team."
            />
            <Link
              href="/blog"
              className="hidden shrink-0 items-center gap-1.5 text-[14.5px] font-semibold text-navy-700 hover:text-navy-900 sm:flex"
            >
              All articles
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>

          <RevealGroup className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="text-[17px] leading-snug font-bold text-white group-hover:text-gold-300">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-navy-300">
                    {p.excerpt}
                  </p>
                  <span className="relative mt-4 text-[13px] text-navy-400">
                    {formatDate(p.date)}
                  </span>
                </div>
              </Link>
            ))}
          </RevealGroup>
        </Section>
      )}

      <CTABand />
    </>
  );
}
