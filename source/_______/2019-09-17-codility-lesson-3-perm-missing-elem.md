---
title: Codility Lesson 3 — PermMissingElm
tags:
  - algorithm
  - codility
_categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-perm-missing-elem.jpg
hero: /upload/2019/codility-perm-missing-elem.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 3 PermMissingElm
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-17 11:57:32
---



## Task description

주어진 순열에서 누락된 요소 찾기

## How I did solve

- 1 ~ (N + 1) 까지의 순열이 있다고 할 때, 단 1개의 요소만이 누락되어 있다면 누락되지 않은
  순열의 합과 현재 순열의 합의 차이가 곧 누락된 요소

- 1 ~ N 까지의 합

  (1 + N) * N / 2

- 1 ~ (N+1)까지의 합

  (2 + N) * (N + 1) / 2

### Solved Code

```javascript
function solution(A) {
  let sumNonMissing = (A.length + 2) * (A.length + 1) / 2
  return A.reduce( (acc, entry) => sumNonMissing - entry , sumNonMissing )
}
```

## Retrospective

- 1 ~ 100까지의 합을 구하는 알고리즘(?)을 알고있지 않았다면 이 문제를 쉽게 풀 수 있었을까?