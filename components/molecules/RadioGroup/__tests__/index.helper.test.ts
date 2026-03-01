import { areOptionValuesUnique } from "../index.helper";
import type { RadioGroupOptionItem } from "../type";

describe("areOptionValuesUnique", () => {
  it("returns true when all scalar values are unique", () => {
    const options: Array<RadioGroupOptionItem> = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: 1, label: "Option 1" },
    ];

    expect(areOptionValuesUnique(options)).toBe(true);
  });

  it("returns false when scalar values are duplicated", () => {
    const options: Array<RadioGroupOptionItem> = [
      { value: "dup", label: "Option 1" },
      { value: "dup", label: "Option 2" },
    ];

    expect(areOptionValuesUnique(options)).toBe(false);
  });

  it("returns true when array values are unique", () => {
    const options: Array<RadioGroupOptionItem> = [
      { value: ["a", "1"], label: "Option A1" },
      { value: ["a", "2"], label: "Option A2" },
      { value: ["b", "1"], label: "Option B1" },
    ];

    expect(areOptionValuesUnique(options)).toBe(true);
  });

  it("returns false when array values are duplicated in the same order", () => {
    const options: Array<RadioGroupOptionItem> = [
      { value: ["a", "1"], label: "Option A1" },
      { value: ["a", "1"], label: "Option A1 duplicate" },
    ];

    expect(areOptionValuesUnique(options)).toBe(false);
  });

  it("treats array order as significant", () => {
    const options: Array<RadioGroupOptionItem> = [
      { value: ["a", "b"], label: "AB" },
      { value: ["b", "a"], label: "BA" },
    ];

    expect(areOptionValuesUnique(options)).toBe(true);
  });

  it("detects collisions between scalar and array values after normalization", () => {
    const options: Array<RadioGroupOptionItem> = [
      { value: ["a", "b"], label: "Array AB" },
      { value: `a\u0000b`, label: "Scalar AB with delimiter" },
    ];

    expect(areOptionValuesUnique(options)).toBe(false);
  });
});
