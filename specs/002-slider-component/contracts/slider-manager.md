# Contract: Slider Client Manager

**Feature**: `002-slider-component`  
**Runtime entry**: `components/atoms/Slider/slider.ui.ts`  
**Constitution**: CarpeDiem Constitution v1.1.0

## Public TypeScript API

```ts
type SliderTarget = Element | string;

interface SliderManagerOptions {
  readonly onChange?: (this: void, value: number) => void;
  readonly onChangeCommitted?: (this: void, value: number) => void;
}

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

class SliderRegistrationError extends Error {
  readonly name: "SliderRegistrationError";
  readonly code: SliderRegistrationErrorCode;
  readonly field?: string;
}

class SliderManager {
  static readonly sliderManagerContract: "carpediem/slider-manager@1";
  static readonly SliderRegistrationError: typeof SliderRegistrationError;

  constructor(target?: SliderTarget, options?: SliderManagerOptions);
  initialize(target?: SliderTarget): void;
  refreshFormAssociation(): void;
  destroy(): void;
}
```

All three public methods are synchronous commands. Every non-throw path returns runtime `undefined`; no method returns a manager, root, form, status, Promise, or thenable.

## Constructor and options

1. Snapshot diagnostic mode once at constructor entry when `window` exists.
2. Accept options only when omitted as `undefined` or provided as a property-bearing object. `null` and primitive values fail immediately with `ADAPTER`/`options` before property access or initialization.
3. Read `onChange`, then `onChangeCommitted`, each at most once. Preserve a getter's thrown value identity and stop before the next field or `initialize()`.
4. Store callback references immutably. Validate callability during the first browser initialization, not during a document-unavailable SSR construction.
5. Call public `initialize(target)`. Omitted/`undefined` target resolves through the exact default `[data-component="slider"]` selector.

Adapters are receiverless synchronous calls with one normalized numeric argument. Their return values, Promises, and thenables are ignored without property access or settlement handlers. A thrown value is never wrapped and stops unstarted notification steps while leaving an otherwise live manager live.

## Target resolution

Resolution occurs against the current global `document` in this order:

| Input | Resolution |
| --- | --- |
| Direct `Element` | Validate that exact element; never search descendants |
| Bare ID | One exact `document.getElementById()` lookup |
| `#` ID | Remove one leading `#`, then one exact ID lookup |
| Exact `[data-component="slider"]` | Query current document and require exactly one match |
| Omitted target | Same exact component-selector query |

Any other string is an ID, not an arbitrary CSS selector. Empty/missing IDs, unsupported node types, zero/multiple selector matches, a detached/adopted/cross-document/iframe/Shadow DOM element, or a root outside current-document light DOM fails with `ROOT_TOPOLOGY` before ownership or bootstrap access.

A newly registrable element must satisfy:

- `ownerDocument === document`;
- `isConnected === true`;
- `getRootNode() === document`;
- exact `data-component="slider"`;
- no descendant Slider root;
- exactly one native range input and complete related-element topology.

After successful registration, same-document light-DOM reparent/detach/reconnect does not change manager identity or configuration. Cross-document, iframe, and Shadow DOM moves require completed `destroy()` first.

## Initialization and ownership

- A module-scoped identity registry permits at most one live, rollback-pending, or cleanup-pending owner/reservation for each root.
- A live manager called with its direct owned element or an ID resolving to the same element is an observable no-op before removed bootstrap validation.
- Omitted/selector targets are re-queried. Zero/multiple matches fail with `ROOT_TOPOLOGY`; a different root fails with `OWNERSHIP_CONFLICT` without changing the live registration.
- A retryable unowned manager may initialize the same or another valid root after a completely rolled-back failure.
- A destroyed manager cannot initialize again.
- Successful registration consumes the exact bootstrap allowlist and makes manager memory the runtime source of truth.
- The module performs no automatic scan, observer, rescan, retry, or default instance creation.

### Initialization guard

Browser initialization activates a per-manager guard before target resolution. Nested `initialize()` fails with `OWNERSHIP_CONFLICT` before reading the nested target. Reentrant `destroy()` marks terminal cancellation but does not run partial cleanup itself; the outer initialization stops after the current hook and rolls back every acquired resource. A normal hook return yields a primary `OWNERSHIP_CONFLICT`; a hook-thrown value remains primary by identity.

## First-fatal validation order

1. Browser availability and target/root identity resolution.
2. Manager lifecycle, rollback recovery, and root registry outcome.
3. Unowned root connection, light-DOM topology, canonical input, and related hooks.
4. Adapter callability.
5. Orientation, size, and disabled bootstrap lexical domains.
6. Required numeric fields.
7. Range relationship.
8. Presence of at least one canonical-input naming attribute.
9. Step.
10. Static SSR mirror.
11. Marks and labels.
12. Shift step.
13. Numeric representability.

The first fatal tries one applicable development warning and immediately throws its category error. Later reads, normalization, advisory warnings, live-value adoption, ownership, listeners, and DOM mutations do not start. Only after all fatal checks pass may recoverable initial-value normalization, automatic-mark advisory, shift-step advisory, and live-value adoption run in that order.

## Error identity

- Manager-detected fatal failures use the exported `SliderRegistrationError` and stable `name`, `code`, and optional canonical `field`.
- Exact human-readable `message` text is not a compatibility surface.
- DOM APIs, callbacks, getters, Proxies, and browser platform operations may throw any value. Preserve the first applicable value by identity; never wrap it in `SliderRegistrationError`.
- Cleanup continues through all applicable entries. Later cleanup/reconciliation values never replace a primary forward or earlier LIFO failure.

## SSR behavior

- Module evaluation is side-effect-free unless both `window` and `document` exist.
- When `document` is unavailable, `initialize()` does not resolve the target, own a root, access DOM, attach resources, log, or schedule work. The manager remains unowned with its constructor callback snapshots.
- Destroying such an unowned manager releases callback references and makes the instance terminal without DOM/global/log access.
- Later global availability does not trigger deferred exposure or initialization. A still-unowned manager may be explicitly initialized once `document` exists; a destroyed manager may not.

## Diagnostics

```ts
declare global {
  interface Window {
    __carpediemDiagnostics?: boolean;
    SliderManager?: typeof SliderManager;
  }
}
```

- Configuration diagnostics are enabled only when the constructor-entry read is exactly boolean `true`.
- A missing, false, non-boolean, or throwing flag read becomes a silent disabled snapshot.
- `NODE_ENV`, build mode, options, and markup do not affect the mode.
- The module never creates, changes, or deletes the diagnostic property.
- Enabled configuration warnings call `console.warn` best-effort. Missing/non-callable/throwing console access is suppressed and never changes validation, correction, advisory, or thrown identity.
- Production-mode configuration validation does not access `console.warn`.

## Global class/error pair

Local implementations expose non-writable, non-configurable own data markers:

```text
SliderManager.sliderManagerContract = "carpediem/slider-manager@1"
SliderRegistrationError.sliderRegistrationErrorContract =
  "carpediem/slider-registration-error@1"
SliderManager.SliderRegistrationError = SliderRegistrationError
```

Global exposure runs once only when both globals exist:

1. Read `window.SliderManager` once.
2. If `undefined`, assign the local manager once, then verify-read exactly once. Only exact identity is success.
3. If a value exists, require a function and inspect own data descriptors in dependency order: manager marker → static error pair → error marker. Read each required descriptor at most once; short-circuit on first mismatch or throw. Do not invoke, construct, inspect prototypes, or execute accessors.
4. A compatible pair becomes the exact module export pair without assignment.
5. An incompatible value remains untouched and receives one best-effort `console.warn("SliderManager global conflict", existingValue)` independent of diagnostic mode.

Initial read, write, or verify failure receives one best-effort exposure warning with exact phase `read`, `write`, or `verify` and the original thrown/observed detail. No retry, `defineProperty`, delete, reread, or rollback follows. Exposure failures do not escape module evaluation and local exports remain available.

## Destruction and cleanup

- `destroy()` marks the manager permanently non-live before the first cleanup.
- Every successful acquisition/mutation appends one inverse action after completion.
- Each pass snapshots remaining actions and attempts them once in strict LIFO order, regardless of prior failures.
- Successful actions are removed. Failed/unstarted actions retain relative order for the next `destroy()` retry.
- Root reservation is released only when every action and snapshot restoration completes.
- Reentrant `destroy()` during a cleanup pass is an observable no-op under the teardown guard.
- `destroy()` never calls `focus()` or `blur()`, never restores focus history, and emits no native/custom event or adapter call.
- Successful cleanup restores exact pre-construction writable DOM surfaces and node identities. Consumer-owned listeners and unknown attributes remain intact.

## Rollback-pending recovery

If initialization rollback cannot finish, the registry retains root identity, reservation, non-live guard, and remaining manifest even when a throwing constructor returns no instance.

- Direct element or ID resolution of that exact root may start recovery before normal validation.
- Omitted/component selector zero-match never scans the pending registry.
- A recovery pass uses the same strict LIFO/first-thrown rules and a per-root guard.
- Nested public `initialize()` and originating-manager `destroy()` during recovery are no-op; nested construction fails with `OWNERSHIP_CONFLICT` after releasing only its new callback snapshots.
- Full recovery removes the record and reservation. If another manager completed it, the originating manager is retired before the new manager acquires resources.
