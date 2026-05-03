# Feature Specification: TextField Component

**Feature Branch**: `001-textfield-component`  
**Created**: 2026-05-02  
**Status**: Draft  
**Constitution**: CarpeDiem Constitution v1.1.0  
**Input**: User description: "docs/prd/textfield.md 의 요구사항을 따라 명세를 작성해줘"

## Clarifications

### Session 2026-05-02

- Q: Should TextField layout explicitly prohibit position:absolute? → A: TextField layout must not use position:absolute.
- Q: When TextField is both disabled and aria-invalid, which visual state should take precedence? → A: Disabled visual treatment takes precedence; invalid semantics remain through aria-invalid.
- Q: When should TextField log the missing accessibility warning? → A: Log the warning whenever a TextField renders without id, aria-label, and aria-labelledby.
- Q: How should unsupported TextField input purposes be handled? → A: Unsupported input purposes are unavailable through the public TextField configuration.
- Q: What is the canonical term for required TextField usage examples? → A: Use "Storybook stories" as the canonical term for required usage examples.
- Q: How should the focused state be handled in Storybook requirements? → A: Keep focus as manual verification and remove it from required Storybook stories.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Configure a Purpose-Built Text Input (Priority: P1)

A component consumer can place a TextField in a form-like UI, choose one of the supported text input purposes, and select the visual treatment and size needed for the surrounding interface.

**Why this priority**: The primary value of the feature is a reusable, predictable text entry control that supports common single-line text input needs.

**Independent Test**: Can be tested by rendering the TextField with each supported input purpose, variant, and size, then confirming that the field remains usable and visually distinct in every supported configuration.

**Acceptance Scenarios**:

1. **Given** a consumer renders a TextField without specifying a variant, **When** the field appears, **Then** it uses the outlined appearance by default.
2. **Given** a consumer selects the underlined variant, **When** the field appears, **Then** only the lower boundary visually defines the input area and no corner rounding is visible.
3. **Given** a consumer selects small, medium, or large size, **When** the field appears, **Then** the visible field dimensions and text spacing match the selected size while preserving readability.
4. **Given** a consumer configures a TextField, **When** they choose an input purpose, **Then** only text, password, search, URL, and email are available through the public TextField configuration.

---

### User Story 2 - Provide Accessible Composition With External Labels (Priority: P1)

A component consumer can combine TextField with an external label or accessible name while the component avoids creating its own internal label.

**Why this priority**: The field must be usable by people relying on assistive technology and must compose cleanly with existing form layouts.

**Independent Test**: Can be tested by rendering TextField with an external label association or accessible name, then rendering it without any accessible identifier and confirming the expected warning behavior.

**Acceptance Scenarios**:

1. **Given** a TextField has an explicit identifier, **When** it is rendered with an external label association, **Then** the component does not create an additional internal label.
2. **Given** a TextField has an accessible name supplied by aria-label or aria-labelledby, **When** it is rendered, **Then** no accessibility warning is logged for missing label support.
3. **Given** a TextField has no explicit identifier and no aria-label or aria-labelledby, **When** it is rendered, **Then** a warning is logged stating that accessibility is not supported for that instance.

---

### User Story 3 - Communicate Input State Clearly (Priority: P2)

A user interacting with a TextField can visually distinguish normal, focus, read-only, disabled, and invalid states without relying on trial and error.

**Why this priority**: Clear state feedback prevents form mistakes and makes the component consistent with the rest of the theme.

**Independent Test**: Can be tested by rendering each state independently and confirming the cursor, boundary, text, background, invalid, and focus indicators are visually distinguishable.

**Acceptance Scenarios**:

1. **Given** a TextField is read-only, **When** a user hovers or focuses the field, **Then** the cursor communicates that text cannot be changed while the value remains readable.
2. **Given** a TextField is disabled, **When** a user hovers the field, **Then** the cursor communicates that interaction is unavailable and the field uses the disabled visual treatment.
3. **Given** a TextField has aria-invalid set to true, **When** it appears, **Then** the input boundary uses a scarlet error treatment.
4. **Given** a TextField receives focus, **When** it appears in any supported variant, **Then** the focus indicator matches the established theme focus style.

---

### User Story 4 - Add a Leading Purpose Icon (Priority: P2)

A component consumer can add an optional leading icon to communicate the field purpose without causing text overlap or layout instability.

**Why this priority**: Icons improve scanability in dense forms, but they must not reduce input usability.

**Independent Test**: Can be tested by rendering a TextField with each supported size and variant using a valid Feather icon name, then confirming the icon remains inside the field boundary and never overlaps the placeholder or entered text.

**Acceptance Scenarios**:

1. **Given** a TextField includes a valid leading icon, **When** it is rendered, **Then** the icon appears before the editable text area inside the input boundary.
2. **Given** a TextField includes a leading icon and placeholder text, **When** the field appears, **Then** the icon and placeholder have sufficient spacing and do not overlap.
3. **Given** the field changes size or variant, **When** the icon remains present, **Then** icon placement stays aligned with the field and does not visually detach from the input area.

---

### User Story 5 - Review Storybook Stories (Priority: P3)

A component consumer can inspect TextField Storybook stories for default usage, variants, sizes, read-only state, disabled state, and invalid state, and adjust available properties that are not fixed by each story's purpose.

**Why this priority**: Storybook stories reduce adoption time and make expected usage clear across the team.

**Independent Test**: Can be tested by opening the TextField Storybook stories and confirming the required stories exist with adjustable properties except the property demonstrated by the story.

**Acceptance Scenarios**:

1. **Given** the TextField Storybook stories are available, **When** a consumer reviews them, **Then** stories exist for default, read-only state, outlined variant, underlined variant, size variants, disabled state, and invalid state.
2. **Given** a consumer opens a Storybook story focused on one specific property, **When** they adjust other available properties, **Then** those properties can be changed without changing the story's fixed demonstration purpose.

### Edge Cases

- A supported input purpose is repeated in source requirements; the supported purpose list is treated as a unique set.
- An invalid state is requested through aria-invalid while no separate invalid configuration exists.
- A TextField is both disabled and marked invalid.
- A TextField is both focused and marked invalid; the focus indicator must remain visible while the invalid boundary treatment remains present unless disabled visual precedence applies.
- Placeholder text, entered text, and an optional icon must not overlap at any supported size.
- Placeholder contrast must remain at least 3:1 against the field background in light, dark, and high-contrast contexts.
- A TextField without an explicit identifier or accessible name must still render, but must log the accessibility warning.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: TextField MUST make only these input purposes available through its public configuration: text, password, search, URL, and email.
- **FR-002**: TextField MUST use the outlined variant by default when no variant is selected.
- **FR-003**: The outlined variant MUST present a full input boundary equivalent to a native single-line text field and include visible corner rounding.
- **FR-004**: The underlined variant MUST present only a lower boundary and MUST NOT show visible corner rounding.
- **FR-005**: TextField MUST provide small, medium, and large sizes with distinct spacing and dimensions.
- **FR-006**: TextField MUST allow an optional leading icon selected from valid Feather icon names.
- **FR-007**: When a leading icon is present, TextField MUST place it before the editable text area inside the input boundary.
- **FR-008**: Icon, placeholder, and entered text MUST maintain non-overlapping spacing across all supported variants, sizes, and states.
- **FR-009**: TextField MUST NOT create or render its own label.
- **FR-010**: TextField MUST support composition with an external label through an explicit identifier or with an accessible name through aria-label or aria-labelledby.
- **FR-011**: TextField MUST log a warning whenever it renders without an explicit identifier and without aria-label or aria-labelledby.
- **FR-012**: TextField MUST NOT expose a separate invalid configuration; invalid state MUST be represented through aria-invalid.
- **FR-013**: When aria-invalid indicates an invalid state, TextField MUST use a scarlet boundary treatment.
- **FR-014**: The read-only state MUST use a default cursor and communicate that the value cannot be edited.
- **FR-015**: The disabled state MUST use a not-allowed cursor and disabled boundary and text colors aligned with the existing component system.
- **FR-016**: TextField MUST use a green 2px boundary treatment for the normal input boundary.
- **FR-017**: TextField MUST use the theme light surface color for the field background and the primary text color for entered text.
- **FR-018**: Placeholder text MUST use a neutral color with at least 3:1 contrast against the field background.
- **FR-019**: TextField MUST provide dark-mode and high-contrast visual treatments aligned with existing component colors.
- **FR-020**: TextField MUST use the existing component focus indicator style for focus visibility, including when the focused field is also invalid unless disabled visual precedence applies.
- **FR-021**: TextField Storybook stories MUST cover default, read-only state, outlined variant, underlined variant, size variants, disabled state, and invalid state.
- **FR-022**: Each TextField Storybook story MUST allow configurable properties except the property that the story specifically demonstrates.
- **FR-023**: TextField layout MUST NOT use position:absolute for the field boundary, leading icon, placeholder, or entered text alignment.
- **FR-024**: When TextField is both disabled and marked invalid, the disabled visual treatment MUST take precedence while invalid semantics remain available through aria-invalid.

### Key Entities

- **TextField Configuration**: The set of consumer-selected options that define input purpose, variant, size, optional leading icon, accessibility identifiers, and native input states.
- **Accessible Name Source**: The external label association or accessible name information used to make the TextField identifiable to assistive technology.
- **Visual State**: The current presentation state of the field, including normal, focused, read-only, disabled, and invalid.
- **Storybook Story**: A reviewable TextField configuration used by component consumers to understand expected behavior and appearance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of supported input purposes, variants, and sizes can be reviewed without text, placeholder, or icon overlap.
- **SC-002**: 100% of TextField instances missing an explicit identifier and accessible name log the required accessibility warning, while instances with either requirement satisfied do not log that warning.
- **SC-003**: 100% of Storybook stories for normal, read-only, disabled, and invalid states are visually distinguishable in component review, and the focused state can be manually verified against the established theme focus style.
- **SC-004**: Placeholder text maintains at least 3:1 contrast against the field background in light, dark, and high-contrast contexts.
- **SC-005**: A component consumer can locate and identify the Storybook stories for default, read-only state, variants, sizes, disabled state, and invalid state within 2 minutes.
- **SC-006**: At least 90% of target component consumers can correctly identify which configuration controls input purpose, variant, size, leading icon, and invalid state after reviewing the Storybook stories once.

## Assumptions

- Target users are component consumers who compose blog theme UI and form-like controls.
- The duplicate search entry in the PRD is intentional only as repetition; the supported input purpose list contains search once.
- External validation logic owns whether a value is invalid; TextField only reflects invalid state through aria-invalid.
- External labels are composed outside TextField, and the component can only verify the presence of an explicit identifier or accessible name attributes.
- Existing component colors and focus indicators are the source of truth for dark-mode, high-contrast, disabled, and focus visual alignment.
