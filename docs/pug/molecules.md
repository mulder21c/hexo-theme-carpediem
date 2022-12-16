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
    src="https://via.placeholder.com/320x180.png?text=jsg94eslm31tueo"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-article-card__heading"
    href="http://example.com/post-jsg94eslm31tueo/"
    aria-describedby="kgqrrit9ks4 nypclfntmmm"
  >
    Post jsg94eslm31tueo
  </a>
  <div class="amor-article-card__meta" id="kgqrrit9ks4">
    <span class="amor-datetime amor-article-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="itr9zjhe9g8" datetime="2022-12-17">
        2022. 12. 17
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
          <span>cate-jsg914i3ikh72oo</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon" focusable="false">
            <use
              xlink:href="http://example.com/images/solid.svg#angle-right"
            ></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-jsg9hoesm148gkg</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-article-card__content" id="nypclfntmmm">
    Incididunt sint sit est eiusmod est esse aliquip et voluptate consequat.
    Culpa Lorem laboris id anim esse adipisicing. Reprehenderit nulla officia
    quis aliqua labore eiusmod nisi non magna do incididunt dolore. Commodo
    veniam aute adipisicing tempor sint labore voluptate pariatur excepteur enim
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
        <a href="categories/cate-jsg914i3ikh72oo">cate-jsg914i3ikh72oo</a>
      </span>
      <span class="amor-category__separator" aria-hidden="true">
        <svg class="amor-svg-icon" focusable="false">
          <use
            xlink:href="http://example.com/images/solid.svg#angle-right"
          ></use>
        </svg>
      </span>
      <span class="amor-category__content" role="listitem">
        <a href="categories/cate-jsg9hoesm148gkg">cate-jsg9hoesm148gkg</a>
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
    <time class="amor-datetime__time" id="l6mlp6i484g" datetime="2022-12-17">
      2022. 12. 17
    </time>
  </span>
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


### example output 

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="dgq7aot9fmg"
>
  <div class="amor-field__label amor-field__label--30" id="dgq7aot9fmg">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="qqhyku2a6t8"
>
  <div class="amor-field__label amor-field__label--30" id="qqhyku2a6t8">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>

```


---


## categoryNavigation

create hexo category list


### path 

`components/molecules/navigation/category/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|@see https://hexo.io/ko/docs/helpers#list-categories|object||true|



### examples

```jade
include ../../../utils/util

+categoryNavigation()
```


### example output 

```html
<nav class="amor-category-nav" aria-label="categories">
  <ul class="amor-category-nav__list">
    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-jsgdsjg6jqqpn4g"
        class="amor-category-nav__list__link"
      >
        cate-jsgdsjg6jqqpn4g
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-jsgdoohg5nj5ma8"
        class="amor-category-nav__list__link"
      >
        cate-jsgdoohg5nj5ma8
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-jsgdecnkd8uof6"
        class="amor-category-nav__list__link"
      >
        cate-jsgdecnkd8uof6
      </a>
    </li>
  </ul>
</nav>

```


---


## linksNavigation

create hexo external link list


### path 

`components/molecules/navigation/links/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|the options for external link list|object||true|
|props.options.transform|<br> the function that changes the display of link name|function||true|



### examples

```jade
include ../../../utils/util

+linksNavigation()
```


### example output 

```html
<nav class="amor-links-nav" aria-label="links">
  <ul class="amor-links-nav__list">
    <li class="amor-links-nav__list__item">
      <a
        href="https://mulder21c.github.io/aria-practices"
        class="amor-links-nav__list__link"
        target="_blank"
        rel="noopener"
      >
        ARIA Authoring Practice 1.2 번역
      </a>
    </li>

    <li class="amor-links-nav__list__item">
      <a
        href="https://mulder21c.github.io/seminar"
        class="amor-links-nav__list__link"
        target="_blank"
        rel="noopener"
      >
        세미나 발표 자료
      </a>
    </li>
  </ul>
</nav>

```


---


## menuNavigation

create hexo menu list


### path 

`components/molecules/navigation/menu/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|the options for menu list|object||true|
|props.options.transform|<br> the function that changes the display of menu name|function||true|



### examples

```jade
include ../../../utils/util

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
      id="rm098v071nn"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="hot7dm7nbik"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="p1tplnb0h08"
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
      id="ogzx5o37j8s"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="bmt5xx03mp6"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="g65b7icbp6g"
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
      id="h2d12p9f3bo"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="h2d12p9f3bo">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="uc2ihjbej8a"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="uc2ihjbej8a">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="r5pejgccasf"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="r5pejgccasf">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="yhmhmnb50ig"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="yhmhmnb50ig">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="c7lpzbmd1sg"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="c7lpzbmd1sg">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="vz98jajo7i2"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="vz98jajo7i2">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bpgp2dimvos"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="bpgp2dimvos">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="mdhc3uhn41k"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="mdhc3uhn41k">프론트엔드 개발자</label>
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
      id="dztsex2khvg"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="dztsex2khvg"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="utuc1l6osio"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="utuc1l6osio"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="yohcobsbiqg"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="yohcobsbiqg"
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
      id="yccbtiei2d4"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="yccbtiei2d4"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="apkrf4bo2jk"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="apkrf4bo2jk"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="kcwk49ll62k"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="kcwk49ll62k"
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
      <a href="http://example.com/tags/tag-jsg9kl559ftgh8/">
        tag-jsg9kl559ftgh8
      </a>
    </li>
    <li>
      <a href="http://example.com/tags/tag-jsg90lurdrohqi8/">
        tag-jsg90lurdrohqi8
      </a>
    </li>
  </ul>
</div>

```


---


