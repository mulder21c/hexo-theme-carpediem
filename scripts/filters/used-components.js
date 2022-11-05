/**
 * @desc replace script tag passing used-components list into window object
 * @param {string} html rendered html string
 */
function setUsedComponentsFilter(html) {
  const locals = this.locals;
  const components = locals.get(`components`);
  const sourceStr = `<script data-component></script>`;
  // components: use component list
  // uis: component's named ui
  const replaceStr = `<script>
    window.components = new Set(${JSON.stringify([...components])});
    window.uis = new Map();
  </script>`;
  return html.replace(sourceStr, replaceStr);
}

module.exports = setUsedComponentsFilter;
