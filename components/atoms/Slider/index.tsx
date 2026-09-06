import type { CSSProperties } from "react";
import classNames from "classnames/bind";
import { createSliderViewModel } from "./index.helper";
import styles from "./index.module.scss";
import type { SliderProps } from "./type";

const cx = classNames.bind(styles);

type SliderStyle = CSSProperties & {
  readonly "--slider-value-ratio": number;
  readonly "--slider-mark-active"?: number;
};

function Slider(props: SliderProps) {
  const model = createSliderViewModel(props);
  const valueStyle: SliderStyle = {
    "--slider-value-ratio": model.ratio,
  };

  return (
    <div
      id={model.id}
      className={cx(
        "slider",
        `slider--${model.size}`,
        `slider--${model.orientation}`,
        { "slider--disabled": model.disabled },
        model.className,
      )}
      data-component="slider"
      data-slider-min={model.canonicalMin}
      data-slider-max={model.canonicalMax}
      data-slider-value={model.canonicalValue}
      data-slider-step={model.step === null ? "null" : model.canonicalStep}
      data-slider-shift-step={model.canonicalShiftStep}
      data-slider-marks={model.marksMode}
      data-slider-orientation={model.orientation}
      data-slider-size={model.size}
      data-slider-disabled={String(model.disabled)}
      data-slider-name={model.name}
    >
      <input
        className={cx("slider__input", "visually-hidden")}
        type="range"
        min={model.canonicalMin}
        max={model.canonicalMax}
        step={model.canonicalStep}
        defaultValue={model.canonicalValue}
        name={model.name}
        disabled={model.disabled}
        aria-label={model.ariaLabel}
        aria-labelledby={model.ariaLabelledby}
        aria-orientation={model.orientation === "vertical" ? "vertical" : undefined}
        aria-valuenow={model.value}
        aria-valuetext={model.ariaValueText}
      />
      <span
        className={cx("slider__rail")}
        data-slider-rail=""
        style={valueStyle}
        aria-hidden="true"
      >
        <span className={cx("slider__thumb")} data-slider-thumb="" style={valueStyle} />
        {model.markModels.map((mark, markIndex) => {
          const markStyle: SliderStyle = {
            "--slider-value-ratio": mark.ratio,
            "--slider-mark-active": mark.isCurrent ? 1 : 0,
          };
          return (
            <span
              key={mark.canonicalValue}
              className={cx("slider__mark", {
                "slider__mark--current": mark.isCurrent,
                "slider__mark--first": markIndex === 0,
                "slider__mark--last": markIndex === model.markModels.length - 1,
              })}
              data-slider-mark=""
              data-slider-mark-value={mark.canonicalValue}
              style={markStyle}
            >
              {mark.label !== undefined ? (
                <span
                  className={cx("slider__mark-label", {
                    "slider__mark-label--first": markIndex === 0,
                    "slider__mark-label--last": markIndex === model.markModels.length - 1,
                  })}
                  data-slider-mark-label=""
                >
                  {mark.label}
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
    </div>
  );
}

export default Slider;
