# Data Model: Slider 단일 값 선택

**Feature**: `002-slider-component`  
**Source**: [spec.md](./spec.md)  
**Constitution**: CarpeDiem Constitution v1.1.0

This feature has no persistent database model. The model below describes immutable SSR configuration, normalized numeric values, DOM identity, manager-owned runtime state, and transaction records.

## 1. SliderConfiguration

Immutable snapshot created during successful initialization.

| Field | Type | Default | Validation and meaning |
| --- | --- | --- | --- |
| `min` | `number` | required | Finite and strictly less than `max` |
| `max` | `number` | required | Finite and strictly greater than `min` |
| `resetValue` | `number` | required | Normalized SSR `value`; immutable form-reset baseline |
| `step` | `number \| null` | `1` | Positive finite number, or `null` only with non-empty custom marks |
| `shiftStep` | `number` | `10` | Positive finite Page Up/Down distance; non-multiple numeric step is advisory |
| `marks` | `false \| true \| readonly SliderMark[]` | `false` | Automatic marks, no marks, or custom/restricted candidates |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Horizontal is physical left-to-right even in RTL |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Presentation only; does not change value behavior |
| `disabled` | `boolean` | `false` | Prevents manager input and excludes form submission |
| `name` | `string \| undefined` | `undefined` | Missing/empty/whitespace-only becomes unnamed; otherwise preserve exact text |
| `ariaLabel` | `string \| undefined` | none | At least one naming attribute must exist on the canonical input |
| `ariaLabelledby` | `string \| undefined` | none | Existence is validated; browser owns accessible-name computation |
| `onChange` | `SliderAdapter \| undefined` | `undefined` | Constructor-time manager option, not a React event prop |
| `onChangeCommitted` | `SliderAdapter \| undefined` | `undefined` | Constructor-time manager option, not a React event prop |
| `diagnosticsEnabled` | `boolean` | `false` | Exact constructor-entry snapshot of `window.__carpediemDiagnostics === true` |

### Validation rules

- Validation uses the first-fatal order in FR-128 and FR-279.
- All configuration that affects values becomes manager-lifetime immutable.
- External configuration and consumed bootstrap attributes are not reread after registration.
- Form association is the only relationship that can be explicitly refreshed.

## 2. SliderMark

```ts
interface SliderMark {
  readonly value: number;
  readonly label?: string;
}
```

- Values are finite, unique, within `[min, max]`, and interpreted in ascending order.
- In numeric-step mode, marks are visual guidance only.
- In restricted mode (`step === null`), the non-empty mark set is the complete selectable domain.
- A non-empty current restricted label becomes `aria-valuetext`; an empty/missing label does not.
- Mark count is unbounded by the component. No truncation or virtualization record exists.

## 3. FixedPointDomain

Safe-integer representation shared by SSR and client normalization.

| Field | Type | Meaning |
| --- | --- | --- |
| `scale` | `number` | Minimal safe power of ten preserving all configuration decimal places |
| `minUnits` | `number` | `min * scale`, a safe integer |
| `maxUnits` | `number` | `max * scale`, a safe integer |
| `stepUnits` | `number \| null` | Numeric step in units, or restricted mode |
| `shiftStepUnits` | `number` | Page distance in units |
| `markUnits` | `readonly number[]` | Sorted custom/restricted values in safe units |

Every scale, scaled value, distance, index, step, ratio intermediate, and serialization intermediate must remain safe. Configuration failure produces `NUMERIC_REPRESENTABILITY`; an unsafe construction-time live-value-only domain instead falls back silently to `resetValue`.

## 4. SliderValueState

| Field | Type | Meaning |
| --- | --- | --- |
| `currentValue` | `number` | Current public normalized value |
| `currentUnits` | `number` | Internal safe-integer value |
| `resetValue` | `number` | Immutable normalized SSR reset baseline |
| `canonicalValue` | `string` | Shortest equivalent plain ASCII decimal; no exponent, redundant zeros, or `-0` |
| `ratio` | `number` | Clamped visual position ratio in `[0, 1]` |
| `ariaValueText` | `string \| undefined` | Restricted current mark label only when non-empty |

The same normalized value projects to manager state, canonical input/form, ARIA, visual state, CustomEvent `detail.value`, and adapters.

## 5. SliderDOM

Resolved identity snapshot after topology validation.

| Field | Cardinality | Ownership |
| --- | --- | --- |
| `root` | exactly 1 | Visual wrapper, manager target, CustomEvent dispatch target, pointer capture owner |
| `input` | exactly 1 native range | Focus, keyboard, form, value, disabled, native semantics, ARIA |
| `rail` | exactly 1 | Coordinate geometry and visual rail |
| `thumb` | exactly 1 | Visual position and pointer source |
| `marks` | 0..n | Visual mark identities and values |
| `markLabels` | 0..n | Nested direct-value pointer sources |

The canonical input is not a direct pointer source. Root and visual nodes have no independent slider role or tab stop. Pointer-source identity is captured at initialization and never recomputed from runtime selectors or shape.

## 6. BootstrapSnapshot and DOMSnapshot

### BootstrapSnapshot

Records exact original name, presence, string value, and owning element for every consumed allowlisted bootstrap attribute. Unknown `data-slider-*` attributes are never recorded or mutated.

### DOMSnapshot

Records each manager-writable pre-construction surface before its first mutation:

- input live `.value` and other manager-written properties;
- owned attributes, classes, inline styles, and text;
- pre-existing node identity and original parent/sibling position;
- manager-added node identity and inverse removal operation;
- consumed bootstrap attributes from `BootstrapSnapshot`.

Focus and `document.activeElement` are explicitly excluded. Restoration uses captured nodes and inverse operations, not subtree cloning or `innerHTML` replacement.

## 7. ManagerLifecycle

```text
Unowned
  └─ initialize() ─> Initializing
       ├─ success ─> LiveIdle
       ├─ full rollback ─> Unowned (retryable)
       ├─ partial rollback ─> RollbackPendingRegistration
       └─ reentrant destroy ─> TerminalCleanupPending | TerminalComplete

LiveIdle
  ├─ admitted pointerdown ─> LivePointer
  ├─ keyboard update ─> LiveIdle
  ├─ reset/refresh ─> LiveIdle
  └─ destroy/fatal rollback ─> TerminalCleanupPending | TerminalComplete

LivePointer
  ├─ matching move ─> LivePointer
  ├─ first terminal ─> LiveIdle
  ├─ applicable reset ─> LiveIdle (cancel without commit)
  └─ destroy/fatal rollback ─> TerminalCleanupPending | TerminalComplete

RollbackPendingRegistration
  ├─ recovery failure ─> RollbackPendingRegistration
  └─ recovery success ─> Unowned/retired, then caller may register

TerminalCleanupPending
  ├─ destroy retry failure ─> TerminalCleanupPending
  └─ destroy retry success ─> TerminalComplete
```

### Invariants

- `destroy()` marks a manager permanently non-live before cleanup.
- `TerminalComplete` and non-live guarded APIs never regain liveness.
- A live or pending root reservation admits no second manager.
- Same-stack continuation guards suppress duplicate `destroy()` calls without queueing them.
- A stale originating manager cannot affect a new manager after another manager completes recovery.

## 8. OwnershipRecord

Module-scoped `WeakMap<Element, OwnershipRecord>` entry.

| Field | Type | Meaning |
| --- | --- | --- |
| `root` | `Element` | Exact identity key |
| `owner` | `SliderManager \| undefined` | Current live or originating manager |
| `status` | `"live" \| "rollback-pending" \| "cleanup-pending"` | Reservation reason |
| `cleanupManifest` | `CleanupManifest` | Remaining inverse operations |
| `isRecovering` | `boolean` | Per-root recovery reentrancy guard |

An entry is removed only after every cleanup/snapshot action completes and the ownership-release gate succeeds.

## 9. CleanupManifest

Ordered list of cleanup actions appended exactly once after each successful resource acquisition or DOM mutation completes.

| Field | Type | Meaning |
| --- | --- | --- |
| `sequence` | `number` | Completion order |
| `kind` | discriminated union | Listener, capture, adapter, form tuple, attribute/property/style/text/node surface |
| `cleanup` | `() => void` | Exact inverse operation |
| `status` | `"pending" \| "complete"` | Retry eligibility |

A pass snapshots remaining entries and invokes them in strict reverse completion order. All applicable entries run even after failures. Successful entries are removed; failed entries keep their relative order. The pass rethrows only its first value by identity.

## 10. PointerInteraction

| Field | Type | Meaning |
| --- | --- | --- |
| `pointerId` | `number` | Sole initiating pointer |
| `captureRoot` | `Element` | Always the Slider root |
| `lastValue` | `number` | Last successfully synchronized normalized value |
| `isTerminalHandled` | `boolean` | Prevents duplicate commit/release |

Coordinate events also create an event-local immutable geometry record containing `left/width/clientX` or `top/height/clientY`. It is discarded after the event and never cached for the drag lifetime.

## 11. FormAssociation

| Field | Type | Meaning |
| --- | --- | --- |
| `logicalOwner` | `HTMLFormElement \| null` | Only form allowed to apply reset |
| `resetCallback` | stable function | One manager callback identity |
| `listenerOptions` | `{ capture: false; passive: true }` | Exact registration/removal tuple |
| `residualTuples` | ordered set | Failed removals blocked by logical-owner guard |
| `isRefreshing` | `boolean` | Nested refresh no-op guard |

Refresh adds the new tuple before removing the old tuple. Any failure preserves the old logical owner and retains residual cleanup. Each applicable reset event receives one independent queued callback.

## 12. OperationTransaction

Used for pointer, keyboard, and reset value synchronization.

| Field | Type | Meaning |
| --- | --- | --- |
| `previousValue` | `SliderValueState` | Operation-start rollback baseline |
| `writes` | ordered entries | Attempted/completed manager, input/form, ARIA, and visual surfaces |
| `firstFailure` | `unknown \| unset` | First forward/release failure identity |
| `guard` | boolean | Suppresses same-manager input with no queue/replay |

Forward order is manager state → input/form → ARIA → visual. On failure, rollback starts with the attempted surface and follows exact reverse write completion. A rollback failure terminates the manager and switches to construction-snapshot teardown while preserving the first forward failure identity.

## 13. NotificationSequence

| Field | Type | Meaning |
| --- | --- | --- |
| `value` | `number` | Already synchronized normalized value |
| `customEventConstructor` | sequence-local snapshot | Read once immediately before the first event construction |
| `steps` | ordered list | Change event, onChange, commit event, onChangeCommitted as applicable |
| `guard` | boolean | Same-manager input no-op/no-replay guard |

Every external step is followed by a liveness check. Event/adapter failure preserves the synchronized value and stops unstarted notification steps. Reentrant destroy makes terminal teardown authoritative; the outer sequence only releases its guard and preserves the first escaping thrown identity.

## 14. SliderRegistrationError

```ts
type SliderRegistrationErrorCode =
  | "BROWSER_ENVIRONMENT"
  | "ROOT_TOPOLOGY"
  | "OWNERSHIP_CONFLICT"
  | "ADAPTER"
  | "BOOTSTRAP_CONTRACT"
  | "REQUIRED_NUMBER"
  | "RANGE"
  | "NAMING"
  | "STEP"
  | "STATIC_MIRROR"
  | "MARK"
  | "MARK_LABEL"
  | "SHIFT_STEP"
  | "NUMERIC_REPRESENTABILITY";
```

Internal fatal failures use exact name `SliderRegistrationError`, one code, and an optional canonical field. External callback, DOM, Proxy, and platform thrown values are never wrapped and retain identity.
