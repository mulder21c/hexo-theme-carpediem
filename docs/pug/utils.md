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


### example output 

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


### example output 

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


### example output 

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
include ./util

+jsonLD
```


### example output 

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
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=nl6ii3i25pdc3qg"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post nl6ii3i25pdc3qg",
          "keywords": "tag-nl6jl68as5gni2o, tag-nl6jb4cjnpr9kvg",
          "dateCreated": "2022-12-03T08:48:04.818Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=nl6jvm18jdhrhs"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post nl6jvm18jdhrhs",
          "keywords": "tag-nl6j2mb1qkqrpa8, tag-nl6jfvdmu96hg8",
          "dateCreated": "2022-12-03T08:48:04.819Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=nl6jnlmduvhgrug"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post nl6jnlmduvhgrug",
          "keywords": "tag-nl6juf77n9ferl, tag-nl6jolg98sas1kg",
          "dateCreated": "2022-12-03T08:48:04.819Z"
        }
      ]
    }
  }
</script>

```


---


