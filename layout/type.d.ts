import type { DocumentProps } from "@components/_document.d";

export interface IndexLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<DocumentProps, "title" | "description" | "lang"> {}
