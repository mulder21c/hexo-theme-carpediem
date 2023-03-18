## Functions

<dl>
<dt><a href="#compile_sass">compile_sass(css)</a> ⇒ <code>string</code></dt>
<dd><p>Compile post(page)-specific SA(C)SS</p>
</dd>
<dt><a href="#full_url">full_url(url)</a> ⇒ <code>string</code> | <code>void</code></dt>
<dd><p>Get fully url from relative/absolute URL. <br>
In development mode, keep the given URL for demonstration</p>
</dd>
<dt><a href="#generate_uid">generate_uid()</a> ⇒ <code>string</code></dt>
<dd><p>Generate unique id consisting of lowercase letters and numbers,
like <code>i49ygg04c64</code></p>
</dd>
<dt><a href="#archive_array">archive_array(year)</a> ⇒ <code>array</code></dt>
<dd><p>Get archive post list</p>
</dd>
<dt><a href="#archive_map">archive_map()</a> ⇒ <code><a href="#yearlyPosts">yearlyPosts</a></code></dt>
<dd><p>Get archives data mapped by year and month</p>
</dd>
<dt><a href="#icon_info">icon_info(icon)</a> ⇒ <code><a href="#IconInfo">IconInfo</a></code></dt>
<dd><p>Get name and category of icon from fontawesome</p>
</dd>
<dt><a href="#kor_josa">kor_josa(word, postposition)</a> ⇒ <code>string</code></dt>
<dd><p>Generate appropriate postposition to the word for Korean</p>
</dd>
<dt><a href="#list_categories">list_categories(categories, options)</a> ⇒ <code>string</code></dt>
<dd><p>Insert a list of all categories <br>
This is inspired from hexo listCategoriesHelper helper</p>
</dd>
<dt><a href="#list_links">list_links(links, options)</a> ⇒ <code>string</code></dt>
<dd><p>Insert a list of external links <br>
This is inspired from hexo listCategoriesHelper helper</p>
</dd>
<dt><a href="#list_menus">list_menus(menus, options)</a> ⇒ <code>string</code></dt>
<dd><p>Insert a list of menu <br>
This is inspired from hexo listCategoriesHelper helper</p>
</dd>
<dt><a href="#open_graph">open_graph(options)</a> ⇒ <code>string</code></dt>
<dd><p>Insert OpenGraph data <br>
This is inspired from hexo openGraphHelper. <br>
Added hero config on theme and page into images entry</p>
</dd>
<dt><a href="#paginator">paginator(options)</a> ⇒ <code>string</code></dt>
<dd><p>Insert pagination <br>
This is inspired from hexo paginator helper. Improved accessibility more.</p>
</dd>
<dt><a href="#representative_image">representative_image(page)</a> ⇒ <code><a href="#ImageProbe">ImageProbe</a></code></dt>
<dd><p>Get representative image object</p>
</dd>
<dt><a href="#strip_html">strip_html(str)</a> ⇒ <code>string</code></dt>
<dd><p>Strip HTML tags from string <br>
The addition of highlightJS generated line indicator and special character
conversion is different from hexo one.</p>
</dd>
<dt><a href="#truncate">truncate(str, len)</a> ⇒ <code>string</code></dt>
<dd><p>Truncate by word to avoid making the sentence difficult
to understand due to truncated by letter</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#archivePost">archivePost</a> : <code>object</code></dt>
<dd><p>post data object for archive</p>
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
Compile post(page)-specific SA(C)SS

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| css | <code>string</code> | SA(C)SS for processing |

**Example**  
```jade
if page.style
  style
    != compile_sass(page.style)
```

* * *

<a name="full_url"></a>

## full\_url(url) ⇒ <code>string</code> \| <code>void</code>
Get fully url from relative/absolute URL. <br>
In development mode, keep the given URL for demonstration

**Kind**: global function  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

**Example**  
```jade
a(href= full_url(`/search`)
```

* * *

<a name="generate_uid"></a>

## generate\_uid() ⇒ <code>string</code>
Generate unique id consisting of lowercase letters and numbers,
like `i49ygg04c64`

**Kind**: global function  
**Access**: public  
**Example**  
```jade
a(id= generate_uid())
```

* * *

<a name="archive_array"></a>

## archive\_array(year) ⇒ <code>array</code>
Get archive post list

**Kind**: global function  
**Returns**: <code>array</code> - array of posts  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| year | <code>number</code> | the archive year.<br> If year is specify, return all posts for year. Otherwise, return posts up to last `MAX_YEAR_LEN` (_config.yml) years. |

**Example**  
```jade
- const archiveItems = getArchivePostsArray();
- const archiveItems = getArchivePostsArray(2023);
```

* * *

<a name="archive_map"></a>

## archive\_map() ⇒ [<code>yearlyPosts</code>](#yearlyPosts)
Get archives data mapped by year and month

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
Get name and category of icon from fontawesome

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| icon | <code>string</code> | the name of icon, you can predefine icon category with slashes and words after slashes |

**Example**  
```jade
- const { iconName, iconCategory } = icon_info("bell")
- const { iconName, iconCategory } = icon_info("bell/regular")
```

* * *

<a name="kor_josa"></a>

## kor\_josa(word, postposition) ⇒ <code>string</code>
Generate appropriate postposition to the word for Korean

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | the word to which want to add a postposition |
| postposition | <code>string</code> | kind of postposition (은/는, 이/가, 을/를) |

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
Insert a list of all categories <br>
This is inspired from hexo listCategoriesHelper helper

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| categories | <code>object</code> | the iterable object of categories from Hexo |
| options | <code>object</code> | See [https://hexo.io/docs/helpers#list-categories](https://hexo.io/docs/helpers#list-categories) |

**Example**  
```jade
div
 | !{list_categories({})}
```

* * *

<a name="list_links"></a>

## list\_links(links, options) ⇒ <code>string</code>
Insert a list of external links <br>
This is inspired from hexo listCategoriesHelper helper

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| links | <code>Array.&lt;{name: string, url: string}&gt;</code> | the array of object that is consists of name and url |
| options | <code>object</code> | the configuration object |
| options.transform | <code>function</code> | The function that changes the display of link name |
| options.class | <code>string</code> | class name of link list |

**Example**  
```jade
div
 | !{list_links({})}
```

* * *

<a name="list_menus"></a>

## list\_menus(menus, options) ⇒ <code>string</code>
Insert a list of menu <br>
This is inspired from hexo listCategoriesHelper helper

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| menus | <code>Array.&lt;object&gt;</code> | the menu from theme config |
| options | <code>object</code> | the configuration object |
| options.transform | <code>function</code> | The function that changes the display of menu name |
| options.class | <code>string</code> | class name of menu list |

**Example**  
```jade
div
 | !{list_menus({})}
```

* * *

<a name="open_graph"></a>

## open\_graph(options) ⇒ <code>string</code>
Insert OpenGraph data <br>
This is inspired from hexo openGraphHelper. <br>
Added hero config on theme and page into images entry

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | See [https://hexo.io/docs/helpers#open-graph](https://hexo.io/docs/helpers#open-graph) |

**Example**  
```jade
| !{ open_graph() }
```

* * *

<a name="paginator"></a>

## paginator(options) ⇒ <code>string</code>
Insert pagination <br>
This is inspired from hexo paginator helper. Improved accessibility more.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | @see [https://hexo.io/docs/helpers#paginator](https://hexo.io/docs/helpers#paginator) |

**Example**  
```jade
| !{ paginator({ base: `/` }) }
```

* * *

<a name="representative_image"></a>

## representative\_image(page) ⇒ [<code>ImageProbe</code>](#ImageProbe)
Get representative image object

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>object</code> | page object from hexo |

**Example**  
```jade
- const hero = representative_image(theme);
```

* * *

<a name="strip_html"></a>

## strip\_html(str) ⇒ <code>string</code>
Strip HTML tags from string <br>
The addition of highlightJS generated line indicator and special character
conversion is different from hexo one.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | the original string |

**Example**  
```jade
p= strip_html(post.content)
```

* * *

<a name="truncate"></a>

## truncate(str, len) ⇒ <code>string</code>
Truncate by word to avoid making the sentence difficult
to understand due to truncated by letter

**Kind**: global function  
**Access**: public  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 
| len | <code>number</code> | 


* * *

<a name="archivePost"></a>

## archivePost : <code>object</code>
post data object for archive

**Kind**: global typedef  
**Properties**

| Name | Type |
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

| Name | Type |
| --- | --- |
| iconName | <code>string</code> | 
| iconCategory | <code>string</code> | 


* * *

<a name="ImageProbe"></a>

## ImageProbe : <code>Object</code> \| <code>null</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> |  |
| width | <code>number</code> |  |
| height | <code>number</code> |  |
| type | <code>string</code> | type of image, usually file name extension |
| mime | <code>string</code> |  |
| wUnits | <code>string</code> |  |
| hUnits | <code>string</code> |  |


* * *

