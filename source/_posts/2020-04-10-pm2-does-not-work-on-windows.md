---
title: Windows에서 PM2 실행 오류 해결
tags:
  - PM2
  - Node
  - Front-End
  - Troubleshoot
categories:
  - 개발노트
  - Front-End
hero: /upload/2020/node-pm2-success-cluster.jpg
seo:
  image: /upload/2020/node-pm2-success-cluster.jpg
  description: |
    PM2는 이미 이전 회사에서도 인수인계 단계에서 잠깐 본 경험은 있어서 어렵지 않게
    구동하는데... 어? 뭔가 이상하다.
thumbnail: /upload/2020/thumbs/node-pm2-success-cluster.jpg
style: |
  .hidden {
    @extend %sr-only;
  }
date: 2020-04-10 21:08:58
---


지난 주부터 합류한 회사에서 첫 번째 미션... 또 노드 서버가 죽고 있다.
<span aria-hidden="true">/=ㅁ=/</span><span class="hidden">맙소사</span> <br>

정확하게는 시간이 지나면 response가 오래 걸리는 이슈가 발생된다고 하는데 아직 직접 눈으로
확인한 바는 아니라서 (서버 재시작 알람만 받고 있는 상태) 상태 확인을 위해 PM2를 돌려보기로
했다.

## 설치... 그리고 오류

PM2는 이미 이전 회사에서도 인수인계 단계에서 잠깐 본 경험은 있어서 어렵지 않게
구동하는데...

![PM2 구동 결과 화면 - online 상태로 확인](/upload/2020/node-pm2-fisrt-run.jpg)

어? 뭔가 이상하다.
온라인으로 나오기는 하지만 Nuxt 빌드가 안되는 느낌인데? 아니나 다를까 페이지를 열어보니
안뜬다...

`pm2 list` 로 상태를 다시 찍어보니

![PM2 구동 결과 화면 - error 상태로 확인](/upload/2020/node-pm2-fisrt-fail.jpg)

오류 상태로 확인 된다. PM2를 죽였다가 다시 해봐도 마찬가지다.

## 또 Windows 문제...

문제 원인과 해결 방법을 찾아 관련 사례를 찾아가다보니
[PM2 is unable to run server.js on Windows 10](https://github.com/Unitech/pm2/issues/2808)라는
이슈를 발견했다.

답변들을 쭉 읽고 있으니 역시 Windows 10에서 나와 같은 고통을 겪은 이들이 제법 있더라
<span aria-hidden="true">= _=a</span><span class="hidden">허허...</span>
(맥북을 요청했어야 했나...)

어쨌든 다행히 해결 방법들도 있어서

```javascript
var exec = require('child_process').exec;
exec('npm run dev', {windowsHide: true});
```

요로코롬 `startscript.js` 파일을 하나 만들어두고 이 스크립트로 PM2를 실행하니 이제야 돈다 ㅠㅠ

![PM2 구동 결과 화면 - online 상태로 확인](/upload/2020/node-pm2-success.jpg)

클러스터 모드로 적용해도 잘 돈다

![PM2 클러스터 구동 결과 화면 - online 상태로 확인](/upload/2020/node-pm2-success-cluster.jpg)

현재 프로젝트에는 에코시스템까지는 적용이 되어 있지 않아서 에코시스템 설정까지 해봐야겠지만,
일단은 해결!!