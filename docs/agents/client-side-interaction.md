# Client-Side Interaction

This document covers the production client-side implementation of interaction.

These rules apply to interaction behavior shipped with the Hexo production theme. They do not prohibit Storybook and test code from driving user input, asserting results, or setting up the actual `*.ui.ts` runtime. Storybook and tests must exercise the production interaction implementation rather than reimplementing its behavior with test-only handlers or state. See [React SSR and Interaction](./react-ssr-and-interaction.md) and [Testing and Storybook](./testing-and-storybook.md) for the corresponding exceptions and test responsibilities.

## Core Principles

- SSR React constraints (no event handler props, no mutable production state) are defined in [React SSR and Interaction](./react-ssr-and-interaction.md).
- Production user interaction is handled by `*.ui.ts` via native DOM APIs and is separated from the React render boundary.
- Do not use the DOM as an application state store.

## Runtime Bundle and Co-location

`components/**/*.ui.ts` and `layout/**/*.ui.ts` run as a separate `/js/ui.js` bundle and manage only the DOM they need. Files are co-located in the corresponding component/layout folder.

## Interaction Boundaries

- Put interaction behavior shipped with the Hexo production theme only in `*.ui.ts`. Storybook and tests may drive and assert that behavior, but must not implement a separate version of it.
- `*.ui.ts` must not use React components or React state, and must not import SSR modules into the browser runtime.
- Access `window` and `document` only after client entry. Wrap module top-level side effects in `typeof window !== "undefined"` / `typeof document !== "undefined"` guards so SSR evaluation remains safe.
- When non-native or derived runtime state is needed, keep it in script-owned memory such as manager instance fields, a `Map`, or timers.
- Prefer native element semantics and state before adding ARIA state.
- Read and update mutable native control state through live DOM properties such as `HTMLInputElement.checked`, `HTMLInputElement.value`, and `HTMLOptionElement.selected`.
- Treat SSR `checked` and editable `value` attributes as initial or default values, not as the source of truth for the control's current runtime state.
- Update reflected boolean state such as `hidden` and `disabled` through DOM properties. Do not represent `false` by leaving a boolean attribute present with the string value `"false"`.
- Use ARIA state such as `aria-expanded` or `aria-selected` only when native semantics are insufficient, and keep it synchronized with the corresponding interaction state.
- Reflect values that are known only at runtime—such as position and animation—via inline styles.
- Use `classList` only with globally stable classes, not CSS Modules hashed class names. `*.ui.ts` does not import SSR SCSS Modules, so it cannot know hashed class names, and those hashes can change per build. Define globally stable classes (for example, `visually-hidden`) in global stylesheets such as `source/css/base/_reset.scss`.
- Do not store business data or serialized objects in attributes when that data cannot be recomputed from the DOM.
- React owns the initial markup; `*.ui.ts` owns subsequent interaction mutations. Do not assume React re-renders or syncs DOM that client scripts have changed.
- Keep bootstrap configuration, component relationships, and custom or derived interaction state in manager-owned memory.

## Manager Ownership and Entry Points

- Implement each interaction feature as exactly one manager class. That class is the manager; do not split ownership across additional classes, factories, or module-level objects.
- Do not create a default manager instance in the production bundle. Consumers create manager instances from the exposed class when needed.
- Each manager instance must own exactly one component element. Multiple instances of the same manager class may manage different component elements, but they must not claim the same element.
- The constructor must call `initialize` and pass it a target. When the caller omits a target, the constructor must pass the feature's default `data-component` attribute selector.
- `initialize` must be public and accept exactly one of these target forms:
  1. A component `Element`
  2. An element `id` (the `id` value, optionally prefixed with `#`)
  3. A `data-component` attribute selector such as `[data-component="tooltip"]`
- Resolve the target as follows:
  - A component `Element`: validate and register that element directly. Do not search its descendants.
  - An element `id`: resolve it with `document.getElementById` (or equivalent), then apply the component `Element` rules to the resolved element.
  - A `data-component` attribute selector: query `document` and register the single matching element.
- A newly resolved `Element` must have the feature's exact `data-component` attribute and satisfy the complete bootstrap contract before registration.
- Check whether the manager already owns a directly supplied or ID-resolved `Element` before validating its removed bootstrap attributes. Reinitializing the same owned element is a no-op.
- Do not accept `Document`, `DocumentFragment`, `ShadowRoot`, container elements, or other search roots as targets.
- If target resolution finds no component element or more than one component element, throw an error without registering anything.
- Do not accept arbitrary CSS selectors. ID strings and `data-component` attribute selectors are distinct target forms.
- `initialize` must return without work when `document` is unavailable so SSR evaluation remains safe.
- After successful registration, calling `initialize` with the same component element is a no-op. Calling it with a different component element must throw an error without changing the existing registration.
- If initialization fails before registration, a later `initialize` call may retry with the same or a different target.
- After `destroy()`, `initialize` must throw; consumers must create a new manager instance.
- The manager owns the resolved component element and stores its normalized configuration, element references, and non-native or derived runtime state in manager-owned memory.
- Manager initialization (`initialize`) and component registration are separate responsibilities. Private methods may discover, validate, register, and release the owned component.
- Do not add public registration, unregistration, or refresh APIs. Consumers manage a dynamically added component by creating a new manager instance for that component.
- Initial-value APIs are feature-specific and are not part of the common manager contract.
- Extra public APIs do not replace the one-class manager, constructor-to-`initialize`, or explicit `window` assignment contract. A feature that needs additional ownership behavior must document the ownership scope, registration entry point, duplicate-ownership behavior, and teardown contract.
- Multiple live managers must not claim the same component element. The feature must detect and report ownership conflicts before registration.
- Explicitly assign the manager class to `window`. Do not rely on implicit, helper-driven, or delayed exposure. See Global Namespace Exposure.
- Never replace a live manager instance without calling its `destroy()` method first.
- Use `console.error` / `console.warn` for client runtime diagnostics. Do not import the SSR `HexoContext` logger from `*.ui.ts`.

## DOM Contract and `data-*`

Do not add new `data-*` attributes by default. Express the contract with these means first:

1. Semantic HTML attributes such as `id`, `for`, `name`, and `role`
2. Static form submission values such as the `value` of a checkbox or radio option
3. Accessibility relationships such as `aria-controls`, `aria-describedby`, and `aria-labelledby`
4. Native live state exposed through DOM properties such as `checked`, `selected`, `hidden`, and `disabled`

Use `data-*` only as a transient bootstrap channel between SSR markup and `*.ui.ts`. Because production React renders only the initial markup, SSR may encode the information that the client manager needs to register an element, understand its client-runtime role, and load its static options.

Initialization must complete the following handoff in order:

1. Resolve exactly one component element from the target passed to `initialize` (component `Element`, element `id`, or `data-component` attribute selector).
2. Read and preserve the exact original names, presence, and values of every bootstrap attribute that will be removed.
3. Validate the complete bootstrap contract.
4. Resolve related and child elements through initialization-only hooks.
5. Store normalized configuration and resolved element references in manager-owned memory.
6. Register the component instance.
7. After registration succeeds, remove every consumed bootstrap attribute from the root and related elements.

After this handoff, manager-owned memory is the source of truth. Runtime behavior must not read the removed attributes again or write changing state back to `data-*`. If any step before successful registration fails, leave the complete bootstrap contract in place so initialization can be diagnosed or retried.

Removal applies only to the live DOM after successful initialization. Bootstrap values remain observable in the initial HTML response, page source, network tools, or before initialization completes, so `data-*` must not contain secrets or sensitive data.

Attributes that must remain after registration are not part of the bootstrap contract. A feature that requires persistent metadata must define a separate feature-specific contract for its ownership and lifecycle.

When using `data-*` as a bootstrap contract, apply these constraints:

- Use them only for registration targets, static options, client-runtime element roles, and initialization-only relationship or child hooks.
- DOM selector APIs such as `querySelector()` may use bootstrap attributes only in manager-owned discovery and registration paths invoked by `initialize`.
- Do not use bootstrap attributes in stylesheet selectors or `attr()`-based styling.
- Keep value domains aligned with the component public types.
- Treat values as untrusted input and validate them before copying them into memory or acting on them.
- Remove every consumed bootstrap attribute after successful registration, including attributes used only to resolve related or child elements.
- Store normalized values and resolved element references in manager-owned memory instead of querying the bootstrap attributes again.
- If registration fails, leave the complete bootstrap contract in place.
- Restore the exact original presence and values of all removed bootstrap attributes, along with other initial DOM state, in `destroy()` so the element can be initialized again.
- Do not use bootstrap attributes for runtime state.
- Do not emit production-irrelevant attributes such as `data-testid` in production HTML.

## Lifecycle

- Track manager-level resources and owned-component resources separately.
- Register the owned component element at most once and track its ownership so another live manager cannot claim it.
- Clearly own registered event listeners, observers, timers, animation frames, and element references.
- When a component is added dynamically, consumers must create a new manager instance for it. Before removing a managed component, consumers must call `destroy()` on its manager.
- `destroy()` must release the owned component, clean up manager-level resources, restore the required initial DOM contract, and clear ownership. It is terminal for that manager instance.
- After `destroy()`, a new manager must be able to discover and register the restored component.
- Hexo serves static pages, so `destroy()` is rarely called in production. Primary use cases are test isolation and Storybook/HMR remounts. Leak-free teardown remains a required contract.

## Global Namespace Exposure

- Every production manager class must be explicitly assigned on `window`. Implicit, helper-driven, or delayed exposure is not allowed.
- Expose only the class, using its `PascalCase` name (for example, `TooltipManager`). The production bundle must not create or expose a default instance.
- Perform exposure only inside a `typeof window !== "undefined"` guard, with an explicit assignment statement such as `window.TooltipManager = TooltipManager`.
- Before assignment, inspect an existing global value with the same name. If no value exists, assign the manager class.
- If an existing value satisfies the feature-defined public API and constructor contract, reuse it without constructing or assigning a replacement.
- If an existing value is incompatible, emit `console.warn` and leave the global value unchanged.
- Consumers may store instances in local variables or on `window`, but this document does not require an instance location or global instance name.
- If a `Window` interface extension is needed, declare it in the feature's `type.d.ts`.

## Validation

- Follow [Testing and Storybook](./testing-and-storybook.md) for test location, file naming, and responsibility boundaries.
- Every changed `*.ui.ts` file must have corresponding unit tests that exercise the actual production interaction implementation.
- Cover applicable DOM behavior, events, timers, observers, registration failures, ownership conflicts, and cleanup.
- Verify that `destroy()` releases manager-level and owned-component resources, restores the initial DOM contract, and allows a new manager to register the restored component.
- When Storybook covers the interaction, its `play` function and setup may drive the actual `*.ui.ts` runtime but must not reimplement production behavior.
- Verify semantic HTML and ARIA behavior according to [Accessibility Rules](./accessibility.md).
- For code changes, run the full validation defined in [Commands and Quality Gates](./commands-and-quality-gates.md): `npm run lint && npm test`.
