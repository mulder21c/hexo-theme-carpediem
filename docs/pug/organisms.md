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
<div class="amor-accordion" id="rsh-ua33w3968vfn3ibipr" data-init-activate="1">
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="dsi-0egg46v3vkeekqh27to"
      aria-expanded="false"
      aria-controls="Gsi-0imru78cg2sgqr5i52qg"
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
    id="Gsi-0imru78cg2sgqr5i52qg"
    role="region"
    aria-labelledby="dsi-0egg46v3vkeekqh27to"
    hidden="hidden"
  >
    panel 1
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="tsi-ibjdme8f9bs8uunpq5o"
      aria-expanded="true"
      aria-controls="Psi-ihfxyb2aokbev0pdbr"
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
    id="Psi-ihfxyb2aokbev0pdbr"
    role="region"
    aria-labelledby="tsi-ibjdme8f9bs8uunpq5o"
  >
    panel 2
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="esi-tskgisw8nab0nk0dqf4g"
      aria-expanded="false"
      aria-controls="ksi-txu0stfq21gufobbsq8"
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
    id="ksi-txu0stfq21gufobbsq8"
    role="region"
    aria-labelledby="esi-tskgisw8nab0nk0dqf4g"
    hidden="hidden"
  >
    panel 3
  </div>
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
|props.headingTitle|the string as heading label|string||false|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index
include ../../molecules/post-card/index
include ../../molecules/pagination/index

+postsList({
  posts: (posts || []),
  headingProp: { level: 1, visible: false },
  headingTitle: `최근 게시글`,
})
```


### output example 

```html
<section aria-labelledby="ctr-m2m6ygk4r8h59gmkkjo">
  <h1
    class="amor-heading--level-1 sr-only amor-posts__heading"
    id="ctr-m2m6ygk4r8h59gmkkjo"
  >
    i18n(label.posts.recently)
  </h1>
  <ol class="amor-posts"></ol>
  <nav
    class="amor-pagination"
    id="Rts-832a8n5v57rb6ioj3d"
    aria-labelledby="ctr-m2m6ygk4r8h59gmkkjo"
  >
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
      href="http://example.com/page/2"
      aria-label="i18n(label.page.default)"
    >
      2
    </a>
    <a
      class="amor-pagination__item"
      href="http://example.com/page/3"
      aria-label="i18n(label.page.default)"
    >
      3
    </a>
    <a
      class="amor-pagination__next"
      rel="next"
      href="http://example.com/page/2"
    >
      <svg role="img" aria-label="i18n(label.page.next)">
        <use xlink:href="/images/solid.svg#angle-right"></use>
      </svg>
    </a>
  </nav>
</section>

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
  <slide>panel</slide>
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
<div class="amor-title-bar" id="Xuh-gtcyybuym5qp7ln14so">
  <h1 class="amor-title-bar__title"><a href="/">Hexo</a></h1>
</div>

```


---


