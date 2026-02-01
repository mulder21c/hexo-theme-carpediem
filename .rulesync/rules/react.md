---
targets:
  - '*'
root: false
description: React 모범 사례
globs:
  - '**/*.tsx'
  - '**/*.jsx'
cursor:
  alwaysApply: true
  description: React 모범 사례
  globs:
    - '**/*.tsx'
    - '**/*.jsx'
---
# React Best Practices

## Component Structure
- Use functional components over class components
- Keep components small and focused
- Extract reusable logic into pure functions (no custom hooks)
- Use composition over inheritance
- Implement proper prop types with TypeScript
- Split large components into smaller, focused ones

## Hooks (SSR-safe Only)
- Follow the Rules of Hooks
- Use only SSR-safe Hooks
- Verify Hook SSR safety via React docs; default to pure functions

## State Management
- No state management
- Pass all data via props only
- Accept prop drilling

## Performance (Server-Optimized)
- Skip memoization
- Always use unique key props in lists
- Minimize nested components for faster server rendering
- Use Suspense only for static fallbacks

## Forms (Static Only)
- No interactive forms (omit onSubmit, onChange handlers)
- Display static validation messages via props
- Use semantic HTML for accessibility

## Error Handling (Server-Side)
- No Error Boundaries
- Handle errors at server level with fallback HTML
- Validate props to cover edge cases

## Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Provide proper alt text for images

## Code Organization
- Group related components together
- Use proper file naming conventions
- Implement proper directory structure
- Keep styles close to components
- Use proper imports/exports
- Document complex component logic 

## Hexo theme Specific
- Avoid any browser-specific global (window, document, navigator) during render. Always assume SSR context.
- Do not use client-side routing (e.g., BrowserRouter). Prefer static links and anchors.
