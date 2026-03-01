import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "../index";

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

describe("Switch", () => {
  beforeEach(() => {
    mockWarn.mockClear();
  });

  it("renders switch with label and default medium size class", () => {
    render(<Switch name="alarm" value="on" label="Get Alarm" />);

    const input = screen.getByRole("switch", { name: "Get Alarm" });
    const wrapper = input.closest("span");
    const label = input.closest("label");

    expect(input).toHaveAttribute("type", "checkbox");
    expect(input).toHaveAttribute("name", "alarm");
    expect(input).toHaveAttribute("value", "on");
    expect(input).toHaveClass("switch__input");
    expect(wrapper).toHaveClass("switch");
    expect(wrapper).toHaveClass("switch--medium");
    expect(label).toHaveClass("switch__wrapper");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("warns when both label and aria-labelledby are missing but still renders", () => {
    render(<Switch name="missing-accessible-name" />);

    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn).toHaveBeenCalledWith(
      '[Switch] Either "label" or "aria-labelledby" prop must be provided for accessibility.',
    );
  });

  it("prioritizes aria-labelledby over label for accessible naming", () => {
    render(
      <>
        <span id="external-switch-label">External label text</span>
        <Switch
          aria-labelledby="external-switch-label"
          label="Fallback label"
          name="with-labelledby"
        />
      </>,
    );

    const input = screen.getByRole("switch", { name: "External label text" });

    expect(input).toHaveAttribute("aria-labelledby", "external-switch-label");
    expect(input).not.toHaveAttribute("aria-label");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("uses label as aria-label fallback when aria-labelledby is not provided", () => {
    render(<Switch name="fallback" label="Label fallback" />);

    const input = screen.getByRole("switch", { name: "Label fallback" });

    expect(input).toHaveAttribute("aria-label", "Label fallback");
    expect(input).not.toHaveAttribute("aria-labelledby");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("forwards id, className, checked, disabled, and links label htmlFor", () => {
    render(
      <Switch
        id="custom-switch-id"
        name="settings"
        value="enabled"
        label="Enable settings"
        size="large"
        checked
        disabled
        className="custom-switch"
      />,
    );

    const input = screen.getByRole("switch", { name: "Enable settings" });
    const wrapper = input.closest("span");
    const label = input.closest("label");

    expect(input).toHaveAttribute("id", "custom-switch-id");
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
    expect(label).toHaveAttribute("for", "custom-switch-id");
    expect(wrapper).toHaveClass("switch--large");
    expect(wrapper).toHaveClass("custom-switch");
  });

  it("generates id automatically and links label with input", () => {
    render(<Switch name="auto-id" label="Auto id switch" />);

    const input = screen.getByRole("switch", { name: "Auto id switch" });
    const label = input.closest("label");
    const inputId = input.getAttribute("id");

    expect(inputId).toBeTruthy();
    expect(label).toHaveAttribute("for", inputId ?? "");
  });

  it.each([
    { size: "small" as const, expectedClass: "switch--small" },
    { size: "medium" as const, expectedClass: "switch--medium" },
    { size: "large" as const, expectedClass: "switch--large" },
  ])("applies size class for $size", ({ size, expectedClass }) => {
    render(<Switch name={`size-${size}`} label={`Size ${size}`} size={size} />);

    const input = screen.getByRole("switch", { name: `Size ${size}` });
    const wrapper = input.closest("span");

    expect(wrapper).toHaveClass(expectedClass);
  });

  it("toggles checked state and calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Switch name="newsletter" label="Subscribe" onChange={handleChange} />);

    const input = screen.getByRole("switch", { name: "Subscribe" });
    expect(input).not.toBeChecked();

    await user.click(input);

    expect(input).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("toggles when clicking on the visual track via label wrapper", async () => {
    const user = userEvent.setup();

    render(<Switch name="track-toggle" label="Track toggle" />);

    const input = screen.getByRole("switch", { name: "Track toggle" });
    const track = input.nextElementSibling as HTMLElement | null;

    expect(track).toHaveClass("switch__track");
    expect(input).not.toBeChecked();

    await user.click(track as HTMLElement);

    expect(input).toBeChecked();
  });

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Switch
        name="disabled-switch"
        label="Disabled switch"
        disabled
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("switch", { name: "Disabled switch" });
    expect(input).toBeDisabled();
    expect(input).not.toBeChecked();

    await user.click(input);

    expect(input).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
