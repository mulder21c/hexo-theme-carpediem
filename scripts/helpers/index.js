const helper = hexo.extend.helper;

helper.register(`fullUrl`, require(`./full-url`));
helper.register(`generateUid`, require(`./generate-uid`));
helper.register(`getIconCategory`, require(`./get-icon-category`));
helper.register(`getJosa`, require(`./kor-josa`));
helper.register(`representativeImage`, require(`./representative-image`));
helper.register(`stripHTML`, require(`./strip-html`));
helper.register(`truncate`, require(`./truncate`));
helper.register(`paginator`, require(`./paginator`));
helper.register(`listCategories`, require(`./list-categories`));
helper.register(`listMenus`, require(`./list-menus`));
helper.register(`listLinks`, require(`./list-links`));
helper.register(`mapArchives`, require(`./map-archives`));
helper.register(`compileSass`, require(`./compile-sass`));
helper.register(`getArchivePosts`, require(`./get-archive-posts`));
helper.register(`open_graph`, require(`./open-graph`));
