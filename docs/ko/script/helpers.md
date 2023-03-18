## Functions

<dl>
<dt><a href="#compile_sass">compile_sass(css)</a> ⇒ <code>string</code></dt>
<dd><p>포스트(페이지)별 SA(C)SS 컴파일</p>
</dd>
<dt><a href="#full_url">full_url(url)</a> ⇒ <code>string</code> | <code>void</code></dt>
<dd><p>상대/절대 URL로부터 전체 URL 가져옴 <br>
개발 모드에서는 시연을 위해 주어진 URL을 그대로 유지 함</p>
</dd>
<dt><a href="#generate_uid">generate_uid()</a> ⇒ <code>string</code></dt>
<dd><p><code>i49ygg04c64</code> 같이 
소문자와 숫자로 구성 된 고유 ID 생성</p>
</dd>
<dt><a href="#archive_array">archive_array(year)</a> ⇒ <code>array</code></dt>
<dd><p>아카이브 게시글 목록 가져옴</p>
</dd>
<dt><a href="#archive_map">archive_map()</a> ⇒ <code><a href="#yearlyPosts">yearlyPosts</a></code></dt>
<dd><p>연도 및 월로 매핑  된 아카이브 데이터를 가져옴</p>
</dd>
<dt><a href="#icon_info">icon_info(icon)</a> ⇒ <code><a href="#IconInfo">IconInfo</a></code></dt>
<dd><p>fontawesome으로부터 아이콘의 이름과 카테고리를 가져옴</p>
</dd>
<dt><a href="#kor_josa">kor_josa(word, postposition)</a> ⇒ <code>string</code></dt>
<dd><p>한국어 단어에 대해 적절한 조사 생성</p>
</dd>
<dt><a href="#list_categories">list_categories(categories, options)</a> ⇒ <code>string</code></dt>
<dd><p>모든 카테고리 목록 삽입 <br>
Hexo의 listCategoriesHelper 헬퍼에서 염감을 받았습니다</p>
</dd>
<dt><a href="#list_links">list_links(links, options)</a> ⇒ <code>string</code></dt>
<dd><p>외부 링크 목록 삽입 <br>
Hexo의 listCategoriesHelper 헬퍼에서 염감을 받았습니다</p>
</dd>
<dt><a href="#list_menus">list_menus(menus, options)</a> ⇒ <code>string</code></dt>
<dd><p>메뉴 목록 삽입 <br>
Hexo의 listCategoriesHelper 헬퍼에서 염감을 받았습니다</p>
</dd>
<dt><a href="#open_graph">open_graph(options)</a> ⇒ <code>string</code></dt>
<dd><p>OpenGraph 데이터 삽입 <br>
hexo의 openGraphHelper에서 영감을 받았습니다. <br>
이미지 항목에 테마 및 페이지의 hero 설정이 추가되었습니다.</p>
</dd>
<dt><a href="#paginator">paginator(options)</a> ⇒ <code>string</code></dt>
<dd><p>페이지네이션 삽입 <br>
hexo panigator 헬퍼에서 영감을 받았습니다. 좀 더 접근 가능하도록 개선되었습니다.</p>
</dd>
<dt><a href="#representative_image">representative_image(page)</a> ⇒ <code><a href="#ImageProbe">ImageProbe</a></code></dt>
<dd><p>대표 이미지 객체를 가져옴</p>
</dd>
<dt><a href="#strip_html">strip_html(str)</a> ⇒ <code>string</code></dt>
<dd><p>문자열에서 HTML 태그 제거 <br>
highlightJS가 생성한 라인 표시기 및 특수 문자 변환 추가가
hexo 것과의 차이입니다.</p>
</dd>
<dt><a href="#truncate">truncate(str, len)</a> ⇒ <code>string</code></dt>
<dd><p>글자가 잘려서 문장을 이해하기 어려워지지 않도록
단어별로 잘라 냄</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#archivePost">archivePost</a> : <code>object</code></dt>
<dd><p>아카이브에 대한 게시글 데이터 객체</p>
</dd>
<dt><a href="#monthlyPosts">monthlyPosts</a> : <code>Map.&lt;number, Array.&lt;archivePost&gt;&gt;</code></dt>
<dd></dd>
<dt><a href="#yearlyPosts">yearlyPosts</a> : <code>Map.&lt;number, monthlyPosts&gt;</code></dt>
<dd></dd>
<dt><a href="#IconInfo">IconInfo</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#ImageProbe">ImageProbe</a> : <code>Object</code> | <code>null</code></dt>
<dd></dd>
</dl>

<a name="compile_sass"></a>

## compile\_sass(css) ⇒ <code>string</code>
포스트(페이지)별 SA(C)SS 컴파일

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| css | <code>string</code> | 처리할 SA(C)SS |

**Example**  
```jade
if page.style
  style
    != compile_sass(page.style)
```

* * *

<a name="full_url"></a>

## full\_url(url) ⇒ <code>string</code> \| <code>void</code>
상대/절대 URL로부터 전체 URL 가져옴 <br>
개발 모드에서는 시연을 위해 주어진 URL을 그대로 유지 함

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 |
| --- | --- |
| url | <code>string</code> | 

**Example**  
```jade
a(href= full_url(`/search`)
```

* * *

<a name="generate_uid"></a>

## generate\_uid() ⇒ <code>string</code>
`i49ygg04c64`과 같이 소문자 및 숫자로 구성 된 고유 ID 생성

**Kind**: global function  
**Access**: public  
**Example**  
```jade
a(id= generate_uid())
```

* * *

<a name="archive_array"></a>

## archive\_array(year) ⇒ <code>array</code>
아카이브 게시글 목록 가져옴

**Kind**: global function  
**Returns**: <code>array</code> - array of posts  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| year | <code>number</code> | 아카이브 연도. <br> 연도가 지정 된되는 경우, 연도에 대한 모든 게시글을 반환합니다. 그렇지 않으면, 마지막 `MAX_YEAR_LEN`년까지 게시글을 반환합니다. |

**Example**  
```jade
- const archiveItems = getArchivePostsArray();
- const archiveItems = getArchivePostsArray(2023);
```

* * *

<a name="archive_map"></a>

## archive\_map() ⇒ [<code>yearlyPosts</code>](#yearlyPosts)
연도 및 월로 매핑  된 아카이브 데이터를 가져옴

**Kind**: global function  
**Access**: public  
**Example**  
```jade
+archiveTimeline({
  archives: archive_map(),
  headingLevel: 2,
})
```

* * *

<a name="icon_info"></a>

## icon\_info(icon) ⇒ [<code>IconInfo</code>](#IconInfo)
fontawesome으로부터 아이콘의 이름과 카테고리를 가져옴

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| icon | <code>string</code> | 아이콘 이름, 아이콘 카테고리를 슬래시와 슬래시 뒤의 문자로 미리 정의하는 것도 가능합니다 |

**Example**  
```jade
- const { iconName, iconCategory } = icon_info("bell")
- const { iconName, iconCategory } = icon_info("bell/regular")
```

* * *

<a name="kor_josa"></a>

## kor\_josa(word, postposition) ⇒ <code>string</code>
한국어 단어에 대해 적절한 조사 생성

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| word | <code>string</code> | 조사를 붙이기 원하는 단어 |
| postposition | <code>string</code> | 조사 종류 (은/는, 이/가, 을/를) |

**Example**  
```jade
p= title + kor_josa(title, "은")
p= title + kor_josa(title, "는")
p= title + kor_josa(title, "이")
p= title + kor_josa(title, "가")
p= title + kor_josa(title, "을")
p= title + kor_josa(title, "를")
```

* * *

<a name="list_categories"></a>

## list\_categories(categories, options) ⇒ <code>string</code>
모든 카테고리 목록 삽입
Hexo의 listCategoriesHelper 헬퍼에서 염감을 받았습니다

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| categories | <code>object</code> | Hexo의 이터러블 카테고리 객체 |
| options | <code>object</code> | [https://hexo.io/docs/helpers#list-categories](https://hexo.io/docs/helpers#list-categories) 참고 |

**Example**  
```jade
div
 | !{list_categories({})}
```

* * *

<a name="list_links"></a>

## list\_links(links, options) ⇒ <code>string</code>
외부 링크 목록 삽입 <br>
Hexo의 listCategoriesHelper 헬퍼에서 염감을 받았습니다

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| links | <code>Array.&lt;{name: string, url: string}&gt;</code> | name과 url로 구성된 객체 배열 |
| options | <code>object</code> | 설정 객체 |
| options.transform | <code>function</code> | 링크 이름 표현을 변경하는 함수 |
| options.class | <code>string</code> | 링크 목록의 클래스 이름 |

**Example**  
```jade
div
 | !{list_links({})}
```

* * *

<a name="list_menus"></a>

## list\_menus(menus, options) ⇒ <code>string</code>
메뉴 목록 삽입
Hexo의 listCategoriesHelper 헬퍼에서 염감을 받았습니다

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| menus | <code>Array.&lt;object&gt;</code> | 테마 설정의 메뉴 |
| options | <code>object</code> | 설정 객체 |
| options.transform | <code>function</code> | 메뉴 이름 표현을 변경하는 함수 |
| options.class | <code>string</code> | 메뉴 목록의 클래스 이름 |

**Example**  
```jade
div
 | !{list_menus({})}
```

* * *

<a name="open_graph"></a>

## open\_graph(options) ⇒ <code>string</code>
OpenGraph 데이터 삽입
hexo의 openGraphHelper에서 영감을 받았습니다. <br>
이미지 항목에 테마 및 페이지의 hero 설정이 추가되었습니다.

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| options | <code>object</code> | [https://hexo.io/docs/helpers#open-graph](https://hexo.io/docs/helpers#open-graph) 참고 |

**Example**  
```jade
| !{ open_graph() }
```

* * *

<a name="paginator"></a>

## paginator(options) ⇒ <code>string</code>
페이지네이션 삽입 <br>
hexo panigator 헬퍼에서 영감을 받았습니다. 좀 더 접근 가능하도록 개선되었습니다.

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| options | <code>object</code> | [https://hexo.io/docs/helpers#paginator](https://hexo.io/docs/helpers#paginator) 참고 |

**Example**  
```jade
| !{ paginator({ base: `/` }) }
```

* * *

<a name="representative_image"></a>

## representative\_image(page) ⇒ [<code>ImageProbe</code>](#ImageProbe)
대표 이미지 객체를 가져옴

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| page | <code>object</code> | hexo의 page 객체 |

**Example**  
```jade
- const hero = representative_image(theme);
```

* * *

<a name="strip_html"></a>

## strip\_html(str) ⇒ <code>string</code>
문자열에서 HTML 태그 제거 <br>
highlightJS가 생성한 라인 표시기 및 특수 문자 변환 추가가
hexo 것과의 차이입니다.

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 | 설명 |
| --- | --- | --- |
| str | <code>string</code> | 본래 문자열 |

**Example**  
```jade
p= strip_html(post.content)
```

* * *

<a name="truncate"></a>

## truncate(str, len) ⇒ <code>string</code>
글자가 잘려서 문장을 이해하기 어려워지지 않도록
단어별로 잘라 냄

**Kind**: global function  
**Access**: public  

| 매개변수 | 유형 |
| --- | --- |
| str | <code>string</code> | 
| len | <code>number</code> | 


* * *

<a name="archivePost"></a>

## archivePost : <code>object</code>
아키이브에 대한 게시글 데이터 객체

**Kind**: global typedef  
**Properties**

| Name | 유형 |
| --- | --- |
| title | <code>string</code> | 
| subtitle | <code>string</code> | 
| permalink | <code>string</code> | 
| date | <code>Moment</code> | 
| categories | <code>SchemaTypeArray</code> | 


* * *

<a name="monthlyPosts"></a>

## monthlyPosts : <code>Map.&lt;number, Array.&lt;archivePost&gt;&gt;</code>
**Kind**: global typedef  

* * *

<a name="yearlyPosts"></a>

## yearlyPosts : <code>Map.&lt;number, monthlyPosts&gt;</code>
**Kind**: global typedef  

* * *

<a name="IconInfo"></a>

## IconInfo : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | 유형 |
| --- | --- |
| iconName | <code>string</code> | 
| iconCategory | <code>string</code> | 


* * *

<a name="ImageProbe"></a>

## ImageProbe : <code>Object</code> \| <code>null</code>
**Kind**: global typedef  
**Properties**

| Name | 유형 | 설명 |
| --- | --- | --- |
| path | <code>string</code> |  |
| width | <code>number</code> |  |
| height | <code>number</code> |  |
| type | <code>string</code> | 이미지 유형, 일반적으로 파일 이름 확장자 |
| mime | <code>string</code> |  |
| wUnits | <code>string</code> |  |
| hUnits | <code>string</code> |  |


* * *
