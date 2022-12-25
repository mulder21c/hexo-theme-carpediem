const filter = hexo.extend.filter;

filter.register(`after_init`, require(`./hero-info-remover`));
filter.register(`before_generate`, require(`./bundle-component`));
filter.register(`before_generate`, require(`./hero-info-generator`));
