---
title: Codility Lesson 4 — MaxCounters
tags:
  - algorithm
  - codility
_categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-max-counter.jpg
hero: /upload/2019/codility-max-counter.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 4 MaxCounters
date: 2019-12-08 19:08:01
---



## Task description

- 정수 N과 1 ~ N + 1까지의 값을 원소로 가지는 배열 A가 주어짐
- 배열 A를 순회하면서 해당 값들이 나오는 수를 카운트
- 배열 A를 순회하는 중에 발견된 값이 N + 1일 경우 모든 값에 대한 카운트를 가장 높은 카운트 수로 일괄 변경

즉,


```javascript
N = 5

A[0] = 3
A[1] = 4
A[2] = 4
A[3] = 6
A[4] = 1
A[5] = 4
A[6] = 4
```

이러한 N과 A 배열이 주어졌다면,
A[2]까지 순회 했을 때 3은 1번, 4는 2번 카운트 되었으므로
<code class="language-javascript">(0, 0, 1, 2, 0)</code>이 반환되어야 하고,
이후 A[3]까지 순회 했을 때는 6 = N + 1에 해당하므로 모든 값에 대한 가장 높은 카운트
수인 2로 일괄 변경하여
<code class="language-javascript">(2, 2, 2, 2, 2)</code>가 반환되어야 함.

이를 처리하는 가장 효율적인 알고리즘 작성

## How I did solve

### 1 차 (77%)

- 1부터 N까지 A에 몇 번 나타나는가가 일단 기본값을 이루기 때문에 카운터 Deck(?)을 만들어
  두고 값 값이 나올때마다 Deck의 값을 1씩 증가.
- N + 1의 값이 나오면 모든 Deck을 가장 큰 카운터 값으로 채움
  - 가장 큰 카운터 값을 그 때 그 때 조회하는건 비효율적이므로 값을 조회할 때마다 가장 큰
    카운터 값을 미리 담아 둠.
- 최종적으로 반환 시에 Deck이 비어있으면 오류이므로 Deck의 각 카운트 값은 0으로 초기화.

이 요구사항으로 구현을 하고 제출했으나... 스코어 77%... 또르르...

large_random2과 extream_large 케이스에서 Timeout이 발생했다.

#### Solved Code

```javascript
function solution(N, A) {
  const counter = new Array(N).fill(0);
  let maxCounter = 0;

  A.forEach( item => {
    let idx = item - 1;
    if(item <= N) {
      counter[idx] += 1;
      maxCounter = Math.max(maxCounter, counter[idx]);
    }
    else
      counter.fill(maxCounter)
  })

  return counter
}
```

### 2차

어디서 문제일까 되짚어 봤을 때, 아무래도
<code class="language-javascript">counter.fill(maxCounter)</code> 이 부분에서
timeout을 일으킨듯 보여서 이 부분을 개선해보기로.

- N + 1이 나타날 때 마다 fill 하는 대신 max counter를 memorize해두고 마지막에 한 번에 적용
- 단, 이 경우 중간에 max counter로 변경되어 거기서부터 다시 1씩 증가시키는 경우는 결과값이
  달라지므로, 증가 시킬 때 max counter와 memorized counter를 분리하여 max counter가
  발생된 이후 반영된 적이 없으면 일반 변경시키고 증가 시키도록 구현

그리고 이렇게 해서 100% 달성!

#### Solved Code

```javascript
function solution(N, A) {
  const counter = new Array(N).fill(0);
  let maxCounter = 0;
  let tmpMaxCounter = 0;

  A.forEach( (item) => {
    let idx = item - 1;
    if( item <= N) {
      counter[idx] = Math.max(counter[idx], maxCounter);
      counter[idx] += 1;
      tmpMaxCounter =  Math.max(counter[idx], tmpMaxCounter);
    }else{
      maxCounter = tmpMaxCounter;
    }
  });

  counter.forEach( (item, idx, arr) => {
    arr[idx] = Math.max(item, maxCounter);
  })

  return counter
}
```

## Retrospective
- 하... 이 문제는 문제를 이해하는데만 거의 30분 이상을 쓴 것 같다.
  영어를 떠나서 문제 설명을 이렇게 어렵게 해놓아서야... 허허허...
  이 문제가 중급 난이도인건 문제 자체를 이해하는게 어려워서가 아닐까?
- 역시 두 번만에 풀었음. 한 번에 풀어보고 싶다...
- 아직까지는 그래도 풀만 하다.