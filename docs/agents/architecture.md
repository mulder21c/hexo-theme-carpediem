# Architecture and Project Layout

## Tech Stack

- React 19 (functional component SSR)
- TypeScript (`strict: true`)
- SCSS (Sass) + CSS Modules
- Vitest
- Storybook
- ESLint + Stylelint + Prettier
- Hexo
- Runtime dependencies: `classnames`, `feather-icons-react`
- Node.js 20+ (package type is CommonJS)

## Directory Structure

- `components/`: Atomic Design UI layer
- `components/atoms/`: Smallest UI units
- `components/molecules/`: Single-purpose combinations of atoms
- `components/organisms/`: Composite sections built from atoms/molecules
- `components/templates/`: Page-level layouts
- `components/context/`: Shared static context data (import via `@context/*`)
- `layout/`: Hexo-based layouts, SEO, and metadata placement
- `scripts/`: Hexo-related utility/build/deployment scripts
- `source/`: Hexo source content, assets, and theme-level config
- `source/css/`: Global styles, tokens, theme variables, helpers, and layers
- `.storybook/`: Storybook configuration and addons

## Layering and Imports

- Layer order is `atoms -> molecules -> organisms -> templates`.
- Imports are unidirectional downward only (no reverse references).
- Path aliases: `@components/*`, `@context/*`, `@layout/*`.
- Do not access browser globals in SSR/static render paths.

## Component Folder Conventions

- Use `index.tsx` as the public component entry.
- Co-locate `type.d.ts` for props/types.
- Use `index.module.scss` for component styles.
- Use `*.stories.tsx` for Storybook stories.
- Use `*.helper.ts` and `*.ui.ts` for split logic/render helpers as needed.
- Add a local barrel (`index.ts` / `index.tsx`) when folders are split by module.
