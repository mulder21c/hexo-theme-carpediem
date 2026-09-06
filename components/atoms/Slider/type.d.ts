export type SliderOrientation = "horizontal" | "vertical";
export type SliderSize = "small" | "medium" | "large";

export interface SliderMark {
  readonly value: number;
  readonly label?: string;
}

export interface SliderProps {
  readonly id?: string;
  readonly className?: string;
  readonly min: number;
  readonly max: number;
  readonly value: number;
  readonly step?: number | null;
  readonly shiftStep?: number;
  readonly marks?: boolean | readonly SliderMark[];
  readonly orientation?: SliderOrientation;
  readonly size?: SliderSize;
  readonly disabled?: boolean;
  readonly name?: string;
  readonly "aria-label"?: string;
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
