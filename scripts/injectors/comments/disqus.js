const { minify } = require("terser");
const {
  themeConfig: { disqus },
} = require("../../constants");

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
