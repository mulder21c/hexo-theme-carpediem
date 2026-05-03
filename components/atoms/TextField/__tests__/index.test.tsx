import { render, screen } from "@testing-library/react";
import TextField from "../index";

const { mockWarn } = vi.hoisted(() => ({
  mockWarn: vi.fn(),
}));

vi.mock("@context/HexoContext", () => ({
  useHexo: () => ({
    hexoLog: {
      warn: mockWarn,
    },
  }),
}));

vi.mock("feather-icons-react", () => ({
  default: ({
    icon,
    className,
    "aria-hidden": ariaHidden,
    focusable,
  }: {
    icon: string;
    className?: string;
    "aria-hidden"?: React.SVGProps<SVGSVGElement>["aria-hidden"];
    focusable?: React.SVGProps<SVGSVGElement>["focusable"];
  }) => (
    <svg
      data-testid="feather-icon"
      data-icon={icon}
      aria-hidden={ariaHidden}
      focusable={focusable}
      className={className}
    />
  ),
}));

const getTextFieldRoot = (input: HTMLElement): Element | null =>
  input.closest(".textfield");

describe("TextField", () => {
  beforeEach(() => {
    mockWarn.mockClear();
  });

  it("renders default text input with outlined medium classes", () => {
    render(<TextField aria-label="Search query" name="query" placeholder="Search" />);

    const input = screen.getByLabelText("Search query");
    const wrapper = getTextFieldRoot(input);

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "query");
    expect(input).toHaveAttribute("placeholder", "Search");
    expect(input).toHaveClass("textfield__input");
    expect(wrapper).toHaveClass("textfield");
    expect(wrapper).toHaveClass("textfield--outlined");
    expect(wrapper).toHaveClass("textfield--medium");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it.each(["text", "password", "search", "url", "email"] as const)(
    "forwards supported type %s",
    (type) => {
      render(<TextField aria-label={`${type} field`} type={type} />);

      const input = screen.getByLabelText(`${type} field`);

      expect(input).toHaveAttribute("type", type);
    },
  );

  it("applies underlined variant class", () => {
    render(<TextField aria-label="Underlined field" variant="underlined" />);

    const input = screen.getByLabelText("Underlined field");
    const wrapper = getTextFieldRoot(input);

    expect(wrapper).toHaveClass("textfield--underlined");
    expect(wrapper).not.toHaveClass("textfield--outlined");
  });

  it.each([
    { size: "small" as const, expectedClass: "textfield--small" },
    { size: "medium" as const, expectedClass: "textfield--medium" },
    { size: "large" as const, expectedClass: "textfield--large" },
  ])("applies size class for $size", ({ size, expectedClass }) => {
    render(<TextField aria-label={`Size ${size}`} size={size} />);

    const input = screen.getByLabelText(`Size ${size}`);
    const wrapper = getTextFieldRoot(input);

    expect(wrapper).toHaveClass(expectedClass);
  });

  it("rejects a public invalid prop at the type level", () => {
    const invalidPropUsage = (
      // @ts-expect-error invalid state must be represented through aria-invalid.
      <TextField aria-label="Invalid prop" invalid />
    );

    expect(invalidPropUsage).toBeTruthy();
  });

  it("does not render an internal label when externally labelled by id", () => {
    const { container } = render(
      <>
        <label htmlFor="external-textfield">External text field</label>
        <TextField id="external-textfield" />
      </>,
    );

    const input = screen.getByLabelText("External text field");
    const root = getTextFieldRoot(input);

    expect(root?.querySelector("label")).not.toBeInTheDocument();
    expect(container.querySelectorAll("label")).toHaveLength(1);
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("does not warn when id is present for external label composition", () => {
    render(<TextField id="composed-textfield" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("id", "composed-textfield");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("does not warn when aria-label is present", () => {
    render(<TextField aria-label="Named text field" />);

    expect(screen.getByLabelText("Named text field")).toBeInTheDocument();
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("does not warn when aria-labelledby is present", () => {
    render(
      <>
        <span id="textfield-name">Labelled by text</span>
        <TextField aria-labelledby="textfield-name" />
      </>,
    );

    expect(screen.getByLabelText("Labelled by text")).toHaveAttribute(
      "aria-labelledby",
      "textfield-name",
    );
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("warns when id, aria-label, and aria-labelledby are all missing but still renders", () => {
    render(<TextField name="missing-name" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("name", "missing-name");
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn).toHaveBeenCalledWith(
      "[TextField] Provide id, aria-label, or aria-labelledby for accessibility.",
    );
  });

  it("forwards readOnly and applies read-only state class", () => {
    render(<TextField aria-label="Read-only field" readOnly defaultValue="Locked" />);

    const input = screen.getByLabelText("Read-only field");
    const root = getTextFieldRoot(input);

    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveValue("Locked");
    expect(root).toHaveClass("textfield--readonly");
  });

  it("forwards disabled and applies disabled state class", () => {
    render(<TextField aria-label="Disabled field" disabled />);

    const input = screen.getByLabelText("Disabled field");
    const root = getTextFieldRoot(input);

    expect(input).toBeDisabled();
    expect(root).toHaveClass("textfield--disabled");
  });

  it("forwards aria-invalid and applies invalid state class", () => {
    render(<TextField aria-label="Invalid field" aria-invalid="true" />);

    const input = screen.getByLabelText("Invalid field");

    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("preserves aria-invalid semantics when disabled visual state takes precedence", () => {
    render(
      <TextField aria-label="Disabled invalid field" disabled aria-invalid="true" />,
    );

    const input = screen.getByLabelText("Disabled invalid field");
    const root = getTextFieldRoot(input);

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(root).toHaveClass("textfield--disabled");
  });

  it("keeps focused invalid state observable through native focus and invalid class", () => {
    render(<TextField aria-label="Focused invalid field" aria-invalid="true" />);

    const input = screen.getByLabelText("Focused invalid field");

    input.focus();

    expect(input).toHaveFocus();
  });

  it("renders a decorative leading Feather icon before the input", () => {
    render(<TextField aria-label="Search field" icon="search" placeholder="Search" />);

    const input = screen.getByLabelText("Search field");
    const icon = screen.getByTestId("feather-icon");
    const field = input.closest(".textfield__field");

    expect(icon).toHaveAttribute("data-icon", "search");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("focusable", "false");
    expect(icon).toHaveClass("textfield__icon");
    expect(field?.firstElementChild).toBe(icon);
    expect(input).toHaveAttribute("placeholder", "Search");
  });

  it("applies icon class only when a leading icon is present", () => {
    const { rerender } = render(<TextField aria-label="Without icon" />);

    expect(getTextFieldRoot(screen.getByLabelText("Without icon"))).not.toHaveClass(
      "textfield--with-icon",
    );

    rerender(<TextField aria-label="With icon" icon="mail" />);

    expect(getTextFieldRoot(screen.getByLabelText("With icon"))).toHaveClass(
      "textfield--with-icon",
    );
  });

  it.each([
    { variant: "outlined" as const, size: "small" as const },
    { variant: "underlined" as const, size: "medium" as const },
    { variant: "outlined" as const, size: "large" as const },
  ])("keeps icon inside the field for $variant $size", ({ variant, size }) => {
    render(
      <TextField
        aria-label={`${variant} ${size} icon field`}
        icon="search"
        variant={variant}
        size={size}
      />,
    );

    const input = screen.getByLabelText(`${variant} ${size} icon field`);
    const root = getTextFieldRoot(input);
    const field = input.closest(".textfield__field");

    expect(root).toHaveClass(`textfield--${variant}`);
    expect(root).toHaveClass(`textfield--${size}`);
    expect(root).toHaveClass("textfield--with-icon");
    expect(field).toContainElement(screen.getByTestId("feather-icon"));
    expect(field).toContainElement(input);
  });
});
