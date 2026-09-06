import {
  adoptLiveValue,
  createFixedPointDomain,
  getAutomaticMarkValues,
  getSortedMarkValues,
  getValueRatio,
  normalizeRatio,
  normalizeValue,
  pageRestrictedValue,
  serializeCanonicalDecimal,
  stepNumericValue,
  stepRestrictedValue,
  type FixedPointDomain,
} from "../slider-value.helper";

describe("Slider fixed-point values", () => {
  it.each([
    [0, "0"],
    [-0, "0"],
    [1.25, "1.25"],
    [1e-7, "0.0000001"],
    [1.2e21, "1200000000000000000000"],
    [-4.5e-7, "-0.00000045"],
  ])("serializes %s as canonical plain decimal %s", (value, expected) => {
    expect(serializeCanonicalDecimal(value)).toBe(expected);
  });

  it("derives the smallest safe shared decimal scale", () => {
    const domain = createFixedPointDomain({
      min: -0.25,
      max: 1.75,
      step: 0.2,
      shiftStep: 0.6,
      marks: [0.15, 1.35],
    });

    expect(domain).toMatchObject({
      scale: 100,
      minUnits: -25,
      maxUnits: 175,
      stepUnits: 20,
      shiftStepUnits: 60,
      markUnits: [15, 135],
    });
  });

  it("rejects unsafe configuration scales and scaled values", () => {
    expect(() =>
      createFixedPointDomain({
        min: 0,
        max: 1,
        step: 1e-16,
        shiftStep: 1,
        marks: [],
      }),
    ).toThrow(RangeError);
    expect(() =>
      createFixedPointDomain({
        min: Number.MAX_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER + 2,
        step: 1,
        shiftStep: 1,
        marks: [],
      }),
    ).toThrow(RangeError);
  });

  it("normalizes numeric values to steps and always includes endpoints", () => {
    const domain = createFixedPointDomain({
      min: 0,
      max: 10,
      step: 4,
      shiftStep: 3,
      marks: [],
    });

    expect(normalizeValue(domain, -1)).toBe(0);
    expect(normalizeValue(domain, 2)).toBe(4);
    expect(normalizeValue(domain, 5)).toBe(4);
    expect(normalizeValue(domain, 6)).toBe(8);
    expect(normalizeValue(domain, 9)).toBe(10);
    expect(normalizeValue(domain, 11)).toBe(10);
  });

  it("moves through numeric steps and off-step endpoints without binary residue", () => {
    const domain = createFixedPointDomain({
      min: 0.1,
      max: 1,
      step: 0.3,
      shiftStep: 0.4,
      marks: [],
    });

    expect(stepNumericValue(domain, 0.1, 1)).toBe(0.4);
    expect(stepNumericValue(domain, 0.7, 1)).toBe(1);
    expect(stepNumericValue(domain, 1, 1)).toBe(1);
    expect(stepNumericValue(domain, 1, -1)).toBe(0.7);
    expect(stepNumericValue(domain, 0.1, -1)).toBe(0.1);
  });

  it("calculates endpoint-safe ratios", () => {
    const domain = createFixedPointDomain({
      min: -5,
      max: 15,
      step: 2,
      shiftStep: 4,
      marks: [],
    });

    expect(getValueRatio(domain, -5)).toBe(0);
    expect(getValueRatio(domain, 5)).toBe(0.5);
    expect(getValueRatio(domain, 15)).toBe(1);
  });

  it("adopts safely representable live values and falls back for unsafe precision", () => {
    const domain = createFixedPointDomain({
      min: 0,
      max: 1,
      step: 0.1,
      shiftStep: 0.2,
      marks: [],
    });

    expect(adoptLiveValue(domain, "0.55", 0.4)).toBe(0.6);
    expect(adoptLiveValue(domain, "0.12345678901234567", 0.4)).toBe(0.4);
    expect(adoptLiveValue(domain, "not-a-number", 0.4)).toBe(0.4);
  });

  it("generates every aligned automatic mark without adding an off-step max", () => {
    const domain = createFixedPointDomain({
      min: 1,
      max: 10,
      step: 3,
      shiftStep: 4,
      marks: [],
    });

    expect(getAutomaticMarkValues(domain)).toEqual([1, 4, 7, 10]);

    const offStep = createFixedPointDomain({
      min: 1,
      max: 11,
      step: 3,
      shiftStep: 4,
      marks: [],
    });
    expect(getAutomaticMarkValues(offStep)).toEqual([1, 4, 7, 10]);
  });

  it("sorts custom marks and rejects fixed-point duplicates", () => {
    const domain = createFixedPointDomain({
      min: 0,
      max: 1,
      step: 0.1,
      shiftStep: 0.2,
      marks: [0.8, 0.2, 0.5],
    });

    expect(getSortedMarkValues(domain)).toEqual([0.2, 0.5, 0.8]);
    expect(() =>
      createFixedPointDomain({
        min: 0,
        max: 1,
        step: null,
        shiftStep: 0.2,
        marks: [0.5, 0.5],
      }),
    ).toThrow(RangeError);
  });

  it("normalizes restricted values with larger ties and navigates adjacent marks", () => {
    const domain = createFixedPointDomain({
      min: 0,
      max: 100,
      step: null,
      shiftStep: 30,
      marks: [80, 20, 50],
    });

    expect(normalizeValue(domain, 35)).toBe(50);
    expect(normalizeValue(domain, -1)).toBe(20);
    expect(normalizeValue(domain, 99)).toBe(80);
    expect(stepRestrictedValue(domain, 50, 1)).toBe(80);
    expect(stepRestrictedValue(domain, 50, -1)).toBe(20);
    expect(stepRestrictedValue(domain, 80, 1)).toBe(80);
  });

  it("chooses directional restricted Page targets", () => {
    const domain = createFixedPointDomain({
      min: 0,
      max: 100,
      step: null,
      shiftStep: 15,
      marks: [0, 20, 40, 60, 80, 100],
    });

    expect(pageRestrictedValue(domain, 40, 1)).toBe(60);
    expect(pageRestrictedValue(domain, 60, -1)).toBe(40);
  });

  it("rejects unsafe operation-local scaling and distance intermediates", () => {
    const domain = createFixedPointDomain({
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      step: null,
      shiftStep: 1,
      marks: [0, Number.MAX_SAFE_INTEGER],
    });

    expect(() => normalizeValue(domain, 0.5)).toThrow(RangeError);
    expect(adoptLiveValue(domain, "0.5", 0)).toBe(0);
  });

  it("rejects unsafe ratio, index, and serialization intermediates", () => {
    const unsafeSpan: FixedPointDomain = {
      scale: 1,
      precision: 0,
      minUnits: -Number.MAX_SAFE_INTEGER,
      maxUnits: Number.MAX_SAFE_INTEGER,
      stepUnits: 1,
      shiftStepUnits: 1,
      markUnits: [],
    };
    const unsafeIndex: FixedPointDomain = {
      scale: 1,
      precision: 0,
      minUnits: 0,
      maxUnits: 10,
      stepUnits: 0,
      shiftStepUnits: 1,
      markUnits: [],
    };

    expect(() => getValueRatio(unsafeSpan, 0)).toThrow(RangeError);
    expect(() => normalizeRatio(unsafeSpan, 0.5)).toThrow(RangeError);
    expect(() => stepNumericValue(unsafeIndex, 5, 1)).toThrow(RangeError);
    expect(() => serializeCanonicalDecimal(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });

  it("rejects selectable values collapsed by JavaScript number parsing", () => {
    const collapsed = 1 + Number.EPSILON / 4;
    expect(collapsed).toBe(1);
    expect(() =>
      createFixedPointDomain({
        min: 0,
        max: 2,
        step: null,
        shiftStep: 1,
        marks: [1, collapsed],
      }),
    ).toThrow(RangeError);
  });
});
