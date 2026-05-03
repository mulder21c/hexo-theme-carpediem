# Storybook Component Documentation Template

This template is a guide you can follow when writing Storybook component descriptions.

## How to use

Fill in the template below using `dedent` in `parameters.docs.description.component`.

```typescript
import dedent from "ts-dedent";

parameters: {
  docs: {
    description: {
      component: dedent`
        [Write template content here]
      `,
    },
  },
},
```

---

## Template structure

### Required

#### 1. Component overview

Briefly and clearly explain what the component does.

```
[Brief description of what it does].

[Brief description of how it is used].
```

**Example:**
```
Renders a semantic heading element (`<h1>` through `<h6>`) with configurable level and styling.

Accepts content via the 'children' prop and supports all standard HTML heading attributes.
```

---

### Optional

Include the sections below only when they fit the component.

#### 2. Key Features (✨)

List the component’s main capabilities. Use the ✨ emoji to mark this section visually.

Under Key Features you may include:

- **⚙️ Behavior**: How the component behaves
- **🖱️ Interactions**: User interactions (mouse, keyboard, touch, etc.)
- **♿ Accessibility**: Accessibility-related behavior
- **Other**: Any other feature category that needs explanation

```
## ✨ Key Features

### ⚙️ Behavior
- [Behavior 1]
- [Behavior 2]

### 🖱️ Interactions
- [Interaction 1]
- [Interaction 2]

### ♿ Accessibility
- [Accessibility feature 1]
- [Accessibility feature 2]

### [Other category] (optional)
- [Feature 1]
- [Feature 2]
```

**Example:**
```
## ✨ Key Features

### ⚙️ Behavior
- Automatically detects viewport boundaries and adjusts to an appropriate position
- Automatically adjusts to the opposite direction when there is insufficient space

### 🖱️ Interactions
- Mouse hover: Displays after 200ms delay when hovering over the trigger element
- Focus: Automatically displays on focus during keyboard navigation
- Touch devices: Displays with a 500ms long press
- Close tooltip with Escape key

### ♿ Accessibility
- Automatic ARIA attribute configuration (\`aria-describedby\`, \`role="tooltip"\`)
- Keyboard navigation support
- Screen reader compatible
```

#### 3. Customization (🎨)

Explain how to customize the component.

Under Customization you may include:

- **💅 Styling**: How to style it
- **Other**: Additional customization approaches as needed

```
## 🎨 Customization

### 💅 Styling
- [Styling approach 1]
- [Styling approach 2]

### [Other customization] (optional)
- [Description 1]
- [Description 2]
```

**Example:**
```
## 🎨 Customization

### 💅 Styling
- Provides default styles through CSS modules
- Theme support through CSS variables (\`--tooltip-bg\`, \`--tooltip-border\`, \`--tooltip-text\`)
- Additional styling possible through \`className\` prop
```

#### 4. Notes / limitations (⚠️) (Optional)

Include cautions or limitations when they matter for consumers.

```
## ⚠️ Notes

- [Caution 1]
- [Caution 2]
- [Limitation 1]
```

#### 5. Usage examples (💡) (Optional)

Add examples when usage is non-trivial.

```
## 💡 Usage Examples

### Basic Usage
\`\`\`tsx
<Component prop1="value1">
  Content
</Component>
\`\`\`

### Advanced Usage
\`\`\`tsx
<Component prop1="value1" prop2="value2">
  <Component.SubComponent>
    Content
  </Component.SubComponent>
</Component>
\`\`\`
```

---

## Full template examples

### Simple component (base button style)

```
Renders a semantic \`<button>\` element with configurable size, color, variant, and type.

Accepts contents via the 'children' prop.

The button uses CSS variables for theming and is accessible by default.
This component does not include interactive logic, focusing purely on visual and semantic output.
```

### Medium complexity (heading style)

```
Renders a semantic heading element (\`<h1>\` through \`<h6>\`) with configurable level and styling.

Accepts content via the 'children' prop and supports all standard HTML heading attributes.

## ✨ Key Features

### ⚙️ Behavior
- Supports all six heading levels (1-6) through the \`level\` prop
- Maintains proper document structure and hierarchy

### ♿ Accessibility
- Uses semantic HTML heading elements for proper document structure
- Supports all standard HTML heading attributes (id, aria-*, etc.)
- Screen reader compatible
- Maintains proper heading hierarchy for assistive technologies

## 🎨 Customization

### 💅 Styling
- Provides default styles through CSS modules
- Additional styling possible through \`className\` prop
```

### Complex component (tooltip style)

```
Tooltip component provides an overlay that displays additional information or descriptions for trigger elements.

It combines a component-based declarative structure with a DOM-based automatic position calculation system.

## ✨ Key Features

### ⚙️ Behavior
- Automatically detects viewport boundaries and adjusts to an appropriate position
- Automatically adjusts to the opposite direction when there is insufficient space in the configured position
- Global tooltip management through \`TooltipManager\` singleton
- Multiple tooltips can be used simultaneously on the same page

### 🖱️ Interactions
- Mouse hover: Displays after 200ms delay when hovering over the trigger element
- Focus: Automatically displays on focus during keyboard navigation
- Touch devices: Displays with a 500ms long press
- Close tooltip with Escape key
- Automatically hides on scroll or viewport size changes

### ♿ Accessibility
- Automatic ARIA attribute configuration (\`aria-describedby\`, \`role="tooltip"\`)
- Keyboard navigation support
- Screen reader compatible

## 🎨 Customization

### 💅 Styling
- Provides default styles through CSS modules
- Theme support through CSS variables (\`--tooltip-bg\`, \`--tooltip-border\`, \`--tooltip-text\`)
- Additional styling possible through \`className\` prop
- Modify \`index.module.scss\` file to change global styles

### 🎯 Trigger Elements
- Can use various HTML elements as triggers (buttons, links, input fields, etc.)
- \`id\` attribute required on trigger element (to uniquely identify each tooltip)
```

---

## Emoji guide

Emoji used in this template and what they mean:

- ✨ Key Features — main capabilities section
- ⚙️ Behavior — component behavior (under Key Features)
- 🖱️ Interactions — user interactions (under Key Features)
- ♿ Accessibility — accessibility (under Key Features)
- 🎨 Customization — customization section
- 💅 Styling — styling (under Customization)
- ⚠️ Notes — cautions and limitations
- 💡 Usage Examples — usage examples
- 🎯 Configuration — configuration-related content (optional under Customization)
- 📊 Data/Content — data or content-related notes (optional under Key Features)

---

## Writing guidelines

1. **Clarity**: State the component’s purpose and how to use it clearly.
2. **Brevity**: Omit fluff; keep the essentials.
3. **Consistency**: Match structure and tone with other component docs.
4. **Practicality**: Prioritize information readers need in real usage.
5. **Accessibility**: Include accessibility notes whenever relevant.
