<a id="general-function-tint"></a>

# @function tint

흰 색을 혼합하여 색상을 점점 밝게 함

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|밝게 할 색상|-|
|`$percentage`|**[Number](https://sass-lang.com/documentation/values/numbers)**|`$color` 비율|-|

## 반환

**[Color](https://sass-lang.com/documentation/values/colors)**

## 예제

```scss
tint(#f00, 10)
// #ff1a1a
```

<a id="general-function-shade"></a>

# @function shade

검은 색을 혼합하여 색상을 점점 어둡게 함

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|어둡게 할 색상|-|
|`$percentage`|**[Number](https://sass-lang.com/documentation/values/numbers)**|`$color` 비율|-|

## 반환

**[Color](https://sass-lang.com/documentation/values/colors)**

## 예제

```scss
shade(#f00, 10)
// #e60000
```

<a id="general-function-stripUnit"></a>

# @function stripUnit

주어진 값에서 단위 제거

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$num`|**[Number](https://sass-lang.com/documentation/values/numbers)**|단위를 포함한 숫자|-|

## 반환

**[Number](https://sass-lang.com/documentation/values/numbers)**

## 예제

```scss
stripUnit(16px)
// 16
```

## Dependents

+ **@function convertRem** 주어진 값을 rem으로 변환
+ **@function convertRem** 주어진 값을 rem으로 변환

<a id="general-function-convertRem"></a>

# @function convertRem

주어진 값을 rem으로 변환

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$value`|**[Number](https://sass-lang.com/documentation/values/numbers)**|변환할 값|-|
|`$base-value`|**[Number](https://sass-lang.com/documentation/values/numbers)**|변환 기준 값|-|

## 반환

**[Number](https://sass-lang.com/documentation/values/numbers)**

## 예외

+ not defined $base-value

## 예제

```scss
convertRem(32px, 16px)
// 2
```

## Dependencies

+ **[@function stripUnit](#general-function-stripUnit)**
+ **[@function stripUnit](#general-function-stripUnit)**

## Dependents

+ **@function getFontSize** 최소값과 최대값 사이로 균일하게 분할된 크기들로부터
  폰트 크기를 가져옴

<a id="general-function-getFontSize"></a>

# @function getFontSize

최소값과 최대값 사이로 균일하게 분할된 크기들로부터 폰트 크기를 가져옴


+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$step`|**[Number](https://sass-lang.com/documentation/values/numbers)**|분할 단계|-|

## 반환

**[Number](https://sass-lang.com/documentation/values/numbers)**

## 예외

+ can not found $font-size-largest
+ can not found $font-size-smallest
+ can not found $font-size-step-count

## 예제

```scss
getFontSize(2)
// 두 번째 작은 글꼴 크기
```

## Dependencies

+ **[@function convertRem](#general-function-convertRem)**

<a id="general-function-toRGB"></a>

# @function toRGB

hex 색상을 rgb 포맷으로 변환

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|hex 색상|-|

## 반환

**[Color](https://sass-lang.com/documentation/values/colors)**

## 예제

```scss
toRGB(#fff);
// 255,255,255
```

## Dependents

+ **@mixin defineColorVar** hex 코드와 r, g, b 2가지 방식으로 색상에 대한 CSS 변수 생성

<a id="general-function-encodeColor"></a>

# @function encodeColor

url 인코딩

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|이름, hex 또는 rgb 형식의 색상|-|

## 반환

**[String](https://sass-lang.com/documentation/values/strings)**

## 예제

```scss
encodeColor(#f00)
// "%23FF0000"
```

<a id="general-mixin-respond-to"></a>

# @mixin respond-to

반응형을 위한 미디어쿼리 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$breakpoint`|**[String](https://sass-lang.com/documentation/values/strings)**|분기점 이름|-|

## 예제

```scss
@include respond-to(tablet) { ... }
// @media(min-width: 768px) { ... }
```

<a id="general-mixin-font-face"></a>

# @mixin font-face

font-face at 규칙 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$name`|**[String](https://sass-lang.com/documentation/values/strings)**|font-family에 사용되는 글꼴 이름|-|
|`$path`|**[String](https://sass-lang.com/documentation/values/strings)**|웹 루트를 기준 글꼴 파일 경로|-|
|`$filename`|**[String](https://sass-lang.com/documentation/values/strings)**|확장자를 제외한 파일 이름|-|
|`$weight`|**[Number](https://sass-lang.com/documentation/values/numbers)**|글꼴 굵기|-|
|`$style`|**[String](https://sass-lang.com/documentation/values/strings)**|글꼴 스타일|-|
|`$exts`|**[List](https://sass-lang.com/documentation/values/lists)**|공백으로 구분 된 글꼴 파일 확장자 목록|-|
|`$range`|**[List](https://sass-lang.com/documentation/values/lists)**, **[Null](https://sass-lang.com/documentation/values/null)**|유니코드 범위|-|

## 예제

```scss
@include font-face(
  "Noto Serif",
  "/fonts/noto/",
  "noto-serif-kr-400",
  400,
  normal,
  woff woff2,
  null
);
// font-family: "Noto Serif";
// src: url("/fonts/noto/noto-serif-kr-400.woff") format("woff"),url("/fonts/noto/noto-serif-kr-400.woff2") format("woff2");
// font-weight: 400;
// font-style: normal;
```

<a id="general-mixin-colorScheme"></a>

# @mixin colorScheme

prefers-color-scheme 미디어쿼리 및
\[data-scheme="{scheme}"] 셀렉터 블럭 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$scheme`|**[String](https://sass-lang.com/documentation/values/strings)**|스타일을 적용할 색상 스킴|-|

## 예제

```scss
@include colorScheme(dark) { ... }
// selector[data-scheme=dark] { ... }
// @media(prefers-color-scheme: dark) { ... }
```

<a id="general-mixin-keyframes"></a>

# @mixin keyframes

@keyframes 규칙 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$name`|**[String](https://sass-lang.com/documentation/values/strings)**|키프레임 이름|-|

## 예제

```scss
@include keyframes(bounce) { ... }
// @keyframes bounce { ... }
```

<a id="general-mixin-animation"></a>

# @mixin animation

애니메이션 속성 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$options`|**[Map](https://sass-lang.com/documentation/values/maps)**|-|-|
|`$options.name`|**[String](https://sass-lang.com/documentation/values/strings)**|애니메이션 이름|-|
|`$options.duration`|**[Number](https://sass-lang.com/documentation/values/numbers)**|애니메이션이 한 사이클을 완료하는데 걸리는 시간|`0`|
|`$options.func`|**[String](https://sass-lang.com/documentation/values/strings)**|애니메이션이 각 사이클 동안 진행되는 방법|`ease-in-out`|
|`$options.delay`|**[Number](https://sass-lang.com/documentation/values/numbers)**|애니메이션을 시작하기 전에 요소에 애니메이션을 적용할 때까지 기다리는 시간|`0`|
|`$options.iteration`|**[Number](https://sass-lang.com/documentation/values/numbers)**|중지하기 전에 애니메이션 시퀀스를 재생해야 하는 횟수|`1`|
|`$options.direction`|**[String](https://sass-lang.com/documentation/values/strings)**|애니메이션이 앞으로, 뒤로 또는 시퀀스 재생 사이에서 앞뒤로 번갈아 재생되어야 하는지 여부|`normal`|
|`$options.fill`|**[String](https://sass-lang.com/documentation/values/strings)**|CSS 애니메이션 실행 전후 상태에 적용할 스타일 방법|`none`|
|`$options.state`|**[String](https://sass-lang.com/documentation/values/strings)**|애니메이션의 실행 또는 중지 여부|`running`|

## 예제

```scss
@include animation((name: bounce, duration: 1s));
// animation-name: bounce;
// animation-duration: 1s;
// animation-timing-function: ease-in-out;
// animation-delay: 0s;
// animation-iteration-count: 1;
// animation-direction: normal;
// animation-fill-mode: none;
// animation-play-state: running;
```

<a id="general-mixin-sr-only"></a>

# @mixin sr-only

스크린리더를 위한 가시적 숨김

+ **Group:** General
+ **Access:** public

## 예제

```scss
@include sr-only;
```

<a id="general-mixin-lineEllipsis"></a>

# @mixin lineEllipsis

라인별 말줄임 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$line-to-show`|**[Number](https://sass-lang.com/documentation/values/numbers)**|라인 수|-|

## 예제

```scss
@include lineEllipsis(1);
// overflow: hidden;
// text-overflow: ellipsis;
// white-space: nowrap;

@include lineEllipsis(3);
// overflow: hidden;
// text-overflow: ellipsis;
// display: block;
// display: -webkit-box;
// -webkit-box-orient: vertical;
// -webkit-line-clamp: 3;
```

<a id="general-mixin-defineColorVar"></a>

# @mixin defineColorVar

hex 코드와 r, g, b 2가지 방식으로 색상에 대한 CSS 변수 생성

+ **Group:** General
+ **Access:** public

## 매개변수

|이름|유형|설명|기본값|
|:--|:--|:--|:--|
|`$colorMap`|**[Map](https://sass-lang.com/documentation/values/maps)**|변수의 이름과 색상 값을 포함한 map|-|

## 예제

```scss
@include defineColorVar((--background-color: $color-neutral-05));
// --background-color: #f2f2f2;
// --background-color-rgb: 242,242,242;
```

## Dependencies

+ **[@function toRGB](#general-function-toRGB)**
