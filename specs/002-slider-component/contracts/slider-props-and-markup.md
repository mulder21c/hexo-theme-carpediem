# Contract: Slider Props and SSR Markup

**Feature**: `002-slider-component`  
**Constitution**: CarpeDiem Constitution v1.1.0

## Public React surface

```ts
interface SliderMark {
  readonly value: number;
  readonly label?: string;
}

interface SliderProps {
  readonly id?: string;
  readonly className?: string;
  readonly min: number;
  readonly max: number;
  readonly value: number;
  readonly step?: number | null;
  readonly shiftStep?: number;
  readonly marks?: boolean | readonly SliderMark[];
  readonly orientation?: "horizontal" | "vertical";
  readonly size?: "small" | "medium" | "large";
  readonly disabled?: boolean;
  readonly name?: string;
  readonly "aria-label"?: string;
  readonly "aria-labelledby"?: string;
}
```

- The interface is closed: arbitrary root/input attributes, `children`, and React event-handler props are not part of the Slider contract.
- `id` and `className` apply to the root. The root ID is usable as a bare or `#` manager target.
- `aria-label` and `aria-labelledby` apply unchanged to the canonical native input. At least one attribute must be present; manager validation checks presence, not accessible-name quality or reference resolution.
- `onChange` and `onChangeCommitted` exist only in `SliderManagerOptions`; they are not React props.
- The component default export is `Slider` from `components/atoms/Slider/index.tsx`. The client manager/error named exports come from `components/atoms/Slider/slider.ui.ts` and are not imported by the SSR entry.

## Defaults and normalization

| Prop | Default/normalization |
| --- | --- |
| `step` | `1`; `null` selects restricted mode and requires non-empty custom marks |
| `shiftStep` | `10` |
| `marks` | `false` |
| `orientation` | `"horizontal"` |
| `size` | `"medium"` |
| `disabled` | `false` |
| `name` | Missing, empty, or whitespace-only becomes unnamed; otherwise preserve exact text |
| `value` | Normalize to the nearest selectable value; exact ties choose the larger value |

All public numeric values remain JavaScript `number`. SSR serialization uses the canonical plain decimal contract shared with the manager. Recoverable value normalization may warn only through the existing SSR project logger; client configuration diagnostics use the manager runtime flag contract.

## Canonical SSR topology

```text
root[id?]
├── input[type="range"]       canonical focus/form/ARIA/value control
├── rail                      coordinate and visual rail
│   ├── visual thumb          presentation and pointer source
│   └── zero or more marks
│       └── optional label    presentation and direct-value pointer source
```

- The root is a visual wrapper and bubbling `slider:*` event target. It has no `role="slider"`, slider value ARIA, or `tabIndex`.
- Exactly one native range input exists under the root. It alone owns focus, keyboard semantics, `min`, `max`, live value, reset `defaultValue`, effective step, `name`, `disabled`, accessible naming, and orientation state.
- The rail, thumb, mark, and mark label expose no additional slider role or tab stop.
- CSS excludes the native input from direct pointer hit testing while preserving keyboard focus and native accessibility/form participation.
- Existing component CSS classes provide styling. Bootstrap attributes are never stylesheet selectors or runtime state storage.

## Persistent native input contract

| Surface | SSR value |
| --- | --- |
| `type` | Exact `range` |
| `min` / `max` | Canonical plain decimal |
| `step` | Canonical numeric step, or `any` for restricted-values mode |
| `value`/`defaultValue` | Canonical normalized SSR reset baseline |
| `name` | Exact non-empty/non-whitespace source text; absent when unnamed |
| `disabled` | Native boolean property/attribute semantics |
| `aria-label` | Forwarded unchanged when present |
| `aria-labelledby` | Forwarded unchanged when present |
| `aria-orientation` | `vertical` for vertical mode; native/default horizontal semantics otherwise |

The manager may change live properties and current-value ARIA/visual surfaces after registration, but these persistent semantic attributes are not transient bootstrap attributes.

## Root bootstrap attributes

Every SSR root emits the effective value for every required field, including defaults.

| Attribute | Required domain |
| --- | --- |
| `data-component` | Exact `slider` |
| `data-slider-min` | Canonical plain decimal |
| `data-slider-max` | Canonical plain decimal |
| `data-slider-value` | Canonical normalized reset baseline |
| `data-slider-step` | Canonical positive decimal or exact `null` |
| `data-slider-shift-step` | Canonical positive decimal |
| `data-slider-marks` | Exact `false`, `true`, or `custom` |
| `data-slider-orientation` | Exact `horizontal` or `vertical` |
| `data-slider-size` | Exact `small`, `medium`, or `large` |
| `data-slider-disabled` | Exact `false` or `true` |
| `data-slider-name` | Optional exact original name; absent for unnamed |

No JSON, encoded object, or fallback configuration attribute is emitted or parsed.

## Related-element bootstrap hooks

| Element | Required hook contract |
| --- | --- |
| Rail | Exactly one element with `data-slider-rail=""` |
| Visual thumb | Exactly one element with `data-slider-thumb=""` |
| Mark | `data-slider-mark=""` and canonical `data-slider-mark-value` on the same element |
| Mark label | When provided, exactly one descendant with `data-slider-mark-label=""`; full `textContent` is the label |

- `marks=false` emits no mark hooks.
- `marks=true` emits every in-range `min + n * step` automatic mark in ascending order.
- Custom marks emit every supplied valid mark in ascending value order.
- Label absence and a present label with empty `textContent` are distinct.
- The native input has no bootstrap identity hook.

## Static mirror

Before ownership or DOM mutation, the manager compares semantic values from root bootstrap and the canonical input:

- `min`;
- `max`;
- effective numeric step or restricted `any` step;
- configured reset value against input `defaultValue`/SSR value content;
- `disabled`;
- normalized optional `name`.

Equivalent numeric spellings compare by meaning, not raw source text. The pre-construction live input `.value` is a current-value candidate and is not part of the static mirror.

## Bootstrap handoff and restoration

1. Resolve and validate one root and complete topology.
2. Snapshot exact allowlisted attribute names, presence, values, and element identities.
3. Validate and normalize all configuration and static mirrors.
4. Capture all manager-writable DOM surfaces before the first mutation.
5. Register ownership/resources and store normalized values plus related element identities in manager memory.
6. Remove every consumed allowlisted bootstrap attribute only after registration succeeds.

If initialization fails, rollback preserves the complete original bootstrap contract. Successful `destroy()` restores the construction snapshot, including consumed bootstrap attributes and the canonical input live value. Unknown `data-slider-*`, persistent metadata, native semantic/form/ARIA attributes, and consumer-owned state are not consumed or restored by the bootstrap mechanism.

## Styling contract

- Sizes: small uses 14 px thumb/2 px rail/minimum 24×24 px hit area; medium uses 16 px/4 px/minimum 32×32 px; large uses 18 px/6 px/minimum 32×32 px.
- Horizontal fills available inline size. Vertical uses parent-provided block size and examples provide explicit height.
- Enabled horizontal pointer surfaces use `touch-action: pan-y`; enabled vertical uses `pan-x`; disabled uses `auto`.
- Component styles consume `--slider-*`, existing spacing/radius, and `--focus-ring` semantic CSS variables. They contain no raw color literals.
- Dark, forced-colors, reduced-motion, hover, active, focus-visible, and disabled states follow FR-058 through FR-071 without relying on color alone.
- Labels are not forcibly truncated; consumers own overflow space.
