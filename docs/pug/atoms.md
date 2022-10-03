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

+iconButton({
  type: 'button',
  size: 'medium',
  appearance: 'outline',
  icon: 'tty',
  label: 'tel'
})
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


## category

create category indicator


### path 

`components/atoms/category/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.category|sequence of category|array||false|
|props.level|the level of category to be display <br> one of `'lowest'`, `'top'`, `'all'`|boolean|`lowest`|true|
|props.visibleLabel|the visible label for category|string||false|



### examples

```jade
include ../../utils/util
include ../svg-icon/index

+category({
  categories,
  visibleLabel: '📂',
  useLink: false,
  class: `post-card__meta__item`,
  level: `all`,
  separator: `>`
})
```


### output example 

```html
<span class="amor-category post-card__meta__item">
  <span
    class="amor-category__label"
    role="img"
    aria-label="i18n(label.category)"
  >
    📂
  </span>
  <span class="amor-category__list" role="list">
    <span class="amor-category__content" role="listitem">
      <span>cate-0c8o1t7ep9bhgi8</span>
    </span>
    <span class="amor-category__separator" aria-hidden="true">&gt;</span>
    <span class="amor-category__content" role="listitem">
      <span>cate-0c8ofbn713spkng</span>
    </span>
    <span class="amor-category__separator" aria-hidden="true">&gt;</span>
    <span class="amor-category__content" role="listitem">
      <span>cate-0c8oq8os2jp2pt8</span>
    </span>
  </span>
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
|props.label|label of checkbox <br> If do not specify this value, you should provide label as block or separated label element|string||true|
|props.checked|the checked state of checkbox|boolean||true|
|props.value|the value of checkbox|undefined||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|
|props.labelClassName|the class name for label element|string||true|



### examples

```jade
include ../../utils/util

// basic
+checkbox({
  label: 'agree',
  checked: true
})
// using block instead of label property
+checkbox({
  name: 'answer',
  value: 1
}) check label
// using separated label element
+checkbox({
  checked: false,
  id: "no-label-checkbox"
})
label(for="no-label-checkbox") checkbox
```


### output example 

```html
<!-- basic-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`checkboxes`);
</script>
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="plx-ccxdlxz6fon7gai37ng"
    checked="checked"
  />
  <label class="amor-checkbox__label" for="plx-ccxdlxz6fon7gai37ng">
    agree
  </label>
</span>
<!-- using block instead of label property-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`checkboxes`);
</script>
<span class="amor-checkbox">
  <input
    class="amor-checkbox__control"
    type="checkbox"
    id="Plx-pewm73lv80ck8ork6ssg"
    name="answer"
    value="1"
  />
  <label class="amor-checkbox__label" for="Plx-pewm73lv80ck8ork6ssg">
    check label
  </label>
</span>
<!-- using separated label element-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`checkboxes`);
</script>
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
+switchButton({
  label: 'alarm',
  checked: true
})
// using block instead of label property
+switchButton({
  label: 'alarm',
  checked: true
}) switch button
// using separated label element
+switchButton({
  checked: false,
  id: `no-label-switch`
})
label(for="no-label-switch") switch button
```


### output example 

```html
<!-- basic-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`switch`);
</script>
<span class="amor-switch">
  <input
    class="amor-switch__control"
    type="checkbox"
    id="Aml-fmov9xumaf87lttmfrlo"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="Aml-fmov9xumaf87lttmfrlo">alarm</label>
</span>
<!-- using block instead of label property-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`switch`);
</script>
<span class="amor-switch">
  <input
    class="amor-switch__control"
    type="checkbox"
    id="Dml-nl0e4bsfq2klp9gtkd5"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="Dml-nl0e4bsfq2klp9gtkd5">
    alarmswitch button
  </label>
</span>
<!-- using separated label element-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`switch`);
</script>
<span class="amor-switch">
  <input class="amor-switch__control" type="checkbox" id="no-label-switch" />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <span class="amor-switch__label" aria-hidden="true"></span>
</span>
<label for="no-label-switch">switch button</label>

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


## datetime

create time element


### path 

`components/atoms/datetime/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.datetime|the date object|Date||false|
|props.format|the format of machine readable date to use as datetime attribute|string||true|
|props.visibleFormat|the format of human readable date|string||true|
|props.label|the accessible name for date|string||true|
|props.visibleLabel|the visible label for date|string||true|
|props.id|the value of id attribute|string||true|



### examples

```jade
include ../../utils/util

// simple
+datetime({
  datetime: new Date(),
  label: 'posted ',
  visibleLabel: '📆 '
})
// explicit format
+datetime({
  datetime: new Date(),
  label: 'posted ',
  visibleLabel: '📆 ',
  format: 'yyyy-MM-dd',
  visibleFormat: 'yyyy-MM-dd',
})
```


### output example 

```html
<!-- simple-->
<span class="amor-datetime">
  <span class="amor-datetime__label" role="img" aria-label="posted ">📆</span>
  <time
    class="amor-datetime__time"
    id="fnf-6t4zd6u2bkujj9dpmtg"
    datetime="2022-10-02"
  >
    2022. 10 .02
  </time>
</span>
<!-- explicit format-->
<span class="amor-datetime">
  <span class="amor-datetime__label" role="img" aria-label="posted ">📆</span>
  <time
    class="amor-datetime__time"
    id="Jng-7nylo9jc5df2tcnu1uo"
    datetime="2022-10-02"
  >
    2022-10-02
  </time>
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
|props.label|label of radio<br> If do not specify this value, you must author and style label element.|string||true|
|props.id|the value of radio's id attribute and label's for attribute|string||true|
|props.checked|the checked state of radio|boolean||true|
|props.inputAttrs|the attrs for input:radio|object||true|



### examples

```jade
include ../../utils/util

// label property
+boxyRadio({
  name: 'answer',
  value: 1,
  label: 'boxy radio'
})
// label from block
+boxyRadio({
  name: 'answer',
  value: 1
})
  boxy radio
```


### output example 

```html
<!-- label property-->
<label class="amor-radio-boxy">
  <input
    class="amor-radio-boxy__control"
    type="radio"
    id="ynv-47r6mtuibodjm15cb28"
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
    id="Tnv-f5oqpr30r0qa10sndi88"
    name="answer"
    value="1"
  />
  <span class="amor-radio-boxy__box"><boxy>radio</boxy></span>
</label>

```


---


## radio

create input radio element


### path 

`components/atoms/radios/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.name|name of radio|string||false|
|props.value|the value of radio|string,number,boolean||false|
|props.label|label of radio<br> If do not specify this value, you should provide label as block or separated label element|string||true|
|props.id|the value of radio's id attribute and label's for attribute|string||true|
|props.checked|the checked state of radio|boolean||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|
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
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`radio`);
</script>
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="koh-xnymzbwcsj1olbt71mo"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="koh-xnymzbwcsj1olbt71mo">yes</label>
</span>
<!-- using block instead of label property-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`radio`);
</script>
<span class="amor-radio">
  <input
    class="amor-radio__control"
    type="radio"
    id="koi-ds5i41xqego74hs6f7o"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="koi-ds5i41xqego74hs6f7o">
    radio button
  </label>
</span>
<!-- using separated label element-->
<script async="async" data-pug="data-pug">
  window.usedComponents = window.usedComponents || new Set();
  usedComponents.add(`radio`);
</script>
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

