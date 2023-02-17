---
title: W3C HTML5 Specification 번역 준비
tags:
  - HTML5
  - 명세 번역하기
_categories:
  - 개발노트
  - HTML/CSS
date: 2016-10-14 14:50:20
seo:
  description: |
    W3C github에 올라가있는 resource로부터 명세 HTML 파일을 export 하는 방법에 대해서 기록을 해둔다.
---


머리 속에서 사라지기 전에 남겨놔야 할 거 같아서 미비한 대로 기록해둔다.

HTML 5.1 명세가 지난 9월 중순에 PR 상태가 되어서 이제까지 번역하던 HTML 5 버전을 어찌할까 고민하다
과감히 접어버리고(?) 새로이 5.1 버전부터 다시 번역하기로 마음먹고 W3C github repository를 다시 pull
받았다.

HTML 5 때에는 해당 명세 페이지를 복사해 왔었으나, 아무래도 버전업이 될 때마다 diff가 되기 힘들듯
하여 github의 것을 그대로 활용해서 사용하려 했는데… 뭔가 복잡한 과정을 거쳐야 명세 페이지가 나오게
끔 되어 있었더라는… ㅠ^ㅠ흑흑

해서 W3C github에 올라가있는 resource로부터 명세 HTML 파일을 export 하는 방법에 대해서 기록을 해둔다.
(참고로 windows 기준이다. mac이나 linux의 경우는 설치 방법이 약간 다르다.)

## 준비물

- HTML specification’s Resourecs ( from [github](https://github.com/w3c/html) )
- [Python 2.7](https://www.python.org/download/releases/2.7.8/), [PIP](https://pip.pypa.io/en/latest/installing/), [LXML library](https://pypi.python.org/pypi/lxml/3.4.4) (bikeshed 설치를 위한 준비)
- [bikeshed](https://github.com/tabatkins/bikeshed.git) (spec preprocessor)
- [node.js](https://nodejs.org/ko/) (multipage 설치를 위함), [multipage](https://github.com/adrianba/multipage)

## 들어가기 앞서

HTML 5.1 명세부터인지는 모르겠지만, 내 기억이 맞다면 5.1 부터는 명세 발행 방식이 bikeshed를 통하는
것으로 바뀌고, 명세의 파일 구조도 제법 바뀐듯 하다.

기존에는 whatwg 브랜치에서 html 을 직접 가져오는 것으로 기억되는데, 현재는 sections/[section 명].include
파일 형태로 쪼개어져 존재하고 이를 bikeshed를 통해서 전처리 하여 single page로 export 하는 방식으로
보인다. 그리고 이 single page를 이용하여 multipage.js를 통해 분리된 각 파일들을 생성하여 최종적으로
우리가 보는 형태의 명세가 나오는 듯…

그리고 이 include 파일들은 특정 컨벤션에 따라 작성이 되어 있기 때문에, 무턱대고 편집하다가는…
single page조차 export 되지 않을 수 있으니, 반드시 W3C/html git의 readme.md를 꼭 읽어보고 시작하기를…
일단 내가 번역을 시작하면서 알게 된(?) 몇 가지 주의사항만 이곳에 기록을 해 둘 것이다.

## 일단 필요한 프로그램들(?)부터 설치하기

1. 일단 당연히 HTML 명세를 발행하기 위한 리소스들이 필요하다.

  이를 위해 git을 이용해도 되고, git이 없다 하더라도 github에서는 zip 파일로 다운로드가 가능하니
  그걸 이용해도 된다.

2. bikeshed를 설치 하기 위해 python을 먼저 설치하도록 한다.

  1. 우선, python 2/7을 시스템에 설치 하고 (32bit든 64bit든 상관은 없다)
  2. 환경 변수 등록을 위해 명령프롬프트(cmd)를 열고
     <code class="language-PowerShell">setx /m PATH "%PATH%;C:Python27;C:Python27Scripts"</code>를
     입력한다.
  3. 이후 PIP를 설치하고 (get-pip.py 다운받아서 더블클릭)
  4. LXML을 설치한다. (위 언급한 링크에서 다운받아서 install)
  5. pygments(phython syntax highlighter 란다) 설치를 위해 git bash(혹은 cmd)에서
     <code class="language-bash">python -m pip install pygments</code>를 실행한다.

3. python 설치가 끝났으면 이제 bikeshed를 설치한다.

  1. 일단 github에서(위에 언급된 링크) bikeshed 설치에 필요한 파일들을 가져오고
  2. git bash(혹은 cmd)에서 <code class="language-bash">python -m pip install --editable /path/to/cloned/bikeshed</code>를 실행한다.
     “/path/to/cloned/bikeshed” 는 당연히 bikeshed 리소스가 위치한 경로다.
     (설마 이걸 그대로 치는 사람은 없겠지 = _=a)
  3. 설치가 완료되면 update가 있는지 확인하기 위해 <code class="language-bash">bikeshed update</code>를 실행한다.

4. bikeshed의 설치가 끝았으면 이젠 multipage를 설치할 차례. 물론, single page로만 export할 거라면
설치하지 않아도 된다.

  1. github에서 multipage 설치에 필요한 파일들을 가져오고
  2. git bash(혹은 node cmd)에서 <code class="language-bash">npm install</code>를 실행한다. <br>
     (노드 패키지 설치는 참 쉽다 = _=)

## single page export 해보기

설치가 다 끝났으니, 테스트 겸 single page를 export 해본다. single page를 export하는 건 참 쉽다.

git bash(혹은 cmd) 상에서 HTML 리소스가 있는 경로로 이동 후, <code class="language-bash">bikeshed spec</code>를
입력하면 그만이다. 대략 2~3분 정도 지나면 single-page.html 이 생성되는데, 이 녀석이 HTML 5.1 명세의
단일 페이지 버전이다.

## multipage로 분리시켜보기

single-page.html을 열어보면 알겠지만… 어마어마한 용량 덕분에 한 페이지 띄우는데만도 엄청 느린 것을
격하게 체감할 수 있다. 해서 이젠 multipage로 split하는 작업을 진행해본다.

마찬가지로 git bash(혹은 cmd) 상에서 HTML 리소스가 있는 경로로 이동 후,
<code class="language-bash">node multipage.js ./single-page.html [output directory]</code>을 입력하면
된다라고 readme.md 에 나와 있으나… 실제로 돌려보면 오류가 발생한다… 쿨럭…

내가 무얼 잘못해서인지… W3C 명세에 문제가 있는 것인지는 확인할 길이 없으나… ㅠ^ㅠ <br>
어쨌든 문제가 발생되니 수동으로 문제를 고쳐봤다 = _=

문제가 발생되는 것은 multipage.js의 119번 라인에
<code class="language-javascript">while (section.node.get(0).tagName !== "section")</code> 이 부분인데..
<code class="language-javascript">section.node.get(0).tagName</code>이 null 참조 오류가 발생한다.

안되면 되게하라… <br>
이 부분을 <code class="language-javascript">while (section.node.get(0) && section.node.get(0).tagName !== "section")</code>로
변경해서 일단 null이 반환되면 pass 하도록 처리했다.

뭐… 어디서 export 안되는 것이 발생될지는 아직은 모르겠… ㅇㅏㅎㅏㅎㅏㅎㅏ아하하하…

그리고 나서 다시 <code class="language-bash">node multipage.js ./single-page.html [output directory]</code>를
입력해보면… 또 오류가 난다. = _=a 아오 쒸…

heap memory 관련 오류인데 당최 무슨 오류인지 찾아볼 엄두가 안난다…

그런데, W3C HTML repository 디렉토리 내에 .multipage-split.sh 라는 쉘 스크립트를 열어보니
<code class="language-bash">node --max_old_space_size=2048 ./tools/multipage.js single-page.html ./out/</code> 요런 코드가 있다.

혹시나 해서 <code class="language-bash">–max_old_space_size=2048</code> 옵션을 주고 돌려보니 분리가
진행되었다…!!! <br>
물론… 또 붙였을 때와 안 붙였을 때 export 결과에 차이가 있는지는 모른… <br>
어쨌든 이렇게 해서 번역본을 실제 HTML 파일로 export 하면 되겠다.

## 번역 중 주의해야 할 점…

앞서 언급했던 바와 같이 bikeshed에 의해 전처리 되어 HTML로 export되게 만들어 둔 이번 명세에는 특정한
컨벤션이 존재한다.

기이하게도(?) include 파일들 내에는 a 요소에 href가 존재하지 않지만, bikeshed에 의해 이 속성이
생성되게 되어지는데, 무턱대고 a 요소 내의 텍스트를 번역해버리면 link가 깨져서 bikeshed 처리 시 오류가
발생된다.

하지만 그렇다고 a가 걸리는 건 번역을 안 할 수도 없는 노릇.. 이 경우 a 요소에 lt 속성(attribute)를
이용하면 해결이 된다.

즉, <code class="language-markup">&lt;a>browsing contexts&lt;/a></code>의 경우
<code class="language-markup">&lt;a lt="browsing contexts">브라우징 컨텍스트&lt;/a></code>으로 하면
링크도 정상적으로 생성이 되고, 번역도 잘 이루어진다.

그리고 [[#blahblah]] 로 표현되어 있는 것이 있는데 “#”를 보면 떠올려지듯 해당 값을 href로 가지는
anchor로 변환되기 때문에 번역을 해서는 안된다.

대상 요소의 텍스트가 번역이 되면 이 규칙을 통해 작성된 부분은 번역된 텍스트를 가진 anchor로 자동 변환 된다.