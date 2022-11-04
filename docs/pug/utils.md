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
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=ei8erv889ntmopg"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post ei8erv889ntmopg",
          "keywords": "tag-ei8fn8foirf6rkg, tag-ei8f1sirh8dqfh8",
          "dateCreated": "2022-11-04T14:41:50.350Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=ei8f9hf5m1n8dqg"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post ei8f9hf5m1n8dqg",
          "keywords": "tag-ei8fu5os6aq3mvg, tag-ei8fcr5tr6os6tg",
          "dateCreated": "2022-11-04T14:41:50.351Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=ei8focrpnhgbpno"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post ei8focrpnhgbpno",
          "keywords": "tag-ei8f1q5g5ro9uog, tag-ei8ffb1q5q401u8",
          "dateCreated": "2022-11-04T14:41:50.351Z"
        }
      ]
    }
  }
</script>

```


---


