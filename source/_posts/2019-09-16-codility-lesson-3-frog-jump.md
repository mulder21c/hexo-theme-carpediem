---
title: Codility Lesson 3 — FrogJump
tags:
  - algorithm
  - codility
categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/frog-jump.jpg
hero: /upload/2019/frog-jump.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 3 FrogJump
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-09-16 11:54:23
---




## Task description

위치 X에서 Y까지 최소 점프 횟수를 계산합니다.

## How I did solve

- position X에서 position Y로 이동하는데 한 번에 D 만큼 이동한다면,

  총 이동거리 (Y - X) = n * 1회 이동거리(D)

- 소수점은 1회 이동을 해야 하므로 올림 처리

### Solved Code

```javascript
function solution(X, Y, D) {
  return Math.ceil((Y - X) / D)
}
```

## Retrospective

- 이 문제는 고민할 필요도 없이 바로 풀이가 도출 됨... 혹시 다른 방법이 있나?