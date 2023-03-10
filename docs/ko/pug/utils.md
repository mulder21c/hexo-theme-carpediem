# Pug Documentation

## pageTitle

layout 유형별 title 엘리먼트


### path

`components/utils/mixin.pug`


### examples

```jade
include /components/utils/util

+pageTitle
```


### example output

```html
<title>The Tracks of mulder21c</title>

```


---


## pageSequenceLink

sequential link 엘리먼트


### path

`components/utils/mixin.pug`


### examples

```jade
include /components/utils/util

+pageSequenceLink
```


### example output

```html
<link rel="next" href="https://mulder21c.io/page/2/" />

```


---


## openGraph

create og meta element


### path

`components/utils/mixin.pug`


### examples

```jade
include /components/utils/util

+openGraph({
  url: `https://example.com`
})
```


### example output

```html
<meta property="og:type" content="blog" />
<meta property="og:title" content="The Tracks of mulder21c" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:site_name" content="The Tracks of mulder21c" />
<meta property="og:locale" content="ko_KR" />
<meta property="article:author" content="mulder21c" />
<meta name="twitter:card" content="summary" />

```


---


## styles

create style elements from the stylesheet created by the theme
and the stylesheet specified.



### path

`components/utils/mixin.pug`


### arguments

|name|description|type|default|required|
|:---:|:---|:---:|:---:|:---:|
|paths||array||Y|



### examples

```jade
+styles([])
```
```jade
+styles(["//mydomain.com/external/style.css"])
```


### example output

```html
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="//mydomain.com/external/style.css" />

```


---


## jsonLD

create JSON-LD script element


### path

`components/utils/mixin.pug`


### examples

```jade
include /components/utils/util

+jsonLD
```


### example output

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "CollectionPage",
    "@name": "The Tracks of mulder21c",
    "url": "https://",
    "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
    "author": {
      "@type": "Person",
      "name": "mulder21c",
      "url": "https://www.facebook.com/mulder21c"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "BlogPosting",
          "@name": "The Tracks of mulder21c",
          "url": "https://",
          "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
          "author": {
            "@type": "Person",
            "name": "mulder21c",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Lorem Ipsum",
          "keywords": "mockup",
          "dateCreated": "1999-12-31T15:00:00.000Z"
        }
      ]
    }
  }
</script>

```


---
