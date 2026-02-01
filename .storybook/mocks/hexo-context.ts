import type { HexoContextValue } from "../../components/context";

const originUrl = new URL(import.meta.url).origin;

/**
 * Mock Hexo context value for Storybook.
 * Provides default values and simple mock implementations of helper functions.
 */
const mockHexoLog = {
  info: (...args: unknown[]) => console.log("[hexoLog]", ...args),
  warn: (...args: unknown[]) => console.warn("[hexoLog]", ...args),
  error: (...args: unknown[]) => console.error("[hexoLog]", ...args),
  debug: (...args: unknown[]) => console.debug("[hexoLog]", ...args),
};

export const mockHexoContext: HexoContextValue = {
  // Site data
  site: {
    posts: [],
    pages: [],
    categories: [],
    tags: [],
    hexoLog: mockHexoLog,
  },

  // Current page context
  page: {
    title: "Storybook Page",
    description: "A page rendered in Storybook",
    content: "",
    path: "/",
    permalink: `${originUrl}/`,
  },

  // Site configuration
  config: {
    title: "Storybook Site",
    subtitle: "Development Environment",
    description: "Hexo theme development with Storybook",
    author: "Developer",
    language: "ko",
    timezone: "Asia/Seoul",
    url: originUrl,
    root: "/",
    permalink: ":year/:month/:day/:title/",
  },

  // Theme configuration
  theme: {},

  // Current path and URL
  path: "/",
  url: `{originUrl}/`,
  hexoLog: mockHexoLog,

  // URL helpers
  url_for: (path: string) => path,
  relative_url: (_from: string, to: string) => to,
  full_url_for: (path: string) => `${originUrl}${path}`,
  gravatar: (email: string, options?: number | { s?: number }) => {
    const size = typeof options === "number" ? options : (options?.s ?? 80);
    return `https://www.gravatar.com/avatar/${email}?s=${size}`;
  },

  // HTML tag helpers
  css: (...paths: unknown[]) => {
    return paths
      .flat()
      .map((p) => {
        const href = typeof p === "string" ? p : ((p as { href?: string }).href ?? "");
        return `<link rel="stylesheet" href="${href}">`;
      })
      .join("\n");
  },
  js: (...paths: unknown[]) => {
    return paths
      .flat()
      .map((p) => {
        const src = typeof p === "string" ? p : ((p as { src?: string }).src ?? "");
        return `<script src="${src}"></script>`;
      })
      .join("\n");
  },
  link_to: (path: string, text?: string) => `<a href="${path}">${text ?? path}</a>`,
  mail_to: (email: string, text?: string) =>
    `<a href="mailto:${email}">${text ?? email}</a>`,
  image_tag: (path: string, options?: { alt?: string }) =>
    `<img src="${path}" alt="${options?.alt ?? ""}">`,
  favicon_tag: (path: string) => `<link rel="icon" href="${path}">`,
  feed_tag: (path = "/atom.xml") =>
    `<link rel="alternate" href="${path}" type="application/atom+xml">`,

  // Conditional helpers
  is_current: () => false,
  is_home: () => true,
  is_home_first_page: () => true,
  is_post: () => false,
  is_page: () => false,
  is_archive: () => false,
  is_year: () => false,
  is_month: () => false,
  is_category: () => false,
  is_tag: () => false,

  // String manipulation helpers
  trim: (str: string) => str.trim(),
  strip_html: (str: string) => str.replace(/<[^>]*>/g, ""),
  titlecase: (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    ),
  markdown: (str: string) => str,
  render: (str: string) => str,
  word_wrap: (str: string) => str,
  truncate: (str: string, options?: { length?: number; omission?: string }) => {
    const length = options?.length ?? 30;
    const omission = options?.omission ?? "...";
    return str.length > length
      ? str.substring(0, length - omission.length) + omission
      : str;
  },
  escape_html: (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;"),

  // Date helpers
  date: (date: Date | string | number) => new Date(date).toLocaleDateString("ko-KR"),
  date_xml: (date: Date | string | number) => new Date(date).toISOString(),
  time: (date: Date | string | number) => new Date(date).toLocaleTimeString("ko-KR"),
  full_date: (date: Date | string | number) => new Date(date).toLocaleString("ko-KR"),
  relative_date: () => "방금 전",
  time_tag: (date: Date | string | number) => {
    const d = new Date(date);
    return `<time datetime="${d.toISOString()}">${d.toLocaleDateString("ko-KR")}</time>`;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moment: (() => new Date()) as any,

  // List helpers
  list_categories: () => "",
  list_tags: () => "",
  list_archives: () => "",
  list_posts: () => "",
  tagcloud: () => "",

  // Miscellaneous helpers
  paginator: () => "",
  search_form: () => '<form class="search-form"><input type="search"></form>',
  number_format: (num: number) => num.toLocaleString(),
  meta_generator: () => '<meta name="generator" content="Hexo (Storybook)">',
  open_graph: () => "",
  toc: () => "",

  // Template helpers
  partial: () => "",
  fragment_cache: (_id: string, fn: () => string) => fn(),
};
