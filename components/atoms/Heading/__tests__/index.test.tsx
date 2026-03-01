import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Heading from "../index";

describe("Heading", () => {
  it.each([
    { level: 1 as const, tagName: "H1" },
    { level: 2 as const, tagName: "H2" },
    { level: 3 as const, tagName: "H3" },
    { level: 4 as const, tagName: "H4" },
    { level: 5 as const, tagName: "H5" },
    { level: 6 as const, tagName: "H6" },
  ])("renders semantic heading tag for level $level", ({ level, tagName }) => {
    render(<Heading level={level}>{`Heading level ${level}`}</Heading>);

    const heading = screen.getByRole("heading", {
      level,
      name: `Heading level ${level}`,
    });

    expect(heading.tagName).toBe(tagName);
    expect(heading).toHaveClass("heading");
    expect(heading).toHaveClass(`heading--level-${level}`);
  });

  it("forwards className and HTML attributes", () => {
    render(
      <Heading
        level={2}
        id="custom-heading"
        className="custom-heading"
        data-testid="heading"
        title="Heading title"
      >
        Heading with attrs
      </Heading>,
    );

    const heading = screen.getByTestId("heading");

    expect(heading).toHaveAttribute("id", "custom-heading");
    expect(heading).toHaveAttribute("title", "Heading title");
    expect(heading).toHaveClass("custom-heading");
    expect(heading).toHaveClass("heading");
    expect(heading).toHaveClass("heading--level-2");
  });

  it("renders long text content", () => {
    const text =
      "This is a very long heading text that demonstrates how the component handles longer content";

    render(<Heading level={1}>{text}</Heading>);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: text,
      }),
    ).toBeInTheDocument();
  });

  it("forwards event handlers", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Heading level={3} onClick={handleClick}>
        Clickable heading
      </Heading>,
    );

    const heading = screen.getByRole("heading", {
      level: 3,
      name: "Clickable heading",
    });

    await user.click(heading);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
