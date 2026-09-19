/**
 * Vikas Overseas campaign posters.
 *
 * These are the company's own artwork (supplied as WhatsApp exports and
 * renamed on the way into /public/posters). Unlike the stock photography in
 * images.ts these are real brand assets, so they carry the logo, the phone
 * number and the house blue/orange palette.
 *
 * To add one: drop the file in /public/posters and add an entry below.
 */

export type Poster = {
  src: string;
  alt: string;
  /** Short label shown under the poster in the strip. */
  caption: string;
  /** Where clicking it should go. */
  href: string;
};

/** Every poster is 2:3 portrait, which the strip relies on for its crop. */
export const POSTER_RATIO = "aspect-[2/3]";

/**
 * Destination posters, keyed by the country slug used in countries.ts.
 * Only the countries we have artwork for appear here; the rest keep their
 * photograph.
 */
export const countryPosters: Record<string, string> = {
  usa: "/posters/usa.jpg",
  australia: "/posters/australia.jpg",
  germany: "/posters/germany.jpg",
  france: "/posters/france.jpg",
  "new-zealand": "/posters/new-zealand.jpg",
  ireland: "/posters/ireland.jpg",
};

export const countryPoster = (slug: string): string | undefined =>
  countryPosters[slug];

/** The campaign strip on the home page, in display order. */
export const posterStrip: Poster[] = [
  {
    src: "/posters/study-abroad.jpg",
    alt: "Vikas Overseas poster: Study Abroad — your global future starts here",
    caption: "Study Abroad",
    href: "/study-in",
  },
  {
    src: "/posters/usa.jpg",
    alt: "Vikas Overseas poster: Study in USA",
    caption: "Study in USA",
    href: "/study-in/usa",
  },
  {
    src: "/posters/australia.jpg",
    alt: "Vikas Overseas poster: Study in Australia",
    caption: "Study in Australia",
    href: "/study-in/australia",
  },
  {
    src: "/posters/germany.jpg",
    alt: "Vikas Overseas poster: Study in Germany",
    caption: "Study in Germany",
    href: "/study-in/germany",
  },
  {
    src: "/posters/france.jpg",
    alt: "Vikas Overseas poster: Study in France",
    caption: "Study in France",
    href: "/study-in/france",
  },
  {
    src: "/posters/ireland.jpg",
    alt: "Vikas Overseas poster: Study in Ireland",
    caption: "Study in Ireland",
    href: "/study-in/ireland",
  },
  {
    src: "/posters/new-zealand.jpg",
    alt: "Vikas Overseas poster: Study in New Zealand",
    caption: "Study in New Zealand",
    href: "/study-in/new-zealand",
  },
  {
    src: "/posters/expert-guidance.jpg",
    alt: "Vikas Overseas poster: Study abroad with expert guidance",
    caption: "Expert guidance",
    href: "/services",
  },
  {
    src: "/posters/global-journey.jpg",
    alt: "Vikas Overseas poster: Your global journey starts here",
    caption: "Your global journey",
    href: "/contact",
  },
  {
    src: "/posters/open-doors.jpg",
    alt: "Vikas Overseas poster: Open doors to a brighter tomorrow",
    caption: "Open doors",
    href: "/about",
  },
  {
    src: "/posters/trusted-partner.jpg",
    alt: "Vikas Overseas poster: Your trusted partner for a global future",
    caption: "Trusted partner",
    href: "/about",
  },
  {
    src: "/posters/discover-opportunities.jpg",
    alt: "Vikas Overseas poster: Discover a world of opportunities",
    caption: "A world of opportunity",
    href: "/study-in",
  },
];
