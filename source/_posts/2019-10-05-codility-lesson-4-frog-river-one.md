---
title: Codility Lesson 4 — FrogRiverOne
tags:
  - algorithm
  - codility
categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-frog-river-one.jpg
hero: /upload/2019/codility-frog-river-one.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 4 FrogRiverOne
style: |
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2019-10-05 23:08:09
---


## Task description

시간별 개구리의 위치 정보를 담고있는 배열 A(배열 인덱스가 초단위 시간, 값이 위치), 강의 끝
위치 X가 주어졌을 때 모든 위치를 거치게되는 가장 빠른 시간 찾기

모든 위치를 거치지 못한다면 -1을 반환

## How I did solve

- 각 위치당 시간 정보를 가진 새로운 배열이 필요
- 각 위치를 배열의 index로 사용
  - X 길이 만큼의 배열 생성
- 각 위치에 시간 기록
  - 이미 기록된 위치에는 재작성하지 않아야 함
- 배열에 모든 요소가 값이 있다면 가장 높은 값을 반환
- 그렇지 않으면 -1 반환

### Solved Code

```javascript
function solution(X, A) {
    let arr = new Array(X).fill(null)

    for(let i = -1, entry; entry = A[++i]; ) {
        if(arr[entry - 1] === null) arr[entry - 1] = i
    }
    if(arr.indexOf(null) > -1) return -1
    return arr.sort( (a,b) => a - b).pop()
}
```

## Retrospective
- 두 번 만에 풀었다...
- 처음엔 O(N)이 되기 전에 종료할 수 있으면 종료해보자는 생각으로

  ```javascript|data-line="3"
  for(let i = -1, entry; entry = A[++i]; ) {
    if(arr[entry - 1] === null) arr[entry - 1] = i
    if(arr.indexOf(null) < 0) break
  }
  ```

  이렇게 해봤었는데 Timeout이 걸리더라...
  아무리 생각을 해봐도 결국 A를 전부 다 훑어야만 결과가 나올 수 있을 것 같아서 해당 라인을
  제거하고나니 통과...
- O(N)이 나오는건 여전히 찝찝하다... 다른 방법이 없는지 좀 더 고민을...