---
title: 접근 가능한 숨김 텍스트
tags:
  - 웹 접근성
  - accessibility
  - hidden
  - sr-only
  - visuallyHidden
categories:
  - 개발노트
  - A11Y
thumbnail: /upload/2019/thumbs/reading-glass.jpg
hero: /upload/2019/reading-glass.jpg
seo:
  description: |
    퍼블리싱 작업을 진행하다보면 종종 숨김 텍스트를 사용해야 하는 상황에 맞닥뜨릴 때가 많다.
    이미 여러 가지 방법들이 인터넷에 공개되어 있고 널려있지만, 아쉽게도 여전히 실제로 작업을
    담당하는 이들이 숨김 텍스트를 어떻게 적용하느냐에 따른 사이드 이펙트는 전혀 고려하지 않거나
    모르는 경우가 많은 듯 하다.
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
  .not {
    text-decoration: line-through;
  }
  :not(pre) > code[class*="language-"].in-heading {
    //@include rgba-background(#2a2a2a, 0.4);
    background: none;

  }
date: 2019-03-22 23:55:46
modified: 2021-05-01 20:50:14
---


## 숨김 텍스트

오래동안 묵어있던 글감을 다시 꺼냈다. 다양한(?) 짓거리를 포스팅하려고 하다 결국은 포기하고
단순하게 포스팅 하기로... <span aria-hidden="true">= _=a</span><span class="sr-only">긁적긁적<span>

퍼블리싱 작업을 진행하다보면 종종 숨김 텍스트를 사용해야 하는 상황에 맞닥뜨릴 때가 많다.

IR(Image Replace) 기법을 사용해야 할 때가 그 중 대표적인 한 가지이고, 기획 문서나
디자인 시안에는 존재하지 않지만 문맥 상 혹은 문서 구조 상 숨겨져 있는 제목을 넣어주어야
할 경우라던가, 혹은 바로 위에 보이는 것 처럼 이모티콘(?)을 사용하면서 이 이모티콘에 대한
적절한 대체 텍스트를 제공해야 할 때가 바로 그러한 경우다.

이미 여러 가지 방법들이 인터넷에 공개되어 있고 널려있지만, 아쉽게도 여전히 실제로 작업을
담당하는 이들이 숨김 텍스트를 어떻게 적용하느냐에 따른 사이드 이펙트는 전혀 고려하지 않거나
모르는 경우가 많은 듯 하다.

일전에도 포스팅 한 게시글 중에 녹아 있는 내용이기는 하지만, 퍼블리셔가 눈에 보이는 결과만
나오면 된다는 식으로 작업물을 만드니 어쩌면 당연한 결과이기도 하다.

### 숨김으로 인해 발생되는 문제

문제는 접근성이다.

웹 사이트를 소비하는 소비 주체는 시각이 온전한 사람만이 아니다. 더불어 사람만이 소비하는 것도
역시 아니다. 웹 사이트 접근을 통해 전달받은 <code class="language-text">text/html</code>
스트림은 브라우저로 전달되어 인간에게 전달되기도 하지만 검색엔진에 전달되어 검색엔진이 내용을
수집하게 되기도 한다.

어쨌든 숨김 텍스트에 있어서 가장 크게 발생되는 문제는 접근성의 문제인데, 여기서 또 다른
문제가 접근성을 위한 숨김 텍스트라고 하면 오로지 시각만을 생각한다는 문제이다.

숨김 텍스트로 일어는 문제는 단순히 시각에만 있는 문제가 아니라, 어떻게 구현하느냐에 따라
초점 이동에 대한 문제도 발생하게 된다.

만일, &lsquo;접근성 = 스크린리더 대응&rsquo;라고만 생각했다면 접근성을 모르고 있을 확률이
다분히 높다. 알고 있다고 말하는 것은 어쩌면 KWCAG[^1]에서 언급된 여러 지침들을 실질적으로 왜
그러한 지침이 필요하고 그러한 지침으로 인해 어떤 부분이 향상 될 수 있는지에 대해서는 관심이
없이 그저 이렇게 하라니까 그렇게 하는 정도에 지나지 않을까?

또한, 앞서 언급한대로 소비 주체 중 하나는 검색엔진이다.

이 검색엔진에는 &lsquo;black hat&rsquo;이라는 것이 있다. 검색 엔진 결과 페이지의 순위를
높이기 위해 올바르지 않은 방법을 사용한 사례가 이에 해당되는데 이에 관하여는 더 모르고 있는
경우가 많다.

## 숨김 처리 방식과 그로 인한 문제

### display 이용

```css
.hidden {
  display: none;
}
```

아마 접근성을 전혀 모르는 이들이 주로 선택하는 방법일 거다.

그리고 요새 자주 보이는 상황으로는... 접근성에 전혀 관심을 둔 적이 없는 Front-End 개발자들의
산출물에서도 이러한 경우를 쉽게 발견할 수 있다. 퍼블리셔가 그렇게 전달을 해 준적이 없어서
발생되는 문제이기도 할 수 있지만, 관심사 자체가 기능에 있다보니 너무 쉽게 간과해버리는
경우가 쉽게 발견되는 것도 같다. (정말.. 너무 쉽게 간과한다.)

무튼, <code class="language-css">display: none</code>은 그 용어 그대로 정보를 표기하지
않겠다는 의미다. 따라서 가시적으로 표기가 되지 않게 되는데, 문제는 정보를 표기하지 않는 것이기
때문에 보조기기에도 정보를 전달하지 않도록 처리된다.

이렇게 숨겨놓은 건 숨겨 놓은게 아니라 그냥 없는 것과 같다. <br>
애초에 없는 녀석이니 사용자에게 전달조차 되지 않는다.

### visibility 이용

```css
.hidden {
  visibility: hidden;
}
```

이 녀석의 경우는 사실 가시성을 <var>hidden</var>으로 주어 가시적으로는 숨김 처리를
해두었지만 자리는 차지하고 있기 때문에 잘 사용되지는 않는 녀석이기는 하다.

하지만

```css
.class {
  position: absolute;
  visibility: hidden;
}
```

이러한 형태를 만들어 놓는 경우도 가끔 보이기도 한다.

<span class="not">자리도 차지하지 못하게 만들었고 가시적으로도 숨겼다! 성공이다!</span>는
착각이고 여전히 접근성에서의 문제가 있다.

<code class="language-css">visibility: hidden</code>은 그 의도 자체가 사용자에게
가시적으로 보여지지 않도록 하여 사용자에게 정보를 전달하지 않겠다라는 것이기 때문에, 스크린리더
역시 해당 정보를 사용자에게 전달해주지 않게 된다.

따라서 결국 이 방법 역시 숨김 텍스트로는 적합하지 않다.

### text-indent 이용

IR 기법으로 가장 많이 사용하고 있는 방식이 아마 이 text-indent라는 방식일 거다.

```css
.hidden {
  text-indent: -9999px;
}
```

phark method라고도 알려져 있는 방식인데, CSS의 들여쓰기 기능을 이용해서 텍스트를 아주 저
멀리로 보내버리는 방법이다.

이번에는 노출이나 가시성을 변경하지 않았으므로 문제가 없을 것만 같이 보일지 모르겠다. <br>
하지만 그렇게 생각했다면 잘못된 생각이다.

![text-indent를 적용한 Firefox 스크린샷](/upload/2019/text-indent-firefox.jpg)

이 이미지는 Firefox에서 <code class="language-css">text-indent</code>를
<code class="language-markup">a</code> 요소에 적용 후 이 요소에 초점을 준 상태를
캡쳐해 둔 것으로, 보이는 것과 같이 초점이 문서 바깥으로 나가버리는 현상을 볼 수 있다. (위
페이지는 <code class="language-markup">body</code> 요소에 좌우로 160px의 padding이
적용되어 있다.)

만일 숨김 텍스트를 적용한 것이 대화형 요소(interactive element)라면 초점의 문제가 발생되어
버리게 된다.

그렇다면 대화형 요소에는 적용하지 않고 요소에만 이렇게 적용하면 문제가 없지 않는가라는 질문을
던질수도 있겠다. 하지만, 그 역시도 &ldquo;여전히 문제는 있다.&rdquo;이다.

앞서 언급 한 것 중에 검색엔진에 대한 것을 보면, 검색엔진에는 black hat이라는 것이 있다고
했다. 바로 이 방법이 black hat을 유발하는 원인이 된다. 검색 엔진이 text/html만을
수집할거라고 오해하는 경우가 종종 있는데 Google 알고리즘의 경우 CSS도 검색하는 것으로 알려져
있다.

2010년의 자료로 거슬러 올라가보면, 구글의 수석 개발자 프로그램 엔지니어인 Maile Ohye가
이에 관하여 포스팅 해 둔 게시글[^2]이 있는데, 여기에 보면 구글은 해당 기법을 "스팸"으로
분류한다고 되어 있으며 현재까지도 구글의
[검색엔진 최적화(SEO) 초보자 가이드](https://support.google.com/webmasters/answer/7451184?hl=ko)에는
숨김 텍스트를 사용하지 말 것[^3]으로 이야기 하고 있다.

퍼블리셔 대다수가 이 방법이 아주 유용하다라고 여겼을지 모르겠지만, 이 방법으로 인해 어쩌면
검색엔진 최적화에 좋지 않은 영향을 미치고 있지 않았으리라는 보장은 할 수 없다.

### zero pixel sizing

아주 간간히 <var>width</var>/<var>height</var>를 0으로 만들거나, 다른 0 픽셀 사이징을 이용하는 경우도 볼 수 있다.

<code class="language-css">width: 0;</code>,
<code class="language-css">height: 0;</code>,
<code class="language-css">font-size: 0;</code>

등과 같은 방법이다.

하지만 이 역시도 문제가 있다.

우선, <var>width</var>, <var>height</var>를 0으로 만드는 방법은 NVDA 및 VoiceOver로
테스트 했을 경우에는 읽히는 것으로 확인된다. 하지만, iOS에서 VoiceOver로 초점을 이동시켜[^4]
보면 초점이 잡히게 되는 것을 볼 수 있다. <br>
결국 빈 객체에 초점을 일으키기 때문에 사용자로서는 혼돈이 올 수 밖에 없는 문제가 발생된다.

혹시나 VoiceOver로 읽는데 초점이 왜 문제냐 하는 이는 없기를 바란다. <br>
스크린리더를 사용하는 건 반드시 전맹 시각 장애에만 해당한다는 뇌피셜을 버려야 한다. WebAIM의
스크린리더 사용자 설문조사 결과를 보면 전맹은 아니지만 스크린리더를 활용하는 경우가
적지 않음을 알 수 있다[^5].

<var>font-size</var>를 0으로 만드는 경우에는 VoiceOver로 접근 시 콘텐츠를 읽지 않고 스킵하는 것을
겪을 수 있게 된다.

간혹 inline formatting context의 요소 간 공백을 제거 하기 위한 방법으로 부모 요소 혹은
조상 요소에 <code class="language-css">font-size: 0;</code>를 적용하는 경우를
쉽게 볼 수 있는데 이러한 경우 역시 VoiceOver에서는 접근이 불가한 상황을 만들어 내는
좋은(?) 방법이다. [^6]

또한 이 방법은 Google의 웹마스터 가이드라인을 위반하는 것이기 때문에 결국 black hat까지도
유발하는 원인이 될 수 있다.

### opacity 이용

```css
.hidden {
  opacity: 0;
}
```

이 방법 역시 가시성을 숨기는 것과 비슷한 효과로 투명하게 만들어 사용자의 눈을 속이는(?)
방법으로 간혹 사용되는 것을 볼 수 있다.

하지만 이 역시 초점 이동, 대화형 요소인 경우 마우스 포인터가 반응하는 문제 등이 발생되고
VoiceOver는 이를 읽어주지 않는 것으로 확인된다.

역시 접근성에서는 문제가 많다.

### positioning screen out

아마 가장 많이 알고 있고 가장 많이 사용되고 있는 방법일 것으로 생각되는데,

```css
.hidden {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
```

와 같은 방법이다.

이 방법은 처음 text indenting 방식과 동일한 문제를 가지고 있다.

### Hiding with Clip

이쯤 되면 접근 가능한 숨김 방법이라는 것은 불가능에 가까워 보인다.

하지만 아직 인터넷에 공개되어 있는 한 가지 방법이 더 있는데, H5BP[^7]에서 채택한 방법으로

```css
.hidden {
  overflow: hidden;
  position: absolute;
  border: 0;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
}
```

으로 처리하는 방식이다.

이 방법을 사용하는 이는 아마도 접근성에 관심이 있다보니 찾고 찾고 찾아 여기까지 도달하지
않았을까 생각한다. 왜냐하면... 이 방식을 쓰는 이들을 별로 본적이 없기 때문...

이는 앞에서 본 문제들을 피하기 위해 zero를 사용하지 않되 가장 근접하게 수렴 한 1px을 사용하고,
screen out 기법으로 인한 black hat을 피하기 위해 고안된 방법으로 알고 있다.

재미있게도(?) 아직 구글에서 <var>clip</var>을 이용한 클리핑 방법에 대해 black hat으로
간주하고 있다는 report가 존재하지 않기 때문에 확증은 불가하나 문제가 되지 않는 최후의
수단(?)으로 남아있는 듯 하다.

하지만, 이 방법이 어느 제목에 속해있는지 잘 보자... 여기에도 여전히 문제는 남아있다.

첫 째로는 <var>clip</var>이 deprecate된 속성이라는 점과, 둘 째로는
<code class="language-css">position: absolute;</code>는 block formatting context(이하 BFC)로
변경시켜버리기 때문에 발생되는 문제다.

만일 한 문단 안에서 inline formatting context(이하 IFC)로 전달되어야 하는 정보에 이 스타일을
적용하게 되면 BFC로 변경되어 분리가 일어나게 된다. [^8]
따라서 한 번에 전달되어야 하는 문맥이 끊어지는 일이 발생되어 스크린리더로 읽게 되면 마치
<var>div</var> 요소로 묶어놓은 것 마냥 끊어읽게 되는 일이 발생된다.

## 접근 가능한 숨김 방법

결국 문맥까지 고려해본다면 H5BP 방식에서 <code class="language-css">position: absolute;</code>을
들어내야하고, clip의 최신 표준을 사용해야 한다.

```css
.hidden {
  overflow: hidden;
  border: 0;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px); // for legacy browsers
  clip-path: inset(50%);
}
```

그런데 이렇게 할 경우, phrasing contents는 IFC를 가지기 때문에 <var>width</var>,
<var>height</var>를 가질 수 없고 더구나 이를 가진다 하더라도 1px 만큼의 자리를 차지하게
되는 문제가 또 발생된다.

우선, IFC에서의 문제는 <code class="language-css">display: inline-block</code>을
통해서 해결 할 수 있을 것이다.

```css
.hidden {
  overflow: hidden;
  display: inline-block;
  border: 0;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px); // for legacy browsers
  clip-path: inset(50%);
}
```

1px 만큼의 자리를 차지하는 것을 해결 하는 방법은 position 값을
<var>relative/absolute</var>로 주고 <var>top/left/z-index</var>를 조작 하는 방법과
<var>margin</var> 값을 음수로 조작하는 방법이 있겠으나, 음수 margin은 VoiceOver에서
읽기 순서에 변형이 일어나는 이슈가 보고 되었다고 하니 margin을 이용한 방법은 제외 되어야 한다. [^9]

그렇다면 남은 방법은 positioning을 통한 <var>top/left/z-index</var>를 조작하는 방법인데,
<var>top/left</var>는 결국 주변 엘리먼트에 영향을 주게 되는 문제가 다시 발생할 소지가 남게 된다.
따라서 나는 아무도 선택하지 않은 z-index를 사용하기로 했다.


즉, BFC라면

```css
.hidden {
  overflow: hidden;
  border: 0;
  position: absolute;
  /* relative를 사용해도 무관할 듯 하다 */
  z-index: -1;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
}
```

정도로 주어볼 수 있고, IFC라면


```css
.hidden {
  overflow: hidden;
  display: inline-block;
  position: relative;
  z-index: -1;
  border: 0;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
}
```

정도로 해 볼 수 있겠다.

두 가지를 나누어서 고려해야 하는 것이 불편하기는 하지만, 현재 상황에서 둘 모두를 만족하는
방법이 과연 있을지는 좀 더 고민을 해 봐야 알 수 있을 듯 하다.

---

많은 이들이 문제를 다각도로 보고 발생 가능한 이슈들을 판단하지 않고 그저 인터넷에 공유되어있는
결과만을 가져다가 아무런 의심도 없이 쓰고 있는 경우를 많이 보게 되는 것 같다.

거의 15년 가가이 동안 IR기법이 계속 변화되어 오면서 텍스트 숨김 처리 기법 역시 같은 영향을
받았을텐데 아직도 15년전의 짧게는, 10년 전의 방법들이 아무런 사이드 이펙트에 대한 의심도 없이
그저 가져다 쓰기만 하는 것은 분명 문제가 있다고 생각된다.

퍼블리셔가 해야 하는 마크업, 스타일 구축은 단순하게 눈에 보이는 것만 되게 만들면 되는게 아니다.
명심하자. 내가 아무 생각없이 그냥 쓴 결과가 결국 누군가를 배제하는 결과를 만들 수도 있고,
사이트의 품질을 떨어뜨릴 수도 있다. 반대로 내가 고민하는만큼 누군가가 배제되지 않고,
사이트의 품질 역시 올라갈 수 있다.


[^1]: Korean Web Content Accessibility Guidelines(한국형 웹 접근성 지침)
[^2]: [HTML “text-indent: -9999px” and holding the line](http://maileohye.com/html-text-indent-not-messing-up-your-rankings/)
[^3]: [숨겨진 텍스트 및 링크](https://support.google.com/webmasters/answer/66353)
[^4]: 간혹 모바일 디바이스에서는 초점 이동이 불가한 것으로 오인하는 경우가 있는데, iOS의
경우는 오른쪽/왼쪽 스와이프로 초점 이동이 가능하다.
[^5]: [Screen Reader Usage Dec. 2017](https://webaim.org/projects/screenreadersurvey7/#usage)
[^6]: [Screen Reader hidden content test result](https://terrillthompson.com/tests/hiddencontent.html)
[^7]: HTML5 BoilerPlate
[^8]: 이 게시글을 예로 들자면, 첫 문장에 있는 이모티콘 옆에 실제로는 "긁적긁적"이라는
텍스트가 숨겨져 있는데 position: absolute가 적용되어 있을 경우라면 긁적긁적이 앞선 문단과
분리되므로 스크린리더로 읽을 경우 탐색을 2번 해야만 해당 텍스트에 접근이 가능해진다.
스크린리더를 열고 방향키를 내려가며 읽어보면 무슨 말인지 확실히 알 수 있다.
[^9]: [macOS - VoiceOver / Chrome announcing visually hidden text out of order](https://github.com/h5bp/main.css/issues/12) in H5BP github