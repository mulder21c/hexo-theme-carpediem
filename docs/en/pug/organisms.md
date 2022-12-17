# Pug Documentation 

## accordion

create accordion component aria pattern


### path 

`components/organisms/accordion/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.headingLevel|heading level of header in accordion|string|2|false|
|props.activatedIndex|The index number of the panel that you want to initially open|number||true|
|props.useSection|Whether to separate each item into sections|boolean|false|true|



### slots 

|name|description|
|:---:|:---|
|accordionHeadingSlot|the slot for heading of accordion item|
|accordionPanelSlot|the slot for panel of accordion item|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index
include ../../atoms/svg-icon/index

+accordion({headingLevel: 2, activatedIndex: 1})
  +accordionHeadingSlot heading 1
  +accordionPanelSlot panel 1
  +accordionHeadingSlot heading 2
  +accordionPanelSlot panel 2
  +accordionHeadingSlot heading 3
  +accordionPanelSlot panel 3
```


### example output 

```html
<div class="amor-accordion" id="f3d1ejchjfm" data-init-activate="1">
  <div class="amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="j1ua2hl9c3g"
      aria-expanded="false"
      aria-controls="d3il1uakm6o"
    >
      heading 1
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="http://example.com/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="amor-accordion__panel"
    id="d3il1uakm6o"
    role="region"
    aria-labelledby="j1ua2hl9c3g"
    hidden="hidden"
  >
    panel 1
  </div>
  <div class="amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="q5pejg5dpa8"
      aria-expanded="true"
      aria-controls="jg4n4c0eshm"
    >
      heading 2
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="http://example.com/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="amor-accordion__panel active"
    id="jg4n4c0eshm"
    role="region"
    aria-labelledby="q5pejg5dpa8"
  >
    panel 2
  </div>
  <div class="amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="g6qo1x2107o"
      aria-expanded="false"
      aria-controls="lhe9g886loc"
    >
      heading 3
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="http://example.com/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="amor-accordion__panel"
    id="lhe9g886loc"
    role="region"
    aria-labelledby="g6qo1x2107o"
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
|props.displayYearNum|the number of years to be display|number|2|true|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index

+archiveTimeline({archives: mapArchives(), headingLevel: 2})
```


### example output 

```html
<div class="amor-timeline">
  <h2 class="amor-heading--lv-2 amor-timeline__year">
    2022&rsquo;
    <span>i18n(label.posts.default)</span>
  </h2>
  <ol class="amor-timeline__list">
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="http://example.com/post-m1845da0eb5t53o/"
      >
        <span class="amor-timeline__title">Post m1845da0eb5t53o</span>
      </a>
    </li>
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="http://example.com/post-m184cf3u7eh8sug/"
      >
        <span class="amor-timeline__title">Post m184cf3u7eh8sug</span>
      </a>
    </li>
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="http://example.com/post-m184er75vp8813g/"
      >
        <span class="amor-timeline__title">Post m184er75vp8813g</span>
      </a>
    </li>
  </ol>
</div>

```


---


## articleContent

create content for article


### path 

`components/organisms/article-content/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.content|content of post|object||false|



### examples

```jade
include ../../utils/util

+articleContent({ categories: post.content, })
```


### example output 

```html
<div
  class="amor-article-content"
  categories="<p>Ut anim ea minim aliqua anim elit consectetur laborum elit et. Quis in culpa exercitation consequat do duis dolor id proident. Est sit sit qui consequat irure dolor enim deserunt officia cupidatat do amet. Adipisicing do proident Lorem nostrud consectetur reprehenderit magna ut. Minim deserunt pariatur ad sint quis tempor.</p>
<p>Ex amet voluptate nulla nisi ipsum reprehenderit sunt ad ullamco nisi ea laboris. Aliquip exercitation proident incididunt cillum excepteur commodo nostrud non nostrud sint irure. Excepteur magna velit Lorem cupidatat nulla reprehenderit anim. Enim amet non voluptate duis nostrud exercitation veniam cillum laboris Lorem ullamco excepteur et.</p>"
></div>

```


---


## articlesList

create accordion component


### path 

`components/organisms/articles-list/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.posts|hexo page.posts @see https://hexo.io/docs/variables.html#Page-Variables|array||false|



### examples

```jade
include ../../utils/util
include ../../molecules/article-card/index

+articlesList({
  posts: (posts || []),
})
```


### example output 

```html
<ol class="amor-articles-list"></ol>

```


---


## commento

create commento comments


### path 

`components/organisms/comments/commento.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



### examples

```jade
include ../../utils/util

+commento()
```


### example output 

```html
<div id="commento"></div>

```


---


## disqus

create disqus comments


### path 

`components/organisms/comments/disqus.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



### examples

```jade
include ../../utils/util

+disqus()
```


### example output 

```html
<div id="disqus_thread"></div>

```


---


## giscus

create giscus comments


### path 

`components/organisms/comments/giscus.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



### examples

```jade
include ../../utils/util

+giscus()
```


### example output 

```html
<script id="giscus"></script>

```


---


## livere

create livere comments


### path 

`components/organisms/comments/livere.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



### examples

```jade
include ../../utils/util

+livere()
```


### example output 

```html
<div id="lv-container" data-id="city"></div>

```


---


## remark

create remark comments


### path 

`components/organisms/comments/remark.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



### examples

```jade
include ../../utils/util

+remark()
```


### example output 

```html
<div id="remark42"></div>

```


---


## utterance

create utterance comments


### path 

`components/organisms/comments/utterance.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



### examples

```jade
include ../../utils/util

+utterance()
```


### example output 

```html
<script id="utterance"></script>

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


### example output 

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
    <span class="amor-license__name">John Doe</span>
    <span class="amor-license__link">
      (
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0"
        rel="external noreferrer noopener nofollow"
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


## hero

create hero component


### path 

`components/organisms/hero/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.imgSrc|the source url for hero image|string||false|



### examples

```jade
include ../../utils/util

+hero({imgSrc: "hero.jpg"})
```


### example output 

```html
<div
  class="amor-hero"
  role="presentation"
  style="background-image: url(hero.jpg)"
></div>

```


---


## pagination

create pagination component


### path 

`components/organisms/pagination/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|paginator's option of hexo @see https://hexo.io/ko/docs/helpers#paginator|object||true|
|props.labelRef|the id of related content|string||true|



### examples

```jade
include ../../utils/util

+pagination({
  options: {
    base: `/`,
    format: `/page/%d`,
  }
})
```


### example output 

```html
<nav class="amor-pagination">
  <a
    class="amor-pagination__item amor-pagination__item--current"
    href="undefined/"
    aria-current="page"
    aria-label="i18n(label.pagination.default)"
  >
    1
  </a>
  <a
    class="amor-pagination__item"
    href="//page/2"
    aria-label="i18n(label.pagination.default)"
  >
    2
  </a>
  <a
    class="amor-pagination__item"
    href="//page/3"
    aria-label="i18n(label.pagination.default)"
  >
    3
  </a>
  <a class="amor-pagination__next" rel="next" href="//page/2">
    <svg role="img" aria-label="i18n(label.pagination.next)" focusable="false">
      <use xlink:href="/images/solid.svg#angle-right"></use>
    </svg>
  </a>
</nav>

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
|props.useCloseBtn|whether to use the close button|boolean|true|true|
|props.closeBtnPosition|the position of close button|string|`top-right`|true|
|props.tag|the HTML tag name for the element enclosing the panel|string|`section`|true|



### slots 

|name|description|
|:---:|:---|
|panelBodySlot|the slot for body of panel|



### examples

```jade
include ../../utils/util
include ../../atoms/svg-icon/index
include ../../atoms/buttons/icon

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


### example output 

```html
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
    <svg
      class="amor-svg-icon amor-btn-icon__icon"
      focusable="false"
      aria-hidden="true"
    >
      <use xlink:href="http://example.com/images/solid.svg#xmark"></use>
    </svg>
  </button>
</div>

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
|props.useLink|whether to use link|boolean|true|true|



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


### example output 

```html
<!-- without slot-->
<div class="amor-title-bar">
  <h1 class="amor-title-bar__title"><a href="/">Hexo</a></h1>
</div>

```


---

