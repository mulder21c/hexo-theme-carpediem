import React from "react";
import DefaultButton from "@/components/atoms/Buttons/Default";

interface LayoutProps {
  config: {
    language: string;
  };
  theme: {
    favicon?: string;
  };
  url_for: (path: string) => string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page?: any;
  head_content?: React.ReactNode;
  body_content?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  config,
  theme,
  url_for,
  head_content,
  body_content,
}) => {
  // doctype은 renderToString으로 React 컴포넌트를 HTML로 변환할 때 자동으로 추가됩니다.
  // 하지만 명시적으로 추가하려면 아래와 같이 dangerouslySetInnerHTML을 사용할 수 있습니다.

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
};

export default Layout;
