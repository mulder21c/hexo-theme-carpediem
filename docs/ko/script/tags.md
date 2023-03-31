## Tags

<a name="disclosure"></a>

## disclosure
토글 위젯 생성

**Kind**: global function  
**Access**: public  
**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| label | <code>string</code> | 눈에 보이는 레이블 |
| open | <code>boolean</code> | 열려 있는지의 여부 |

**사용법**  
```markdown
{% disclosure [label] [open:boolean] %}
```
**예제**  
```markdown
{% disclosure 더보기... open:false %}
  Contents...
{% enddisclosure %}
```

* * *

<a name="figcaption"></a>

## figcaption
figcaption 엘리먼트 생성 <br>
`{% figure %}`에서 사용해야 합니다.

**Kind**: global function  
**Access**: public  
**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| caption | <code>string</code> | 캡션 텍스트 콘텐츠 |

**사용법**  
```markdown
{% figcaption [caption string] %}
```
**예제**  
```markdown
{% figure %}
  <img src="xxxx.jpg" alt="" >
  {% figcaption "이미지 캡션" %}
{% endfigure %}
```

* * *

<a name="figure"></a>

## figure
figure 엘리먼트 생성

**Kind**: global function  
**Access**: public  
**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| align | <code>string</code> | figure 정렬. One of `left`, `center`, `right` 중 하나 |
| float | <code>boolean</code> | float 사용 여부 |

**사용법**  
```markdown
{% figure [attributes] [class] %}
```
**예제**  
```markdown
{% figure %}
  <img src="xxxx.jpg" alt="" >
{% endfigure %}
```

* * *
