---
title: 세로 100% 레이아웃
tags:
  - 세로 100% 레이아웃
_categories:
  - 개발노트
  - HTML/CSS
date: 2014-10-25 00:08:25
seo:
  description: 최근 모바일 작업을 하는 중에 flexbox 관련 CSS 를 찾다가 재밌는(?) trick을 발견했다.
---


기억하기로 처음 필자가 세로 100% 레이아웃을 만들기 위해 머리를 싸맸던것은, 블로그 스킨을 만들면서
처음으로 header – main(container) – footer 구조를 만들기 위해서 였던것 같다.

당시의 나는 아직 퍼블리셔로서의 진로는 결정하기 이전이었고, 그냥 취미삼아 공부삼아 블로그 스킨을
만들던 때였다. 그 때부터 이미 구글은 내게 훌륭한 조언자(?)였고 인터넷에는 많은 선생님들이 계셨다 ㅎㅎ

## Old Version

지금까지도 여전히 사용되는 방법이기는 하지만, 이제는 Old 로 좀 넘기고 싶다 /=ㅁ=/ ;;

아마 대다수가 많이 알고 있는 코드이겠지만 기존에 header – main(container) – footer의 구조에서 세로
100% 레이아웃을 만들기 위해서는 다음과 같은 방식의 코드를 사용해 왔다.

** Markup **

```markup
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title></title>
</head>
<body>
  <div id="header">
    Header Area
  </div>
  <div id="wrapper">
    <div id="container">
      컨테이너
    </div>
  </div>
  <div id="footer">
    Footer Area
  </div>
</body>
</html>
```

** CSS **

```css
html, body{
  margin:0;
  padding:0;
  height:100%;
}
#header{
  position:relative;
  height:100px;
  z-index:1;
}
#wrapper{
  margin:-100px 0 -100px;
  min-height:100%;
}
* html #wrapper{
  height:100%;
}
#container{
  padding:100px 0 100px;
}
#footer{
  position:relative;
  height:100px;
  z-index:1;
}
```

아주 많이 봐 왔던 코드이리라 싶다. 그런에 이 코드의 문제(?)는 container를 감싸주는 dummy 요소가
반드시 필요하다라는 점과… container 내의 padding 값이나 header/footer의 z-index 값으로 인해
원치않은 오류를 아주 간혹 만나기도 했더라는 점… ㄷㄷㄷ;

그러나 최근 모바일 작업을 하는 중에 flexbox 관련 CSS 를 찾다가 재밌는(?) trick을 발견했다. 이걸 어느
사이트에서 봤었는지는 기억이 나질 않는데다 브라우저 history에도 남아있지를 않아서 확인이 불가능하지만,
다행스럽게도 이 trick을 이용하여 작업해본 덕분에 머리속에 콕! 박혔다 ㅋ

## Use table trick

제목에 보듯 그 trick이라는것은 table을 이용한 방법이다. HTML table element를 말하는 것이 아니라,
CSS의 display 속성값 중 table에 관련된 값들을 이용한 방법이다.

이미 table과 관련된 속성값을 이용한 트릭이 몇 가지 알려져 있는 것들이 있는데, 와… 정말 이걸 이렇게
사용할 수 있으리라고는 정말 상상도 못했다. /=ㅁ=/ 외쿡 개발자들은 정말 대단하다… ㄷㄷㄷ

코드는 다음과 같다.

** Markup **

```markup
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>Document</title>
</head>
<body>
  <div id="header">
    Header Area
  </div>
  <div id="container">
    컨테이너
  </div>
  <div id="footer">
    Footer Area
  </div>
</body>
</html>
```

** CSS **

```css
html,body{
  height:100%
}
body{
  display:table;
  width:100%
}
#header,#footer{
  display:table-row;
  width:100%;
  height:1px
}
#container{
  display:table-row;
  width:100%;
  height:100%
}
```

어떤가!!! table-row를 이용한 방법이라니!!!

아, height : 1px 로 되어 있다 하여서 당황하지는 말자. table 렌더링 특성 상 1px 로 height 가 설정되어
있다 하더라도 내부 컨텐츠에 따라 알아서 자동으로 늘어나고 #container 영역 역시 그에 따라 알아서
height를 가져간다.

그런데, display:table을 사용하는 방법이라니… 크로스브라우징에는 문제가 없을까? 늘 문제는 IE가
일으키니 (이 죽일놈의 IE…) VirtualBox에 구성해둔 IE 6, 7, 8, 9 레거시 버전들로 테스트를 진행해 봤다.

** Test Source Code **

```markup
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>Document</title>
  <style type="text/css">
    *{margin:0;padding:0}
    html,body{height:100%}
    body{display:table;width:100%}
    #header,#footer{display:table-row;width:100%;height:1px}
    #container{display:table-row;width:100%;height:100%}

    body{font-size:3em;color:#FFF}
    #header,#footer{background-color:#F00}
    #container{background-color:#0F0}
  </style>
</head>
<body>
  <div id="header">
    Header Area
  </div>
  <div id="container">
    컨테이너
  </div>
  <div id="footer">
    Footer Area
  </div>
</body>
</html>
```

{% raw %}
<div class="horizon-overflow">
  <table>
    <caption><i class="fab fa-windows" aria-hidden="true"></i> IE 버전별 크로스브라우징 테스트 결과</caption>
    <colgroup>
      <col style="width:30%;">
      <col style="width:20%;">
    </colgroup>
    <thead>
      <tr>
        <th scope="col">OS</th>
        <th scope="col">IE version</th>
        <th scope="col">테스트 결과</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" rowspan="3">Windows XP</th>
        <th scope="row">IE 6</th>
        <td>
          container가 브라우저의 높이 만큼 그대로 차지함. <br>
          header / footer 가 차지한 영역만큼 추가로 스크롤링 발생 <br>
          그래.. 넌 안될 줄 알았어…
        </td>
      </tr>
      <tr>
        <th scope="row">IE 7</th>
        <td>
          뭐냐…넌… header / footer가 1px로 렌더링 <br>
          footer 만큼의 영역만 여백으로 발생 <br>
          너도 땡! 탈락!
        </td>
      </tr>
      <tr>
        <th scope="row">IE 8</th>
        <td>오오미!! 된다!!</td>
      </tr>
      <tr>
        <th scope="row" rowspan="2">Windows 7(32bit)</th>
        <th scope="row">IE 8</th>
        <td>오~ 역시 잘됨</td>
      </tr>
      <tr>
        <th scope="row">IE 9</th>
        <td>오~ 잘 나옴</td>
      </tr>
    </tbody>
  </table>
</div>
{% endraw %}

일단 IE 계열에서는 7 이하를 버리면 문제 없다. 쿨럭…

그렇담 모바일 쪽은 어떨까? <br>
모바일쪽은 아무래도 역시 모바일계의 IE 안드로이드 브라우저가 파편화가 심하니 안드로이드 브라우저를
대상으로 Genymotion을 이용하여 가상화 테스트를 진행해봤다.

{% raw %}
<div class="horizon-overflow">
  <table>
    <caption>
      <i class="fab fa-android"></i> Android 버전별 기본 브라우저 테스트 결과
    </caption>
    <colgroup>
      <col style="width:20%">
    </colgroup>
    <thead>
      <tr>
        <th scodpe="col">버전</th>
        <th scodpe="col">테스트 결과</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">2.3.7 (생강빵) </th>
        <td>어라? 의외로 의도대로 나옴</td>
      </tr>
      <tr>
        <th scope="row">4.1.1 (젤리빈)</th>
        <td>
          헐퀴… 역시 안드로이드… container 영역에 width 값을100% 가지지 못하는 문제 발생 <br>
          단, container 영역 내 직속자식으로 블럭요소를 넣으면 문제가 해결되기는 함.
        </td>
      </tr>
      <tr>
        <th scope="row">4.2.2 (젤리빈)</th>
        <td>상동</td>
      </tr>
      <tr>
        <th scope="row">4.3 (젤리빈)</th>
        <td>상동</td>
      </tr>
      <tr>
        <th scope="row">4.4.4 (킷캣)</th>
        <td>오.. 다시 잘 나옴</td>
      </tr>
    </tbody>
  </table>
</div>
{% endraw %}

역시 명불허전 안드로이드다… <br>
희한하게도 진저브레드에선 잘 나왔다가 젤리빈에선 버그가 나왔다가 다시 킷캣에선 잘 나온다… = _=a

## 결론

결과적으로 PC 웹에서보자면 IE 7 이하에 대한 대응만 없다면 써 볼 만하겠다. 단, IE 8 은 그래도 웬지
께름칙하므로… 테스트는 꼭 해봐야 할듯…

모바일 웹에서는 container 영역에 직속자식으로 block-level 요소를 하나 집어넣고만 쓴다면 역시 괜찮은
방법일듯 하다.