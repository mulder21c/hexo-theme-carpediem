---
title: 접근성 향상을 위한 이름 짓기
tags:
  - 웹 접근성
  - accessibility
  - a11y
  - screen reader
  - label
  - link text
  - form label
categories:
  - 개발노트
  - A11Y
thumbnail: /upload/2019/thumbs/four-very-cute-cats.jpg
hero: /upload/2019/four-very-cute-cats.jpg
seo:
  description: |
    Hidde de Vries가 작성한 Naming things to improve accessibility를 원작자의 허가를
    받고 번역한 글입니다.  이 게시글에서는 브라우저가 링크, 양식 필드, 테이블, 양식 그룹들의
    이름을 결정하는 방법을 설명합니다.
date: 2019-04-29 23:28:08
---


※ 이 글은 Hidde de Vries가 작성한
[Naming things to improve accessibility](https://hiddedevries.nl/en/blog/2019-04-18-naming-things-to-improve-accessibility/)를
원작자의 허가를 받고 번역한 글입니다. 일부 오역이 있을 수 있습니다.

---

접근성을 향상시키기 위해 할 수 있는 한 가지는 항상 **개체들에 접근 가능한 이름을 지정**하는
것입니다. 고유하고 유용한 이름은 이상적으로 탐색에 유용할 수 있습니다. 이 게시글에서는
브라우저가 링크, 양식 필드, 테이블, 양식 그룹들의 이름을 결정하는 방법을 설명합니다.

<small>
  *이  게시글은 지난 로테르담에서의 WordCamp에서 발표한
  [당신의 사이트를 더 접근 가능하게 만든는 6가지 방법](https://talks.hiddedevries.nl/lMxtx5/six-ways-to-make-your-site-more-accessible)의
  일부를 기반으로 합니다.*
</small>

## 접근성 트리

사용자가 당신의 사이트를 접근할 때, 서버는 브라우저에 마크업을 전송할 겁니다. 우리는 아마도
속성(property)을 읽을 수 있고 모든 종류의 기능을 수행할 수 있는, 객체로 변환된 모든 노드를
가진 DOM 트리, 마크업의 라이브 표현에 익숙할겁니다.

그런데 많은 사람들이 모르고 있는 것은 브라우저가 만들 수 있는 두 번째 구조가 있다는 것입니다:
그것이 바로 접근성 트리입니다.  접근성 트리는 DOM 트리를 기반으로 하며, 접근성에 연관된 모든
메타 정보(역할, 이름, 속성)를 포함합니다. 달리 말해서, 접근성 트리는 당신의 페이지가 보조
기술에 노출되는 방법입니다.

### 보조 기술

보조 기술(AT: Assistive Technology)은 사람들이 무언가에 접근하는 방법을 개선하기 위해
사용하는 모든 종류의 도구에 대한 포괄적인 용어입니다. 컴퓨터와 웹의 경우 다음이 포함됩니다:

- 사용자의 머리에 부착되는 마우스와 같은 대체 포인팅 기기
- 화면을 확대하는 화면 확대기
- 화면을 점자로 변환시키는 점자 정보 단말기
- 화면을 사용자에게 읽어주는 스크린리더

![대체 포인팅 기기, 점자 정보 단말기, 화면 확대기, 스크린리더](/upload/2019/alternate-pointing-devices-braille-bars-screen-magnifiers-and-screenreaders.jpg)

이러한 모든 도구가 효과적으로 작동하려면 화면에서 무슨 일이 일어나는지를 알아야 합니다.
그것을 알아내기 위해, Windows, Mac, Linux를 포함한 모든 주요 플랫폼들에 내장 된 플랫폼
API에 접근합니다. API는 OS의 모든 것을 알려줄 수 있기 때문에, 시작 바, Dock, 브라우저의
뒤로 버튼과 같은 것들에 대해서 알 수 있습니다. API가 알지 못하는 한 가지는 사용자가 접근하는
웹 사이트 입니다.  내장 된 API에 모든 웹 사이트의 의미 구조를 가질 수 없기 때문에 중개자에
의존하게 되고 이 중개자가 바로 접근성 트리가 들어가는 곳입니다. 이 접근성 트리는 웹 사이트의
구조를 알려줍니다. 말했듯이, 그것은 마크업에 기반한 DOM에 기반합니다.

![당신의 마크업은 접근성 트리를 기반으로 한 DOM 트리가 되어 플랫폼 API로 보내지고 궁극적으로는 보조기기까지 도달합니다](/upload/2019/your-markup-becomes-a-dom-tree-which-the-accessibility-is-based-on-which-is-then-sent-to-platform-apis-and-ultimately-ends-up-at-assistive-technologies.jpg)

접근성 트리는 역할(이것은 헤더인가? 푸터인가? 버튼인가? 내비게이션인가?), 이름(잠시 후에
설명할), 속성(햄버거 메뉴가 열렸는지 닫혔는지, 체크박스가 체크되었는지 아닌지 등등) 및 여러
가지 것들을 제공합니다.

원하는 사이트에서 이 기능을 보려면 파이어폭스 개발자 도구의
[접근성 패널](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)을
보거나, 크롬, Safari Technology Preview, 엣지 개발자 도구의 접근성 정보 박스를 확인하시면
됩니다.

### 접근 가능한 이름 평가

이름은 접근성 트리가 그 개체에 대해 알려주는 것 중 하나입니다. 개체의 이름이 무엇인지는
마크업으로부터 파생됩니다. 이것에 영향을 줄 수 있는 많은 측면들이 있습니다. 이에 대해 자세히
알고 싶다면 [접근 가능한 이름과 설명 평가 명세](https://www.w3.org/TR/accname-1.1/)를
확인하세요.

## 고유한 이름은 구별에 도움이 됩니다.

이름을 알려주는 방법에 대해 자세히 알아보기 전에, 어떤 이름을 원하는지 살펴봅시다. 이름이
무엇인지는 그것들이 접근 가능한지 아닌지의 여부에 결정적입니다.

만약 당신이 고양이 4마리를 키우고 있고, 각 고양이들의 이름이 모두 "앨리스"라면? 이는
의사소통을 어렵게 만들것이기 때문에 엄청나게 실용적이지 않은 일입니다. "앨리스 밥 줬었나?"하고
궁금할 수도 있고 , "앨리스 밖에 있나?"라고 가족들에게 물어볼지도 모릅니다. 명료하지 않다는
것은  실제로 사용할 수 없다는 겁니다. 하지만, 이것은 우리 홈페이지가 링크 텍스트로 각각
"더보기"를 가진 4개의 알림 항목을 가지고 있을 때 우리가 하는 행동입니다.

![완전 귀여운 4마리 냥냥이들](/upload/2019/four-very-cute-cats.jpg)
*당신의 고양이들을 모두 앨리스라고 이름 지었다고 상상해보세요 (photo:  [stratman2 on Flickr](https://www.flickr.com/photos/stratman2/38071877924/in/photolist-TjUbqm-bCqjgF-26hd9k-Hvi5Bs-2drvqnV-ejciXf-qjDedZ-26hebk-pnrkw9-211hjUm-hZNytZ-4nbnuB-opMVzy-othkih-poX3E8-22HqHia-p8tHw3-dQ3x9k-26UQoWu-9XQAyj-2aherRX-9YYrSe-8pXr3Z-q6CjdK-i76VB))*

애석하게도, 이것은 매우 흔한 일입니다. 100만 개 이상의 사이트를 살펴보고 자동화 접근성 검사를
실행한 [WebAIM 100만](https://webaim.org/projects/million/)  프로젝트에서 WebAIM은
다음을 발견했습니다.

> 페이지들의 24.4%는 "여기를 클릭", "더보기", "계속" 등과 같은 모호한 링크 텍스트를 가진 링크를 가짐

각 알림 항목의 링크 텍스트로 "더 보기"를 재사용하는 것은 코드와 콘텐츠 관리를 단순화 시키지만,
스크린리더 사용자에게는 나쁜  사용성을 제공합니다. 페이지의 링크를 통해 페이지를 돌아다니기
위해 링크 탐색을 사용할 경우, 각 링크가 사용자를 어디로 데려다줄지를 전혀 알 수 없습니다.
위 예에서, 보조 기기가 모든 링크들을 읽도록 요청하면, "링크 더보기, 링크 더보기, 링크 더보기,
링크 더보기"라고 읽을 겁니다.

## 이름 짓기

때문에, 고유하고 서술적인 이름이 보조 기기 사용자에게 유용합니다. 어떤 HTML이 이름을
제공하는데 도움이 되는지를 살펴보죠. 앞서 말했듯이, 이름을 결정하기 위한 휴리스틱은
[명세](https://www.w3.org/TR/accname-1.1/)에 존재하는데, 대부분 개체에 대한 이름을
제공하는 HTML은 별 거 아닙니다. 다음 섹션은 HTML이 서툰 사람들에게 매우 유용합니다.

### 링크

<code class="language-markup transparent">&lt;a></code> 요소(element)의 콘텐츠는 일반적으로 접근 가능한 이름이 됩니다.

그래서:

<pre class="language-markup"><code>&lt;a href="/win-a-prize">상금 획득&lt;/a></code></pre>


접근 가능한 이름은 "상금 획득"이 될겁니다.

만약 이미지만 있다면, alt 텍스트가 사용될 수 있습니다:

<pre class="language-markup"><code>&lt;a href="/win-a-prize">&lt;img src="prize.png" alt="상금 획득">&lt;/a></code></pre>


그리고, 아무 것도 제공된 것이 없다면 이름은 <code class="language-javascript transparent">null</code>이나
빈 문자열이 될 것이고, 따라서 어떤 사람들은 상금을 받을 수 없게 될 겁니다.

### 양식 필드

양식 필드는 <code class="language-markup transparent">&lt;label></code> 요소(element)를 사용하여
레이블이 지정됩니다. 앞서 언급한 설문에서, WebAIM은 다음을 발견했습니다:

> 폼 입력의 59%는 레이블이 제공되지 않음

레이블 오류가 어떻게 생겼는지 살펴봅시다:

<pre class="language-markup"><code>&lt;div>Email&lt;/div> <!-- 이렇게 하지 마세요 -->
&lt;input type="email" id="email"></code></pre>

이 예에서, 단어 "Email"은 입력 바로 전에 타나나고, 따라서 사용자의 일부는 그것이 서로
관계되어 있음을 시각적으로 연관지을 수 있을 것입니다. 하지만, 그것들은 *연관*되어 있지 않고,
따라서 input은 이름을 가지지 않습니다 &mdash; 그것은 접근성 트리에서
<code class="language-javascript transparent">null</code> 또는
<code class="language-javascript ">''</code>로 평가됩니다.

<code class="language-markup transparent">&lt;label></code> 요소(element)로 input을 감싸거나,
input의 <code class="language-markup">id</code> 속성(attribute)과 일치하는
<code class="language-markup">for</code> 속성(attribute)을 사용하여 연결 될 수
있습니다.

<pre class="language-markup"><code>&lt;label for="email">Email&lt;/label> <!-- 이렇게 하세요 -->
&lt;input type="email" id="email"></code></pre>

### 표

표 이름을 제공하기 위해, <code class="language-markup transparent">&lt;caption></code>
요소(element)를 사용할 수 있습니다. 이것은 <code class="language-markup transparent">&lt;table></code>에
가장 첫 번째 요소(element)로 사용됩니다.

### 양식 그룹

양식에 input 들의 그룹, 예를 들어 동일한 질문의 답변인 라디오버튼이나 체크박스 모음을
설정하려고 할 때가 있습니다. HTML은 양식 요소(element)들에 대한
<code class="language-markup transparent">&lt;fieldset></code>을 가지고 있습니다.
이 그룹 전체에 이름을 지정하려면 <code class="language-markup transparent">&lt;legend></code>
 요소(element)를 사용합니다:

<pre class="language-markup"><code>&lt;fieldset>
  &lt;legend>Don't you love HTML?&lt;/legend>
  &lt;input type="radio" name="yesno" id="yes"/>
  &lt;label for="yes">Yes&lt;/label>
  &lt;input type="radio" name="yesno" id="no"/>
  &lt;label for="no">No&lt;/label>
&lt;/fieldset></code></pre>

접근성 트리에서 이 필드셋을 검사한다면, 그 그룹이 "Don't you love HTML?"로 알려져 있음을 확인할 수 있습니다.

## ARIA는 어떨까요?

[접근 가능한 이름과 설명 평가 명세](https://www.w3.org/TR/accname-1.1/)에
익숙한 사람들은 이 시점에 궁금해 할 지도 모릅니다: ARIA도 접근 가능한 이름을 요소(element)에
제공해 주지 않나요? 예를 들어
<code class="language-markup">aria-label</code>/<code class="language-markup">aria-labelledby</code>
속성(attribute)들을 통해서 전적으로 그러합니다. 요소(element)에 추가할 경우, 그것들은
접근 가능한 이름(이 있었다면)을 덮어 씁니다.

다만 ARIA에 비해 표준 HTML 태그가 선호되는 좋은 이유들은:

- 더 나은 브라우저 지원 (많은 브라우저들이 대부분의 ARIA를 지원하지만, 일반적으로 말해서
모든 브라우저는 모든 HTML을 지원합니다. )
- 모든 ARIA 기술을 가지지 못한 현재 혹은 미래의 팀 구성원들도 이해할 가능성이 더 높습니다.
- 국제화와 같은 것을 할 때(코드 내에 혹은, 구글 번역과 같은 외부도구로. Heydon Pickering의
게시글 [aria-label is a xenophone](http://www.heydonworks.com/article/aria-label-is-a-xenophobe)을 참고하세요)
잊어버릴 가능성이 적습니다.

때로는, 예를 들어 요소(element)가 CSS와 장단이 맞지 않는
경우(<code class="language-markup">fieldset</code>에 그리드 레이아웃을 사용하고자 할
때) 또는 (클라이언트의) CMS가 매우 유연하지 않은 경우, ARIA가 유용할 *수* 있습니다.

## 중요한 건 마크업입니다

최신 브라우저들에서는, 마크업은 인터페이스가 보조 기기에  어떻게 보이는지에 궁극적으로 영향을
주는 접근성 트리가 됩니다. 이 마크업을 어디에 작성했는지 여부는 그다지 중요하지 않습니다:

- .html 파일에
- Twig, Handlebars, Nunjucks에
- Vue 싱글 파일 컴포넌트의 <code class="language-markup transparent">&lt;template></code>에
- React 컴포넌트의 JSX에 의해 내보내진 결과에
- 괴상한 CMS에 의한 산출물에

당신의 사이트가 보조 기기 사용자들에 대해 경험이 만족스러운지를 결정하는 것은, *어떤*
마크업이냐 입니다.

당신의 사이트는 이미 무언가 이름을 짓는 위 HTML 요소(element)를 모두 사용 가능하다고 봅니다.
그것들은 여러 해 동안 존재해 왔습니다. 이 게시글이  당신의 사이트가 사용자에게 제공하는 코드가
항상  보조 기기에 대한 유용한 이름을 포함하도록 보장하기 위해 노력해야 하는 이유를 설명해주기를
바랍니다.

마크업에 대해 말해서 사이트의 모든 것에 이름을 적용하는 것은 별 것 아니지만, 실제 과제는
아마도 두 가지일 겁니다. 하나는 **콘텐츠**에 대한 것(유용하고 구별 가능한 이름이 언급되는가)과
**기술**에 대한 것(사용자의 DOM에 올바른 마크업이 들어가도록 보장할 수 있는가)입니다.