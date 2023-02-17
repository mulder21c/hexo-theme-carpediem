---
title: 핸드폰 번호 하이픈(-) 자동입력
tags:
  - JavaScript
_categories:
  - 개발노트
  - JavaScript
date: 2014-11-03 14:05:42
seo:
  description: |
    input box에 입력을 한다고 했을 때 넘겨 받은 값으로 부터, 숫자 이외의 것들은 모두 제거하고 현재 입력된 값의
    길이에 따라 {3}-{3}-{3} 형태 혹은 {3}-{4}-{3} 형태가 되도록 잘라내어 문자열을 재구성 하는 방식이다.
---


최근 UI 작업 중에 핸드폰 번호 입력 시 자동으로 하이픈이 입력되도록 처리해달라는 요청이 있어 keyup
event에 바인딩하여 쓸 용도로 자동 하이픈 처리 함수 하나를 만들어 봤다.

원리는 매우 단순하다. <br>
일단 input box에 입력을 한다고 했을 때 value값을 인수로 넘겨주고 넘겨 받은 값으로 부터, 숫자 이외의
것들은 모두 제거하고 현재 입력된 값의 길이에 따라 {3}-{3}-{3} 형태 혹은 {3}-{4}-{3} 형태가 되도록
잘라내어 문자열을 재구성 하는 방식이다.

바로 적용을 시켜야 하는 부분이라서 최적화 부분은 크게 고민하지 않고 즉흥적으로 코드를 짰기 때문에
차후에 한 번 더 나은 코드를 고민해 보면 좋을 듯.

## Source Code

```javascript
function autoHypenPhone(str){
  str = str.replace(/[^0-9]/g, '');
  var tmp = '';
  if( str.length < 4){
    return str;
  }else if(str.length < 7){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  }else if(str.length < 11){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  }else{
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
  return str;
}
```

## Live Demo

{% raw %}
<p data-height="265" data-theme-id="dark" data-slug-hash="EvrDJ" data-default-tab="result" data-user="mulder21c" data-embed-version="2" data-pen-title="EvrDJ" class="codepen">See the Pen <a href="https://codepen.io/mulder21c/pen/EvrDJ/">EvrDJ</a> by mulder21c (<a href="https://codepen.io/mulder21c">@mulder21c</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
{% endraw %}