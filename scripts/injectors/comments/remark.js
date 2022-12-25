const {
  themeConfig: { remark },
} = require("../../constants");

if (remark?.host) {
  hexo.extend.injector.register(
    `body_end`,
    `
      <script>
      var remark_config = ${JSON.stringify(remark)};
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
