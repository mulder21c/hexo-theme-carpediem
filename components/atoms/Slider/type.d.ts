export type SliderOrientation = "horizontal" | "vertical";
export type SliderSize = "small" | "medium" | "large";

export interface SliderMark {
  /**
   * Mark position on the range.
   * In numeric-step mode this is visual guidance only.
   * In restricted-values mode (`step` is `null`), the mark set is the complete selectable domain.
   */
  readonly value: number;
  /**
   * Optional visible label. Omitted labels and empty strings are distinct.
   * In restricted-values mode, a non-empty label on the current mark becomes `aria-valuetext`;
   * a missing or empty label omits `aria-valuetext`.
   * In numeric-step mode the label is visual guidance only and never sets `aria-valuetext`.
   */
  readonly label?: string;
}

export interface SliderProps {
  /**
   * HTML `id` for the root wrapper.
   */
  readonly id?: string;
  /**
   * Additional CSS classes for the root wrapper.
   */
  readonly className?: string;
  /**
   * Inclusive lower bound of the selectable range.
   * Must be a finite number strictly less than `max`.
   */
  readonly min: number;
  /**
   * Inclusive upper bound of the selectable range.
   * Must be a finite number strictly greater than `min`.
   */
  readonly max: number;
  /**
   * Normalized to the nearest selectable value; exact ties choose the larger value.
   */
  readonly value: number;
  /**
   * Distance between selectable values in numeric-step mode.
   * Pass `null` for restricted-values mode, which requires a non-empty custom
   * `marks` array.
   */
  readonly step?: number | null;
  /**
   * Page Up/Down distance.
   * Must be a positive finite number. A non-multiple of numeric `step` is advisory and does not
   * block registration.
   * Independent of `KeyboardEvent.shiftKey`.
   */
  readonly shiftStep?: number;
  /**
   * Mark rendering, and the selectable domain in restricted-values mode.
   *
   * - `false` (default): no marks
   * - `true`: automatic marks at every in-range `min + n * step`
   * - `SliderMark[]`: custom marks; visual guidance in numeric-step mode, or the complete
   *   selectable set when `step` is `null`
   */
  readonly marks?: boolean | readonly SliderMark[];
  /**
   * Layout axis
   *
   * - `horizontal`: physical left-to-right even in RTL; fills available inline size
   * - `vertical`: parent must provide block size
   */
  readonly orientation?: SliderOrientation;
  /**
   * Visual size only; does not change value behavior.
   */
  readonly size?: SliderSize;
  /**
   * When `true`, prevents manager input and excludes the control from form submission.
   */
  readonly disabled?: boolean;
  /**
   * Native input `name` for form participation.
   * Missing, empty, or whitespace-only values become unnamed; otherwise the exact text is preserved.
   */
  readonly name?: string;
  /**
   * Accessible name forwarded unchanged to the canonical native range input.
   * At least one of `aria-label` or `aria-labelledby` must be present.
   */
  readonly "aria-label"?: string;
  /**
   * ID reference forwarded unchanged to the canonical native range input.
   * At least one of `aria-label` or `aria-labelledby` must be present.
   * Presence is validated; accessible-name quality and ID resolution are left to the browser.
   */
  readonly "aria-labelledby"?: string;
}

export type SliderTarget = Element | string;

export type SliderAdapter = (this: void, value: number) => void;

export interface SliderManagerOptions {
  readonly onChange?: SliderAdapter;
  readonly onChangeCommitted?: SliderAdapter;
}

export interface SliderEventDetail {
  readonly value: number;
}

export type SliderRegistrationErrorCode =
  | "BROWSER_ENVIRONMENT"
  | "ROOT_TOPOLOGY"
  | "OWNERSHIP_CONFLICT"
  | "ADAPTER"
  | "BOOTSTRAP_CONTRACT"
  | "REQUIRED_NUMBER"
  | "RANGE"
  | "NAMING"
  | "STEP"
  | "STATIC_MIRROR"
  | "MARK"
  | "MARK_LABEL"
  | "SHIFT_STEP"
  | "NUMERIC_REPRESENTABILITY";

export interface SliderRegistrationErrorInstance extends Error {
  readonly name: "SliderRegistrationError";
  readonly code: SliderRegistrationErrorCode;
  readonly field?: string;
}

export interface SliderRegistrationErrorConstructor {
  new (
    code: SliderRegistrationErrorCode,
    field?: string,
  ): SliderRegistrationErrorInstance;
  readonly sliderRegistrationErrorContract: "carpediem/slider-registration-error@1";
}

export interface SliderManagerInstance {
  initialize(target?: SliderTarget): void;
  refreshFormAssociation(): void;
  destroy(): void;
}

export interface SliderManagerConstructor {
  new (target?: SliderTarget, options?: SliderManagerOptions): SliderManagerInstance;
  readonly sliderManagerContract: "carpediem/slider-manager@1";
  readonly SliderRegistrationError: SliderRegistrationErrorConstructor;
}

declare global {
  interface Window {
    __carpediemDiagnostics?: boolean;
    SliderManager?: SliderManagerConstructor;
  }
}
