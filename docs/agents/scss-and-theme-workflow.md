# SCSS and Theme Workflow

## Scope

These rules apply to `*.scss` files in component/layout modules and global theme styles.

## CSS Modules and class naming

- Use one BEM block per module (`block__element`, `block--modifier`,`block__element--modifier`,), nested with Sass `&` from the block root.
- Strings passed to `classNames.bind(styles)` in TSX must match the class selectors defined in that module stylesheet.

## Color Token Source of Truth

- Define raw color scales/tokens in `source/css/modules/_variables.scss` (`$colors` map).
- Define semantic CSS variables in `source/css/base/_theme.scss` (`:root` and theme media queries).
- Component and layout styles must consume colors via CSS custom properties (`var(--...)`), not raw color literals.

## Color Addition Gate (Mandatory)

- If a required color is not already defined, do not invent or approximate a new color.
- Stop implementation and ask the user which color to add before editing the color system.

## Required Workflow for New Colors

When introducing a new color usage, follow this order:

1. Confirm the target color with the user if the color is not already defined.
2. Add or update the base token in `source/css/modules/_variables.scss`.
3. Generate the color scale so that lightness is evenly distributed from:
   - `0: #ffffff` (anchor only, do not store in `$colors`)
   - `1000: #000000` (anchor only, do not store in `$colors`)
   - `500`: base/reference color
4. Store only `50` through `950` in the `$colors` map (`0` and `1000` must not be included).
5. Expose the new palette values as semantic CSS variables in `source/css/base/_theme.scss`.
6. If needed, provide dark/high-contrast overrides in `_theme.scss` media query blocks.
7. Use only `var(--semantic-token)` in component/layout `index.module.scss`.

## Prohibited in Component/Layout SCSS

- Direct hex/rgb/hsl color literals (for example `#fff`, `rgb(...)`, `hsl(...)`).
- Direct use of Sass color helpers such as `color(...)` in component/layout module styles.
- Defining component-local hardcoded theme colors that bypass `_theme.scss`.
- Adding a new palette to `$colors` without explicit user confirmation of the base color.
- Including `0` or `1000` keys in the `$colors` map.

## Preferred Naming

- Use semantic names (for example `--btn-surface-primary`, `--text-primary`) rather than palette names in component styles.
- Keep component modules responsible for state/layout composition, while theme files own color values.
