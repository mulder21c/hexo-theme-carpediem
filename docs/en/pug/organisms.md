# Pug Documentation

## accordion

accordion component


### path

`components/organisms/accordion/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.headingLevel|heading level of header in accordion|string|2|Y|
|props.activatedIndex|The index number of the panel that you want to initially open|number||N|
|props.useSection|Whether to separate each item into sections|boolean|false|N|



### slots

|name|description|
|:---:|:---|
|accordionHeadingSlot|the slot for heading of accordion item|
|accordionPanelSlot|the slot for panel of accordion item|



### examples

```jade
include /components/utils/util
include /components/atoms/heading/index
include /components/atoms/svg-icon/index

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
<div class="crpdm-accordion" id="z8t9k22c3j4" data-init-activate="1">
  <div class="crpdm-accordion__header">
    <button
      class="crpdm-accordion__tab"
      type="button"
      id="mbp30qkplb8"
      aria-expanded="false"
      aria-controls="il74fwgl1q5"
    >
      heading 1
      <svg
        class="crpdm-svg-icon crpdm-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="https://www.mulder21c.io/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="crpdm-accordion__panel"
    id="il74fwgl1q5"
    role="region"
    aria-labelledby="mbp30qkplb8"
    hidden="hidden"
  >
    panel 1
  </div>
  <div class="crpdm-accordion__header">
    <button
      class="crpdm-accordion__tab"
      type="button"
      id="i43d1fc284s"
      aria-expanded="true"
      aria-controls="cdhc3u8m5jg"
    >
      heading 2
      <svg
        class="crpdm-svg-icon crpdm-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="https://www.mulder21c.io/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="crpdm-accordion__panel active"
    id="cdhc3u8m5jg"
    role="region"
    aria-labelledby="i43d1fc284s"
  >
    panel 2
  </div>
  <div class="crpdm-accordion__header">
    <button
      class="crpdm-accordion__tab"
      type="button"
      id="on5l43hcsmi"
      aria-expanded="false"
      aria-controls="n91jwaevcq8"
    >
      heading 3
      <svg
        class="crpdm-svg-icon crpdm-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="https://www.mulder21c.io/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="crpdm-accordion__panel"
    id="n91jwaevcq8"
    role="region"
    aria-labelledby="on5l43hcsmi"
    hidden="hidden"
  >
    panel 3
  </div>
</div>

```


---


## archiveTimeline

archive timeline component


### path

`components/organisms/archives/timeline.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.archives|the map object that is mapped by year and month|map||Y|
|props.headingLevel|the level(rank) of heading in the year section of the timeline|number|2|Y|
|props.displayYearNum|the number of latest years to display the list of posts by year|number|2|N|
|props.currYear|The year currently exposed to page|number||N|



### examples

```jade
include /components/utils/util
include /components/atoms/heading/index

+archiveTimeline({
  archives: archive_map(),
  headingLevel: 2,
})
```


### example output

```html
<div class="crpdm-timeline">
  <h2 class="crpdm-heading--lv-2 crpdm-timeline__year">
    2000&rsquo;
    <span>posts</span>
  </h2>
  <ol class="crpdm-timeline__list">
    <li class="crpdm-timeline__list__item">
      <a
        class="crpdm-timeline__link"
        href="https://www.mulder21c.io/lorem-ipsum/"
      >
        <span class="crpdm-timeline__title">Lorem Ipsum</span>
      </a>
    </li>
  </ol>
</div>

```


---


## articleContent

content for article


### path

`components/organisms/article-content/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.content|content of post|object||Y|



### examples

```jade
include /components/utils/util

+articleContent({ content: post.content, })
```


### example output

```html
<div class="crpdm-article-content">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis
    lacus, pharetra posuere tincidunt eu, vulputate eget ex. Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Quisque accumsan in ligula in
    pulvinar. Nulla dapibus orci a ipsum consectetur, quis convallis velit
    tincidunt. Ut molestie metus lectus, a suscipit tellus eleifend eu.
    Suspendisse dignissim iaculis nisl, pharetra auctor erat pretium id. Mauris
    vel congue ipsum. Phasellus pulvinar neque vel ante interdum, nec commodo
    orci aliquam. Suspendisse nibh purus, convallis id condimentum vel, blandit
    ac enim. Suspendisse euismod tristique malesuada. Duis dolor nisi, elementum
    vel nunc sit amet, tempor porttitor libero. Pellentesque efficitur risus vel
    arcu hendrerit volutpat. Fusce volutpat quam cursus, iaculis nibh vel,
    sodales ligula. Integer efficitur, neque sit amet efficitur pharetra, nisl
    arcu faucibus libero, non blandit urna nulla sit amet quam. In consectetur
    lectus vel pharetra vulputate. Etiam semper nulla suscipit massa blandit
    lobortis.
  </p>
  <p>
    Morbi id orci id magna tempus vehicula sed ac nisl. Donec quis hendrerit
    lorem, id varius erat. Mauris non turpis lectus. Fusce quis augue id risus
    mollis rutrum. Orci varius natoque penatibus et magnis dis parturient
    montes, nascetur ridiculus mus. Nulla tristique consequat nunc, in congue
    dui. Vivamus a finibus metus. Fusce ex magna, scelerisque et est eget,
    consectetur sagittis tortor. In id rutrum nisl. Vestibulum et lobortis
    ipsum. Suspendisse tristique viverra magna et ultrices. Quisque consectetur
    convallis libero, eget euismod ex aliquam quis. Phasellus condimentum enim
    eget mauris egestas, eget malesuada tortor congue.
  </p>
  <p>
    Sed dictum id metus nec efficitur. Curabitur bibendum enim felis, sed
    euismod elit consectetur eget. Suspendisse ut turpis nec mi suscipit
    efficitur. Nulla volutpat ipsum quis turpis viverra suscipit id id metus. In
    varius euismod arcu. Phasellus fringilla odio ac purus tincidunt
    ullamcorper. Donec dolor odio, auctor eu tincidunt in, faucibus eu lacus.
    Curabitur sodales, urna eget pharetra pulvinar, turpis tellus consequat
    mauris, quis dapibus nibh lectus eget lacus. Interdum et malesuada fames ac
    ante ipsum primis in faucibus. Aenean at feugiat tellus. Phasellus pharetra
    tortor quis dolor mollis sodales. Phasellus nisi tortor, tempus sed eros
    vitae, laoreet bibendum justo.
  </p>
  <p>
    Sed consectetur augue vel tempor eleifend. Cras purus nunc, ullamcorper sed
    tristique sit amet, placerat ac justo. Ut vel porta lacus. Nullam porttitor
    dolor at tristique iaculis. Vestibulum vel ornare magna. Mauris nulla enim,
    tincidunt eget consectetur lobortis, cursus in sem. Sed ornare euismod quam,
    a volutpat turpis lobortis in. Sed commodo eros dignissim metus egestas
    commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
    faucibus blandit libero quis iaculis. Nullam placerat sapien consequat
    turpis vulputate blandit at at magna. Ut egestas id sapien eget ultricies.
    Nam tincidunt nunc et risus consectetur, quis posuere dui imperdiet. Aenean
    velit velit, rutrum vitae bibendum nec, tempor vel mauris. Mauris eget sem
    pretium, mattis ante lacinia, fermentum arcu.
  </p>
  <p>
    Vestibulum auctor tristique odio, semper interdum ex condimentum at. In
    ullamcorper risus sed nibh pellentesque pellentesque. Pellentesque sodales
    volutpat elit eget ultrices. Donec est odio, laoreet semper massa id,
    scelerisque egestas nisi. Nam maximus ipsum sapien, sed rhoncus libero
    volutpat id. Cras facilisis accumsan neque, a cursus neque lacinia et.
    Aenean tempus interdum ipsum ut dictum. Proin in lectus nisi. Nam vitae
    magna in risus condimentum dignissim in eu orci. Proin at finibus massa.
  </p>
</div>

```


---


## articlesList

article list


### path

`components/organisms/articles-list/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.posts|hexo page.posts @see https://hexo.io/docs/variables.html#Page-Variables|array||Y|



### examples

```jade
include /components/utils/util
include /components/molecules/article-card/index

+articlesList({
  posts: posts.toArray(),
})
```


### example output

```html
<ol class="crpdm-articles-list">
  <li class="crpdm-articles-list__item">
    <div
      class="crpdm-article-card crpdm-article-card--no-thumb crpdm-article-card--link"
    >
      <a
        class="crpdm-article-card__heading"
        href="https://www.mulder21c.io/lorem-ipsum/"
        aria-describedby="clpr743u7nk t13eqtj2hko"
      >
        Lorem Ipsum
      </a>
      <div class="crpdm-article-card__meta" id="clpr743u7nk">
        <span class="crpdm-datetime crpdm-article-card__meta__item">
          <span class="crpdm-datetime__label" role="img" aria-label="published">
            📆
          </span>
          <time
            class="crpdm-datetime__time"
            id="a758gfbcp04"
            datetime="2000-01-01"
          >
            2000. 01. 01
          </time>
        </span>
        <span class="crpdm-category crpdm-article-card__meta__item">
          <span class="crpdm-category__label" role="img" aria-label="category">
            📂
          </span>
          <span class="crpdm-category__list" role="list">
            <span class="crpdm-category__content" role="listitem">
              <span>document</span>
            </span>
          </span>
        </span>
      </div>
      <p class="crpdm-article-card__content" id="t13eqtj2hko">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis
        lacus, pharetra posuere tincidunt eu, vulputate eget ex. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Quisque accumsan in ligula
        in pulvinar. Nulla dapibus orci a ipsum consectetur, quis convallis
        velit tincidunt.
      </p>
    </div>
  </li>
</ol>

```


---


## commento

commento comments component


### path

`components/organisms/comments/commento.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### examples

```jade
include /components/utils/util

+commento()
```


### example output

```html
<div id="commento"></div>

```


---


## disqus

disqus comments component


### path

`components/organisms/comments/disqus.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### examples

```jade
include /components/utils/util

+disqus()
```


### example output

```html
<div id="disqus_thread"></div>

```


---


## giscus

giscus comments component


### path

`components/organisms/comments/giscus.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### examples

```jade
include /components/utils/util

+giscus()
```


### example output

```html
<script id="giscus"></script>

```


---


## comments

comments component


### path

`components/organisms/comments/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props|the props for used comment component|object||N|



### examples

```jade
include /components/utils/util
include /components/organisms/comments/disqus
include /components/organisms/comments/commento
include /components/organisms/comments/remark
include /components/organisms/comments/livere
include /components/organisms/comments/utterance

+comments()
```


### example output

```html
<div id="disqus_thread"></div>

```


---


## livere

livere comments component


### path

`components/organisms/comments/livere.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### examples

```jade
include /components/utils/util

+livere()
```


### example output

```html
<div id="lv-container" data-id="city"></div>

```


---


## remark

remark comments component


### path

`components/organisms/comments/remark.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### examples

```jade
include /components/utils/util

+remark()
```


### example output

```html
<div id="remark42"></div>

```


---


## utterance

utterance comments component


### path

`components/organisms/comments/utterance.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### examples

```jade
include /components/utils/util

+utterance()
```


### example output

```html
<script id="utterance"></script>

```


---


## footerContent

footer content


### path

`components/organisms/footer/index.pug`


### examples

```jade
include /components/utils/util
include /components/atoms/ccl-license/index
include /components/atoms/watermark/index

+footerContent()
```


### example output

```html
<div class="crpdm-footer">
  <p class="crpdm-license">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-label="creative commons license"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      class="crpdm-license__icon"
    >
      <path
        fill="currentColor"
        d="m11.89 10.34l-1.34.7c-.14-.3-.31-.51-.52-.63c-.21-.12-.41-.18-.58-.18c-.9 0-1.34.59-1.34 1.77c0 .54.11.97.34 1.29c.22.32.55.48 1 .48c.58 0 .99-.27 1.23-.86l1.23.63c-.26.49-.62.87-1.09 1.15c-.46.28-.97.42-1.53.42c-.9 0-1.62-.27-2.17-.82C6.58 13.74 6.3 13 6.3 12c0-.95.28-1.7.83-2.26c.56-.56 1.26-.84 2.1-.84c1.24-.01 2.13.48 2.66 1.44m5.77 0l-1.32.7c-.14-.3-.34-.51-.53-.63c-.21-.12-.41-.18-.6-.18c-.89 0-1.34.59-1.34 1.77c0 .54.13.97.34 1.29c.23.32.56.48 1 .48c.59 0 1-.27 1.24-.86l1.25.63c-.28.49-.65.87-1.11 1.15c-.47.28-.97.42-1.52.42c-.9 0-1.63-.27-2.17-.82c-.54-.55-.81-1.29-.81-2.29c0-.95.28-1.7.83-2.26c.55-.56 1.25-.84 2.08-.84c1.26-.01 2.14.48 2.66 1.44M12 3.5a8.5 8.5 0 0 1 8.5 8.5a8.5 8.5 0 0 1-8.5 8.5A8.5 8.5 0 0 1 3.5 12A8.5 8.5 0 0 1 12 3.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
      ></path>
    </svg>
    <span class="crpdm-license__name">mulder21c</span>
    <span class="crpdm-license__link">
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
  <p class="crpdm-watermark">
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

hero component


### path

`components/organisms/hero/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.imgSrc|the source url for hero image|string||Y|
|props.bgColor|the background color in hex code|string||N|
|props.fullWidth|whether to use full viewport width image|boolean|false|N|
|props.width|the width of hero image|number||N|
|props.height|the height of hero image|number||N|



### examples

```jade
include /components/utils/util

+hero({imgSrc: "hero.jpg"})
```


### example output

```html
<div
  class="crpdm-hero"
  role="presentation"
  style="background-image: url(hero.jpg)"
></div>

```


---


## pagination

pagination component


### path

`components/organisms/pagination/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|paginator's option of hexo @see https://hexo.io/ko/docs/helpers#paginator|object||N|
|props.labelRef|the id of related content|string||N|



### examples

```jade
include /components/utils/util

+pagination({
  options: {
    base: `/`,
    format: `/page/%d`,
  }
})
```


### example output

```html
<nav class="crpdm-pagination">
  <a
    class="crpdm-pagination__item crpdm-pagination__item--current"
    href="/"
    aria-current="page"
  >
    1
  </a>
  <a class="crpdm-pagination__item" href="//page/2">2</a>
  <a class="crpdm-pagination__next" rel="next" href="//page/2">
    <svg role="img" aria-label="next page" focusable="false">
      <use xlink:href="/images/solid.svg#angle-right"></use>
    </svg>
  </a>
</nav>

```


---


## slidePanel

sliding panel component


### path

`components/organisms/slide-panel/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.label|the label of panel|string||Y|
|props.useCloseBtn|whether to use the close button|boolean|true|N|
|props.closeBtnPosition|the position of close button|string|`top-right`|N|
|props.tag|the HTML tag name for the element enclosing the panel|string|`section`|N|



### slots

|name|description|
|:---:|:---|
|panelBodySlot|the slot for body of panel|



### examples

```jade
include /components/utils/util
include /components/atoms/svg-icon/index
include /components/atoms/buttons/icon

+slidePanel({
  label: 'setting',
  useCloseBtn: true,
  closeBtnPosition: `top-right`,
  tag: 'div',
  class: 'side',
  id: 'slide-nav',
})
  +panelBodySlot
    | slide panel
```


### example output

```html
<div
  class="slide-panel crpdm-slide-panel crpdm-slide-panel--btn-top side"
  id="slide-nav"
  aria-label="setting"
  role="region"
  hidden="hidden"
>
  <div class="side__inner">slide panel</div>
  <button
    class="crpdm-btn-icon crpdm-btn-icon--medium crpdm-btn-icon--ghost crpdm-btn-icon--icon-only closer crpdm-slide-panel__btn-close crpdm-slide-panel__btn-close--top crpdm-slide-panel__btn-close--right"
    type="button"
    aria-label="close setting"
  >
    <svg
      class="crpdm-svg-icon crpdm-btn-icon__icon"
      focusable="false"
      aria-hidden="true"
    >
      <use xlink:href="https://www.mulder21c.io/images/solid.svg#xmark"></use>
    </svg>
  </button>
</div>

```


---


## titleBar

a title bar located at the top of the page


### path

`components/organisms/title-bar/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.title|the text to use as a title|string||Y|
|props.useLink|whether to use link|boolean|true|N|



### slots

|name|description|
|:---:|:---|
|beforeSlot|the slot to be placed before title|
|afterSlot|the slot to be placed after title|



### examples

```jade
include /components/utils/util

// without slot
+titleBar({title: config.title, useLink: true})
```


### example output

```html
<!-- without slot-->
<div class="crpdm-title-bar">
  <h1 class="crpdm-title-bar__title"><a href="/">The tracks of mulder21c</a></h1>
</div>

```


---
