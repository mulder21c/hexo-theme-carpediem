<a id="general-function-tint"></a>

# @function tint

Slightly lighten a color by mixing with white

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|color to tint|-|
|`$percentage`|**[Number](https://sass-lang.com/documentation/values/numbers)**|percentage of `$color`|-|

## Returns

**[Color](https://sass-lang.com/documentation/values/colors)**

## Examples

```scss
tint(#f00, 10)
// #ff1a1a
```

<a id="general-function-shade"></a>

# @function shade

Slightly darken a color by mixing with black

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|color to shade|-|
|`$percentage`|**[Number](https://sass-lang.com/documentation/values/numbers)**|percentage of `$color`|-|

## Returns

**[Color](https://sass-lang.com/documentation/values/colors)**

## Examples

```scss
shade(#f00, 10)
// #e60000
```

<a id="general-function-stripUnit"></a>

# @function stripUnit

Remove units from a given value

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$num`|**[Number](https://sass-lang.com/documentation/values/numbers)**|numbers containing units|-|

## Returns

**[Number](https://sass-lang.com/documentation/values/numbers)**

## Examples

```scss
stripUnit(16px)
// 16
```

## Dependents

+ **@function convertRem** Convert a given value in rem
+ **@function convertRem** Convert a given value in rem

<a id="general-function-convertRem"></a>

# @function convertRem

Convert a given value in rem

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$value`|**[Number](https://sass-lang.com/documentation/values/numbers)**|value to convert|-|
|`$base-value`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the value that is the basis for the conversion|-|

## Returns

**[Number](https://sass-lang.com/documentation/values/numbers)**

## Throws

+ not defined $base-value

## Examples

```scss
convertRem(32px, 16px)
// 2
```

## Dependencies

+ **[@function stripUnit](#general-function-stripUnit)**
+ **[@function stripUnit](#general-function-stripUnit)**

## Dependents

+ **@function getFontSize** get font size from sizes of divided evenly
  between the minimum and maximum values

<a id="general-function-getFontSize"></a>

# @function getFontSize

get font size from sizes of divided evenly
between the minimum and maximum values

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$step`|**[Number](https://sass-lang.com/documentation/values/numbers)**|divided step|-|

## Returns

**[Number](https://sass-lang.com/documentation/values/numbers)**

## Throws

+ can not found $font-size-largest
+ can not found $font-size-smallest
+ can not found $font-size-step-count

## Examples

```scss
getFontSize(2)
// get the second smallest font size
```

## Dependencies

+ **[@function convertRem](#general-function-convertRem)**

<a id="general-function-toRGB"></a>

# @function toRGB

get rgb(r, g, b) format from Hex color

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|Hex color|-|

## Returns

**[Color](https://sass-lang.com/documentation/values/colors)**

## Examples

```scss
toRGB(#fff);
// 255,255,255
```

## Dependents

+ **@mixin defineColorVar** generate css variable for color in two ways that are hex code and r, g, b

<a id="general-function-encodeColor"></a>

# @function encodeColor

url encode

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|the color in name, hex or rgb format|-|

## Returns

**[String](https://sass-lang.com/documentation/values/strings)**

## Examples

```scss
encodeColor(#f00)
// "%23FF0000"
```

<a id="general-mixin-respond-to"></a>

# @mixin respond-to

generate media query for responsive

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$breakpoint`|**[String](https://sass-lang.com/documentation/values/strings)**|breakpoint name|-|

## Examples

```scss
@include respond-to(tablet) { ... }
// @media(min-width: 768px) { ... }
```

<a id="general-mixin-font-face"></a>

# @mixin font-face

generate at-rule for font-face

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$name`|**[String](https://sass-lang.com/documentation/values/strings)**|font's name to be used for font-family|-|
|`$path`|**[String](https://sass-lang.com/documentation/values/strings)**|path to font files based on a web root|-|
|`$filename`|**[String](https://sass-lang.com/documentation/values/strings)**|name of file without extension|-|
|`$weight`|**[Number](https://sass-lang.com/documentation/values/numbers)**|font-weight|-|
|`$style`|**[String](https://sass-lang.com/documentation/values/strings)**|font-style|-|
|`$exts`|**[List](https://sass-lang.com/documentation/values/lists)**|space-delimited list of font file extensions|-|
|`$range`|**[List](https://sass-lang.com/documentation/values/lists)**, **[Null](https://sass-lang.com/documentation/values/null)**|range of unicode|-|

## Examples

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

generate prefers-color-scheme media query
and block for \[data-scheme="{scheme}"] selector

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$scheme`|**[String](https://sass-lang.com/documentation/values/strings)**|color scheme to apply the style to|-|

## Examples

```scss
@include colorScheme(dark) { ... }
// selector[data-scheme=dark] { ... }
// @media(prefers-color-scheme: dark) { ... }
```

<a id="general-mixin-keyframes"></a>

# @mixin keyframes

generate @keyframes rules

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$name`|**[String](https://sass-lang.com/documentation/values/strings)**|the name of keyframe|-|

## Examples

```scss
@include keyframes(bounce) { ... }
// @keyframes bounce { ... }
```

<a id="general-mixin-animation"></a>

# @mixin animation

generate properties for animation

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$options`|**[Map](https://sass-lang.com/documentation/values/maps)**|-|-|
|`$options.name`|**[String](https://sass-lang.com/documentation/values/strings)**|the name of animation|-|
|`$options.duration`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the length of time that an animation should take to complete one cycle|`0`|
|`$options.func`|**[String](https://sass-lang.com/documentation/values/strings)**|how an animation progresses through the duration of each cycle|`ease-in-out`|
|`$options.delay`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the amount of time to wait from applying the animation to an element before beginning to perform the animation|`0`|
|`$options.iteration`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the number of times an animation sequence should be played before stopping|`1`|
|`$options.direction`|**[String](https://sass-lang.com/documentation/values/strings)**|whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.|`normal`|
|`$options.fill`|**[String](https://sass-lang.com/documentation/values/strings)**|how a CSS animation applies styles to its target before and after its execution|`none`|
|`$options.state`|**[String](https://sass-lang.com/documentation/values/strings)**|whether an animation is running or paused|`running`|

## Examples

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

visually hidden for screen reader

+ **Group:** General
+ **Access:** public

## Examples

```scss
@include sr-only;
```

<a id="general-mixin-lineEllipsis"></a>

# @mixin lineEllipsis

generate ellipsis by lines

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$line-to-show`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the number of lines|-|

## Examples

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

generate css variable for color in two ways that are hex code and r, g, b

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$colorMap`|**[Map](https://sass-lang.com/documentation/values/maps)**|map containing variable's name & color value|-|

## Examples

```scss
@include defineColorVar((--background-color: $color-neutral-05));
// --background-color: #f2f2f2;
// --background-color-rgb: 242,242,242;
```

## Dependencies

+ **[@function toRGB](#general-function-toRGB)**
