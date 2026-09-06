# Phase 0 Research: Slider 단일 값 선택

**Feature**: `002-slider-component`  
**Date**: 2026-09-05  
**Constitution**: CarpeDiem Constitution v1.1.0

## 1. SSR and client interaction boundary

**Decision**: Render the complete initial Slider with React `renderToStaticMarkup()` and implement all production interaction in the co-located native DOM `slider.ui.ts` manager. Do not hydrate the component and do not import the manager into `index.tsx`.

**Rationale**: React documents that `renderToStaticMarkup()` output cannot be hydrated. The repository already bundles `components/**/*.ui.ts` separately into `/js/ui.js`, and the constitution forbids browser globals, mutable state, and production event-handler props in SSR render paths. This boundary preserves useful HTML before JavaScript while giving the manager exclusive ownership of later DOM mutations.

**Alternatives considered**:

- `renderToString()` plus `hydrateRoot()`: rejected because it changes the theme architecture and the specified static SSR contract.
- React state and event props: rejected because production markup is not hydrated and the constitution assigns interaction to `*.ui.ts`.
- A client-only Slider shell: rejected because the initial HTML must expose value, range, name, orientation, and disabled semantics.

**Source**: [React `renderToStaticMarkup`](https://react.dev/reference/react-dom/server/renderToStaticMarkup)

## 2. Canonical native control and form behavior

**Decision**: Use exactly one native `<input type="range">` as the canonical focus, keyboard, form, value, disabled, and accessibility control. Root, rail, visual thumb, marks, and labels remain presentation/interaction surfaces without a second slider role or tab stop. Preserve the normalized SSR `value` separately as the immutable reset baseline.

**Rationale**: The HTML range state supplies native range and step semantics and participates in form data and form reset. Keeping a separate immutable baseline is necessary because the product contract must not change when a live `value` or content attribute is mutated after construction. Manager-originated synchronization must not synthesize native `input` or `change` events.

**Alternatives considered**:

- Custom `role="slider"` on the visual thumb: rejected because it duplicates native semantics and requires recreating form/focus behavior.
- Browser reset behavior as the only baseline source: rejected because later attribute mutation could change the reset result, contrary to immutable registration configuration.
- A hidden input plus a separate focusable slider: rejected because it creates two state surfaces and weakens native range semantics.

**Sources**: [HTML range state](https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)), [resetting a form](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#resetting-a-form), [constructing form data](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-form-data-set)

## 3. Numeric representation and normalization

**Decision**: Expand each JavaScript number to canonical plain decimal, derive one immutable power-of-ten configuration scale, and perform configuration normalization, tie-breaking, stepping, mark generation, and duplicate detection only with safe integer `number` operations. Treat an unsafe scale or intermediate as `NUMERIC_REPRESENTABILITY`. Use a temporary combined scale only for construction-time live-value adoption and silently fall back to the SSR baseline when that local calculation is unsafe.

**Rationale**: This implements the exact decimal behavior in FR-140 through FR-143 without binary residue, tolerance drift, an arbitrary-precision dependency, or a second numeric public type. Guarding every scale and intermediate with `Number.isSafeInteger()` gives a deterministic fatal boundary and prevents unbounded automatic-mark loops caused by collapsed steps.

**Alternatives considered**:

- Raw IEEE-754 accumulation or `Number.EPSILON`: rejected because accepted values and tie results would depend on magnitude and accumulation order.
- Decimal library: rejected because no new runtime dependency is necessary and the public contract remains `number`.
- `BigInt`/arbitrary-precision arithmetic: rejected by the scope boundary and because conversion back to public `number` would still require an explicit representability boundary.

## 4. Public props, bootstrap, and module boundaries

**Decision**: Define a closed `SliderProps` interface rather than forwarding arbitrary native attributes. `id` and `className` belong to the root; ARIA naming props belong to the canonical input. Do not expose React `onChange` props. Emit the exact field-by-field bootstrap and related-element hooks from FR-274 through FR-276, then remove only that allowlist after successful registration. Export the React component from `index.tsx` and the manager/error pair from the separate `slider.ui.ts` entry.

**Rationale**: A closed surface prevents unsupported event props and ambiguous root/input ownership. The root ID supports the public manager ID target, while `aria-label`/`aria-labelledby` stay on the native control that owns the accessible name. The existing UI bundler treats every `.ui.ts` as a separate entry, so one Slider UI entry avoids repeated module side effects and helper duplication.

**Alternatives considered**:

- Extending all root `HTMLAttributes`: rejected because it expands the public contract beyond the feature and exposes production `on*` props without a requirement.
- JSON bootstrap: rejected because the spec requires independently validated, transient field attributes and related-element hooks.
- Importing `slider.ui.ts` from the React entry: rejected because it would mix browser lifecycle code into the SSR graph.
- Several Slider `.ui.ts` entries: rejected because the bundler would compile each entry independently.

## 5. Pointer geometry and input ownership

**Decision**: Let the Slider root own pointer capture. For coordinate pointerdown and every matching pointermove, read one event-local `getBoundingClientRect()` snapshot and combine it with `clientX` or `clientY` in the same viewport coordinate system. Clamp the finite ratio to `[0, 1]`. Do not add scroll offsets, cache the pointerdown rect, or install resize/layout observers.

**Rationale**: Pointer capture retargets subsequent pointer events to the capturing element, giving one stable owner even if the visual source moves. CSSOM View defines `getBoundingClientRect()` and client coordinates in viewport terms. A fresh rect per coordinate event responds to rail movement without persistent observers and enforces the one-read performance contract.

**Alternatives considered**:

- Capturing on the rail, thumb, or label: rejected because source replacement/removal would split interaction ownership.
- `pageX`, `offsetX`, target-relative coordinates, or manual scroll compensation: rejected because they mix coordinate spaces.
- Caching geometry for the drag lifetime: rejected because repositioning and resizing must affect the next move.
- `ResizeObserver` or polling: rejected because the spec requires event-local measurement without deferred geometry infrastructure.

**Sources**: [Pointer capture](https://www.w3.org/TR/pointerevents3/#setting-pointer-capture), [release pointer capture](https://www.w3.org/TR/pointerevents3/#releasing-pointer-capture), [CSSOM View `getBoundingClientRect()`](https://drafts.csswg.org/cssom-view/#dom-element-getboundingclientrect), [CSSOM View client coordinates](https://drafts.csswg.org/cssom-view/#dom-mouseevent-clientx)

## 6. Ownership, snapshot, cleanup, and rollback design

**Decision**: Keep one `SliderManager` class as the owner, a module-scoped `WeakMap<Element, OwnershipRecord>` for live and pending reservations, a granular pre-construction DOM snapshot, and an append-only completion-order cleanup manifest. Restore exact surfaces and pre-existing node identities with captured references and inverse operations. Never restore by replacing root `innerHTML` or a cloned subtree.

**Rationale**: A `WeakMap` enforces one live/pending owner per root without turning DOM attributes into application state. A mutation journal can restore attributes, properties, text, styles, classes, positions, and added nodes while preserving consumer listeners and pre-existing node identity. Cleanup closures recorded only after successful acquisition naturally provide strict LIFO rollback, pending retries, and first-thrown identity handling.

**Alternatives considered**:

- `cloneNode()` or `innerHTML` replacement: rejected because it changes node identities and loses consumer listener ownership.
- Runtime state in `data-*`: rejected because transient attributes must be consumed and manager memory is the source of truth.
- Separate lifecycle/registry manager classes: rejected because the repository contract requires exactly one feature manager class.
- Automatic scan, observer, or coordinator: rejected because root selection, failure isolation, and retry belong to the consumer.

## 7. DOM notifications and form reset scheduling

**Decision**: Construct fresh bubbling, non-cancelable `CustomEvent` instances with numeric `detail.value`; snapshot the global constructor once per notification sequence. Treat `dispatchEvent()` as synchronous and let listener exceptions follow browser global reporting. Schedule one `queueMicrotask()` callback for each applicable reset event, with no Promise/timer fallback, and perform liveness/cancellation/form-owner checks inside that callback.

**Rationale**: DOM dispatch invokes listeners synchronously, while listener exceptions are reported rather than rethrown to the `dispatchEvent()` caller. `queueMicrotask()` runs after the current synchronous work at a microtask checkpoint and preserves ordinary exception reporting instead of converting callback errors into Promise rejection. A sequence-local constructor snapshot and post-hook liveness checks make reentrant teardown deterministic.

**Interpretation note**: “First post-dispatch microtask” means the one callback this manager enqueues for that reset and runs at the next applicable microtask checkpoint. It does not claim the first position in the global microtask queue; an earlier reset listener may already have queued work.

**Alternatives considered**:

- Promise reaction scheduling: rejected because thrown callback values would use rejection semantics.
- `setTimeout()`: rejected because it moves reset application to a later task.
- Catching DOM listener exceptions: rejected because it would require non-standard error interception and change platform dispatch semantics.
- Reading `CustomEvent` before synchronization: rejected because no event is needed if synchronization fails or produces no notification.

**Sources**: [DOM `CustomEvent`](https://dom.spec.whatwg.org/#interface-customevent), [DOM `dispatchEvent()`](https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent), [DOM listener invocation](https://dom.spec.whatwg.org/#concept-event-listener-inner-invoke), [HTML microtask queuing](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing)

## 8. Accessibility and adaptive visual behavior

**Decision**: Meet the constitution's WCAG 2.1 AA baseline and the repository guide's WCAG 2.2 AA expectations without claiming AAA. Provide a visible focus indicator with at least 3:1 adjacent contrast, at least the specified 24×24 or 32×32 pointer area, non-color state cues, system-color-compatible forced-colors styling, and removal/immediate completion of non-essential motion. Map new `--slider-*` semantic variables to existing palettes rather than adding a raw palette.

**Rationale**: WCAG 2.1 requires visible focus and 3:1 non-text contrast for UI states. WCAG 2.2 AA adds a 24×24 CSS px minimum target criterion. Forced-colors can remove author shadows/background treatments, so durable borders/outlines and system colors are required. The specified 24/32 px areas do not establish the 44×44 AAA enhanced target, and the specified focus rule alone does not establish every WCAG 2.2 AAA focus-appearance condition.

**Alternatives considered**:

- Claiming WCAG AAA: rejected because 24/32 px targets are below the enhanced 44×44 criterion and the spec does not define every AAA focus metric.
- `forced-color-adjust: none` by default: rejected because it can defeat user-selected high-contrast colors.
- Hard-coded component colors: rejected by the SCSS workflow; semantic tokens must map to the theme source of truth.

**Sources**: [WCAG 2.1 Focus Visible](https://www.w3.org/TR/WCAG21/#focus-visible), [WCAG 2.1 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast), [WCAG 2.2 Target Size Minimum](https://www.w3.org/TR/WCAG22/#target-size-minimum), [Target Size Enhanced](https://www.w3.org/TR/WCAG22/#target-size-enhanced), [Forced Colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors), [CSS forced color adjustment](https://drafts.csswg.org/css-color-adjust-1/#forced), [Reduced Motion](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion)

## 9. Test architecture and delivery gates

**Decision**: Use TDD for every public TSX, helper, and UI behavior unit. Keep pure numeric/render tests in helper suites, SSR markup in `index.test.tsx`, and manager behavior in contract-focused jsdom suites. Stub pointer capture, DOMRect, focus, descriptors, and thrown sentinels deterministically. Use Storybook's Playwright/Chromium project for representative real-browser interaction and visual/adaptive checks. Require at least 80% V8 coverage for new/modified Slider scope.

**Rationale**: The feature has 310 functional requirements and 160 measurable outcomes spanning distinct failure domains. Splitting tests by observable contract makes RED/GREEN/REFACTOR practical while all suites still exercise the single production manager. jsdom is suited to deterministic fault injection; browser tests cover platform pointer behavior and computed visual media states that jsdom cannot prove.

**Alternatives considered**:

- One monolithic UI test file: rejected because failure localization and lifecycle matrix maintenance would be poor.
- Storybook `play` as the only interaction coverage: rejected because smoke tests do not replace branch-level unit/fault-injection tests.
- jsdom-only verification: rejected because real pointer capture, forced colors, layout, and focus presentation need browser evidence.

## Resolution status

- The feature specification has no `NEEDS CLARIFICATION` marker.
- FR-290 and FR-293 resolve the historical rollback ambiguity by using operation-start state and exact reverse write-completion order.
- No Phase 0 research item requires a new runtime dependency or a constitution exception.
