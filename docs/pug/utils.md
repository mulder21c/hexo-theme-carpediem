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
<link rel="prev" href="http://example.com//" />
<link rel="next" href="http://example.com/page/2/" />

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
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=0c8mtf5nrr4k6p8"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post 0c8mtf5nrr4k6p8",
          "keywords": "tag-0c8mt9gb1j3c06, tag-0c8mfnvmg9niieo",
          "dateCreated": "2022-10-02T07:54:10.070Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=0c8mv0u1k188oeg"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post 0c8mv0u1k188oeg",
          "keywords": "tag-0c8m9hoqrcjbqno, tag-0c8mne29vmmutmg",
          "dateCreated": "2022-10-02T07:54:10.070Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=0c8mvklgsk68kqo"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post 0c8mvklgsk68kqo",
          "keywords": "tag-0c8m4hvuq0mmms8, tag-0c8mvjip8dath78",
          "dateCreated": "2022-10-02T07:54:10.070Z"
        }
      ]
    }
  }
</script>

```


---

