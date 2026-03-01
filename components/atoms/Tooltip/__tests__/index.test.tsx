import { render, screen } from "@testing-library/react";
import Tooltip from "../index";

describe("Tooltip component", () => {
  it("renders container and forwards container props", () => {
    render(
      <Tooltip
        triggerId="trigger-a"
        placement="top"
        alignment="center"
        className="custom-container"
        data-testid="tooltip-container"
        aria-live="polite"
      >
        <Tooltip.Trigger>
          <button id="trigger-a" type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Description</Tooltip.Content>
      </Tooltip>,
    );

    const container = screen.getByTestId("tooltip-container");
    expect(container).toHaveClass("tooltip__container");
    expect(container).toHaveClass("custom-container");
    expect(container).toHaveAttribute("aria-live", "polite");
  });

  it("links trigger and tooltip with aria-describedby and generated tooltip id", () => {
    render(
      <Tooltip triggerId="trigger-b" placement="top" alignment="center">
        <Tooltip.Trigger>
          <button id="trigger-b" type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Trigger" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });
    const describedBy = trigger.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(tooltip).toHaveAttribute("id", describedBy ?? "");
    expect(tooltip).toHaveAttribute("data-trigger", "trigger-b");
  });

  it("renders tooltip content with default attributes", () => {
    render(
      <Tooltip triggerId="trigger-c" placement="top" alignment="start">
        <Tooltip.Trigger>
          <button id="trigger-c" type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip content</Tooltip.Content>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(tooltip).toHaveAttribute("hidden");
    expect(tooltip).toHaveAttribute("data-component", "tooltip");
    expect(tooltip).toHaveAttribute("data-placement", "top");
    expect(tooltip).toHaveAttribute("data-alignment", "start");
    expect(tooltip).toHaveClass("tooltip");
    expect(tooltip).toHaveClass("tooltip--vertical");
    expect(tooltip).not.toHaveClass("tooltip--horizontal");
  });

  it("applies horizontal class for left/right placement", () => {
    render(
      <Tooltip triggerId="trigger-d" placement="left" alignment="end">
        <Tooltip.Trigger>
          <button id="trigger-d" type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Horizontal tooltip</Tooltip.Content>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(tooltip).toHaveAttribute("data-placement", "left");
    expect(tooltip).toHaveAttribute("data-alignment", "end");
    expect(tooltip).toHaveClass("tooltip--horizontal");
    expect(tooltip).not.toHaveClass("tooltip--vertical");
  });

  it("forwards props and custom className to Tooltip.Content", () => {
    render(
      <Tooltip triggerId="trigger-e" placement="bottom" alignment="center">
        <Tooltip.Trigger>
          <button id="trigger-e" type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          className="custom-content"
          data-testid="tooltip-content"
          data-kind="info"
        >
          Info
        </Tooltip.Content>
      </Tooltip>,
    );

    const tooltip = screen.getByTestId("tooltip-content");
    expect(tooltip).toHaveClass("custom-content");
    expect(tooltip).toHaveAttribute("data-kind", "info");
  });

  it("renders arrow element inside tooltip content", () => {
    render(
      <Tooltip triggerId="trigger-f" placement="right" alignment="center">
        <Tooltip.Trigger>
          <button id="trigger-f" type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip with arrow</Tooltip.Content>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip", { hidden: true });
    const arrow = tooltip.querySelector("[data-arrow]");

    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute("aria-hidden", "true");
    expect(arrow).toHaveClass("tooltip__arrow");
  });

  it("applies aria-describedby to every valid child in Tooltip.Trigger", () => {
    render(
      <Tooltip triggerId="trigger-g" placement="top" alignment="center">
        <Tooltip.Trigger>
          <button id="trigger-g" type="button">
            First trigger
          </button>
          <a href="#target">Second trigger</a>
          plain text
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>,
    );

    const button = screen.getByRole("button", { name: "First trigger" });
    const link = screen.getByRole("link", { name: "Second trigger" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(button).toHaveAttribute("aria-describedby", tooltip.getAttribute("id"));
    expect(link).toHaveAttribute("aria-describedby", tooltip.getAttribute("id"));
    expect(screen.getByText("plain text")).toBeInTheDocument();
  });

  it("overrides existing aria-describedby on trigger child", () => {
    render(
      <Tooltip triggerId="trigger-h" placement="top" alignment="center">
        <Tooltip.Trigger>
          <button id="trigger-h" type="button" aria-describedby="old-describedby">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Trigger" });
    const tooltip = screen.getByRole("tooltip", { hidden: true });

    expect(trigger).not.toHaveAttribute("aria-describedby", "old-describedby");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.getAttribute("id"));
  });
});
