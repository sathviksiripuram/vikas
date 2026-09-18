import { countries } from "./countries";
import { photos, type Photo } from "./images";
import { services, type Service } from "./services";

export type NavChild = {
  label: string;
  href: string;
  /** Destinations: renders the country flag beside the label. */
  countrySlug?: string;
  /** Services: renders the service icon and a one-line description. */
  serviceIcon?: Service["icon"];
  desc?: string;
};
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Photograph behind the whole dropdown panel. */
  panelPhoto?: Photo;
  /** Small caption laid over that photograph. */
  panelCaption?: string;
  /** Overrides the auto-generated "View all <label>" footer wording. */
  viewAllLabel?: string;
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Study In",
    href: "/study-in",
    panelPhoto: photos.travelMap,
    panelCaption: "11 study destinations",
    viewAllLabel: "View all destinations",
    children: countries.map((c) => ({
      label: c.navLabel,
      href: `/study-in/${c.slug}`,
      countrySlug: c.slug,
    })),
  },
  {
    label: "Services",
    href: "/services",
    panelPhoto: photos.counsellingTable,
    panelCaption: "End-to-end support",
    viewAllLabel: "View all services",
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
      serviceIcon: s.icon,
      desc: s.cardBlurb,
    })),
  },
  { label: "News & Events", href: "/news-events" },
  { label: "Blogs", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
