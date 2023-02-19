# Pug 문서

## articleCard

게시글 카드 컴포넌트


### 경로

`components/molecules/article-card/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.post|hexo post 객체 https://hexo.io/docs/variables.html#Page-Variables|object||Y|
|props.isLink|카드를 링크로 작동 시킬지 여부|boolean|false|N|



### 예시

```jade
include /components/utils/util
include /components/atoms/datetime/index
include /components/atoms/category/index

+articleCard({post, isLink: true})
```


### 예시 출력 결과

```html
<div class="amor-article-card amor-article-card--link">
  <a
    class="amor-article-card__heading"
    href="https://www.mulder21c.io/lorem-ipsum/"
    aria-describedby="od8v8gnssu8 kgcvvsaa1so"
  >
    Lorem Ipsum
  </a>
  <div class="amor-article-card__meta" id="od8v8gnssu8">
    <span class="amor-datetime amor-article-card__meta__item">
      <span class="amor-datetime__label" role="img" aria-label="published">
        📆
      </span>
      <time class="amor-datetime__time" id="zc1e4wvchmk" datetime="2000-01-01">
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
  <p class="amor-article-card__content" id="kgcvvsaa1so">
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

게시글에 대한 메타 정보 컴포넌트


### 경로

`components/molecules/article-meta/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.categories|카테고리 배열|object||Y|
|props.date|게시글 발행 날짜|Moment||Y|
|props.updated|게시글 업데이트 날짜|Moment||Y|



### 예시

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


### 예시 출력 결과

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
    <time class="amor-datetime__time" id="xoni1koa0v4" datetime="2000-01-01">
      2000. 01. 01
    </time>
  </span>
</div>

```


---


## articleAuthor

작성자 소개


### 경로

`components/molecules/author/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.gravatar|gravatar 경로 또는 URL|string|`/images/author.svg`|N|
|props.name|작성자 이름|string||N|
|props.description|작성자 설명|string||N|
|props.social|작성자 소셜 서비스 링크|string||N|



### 예시

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


### 예시 출력 결과

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

레이블과 내용으로 구성된 그룹


### 경로

`components/molecules/fieldset/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.direction|컨테이너에 배치되는 방법<br>`row`, `column` 중 하나|string|row|N|
|props.alignItem|교차축에 있는 항목 정렬 방법<br>`start`, `center` 중 하나|string|start|N|
|props.labelWidthRatio|컨테이너의 레이블 너비 비율|integer|3|N|
|props.labelSlotClassName|레이블 슬롯 컨테이너의 클래스 이름|string \| Array\<string>||N|
|props.bodySlotClassName|내용 슬롯 컨테이너의 클래스 이름|string \| Array\<string>||N|
|props.labelSlotAttrs|레이블 슬롯 컨테이너의 어트리뷰트|object||N|
|props.bodySlotAttrs|내용 슬롯 컨테이너의 어트리뷰트|object||N|



### slots

|이름|설명|
|:---:|:---|
|fieldsetLabelSlot|필드셋에 대한 레이블 슬롯|
|fieldsetBodySlot|필드셋에 대한 내용 슬롯|



### 예시

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


### 예시 출력 결과

```html
<!-- row-->
<div
  class="amor-field amor-field--row amor-field--start"
  role="group"
  aria-labelledby="tq9hpglkc4k"
>
  <div class="amor-field__label amor-field__label--30" id="tq9hpglkc4k">
    label
  </div>
  <div class="amor-field__body"><p>body</p></div>
</div>
<!-- column-->
<div
  class="amor-field amor-field--column"
  role="group"
  aria-labelledby="nv7smaknm2c"
>
  <div class="amor-field__label amor-field__label--30" id="nv7smaknm2c">
    label
  </div>
  <div class="amor-field__body"><p>body</p></div>
</div>

```


---


## categoryNavigation

내비게이션 카테고리 목록


### 경로

`components/molecules/navigation/category/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|@see https://hexo.io/ko/docs/helpers#list-categories|object||N|



### 예시

```jade
include ../../../utils/util

+categoryNavigation()
```


### 예시 출력 결과

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

내비게이션 외부링크 목록


### 경로

`components/molecules/navigation/links/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|외부 링크 목록에 대한 옵션|object||N|
|props.options.transform|링크 이름 가공 함수|function||N|



### 예시

```jade
include /components/utils/util

+linksNavigation()
```


### 예시 출력 결과

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

내비게이션 메뉴 목록


### 경로

`components/molecules/navigation/menu/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.options|메뉴 목록에 대한 옵션|object||N|
|props.options.transform|메뉴 이름 가공 함수|function||N|



### 예시

```jade
include /components/utils/util

+menuNavigation()
```


### 예시 출력 결과

```html
<nav class="amor-menu-nav" aria-label="menu">
  <ul class="amor-menu-nav__list">
    <li class="amor-menu-nav__list__item">
      <a href="https://mulder21c.io/archives" class="amor-menu-nav__list__link">
        Archives
      </a>
    </li>
  </ul>
</nav>

```


---


## radioBoxes

박스형 라디오 버튼 그룹 컴포넌트


### 경로

`components/molecules/radio-group/boxy.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|라디오 버튼의 name 어트리뷰트|string||Y|
|props.options|라디오 컴포넌트 옵션으로 구성된 배열|array||Y|



### slots

|이름|설명|
|:---:|:---|
|radioBoxesLabelSlot|레이블 슬롯 <br>슬롯 개수는 옵션 항목 개수와 동일해야 합니다.|



### 예시

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


### 예시 출력 결과

```html
<!-- basic-->
<div class="amor-radio-boxes">
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="zeyaonanckc"
      name="size"
      value="small"
    />
    <span class="amor-radio-boxy__box">small</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="n3yocg2lkku"
      name="size"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="sz0kcmfniqo"
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
      id="gk2dbm0p4jc"
      name="size2"
      value="small"
    />
    <span class="amor-radio-boxy__box">small 1</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="oduqpy91cc1"
      name="size2"
      value="medium"
    />
    <span class="amor-radio-boxy__box">medium 2</span>
  </label>
  <label class="amor-radio-boxy amor-radio-boxes__item">
    <input
      class="amor-radio-boxy__control"
      type="radio"
      id="n9zjikbdvhg"
      name="size2"
      value="large"
    />
    <span class="amor-radio-boxy__box">large 3</span>
  </label>
</div>

```


---


## radioGroup

기본 라디오 그룹 컴포넌트


### 경로

`components/molecules/radio-group/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|라디오 버튼의 name 어트리뷰트|string||Y|
|props.options|name과 labelPosition을 제외환 라디오 컴포넌트 옵션으로 구성된 배열|array||Y|
|props.columns|열 개수|number||N|
|props.labelPosition|눈에 보이는 표시기를 기준으로 레이블이 위치되는 곳<br>`top`, `left`, `right`, `bottom` 중 하나|string|`right`|N|



### slots

|이름|설명|
|:---:|:---|
|radioGroupLabelSlot|레이블 슬롯|



### 예시

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


### 예시 출력 결과

```html
<!-- basic-->
<div class="amor-radio-group">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="v6i2ajcclrk"
      name="job"
      value="designer"
    />
    <label class="amor-radio__label" for="v6i2ajcclrk">Web Designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="wibr6l9df2k"
      name="job"
      value="frontend"
    />
    <label class="amor-radio__label" for="wibr6l9df2k">
      Web Front-End Developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="dshgnk8k6f8"
      name="job"
      value="backend"
    />
    <label class="amor-radio__label" for="dshgnk8k6f8">
      Web Back-End Developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ku78b182c8k"
      name="job"
      value="devops"
    />
    <label class="amor-radio__label" for="ku78b182c8k">devops</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="x7aw4la8gbo"
      name="job"
      value="ios"
    />
    <label class="amor-radio__label" for="x7aw4la8gbo">iOS developer</label>
  </span>
</div>
<!-- label with slot-->
<div class="amor-radio-group amor-radio-group--col-3">
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="l6y5zh6i6o8"
      name="job2"
      value="designer"
    />
    <label class="amor-radio__label" for="l6y5zh6i6o8">Web Designer</label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ixep7mqf95o"
      name="job2"
      value="frontend"
    />
    <label class="amor-radio__label" for="ixep7mqf95o">
      Web Front-End Developer
    </label>
  </span>
  <span class="amor-radio amor-radio-group__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="bmhmvztrtjo"
      name="job2"
      value="backend"
    />
    <label class="amor-radio__label" for="bmhmvztrtjo">
      Web Back-End Developer
    </label>
  </span>
</div>

```


---


## radioSlider

라디오 슬라이더 컴포넌트


### 경로

`components/molecules/radio-group/slider.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|라디오 버튼의 name 어트리뷰트|string||Y|
|props.options|라디오 컴포넌트 옵션으로 구성된 배열|array||Y|
|props.labelPosition|눈에 보이는 표시기를 기준으로 레이블이 위치되는 곳<br>`top`, `bottom` 중 하나|string|`bottom`|N|



### slots

|이름|설명|
|:---:|:---|
|radioSliderLabelSlot|레이블 슬롯|



### 예시

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


### 예시 출력 결과

```html
<!-- basic-->
<div class="amor-radio-slider">
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="khd8rj9m5g6"
      name="size"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="khd8rj9m5g6"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="qsgf91aak6g"
      name="size"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="qsgf91aak6g"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="ics9nl5h6po"
      name="size"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="ics9nl5h6po"
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
      id="kf35hy437c8"
      name="size2"
      value="small"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="kf35hy437c8"
    >
      small
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="a8mzhsm2um8"
      name="size2"
      value="medium"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="a8mzhsm2um8"
    >
      medium
    </label>
  </span>
  <span class="amor-radio-slider__bar" aria-hidden="true"></span>
  <span class="amor-radio amor-radio-slider__item">
    <input
      class="amor-radio__control"
      type="radio"
      id="vhibszuo748"
      name="size2"
      value="large"
    />
    <label
      class="amor-radio__label amor-radio__label--column"
      for="vhibszuo748"
    >
      large
    </label>
  </span>
</div>

```


---


## searchBar

검색바 컴포넌트


### 경로

`components/molecules/search-bar/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.textfieldId|검색어 텍스트 입력상자의 id 어트리뷰트 값|string||Y|
|props.searchBtnId|검색 버튼의 id 어트리뷰트 값|string||Y|



### 예시

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


### 예시 출력 결과

```html
<div
  class="amor-field amor-field--column amor-searchbar"
  role="group"
  aria-labelledby="ss4anihdggs"
  id="searchbox"
>
  <div
    class="amor-field__label amor-field__label--30 amor-searchbar__label"
    id="ss4anihdggs"
  >
    search
  </div>
  <div class="amor-field__body amor-searchbar__body">
    <input
      class="amor-textbox amor-textbox--medium amor-searchbar__textfield"
      id="keyword"
      type="text"
      aria-labelledby="ss4anihdggs"
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


### 경로

`components/molecules/tags-list/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.tags|태그 배열|array||Y|
|props.appearance|태그 목록 노출 스타일<br>`list`과 `flat` 중 하나|string|`flat`|N|
|props.useLink|링크 사용 여부|boolean|true|N|



### 예시

```jade
include /components/utils/util

+tagsList({
  tags: post.tags.data || post.tags || [],
})
```


### 예시 출력 결과

```html
<div class="amor-tags-list amor-tags-list--flat">
  <ul>
    <li><a href="https://mulder21c.io/tags/mockup/">mockup</a></li>
  </ul>
</div>

```


---
