# Testing and Storybook Rules

## Unit Test Coverage Expectations

- `*.helper.ts`, `*.ui.ts`, and public `index.tsx` files should each have corresponding unit tests.
- Preferred test location is a local `__tests__/` directory.
- File naming: `*.test.ts` or `*.test.tsx`.

## Test Responsibility Split

- Helper tests: pure logic and edge cases.
- UI tests: DOM behavior, timers, events, and cleanup.
- TSX tests: markup, ARIA, and props-to-DOM mapping.

## Storybook Expectations

- Keep stories (`*.stories.tsx`) for visual components.
- Storybook `play` should be used for smoke/regression checks.
- Storybook checks do not replace unit tests.
- Stories should render without runtime errors.
- Story-only work is out of TDD scope: do not add unit tests for `*.stories.tsx`.
- Stories are verified by `play` smoke checks and error-free rendering, not by unit tests.
- "Storybook checks do not replace unit tests" constrains coverage claims for implementation files; it does not require a unit test alongside a new story.
- If story work also changes `index.tsx`, `*.helper.ts`, or `*.ui.ts`, TDD applies to that change.
