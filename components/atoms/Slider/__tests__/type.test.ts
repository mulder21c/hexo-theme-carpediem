import type {
  SliderEventDetail,
  SliderManagerConstructor,
  SliderManagerOptions,
  SliderMark,
  SliderProps,
  SliderRegistrationErrorCode,
  SliderTarget,
} from "../type";

const _REGISTRATION_ERROR_CODES = [
  "BROWSER_ENVIRONMENT",
  "ROOT_TOPOLOGY",
  "OWNERSHIP_CONFLICT",
  "ADAPTER",
  "BOOTSTRAP_CONTRACT",
  "REQUIRED_NUMBER",
  "RANGE",
  "NAMING",
  "STEP",
  "STATIC_MIRROR",
  "MARK",
  "MARK_LABEL",
  "SHIFT_STEP",
  "NUMERIC_REPRESENTABILITY",
] as const satisfies readonly SliderRegistrationErrorCode[];

describe("Slider type contract", () => {
  it("keeps props, marks, targets, adapters, and event details precise", () => {
    const mark = { value: 50, label: "Half" } satisfies SliderMark;
    const props = {
      id: "volume",
      className: "custom-slider",
      min: 0,
      max: 100,
      value: 50,
      step: 5,
      shiftStep: 20,
      marks: [mark],
      orientation: "horizontal",
      size: "medium",
      disabled: false,
      name: "volume",
      "aria-label": "Volume",
    } satisfies SliderProps;
    const directTarget: SliderTarget = document.createElement("div");
    const idTarget: SliderTarget = "volume";
    const options: SliderManagerOptions = {
      onChange(value) {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(this).toEqualTypeOf<void>();
      },
      onChangeCommitted(value) {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(this).toEqualTypeOf<void>();
      },
    };
    const detail: SliderEventDetail = { value: props.value };

    expectTypeOf(props.orientation).toEqualTypeOf<"horizontal">();
    expectTypeOf(directTarget).toMatchTypeOf<Element>();
    expectTypeOf(idTarget).toMatchTypeOf<string>();
    expectTypeOf(options).toMatchTypeOf<SliderManagerOptions>();
    expectTypeOf(detail.value).toEqualTypeOf<number>();
  });

  it("exposes exactly all registration error codes", () => {
    type MissingCode = Exclude<
      SliderRegistrationErrorCode,
      (typeof _REGISTRATION_ERROR_CODES)[number]
    >;
    type ExtraCode = Exclude<
      (typeof _REGISTRATION_ERROR_CODES)[number],
      SliderRegistrationErrorCode
    >;

    expectTypeOf<MissingCode>().toEqualTypeOf<never>();
    expectTypeOf<ExtraCode>().toEqualTypeOf<never>();
  });

  it("keeps SliderProps closed to unsupported React inputs", () => {
    const invalidEventProp: SliderProps = {
      min: 0,
      max: 10,
      value: 5,
      "aria-label": "Value",
      // @ts-expect-error React event adapters are manager-only.
      onChange: () => undefined,
    };
    const invalidChildrenProp: SliderProps = {
      min: 0,
      max: 10,
      value: 5,
      "aria-label": "Value",
      // @ts-expect-error Slider does not accept children.
      children: "unsupported",
    };

    expectTypeOf(invalidEventProp).toMatchTypeOf<SliderProps>();
    expectTypeOf(invalidChildrenProp).toMatchTypeOf<SliderProps>();
  });

  it("augments Window with optional diagnostics and manager globals", () => {
    expectTypeOf(window.__carpediemDiagnostics).toEqualTypeOf<boolean | undefined>();
    expectTypeOf(window.SliderManager).toEqualTypeOf<
      SliderManagerConstructor | undefined
    >();
  });
});
