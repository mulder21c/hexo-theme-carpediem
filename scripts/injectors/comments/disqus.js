const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../../");
const { minify } = require("terser");
const { disqus } = (() => {
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

if (disqus?.shortname) {
  minify(`
    function loadDisqus() {
      const scriptEl = document.createElement('script');
      scriptEl.src="https://${disqus.shortname}.disqus.com/embed.js";
      scriptEl.setAttribute("data-timestamp",+new Date());
      (document.head || document.body).appendChild(scriptEl);
    }
    function lazyLoadDisqus() {
      if (
        !('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'isIntersecting' in window.IntersectionObserverEntry.prototype)
      ) {
        loadDisqus();
      } else {
        const observer = new IntersectionObserver(function(entries) {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              loadDisqus();
              observer.unobserve(entry.target);
            }
          }
        });
        observer.observe(document.getElementById('disqus_thread'));
      }
    }
    window.addEventListener('DOMContentLoaded', function() {
      lazyLoadDisqus();
    });
  `).then(({ code }) => {
    hexo.extend.injector.register(
      `body_end`,
      `<script>${code}</script>`,
      `post`
    );
  });
}
