import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Flag from "@/components/Flag";
import { countries } from "@/lib/countries";
import { services } from "@/lib/services";
import { contact, offices, site, socials } from "@/lib/site";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Study Destinations", href: "/study-in" },
  { label: "Our Services", href: "/services" },
  { label: "News & Events", href: "/news-events" },
  { label: "Blogs", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            {/* The logo is printed on white, so on the navy footer it sits on
                a white chip rather than being keyed out — the mark has white
                inside the V that transparency would punch through. */}
            <Link href="/" className="inline-block rounded-xl bg-white p-3">
              <Image
                src="/logo-horizontal.png"
                alt={`${site.name} — Overseas Educational Consultants`}
                width={786}
                height={260}
                className="h-12 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-navy-300">
              Established in {site.establishedYear}, Vikas Overseas has helped
              over 2,000 students secure admissions in 500+ top universities
              worldwide. We are your reliable bridge between ambition and
              global opportunity.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-navy-800 px-3 py-1.5 text-[13px] text-navy-300 transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.12em] text-white uppercase">
                Study In
              </h3>
              <ul className="mt-4 space-y-2.5">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/study-in/${c.slug}`}
                      className="flex items-center gap-2.5 text-[14px] text-navy-300 transition-colors hover:text-gold-400"
                    >
                      <Flag slug={c.slug} size="sm" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.12em] text-white uppercase">
                Services
              </h3>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[14px] text-navy-300 transition-colors hover:text-gold-400"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold tracking-[0.12em] text-white uppercase">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-navy-300 transition-colors hover:text-gold-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-14 grid gap-8 border-t border-navy-900 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((o) => (
            <div key={o.id}>
              <h3 className="text-[13px] font-semibold tracking-[0.12em] text-gold-400 uppercase">
                {o.label} — {o.city}
              </h3>
              <address className="mt-3 space-y-2 text-[14px] not-italic text-navy-300">
                <span className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-navy-500" aria-hidden />
                  <span>
                    {o.lines.map((line) => (
                      <span key={line} className="block leading-relaxed">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
                <a
                  href={o.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Phone className="size-4 shrink-0 text-navy-500" aria-hidden />
                  {o.phone}
                </a>
                <a
                  href={`mailto:${o.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Mail className="size-4 shrink-0 text-navy-500" aria-hidden />
                  {o.email}
                </a>
              </address>
            </div>
          ))}

          <div>
            <h3 className="text-[13px] font-semibold tracking-[0.12em] text-gold-400 uppercase">
              Email Us
            </h3>
            <ul className="mt-3 space-y-2 text-[14px] text-navy-300">
              <li>
                General:{" "}
                <a
                  href={`mailto:${contact.emails.general}`}
                  className="transition-colors hover:text-gold-400"
                >
                  {contact.emails.general}
                </a>
              </li>
              <li>
                Admissions:{" "}
                <a
                  href={`mailto:${contact.emails.admissions}`}
                  className="transition-colors hover:text-gold-400"
                >
                  {contact.emails.admissions}
                </a>
              </li>
              <li>
                Finance:{" "}
                <a
                  href={`mailto:${contact.emails.finance}`}
                  className="transition-colors hover:text-gold-400"
                >
                  {contact.emails.finance}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-navy-900 pt-6 text-[13px] text-navy-400 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Information on visas, fees and scholarships is indicative and
            subject to change by the relevant authorities.
          </p>
        </div>
      </div>
    </footer>
  );
}
