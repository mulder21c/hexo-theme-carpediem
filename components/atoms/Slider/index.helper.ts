import {
  createFixedPointDomain,
  getAutomaticMarkValues,
  getSortedMarkValues,
  getValueRatio,
  normalizeValue,
  serializeCanonicalDecimal,
} from "./slider-value.helper";
import type { SliderMark, SliderOrientation, SliderProps, SliderSize } from "./type";

export interface SliderMarkViewModel {
  readonly value: number;
  readonly canonicalValue: string;
  readonly label?: string;
  readonly ratio: number;
  readonly isCurrent: boolean;
}

export interface SliderViewModel {
  readonly id?: string;
  readonly className?: string;
  readonly min: number;
  readonly max: number;
  readonly value: number;
  readonly resetValue: number;
  readonly step: number | null;
  readonly shiftStep: number;
  readonly marks: boolean | readonly SliderMark[];
  readonly marksMode: "false" | "true" | "custom";
  readonly markModels: readonly SliderMarkViewModel[];
  readonly orientation: SliderOrientation;
  readonly size: SliderSize;
  readonly disabled: boolean;
  readonly name?: string;
  readonly ariaLabel?: string;
  readonly ariaLabelledby?: string;
  readonly canonicalMin: string;
  readonly canonicalMax: string;
  readonly canonicalValue: string;
  readonly canonicalStep: string;
  readonly canonicalShiftStep: string;
  readonly ratio: number;
  readonly ariaValueText?: string;
}

function normalizeName(name: string | undefined): string | undefined {
  return name === undefined || name.trim() === "" ? undefined : name;
}

export function createSliderViewModel(props: SliderProps): SliderViewModel {
  const step = props.step === undefined ? 1 : props.step;
  const shiftStep = props.shiftStep ?? 10;
  const marks = props.marks ?? false;
  const orientation = props.orientation ?? "horizontal";
  const size = props.size ?? "medium";
  const disabled = props.disabled ?? false;
  const configuredMarkValues = Array.isArray(marks)
    ? marks.map((mark) => mark.value)
    : [];
  const domain = createFixedPointDomain({
    min: props.min,
    max: props.max,
    value: props.value,
    step,
    shiftStep,
    marks: configuredMarkValues,
  });
  const value = normalizeValue(domain, props.value);
  const renderedMarkValues =
    marks === true
      ? getAutomaticMarkValues(domain)
      : Array.isArray(marks)
        ? getSortedMarkValues(domain)
        : [];
  const markModels = renderedMarkValues.map((markValue): SliderMarkViewModel => {
    const sourceMark = Array.isArray(marks)
      ? marks.find((mark) => mark.value === markValue)
      : undefined;
    return {
      value: markValue,
      canonicalValue: serializeCanonicalDecimal(markValue),
      label: sourceMark?.label,
      ratio: getValueRatio(domain, markValue),
      isCurrent: markValue === value,
    };
  });
  const currentLabel =
    step === null ? markModels.find((mark) => mark.isCurrent)?.label : undefined;

  return {
    id: props.id,
    className: props.className,
    min: props.min,
    max: props.max,
    value,
    resetValue: value,
    step,
    shiftStep,
    marks,
    marksMode: marks === false ? "false" : marks === true ? "true" : "custom",
    markModels,
    orientation,
    size,
    disabled,
    name: normalizeName(props.name),
    ariaLabel: props["aria-label"],
    ariaLabelledby: props["aria-labelledby"],
    canonicalMin: serializeCanonicalDecimal(props.min),
    canonicalMax: serializeCanonicalDecimal(props.max),
    canonicalValue: serializeCanonicalDecimal(value),
    canonicalStep: step === null ? "any" : serializeCanonicalDecimal(step),
    canonicalShiftStep: serializeCanonicalDecimal(shiftStep),
    ratio: getValueRatio(domain, value),
    ariaValueText: currentLabel === "" ? undefined : currentLabel,
  };
}
