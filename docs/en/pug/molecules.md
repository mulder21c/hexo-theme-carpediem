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
    src="https://via.placeholder.com/320x180.png?text=m1833ftrs56sv0o"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-article-card__heading"
    href="http://example.com/post-m1833ftrs56sv0o/"
    aria-describedby="meqyfqb5cj4 da73he6i3iq"
  >
    Post m1833ftrs56sv0o
  </a>
  <div class="amor-article-card__meta" id="meqyfqb5cj4">
    <span class="amor-datetime amor-article-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="u3pp2nphi2o" datetime="2022-12-17">
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
          <span>cate-m184id0eler7dlo</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon" focusable="false">
            <use
              xlink:href="http://example.com/images/solid.svg#angle-right"
            ></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-m1845p52eo2qsqg</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-article-card__content" id="da73he6i3iq">
    Ut anim ea minim aliqua anim elit consectetur laborum elit et. Quis in culpa
    exercitation consequat do duis dolor id proident. Est sit sit qui consequat
    irure dolor enim deserunt officia cupidatat do amet. Adipisicing do proident
    Lorem nostrud consectetur reprehenderit magna ut. Minim deserunt
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
        <a href="categories/cate-m184id0eler7dlo">cate-m184id0eler7dlo</a>
      </span>
      <span class="amor-category__separator" aria-hidden="true">
        <svg class="amor-svg-icon" focusable="false">
          <use
            xlink:href="http://example.com/images/solid.svg#angle-right"
          ></use>
        </svg>
      </span>
      <span class="amor-category__content" role="listitem">
        <a href="categories/cate-m1845p52eo2qsqg">cate-m1845p52eo2qsqg</a>
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
    <time class="amor-datetime__time" id="sf18dj1r4p8" datetime="2022-12-17">
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
  aria-labelledby="tzvxn954ddm"
>
  <div class="amor-field__label amor-field__label--30" id="tzvxn954ddm">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="wzp1qertrhk"
>
  <div class="amor-field__label amor-field__label--30" id="wzp1qertrhk">
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
        href="http://example.com/categories/cate-m188i9nnr11u7j"
        class="amor-category-nav__list__link"
      >
        cate-m188i9nnr11u7j
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-m1885gotuvnfnrg"
        class="amor-category-nav__list__link"
      >
        cate-m1885gotuvnfnrg
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-m188v11f131o3ag"
        class="amor-category-nav__list__link"
      >
        cate-m188v11f131o3ag
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
      id="aia3kd8jnlj"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="f91jwao5s28"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="ojraixblrkk"
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
      id="sssuf73ok94"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tm098vvns07"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="hfbqfavj6bg"
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
      id="pz0vpvmma1d"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="pz0vpvmma1d">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="isccwaognoa"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="isccwaognoa">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="v7rhcjief7g"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="v7rhcjief7g">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="yormm4thq73"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="yormm4thq73">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="akqmwzghp5c"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="akqmwzghp5c">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="fz2sua8fuio"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="fz2sua8fuio">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="j8r9yg4g9d6"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="j8r9yg4g9d6">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ojsuwflu4n8"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="ojsuwflu4n8">프론트엔드 개발자</label>
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
      id="knu2phi14bt"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="knu2phi14bt"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="fc3fbavu018"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="fc3fbavu018"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="a9wpomgk64m"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="a9wpomgk64m"
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
      id="gbivfn8mais"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="gbivfn8mais"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="s5j6yd275no"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="s5j6yd275no"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="j4jukbt6oqp"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="j4jukbt6oqp"
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
      <a href="http://example.com/tags/tag-m184ofaclo9tne/">
        tag-m184ofaclo9tne
      </a>
    </li>
    <li>
      <a href="http://example.com/tags/tag-m1841kjv37aul78/">
        tag-m1841kjv37aul78
      </a>
    </li>
  </ul>
</div>

```


---


