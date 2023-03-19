# Pug Documentation

## pageTitle

layout 유형별 title 엘리먼트


### 경로

`components/utils/mixin.pug`


### 예시

```jade
include /components/utils/util

+pageTitle
```


### 예시 출력 결과

```html
<title>The Tracks of mulder21c</title>

```


---


## pageSequenceLink

sequential link 엘리먼트


### 경로

`components/utils/mixin.pug`


### 예시

```jade
include /components/utils/util

+pageSequenceLink
```


### 예시 출력 결과

```html
<link rel="next" href="https://mulder21c.io/page/2/" />

```


---


## preLoadImage

대표 이미지에 대한 preload link 엘리먼트


### 경로

`components/utils/mixin.pug`


### 예시

```jade
include /components/utils/util

+preLoadImage
```


### 예시 출력 결과

```html
<link
  rel="preload"
  as="image"
  href="xxxxxxxx.jpg"
  crossorigin="anonymous"
/>

```


---


## openGraph

og 메타 엘리먼트 생성


### 경로

`components/utils/mixin.pug`


### 예시

```jade
include /components/utils/util

+openGraph({
  url: `https://example.com`
})
```


### 예시 출력 결과

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

site-verification을 위한 meta 엘리먼트 생성


### 경로

`components/utils/mixin.pug`


### 예시

```jade
+siteVerification
```


### 예시 출력 결과

```html
<meta name="google" content="xxxx" />

```


---


## styles

테마에 의해 생성된 스타일 시트 및 지정된 스타일 시트로부터
style 엘리먼트 생성



### 경로

`components/utils/mixin.pug`


### arguments

|이름|설명|유형|기본 값|필수 여부|
|:---:|:---|:---:|:---:|:---:|
|paths||array||Y|



### 예시

```jade
+styles([])
```
```jade
+styles(["//mydomain.com/external/style.css"])
```


### 예시 출력 결과

```html
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="/css/index.css" />
<link rel="stylesheet" href="//mydomain.com/external/style.css" />

```


---


## jsonLD

JSON-LD script 엘리먼트 생성


### 경로

`components/utils/mixin.pug`


### 예시

```jade
include /components/utils/util

+jsonLD
```


### 예시 출력 결과

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
