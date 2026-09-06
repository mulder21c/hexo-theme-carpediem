# Implementation Plan: Slider 단일 값 선택

**Branch**: `002-slider-component` | **Date**: 2026-09-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/Volumes/workspace/Write/Hexo/themes/carpediem/specs/002-slider-component/spec.md`  
**Constitution**: CarpeDiem Constitution v1.1.0

## Summary

React는 native `<input type="range">`를 canonical control로 포함한 정적 Slider markup만 SSR로 출력합니다. 값 계산과 markup view model은 side-effect-free helper로 분리하고, 브라우저 interaction은 explicit consumer initialization을 받는 단일 `SliderManager`가 native DOM API로 소유합니다. Manager는 safe-integer fixed-point 계산, immutable configuration, per-root ownership registry, mutation/cleanup manifest, transactional synchronization, form reset, notification 및 reentrant teardown을 명세의 observable order와 thrown-value identity 그대로 구현합니다. 새 runtime dependency는 추가하지 않습니다.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React/React DOM 19.2.1 JSX, Node.js 20+, ES2020 target  
**Primary Dependencies**: React, React DOM server rendering, classnames, native DOM/Pointer Events/Form APIs; no new runtime dependency  
**Storage**: N/A  
**Testing**: Vitest 4.0.17 unit project with jsdom, Testing Library, V8 coverage, Storybook 10.3.6 browser project with Playwright/Chromium  
**Target Platform**: Hexo Node.js SSR and modern browsers supporting native range input, Pointer Events, CustomEvent, and `queueMicrotask()`  
**Project Type**: React SSR Hexo theme and Atomic Design UI component library  
**Performance Goals**: For the default `marks=false` configuration, update visual and accessibility current-value surfaces within 100 ms of valid input; avoid repeated layout reads by taking one event-local rail rect snapshot  
**Constraints**: Static non-hydrated markup; no browser globals in render paths; no React mutable state or production event props; one manager per root; WCAG 2.1 AA constitutional minimum and project WCAG 2.2 AA guidance; exact LIFO cleanup, rollback, reentrancy, and first-thrown identity; no mark-count cap or virtualization  
**Scale/Scope**: One numeric value and one thumb per Slider, one root per manager, consumer-owned multiple roots, unbounded valid marks, FR-001..310 and SC-001..160

## Constitution Check

### Pre-design gate

- **I. SSR-First Rendering — PASS**: `index.tsx` is a pure functional SSR component. It imports no client manager and accesses no browser global. `renderToStaticMarkup()` output is treated as final static HTML rather than hydration input.
- **II. Accessibility by Default — PASS**: One native range input owns focus, form, native slider semantics, and ARIA state. Root and visual elements create no duplicate role or tab stop. Focus contrast, target size, forced colors, reduced motion, and accessible naming receive unit and browser coverage.
- **III. Strict Type Safety — PASS**: Public props and manager contracts use named interfaces/unions, explicit public return types, `unknown` for external thrown values, and existing strict-family compiler flags. No `any` is planned.
- **IV. Atomic Design Architecture — PASS**: Slider is an atom with co-located TSX, `type.d.ts`, SCSS Module, stories, helpers, one UI manager, and corresponding tests. Imports remain within the atom or flow downward.
- **V. Stateless Prop-Driven Components — PASS**: React receives initial configuration through props and renders no production event handlers. `onChange` adapters belong exclusively to `SliderManagerOptions` in the browser boundary.
- **VI. Clean Code Discipline — PASS**: Pure render/value helpers isolate fixed-point and view-model work; named constants replace protocol strings and dimensions; the single manager class owns lifecycle while focused functions handle validation and transactions.
- **VII. Automated Quality Gates — PASS**: The plan includes ESLint, Stylelint, Prettier, strict typecheck, Vitest, coverage, Storybook browser checks, and static Storybook build verification.
- **VIII. Test-Driven Delivery — PASS**: Each helper, public TSX entry, and UI behavior unit starts with a failing test, proceeds through minimum implementation and refactoring, and must reach at least 80% coverage for the changed Slider scope.

No constitutional violation requires justification. Phase 0 may proceed.

## Project Structure

### Documentation (this feature)

```text
specs/002-slider-component/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
├── contracts/
│   ├── slider-props-and-markup.md
│   ├── slider-manager.md
│   └── slider-events-and-lifecycle.md
├── checklists/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
components/atoms/Slider/
├── index.tsx
├── type.d.ts
├── index.helper.ts
├── slider-value.helper.ts
├── slider.ui.ts
├── index.module.scss
├── index.stories.tsx
└── __tests__/
    ├── index.test.tsx
    ├── index.helper.test.ts
    ├── type.test.ts
    ├── slider-value.helper.test.ts
    ├── slider.ui.global.test.ts
    ├── slider.ui.lifecycle.test.ts
    ├── slider.ui.interaction.test.ts
    ├── slider.ui.form.test.ts
    └── slider.ui.reentrancy.test.ts

source/css/base/_theme.scss
```

**Structure Decision**: Implement Slider in `components/atoms/Slider` because it is one indivisible form control. `index.tsx` and `index.helper.ts` own only SSR markup; `slider-value.helper.ts` provides shared DOM-free numeric logic; `slider.ui.ts` is the sole `.ui.ts` entry and contains the sole `SliderManager` ownership class plus its public error. Tests split by observable contract while exercising the same production manager. `_theme.scss` adds `--slider-*` semantic mappings from existing palettes, so `_variables.scss` does not change unless implementation proves that a new raw color is required and receives separate approval. `scripts/filters/ui-bundler.js` remains unchanged because it already discovers the single Slider UI entry; generated `source/js/ui.js` is not source-edited.

## Phase 0: Research Outcome

[research.md](./research.md) resolves the implementation choices for static SSR, native semantics, safe-integer fixed-point arithmetic, transient bootstrap, ownership/lifecycle transactions, event and microtask behavior, accessibility styling, and layered testing. The feature spec contains no `NEEDS CLARIFICATION` marker. Reset application occurs in the one `queueMicrotask()` callback this manager enqueues for that reset at the next microtask checkpoint; it does not guarantee that no earlier listener has queued other microtasks.

## Phase 1: Design Outcome

- [data-model.md](./data-model.md) defines immutable configuration, normalized values, DOM snapshots, lifecycle states, ownership records, form association, cleanup manifests, operation transactions, and notification sequences.
- [slider-props-and-markup.md](./contracts/slider-props-and-markup.md) defines the closed React props surface, defaults, native control ownership, exact SSR bootstrap allowlist, static mirror, and consumption/restoration rules.
- [slider-manager.md](./contracts/slider-manager.md) defines target resolution, public synchronous APIs, error codes, ownership and recovery, diagnostics, and versioned global exposure.
- [slider-events-and-lifecycle.md](./contracts/slider-events-and-lifecycle.md) defines listener tuples, pointer/keyboard order, form reset, synchronization/rollback, notifications, and reentrant teardown.
- [quickstart.md](./quickstart.md) gives SSR and browser usage plus TDD and quality-gate verification steps.

### Post-design constitution re-check

All eight pre-design gates remain **PASS**. The design introduces no runtime dependency, browser access in SSR code, mutable React state, reverse Atomic Design import, suppressed accessibility rule, or quality-gate exception. The granular mutation journal preserves DOM node identity without cloning, and the one-class manager constraint is retained while pure helpers prevent the lifecycle class from owning numeric/render responsibilities. No complexity exception is recorded.

## Complexity Tracking

No constitution violation or approved complexity exception applies.
