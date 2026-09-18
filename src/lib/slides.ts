import { countryPhoto, photos, type Photo } from "./images";

/**
 * Slides for the rotating banner at the top of the home page.
 *
 * Add, remove or reorder freely — the slider adapts to any number of slides,
 * and hides its controls entirely when there is only one.
 *
 * Keep `title` short. It renders at display size, and `highlight` is the part
 * picked out in gold.
 */
export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  /** Rendered in gold, immediately after `title`. */
  highlight?: string;
  body: string;
  /** Up to four short proof points. Shown as a gold-ticked list. */
  points?: string[];
  photo: Photo;
  /** Shifts the photo's focal point when the default crop cuts badly. */
  focus?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export const slides: Slide[] = [
  {
    id: "welcome",
    eyebrow: "Welcome to Vikas Overseas",
    title: "Your trusted bridge to a",
    highlight: "world-class education",
    body: "From choosing the right course to landing your student visa, our certified counsellors guide you through every step — across 11 study destinations and 500+ partner universities.",
    points: [
      "Free profile evaluation, no obligation",
      "Certified counsellors since 2020",
      "Offices in Hyderabad and Karimnagar",
    ],
    photo: photos.graduation,
    cta: { label: "Book a Free Consultation", href: "/contact" },
    secondary: { label: "Explore Destinations", href: "/study-in" },
  },
  {
    id: "usa",
    eyebrow: "Study in USA",
    title: "The world's largest choice of",
    highlight: "universities and research",
    body: "Flexible degrees, unmatched research funding and practical work experience through CPT and OPT while you study and after you graduate.",
    points: [
      "World-class universities and research facilities",
      "OPT and CPT work pathways, strong STEM demand",
      "Merit scholarships and graduate assistantships",
    ],
    photo: countryPhoto("usa"),
    cta: { label: "Explore Study in USA", href: "/study-in/usa" },
    secondary: { label: "Talk to a counsellor", href: "/contact?country=usa" },
  },
  {
    id: "canada",
    eyebrow: "Study in Canada",
    title: "Affordable study with a",
    highlight: "clear route to PR",
    body: "Lower tuition than most English-speaking destinations, a post-graduation work permit of up to three years, and a well-defined permanent residency pathway.",
    points: [
      "Affordable tuition and living costs",
      "Post-graduation work permit up to 3 years",
      "A clear, well-established PR pathway",
    ],
    photo: countryPhoto("canada"),
    cta: { label: "Explore Study in Canada", href: "/study-in/canada" },
    secondary: {
      label: "Talk to a counsellor",
      href: "/contact?country=canada",
    },
  },
  {
    id: "uk",
    eyebrow: "Study in UK",
    title: "One-year master's at",
    highlight: "historic institutions",
    body: "Finish your master's in twelve months, then stay on the Graduate Route to work or look for work for up to two years after you graduate.",
    points: [
      "One-year master's degrees — less tuition, less living cost",
      "Graduate Route: 2 years' post-study work",
      "Centuries-old institutions with global recognition",
    ],
    photo: countryPhoto("uk"),
    cta: { label: "Explore Study in UK", href: "/study-in/uk" },
    secondary: { label: "Talk to a counsellor", href: "/contact?country=uk" },
  },
  {
    id: "australia",
    eyebrow: "Study in Australia",
    title: "Top-ranked universities and an",
    highlight: "outstanding lifestyle",
    body: "Globally ranked institutions, generous post-study work rights of two to four years, and the right to work part-time while you study.",
    points: [
      "2–4 year Temporary Graduate visa after you finish",
      "Part-time work rights alongside your course",
      "Eight universities in the global top 100",
    ],
    photo: countryPhoto("australia"),
    cta: { label: "Explore Study in Australia", href: "/study-in/australia" },
    secondary: {
      label: "Talk to a counsellor",
      href: "/contact?country=australia",
    },
  },
  {
    id: "germany",
    eyebrow: "Study in Germany",
    title: "Little or no tuition at",
    highlight: "public universities",
    body: "Most public universities charge no tuition fee even for international students — you cover a modest semester contribution and your living costs.",
    points: [
      "No or very low tuition at public universities",
      "Europe's strongest engineering and research base",
      "18-month job-seeker visa after graduation",
    ],
    photo: countryPhoto("germany"),
    cta: { label: "Explore Study in Germany", href: "/study-in/germany" },
    secondary: {
      label: "Talk to a counsellor",
      href: "/contact?country=germany",
    },
  },
  {
    id: "ireland",
    eyebrow: "Study in Ireland",
    title: "An English-speaking",
    highlight: "tech and pharma hub",
    body: "Home to the European headquarters of the world's largest technology and pharmaceutical companies, with a two-year stay-back for master's graduates.",
    points: [
      "2-year post-study work visa for master's graduates",
      "European base for global tech and pharma employers",
      "English-speaking, and part of the EU",
    ],
    photo: countryPhoto("ireland"),
    cta: { label: "Explore Study in Ireland", href: "/study-in/ireland" },
    secondary: {
      label: "Talk to a counsellor",
      href: "/contact?country=ireland",
    },
  },
];
