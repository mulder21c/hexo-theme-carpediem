import type { RadioGroupOptionItem } from "./type";

export function areOptionValuesUnique(options: Array<RadioGroupOptionItem>): boolean {
  const values = new Set<string>();

  for (const option of options) {
    const normalizedValue = Array.isArray(option.value)
      ? option.value.join("\u0000")
      : String(option.value);

    if (values.has(normalizedValue)) {
      return false;
    }
    values.add(normalizedValue);
  }

  return true;
}
