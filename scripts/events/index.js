const filter = hexo.extend.filter;

filter.register(`after_init`, require(`./hero-info-remover`));
filter.register(`before_generate`, require(`./bundle-component`));
filter.register(`before_generate`, require(`./bundle-vendor`));
filter.register(`before_generate`, require(`./hero-info-generator`));

hexo.theme.addProcessor(`components`, function (file) {
  if (file.path.endsWith(`.js`) && file.type === `update`) {
    hexo.log.info(`Component's JavaScript is Updated. It started re-bundling`);
    require(`./bundle-component`).bind(hexo)();
  }
});
