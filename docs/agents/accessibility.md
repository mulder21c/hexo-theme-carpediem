# Accessibility Rules

## Accessibility (WCAG 2.2 AA)

- Prefer semantic HTML; avoid unnecessary `div`/`span` usage when semantic elements exist.
- Images require descriptive `alt` text.
- Decorative images should use `alt=""` with appropriate role handling.
- Use ARIA for relationships/states only when semantics alone are insufficient.
- Do not suppress `eslint-plugin-jsx-a11y` rules.
