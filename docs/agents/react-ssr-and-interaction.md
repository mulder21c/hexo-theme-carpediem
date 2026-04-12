# React SSR and Interaction Rules

## SSR-Safe React Rules

- Use functional components only (no class components).
- Do not use browser globals (`window`, `document`, `navigator`) in SSR/static render paths.
- Use SSR-safe hooks only; default to pure-function rendering.
- Do not use client-side routing libraries such as `BrowserRouter`.
- Use `Suspense` only with static fallbacks.

## Production State and Interaction Constraints

- Do not use `useState`, `useReducer`, or `useContext` for mutable state in production SSR output.
- In Hexo SSR output, do not pass event handler props such as `onClick`, `onChange`, `onSubmit` at component call sites.
- Accepting standard HTML attributes (including `on*`) for API compatibility does not authorize client-side interaction behavior.
- Data should flow via props; prop drilling is allowed.
- Context usage is limited to static configuration data.

## Exemptions

- Storybook and tests are exempt from production interaction restrictions.
