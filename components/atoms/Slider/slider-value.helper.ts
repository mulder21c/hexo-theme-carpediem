interface FixedPointDomainInput {
  readonly min: number;
  readonly max: number;
  readonly value?: number;
  readonly step: number | null;
  readonly shiftStep: number;
  readonly marks: readonly number[];
}

export interface FixedPointDomain {
  readonly scale: number;
  readonly precision: number;
  readonly minUnits: number;
  readonly maxUnits: number;
  readonly stepUnits: number | null;
  readonly shiftStepUnits: number;
  readonly markUnits: readonly number[];
}

const POWERS_OF_TEN = Array.from({ length: 16 }, (_, exponent) => 10 ** exponent);

function numericRangeError(): RangeError {
  return new RangeError("Slider numeric configuration is not safely representable");
}

function requireFinite(value: number): void {
  if (!Number.isFinite(value)) {
    throw numericRangeError();
  }
}

export function serializeCanonicalDecimal(value: number): string {
  requireFinite(value);
  if (Object.is(value, -0) || value === 0) {
    return "0";
  }

  const source = String(value);
  if (!/[eE]/u.test(source)) {
    return source;
  }

  const sign = source.startsWith("-") ? "-" : "";
  const unsigned = sign ? source.slice(1) : source;
  const [coefficient = "", exponentSource = "0"] = unsigned.split(/[eE]/u);
  const exponent = Number(exponentSource);
  const pointIndex = coefficient.indexOf(".");
  const integerLength = pointIndex === -1 ? coefficient.length : pointIndex;
  const digits = coefficient.replace(".", "");
  const decimalIndex = integerLength + exponent;

  if (decimalIndex <= 0) {
    return `${sign}0.${"0".repeat(-decimalIndex)}${digits}`;
  }
  if (decimalIndex >= digits.length) {
    return `${sign}${digits}${"0".repeat(decimalIndex - digits.length)}`;
  }
  return `${sign}${digits.slice(0, decimalIndex)}.${digits.slice(decimalIndex)}`;
}

function decimalPlaces(value: number): number {
  const decimal = serializeCanonicalDecimal(value);
  const pointIndex = decimal.indexOf(".");
  return pointIndex === -1 ? 0 : decimal.length - pointIndex - 1;
}

function powerOfTen(precision: number): number {
  const scale = POWERS_OF_TEN[precision];
  if (scale === undefined || !Number.isSafeInteger(scale)) {
    throw numericRangeError();
  }
  return scale;
}

function toScaledInteger(value: number, precision: number): number {
  const decimal = serializeCanonicalDecimal(value);
  const isNegative = decimal.startsWith("-");
  const unsigned = isNegative ? decimal.slice(1) : decimal;
  const [integerPart = "0", fractionPart = ""] = unsigned.split(".");
  if (fractionPart.length > precision) {
    throw numericRangeError();
  }

  const digits = `${integerPart}${fractionPart.padEnd(precision, "0")}`;
  const units = Number(digits) * (isNegative ? -1 : 1);
  if (!Number.isSafeInteger(units)) {
    throw numericRangeError();
  }
  return units;
}

function requireSafeOperation(value: number): number {
  if (!Number.isSafeInteger(value)) {
    throw numericRangeError();
  }
  return value;
}

export function createFixedPointDomain(input: FixedPointDomainInput): FixedPointDomain {
  const configuredValues = [
    input.min,
    input.max,
    input.value,
    input.step ?? undefined,
    input.shiftStep,
    ...input.marks,
  ].filter((value): value is number => value !== undefined);
  configuredValues.forEach(requireFinite);

  const precision = Math.max(...configuredValues.map(decimalPlaces));
  const scale = powerOfTen(precision);
  const minUnits = toScaledInteger(input.min, precision);
  const maxUnits = toScaledInteger(input.max, precision);
  const stepUnits = input.step === null ? null : toScaledInteger(input.step, precision);
  const shiftStepUnits = toScaledInteger(input.shiftStep, precision);
  const markUnits = input.marks
    .map((mark) => toScaledInteger(mark, precision))
    .sort((left, right) => left - right);
  const spanUnits = requireSafeOperation(maxUnits - minUnits);

  if (spanUnits <= 0 || (stepUnits !== null && stepUnits <= 0) || shiftStepUnits <= 0) {
    throw numericRangeError();
  }
  if (
    markUnits.some(
      (mark, index) =>
        mark < minUnits ||
        mark > maxUnits ||
        (index > 0 && mark === markUnits[index - 1]),
    )
  ) {
    throw numericRangeError();
  }

  if (stepUnits !== null) {
    requireSafeOperation(Math.floor(spanUnits / stepUnits));
  }

  return {
    scale,
    precision,
    minUnits,
    maxUnits,
    stepUnits,
    shiftStepUnits,
    markUnits,
  };
}

function unitsToNumber(units: number, domain: FixedPointDomain): number {
  requireSafeOperation(units);
  return Number(serializeUnits(units, domain.precision));
}

function serializeUnits(units: number, precision: number): string {
  requireSafeOperation(units);
  if (units === 0) {
    return "0";
  }

  const sign = units < 0 ? "-" : "";
  const digits = String(Math.abs(units)).padStart(precision + 1, "0");
  if (precision === 0) {
    return `${sign}${digits}`;
  }
  const integerPart = digits.slice(0, -precision);
  const fractionPart = digits.slice(-precision).replace(/0+$/u, "");
  return fractionPart ? `${sign}${integerPart}.${fractionPart}` : `${sign}${integerPart}`;
}

function chooseNearest(
  targetUnits: number,
  lowerUnits: number,
  upperUnits: number,
): number {
  const lowerDistance = requireSafeOperation(targetUnits - lowerUnits);
  const upperDistance = requireSafeOperation(upperUnits - targetUnits);
  return upperDistance <= lowerDistance ? upperUnits : lowerUnits;
}

function normalizeComparableUnits(
  domain: FixedPointDomain,
  targetUnits: number,
  factor: number,
): number {
  const minUnits = requireSafeOperation(domain.minUnits * factor);
  const maxUnits = requireSafeOperation(domain.maxUnits * factor);
  if (domain.stepUnits === null) {
    const marks = domain.markUnits.map((mark) => requireSafeOperation(mark * factor));
    if (marks.length === 0) {
      throw numericRangeError();
    }
    const firstMark = marks[0];
    const lastMark = marks[marks.length - 1];
    if (firstMark === undefined || lastMark === undefined) {
      throw numericRangeError();
    }
    if (targetUnits <= firstMark) {
      return firstMark;
    }
    if (targetUnits >= lastMark) {
      return lastMark;
    }
    for (let index = 1; index < marks.length; index += 1) {
      const upper = marks[index];
      const lower = marks[index - 1];
      if (upper !== undefined && lower !== undefined && targetUnits <= upper) {
        return chooseNearest(targetUnits, lower, upper);
      }
    }
    throw numericRangeError();
  }
  if (targetUnits <= minUnits) {
    return minUnits;
  }
  if (targetUnits >= maxUnits) {
    return maxUnits;
  }
  const stepUnits = requireSafeOperation(domain.stepUnits * factor);
  const offset = requireSafeOperation(targetUnits - minUnits);
  const lowerIndex = Math.floor(offset / stepUnits);
  const lowerUnits = requireSafeOperation(minUnits + lowerIndex * stepUnits);
  const nextStepUnits = requireSafeOperation(lowerUnits + stepUnits);
  const upperUnits = Math.min(nextStepUnits, maxUnits);
  return chooseNearest(targetUnits, lowerUnits, upperUnits);
}

export function normalizeValue(domain: FixedPointDomain, value: number): number {
  requireFinite(value);
  const targetPrecision = Math.max(domain.precision, decimalPlaces(value));
  const factor = powerOfTen(targetPrecision - domain.precision);
  const targetUnits = toScaledInteger(value, targetPrecision);
  const normalizedUnits = normalizeComparableUnits(domain, targetUnits, factor);
  if (normalizedUnits % factor !== 0) {
    throw numericRangeError();
  }
  return unitsToNumber(normalizedUnits / factor, domain);
}

export function stepNumericValue(
  domain: FixedPointDomain,
  currentValue: number,
  direction: -1 | 1,
): number {
  if (domain.stepUnits === null) {
    throw numericRangeError();
  }

  const current = normalizeValue(domain, currentValue);
  const currentUnits = toScaledInteger(current, domain.precision);
  if (direction > 0) {
    if (currentUnits >= domain.maxUnits) {
      return unitsToNumber(domain.maxUnits, domain);
    }
    const offset = requireSafeOperation(currentUnits - domain.minUnits);
    const nextIndex = Math.floor(offset / domain.stepUnits) + 1;
    const nextUnits = requireSafeOperation(
      domain.minUnits + nextIndex * domain.stepUnits,
    );
    return unitsToNumber(Math.min(nextUnits, domain.maxUnits), domain);
  }

  if (currentUnits <= domain.minUnits) {
    return unitsToNumber(domain.minUnits, domain);
  }
  const offset = requireSafeOperation(currentUnits - domain.minUnits);
  const previousIndex = Math.ceil(offset / domain.stepUnits) - 1;
  const previousUnits = requireSafeOperation(
    domain.minUnits + previousIndex * domain.stepUnits,
  );
  return unitsToNumber(Math.max(previousUnits, domain.minUnits), domain);
}

export function getSortedMarkValues(domain: FixedPointDomain): readonly number[] {
  return domain.markUnits.map((units) => unitsToNumber(units, domain));
}

export function getAutomaticMarkValues(domain: FixedPointDomain): readonly number[] {
  if (domain.stepUnits === null) {
    throw numericRangeError();
  }
  const span = requireSafeOperation(domain.maxUnits - domain.minUnits);
  const lastIndex = Math.floor(span / domain.stepUnits);
  const values: number[] = [];
  for (let index = 0; index <= lastIndex; index += 1) {
    const units = requireSafeOperation(domain.minUnits + index * domain.stepUnits);
    values.push(unitsToNumber(units, domain));
  }
  return values;
}

export function stepRestrictedValue(
  domain: FixedPointDomain,
  currentValue: number,
  direction: -1 | 1,
): number {
  if (domain.stepUnits !== null || domain.markUnits.length === 0) {
    throw numericRangeError();
  }
  const current = normalizeValue(domain, currentValue);
  const currentUnits = toScaledInteger(current, domain.precision);
  const currentIndex = domain.markUnits.indexOf(currentUnits);
  if (currentIndex === -1) {
    throw numericRangeError();
  }
  const nextIndex = Math.min(
    domain.markUnits.length - 1,
    Math.max(0, currentIndex + direction),
  );
  const nextUnits = domain.markUnits[nextIndex];
  if (nextUnits === undefined) {
    throw numericRangeError();
  }
  return unitsToNumber(nextUnits, domain);
}

export function pageRestrictedValue(
  domain: FixedPointDomain,
  currentValue: number,
  direction: -1 | 1,
): number {
  if (domain.stepUnits !== null || domain.markUnits.length === 0) {
    throw numericRangeError();
  }
  const current = normalizeValue(domain, currentValue);
  const currentUnits = toScaledInteger(current, domain.precision);
  const requested = Math.min(
    domain.maxUnits,
    Math.max(
      domain.minUnits,
      requireSafeOperation(currentUnits + direction * domain.shiftStepUnits),
    ),
  );
  let selected = domain.markUnits[0];
  if (selected === undefined) {
    throw numericRangeError();
  }
  let selectedDistance = Math.abs(requested - selected);
  for (const candidate of domain.markUnits.slice(1)) {
    const distance = Math.abs(requested - candidate);
    if (
      distance < selectedDistance ||
      (distance === selectedDistance &&
        ((direction > 0 && candidate > selected) ||
          (direction < 0 && candidate < selected)))
    ) {
      selected = candidate;
      selectedDistance = distance;
    }
  }
  return unitsToNumber(selected, domain);
}

export function getValueRatio(domain: FixedPointDomain, value: number): number {
  const normalized = normalizeValue(domain, value);
  const units = toScaledInteger(normalized, domain.precision);
  const position = requireSafeOperation(units - domain.minUnits);
  const span = requireSafeOperation(domain.maxUnits - domain.minUnits);
  const ratio = position / span;
  if (!Number.isFinite(ratio)) {
    throw numericRangeError();
  }
  return Math.min(1, Math.max(0, ratio));
}

export function normalizeRatio(domain: FixedPointDomain, valueRatio: number): number {
  if (!Number.isFinite(valueRatio)) {
    throw numericRangeError();
  }
  const ratio = Math.min(1, Math.max(0, valueRatio));
  const spanUnits = requireSafeOperation(domain.maxUnits - domain.minUnits);
  if (ratio === 0) {
    return unitsToNumber(domain.minUnits, domain);
  }
  if (ratio === 1) {
    return unitsToNumber(domain.maxUnits, domain);
  }

  const position = ratio * spanUnits;
  if (!Number.isFinite(position)) {
    throw numericRangeError();
  }
  if (domain.stepUnits === null) {
    if (domain.markUnits.length === 0) {
      throw numericRangeError();
    }
    const targetUnits = domain.minUnits + position;
    let selected = domain.markUnits[0];
    if (selected === undefined) {
      throw numericRangeError();
    }
    let selectedDistance = Math.abs(targetUnits - selected);
    for (const candidate of domain.markUnits.slice(1)) {
      const distance = Math.abs(targetUnits - candidate);
      if (distance <= selectedDistance) {
        selected = candidate;
        selectedDistance = distance;
      }
    }
    return unitsToNumber(selected, domain);
  }
  const lowerIndex = Math.floor(position / domain.stepUnits);
  const lowerUnits = requireSafeOperation(
    domain.minUnits + lowerIndex * domain.stepUnits,
  );
  const upperUnits = Math.min(
    requireSafeOperation(lowerUnits + domain.stepUnits),
    domain.maxUnits,
  );
  const targetUnits = domain.minUnits + position;
  const normalizedUnits =
    upperUnits - targetUnits <= targetUnits - lowerUnits ? upperUnits : lowerUnits;
  return unitsToNumber(normalizedUnits, domain);
}

export function adoptLiveValue(
  domain: FixedPointDomain,
  liveValue: string,
  fallback: number,
): number {
  if (liveValue.trim() === "") {
    return fallback;
  }
  const parsed = Number(liveValue);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  try {
    return normalizeValue(domain, parsed);
  } catch {
    return fallback;
  }
}
