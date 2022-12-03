function loadDisqus(shortname) {
  const scriptEl = document.createElement(`script`);
  scriptEl.src = `https://${shortname}.disqus.com/embed.js`;
  scriptEl.setAttribute(`data-timestamp`, +new Date());
  (document.head || document.body).appendChild(scriptEl);
}

function lazyLoadDisqus(shortname) {
  if (
    !(
      `IntersectionObserver` in window &&
      `IntersectionObserverEntry` in window &&
      `isIntersecting` in window.IntersectionObserverEntry.prototype
    )
  ) {
    loadDisqus();
  } else {
    const observer = new IntersectionObserver(function (entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          loadDisqus(shortname);
          observer.unobserve(entry.target);
        }
      }
    });
    observer.observe(document.getElementById(`disqus_thread`));
  }
}

window.addEventListener(`DOMContentLoaded`, function () {
  const shortname = document
    .getElementById(`disqus_thread`)
    .getAttribute(`data-shortname`);
  lazyLoadDisqus(shortname);
});
