import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ogImage, photos } from "@/lib/images";
import { contact, offices, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Overseas Education Consultants in Hyderabad`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "overseas education consultants Hyderabad",
    "study abroad consultants Ameerpet",
    "study in USA UK Canada Australia",
    "student visa guidance Hyderabad",
    "IELTS TOEFL PTE coaching",
    "education loan assistance",
    "Vikas Overseas",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Overseas Education Consultants`,
    description: site.description,
    images: [
      {
        url: ogImage(photos.graduation),
        width: 1200,
        height: 630,
        alt: photos.graduation.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Overseas Education Consultants`,
    description: site.description,
    images: [ogImage(photos.graduation)],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  foundingDate: String(site.establishedYear),
  email: contact.emails.general,
  telephone: "+919849303673",
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.lines.join(" ").replace(/,\s*India\.$/, ""),
    addressLocality: o.city,
    addressRegion: "Telangana",
    addressCountry: "IN",
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Scroll-reveal starts elements hidden and the client reveals them.
            Without JavaScript that flip never happens, so force them visible. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal],[data-reveal-group]>*{opacity:1!important;filter:none!important;transform:none!important}</style>",
          }}
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
