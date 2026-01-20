export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level
   * @default 1
   * @example
   * <Heading level={1}>Heading 1</Heading>
   * <Heading level={2}>Heading 2</Heading>
   * <Heading level={3}>Heading 3</Heading>
   * <Heading level={4}>Heading 4</Heading>
   * <Heading level={5}>Heading 5</Heading>
   * <Heading level={6}>Heading 6</Heading>
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
