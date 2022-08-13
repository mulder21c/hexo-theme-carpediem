---
title: Codility Lesson 5 — PassingCars
tags:
  - algorithm
  - codility
categories:
  - 개발노트
  - JavaScript
thumbnail: /upload/2019/thumbs/codility-passing-cars.jpg
hero: /upload/2019/codility-passing-cars.png
seo:
  description: |
    Codility 알고리즘 연습
    Lesson 5 PassingCars
date: 2019-12-22 22:47:44
---


## Task description

- 연이은 차량 배열 A가 주어지고 이 차량(?)들은 값을 0/1을 가짐.
- 0은 동쪽으로 이동하는 차량, 1은 서쪽으로 이동하는 차량
- 교차해 지나간 차량의 쌍의 수 찾기 (단 쌍을 이루는 첫번째 차량은 0 이어야 함)

## How I did solve

글로 풀어서 작성이 안될거 같아서 그림으로 대체 ...

![풀이 과정](/upload/2019/codility-passingcar-solving.gif)

결국 반대 방향으로 가는 차량이 나타났을 때, 동일한 방향으로 가는 차량의 수만큼과 교차하므로
각 차량을 순회하면서
교차한 수 = 교차한 수 + 같은 방향으로 가는 차량 수
를 누산하면 된다.

단, 1,000,000,000을 넘어서면 -1 반환.

### Solved Code

```javascript
function solution(A) {
  const limit = 1000000000,
        condition = 0;

  let count  = 0,
      paired = 0;

  A.some ( item => {
    if(condition === item)  {
      ++paired;
      return false;
    }
    if(count > limit) return count = -1
    else count += paired;
  });

  return count;
}

```


## Retrospective

- 역시 문제를 이해하는게 문제였다...
- 대체 왜 각 car는 0s 나 1s를 가진다고 문제를 내놓은 건지부터가 허들이었다.
  0초나 1초인데 0초는 동쪽을 향해 가고 1초는 서쪽을 향해 간다는게 대체 무슨 말인지
  지금도 이해가 안되는건 매한가지다. (문제 풀이에서 초단위는 그냥 무시해버렸는데 되어라;;)
- passing cars라는 의미를 해석하는데도 애를 먹었다. "지나가는 차"로 해석을 하니 "교차한
  차"일거라고는 생각도 안했던 터라 초단위와 무슨 관계가 있는 줄 알고 (나를 앞서 질러간 차도
  passing car라고 생각...) 처음에 초단위에 매여있는 바람에...
- 결론은 영어부터 잘하자... 하아...