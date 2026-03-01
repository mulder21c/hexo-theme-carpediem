import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../index";

const mockWarn = jest.fn();

jest.mock(
  "@context/HexoContext",
  () => ({
    useHexo: () => ({
      hexoLog: {
        warn: mockWarn,
      },
    }),
  }),
  { virtual: true },
);

describe("Checkbox", () => {
  beforeEach(() => {
    mockWarn.mockClear();
  });

  it("renders label-only checkbox with default medium size class", () => {
    render(<Checkbox name="agree" label="I agree" />);

    const input = screen.getByRole("checkbox", { name: "I agree" });
    const wrapper = input.closest("span");
    const text = screen.getByText("I agree");

    expect(input).toHaveAttribute("type", "checkbox");
    expect(input).toHaveAttribute("name", "agree");
    expect(input).toHaveClass("checkbox__input");
    expect(wrapper).toHaveClass("checkbox");
    expect(wrapper).toHaveClass("checkbox--medium");
    expect(text).toHaveClass("checkbox__label");
  });

  it("renders children as visible label content", () => {
    render(
      <Checkbox name="terms">
        <span>Accept Terms</span>
      </Checkbox>,
    );

    const input = screen.getByRole("checkbox", { name: "Accept Terms" });

    expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-label");
  });

  it("uses label as aria-label when both label and children are provided", () => {
    render(
      <Checkbox name="plan" label="Premium subscription option">
        <span>
          <strong>Premium</strong>
        </span>
      </Checkbox>,
    );

    const input = screen.getByRole("checkbox", {
      name: "Premium subscription option",
    });

    expect(input).toHaveAttribute("aria-label", "Premium subscription option");
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("returns null and logs warning when label and children are both missing", () => {
    const { container } = render(<Checkbox name="missing-content" />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn).toHaveBeenCalledWith(
      '[Checkbox] Either "label" or "children" prop must be provided for accessibility.',
    );
  });

  it("forwards id, className, checked, and disabled props", () => {
    render(
      <Checkbox
        id="custom-checkbox-id"
        name="settings"
        label="Enable settings"
        size="large"
        checked
        disabled
        className="custom-checkbox"
      />,
    );

    const input = screen.getByRole("checkbox", { name: "Enable settings" });
    const wrapper = input.closest("span");
    const label = screen.getByText("Enable settings").closest("label");

    expect(input).toHaveAttribute("id", "custom-checkbox-id");
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
    expect(label).toHaveAttribute("for", "custom-checkbox-id");
    expect(wrapper).toHaveClass("checkbox--large");
    expect(wrapper).toHaveClass("custom-checkbox");
  });

  it("generates id automatically and links label with input", () => {
    render(<Checkbox name="auto-id" label="Auto id label" />);

    const input = screen.getByRole("checkbox", { name: "Auto id label" });
    const label = screen.getByText("Auto id label").closest("label");
    const inputId = input.getAttribute("id");

    expect(inputId).toBeTruthy();
    expect(label).toHaveAttribute("for", inputId ?? "");
  });

  it.each([
    { size: "small" as const, expectedClass: "checkbox--small" },
    { size: "medium" as const, expectedClass: "checkbox--medium" },
    { size: "large" as const, expectedClass: "checkbox--large" },
  ])("applies size class for $size", ({ size, expectedClass }) => {
    render(<Checkbox name={`size-${size}`} label={`Size ${size}`} size={size} />);

    const input = screen.getByRole("checkbox", { name: `Size ${size}` });
    const wrapper = input.closest("span");

    expect(wrapper).toHaveClass(expectedClass);
  });

  it("toggles checked state and calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Checkbox name="newsletter" label="Subscribe" onChange={handleChange} />);

    const input = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(input).not.toBeChecked();

    await user.click(input);

    expect(input).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Checkbox
        name="disabled-newsletter"
        label="Disabled subscribe"
        disabled
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("checkbox", { name: "Disabled subscribe" });
    expect(input).toBeDisabled();
    expect(input).not.toBeChecked();

    await user.click(input);

    expect(input).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
