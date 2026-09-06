import { renderToStaticMarkup } from "react-dom/server";
import Slider from "../index";

function renderMarkup(
  props: Partial<React.ComponentProps<typeof Slider>> = {},
): HTMLElement {
  const html = renderToStaticMarkup(
    <Slider min={0} max={100} value={40} name="volume" aria-label="Volume" {...props} />,
  );
  const container = document.createElement("div");
  container.innerHTML = html;
  const root = container.firstElementChild;
  if (!(root instanceof HTMLElement)) {
    throw new Error("Slider root was not rendered");
  }
  return root;
}

describe("Slider static markup", () => {
  it("renders the exact canonical input, rail, and visual thumb topology", () => {
    const root = renderMarkup({ id: "volume-slider", className: "custom" });
    const input = root.querySelector('input[type="range"]');
    const rail = root.querySelector("[data-slider-rail]");
    const thumb = root.querySelector("[data-slider-thumb]");

    expect(root.id).toBe("volume-slider");
    expect(root).toHaveClass("slider", "slider--medium", "slider--horizontal", "custom");
    expect(root.children).toHaveLength(2);
    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(rail?.parentElement).toBe(root);
    expect(thumb?.parentElement).toBe(rail);
    expect(rail?.children).toHaveLength(1);
  });

  it("puts native range, form, value, and accessible naming semantics on one input", () => {
    const root = renderMarkup();
    const input = root.querySelector("input") as HTMLInputElement;

    expect(input).toHaveAttribute("type", "range");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "100");
    expect(input).toHaveAttribute("step", "1");
    expect(input).toHaveAttribute("value", "40");
    expect(input).toHaveAttribute("name", "volume");
    expect(input).toHaveAttribute("aria-label", "Volume");
    expect(input).toHaveAttribute("aria-valuenow", "40");
    expect(input).not.toHaveAttribute("role");
    expect(input).not.toHaveAttribute("tabindex");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");
    expect(root.querySelectorAll('input[type="range"]')).toHaveLength(1);
    expect(root.querySelectorAll('[role="slider"]')).toHaveLength(0);
  });

  it("emits every defaulted bootstrap field and exact related-element hooks", () => {
    const root = renderMarkup();

    expect(root).toHaveAttribute("data-component", "slider");
    expect(root).toHaveAttribute("data-slider-min", "0");
    expect(root).toHaveAttribute("data-slider-max", "100");
    expect(root).toHaveAttribute("data-slider-value", "40");
    expect(root).toHaveAttribute("data-slider-step", "1");
    expect(root).toHaveAttribute("data-slider-shift-step", "10");
    expect(root).toHaveAttribute("data-slider-marks", "false");
    expect(root).toHaveAttribute("data-slider-orientation", "horizontal");
    expect(root).toHaveAttribute("data-slider-size", "medium");
    expect(root).toHaveAttribute("data-slider-disabled", "false");
    expect(root).toHaveAttribute("data-slider-name", "volume");
    expect(root.querySelector("[data-slider-rail]")).toHaveAttribute(
      "data-slider-rail",
      "",
    );
    expect(root.querySelector("[data-slider-thumb]")).toHaveAttribute(
      "data-slider-thumb",
      "",
    );
  });

  it("normalizes the reset value and keeps whitespace-only names unnamed", () => {
    const root = renderMarkup({ value: 44, step: 10, name: "   " });
    const input = root.querySelector("input") as HTMLInputElement;

    expect(root).toHaveAttribute("data-slider-value", "40");
    expect(root).not.toHaveAttribute("data-slider-name");
    expect(input).toHaveAttribute("value", "40");
    expect(input).not.toHaveAttribute("name");
  });

  it("contains no React interaction props or duplicate interactive semantics", () => {
    const root = renderMarkup();
    const html = root.outerHTML.toLowerCase();

    expect(html).not.toContain("onchange");
    expect(html).not.toContain("oninput");
    expect(html).not.toContain("onpointer");
    expect(root.querySelectorAll("[tabindex]")).toHaveLength(0);
  });

  it("renders every automatic mark in ascending DOM order", () => {
    const root = renderMarkup({ min: 0, max: 10, value: 4, step: 3, marks: true });
    const marks = [...root.querySelectorAll("[data-slider-mark]")];

    expect(marks.map((mark) => mark.getAttribute("data-slider-mark-value"))).toEqual([
      "0",
      "3",
      "6",
      "9",
    ]);
  });

  it("renders sorted custom marks and preserves full optional label text", () => {
    const root = renderMarkup({
      min: 0,
      max: 10,
      value: 5,
      marks: [
        { value: 8, label: "A very long label that remains complete" },
        { value: 2 },
        { value: 5, label: "" },
      ],
    });
    const marks = [...root.querySelectorAll("[data-slider-mark]")];

    expect(marks.map((mark) => mark.getAttribute("data-slider-mark-value"))).toEqual([
      "2",
      "5",
      "8",
    ]);
    expect(root.querySelectorAll("[data-slider-mark-label]")).toHaveLength(2);
    expect(marks[2]?.textContent).toBe("A very long label that remains complete");
    expect(root.outerHTML).not.toContain("data-slider-config");
  });

  it("renders restricted values with step any and current aria-valuetext only", () => {
    const root = renderMarkup({
      step: null,
      value: 35,
      marks: [
        { value: 20, label: "Low" },
        { value: 50, label: "Mid" },
        { value: 80, label: "High" },
      ],
    });
    const input = root.querySelector("input") as HTMLInputElement;

    expect(input).toHaveAttribute("step", "any");
    expect(input).toHaveAttribute("value", "50");
    expect(input).toHaveAttribute("aria-valuetext", "Mid");
    expect(root.querySelectorAll(".slider__mark--current")).toHaveLength(1);
  });

  it.each([
    ["small", "horizontal"],
    ["medium", "horizontal"],
    ["large", "vertical"],
  ] as const)(
    "renders %s %s presentation without owning parent height",
    (size, orientation) => {
      const root = renderMarkup({
        size,
        orientation,
        disabled: orientation === "vertical",
      });
      const input = root.querySelector("input") as HTMLInputElement;

      expect(root).toHaveClass(`slider--${size}`, `slider--${orientation}`);
      expect(root.style.height).toBe("");
      expect(input.disabled).toBe(orientation === "vertical");
      if (orientation === "vertical") {
        expect(input).toHaveAttribute("aria-orientation", "vertical");
        expect(root).toHaveClass("slider--disabled");
      } else {
        expect(input).not.toHaveAttribute("aria-orientation");
      }
    },
  );
});
