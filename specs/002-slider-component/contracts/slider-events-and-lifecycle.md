# Contract: Slider Events and Lifecycle

**Feature**: `002-slider-component`  
**Runtime entry**: `components/atoms/Slider/slider.ui.ts`  
**Constitution**: CarpeDiem Constitution v1.1.0

## Stable listener topology

Successful registration creates these exact lifetime-stable tuples:

| Owner | Event | Count | Options |
| --- | --- | --- | --- |
| Slider root | `pointerdown` | 1 | `{ capture: false, passive: false }` |
| Slider root | `keydown` | 1 | `{ capture: false, passive: false }` |
| Slider root | `pointermove` | 1 | `{ capture: false, passive: false }` |
| Slider root | `pointerup` | 1 | `{ capture: false, passive: false }` |
| Slider root | `pointercancel` | 1 | `{ capture: false, passive: false }` |
| Slider root | `lostpointercapture` | 1 | `{ capture: false, passive: false }` |
| Registration-time `window` | `blur` | 1 | `{ capture: false, passive: true }` |
| Logical form | `reset` | 1 per manager | `{ capture: false, passive: true }` |

Root listeners are delegated. Rail, thumb, mark label, and canonical input receive no direct admission listener. Continuation/terminal/blur tuples exist for the whole registration lifetime and are not added or removed at interaction boundaries. Removal uses the same callback and exact options identity/shape used for registration.

The manager never calls `stopPropagation()` or `stopImmediatePropagation()` for admitted or rejected native pointer/keyboard events. It does not repair existing propagation flags.

## Pointer source identity

- Initialization stores exact element identities for the rail, visual thumb, and mark labels.
- `pointerdown` walks the light-DOM target-to-root path and chooses the nearest stored source identity.
- Runtime selectors, attributes, classes, or structural shape never recalculate the source set.
- A newly inserted or replacement lookalike is inert until `destroy()` and a new registration.
- The canonical input is never a manager pointer source.
- The Slider root, not the source or event target, owns capture for the initiating pointer ID.

## Pointerdown sequence

After global operation guards allow input, process a delegated source in this observable order:

1. Confirm source identity.
2. Read `defaultPrevented`; if true, stop without further admission property reads.
3. Read `cancelable`; if false, stop without further admission work.
4. Require live, enabled, no active pointer, `isPrimary === true`, and `button === 0` for every pointer type.
5. For rail/thumb coordinate sources, call `getBoundingClientRect()` exactly once before capture or manager DOM writes; require finite start/length and positive length. Mark labels skip geometry and use their stored mark value.
6. Mark the exact root/pointer capture acquisition in flight, then call root `setPointerCapture(pointerId)` once.
7. Call root `hasPointerCapture(pointerId)` once. `false` clears temporary pointer state and stops without release/focus/default prevention; throw clears state, attempts exact cleanup release, and preserves the confirmation value.
8. Call canonical input `focus({ preventScroll: true })` exactly once, even if it is already focused or the normalized value will not change.
9. Check manager liveness, then call root `hasPointerCapture(pointerId)` exactly once more. Non-live leaves cleanup to nested teardown; `false` keeps focus but clears temporary state without release; throw clears state, attempts exact cleanup release, and preserves the confirmation value.
10. Call pointerdown `preventDefault()` exactly once. On throw, clear state first, attempt exact cleanup release, keep focus/resulting page state, and preserve the preventDefault value.
11. Check liveness immediately. If non-live, perform no outer release, value work, or notification.
12. Start the active interaction and synchronize an applicable changed value.

`setPointerCapture()` throw stops before focus/default prevention/value work and preserves the thrown value while an otherwise untouched manager stays live. Reentrant destroy inside capture/focus hooks makes terminal lifecycle authoritative. Only an in-flight `setPointerCapture()` may require one same-stack release reconciliation because capture can appear after nested teardown.

## Pointer coordinate mapping

| Orientation | Pointer coordinate | Rect fields | Ratio before clamp |
| --- | --- | --- | --- |
| Horizontal | `event.clientX` | `left`, `width` | `(clientX - left) / width` |
| Vertical | `event.clientY` | `top`, `height` | `(top + height - clientY) / height` |

- Client and rect values share viewport coordinates; do not read page/offset/screen coordinates or add scroll offsets.
- Clamp each finite ratio inclusively to `[0, 1]` before numeric-step/restricted normalization.
- Horizontal is always physical left `min` to right `max`, including explicit/inherited RTL.
- Vertical is bottom `min` to top `max`.
- Each coordinate pointerdown/move gets one new rect snapshot. No drag-lifetime cache, second layout read, resize listener, observer, timer, or polling is allowed.
- A normally returned invalid rect/coordinate makes that event value work a no-op; an actual geometry hook throw follows the feature's isolated thrown-value path.

## Pointermove sequence

Only the active initiating pointer may update value.

1. Read `defaultPrevented` and `cancelable` before geometry/current value.
2. Only when `cancelable === true && defaultPrevented === false`, call `preventDefault()` once before geometry. A throw aborts that move only and retains interaction, capture, manager liveness, and last value.
3. Check liveness after the call.
4. Read one current rail rect and coordinate.
5. Invalid returned geometry keeps the last value with no change notification; a later valid move resumes normally.
6. Valid geometry clamps and normalizes the value, then synchronizes only if the value changes.

The other three `cancelable`/`defaultPrevented` combinations skip manager default prevention but still process valid geometry identically.

## Pointer terminal sequence

The first applicable initiating `pointerup`, `pointercancel`, `lostpointercapture`, or same-window `blur`:

1. Clears active pointer state before external work so later terminal signals are no-op.
2. Runs `slider:commit` then `onChangeCommitted` once with the last value, even if pointerdown/moves did not change it.
3. If manager remains live and root still owns capture, attempts one runtime `releasePointerCapture()` after commit. `lostpointercapture` does not release again.

Notification failure does not skip an otherwise applicable release, and the earlier manager-level failure remains primary. Reentrant destroy inside notification suppresses the outer runtime release. Reentrant destroy inside the release hook leaves that exact release pending during nested teardown and performs one same-stack release reconciliation before returning/throwing.

## Keyboard admission and mapping

The root's delegated `keydown` handles only the exact canonical input and these keys:

| Key | Numeric step | Restricted values |
| --- | --- | --- |
| `ArrowRight`, `ArrowUp` | Next step/upper endpoint | Next mark |
| `ArrowLeft`, `ArrowDown` | Previous step/lower endpoint | Previous mark |
| `PageUp` | Nearest value toward `current + shiftStep` | Directional nearest mark; larger tie |
| `PageDown` | Nearest value toward `current - shiftStep` | Directional nearest mark; smaller tie |
| `Home` | `min` | First mark |
| `End` | `max` | Last mark |

Admission order is recognized key/target → earliest `defaultPrevented` → `cancelable === true` → live/enabled → Alt/Ctrl/Meta all false. Shift alone uses the unmodified mapping; `shiftStep` is Page-only. Every admitted initial or repeat keydown is independent.

- Call `preventDefault()` once before current-value calculation or state writes, including at a boundary.
- A preventDefault throw changes nothing and the next keydown is independent.
- Check liveness immediately after the call.
- If a pointer interaction is active, pointer ownership wins: after successful default prevention, retain pointer/capture/value and perform no keyboard calculation or notification.
- If idle and the normalized value changes, perform change and commit notification in one sequence.
- If the value is unchanged, perform no change/commit event or adapter call.
- `keyup` never creates a deferred commit.

## Value synchronization transaction

Before the first write, capture operation-start state/surfaces and activate the synchronization guard. Write categories only in this order:

1. manager canonical normalized state;
2. canonical input live value and form payload;
3. `aria-valuenow` and applicable `aria-valuetext`;
4. current-value-dependent rail/thumb/mark visual surfaces.

Every exact external/platform surface is marked in flight before its write and followed by a liveness check. Notification starts only after every category succeeds, with the notification guard activated before the synchronization guard is released.

### Forward failure

- Stop remaining writes and all notification.
- Roll back the attempted surface first, then actually completed writes in exact reverse write-completion order to operation-start state.
- If every rollback succeeds, keep the manager live, preserve an applicable pointer interaction/capture, and throw only the first forward value by identity.
- If any rollback write fails, mark the manager terminal once, stop remaining operation rollback, and run complete construction-snapshot teardown in LIFO order. Retain failed surfaces/resources and root reservation for later `destroy()` retry. The first forward value remains the only externally propagated manager value.

### Reentrant destroy during a write/rollback

Nested teardown marks the current in-flight surface pending and cleans other applicable work. Immediately after the hook returns/throws, the same outer stack reconciles exactly that surface to the construction snapshot once; it does not restart teardown or resume remaining transaction work. A per-surface continuation guard makes extra `destroy()` calls no-op until reconciliation ends. A failed reconciliation remains the only pending surface for a later explicit `destroy()` retry.

## Custom events and adapters

```ts
interface SliderEventDetail {
  readonly value: number;
}
```

| Event | When | Init |
| --- | --- | --- |
| `slider:change` | Each successful actual value change | `{ bubbles: true, cancelable: false, detail: { value } }` |
| `slider:commit` | First pointer terminal, or changed keyboard event | `{ bubbles: true, cancelable: false, detail: { value } }` |

Applicable order after synchronization is:

```text
slider:change dispatch
→ onChange
→ slider:commit dispatch
→ onChangeCommitted
```

- Activate the notification guard before reading the constructor.
- Read global `CustomEvent` once immediately before the sequence's first event and reuse that identity for all events in the sequence.
- Do not pre-check callability/constructability. Attempt each applicable construction once.
- Check liveness after constructor snapshot, event construction, dispatch, and adapter return.
- Event construction, patched/test-double `dispatchEvent()`, or adapter failure preserves already synchronized state, stops unstarted notification steps, and propagates the first manager-observed value by identity.
- Native DOM listener exceptions follow platform global error reporting and are not caught/rethrown by the manager. If dispatch returns and the manager is live, the adapter still runs unless a listener destroyed the manager.
- The guard makes reentrant same-manager pointer/keyboard input an event-type-only no-op with no queue or replay. Public lifecycle calls remain available.

Native range `input` and `change` events are browser-owned. The manager does not synthesize, cancel, redispatch, intercept, or promise a cross-order between them and `slider:*` notifications.

## Form association refresh

`refreshFormAssociation()` is live-manager-only and guarded against nested refresh.

1. Resolve the current associated form.
2. If unchanged, return `undefined` with no listener work.
3. Add the stable reset callback to the new form with exact `{ capture: false, passive: true }`.
4. Remove the same tuple from the old form.
5. Commit the new logical owner only after the required operations succeed.

Failure retains the prior logical owner and tracks any residual tuple behind the logical-owner guard. Later refresh or `destroy()` retries only residual cleanup. Reentrant destroy inside an add/remove/rollback hook makes the manager terminal, leaves that exact tuple pending during teardown, and performs one same-stack exact removal reconciliation.

## Form reset scheduling and transaction

Each reset event from the logical owner:

1. Reads global `queueMicrotask` and, while live, invokes it exactly once with that event's dedicated callback before the listener returns.
2. Uses no synchronous, Promise, timer, task, or alternate microtask fallback.
3. In the callback, checks liveness before any other event/form/DOM read, then final `defaultPrevented`, then logical form ownership.
4. If inapplicable, returns with no state, input, cleanup, warning, or scheduling work.
5. If applicable, activates the reset guard and snapshots the previous normalized value.
6. Cancels an active pointer by clearing state and attempting applicable capture release without commit.
7. Synchronizes the immutable reset baseline using manager → input/form → ARIA → visual order and no notifications.

“First post-dispatch microtask” denotes this manager-enqueued callback at the next applicable microtask checkpoint, not first position in the global microtask queue.

Scheduling getter/invocation failure is not caught or replaced and receives standard global error reporting. Reentrant destroy after an invocation may leave an already-enqueued callback, which exits at the earliest liveness gate. Reset forward/rollback and reentrant teardown use the same transaction, first-thrown, pending-surface, and same-stack reconciliation rules as value synchronization, while completed pointer cancellation/capture release is never rolled back.

## Guards and no-queue rules

| Guard | Suppressed reentrant work |
| --- | --- |
| Initialization | Same-manager initialize fails; destroy records terminal cancellation for outer rollback |
| Synchronization | Same-manager input and refresh are `undefined`/no-op; no replay |
| Notification | Same-manager input is no-op; lifecycle still allowed |
| Reset application | Same-manager input and refresh are no-op; lifecycle still allowed |
| Form refresh | Nested refresh is no-op |
| Teardown | Nested destroy is no-op |
| Per-surface/tuple/capture continuation | Additional destroy is no-op until same-stack reconciliation finishes |
| Per-root recovery | Direct nested lifecycle cleanup is no-op; nested construction fails as specified |

All guards are released with `finally` semantics on every success/throw path. No guard creates a Promise, timer, task, microtask, or deferred replay queue.
