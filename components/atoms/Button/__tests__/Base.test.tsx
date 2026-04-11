import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Base";

describe("Button", () => {
  it("renders a button with children text", () => {
    render(
      <Button variant="contained" color="primary" size="medium">
        Save
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("uses button as default type", () => {
    render(
      <Button variant="contained" color="primary" size="medium">
        Submit
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("applies default variant/color/size classes when style props are omitted", () => {
    render(<Button>Default</Button>);

    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toHaveClass("btn--contained");
    expect(button).toHaveClass("btn--primary");
    expect(button).toHaveClass("btn-base--medium");
  });

  it("applies base and variant/color/size classes", () => {
    render(
      <Button variant="outlined" color="secondary" size="small">
        Small
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Small" });
    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn-base");
    expect(button).toHaveClass("btn--outlined");
    expect(button).toHaveClass("btn--secondary");
    expect(button).toHaveClass("btn-base--small");
  });

  it.each([
    {
      variant: "contained" as const,
      color: "primary" as const,
      size: "large" as const,
      expectedClasses: ["btn--contained", "btn--primary", "btn-base--large"],
    },
    {
      variant: "outlined" as const,
      color: "secondary" as const,
      size: "medium" as const,
      expectedClasses: ["btn--outlined", "btn--secondary", "btn-base--medium"],
    },
    {
      variant: "contained" as const,
      color: "secondary" as const,
      size: "small" as const,
      expectedClasses: ["btn--contained", "btn--secondary", "btn-base--small"],
    },
  ])(
    "applies class combinations for variant=$variant, color=$color, size=$size",
    ({ variant, color, size, expectedClasses }) => {
      render(
        <Button variant={variant} color={color} size={size}>
          Combo
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Combo" });
      expectedClasses.forEach((className) => {
        expect(button).toHaveClass(className);
      });
    },
  );

  it("forwards native button props and custom className", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className="custom-button"
        data-testid="base-button"
        aria-label="Submit form"
        onClick={handleClick}
      >
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Submit form" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("custom-button");
    expect(screen.getByTestId("base-button")).toBe(button);

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button
        variant="contained"
        color="primary"
        size="medium"
        disabled
        onClick={handleClick}
      >
        Disabled button
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Disabled button" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
