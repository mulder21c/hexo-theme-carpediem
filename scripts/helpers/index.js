const helper = hexo.extend.helper;

helper.register(`asset_url`, require(`./asset-url`)(hexo));
helper.register(`compile_sass`, require(`./compile-sass`));
helper.register(`full_url`, require(`./full-url`));
helper.register(`generate_uid`, require(`./generate-uid`));
helper.register(`archive_array`, require(`./get-archive-array`));
helper.register(`archive_map`, require(`./get-archive-map`));
helper.register(`icon_info`, require(`./get-icon-info`));
helper.register(`kor_josa`, require(`./kor-josa`));
helper.register(`list_categories`, require(`./list-categories`));
helper.register(`list_links`, require(`./list-links`));
helper.register(`list_menus`, require(`./list-menus`));
helper.register(`open_graph`, require(`./open-graph`)(hexo));
helper.register(`paginator`, require(`./paginator`));
helper.register(
  `representative_image`,
  require(`./representative-image`)(hexo)
);
helper.register(`strip_html`, require(`./strip-html`));
helper.register(`truncate`, require(`./truncate`));
