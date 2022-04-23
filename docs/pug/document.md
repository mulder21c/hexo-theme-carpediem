# Pug Documentation 

## button

create basic button element


### path 

`components/atoms/buttons/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|options||object||false|
|options.type|the value of type attribute for button|string|'button'|true|
|options.size|size of button <br> one of `'small'`, `'medium'`, `'large'`, `'fluid'`|string|'medium'|true|
|options.appearance|appearance of button <br> one of `'fill'`, `'outline'`|string|'fill'|true|



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


## iconButton

create icon button element


### path 

`components/atoms/buttons/icon.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|options||object||false|
|options.name|name of icon|string||false|
|options.label|label of button|string||false|
|options.type|the value of type attribute for button|string|'button'|true|
|options.size|size of button- size of button <br> one of `'small'`, `'medium'`, `'large'``|string|'medium'|true|
|options.appearance|appearance of button <br> one of `'fill'`, `'outline'`, `'ghost'`|string|'outline'|true|
|options.layout|layout of button <br> one of `'icon-only', `icon-text``|string|`icon-only`|true|



### examples

```jade
include ../../utils/util

+iconButton({type: 'button', size: 'medium', appearance: 'outline', name: 'tty', label: '전화'})
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


## checkbox

create input checkbox element


### path 

`components/atoms/checkboxes/default.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|options||object||false|
|options.name|the value of checkbox's name attribute|string||true|
|options.id|the value of checkbox's id attribute and label's for attribute <br> If not specified, an auto-generated id is assigned.|string||true|
|options.label|label of checkbox <br> If do not specify this value, you must author and style label element.|string||true|
|options.checked|the checked state of checkbox|boolean||true|
|options.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|



### examples

```jade
include ../../utils/util

+checkbox({label: '동의', checked: true})
```


### output example 

```html
<input
  class="amor-checkbox__control"
  type="checkbox"
  id="rvo83dcbkg7bn8g"
  checked="checked"
/>
<label class="amor-checkbox__label" for="rvo83dcbkg7bn8g">label</label>

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
|options.label|label of radio<br> If do not specify this value, you must author and style label element.|string||true|
|options.id|the value of radio's id attribute and label's for attribute|string||true|
|options.checked|the checked state of radio|boolean||true|
|options.value|the value of radio|string||true|
|options.labelPosition|Where the label is located relative to the visual indicator<br>One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|'right'|true|



### examples

```jade
include ../../utils/util

+radio({label: 'yes', name: 'answer',  checked: true})
```


### output example 

```html
<input
  class="amor-radio__control"
  type="radio"
  id="rvolg0qtrhrt6o8"
  name="answer"
  checked="checked"
/>
<label class="amor-radio__label" for="rvolg0qtrhrt6o8">label</label>

```


---


