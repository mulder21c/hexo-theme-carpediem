const tag = hexo.extend.tag;

tag.register(`figure`, require(`./figure.js`)(hexo), { ends: true });
tag.register(`figcaption`, require(`./figcaption.js`)(hexo));
tag.register(`disclosure`, require(`./disclosure.js`)(hexo), { ends: true });
tag.register(`youtube`, require(`./youtube.js`)(hexo));
tag.register(`vimeo`, require(`./vimeo.js`)(hexo));
