# Pug Documentation 

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
<div class="amor-accordion" id="5v6582utsguc36o" data-init-activate="1">
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="5v65e49p2rpg0fo"
      aria-expanded="false"
      aria-controls="5v66mr4p23mfhn8"
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
    id="5v66mr4p23mfhn8"
    role="region"
    aria-labelledby="5v65e49p2rpg0fo"
    hidden="hidden"
  >
    panel 1
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="5v66kd0rti9nnb8"
      aria-expanded="true"
      aria-controls="5v66pda07fdo9kg"
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
    id="5v66pda07fdo9kg"
    role="region"
    aria-labelledby="5v66kd0rti9nnb8"
  >
    panel 2
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="5v66j4nq3ojka58"
      aria-expanded="false"
      aria-controls="5v66f81m0k7hqog"
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
    id="5v66f81m0k7hqog"
    role="region"
    aria-labelledby="5v66j4nq3ojka58"
    hidden="hidden"
  >
    panel 3
  </div>
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
|default|you can append content before title text|



### examples

```jade
include ../../utils/util

+titleBar({title: "Hexo Blog"})
```


### output example 

```html
<div class="amor-title-bar" id="5v6ddm4p27aa89">
  <span class="amor-title-bar__title">Hexo Blog</span>
</div>

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
<section aria-labelledby="5v7f9e8fc2d09mg">
  <h1
    class="amor-heading--level-1 sr-only amor-posts__heading"
    id="5v7f9e8fc2d09mg"
  >
    i18n(label.posts.recently)
  </h1>
  <ol class="amor-posts"></ol>
  <nav
    class="amor-pagination"
    id="5v7fqairetvo4t8"
    aria-labelledby="5v7f9e8fc2d09mg"
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


