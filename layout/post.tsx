import PostTemplate from "@components/templates/post";
import type { PostLayoutProps } from "./type";

function PostLayout({ config: { language, description: configDescription }, page }: PostLayoutProps) {
  const title = page.title;
  const description = configDescription ?? "";

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <link rel="stylesheet" href="/css/index.css" />
      </head>
      <body>
        <PostTemplate />
      </body>
    </html>
  );
}

export default PostLayout;
