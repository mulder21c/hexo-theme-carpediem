# Implementation Plan: TextField Component

**Branch**: `001-textfield-component` | **Date**: 2026-05-02 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/Volumes/workspace/Write/Hexo/themes/carpediem/specs/001-textfield-component/spec.md`  
**Constitution**: CarpeDiem Constitution v1.1.0

## Summary

Add a new SSR-safe `TextField` atom component that exposes only the supported text input purposes, provides outlined and underlined variants, supports small/medium/large sizes, optionally renders a leading Feather icon, reflects invalid state through `aria-invalid`, logs accessibility warnings for unlabeled instances, and documents the required Storybook stories. The implementation will follow the existing Atom folder pattern, use TypeScript prop unions to bound public configuration, add semantic TextField theme tokens backed by existing palettes, keep focus verification out of required Storybook stories per clarification, and ship tests before implementation per the constitution.

## Technical Context

**Language/Version**: TypeScript 5.x with React 19.x JSX  
**Primary Dependencies**: React 19.x, classnames, feather-icons-react, SCSS Modules, HexoContext logger  
**Storage**: N/A  
**Testing**: Vitest, Testing Library, Storybook stories, ESLint, Stylelint, Prettier, TypeScript typecheck  
**Target Platform**: Hexo SSR theme rendered through React server-side output and reviewed in Storybook  
**Project Type**: React SSR UI component atom  
**Performance Goals**: Pure prop-driven render with no browser globals, no mutable state, and no layout overlap across all supported variants/sizes/states  
**Constraints**: WCAG AA, no internal label, public prop type restriction for input purpose, no `invalid` prop, `aria-invalid` drives invalid semantics, disabled visual state takes precedence, focused invalid state keeps the theme focus indicator unless disabled, required Storybook stories exclude focused state, no `position:absolute`, no new runtime dependency, no new color palette without approval  
**Scale/Scope**: One new Atom component folder plus unit tests, Storybook stories, optional TextField semantic theme tokens, and feature design artifacts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. SSR-First Rendering**: PASS. TextField will be a functional component, avoid browser globals, and avoid client routing/Suspense.
- **II. Accessibility by Default**: PASS. The plan preserves semantic `<input>` markup, supports external labels/accessibility names, logs missing accessible-name warnings, forwards ARIA state, and keeps focus visibility testable.
- **III. Strict Type Safety**: PASS. Public props will be declared in `type.d.ts` with literal unions and without `any`; `invalid` remains absent from the public prop contract.
- **IV. Atomic Design Architecture**: PASS. Files are scoped to `components/atoms/TextField/` with `index.tsx`, `type.d.ts`, `index.module.scss`, `index.stories.tsx`, and local tests.
- **V. Stateless Prop-Driven Components**: PASS. TextField is controlled by props/native input attributes and does not add mutable React state.
- **VI. Clean Code Discipline**: PASS. The implementation stays within one component and introduces helpers only if repeated logic emerges.
- **VII. Automated Quality Gates**: PASS. Planned verification includes `npm run lint`, `npm test`, coverage, and Storybook build validation.
- **VIII. Test-Driven Delivery and Feature Coverage Discipline**: PASS. Unit tests are planned before implementation, with RED verification and coverage reporting for the feature unit.

## Project Structure

### Documentation (this feature)

```text
specs/001-textfield-component/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── textfield-props.md
└── tasks.md
```

### Source Code (repository root)

```text
components/
└── atoms/
    └── TextField/
        ├── __tests__/
        │   └── index.test.tsx
        ├── index.module.scss
        ├── index.stories.tsx
        ├── index.tsx
        └── type.d.ts

source/
└── css/
    └── base/
        └── _theme.scss
```

**Structure Decision**: Implement TextField as a new Atom because it is a single reusable form control. Keep render, styles, public types, stories, and tests co-located. Update `source/css/base/_theme.scss` only for semantic TextField tokens backed by existing `green`, `mintgreen`, `scarlet`, and `neutral` palettes; do not add a new palette.

## Complexity Tracking

No constitution violations are required. No additional runtime dependency, architectural layer, or cross-component abstraction is planned.

## Phase 0: Research Output

Research decisions are recorded in [research.md](./research.md). All technical context decisions are resolved.

## Phase 1: Design Output

Design artifacts:

- [data-model.md](./data-model.md)
- [contracts/textfield-props.md](./contracts/textfield-props.md)
- [quickstart.md](./quickstart.md)

## Post-Design Constitution Check

- **I. SSR-First Rendering**: PASS. The design uses a pure functional component and native input semantics without browser globals.
- **II. Accessibility by Default**: PASS. The contract requires external label composition or accessible names, specifies warning behavior for missing identifiers, and keeps focus visibility in unit/style verification.
- **III. Strict Type Safety**: PASS. The prop contract restricts supported input purposes and omits unsupported/native-conflicting props plus the forbidden `invalid` prop.
- **IV. Atomic Design Architecture**: PASS. The file plan matches the required Atom directory shape.
- **V. Stateless Prop-Driven Components**: PASS. Derived visual state comes from props/attributes only.
- **VI. Clean Code Discipline**: PASS. No abstraction beyond the component boundary is introduced.
- **VII. Automated Quality Gates**: PASS. Quickstart includes lint, tests, coverage, and Storybook build gates.
- **VIII. Test-Driven Delivery and Feature Coverage Discipline**: PASS. Quickstart begins with failing unit tests and includes coverage verification.
