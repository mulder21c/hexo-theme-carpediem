# Data Model: TextField Component

## TextField Configuration

Represents the public consumer-selected configuration for a TextField instance.

### Fields

- `type`: one of `text`, `password`, `search`, `url`, `email`; defaults to `text`.
- `variant`: one of `outlined`, `underlined`; defaults to `outlined`.
- `size`: one of `small`, `medium`, `large`; defaults to `medium` for consistency with existing Atom controls.
- `icon`: optional Feather icon name used as a leading purpose pictogram.
- `id`: optional explicit HTML id used for external label association.
- `aria-label`: optional accessible name.
- `aria-labelledby`: optional reference to an external accessible-name element.
- `aria-invalid`: optional ARIA invalid state source.
- `placeholder`: optional placeholder text.
- `readOnly`: optional native read-only state.
- `disabled`: optional native disabled state.
- `className`: optional additional CSS class.
- Native text input attributes: forwarded when compatible with supported text input purposes.

### Validation Rules

- Unsupported input purposes are unavailable through the public prop type.
- `invalid` is not a public prop.
- `type`, `variant`, and `size` accept only their declared literal values.
- `icon`, when provided, must be a valid Feather icon name.
- A render without explicit `id`, `aria-label`, and `aria-labelledby` logs the accessibility warning and still renders.
- If `disabled` and `aria-invalid` are both present, disabled visual treatment takes precedence while `aria-invalid` remains on the input.

## Accessible Name Source

Represents the information that makes the input identifiable to assistive technology.

### Fields

- `explicitId`: the consumer-provided id used by an external label.
- `ariaLabel`: direct accessible name.
- `ariaLabelledby`: id reference to external accessible-name content.

### Validation Rules

- At least one of `explicitId`, `ariaLabel`, or `ariaLabelledby` must be present to avoid the warning.
- TextField does not create or render its own label.
- TextField does not auto-generate an id to satisfy external label composition.

## Visual State

Represents the presentation state derived from native attributes and ARIA.

### States

- `normal`: enabled, editable, and not invalid.
- `focused`: input receives focus and shows the existing theme focus indicator, including when invalid styling is also present.
- `readonly`: `readOnly` is present; field remains readable and uses default cursor.
- `disabled`: `disabled` is present; field uses not-allowed cursor and disabled colors.
- `invalid`: `aria-invalid` indicates invalid state; field uses scarlet boundary treatment and can coexist with the focus indicator unless disabled visual precedence applies.

### State Priority

1. Disabled visual treatment, including disabled interaction behavior
2. Invalid boundary treatment
3. Focus indicator, which remains visible alongside invalid boundary treatment when focused and not disabled
4. Read-only cursor treatment
5. Normal visual treatment

## Storybook Story

Represents a required component review artifact for the TextField.

### Required Stories

- `Default`
- `ReadOnly`
- `OutlinedVariant`
- `UnderlinedVariant`
- `SizeVariants`
- `Disabled`
- `Invalid`

### Validation Rules

- Each story fixes only the property demonstrated by the story.
- Controls remain available for other configurable props.
- Stories render without runtime errors.
- Stories expose enough configuration for consumers to identify type, variant, size, leading icon, read-only, disabled, and invalid state behavior.
- Focused state is verified manually against the established theme focus style and is not a required Storybook story.
