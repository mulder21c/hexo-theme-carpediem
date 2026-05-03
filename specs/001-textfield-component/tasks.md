# Tasks: TextField Component

**Input**: Design documents from `/Volumes/workspace/Write/Hexo/themes/carpediem/specs/001-textfield-component/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/textfield-props.md`, `quickstart.md`
**Tests**: Required by CarpeDiem Constitution v1.1.0 and quickstart TDD workflow.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested as an independent increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and has no dependency on incomplete tasks.
- **[Story]**: User story label for traceability, only present in user story phases.
- Every task includes an exact repository path.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the TextField atom workspace and implementation references.

- [X] T001 Create `components/atoms/TextField/` and `components/atoms/TextField/__tests__/` directories for the new atom.
- [X] T002 [P] Review existing atom conventions in `components/atoms/Switch/index.tsx`, `components/atoms/Checkbox/index.tsx`, and `components/atoms/Button/IconButton.tsx` before implementing TextField.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No shared runtime infrastructure is required beyond Phase 1.

**Checkpoint**: After Phase 1, user story implementation can begin. Follow RED -> GREEN -> REFACTOR inside each story phase.

---

## Phase 3: User Story 1 - Configure a Purpose-Built Text Input (Priority: P1) MVP

**Goal**: Consumers can render TextField with supported input purposes, outlined/underlined variants, and small/medium/large sizes.

**Independent Test**: Render the TextField with each supported input purpose, variant, and size, then confirm the field remains usable and visually distinct in every supported configuration.

### Tests for User Story 1

> Write these tests first and confirm they fail before implementation.

- [X] T003 [US1] Add failing unit tests for default `type`, supported input purposes, rejected public `invalid` prop via TypeScript negative assertion, default outlined variant, underlined variant, and size classes in `components/atoms/TextField/__tests__/index.test.tsx`.

### Implementation for User Story 1

- [X] T004 [US1] Create `TextFieldType`, `TextFieldVariant`, `TextFieldSize`, and `TextFieldProps` per contract, excluding any public `invalid` prop, in `components/atoms/TextField/type.d.ts`.
- [X] T005 [US1] Implement base TextField rendering, default props, public class names, and native text input prop forwarding in `components/atoms/TextField/index.tsx`.
- [X] T006 [US1] Implement outlined, underlined, small, medium, and large base layout styles with the green 2px normal input boundary treatment and without `position:absolute` in `components/atoms/TextField/index.module.scss`.
- [X] T007 [US1] Run the focused RED/GREEN check for User Story 1 with `components/atoms/TextField/__tests__/index.test.tsx`.

**Checkpoint**: User Story 1 renders the supported input purposes, default outlined variant, underlined variant, and all sizes independently.

---

## Phase 4: User Story 2 - Provide Accessible Composition With External Labels (Priority: P1)

**Goal**: Consumers can compose TextField with an external label or ARIA accessible name, and unlabeled instances log the required warning while still rendering.

**Independent Test**: Render TextField with `id`, `aria-label`, and `aria-labelledby` cases, then render it without all three and confirm the warning behavior.

### Tests for User Story 2

> Write these tests first and confirm they fail before implementation.

- [X] T008 [US2] Add failing unit tests for no internal label rendering, no warning with `id`, no warning with `aria-label`, no warning with `aria-labelledby`, and warning when all three are absent in `components/atoms/TextField/__tests__/index.test.tsx`.

### Implementation for User Story 2

- [X] T009 [US2] Implement HexoContext warning behavior and external accessible-name forwarding in `components/atoms/TextField/index.tsx`.
- [X] T010 [US2] Run the focused RED/GREEN check for User Story 2 with `components/atoms/TextField/__tests__/index.test.tsx`.

**Checkpoint**: User Story 2 is accessible through external label composition or ARIA names and logs the missing-accessibility warning only for missing `id`, `aria-label`, and `aria-labelledby`.

---

## Phase 5: User Story 3 - Communicate Input State Clearly (Priority: P2)

**Goal**: Users can visually distinguish normal, focus, read-only, disabled, and invalid states, with disabled visual treatment taking precedence over invalid styling while non-disabled invalid focus remains visible.

**Independent Test**: Render each state independently and render focused invalid state, then confirm cursor, boundary, text, background, invalid, disabled, and focus indicators are distinguishable.

### Tests for User Story 3

> Write these tests first and confirm they fail before implementation.

- [X] T011 [US3] Add failing unit tests for `readOnly`, `disabled`, `aria-invalid`, disabled plus `aria-invalid`, focused plus `aria-invalid`, and focus-related class/attribute contract in `components/atoms/TextField/__tests__/index.test.tsx`.

### Implementation for User Story 3

- [X] T012 [US3] Add or reuse TextField semantic CSS variables for normal, placeholder, invalid, disabled, dark-mode, and high-contrast colors in `source/css/base/_theme.scss`, adding new variables only when existing semantic tokens are insufficient.
- [X] T013 [US3] Ensure TextField forwards `readOnly`, `disabled`, and `aria-invalid` attributes and preserves disabled precedence hooks in `components/atoms/TextField/index.tsx`.
- [X] T014 [US3] Implement read-only, disabled, invalid, disabled-plus-invalid, invalid-plus-focus, and focus visual styles in `components/atoms/TextField/index.module.scss`.
- [X] T015 [US3] Run the focused RED/GREEN check for User Story 3 with `components/atoms/TextField/__tests__/index.test.tsx`.

**Checkpoint**: User Story 3 communicates every required state and preserves `aria-invalid` semantics when disabled styling wins visually.

---

## Phase 6: User Story 4 - Add a Leading Purpose Icon (Priority: P2)

**Goal**: Consumers can add an optional leading Feather icon inside the TextField boundary without text, placeholder, or icon overlap.

**Independent Test**: Render TextField with a valid Feather icon name across supported sizes and variants, then confirm icon placement stays inside the field boundary and does not overlap placeholder or entered text.

### Tests for User Story 4

> Write these tests first and confirm they fail before implementation.

- [X] T016 [US4] Add failing unit tests with a mocked Feather icon for leading icon rendering, decorative icon semantics, and icon/no-icon class behavior in `components/atoms/TextField/__tests__/index.test.tsx`.

### Implementation for User Story 4

- [X] T017 [US4] Implement optional leading `FeatherIcon` rendering from the `icon` prop in `components/atoms/TextField/index.tsx`.
- [X] T018 [US4] Implement non-overlapping icon, placeholder, and input text spacing for every variant and size in `components/atoms/TextField/index.module.scss`.
- [X] T019 [US4] Run the focused RED/GREEN check for User Story 4 with `components/atoms/TextField/__tests__/index.test.tsx`.

**Checkpoint**: User Story 4 supports leading icons without layout overlap and without making the icon the accessible name.

---

## Phase 7: User Story 5 - Review Storybook Stories (Priority: P3)

**Goal**: Consumers can inspect the required TextField Storybook stories and adjust controls except for the property fixed by each story.

**Independent Test**: Open TextField Storybook stories and confirm `Default`, `ReadOnly`, `OutlinedVariant`, `UnderlinedVariant`, `SizeVariants`, `Disabled`, and `Invalid` exist with expected controls; verify focus state manually against the theme focus style without a dedicated focus story.

### Implementation for User Story 5

- [X] T020 [US5] Create TextField Storybook meta, categorized `argTypes`, and default `args` in `components/atoms/TextField/index.stories.tsx`.
- [X] T021 [US5] Add `Default`, `OutlinedVariant`, and `UnderlinedVariant` stories with property-specific controls exclusions in `components/atoms/TextField/index.stories.tsx`.
- [X] T022 [US5] Add `ReadOnly`, `SizeVariants`, `Disabled`, and `Invalid` stories with property-specific controls exclusions in `components/atoms/TextField/index.stories.tsx`.
- [X] T023 [US5] Run a Storybook review for TextField read-only, disabled, invalid, controls, and manual focus-state verification using `components/atoms/TextField/index.stories.tsx`.

**Checkpoint**: User Story 5 exposes the required Storybook stories, excludes a dedicated focus story, and keeps non-demonstrated props configurable through controls.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Verify cross-story quality, coverage, and repository gates.

- [X] T024 [P] Verify `position:absolute` is not used in TextField layout styles in `components/atoms/TextField/index.module.scss`.
- [X] T025 [P] Verify TextField green 2px normal boundary, placeholder contrast, and semantic token usage against light, dark, and high-contrast variables in `source/css/base/_theme.scss`.
- [X] T026 [P] Verify the TypeScript negative assertion for the rejected public `invalid` prop from T003 remains present and passing in `components/atoms/TextField/__tests__/index.test.tsx`.
- [X] T027 Run full validation commands from `package.json`: `npm run lint` and `npm test`.
- [X] T028 Run feature coverage verification from `package.json` with `npm run test:unit:coverage` and confirm TextField feature-unit coverage is at least 80% for `components/atoms/TextField/`.
- [X] T029 Run Storybook static/render validation from `package.json` with `npm run build-storybook` for `components/atoms/TextField/index.stories.tsx`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: No additional blocking tasks after setup.
- **User Story 1 (Phase 3)**: Starts after setup and establishes the base component.
- **User Story 2 (Phase 4)**: Depends on User Story 1 base render contract.
- **User Story 3 (Phase 5)**: Depends on User Story 1 base render contract.
- **User Story 4 (Phase 6)**: Depends on User Story 1 base render contract.
- **User Story 5 (Phase 7)**: Depends on implemented component behavior from User Stories 1 through 4.
- **Polish (Phase 8)**: Depends on all selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: MVP base; no dependency on other user stories.
- **US2 (P1)**: Uses the US1 base input and wrapper.
- **US3 (P2)**: Uses the US1 base input and wrapper.
- **US4 (P2)**: Uses the US1 base input and wrapper.
- **US5 (P3)**: Uses the completed component and stories all required states/configurations.

### Within Each User Story

- Write unit tests first and confirm failure before implementation.
- Implement the minimum change to pass the failing tests.
- Refactor only after tests pass.
- Re-run focused tests before moving to the next story.
- Confirm Vitest feature-unit coverage reaches at least 80% before final sign-off.

---

## Parallel Opportunities

- T002 can run in parallel with T001 because it only reads existing Atom patterns.
- After US1 is complete, US2, US3, and US4 can be worked on by separate developers if they coordinate edits to `components/atoms/TextField/index.tsx` and `components/atoms/TextField/index.module.scss`.
- T024, T025, and T026 can run in parallel during polish because they verify different files or independent contracts.

## Parallel Example: After User Story 1

```text
Task: "Add failing accessibility tests in components/atoms/TextField/__tests__/index.test.tsx"
Task: "Add failing visual-state tests in components/atoms/TextField/__tests__/index.test.tsx"
Task: "Add failing icon tests in components/atoms/TextField/__tests__/index.test.tsx"
```

Coordinate these carefully because they share the same test file; separate developers should merge in story order.

## Implementation Strategy

### MVP First

1. Complete Phase 1.
2. Complete Phase 3 for User Story 1.
3. Stop and validate TextField type, variant, and size behavior independently.

### Incremental Delivery

1. US1 delivers the base public TextField contract.
2. US2 adds accessible composition and warning behavior.
3. US3 adds state visuals and theme tokens.
4. US4 adds optional leading icon support.
5. US5 adds the Storybook review surface without a dedicated focus story.
6. Polish runs full lint, test, coverage, and Storybook build validation.

### Quality Gates

Before handoff after implementation:

1. `npm run lint`
2. `npm test`
3. `npm run test:unit:coverage`
4. `npm run build-storybook`

## Notes

- Keep all TextField implementation under `components/atoms/TextField/` except semantic theme variables in `source/css/base/_theme.scss`.
- Do not add a runtime dependency.
- Do not add a public `invalid` prop.
- Do not use `position:absolute`.
- Do not render an internal label.
- Do not add a dedicated focus Storybook story; verify focus manually and through unit/style checks.
- Use `hexoLog.warn` through `HexoContext` for the accessibility warning.
