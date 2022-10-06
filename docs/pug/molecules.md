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
        href="http://example.com/categories/cate-aajvpr77ts3qcio"
        class="amor-category-nav__list__link"
        false
      >
        cate-aajvpr77ts3qcio
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-aajv829k5jb9qp"
        class="amor-category-nav__list__link"
        false
      >
        cate-aajv829k5jb9qp
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-aajvtugglgvose"
        class="amor-category-nav__list__link"
        false
      >
        cate-aajvtugglgvose
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
  aria-labelledby="e1ye-mk2ndvwi4odldoum0ug"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="e1ye-mk2ndvwi4odldoum0ug"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="J1yf-0d384dr1fq2btqgt5ng"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="J1yf-0d384dr1fq2btqgt5ng"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>

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
    src="https://via.placeholder.com/320x180.png?text=aajubq416t4m61"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-post-card__heading"
    id="y1zi-doly1ibb52tofgfrf6g"
    href="http://example.com/post-aajubq416t4m61/"
    aria-describedby="c1zi-dtnwjl7lcvcrqi5kpo"
  >
    Post aajubq416t4m61
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
        id="a1zi-qzqo2r9bdm29h110te"
        datetime="2022-10-06"
      >
        2022. 10 .06
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
          <span>cate-aajubodd7lfl3f</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-aajut3ks8fuirag</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-post-card__content" id="c1zi-dtnwjl7lcvcrqi5kpo">
    Aute dolor sunt in irure Lorem adipisicing velit et pariatur in dolor
    voluptate ullamco cillum. Adipisicing ut aute et ad consequat aliqua fugiat
    culpa. Sint qui culpa nostrud duis aliqua qui adipisicing qui aute. Dolor
    qui dolore minim id tempor velit nostrud. Eu consequat commodo id ea
  </p>
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
      id="C20g-xmq19mbwddlh06tm9"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="C20g-xmq19mbwddlh06tm9"
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
      id="a20h-n7x4bire6htrbft9lsg"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="a20h-n7x4bire6htrbft9lsg"
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
      id="i20h-rubr0ialeqmj3kq2cfo"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="i20h-rubr0ialeqmj3kq2cfo"
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
      id="M20i-0mxt7bs7hsarn214i0g"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="M20i-0mxt7bs7hsarn214i0g"
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
      id="U20i-5xg8r6wz1ueubimf7k8"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="U20i-5xg8r6wz1ueubimf7k8"
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
      id="O20i-eoibekyzr0rf284s44o"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="O20i-eoibekyzr0rf284s44o"
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
      id="f20v-d2kskim9q1ijuagj44o"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="y20v-jqgthoriatndpo5488o"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="E20v-mlvyuj2chvamr7dhp4g"
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
      id="P20v-u8n1ftwzvtqgcvdof48"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="t20w-39t13eqtaq4gtq4758o"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="B20w-b24q19yipqss685gmto"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
</div>

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
      id="W21l-li8alj7gji9a0vl7afg"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="W21l-li8alj7gji9a0vl7afg">
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
      id="f21l-xjqq5fcqvlsqrs443f"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="f21l-xjqq5fcqvlsqrs443f">
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
      id="b21m-146c3gbs82np0sflu28"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="b21m-146c3gbs82np0sflu28">
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
      id="Y21m-9j1ucspvtmadbadap0o"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="Y21m-9j1ucspvtmadbadap0o">
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
      id="Q21m-f1q7hkl3mjvcsb1hlag"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="Q21m-f1q7hkl3mjvcsb1hlag">
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
      id="F21m-k76ojcu67179qane12o"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="F21m-k76ojcu67179qane12o">
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
      id="a21m-qb8vc11zkltdkfko9b8"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="a21m-qb8vc11zkltdkfko9b8">
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
      id="n21m-til95pahosboqg6kapo"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="n21m-til95pahosboqg6kapo">
      프론트엔드 개발자
    </label>
  </span>
</div>

```


---


