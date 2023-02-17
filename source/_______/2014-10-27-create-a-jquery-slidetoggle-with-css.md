---
title: CSS로 jQuery slideToggle() 효과 만들어보기
tags:
  - css animation
_categories:
  - 개발노트
  - HTML/CSS
date: 2014-10-27 14:51:12
seo:
  description: |
    일전에 프로젝트로 모바일 웹을 만들면서 재미겸 연습겸(?) CSS animation과 max-height 를 이용해서 jQuery의
    slideToggle()과 같은 효과를 만들어 봤다
---


일전에 프로젝트로 모바일 웹을 만들면서 재미겸 연습겸(?) CSS animation과 max-height 를
이용해서 jQuery의 slideToggle()과 같은 효과를 만들어 봤다. 몇 가지 고민을 더 해봐야 하는 부분이
있지만 만들어보고 나니 재밌는 형태를 하나 만든거 같다 ㅋ

## Example Sources

** markup **

```markup
<nav>
  <ul>
    <li>
      <a href="#">menu-01</a>
      <ul class="sub-nav">
        <li><a href="#">sub-menu-01</a></li>
        <li><a href="#">sub-menu-02</a></li>
        <li><a href="#">sub-menu-03</a></li>
        <li><a href="#">sub-menu-04</a></li>
        <li><a href="#">sub-menu-05</a></li>
      </ul>
    </li>
    <li>
      <a href="#">menu-02</a>
    </li>
    <li>
      <a href="#">menu-03</a>
    </li>
    <li>
      <a href="#">menu-04</a>
    </li>
    <li>
      <a href="#">menu-05</a>
    </li>
  </ul>
</nav>
```

** CSS **

```css|data-line="23-29,32"
nav ul{
  list-style-type: none
}
nav ul:after{
  clear: both;
  display: table;
}
nav > ul > li{
  float: left;
}
nav > ul > li{
  position: relative;
  background-color: #DEDEDE;
  width: 20%;
  line-height: 50px
}
nav ul.sub-nav{
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 900;
  max-height:0;
  overflow: hidden;
  -webkit-transition:all .5 cubic-bezier(0, 0, 1, 1);
  -moz-transition:all .5s cubic-bezier(0, 0, 1, 1);
  -ms-transition:all .5s cubic-bezier(0, 0, 1, 1);
  -o-transition:all .5s cubic-bezier(0, 0, 1, 1);
  transition:all .5s cubic-bezier(0, 0, 1, 1)
}
nav > ul > li:hover ul.sub-nav{
  max-height:250px
}
```

## description

방법은 단순히 해당 요소에 max-height 값을 0, overflow 값을 hidden으로 두고 transition을 주며, 펼쳐진
상태에 대한 셀렉터에 max-height 값을 지정해 주면 된다.

이 방법을 쓰게 되면 transition에 설정한 duration동안 max-height 값이 0에서부터 지정한 값까지 변하며
가시적으로는 마치 slideDown()을 준것과 같은 효과를 가져오게 된다.

참, 물론 키보드에 대응시키기 위해서는 역시 JavaScript를 사용해야만 하는 문제가 여전히 남아있기는 하다.

## Comments

다만, 이 방법에서 좀 더 고민을 해야 하는 부분이 발생이 되는데 바로 이 max-height로 동작된다라는 부분이다.
만일 단 하나만을 애니메이트 시키거나 동일한 높이값을 가지는 요소들에 대해서 max-height를 조정하게
된다면 큰 문제가 안되겠지만, 각기 다른 높이를 가지는 요소들을 컨트롤 하자면 애매해 질 수도 있다라는
것… 쿨럭;;

만일 각각의 높이에 대해 max-height 을 일일이 다 작성하자면 살짝 귀찮아지기도 하고 CSS 작성량이 좀
많아지게 될 수도 있다.

반면, 아예 max-height 값을 가장 큰 값으로 맞추어서 하게 되면 max-height 값이 특정 시간 안에 움직이는
케이스이다 보니, 어떤 것은 상대적으로 빠르게 애니메이트되는 것 처럼 보이고 어떤 것은 상대적으로
느리게 애니메이트 되는 것 처럼 보일 수 있다는 점이 좀 고민스럽게 만들기도 한다.

## Live Demo

{% raw %}
<p data-height="365" data-theme-id="dark" data-slug-hash="yBkho" data-default-tab="result" data-user="mulder21c" data-embed-version="2" data-pen-title="yBkho" class="codepen">See the Pen <a href="https://codepen.io/mulder21c/pen/yBkho/">yBkho</a> by mulder21c (<a href="https://codepen.io/mulder21c">@mulder21c</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
{% endraw %}