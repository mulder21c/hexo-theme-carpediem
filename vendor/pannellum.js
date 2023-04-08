(function (window, document) {
  if (!window.pannellum) return;
  const pannellum = window.pannellum;
  const containers = document.querySelectorAll(`.viewer-360`);
  containers.forEach((container) => {
    const url = container.getAttribute(`data-image`);
    pannellum.viewer(container, {
      type: "equirectangular",
      panorama: url,
      autoLoad: true,
      autoRotate: -10,
      hfov: 80,
    });
  });
})(window, document);
