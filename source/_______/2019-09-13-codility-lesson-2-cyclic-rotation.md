---
title: Codility Lesson 2 — CyclicRotation
tags:
  - algorithm
  - codility
_categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/cyclic-rotation.jpg
hero: /upload/2019/cyclic-rotation.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 2 CyclicRotation
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-13 00:35:12
---



## Task description

주어진 수만큼 배열을 오른쪽으로 이동

## How I did solve

- 주어진 값이 `A = [3, 8, 9, 7, 6] `, `K = 3` 일 경우 결과는 `[9, 7, 6, 3, 8]`

  즉, 3만큼 오른쪽으로 이동시킬 경우 뒤에서 3개 요소를 앞으로, 나머지를 그 뒤에 나열시키는
  새로운 배열 반환.

- 이를 위해서는 `array.length - 3`부터 마지막 요소까지를 slice ,나머지를 slice

- slice된 배열을 접합

- K가 배열 길이를 넘어설 경우 n회의 cycle을 돌아 제자리가 되므로 K를 배열 길이로 나눈 몫으로
  사용.

### Solved Code

```javascript
function solution(A, K) {
  let condition = A.length - (K % A.length);
  return A.slice(condition).concat(A.slice(0, condition));
}
```

## Retrospective

- 이 문제는 밀려나간다는 생각에서 해결 방법이 바로 도출되어 단시간에 해결 되었다.
  다만 <code class="language-javascript">Array.prototype.slice</code>의 두 번째
  인자의 인덱스가 포함되는지 아닌지에 대한 확신이 없어서 로그를 찍어보고 검증을 거친 뒤에야
  제출이 이루어졌다.

- 내가 얼마만큼 레퍼런스에 의존하고 있었는지가 여실히 드러나는 순간이었다. 정확하게 기억나지
  않으면 문서를 찾아보고 사용하다보니 지적 재산으로 쌓기 보다는 의존하는 방향으로 뇌가 익숙해진
  느낌이다. 의존도를 낮추는 훈련이 필요할 듯 하다.