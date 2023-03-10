# Pug Documentation 

## articleCard

article card component


### path 

`components/molecules/article-card/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.post|hexo post object @see https://hexo.io/docs/variables.html#Page-Variables|object||Y|
|props.isLink|Whether to operate the card as a link|boolean|false|N|



### examples

```jade
include /components/utils/util
include /components/atoms/datetime/index
include /components/atoms/category/index

+articleCard({post, isLink: true})
```


### example output 

```html
<div
  class="amor-article-card amor-article-card--no-thumb amor-article-card--link"
>
  <a
    class="amor-article-card__heading"
    href="https://www.mulder21c.io/lorem-ipsum/"
    aria-describedby="va0wac5kjg8 c17p7heng0k"
  >
    Lorem Ipsum
  </a>
  <div class="amor-article-card__meta" id="va0wac5kjg8">
    <span class="amor-datetime amor-article-card__meta__item">
      <span class="amor-datetime__label" role="img" aria-label="published">
        📆
      </span>
      <time class="amor-datetime__time" id="d7u2sqk3vug" datetime="2000-01-01">
        2000. 01. 01
      </time>
    </span>
    <span class="amor-category amor-article-card__meta__item">
      <span class="amor-category__label" role="img" aria-label="category">
        📂
      </span>
      <span class="amor-category__list" role="list">
        <span class="amor-category__content" role="listitem">
          <span>document</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-article-card__content" id="c17p7heng0k">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis
    lacus, pharetra posuere tincidunt eu, vulputate eget ex. Lorem ipsum dolor
    sit amet, consectetur adipiscing elit. Quisque accumsan in ligula in
    pulvinar. Nulla dapibus orci a ipsum consectetur, quis convallis velit
    tincidunt.
  </p>
</div>

```


---


## articleMeta

meta info component for article


### path 

`components/molecules/article-meta/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.categories|sequence of category|object||Y|
|props.date|published date of article|Moment||Y|
|props.updated|updated date of article|Moment||Y|



### examples

```jade
include /components/utils/util
include /components/atoms/category/index
include /components/atoms/datetime/index

+articleMeta({
  categories: post.categories.toArray(),
  date: post.date,
  updated: post.updated,
})
```


### example output 

```html
<div class="amor-article-meta">
  <span class="amor-category amor-article-meta__categories">
    <span class="amor-category__label" role="img" aria-label="category">
      📂
    </span>
    <span class="amor-category__list" role="list">
      <span class="amor-category__content" role="listitem">
        <a href="https://www.mulder21c.io/categories/document/">document</a>
      </span>
    </span>
  </span>
  <span class="amor-datetime amor-article-meta__date">
    <span class="amor-datetime__label" role="img" aria-label="published">
      📆
    </span>
    <time class="amor-datetime__time" id="q733831sink" datetime="2000-01-01">
      2000. 01. 01
    </time>
  </span>
</div>

```


---


## articleAuthor

introducing author


### path 

`components/molecules/author/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.gravatar|the path or url for gravatar|string|`/images/author.svg`|N|
|props.name|the name of author|string||N|
|props.description|the description for author|string||N|
|props.social|the social links for author|string||N|



### examples

```jade
include /components/utils/util
include /components/atoms/svg-icon/index

+articleAuthor({
  name: config.author,
  gravatar: theme.profile.gravatar,
  description: theme.profile.description,
  social: theme.profile.social,
})
```


### example output 

```html
<div class="amor-author amor-author--no-desc">
  <span class="amor-author__gravatar">
    <img src="https://www.mulder21c.io/images/author.svg" alt="" role="none" />
  </span>
  <p class="amor-author__name">mulder21c</p>
  <div class="amor-author__social">
    <a class="amor-author__social__link" href="/rss.xml" aria-label="rss">
      <svg
        class="amor-svg-icon amor-author__social__icon amor-author__social__icon--rss"
        focusable="false"
        role="presentation"
      >
        <use xlink:href="https://www.mulder21c.io/images/solid.svg#rss"></use>
      </svg>
    </a>
  </div>
</div>

```


---


## fieldset

group containing label and body


### path 

`components/molecules/fieldset/default.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.direction|how items are placed in the container <br>One of `row`, `column`|string|row|N|
|props.alignItem|alignment of items on the cross axis <br>One of `start`, `center`|string|start|N|
|props.labelWidthRatio|the factor of label's width in the container|integer|3|N|
|props.labelSlotClassName|the class name of label slot's container|string \| Array\<string>||N|
|props.bodySlotClassName|the class name of body slot's container|string \| Array\<string>||N|
|props.labelSlotAttrs|the attributes of label slot's container|object||N|
|props.bodySlotAttrs|the attributes of body slot's container|object||N|



### slots 

|name|description|
|:---:|:---|
|fieldsetLabelSlot|the slot for label of fieldset|
|fieldsetBodySlot|the slot for body of fieldset|



### examples

```jade
include /components/utils/util

// row
+fieldset({direction: `row`})
  +fieldsetLabelSlot label
  +fieldsetBodySlot
    p body

// column
+fieldset({direction: `column`})
  +fieldsetLabelSlot label
  +fieldsetBodySlot
    p body
```


### example output 

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="pqqbe9i5bg4"
>
  <div class="amor-field__label amor-field__label--30" id="pqqbe9i5bg4">
    label
  </div>
  <div class="amor-field__body"><p>body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="kgrkc9h7p38"
>
  <div class="amor-field__label amor-field__label--30" id="kgrkc9h7p38">
    label
  </div>
  <div class="amor-field__body"><p>body</p></div>
</div>

```


---


## categoryNavigation

category list in navigation


### path 

`components/molecules/navigation/category/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|@see https://hexo.io/ko/docs/helpers#list-categories|object||N|



### examples

```jade
include /components/utils/util

+categoryNavigation()
```


### example output 

```html
<nav class="amor-category-nav" aria-label="categories">
  <ul class="amor-category-nav__list">
    <li class="amor-category-nav__list__item">
      <a
        href="https://www.mulder21c.io/categories/document/"
        class="amor-category-nav__list__link"
      >
        document
      </a>

      <ul class="amor-category-nav__list amor-category-nav__list--child">
        <li class="amor-category-nav__list__item">
          <a
            href="https://www.mulder21c.io/categories/document/mockup/"
            class="amor-category-nav__list__link"
          >
            mockup
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>

```


---


## linksNavigation

external links list in navigation


### path 

`components/molecules/navigation/links/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|the options for external link list|object||N|
|props.options.transform|the function that changes the display of link name|function||N|



### examples

```jade
include /components/utils/util

+linksNavigation()
```


### example output 

```html
<nav class="amor-links-nav" aria-label="links">
  <ul class="amor-links-nav__list">
    <li class="amor-links-nav__list__item">
      <a
        href="https://my-portfolio.com"
        class="amor-links-nav__list__link"
        target="_blank"
        rel="noopener"
      >
        portfolio
      </a>
    </li>

    <li class="amor-links-nav__list__item">
      <a
        href="https://my-works.com"
        class="amor-links-nav__list__link"
        target="_blank"
        rel="noopener"
      >
        works
      </a>
    </li>
  </ul>
</nav>

```


---


## menuNavigation

menu list in navigation


### path 

`components/molecules/navigation/menu/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|the options for menu list|object||N|
|props.options.transform|the function that changes the display of menu name|function||N|



### examples

```jade
include /components/utils/util

+menuNavigation()
```


### example output 

```html
<nav class="amor-menu-nav" aria-label="menu">
  <ul class="amor-menu-nav__list">
    <li class="amor-menu-nav__list__item">
      <a
        href="https://www.mulder21c.io/archives"
        class="amor-menu-nav__list__link"
      >
        Archives
      </a>
    </li>
  </ul>
</nav>

```


---


## radioBoxes

boxy radio group component


### path 

`components/molecules/radio-group/boxy.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|the name attribute of radio|string||Y|
|props.options|the array that consists of options for radio component|array||Y|



### slots 

|name|description|
|:---:|:---|
|radioBoxesLabelSlot|the slot for label. <br>the number of slots must be equal to number of option items|



### examples

```jade
include /components/utils/util
include /components/atoms/radios/boxy

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


### example output 

```html
<!-- basic-->
<div class="amor-radio-boxes">
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="awnun6tsg2o"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="obgq7bdah08"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="tzpq260kka5"
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
      id="v1uebg9edco"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="w7bg1htldto"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="fbvalspuc0g"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
</div>

```


---


## radioGroup

basic radio group component


### path 

`components/molecules/radio-group/default.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|the name attribute of radio|string||Y|
|props.options|the array that consists of options for radio component without name and labelPosition|array||Y|
|props.columns|column counts|number||N|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `top`, `left`, `right`, `bottom`|string|`right`|N|



### slots 

|name|description|
|:---:|:---|
|radioGroupLabelSlot|the slot for label.the number of slots must be equal to number of option items|



### examples

```jade
include /components/utils/util
include /components/atoms/radios/default

// basic
+radioGroup({
  name: `job`,
  labelPosition: `right`,
  options: [
    { label: `Web Designer`, value: `designer`, },
    { label: `Web Front-End Developer`, value: `frontend`, },
    { label: `Web Back-End Developer`, value: `backend`, },
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
    { value: `frontend`, },
    { value: `backend`, }
  ],
})
  +radioGroupLabelSlot Web Designer
  +radioGroupLabelSlot Web Front-End Developer
  +radioGroupLabelSlot Web Back-End Developer
```


### example output 

```html
<!-- basic-->
<div class="amor-radio-group">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="uqdw83v4h28"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="uqdw83v4h28">Web Designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="e84kuh8d8vg"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="e84kuh8d8vg">
      Web Front-End Developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="l3kqa63efmg"
      name="job"
      value="backend"
    />
    <label class="amor-radio__label" for="l3kqa63efmg">
      Web Back-End Developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="omgqrrct35o"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="omgqrrct35o">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="pxp45nr5qr8"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="pxp45nr5qr8">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="n6e8vrnbadg"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="n6e8vrnbadg">Web Designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ulhmhn0c4e8"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="ulhmhn0c4e8">
      Web Front-End Developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="mxgrc8930m4"
      name="job2"
      value="backend"
    />
    <label class="amor-radio__label" for="mxgrc8930m4">
      Web Back-End Developer
    </label>
  </span>
</div>

```


---


## radioSlider

radio slider component


### path 

`components/molecules/radio-group/slider.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|the name attribute of radio|string||Y|
|props.options|the array that consists of options for radio component|array||Y|
|props.labelPosition|Where the label is located relative to the visual indicator<br>One of `top`, `bottom`|string|`bottom`|N|



### slots 

|name|description|
|:---:|:---|
|radioSliderLabelSlot|the slot for label.the number of slots must be equal to number of option items|



### examples

```jade
include /components/utils/util
include /components/atoms/radios/default

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


### example output 

```html
<!-- basic-->
<div class="amor-radio-slider">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="zgxrxc2gaeg"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="zgxrxc2gaeg"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="lob5386bppo"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="lob5386bppo"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="rz73ayi6m5s"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="rz73ayi6m5s"
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
      id="q9e76db8ksk"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="q9e76db8ksk"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="oapqmnsdqla"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="oapqmnsdqla"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="x7fie8usuv4"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="x7fie8usuv4"
    >
      large
    </label>
  </span>
</div>

```


---


## searchBar

search bar component


### path 

`components/molecules/search-bar/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.textfieldId|the id attribute value for search text field|string||Y|
|props.searchBtnId|the id attribute value for search button|string||Y|



### examples

```jade
include /components/utils/util
include /components/atoms/buttons/default
include /components/atoms/textbox/index
include /components/molecules/fieldset/default

+searchBar({
  textfieldId: `keyword`,
  searchBtnId: `btn-search`,
})
```


### example output 

```html
<div
  class="amor-field amor-field--column amor-searchbar"
  role="group"
  aria-labelledby="fmetnd0o9fo"
  id="searchbox"
>
  <div
    class="amor-field__label amor-field__label--30 amor-searchbar__label"
    id="fmetnd0o9fo"
  >
    search
  </div>
  <div class="amor-field__body amor-searchbar__body">
    <input
      class="amor-textbox amor-textbox--medium amor-searchbar__textfield"
      id="keyword"
      type="text"
      aria-labelledby="fmetnd0o9fo"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="none"
      spellcheck="false"
    />
    <button
      class="amor-btn-basic amor-btn-basic--medium amor-btn-basic--fill amor-searchbar__btn-submit"
      type="button"
      id="btn-search"
    >
      search
    </button>
  </div>
</div>

```


---


## tagsList

create tags list


### path 

`components/molecules/tags-list/index.pug`


### arguments 

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.tags|sequence of tags|array||Y|
|props.appearance|Style to display tags list <br> One of `list` and `flat`|string|`flat`|N|
|props.useLink|whether to use link|boolean|true|N|



### examples

```jade
include /components/utils/util

+tagsList({
  tags: post.tags.toArray(),
})
```


### example output 

```html
<div class="amor-tags-list amor-tags-list--flat">
  <ul>
    <li><a href="https://www.mulder21c.io/tags/mockup/">mockup</a></li>
  </ul>
</div>

```


---


