---
title: white space는 4px이다? 정말?
tags:
  - 요소 간 공백
  - 인라인 공백
  - whitespace
  - negative margin
_categories:
  - 개발노트
  - HTML/CSS
thumbnail: /upload/2020/thumbs/letters-typo-typography-comic-sans.jpg
hero: /upload/2020/letters-typo-typography-comic-sans.jpg
seo:
  description: |
    "요소(element) 간 공백, 즉 white space를 제거하려면 어떻게 해야 하는가?"의 솔루션으로
    자주 만나게 되는 -4px. 그런데 정말 4px이 맞는걸까?
date: 2020-01-28 00:05:57
---


묵혀있던 글 감 하나를 꺼냈다.
"요소(element) 간 공백, 즉 white space를 제거하려면 어떻게 해야 하는가?" 에 대한 해결
방법에서 흔히 발견 할 수 있는 네거티브 마진을 주는 방식에서 소개 되는 것이

<pre class="language-markup"><code>&lt;nav>
  &lt;a href="#">list 1&lt;/a>
  &lt;a href="#">list 2&lt;/a>
  &lt;a href="#">list 3&lt;/a>
&lt;/nav></code></pre>

```scss
nav {
  > a {
    display: inline-block;
    margin-right: -4px;
  }
}
```

과 같은 해결책이다.
(이 외에도 여러 가지 방법들이 알려져있지만 그것들은 모두 차치하도록 하자.)

실제로 negative margin을 사용하여 요소 간 공백을 제거하는 방법을 찾아보면 -4px을
제시하는 곳을 꽤 많이 볼 수 있고, 인라인&middot;인라인 블럭 요소 사이의 빈 공백 제거
방법을 소개한 국내 블로그나 카페 등을 둘러 보아도 <code>-4px</code>을 제시하는 곳을
쉽게 발견 할 수 있다.

## 정말 4px이 맞을까?

그런데 정말 <code>4px</code>이 맞을까? 개인적으로 이건 틀렸다라는 가정을 이미 가지고
있었다.
이것을 적용하기 이전에 <code class="language-css">margin-left: -4px</code>
로는 올바르게 제거되지 않는 상황을 이미 경험했기 때문이다.

일단 결론부터 이야기 하면 4px이 아니라 0.2em ~ 0.5em 사이의 값을 가지고, 적어도 IE에서는
기본 폰트 사용 하에 0.25em가 적절하다.

### 실험을 해보자

실험에 사용 된 코드

```html
<nav>
  <a href="#"> list 1 </a>
  <a href="#"> list 2 </a>
  <a href="#"> list 3 </a>
</nav>
```

```scss
nav {
  > a {
    display: inline-block;
    width: 50px; // a 요소의 너비가 소수점으로 발생되는 것을 방지
  }
}
```

```javascript
(function(list){
  for(var i = -1, a = list[++i], b; b = list[++i]; ) {
    console.log(
      b.getBoundingClientRect().left - a.getBoundingClientRect().right
    )
    a = b;
  }
})(document.querySelectorAll('li'));
```

#### 조건 1.

```css
body{
  font-size: 100%;
}
```

FireFox 결과

```bash
1번째 간격:  5.633331298828125
2번째 간격:  5.633331298828125
```

Chrome 결과

```bash
1번째 간격:  5.625
2번째 간격:  5.625
```

IE 11 결과

```bash
1번째 간격:  4
2번째 간격:  4
```

#### 조건 2.

```css
body{
  font-size: 32px;
}
```

FireFox 결과

```bash
1번째 간격:  11.25
2번째 간격:  11.25
```

Chrome 결과

```bash
1번째 간격:  11.25
2번째 간격:  11.25
```

IE 11 결과

```bash
1번째 간격:  8
2번째 간격:  8
```

#### 조건 3.

```css
body{
  font-size: 40px;
}
```

FireFox 결과

```bash
1번째 간격:  14.066665649414062
2번째 간격:  14.066665649414062
```

Chrome 결과

```bash
1번째 간격:  14.0625
2번째 간격:  14.0625
```

IE 11 결과

```bash
1번째 간격:  10
2번째 간격:  10
```

#### 조건 4.

```css
body{
  font-family: serif;
  font-size: 16px;
}
```

FireFox 결과

```bash
1번째 간격:  5
2번째 간격:  5
```

Chrome 결과

```bash
1번째 간격:  5
2번째 간격:  5
```

IE 11 결과

```bash
1번째 간격:  5.329998016357422
2번째 간격:  5.3300018310546875
```

#### 조건 5.

```css
body{
  font-family: serif;
  font-size: 32px;
}
```

FireFox 결과

```bash
1번째 간격:  10.649993896484375
2번째 간격:  10.650009155273438
```

Chrome 결과

```bash
1번째 간격:  10.65625
2번째 간격:  10.65625
```

IE 11 결과

```bash
1번째 간격:  10.659996032714843
2번째 간격:  10.659996032714843
```

## 대체 왜 이런 결과가 나온걸까?

일단 <code>font-family</code>를 설정하지 않으면 IE는 원하던 4px을 뱉어(?)주었다.
그런데 <a href="#조건-1">조건 1</a>과 <a href="#조건-2">조건 2</a> ,
<a href="#조건-3">조건 3</a>의 IE 값을 비교해보면, 각각 4px, 8px, 10px로 바뀌는 것을
볼 수 있다.

<code class="language-css">font-size: 100%</code>은 사실
<code class="language-css">font-size: 16px</code>과 동일하다 (root에서
font-size를 변경하지 않는 한).

즉, 16 × ¼, 32 × ¼, 40 × ¼ 만큼으로 계산이 되는 것을 알 수 있다.
그리고 이것을 단위로 표현하자면 0.25em이 된다.

### 그럼 대체 이 4px, ¼(0.25em)는 어디서 온건가?

구글링을 하던 중에 마이크로소프트의 "[문자 디자인 표준](https://docs.microsoft.com/en-us/typography/develop/character-design-standards/whitespace)"이라는
문서를 발견했다. 이 문서에 따르면,

일반적으로 쓰이는 U+0020에 해당하는 공백 문자는 최소 1/5 em ~ 최대 1/2 em까지를 너비로
가질 수 있음이 기술되어 있고, 평균 너비로 약 ¼ em이 good value라고 기술 되어 있는 것을
확인 할 수 있었다.

결국 font-size를 설정하지 않은 상태 즉 16px을 기준으로 ¼의 값인 4px인 것이고,
이를 사전 조건없이 그저 4px을 네거티브 마진을 주면 된다라고만 받아들인 것으로 추측해 볼
수 있을 것 같다.

하지만, <code>font-family</code>에 다른 값을 주기라도 하면 이 공식마저 깨진다.
그냥 IE 전성시대(?)의 유물 같은 느낌이다.

### 그럼 나머지 브라우저는 또 왜?

그러면 또 나머지 브라우저들은 또 왜 ¼이 아닌걸까?

앞서 언급한 내용을 다시 보자.

> 평균 너비로 ***약*** ¼ em이 good value라고 기술 되어 있는 것

여기서 "약"이라는 것을 봐야 할 듯 하다.
딱 짚어서 ¼이 아니라 대략 ¼ ...

결국 브라우저 제조사의 재량(?)에 따라서 대략 ¼이다. 너구나 폰트 마다 "M"의 너비가 다를
터이니 폰트명이 바뀔 때 마다 간격이 바뀌는 것도 이해가 된다.

## -4px 혹은 -0.25em은 버리자...

결국 -4px, -0.25em은 요소 간 공백, 인라인&middot;인라인 블럭 요소 사이의 빈 공백 제거
방법으로는 적합하지 않다는 것을 볼 수 있다.

정확하게 빈 공백을 0으로 만들어야 한다면 이 방법 보다는 다른 방법을 쓰자.
나 역시도 -0.25em을 종종 사용해오기는 했는데 정확도가 떨어져도 괜찮은 정도에 사용 하는
정도로 만족하고, 정확히 0로 만들어야 한다면 차라리 flex를... /=ㅁ=/