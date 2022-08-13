---
title: Codility Lesson 2 — OddOccurrencesInArray
tags:
  - algorithm
  - codility
categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-odd-occurences-in-array.jpg
hero: /upload/2019/codility-odd-occurences-in-array.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 2 OddOccurrencesInArray
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-12 23:45:24
---


## Task description

주어진 홀수 개의 요소를 가진 배열에서 짝을 이루지 않은 한 요소의 값 구하기

## How I did solve

배열 내 모든 요소에 대해 XOR 연산

### Solved Code

```javascript
function solution(A) {
  return A.reduce( ( acc, entry) => acc^entry, 0 );
}
```

## Retrospective

- 이 부분은 얼마 전에 이미 비트 연산으로 같은 값을 XOR 연산하면 0이 된다는 사실을 보았기
  때문에, 아직 기억 속에 머물러 있어서 큰 고민 없이 풀었을 뿐이라 만일 비트 연산을 제외한
  다른 방법으로 풀어내는 것도 고민을 해보아야 할듯 하다.