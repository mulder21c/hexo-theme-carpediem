# Pug Documentation

## button

basic button component


### path

`components/atoms/buttons/default.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.type|the value of type attribute for button|string|`button`|N|
|props.size|size of button <br> one of `small`, `medium`, `large`, `fluid`|string|`medium`|N|
|props.appearance|appearance of button <br> one of `fill`, `outline`|string|`fill`|N|



### examples

```jade
include /components/utils/util

+button({
  type: `button`,
  size: `medium`,
  appearance: `outline`,
}) button
```


### example output

```html
<button
  class="crpdm-btn-basic crpdm-btn-basic--medium crpdm-btn-basic--outline"
  type="button"
>
  button
</button>

```


---


## iconButton

icon(font awesome) button component


### path

`components/atoms/buttons/icon.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.icon|name of icon|string||Y|
|props.label|label of button|string||Y|
|props.type|the value of type attribute for button|string|`button`|N|
|props.size|size of button <br> one of `small`, `medium`, `large`|string|`medium`|N|
|props.appearance|appearance of button <br> one of `fill`, `outline`, `ghost`|string|`outline`|N|
|props.layout|layout of button <br> one of `icon-only`, `icon-text`|string|`icon-only`|N|



### examples

```jade
include /components/utils/util
include /components/atoms/svg-icon/index

+iconButton({
  icon: `tty`,
  label: `tel`,
  type: `button`,
  size: `medium`,
  appearance: `outline`,
})
```


### example output

```html
<button
  class="crpdm-btn-icon crpdm-btn-icon--medium crpdm-btn-icon--outline crpdm-btn-icon--icon-only"
  type="button"
  aria-label="tel"
>
  <svg
    class="crpdm-svg-icon crpdm-btn-icon__icon"
    focusable="false"
    aria-hidden="true"
  >
    <use xlink:href="https://www.mulder21c.io/images/solid.svg#tty"></use>
  </svg>
</button>

```


---


## category

category indicator


### path

`components/atoms/category/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.categories|sequence of category|array||Y|
|props.visibleLabel|the visible label for category|string||Y|
|props.level|the level of category to be display <br> one of `lowest`, `top`, `all`|string|`lowest`|N|
|props.useLink|whether to use link|boolean|`true`|N|
|props.separator|hierarchy separator <br> You can use icon(font awesome) name for separator|string|`>`|N|



### examples

```jade
include /components/utils/util
include /components/atoms/svg-icon/index

+category({
  categories: post.categories.toArray(),
  visibleLabel: `📂`,
  level: `top`,
  useLink: false,
  separator: `>`
})
```


### example output

```html
<span class="crpdm-category">
  <span class="crpdm-category__label" role="img" aria-label="category">📂</span>
  <span class="crpdm-category__content">mockup</span>
</span>

```


---


## cclLicense

ccl license text


### path

`components/atoms/ccl-license/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.year|the year of first publication of the work|number \| Array\<number>||N|
|props.name|the name of the owner of copyright in the work|string||N|
|props.license|the features to apply to license among `by`, `nc`, `nd`, `sa`|Array\<string>||N|
|props.version|the version of creative commons license <br> one of 1, 2, 2.5, 3, 4|number||N|



### examples

```jade
include /components/utils/util

+cclLicense({
  year: [2012, 2022],
  name: config.author,
  license: [`by`, `nc`, `nd`],
})
```


### example output

```html
<p class="crpdm-license">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-label="creative commons license"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    class="crpdm-license__icon"
  >
    <path
      fill="currentColor"
      d="m11.89 10.34l-1.34.7c-.14-.3-.31-.51-.52-.63c-.21-.12-.41-.18-.58-.18c-.9 0-1.34.59-1.34 1.77c0 .54.11.97.34 1.29c.22.32.55.48 1 .48c.58 0 .99-.27 1.23-.86l1.23.63c-.26.49-.62.87-1.09 1.15c-.46.28-.97.42-1.53.42c-.9 0-1.62-.27-2.17-.82C6.58 13.74 6.3 13 6.3 12c0-.95.28-1.7.83-2.26c.56-.56 1.26-.84 2.1-.84c1.24-.01 2.13.48 2.66 1.44m5.77 0l-1.32.7c-.14-.3-.34-.51-.53-.63c-.21-.12-.41-.18-.6-.18c-.89 0-1.34.59-1.34 1.77c0 .54.13.97.34 1.29c.23.32.56.48 1 .48c.59 0 1-.27 1.24-.86l1.25.63c-.28.49-.65.87-1.11 1.15c-.47.28-.97.42-1.52.42c-.9 0-1.63-.27-2.17-.82c-.54-.55-.81-1.29-.81-2.29c0-.95.28-1.7.83-2.26c.55-.56 1.25-.84 2.08-.84c1.26-.01 2.14.48 2.66 1.44M12 3.5a8.5 8.5 0 0 1 8.5 8.5a8.5 8.5 0 0 1-8.5 8.5A8.5 8.5 0 0 1 3.5 12A8.5 8.5 0 0 1 12 3.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
    ></path>
  </svg>
  <time class="crpdm-license__year" datetime="2012">2012</time>
  ~
  <time class="crpdm-license__year" datetime="2022">2022</time>
  <span class="crpdm-license__name">mulder21c</span>
  <span class="crpdm-license__link">
    (
    <a
      href="https://creativecommons.org/licenses/by-nc-nd/4.0"
      rel="external noreferrer noopener nofollow"
      target="_blank"
    >
      BY-NC-ND
    </a>
    )
  </span>
</p>

```


---


## checkbox

checkbox component


### path

`components/atoms/checkboxes/default.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.id|the value of checkbox's id attribute and label's for attribute <br> If not specified, an auto-generated id is assigned.|string||N|
|props.name|the value of checkbox's name attribute|string||N|
|props.label|label of checkbox <br> If do not specify this value, you must author and style label element.|string||N|
|props.checked|the checked state of checkbox|boolean|`false`|N|
|props.value|the value of checkbox's value attribute|string \| number||N|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `top`, `left`, `right`, `bottom`|string|`right`|N|
|props.labelClassName|the class name for label element|string||N|
|props.inputAttrs|the attrs for input:checkbox|object||N|



### examples

```jade
include /components/utils/util

// basic checkbox
+checkbox({
  label: `agree`,
  checked: true
})

// using block instead of label property
+checkbox({
  name: `answer`,
  value: 1
}) check label

// using separated label element
+checkbox({
  id: `no-label-checkbox`,
  checked: false,
})
label(for=`no-label-checkbox`) checkbox
```


### example output

```html
<!-- basic checkbox-->
<span class="crpdm-checkbox">
  <input
    class="crpdm-checkbox__control"
    type="checkbox"
    id="e1uebgq06hg"
    checked="checked"
  />
  <label class="crpdm-checkbox__label" for="e1uebgq06hg">agree</label>
</span>
<!-- using block instead of label property-->
<span class="crpdm-checkbox">
  <input
    class="crpdm-checkbox__control"
    type="checkbox"
    id="mrxsht0pf3h"
    name="answer"
    value="1"
  />
  <label class="crpdm-checkbox__label" for="mrxsht0pf3h">check label</label>
</span>
<!-- using separated label element-->
<span class="crpdm-checkbox">
  <input
    class="crpdm-checkbox__control"
    type="checkbox"
    id="no-label-checkbox"
  />
  <span class="crpdm-checkbox__label" aria-hidden="true"></span>
</span>
<label for="no-label-checkbox">checkbox</label>

```


---


## switchButton

switch button component


### path

`components/atoms/checkboxes/switch.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.id|the value of switch button's id attribute and label's for attribute <br> If not specified, an auto-generated id is assigned.|string||N|
|props.name|the value of switch button's name attribute|string||N|
|props.label|label of switch button <br> If do not specify this value, you must author and style label element.|string||N|
|props.checked|the check state of switch button <br> If checked then switch has on state, otherwise has off state|boolean|`false`|N|
|props.value|the value of switch button's value attribute|string \| number||N|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `left`, `right`|string|`right`|N|
|props.inputAttrs|the attrs for input:checkbox|object||N|



### examples

```jade
include /components/utils/util

// basic switch button
+switchButton({
  label: `alarm`,
  checked: true,
})

// using block instead of label property
+switchButton({
  checked: true,
}) switch button

// using separated label element
+switchButton({
  id: `no-label-switch`,
  checked: false,
})
label(for="no-label-switch") switch button
```


### example output

```html
<!-- basic switch button-->
<span class="crpdm-switch">
  <input
    class="crpdm-switch__control"
    type="checkbox"
    id="d4fs7krhfk8"
    checked="checked"
  />
  <span class="crpdm-switch__btn" aria-hidden="true"></span>
  <label class="crpdm-switch__label" for="d4fs7krhfk8">alarm</label>
</span>
<!-- using block instead of label property-->
<span class="crpdm-switch">
  <input
    class="crpdm-switch__control"
    type="checkbox"
    id="bmmycu6fimo"
    checked="checked"
  />
  <span class="crpdm-switch__btn" aria-hidden="true"></span>
  <label class="crpdm-switch__label" for="bmmycu6fimo">switch button</label>
</span>
<!-- using separated label element-->
<span class="crpdm-switch">
  <input class="crpdm-switch__control" type="checkbox" id="no-label-switch" />
  <span class="crpdm-switch__btn" aria-hidden="true"></span>
  <span class="crpdm-switch__label" aria-hidden="true"></span>
</span>
<label for="no-label-switch">switch button</label>

```


---


## datetime

datetime component


### path

`components/atoms/datetime/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.datetime|the date object|Moment||Y|
|props.id|the value of id attribute<br> If not specified, an auto-generated id is assigned.|string||N|
|props.label|the accessible name for component|string||N|
|props.format|the format of machine readable date to use as datetime attribute|string|`YYYY-MM-DD`|N|
|props.visibleLabel|the visible label for component|string||N|
|props.visibleFormat|the format of human readable date|string|`YYYY. MM. DD`|N|



### examples

```jade
include /components/utils/util

// simple
+datetime({
  datetime: moment(new Date()),
  label: `posted `,
  visibleLabel: `📆 `
})

// explicit format
+datetime({
  datetime: moment(new Date()),
  label: `posted `,
  visibleLabel: `📆 `,
  visibleFormat: `YYYY-MM-DD`,
})
```


### example output

```html
<!-- simple-->
<span class="crpdm-datetime">
  <span class="crpdm-datetime__label" role="img" aria-label="posted ">📆</span>
  <time class="crpdm-datetime__time" id="eyc1dk2qih4" datetime="2023-03-11">
    2023. 03. 11
  </time>
</span>
<!-- explicit format-->
<span class="crpdm-datetime">
  <span class="crpdm-datetime__label" role="img" aria-label="posted ">📆</span>
  <time class="crpdm-datetime__time" id="nqyg3qe0mio" datetime="2023-03-11">
    2023-03-11
  </time>
</span>

```


---


## heading

heading component


### path

`components/atoms/heading/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.level|the level(rank) of heading from 1 to 6|number||Y|
|props.htmlString|the html string as content of heading|string||N|
|props.visible|whether an element is visible or not|boolean|`true`|N|



### slots

|name|description|
|:---:|:---|
|headingSlot|the slot for heading content|



### examples

```jade
include /components/utils/util

// basic heading
+heading({ level: 1 }) heading

// using html
+heading({
  level: 1,
  htmlString: `<span>HTML heading</span>`
})

// using slot
+heading({
  level: 1,
})
  +headingSlot()
    | slot content
```


### example output

```html
<!-- basic heading-->
<h1 class="crpdm-heading--lv-1">heading</h1>
<!-- using html-->
<h1 class="crpdm-heading--lv-1"><span>HTML heading</span></h1>
<!-- using slot-->
<h1 class="crpdm-heading--lv-1">slot content</h1>

```


---


## boxyRadio

box styled radio component


### path

`components/atoms/radios/boxy.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|the value of radio's name attribute|string||Y|
|props.value|the value of radio's value attribute|string \| number||Y|
|props.id|the value of radio's id attribute and label's for attribute<br> If not specified, an auto-generated id is assigned.|string||N|
|props.label|label of radio<br> If do not specify this value, you must author and style label element.|string||N|
|props.checked|the checked state of radio|boolean|`false`|N|
|props.inputAttrs|the attrs for input:radio|object||N|



### examples

```jade
include /components/utils/util

// using label property
+boxyRadio({
  name: `answer`,
  value: 1,
  label: `boxy radio`
})

// using block instead of label property
+boxyRadio({
  name: `answer`,
  value: 1
})
  boxy radio
```


### example output

```html
<!-- using label property-->
<label class="crpdm-radio-boxy">
  <input
    class="crpdm-radio-boxy__control"
    type="radio"
    id="gemw2z1bnn4"
    name="answer"
    value="1"
  />
  <span class="crpdm-radio-boxy__box">boxy radio</span>
</label>
<!-- using block instead of label property-->
<label class="crpdm-radio-boxy">
  <input
    class="crpdm-radio-boxy__control"
    type="radio"
    id="j80adt7ne96"
    name="answer"
    value="1"
  />
  <span class="crpdm-radio-boxy__box"><boxy>radio</boxy></span>
</label>

```


---


## radio

basic input radio component


### path

`components/atoms/radios/default.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|the value of radio's name attribute|string||Y|
|props.value|the value of radio's value attribute|string \| number||Y|
|props.id|the value of radio's id attribute and label's for attribute<br> If not specified, an auto-generated id is assigned.|string||N|
|props.label|label of radio<br> If do not specify this value, you must author and style label element.|string||N|
|props.checked|the checked state of radio|boolean||N|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `top`, `left`, `right`, `bottom`|string|`right`|N|
|props.labelClassName|the class name for label element|string \| Array\<string>||N|
|props.inputAttrs|the attrs for input:radio|object||N|



### examples

```jade
include /components/utils/util

// basic radio
+radio({label: `yes`, name: `answer`, value: 1})

// using block instead of label property
+radio({name: `answer`, value: 1}) radio button

// using separated label element
+radio({name: `answer`, id: `no-label`, value: 1})
label(for=`no-label`) radio button
```


### example output

```html
<!-- basic radio-->
<span class="crpdm-radio">
  <input
    class="crpdm-radio__control"
    type="radio"
    id="rt59lctmm21"
    name="answer"
    value="1"
  />
  <label class="crpdm-radio__label" for="rt59lctmm21">yes</label>
</span>
<!-- using block instead of label property-->
<span class="crpdm-radio">
  <input
    class="crpdm-radio__control"
    type="radio"
    id="cuvlk2cn18d"
    name="answer"
    value="1"
  />
  <label class="crpdm-radio__label" for="cuvlk2cn18d">radio button</label>
</span>
<!-- using separated label element-->
<span class="crpdm-radio">
  <input
    class="crpdm-radio__control"
    type="radio"
    id="no-label"
    name="answer"
    value="1"
  />
  <span class="crpdm-radio__label" aria-hidden="true"></span>
</span>
<label for="no-label">radio button</label>

```


---


## svgIcon

svg icon component with font awesome


### path

`components/atoms/svg-icon/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|name of icon|string||Y|
|props.type|type of icon|string||N|



### examples

```jade
include /components/utils/util

+svgIcon({name: `thumbs-up`})
```


### example output

```html
<svg class="crpdm-svg-icon" focusable="false">
  <use xlink:href="https://www.mulder21c.io/images/solid.svg#thumbs-up"></use>
</svg>

```


---


## textbox

input textbox component


### path

`components/atoms/textbox/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.id|the value of textbox's id attribute and label's for attribute <br> If not specified, an auto-generated id is assigned.|string||N|
|props.name|the value of textbox's name attribute|string||N|
|props.value|the value of textbox's value attribute|string||N|
|props.placeholder|the placeholder of textbox|string||N|
|props.type|the value of type attribute for textbox|string|`text`|N|
|props.size|size of textbox <br> one of `small`, `medium`, `large`, `'fluid`|string|`medium`|N|



### examples

```jade
include /components/utils/util

+textbox({
  type: `text`,
  size: `medium`,
})
```


### example output

```html
<input class="crpdm-textbox crpdm-textbox--medium" id="frnijzco7sg" type="text" />

```


---


## watermark

watermark for theme


### path

`components/atoms/watermark/index.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.hexo|whether to display tool for generating as hexo|boolean|true|N|



### examples

```jade
include /components/utils/util

+watermark()
```


### example output

```html
<p class="crpdm-watermark">
  Powered by
  <a href="https://hexo.io/" rel="external noreferrer" target="_blank">Hexo.</a>
  Theme by
  <a
    href="https://github.com/mulder21c"
    rel="external noreferrer"
    target="_blank"
  >
    mulder21c.
  </a>
</p>

```


---
