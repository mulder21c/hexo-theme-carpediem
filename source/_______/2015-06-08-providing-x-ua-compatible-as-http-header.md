---
title: X-UA-Compatible를 HTTP header 정보로 제공하기
tags:
  - x-ua-compatible
  - 웹 퍼블리싱
  - Internet Explorer
_categories:
  - 개발노트
  - HTML/CSS
date: 2015-06-08 10:56:31
thumbnail: /upload/2015/thumbs/internet-explorer.jpg
hero: /upload/2015/internet-explorer.jpg
seo:
  description: |
    <meta http-equiv="X-UA-Compatible" content="IE=edge">를 사용함으로 인해서 늘 W3C markup validator로
    markup validation을 진행하면 오류가 발생되어지게 된다. 이 오류를 안 만날 수는 없을까?
---



퍼블리싱의 이슈의 중심에는 늘 Microsoft Internet Explorer(이후 IE)가 있다.

IE의 버전이 업데이트가 되면서 IE 8버전부터 호환성 보기라는 요상한 기능이 하나 추가가 되었었다. 하위
호환성을 위한 정책이라지만 이 녀석 때문에 생기는 문제는 여전히 너무 많다. 그 중 한 가지가 바로
<code class="language-markup">&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"></code> 이
녀석이다. 이 녀석을 사용함으로 인해서 늘 W3C markup validator로 markup validation을 진행하면 오류가
발생되어지게 된다. 이 오류를 안 만날 수는 없을까?

## What is http-equiv

meta 요소를 사용하지 않고 이 문제를 해결해보기 위해 먼저 찾아본 건 과연 http-equiv가 무엇인가 하는
것이다. 이전부터 meta 요소에 http-equiv를 사용은 해 왔으나 한 번도 찾아볼 생각을 안하고 있었다니…
참… ㅠㅠ

[W3Schools](http://www.w3schools.com/tags/att_meta_http_equiv.asp)에서는 http-equiv에 대해서 다음과
같이 설명하고 있다.

> The http-equiv attribute provides an HTTP header for the information/value of the content attribute.
The http-equiv attribute can be used to simulate an HTTP response header.

즉, http-equiv attibute를 통해 제공하는 정보는 HTTP Header 정보로 동일하게 제공이 가능하다라는 것.

## MS IE에서는 X-UA-Compatible 정보를 어떻게 얻어내는가?

http-equiv가 대략 무언인지를 알고 난 이후 궁금한건 그렇다면 MS IE는 무얼 기준으로 X-UA-Compatible
정보를 획득하는가였다. 이를 알기 위해 이번에는 MS문서를 검색…

MS 블로그에서 다음과 같은 도표를 찾을 수 있었다.

<p>
  {% img /upload/2015/ie10-document-mode-determination-flow-chart-diagram-based-on-meta-element-or-http-header.gif "''" "'Determining Document Mode diagram for IE'" %}
</p>

개괄적으로 보면,

1. 개발자도구에 의해 설정되어 있는 문서모드를 가장 우선으로 적용
2. X-UA-Compatible Meta tag의 유무를 판단하여 이를 먼저 적용,
3. 그 다음 순위가 HTTP Response Header에 담긴 X-UA-Compatible 정보를 확인하여 적용

이 순서를 따라 문서모드가 결정되는 것으로 보인다.

## HTTP Reponse Header정보로 X-UA-Compatible 제공

상기 내용을 토대로 생각해 봤을 때, HTTP Header 정보로 기본적인 X-UA-Compatible 설정을 제공하고,
특정 페이지에서는 다른 문서모드를 사용해야 한다면 X-UA-Compatible meta tag를 이용하여 추가 제공을
하면 해당 페이지는 meta tag에 의해 결정될 것을 기대할 수 있기에 이 방식으로 처리를 하게 되면 W3C
validator의 오류를 피해 X-UA-Compatible 정보를 제공할 수 있을 것이라는 결과가 기대 된다.

IIS 설정을 통해 HTTP Response Header에 X-UA-Compatible 값을 IE=edge로 설정을 하고 HTML meta tag는
제거되어있는 상태로 두었을 경우, 개발자도구를 통해 확인해 봤을 때 HTTP Response Header에
<code class="language-http">X-UA-Compatible: IE=edge</code>라는 정보가 내려와 IE에서는 edge 모드로
렌더링 되는 것을 확인 할 수 있다.

현재 whatwg의 wiki 문서를 참고해보면, pragmaExtensions에 X-UA-Compatible은 아직까지 proposal 단계로
남아있다. 아마도 이 값이 allowed가 되기 전까지는 HTTP-Header 정보를 통해 기본 설정 값을 제공하는
방식이 W3C Validator 오류를 막는 괜찮은 방법이 아닐까 싶다.