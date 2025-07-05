import type React from "react";

export interface LayoutProps {
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
