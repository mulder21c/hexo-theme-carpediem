# TypeScript and Naming Conventions

## TypeScript Requirements

- Keep `strict: true` and strict-family flags enabled.
- Do not use `any`; use `unknown` plus type guards.
- Exported/public utilities should declare explicit return types.
- Component props should be declared as a `Props` interface in a co-located `type.d.ts`.
- Preserve strict flags such as:
  - `noUnusedLocals`
  - `noUnusedParameters`
  - `noUncheckedIndexedAccess`
  - `noImplicitReturns`
  - `forceConsistentCasingInFileNames`

## Naming and File Conventions

- Use `PascalCase` for component names.
- Use `camelCase` for helpers and utilities.
- Omit `.ts`/`.tsx` extensions in imports.
- Use local barrel exports (`index.ts` / `index.tsx`) for split modules.
