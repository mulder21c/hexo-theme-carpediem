import { createSliderViewModel } from "../index.helper";

describe("Slider SSR view model", () => {
  it("applies defaults and exposes one immutable normalized reset value", () => {
    const model = createSliderViewModel({
      min: 0,
      max: 100,
      value: 41.5,
      "aria-label": "Volume",
    });

    expect(model).toMatchObject({
      min: 0,
      max: 100,
      value: 42,
      resetValue: 42,
      step: 1,
      shiftStep: 10,
      marksMode: "false",
      orientation: "horizontal",
      size: "medium",
      disabled: false,
      name: undefined,
      canonicalMin: "0",
      canonicalMax: "100",
      canonicalValue: "42",
      canonicalStep: "1",
      canonicalShiftStep: "10",
      ratio: 0.42,
    });
  });

  it.each([
    { value: -10, expected: 0 },
    { value: 5, expected: 10 },
    { value: 9, expected: 10 },
    { value: 99, expected: 100 },
    { value: 110, expected: 100 },
  ])("normalizes $value to $expected including endpoints and higher ties", (testCase) => {
    const model = createSliderViewModel({
      min: 0,
      max: 100,
      value: testCase.value,
      step: 10,
      "aria-label": "Value",
    });

    expect(model.value).toBe(testCase.expected);
    expect(model.resetValue).toBe(testCase.expected);
  });

  it("preserves a meaningful form name and omits empty names", () => {
    expect(
      createSliderViewModel({
        min: 0,
        max: 1,
        value: 0,
        name: "  volume  ",
        "aria-label": "Volume",
      }).name,
    ).toBe("  volume  ");
    expect(
      createSliderViewModel({
        min: 0,
        max: 1,
        value: 0,
        name: "   ",
        "aria-label": "Volume",
      }).name,
    ).toBeUndefined();
  });

  it("uses exact decimal normalization without binary residue", () => {
    const model = createSliderViewModel({
      min: 0.1,
      max: 1,
      value: 0.55,
      step: 0.1,
      shiftStep: 0.2,
      "aria-label": "Opacity",
    });

    expect(model.canonicalValue).toBe("0.6");
    expect(model.value).toBe(0.6);
    expect(model.ratio).toBeCloseTo(5 / 9);
  });

  it("generates every automatic mark and sorts custom marks", () => {
    const automatic = createSliderViewModel({
      min: 0,
      max: 10,
      value: 4,
      step: 3,
      marks: true,
      "aria-label": "Automatic",
    });
    const custom = createSliderViewModel({
      min: 0,
      max: 10,
      value: 5,
      step: 1,
      marks: [{ value: 8, label: "Eight" }, { value: 2 }, { value: 5, label: "" }],
      "aria-label": "Custom",
    });

    expect(automatic.markModels.map((mark) => mark.value)).toEqual([0, 3, 6, 9]);
    expect(custom.markModels.map((mark) => mark.value)).toEqual([2, 5, 8]);
    expect(custom.markModels.map((mark) => mark.label)).toEqual([undefined, "", "Eight"]);
  });

  it("uses custom marks as the complete restricted domain", () => {
    const model = createSliderViewModel({
      min: 0,
      max: 100,
      value: 35,
      step: null,
      marks: [
        { value: 20, label: "Low" },
        { value: 50, label: "Mid" },
        { value: 80, label: "High" },
      ],
      "aria-label": "Restricted",
    });

    expect(model.value).toBe(50);
    expect(model.canonicalStep).toBe("any");
    expect(model.ariaValueText).toBe("Mid");
    expect(model.markModels.map((mark) => mark.isCurrent)).toEqual([false, true, false]);
  });

  it("omits restricted aria-valuetext for a missing or empty current label", () => {
    const base = {
      min: 0,
      max: 10,
      value: 5,
      step: null,
      "aria-label": "Restricted",
    } as const;

    expect(
      createSliderViewModel({ ...base, marks: [{ value: 5 }] }).ariaValueText,
    ).toBeUndefined();
    expect(
      createSliderViewModel({ ...base, marks: [{ value: 5, label: "" }] }).ariaValueText,
    ).toBeUndefined();
  });
});
