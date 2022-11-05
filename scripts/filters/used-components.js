/**
 * @desc replace script tag passing used-components list into window object
 */
hexo.extend.filter.register(`after_render:html`, (html) => {
  const usedComponents = `<script>window.usedComponents = new Set(${JSON.stringify(
    [...(hexo.locals.get(`usedComponents`) || [])]
  )})</script>`;
  return html.replace(`<script data-component></script>`, usedComponents);
});
