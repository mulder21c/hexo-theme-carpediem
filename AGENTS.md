# AGENTS Guidelines

This repository builds a React 19 + TypeScript SSR theme for Hexo blogs.

## Essentials

- For code changes, run `npm run lint` and `npm test` before handoff.
- Non-standard note: `npm run lint` already includes typecheck via `npm run typecheck` (`tsc -p tsconfig.json --noEmit`).
- Keep changes scoped to the request, and never disable checks or commit secrets.

## Detailed Guides

- [Architecture and Project Layout](docs/agents/architecture.md)
- [Commands and Quality Gates](docs/agents/commands-and-quality-gates.md)
- [React SSR and Interaction Rules](docs/agents/react-ssr-and-interaction.md)
- [SCSS and Theme Workflow](docs/agents/scss-and-theme-workflow.md)
- [TypeScript and Naming Conventions](docs/agents/typescript-and-naming.md)
- [Testing and Storybook Rules](docs/agents/testing-and-storybook.md)
- [Accessibility Rules](docs/agents/accessibility.md)
- [Linting and Formatting Rules](docs/agents/linting-and-formatting.md)
- [Git Workflow and Safety Rules](docs/agents/git-workflow-and-safety.md)

## Active Technologies

- TypeScript 5.x with React 19.x JSX + React 19.x, classnames, feather-icons-react, SCSS Modules, HexoContext logger (001-textfield-component)

## Recent Changes

- 001-textfield-component: Added TypeScript 5.x with React 19.x JSX + React 19.x, classnames, feather-icons-react, SCSS Modules, HexoContext logger
