declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare type MouseEventHandler = (event: MouseEvent) => void;
declare type FocusEventHandler = (event: FocusEvent) => void;
declare type NoArgVoidFunction = () => void;