# Pug 문서

## articleCard

게시글 카드 컴포넌트


### 경로

`components/molecules/article-card/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.post|hexo post object @see https://hexo.io/docs/variables.html#Page-Variables|object||Y|
|props.isLink|Whether to operate the card as a link|boolean|false|N|



### 예시

```jade
include /components/utils/util
include /components/atoms/datetime/index
include /components/atoms/category/index

+articleCard({post, isLink: true})
```


### 예시 출력 결과

```html
<div class="amor-article-card amor-article-card--link">
  <img
    class="amor-article-card__thumb"
    src="https://via.placeholder.com/320x180.png?text=28v6qr7l7nke6g8"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-article-card__heading"
    href="http://example.com/post-28v6qr7l7nke6g8/"
    aria-describedby="zxt6iehjri6 q0x75qsop4o"
  >
    Post 28v6qr7l7nke6g8
  </a>
  <div class="amor-article-card__meta" id="zxt6iehjri6">
    <span class="amor-datetime amor-article-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="qfv1wcuivdk" datetime="2023-01-14">
        2023. 01. 14
      </time>
    </span>
  </div>
  <p class="amor-article-card__content" id="q0x75qsop4o">
    Pariatur tempor culpa deserunt qui deserunt amet mollit voluptate eu nostrud
    eu magna et veniam. Proident cillum eu ullamco enim minim incididunt do
    dolore ut veniam. Occaecat tempor eu eiusmod est in. Minim enim non enim
    laborum duis amet. Nulla reprehenderit eu nostrud veniam veniam magna aute.
  </p>
</div>

```


---


## articleMeta

create meta info component for article


### 경로

`components/molecules/article-meta/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.categories|sequence of category|object||Y|
|props.date|date of article|object||Y|
|props.updated|updated date of article|object||Y|



### 예시

```jade
include /components/utils/util
include ../../atoms/category/index
include ../../atoms/datetime/index

+articleMeta({
  categories: post.categories.data || post.categories || [],
  date: post.date,
  updated: post.updated,
})
```


### 예시 출력 결과

```html
<div class="amor-article-meta">
  <span class="amor-category amor-article-meta__categories">
    <span
      class="amor-category__label"
      role="img"
      aria-label="i18n(label.category)"
    >
      📂
    </span>
    <span class="amor-category__list" role="list">
      <span class="amor-category__content" role="listitem">
        <a href="https://www.mulder21c.io/categories/cate-28v6ivst9dum3vo">
          cate-28v6ivst9dum3vo
        </a>
      </span>
      <span class="amor-category__separator" aria-hidden="true">
        <svg class="amor-svg-icon" focusable="false">
          <use
            xlink:href="https://www.mulder21c.io/images/solid.svg#angle-right"
          ></use>
        </svg>
      </span>
      <span class="amor-category__content" role="listitem">
        <a href="https://www.mulder21c.io/categories/cate-28v6i9ocbk09ufg">
          cate-28v6i9ocbk09ufg
        </a>
      </span>
    </span>
  </span>
  <span class="amor-datetime amor-article-meta__date">
    <span
      class="amor-datetime__label"
      role="img"
      aria-label="i18n(label.date.published)"
    >
      📆
    </span>
    <time class="amor-datetime__time" id="nwwrxfuabfo" datetime="2023-01-14">
      2023. 01. 14
    </time>
  </span>
</div>

```


---


## articleAuthor

area for introducing author


### 경로

`components/molecules/author/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.gravatar|the path or url for gravatar|string|`/images/author.svg`|N|
|props.name|the name of author|string||N|
|props.description|the description for author|string||N|
|props.social|the social links for author|string||N|



### 예시

```jade
include /components/utils/util
include ../../atoms/svg-icon/index

+articleAuthor({
  name: config.author,
  gravatar: theme.profile.gravatar,
  description: theme.profile.description,
  social: theme.profile.social,
})
```


### 예시 출력 결과

```html
<div class="amor-author amor-author--no-desc">
  <span class="amor-author__gravatar">
    <img src="https://www.mulder21c.io/images/author.svg" alt="" role="none" />
  </span>
  <p class="amor-author__name">mulder21c</p>
  <div class="amor-author__social">
    <a class="amor-author__social__link" href="/rss.xml" aria-label="rss">
      <svg
        class="amor-svg-icon amor-author__social__icon amor-author__social__icon--rss"
        focusable="false"
        role="presentation"
      >
        <use xlink:href="https://www.mulder21c.io/images/solid.svg#rss"></use>
      </svg>
    </a>
  </div>
</div>

```


---


## fieldset

create group containing label and body


### 경로

`components/molecules/fieldset/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.direction|how items are placed in the container <br>One of `'row'`, `'column'`|string|'row'|N|
|props.alignItem|alignment of items on the cross axis <br>One of `'start'`, `'center'`|string|'start'|N|
|props.labelWidthRatio|the factor of label's width in the container|integer|3|N|
|props.labelSlotClassName|the class name of label slot's container|string \| Array\<string>||N|
|props.bodySlotClassName|the class name of body slot's container|string \| Array\<string>||N|
|props.labelSlotAttrs|the attributes of label slot's container|object||N|
|props.bodySlotAttrs|the attributes of body slot's container|object||N|



### slots

|name|description|
|:---:|:---|
|fieldsetLabelSlot|the slot for legend of fieldset|
|fieldsetBodySlot|the slot for body of fieldset|



### 예시

```jade
include /components/utils/util

// row
+fieldset({direction: `row`})
  +fieldsetLabelSlot fieldset title
  +fieldsetBodySlot
    p fieldset body

// column
+fieldset({direction: `column`})
  +fieldsetLabelSlot fieldset title
  +fieldsetBodySlot
    p fieldset body
```


### 예시 출력 결과

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="sd4otrp93ds"
>
  <div class="amor-field__label amor-field__label--30" id="sd4otrp93ds">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="s20lwjq8tso"
>
  <div class="amor-field__label amor-field__label--30" id="s20lwjq8tso">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>

```


---


## categoryNavigation

create hexo category list


### 경로

`components/molecules/navigation/category/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|@see https://hexo.io/ko/docs/helpers#list-categories|object||N|



### 예시

```jade
include ../../../utils/util

+categoryNavigation()
```


### 예시 출력 결과

```html
<nav class="amor-category-nav" aria-label="categories">
  <ul class="amor-category-nav__list">
    <li class="amor-category-nav__list__item">
      <a
        href="https://www.mulder21c.io/categories/cate-28v8rcetf67s76"
        class="amor-category-nav__list__link"
      >
        cate-28v8rcetf67s76
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="https://www.mulder21c.io/categories/cate-28v8usb2rqhs99"
        class="amor-category-nav__list__link"
      >
        cate-28v8usb2rqhs99
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="https://www.mulder21c.io/categories/cate-28v8f4hg5aihrn"
        class="amor-category-nav__list__link"
      >
        cate-28v8f4hg5aihrn
      </a>
    </li>
  </ul>
</nav>

```


---


## linksNavigation

create hexo external link list


### 경로

`components/molecules/navigation/links/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|the options for external link list|object||N|
|props.options.transform|<br> the function that changes the display of link name|function||N|



### 예시

```jade
include ../../../utils/util

+linksNavigation()
```


### 예시 출력 결과

```html
<nav class="amor-links-nav" aria-label="links"></nav>

```


---


## menuNavigation

create hexo menu list


### 경로

`components/molecules/navigation/menu/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|the options for menu list|object||N|
|props.options.transform|<br> the function that changes the display of menu name|function||N|



### 예시

```jade
include ../../../utils/util

+menuNavigation()
```


### 예시 출력 결과

```html
<nav class="amor-menu-nav" aria-label="menu">
  <ul class="amor-menu-nav__list">
    <li class="amor-menu-nav__list__item">
      <a
        href="https://www.mulder21c.io/archives"
        class="amor-menu-nav__list__link"
      >
        Archives
      </a>
    </li>
  </ul>
</nav>

```


---


## radioBoxes

create radio group component


### 경로

`components/molecules/radio-group/boxy.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|attribute of radio|string||Y|
|props.options|the array that consists of options for radio component|array||Y|



### slots

|name|description|
|:---:|:---|
|radioBoxesLabelSlot|the slot for label.|



### 예시

```jade
include /components/utils/util
include ../../atoms/radios/boxy

// basic
+radioBoxes({
  name: `size`,
  options: [
    { label: `small`, value: `small`, },
    { label: `medium`, value: `medium`, },
    { label: `large`, value: `large`, },
  ],
})

// label with slot
+radioBoxes({
  name: `size2`,
  options: [
    { value: `small`, },
    { value: `medium`, },
    { value: `large`, },
  ]
})
  +radioBoxesLabelSlot small 1
  +radioBoxesLabelSlot medium 2
  +radioBoxesLabelSlot large 3
```


### 예시 출력 결과

```html
<!-- basic-->
<div class="amor-radio-boxes">
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="rd2rpcmr0r8"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="rtq1kx30hvs"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="kqyg3qggtv4"
      name="size"
      value="large"
    />
    <span class="amor-radio-boxy__box">large</span>
  </label>
</div>
<!-- label with slot-->
<div class="amor-radio-boxes">
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="ime5pl39fqs"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="hd27mju53a8"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="b6g606ehlng"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
</div>

```


---


## radioGroup

create radio group component


### 경로

`components/molecules/radio-group/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|attribute of radio|string||Y|
|props.options|the array that consists of options for radio component without name and labelPosition|array||Y|
|props.columns|column counts|number||N|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|`right`|N|



### slots

|name|description|
|:---:|:---|
|radioGroupLabelSlot|the slot for label.|



### 예시

```jade
include /components/utils/util
include ../../atoms/radios/default

// basic
+radioGroup({
  name: `job`,
  labelPosition: `right`,
  options: [
    { label: `designer`, value: `designer`, },
    { label: `publisher`, value: `publisher`, },
    { label: `frontend developer`, value: `frontend`, },
    { label: `devops`, value: `devops`, },
    { label: `iOS developer`, value: `ios`, },
  ],
})
// label with slot
+radioGroup({
  name: `job2`,
  labelPosition: `right`,
  columns: 3,
  options: [
    { value: `designer`, },
    { value: `publisher`, },
    { value: `frontend`, }
  ],
})
  +radioGroupLabelSlot 웹 디자이너
  +radioGroupLabelSlot 웹 퍼블리셔
  +radioGroupLabelSlot 프론트엔드 개발자
```


### 예시 출력 결과

```html
<!-- basic-->
<div class="amor-radio-group">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tv9yr25i0mb"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="tv9yr25i0mb">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="e9ngti6epp8"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="e9ngti6epp8">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ppg8uihj0s8"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="ppg8uihj0s8">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="m5au4ykjm0g"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="m5au4ykjm0g">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="pnufge2laa8"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="pnufge2laa8">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="nbouwso3194"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="nbouwso3194">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="zvzx4lairl8"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="zvzx4lairl8">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="w7y55htuiar"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="w7y55htuiar">프론트엔드 개발자</label>
  </span>
</div>

```


---


## radioSlider

create radio group component


### 경로

`components/molecules/radio-group/slider.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|attribute of radio|string||Y|
|props.options|the array that consists of options for radio component|array||Y|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'bottom'`|string|`bottom`|N|



### slots

|name|description|
|:---:|:---|
|radioSliderLabelSlot|the slot for label.|



### 예시

```jade
include /components/utils/util
include ../../atoms/radios/default

// basic
+radioSlider({
  name: `size`,
  labelPosition: `bottom`,
  options: [
    { label: `small`, value: `small`, },
    { label: `medium`, value: `medium`, },
    { label: `large`, value: `large`, },
  ],
})

// label with slot
+radioSlider({
  name: `size2`,
  labelPosition: `bottom`,
  options: [
    { value: `small`, },
    { value: `medium`, },
    { value: `large`, },
  ],
})
  +radioSliderLabelSlot small
  +radioSliderLabelSlot medium
  +radioSliderLabelSlot large
```


### 예시 출력 결과

```html
<!-- basic-->
<div class="amor-radio-slider">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="khd8rj9m5g6"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="khd8rj9m5g6"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="qsgf91aak6g"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="qsgf91aak6g"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ics9nl5h6po"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="ics9nl5h6po"
    >
      large
    </label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-slider">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="kf35hy437c8"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="kf35hy437c8"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="a8mzhsm2um8"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="a8mzhsm2um8"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="vhibszuo748"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="vhibszuo748"
    >
      large
    </label>
  </span>
</div>

```


---


## searchBar

create search bar component


### 경로

`components/molecules/search-bar/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.textfieldId|the id value for search text field|string||Y|
|props.searchBtnId|the id value for search button|string||Y|



### 예시

```jade
include /components/utils/util
include ../../atoms/buttons/default
include ../../atoms/textbox/index
include ../../molecules/fieldset/default

+searchBar({
  textfieldId: `keyword`,
  searchBtnId: `btn-search`,
})
```


### 예시 출력 결과

```html
<div
  class="amor-field amor-field--column amor-searchbar"
  role="group"
  aria-labelledby="ykrzkktd10o"
  id="searchbox"
>
  <div
    class="amor-field__label amor-field__label--30 amor-searchbar__label"
    id="ykrzkktd10o"
  >
    i18n(label.search)
  </div>
  <div class="amor-field__body amor-searchbar__body">
    <input
      class="amor-textbox amor-textbox--medium amor-searchbar__textfield"
      id="keyword"
      type="text"
      aria-labelledby="ykrzkktd10o"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      spellcheck="false"
    />
    <button
      class="amor-btn-basic amor-btn-basic--medium amor-btn-basic--fill amor-searchbar__btn-submit"
      type="button"
      id="btn-search"
    >
      i18n(label.search)
    </button>
  </div>
</div>

```


---


## tagsList

create tags list


### 경로

`components/molecules/tags-list/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.tags|sequence of tags|object||Y|



### 예시

```jade
include /components/utils/util

+tagsList({
  tags: post.tags.data || post.tags || [],
})
```


### 예시 출력 결과

```html
<div class="amor-tags-list amor-tags-list--flat">
  <ul>
    <li>
      <a href="http://example.com/tags/tag-28v646fmhshjoug/">
        tag-28v646fmhshjoug
      </a>
    </li>
    <li>
      <a href="http://example.com/tags/tag-28v6tm6tb3noh98/">
        tag-28v6tm6tb3noh98
      </a>
    </li>
  </ul>
</div>

```


---
