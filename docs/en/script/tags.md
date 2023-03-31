## Tags

<a name="disclosure"></a>

## disclosure
generate disclosure widget

**Kind**: global function  
**Access**: public  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>string</code> | visible label |
| open | <code>boolean</code> | whether to be opened |

**Usage**  
```markdown
{% disclosure [label] [open] %}
```
**Example**  
```markdown
{% disclosure more... false %}
  Contents...
{% enddisclosure %}
```

* * *

<a name="figcaption"></a>

## figcaption
generate figcaption element <br>
It must be used in `{% figure %}`

**Kind**: global function  
**Access**: public  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| caption | <code>string</code> | caption text content |

**Usage**  
```markdown
{% figcaption [caption] %}
```
**Example**  
```markdown
{% figure %}
  <img src="xxxx.jpg" alt="" >
  {% figcaption "이미지 캡션" %}
{% endfigure %}
```

* * *

<a name="figure"></a>

## figure
generate figure element

**Kind**: global function  
**Access**: public  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| align | <code>string</code> | alignment for figure. One of `left`, `center` or `right` |
| float | <code>boolean</code> | whether to use float |

**Usage**  
```markdown
{% figure [align] [float] %}
```
**Example**  
```markdown
{% figure %}
  <img src="xxxx.jpg" alt="" >
{% endfigure %}
```

* * *
