# Pug Documentation 

## pageTitle

create title element based on post type


### path 

`components/utils/mixin.pug`


### examples

```jade
include ./util

+pageTitle
```


### output example 

```html
<title>Hexo</title>

```


---


## pageSequenceLink

create relational link element


### path 

`components/utils/mixin.pug`


### examples

```jade
include ./util

+pageSequenceLink
```


### output example 

```html
<link rel="prev" href="http://example.com///" />
<link rel="next" href="http://example.com//page/2/" />

```


---


## openGraph

create og meta element


### path 

`components/utils/mixin.pug`


### examples

```jade
include ./util

+openGraph
```


### output example 

```html
<meta property="og:title" content="Hexo" />
<meta property="og:url" content="http://example.com/" />
<meta property="og:site_name" content="Hexo" />
<meta property="og:locale" content="ko_KR" />
<meta property="article:author" content="John Doe" />
<meta name="twitter:card" content="summary" />
...

```


---


## styles

create style elements from the stylesheet created by the theme
and the stylesheet specified.



### path 

`components/utils/mixin.pug`


### arguments 

|name|description|type|default|optional|
|:---:|:---|:---:|:---:|:---:|
|paths||array||false|



### examples

```jade
+styles([])
```
```jade
+styles(["//mydomain.com/external/style.css"])
```


### output example 

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
include ./util

+jsonLD
```


### output example 

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "CollectionPage",
    "@name": "Hexo",
    "url": "",
    "copyrightHolder": { "@type": "Person", "name": "John Doe" },
    "author": {
      "@type": "Person",
      "name": "John Doe",
      "url": "https://www.facebook.com/mulder21c"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": { "@type": "imageObject" },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post ogr1u6ramghohqo",
          "keywords": "tag-ogr22ee089d9f7o, tag-ogr2ccer6kss24o",
          "dateCreated": "2022-08-31T10:39:43.457Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": { "@type": "imageObject" },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post ogr2s4l602mbrto",
          "keywords": "tag-ogr27pvu3keiqt, tag-ogr2mm7uh0r713o",
          "dateCreated": "2022-08-31T10:39:43.458Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": { "@type": "imageObject" },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post ogr2fgajeofrg3g",
          "keywords": "tag-ogr24iu1gv5kl2g, tag-ogr2q05hrpp117g",
          "dateCreated": "2022-08-31T10:39:43.458Z"
        }
      ]
    }
  }
</script>

```


---


