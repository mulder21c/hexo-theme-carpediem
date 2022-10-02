const helper = hexo.extend.helper;

helper.register(`dateFormat`, require(`./date-format`));
helper.register(`fullUrl`, require(`./full-url`));
helper.register(`generateUid`, require(`./generate-uid`));
helper.register(`getIconCategory`, require(`./get-icon-category`));
helper.register(`getJosa`, require(`./kor-josa`));
helper.register(`representativeImage`, require(`./representative-image`));
helper.register(`stripHTML`, require(`./strip-html`));
helper.register(`truncate`, require(`./truncate`));
helper.register(`paginator`, require(`./paginator`));
