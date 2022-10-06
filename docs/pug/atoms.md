# Pug Documentation 

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
    id="l223-eawffpqkbgfj0m57ajg"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="l223-eawffpqkbgfj0m57ajg">alarm</label>
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
    id="F223-nit13eqt5v97lkom0i"
    checked="checked"
  />
  <span class="amor-switch__btn" aria-hidden="true"></span>
  <label class="amor-switch__label" for="F223-nit13eqt5v97lkom0i">
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
|props.inputAttrs|the attrs for input:radio|object||true|



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
    id="v22h-ypcdto8i7tq1fs53d9g"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="v22h-ypcdto8i7tq1fs53d9g">yes</label>
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
    id="S22i-7y0z91fuavq0sqa0i9g"
    name="answer"
    value="1"
  />
  <label class="amor-radio__label" for="S22i-7y0z91fuavq0sqa0i9g">
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
    id="N22u-48sqq5bb570cot2jbr"
    datetime="2022-10-06"
  >
    2022. 10 .06
  </time>
</span>
<!-- explicit format-->
<span class="amor-datetime">
  <span class="amor-datetime__label" role="img" aria-label="posted ">📆</span>
  <time
    class="amor-datetime__time"
    id="z22u-jmyuj0aykf2blq5ge28"
    datetime="2022-10-06"
  >
    2022-10-06
  </time>
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


## watermark

watermark for theme


### path 

`components/atoms/watermark/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.hexo|whether to display tool for generating as hexo|boolean||true|



### examples

```jade
include ../../utils/util

+watermark()
```


### output example 

```html
<p class="amor-watermark">
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
      <span>cate-aajvpr77ts3qcio</span>
    </span>
    <span class="amor-category__separator" aria-hidden="true">&gt;</span>
    <span class="amor-category__content" role="listitem">
      <span>cate-aajv829k5jb9qp</span>
    </span>
    <span class="amor-category__separator" aria-hidden="true">&gt;</span>
    <span class="amor-category__content" role="listitem">
      <span>cate-aajvtugglgvose</span>
    </span>
  </span>
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
    id="k246-s8uapolojfa4a6fo6so"
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
    id="N247-2epab686fpuq6ih89p8"
    name="answer"
    value="1"
  />
  <span class="amor-radio-boxy__box"><boxy>radio</boxy></span>
</label>

```


---


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
|props.inputAttrs|the attrs for input:checkbox|object||true|



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
    id="V251-w3dtnwclcfop1rli4a"
    checked="checked"
  />
  <label class="amor-checkbox__label" for="V251-w3dtnwclcfop1rli4a">
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
    id="U252-64kun5p6hka2f6dlfm"
    name="answer"
    value="1"
  />
  <label class="amor-checkbox__label" for="U252-64kun5p6hka2f6dlfm">
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


## cclLicense

create ccl license text for footer


### path 

`components/atoms/ccl-license/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.year|of first publication of the work|string||true|
|props.name|the name of the owner of copyright in the work|string||true|
|props.license|the features to apply to license|array||true|
|props.version|the version of creative commons license|number||true|



### examples

```jade
include ../../utils/util

+cclLicense({
  name: config.author,
  year: [2012, 2022],
  license: [`by`, `nc`, `nd`],
})
```


### output example 

```html
<p class="amor-license">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-label="creative commons license"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    class="amor-license__icon"
  >
    <path
      fill="currentColor"
      d="m11.89 10.34l-1.34.7c-.14-.3-.31-.51-.52-.63c-.21-.12-.41-.18-.58-.18c-.9 0-1.34.59-1.34 1.77c0 .54.11.97.34 1.29c.22.32.55.48 1 .48c.58 0 .99-.27 1.23-.86l1.23.63c-.26.49-.62.87-1.09 1.15c-.46.28-.97.42-1.53.42c-.9 0-1.62-.27-2.17-.82C6.58 13.74 6.3 13 6.3 12c0-.95.28-1.7.83-2.26c.56-.56 1.26-.84 2.1-.84c1.24-.01 2.13.48 2.66 1.44m5.77 0l-1.32.7c-.14-.3-.34-.51-.53-.63c-.21-.12-.41-.18-.6-.18c-.89 0-1.34.59-1.34 1.77c0 .54.13.97.34 1.29c.23.32.56.48 1 .48c.59 0 1-.27 1.24-.86l1.25.63c-.28.49-.65.87-1.11 1.15c-.47.28-.97.42-1.52.42c-.9 0-1.63-.27-2.17-.82c-.54-.55-.81-1.29-.81-2.29c0-.95.28-1.7.83-2.26c.55-.56 1.25-.84 2.08-.84c1.26-.01 2.14.48 2.66 1.44M12 3.5a8.5 8.5 0 0 1 8.5 8.5a8.5 8.5 0 0 1-8.5 8.5A8.5 8.5 0 0 1 3.5 12A8.5 8.5 0 0 1 12 3.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
    ></path>
  </svg>
  <time class="amor-license__year" datetime="2012">2012</time>
  <time class="amor-license__year" datetime="2022">~ 2022</time>
  <span class="amor-license__name">John Doe</span>
  <span class="amor-license__link">
    (
    <a
      href="https://creativecommons.org/licenses/by-nc-nd/4.0"
      rel="external noreferrer"
      target="_blank"
    >
      BY-NC-ND
    </a>
    )
  </span>
</p>

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


