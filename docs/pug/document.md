# Pug Documentation 

## button

create basic button element


### path 

`components/atoms/buttons/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.type|the value of type attribute for button|string|'button'|true|
|props.size|size of button <br> one of `'small'`, `'medium'`, `'large'`, `'fluid'`|string|'medium'|true|
|props.appearance|appearance of button <br> one of `'fill'`, `'outline'`|string|'fill'|true|



### examples

```jade
include ../../utils/util

+button({type: 'button', size: 'medium', appearance: 'outline'}) 버튼
```


### output example 

```html
<button
  class="amor-btn-basic amor-btn-basic--medium amor-btn-basic--outline"
  type="button"
>
  버튼
</button>

```


---


## heading

create heading element


### path 

`components/atoms/heading/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.level|the level(rank) of heading|string||false|
|props.visible|whether an element is visible or not|boolean||true|



### examples

```jade
include ../../utils/util

+heading({level: 1 })
```


### output example 

```html
<h1 class="amor-heading--level-1"></h1>

```


---


## switchButton

create switch button


### path 

`components/atoms/checkboxes/switch.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|the value of switch button's name attribute|string||true|
|props.id|the value of switch button's id attribute and label's for attribute <br> If not specified, an auto-generated id is assigned.|string||true|
|props.label|label of switch button <br> If do not specify this value, you must author and style label element.|string||true|
|props.checked|the state of switch button|boolean||true|
|props.value|the value of switch button|string||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'left'`, `'right'`|string|'right'|true|
|props.inputAttrs|the attrs for input:checkbox|object||true|



### examples

```jade
include ../../utils/util

+switchButton({label: '알림', checked: true})
```


### output example 

```html
<span class="amor-switch">
  <input
    class="amor-switch__control"
    type="checkbox"
    id="9sgiee384o0at9o"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="9sgiee384o0at9o">알림</label>
</span>

```


---


## checkbox

create input checkbox element


### path 

`components/atoms/checkboxes/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|the value of checkbox's name attribute|string||true|
|props.id|the value of checkbox's id attribute and label's for attribute <br> If not specified, an auto-generated id is assigned.|string||true|
|props.label|label of checkbox <br> If do not specify this value, you must author and style label element as child element.|string||true|
|props.checked|the checked state of checkbox|boolean||true|
|props.value|the value of checkbox|string||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|
|props.labelClassName|the class name for label element|string||true|



### examples

```jade
include ../../utils/util

+checkbox({label: '동의', checked: true})
```


### output example 

```html
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="9sh6vjvv15ur15"
    checked="checked"
  />
  <label class="amor-checkbox__label" for="9sh6vjvv15ur15">동의</label>
</span>

```


---


## boxyRadio

create input radio element


### path 

`components/atoms/radios/boxy.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|name of radio|string||false|
|props.value|the value of radio|string,number,boolean||false|
|props.id|the value of radio's id attribute and label's for attribute|string||true|
|props.checked|the checked state of radio|boolean||true|
|props.inputAttrs|the attrs for input:radio|object||true|



### examples

```jade
include ../../utils/util

+boxyRadio({name: 'answer', value: 1 })
```


### output example 

```html
<label class="amor-radio-boxy" labelPosition="right">
  <input
    class="amor-radio-boxy__control"
    type="radio"
    id="9shhftrqfo0t4kg"
    name="answer"
    value="1"
  />
  <span class="amor-radio-boxy__box"></span>
</label>

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
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|`right`|true|



### examples

```jade
include ../../utils/util
include ../../atoms/radios/default.pug

+radioGroup({
  name: `job`,
  labelPosition: `right`,
  columns: 3,
  options: [
    { label: `웹 디자이너`, value: `designer`, },
    { label: `웹 퍼블리셔`, value: `publisher`, },
    { label: `프론트엔드 개발자`, value: `frontend`, },
    { label: `웹 디자이너`, value: `designer`, },
  ],
})
```


### output example 

```html
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9si25u8fhhjq9go"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="9si25u8fhhjq9go">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9si2m7krmmq64mg"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="9si2m7krmmq64mg">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9si3mbe6omaao6g"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="9si3mbe6omaao6g">
      프론트엔드 개발자
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9si32l6c8b7i4ko"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="9si32l6c8b7i4ko">웹 디자이너</label>
  </span>
</div>

```


---


## svgIcon

create inline-svg icon


### path 

`components/atoms/svg-icon/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|name of icon|string||false|
|props.type|type of icon|string||true|



### examples

```jade
include ../../utils/util

+svgIcon({name: 'thumbs-up'})
```


### output example 

```html
<svg class="amor-svg-icon">
  <use xlink:href="/images/solid.svg#thumbs-up"></use>
</svg>

```


---


## radio

create input radio element


### path 

`components/atoms/radios/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|options||object||false|
|options.name|name of radio|string||false|
|options.value|the value of radio|string,number,boolean||false|
|options.label|label of radio<br> If do not specify this value, you must author and style label element.|string||true|
|options.id|the value of radio's id attribute and label's for attribute|string||true|
|options.checked|the checked state of radio|boolean||true|
|options.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|
|props.labelClassName|the class name for label element|string||true|



### examples

```jade
include ../../utils/util

+radio({label: 'yes', name: 'answer', value: 1})
```


### output example 

```html
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="9sim1n0vul52178"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="9sim1n0vul52178">yes</label>
</span>

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



### examples

```jade
include ../../utils/util
include ../../atoms/radios/default.pug

+radioSlider({
  legend: `크기`,
  name: `size`,
  labelPosition: `bottom`,
  options: [
    { label: `작게`, value: `small`, },
    { label: `보통`, value: `medium`, },
    { label: `크게`, value: `large`, },
  ],
})
```


### output example 

```html
<div class="amor-radio-slider" legend="크기">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9sj23kr27ndvd48"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="9sj23kr27ndvd48"
    >
      작게
    </label>
  </span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9sj27pbb7ekhs1"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="9sj27pbb7ekhs1"
    >
      보통
    </label>
  </span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="9sj2nl16af25p7"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="9sj2nl16af25p7"
    >
      크게
    </label>
  </span>
</div>

```


---


## pageTitle

create title element based on post type


### path 

`components/utils/mixin.pug`


### examples

```jade
include ./util

+pageTitle
```


### output example 

```html
<title>Hexo</title>

```


---


## preLoadImage

create preload link element for representational image


### path 

`components/utils/mixin.pug`


### examples

```jade
+preLoadImage
```


### output example 

```html
<link rel="preload" as="image" href="imgSrc" crossorigin="anonymous" />

```


---


## openGraph

create og meta element


### path 

`components/utils/mixin.pug`


### examples

```jade
include ./util

+openGraph
```


### output example 

```html
<meta property="og:title" content="Hexo" />
<meta property="og:url" content="http://example.com/" />
<meta property="og:site_name" content="Hexo" />
<meta property="og:locale" content="ko_KR" />
<meta property="article:author" content="John Doe" />
<meta name="twitter:card" content="summary" />
...

```


---


## styles

create style elements from the stylesheet created by the theme
and the stylesheet specified.



### path 

`components/utils/mixin.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|paths||array||false|



### examples

```jade
+styles([])
```
```jade
+styles(["//mydomain.com/external/style.css"])
```


### output example 

```html
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="//mydomain.com/external/style.css" />

```


---


## jsonLD

create JSON-LD script element


### path 

`components/utils/mixin.pug`


### examples

```jade
include ./util

+jsonLD
```


### output example 

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Blog",
    "@name": "Hexo",
    "url": "",
    "copyrightHolder": { "@type": "Person", "name": "John Doe" },
    "image": {
      "@type": "imageObject",
      "url": "imgSrc",
      "width": "100px",
      "height": "100px"
    },
    "author": {
      "@type": "Person",
      "name": "John Doe",
      "url": "https://www.facebook.com/mulder21c"
    }
  }
</script>

```


---


## accordion

create accordion component


### path 

`components/organisms/accordion/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.hLevel|heading level of header in accordion|string||false|
|props.activatedIndex|The index number of the panel that you want to initially open|number||true|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index.pug
include ../../atoms/svg-icon/index.pug

+accordion({hLevel: 2, activatedIndex: 1})
  +headingSlot 아코디언 1
  +panelSlot 아코디언 1 패널
  +headingSlot 아코디언 2
  +panelSlot 아코디언 2 패널
  +headingSlot 아코디언 3
  +panelSlot 아코디언 3 패널
```


### output example 

```html
<div class="amor-accordion" id="9sm4be40fc9p44g" data-init-activate="1">
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-9sm5hdq5lmrsip"
      aria-expanded="false"
      aria-controls="accordion-panel-9sm5hdq5lmrsip"
    >
      아코디언 1
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        role="presentation"
        focusable="false"
      >
        <use xlink:href="/images/solid.svg#chevron-down"></use>
      </svg>
    </button>
  </h2>
  <div
    class="amor-accordion__panel"
    id="accordion-panel-9sm5hdq5lmrsip"
    role="region"
    aria-labelledby="accordion-heading-9sm5hdq5lmrsip"
    hidden="hidden"
  >
    아코디언 1 패널
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-9sm5tn1ugujvna8"
      aria-expanded="true"
      aria-controls="accordion-panel-9sm5tn1ugujvna8"
    >
      아코디언 2
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        role="presentation"
        focusable="false"
      >
        <use xlink:href="/images/solid.svg#chevron-down"></use>
      </svg>
    </button>
  </h2>
  <div
    class="amor-accordion__panel active"
    id="accordion-panel-9sm5tn1ugujvna8"
    role="region"
    aria-labelledby="accordion-heading-9sm5tn1ugujvna8"
  >
    아코디언 2 패널
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-9sm50ci9lip66o8"
      aria-expanded="false"
      aria-controls="accordion-panel-9sm50ci9lip66o8"
    >
      아코디언 3
      <svg
        class="amor-svg-icon amor-accordion__tab__icon"
        role="presentation"
        focusable="false"
      >
        <use xlink:href="/images/solid.svg#chevron-down"></use>
      </svg>
    </button>
  </h2>
  <div
    class="amor-accordion__panel"
    id="accordion-panel-9sm50ci9lip66o8"
    role="region"
    aria-labelledby="accordion-heading-9sm50ci9lip66o8"
    hidden="hidden"
  >
    아코디언 3 패널
  </div>
</div>

```


---


## iconButton

create icon button element


### path 

`components/atoms/buttons/icon.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.icon|name of icon|string||false|
|props.label|label of button|string||false|
|props.type|the value of type attribute for button|string|'button'|true|
|props.size|size of button- size of button <br> one of `'small'`, `'medium'`, `'large'``|string|'medium'|true|
|props.appearance|appearance of button <br> one of `'fill'`, `'outline'`, `'ghost'`|string|'outline'|true|
|props.layout|layout of button <br> one of `'icon-only', `icon-text``|string|`icon-only`|true|



### examples

```jade
include ../../utils/util

+iconButton({type: 'button', size: 'medium', appearance: 'outline', icon: 'tty', label: '전화'})
```


### output example 

```html
<button
  class="amor-btn-icon amor-btn-icon--medium amor-btn-icon--outline amor-btn-icon--icon-only"
  type="button"
  aria-label="전화"
>
  <svg class="amor-btn-icon__icon" role="presentation" focusable="false">
    <use xlink:href="/images/solid.svg#tty"></use>
  </svg>
</button>

```


---


