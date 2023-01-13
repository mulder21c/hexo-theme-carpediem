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
<title>The tracks of mulder21c</title>

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
<link rel="prev" href="https://www.mulder21c.io//" />
<link rel="next" href="https://www.mulder21c.io/page/2/" />

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
include ./util

+jsonLD
```


### example output 

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "CollectionPage",
    "@name": "The tracks of mulder21c",
    "url": "",
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
          "@name": "The tracks of mulder21c",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=5vi8iejt1miueco"
          },
          "author": {
            "@type": "Person",
            "name": "mulder21c",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post 5vi8iejt1miueco",
          "keywords": "tag-5vi9gamf2n80p5o, tag-5vi9llcgb09aamo",
          "dateCreated": "2023-01-13T16:25:06.888Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "The tracks of mulder21c",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=5vi9o71dmkcng7"
          },
          "author": {
            "@type": "Person",
            "name": "mulder21c",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post 5vi9o71dmkcng7",
          "keywords": "tag-5vi9bfdcglaohcg, tag-5vi9doe346itnc8",
          "dateCreated": "2023-01-13T16:25:06.889Z"
        },
        {
          "@type": "BlogPosting",
          "@name": "The tracks of mulder21c",
          "url": "",
          "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
          "image": {
            "@type": "imageObject",
            "url": "https://via.placeholder.com/1600x900.png?text=5vi9bjsjtluijmo"
          },
          "author": {
            "@type": "Person",
            "name": "mulder21c",
            "url": "https://www.facebook.com/mulder21c"
          },
          "headline": "Post 5vi9bjsjtluijmo",
          "keywords": "tag-5vi9dje6tds4i8g, tag-5vi9tkg0t924rfg",
          "dateCreated": "2023-01-13T16:25:06.889Z"
        }
      ]
    }
  }
</script>

```


---


