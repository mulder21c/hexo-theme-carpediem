import type { ReactNode } from "react";

/**
 * @todo complete
 * Hexo site data containing posts, pages, categories, and tags.
 */
export interface HexoSite {
  /**
   * All posts
   */
  posts: HexoPost[];
  /**
   * All pages
   */
  pages: HexoPage[];
  /**
   * All categories
   */
  categories: HexoCategory[];
  /**
   * All tags
   */
  tags: HexoTag[];
  /**
   * All data
   */
  data: unknown;
  /**
   * Hexo logger
   */
  hexoLog?: HexoLog;
}

/**
 * Base page post data.
 */
export interface BasePagePost {
  /**
   * Article title
   */
  title: string;
  /**
   * Article created date
   */
  date: moment.Moment;
  /**
   * Article last updated date
   */
  updated: moment.Moment;
  /**
   * Comment enabled or not
   */
  comments: boolean;
  /**
   * Layout name
   */
  layout: string | false;
  /**
   * The full processed content of the article
   */
  content?: string;
  /**
   * The path of the source file
   */
  source: string;
  /**
   * The URL of the article without root URL.
   * We usually use url_for(page.path) in theme.
   */
  path: string;
  /**
   * The raw data of the article
   */
  raw: string;
  /**
   * Article excerpt
   */
  excerpt?: string;
  /**
   * Contents except article excerpt
   */
  more?: string;
  /**
   * Full path of the source file
   */
  full_source: string;
  /**
   * Full (encoded) URL of the article
   */
  permalink: string;
  /**
   * The photos of the article (Used in gallery posts)
   */
  photos?: string[];
  /**
   * The external link of the article (Used in link posts)
   */
  link?: string;
  /**
   * The language of the article
   */
  lang?: string;
  /**
   * @todo 아래 두 개는 확인 필요. 실제 데이터에서 안나오는 듯?
   */
  // /**
  //  * The language of the article
  //  */
  // language?: string;
  // /**
  //  * Base URL
  //  */
  // base?: string;
  /**
   * custom variables set in front-matter.
   */
  [key: string]: unknown;
}

export type HexoPage = BasePagePost;

/**
 * @todo complete
 * Hexo post data.
 */
export interface HexoPost extends BasePagePost {
  /**
   * The slug of the post
   */
  slug: string;
  /**
   * True if the post is not a draft
   */
  published: boolean;
  /**
   * All categories of the post
   */
  categories: HexoCategory[];
  /**
   * All tags of the post
   */
  tags: HexoTag[];
  /**
   * The path of the asset directory
   */
  asset_dir: string;
  /**
   * The previous post, `null` if the post is the first post
   */
  prev?: HexoPost | null;
  /**
   * The next post, `null` if the post is the last post
   */
  next?: HexoPost | null;
  /**
   * The canonical path of the post
   */
  canonical_path: string;
}

/**
 * Index page data.
 */
export interface HexoHomePage extends HexoPage {
  /**
   * Posts displayed per page
   */
  per_page?: number;
  /**
   * Total number of pages
   */
  total?: number;
  /**
   * 	Current page number
   */
  current?: number;
  /**
   * The URL of current page
   */
  current_url?: string;
  /**
   * Posts in this page
   */
  posts?: HexoPost[];
  /**
   * Previous page number. `0` if the current page is the first
   */
  prev?: number;
  /**
   * The URL of previous page. `''` if the current page is the first.
   */
  prev_link?: string;
  /**
   * Next page number. `0` if the current page is the last.
   */
  next?: number;
  /**
   * The URL of next page. `''` if the current page is the last.
   */
  next_link?: string;
}

/**
 * Archive page data.
 */
export interface HexoArchivePage extends HexoHomePage {
  /**
   * Equals true
   */
  archive?: boolean;
  /**
   * Archive year (4-digit)
   */
  year?: number;
  /**
   * Archive month (2-digit without leading zeros)
   */
  month?: number;
}

/**
 * Category page data.
 */
export interface HexoCategoryPage extends HexoHomePage {
  /**
   * Category name
   */
  category?: string;
}

export interface HexoTagPage extends HexoHomePage {
  /**
   * Tag name
   */
  tag?: string;
}

/**
 * Hexo category data.
 */
export interface HexoCategory {
  id?: string;
  name: string;
  parent?: string;
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
  id?: string;
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
  // Site
  title: string;
  subtitle: string;
  description: string;
  author: string;
  language: string;
  timezone: string;
  // URL
  url: string;
  root: string;
  permalink: string;
  permalink_defaults: Record<string, string>;
  pretty_urls: {
    trailing_index: boolean;
    trailing_html: boolean;
  };
  // Directory
  source_dir: string;
  public_dir: string;
  tag_dir: string;
  archive_dir: string;
  category_dir: string;
  code_dir: string;
  i18n_dir: string;
  skip_render: string[];
  // Writing
  new_post_name: string;
  default_layout: string;
  titlecase: boolean;
  external_link: {
    enable: boolean;
    field: "site" | "post";
    exclude: string[];
  };
  filename_case: number;
  render_drafts: boolean;
  post_asset_folder: boolean;
  relative_link: boolean;
  future: boolean;
  syntax_highlighter: string;
  highlight: {
    auto_detect: boolean;
    line_number: string;
    tab_replace: string;
    wrap: boolean;
    exclude_languages: string[];
    language_attr: boolean;
    hljs: boolean;
    line_threshold: number;
    first_line_number: string;
    strip_indent: boolean;
  };
  prismjs: {
    preprocess: boolean;
    line_number: boolean;
    tab_replace: string;
    exclude_languages: string[];
    strip_indent: boolean;
  };
  use_filename_as_post_title: boolean;
  // Category & Tag
  default_category: string;
  category_map: Record<string, string>;
  tag_map: Record<string, string>;
  // Date & Time format
  date_format: string;
  time_format: string;
  updated_option: "mtime" | "date" | "empty";
  // Pagination
  per_page: number;
  pagination_dir: string;
  // Extensions
  theme: string;
  server: {
    cache: boolean;
  };
  // Deployment
  deploy:
    | { type: string; [keys: string]: unknown }
    | { type: string; [keys: string]: unknown }[];
  // ignore files from processing
  ignore: string[];
  // Category & Tag
  meta_generator: true;
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
export interface HexoContextValue<TPage = HexoPage> extends HexoHelpers {
  site: HexoSite;
  page: TPage;
  config: HexoConfig;
  theme: HexoTheme;
  hexoLog: HexoLog;
}

/**
 * Props for HexoProvider component.
 */
export interface HexoProviderProps {
  value: HexoContextValue;
  children: ReactNode;
}
