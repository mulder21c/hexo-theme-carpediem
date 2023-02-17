---
title: Codility Lesson  — PermCheck
tags:
  - algorithm
  - codility
_categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-perm-check.jpg
hero: /upload/2019/codility-perm-check.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 4 PermCheck
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-30 11:01:46
---


## Task description

주어진 배열이 순열이면 1 그렇지 않으면 0을 반환

## How I did solve

- 순열이라면, 1 + (N), 2 + (N-1), 3 + (N-2)이 모두 같은 값을 가질 것으로 가정

- 주어진 배열을 오름차순으로 정렬 후, 순차적으로 더한 값을 비교해가면 누락된 숫자가 있는
경우 해당 합에서 차이가 발생할 것이므로 O(n/2)로 해결 가능할 것으로 추측

### Solved Code

```javascript
function solution(A) {
  const arr = A.sort( (a, b) => a - b )
  const lastEl = arr[arr.length - 1];
  const partOfSum = lastEl * (lastEl + 1) / arr.length
  const condition = Math.floor(arr.length /2 );

  for( let i = -1; ++i < condition; ) {
    if(arr[i] + arr[arr.length - 1 -i] !== partOfSum)
      return 0
  }

  return 1
}
```

## Retrospective

- 제출 결과 시간 복잡도가 O(N) 또는 O(N * log(N)) 으로 나오는데... 왜 그렇게 되는지 모르겠다 ;;;

- 아직까지는 어렵지 않다.

- 왠지 이 방법 말고 다른 더 좋은 방법이 있을 것 같은 느낌적인 느낌. 한 번 더 고민해보자.