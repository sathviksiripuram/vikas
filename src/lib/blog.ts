import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const NEWS_DIR = path.join(process.cwd(), "content", "news");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  cover?: string;
  content: string;
};

export type PostMeta = Omit<Post, "content">;

function readDir(dir: string): Post[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? "Untitled"),
        date: String(data.date ?? new Date().toISOString().slice(0, 10)),
        excerpt: String(data.excerpt ?? ""),
        author: String(data.author ?? "Vikas Overseas"),
        category: String(data.category ?? "General"),
        cover: data.cover ? String(data.cover) : undefined,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPosts = (): PostMeta[] =>
  readDir(BLOG_DIR).map(({ content: _content, ...meta }) => meta);

export const getPost = (slug: string): Post | undefined =>
  readDir(BLOG_DIR).find((p) => p.slug === slug);

export const getNews = (): PostMeta[] =>
  readDir(NEWS_DIR).map(({ content: _content, ...meta }) => meta);

export const getNewsItem = (slug: string): Post | undefined =>
  readDir(NEWS_DIR).find((p) => p.slug === slug);

export const renderMarkdown = (md: string): string =>
  marked.parse(md, { async: false }) as string;

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
