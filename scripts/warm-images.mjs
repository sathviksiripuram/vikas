/**
 * Warms the image cache after a deploy.
 *
 * Next generates each resized image on first request and caches the result.
 * Measured on this site, a warm variant is served in ~280ms; a cold one takes
 * ~1.8s because the transform runs first. Whoever visits a given page first
 * after a deploy pays that cost on every image at once, which is exactly what
 * "images load slowly on mobile" looks like.
 *
 * This walks the sitemap, collects every /_next/image URL each page asks for
 * (including all the srcset widths), and requests them so the cache is hot
 * before real visitors arrive.
 *
 *   node scripts/warm-images.mjs https://your-domain.com
 *
 * Run it after every production deploy.
 */

const BASE = (process.argv[2] || "").replace(/\/$/, "");
if (!BASE) {
  console.error("usage: node scripts/warm-images.mjs <base-url>");
  process.exit(1);
}

/** How many requests to keep in flight. Modest, to stay friendly to the host. */
const CONCURRENCY = 6;

async function text(url) {
  const res = await fetch(url, { headers: { "user-agent": "warm-images" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function pageUrls() {
  try {
    const xml = await text(`${BASE}/sitemap.xml`);
    // The sitemap is built from site.url, which may not be the host we are
    // warming (a preview deploy, or the placeholder domain before the real
    // one is wired up). Keep only the path and re-point it at BASE.
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try {
        return BASE + new URL(m[1]).pathname;
      } catch {
        return BASE + (m[1].startsWith("/") ? m[1] : `/${m[1]}`);
      }
    });
    if (locs.length) return [...new Set(locs)];
  } catch {
    // Fall through to a sensible default set.
  }
  return ["/", "/about", "/services", "/study-in", "/blog", "/gallery", "/news-events", "/contact"]
    .map((p) => BASE + p);
}

async function imageUrlsFor(pageUrl) {
  const html = await text(pageUrl);
  // Both the src fallback and every srcset candidate, so no width is missed.
  const found = [...html.matchAll(/\/_next\/image\?url=[^"'\s]+/g)].map((m) =>
    m[0].replace(/&amp;/g, "&").replace(/\\u0026/g, "&"),
  );
  return found;
}

async function run() {
  const pages = await pageUrls();
  console.log(`warming from ${pages.length} pages`);

  const all = new Set();
  for (const p of pages) {
    try {
      for (const u of await imageUrlsFor(p)) all.add(u);
    } catch (err) {
      console.warn(`  skipped ${p}: ${err.message}`);
    }
  }

  const list = [...all];
  console.log(`${list.length} image variants to warm`);

  let done = 0;
  let cold = 0;
  const started = Date.now();

  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (list.length) {
      const path = list.pop();
      const t0 = Date.now();
      try {
        const res = await fetch(BASE + path, { headers: { "user-agent": "warm-images" } });
        await res.arrayBuffer();
        if (Date.now() - t0 > 800) cold++;
      } catch {
        // A single failure should not stop the run.
      }
      done++;
      if (done % 25 === 0) process.stdout.write(`  ${done}/${done + list.length}\r`);
    }
  });

  await Promise.all(workers);
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`warmed ${done} variants in ${secs}s (${cold} were cold)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
