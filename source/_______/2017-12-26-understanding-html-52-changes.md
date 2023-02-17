---
title: HTML 5.2 변경점 제대로 이해하기
tags:
  - HTML 5.2
  - 무조건 모든 것이 가한게 아니다
  - HTML 5.3도 이미 시작됐다
_categories:
  - 개발노트
  - HTML/CSS
date: 2017-12-26 23:52:21
hero: /upload/2017/HTML-52.jpg
viewer360: false
seo:
  description: |
    HTML 5.2 Changes 중에서 가장 쉽게 오해할 수 있는 내용이 담긴 The following constructions are now valid
    HTML의 내용에 대해서 제대로 톺아보려 한다.
---


지난 14일 HTML 5.2가 Recommendation(이후 REC)으로 정식 등록되었다.

W3C HTML 명세에는 [Changes](https://www.w3.org/TR/html52/changes.html#changes)라는 섹션이 있어
이전 버전으로부터 변경된 사항들이 기술되어 있는데, HTML 5.2가 REC로 등록됨에 따라 이 changes가
각종 SNS 및 블로그들을 통해 전파되고 있는 중이다.

헌데, 역시나 예상대로 이 변경점들을 명세의 내용과 함께 보는 것이 아니라, 그냥 그 텍스트로 기술 된
그대로만 받아들이는 사람들이 더러 발생되고 있는 듯이 보인다. 심지어는 이것이 본래 W3C 명세에 기술
되어 있는 내용인데도 불구하고 해당 글을 어디에서 볼 수 있는지 모르는 것은 둘째치고, 어느 블로그에
있다고 하는 등의 내용도 쉽게 발견할 수 있다.

해서, HTML 5.2 Changes 중에서 가장 쉽게 오해할 수 있는 내용이 담긴
[The following constructions are now valid HTML:](https://www.w3.org/TR/html52/changes.html#fixing-bugs-and-matching-reality-better)의
내용에 대해서 제대로 톺아보려 한다.

## <code class="language-markup transparent">&lt;style></code> within the <code class="language-markup transparent">&lt;body></code>

직역하자면, <code class="language-markup transparent">&lt;body></code> 안에
<code class="language-markup transparent">&lt;style></code>을 사용할 수 있게 되었다라는 것이다.

아마 HTML 명세를 읽어본 적이 없는 사람이라면, 원래 쓸 수 있지 않았나? 라는 의문을 품을지도 모르겠다.

실제로 <code class="language-markup transparent">&lt;style></code>은 본디
<code class="language-markup transparent">&lt;body></code> 안에 사용할 수 없게 되어 있었다.

하지만 HTML 5.2부터는 <code class="language-markup transparent">&lt;style></code>도
<code class="language-markup transparent">&lt;body></code> 안에 작성할 수 있게 되었다.

문제는 이것을 <code class="language-markup transparent">&lt;body></code> "안(within)"이라는 표현이
anywhere라는 표현으로 받아들이기에는 무리가 있다는 것이다.

HTML 5.2에서 [style 요소의 명세](https://www.w3.org/TR/html52/document-metadata.html#elementdef-style)를 보면
style 요소가 사용될 수 있는 컨텍스트에 대해 다음과 같이 명시되어 있다.

> <dt><a data-link-type="dfn" href="https://www.w3.org/TR/html52/dom.html#contexts-in-which-this-element-can-be-used" id="ref-for-contexts-in-which-this-element-can-be-used⑥">Contexts in which this element can be used</a>:</dt>
> <dd> Where <a data-link-type="dfn" href="https://www.w3.org/TR/html52/dom.html#metadata-content-2" id="ref-for-metadata-content-2①⓪">metadata content</a> is expected. </dd>
> <dd> In a <code><a data-link-type="element" href="https://www.w3.org/TR/html52/semantics-scripting.html#elementdef-noscript" id="ref-for-elementdef-noscript⑥">noscript</a></code> element that is a child of a <code><a data-link-type="element" href="https://www.w3.org/TR/html52/document-metadata.html#elementdef-head" id="ref-for-elementdef-head③①">head</a></code> element. </dd>
> <dd> In the body, where <a data-link-type="dfn" href="https://www.w3.org/TR/html52/dom.html#flow-content-2" id="ref-for-flow-content-2⑧">flow content</a> is expected.</dd>

body 요소에 대한 것을 보면, flow content가 예상되는 곳으로 제한이 되어 있는 것을 볼 수 있다.
body 안(in)이면 아무 곳이나 가능하다는 것이 아니라는 것이다.

예를 들어, p 요소의 콘텐트 모델[^1]은 [Phrasing Content](https://www.w3.org/TR/html52/dom.html#phrasing-content)다.
따라서, 아무리 <code class="language-markup transparent">&lt;body></code> 안에
<code class="language-markup transparent">&lt;style></code>을 작성할 수 있게 되었다 하더라도
body 내의 p 요소 안에는 <code class="language-markup transparent">&lt;style></code>이 사용 될 수 없다.


또 한 가지 더 봐야 할 것은, style 요소 명세에 달린 주석이다.

> A <code><a data-link-type="element" href="https://www.w3.org/TR/html52/document-metadata.html#elementdef-style" id="ref-for-elementdef-style⑨">style</a></code> element should preferably be used in the <code><a data-link-type="element" href="https://www.w3.org/TR/html52/document-metadata.html#elementdef-head" id="ref-for-elementdef-head③②">head</a></code> of the document.
> The use of <code><a data-link-type="element" href="https://www.w3.org/TR/html52/document-metadata.html#elementdef-style" id="ref-for-elementdef-style①⓪">style</a></code> in the <code><a data-link-type="element" href="https://www.w3.org/TR/html52/sections.html#elementdef-body" id="ref-for-elementdef-body②②">body</a></code> of the document may cause restyling, trigger layout
> and/or cause repainting, and hence, should be used with care.

라고 기재되어 있다.

한국어로 번역해보자면, &lsquo;style 요소는 가급적 문서의 head 요소에 작성해야(should) 한다.&rsquo;
는 것이다. should로 작성된 부분은 강제성이 must에 비해서는 떨어지는 것이 사실이지만 이를 사용할
때에는 신중을 가해야 하는 것이 옳으며 여전히 강한 권장이다.[^2]

이러한 내용을 무시한 채, 그저 <code class="language-markup transparent">&lt;body></code> 안에
<code class="language-markup transparent">&lt;style></code>을 사용할 수 있게 되었다라고 해서 모든
것이 가하다는 식으로 받아들이는 것은 문제가 있다.

추가적으로, [WHATWG의 명세](https://html.spec.whatwg.org/multipage/semantics.html#the-style-element)에는
해당 항목이 빠져있다. W3C와 WHATWG 각각에서 논의 된 히스토리를 읽어보면 서로 다른 입장을 취하는 듯
보인다.[^3]

아울러, 현재 W3C nu HTML Checker는 아직 body 요소 내의 style 요소를 Error로 검출하고 있다. <br>
반면 의아한 것은 오류 사항에 style 요소가 사용될 수 있는 컨텍스트에 대해 &lsquo;In the body, where flow
content is expected.&rsquo;를 출력해주고 있다.

이 요구 사항에 대해 명확한 의미를 알고 싶어서 w3c github에 issue로 질문을 올렸는데 아직까지는 답이 없는
상태... ㅠㅠ

<hr>

## Multiple <code class="language-markup transparent">&lt;main></code> elements in the DOM, *so long as only one is visible to the user*

텍스트 그대로 직역해보면, 사용자에게 보이는 것이 하나이기만 하면, DOM 안에 여러 개의
<code class="language-markup transparent">&lt;main></code> 요소가 가능하다라는 것이다.

여기서 가장 쉽게 오해하는 부분이 "보이는 것이 하나"라는 데에서 오는 부분일터인데, 이 경우
stylesheet에 의해 숨겨놓은 형태를 생각하는 경향이 있다.

하지만, W3C 명세의 예제를 보면 "보이는 것이 하나"라는 데에 약간 다른 의미로 사용되는 것을 볼 수 있다.

```html
<!-- conforming example -->
<main>...</main>
<main hidden>...</main>
<main hidden>...</main>

<!-- non-conforming example -->
<main>...</main>
<main>...</main>
<main>...</main>
```

이것이 W3C 명세에 작성되어 있는 예제이다. 보는 바와 같이 2~4번째 라인까지의 코드는 적합한 예제이며,
7~9번째 라인의 코드는 부적합한 예제라고 표현된다. 이에 대한 명확한 표현은 명세 본문에서 찾아볼 수
있는데

> There must not be more than one visible <code class="language-markup transparent">&lt;main></code>
> element in a document. If more than one <code class="language-markup transparent">&lt;main></code>
> element is present in a document, all other instances must be hidden using §[5.1 The hidden attribute.](https://www.w3.org/TR/html52/editing.html#the-hidden-attribute)

라고 작성되어 있는 부분을 볼 수 있다.

다시 말해, "보이는 것이 하나"라는 것은 "시각적"으로 보이는 것이 하나라는 의미라기 보다는
"의미론적으로" 보이는 것이 하나라고 해석해야 더 적절할 것이다.

단순히 (시각적으로) 보이는 것이 하나이면 <code class="language-markup transparent">&lt;main></code>을
여러 개 사용할 수 있다라고 인식해버리면 다음의 코드 역시 가해야 할 것이다.

```html
<!-- non-conforming example -->
<main>...</main>
<main style="display: none">...</main>
<main style="display: none">...</main>
```

하지만 W3C nu HTML Checker는 이 코드 조각을 오류로 검출한다. 왜냐고? HTML Validator는 Markup 구조를
검사하는 것이니까 당연하다. "보이는 것"은 구조적, 의미론적인 부분이지 "시각적인 부분"이 절대 아니다. (물론
hidden 속성이 사용된 요소는 브라우저에서 시각적으로도 숨겨지도록 구현되어 있다.)

<hr>

## The presentation for the <code class="language-markup transparent">&lt;img></code> element.

이 부분은 W3C의 오타일 것으로 예상된다.
[PR버전의 Changes](https://www.w3.org/TR/2017/PR-html52-20171102/changes.html#changes-wd5)에서는
&lsquo;Allow role="presentation" on img&rsquo;라고 기재되어 있는 것을 볼 수 있다.

아마도 &lsquo;The presentation role for the <code class="language-markup transparent">&lt;img></code> element&rsquo;가 본래 의도한 내용일 듯 하다.

다만, 사실 <code class="language-markup transparent">&lt;img></code>에 presentation role이 허용된 것은
5.2가 아니라 5.1이다. 5.2에서의 변경점은 presentation role외에 none도 가능해졌다는 것이다.
실제로 [PR버전의 Changes](https://www.w3.org/TR/2017/PR-html52-20171102/changes.html#changes-wd5)의
해당 항목에 연결된 [github commit](https://github.com/w3c/html/commit/de1b4da5d27578026da88792f251cfab04c9ae08)
내용은 none role 추가에 관한 것임을 보여주고 있다. (이것이 W3C 에디터의 실수인건지는 확실하지 않다.)

HTML 5.2에서의 <code class="language-markup transparent">&lt;img></code> 요소 명세 중
"Allowed ARIA role attribute values:" 항목을 보면 다음과 같다.

> presentation or none role only, for an <code class="language-markup transparent">&lt;img></code> element whose alt attribute’s value is empty (alt=""),
> otherwise Any role value.

반면, 5.1에서의 "Allowed ARIA role attribute values:"은 다음과 같다.

> &lsquo;presentation&rsquo; role only, for an <code class="language-markup transparent">&lt;img></code> element whose alt attribute’s value is empty (alt=""), otherwise Any role value.

무튼, 이것 역시도 그냥 presentation이나 none role이 사용 가능하다는 것이 아니라 alt 속성의 값이 빈
값이라는 제한적 조건 하에서 가능한 내용이다. 그도 그럴 것이 대체 텍스트가 있는데 의미가 없는 이미지라고
역할을 부여해버리면 native language(HTML) 작성자의 의도와는 전혀 다른 것이 되어진다.

<hr>

## <code class="language-markup transparent">&lt;div></code> as a child of a <code class="language-markup transparent">&lt;dl></code> element.

이 포스트를 작성하게 된 결정적 계기. 이 문구 하나로 인해 명세에 없는(?) 이야기를 하는 사람을 보았...

일단 결론부터 말하면 역시 <code class="language-markup transparent">&lt;dl></code> 요소의 자식으로
<code class="language-markup transparent">&lt;div></code> 요소는 아무렇게나 작성할 수 있는 것은 아니다.

HTML 5.2에서 <code class="language-markup transparent">&lt;dl></code>의 콘텐트 모델은 다음과 같다.

> Either: Zero or more groups each consisting of one or more
> <code class="language-markup transparent">&lt;dt></code> elements followed by one or more
> <code class="language-markup transparent">&lt;dd></code> elements, optionally intermixed with
> script-supporting elements. <br>
> Or: One or more <code class="language-markup transparent">&lt;div></code> elements, optionally intermixed with script-supporting elements.

고등학생 때 영어 수업을 떠올려보면 either A or B 구문 정도는 기억이 나지 않을까? A 또는 B. 즉 둘 중
하나가 적용된다.

다시 말해, <code class="language-markup transparent">&lt;dl></code>의 콘텐트 모델은 1개 이상의
<code class="language-markup transparent">&lt;dd></code> 요소가 뒤따르는 1개 이상의
<code class="language-markup transparent">&lt;dt></code> 요소들로 구성되는 0개 이상의 그룹, 또는
1개 이상의 <code class="language-markup transparent">&lt;div></code> 요소이다.

명세에서 좀 더 자세한 내용을 살펴보면,

> Each term-description group consists of one or more terms (represented by
> <code class="language-markup transparent">&lt;dt></code> elements) possibly as children of a
> <code class="language-markup transparent">&lt;div></code> element child, and one or more descriptions
> (represented by <code class="language-markup transparent">&lt;dd></code> elements possibly as
> children of a <code class="language-markup transparent">&lt;div></code> element child), ignoring
> any nodes other than dt and dd element children, and <code class="language-markup transparent">&lt;dt></code>
> and <code class="language-markup transparent">&lt;dd></code> elements that are children of
> <code class="language-markup transparent">&lt;div></code> element children within a single
> <code class="language-markup transparent">&lt;dl></code> element.

라고 기술되어 있다.

좀 더 풀어보자면,

```html
<dl>
  <dt>foo</dt>
  <dd>bar</dd>
</dl>
```

혹은

```html
<dl>
  <div>
    <dt>foo</dt>
    <dd>bar</dd>
  </div>
</dl>
```

이러한 형태만이 가능하다라는 것이다. 단일 <code class="language-markup transparent">&lt;dl></code>
요소 내에 <code class="language-markup transparent">&lt;dt></code>와 <code class="language-markup transparent">&lt;dd></code>을
그룹핑한 <code class="language-markup transparent">&lt;div></code>와
<code class="language-markup transparent">&lt;dt></code>와 <code class="language-markup transparent">&lt;dd></code> 요소는
서로 형제 노드 관계로 존재할 수 없다는 것이다.

또한, <code class="language-markup transparent">&lt;dl></code> 내의
<code class="language-markup transparent">&lt;div></code>는 <code class="language-markup transparent">&lt;dt></code>와 <code class="language-markup transparent">&lt;dd></code> 외 다른 요소가 들어 올 수 없다.

[<code class="language-markup transparent">&lt;div></code> 요소의 콘텐트 모델](https://www.w3.org/TR/html52/grouping-content.html#the-div-element)을 보면

> &lsquo;If the element is a child of a <code class="language-markup transparent">&lt;dl></code>
> element: one or more <code class="language-markup transparent">&lt;dt></code> elements followed by
> one or more <code class="language-markup transparent">&lt;dd></code> elements, optionally
> intermixed with script-supporting elements.

라고 기술되어 있다.

그러니 제발 <code class="language-markup transparent">&lt;dl></code> 요소 안에
<code class="language-markup transparent">&lt;div></code> 요소를 막 쓸 수 있다는 근거 없는 이야기는
멈추도록 하자...

<hr>

## <code class="language-markup transparent">&lt;dfn></code> as a descendent of an <code class="language-markup transparent">&lt;li></code>  element that contains a definition of the term defined.

이 내용은 오해가 될 만한 내용은 없다.

> The &lt;paragraph>, &lt;description list group>, or &lt;section> that is the nearest ancestor of
> the <code class="language-markup transparent">&lt;dfn></code> element must also contain the
> definition(s) for the term given by the <code class="language-markup transparent">&lt;dfn></code> element.

이 내용이

> The term-description group , <code class="language-markup transparent">&lt;p></code>,
> <code class="language-markup transparent">&lt;li></code> or
> <code class="language-markup transparent">&lt;section></code> element that is the nearest ancestor
> of the <code class="language-markup transparent">&lt;dfn></code> element must also contain the
> definition(s) for the term given by the <code class="language-markup transparent">&lt;dfn></code> element.

로 바뀌면서 <code class="language-markup transparent">&lt;li></code> 요소가 추가되었을 뿐이다.

참고로 해당 내용이 변경된 이유는 결국 스타일링에 대한 유연성을 위한 것으로 보인다. (자세한 내용은 각주 참고) [^4]

<hr>

## Headings within legend in a fieldset.

이 내용 역시 딱히 오해가 발생할 만한 문제는 없다.

HTML 5.1에서는 <code class="language-markup transparent">&lt;legend></code> 요소의 콘텐트 모델이
Phrasing content에 국한 되었으나, HTML 5.2에서는 Phrasing content and headings (<code class="language-markup transparent">&lt;h1></code>~<code class="language-markup transparent">&lt;h6></code> 요소들)로
확장 되었다.

일전에 <code class="language-markup transparent">&lt;legend></code> 자체가 제목을 의미하는데 여기에
heading 요소를 작성하는 것이 의미론적으로 맞느냐라는 이야기도 오갔던 것으로 기억한다.

이 내용은 스크린리더 사용자를 위해 제안된 부분이다. [^5] <br>
스크린리더 사용자에게 heading을 이용한 탐색이 접근성을 확보할 수 있지만, 기존의 phrasing content만을 허용하는
명세에 따라 사용이 어려운 부분이 있어 <code class="language-markup transparent">&lt;legend></code>
내에 headings을 허용해달라는 제안이 들어온 것이다.

다만, heading을 사용할 경우 outline에 영향이 있을 수 있으므로, outline에 주의하여 작성되어야 할 것으로 생각된다.

<hr>

## Empty <code class="language-markup transparent">&lt;option></code> element as a child of <code class="language-markup transparent">&lt;datalist></code>.

이 항목의 정확한 문구는 &lsquo;Make label-less empty option okay as a datalist child&rsquo;가 되어야
할듯 하다.[^6] 이후에도 언급하겠지만, HTML 5.1 명세의 예제를 보면
<code class="language-markup transparent">&lt;datalist></code> 요소의 자식으로서 empty
<code class="language-markup transparent">&lt;option></code> 요소가 사용되고 있다. 이 항목의
히스토리를 추적해보면 WHATWG로부터 병합된 사항이다.[^7]

요점만 추려보면 명세 간의 충돌이랄까?

HTML 5.1 명세에서 <code class="language-markup transparent">&lt;option></code> 요소의 콘텐트 모델을
보면,

> If the element has no label attribute: Text.

라는 항목이 존재한다.

따라서 label 속성(attribute)를 사용하지 않으면, empty 요소로 사용을 할 수 없도록 되어 있다. 하지만
HTML 5.1 명세의 <code class="language-markup transparent">&lt;datalist></code> 예제를 보면,

```html
<label>
  Sex:
  <input name=sex list=sexes>
  <datalist id=sexes>
  <option value="Female">
  <option value="Male">
  </datalist>
</label>
```

과 같이, <code class="language-markup transparent">&lt;option></code> 요소에 label 속성(attribute)이
존재하지 않지만 empty 요소로 작성되어 있는 것을 볼 수 있다.

그리고 <code class="language-markup transparent">&lt;option></code> 요소의 label 속성에 의한
콘텐트 모델 명세를 만족시키기 위해

```html
<option value="Female">
```

를

```html
<option value="Female" label="Female">
```

으로 굳이 작성해야 하는가? 라는 논의가 있던 모양이다.

이 때문에 HTML 5.2에 와서는 <code class="language-markup transparent">&lt;option></code> 요소의
콘텐트 모델에 대해

> If the element has no label attribute: and is not a child of a
> <code class="language-markup transparent">&lt;datalist></code> element: Text that is not
> inter-element white space. <br>
> If the element has no label attribute and is a child of a
> <code class="language-markup transparent">&lt;datalist></code> element: Text.

라는 두 가지 내용이 추가되었다.

<hr>

## Comments containing two consecutive hyphens, or ending with a hyphen, in the HTML syntax.

이 항목 역시 WHATWG에서 논의 된 사항이 병합된 케이스이다. [^8]

내용을 살펴보면, 주석 내에 들어있는 연속된 하이픈(--)이나 하이픈이 연결된 주석 종료(--->)가 더 이상 문제를
일으키거나 하지 않기 때문에 관련 요구사항을 삭제하자는 제안이다.

아마도 주석을 작성하는데 마크업 구조간 섹션을 명시적으로 시각적으로 분리하기 위해

```html
<!----------------------------------------------->
```

이런 식의로 사용하는 작성자들이 더러 있는데 주석에 관한 기존 요구사항으로 인해 유효성 검사기가 이런 주석을
오류로 검출하는 것을 문제삼은 듯 하다.

단, 현재 Nu HTML Checker에서

```html
<!----------------------------------------------->
```

를 검사해보면, &lsquo;The document is not mappable to XML 1.0 due to two consecutive hyphens in a
comment.&rsquo;라는 경고 메세지를 내어주고 있다.

물론, HTML 문법에 한하여 이 항목이 적용되는 것이니 XML에 대한 경고는 경고로 받아들여도 충분할 것 같다.

<hr>

## Remove restrictions on BiDi algorithm section

이 역시 WHATWG로부터의 병합된 항목이다.[^9] (이게 어디서 나온 내용인가를 탐색하는데 5단계를 타고 타서 찾았다...)

그런데... 내용이...

양방향 서식 문자에 대한 작성 요구사항이 가짜(bogus)라는... <span aria-hidden="true">/=ㅁ=/</span><span class="accessible-hidden-inline">맙소사</span>

알고리즘이 렌더링 섹션의 bidi 요구사항와 일치하지 않는 경우가 많음에 따라 해당 내용을 삭제 했다고 한다.

<hr>

여기까지 HTML 5.2 명세에서 이제는 유효해진 것들에 대해서 톺아봤다.

Changes에 타이틀로 작성이 되어 있기는 하지만, 실상 정확한 내용은 각각의 명세를 보지 않으면 잘못 받아들이기 쉬운
내용들이 더러 있고(아니 애초에 명세를 안보는게 문제...), 역시나 무조건적(non-restrictive)으로 받아들이고
쉽게 이야기 하는 이들도 생겨나기 시작한듯 하다. 그런 분들에게 다음의 영상을 띄웁니다.

<iframe style="width:100%" width="560" height="315" src="https://www.youtube.com/embed/eouW_Cn1q9E?rel=0&amp;showinfo=0;controls=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen title="영상을 틀어보세요"></iframe>


<i>※ 내용 중 잘못된 내용이 있을 경우 알려주시면 더 정확한 내용을 전달하는데 많은 도움이 될 것 같습니다~^^</i>



[^1]: [콘텐트 모델](https://mulder21c.github.io/html/dom.html#content-models) : 요소에 예상되는 콘텐트에 대한 설명
[^2]: [Key words for use in RFCs to Indicate Requirement Levels](https://www.ietf.org/rfc/rfc2119.txt) ( [번역본](https://techhtml.github.io/rfc/RFC2119.html) )
[^3]: [style tag should be allowed in body](https://github.com/whatwg/html/issues/1605) - WHATWG <br>[make &lt;style> in &lt;body> conforming ](https://github.com/w3c/html/issues/544) - W3C
[^4]: [w3c html github issues #539 - updated dfn text](https://github.com/w3c/html/issues/539)
[^5]: [w3c html github issues #724 - Consider adding headings to allowed content in &lt;legend> element](https://github.com/w3c/html/issues/724)
[^6]: PR버전의 Changes에는 해당 타이틀로 작성되어 있다. <br>[Changes between Working Draft 2 and the First Public Working Draft](https://www.w3.org/TR/2017/PR-html52-20171102/changes.html#changes-wd1)
[^7]: [Make label-less empty option OK if datalist child](https://github.com/whatwg/html/pull/815), <br>[Fix label-less empty-option examples](https://github.com/whatwg/html/pull/812)
[^8]: [Remove parse error for dashes in comments &lt;!-- -- -->](https://github.com/whatwg/html/issues/1351)
[^9]: [Remove document conformance requirements for bidi characters](https://github.com/whatwg/html/pull/1645)