export const site = {
  name: "Vikas Overseas",
  legalName: "Vikas Overseas Educational Consultants",
  tagline: "Your trusted bridge to global education",
  description:
    "Vikas Overseas is a Hyderabad-based overseas education consultancy helping students secure admissions in 500+ top universities across the USA, UK, Canada, Australia, Europe and more.",
  // TODO: replace with your live domain once the Vercel project is connected
  url: "https://www.vikasoverseas.com",
  establishedYear: 2020,
} as const;

export const stats = [
  { value: "2,000+", label: "Students placed abroad" },
  { value: "500+", label: "Partner universities" },
  { value: "11", label: "Study destinations" },
  { value: "2020", label: "Serving students since" },
] as const;

export const contact = {
  phonePrimary: "+91 98493 03673",
  phonePrimaryHref: "tel:+919849303673",
  whatsapp: "919849303673",
  whatsappMessage:
    "Hello Vikas Overseas, I would like to know more about studying abroad.",
  emails: {
    general: "info@vikasoverseas.com",
    admissions: "admissions@vikasoverseas.com",
    finance: "finance@vikasoverseas.com",
  },
} as const;

export const offices = [
  {
    id: "hyderabad",
    label: "Head Office",
    city: "Hyderabad",
    lines: [
      "1st Floor, Opposite Swarna Jayanthi Complex,",
      "Behind City Bus Stop, Mythrivanam, Ameerpet,",
      "Hyderabad, Telangana - 500038, India.",
    ],
    phone: "+91 98493 03673",
    phoneHref: "tel:+919849303673",
    email: "info@vikasoverseas.com",
    // TODO: paste your Google Maps "embed" and "share" links here
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mythrivanam+Ameerpet+Hyderabad+500038",
    mapsEmbed:
      "https://www.google.com/maps?q=Mythrivanam,Ameerpet,Hyderabad,Telangana+500038&output=embed",
  },
  {
    id: "karimnagar",
    label: "Branch Office",
    city: "Karimnagar",
    lines: [
      "#7-2-1005, Above Vijaya Diagnostic Centre,",
      "Mankammathota, Karimnagar,",
      "Telangana - 505001, India.",
    ],
    phone: "+91 90140 34492",
    phoneHref: "tel:+919014034492",
    email: "karimnagar@vikasoverseas.com",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Mankammathota+Karimnagar+Telangana+505001",
    mapsEmbed:
      "https://www.google.com/maps?q=Mankammathota,Karimnagar,Telangana+505001&output=embed",
  },
] as const;

// TODO: replace the "#" values with your real profile URLs
export const socials = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "YouTube", href: "#" },
] as const;
