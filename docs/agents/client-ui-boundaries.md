# Client UI Boundaries

## Core Principles

- User interaction is handled by `*.ui.ts` via native DOM APIs and is separated from the React render boundary.
- Do not use the DOM as an application state store.

## Project Data Flow

`components/**/*.ui.ts` and `layout/**/*.ui.ts` run as a separate `/js/ui.js` bundle and manage only the DOM they need. Files are co-located in the corresponding component/layout folder.

## Client UI Boundaries

- Put browser interaction code only in `*.ui.ts`.
- `*.ui.ts` must not use React components or React state, and must not import SSR modules into the browser runtime.
- Follow SSR-safe React constraints (no event handler props, no browser globals, and so on) in [React SSR and Interaction](./react-ssr-and-interaction.md).
- Access `window` and `document` only after client entry. Wrap module top-level side effects in `typeof window !== "undefined"` / `typeof document !== "undefined"` guards so SSR evaluation remains safe.
- When runtime state is needed, keep it in script-owned memory such as manager instance fields, a `Map`, or timers.
- Prefer standard HTML/ARIA attributes such as `hidden`, `aria-expanded`, `aria-selected`, and `checked` for visibility and accessibility state.
- Reflect values that are known only at runtime—such as position and animation—via inline styles.
- Use `classList` only with globally stable classes, not CSS Modules hashed class names. `*.ui.ts` does not import SSR SCSS Modules, so it cannot know hashed class names, and those hashes can change per build. Define globally stable classes (for example, `visually-hidden`) in global stylesheets such as `source/css/base/_reset.scss`.
- Do not store business data or serialized objects in attributes when that data cannot be recomputed from the DOM.

React owns the initial markup; `*.ui.ts` owns subsequent interaction mutations. Do not assume React re-renders or syncs DOM that client scripts have changed.

## Implementation Patterns and Entry Points

- Prefer a class manager with an `init()` / `destroy()` contract. A factory may provide the same contract, but the public API must match the class shape.
- Automatic bootstrap on module evaluation is allowed. Recommended pattern:

```ts
if (typeof window !== "undefined") {
  window.TooltipManager = TooltipManager;
  window.tooltip = new TooltipManager();
}
```

- Call `init()` from the constructor or entry point to scan and register DOM. `init()` must be idempotent.
- Use `console.error` / `console.warn` for client runtime diagnostics. Do not import the SSR `HexoContext` logger from `*.ui.ts`.

## DOM Contract and `data-*`

Do not add new `data-*` attributes by default. Express the contract with these means first:

1. Semantic HTML attributes such as `id`, `for`, `name`, `value`, and `role`
2. Accessibility relationships such as `aria-controls`, `aria-describedby`, and `aria-labelledby`
3. Native state such as `hidden`, `checked`, and `disabled`

Use `data-*` only as a bootstrap contract between SSR markup and `*.ui.ts`. SSR emits static options and initialization hooks as attributes; `init()` in `*.ui.ts` moves those values into memory and removes the DOM attributes so they are not exposed to users. Do not leave runtime state in attributes.

When using `data-*` as a bootstrap contract, apply these constraints:

- Use them only for initialization targets, static options, and child element hooks—not for runtime state.
- Do not use them for CSS selectors or `attr()`-based styling.
- Keep value domains aligned with the component public types, and perform runtime validation on the client.
- If the script removes or changes an attribute, restore the original value in `destroy()`.
- Do not emit production-irrelevant attributes such as `data-testid` in production HTML.

## Client UI Lifecycle

- Calling `init()` multiple times must not duplicate listeners or instances.
- Clearly own registered event listeners, observers, timers, and animation frames, and clean them all up in `destroy()`.
- If supporting dynamically added or removed DOM, track registration and drop references to removed nodes.
- After `destroy()`, re-initialization must preserve the initial DOM contract (including `data-*`).
- Hexo serves static pages, so `destroy()` is rarely called in production. Primary use cases are test isolation and Storybook/HMR remounts. Leak-free teardown remains a required contract.

## Global Namespace Exposure

- Expose only the minimum API needed for integration on `window`.
- When exposing both a class and an instance, distinguish naming: use `PascalCase` for the class (`TooltipManager`) and short `camelCase` for the default instance (`tooltip`).
- Perform exposure only inside a `typeof window !== "undefined"` guard.
- Do not reassign an existing key with the same name, to prevent duplicate loads and collisions.
- If a `Window` interface extension is needed, declare it in the feature's `type.d.ts`.

## Change Checklist

- Is ownership of client runtime state clearly inside `*.ui.ts`?
- Are states expressible via native HTML/ARIA attributes not duplicated in separate attributes?
- Was it reviewed whether the DOM contract can be expressed without new `data-*` attributes?
- Do defaults, allowed values, and selectors form one contract between SSR and client?
- Are initialization, teardown, and re-initialization safe, with no listener or timer leaks?
- After `destroy()`, are bootstrap `data-*` attributes and initial DOM state restored?
- Is `window` global exposure minimal and aligned with naming, guards, and collision prevention?
- Is client logging via `console.*`, with no SSR logger imports?
