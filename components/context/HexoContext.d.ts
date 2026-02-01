import type { ReactNode } from "react";

/**
 * Hexo site data containing posts, pages, categories, and tags.
 */
export interface HexoSite {
  posts: HexoPost[];
  pages: HexoPage[];
  categories: HexoCategory[];
  tags: HexoTag[];
  hexoLog?: HexoLog;
}

/**
 * Hexo post data.
 */
export interface HexoPost {
  title: string;
  date: Date;
  updated: Date;
  content: string;
  excerpt: string;
  slug: string;
  path: string;
  permalink: string;
  categories: HexoCategory[];
  tags: HexoTag[];
  [key: string]: unknown;
}

/**
 * Hexo page data.
 */
export interface HexoPage {
  title: string;
  date: Date;
  updated: Date;
  content: string;
  path: string;
  permalink: string;
  [key: string]: unknown;
}

/**
 * Hexo category data.
 */
export interface HexoCategory {
  name: string;
  slug: string;
  path: string;
  permalink: string;
  posts: HexoPost[];
  length: number;
}

/**
 * Hexo tag data.
 */
export interface HexoTag {
  name: string;
  slug: string;
  path: string;
  permalink: string;
  posts: HexoPost[];
  length: number;
}

/**
 * Hexo site configuration from _config.yml.
 */
export interface HexoConfig {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  language: string;
  timezone: string;
  url: string;
  root: string;
  permalink: string;
  [key: string]: unknown;
}

/**
 * Hexo theme configuration from theme's _config.yml.
 */
export interface HexoTheme {
  [key: string]: unknown;
}

/**
 * Hexo logger from hexo-log local.
 */
export interface HexoLog {
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

/**
 * Current page context data.
 */
export interface HexoPageContext {
  title?: string;
  description?: string;
  content?: string;
  date?: Date;
  updated?: Date;
  path: string;
  permalink: string;
  [key: string]: unknown;
}

// ============================================================================
// Helper Option Types
// ============================================================================

/**
 * Options for url_for helper.
 */
export interface UrlForOptions {
  relative?: boolean;
}

/**
 * Options for gravatar helper.
 */
export interface GravatarOptions {
  s?: number;
  d?: string;
  f?: string;
  r?: string;
}

/**
 * Options for css/js helper with custom attributes.
 */
export interface AssetOptions {
  href?: string;
  src?: string;
  integrity?: string;
  async?: boolean;
  defer?: boolean;
  [key: string]: unknown;
}

/**
 * Options for link_to helper.
 */
export interface LinkToOptions {
  external?: boolean;
  class?: string;
  id?: string;
}

/**
 * Options for mail_to helper.
 */
export interface MailToOptions {
  class?: string;
  id?: string;
  subject?: string;
  cc?: string;
  bcc?: string;
  body?: string;
}

/**
 * Options for image_tag helper.
 */
export interface ImageTagOptions {
  alt?: string;
  class?: string;
  id?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * Options for feed_tag helper.
 */
export interface FeedTagOptions {
  title?: string;
  type?: string;
}

/**
 * Options for truncate helper.
 */
export interface TruncateOptions {
  length?: number;
  separator?: string;
  omission?: string;
}

/**
 * Options for list_categories helper.
 */
export interface ListCategoriesOptions {
  orderby?: string;
  order?: 1 | -1 | "asc" | "desc";
  show_count?: boolean;
  style?: "list" | false;
  separator?: string;
  depth?: number;
  class?: string;
  transform?: (name: string) => string;
  suffix?: string;
}

/**
 * Options for list_tags helper.
 */
export interface ListTagsOptions {
  orderby?: string;
  order?: 1 | -1 | "asc" | "desc";
  show_count?: boolean;
  style?: "list" | false;
  separator?: string;
  class?: string | ListTagsClassOptions;
  transform?: (name: string) => string;
  amount?: number;
  suffix?: string;
}

/**
 * Class options for list_tags helper.
 */
export interface ListTagsClassOptions {
  ul?: string;
  li?: string;
  a?: string;
  label?: string;
  count?: string;
}

/**
 * Options for list_archives helper.
 */
export interface ListArchivesOptions {
  type?: "yearly" | "monthly";
  order?: 1 | -1 | "asc" | "desc";
  show_count?: boolean;
  format?: string;
  style?: "list" | false;
  separator?: string;
  class?: string;
  transform?: (name: string) => string;
}

/**
 * Options for list_posts helper.
 */
export interface ListPostsOptions {
  orderby?: string;
  order?: 1 | -1 | "asc" | "desc";
  style?: "list" | false;
  separator?: string;
  class?: string;
  amount?: number;
  transform?: (name: string) => string;
}

/**
 * Options for tagcloud helper.
 */
export interface TagcloudOptions {
  min_font?: number;
  max_font?: number;
  unit?: string;
  amount?: number;
  orderby?: string;
  order?: 1 | -1 | "asc" | "desc";
  color?: boolean;
  start_color?: string;
  end_color?: string;
  class?: string;
  level?: number;
  show_count?: boolean;
  count_class?: string;
}

/**
 * Options for paginator helper.
 */
export interface PaginatorOptions {
  base?: string;
  format?: string;
  total?: number;
  current?: number;
  prev_text?: string;
  next_text?: string;
  space?: string;
  prev_next?: boolean;
  end_size?: number;
  mid_size?: number;
  show_all?: boolean;
  escape?: boolean;
  page_class?: string;
  current_class?: string;
  space_class?: string;
  prev_class?: string;
  next_class?: string;
  force_prev_next?: boolean;
}

/**
 * Options for search_form helper.
 */
export interface SearchFormOptions {
  class?: string;
  text?: string;
  button?: boolean | string;
}

/**
 * Options for number_format helper.
 */
export interface NumberFormatOptions {
  precision?: number | false;
  delimiter?: string;
  separator?: string;
}

/**
 * Options for open_graph helper.
 */
export interface OpenGraphOptions {
  title?: string;
  type?: string;
  url?: string;
  image?: string | string[];
  author?: string;
  date?: Date | string;
  updated?: Date | string;
  language?: string;
  site_name?: string;
  description?: string;
  twitter_card?: string;
  twitter_id?: string;
  twitter_site?: string;
  twitter_image?: string;
  google_plus?: string;
  fb_admins?: string;
  fb_app_id?: string;
}

/**
 * Options for toc helper.
 */
export interface TocOptions {
  class?: string;
  class_item?: string;
  class_link?: string;
  class_text?: string;
  class_child?: string;
  class_number?: string;
  class_level?: string;
  list_number?: boolean;
  max_depth?: number;
  min_depth?: number;
  max_items?: number;
}

// ============================================================================
// Helper Function Types
// ============================================================================

/**
 * URL helper functions.
 */
export interface HexoUrlHelpers {
  url_for: (path: string, options?: UrlForOptions) => string;
  relative_url: (from: string, to: string) => string;
  full_url_for: (path: string) => string;
  gravatar: (email: string, options?: number | GravatarOptions) => string;
}

/**
 * HTML tag helper functions.
 */
export interface HexoHtmlHelpers {
  css: (...paths: (string | AssetOptions | (string | AssetOptions)[])[]) => string;
  js: (...paths: (string | AssetOptions | (string | AssetOptions)[])[]) => string;
  link_to: (path: string, text?: string, options?: LinkToOptions) => string;
  mail_to: (email: string, text?: string, options?: MailToOptions) => string;
  image_tag: (path: string, options?: ImageTagOptions) => string;
  favicon_tag: (path: string) => string;
  feed_tag: (path?: string, options?: FeedTagOptions) => string;
}

/**
 * Conditional helper functions.
 */
export interface HexoConditionalHelpers {
  is_current: (path: string, strict?: boolean) => boolean;
  is_home: () => boolean;
  is_home_first_page: () => boolean;
  is_post: () => boolean;
  is_page: () => boolean;
  is_archive: () => boolean;
  is_year: () => boolean;
  is_month: () => boolean;
  is_category: (category?: string) => boolean;
  is_tag: (tag?: string) => boolean;
}

/**
 * String manipulation helper functions.
 */
export interface HexoStringHelpers {
  trim: (str: string) => string;
  strip_html: (str: string) => string;
  titlecase: (str: string) => string;
  markdown: (str: string) => string;
  render: (str: string, engine: string, options?: Record<string, unknown>) => string;
  word_wrap: (str: string, length?: number) => string;
  truncate: (str: string, options?: TruncateOptions) => string;
  escape_html: (str: string) => string;
}

/**
 * Date and time helper functions.
 */
export interface HexoDateHelpers {
  date: (date: Date | string | number, format?: string) => string;
  date_xml: (date: Date | string | number) => string;
  time: (date: Date | string | number, format?: string) => string;
  full_date: (date: Date | string | number, format?: string) => string;
  relative_date: (date: Date | string | number) => string;
  time_tag: (date: Date | string | number, format?: string) => string;
  moment: typeof import("moment");
}

/**
 * List helper functions.
 */
export interface HexoListHelpers {
  list_categories: (
    categories?: HexoCategory[],
    options?: ListCategoriesOptions,
  ) => string;
  list_tags: (tags?: HexoTag[], options?: ListTagsOptions) => string;
  list_archives: (options?: ListArchivesOptions) => string;
  list_posts: (options?: ListPostsOptions) => string;
  tagcloud: (tags?: HexoTag[], options?: TagcloudOptions) => string;
}

/**
 * Miscellaneous helper functions.
 */
export interface HexoMiscHelpers {
  paginator: (options?: PaginatorOptions) => string;
  search_form: (options?: SearchFormOptions) => string;
  number_format: (num: number, options?: NumberFormatOptions) => string;
  meta_generator: () => string;
  open_graph: (options?: OpenGraphOptions) => string;
  toc: (content: string, options?: TocOptions) => string;
}

/**
 * Template helper functions.
 */
export interface HexoTemplateHelpers {
  partial: (
    layout: string,
    locals?: Record<string, unknown>,
    options?: { cache?: boolean; only?: boolean },
  ) => string;
  fragment_cache: (id: string, fn: () => string) => string;
}

/**
 * All Hexo helper functions combined.
 */
export type HexoHelpers = HexoUrlHelpers &
  HexoHtmlHelpers &
  HexoConditionalHelpers &
  HexoStringHelpers &
  HexoDateHelpers &
  HexoListHelpers &
  HexoMiscHelpers &
  HexoTemplateHelpers;

/**
 * Complete Hexo context value passed from renderer.
 */
export interface HexoContextValue extends HexoHelpers {
  site: HexoSite;
  page: HexoPageContext;
  config: HexoConfig;
  theme: HexoTheme;
  path: string;
  url: string;
  hexoLog: HexoLog;
}

/**
 * Props for HexoProvider component.
 */
export interface HexoProviderProps {
  value: HexoContextValue;
  children: ReactNode;
}
