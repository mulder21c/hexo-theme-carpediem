const tag = hexo.extend.tag;

tag.register(`figure`, require(`./figure.js`)(hexo), { ends: true });
tag.register(`figcaption`, require(`./figcaption.js`)(hexo));
