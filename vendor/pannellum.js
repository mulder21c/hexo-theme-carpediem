(function (window, document) {
  if (!window.pannellum) return;
  const pannellum = window.pannellum;
  const containers = document.querySelectorAll(`.viewer-360__container`);
  const CONTROLLER_CN = `pnlm__controller`;
  const CONTROL_CN = `pnlm__control`;

  const buttons = [
    {
      func: `pan-up`,
      label: `panning up`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" focusable="false" aria-hidden="true"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`,
    },
    {
      func: `pan-down`,
      label: `panning down`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" focusable="false" aria-hidden="true"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`,
    },
    {
      func: `pan-left`,
      label: `panning left`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" focusable="false" aria-hidden="true"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`,
    },
    {
      func: `pan-right`,
      label: `panning right`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" focusable="false" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`,
    },
    {
      func: `zoom-in`,
      label: `zoom in`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" focusable="false" aria-hidden="true"><<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>`,
    },
    {
      func: `zoom-out`,
      label: `zoom out`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" focusable="false" aria-hidden="true"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>`,
    },
    {
      func: `fullscreen`,
      label: `full screen`,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" focusable="false" aria-hidden="true"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>`,
    },
  ];

  const generateControl = ({ func, label, content }) => {
    const control = document.createElement(`button`);
    console.log(func);
    control.dataset.func = func;
    control.setAttribute(`type`, `button`);
    control.setAttribute(`aria-label`, label);
    control.classList.add(CONTROL_CN, `${CONTROL_CN}--${func}`);
    control.insertAdjacentHTML(`afterbegin`, content);

    return control;
  };

  const generateControls = (controls) => {
    const controller = document.createElement(`div`);
    controller.classList.add(CONTROLLER_CN);

    controls.forEach(({ func, label, content }) => {
      controller.appendChild(generateControl({ func, label, content }));
    });

    return controller;
  };

  const handlePanningControls = function (viewer) {
    return function (event) {
      if (!event.target.closest(`.${CONTROLLER_CN}`)) return;
      const btn = event.target;
      switch (btn.dataset.func) {
        case `pan-up`:
          viewer.setPitch(viewer.getPitch() + 20);
          break;
        case `pan-down`:
          viewer.setPitch(viewer.getPitch() - 20);
          break;
        case `pan-left`:
          viewer.setYaw(viewer.getYaw() - 20);
          break;
        case `pan-right`:
          viewer.setYaw(viewer.getYaw() + 20);
          break;
      }
    };
  };

  const handleZoomControls = function (viewer) {
    return function (event) {
      if (!event.target.closest(`.${CONTROLLER_CN}`)) return;
      const btn = event.target;
      switch (btn.dataset.func) {
        case `zoom-in`:
          viewer.setHfov(viewer.getHfov() - 20);
          break;
        case `zoom-out`:
          viewer.setHfov(viewer.getHfov() + 20);
          break;
        case `fullscreen`:
          viewer.toggleFullscreen();
          break;
      }
    };
  };

  containers.forEach((container) => {
    const player = container.querySelector(`.viewer-360`);
    const url = player.getAttribute(`data-image`);
    container.appendChild(generateControls(buttons));

    const viewer = pannellum.viewer(player, {
      type: "equirectangular",
      panorama: url,
      autoLoad: true,
      hfov: 80,
      showControls: false,
    });

    container.addEventListener(`mousedown`, handlePanningControls(viewer));
    container.addEventListener(`keypress`, handlePanningControls(viewer));
    container.addEventListener(`click`, handleZoomControls(viewer));
  });
})(window, document);
