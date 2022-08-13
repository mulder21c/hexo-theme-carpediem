---
title: Codility Lesson 4 — MissingInteger
tags:
  - algorithm
  - codility
categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-missing-integer.jpg
hero: /upload/2019/codility-missing-integer.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 4 MissingInteger
date: 2019-12-15 17:28:23
---


## Task description

주어진 수열에서 누락된 가장 작은 양의 정수 찾기

- 주어진 배열은 중복이 가능하고 음수도 포함되어 있다.

## How I did solve

전에는 양의 정수, 고유값들로 주어진 순열 중 누락분을 구하는 문제였어서 합을 통해 풀었으나,
이번에는 일단 중복이 발생되어 있고 음수도 끼어 있어서 hashmap을 이용해서 풀어보기로 했고
의외로 금방 풀어냈음.

### Solved Code

```javascript
function solution(A) {
  const hashMap = {};
  A = A.sort( (a,b) => a - b);
  A.forEach( item => {
    if( item > 0) hashMap[item] = item;
  });

  for(let i = 0; ++i < Number.MAX_SAFE_INTEGER;) {
    if( !hashMap.hasOwnProperty(i) ) {
      return i;
    }
  }
}
```

## Retrospective

- 비슷한 문제를 풀어본 경허이 있으니 어렵지 않게 해결.
- 위와 같이 풀어보고 나서 <code class="language-javascript">new Set</code>을 이용해서
중복을 제거하여 iterable을 순회해 봤는데 오히려 아주 살짝 느린 결과가 나오더라... ㅎㅎ