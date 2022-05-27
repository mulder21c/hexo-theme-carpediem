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
|options.label|label of radio<br> If do not specify this value, you must author and style label element.|string||true|
|props.id|the value of radio's id attribute and label's for attribute|string||true|
|props.checked|the checked state of radio|boolean||true|
|props.inputAttrs|the attrs for input:radio|object||true|



### examples

```jade
include ../../utils/util

// label property
+boxyRadio({name: 'answer', value: 1, label: 'boxy radio' })
// label from block
+boxyRadio({name: 'answer', value: 1 })
  boxy radio
```


### output example 

```html
<!-- label property-->
<label class="amor-radio-boxy">
  <input
    class="amor-radio-boxy__control"
    type="radio"
    id="tppdtf1a22p60ag"
    name="answer"
    value="1"
  />
  <span class="amor-radio-boxy__box">boxy radio</span>
</label>
<!-- label from block-->
<label class="amor-radio-boxy">
  <input
    class="amor-radio-boxy__control"
    type="radio"
    id="tppdldjr6hcl03o"
    name="answer"
    value="1"
  />
  <span class="amor-radio-boxy__box"><boxy>radio</boxy></span>
</label>

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
|props.value|the value of switch button|undefined||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'left'`, `'right'`|string|'right'|true|
|props.inputAttrs|the attrs for input:checkbox|object||true|



### examples

```jade
include ../../utils/util

// basic
+switchButton({label: 'alarm', checked: true})
// using block instead of label property
+switchButton({label: 'alarm', checked: true}) switch button
// using separated label element
+switchButton({ checked: false, id: `no-label-switch`})
label(for="no-label-switch") switch button
```


### output example 

```html
<!-- basic-->
<span class="amor-switch">
  <input
    class="amor-switch__control"
    type="checkbox"
    id="tpq14v6ohjmheno"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="tpq14v6ohjmheno">alarm</label>
</span>
<!-- using block instead of label property-->
<span class="amor-switch">
  <input
    class="amor-switch__control"
    type="checkbox"
    id="tpq1b6cc7aj5fjo"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="tpq1b6cc7aj5fjo">
    alarmswitch button
  </label>
</span>
<!-- using separated label element-->
<span class="amor-switch">
  <input class="amor-switch__control" type="checkbox" id="no-label-switch" />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <span class="amor-switch__label" aria-hidden="true"></span>
</span>
<label for="no-label-switch">switch button</label>

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
|props.label|label of checkbox <br>If do not specify this value, you should provide label as block or separated label element|string||true|
|props.checked|the checked state of checkbox|boolean||true|
|props.value|the value of checkbox|undefined||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|
|props.labelClassName|the class name for label element|string||true|



### examples

```jade
include ../../utils/util

// basic
+checkbox({label: 'agree', checked: true})
// using block instead of label property
+checkbox({name: 'answer', value: 1}) check label
// using separated label element
+checkbox({ checked: false, id: "no-label-checkbox"})
label(for="no-label-checkbox") checkbox
```


### output example 

```html
<!-- basic-->
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="tpr24shbtcnfin8"
    checked="checked"
  />
  <label class="amor-checkbox__label" for="tpr24shbtcnfin8">agree</label>
</span>
<!-- using block instead of label property-->
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="tpr3ehub45cds2o"
    name="answer"
    value="1"
  />
  <label class="amor-checkbox__label" for="tpr3ehub45cds2o">check label</label>
</span>
<!-- using separated label element-->
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="no-label-checkbox"
  />
  <span class="amor-checkbox__label" aria-hidden="true"></span>
</span>
<label for="no-label-checkbox">checkbox</label>

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



### slots 

|name|description|
|:---:|:---|
|accordionHeadingSlot|the slot for heading of accordion item|
|accordionPanelSlot|the slot for panel of accordion item|



### examples

```jade
include ../../utils/util
include ../../atoms/heading/index.pug
include ../../atoms/svg-icon/index.pug

+accordion({hLevel: 2, activatedIndex: 1})
  +accordionHeadingSlot heading 1
  +accordionPanelSlot panel 1
  +accordionHeadingSlot heading 2
  +accordionPanelSlot panel 2
  +accordionHeadingSlot heading 3
  +accordionPanelSlot panel 3
```


### output example 

```html
<div class="amor-accordion" id="tpuf1jvspfq3qd8" data-init-activate="1">
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-tpuf6ikdh62n6jg"
      aria-expanded="false"
      aria-controls="accordion-panel-tpuf6ikdh62n6jg"
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
    id="accordion-panel-tpuf6ikdh62n6jg"
    role="region"
    aria-labelledby="accordion-heading-tpuf6ikdh62n6jg"
    hidden="hidden"
  >
    panel 1
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-tpugdd0e19hfq5"
      aria-expanded="true"
      aria-controls="accordion-panel-tpugdd0e19hfq5"
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
    id="accordion-panel-tpugdd0e19hfq5"
    role="region"
    aria-labelledby="accordion-heading-tpugdd0e19hfq5"
  >
    panel 2
  </div>
  <h2 class="amor-heading--level-2 amor-accordion__header">
    <button
      class="amor-accordion__tab"
      type="button"
      id="accordion-heading-tpugo9q8qepp6n8"
      aria-expanded="false"
      aria-controls="accordion-panel-tpugo9q8qepp6n8"
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
    id="accordion-panel-tpugo9q8qepp6n8"
    role="region"
    aria-labelledby="accordion-heading-tpugo9q8qepp6n8"
    hidden="hidden"
  >
    panel 3
  </div>
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
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|`right`|true|



### slots 

|name|description|
|:---:|:---|
|radioGroupLabelSlot|the slot for label. the number of slots must be equal to number of option items|



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
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv0klhut9be3q"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="tpv0klhut9be3q">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv1lt85gvp7qd8"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="tpv1lt85gvp7qd8">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv10iii879d5vg"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="tpv10iii879d5vg">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv17tbhaaa4f5g"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="tpv17tbhaaa4f5g">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv1vug5b254ua8"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="tpv1vug5b254ua8">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv1u705elb4ec"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="tpv1u705elb4ec">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv1dknu8s3r3qo"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="tpv1dknu8s3r3qo">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tpv14irqas5gm1o"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="tpv14irqas5gm1o">
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
|radioBoxesLabelSlot|the slot for label. the number of slots must be equal to number of option items|



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
      id="tpvfsjfj0r00ipg"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tpvfpdj2rct38u"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tpvgl9ram2sv89o"
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
      id="tpvggdvo7be09b8"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tpvgd7ha0an8emg"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tpvg4fbqj4klvq"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
</div>

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
|options.label|label of radio<br>If do not specify this value, you should provide label as block or separated label element|string||true|
|options.id|the value of radio's id attribute and label's for attribute|string||true|
|options.checked|the checked state of radio|boolean||true|
|options.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|
|props.labelClassName|the class name for label element|string||true|



### examples

```jade
include ../../utils/util

// basic
+radio({label: 'yes', name: 'answer', value: 1})
// using block instead of label property
+radio({name: 'answer', value: 1}) radio button
// using separated label element
+radio({name: 'answer', id: "no-label", value: 1})
label(for="no-label") radio button
```


### output example 

```html
<!-- basic-->
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="tpvr1n33d3v66h"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="tpvr1n33d3v66h">yes</label>
</span>
<!-- using block instead of label property-->
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="tpvr4s76s4hvpg"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="tpvr4s76s4hvpg">radio button</label>
</span>
<!-- using separated label element-->
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="no-label"
    name="answer"
    value="1"
  />
  <span class="amor-radio__label" aria-hidden="true"></span>
</span>
<label for="no-label">radio button</label>

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
|radioSliderLabelSlot|the slot for label. the number of slots must be equal to number of option items|



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
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tq08cpo71ipgnpo"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="tq08cpo71ipgnpo"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tq08b7caodktfdg"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="tq08b7caodktfdg"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tq08q7f3nn7du7"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="tq08q7f3nn7du7"
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
      id="tq098jv4d5pm73"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="tq098jv4d5pm73"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tq09oq3otec5otg"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="tq09oq3otec5otg"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="tq09dcl4vkl7hng"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="tq09dcl4vkl7hng"
    >
      large
    </label>
  </span>
</div>

```


---


