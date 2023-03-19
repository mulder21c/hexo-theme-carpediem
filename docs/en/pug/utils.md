# Pug Documentation

## pageTitle

title element based on layout type


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

sequential link elements


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


## preLoadImage

preload link element for representational image


### path

`components/utils/mixin.pug`


### examples

```jade
include /components/utils/util

+preLoadImage
```


### example output

```html
<link
  rel="preload"
  as="image"
  href="41108552022_61413423d5_b.jpg"
  crossorigin="anonymous"
/>

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
<meta property="og:image" content="41108552022_61413423d5_b.jpg" />
<meta property="article:author" content="mulder21c" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:image" content="41108552022_61413423d5_b.jpg" />

```


---


## siteVerification

create meta element for site-verification


### path

`components/utils/mixin.pug`


### examples

```jade
+siteVerification
```


### example output

```html
<meta name="google" content="xxxx" />

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
    "url": "https://mulder21c.io/",
    "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
    "image": {
      "@type": "imageObject",
      "url": "41108552022_61413423d5_b.jpg",
      "width": "1024px",
      "height": "684px"
    },
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
          "url": "https://mulder21c.io/",
          "copyrightHolder": { "@type": "Person", "name": "mulder21c" },
          "image": {
            "@type": "imageObject",
            "url": "41108552022_61413423d5_b.jpg",
            "width": "1024px",
            "height": "684px"
          },
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
