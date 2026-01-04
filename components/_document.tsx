import type { DocumentProps } from "./_document.d";

function Document({ children, title, description, lang = "ko" }: DocumentProps) {
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="stylesheet" href="/css/index.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default Document;
