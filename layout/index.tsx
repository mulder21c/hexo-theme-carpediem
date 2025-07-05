import React from "react";
import DefaultButton from "@/components/atoms/Buttons/Default";
import type { LayoutProps } from "./index.d";

function Layout({ config, theme, url_for, head_content, body_content }: LayoutProps) {
  return (
    <html lang={config.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark light" />
        <link rel="stylesheet" href="css/style.css" />
        {theme?.favicon && <link rel="shortcut icon" href={url_for(theme?.favicon)} />}
        {/* head 블록에 해당하는 내용 */}
        {head_content}
      </head>
      <body>
        {/* main 블록에 해당하는 내용 */}
        {body_content}
        <DefaultButton size="large" appearance="fill">
          버튼 테스트
        </DefaultButton>
      </body>
    </html>
  );
}

export default Layout;
