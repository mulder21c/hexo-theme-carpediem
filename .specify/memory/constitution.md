<!--
  === Sync Impact Report ===
  Version change: N/A → 1.0.0 (initial creation)

  Added principles:
    I.   SSR-First Rendering
    II.  Accessibility by Default
    III. Strict Type Safety
    IV.  Atomic Design Architecture
    V.   Stateless Prop-Driven Components
    VI.  Clean Code Discipline
    VII. Automated Quality Gates

  Added sections:
    - Core Principles (7 principles)
    - Technology Constraints
    - Development Workflow
    - Governance

  Removed sections: (none — initial creation)

  Templates requiring updates:
    .specify/templates/plan-template.md       ✅ aligned (dynamic Constitution Check)
    .specify/templates/spec-template.md       ✅ aligned (no constitution refs)
    .specify/templates/tasks-template.md      ✅ aligned (no constitution refs)
    .specify/templates/checklist-template.md  ✅ aligned (no constitution refs)
    .specify/templates/agent-file-template.md ✅ aligned (no constitution refs)
    .cursor/commands/speckit.plan.md          ✅ aligned (refs constitution path)
    .cursor/commands/speckit.analyze.md       ✅ aligned (refs constitution path)
    .cursor/commands/speckit.constitution.md  ✅ aligned (refs constitution path)

  Follow-up TODOs: (none)
-->

# CarpeDiem Constitution

## Core Principles

### I. SSR-First Rendering

- All components MUST be functional components; class components
  are prohibited.
- Browser-specific globals (`window`, `document`, `navigator`)
  MUST NOT appear in render paths.
- Only SSR-safe React hooks are permitted; verify safety via
  React documentation before use. Default to pure functions.
- Client-side routing (e.g., `BrowserRouter`) is prohibited;
  use static links and anchors exclusively.
- Suspense MUST only be used for static fallbacks.

**Rationale**: Hexo themes render server-side. Browser APIs cause
hydration failures and runtime errors in the SSR pipeline.

### II. Accessibility by Default

- All markup MUST meet WCAG 2.1 Level AA conformance.
- Semantic HTML elements MUST be used over generic `div`/`span`
  when a semantic equivalent exists.
- All images MUST include descriptive `alt` text (or `alt=""`
  for decorative images with an appropriate ARIA role).
- ARIA attributes MUST be applied when semantic HTML alone cannot
  convey meaning, relationships, or state.
- `eslint-plugin-jsx-a11y` MUST remain enabled with zero
  suppressed rules.

**Rationale**: Accessibility is a fundamental quality attribute.
Every user, regardless of ability, MUST be able to consume the
blog content.

### III. Strict Type Safety

- TypeScript `strict: true` MUST be enabled; loosening any
  strict-family flag is prohibited.
- The `any` type MUST NOT be used; use `unknown` with type
  guards instead.
- All exported functions MUST have explicit return type
  annotations.
- All component props MUST be declared via named `Props`
  interfaces in co-located `type.d.ts` files.
- Additional compiler checks (`noUnusedLocals`,
  `noUnusedParameters`, `noUncheckedIndexedAccess`,
  `noImplicitReturns`, `forceConsistentCasingInFileNames`)
  MUST remain enabled.

**Rationale**: Static type safety prevents runtime errors and
serves as living documentation for component contracts.

### IV. Atomic Design Architecture

- Components MUST be organized into atoms, molecules, organisms,
  templates, and context layers under `components/`.
- Path aliases (`@components/*`, `@context/*`, `@layout/*`)
  MUST be used for cross-directory imports.
- Each component MUST reside in a directory containing at minimum
  its `index.tsx`, `index.module.scss`, and `type.d.ts` files.
- Cross-layer imports MUST flow downward only: templates →
  organisms → molecules → atoms. Context is accessible from
  any layer.

**Rationale**: Consistent structure enables discoverability,
enforces separation of concerns, and scales predictably.

### V. Stateless Prop-Driven Components

- State management hooks (`useState`, `useReducer`, `useContext`
  for mutable state) MUST NOT be used in components.
- Event handler props (`onClick`, `onChange`, `onSubmit`) MUST
  NOT be attached to rendered elements.
- All component data MUST be received through props exclusively.
- Prop drilling is the accepted data-passing pattern; context
  providers are limited to static configuration data.

**Rationale**: SSR components produce static HTML. Interactivity
belongs to client scripts outside the React rendering layer.

### VI. Clean Code Discipline

- Functions MUST follow Single Responsibility Principle: one
  function, one purpose.
- Hard-coded values MUST be replaced with named constants that
  explain the value's purpose.
- Variable, function, and class names MUST reveal intent;
  abbreviations are prohibited unless universally understood.
- Code MUST NOT be duplicated; repeated logic MUST be extracted
  into reusable functions.
- Comments MUST explain "why," never "what"; self-documenting
  code is the standard.
- Nested conditionals MUST be moved into well-named functions.

**Rationale**: Clean code reduces cognitive load and long-term
maintenance cost.

### VII. Automated Quality Gates

- ESLint MUST pass with zero errors before merge; warnings
  SHOULD be resolved.
- Stylelint MUST pass for all `.css`, `.scss`, `.sass`, `.less`
  files with zero violations.
- Prettier formatting MUST be enforced; unformatted code MUST
  NOT be merged.
- Jest/Vitest test suites MUST pass; new components SHOULD
  include unit tests.
- Storybook stories MUST render without errors for all visual
  components.
- TypeScript compilation (`tsc --noEmit`) MUST succeed with
  zero diagnostics.

**Rationale**: Automated gates prevent quality regression and
reduce manual review burden.

## Technology Constraints

- **Runtime**: React 19.x with `react-dom` for server-side
  rendering via Hexo's JSX renderer.
- **Language**: TypeScript 5.x with strict configuration.
- **Styling**: SCSS with CSS Modules (`*.module.scss`);
  PostCSS with Autoprefixer and cssnano for production.
- **Production dependencies** are limited to: `react`,
  `react-dom`, `classnames`, `feather-icons-react`. Adding
  new runtime dependencies requires explicit justification.
- **Module system**: CommonJS (`"type": "commonjs"`) for Hexo
  compatibility; ESNext modules within TypeScript source via
  bundler module resolution.
- **Node target**: ES2020.

## Development Workflow

- **Linting**: `npm run lint` (ESLint + Stylelint + Prettier)
  MUST pass before every commit.
- **Type checking**: `tsc --noEmit` MUST succeed.
- **Testing**: `npm test` runs Jest; tests MUST pass before
  merge.
- **Component development**: Storybook (`npm run storybook`)
  is the primary environment for building and documenting
  components in isolation.
- **Branch strategy**: Feature branches off `ver3.0/develop`;
  PRs require passing all quality gates.
- **Commit style**: Conventional Commits
  (`type: description`); small, focused commits.

## Governance

- This constitution supersedes all conflicting practices,
  guidelines, or ad-hoc decisions.
- Amendments MUST be submitted as a dedicated PR with an
  explicit MAJOR/MINOR/PATCH classification:
  - **MAJOR**: Principle removal, redefinition, or backward-
    incompatible governance change.
  - **MINOR**: New principle or section added, or materially
    expanded guidance.
  - **PATCH**: Clarifications, wording, typo fixes, or
    non-semantic refinements.
- All `.specify/` documents MUST reference the active
  constitution version.
- A template alignment check MUST occur after every amendment
  to ensure consistency across plan, spec, tasks, checklist,
  and command templates.
- Every PR and spec analysis (`/speckit.analyze`) MUST verify
  adherence to all MUST-level principles.

**Version**: 1.0.0 | **Ratified**: 2026-02-22 | **Last Amended**: 2026-02-22
