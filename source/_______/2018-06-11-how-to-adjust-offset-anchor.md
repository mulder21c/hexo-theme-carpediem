---
title: 해쉬 링크 오프셋 조정하기
tags:
  - 해쉬 링크
  - hash
  - css3
  - fixed header
_categories:
  - 개발노트
  - HTML/CSS
date: 2018-06-11 15:01:39
seo:
  description: |
    이 방법은 fixed header의 해결에도 사용할 수 있지만, fixed header가 없는 경우에도 해쉬 링크 이동시 브라우저
    상단에 딱 붙는 것을 원치않는 — 이동 위치가 상단에서 약간 떨어지게 하는 효과를 가져올 수도 있다.

---


HTML 문서 내의 특정 위치로 이동하기 위해 해쉬 링크(hash link)를 사용하는 것은 아마 웹 퍼블리셔라면 모르는 이가 없을 거다.
그런데 이 해쉬 링크로 이동하는 것은 기본적으로 해당 위치로 스크롤을 이동시키기 때문에 가시적으로 보이는 영역의 최 상단에 걸치게 된다.

이것이 본래 기본 기능이기 때문에 크게 문제가 될 것은 없지만, 최근 많이 사용되고 있는 fixed header를 사용하는 경우라면 해당 영역에
가리워지는 형태를 쉽게 만나게 된다.

하여, 이번 포스트에서는 해당 현상을 fix하는 방법에 대해 소개하고자 한다.
이 방법은 fixed header의 해결에도 사용할 수 있지만, fixed header가 없는 경우에도 해쉬 링크 이동시 브라우저 상단에 딱 붙는 것을
원치않는 &mdash; 이동 위치가 상단에서 약간 떨어지게 하는 효과를 가져올 수도 있다.

방법은 단순하다.
해쉬에 해당 하는 요소(element) 위로 여백을 주면 된다. 단, padding을 주게 되면 요소(element)자체의 높이에 영향이 발생하게 되고,
그렇다고 margin을 주게 되면 바로 상위에 위치한 요소(element)와 간격에 영향이 가는 문제가 발생한다. 따라서 요소(element)
자체가 아니라 :before 가상선택자를 이용하여 가상 요소에 관련 스타일을 부여하면 된다.

따라서,

```css
:target:before{
  content: "";
  display: block;
  height: 2em;          /* fixed header 높이 만큼 부여 or 브라우저 상단에서 띄워놓기 원하는 높이 */
  margin-top: -2em;     /* 위에서 설정한 높이와 동일한 만큼을 음수로 제공 */
  visibility: hidden;
}
```

이렇게 CSS만 적용하면 된다.

:target Selector를 사용할 수 없다면, <code class="language-css">[id], a[name]</code> Selector를 사용해 볼
수도 있을 듯 하다.

단, 이것은 어디까지나 block-level box에 적용되는 방법이다.
어디까지나 기본적인 방법에 대해서만 소개를 한 것이고, 상황에 따라 어떻게 변형하여 사용할 것인가는 스스로 고민들을 해보시기를...