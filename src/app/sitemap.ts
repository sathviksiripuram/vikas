import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { countries } from "@/lib/countries";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/study-in", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/news-events", priority: 0.6 },
    { path: "/blog", priority: 0.7 },
    { path: "/gallery", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const countryRoutes = countries.map((c) => ({
    url: `${base}/study-in/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = getPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...serviceRoutes, ...postRoutes];
}
