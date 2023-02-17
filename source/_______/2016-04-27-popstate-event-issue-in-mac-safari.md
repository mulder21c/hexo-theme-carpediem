---
title: Mac Safari에서 popstate 이벤트 문제
tags:
  - cross browsing
  - pjax
  - popstate
  - safari
_categories:
  - 개발노트
  - JavaScript
date: 2016-04-27 13:40:08
seo:
  description: |
    popupstate 이벤트가 발생되는 시점의 문제였는데, 다른 브라우저들은 문제가 없는 반면 Mac Safari에서는 이
    이벤트가 페이지 로드와 동시에 발생되는 문제가 발생한 것…
---


최근 작업 중인 사이트에 History객체의 <code class="language-javascript">.pushState()</code> 메서드와
<code class="language-javascript">.replaceState()</code> 메서드를 이용해서 ajax에 대한 URL history
처리를 해 두었는데, QA를 진행 하던 중 Mac Safari에서
<code class="language-javascript">window.onpopstate</code> 이슈가 발생했다.

원인을 찾아가 보니 결국 <code class="language-javascript">popupstate</code> 이벤트가 발생되는 시점의
문제였는데, 다른 브라우저들은 문제가 없는 반면 Mac Safari에서는 이 이벤트가 페이지 로드와 동시에
발생되는 문제가 발생한 것…

## 해결

임시 방편일지 이렇게 하는 것이 최선책일지는 확신이 되지는 않으나, 일단 Mac Safari일 경우에 한하여
이벤트 바인딩 시점을 지연시키는 방식으로 해결을 해 두었다.

```javascript
(function(ua){
  ua = ua || navigator.userAgent;
  ua = ua.toLowerCase();
  if( /safari/.test(ua) && !!window.chrome ){
    // not safari
    window.onpopstate = function(event){
      event = event || window.event;
      ...
    };
  }else{
    // if safari
    setTimeout(function(){
      window.onpopstate = function(event){
        ...
      };
    }, 500);
  }
})(navigator.userAgent);
```

현재로서는 일단 아무런 문제 없이 잘 적용이 되어 있는 것으로 보인다.