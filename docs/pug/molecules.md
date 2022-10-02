# Pug Documentation 

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
  aria-labelledby="jpp-eu56djoj9lh2uk7vk3o8"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="jpp-eu56djoj9lh2uk7vk3o8"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="gpp-rdovgnbmge90mpvej5eo"
>
  <div
    class="amor-field__label amor-field__label--30"
    id="gpp-rdovgnbmge90mpvej5eo"
  >
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
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
<nav class="amor-pagination" id="Iq1-i5eu2rbp7ssacau3h8f8">
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
    src="https://via.placeholder.com/320x180.png?text=0c8m4s56m74ke4"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-post-card__heading"
    id="er4-olhaikwdruhj582ba8l"
    href="http://example.com/post-0c8m4s56m74ke4/"
    aria-describedby="Ir4-opbuz1ywo8bscc0kj038"
  >
    Post 0c8m4s56m74ke4
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
        id="gr4-znxyj6b6npul7889nn3g"
        datetime="2022-10-02"
      >
        2022. 10 .02
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
          <span>cate-0c8ndud50k3lob8</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon">
            <use xlink:href="/images/solid.svg#angle-right"></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-0c8n69m50jri4o8</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-post-card__content" id="Ir4-opbuz1ywo8bscc0kj038">
    Commodo qui reprehenderit nisi officia pariatur consequat. Magna eu mollit
    ad magna anim officia labore reprehenderit nisi sit et sunt cupidatat amet.
    Nulla occaecat excepteur laboris excepteur aute incididunt. Proident quis
    laborum aute quis ex eu non consectetur ex ut id est. Ad eu voluptate
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
      id="erk-lwbjdriybcv3g032t08"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="Drk-tobdp7vco80t705be278"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="srk-vzgd2eperr7jot1b9e0o"
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
      id="drl-0u1mjbgq6jfhnr9j0l28"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="Xrl-4mpvhciuh5ff1n1hd9l8"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="Url-8t5ucg49f9ljll3e5tp"
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
      id="fs2-1ihgqi53iefb3ahdlo08"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="fs2-1ihgqi53iefb3ahdlo08">
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
      id="os2-fuvvhlgt976rnp0lk9o"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="os2-fuvvhlgt976rnp0lk9o">
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
      id="Ks2-iznoyc34f1pgkdpparko"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="Ks2-iznoyc34f1pgkdpparko">
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
      id="Ks2-nd2zwrqh9l517a9laomo"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="Ks2-nd2zwrqh9l517a9laomo">
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
      id="Vs2-pjn6vflvp1tf4r6pmmh8"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="Vs2-pjn6vflvp1tf4r6pmmh8">
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
      id="ks2-t0mda3y9muv90p4vfgso"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="ks2-t0mda3y9muv90p4vfgso">
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
      id="as2-wzljvltmetia86fk6cv"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="as2-wzljvltmetia86fk6cv">
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
      id="Is2-zabxiy78ev6nlcui3os8"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="Is2-zabxiy78ev6nlcui3os8">
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
      id="isk-ckrew0kbar4k03jaf2g"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="isk-ckrew0kbar4k03jaf2g"
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
      id="qsk-q1csi7hgmv9hgpm5cio"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="qsk-q1csi7hgmv9hgpm5cio"
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
      id="ksk-ter76bhlckfc8ah1pqi8"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="ksk-ter76bhlckfc8ah1pqi8"
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
      id="Psk-yvscvgag6sfmffh4qig"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="Psk-yvscvgag6sfmffh4qig"
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
      id="asl-2izmhaad0et3urmmvr"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="asl-2izmhaad0et3urmmvr"
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
      id="fsl-4umitfsn5j9oepugvs8"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="fsl-4umitfsn5j9oepugvs8"
    >
      large
    </label>
  </span>
</div>

```


---


