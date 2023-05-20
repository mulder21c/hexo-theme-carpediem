# Pug 문서

## button

기본 버튼 컴포넌트


### 경로

`components/atoms/buttons/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.type|버튼의 type 어트리뷰트 값|string|`button`|N|
|props.size|버튼 크기<br> `small`, `medium`, `large`, `fluid` 중 하나|string|`medium`|N|
|props.appearance|버튼 외형<br> `fill`, `outline` 중 하나|string|`fill`|N|



### 예시

```jade
include /components/utils/util

+button({
  type: `button`,
  size: `medium`,
  appearance: `outline`,
}) button
```


### 예시 출력 결과

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

아이콘(font awesome) 버튼 컴포넌트


### 경로

`components/atoms/buttons/icon.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.icon|아이콘 이름(font awesome 기준 이름)|string||Y|
|props.label|버튼 레이블|string||Y|
|props.type|버튼의 type 어트리뷰트 값|string|`button`|N|
|props.size|버튼 크기<br>`small`, `medium`, `large` 중 하나|string|`medium`|N|
|props.appearance|버튼 외형 <br>`fill`, `outline`, `ghost` 중 하나|string|`outline`|N|
|props.layout|버튼 레이아웃<br>`icon-only`, `icon-text` 중 하나|string|`icon-only`|N|



### 예시

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


### 예시 출력 결과

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

카테고리 표시


### 경로

`components/atoms/category/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.categories|카테고리 배열|array||Y|
|props.visibleLabel|눈에 보이는 카테고리 레이블|string||Y|
|props.level|노출 할 카데고리 수준<br> `lowest`, `top`, `all` 중 하나|string|`lowest`|N|
|props.useLink|링크 사용 유무|boolean|`true`|N|
|props.separator|계층 구분자<br>아이콘(font awesome)을 구분자로 사용할 수 있습니다|string|`>`|N|



### 예시

```jade
include /components/utils/util
include /components/atoms/svg-icon/index

+category({
  categories,
  visibleLabel: `📂`,
  level: `all`,
  useLink: false,
  separator: `>`
})
```


### 예시 출력 결과

```html
<span class="crpdm-category">
  <span class="crpdm-category__label" role="img" aria-label="category">📂</span>
  <span class="crpdm-category__content">mockup</span>
</span>

```


---


## cclLicense

ccl 라이선스 문구


### 경로

`components/atoms/ccl-license/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.year|첫 발행 연도|number \| Array\<number>||N|
|props.name|저작권 소유자 이름|string||N|
|props.license|`by`, `nc`, `nd`, `sa` 중 라이선스에 적용할 특성|Array\<string>||N|
|props.version|크리에이티브 커먼즈 라이선스 버전<br>1, 2, 2.5, 3, 4 중 하나|number||N|



### 예시

```jade
include /components/utils/util

+cclLicense({
  year: [2012, 2022],
  name: config.author,
  license: [`by`, `nc`, `nd`],
})
```


### 예시 출력 결과

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

체크상자 컴포넌트


### 경로

`components/atoms/checkboxes/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.id|체크상자의 id 어트리뷰트 및 label for 어트리뷰트의 값 <br>미지정 시, 자동 생성된 id 값이 적용됩니다.|string||N|
|props.name|체크상자의 name 어트리뷰트 값|string||N|
|props.label|체크상자 레이블 <br>  값을 지정하지 않는다면, label 엘리먼트를 작성하고 스타일링 해야 합니다.|string||N|
|props.checked|체크 상태|boolean|`false`|N|
|props.value|체크상자의 value 어트리뷰트 값|string \| number||N|
|props.labelPosition|눈에 보이는 표시기를 기준으로 레이블이 위치되는 곳<br>`top`, `left`, `right`, `bottom` 중 하나|string|`right`|N|
|props.labelClassName|label 엘리먼트에 적용할 클래스 이름|string||N|
|props.inputAttrs|input:checkbox에 적용할 어트리뷰트들|object||N|



### 예시

```jade
include /components/utils/util

// 기본 체크상자
+checkbox({
  label: `agree`,
  checked: true
})

// label 속성 대신 block 사용
+checkbox({
  name: `answer`,
  value: 1
}) check label

// 별도의 label 엘리먼트 사용
+checkbox({
  id: `no-label-checkbox`,
  checked: false,
})
label(for=`no-label-checkbox`) checkbox
```


### 예시 출력 결과

```html
<!-- 기본 체크상자-->
<span class="crpdm-checkbox">
  <input
    class="crpdm-checkbox__control"
    type="checkbox"
    id="enk1gmslrfk"
    checked="checked"
  />
  <label class="crpdm-checkbox__label" for="enk1gmslrfk">agree</label>
</span>
<!-- label 속성 대신 block 사용-->
<span class="crpdm-checkbox">
  <input
    class="crpdm-checkbox__control"
    type="checkbox"
    id="asuvlkvtjvd"
    name="answer"
    value="1"
  />
  <label class="crpdm-checkbox__label" for="asuvlkvtjvd">check label</label>
</span>
<!-- 별도의 label 엘리먼트 사용-->
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

스위치버튼 컴포넌트


### 경로

`components/atoms/checkboxes/switch.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.id|스위치버튼의 id 어트리뷰트 및 label for 어트리뷰트의 값 <br>미지정 시, 자동 생성된 id 값이 적용됩니다.|string||N|
|props.name|스위치버튼의 name 어트리뷰트 값|string||N|
|props.label|스위치버튼 레이블<br>값을 지정하지 않는다면, label 엘리먼트를 작성하고 스타일링 해야 합니다.|string||N|
|props.checked|스위치버튼 체크 상태 <br>체크되어 있다면 스위치가 켬 상태이고, 그렇지 않으면 꺼짐 상태|boolean|`false`|N|
|props.value|스위치버튼의 value 어트리뷰트 값|string \| number||N|
|props.labelPosition|눈에 보이는 표시기를 기준으로 레이블이 위치되는 곳<br>`left`, `right` 중 하나|string|`right`|N|
|props.inputAttrs|input:checkbox에 적용할 어트리뷰트들|object||N|



### 예시

```jade
include /components/utils/util

// 기본 스위치버튼
+switchButton({
  label: `alarm`,
  checked: true,
})

// label 속성 대신 block 사용
+switchButton({
  checked: true,
}) switch button

// 별도의 label 엘리먼트 사용
+switchButton({
  id: `no-label-switch`,
  checked: false,
})
label(for="no-label-switch") switch button
```


### 예시 출력 결과

```html
<!-- 기본 스위치버튼-->
<span class="crpdm-switch">
  <input
    class="crpdm-switch__control"
    type="checkbox"
    id="vl70dxut45o"
    checked="checked"
  />
  <span class="crpdm-switch__btn" aria-hidden="true"></span>
  <label class="crpdm-switch__label" for="vl70dxut45o">alarm</label>
</span>
<!-- label 속성 대신 block 사용-->
<span class="crpdm-switch">
  <input
    class="crpdm-switch__control"
    type="checkbox"
    id="cq2pukqmpn8"
    checked="checked"
  />
  <span class="crpdm-switch__btn" aria-hidden="true"></span>
  <label class="crpdm-switch__label" for="cq2pukqmpn8">switch button</label>
</span>
<!-- 별도의 label 엘리먼트 사용-->
<span class="crpdm-switch">
  <input class="crpdm-switch__control" type="checkbox" id="no-label-switch" />
  <span class="crpdm-switch__btn" aria-hidden="true"></span>
  <span class="crpdm-switch__label" aria-hidden="true"></span>
</span>
<label for="no-label-switch">switch button</label>

```


---


## datetime

날짜 및 시간 컴포넌트


### 경로

`components/atoms/datetime/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.datetime|날짜 객체|Moment||Y|
|props.id|id 어트리뷰트 값<br>미지정 시, 자동 생성된 id 값이 적용됩니다.|string||N|
|props.label|컴포넌트에 대한 접근 가능한 이름|string||N|
|props.format|datetime 어트리뷰트로 사용할 기계가 이해할 수 있는 날짜 및 시간 형식|string|`YYYY-MM-DD`|N|
|props.visibleLabel|컴포넌트에 대한 눈에 보이는 레이블|string||N|
|props.visibleFormat|사람이 이해할 수 있는 날짜 형식|string|`YYYY. MM. DD`|N|



### 예시

```jade
include /components/utils/util

// 간단한 예
+datetime({
  datetime: moment(new Date()),
  label: `posted `,
  visibleLabel: `📆 `
})

// 형식 명시
+datetime({
  datetime: moment(new Date()),
  label: `posted `,
  visibleLabel: `📆 `,
  visibleFormat: `YYYY-MM-DD`,
})
```


### 예시 출력 결과

```html
<!-- simple-->
<span class="crpdm-datetime">
  <span class="crpdm-datetime__label" role="img" aria-label="posted ">📆</span>
  <time class="crpdm-datetime__time" id="u7bc6j0ho38" datetime="2023-01-12">
    2023. 01. 12
  </time>
</span>
<!-- explicit format-->
<span class="crpdm-datetime">
  <span class="crpdm-datetime__label" role="img" aria-label="posted ">📆</span>
  <time class="crpdm-datetime__time" id="rormm42tr48" datetime="2023-01-12">
    2023-01-12
  </time>
</span>

```


---


## heading

헤딩 컴포넌트


### 경로

`components/atoms/heading/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.level|1 ~ 6 사이의 헤딩 수준|number||Y|
|props.htmlString|HTML 문자열인 헤딩 콘텐츠|string||N|
|props.visible|가시성|boolean|`true`|N|



### 슬롯

|name|description|
|:---:|:---|
|headingSlot|헤딩 콘텐츠 슬롯|



### 예시

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


### 예시 출력 결과

```html
<!-- 기본 헤딩-->
<h1 class="crpdm-heading--lv-1">heading</h1>
<!-- html 사용-->
<h1 class="crpdm-heading--lv-1"><span>HTML heading</span></h1>
<!-- 슬롯 사용-->
<h1 class="crpdm-heading--lv-1">slot content</h1>

```


---


## boxyRadio

박스 형태 라디오버튼 컴포넌트


### 경로

`components/atoms/radios/boxy.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|라디오버튼의 name 어트리뷰트 값|string||Y|
|props.value|라디오버튼의 value 어트리뷰트 값|string \| number||Y|
|props.id|라디오버튼의 id 어트리뷰트 및 label for 어트리뷰트의 값<br>미지정 시, 자동 생성된 id 값이 적용됩니다.|string||N|
|props.label|라디오버튼 레이블<br>값을 지정하지 않는다면, label 엘리먼트를 작성하고 스타일링 해야 합니다.|string||N|
|props.checked|라디오버튼 체크 상태|boolean|`false`|N|
|props.inputAttrs|input:radio에 적용할 어트리뷰트들|object||N|



### 예시

```jade
include /components/utils/util

// label 속성 사용
+boxyRadio({
  name: `answer`,
  value: 1,
  label: `boxy radio`
})

// label 속성 대신 block 사용
+boxyRadio({
  name: `answer`,
  value: 1
})
  boxy radio
```


### 예시 출력 결과

```html
<!-- label 속성 사용-->
<label class="crpdm-radio-boxy">
  <input
    class="crpdm-radio-boxy__control"
    type="radio"
    id="c90fcmi13pk"
    name="answer"
    value="1"
  />
  <span class="crpdm-radio-boxy__box">boxy radio</span>
</label>
<!-- label 속성 대신 block 사용-->
<label class="crpdm-radio-boxy">
  <input
    class="crpdm-radio-boxy__control"
    type="radio"
    id="hpknd54u5e2"
    name="answer"
    value="1"
  />
  <span class="crpdm-radio-boxy__box"><boxy>radio</boxy></span>
</label>

```


---


## radio

기본 라디오버튼 컴포넌트


### 경로

`components/atoms/radios/default.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|라디오버튼의 name 어트리뷰트 값|string||Y|
|props.value|라디오버튼의 value 어트리뷰트 값|string \| number||Y|
|props.id|라디오버튼의 id 어트리뷰트 및 label for 어트리뷰트의 값<br>미지정 시, 자동 생성된 id 값이 적용됩니다.|string||N|
|props.label|라디오버튼 레이블<br>값을 지정하지 않는다면, label 엘리먼트를 작성하고 스타일링 해야 합니다.|string||N|
|props.checked|라디오버튼 체크 상태|boolean||N|
|props.labelPosition|눈에 보이는 표시기를 기준으로 레이블이 위치되는 곳<br>`top`, `left`, `right`, `bottom`중 하나|string|`right`|N|
|props.labelClassName|label 엘리먼트에 적용할 클래스 이름|string \| Array\<string>||N|
|props.inputAttrs|input:radio에 적용할 어트리뷰트들|object||N|



### 예시

```jade
include /components/utils/util

// 기본 라디오버튼
+radio({label: `yes`, name: `answer`, value: 1})

// label 속성 대신 block 사용
+radio({name: `answer`, value: 1}) radio button

// 별도의 label 엘리먼트 사용
+radio({name: `answer`, id: `no-label`, value: 1})
label(for=`no-label`) radio button
```


### 예시 출력 결과

```html
<!-- 기본 라디오버튼-->
<span class="crpdm-radio">
  <input
    class="crpdm-radio__control"
    type="radio"
    id="zj9spcc5ivc"
    name="answer"
    value="1"
  />
  <label class="crpdm-radio__label" for="zj9spcc5ivc">yes</label>
</span>
<!-- label 속성 대신 block 사용-->
<span class="crpdm-radio">
  <input
    class="crpdm-radio__control"
    type="radio"
    id="cp03oi16iuo"
    name="answer"
    value="1"
  />
  <label class="crpdm-radio__label" for="cp03oi16iuo">radio button</label>
</span>
<!-- 별도의 label 엘리먼트 사용-->
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

폰트 어썸을 사용한 SVG 아이콘 컴포넌트


### 경로

`components/atoms/svg-icon/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.name|아이콘 이름|string||Y|
|props.type|아이콘 유형|string||N|



### 예시

```jade
include /components/utils/util

+svgIcon({name: `thumbs-up`})
```


### 예시 출력 결과

```html
<svg class="crpdm-svg-icon" focusable="false">
  <use xlink:href="https://www.mulder21c.io/images/solid.svg#thumbs-up"></use>
</svg>

```


---


## textbox

텍스트상자 컴포넌트


### 경로

`components/atoms/textbox/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.id|텍스트상자의 id 어트리뷰트 및 label for 어트리뷰트의 값 <br>미지정 시, 자동 생성된 id 값이 적용됩니다.|string||N|
|props.name|텍스트상자의 name 어트리뷰트 값|string||N|
|props.value|텍스트상자의 value 어트리뷰트 값|string||N|
|props.placeholder|텍스트상자의 placeholder|string||N|
|props.type|텍스트상자의 type 어트리뷰트 값|string|`text`|N|
|props.size|텍스트상자의 크기 <br>`small`, `medium`, `large`, `'fluid` 중 하나|string|`medium`|N|



### 예시

```jade
include /components/utils/util

+textbox({
  type: 'text',
  size: 'medium',
})
```


### 예시 출력 결과

```html
<input class="crpdm-textbox crpdm-textbox--medium" id="ql2y16bj5co" type="text" />

```


---


## watermark

테마 워터마크


### 경로

`components/atoms/watermark/index.pug`


### 매개변수

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|props||object||Y|
|props.hexo|저작 도구로서 hexo 노출 여부|boolean|true|N|



### 예시

```jade
include /components/utils/util

+watermark()
```


### 예시 출력 결과

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
