import type { Metadata } from "next";
import { Compass, Eye, Target } from "lucide-react";
import CountUp from "@/components/CountUp";
import { CTABand, Media, PageHero, Section, SectionHeading } from "@/components/ui";
import { photos } from "@/lib/images";
import { processSteps } from "@/lib/services";
import { site, stats } from "@/lib/site";
import { RevealGroup } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Established in 2020 and headquartered in Hyderabad, Vikas Overseas has helped 2,000+ students secure admissions in 500+ top universities worldwide.",
};

const pillars = [
  {
    icon: Target,
    title: "Mission",
    body: "To empower students with the right guidance, enabling them to achieve their international education goals with confidence.",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "To be the most reliable bridge between students and global opportunities.",
  },
  {
    icon: Compass,
    title: "Core Values",
    body: "Excellence, Transparency, Innovation, and a Student-First Approach in everything we do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A small office with a big dream — since 2020"
        subtitle="Vikas Overseas is a trusted consultancy specializing in overseas education and career guidance, headquartered in Hyderabad."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={photos.teamMeeting}
      />

      {/* Stats */}
      <section className="border-b border-navy-100 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <RevealGroup as="dl" variant="fade" className="grid grid-cols-2 gap-x-6 gap-y-8 py-11 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>
                  <CountUp
                    value={s.value}
                    className="font-display block text-[1.9rem] font-bold text-navy-900"
                  />
                </dt>
                <dd className="mt-1 text-[13px] leading-snug text-navy-500">
                  {s.label}
                </dd>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our story" title="How Vikas Overseas began" />

            <div className="mt-7 grid gap-4 sm:grid-cols-5">
              <Media
                photo={photos.counsellingDesk}
                alt="A Vikas Overseas counsellor reviewing options with a student"
                ratio="h-52 sm:h-64"
                sizes="(max-width: 640px) 100vw, 35vw"
                className="sm:col-span-3"
              />
              <Media
                photo={photos.studentsClassroom}
                ratio="h-52 sm:h-64"
                sizes="(max-width: 640px) 100vw, 25vw"
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-navy-700">
              <p>
                Established in {site.establishedYear}, Vikas Overseas is a
                trusted consultancy specializing in overseas education and career
                guidance. Headquartered in Hyderabad, we have helped over 2,000+
                students secure admissions in top 500+ universities worldwide.
              </p>
              <p>
                In 2020, we noticed a gap — students were passionate about
                studying abroad but lacked the right guidance. That&apos;s how
                Vikas Overseas began, born out of a small office with a big
                dream: to make international education accessible to all.
              </p>
              <p>
                Over the years, we&apos;ve grown from serving a handful of
                students to helping thousands achieve their academic dreams in
                the USA, UK, Canada, Australia, New Zealand, Ireland, Germany,
                France, Italy, UAE, Europe and beyond.
              </p>
              <p>
                Today, Vikas Overseas is not just a consultancy; we&apos;re
                mentors, cheerleaders, and problem-solvers for students
                worldwide. And tomorrow? We aim to open more doors, explore new
                destinations, and keep making dreams possible.
              </p>
              <p className="border-l-3 border-gold-400 pl-5 font-medium text-navy-800 italic">
                With certified counselors, strong global partnerships, and a
                proven track record, Vikas Overseas stands as a beacon of trust
                for students aiming to study abroad. Let us help you take the
                next big leap in your career.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-white text-navy-700 shadow-sm">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[17px] font-bold text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-navy-600">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Life at Vikas Overseas */}
      <Section className="bg-gradient-to-b from-navy-50 via-navy-50/70 to-white">
        <SectionHeading
          eyebrow="Inside the office"
          title="What a week with us looks like"
          subtitle="Counselling sessions, application clinics, university delegate visits and — the best part — send-offs."
          align="center"
        />

        <RevealGroup className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { photo: photos.counsellingTable, caption: "One-to-one profile evaluations" },
            { photo: photos.workshop, caption: "SOP and application clinics" },
            { photo: photos.seminar, caption: "University delegate sessions" },
            { photo: photos.graduation, caption: "Send-offs and graduations" },
          ].map((item) => (
            <figure key={item.caption} className="group">
              <Media
                photo={item.photo}
                alt={item.caption}
                ratio="aspect-[4/5]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                zoom
              />
              <figcaption className="mt-3 text-[14px] font-medium text-navy-700">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading
          eyebrow="Our process"
          title="What working with us looks like"
          subtitle="A structured path from your first conversation to your departure gate."
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
