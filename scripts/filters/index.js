const filter = hexo.extend.filter;

filter.register(`after_init`, require(`./truncate-image-db`), 0);
filter.register(`after_render:html`, require(`./used-components`));
filter.register(`before_generate`, require(`./generate-image-db`));
