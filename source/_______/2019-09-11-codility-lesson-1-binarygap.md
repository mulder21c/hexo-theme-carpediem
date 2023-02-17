---
title: Codility Lesson 1 — BinaryGap
tags:
  - algorithm
  - codility
_categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-binarygap.jpg
hero: /upload/2019/codility-binarygap.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 1 BinaryGap
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-11 23:37:11
---

## Task

주어진 정수의 2진 표현에서 가장 긴 zero sequence 구하기.

## How I did solve

### binary 변환

주어진 정수를 2로 나누어
- 나눈 나머지를 뒤에서부터 채움
- 몫을 다시 2로 나눈 나머지를 그 다음에 채움
- 몫이 0이 될 때까지 반복

<span role="text"><span aria-hidden="true">=></span><span class="hidden">따라서</span></span>
재귀 함수 이용

### zero gap 구하기

1. binary를 문자열로 받아서
2. trailing zero 제거
  : 정규식 이용
3. 1로 split하여 zero gap 배열을 취하고
5. 이를 오름차순 정렬
6. 배열의 마지막 요소의 길이를 반환
7. 배열의 마지막 요소가 없을 경우 0 반환

### Solved Code

```javascript
function solution(N) {
  const getBinary = (n) => {
    let quot = Math.floor(n/2);
    let mod = n % 2;

    if(quot < 1) {
      return mod + ``;
    }else {
      return getBinary(quot) + mod;
    }
  }

  const binary = getBinary(N);
  const result = binary
    .replace(/0+$/g, '')
    .split('1')
    .sort( (a,b) => a.length - b.length )
    .pop();

  return result ? result.length : 0;
}
```

## Retrospective

- 간만에 재귀함수를 만드려니 머리가 잠깐 멈추더라...

- 사실 처음 생각해 낸 프로세스에는 불필요한 프로세스가 끼어있었다.

  <code class="language-javascript">.split('1')</code> 이후에 emptry string을
  제거하는 프로세스 즉,
  <code class="language-javascript">.filter( entry => !!entry )</code>가 있었는데,
  sorting 하면서 필요 없다는걸 깨닫고 프로세스에서 제거.

  결과에는 영향을 주지 않지만 불필요한 연산이 끼어든다는 건, 생각의 흐름 속에서 깊이있는
  사고가 되지 않고 있다는 것이거나 한 번에 생각할 수 있는 청크가 크지 않다는 것일 듯 하다.

- 2진수 변환을 굳이 재귀함수를 쓸 필요가 없었다는 게 뒤늦게 생각났다.

  <code class="language-javascript">Number.prototype.toString(<i>radix</i>)</code>
  를 사용하면 재귀함수를 사용할 이유가 없어진다...
  <small>(재귀함수를 오랜 만에 작성해봤다는데 의의를 두련다...)</small>