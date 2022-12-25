const renderer = hexo.extend.renderer;

renderer.register(`scss`, `css`, require(`./scss-renderer`));
