---
title: Codility Lesson 3 — tapeEquilibrium
tags:
  - algorithm
  - codility
_categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-tape-equilibrium.jpg
hero: /upload/2019/codility-tape-equilibrium.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 3 tapeEquilibrium
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-19 23:40:44
---

## Task description

|(A[0] + ... + A[P-1]) - (A[P] + ... + A[N-1])| 최소값 찾기

## How I did solve

- 배열의 전체 합 <code class="language-javascript">sumOfTatal</code>을 구함

- A의 요소를 탐색해가며

  탐색한 요소들의 합을 구하면  <code class="language-javascript">A[0] + ... + A[P-1]</code>

  탐색한 요소들의 합을 전체 합에서 빼면 <code class="language-javascript">A[P] + ... + A[N−1]</code>

- 둘의 차이 중 최소값을 반환

### Solved Code

```javascript
function solution(A) {
  const sumOfTotal = A.reduce( (acc, entry) => acc + entry, 0 )
  let  diff = Number.MAX_SAFE_INTEGER

  for(let P = -1, sumOfFirstPart = 0, sumOfSecondPart = sumOfTotal; ++P < A.length - 1 ; ) {
    sumOfFirstPart += A[P]
    sumOfSecondPart -= A[P]

    diff = Math.min(diff, Math.abs( sumOfFirstPart - sumOfSecondPart ) )
  }
  return diff;
}
```

## Retrospective

- 두 번만에 풀었다.

- 첫 번째 풀 때에는 P를 증가시키면서 배열을 slice해서 각 배열의 합의 차이를 구하는 방식으로
  했더니 시간 복잡도 때문에 timeout 되더라 하하...

- codility가 코드를 제출해야만 평가를 해주기 때문에 불편한 감이 많다. 테스트 데이터를
  미리 제공해주면 그래도 좀 제출 전에 검증을 해 볼 수 있을 텐데 말이다.