<a id="general-function-tint"></a>

# @function tint

Slightly lighten a color

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|color to tint|-|
|`$percentage`|**[Number](https://sass-lang.com/documentation/values/numbers)**|percentage of `$color`|-|

## Returns

**[Color](https://sass-lang.com/documentation/values/colors)**

<a id="general-function-shade"></a>

# @function shade

Slightly darken a color

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|color to shade|-|
|`$percentage`|**[Number](https://sass-lang.com/documentation/values/numbers)**|percentage of `$color`|-|

## Returns

**[Color](https://sass-lang.com/documentation/values/colors)**

<a id="general-function-stripUnit"></a>

# @function stripUnit

Remove units from a given value

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$numbers`|**[Number](https://sass-lang.com/documentation/values/numbers)**|containing units|-|

## Returns

**[Number](https://sass-lang.com/documentation/values/numbers)**

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
|`$value`|**[Number](https://sass-lang.com/documentation/values/numbers)**|to convert|-|
|`$the`|**[Number](https://sass-lang.com/documentation/values/numbers)**|value that is the basis for the conversion|-|

## Returns

**[Number](https://sass-lang.com/documentation/values/numbers)**

## Throws

+ not defined $base-value

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
|`$divided`|**[Number](https://sass-lang.com/documentation/values/numbers)**|step|-|

## Returns

**[Number](https://sass-lang.com/documentation/values/numbers)**

## Throws

+ can not found $font-size-largest
+ can not found $font-size-smallest
+ can not found $font-size-step-count

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

## Dependents

+ **@mixin defineColorVar** generate css variable for color 2-way that contains hex code and r, g, b run

<a id="general-function-encodecolor"></a>

# @function encodecolor

url encode

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$color`|**[Color](https://sass-lang.com/documentation/values/colors)**|Hex color|-|

## Returns

**[String](https://sass-lang.com/documentation/values/strings)**

<a id="general-mixin-respond-to"></a>

# @mixin respond-to

generate media query for responsive

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$breakpoint`|**[String](https://sass-lang.com/documentation/values/strings)**|breakpoint name|-|

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
|`$filename`|**[String](https://sass-lang.com/documentation/values/strings)**|name of file name without extension|-|
|`$weight`|**[Number](https://sass-lang.com/documentation/values/numbers)**|font-weight|-|
|`$style`|**[String](https://sass-lang.com/documentation/values/strings)**|font-style|-|
|`$exts`|**[List](https://sass-lang.com/documentation/values/lists)**|list that contains extension of font files|-|
|`$range`|**[String](https://sass-lang.com/documentation/values/strings)**|range of unicode|-|

<a id="general-mixin-colorScheme"></a>

# @mixin colorScheme

generate prefers-color-scheme media query
and block for \[data-scheme="{scheme}"] selector

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$theme`|**[String](https://sass-lang.com/documentation/values/strings)**|color scheme to apply the style to|-|

<a id="general-mixin-keyframes"></a>

# @mixin keyframes

generate @keyframes rules

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$name`|**[String](https://sass-lang.com/documentation/values/strings)**|-|-|

<a id="general-mixin-animation"></a>

# @mixin animation

generate properties for animation

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$options`|**[Map](https://sass-lang.com/documentation/values/maps)**|-|-|
|`$options.name`|**[String](https://sass-lang.com/documentation/values/strings)**|the name of keyframe|-|
|`$options.duration`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the length of time that an animation should take to complete one cycle|`0`|
|`$options.func`|**[String](https://sass-lang.com/documentation/values/strings)**|how an animation progresses through the duration of each cycle|`ease-in-out`|
|`$options.delay`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the amount of time to wait from applying the animation to an element before beginning to perform the animation|`0`|
|`$options.iteration`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the number of times an animation sequence should be played before stopping|`1`|
|`$options.direction`|**[String](https://sass-lang.com/documentation/values/strings)**|whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.|`normal`|
|`$options.fill`|**[String](https://sass-lang.com/documentation/values/strings)**|how a CSS animation applies styles to its target before and after its execution|`none`|
|`$options.state`|**[String](https://sass-lang.com/documentation/values/strings)**|whether an animation is running or paused|`running`|

<a id="general-mixin-sr-only"></a>

# @mixin sr-only

visually hidden for screen reader

+ **Group:** General
+ **Access:** public

<a id="general-mixin-lineEllipsis"></a>

# @mixin lineEllipsis

generate ellipsis by lines

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$line-to-show`|**[Number](https://sass-lang.com/documentation/values/numbers)**|the number of lines|-|

<a id="general-mixin-defineColorVar"></a>

# @mixin defineColorVar

generate css variable for color 2-way that contains hex code and r, g, b run

+ **Group:** General
+ **Access:** public

## Parameters

|Name|Type|Description|Default|
|:--|:--|:--|:--|
|`$colorMap`|**[Map](https://sass-lang.com/documentation/values/maps)**|map containing variable's name & color value|-|

## Dependencies

+ **[@function toRGB](#general-function-toRGB)**
