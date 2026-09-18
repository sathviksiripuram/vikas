import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Media, PageHero, Section } from "@/components/ui";
import { photos } from "@/lib/images";
import { contact, offices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to Vikas Overseas — head office in Ameerpet, Hyderabad and branch office in Karimnagar. Call +91 98493 03673 or book a free consultation online.",
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your future"
        subtitle="Visit us in Hyderabad or Karimnagar, call, WhatsApp, or send an enquiry — we reply within one working day."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={photos.counsellingDesk}
      />

      {/* Quick contact strip */}
      <section className="border-b border-navy-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-navy-100 px-6 py-0 sm:grid-cols-3">
          <a
            href={contact.phonePrimaryHref}
            className="group flex items-center gap-4 bg-white px-6 py-7 transition-colors hover:bg-navy-50/70"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 group-hover:bg-white">
              <Phone className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-[12px] font-semibold tracking-[0.1em] text-navy-500 uppercase">
                Call us
              </span>
              <span className="mt-0.5 block text-[15.5px] font-semibold text-navy-900">
                {contact.phonePrimary}
              </span>
            </span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-white px-6 py-7 transition-colors hover:bg-navy-50/70"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 group-hover:bg-white">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-[12px] font-semibold tracking-[0.1em] text-navy-500 uppercase">
                WhatsApp
              </span>
              <span className="mt-0.5 block text-[15.5px] font-semibold text-navy-900">
                Chat with a counsellor
              </span>
            </span>
          </a>

          <a
            href={`mailto:${contact.emails.general}`}
            className="group flex items-center gap-4 bg-white px-6 py-7 transition-colors hover:bg-navy-50/70"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 group-hover:bg-white">
              <Mail className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-[12px] font-semibold tracking-[0.1em] text-navy-500 uppercase">
                Email us
              </span>
              <span className="mt-0.5 block text-[15.5px] font-semibold text-navy-900">
                {contact.emails.general}
              </span>
            </span>
          </a>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-navy-900">
              Book your free consultation
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-navy-600">
              Tell us a little about yourself and one of our certified
              counsellors will get in touch within one working day.
            </p>
            <Media
              photo={photos.counsellingTable}
              alt="A counsellor going through options with a student at our office"
              ratio="aspect-[21/9]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="mt-8 shadow-lg shadow-navy-900/10"
            />

            <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Offices */}
          <div className="space-y-5 lg:col-span-5">
            <h2 className="text-2xl font-bold text-navy-900">Our offices</h2>

            {offices.map((o) => (
              <div
                key={o.id}
                className="overflow-hidden rounded-2xl border border-navy-100 bg-white"
              >
                <div className="p-6">
                  <span className="inline-block rounded-full bg-navy-900 px-3 py-1 text-[11.5px] font-semibold tracking-wide text-white uppercase">
                    {o.label}
                  </span>
                  <h3 className="mt-4 text-[18px] font-bold text-navy-900">
                    {o.city}
                  </h3>

                  <address className="mt-4 space-y-3 text-[14.5px] not-italic text-navy-700">
                    <span className="flex gap-3">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-navy-400"
                        aria-hidden
                      />
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
                      className="flex items-center gap-3 transition-colors hover:text-navy-900"
                    >
                      <Phone className="size-4 shrink-0 text-navy-400" aria-hidden />
                      {o.phone}
                    </a>
                    <a
                      href={`mailto:${o.email}`}
                      className="flex items-center gap-3 transition-colors hover:text-navy-900"
                    >
                      <Mail className="size-4 shrink-0 text-navy-400" aria-hidden />
                      {o.email}
                    </a>
                    <span className="flex items-center gap-3">
                      <Clock className="size-4 shrink-0 text-navy-400" aria-hidden />
                      Mon – Sat, 10:00 AM – 7:00 PM
                    </span>
                  </address>

                  <a
                    href={o.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-[14px] font-semibold text-navy-600 underline underline-offset-4 hover:text-navy-900"
                  >
                    Get directions →
                  </a>
                </div>

                <iframe
                  src={o.mapsEmbed}
                  title={`Map of the Vikas Overseas ${o.city} office`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full border-0 border-t border-navy-100"
                  allowFullScreen
                />
              </div>
            ))}

            <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-6">
              <h3 className="text-[13px] font-semibold tracking-[0.12em] text-navy-500 uppercase">
                Department emails
              </h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px] text-navy-700">
                <li>
                  General enquiries —{" "}
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className="font-medium text-navy-800 underline underline-offset-2"
                  >
                    {contact.emails.general}
                  </a>
                </li>
                <li>
                  Admissions —{" "}
                  <a
                    href={`mailto:${contact.emails.admissions}`}
                    className="font-medium text-navy-800 underline underline-offset-2"
                  >
                    {contact.emails.admissions}
                  </a>
                </li>
                <li>
                  Finance & loans —{" "}
                  <a
                    href={`mailto:${contact.emails.finance}`}
                    className="font-medium text-navy-800 underline underline-offset-2"
                  >
                    {contact.emails.finance}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
