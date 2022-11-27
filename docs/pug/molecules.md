# Pug Documentation 

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


### example output 

```html
<div class="amor-article-card amor-article-card--link">
  <img
    class="amor-article-card__thumb"
    src="https://via.placeholder.com/320x180.png?text=hr6cdu64u0brhsg"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-article-card__heading"
    href="http://example.com/post-hr6cdu64u0brhsg/"
    aria-describedby="xqjxq8ol9lo ah1s93u6egs"
  >
    Post hr6cdu64u0brhsg
  </a>
  <div class="amor-article-card__meta" id="xqjxq8ol9lo">
    <span class="amor-datetime amor-article-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="n9at5e7it4a" datetime="2022-11-27">
        2022. 11. 27
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
          <span>cate-hr6ceki7o9o956g</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon" focusable="false">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-hr6ci2oa6hrc46g</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-article-card__content" id="ah1s93u6egs">
    Et ullamco occaecat adipisicing exercitation qui qui sit ut deserunt
    consectetur. Mollit dolor eu et minim veniam occaecat magna officia labore
    aliqua cillum pariatur aute eiusmod. Cupidatat cillum sint do reprehenderit
    deserunt cillum anim est esse dolor cupidatat. Tempor pariatur amet
    voluptate
  </p>
</div>

```


---


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


### example output 

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
        <a href="categories/cate-hr6ceki7o9o956g">cate-hr6ceki7o9o956g</a>
      </span>
      <span class="amor-category__separator" aria-hidden="true">
        <svg class="amor-svg-icon" focusable="false">
          <use xlink:href="/images/solid.svg#angle-right"></use>
        </svg>
      </span>
      <span class="amor-category__content" role="listitem">
        <a href="categories/cate-hr6ci2oa6hrc46g">cate-hr6ci2oa6hrc46g</a>
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
    <time class="amor-datetime__time" id="esqr7ugm2rs" datetime="2022-11-27">
      2022. 11. 27
    </time>
  </span>
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


### example output 

```html
<nav class="amor-category-nav" aria-label="categories">
  <ul class="amor-category-nav__list">
    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-hr6f3od45l7a9"
        class="amor-category-nav__list__link"
      >
        cate-hr6f3od45l7a9
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-hr6f23ndp33viqo"
        class="amor-category-nav__list__link"
      >
        cate-hr6f23ndp33viqo
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-hr6f4sse8ksovbg"
        class="amor-category-nav__list__link"
      >
        cate-hr6f4sse8ksovbg
      </a>
    </li>
  </ul>
</nav>

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


### example output 

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="igzr2q9i6e4"
>
  <div class="amor-field__label amor-field__label--30" id="igzr2q9i6e4">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="ojpdeiv0ks8"
>
  <div class="amor-field__label amor-field__label--30" id="ojpdeiv0ks8">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
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


### example output 

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


### example output 

```html
<!-- basic-->
<div class="amor-radio-boxes">
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="cwna6c6qfo2"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="v13eqt3tvr8"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tc9oxclncks"
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
      id="n2rjg7o6mag"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="kowdanklmho"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="iis05u5ad8m"
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


### example output 

```html
<!-- basic-->
<div class="amor-radio-group">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="nk7u2t58m38"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="nk7u2t58m38">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ghkh1b6c1p8"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="ghkh1b6c1p8">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tt136nj87do"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="tt136nj87do">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="zzb5nprt5gg"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="zzb5nprt5gg">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="xmp1k7v30no"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="xmp1k7v30no">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="l3x1edef5se"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="l3x1edef5se">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="dkpe4da5mgg"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="dkpe4da5mgg">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="g20lwj1hs4s"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="g20lwj1hs4s">프론트엔드 개발자</label>
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


### example output 

```html
<!-- basic-->
<div class="amor-radio-slider">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="kd2podpgb5g"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="kd2podpgb5g"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="rlpr742bg0k"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="rlpr742bg0k"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="oex1yugql8q"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="oex1yugql8q"
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
      id="vv7wo9tpo9g"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="vv7wo9tpo9g"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="gn0yaiur3ss"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="gn0yaiur3ss"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="rj5huo8l3g9"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="rj5huo8l3g9"
    >
      large
    </label>
  </span>
</div>

```


---


## tagsList

create tags list


### path 

`components/molecules/tags-list/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.tags|sequence of tags|object||false|



### examples

```jade
include ../../utils/util

+tagsList({
  tags: post.tags.data || post.tags || [],
})
```


### example output 

```html
<div class="amor-tags-list amor-tags-list--flat">
  <ul>
    <li>
      <a href="http://example.com/tags/tag-hr6c4210r6ok7b8/">
        tag-hr6c4210r6ok7b8
      </a>
    </li>
    <li>
      <a href="http://example.com/tags/tag-hr6c8ohdcb2hbmg/">
        tag-hr6c8ohdcb2hbmg
      </a>
    </li>
  </ul>
</div>

```


---


