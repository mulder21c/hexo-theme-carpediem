import type { RadioGroupOptionItem } from "./type";

export function areOptionValuesUnique(options: Array<RadioGroupOptionItem>): boolean {
  const values = new Set<string>();

  for (const option of options) {
    if (values.has(option.value)) {
      return false;
    }
    values.add(option.value);
  }

  return true;
}
