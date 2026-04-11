import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Radio from "../index";

describe("Radio", () => {
  it("renders label-only radio with default classes", () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);

    const input = screen.getByRole("radio", { name: "Basic Plan" });
    const wrapper = input.closest("span");
    const text = screen.getByText("Basic Plan");

    expect(input).toHaveAttribute("type", "radio");
    expect(input).toHaveAttribute("name", "plan");
    expect(input).toHaveAttribute("value", "basic");
    expect(input).toHaveClass("radio__input");
    expect(wrapper).toHaveClass("radio");
    expect(wrapper).toHaveClass("radio--native");
    expect(wrapper).toHaveClass("radio--medium");
    expect(wrapper).toHaveClass("radio--start");
    expect(text).toHaveClass("radio__label");
  });

  it("renders children as visible label content", () => {
    render(
      <Radio name="tier" value="pro">
        <span>Pro Plan</span>
      </Radio>,
    );

    const input = screen.getByRole("radio", { name: "Pro Plan" });

    expect(screen.getByText("Pro Plan")).toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-label");
  });

  it("uses label as aria-label when both label and children are provided", () => {
    render(
      <Radio name="subscription" value="premium" label="Premium subscription option">
        <span>
          <strong>Premium</strong>
        </span>
      </Radio>,
    );

    const input = screen.getByRole("radio", {
      name: "Premium subscription option",
    });

    expect(input).toHaveAttribute("aria-label", "Premium subscription option");
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("returns null and warns when both label and children are missing", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { container } = render(<Radio name="missing" value="none" />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      '[Radio] Either "label" or "children" prop must be provided for accessibility.',
    );

    warnSpy.mockRestore();
  });

  it("forwards id, className, checked, and disabled props", () => {
    render(
      <Radio
        id="custom-radio-id"
        name="settings"
        value="enabled"
        label="Enable setting"
        variant="button"
        size="large"
        align="center"
        checked
        disabled
        className="custom-radio"
      />,
    );

    const input = screen.getByRole("radio", { name: "Enable setting" });
    const wrapper = input.closest("span");
    const label = screen.getByText("Enable setting").closest("label");

    expect(input).toHaveAttribute("id", "custom-radio-id");
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
    expect(label).toHaveAttribute("for", "custom-radio-id");
    expect(wrapper).toHaveClass("radio--button");
    expect(wrapper).toHaveClass("radio--large");
    expect(wrapper).toHaveClass("radio--center");
    expect(wrapper).toHaveClass("custom-radio");
  });

  it("generates id automatically and links label with input", () => {
    render(<Radio name="auto-id-group" value="a" label="Auto id radio" />);

    const input = screen.getByRole("radio", { name: "Auto id radio" });
    const label = screen.getByText("Auto id radio").closest("label");
    const inputId = input.getAttribute("id");

    expect(inputId).toBeTruthy();
    expect(label).toHaveAttribute("for", inputId ?? "");
  });

  it.each([
    {
      variant: "native" as const,
      size: "small" as const,
      align: "start" as const,
      expectedClasses: ["radio--native", "radio--small", "radio--start"],
    },
    {
      variant: "outline" as const,
      size: "medium" as const,
      align: "center" as const,
      expectedClasses: ["radio--outline", "radio--medium", "radio--center"],
    },
    {
      variant: "button" as const,
      size: "large" as const,
      align: "start" as const,
      expectedClasses: ["radio--button", "radio--large", "radio--start"],
    },
  ])(
    "applies class combinations for variant=$variant size=$size align=$align",
    ({ variant, size, align, expectedClasses }) => {
      render(
        <Radio
          name="combo-group"
          value={`${variant}-${size}-${align}`}
          label="Combo option"
          variant={variant}
          size={size}
          align={align}
        />,
      );

      const input = screen.getByRole("radio", { name: "Combo option" });
      const wrapper = input.closest("span");

      expectedClasses.forEach((className) => {
        expect(wrapper).toHaveClass(className);
      });
    },
  );

  it("selects clicked option and deselects other radios in the same group", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Radio name="shipping" value="standard" label="Standard" checked />
        <Radio name="shipping" value="express" label="Express" />
      </>,
    );

    const standard = screen.getByRole("radio", { name: "Standard" });
    const express = screen.getByRole("radio", { name: "Express" });

    expect(standard).toBeChecked();
    expect(express).not.toBeChecked();

    await user.click(express);

    expect(express).toBeChecked();
    expect(standard).not.toBeChecked();
  });

  it("calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Radio
        name="notifications"
        value="enabled"
        label="Enable notifications"
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("radio", { name: "Enable notifications" });
    await user.click(input);

    expect(input).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Radio
        name="disabled-group"
        value="disabled-option"
        label="Disabled option"
        disabled
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("radio", { name: "Disabled option" });
    expect(input).toBeDisabled();
    expect(input).not.toBeChecked();

    await user.click(input);

    expect(input).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
