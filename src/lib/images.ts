/**
 * Central photo registry.
 *
 * Every image used across the site is declared here once, with its alt text,
 * so photography can be swapped in a single place.
 *
 * Swapping in your own photos
 * ---------------------------
 * 1. Drop the file into /public/photos/ (e.g. /public/photos/office.jpg)
 * 2. Change the `src` below to "/photos/office.jpg"
 * That's it — no component changes, and no next.config.ts change either.
 *
 * The current photos are free-to-use stock from Unsplash, chosen as
 * placeholders until the real Vikas Overseas photography is available.
 */

export type Photo = {
  src: string;
  alt: string;
  /** 1200x630 crop for Open Graph / Twitter cards. */
  og: string;
};

/**
 * Resolves a photo to its local copy in /public/photos.
 *
 * These were originally hot-linked to Unsplash's CDN. That meant Next had to
 * fetch the original across the network before it could produce each size,
 * so the first visitor to hit any uncached variant waited on a third-party
 * round trip — which on a phone showed up as images arriving slowly or not
 * at all. Serving them from our own origin removes that hop entirely and
 * takes Unsplash out of the runtime path.
 *
 * The files are fetched once at 1600px (see scripts note in README) and Next
 * resizes down from there.
 */
const localPhoto = (id: string) => `/photos/${id}.jpg`;

const photo = (id: string, alt: string): Photo => ({
  src: localPhoto(id),
  alt,
  og: localPhoto(id),
});

/** Open Graph URL for any photo, including locally hosted ones. */
export const ogImage = (p: Photo): string => p.og || p.src;

/* ------------------------------------------------------------------ *
 * People, campuses and the study-abroad journey
 * ------------------------------------------------------------------ */

export const photos = {
  graduation: photo(
    "photo-1541339907198-e08756dedf3f",
    "Graduates throwing their caps in the air at sunset",
  ),
  studentsCollaborating: photo(
    "photo-1543269865-cbf427effbad",
    "Four students smiling over a laptop at a shared table",
  ),
  studentsClassroom: photo(
    "photo-1571260899304-425eee4c7efc",
    "A student standing with her notes among classmates in a classroom",
  ),
  studentSmiling: photo(
    "photo-1596495578065-6e0763fa1178",
    "A smiling student looking up from her notes",
  ),
  studentsLaptops: photo(
    "photo-1522202176988-66273c2fd55f",
    "Three students working together on laptops",
  ),
  counsellingDesk: photo(
    "photo-1590650516494-0c8e4a4dd67e",
    "A counsellor talking a student through options on a laptop",
  ),
  counsellingTable: photo(
    "photo-1531545514256-b1400bc00f31",
    "A counsellor going through university options with three students at a laptop",
  ),
  libraryStudent: photo(
    "photo-1427504494785-3a9ca7044f45",
    "A student with a backpack walking between library shelves",
  ),
  libraryShelves: photo(
    "photo-1498243691581-b145c3f54a5a",
    "Rows of books in a university library",
  ),
  libraryGroup: photo(
    "photo-1523240795612-9a054b0db644",
    "A group of students laughing over a laptop in a library",
  ),
  campus: photo(
    "photo-1562774053-701939374585",
    "A university building behind a wide green lawn",
  ),
  lectureHall: photo(
    "photo-1606761568499-6d2451b23c66",
    "A lecture hall with a presentation on screen",
  ),
  classroom: photo(
    "photo-1509062522246-3755977927d7",
    "Students listening to a lecturer in a classroom",
  ),
  seminar: photo(
    "photo-1524178232363-1fb2b075b655",
    "An audience at a university information session",
  ),
  conference: photo(
    "photo-1587825140708-dfaf72ae4b04",
    "A speaker addressing a large auditorium at an education fair",
  ),
  teamMeeting: photo(
    "photo-1521737604893-d14cc237f11d",
    "A team in discussion around a long table",
  ),
  workshop: photo(
    "photo-1552664730-d307ca884978",
    "A counsellor presenting to colleagues in a bright office",
  ),
  deskLaptops: photo(
    "photo-1519389950473-47ba0277781c",
    "Overhead view of a desk with laptops, notebooks and coffee",
  ),
  documents: photo(
    "photo-1454165804606-c3d57bc86b40",
    "Two people reviewing application paperwork at a desk",
  ),
  signing: photo(
    "photo-1450101499163-c8848c66ca85",
    "A person signing documents with a fountain pen",
  ),
  finance: photo(
    "photo-1554224155-6726b3ff858f",
    "Loan forms and a calculator laid out on a desk",
  ),
  handshake: photo(
    "photo-1521791136064-7986c2920216",
    "Two people shaking hands across an office desk",
  ),
  notes: photo(
    "photo-1517842645767-c639042777db",
    "An open notebook with a pen and reading glasses",
  ),
  studyWriting: photo(
    "photo-1434030216411-0b793f4b4173",
    "A student writing notes beside a cup of coffee",
  ),
  travelMap: photo(
    "photo-1488646953014-85cb44e25828",
    "A backpack, camera and notebook laid out on a folded map",
  ),
  globe: photo(
    "photo-1521295121783-8a321d551ad2",
    "A desk globe turned towards Europe and Asia",
  ),
  flight: photo(
    "photo-1436491865332-7a61a109cc05",
    "An aircraft wing above the clouds at sunrise",
  ),
} as const;

/* ------------------------------------------------------------------ *
 * Study destinations — keyed by the country slug in src/lib/countries.ts
 * ------------------------------------------------------------------ */

export const countryPhotos: Record<string, Photo> = {
  usa: photo(
    "photo-1522083165195-3424ed129620",
    "The Manhattan skyline seen from Brooklyn Bridge at sunset",
  ),
  uk: photo(
    "photo-1513635269975-59663e0ac1ad",
    "An aerial view of London along the Thames with Tower Bridge",
  ),
  canada: photo(
    "photo-1517935706615-2717063c2225",
    "Downtown Toronto and the CN Tower at golden hour",
  ),
  australia: photo(
    "photo-1523482580672-f109ba8cb9be",
    "Sydney Opera House lit up on the harbour at dusk",
  ),
  "new-zealand": photo(
    "photo-1507699622108-4be3abd695ad",
    "Auckland's waterfront and Sky Tower mirrored in still water",
  ),
  ireland: photo(
    "photo-1549918864-48ac978761a4",
    "A Dublin street at dawn looking towards a church spire",
  ),
  germany: photo(
    "photo-1560969184-10fe8719e047",
    "The Brandenburg Gate in Berlin under a bright sky",
  ),
  france: photo(
    "photo-1502602898657-3e91760cbb34",
    "The Eiffel Tower above the Seine at dusk",
  ),
  italy: photo(
    "photo-1543429257-3eb0b65d9c58",
    "Florence and the Duomo at sunset",
  ),
  uae: photo(
    "photo-1512453979798-5ea266f8880c",
    "The Dubai skyline with the Burj Khalifa at sunrise",
  ),
  europe: photo(
    "photo-1583422409516-2895a77efded",
    "An aerial view of Barcelona's grid and the Sagrada Família",
  ),
};

/** Falls back to a campus shot if a destination has no photo assigned yet. */
export const countryPhoto = (slug: string): Photo =>
  countryPhotos[slug] ?? photos.campus;

/* ------------------------------------------------------------------ *
 * Services — keyed by the service slug in src/lib/services.ts
 * ------------------------------------------------------------------ */

export const servicePhotos: Record<string, Photo> = {
  "admission-counseling": photos.counsellingDesk,
  "test-preparation": photos.libraryStudent,
  "university-selection": photos.campus,
  "application-assistance": photos.documents,
  "education-loan-assistance": photos.finance,
  "visa-guidance": photos.signing,
};

export const servicePhoto = (slug: string): Photo =>
  servicePhotos[slug] ?? photos.counsellingTable;

/* ------------------------------------------------------------------ *
 * Editorial — blog and news cover art
 * ------------------------------------------------------------------ */

/** Used when a post's front matter has no `cover:` of its own. */
const categoryPhotos: Record<string, Photo> = {
  Guidance: photos.travelMap,
  "Test Preparation": photos.studyWriting,
  Applications: photos.documents,
  Visas: photos.signing,
  Scholarships: photos.finance,
  Events: photos.conference,
  Webinar: photos.seminar,
  General: photos.notes,
};

/** Keeps the fallback stable per post rather than random on every render. */
const editorialRotation = [
  photos.studyWriting,
  photos.libraryShelves,
  photos.notes,
  photos.studentsLaptops,
  photos.deskLaptops,
];

export const postPhoto = (post: {
  slug: string;
  category: string;
  cover?: string;
}): Photo => {
  if (post.cover) return { src: post.cover, alt: "", og: post.cover };
  if (categoryPhotos[post.category]) return categoryPhotos[post.category];

  const hash = [...post.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  return editorialRotation[hash % editorialRotation.length];
};

/* ------------------------------------------------------------------ *
 * Gallery — replace these with your own send-off and event photos
 * ------------------------------------------------------------------ */

export const galleryPhotos: {
  photo: Photo;
  caption: string;
  category: string;
}[] = [
  {
    photo: photos.graduation,
    caption: "Our students graduating abroad — the moment the whole journey is for.",
    category: "Send-offs",
  },
  {
    photo: photos.conference,
    caption: "Education fair season: university delegates meeting students in person.",
    category: "Education fairs",
  },
  {
    photo: photos.counsellingDesk,
    caption: "One-to-one profile evaluation at our Ameerpet head office.",
    category: "Counselling",
  },
  {
    photo: photos.seminar,
    caption: "Intake briefing covering deadlines, documents and funding.",
    category: "Seminars",
  },
  {
    photo: photos.studentsCollaborating,
    caption: "Application workshops — SOPs, LORs and transcripts, side by side.",
    category: "Workshops",
  },
  {
    photo: photos.libraryGroup,
    caption: "Test preparation groups working through IELTS and PTE practice sets.",
    category: "Test prep",
  },
  {
    photo: photos.teamMeeting,
    caption: "The counselling team reviewing the week's applications.",
    category: "Our team",
  },
  {
    photo: photos.workshop,
    caption: "Training on the latest visa rule changes across our destinations.",
    category: "Our team",
  },
  {
    photo: photos.flight,
    caption: "Departure day — every send-off starts a new story.",
    category: "Send-offs",
  },
];
