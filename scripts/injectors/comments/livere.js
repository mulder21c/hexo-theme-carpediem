const {
  themeConfig: { livere },
} = require("../../constants");

if (livere?.uid) {
  hexo.extend.injector.register(
    `body_end`,
    `
      <script>
      (function(d,s){var j,e = d.getElementsByTagName(s)[0];if(
      typeof LivereTower === 'function'){return}j=d.createElement(s);
      j.src='https://cdn-city.livere.com/js/embed.dist.js';j.async=true;
      e.parentNode.insertBefore(j,e);})(document, 'script');
      </script>
    `,
    `post`
  );
}
