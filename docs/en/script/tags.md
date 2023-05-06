## Functions

<dl>
<dt><a href="#disclosure">disclosure</a></dt>
<dd><p>generate disclosure widget</p>
</dd>
<dt><a href="#figcaption">figcaption</a></dt>
<dd><p>generate figcaption element <br>
It must be used in <code>{% figure %}</code></p>
</dd>
<dt><a href="#figure">figure</a></dt>
<dd><p>generate figure element</p>
</dd>
<dt><a href="#viewer360">viewer360</a></dt>
<dd><p>generate 360 image viewer</p>
</dd>
<dt><a href="#vimeo">vimeo</a></dt>
<dd><p>generate vimeo embed code</p>
</dd>
<dt><a href="#youtube">youtube</a></dt>
<dd><p>generate youtube embed code</p>
</dd>
</dl>

<a name="disclosure"></a>

## disclosure
generate disclosure widget

**Syntax**
```markdown
{% disclosure label [open] %}
content
{% enddisclosure %}
```

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> |  | visible label |
| [open] | <code>boolean</code> | <code>false</code> | whether to be opened |

**Example**
```markdown
{% disclosure show more %}
  More Contents...
{% enddisclosure %}

{% disclosure description for chat true %}
  This chart is...
{% enddisclosure %}
```

* * *

<a name="figcaption"></a>

## figcaption
generate figcaption element <br>
It must be used in `{% figure %}`

**Syntax**
```markdown
{% figcaption caption %}
```

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| caption | <code>string</code> | caption text content |

**Example**
```markdown
{% figcaption This image is ... %}
```

* * *

<a name="figure"></a>

## figure
generate figure element

**Syntax**
```markdown
{% figure [align] [float] %}
content
{% endfigure %}
```

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [align] | <code>string</code> |  | alignment for figure. One of `left`, `center` or `right` |
| [float] | <code>boolean</code> | <code>false</code> | whether to use float |

**Example**
```markdown
{% figure %}
  <img src="xxxx.jpg" alt="" >
{% endfigure %}

{% figure right %}
  <img src="xxxx.jpg" alt="" >
{% endfigure %}

{% figure left true %}
  <img src="xxxx.jpg" alt="" >
{% endfigure %}
```

* * *

<a name="viewer360"></a>

## viewer360
generate 360 image viewer <br>
To use this plug-in, need to enable `viewer360` in config of theme.

**Syntax**
```markdown
{% viewer360 imageURL label [aspectRatio] %}
```

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| imageURL | <code>string</code> |  | the URL of image |
| label | <code>string</code> |  | the alternative text for image |
| [aspectRatio] | <code>string</code> | <code>&quot;16/9&quot;</code> | the aspect ratio of container.<br>It must be in W/H format, such as 16/9 |

**Example**
```markdown
{% viewer360 https://my.ima.ge/picture.jpg This image is... %}
{% viewer360 https://my.ima.ge/picture.jpg This image is... 4/3 %}
```

* * *

<a name="vimeo"></a>

## vimeo
generate vimeo embed code

**Syntax**
```markdown
{% vimeo id, [aspect ratio], [title] %}
```

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | id of vimeo video |
| [aspectRatio] | <code>string</code> | <code>&quot;16/9&quot;</code> | the aspect ratio of video. <br>It must be in W/H format, such as 16/9 |
| [title] | <code>string</code> |  | the title for vimeo video. This property is used as accessible name iframe |

**Example**
```markdown
{% vimeo XXXXXX %}
<!-- Use title -->
{% vimeo XXXXXX "This video is..." %}
<!-- Specify aspect-ratio of video -->
{% vimeo XXXXXX 4/3 %}
```

* * *

<a name="youtube"></a>

## youtube
generate youtube embed code

**Syntax**
```markdown
{% youtube id, [type], [privacy], [aspect ratio], [title] %}
```

**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | id of youtube video |
| [type] | <code>string</code> | <code>&quot;video&quot;</code> | One of `video` or `playlist` |
| [privacy] | <code>boolean</code> | <code>false</code> | whether to use privacy-enhanced mode |
| [aspectRatio] | <code>string</code> | <code>&quot;16/9&quot;</code> | the aspect ratio of video.<br> It must be in W/H format, such as 16/9. |
| [title] | <code>string</code> |  | the title for youtube video. This property is used as accessible name iframe |

**Example**
```markdown
{% youtube XXXXXX %}
<!-- Use title -->
{% youtube XXXXXX "This video is..." %}
<!-- Use playlist type -->
{% youtube XXXXXX playlist %}
<!-- Allow youtube privacy-enhanced mode -->
{% youtube XXXXXX true %}
<!-- Specify aspect-ratio of video -->
{% youtube XXXXXX 4/3 %}
<!-- Combine options -->
{% youtube XXXXXX playlist 4/3 "2023 Top K-pop" }
```

* * *
