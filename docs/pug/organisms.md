# Pug Documentation 

## accordion

create accordion component


### path 

`components/organisms/accordion/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.hLevel|heading level of header in accordion|string||false|
|props.activatedIndex|The index number of the panel that you want to initially open|number||true|



### slots 

|name|description|
|:---:|:---|
|accordionHeadingSlot|the slot for heading of accordion item|
|accordionPanelSlot|the slot for panel of accordion item|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index.pug
include ../../atoms/svg-icon/index.pug

+accordion({hLevel: 2, activatedIndex: 1})
  +accordionHeadingSlot heading 1
  +accordionPanelSlot panel 1
  +accordionHeadingSlot heading 2
  +accordionPanelSlot panel 2
  +accordionHeadingSlot heading 3
  +accordionPanelSlot panel 3
```


### output example 

```html
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`accordion`);
</script>
<div
  class="amor-accordion"
  id="fxf-hdkun4oode6orgadavao"
  data-init-activate="1"
>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="vxf-q8nk3ln42oo5a64be1g"
      aria-expanded="false"
      aria-controls="hxf-qg65vi2kr93u5l5vmqo"
    >
      heading 1
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        role="presentation"
        focusable="false"
      >
        <use xlink:href="/images/solid.svg#chevron-down"></use>
      </svg>
    </button>
  </h2>
  <div
    class="amor-accordion__panel"
    id="hxf-qg65vi2kr93u5l5vmqo"
    role="region"
    aria-labelledby="vxf-q8nk3ln42oo5a64be1g"
    hidden="hidden"
  >
    panel 1
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="Ixg-cagcwg2alfsbfqfiicso"
      aria-expanded="true"
      aria-controls="Cxg-ciqyfzoceh7g81a3ts8"
    >
      heading 2
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        role="presentation"
        focusable="false"
      >
        <use xlink:href="/images/solid.svg#chevron-down"></use>
      </svg>
    </button>
  </h2>
  <div
    class="amor-accordion__panel active"
    id="Cxg-ciqyfzoceh7g81a3ts8"
    role="region"
    aria-labelledby="Ixg-cagcwg2alfsbfqfiicso"
  >
    panel 2
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="Mxg-lvg6oitlgbnqr56pdao"
      aria-expanded="false"
      aria-controls="yxg-m2g4lvqokanm7bn203o"
    >
      heading 3
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        role="presentation"
        focusable="false"
      >
        <use xlink:href="/images/solid.svg#chevron-down"></use>
      </svg>
    </button>
  </h2>
  <div
    class="amor-accordion__panel"
    id="yxg-m2g4lvqokanm7bn203o"
    role="region"
    aria-labelledby="Mxg-lvg6oitlgbnqr56pdao"
    hidden="hidden"
  >
    panel 3
  </div>
</div>

```


---


## archiveTimeline

create archive timeline


### path 

`components/organisms/archives/timeline.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.archives|the collection that is consist of archives|object||false|
|props.headingLevel|the level of year as heading|number|2|false|
|props.isSection|<br> whether this component represent as section|boolean|true|true|
|props.sectionHeadingProp|if specified, it will generate heading for section <br>@see atoms.md#heading|object||true|
|props.displayYearNum|the number of years to be display|number|2|true|



### examples

```jade
include ../../atoms/heading/index
include ../../utils/util

+archiveTimeline({archives: mapArchives(), headingLevel: 2})
```


### output example 

```html
<section class="amor-timeline">
  <h2 class="amor-heading--level-2 amor-timeline__year">
    2022&rsquo;
    <span>i18n(label.posts.default)</span>
  </h2>
  <ol class="amor-timeline__list">
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="http://example.com/post-ghj65kgs92ff33o/"
      >
        <span class="amor-timeline__title">Post ghj65kgs92ff33o</span>
      </a>
    </li>
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="http://example.com/post-ghj6ug8o51oeamg/"
      >
        <span class="amor-timeline__title">Post ghj6ug8o51oeamg</span>
      </a>
    </li>
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="http://example.com/post-ghj7cbp34pdenqo/"
      >
        <span class="amor-timeline__title">Post ghj7cbp34pdenqo</span>
      </a>
    </li>
  </ol>
</section>

```


---


## footerContent

generate footer content


### path 

`components/organisms/footer/index.pug`


### examples

```jade
include ../../utils/util
include ../../atoms/ccl-license/index
include ../../atoms/watermark/index

+footerContent()
```


### output example 

```html
<div class="amor-footer">
  <p class="amor-license">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-label="creative commons license"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      class="amor-license__icon"
    >
      <path
        fill="currentColor"
        d="m11.89 10.34l-1.34.7c-.14-.3-.31-.51-.52-.63c-.21-.12-.41-.18-.58-.18c-.9 0-1.34.59-1.34 1.77c0 .54.11.97.34 1.29c.22.32.55.48 1 .48c.58 0 .99-.27 1.23-.86l1.23.63c-.26.49-.62.87-1.09 1.15c-.46.28-.97.42-1.53.42c-.9 0-1.62-.27-2.17-.82C6.58 13.74 6.3 13 6.3 12c0-.95.28-1.7.83-2.26c.56-.56 1.26-.84 2.1-.84c1.24-.01 2.13.48 2.66 1.44m5.77 0l-1.32.7c-.14-.3-.34-.51-.53-.63c-.21-.12-.41-.18-.6-.18c-.89 0-1.34.59-1.34 1.77c0 .54.13.97.34 1.29c.23.32.56.48 1 .48c.59 0 1-.27 1.24-.86l1.25.63c-.28.49-.65.87-1.11 1.15c-.47.28-.97.42-1.52.42c-.9 0-1.63-.27-2.17-.82c-.54-.55-.81-1.29-.81-2.29c0-.95.28-1.7.83-2.26c.55-.56 1.25-.84 2.08-.84c1.26-.01 2.14.48 2.66 1.44M12 3.5a8.5 8.5 0 0 1 8.5 8.5a8.5 8.5 0 0 1-8.5 8.5A8.5 8.5 0 0 1 3.5 12A8.5 8.5 0 0 1 12 3.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
      ></path>
    </svg>
    <time class="amor-license__year" datetime="2012">2012</time>
    <time class="amor-license__year" datetime="2022">~ 2022</time>
    <span class="amor-license__name">John Doe</span>
    <span class="amor-license__link">
      (
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0"
        rel="external noreferrer"
        target="_blank"
      >
        BY-NC-ND
      </a>
      )
    </span>
  </p>
  <p class="amor-watermark">
    Powered by
    <a href="https://hexo.io/" rel="external noreferrer" target="_blank">
      Hexo.
    </a>
    Theme by
    <a
      href="https://github.com/mulder21c"
      rel="external noreferrer"
      target="_blank"
    >
      mulder21c.
    </a>
  </p>
</div>

```


---


## slidePanel

create a sliding panel


### path 

`components/organisms/slide-panel/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.label|the label of panel|string||false|
|props.useCloseBtn|whether to use the close button|boolean||true|
|props.closeBtnPosition|the position of close button|string||true|
|props.tag|the HTML tag name for the element enclosing the panel|string||true|



### slots 

|name|description|
|:---:|:---|
|panelBodySlot|the slot for body of panel|



### examples

```jade
include ../../utils/util
include ../../atoms/svg-icon/index.pug
include ../../atoms/buttons/icon.pug

+slidePanel({
  label: 'setting',
  useCloseBtn: true,
  closeBtnPosition: `top-right`,
  tag: 'div',
  class: '_side',
  id: 'slide-nav',
})
  +panelBodySlot
    slide panel
```


### output example 

```html
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`slide-panel`);
</script>
<div
  class="slide-panel amor-slide-panel amor-slide-panel--btn-top _side"
  id="slide-nav"
  aria-label="setting"
  role="region"
  hidden="hidden"
>
  <div class="_side__inner"><slide>panel</slide></div>
  <button
    class="amor-btn-icon amor-btn-icon--medium amor-btn-icon--ghost amor-btn-icon--icon-only closer amor-slide-panel__btn-close amor-slide-panel__btn-close--top amor-slide-panel__btn-close--right"
    type="button"
    aria-label="close setting"
  >
    <svg class="amor-btn-icon__icon" role="presentation" focusable="false">
      <use xlink:href="/images/solid.svg#xmark"></use>
    </svg>
  </button>
</div>

```


---


## hero

create hero component


### path 

`components/organisms/hero/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.imgSrc|the source url for hero image|string||true|



### examples

```jade
include ../../utils/util

+hero({imgSrc: "hero.jpg"})
```


### output example 

```html
<div
  class="amor-hero"
  role="presentation"
  style="background-image: url(hero.jpg)"
></div>

```


---


## postsList

create accordion component


### path 

`components/organisms/posts-list/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.posts|hexo page.posts @see https://hexo.io/docs/variables.html#Page-Variables|array||false|
|props.headingProp|prop of heading component @see atoms.md#heading|object||false|
|props.headingTitle|the string as heading label|string||true|
|props.headingSlotContent|the contents as heading slot|string||true|
|props.usePagination|whether to use pagination|boolean|true|true|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index
include ../../molecules/post-card/index
include ../../molecules/pagination/index

+postsList({
  posts: (posts || []),
  headingProp: { level: 1, visible: false },
  headingTitle: `recently articles`,
})
```


### output example 

```html
<section aria-labelledby="a11b-g20kqet2t2e0n4mhoa8">
  <h1
    class="amor-heading--level-1 sr-only amor-posts__heading"
    id="a11b-g20kqet2t2e0n4mhoa8"
  >
    recently articles
  </h1>
  <ol class="amor-posts"></ol>
  <nav class="amor-pagination" aria-labelledby="a11b-g20kqet2t2e0n4mhoa8">
    <a
      class="amor-pagination__item amor-pagination__item--current"
      href="http://example.com/"
      aria-current="page"
      aria-label="i18n(label.page.default)"
    >
      1
    </a>
    <a
      class="amor-pagination__item"
      href="http://example.com//page/2"
      aria-label="i18n(label.page.default)"
    >
      2
    </a>
    <a
      class="amor-pagination__item"
      href="http://example.com//page/3"
      aria-label="i18n(label.page.default)"
    >
      3
    </a>
    <a
      class="amor-pagination__next"
      rel="next"
      href="http://example.com//page/2"
    >
      <svg role="img" aria-label="i18n(label.page.next)">
        <use xlink:href="/images/solid.svg#angle-right"></use>
      </svg>
    </a>
  </nav>
</section>

```


---


## titleBar

create a title bar located at the top of the page


### path 

`components/organisms/title-bar/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.title|the text to use as a title|string||true|



### slots 

|name|description|
|:---:|:---|
|beforeSlot|the slot to be placed before title|
|afterSlot|the slot to be placed after title|



### examples

```jade
include ../../utils/util

// without slot
+titleBar({title: config.title, useLink: true})
```


### output example 

```html
<!-- without slot-->
<div class="amor-title-bar">
  <h1 class="amor-title-bar__title"><a href="/">Hexo</a></h1>
</div>

```


---


