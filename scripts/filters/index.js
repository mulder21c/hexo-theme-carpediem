const filter = hexo.extend.filter;

filter.register(`after_post_render`, require(`./external_link`));
filter.register(`after_render:html`, require(`./used-components`));
filter.register(`after_post_render`, require(`./hero-origin`), 20);
filter.register(`markdown-it:renderer`, require(`./markdown-it-footnote`));
filter.register(`markdown-it:renderer`, require(`./markdown-it-semantic`));
