---
title: 안드로이드 크로스브라우징 테스트 환경 구축
tags:
  - 안드로이드
  - android
  - 크로스브라우징
  - cross-browsing
_categories:
  - 개발노트
  - HTML/CSS
date: 2014-10-15 10:43:38
thumbnail: /upload/2014/thumbs/genymotion-01.jpg
hero: /upload/2014/genymotion-01.jpg
seo:
  description: |
    어플리케이션을 개발할 때 안드로이드가 OS 버전별로 파편화가 심하여 고생하는 만큼, 모바일 웹을 제작하는데 있어서도
    안드로이드의 파편화는 정말 '재앙' 수준 이다.

---


모바일계의 IE… 안드로이드 기본브라우저를 두고 내가 붙여준 별명이다 = _=a

어플리케이션을 개발할 때 안드로이드가 OS 버전별로 파편화가 심하여 고생하는 만큼, 모바일 웹을
제작하는데 있어서도 안드로이드의 파편화는 정말 '재앙' 수준 이다.

이전 회사에 몸담고 있을 때는, 어떻게든 모바일 웹을 테스트 하기 위해 갖가지 실 단말기들을 구해서
테스트를 진행해 왔는데, 이것도 한계가 있더라… <br>
거기다 현재 회사에 와서는 그 많은 실 단말기를 테스트 하기 어려운 상황인지라 어떻게든 안드로이드
브라우저에서 테스트를 진행할 수 있을지에 대한 고민과 검색이 시작되었고, 마침내 그 결과를 얻어냈다!!!

## Genymotion Android Emulator

거의 한 시간 가량을 구글을 헤집고 다니며 Android 기본 브라우저를 PC 환경에서 테스트 해 볼 수 있는
방법을 찾아다닌 결과로 찾아낸 것이 바로 "Genymotion Android Emulator(이하 Genymotion)"다. <br>
( 오해는 말자, 필자는 Genymotion과 아무런 관계가 없는 인간이다 ;;; )

Genymotion의 장점이라면,

- Android OS를 구동하는데 매우 쉽게 접근이 가능하다라는 점
- 진저브레드(2.3.7버전), 젤리빈(4.1.1, 4.2.2, 4.3 버전), 킷캣(4.4.4 버전)을 제공
- 디바이스 모델별(Custom, Google Nexus, HTC, LG Optimus, Motorola, Samsung Galaxy, Sony Xperia)로
가상 디바이스를 제공

한다는 점이다.

단, Genymotion을 사용하기 위해서는 Oracle VirtualBox가 필요하다.
마침 필자는 예전부터 VirtualBox를 사용해 왔기 때문에 더할 나위 없이 아무 걸릴 것이 없는 환경 ㅋ

### Genymotion Android Emulator 설치

일단 Oracle VirtualBox가 필요하니, VirtualBox가 설치되어 있지 않다면, 이것부터 설치를 진행한다.
설치는 단순히 [VirtualBox Download 페이지](https://www.virtualbox.org/wiki/Downloads)로 이동하여
설치파일을 내려받아 실행하면 끝!

VirtualBox가 설치되어 있다면 [Genymotion Download 페이지](https://www.genymotion.com/fun-zone/)로
이동하여 설치파일을 내려받아 실행하면 된다. <br>
단순히 퍼블리셔로서 브라우저 테스트를 하는데에는 무료버전이면 충분하다.
참, Genymotion을 다운받기 위해서는 회원가입이 필요하니 이 점도 참고하기를…

### virtual device 추가

설치가 완료되고 Genymotion을 띄워보면 Start, Add, Settings, About, Help 총 5개의 메뉴를 볼 수 있고,
"Your virtual devices"에 add 된 가상 디바이스 목록을 확인 할 수 있다.
virtual device를 추가하는 방법은 단순히 Add 버튼을 클릭 하여 필요한 Android 버전과 Device model을
선택 후 "Available virtual devices" 목록에서 설치할 디바이스를 선택 후 디바이스 추가를 진행하면 모든
프로세스가 자동으로 이루어진다.

이렇게 해서 현재 필자의 작업용 PC에 추가된 가상 디바이스 현황이다.

<p>
  {% img /upload/2014/genymotion-01.jpg "''" "'추가된 가상 디바이스 목록'" %}
</p>

뭐… 국내 환경이 일단 제일 우선이므로… 간단하게 삼성 갤럭시로만 도배를 했다… 쿨럭 ;;;

목록을 보면 [단말기 이름]-[OS 버전]-[API 레벨]-[화면 해상도] 가 표기되어 있으니, 안드로이드 OS별 및
모바일 해상도별 테스트에도 꽤 도움이 된다.

### virtual device 구동

가상 디바이스를 구동하는 것은 매우 간단하다. 단지 Genymotion을 실행하고, 구동시킬 가상 디바이스를
더블클릭 하거나 선택 후 Start 버튼을 클릭하기만 하면 된다. VirtualBox는 실행시키지 않아도
Genymotion이 알아서 실행시킨다.

가상 디바이스가 구동이 되면 실제 디바이스와 동일한 모습의 화면을 드디어 볼 수 있게 된다.

<p>
  {% img /upload/2014/genymotion-02.jpg "''" "'가상 디바이스 구동 캡쳐화면'" %}
</p>

이제 기본 브라우저를 실행시켜 만들어진 모바일 웹을 테스트 하기만 하면 된다!!!