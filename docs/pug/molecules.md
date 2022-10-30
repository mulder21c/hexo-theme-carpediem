# Pug Documentation 

## menuNavigation

create hexo menu list


### path 

`components/molecules/menu-nav/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|



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


## pagination

create pagination component


### path 

`components/molecules/pagination/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|paginator's option of hexo @see https://hexo.io/ko/docs/helpers#paginator|object||false|
|props.labelRef|the id of related content|string||false|



### examples

```jade
include ../../utils/util

+pagination({
  options: {
    base: `/`,
    format: `/page/%d`,
  }
})
```


### output example 

```html
<nav class="amor-pagination">
  <a
    class="amor-pagination__item amor-pagination__item--current"
    href="undefined/"
    aria-current="page"
    aria-label="i18n(label.page.default)"
  >
    1
  </a>
  <a
    class="amor-pagination__item"
    href="//page/2"
    aria-label="i18n(label.page.default)"
  >
    2
  </a>
  <a
    class="amor-pagination__item"
    href="//page/3"
    aria-label="i18n(label.page.default)"
  >
    3
  </a>
  <a class="amor-pagination__next" rel="next" href="//page/2">
    <svg role="img" aria-label="i18n(label.page.next)">
      <use xlink:href="/images/solid.svg#angle-right"></use>
    </svg>
  </a>
</nav>

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
        href="http://example.com/categories/cate-ghj9u9oqp4qm9r"
        class="amor-category-nav__list__link"
      >
        cate-ghj9u9oqp4qm9r
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ghj9ddtigb8j70g"
        class="amor-category-nav__list__link"
      >
        cate-ghj9ddtigb8j70g
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-ghj9hig9saqklg8"
        class="amor-category-nav__list__link"
      >
        cate-ghj9hig9saqklg8
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
    src="https://via.placeholder.com/320x180.png?text=ghj6fdhsbur6178"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-post-card__heading"
    id="m17c-8vq19mbwnsf75p4u07"
    href="http://example.com/post-ghj6fdhsbur6178/"
    aria-describedby="Q17c-9c98prebbs8"
  >
    Post ghj6fdhsbur6178
  </a>
  <div class="amor-post-card__meta">
    <span class="amor-datetime amor-post-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time
        class="amor-datetime__time"
        id="i17c-o3jiy5pxjf0ls2pvgu18"
        datetime="2022-10-30"
      >
        2022. 10 .30
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
          <span>cate-ghj6j063l2u6iu8</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-ghj6u7d4dbsnst</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-post-card__content" id="Q17c-9c98prebbs8">
    Culpa eiusmod elit laboris magna cupidatat aliquip excepteur. In dolor elit
    irure incididunt dolore eu aute. Nulla ex do commodo eiusmod pariatur qui et
    dolore enim exercitation nostrud aliqua. Cillum officia ad laborum proident
    ad dolore veniam id excepteur mollit anim laborum amet veniam.
  </p>
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
|props.columns|column counts|undefined||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|`right`|true|



### slots 

|name|description|
|:---:|:---|
|radioGroupLabelSlot|the slot for label.|



### examples

```jade
include ../../utils/util
include ../../atoms/radios/default.pug

// basic
+radioGroup({
  name: `job`,
  labelPosition: `right`,
  columns: 3,
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
<div class="amor-radio-group amor-radio-group--col-3">
  <script async="async" data-pug="data-pug">
    window.usedComponents = window.usedComponents || new Set();
    usedComponents.add(`radio`);
  </script>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="u17s-iswffoq24f8m6so2cr"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="u17s-iswffoq24f8m6so2cr">
      designer
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
      id="y17s-sb1m26daosp8oe3j14"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="y17s-sb1m26daosp8oe3j14">
      publisher
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
      id="O17s-ylz2tillihl9kbdird8"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="O17s-ylz2tillihl9kbdird8">
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
      id="J17t-38n1ftwyo3e86ahccu1g"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="J17t-38n1ftwyo3e86ahccu1g">
      devops
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
      id="u17t-5mkbz8wkedkrnq86snqg"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="u17t-5mkbz8wkedkrnq86snqg">
      iOS developer
    </label>
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
      id="w17t-dlvyug0vu9vq1orhq6g"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="w17t-dlvyug0vu9vq1orhq6g">
      웹 디자이너
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
      id="o17t-iv8equdrh0qlquvag7o"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="o17t-iv8equdrh0qlquvag7o">
      웹 퍼블리셔
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
      id="t17t-lzc5iyugejq2cgg846g"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="t17t-lzc5iyugejq2cgg846g">
      프론트엔드 개발자
    </label>
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
include ../../atoms/radios/default.pug

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
      id="K189-sf28v898aqsmcb8j8q"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="K189-sf28v898aqsmcb8j8q"
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
      id="T18a-71d8xdhktfr9be0p33g"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="T18a-71d8xdhktfr9be0p33g"
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
      id="Q18a-cf8zh96t6cesu47ralo"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="Q18a-cf8zh96t6cesu47ralo"
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
      id="Y18a-qsve417te329sq9mcb"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="Y18a-qsve417te329sq9mcb"
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
      id="n18a-wkvoh8mcc8ee4t07ivo"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="n18a-wkvoh8mcc8ee4t07ivo"
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
      id="E18b-69dh7xt6ln6n0b6m51r"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="E18b-69dh7xt6ln6n0b6m51r"
    >
      large
    </label>
  </span>
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
include ../../atoms/radios/boxy.pug

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
      id="S18o-8brj6ijcfpebm8n6ln68"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="N18o-edmemnz1j8o5mv6pb0tg"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="s18o-h7m8eqqc22ime70br2o"
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
      id="q18o-ofc3gbrj6d4tnmjsme"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="j18o-tb7bcfqmh9itr79bo3fg"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="j18o-w9h3uw61vhld8e75ep"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
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
  aria-labelledby="Z18z-mp99uknag12siu7slcmg"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="Z18z-mp99uknag12siu7slcmg"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="j18z-znarrgurrsu99jaqk5g"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="j18z-znarrgurrsu99jaqk5g"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>

```


---


