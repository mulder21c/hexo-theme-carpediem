const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../../");
const { remark } = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(path.resolve(rootPath, `./_config.yml`), `utf8`)
    );
  } catch (err) {
    console.error(
      `\x1b[33m%s\x1b[0m`,
      `[bundle-js] ⚠ Cannot find _config.yml for theme!`
    );
    return {};
  }
})();

const config = remark;

if (remark?.host) {
  hexo.extend.injector.register(
    `body_end`,
    `
      <script>
      var remark_config = ${JSON.stringify(config)};
      remark_config.theme = window.getThemeColor();
      !function(e,n){
      for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",
      d=n.head||n.body;"noModule" in r?(r.type="module",c=".mjs"):r.async=!0,
      r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}
      }(remark_config.components || ["embed"], document);
      </script>
    `,
    `post`
  );
}
