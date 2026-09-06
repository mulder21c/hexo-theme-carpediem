# Quickstart: Slider 단일 값 선택

**Feature**: `002-slider-component`  
**Constitution**: CarpeDiem Constitution v1.1.0

## Prerequisites

- Node.js 20 or newer
- Dependencies installed with `npm install`
- Active branch `002-slider-component`
- Feature contracts in [contracts/](./contracts/)

The Slider is a static SSR React component plus a separately initialized native DOM manager. Do not add React state or production event props to make the static output interactive.

## SSR usage

```tsx
import Slider from "@components/atoms/Slider";

export default function VolumeSetting() {
  return (
    <form id="audio-settings">
      <Slider
        id="volume-slider"
        min={0}
        max={100}
        value={40}
        step={5}
        shiftStep={20}
        marks
        name="volume"
        aria-label="Volume"
      />
    </form>
  );
}
```

This renders one native range input plus visual rail/thumb/marks and the transient bootstrap contract. `value` is the SSR/reset baseline, not a controlled React value. Do not pass `onChange` or `onChangeCommitted` to `Slider`.

## Client initialization

Run manager construction only from the browser/client boundary:

```ts
import {
  SliderManager,
  type SliderManagerOptions,
} from "@components/atoms/Slider/slider.ui";

const options: SliderManagerOptions = {
  onChange(value) {
    console.log("changing", value);
  },
  onChangeCommitted(value) {
    console.log("committed", value);
  },
};

const volumeSlider = new SliderManager("volume-slider", options);
```

The production UI bundle also exposes the compatible class/error pair through `window.SliderManager` when both `window` and `document` exist. It never creates an instance or scans roots automatically.

Listen to the canonical DOM events on the root when adapters are not appropriate:

```ts
const root = document.getElementById("volume-slider");

root?.addEventListener("slider:change", (event) => {
  if (event instanceof CustomEvent) {
    console.log(event.detail.value);
  }
});

root?.addEventListener("slider:commit", (event) => {
  if (event instanceof CustomEvent) {
    console.log(event.detail.value);
  }
});
```

Both events bubble and are non-cancelable. `detail.value` is a normalized `number`. Native range `input`/`change` events remain browser-owned and have no promised cross-order with the custom events.

## Form association changes

If consumer code reparents the root or changes its form association while the manager is live and no pointer interaction is active, refresh explicitly:

```ts
volumeSlider.refreshFormAssociation();
```

This updates only the logical reset owner. It does not reread `name`, `disabled`, value configuration, marks, orientation, size, or adapter options.

## Teardown and replacement

```ts
volumeSlider.destroy();

// Replace markup/configuration only after destroy completed successfully.
const replacement = new SliderManager("volume-slider");
```

`destroy()` is synchronous and terminal for that instance. It restores the construction snapshot and emits no notification. If a cleanup operation throws, remove the injected/platform failure and call the same instance's `destroy()` again; only unfinished cleanup is retried. A new manager cannot claim the root until cleanup and reservation release complete.

## TDD implementation sequence

For each unit below, add a focused test and confirm RED before implementation, implement the minimum GREEN behavior, then refactor while the suite remains green.

### 1. Numeric helpers

- Canonical plain-decimal expansion and shortest serialization
- Shared safe-integer scale and representability boundaries
- Numeric-step and restricted-mark normalization
- Tie direction, endpoints, Page targets, and automatic marks
- Extra-precision live-value local-scale fallback

Run:

```sh
npm test -- components/atoms/Slider/__tests__/slider-value.helper.test.ts
```

### 2. SSR view model and markup

- Defaults and recoverable initial-value normalization
- Native input persistent mirror
- Exact root/related bootstrap allowlist
- Automatic/custom/restricted marks and label text
- Naming, vertical orientation, disabled state, and no duplicate role/tab stop
- No React event-handler markup

Run:

```sh
npm test -- components/atoms/Slider/__tests__/index.helper.test.ts components/atoms/Slider/__tests__/index.test.tsx
```

### 3. Manager initialization and global exposure

- Direct element, bare/`#` ID, exact/default selector, and rejected targets
- First-fatal validation order and all 14 registration codes
- Bootstrap consumption, unknown-attribute preservation, and immutable memory
- SSR/no-document evaluation and unowned lifecycle
- Local/compatible/incompatible global pair and read/write/verify failures

Run:

```sh
npm test -- components/atoms/Slider/__tests__/slider.ui.global.test.ts components/atoms/Slider/__tests__/slider.ui.lifecycle.test.ts
```

### 4. Pointer and keyboard interaction

- Stable delegated listener tuples and propagation
- Pointer admission, root capture, exact focus options, and default-prevention failures
- Event-local DOMRect reads, viewport coordinates, endpoint clamp, invalid-to-valid recovery
- Keyboard mapping, repeat, modifier gates, boundaries, and active-pointer ownership
- Pointer terminal commit/release and native event non-interference

Use deterministic `getBoundingClientRect`, pointer-capture, focus, and event-property test doubles in jsdom.

Run:

```sh
npm test -- components/atoms/Slider/__tests__/slider.ui.interaction.test.ts
```

### 5. Notification, form, and fault injection

- State → input/form → ARIA → visual forward order
- Change/commit/adapter ordering, counts, constructor snapshot, and thrown identity
- Explicit association refresh, stable reset tuple, residual cleanup
- One microtask per reset event, cancellation gates, pointer cancellation, and rollback
- Construction rollback, LIFO retry, pending root reservation, guards, and same-stack reconciliation

Run:

```sh
npm test -- components/atoms/Slider/__tests__/slider.ui.form.test.ts components/atoms/Slider/__tests__/slider.ui.reentrancy.test.ts
```

## Storybook/browser verification

Stories must import and drive the real `SliderManager`, then destroy it during story cleanup. Cover:

- use `Meta<typeof Slider>` with the default export as `component`, shared representative `args`, and `argTypes.table.category` values from Appearance, Behavior, Content, State, Layout, and HTML Attributes;
- keep the representative story export PascalCase (`Default` is preferred), use `dedent` for component/story documentation, and hide controls for props fixed by a comparison story;
- import `within`, `expect`, `waitFor`, `userEvent`, and `step` from `storybook/test` when needed;
- create browser globals and manager instances only inside story `render`/`play` execution, and pair every instance with effect cleanup that calls `destroy()`;
- keep `play` scenarios to user-driven smoke/regression coverage; retain branch, rollback, and fault-injection assertions in unit tests;

- small/medium/large horizontal sliders;
- vertical slider in an explicit-height container;
- automatic, custom, restricted, and long-label marks;
- disabled and form reset flows;
- fixed physical horizontal axis in LTR and RTL;
- hover, active, focus-visible, dark, forced-colors, and reduced-motion states;
- representative trusted browser pointer and keyboard interactions.

Run the browser project and static build:

```sh
npx vitest run --project storybook
npm run build-storybook
```

The repository's default `npm test` runs only the unit project, so the Storybook browser command is a separate gate.

## Coverage and final quality gates

```sh
npm run test:unit:coverage -- components/atoms/Slider
npm run lint
npm test
```

- New/modified Slider scope must reach at least 80% Vitest V8 coverage.
- `npm run lint` includes ESLint, Stylelint, Prettier, and TypeScript typecheck.
- Validate that the UI bundler actually includes `slider.ui.ts`; a general bundle log is insufficient if one entry failed.
- In a host Hexo site, generate the theme output and confirm `/js/ui.js` exposes `window.SliderManager` without automatically owning any Slider root.
- If implementation requires a raw color not present in the existing palette, stop before editing `_variables.scss` and obtain the required color decision. The current plan uses existing palette values through new `--slider-*` semantic variables.
