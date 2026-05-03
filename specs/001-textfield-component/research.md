# Research: TextField Component

## Decision: Place TextField in `components/atoms/TextField`

**Rationale**: TextField is a primitive single-purpose input control, matching the repository's Atom layer conventions. Existing Atom folders co-locate `index.tsx`, `type.d.ts`, `index.module.scss`, `index.stories.tsx`, and local unit tests.

**Alternatives considered**:

- Add TextField under molecules: rejected because the component does not compose multiple independent controls.
- Add TextField to an existing form folder: rejected because no shared form-control folder exists and this would introduce a new architecture pattern.

## Decision: Use a semantic wrapper around a native `<input>`

**Rationale**: A wrapper can own the visual boundary and leading icon while preserving the native input for semantics and form behavior. This also allows the icon to sit inside the field boundary without `position:absolute`.

**Alternatives considered**:

- Style the native input directly: rejected because a native input cannot contain a leading icon inside its border.
- Use `position:absolute` for icon placement: rejected by the clarified feature requirement.

## Decision: Bound the public prop contract with TypeScript unions

**Rationale**: Unsupported input purposes must be unavailable through public configuration. A restricted `TextFieldType` union prevents unsupported values at authoring time and avoids fallback behavior not requested by the spec.

**Alternatives considered**:

- Accept all native input types and warn at runtime: rejected because the spec requires only the supported purposes to be available.
- Accept unsupported types and fall back to `text`: rejected because fallback behavior would create an undocumented branch.

## Decision: Do not add an `invalid` prop

**Rationale**: The spec assigns invalid ownership to external validation logic and requires the visual invalid state to derive from `aria-invalid`. The component should forward ARIA attributes and style based on `aria-invalid` instead of introducing another invalid state source.

**Alternatives considered**:

- Add `invalid?: boolean`: rejected because it duplicates `aria-invalid` and conflicts with the product requirement.
- Infer invalid from native validity APIs: rejected because validity is owned by external logic and SSR render paths should stay deterministic.

## Decision: Use `HexoContext` logger for accessibility warnings

**Rationale**: Existing components such as Switch and Checkbox use `hexoLog.warn` for accessibility warnings. Reusing the logger keeps warnings aligned with the Hexo theme runtime and test mocking patterns.

**Alternatives considered**:

- Use `console.warn`: rejected because it would diverge from current component logging conventions.
- Suppress warning outside development: rejected because the clarified spec requires warning whenever the condition occurs.

## Decision: Treat explicit `id`, `aria-label`, and `aria-labelledby` as accessible-name inputs

**Rationale**: TextField intentionally does not render an internal label. An explicit `id` enables an external label relationship, while `aria-label` and `aria-labelledby` provide direct accessible names. Missing all three is the specified warning condition.

**Alternatives considered**:

- Auto-generate an `id` to satisfy the check: rejected because an generated id cannot be referenced by an external label known outside the component.
- Require `aria-label` even when `id` is provided: rejected because external label composition via `id` is explicitly supported.

## Decision: Use semantic TextField CSS variables backed by existing color palettes

**Rationale**: The repository requires component SCSS to consume semantic CSS variables and already defines green, mintgreen, scarlet, and neutral palettes. TextField can add semantic variables in `_theme.scss` without introducing a new palette.

**Alternatives considered**:

- Use raw color literals in `index.module.scss`: rejected by SCSS workflow rules.
- Add a new color palette: rejected because existing palettes cover the required green, scarlet, neutral, dark-mode, and high-contrast needs.

## Decision: Use CSS state selectors for visual states

**Rationale**: `readOnly`, `disabled`, focus, and `aria-invalid` are present on the native input. Styling can derive from those attributes and pseudo-classes without React state, preserving SSR and stateless requirements.

**Alternatives considered**:

- Add internal state for focus/invalid: rejected by stateless component constraints.
- Add helper logic for every visual state: rejected because the native attributes are already sufficient.

## Decision: Test the public render contract before implementation

**Rationale**: The constitution requires TDD and feature coverage discipline. Tests should first cover default props, supported type forwarding, variant/size class mapping, icon rendering, warning behavior, `aria-invalid`, disabled precedence, and native prop forwarding.

**Alternatives considered**:

- Rely on Storybook stories only: rejected because Storybook does not replace unit tests.
- Test only visual snapshots: rejected because the primary contract is semantic markup and props-to-DOM behavior.

## Decision: Use Storybook stories as the canonical usage examples

**Rationale**: The feature clarification makes Storybook stories the canonical examples, and repository rules already require visual component stories with categorized controls.

**Alternatives considered**:

- Keep generic documentation examples: rejected because it leaves the required artifact ambiguous.
- Defer Storybook to tasks: rejected because Storybook is part of the functional requirement and must be planned.

## Decision: Keep focus verification outside required Storybook stories

**Rationale**: The latest clarification explicitly removes focused state from required Storybook stories. Focus visibility remains a required visual behavior, but it is verified through unit/style checks and manual review against the established theme focus style instead of a dedicated `Focused` story.

**Alternatives considered**:

- Add a `Focused` Storybook story with a `play` function: rejected because the user chose manual focus verification and requested removing it from stories.
- Simulate focus with a static class or data attribute: rejected because it would create a non-user state path only for documentation.
