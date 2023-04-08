## Tags

<dl>
<dt><a href="#disclosure">disclosure</a></dt>
<dd><p>토글 위젯 생성</p>
</dd>
<dt><a href="#figcaption">figcaption</a></dt>
<dd><p>figcaption 엘리먼트 생성 <br>
<code>{% figure %}</code>에서 사용해야 합니다.</p>
</dd>
<dt><a href="#figure">figure</a></dt>
<dd><p>figure 엘리먼트 생성</p>
</dd>
<dt><a href="#viewer360">viewer360</a></dt>
<dd><p>360 이미지 뷰어 생성</p>
</dd>
<dt><a href="#vimeo">vimeo</a></dt>
<dd><p>vimeo 삽입 코드 생성</p>
</dd>
<dt><a href="#youtube">youtube</a></dt>
<dd><p>유튜브 삽입 코드 생성</p>
</dd>
</dl>

<a name="disclosure"></a>

## disclosure
토글 위젯 생성

**문법**
```markdown
{% disclosure label [open] %}
content
{% enddisclosure %}
```

**매개변수**

| 이름 | 유형 | 기본 값 | 설명 |
| --- | --- | --- | --- |
| label | <code>string</code> |  | 눈에 보이는 레이블 |
| [open] | <code>boolean</code> | <code>false</code> | 열려 있는지의 여부 |

**예제**  
```markdown
{% disclosure "더 보기" %}
  More Contents...
{% enddisclosure %}

{% disclosure "차트 설명" true %}
  이 차트는...
{% enddisclosure %}
```

* * *

<a name="figcaption"></a>

## figcaption
figcaption 엘리먼트 생성 <br>
`{% figure %}`에서 사용해야 합니다.

**문법**
```markdown
{% figcaption caption %}
```

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| caption | <code>string</code> | 캡션 텍스트 콘텐츠 |

**예제**  
```markdown
{% figcaption "이 이미지는 ..." %}
```

* * *

<a name="figure"></a>

## figure
figure 엘리먼트 생성

**문법**
```markdown
{% figure [align] [float] %}
content
{% endfigure %}
```

**매개변수**

| 이름 | 유형 | 기본 값 | 설명 |
| --- | --- | --- | --- |
| [align] | <code>string</code> |  | figure 정렬. One of `left`, `center`, `right` 중 하나 |
| [float] | <code>boolean</code> | <code>false</code> | float 사용 여부 |

**예제**  
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
360 이미지 뷰어 생성

**문법**
```markdown
{% viewer360 imageURL [aspectRatio] %}
```

**매개변수**

| 이름 | 유형 | 기본 값 | 설명 |
| --- | --- | --- | --- |
| imageURL | <code>string</code> |  | 이미지 URL |
| [aspectRatio] | <code>string</code> \| <code>number</code> | <code>&quot;16/9&quot;</code> | 컨테이너 종횡비 |

**예제**
```markdown
{% viewer360 https://my.ima.ge/picture.jpg %}
{% viewer360 https://my.ima.ge/picture.jpg 4/3 %}
```

* * *

<a name="vimeo"></a>

## vimeo
vimeo 삽입 코드 생성

**문법**
```markdown
{% vimeo id, [aspect ratio], [title] %}
```

**매개변수**

| 이름 | 유형 | 기본 값 | 설명 |
| --- | --- | --- | --- |
| id | <code>string</code> |  | vimeo 영상 id |
| [aspectRatio] | <code>string</code> \| <code>number</code> | <code>&quot;16/9&quot;</code> | 영상 종횡비. 문자열은 "16/9"와 같은 분수 표현이어야 합니다. |
| [title] | <code>string</code> |  | vimeo 비디오 타이틀. 이 속성은 iframe에 대한 접근 가능한 이름으로 사용됩니다. |

**Example**  
```markdown
{% vimeo XXXXXX %}
<!-- 타이틀 사용 -->
{% vimeo XXXXXX "This video is..." %}
<!-- 비디오 종횡비 지정 -->
{% vimeo XXXXXX 4/3 %}
<!-- 옵션 조합 -->
{% vimeo XXXXXX "2023 Top K-pop" }
```

* * *

<a name="youtube"></a>

## youtube
유튜브 삽입 코드 생성

**문법**
```markdown
{% youtube id, type, [cookie], [aspect ratio], [title] %}
```

**매개변수**

| 이름 | 유형 | 기본 값 | 설명 |
| --- | --- | --- | --- |
| id | <code>string</code> |  | 유튜브 영상 id |
| [type] | <code>string</code> | <code>&quot;video&quot;</code> | `video` 또는 `playlist` 중 하나 |
| [cookie] | <code>boolean</code> | <code>false</code> | 프라이버시 강화 모드 사용 여부 |
| [aspectRatio] | <code>string</code> \| <code>number</code> | <code>&quot;16/9&quot;</code> | 영상 종횡비. 문자열은 "16/9"와 같은 분수 표현이어야 합니다. |
| [title] | <code>string</code> |  | 유튜브 비디오 타이틀. 이 속성은 iframe에 대한 접근 가능한 이름으로 사용됩니다. |

**예제**  
```markdown
{% youtube XXXXXX %}
<!-- 타이틀 사용 -->
{% youtube XXXXXX "This video is..." %}
<!-- playlist 유형 사용 -->
{% youtube XXXXXX playlist %}
<!-- 유튜브 쿠키 허용 -->
{% youtube XXXXXX true %}
<!-- 비디오 종횡비 지정 -->
{% youtube XXXXXX 4/3 %}
<!-- 옵션 조합 -->
{% youtube XXXXXX playlist 4/3 "2023 Top K-pop" }
```

* * *
