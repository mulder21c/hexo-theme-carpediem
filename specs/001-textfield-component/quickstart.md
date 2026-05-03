# Quickstart: TextField Component

## Prerequisites

- Node.js `>=20.0.0`
- Dependencies installed with `npm install`
- Current branch: `001-textfield-component`

## TDD Workflow

1. Add failing unit tests first in `components/atoms/TextField/__tests__/index.test.tsx`.
2. Cover default rendering, supported `type` values, variant/size classes, optional icon rendering, accessibility warning behavior, `aria-invalid`, disabled precedence, read-only and disabled attribute forwarding, and native text input prop forwarding.
3. Run the RED check:

```bash
npm test -- components/atoms/TextField
```

4. Confirm the new tests fail because TextField is not implemented yet.
5. Implement the minimal component files:

```text
components/atoms/TextField/index.tsx
components/atoms/TextField/type.d.ts
components/atoms/TextField/index.module.scss
components/atoms/TextField/index.stories.tsx
```

6. Add TextField semantic CSS variables to `source/css/base/_theme.scss` only if existing semantic tokens are insufficient.
7. Run the GREEN check:

```bash
npm test -- components/atoms/TextField
```

8. Refactor only after tests pass, then rerun the focused tests.
9. Run the full quality gates:

```bash
npm run lint
npm test
```

10. Verify feature coverage:

```bash
npm run test:unit:coverage
```

11. Review stories locally:

```bash
npm run storybook
```

## Acceptance Review

- The native input remains accessible with external label composition or ARIA names.
- Missing `id`, `aria-label`, and `aria-labelledby` logs the accessibility warning while still rendering.
- Outlined and underlined variants match the required boundary behavior.
- Small, medium, and large sizes are distinct and readable.
- Leading icon, placeholder, and entered text do not overlap.
- Disabled visual state takes precedence over invalid visual styling.
- Focus indicator remains visible when a non-disabled TextField is both focused and invalid.
- `TextFieldProps` does not expose a public `invalid` prop.
- `position:absolute` is absent from TextField layout styles.
- Required Storybook stories, including read-only, disabled, and invalid states, exist and expose the expected controls.
- Focused state is manually verified against the established theme focus style rather than required as a Storybook story.
