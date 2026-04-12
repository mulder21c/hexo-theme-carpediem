# Commands and Quality Gates

## Environment

- Required Node.js: `>=20.0.0`
- Package manager: `npm`

## Core Commands

- Install: `npm install`
- Storybook dev server: `npm run storybook`
- Storybook static build: `npm run build-storybook`
- Full validation: `npm run lint && npm test`
- Lint bundle: `npm run lint`
- Typecheck only: `npm run typecheck`
- Test: `npm test`
- Optional auto-fix: `npm run lint:fix` (keep scope limited to your current work)

## Lint Bundle Definition

`npm run lint` runs all of the following:

1. `npm run lint:eslint`
2. `npm run lint:stylelint`
3. `npm run lint:prettier`
4. `npm run typecheck`

## Definition of Done

Before reporting completion, verify:

1. `npm run lint` exits with code 0.
2. `npm test` reports 0 failures.

## Blocked-Work Escalation

- If the same failure repeats more than 3 times, stop and report the full log from the last attempt.
- If dependency/environment issues are suspected, check `package.json` scripts and local Node version first.
