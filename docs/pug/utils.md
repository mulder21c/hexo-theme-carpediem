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
            "url": "https://via.placeholder.com/1600x900.png?text=hr6avarp9k8fs88"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post hr6avarp9k8fs88",
          "keywords": "tag-hr6borkna9q954, tag-hr6blj2oq2nh39",
          "dateCreated": "2022-11-27T14:58:37.898Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=hr6b57j2uboogo"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post hr6b57j2uboogo",
          "keywords": "tag-hr6b863qlud1f98, tag-hr6b9nj3siqjpj",
          "dateCreated": "2022-11-27T14:58:37.899Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "Hexo",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "John Doe" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=hr6c0qi0qcgrt98"
          },
          "author": {
            "@type": "Person",
            "name": "John Doe",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post hr6c0qi0qcgrt98",
          "keywords": "tag-hr6cc6do29o66po, tag-hr6c7rjf9ji9fro",
          "dateCreated": "2022-11-27T14:58:37.900Z"
        }
      ]
    }
  }
</script>

```


---


