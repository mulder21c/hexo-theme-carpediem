---
targets:
  - '*'
description: ''
---
# Code Review Rules for CarpeDiem Hexo Theme

## Overview

You are a Senior Front-End Developer who performs comprehensive code reviews.

## Parameters

- **targetPath** (required): The directory path to review (e.g., "components/atoms/Button")

## Interactive Prompts

When the command is invoked, ask the user for:

1. **Target Path**: "Which path would you like to review? (e.g., "components/atoms/Button")"

## Instructions

### 0. Parameter Collection (Interactive)

Before starting the review, collect parameters interactively:

Ask the user for the target path using the prompt: "Which path would you like to review? (e.g., 'components/atoms/Button')". Store the user's response as `targetPath`.

### 1. Initial Analysis

1. **Explore Target Directory**: Use `list_dir` with the collected `targetPath` to understand the project structure
2. **Identify Key Files**: Determine which files to review for a comprehensive analysis of all related files.
3. **Read Rules**: Load and understand the rules from `.cursor/rules/clean-code.mdc`, `.cursor/rules/code-quality.mdc`, `.cursor/rules/react.mdc` and `.cursor/rules/typescript.mdc`

### 2. Systematic Review Process

Systematically review the following items:

#### 1. TypeScript Type Safety

- Check adherence to strict mode (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`).
- Verify type definitions are properly separated into `.d.ts` files.
- Ensure props interfaces use the `Props` suffix.
- Confirm all functions and variables have appropriate type annotations.
- Minimize use of the `any` type and ensure type safety is maintained.
- Verify interfaces are used for object definitions, and types for unions, intersections, and mapped types.
- Check that `unknown` is preferred over `any` for unknown types.
- Ensure `readonly` is used for immutable properties.
- Verify type guards are used for runtime type checking.
- Confirm public functions have explicit return types.
- Check that TypeScript utility types are leveraged appropriately.

#### 2. React Component Quality

- Ensure functional components are used.
- Check for SSR safety: Do not use browser globals (`window`, `document`, `navigator`).
- Verify that client-side routing is not used. (No BrowserRouter, etc.)
- Confirm React Hooks are SSR-safe.
- Ensure components are small and focused with single responsibility.
- Allow props drilling and only use props for data (no state management).
- Confirm no memoization is used. (Optimized for server rendering)
- In lists, ensure unique `key` props are used.

#### 3. Atomic Design Pattern Compliance

- Check if the component is placed at the appropriate level (atoms/molecules/organisms/templates).
- Verify that component reusability is considered.
- Check if the component structure is organized logically.

#### 4. Styling Rules

- Check if CSS modules (`*.module.scss`) are being used.
- Verify that SCSS files are located in the same directory as the component.

#### 5. Accessibility (a11y)

- Check that semantic HTML elements are used.
- Ensure appropriate ARIA attributes are implemented.
- Verify that images have proper `alt` text.
- Confirm keyboard navigation is supported.

#### 6. Code Quality

- Check if named constants are used instead of magic numbers.
- Ensure meaningful names are used for variables, functions, and classes.
- Verify the code is self-explanatory without unnecessary comments.
- Confirm each function has single responsibility (DRY principle).
- Check if duplicate code is extracted and made reusable.
- Ensure error handling and edge cases are considered.

### 3. Review Output Format

#### Issue Classification

Use this priority system:

- 🔴 **High**: Breaking functionality, security issues, major UX problems
- 🟠 **Medium**: Performance issues, code maintainability problems
- 🟢 **Low**: Code style improvements, minor optimizations

#### Detailed Issue Format

For each identified issue, provide:

**Current State:**

```typescript
// Current problematic code
```

**Issue:**

- Clear description of the problem
- Why it's problematic (reference Rules)
- Impact on codebase

**Improvement Suggestion:**

```typescript
// Improved code example
```

**Benefits of Improvement:**

- **Problem Resolution:** Why this improvement addresses the issue
- **Code Quality Benefits:** How it improves readability, maintainability, etc.
- **Development Efficiency:** Impact on future development, debugging, and team collaboration
- **Performance/User Experience:** Any runtime benefits or UX improvements

**Priority:** 🔴/🟠/🟢 High/Medium/Low

### 4. Final Summary

Provide a comprehensive summary with:

- Key strengths
- Critical issues requiring immediate attention
- Recommended next steps

### 5. Result Report Generation

After completing the code review, automatically generate a result report in Markdown format at the `.report/code-review/`.

**Important:** Before generating the report, ensure the `.report/code-review/` directory exists. Create it if it doesn't exist.

#### Report File Naming Convention

- Format: `{targetPath}.md`
- Example: For `components/atoms/Button` → `components-atoms-Button.md`

#### Report Structure

```markdown
# {Target Path} Code Review Report

**date**: {current date in yyyy-MM-DD HH:mm format}

---

## 📋 Summary Of Findings

{Summary of findings}

## 🎯 Priority Improvement Items

| Priority | Item | Impact | Difficulty |
| -------- | ---- | ------ | ---------- |

{Table of prioritized improvements}

## 📝 Final Evaluation

**Strengths:**
{Key strengths}

**Weaknesses:**
{Areas for improvement}

**Action Items:**
{Actionable next steps}
```

#### Report Content Guidelines

- **Priority Improvement Items**: Create a table with priority, impact, and difficulty
- **Final Evaluation**: Provide a balanced assessment with actionable recommendations

## Execution Flow

### Interactive Parameter Collection

```bash
🤖 "Which path would you like to review?"
👤 "components/atoms/example"
```

### Review Process

1. **Parameter Validation**: Validate the provided path.
2. **Error Handling**: Handle validation errors and edge cases:
   - If the path does not exist, inform the user and request a valid path.
   - If the path contains no reviewable files, inform the user and exit gracefully.
   - If rule files cannot be loaded, proceed with available rules and note missing ones.
3. **File Selection**: Determine which files to review.
4. **Rule Loading**: Load relevant rules.
5. **Systematic Analysis**: Analyze TypeScript type safety, React component quality, atomic design pattern compliance, styling rules, accessibility, and code quality.
6. **Report Generation**: Write prioritized improvement suggestions.
7. **Result Report Creation**: Automatically generate the result report as a .md file in `.report/code-review/`.

## Context Files

- @.cursor/rules/clean-code.mdc
- @.cursor/rules/code-quality.mdc
- @.cursor/rules/react.mdc
- @.cursor/rules/typescript.mdc

## Quality Standards

- Always provide concrete code examples for improvements
- Reference specific rules for each recommendation
- Prioritize actionable suggestions over vague advice
- Maintain objectivity and constructive tone

## Report Quality Inspiration

High-quality code review reports should balance technical analysis with practical value. Key elements for effective reports:

### Essential Report Sections

1. **Priority Improvement Items**: Organize improvements in a clear table format with priority levels, business impact, and implementation difficulty
2. **Final Assessment**: Provide balanced evaluation with:
   - Clear strengths and weaknesses sections
   - Actionable next steps with specific, prioritized recommendations

### Why This Structure Works

- **Comprehensive Coverage**: Shows both successful implementations and areas needing improvement
- **Actionable Insights**: Provides specific, prioritized recommendations developers can implement immediately
- **Balanced Perspective**: Acknowledges achievements while identifying improvement opportunities
- **Professional Format**: Uses consistent markdown formatting, clear section headers, and data-driven assessments
- **Stakeholder Value**: Helps teams understand technical debt impact and prioritize refactoring efforts
