# Pug Documentation 

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
        href="http://example.com/categories/cate-ei8j2cr2gnip4lg"
        class="amor-category-nav__list__link"
      >
        cate-ei8j2cr2gnip4lg
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ei8jkvfuj0u8v8o"
        class="amor-category-nav__list__link"
      >
        cate-ei8jkvfuj0u8v8o
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ei8j5vauidjoslg"
        class="amor-category-nav__list__link"
      >
        cate-ei8j5vauidjoslg
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


### output example 

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="zfv1wck98m8"
>
  <div class="amor-field__label amor-field__label--30" id="zfv1wck98m8">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="l0258ccuaki"
>
  <div class="amor-field__label amor-field__label--30" id="l0258ccuaki">
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


## postCard

create post card component


### path 

`components/molecules/post-card/index.pug`


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

+postCard({post, isLink: true})
```


### output example 

```html
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`post-card`);
</script>
<div class="amor-post-card amor-post-card--link">
  <img
    class="amor-post-card__thumb"
    src="https://via.placeholder.com/320x180.png?text=ei8f86r7d6rsbdg"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-post-card__heading"
    href="http://example.com/post-ei8f86r7d6rsbdg/"
    aria-describedby="ikdzmwgljks oqd3ncb0kfc"
  >
    Post ei8f86r7d6rsbdg
  </a>
  <div class="amor-post-card__meta" id="ikdzmwgljks">
    <span class="amor-datetime amor-post-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="jp1wjymf7n4" datetime="2022-11-04">
        2022. 11. 04
      </time>
    </span>
    <span class="amor-category amor-post-card__meta__item">
      <span
        class="amor-category__label"
        role="img"
        aria-label="i18n(label.category)"
      >
        📂
      </span>
      <span class="amor-category__list" role="list">
        <span class="amor-category__content" role="listitem">
          <span>cate-ei8g68smutkksa8</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon" focusable="false">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-ei8gasqbheif7qg</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-post-card__content" id="oqd3ncb0kfc">
    Velit mollit consectetur labore pariatur eu. Eiusmod labore sunt laboris
    exercitation sit minim adipisicing excepteur proident consequat velit. Aute
    adipisicing excepteur reprehenderit irure nulla in nulla sint pariatur
    nostrud ex est aliqua cupidatat. Incididunt elit eiusmod voluptate esse
  </p>
</div>

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
      id="uxt6ie512tg"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="eqzkne9492e"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="zijlbgr0o4p"
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
      id="jmr0plf6u8g"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="i28ypy31nqq"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="vt0z4o49k8f"
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


### output example 

```html
<!-- basic-->
<div class="amor-radio-group">
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="djw9pe3osqk"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="djw9pe3osqk">designer</label>
  </span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="dvqnhgd7mag"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="dvqnhgd7mag">publisher</label>
  </span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="n9mwcot92m8"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="n9mwcot92m8">
      frontend developer
    </label>
  </span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="nnwkoq5pjnb"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="nnwkoq5pjnb">devops</label>
  </span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="gy6aedg7o6g"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="gy6aedg7o6g">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ffdnjp4o948"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="ffdnjp4o948">웹 디자이너</label>
  </span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="qq9lrf23gjk"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="qq9lrf23gjk">웹 퍼블리셔</label>
  </span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tq3abe8dtle"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="tq3abe8dtle">프론트엔드 개발자</label>
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
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bsc4sd2kh7m"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="bsc4sd2kh7m"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="r7ho0ltk3fg"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="r7ho0ltk3fg"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="xrlh6l46s2j"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="xrlh6l46s2j"
    >
      large
    </label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-slider">
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="en7qcftomvo"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="en7qcftomvo"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="gys6xknvc02"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="gys6xknvc02"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="o7jkqz7cpom"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="o7jkqz7cpom"
    >
      large
    </label>
  </span>
</div>

```


---


