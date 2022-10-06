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
        href="http://example.com/categories/cate-48ptmltmtgcsv3g"
        class="amor-category-nav__list__link"
        false
      >
        cate-48ptmltmtgcsv3g
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-48pt56nfm28vd1"
        class="amor-category-nav__list__link"
        false
      >
        cate-48pt56nfm28vd1
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-48ptq8jud7f4f9g"
        class="amor-category-nav__list__link"
        false
      >
        cate-48ptq8jud7f4f9g
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
    src="https://via.placeholder.com/320x180.png?text=48ps7nojr7svosg"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-post-card__heading"
    id="W238-3zutdictp0cit5a3fig"
    href="http://example.com/post-48ps7nojr7svosg/"
    aria-describedby="I238-47mr2ighj2rlt3jn3ko"
  >
    Post 48ps7nojr7svosg
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
        id="A238-jtpgj3gv902vn9utld"
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
          <span>cate-48pspnngufe5c2o</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-48ps31d7ekrbbi8</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-post-card__content" id="I238-47mr2ighj2rlt3jn3ko">
    Occaecat irure consectetur magna ut est voluptate eiusmod elit consequat est
    occaecat anim. Eiusmod ad et aute enim esse proident dolore dolor
    exercitation. Consequat ea incididunt commodo ad laboris proident. Ex eu sit
    ullamco culpa dolore occaecat tempor incididunt nostrud id nulla ut tempor
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
      id="f23z-tmzvupu7oihr4bdlb9g"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="f23z-tmzvupu7oihr4bdlb9g">
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
      id="o240-e415gxo2tgk3nngimb"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="o240-e415gxo2tgk3nngimb">
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
      id="C240-mup88j59j42jps4n5u"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="C240-mup88j59j42jps4n5u">
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
      id="F240-zc5j2c4nhs5k06arbh"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="F240-zc5j2c4nhs5k06arbh">
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
      id="p241-7sboxu77m1unnpgaf6"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="p241-7sboxu77m1unnpgaf6">
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
      id="W241-cqe86dwxsdpe0usj97o"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="W241-cqe86dwxsdpe0usj97o">
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
      id="J241-lmw97rhd8rdgghteuf"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="J241-lmw97rhd8rdgghteuf">
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
      id="m241-p2ski61mpf63got7158"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="m241-p2ski61mpf63got7158">
      프론트엔드 개발자
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
      id="v24j-l3gez357me7iq914148"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="i24k-sz5ex1yu5t1msod0ka8"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="a24l-242pggygf8c5rbrcv9o"
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
      id="Q24l-9q1sa3m1mescs43li8"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="U24l-mxajgsh6fhp7s9d0cqo"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="R24l-rpx4bhqw808d1l3bsb"
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
  aria-labelledby="B258-4wrvmd0shsj5r49t3lo"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="B258-4wrvmd0shsj5r49t3lo"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="c258-oj3ec9z99s8ot5f4qeg"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="c258-oj3ec9z99s8ot5f4qeg"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
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
      id="C25u-n9zrpbmfo1p4e2c3v2o"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="C25u-n9zrpbmfo1p4e2c3v2o"
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
      id="U25v-0edvqjfhailirpumq08"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="U25v-0edvqjfhailirpumq08"
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
      id="g25v-4jtbgm5c4m03f9iut0o"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="g25v-4jtbgm5c4m03f9iut0o"
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
      id="j25v-bjd8xdhkra5217v9be"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="j25v-bjd8xdhkra5217v9be"
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
      id="R25v-hjsssqd850d4ai010dg"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="R25v-hjsssqd850d4ai010dg"
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
      id="r25v-o5vi9bdm3a7u7ldnlu8"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="r25v-o5vi9bdm3a7u7ldnlu8"
    >
      large
    </label>
  </span>
</div>

```


---


