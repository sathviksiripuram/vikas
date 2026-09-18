# Vikas Overseas — Website

Marketing website for **Vikas Overseas Educational Consultants**, Hyderabad.
Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

---

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

---

## Where the content lives

Almost all text on the site comes from four files. **You do not need to touch
any page code to update content.**

| File | What it controls |
|---|---|
| `src/lib/site.ts` | Company name, phone, emails, both office addresses, social links, headline stats |
| `src/lib/countries.ts` | All 11 study destinations — intro, "why study here", courses, visa, costs |
| `src/lib/services.ts` | All 6 services, the test-prep detail (IELTS/TOEFL/PTE/GRE/GMAT), and the 6-step process |
| `src/lib/images.ts` | Every photograph on the site — heroes, destination shots, service and article covers |
| `src/lib/slides.ts` | The rotating banner at the top of the home page |
| `content/blog/*.md` | Blog articles (see below) |

### Things to fill in

Search the project for `TODO` — there are four:

1. `src/lib/site.ts` → `site.url` — your live domain, once you have it
2. `src/lib/site.ts` → `socials` — your Facebook / Instagram / LinkedIn / YouTube URLs
3. `src/lib/site.ts` → `offices[].mapsUrl` / `mapsEmbed` — exact Google Maps links for both offices
4. `src/app/gallery/page.tsx` → `items` — see "Adding photos" below

---

## Adding a blog post

Create a file in `content/blog/`, e.g. `content/blog/uk-january-intake.md`:

```markdown
---
title: "Everything about the UK January intake"
date: "2026-09-20"
category: "Applications"
author: "Vikas Overseas Counselling Team"
excerpt: "A one-line summary shown on the blog listing card."
---

Your article body in **Markdown**.

## A heading

- A list
- Another point
```

The file name becomes the URL: `/blog/uk-january-intake`.
Posts sort newest-first automatically. Nothing else to configure.

## Adding a news or event item

Identical format, but the file goes in `content/news/` instead. These appear on
`/news-events`. The folder is currently empty, so that page shows a
"no events scheduled" message until you add the first one.

## The home page banner

The banner rotates through the slides defined in **`src/lib/slides.ts`**, one
entry per slide. Add, remove or reorder them freely — the slider adapts to any
number, and hides its arrows and dots entirely if you leave only one.

```ts
{
  id: "ireland",
  eyebrow: "Study in Ireland",
  title: "An English-speaking",
  highlight: "tech and pharma hub",   // this part renders in gold
  body: "One or two sentences.",
  points: ["Up to three short proof points"],
  photo: countryPhoto("ireland"),
  cta: { label: "Explore Study in Ireland", href: "/study-in/ireland" },
  secondary: { label: "Talk to a counsellor", href: "/contact" },
}
```

Behaviour worth knowing:

- **Drag it.** Grab the banner with the mouse and pull left or right to change
  slide — the same gesture is a swipe on a phone. There are no arrow buttons,
  which is deliberate: they sat on top of the headline.
- A drag that happens to finish over a button does not trigger that button, so
  you can start a drag anywhere.
- Slides advance on their own every few seconds (`INTERVAL` in
  `HeroSlider.tsx`), pausing while the pointer is over the banner, while
  anything inside has keyboard focus, and while you are dragging.
- There is a play/pause button beside the dots, and left/right arrow keys work
  when the banner has focus. Both are accessibility requirements for anything
  that moves on its own, not decoration.
- Visitors who have "reduce motion" switched on get a still banner with no
  auto-advance at all.
- Only the first slide's photo loads up front; the rest load one step ahead of
  being shown, so adding slides doesn't slow down the first paint.
- Between slides the photograph cross-dissolves while the text swaps out and
  back in. That split is intentional — fading both together left two headlines
  overlapping and unreadable for a moment.
- The copy only needs the left half of the banner, so the right half carries a
  destination picker listing all 11 countries. It is rendered once, outside the
  slide loop, so it stays put while slides change, and it is hidden below the
  `lg` breakpoint where there is no spare width.
- The banner is deliberately short so the stats band below it is visible
  without scrolling on a ~700px-tall viewport. If you add a fourth bullet or a
  longer headline it will grow and push the stats under the fold — check it at
  that height before shipping.

### The "Latest" ticker

The scrolling strip under the banner fills itself from your real published
content — news and events first, then blog articles. You don't edit it
directly: publish a news item (see below) and it appears. If you have no news
and no articles, the strip hides itself.

It can also be dragged with the mouse, and pauses while you hover it. Speed is
`SPEED` in `NewsTicker.tsx`.

### The stats band

The four figures under the ticker count up from zero the first time they
scroll into view (`src/components/CountUp.tsx`), on both the home page and the
About page. They read from `stats` in `src/lib/site.ts` — change a number
there and the animation follows. The final value is what is in the HTML, so
search engines and anyone without JavaScript still see the real figure.

---

## Photography

Every image on the site is declared once in **`src/lib/images.ts`** — page
components never hard-code an image URL. The photos currently in place are
free-to-use stock from Unsplash, standing in until the real Vikas Overseas
photography is ready.

### Swapping in your own photos

1. Drop the file into `public/photos/` — e.g. `public/photos/office.jpg`
2. In `src/lib/images.ts`, change that entry's `src` to `"/photos/office.jpg"`

```ts
// before
counsellingDesk: photo("photo-1590650516494-0c8e4a4dd67e", "…"),

// after
counsellingDesk: {
  src: "/photos/counselling.jpg",
  alt: "Our counsellor with a student at the Ameerpet office",
  og: "/photos/counselling.jpg",
},
```

No page code and no `next.config.ts` change is needed. Keep the `alt` text
descriptive — it is what screen readers announce and what search engines index.

Which photo appears where:

| Registry key | Used by |
|---|---|
| `photos.*` | Home hero collage, page banners, service and article covers, gallery |
| `countryPhotos` | Destination cards and each `/study-in/[country]` banner — keyed by country slug |
| `servicePhotos` | Service cards and each `/services/[service]` banner — keyed by service slug |
| `galleryPhotos` | The `/gallery` grid, until you add your own (below) |

Article covers come from the post's `cover:` front matter if it has one,
otherwise a photo is picked to match the post's `category`.

---

## Adding photos to the gallery

1. Put image files in `public/gallery/`
2. Open `src/app/gallery/page.tsx` and add an entry to the `items` array:

```ts
const items: GalleryItem[] = [
  {
    src: "/gallery/send-off-2025.jpg",
    caption: "Student send-off, August 2025 intake",
    category: "Send-offs",
  },
];
```

While `items` is empty the gallery falls back to the placeholder set in
`src/lib/images.ts` and shows a small "these are placeholders" notice. Adding a
single real entry replaces the whole placeholder set and hides the notice.

---

## Contact form email

The enquiry form posts to `/api/contact`. **It works out of the box** — without
email credentials, enquiries are written to the Vercel runtime logs so nothing
is lost. To get them by email:

1. Sign up free at [resend.com](https://resend.com) and create an API key
2. Add your domain in Resend and verify the DNS records it gives you
3. Set these three environment variables (locally in `.env.local`, and in
   Vercel under **Settings → Environment Variables**):

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=info@vikasoverseas.com,admissions@vikasoverseas.com
CONTACT_FROM_EMAIL=Vikas Overseas <enquiries@vikasoverseas.com>
```

Until your domain is verified, use `onboarding@resend.dev` as the from address
for testing. `.env.example` has the template.

The form includes a honeypot field, so most bot submissions are dropped silently.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository:

   ```bash
   git init
   git add .
   git commit -m "Vikas Overseas website"
   git branch -M main
   git remote add origin https://github.com/<you>/vikas-overseas.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
   Vercel detects Next.js automatically — **no build settings to change.**

3. Add the three environment variables from the section above.

4. Deploy. Then under **Settings → Domains**, add `vikasoverseas.com` and point
   your DNS at Vercel as instructed.

5. Update `site.url` in `src/lib/site.ts` to the live domain and redeploy, so
   the sitemap and social preview tags use the right address.

Every push to `main` redeploys automatically.

---

## What's built in

- Fully responsive — mobile drawer nav, desktop mega-menu for Study In
- Floating WhatsApp button wired to +91 98493 03673
- SEO: per-page metadata, Open Graph tags, `sitemap.xml`, `robots.txt`,
  and `EducationalOrganization` structured data
- Accessibility: skip link, keyboard-navigable menus, focus states,
  reduced-motion support
- Google Maps embeds for both offices on the contact page
- 404 page

## Notes on the content

The content came from *Vikas Overseas.docx*. Two typos were corrected on the
way in: "EDUCTIONAL" → "Educational", and "TOFEL" → "TOEFL".

Italy's "Free Education & Accommodation*" claim carries an asterisk on the site
with the note that it is subject to eligibility and regional scholarship
schemes — worth reviewing so it reads the way you intend.

The three starter blog posts are drafts written from your service content.
Review them before launch, or replace them with your own.
