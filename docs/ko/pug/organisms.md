# Pug Documentation

## accordion

아코디언 컴포넌트


### 경로

`components/organisms/accordion/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.headingLevel|아코디언 헤더의 헤딩 수준|string|2|Y|
|props.activatedIndex|초기에 열어둘 패널의 인덱스 번호|number||N|
|props.useSection|각 항목을 섹션으로 분리(아웃라인) 할 것인지 여부|false|N|



### 슬롯

|이름|설명|
|:---:|:---|
|accordionHeadingSlot|아코디언 항목 헤딩 슬롯|
|accordionPanelSlot|아코디언 항목 패널 슬롯|



### 예시

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


### 예시 출력 결과

```html
<div class="amor-accordion" id="ps1jypdo08s" data-init-activate="1">
  <div class="amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="uz41k3ris2s"
      aria-expanded="false"
      aria-controls="khqq92m7a54"
    >
      heading 1
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="https://mulder21c.io/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="amor-accordion__panel"
    id="khqq92m7a54"
    role="region"
    aria-labelledby="uz41k3ris2s"
    hidden="hidden"
  >
    panel 1
  </div>
  <div class="amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="id51to95l2g"
      aria-expanded="true"
      aria-controls="r9dohtjebio"
    >
      heading 2
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="https://mulder21c.io/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="amor-accordion__panel active"
    id="r9dohtjebio"
    role="region"
    aria-labelledby="id51to95l2g"
  >
    panel 2
  </div>
  <div class="amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="d2d7bymq527"
      aria-expanded="false"
      aria-controls="c8zyz6tvf0r"
    >
      heading 3
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        focusable="false"
        role="presentation"
      >
        <use
          xlink:href="https://mulder21c.io/images/solid.svg#chevron-down"
        ></use>
      </svg>
    </button>
  </div>
  <div
    class="amor-accordion__panel"
    id="c8zyz6tvf0r"
    role="region"
    aria-labelledby="d2d7bymq527"
    hidden="hidden"
  >
    panel 3
  </div>
</div>

```


---


## archiveTimeline

아카이브 타임라인 컴포넌트


### 경로

`components/organisms/archives/timeline.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.archives|연 및 월로 매핑된 map 객체|map||Y|
|props.headingLevel|타임라인의 연도별 섹션에서 헤딩 수준|number|2|Y|
|props.displayYearNum|연도별 게시글 목록을 노출할 최신 연도 개수|number|2|N|
|props.currYear|페이지에 노출 된 현재 연도|number||N|



### 예시

```jade
include /components/utils/util
include /components/atoms/heading/index

+archiveTimeline({
  archives: mapArchives(),
  headingLevel: 2,
})
```


### 예시 출력 결과

```html
<div class="amor-timeline">
  <h2 class="amor-heading--lv-2 amor-timeline__year">
    2000&rsquo;
    <span>posts</span>
  </h2>
  <ol class="amor-timeline__list">
    <li class="amor-timeline__list__item">
      <a
        class="amor-timeline__link"
        href="https://www.mulder21c.io/lorem-ipsum/"
      >
        <span class="amor-timeline__title">Lorem Ipsum</span>
      </a>
    </li>
  </ol>
</div>

```


---


## articleContent

아티클 콘텐츠


### 경로

`components/organisms/article-content/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.content|게시글 콘텐츠|object||Y|



### 예시

```jade
include /components/utils/util

+articleContent({ content: post.content, })
```


### 예시 출력 결과

```html
<div class="amor-article-content">
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

게시글 목록


### 경로

`components/organisms/articles-list/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.posts|hexo page.posts @see https://hexo.io/docs/variables.html#Page-Variables|array||Y|



### 예시

```jade
include /components/utils/util
include /components/molecules/article-card/index

+articlesList({
  posts,
})
```


### 예시 출력 결과

```html
<ol class="amor-articles-list">
  <li class="amor-articles-list__item">
    <div class="amor-article-card amor-article-card--link">
      <a
        class="amor-article-card__heading"
        href="https://www.mulder21c.io/lorem-ipsum/"
        aria-describedby="gv9xum90fpp pm8dydv1m7g"
      >
        Lorem Ipsum
      </a>
      <div class="amor-article-card__meta" id="gv9xum90fpp">
        <span class="amor-datetime amor-article-card__meta__item">
          <span class="amor-datetime__label" role="img" aria-label="published">
            📆
          </span>
          <time
            class="amor-datetime__time"
            id="kr6qw6l8p5g"
            datetime="2000-01-01"
          >
            2000. 01. 01
          </time>
        </span>
        <span class="amor-category amor-article-card__meta__item">
          <span class="amor-category__label" role="img" aria-label="category">
            📂
          </span>
          <span class="amor-category__list" role="list">
            <span class="amor-category__content" role="listitem">
              <span>document</span>
            </span>
          </span>
        </span>
      </div>
      <p class="amor-article-card__content" id="pm8dydv1m7g">
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

commento 댓글 컴포넌트


### 경로

`components/organisms/comments/commento.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### 예시

```jade
include /components/utils/util

+commento()
```


### 예시 출력 결과

```html
<div id="commento"></div>

```


---


## disqus

disqus 댓글 컴포넌트


### 경로

`components/organisms/comments/disqus.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### 예시

```jade
include /components/utils/util

+disqus()
```


### 예시 출력 결과

```html
<div id="disqus_thread"></div>

```


---


## giscus

giscus 댓글 컴포넌트


### 경로

`components/organisms/comments/giscus.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### 예시

```jade
include /components/utils/util

+giscus()
```


### 예시 출력 결과

```html
<script id="giscus"></script>

```


---


## comments

댓글 컴포넌트


### 경로

`components/organisms/comments/index.pug`


### 매개변수

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props|사용된 댓글 컴포넌트에 대한 props|object||N|



### 예시

```jade
include /components/utils/util
include /components/organisms/comments/disqus
include /components/organisms/comments/commento
include /components/organisms/comments/remark
include /components/organisms/comments/livere
include /components/organisms/comments/utterance

+comments()
```


### 예시 출력 결과

```html
<div id="disqus_thread"></div>

```


---


## livere

livere 댓글 컴포넌트


### 경로

`components/organisms/comments/livere.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### 예시

```jade
include /components/utils/util

+livere()
```


### 예시 출력 결과

```html
<div id="lv-container" data-id="city"></div>

```


---


## remark

remark42 댓글 컴포넌트


### 경로

`components/organisms/comments/remark.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### 예시

```jade
include /components/utils/util

+remark()
```


### 예시 출력 결과

```html
<div id="remark42"></div>

```


---


## utterance

utterance 댓글 컴포넌트


### 경로

`components/organisms/comments/utterance.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object|`{}`|N|



### 예시

```jade
include /components/utils/util

+utterance()
```


### 예시 출력 결과

```html
<script id="utterance"></script>

```


---


## footerContent

푸터 콘텐츠


### 경로

`components/organisms/footer/index.pug`


### 예시

```jade
include /components/utils/util
include /components/atoms/ccl-license/index
include /components/atoms/watermark/index

+footerContent()
```


### 예시 출력 결과

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
    <span class="amor-license__name">mulder21c</span>
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

hero 컴포넌트


### 경로

`components/organisms/hero/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.imgSrc|hero 이미지 URL|string||Y|



### 예시

```jade
include /components/utils/util

+hero({imgSrc: "hero.jpg"})
```


### 예시 출력 결과

```html
<div
  class="amor-hero"
  role="presentation"
  style="background-image: url(hero.jpg)"
></div>

```


---


## pagination

페이지네이션 컴포넌트


### 경로

`components/organisms/pagination/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|hexo paginator 옵션 @see https://hexo.io/ko/docs/helpers#paginator|object||N|
|props.labelRef|연관 콘텐츠의 id|string||N|



### 예시

```jade
include /components/utils/util

+pagination({
  options: {
    base: `/`,
    format: `/page/%d`,
  }
})
```


### 예시 출력 결과

```html
<nav class="amor-pagination">
  <a
    class="amor-pagination__item amor-pagination__item--current"
    href="/"
    aria-current="page"
  >
    1
  </a>
  <a class="amor-pagination__item" href="//page/2">2</a>
  <a class="amor-pagination__item" href="//page/3">3</a>
  <a class="amor-pagination__next" rel="next" href="//page/2">
    <svg role="img" aria-label="다음 페이지" focusable="false">
      <use xlink:href="/images/solid.svg#angle-right"></use>
    </svg>
  </a>
</nav>

```


---


## slidePanel

슬라이딩 패널 컴포넌트


### 경로

`components/organisms/slide-panel/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.label|패널의 레이블|string||Y|
|props.useCloseBtn|닫기 버튼 사용 여부|boolean|true|N|
|props.closeBtnPosition|닫기 버튼 위치|string|`top-right`|N|
|props.tag|패널을 감싸는 엘리먼트의 HTML tag 이름|string|`section`|N|



### 슬롯

|이름|설명|
|:---:|:---|
|panelBodySlot|패널 내용 슬롯|



### 예시

```jade
include /components/utils/util
include /components/atoms/svg-icon/index
include /components/atoms/buttons/icon

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


### 예시 출력 결과

```html
<div
  class="slide-panel amor-slide-panel amor-slide-panel--btn-top side"
  id="slide-nav"
  aria-label="setting"
  role="region"
  hidden="hidden"
>
  <div class="side__inner">slide panel</div>
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
      <use xlink:href="https://mulder21c.io/images/solid.svg#xmark"></use>
    </svg>
  </button>
</div>

```


---


## titleBar

페이지 상단에 위치한 타이틀 바


### 경로

`components/organisms/title-bar/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.title|타이틀로 사용할 텍스트|string||Y|
|props.useLink|링크 사용 여부|boolean|true|N|



### 슬롯

|이름|설명|
|:---:|:---|
|beforeSlot|타이틀 앞에 배치되는 슬롯|
|afterSlot|타이틀 뒤에 배치되는 슬롯|



### 예시

```jade
include /components/utils/util

// without slot
+titleBar({title: config.title, useLink: true})
```


### 예시 출력 결과

```html
<!-- without slot-->
<div class="amor-title-bar">
  <h1 class="amor-title-bar__title"><a href="/">The Tracks of mulder21c</a></h1>
</div>

```


---
