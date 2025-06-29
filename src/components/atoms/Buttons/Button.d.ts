export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: "small" | "medium" | "large" | "fluid";
  appearance?: "fill" | "outline";
}
