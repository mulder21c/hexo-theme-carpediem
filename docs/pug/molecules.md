# Pug Documentation 

## articleMeta

create meta info component for article


### path 

`components/molecules/article-meta/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.categories|sequence of category|object||false|
|props.date|date of article|object||false|
|props.updated|updated date of article|object||false|



### examples

```jade
include ../../utils/util
include ../../atoms/category/index
include ../../atoms/datetime/index

+articleMeta({
  categories: post.categories.data || post.categories || [],
  date: post.date,
  updated: post.updated,
})
```


### output example 

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
        <a href="categories/cate-ebvmlgfg9esmd8">cate-ebvmlgfg9esmd8</a>
      </span>
      <span class="amor-category__separator" aria-hidden="true">
        <svg class="amor-svg-icon" focusable="false">
          <use xlink:href="/images/solid.svg#angle-right"></use>
        </svg>
      </span>
      <span class="amor-category__content" role="listitem">
        <a href="categories/cate-ebvm7nbpc7fkf9g">cate-ebvm7nbpc7fkf9g</a>
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
    <time class="amor-datetime__time" id="w61tpmtllkm" datetime="2022-11-26">
      2022. 11. 26
    </time>
  </span>
</div>

```


---


## articleCard

create article card component


### path 

`components/molecules/article-card/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.post|hexo post object @see https://hexo.io/docs/variables.html#Page-Variables|object||false|
|props.isLink|Whether to operate the card as a link|boolean|false|true|



### examples

```jade
include ../../utils/util
include ../../atoms/datetime/index
include ../../atoms/category/index

+articleCard({post, isLink: true})
```


### output example 

```html
<div class="amor-article-card amor-article-card--link">
  <img
    class="amor-article-card__thumb"
    src="https://via.placeholder.com/320x180.png?text=ebvm02odfelduv"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-article-card__heading"
    href="http://example.com/post-ebvm02odfelduv/"
    aria-describedby="um046f3aai8 dx658je6ndk"
  >
    Post ebvm02odfelduv
  </a>
  <div class="amor-article-card__meta" id="um046f3aai8">
    <span class="amor-datetime amor-article-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="zysfuzbj4us" datetime="2022-11-26">
        2022. 11. 26
      </time>
    </span>
    <span class="amor-category amor-article-card__meta__item">
      <span
        class="amor-category__label"
        role="img"
        aria-label="i18n(label.category)"
      >
        📂
      </span>
      <span class="amor-category__list" role="list">
        <span class="amor-category__content" role="listitem">
          <span>cate-ebvmlgfg9esmd8</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon" focusable="false">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-ebvm7nbpc7fkf9g</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-article-card__content" id="dx658je6ndk">
    Ex sunt labore voluptate laboris deserunt non velit qui culpa ex mollit
    velit. Lorem sit fugiat labore in non laboris elit non eu do. Quis laboris
    amet enim Lorem ea enim nulla. Ipsum esse culpa eu pariatur aliquip. Cillum
    laborum excepteur cupidatat anim deserunt commodo ea nostrud laboris
  </p>
</div>

```


---


## fieldset

create group containing label and body


### path 

`components/molecules/fieldset/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.direction|how items are placed in the container <br>One of `'row'`, `'column'`|string|'row'|true|
|props.alignItem|alignment of items on the cross axis <br>One of `'start'`, `'center'`|string|'start'|true|
|props.labelWidthRatio|the factor of label's width in the container|integer|3|true|



### slots 

|name|description|
|:---:|:---|
|fieldsetLabelSlot|the slot for legend of fieldset|
|fieldsetBodySlot|the slot for body of fieldset|



### examples

```jade
include ../../utils/util

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


### output example 

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="xgl6o85bk3l"
>
  <div class="amor-field__label amor-field__label--30" id="xgl6o85bk3l">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="fgxmuvppj14"
>
  <div class="amor-field__label amor-field__label--30" id="fgxmuvppj14">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>

```


---


## categoryNavigation

create hexo category list


### path 

`components/molecules/category-nav/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|@see https://hexo.io/ko/docs/helpers#list-categories|object||true|



### examples

```jade
include ../../utils/util

+categoryNavigation()
```


### output example 

```html
<nav class="amor-category-nav" aria-label="categories">
  <ul class="amor-category-nav__list">
    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ebvq8oe9mkon95o"
        class="amor-category-nav__list__link"
      >
        cate-ebvq8oe9mkon95o
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ebvq5aa72llc82g"
        class="amor-category-nav__list__link"
      >
        cate-ebvq5aa72llc82g
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ebvq8i6s8k0a60o"
        class="amor-category-nav__list__link"
      >
        cate-ebvq8i6s8k0a60o
      </a>
    </li>
  </ul>
</nav>

```


---


## radioBoxes

create radio group component


### path 

`components/molecules/radio-group/boxy.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|attribute of radio|string||false|
|props.options|the array that consists of options for radio component|array||false|



### slots 

|name|description|
|:---:|:---|
|radioBoxesLabelSlot|the slot for label.|



### examples

```jade
include ../../utils/util
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


### output example 

```html
<!-- basic-->
<div class="amor-radio-boxes">
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="e3x0dvu6nf8"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="j7hkl3a5qrg"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="giu2cpsf3ek"
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
      id="zn1fpvpcegc"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="xcuevxrfsag"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="rjn33qv637k"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
</div>

```


---


## menuNavigation

create hexo menu list


### path 

`components/molecules/menu-nav/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|the options for menu list|object||true|
|props.options.transform|<br> the function that changes the display of category name|function||true|



### examples

```jade
include ../../utils/util

+menuNavigation()
```


### output example 

```html
<nav class="amor-menu-nav" aria-label="menu">
  <ul class="amor-menu-nav__list">
    <li class="amor-menu-nav__list__item">
      <a href="http://example.com/about" class="amor-menu-nav__list__link">
        about
      </a>
    </li>

    <li class="amor-menu-nav__list__item">
      <a href="http://example.com/hwo-to" class="amor-menu-nav__list__link">
        how
      </a>
    </li>

    <li class="amor-menu-nav__list__item">
      <a href="http://example.com/archives" class="amor-menu-nav__list__link">
        Archives
      </a>
    </li>
  </ul>
</nav>

```


---


## radioGroup

create radio group component


### path 

`components/molecules/radio-group/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|attribute of radio|string||false|
|props.options|the array that consists of options for radio component without name and labelPosition|array||false|
|props.columns|column counts|number||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|`right`|true|



### slots 

|name|description|
|:---:|:---|
|radioGroupLabelSlot|the slot for label.|



### examples

```jade
include ../../utils/util
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


### output example 

```html
<!-- basic-->
<div class="amor-radio-group">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="oy3ki6729l4"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="oy3ki6729l4">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bzd6u2p5g63"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="bzd6u2p5g63">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="obzaxk5tq3a"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="obzaxk5tq3a">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="zeuzrzn8g6o"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="zeuzrzn8g6o">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ztflk5d92sg"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="ztflk5d92sg">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="wuzkvc4mqq8"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="wuzkvc4mqq8">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="snbsp6qi7ho"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="snbsp6qi7ho">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="y9qf93fdrg8"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="y9qf93fdrg8">프론트엔드 개발자</label>
  </span>
</div>

```


---


## radioSlider

create radio group component


### path 

`components/molecules/radio-group/slider.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|attribute of radio|string||false|
|props.options|the array that consists of options for radio component|array||false|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'bottom'`|string|`bottom`|true|



### slots 

|name|description|
|:---:|:---|
|radioSliderLabelSlot|the slot for label.|



### examples

```jade
include ../../utils/util
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


### output example 

```html
<!-- basic-->
<div class="amor-radio-slider">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ag4m3venslm"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="ag4m3venslm"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ow9778rku4c"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="ow9778rku4c"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="w6urf5njsln"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="w6urf5njsln"
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
      id="qdd2nnibog8"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="qdd2nnibog8"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="rarqsjr2n9b"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="rarqsjr2n9b"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="lb6a6jh9798"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="lb6a6jh9798"
    >
      large
    </label>
  </span>
</div>

```


---


