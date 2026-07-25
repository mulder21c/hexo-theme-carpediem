import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IconButton from "../IconButton";

vi.mock("feather-icons-react", () => {
  function MockFeatherIcon({ icon, className }: { icon: string; className?: string }) {
    return <svg data-testid="feather-icon" data-icon={icon} className={className} />;
  }

  return { default: MockFeatherIcon };
});

describe("IconButton", () => {
  it("renders with default button/icon/tooltip settings when optional props are omitted", () => {
    render(<IconButton icon="plus" label="Add item" />);

    const button = screen.getByRole("button", { name: "Add item" });
    const icon = screen.getByTestId("feather-icon");
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn-icon");
    expect(button).toHaveClass("btn--contained");
    expect(button).toHaveClass("btn--primary");
    expect(button).toHaveClass("btn-icon--medium");

    expect(icon).toHaveAttribute("data-icon", "plus");
    expect(icon).toHaveClass("btn-icon__icon");
    expect(icon).toHaveClass("btn-icon__icon--medium");

    expect(tooltip).toHaveTextContent("Add item");
    expect(tooltip).toHaveAttribute("data-placement", "right");
    expect(tooltip).toHaveAttribute("data-alignment", "center");
    expect(button).toHaveAttribute("id");
    expect(button).toHaveAttribute("aria-labelledby", tooltip.getAttribute("id"));
    expect(tooltip).toHaveAttribute("data-trigger", button.getAttribute("id"));
  });

  it.each([
    {
      variant: "contained" as const,
      color: "primary" as const,
      size: "large" as const,
      expectedClasses: ["btn--contained", "btn--primary", "btn-icon--large"],
    },
    {
      variant: "outlined" as const,
      color: "secondary" as const,
      size: "medium" as const,
      expectedClasses: ["btn--outlined", "btn--secondary", "btn-icon--medium"],
    },
    {
      variant: "contained" as const,
      color: "secondary" as const,
      size: "small" as const,
      expectedClasses: ["btn--contained", "btn--secondary", "btn-icon--small"],
    },
  ])(
    "applies class combinations for variant=$variant, color=$color, size=$size",
    ({ variant, color, size, expectedClasses }) => {
      render(
        <IconButton
          icon="plus"
          label="Combo item"
          variant={variant}
          color={color}
          size={size}
        />,
      );

      const button = screen.getByRole("button", { name: "Combo item" });
      expectedClasses.forEach((className) => {
        expect(button).toHaveClass(className);
      });
    },
  );

  it("applies custom style and tooltip props", () => {
    render(
      <IconButton
        id="custom-trigger"
        type="submit"
        variant="outlined"
        color="secondary"
        size="large"
        stroke="bold"
        icon="x"
        label="Close menu"
        placement="left"
        alignment="end"
        className="custom-class"
      />,
    );

    const button = screen.getByRole("button", { name: "Close menu" });
    const icon = screen.getByTestId("feather-icon");
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    const container = button.closest(".tooltip__container");

    expect(button).toHaveAttribute("id", "custom-trigger");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("btn--outlined");
    expect(button).toHaveClass("btn--secondary");
    expect(button).toHaveClass("btn-icon--large");
    expect(button).not.toHaveClass("custom-class");
    expect(container).toHaveClass("custom-class");

    expect(icon).toHaveAttribute("data-icon", "x");
    expect(icon).toHaveClass("btn-icon__icon--bold");

    expect(tooltip).toHaveTextContent("Close menu");
    expect(tooltip).toHaveAttribute("data-placement", "left");
    expect(tooltip).toHaveAttribute("data-alignment", "end");
    expect(tooltip).toHaveAttribute("data-trigger", "custom-trigger");
  });

  it("forwards native props and handles click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton
        icon="plus"
        label="Add item"
        variant="contained"
        color="primary"
        size="medium"
        placement="right"
        alignment="center"
        data-testid="icon-button"
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Add item" });
    expect(screen.getByTestId("icon-button")).toBe(button);

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <IconButton
        icon="plus"
        label="Disabled item"
        variant="contained"
        color="primary"
        size="medium"
        placement="right"
        alignment="center"
        disabled
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole("button", { name: "Disabled item" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
