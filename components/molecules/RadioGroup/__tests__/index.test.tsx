import type { ComponentType, ReactNode } from "react";
import Radio from "@components/atoms/Radio";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioGroup from "../index";

const mockWarn = jest.fn();
const mockError = jest.fn();

jest.mock(
  "@context/HexoContext",
  () => ({
    useHexo: () => ({
      hexoLog: {
        warn: mockWarn,
        error: mockError,
      },
    }),
  }),
  { virtual: true },
);

describe("RadioGroup", () => {
  beforeEach(() => {
    mockWarn.mockClear();
    mockError.mockClear();
  });

  it("returns null when neither options nor children are provided", () => {
    const { container } = render(<RadioGroup name="empty" aria-label="Empty group" />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
  });

  it("logs accessibility warning when aria-label and aria-labelledby are both missing", () => {
    render(
      <RadioGroup
        name="warn-group"
        options={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ]}
      />,
    );

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn).toHaveBeenCalledWith(
      "[RadioGroup] Provide aria-label or aria-labelledby for accessibility.",
    );
  });

  it("returns null and logs error when options contain duplicate values", () => {
    const duplicateOptions = [
      { value: "dup", label: "Option 1" },
      { value: "dup", label: "Option 2" },
    ];

    const { container } = render(
      <RadioGroup
        name="duplicate-group"
        options={duplicateOptions}
        aria-label="Duplicate group"
      />,
    );

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
    expect(mockError).toHaveBeenCalledTimes(1);
    expect(mockError).toHaveBeenCalledWith(
      "[RadioGroup] Duplicate option value in group:",
      duplicateOptions,
    );
  });

  it("renders options mode with group-level classes and radio attributes", () => {
    render(
      <RadioGroup
        name="plan"
        direction="vertical"
        variant="outline"
        size="large"
        align="center"
        className="custom-group"
        aria-label="Plan group"
        options={[
          { value: "basic", label: "Basic", checked: true },
          { value: "pro", label: "Pro", disabled: true },
        ]}
      />,
    );

    const group = screen.getByRole("radiogroup", { name: "Plan group" });
    const basic = screen.getByRole("radio", { name: "Basic" });
    const pro = screen.getByRole("radio", { name: "Pro" });

    expect(group).toHaveClass("radiogroup");
    expect(group).toHaveClass("radiogroup--vertical");
    expect(group).toHaveClass("radiogroup--outline");
    expect(group).toHaveClass("custom-group");

    expect(basic).toHaveAttribute("name", "plan");
    expect(basic).toHaveAttribute("value", "basic");
    expect(basic).toBeChecked();

    expect(pro).toHaveAttribute("name", "plan");
    expect(pro).toHaveAttribute("value", "pro");
    expect(pro).toBeDisabled();

    const basicItem = basic.closest("span");
    expect(basicItem).toHaveClass("radiogroup__item");
    expect(basicItem).toHaveClass("radio--outline");
    expect(basicItem).toHaveClass("radio--large");
    expect(basicItem).toHaveClass("radio--center");
  });

  it("supports options with array values and validates uniqueness correctly", () => {
    render(
      <RadioGroup
        name="array-values"
        aria-label="Array value group"
        options={[
          { value: ["a", "1"], label: "Option A1" },
          { value: ["a", "2"], label: "Option A2" },
        ]}
      />,
    );

    expect(
      screen.getByRole("radiogroup", { name: "Array value group" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Option A1" })).toHaveAttribute(
      "value",
      "a,1",
    );
    expect(screen.getByRole("radio", { name: "Option A2" })).toHaveAttribute(
      "value",
      "a,2",
    );
    expect(mockError).not.toHaveBeenCalled();
  });

  it("renders children mode and injects name/variant/size/align, including fragments", () => {
    render(
      <RadioGroup
        name="children-group"
        variant="button"
        size="small"
        align="center"
        direction="horizontal"
        aria-label="Children group"
      >
        <>
          <Radio value="yes" label="Yes" checked />
          <Radio value="no" label="No" disabled className="child-class" />
        </>
      </RadioGroup>,
    );

    const yes = screen.getByRole("radio", { name: "Yes" });
    const no = screen.getByRole("radio", { name: "No" });
    const yesItem = yes.closest("span");
    const noItem = no.closest("span");

    expect(yes).toHaveAttribute("name", "children-group");
    expect(no).toHaveAttribute("name", "children-group");
    expect(yes).toBeChecked();
    expect(no).toBeDisabled();

    expect(yesItem).toHaveClass("radiogroup__item");
    expect(yesItem).toHaveClass("radio--button");
    expect(yesItem).toHaveClass("radio--small");
    expect(yesItem).toHaveClass("radio--center");

    expect(noItem).toHaveClass("radiogroup__item");
    expect(noItem).toHaveClass("child-class");
  });

  it("keeps native radio group exclusivity when selecting another option", async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup
        name="shipping"
        aria-label="Shipping group"
        options={[
          { value: "standard", label: "Standard", checked: true },
          { value: "express", label: "Express" },
        ]}
      />,
    );

    const standard = screen.getByRole("radio", { name: "Standard" });
    const express = screen.getByRole("radio", { name: "Express" });

    expect(standard).toBeChecked();
    expect(express).not.toBeChecked();

    await user.click(express);

    expect(express).toBeChecked();
    expect(standard).not.toBeChecked();
  });

  it("forwards aria-labelledby and custom data attributes to radiogroup wrapper", () => {
    render(
      <>
        <span id="group-label">Delivery options</span>
        <RadioGroup
          name="delivery"
          aria-labelledby="group-label"
          data-testid="delivery-group"
          data-kind="delivery"
          options={[
            { value: "home", label: "Home" },
            { value: "pickup", label: "Pickup" },
          ]}
        />
      </>,
    );

    const group = screen.getByRole("radiogroup", { name: "Delivery options" });
    expect(group).toBe(screen.getByTestId("delivery-group"));
    expect(group).toHaveAttribute("data-kind", "delivery");
    expect(group).toHaveAttribute("aria-labelledby", "group-label");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("prefers children content when both options and children are provided", () => {
    render(
      <RadioGroup
        name="mixed-source"
        aria-label="Mixed group"
        options={[
          { value: "opt-a", label: "Option A" },
          { value: "opt-b", label: "Option B" },
        ]}
      >
        <Radio value="child-a" label="Child A" />
      </RadioGroup>,
    );

    expect(screen.getByRole("radio", { name: "Child A" })).toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: "Option A" })).not.toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: "Option B" })).not.toBeInTheDocument();
    expect(mockWarn).toHaveBeenCalledWith(
      "[RadioGroup] Both options and children were provided. Children takes precedence.",
    );
  });

  it("renders non-element children as-is in children mode", () => {
    const UnsafeRadioGroup = RadioGroup as unknown as ComponentType<{
      name?: string;
      "aria-label"?: string;
      children?: ReactNode;
    }>;

    render(
      <UnsafeRadioGroup name="passthrough-group" aria-label="Passthrough group">
        {"Helper text"}
        <Radio value="main" label="Main option" />
      </UnsafeRadioGroup>,
    );

    expect(screen.getByText("Helper text")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Main option" })).toBeInTheDocument();
  });

  it("uses option-level variant/size/align when group values are nullish at runtime", () => {
    render(
      <RadioGroup
        name="runtime-fallback"
        aria-label="Runtime fallback group"
        variant={null as unknown as "native"}
        size={null as unknown as "medium"}
        align={null as unknown as "start"}
        options={[
          {
            value: "runtime-a",
            label: "Runtime A",
            variant: "button",
            size: "large",
            align: "center",
          },
        ]}
      />,
    );

    const radio = screen.getByRole("radio", { name: "Runtime A" });
    const item = radio.closest("span");

    expect(item).toHaveClass("radio--button");
    expect(item).toHaveClass("radio--large");
    expect(item).toHaveClass("radio--center");
  });

  it("falls back to native/medium/start when both group and option style props are missing", () => {
    render(
      <RadioGroup
        name="runtime-default-style"
        aria-label="Runtime default style group"
        variant={null as unknown as "native"}
        size={null as unknown as "medium"}
        align={null as unknown as "start"}
        options={[
          {
            value: "runtime-default",
            label: "Runtime Default",
          },
        ]}
      />,
    );

    const radio = screen.getByRole("radio", { name: "Runtime Default" });
    const item = radio.closest("span");

    expect(item).toHaveClass("radio--native");
    expect(item).toHaveClass("radio--medium");
    expect(item).toHaveClass("radio--start");
  });
});
