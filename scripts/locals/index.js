const locals = hexo.locals;

locals.set("vanillaPropTypes", require(`./proptypes`));
locals.set("propTypesPreset", require(`./proptypes-preset`));
locals.set("components", require(`./used-components`));
locals.set("mode", hexo.env.cmd === "generate" ? "production" : "development");
