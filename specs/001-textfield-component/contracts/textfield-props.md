# Contract: TextField Public Props

## Component

`TextField` is the public default export from `components/atoms/TextField/index.tsx`.

## Type Contract

```ts
import type { FeatherIconName } from "feather-icons-react";

export type TextFieldType = "text" | "password" | "search" | "url" | "email";
export type TextFieldVariant = "outlined" | "underlined";
export type TextFieldSize = "small" | "medium" | "large";

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "children" | "checked" | "defaultChecked"
  > {
  type?: TextFieldType;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  icon?: FeatherIconName;
  className?: string;
}
```

## Defaults

- `type`: `text`
- `variant`: `outlined`
- `size`: `medium`

## Public Prop Rules

- `type` accepts only `text`, `password`, `search`, `url`, and `email`.
- `variant` accepts only `outlined` and `underlined`.
- `size` accepts only `small`, `medium`, and `large`.
- `icon` accepts only a valid Feather icon name.
- No `invalid` prop is exposed.
- `aria-invalid` is forwarded to the native input and is the only invalid state source.
- Native text input attributes such as `name`, `value`, `defaultValue`, `placeholder`, `readOnly`, `disabled`, `id`, `aria-label`, and `aria-labelledby` are forwarded when present.

## Accessibility Contract

- TextField does not render an internal label.
- If `id`, `aria-label`, and `aria-labelledby` are all absent, TextField logs:

```text
[TextField] Provide id, aria-label, or aria-labelledby for accessibility.
```

- The warning is logged whenever the condition occurs.
- The component still renders after logging the warning.
- A leading icon is decorative for assistive technology and must not replace the accessible name.

## Visual State Contract

- `aria-invalid` with invalid truth semantics applies the invalid presentation.
- `disabled` takes visual precedence over invalid styling.
- `readOnly` uses default cursor treatment.
- `disabled` uses not-allowed cursor treatment.
- Focus uses the existing theme focus indicator.
- Focus indicator remains visible alongside invalid boundary treatment when the field is focused and invalid, unless disabled visual precedence applies.
- Text, placeholder, and icon must not overlap at any supported size or variant.
- Layout must not use `position:absolute`.

## Storybook Contract

Required Storybook stories:

- `Default`
- `ReadOnly`
- `OutlinedVariant`
- `UnderlinedVariant`
- `SizeVariants`
- `Disabled`
- `Invalid`

Each story must keep controls available for configurable props except the property fixed by that story. Focused state is manually verified against the theme focus style and is not a required Storybook story.
