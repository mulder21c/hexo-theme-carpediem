---
targets:
  - '*'
description: ''
---
# Storybook Component Documentation Generator

## Overview

Generates Storybook component documentation by analyzing the component code and applying the documentation template from `.cursor/docs/component-docs-template.md`.

## Parameters

- **componentName** (required): The component name or path (e.g., "Button/IconButton", "Heading", "Tooltip")

## Instructions

### 0. Parameter Collection

Extract the component name from the command. The component name can be:
- A simple name (e.g., "Heading", "Tooltip")
- A path (e.g., "Button/IconButton", "Atoms/Button/Base")

### 1. Find Component Directory

1. Search for the component directory in `components/` folder:
   - Try exact match first: `components/{componentName}/`
   - If componentName contains slashes, try: `components/{componentName}/`
   - Search recursively for directories matching the component name

2. Once the component directory is found, look for stories file:
   - First, check for `index.stories.tsx` in the component directory
   - If not found, search for `*.stories.tsx` files in the directory
   - If multiple stories files exist, use the one that matches the component name or use `index.stories.tsx` if available

### 2. Analyze Component

1. **Read Component Files**:
   - Read the main component file (e.g., `index.tsx`, `{ComponentName}.tsx`)
   - Read type definition file (e.g., `type.ts`, `types.ts`, `{ComponentName}.d.ts`)
   - Read the stories file to understand current structure

2. **Extract Component Information**:
   - Component purpose and functionality
   - Props and their types
   - Key features (behavior, interactions, accessibility)
   - Customization options (styling, configuration)
   - Any special notes or limitations

### 3. Read Template

1. Read `.cursor/docs/component-docs-template.md` to understand the documentation structure and guidelines

### 4. Generate Documentation

1. **Analyze Component Code**:
   - Identify what HTML element or structure the component renders
   - Identify key props and their purposes
   - Identify behavior patterns (interactions, state management, etc.)
   - Identify accessibility features (ARIA attributes, semantic HTML, etc.)
   - Identify styling/customization options

2. **Generate Documentation Text**:
   - Start with a clear description of what the component does
   - Include how to use it (main props, children, etc.)
   - Add Key Features section (✨) with relevant subsections:
     - ⚙️ Behavior: How the component behaves
     - 🖱️ Interactions: User interactions (if applicable)
     - ♿ Accessibility: Accessibility features
   - Add Customization section (🎨) if applicable:
     - 💅 Styling: How to style the component
   - Add Notes section (⚠️) if there are important limitations or warnings
   - Add Usage Examples (💡) if the component has complex usage patterns

3. **Follow Template Guidelines**:
   - Use the template structure from `component-docs-template.md`
   - Keep descriptions clear and concise
   - Maintain consistency with other component documentation
   - Include accessibility information when relevant
   - Use appropriate emojis for sections

### 5. Update Stories File

1. **Locate `parameters.docs.description.component`**:
   - Find the `parameters` object in the meta configuration
   - Locate `parameters.docs.description.component` property
   - If it doesn't exist, create it within the `parameters` object

2. **Update Documentation**:
   - Ensure `dedent` is imported from `ts-dedent` at the top of the file
   - Replace or add the `component` property with the generated documentation
   - Use `dedent` template literal for multi-line strings
   - Maintain proper indentation and formatting

3. **Verify Structure**:
   - Ensure the documentation is properly formatted
   - Check that all backticks are escaped correctly (use `\`` for inline code)
   - Verify that the structure matches the template guidelines

### 6. File Update

1. Update the stories file with the new documentation
2. Ensure the file maintains proper TypeScript syntax
3. Verify imports are correct (especially `dedent` from `ts-dedent`)

## Example

If the command is `/storybook-docs Button/IconButton`:

1. Find `components/atoms/Button/IconButton/` or `components/Button/IconButton/`
2. Read `IconButton.tsx`, `type.ts`, and `IconButton.stories.tsx` (or `index.stories.tsx`)
3. Analyze the component to understand its functionality
4. Generate documentation following the template
5. Update `parameters.docs.description.component` in the stories file

## Notes

- The documentation should be written in English (as per the template examples)
- Use proper markdown formatting within the dedent template literal
- Escape backticks in code examples using `\``
- Maintain consistency with existing component documentation
- Focus on practical information that developers need when using the component
