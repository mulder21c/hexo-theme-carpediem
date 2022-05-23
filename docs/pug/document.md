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

+button({type: 'button', size: 'medium', appearance: 'outline'}) button
```


### output example 

```html
<button
  class="amor-btn-basic amor-btn-basic--medium amor-btn-basic--outline"
  type="button"
>
  button
</button>

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

+checkbox({label: 'agree', checked: true})
+checkbox({ checked: false, id: "no-label"})
  label(for="no-label") checkbox
```


### output example 

```html
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="bn07vj2h8rvuadg"
    checked="checked"
  />
  <label class="amor-checkbox__label" for="bn07vj2h8rvuadg">agree</label>
</span>
<span class="amor-checkbox">
  <input class="amor-checkbox__control" type="checkbox" id="no-label" />
  <span class="amor-checkbox__label" aria-hidden="true"></span>
  <label for="no-label">checkbox</label>
</span>

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

+heading({level: 1 }) heading
```


### output example 

```html
<h1 class="amor-heading--level-1">heading</h1>

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
+radio({name: 'answer', id: "no-label", value: 1})
  label(for="no-label") radio button
```


### output example 

```html
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="bn1mqqkueruktv8"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="bn1mqqkueruktv8">yes</label>
</span>
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="no-label"
    name="answer"
    value="1"
  />
  <span class="amor-radio__label" aria-hidden="true"></span>
  <label for="no-label">radio button</label>
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

+boxyRadio({name: 'answer', value: 1 }) boxy radio
```


### output example 

```html
<label class="amor-radio-boxy" labelPosition="right">
  <input
    class="amor-radio-boxy__control"
    type="radio"
    id="bn201s2k8imj8i8"
    name="answer"
    value="1"
  />
  <span class="amor-radio-boxy__box">boxy radio</span>
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
    { label: `designer`, value: `designer`, },
    { label: `publisher`, value: `publisher`, },
    { label: `frontend developer`, value: `frontend`, },
    { label: `devops`, value: `devops`, },
    { label: `iOS developer`, value: `ios`, },
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
      id="bn2ge5qajfudd3"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="bn2ge5qajfudd3">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn2g51vifs9pq6g"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="bn2g51vifs9pq6g">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn2g79dalhl22"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="bn2g79dalhl22">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn2hn0bjml35fro"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="bn2hn0bjml35fro">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn2hgdd6c0hfdko"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="bn2hgdd6c0hfdko">iOS developer</label>
  </span>
</div>

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
  +headingSlot heading 1
  +panelSlot panel 1
  +headingSlot heading 2
  +panelSlot panel 2
  +headingSlot heading 3
  +panelSlot panel 3
```


### output example 

```html
<div class="amor-accordion" id="bn3eost73u7ec98" data-init-activate="1">
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-bn3e3ih05cc4dq8"
      aria-expanded="false"
      aria-controls="accordion-panel-bn3e3ih05cc4dq8"
    >
      heading 1
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
    id="accordion-panel-bn3e3ih05cc4dq8"
    role="region"
    aria-labelledby="accordion-heading-bn3e3ih05cc4dq8"
    hidden="hidden"
  >
    panel 1
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-bn3fp4vfg9adpl"
      aria-expanded="true"
      aria-controls="accordion-panel-bn3fp4vfg9adpl"
    >
      heading 2
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
    id="accordion-panel-bn3fp4vfg9adpl"
    role="region"
    aria-labelledby="accordion-heading-bn3fp4vfg9adpl"
  >
    panel 2
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-bn3fhihc9cjsl6o"
      aria-expanded="false"
      aria-controls="accordion-panel-bn3fhihc9cjsl6o"
    >
      heading 3
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
    id="accordion-panel-bn3fhihc9cjsl6o"
    role="region"
    aria-labelledby="accordion-heading-bn3fhihc9cjsl6o"
    hidden="hidden"
  >
    panel 3
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

+iconButton({type: 'button', size: 'medium', appearance: 'outline', icon: 'tty', label: 'tel'})
```


### output example 

```html
<button
  class="amor-btn-icon amor-btn-icon--medium amor-btn-icon--outline amor-btn-icon--icon-only"
  type="button"
  aria-label="tel"
>
  <svg class="amor-btn-icon__icon" role="presentation" focusable="false">
    <use xlink:href="/images/solid.svg#tty"></use>
  </svg>
</button>

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
  legend: `size`,
  name: `size`,
  labelPosition: `bottom`,
  options: [
    { label: `small`, value: `small`, },
    { label: `medium`, value: `medium`, },
    { label: `large`, value: `large`, },
  ],
})
```


### output example 

```html
<div class="amor-radio-slider" legend="size">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn6jfejfqsb1ci8"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="bn6jfejfqsb1ci8"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn6j25t4gimgh9o"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="bn6j25t4gimgh9o"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bn6j9246kh59qgg"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="bn6j9246kh59qgg"
    >
      large
    </label>
  </span>
</div>

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

+switchButton({label: 'alarm', checked: true})
```


### output example 

```html
<span class="amor-switch">
  <input
    class="amor-switch__control"
    type="checkbox"
    id="bn6vm8a9blud6pg"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="bn6vm8a9blud6pg">alarm</label>
</span>

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


