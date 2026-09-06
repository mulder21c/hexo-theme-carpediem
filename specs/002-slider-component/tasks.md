# Tasks: Slider 단일 값 선택

**Constitution**: CarpeDiem Constitution v1.1.0  
**Input**: Design documents from `/Volumes/workspace/Write/Hexo/themes/carpediem/specs/002-slider-component/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)  
**Tests**: Required. The feature specification and Constitution require RED → GREEN → REFACTOR delivery and at least 80% coverage for changed Slider scope.  
**Organization**: Tasks are grouped by user story. Every test task must be written and confirmed failing for the intended reason before its corresponding implementation task starts.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it writes a different file and has no dependency on another incomplete task in the same group.
- **[Story]**: Maps the task to one of the five user stories in [spec.md](./spec.md).
- Every task names the exact repository-relative file or directory it changes or verifies.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the co-located atom boundary defined by the implementation plan without changing project dependencies or generated bundles.

- [X] T001 Create the Slider source and test directory skeleton at `components/atoms/Slider/` and `components/atoms/Slider/__tests__/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the public types, exact decimal value domain, ownership registry, and cleanup primitives required by every user story.

**⚠️ CRITICAL**: No user-story implementation starts until this phase is complete.

- [X] T002 [P] Write type-contract compile checks for closed `SliderProps`, `SliderMark`, manager target/options, event detail, all 14 registration error codes, and optional `Window` globals in `components/atoms/Slider/__tests__/type.test.ts`; run `npm run typecheck` and confirm the checks fail for the intended missing declarations before implementation
- [X] T003 After T002 is confirmed RED, define the tested `SliderProps`, `SliderMark`, manager target/options, event detail, registration error codes, and optional `Window` globals in `components/atoms/Slider/type.d.ts`
- [X] T004 [P] Write and confirm failing tests for canonical decimal expansion/serialization, safe configuration scales, endpoint/tie normalization, numeric stepping, and unsafe live-value fallback in `components/atoms/Slider/__tests__/slider-value.helper.test.ts`
- [X] T005 Implement DOM-free safe-integer fixed-point parsing, canonical serialization, normalization, ratio, and representability primitives in `components/atoms/Slider/slider-value.helper.ts`
- [X] T006 Write and confirm failing manager tests for direct/ID/default target resolution, topology checks, one-root ownership, retryable unowned state, terminal state, and synchronous `undefined` API returns in `components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts`
- [X] T007 Implement `SliderRegistrationError`, the public manager shell, target resolution, lifecycle states, and the module-scoped root ownership registry in `components/atoms/Slider/slider.ui.ts`
- [X] T008 Extend the failing lifecycle suite with construction-snapshot, inverse-operation manifest, strict LIFO, all-applicable cleanup, first-thrown identity, no-focus-restoration, and pending-retry cases in `components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts`
- [X] T009 Implement granular DOM snapshots, append-after-success cleanup entries, teardown/recovery guards, and retryable pending manifests in `components/atoms/Slider/slider.ui.ts`

**Checkpoint**: Fixed-point values, public types, root lifecycle, and reversible resource ownership are ready for story work.

---

## Phase 3: User Story 1 - 입력 방식과 무관한 단일 값 선택 (Priority: P1) 🎯 MVP

**Goal**: Render one accessible native range control and provide equivalent pointer, touch, and keyboard selection with one normalized visual/ARIA/form value.

**Independent Test**: Render one default horizontal Slider, initialize its manager, move it to minimum/middle/maximum through rail, drag, and keyboard input, and verify that the canonical input, `aria-valuenow`, and thumb position always expose the same clamped value while rejected input is a no-op.

### Tests for User Story 1 — RED first

- [X] T010 [P] [US1] Write and confirm failing SSR view-model tests for required inputs, defaults, initial-value normalization, canonical values, ratios, and immutable reset baseline in `components/atoms/Slider/__tests__/index.helper.test.ts`
- [X] T011 [P] [US1] Write and confirm failing static-markup tests for the exact root/input/rail/thumb topology, accessible naming, native range semantics, bootstrap fields, and absence of React event props or duplicate roles/tab stops in `components/atoms/Slider/__tests__/index.test.tsx`
- [X] T012 [P] [US1] Write and confirm failing interaction tests for delegated admission, root capture, focus options, event-local geometry, endpoint clamping, stable listeners, propagation, pointer terminals, keyboard mappings/repeat/modifiers, disabled input, native-event non-interference, and SC-003's default `marks=false` latency budget by asserting that visual and accessibility surfaces synchronously expose each valid input value and complete within 100 ms in `components/atoms/Slider/__tests__/slider.ui.interaction.test.ts`
- [X] T013 [P] [US1] Write and confirm failing fault-injection tests for capture/focus/default-prevention/geometry throws, liveness checks, reentrant destroy, same-stack capture reconciliation, and first-thrown identity in `components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts`

### Implementation for User Story 1

- [X] T014 [US1] Implement pure Slider configuration and render view-model creation using the fixed-point domain in `components/atoms/Slider/index.helper.ts`
- [X] T015 [US1] Implement the stateless SSR Slider with one canonical native range input and exact root/rail/thumb bootstrap topology in `components/atoms/Slider/index.tsx`
- [X] T016 [US1] Parse a valid bootstrap contract, capture related element identities and writable surfaces, adopt a safe construction-time live value, and retain immutable manager configuration in `components/atoms/Slider/slider.ui.ts`
- [X] T017 [US1] Register the exact lifetime-stable delegated pointer/keyboard/continuation/window listener tuples and initialization-time pointer-source identity set in `components/atoms/Slider/slider.ui.ts`
- [X] T018 [US1] Implement guarded value synchronization in manager state → canonical input/form → ARIA → visual order using operation-start surface snapshots in `components/atoms/Slider/slider.ui.ts`
- [X] T019 [US1] Implement pointerdown admission, one event-local rect read, root capture confirmation, `focus({ preventScroll: true })`, post-focus liveness/capture checks, and direct mark-label selection in `components/atoms/Slider/slider.ui.ts`
- [X] T020 [US1] Implement active-pointer move handling with conditional default prevention, fresh viewport geometry, invalid-to-valid recovery, finite coordinate clamping, and initiating-pointer ownership in `components/atoms/Slider/slider.ui.ts`
- [X] T021 [US1] Implement first-terminal pointer state closure and applicable runtime capture release while suppressing duplicate pointerup/cancel/lost-capture/blur signals in `components/atoms/Slider/slider.ui.ts`
- [X] T022 [US1] Implement canonical-input keyboard admission and Arrow/Page/Home/End mapping for initial and repeat keydowns, including modifier gates, boundary no-ops, and active-pointer precedence in `components/atoms/Slider/slider.ui.ts`
- [X] T023 [US1] Complete pointer/keyboard failure isolation, post-hook liveness checks, reentrant teardown ownership, capture continuation guards, and no-queue/no-replay behavior in `components/atoms/Slider/slider.ui.ts`
- [X] T024 [US1] Run the US1 RED/GREEN/REFACTOR suites and close only US1 regressions in `components/atoms/Slider/__tests__/index.helper.test.ts`, `components/atoms/Slider/__tests__/index.test.tsx`, `components/atoms/Slider/__tests__/slider.ui.interaction.test.ts`, and `components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts`

**Checkpoint**: User Story 1 is an independently usable, accessible single-value Slider and is the suggested MVP.

---

## Phase 4: User Story 2 - Form 및 값 변경 알림 통합 (Priority: P2)

**Goal**: Integrate canonical form submission/reset, ordered change/commit notifications, explicit form association, deterministic teardown, and consumer-controlled manager initialization.

**Independent Test**: Initialize a named Slider with adapters, change and commit it through pointer and keyboard input, inspect form data and notification order/count/value, reset the form without notifications, then destroy and re-register while observing exact DOM restoration and no automatic manager creation.

### Tests for User Story 2 — RED first

- [X] T025 [P] [US2] Write and confirm failing tests for canonical form strings, exact-name handling, disabled submission, change/commit event-adapter order, constructor snapshots, form reset scheduling, and explicit association refresh in `components/atoms/Slider/__tests__/slider.ui.form.test.ts`
- [X] T026 [P] [US2] Extend failing lifecycle tests for adapter option access, immutable configuration, bootstrap consumption/restoration, duplicate ownership, teardown LIFO/retry, rollback-pending recovery, re-registration, and synchronous public APIs in `components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts`
- [X] T027 [P] [US2] Write and confirm failing module tests for SSR evaluation, local exports, compatible/incompatible global pair exposure, read/write/verify failures, and absence of automatic scans or instances in `components/atoms/Slider/__tests__/slider.ui.global.test.ts`
- [X] T028 [P] [US2] Extend failing fault-injection tests for synchronization rollback, notification liveness, reset cancellation, refresh residuals, teardown/recovery guards, exact pending surfaces/tuples/capture, and first-thrown precedence in `components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts`

### Implementation for User Story 2

- [X] T029 [US2] Implement constructor-entry diagnostic and adapter snapshots, options-shape/getter order, receiverless callback storage, SSR-unowned construction, and adapter release in `components/atoms/Slider/slider.ui.ts`
- [X] T030 [US2] Complete transactional synchronization failure handling with attempted-surface-first reverse rollback, rollback-failure terminal teardown, and preservation of the first forward thrown value in `components/atoms/Slider/slider.ui.ts`
- [X] T031 [US2] Implement sequence-local `CustomEvent` snapshotting and bubbling non-cancelable change/commit dispatch followed by receiverless adapters and post-step liveness checks in `components/atoms/Slider/slider.ui.ts`
- [X] T032 [US2] Integrate actual-change pointer notifications, exactly-once pointer terminal commit, changed-keyboard change/commit, boundary suppression, and release-after-commit precedence in `components/atoms/Slider/slider.ui.ts`
- [X] T033 [US2] Implement logical form ownership, stable reset callback/options, add-before-remove association refresh, residual tuple tracking, and live-only nested-refresh guards in `components/atoms/Slider/slider.ui.ts`
- [X] T034 [US2] Implement one `queueMicrotask()` callback per reset event, post-dispatch applicability gates, active-pointer cancellation, silent baseline synchronization, and reset transaction rollback in `components/atoms/Slider/slider.ui.ts`
- [X] T035 [US2] Complete terminal `destroy()` with exact construction-snapshot restoration, adapter/listener/form/capture cleanup, all-applicable LIFO passes, retry of unfinished entries only, and root release gating in `components/atoms/Slider/slider.ui.ts`
- [X] T036 [US2] Implement rollback-pending registry recovery for direct element and ID targets, originating-manager retirement, cross-root conflict rules, and per-root recovery reentrancy in `components/atoms/Slider/slider.ui.ts`
- [X] T037 [US2] Implement synchronization, notification, reset, refresh, teardown, initialization, and recovery guards with `finally` release and event-type-only nested input no-ops in `components/atoms/Slider/slider.ui.ts`
- [X] T038 [US2] Implement same-stack construction-snapshot reconciliation for in-flight value surfaces, form listener tuples, and runtime/entry capture releases with exact pending-entry retry behavior in `components/atoms/Slider/slider.ui.ts`
- [X] T039 [US2] Implement the versioned local/global manager-error pair, own data markers, compatible-pair reuse, conflict/exposure warnings, and dual-global no-side-effect guard in `components/atoms/Slider/slider.ui.ts`
- [X] T040 [US2] Complete exact bootstrap allowlist consumption/rollback/restoration while preserving unknown `data-slider-*`, persistent native semantics, node identities, consumer listeners, and post-registration configuration immutability in `components/atoms/Slider/slider.ui.ts`
- [X] T041 [US2] Implement canonical form payload/name normalization, disabled form behavior, and construction-live-value versus immutable-reset-baseline handling in `components/atoms/Slider/slider.ui.ts`
- [X] T042 [US2] Ensure `initialize()`, `refreshFormAssociation()`, and `destroy()` return runtime `undefined`, and ensure manager code never synthesizes, cancels, intercepts, or orders native range `input`/`change` events in `components/atoms/Slider/slider.ui.ts`
- [X] T043 [US2] Run the US2 RED/GREEN/REFACTOR suites and close only form, notification, lifecycle, global, and reentrancy regressions in `components/atoms/Slider/__tests__/slider.ui.form.test.ts`, `components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts`, `components/atoms/Slider/__tests__/slider.ui.global.test.ts`, and `components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts`

**Checkpoint**: User Stories 1 and 2 provide a consumer-initialized form control with deterministic notification and teardown contracts.

---

## Phase 5: User Story 3 - Discrete 및 제한 값 선택 (Priority: P3)

**Goal**: Support numeric steps, automatic/custom marks, and restricted values consistently across SSR, pointer input, keyboard input, visual state, and ARIA.

**Independent Test**: Render and initialize numeric-step automatic marks, numeric-step custom guidance marks, and `step=null` restricted marks; verify every input reaches only the intended values, marks are sorted, Page ties are directional, and only restricted non-empty labels produce `aria-valuetext`.

### Tests for User Story 3 — RED first

- [X] T044 [P] [US3] Extend failing value-helper tests for automatic mark generation, custom sorting/uniqueness, restricted nearest/tie selection, adjacent Arrow navigation, directional Page targets, and unbounded valid mark lists in `components/atoms/Slider/__tests__/slider-value.helper.test.ts`
- [X] T045 [P] [US3] Extend failing SSR view-model tests for `marks=false`, every automatic mark, sorted custom marks, restricted selectable domains, optional/empty labels, and mark ratios in `components/atoms/Slider/__tests__/index.helper.test.ts`
- [X] T046 [P] [US3] Extend failing markup tests for exact mark/value/label hooks, DOM order, full label text, numeric `step` versus restricted `step="any"`, and absence of extra identity/JSON channels in `components/atoms/Slider/__tests__/index.test.tsx`
- [X] T047 [P] [US3] Extend failing interaction tests for stored mark-label identities, direct mark selection without geometry, restricted pointer/Arrow/Page/Home/End behavior, and numeric versus restricted `aria-valuetext` in `components/atoms/Slider/__tests__/slider.ui.interaction.test.ts`

### Implementation for User Story 3

- [X] T048 [US3] Implement automatic/custom/restricted mark-domain generation, sorting, duplicate detection, nearest-value ties, adjacent navigation, and directional Page selection in `components/atoms/Slider/slider-value.helper.ts`
- [X] T049 [US3] Build the complete mark view model without truncation or virtualization in `components/atoms/Slider/index.helper.ts`
- [X] T050 [US3] Render every mark and optional label with exact transient hooks and connected value positioning in `components/atoms/Slider/index.tsx`
- [X] T051 [US3] Parse and snapshot mark hooks/labels, distinguish advisory numeric marks from restricted candidates, and route pointer/keyboard selection through the correct fixed-point domain in `components/atoms/Slider/slider.ui.ts`
- [X] T052 [US3] Synchronize restricted-only non-empty `aria-valuetext` and current/inactive mark visual surfaces without changing numeric `aria-valuenow` in `components/atoms/Slider/slider.ui.ts`
- [X] T053 [US3] Run the US3 RED/GREEN/REFACTOR suites and close only discrete/restricted-value regressions in `components/atoms/Slider/__tests__/slider-value.helper.test.ts`, `components/atoms/Slider/__tests__/index.helper.test.ts`, `components/atoms/Slider/__tests__/index.test.tsx`, and `components/atoms/Slider/__tests__/slider.ui.interaction.test.ts`

**Checkpoint**: User Story 3 independently demonstrates numeric-step, guidance-mark, and restricted-value configurations.

---

## Phase 6: User Story 4 - 방향·크기·환경에 맞는 시각 표현 (Priority: P4)

**Goal**: Provide exact size/orientation geometry and perceivable enabled, hover, active, focus, disabled, dark, forced-colors, reduced-motion, LTR, and RTL presentation.

**Independent Test**: Display all three sizes and both orientations in Storybook, exercise horizontal LTR/RTL and vertical input, and verify dimensions, physical value axes, focus contrast, target areas, non-color state cues, adaptive media behavior, and long-label overflow guidance.

### Tests for User Story 4 — RED first

- [X] T054 [P] [US4] Extend failing SSR tests for size/orientation/disabled classes and attributes, vertical native orientation, fixed physical horizontal semantics, and parent-owned vertical height in `components/atoms/Slider/__tests__/index.test.tsx`
- [X] T055 [P] [US4] Extend failing interaction tests for horizontal LTR/RTL viewport math, vertical bottom-to-top math, orientation-invariant keyboard behavior, exact one-read geometry, and visual ratio updates in `components/atoms/Slider/__tests__/slider.ui.interaction.test.ts`

### Implementation for User Story 4

- [X] T056 [P] [US4] Add light/dark Slider semantic color, surface, and focus token mappings using only existing palettes in `source/css/base/_theme.scss`
- [X] T057 [US4] Implement exact thumb/rail/hit-area sizes, horizontal/vertical layout, endpoint-safe positioning, touch actions, hover/active/focus/disabled cues, dark/forced-colors styling, reduced motion, and untruncated labels in `components/atoms/Slider/index.module.scss`
- [X] T058 [P] [US4] Apply orientation-aware viewport coordinate mapping and fixed physical LTR/RTL visual value ratios without observers or cached geometry in `components/atoms/Slider/slider.ui.ts`
- [X] T059 [US4] Create `Meta<typeof Slider>`, categorized controls, `dedent` documentation, Default/Sizes/Vertical/Marks/Disabled/LongLabels/RTL/adaptive presentation stories, and manager effect cleanup in `components/atoms/Slider/index.stories.tsx`
- [X] T060 [US4] Add representative pointer, keyboard, focus, disabled, and form-reset `play` smoke scenarios using `storybook/test` and the real manager in `components/atoms/Slider/index.stories.tsx`
- [X] T061 [US4] Run the Storybook browser project and static build; require both repository-wide Storybook gates to pass without errors before the US4 checkpoint. Fix Slider-scoped failures in `components/atoms/Slider/index.stories.tsx` and `components/atoms/Slider/`; report unrelated or pre-existing failures as blockers and do not mark this task complete until they are resolved and both commands pass
- [X] T062 [US4] Review small/medium/large, vertical height, dark, forced-colors, reduced-motion, focus-visible, hover containment, disabled, RTL, and long-label behavior against the Storybook matrix in `components/atoms/Slider/index.stories.tsx` and `components/atoms/Slider/index.module.scss`

**Checkpoint**: User Story 4 is visually and interactively verifiable across the supported orientations, sizes, and accessibility environments without an AAA claim.

---

## Phase 7: User Story 5 - 잘못된 구성의 조기 진단 (Priority: P5)

**Goal**: Reject invalid configuration in deterministic first-fatal order, preserve external thrown identities, issue best-effort diagnostics, and leave roots fully retryable or explicitly cleanup-pending.

**Independent Test**: Trigger every internal error code plus recoverable/advisory inputs, options getter faults, topology/bootstrap/mirror faults, numeric representability failures, exposure traps, and rollback failures; verify exact code/field or original thrown identity, warning policy, absence of partial state, and successful recovery/re-registration.

### Tests for User Story 5 — RED first

- [X] T063 [P] [US5] Extend failing value-helper tests for unsafe powers/scaled values/distances/indices/ratios/serialization intermediates and collapsed selectable values in `components/atoms/Slider/__tests__/slider-value.helper.test.ts`
- [X] T064 [P] [US5] Extend failing lifecycle tests for fixed first-fatal validation order, all 14 `SliderRegistrationError` codes/fields, topology/nesting, bootstrap lexical errors, static mirrors, options shapes/getters, recoverable initial values, advisories, and diagnostic suppression in `components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts`
- [X] T065 [P] [US5] After T027, extend failing global tests for exact own data descriptors, short-circuit descriptor traps, compatible-pair identity, malformed attestation trust, dual-global combinations, diagnostic independence, and exposure failure warnings in `components/atoms/Slider/__tests__/slider.ui.global.test.ts`
- [X] T066 [P] [US5] After T013 and T028, extend failing reentrancy tests for initialization cancellation, rollback-pending multi-failure passes, recovery guards, nested construction, originating-manager retirement, cross-root rejection, and exact pending reservation release in `components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts`

### Implementation for User Story 5

- [X] T067 [US5] Implement exact-boolean diagnostic snapshots, best-effort configuration/global warning helpers, stable registration error name/code/field mapping, and unwrapped external failure propagation in `components/atoms/Slider/slider.ui.ts`
- [X] T068 [US5] Implement browser/registry/topology/adapter/bootstrap/number/range/naming/step/static-mirror/mark/label/shift/representability validation in the fixed first-fatal order in `components/atoms/Slider/slider.ui.ts`
- [X] T069 [US5] Implement post-fatal recoverable initial-value correction and automatic-mark/shift-step advisories in defined order while accepting every valid mark without count caps in `components/atoms/Slider/slider.ui.ts`
- [X] T070 [US5] Harden side-effect-free SSR module evaluation and exact global marker/probe/read-write-verify short-circuit behavior without deferred exposure or shape probing in `components/atoms/Slider/slider.ui.ts`
- [X] T071 [US5] Complete initialization rollback, rollback-pending manifest recovery, reentrant cancellation, nested-construction conflict, stale-origin retirement, and retry-only-unfinished cleanup paths in `components/atoms/Slider/slider.ui.ts`
- [X] T072 [US5] Run the US5 RED/GREEN/REFACTOR suites and close only validation, diagnostics, global exposure, rollback, and recovery regressions in `components/atoms/Slider/__tests__/slider-value.helper.test.ts`, `components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts`, `components/atoms/Slider/__tests__/slider.ui.global.test.ts`, and `components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts`

**Checkpoint**: All five user stories are independently demonstrable, and invalid roots either remain untouched/retryable or retain an explicit recoverable reservation.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Verify coverage, packaging, documentation consistency, and repository-wide quality gates after all selected stories are complete.

- [X] T073 Run targeted V8 coverage, add only missing observable-contract cases, and reach at least 80% for changed Slider scope in `components/atoms/Slider/__tests__/`
- [X] T074 Run the Storybook Chromium project and static build after unit coverage; require both repository-wide Storybook gates to pass without errors before sign-off. Resolve Slider regressions in `components/atoms/Slider/index.stories.tsx`; report unrelated or pre-existing failures as blockers and do not mark this task complete until they are resolved and both commands pass
- [X] T075 Generate a host Hexo build and verify that `components/atoms/Slider/slider.ui.ts` is present in the output from `scripts/filters/ui-bundler.js` without source-editing generated `source/js/ui.js`
- [ ] T076 Run `npm run lint` and `npm test`; require both repository-wide gates to pass with zero errors or failures before sign-off. Fix request-scoped failures in `components/atoms/Slider/` and `source/css/base/_theme.scss`; report unrelated or pre-existing failures as blockers and do not mark this task complete until they are resolved and both commands pass
- [X] T077 Reconcile implemented behavior and commands with `specs/002-slider-component/quickstart.md` and the three Markdown contracts in `specs/002-slider-component/contracts/` without weakening `specs/002-slider-component/spec.md`

---

## Dependencies & Execution Order

### Phase Dependencies

```text
Phase 1 Setup
  └─> Phase 2 Foundation
        └─> US1 (MVP)
              ├─> US2 form/notifications/lifecycle
              │     └─> US5 validation/diagnostics/recovery
              ├─> US3 marks/restricted values
              └─> US4 orientation/presentation

US2 + US3 + US4 + US5
  └─> Phase 8 Polish & Cross-Cutting Concerns
```

- **Phase 1** has no dependency and changes no package configuration.
- **Phase 2** depends on Phase 1 and blocks all user-story implementation.
- **US1** depends on Phase 2 and is the minimal independently testable product.
- **US2** depends on US1's canonical value/input pipeline because form and notification behavior observes that pipeline.
- **US3** depends on US1's input pipeline but remains independently testable through its three value-domain configurations.
- **US4** depends on US1's rendering/geometry; its mark presentation matrix uses US3 when that story is included.
- **US5** as a complete story depends on US2's global and reentrancy test foundations. T063–T064 may start after Phase 2, T065 depends on T027, T066 depends on T013 and T028, and T067–T071 start only after all four US5 RED tasks are confirmed failing.
- **Phase 8** depends on every story selected for delivery.

### Within Each User Story

1. Write the listed tests and confirm they fail for the intended missing behavior.
2. Implement pure models/helpers before SSR markup or manager orchestration.
3. Implement core behavior before story/browser integration.
4. Refactor only after GREEN and rerun the story's complete test set.
5. Do not mark the story complete until its independent test and checkpoint pass.

### Parallel Opportunities

- **Foundation**: T002 and T004 can proceed in parallel after T001. T003 depends on T002, T005 on T004, T007 on T006, and T009 on T008.
- **US1**: T010, T011, T012, and T013 are independent RED test files and can be authored in parallel.
- **US2**: T025, T026, T027, and T028 can be authored in parallel; implementation tasks serialize on `slider.ui.ts`.
- **US3**: T044, T045, T046, and T047 can be authored in parallel across four suites.
- **US4**: T054 and T055 can be authored in parallel; after RED, T056 and T058 can proceed in parallel before SCSS/story integration.
- **US5**: T063 and T064 may start after Foundation. After their stated prerequisites, T065 and T066 can be authored in parallel; T067–T071 wait for the complete RED batch and serialize on `slider.ui.ts`.
- Only T063 and T064 may proceed alongside earlier stories after Foundation; the remaining US5 work observes the explicit US1/US2 test-file dependencies.

## Parallel Execution Examples

### User Story 1

```text
Parallel RED batch: T010 index.helper.test.ts | T011 index.test.tsx | T012 slider.ui.interaction.test.ts | T013 slider.ui.reentrancy.test.ts
Then sequential GREEN: T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022 → T023 → T024
```

### User Story 2

```text
Parallel RED batch: T025 slider.ui.form.test.ts | T026 slider.ui.lifecycle.test.ts | T027 slider.ui.global.test.ts | T028 slider.ui.reentrancy.test.ts
Then serialize T029–T042 on slider.ui.ts and finish with T043
```

### User Story 3

```text
Parallel RED batch: T044 slider-value.helper.test.ts | T045 index.helper.test.ts | T046 index.test.tsx | T047 slider.ui.interaction.test.ts
Then sequential GREEN: T048 → T049 → T050 → T051 → T052 → T053
```

### User Story 4

```text
Parallel RED batch: T054 index.test.tsx | T055 slider.ui.interaction.test.ts
After RED: run T056 theme tokens and T058 manager orientation in parallel, then T057 → T059 → T060 → T061 → T062
```

### User Story 5

```text
Early RED after Foundation: T063 slider-value.helper.test.ts | T064 slider.ui.lifecycle.test.ts
Deferred RED: T065 slider.ui.global.test.ts after T027 | T066 slider.ui.reentrancy.test.ts after T013 and T028
Then serialize T067–T071 on slider.ui.ts and finish with T072
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 and Phase 2.
2. Complete T010–T024 for User Story 1.
3. Stop and run the US1 independent test across pointer, keyboard, canonical input, ARIA, and visual state.
4. Demonstrate the static SSR markup plus explicit manager initialization before expanding integration scope.

### Incremental Delivery

1. **Foundation**: Types, exact fixed-point values, lifecycle, and reversible ownership.
2. **US1**: Accessible pointer/keyboard Slider MVP.
3. **US2**: Form, ordered notifications, reset, destruction, and global integration.
4. **US3**: Automatic/custom/restricted mark domains.
5. **US4**: Size, orientation, theme, adaptive media, and Storybook browser evidence.
6. **US5**: Complete deterministic diagnostics and fault recovery after its US1/US2 test-file prerequisites; only T063–T064 may start earlier after Foundation.
7. **Polish**: Coverage, browser/static build, UI bundle inclusion, lint, unit tests, and documentation reconciliation.

## Notes

- `[P]` means different files and no dependency on an unfinished task in that batch; it does not authorize concurrent edits to `slider.ui.ts`.
- `slider.ui.ts` remains the sole Slider `.ui.ts` entry so the repository UI bundler does not create duplicate side effects.
- Never source-edit generated `source/js/ui.js` and do not add a runtime dependency for decimal arithmetic.
- Keep tests deterministic by stubbing pointer capture, focus, DOMRect, property descriptors, microtasks, and thrown sentinels at the observable boundary.
- Distinguish browser-native listener exception reporting from manager-observed thrown values.
- Do not add a raw palette color without the separate color-approval gate; current tasks map semantic Slider tokens to existing palettes.
- Preserve unrelated worktree changes and report repository-wide noise separately from Slider failures.
