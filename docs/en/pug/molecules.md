# Pug Documentation 

## articleCard

create article card component


### path 

`components/molecules/article-card/index.pug`


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

+articleCard({post, isLink: true})
```


### example output 

```html
<div class="amor-article-card amor-article-card--link">
  <img
    class="amor-article-card__thumb"
    src="https://via.placeholder.com/320x180.png?text=7rsbhrg8sbtapt"
    alt=""
    loading="lazy"
    role="none"
  />
  <a
    class="amor-article-card__heading"
    href="http://example.com/post-7rsbhrg8sbtapt/"
    aria-describedby="yzsjp4keo9k hfovmpvkpmc"
  >
    Post 7rsbhrg8sbtapt
  </a>
  <div class="amor-article-card__meta" id="yzsjp4keo9k">
    <span class="amor-datetime amor-article-card__meta__item">
      <span
        class="amor-datetime__label"
        role="img"
        aria-label="i18n(label.date.published)"
      >
        📆
      </span>
      <time class="amor-datetime__time" id="phkuzhp9mls" datetime="2022-12-25">
        2022. 12. 25
      </time>
    </span>
    <span class="amor-category amor-article-card__meta__item">
      <span
        class="amor-category__label"
        role="img"
        aria-label="i18n(label.category)"
      >
        📂
      </span>
      <span class="amor-category__list" role="list">
        <span class="amor-category__content" role="listitem">
          <span>cate-7rsbu604imv8q7</span>
        </span>
        <span class="amor-category__separator" aria-hidden="true">
          <svg class="amor-svg-icon" focusable="false">
            <use
              xlink:href="http://example.com/images/solid.svg#angle-right"
            ></use>
          </svg>
        </span>
        <span class="amor-category__content" role="listitem">
          <span>cate-7rsbpc6bd3aeuo</span>
        </span>
      </span>
    </span>
  </div>
  <p class="amor-article-card__content" id="hfovmpvkpmc">
    Amet culpa sunt exercitation aliqua non est est eu esse voluptate
    adipisicing ipsum. Sit proident occaecat in incididunt mollit enim ex sunt
    minim mollit occaecat consectetur proident officia. Consectetur aliqua magna
    occaecat non ad culpa. Deserunt nostrud laborum laborum non enim ex ex ex
    ipsum
  </p>
</div>

```


---


## articleMeta

create meta info component for article


### path 

`components/molecules/article-meta/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.categories|sequence of category|object||false|
|props.date|date of article|object||false|
|props.updated|updated date of article|object||false|



### examples

```jade
include ../../utils/util
include ../../atoms/category/index
include ../../atoms/datetime/index

+articleMeta({
  categories: post.categories.data || post.categories || [],
  date: post.date,
  updated: post.updated,
})
```


### example output 

```html
<div class="amor-article-meta">
  <span class="amor-category amor-article-meta__categories">
    <span
      class="amor-category__label"
      role="img"
      aria-label="i18n(label.category)"
    >
      📂
    </span>
    <span class="amor-category__list" role="list">
      <span class="amor-category__content" role="listitem">
        <a href="http://example.com/categories/cate-7rsbu604imv8q7">
          cate-7rsbu604imv8q7
        </a>
      </span>
      <span class="amor-category__separator" aria-hidden="true">
        <svg class="amor-svg-icon" focusable="false">
          <use
            xlink:href="http://example.com/images/solid.svg#angle-right"
          ></use>
        </svg>
      </span>
      <span class="amor-category__content" role="listitem">
        <a href="http://example.com/categories/cate-7rsbpc6bd3aeuo">
          cate-7rsbpc6bd3aeuo
        </a>
      </span>
    </span>
  </span>
  <span class="amor-datetime amor-article-meta__date">
    <span
      class="amor-datetime__label"
      role="img"
      aria-label="i18n(label.date.published)"
    >
      📆
    </span>
    <time class="amor-datetime__time" id="yjo75egndco" datetime="2022-12-25">
      2022. 12. 25
    </time>
  </span>
</div>

```


---


## articleAuthor

area for introducing author


### path 

`components/molecules/author/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.gravatar|the path or url for gravatar|string|`/images/author.svg`|true|
|props.name|the name of author|string||true|
|props.description|the description for author|string||true|
|props.social|the social links for author|string||true|



### examples

```jade
include ../../utils/util
include ../../atoms/svg-icon/index

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
    <img src="http://example.com/images/author.svg" alt="" role="none" />
  </span>
  <p class="amor-author__name">John Doe</p>
  <div class="amor-author__social">
    <a class="amor-author__social__link" href="/rss.xml" aria-label="rss">
      <svg
        class="amor-svg-icon amor-author__social__icon amor-author__social__icon--rss"
        focusable="false"
        role="presentation"
      >
        <use xlink:href="http://example.com/images/solid.svg#rss"></use>
      </svg>
    </a>
  </div>
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


### example output 

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="jocq0cjktp8"
>
  <div class="amor-field__label amor-field__label--30" id="jocq0cjktp8">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="kcvy6d054bo"
>
  <div class="amor-field__label amor-field__label--30" id="kcvy6d054bo">
    fieldset title
  </div>
  <div class="amor-field__body"><p>fieldset body</p></div>
</div>

```


---


## categoryNavigation

create hexo category list


### path 

`components/molecules/navigation/category/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|@see https://hexo.io/ko/docs/helpers#list-categories|object||true|



### examples

```jade
include ../../../utils/util

+categoryNavigation()
```


### example output 

```html
<nav class="amor-category-nav" aria-label="categories">
  <ul class="amor-category-nav__list">
    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-7rsd9s6ciqld4pg"
        class="amor-category-nav__list__link"
      >
        cate-7rsd9s6ciqld4pg
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-7rsd8o02d1s4hkg"
        class="amor-category-nav__list__link"
      >
        cate-7rsd8o02d1s4hkg
      </a>
    </li>

    <li class="amor-category-nav__list__item">
      <a
        href="http://example.com/categories/cate-7rsdalna9e64ju"
        class="amor-category-nav__list__link"
      >
        cate-7rsdalna9e64ju
      </a>
    </li>
  </ul>
</nav>

```


---


## linksNavigation

create hexo external link list


### path 

`components/molecules/navigation/links/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|the options for external link list|object||true|
|props.options.transform|<br> the function that changes the display of link name|function||true|



### examples

```jade
include ../../../utils/util

+linksNavigation()
```


### example output 

```html
<nav class="amor-links-nav" aria-label="links"></nav>

```


---


## menuNavigation

create hexo menu list


### path 

`components/molecules/navigation/menu/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.options|the options for menu list|object||true|
|props.options.transform|<br> the function that changes the display of menu name|function||true|



### examples

```jade
include ../../../utils/util

+menuNavigation()
```


### example output 

```html
<nav class="amor-menu-nav" aria-label="menu">
  <ul class="amor-menu-nav__list">
    <li class="amor-menu-nav__list__item">
      <a href="http://example.com/about" class="amor-menu-nav__list__link">
        about
      </a>
    </li>

    <li class="amor-menu-nav__list__item">
      <a href="http://example.com/hwo-to" class="amor-menu-nav__list__link">
        how
      </a>
    </li>

    <li class="amor-menu-nav__list__item">
      <a href="http://example.com/archives" class="amor-menu-nav__list__link">
        Archives
      </a>
    </li>
  </ul>
</nav>

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
include ../../atoms/radios/boxy

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
      id="xtmzu2ton1o"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="st1obwunv48"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="y6q5kdujplo"
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
      id="pav90i61vie"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="eiignl2470o"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="gwr0hetna8r"
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
|props.columns|column counts|number||true|
|props.labelPosition|Where the label is located relative to the visual indicator<br> One of `'top'`, `'left'`, `'right'`, `'bottom'`|string|`right`|true|



### slots 

|name|description|
|:---:|:---|
|radioGroupLabelSlot|the slot for label.|



### examples

```jade
include ../../utils/util
include ../../atoms/radios/default

// basic
+radioGroup({
  name: `job`,
  labelPosition: `right`,
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


### example output 

```html
<!-- basic-->
<div class="amor-radio-group">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ecfeceaidko"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="ecfeceaidko">designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="djwujgr1n4o"
      name="job"
      value="publisher"
    />
    <label class="amor-radio__label" for="djwujgr1n4o">publisher</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="nici0hqbjqe"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="nici0hqbjqe">
      frontend developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="qe2mtd0ofhe"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="qe2mtd0ofhe">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="o5mb5xklvus"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="o5mb5xklvus">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="lppwt1ouh5g"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="lppwt1ouh5g">웹 디자이너</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="amfsmle1154"
      name="job2"
      value="publisher"
    />
    <label class="amor-radio__label" for="amfsmle1154">웹 퍼블리셔</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="zsb7imth82g"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="zsb7imth82g">프론트엔드 개발자</label>
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
include ../../atoms/radios/default

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
      id="a3u5c57oek4"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="a3u5c57oek4"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="soabu1mgcc2"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="soabu1mgcc2"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="gng9oivd4a5"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="gng9oivd4a5"
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
      id="kxbmscav7ct"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="kxbmscav7ct"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="vdmc1j0prha"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="vdmc1j0prha"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="cdwkwx592p2"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="cdwkwx592p2"
    >
      large
    </label>
  </span>
</div>

```


---


## tagsList

create tags list


### path 

`components/molecules/tags-list/index.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|props||object||false|
|props.tags|sequence of tags|object||false|



### examples

```jade
include ../../utils/util

+tagsList({
  tags: post.tags.data || post.tags || [],
})
```


### example output 

```html
<div class="amor-tags-list amor-tags-list--flat">
  <ul>
    <li>
      <a href="http://example.com/tags/tag-7rsb41fsr84c1sg/">
        tag-7rsb41fsr84c1sg
      </a>
    </li>
    <li>
      <a href="http://example.com/tags/tag-7rsbfgls4eo9u4g/">
        tag-7rsbfgls4eo9u4g
      </a>
    </li>
  </ul>
</div>

```


---


