---
title: class name에 대한 고찰
tags:
  - class naming
  - semantic naming
_categories:
  - 개발노트
  - HTML/CSS
date: 2014-12-03 20:43:34
hero: /upload/2013/html-code.gif
seo:
  description:  |
    mt10, fl, fr와 같은 류의 클래스 이름은 사용하지 않는 편이 좋다라고 생각한다. 특히나 웹 표준에서 말하는 구조와
    표현의 분리 원칙, class의 용도 그리고 시맨틱면에서 분명히 피해야 할 방법이다.
---


  금일 오전 하코사에 이러한 질문이 올라왔다.

>  ```css
>  .mt0{margin-top:0px !important;}
>  .mt5{margin-top:5px !important;}
>  .mt10{margin-top:10px !important;}
>  .mt15{margin-top:15px !important;}
>  .ml5{margin-left:5px !important;}
>  .ml10{margin-left:10px !important;}
>  .ml15{margin-left:15px !important;}
>  .ml20{margin-left:20px !important;}
>  .fl{float:left;}
>  .fr{float:right;}
>  .clear{clear:both; overflow:hidden;}
>  ```
>
>  등등등 이런식으로 고정으로 만들어
>  특정 div가 <code class="language-css">margin:10px 0 0 10px;</code>이 필요하다면
>  <code class="language-markup">&lt;div class="mt10 ml10"></code> 요런식으로 전부 통일하고 우리의
>  변덕스러운 클라이언트님의 한마디 내용물들 간격좀 더 떨어졌으면 좋겠습니다. 그럼 . mt10 을
>  찾아바꾸기로 바꿔버립니다 ㅋ <br>
>  어느덧 이런 습관이 문제라고 생각하여 고치려했는데 왜? 어떤부분에서? 문제인지는 모르겠더라고요
>  진짜 이게 문제있는 습관일까요? 아님 그냥 자신만의 스타일로 넘어갈수있는걸까요?
>
>  <footer><cite><a href="http://cafe.naver.com/hacosa/125315">코딩할때 특정 속성을 클레스로 만들어
> 쓰는 습관 (예 margin-top:10px; == .mt10) 안좋은가요?</a></cite></footer>

필자는 이 방법에 대해 좋지 않다, 그럴바에는 차라리 inline-style을 사용하는 것이 낫다라고
이야기하였으나, 몇몇은 효율상 좋은 방법이다라고 하거나 어째서 이 방법이 좋지 않은 방법인지 이해가
안된다 라는 피드백이 있어 왜 이 방법이 좋지 않은지에 대해 설명을 해 보고자 한다.

## class가 대체 뭔데?

우선 먼저 정확히 해야 할 것은 class가 무엇이고 무엇에 쓰는 물건인지부터 명확하게 해야 할 것 같다.
이미 여기서부터 명확하지 않으니 위와 같은 이슈가 발생되는게 아닌가 싶다. <br>
class가 무엇이고 무엇에 쓰는 것인지는 HTML의 표준규약을 제정하는 W3C의 문서에서 찾아보았다.

{% blockquote 7.5.2 Element identifiers: the id and class attributes http://www.w3.org/TR/html401/struct/global.html#h-7.5.2 W3C HTML4.01 Specification %}

<dl>
  <dt><samp>class</samp> = <em>cdata-list</em>[CS]</dt>
  <dd>This attribute assigns a class name or set of class names to an element.
  Any number of elements may be assigned the same class name or names. Multiple
  class names must be separated by white space characters.</dd>
</dl>

The class attribute, on the other hand, assigns one or more class names to an element; the element
may be said to belong to these classes. A class name may be shared by several element instances.
The class attribute has several roles in HTML:

- As a style sheet selector (when an author wishes to assign style information to a set of elements).
- For general purpose processing by user agents.

{% endblockquote %}


{% blockquote 3.2.3.7 The class attribute http://www.w3.org/TR/html5/dom.html#classes W3C HTML5 Specification %}

Note : Assigning classes to an element affects class matching in selectors in CSS, the
<code title="dom-document-getElementsByClassName">getElementsByClassName()</code> method in the
DOM, and other such features.

{% endblockquote %}

### class = Element identifiers

우선 봐야 할것은 id와 class 속성의 레이블이 Element identifires 라는데 있다. 즉 요소를 식별하기
위한 식별자로서 사용되는 속성이 id와 class라는 것이다.

이 의미는 매우 중요하다. class 로 무엇을 하느냐에 앞서 class의 존재 자체는 일단 요소를 식별하기 위한
식별자라는데 있다. <br>
그렇기 때문에 W3C에서 class naming에 있어 의미론적인 이름을 사용하라는 것이 아닐까 싶다.
(이 내용은 잠시 후에 다시 보도록 하겠다.)

식별자라는 것은 그 말 그대로 아이덴티티(정체성)를 부여하는 것이다. <br>
식별자를 주는데 왜 id / class 두 가지가 존재하는가? id 는 unique한 아이텐티티를 부여하는 것이라면
class는 그룹핑된 아이덴티티를 부여하는 것이라 볼 수 있다. <br>
마치 군번이 한 군인 자체의 아이덴티티라면 XX부대원은 그 그룹(부대)의 인원을 통틀어 부르기 위한
아이덴티티인 것과 같다.

mt10 이라는 클래스는 어떠한 아이덴티티로서의 의미는 결코 줄 수 없는 이름이다. <br>
예전에 신현석님의 블로그 포스팅 중 "모든 디자이너가 해야할 9가지 CSS 원칙"에 대한 의견에서
"클래스는 의미를 나타냅니다." 라고 기재된 내용이 있다. <br>
class는 의미부여를 위해 존재하는 것이다. 그리고 이것이 mt10, fl, fr등의 클래스 이름이 좋지 않은
첫 번째 이유다.

## 주객전도

W3C 명세에 따르면 HTML 안에서 class 속성이 가지는 용도는 CSS에 있는 선택자와의 매칭을 위한 용도와
DOM, script 등에서 요소를 hooking하기 위한 용도로 설명된다.  <br>
CSS 선택자로 혹은 JS의 hook으로 사용이 된다는 것은 class가 앞서 말한 바와 같이 식별자이기 때문에
가능함이다. 앞서 말한 바와 같이 class는 의미를 부여하기 위함으로 존재한다. 그리고 가시적인 표현은
CSS가 담당을 하는 것이다. <br>
mt10, fl, fr과 같은 클래스명을 사용하는 것은 사실상 CSS를 마크업에 추가하는 것과 동일하다.

```markup
<div class="mt10 fr"></div>
```

```markup
<div style="margin-top:10px;float:right;"></div>
```

상기 두 코드는 대체 무슨 차이가 있을까? <br>
아무 차이가 없다. 그저 표현을 위해 style을 작성할 것을 class로 대체한 것 뿐이고 두 코드는 완벽히
일치하는 코드인 셈이다.

웹표준에서 지향하는 구조와 표현의 분리는 온데간데 없다. 그냥 길게 쓰는게 귀찮아서 짧은 축약어로
바꾸기 위해 class를 쓴 것 밖에는 되지 않는다. <br>
이는 결국 주객이 전도된 형태다. 의미를 부여하고 그 이름에 따라 CSS 선택자와 매칭이 되어져서 표현이
이루어져야 할 것이 특정한 표현을 부여하기 위해 class 이름을 부여한 셈이니 말이다.

구조와 표현의 분리 원칙을 깨는 일. 이것이 해당 클래스 이름이 좋지 않은 두 번째 이유다.

간혹 margin-top:10px 하나만 추가해야 하는 상황에서 mt10 은 유용한 케이스라 하는 이들도 더러 있다.
솔직히 그게 왜 유용한 케이스인지는 모르겠다. 단지 15자로 작성되어야 할 것이 4자로 줄어서?
그게 유용한건가? 그런 클래스 이름을 쓸 바에는 그냥 style=”margin-top:10px”로 쓰는게 낫다라는 이유가
바로 이것이다.

동일한 방식으로 여러 페이지에 걸쳐 작업이 되어있다면 해당 페이지들을 모두 열어 수정을 가해야 하는데
뭐가 유용한건지 모르겠다. <br>
오히려 클래스 이름을 의미화 해서 CSS 만 열어봐도 선택자 이름만으로 해당 부분을 찾을 수 있다면 그게
더 유용한 것이 아닌가?  <br>
단지 몇 군데 스타일이 달라지는 것 때문에 저런 류의 클래스 이름을 써야 하는 케이스를 이야기 하는
경우도 있는데, 그럴거면 선택자 결합은 왜 존재하는지를 생각해 봤으면 좋겠다.

심지어 mt10 같은 것을 여러 개 두어 최적화를 한다는데 이것이 과연 최적화냐를 따져보아야 할 것이다. <br>
mt10 같은 것들을 여러 개 미리 정의해 둔다는 것은, 해당 것들이 필요하지 않은 곳에도 미리 정의된 것들이
존재해야 한다.  <br>
즉, margin-top:10px 16자를 4자로 줄이자고 몇 십 글자 혹은 몇 백 글자를 집어넣고 있는 꼴인데 이게
과연 최적화일까?

자주 스타일이 바뀌는 상황에서 유지보수에 이 방식이 좋다 라고 하는 이들도 있다. <br>
글쎄올시다다. 몇 자 덜치는 것이 과연 유지보수에 어떤 효율성을 가져다 주는지 필자는 여전히 의문문이다.
그냥 귀차니즘을 감추기 위한 핑계는 아닐까?

## W3C의 품질보증 Tip – 의미를 염두하고 클래스를 사용

HTML, CSS의 표준 권고안을 제정하는 W3C에 보면, 품질보증을 위한 몇 가지 팁들을 제공하고 있는데
여기에 class name에 대한 아티클이 있다.

{% blockquote Use class with semantics in mind. http://www.w3.org/QA/Tips/goodclassnames W3C quality assurance – Tips for Webmasters %}

Often people use class names like <code>bluetext</code>, or <code>redborder</code>. A much better
way to name your classes is with the role a certain HTML element of that class has.

**Good names don’t change**

Think about *why* you want something to look a certain way, and not really about *how* it should
look. Looks can always change, but the reasons for giving something a look stay the same.

<dl>
  <dt>Good names</dt>
  <dd>
    <code>warning</code>, <code>important</code>, <code>downloadableImage</code> and
    <code>submenu</code> are all good names. They describe what a certain element represents, and
    they are not likely to change. A warning will always remain a warning, no matter how much the
    look of the page changes.
  </dd>
  <dt>Bad names</dt>
  <dd>
    <code>border4px</code>, <code>lighttext</code> and <code>prettybackground</code> are examples
    of bad names. You might fatten that border to a whopping 5 pixels, or the background may look
    pretty old after a while, and not pretty at all. An advantage of using CSS is that you won’t
    have to change much in order to change the looks of your website. If you have to change all
    light text into dark text, and thus change all classes <code>lighttext</code> to
    <code>darktext</code> in <em>all</em> your HTML pages, you’re likely to miss a few.
  </dd>
</dl>

{% endblockquote %}

그리 어려운 영어는 아니니 굳이 해석은 하지 않겠다. (절대 귀찮아서가 아님!!! = _=a) <br>
W3C의 글에 따르면 의미론적인 클래스 이름의 사용은 웹의 품질과 관련이 된다. 이것이 해당 클래스
이름이 좋지 않은 세 번째 이유다.

mt10 은 margin-top : 10px 을 의미하는 것이니 충분히 의미론적이다 라고 말하는 어리석음은 없기를
바란다.

## class는 css properties의 모듈화를 위함이 아니다.

대다수 mt10, fl, fr등의 클래스 이름을 쓰는 이유 중 하나가 조합과 재사용일 것이다.
그런데 생각해보자 왜 조합을 클래스로 해결을 하려 하는가?

다른 부분은 다 동일한데 유독 다른 부분이 있는 곳에는 선택자 결합이라던가 서브 선택자를 사용하여
충분히 해결이 가능하다. <br>
혹 사이트 내 단 한 곳만 그러하다면 당연히 style 로 적용해도 전혀 무관하다. 웹표준에서 구조와 표현의
분리가 네버! 절대! style을 사용하면 안돼!는 아니니까 말이다. <br>
그렇다면 왜 굳이 이를 클래스로 해결하려 하는가를 따져보면 조합과 재사용에 목적을 두는 경우가 많다.
어찌 보면 그럴싸한 얘기인 듯도 싶다. 그러나 결국을 따져보면 mt10 을 쓰나 style로 margin-top:10px 을
주나 매 한가지인 경우다.

앞서 이야기 한 바와 같이 클래스 이름은 아이덴티티를 부여하기 위한 의미론적 이름을 부여해야 해야 하는
것이지, 클래스 이름을 모듈명으로 사용해서 하는 것은 그 용도에 맞지 않다. <br>
이는 마치 표 형태의 구조를 짜라고 존재하는 table 요소를 가지고 적게는 3 ~ 4 depth, 많게는 5 ~ 10
depth에 달하는 table 구조로 레이아웃을 짜는 우를 범하는 것과 매 한가지라고 봐도 무리는 아닐 것이다.

사실 CSS properties, 혹은 특정한 CSS 값을 모듈화 하는 것은 따로 존재한다. 바로 Less가 그러하고
Sass가 그러하다. <br>
이 녀석들은 분명하게 CSS properties나 특정 값에 대한 재사용을 정말 잘한다. 제대로 모듈화 되어 있다.
그렇게 모듈화해서 작성하고 싶다면 Less나 Sass를 사용하면 된다. 엄한 클래스 이름을 가지고 할 것이 아니라.
이것이 네 번째 이유다.

## 결론…

앞서 말한 네 가지 이유로 mt10, fl, fr와 같은 류의 클래스 이름은 사용하지 않는 편이 좋다라고 생각한다.
특히나 웹 표준에서 말하는 구조와 표현의 분리 원칙, class의 용도 그리고 시맨틱면에서 분명히 피해야 할 방법이다.

신현석님은 블로그를 통해

> CSS는 단지 상자의 크기를 지정하고 배경이미지를 넣기 위한 것이 아니다. 웹사이트 전반의 디자인을
> 규격화하여 정의하는 것이다. … 중략… 디자이너가 만들어준 디자인을 검토하고 웹사이트의 통일성을
> 지킬 수 있는 웹스타일 가이드를 스스로 만들어야 한다. 만약 디자이너가 이 가이드를 어기고 PSD마다
> 조금씩 흐트러진 모습을 보인다면 디자이너가 정말로 의도한 디자인이 어떤 것이고 어느 방향으로 구현이
> 되어야 하는지 묻고 재정의 해야 한다. 이때 CSS의 장점이 발휘되는 것이다. 이미 만들어져 있는 페이지도
> CSS 코드만 수정하면 새로 정의된 디자인이 사이트 전체에 적용되는 것이다. mt10, mt12, mt15 이런
> 이상한 방법으로 단순히 PSD를 HTML로 바꾸는 것이 아니라 일정에 쫓기는 디자이너를 도와 웹사이트의
> 디자인 통일성과 업무 효율성을 고민해줘야 하는 사람들이 바로 웹 퍼블리셔이다.

라고 이야기했다.  <br>
나는 전적으로 이 말에 동의한다.

용도에 맞게! 그리고 시맨틱하게! 그것이 답이다.
