---
title: Facebook 공유하기 오픈그래프 스크랩 정보 확인
tags:
  - Facebook
  - Open Graph
categories:
  - 개발노트
  - HTML/CSS
date: 2014-11-13 13:06:53
hero: /upload/2014/facebook-open-graph-overview.jpg
seo:
  description: |
    구글 선생님 덕분에 facebook 에서 현재 스크랩 된 정보를 확인 할 수 있는 디버거 툴이 있다는 것을 알게 되었다
---



최근 수능 프로모션 관계로 이벤트 페이지에 facebook share 기능을 붙이느라 이래저래 작업을 해서
테스트를 진행하는데 의도한대로 나타나지 않아 도대체 무엇이 문제인가?를 파악하기 위해 이래저래 애꿎은
코드만 달달 볶고 있다가 구글 선생님 덕분에 facebook 에서 현재 스크랩 된 정보를 확인 할 수 있는
디버거 툴이 있다는 것을 알게 되었다… (진즉에 알았더라면… ㅠ_ㅠ )

## Open Graph Object Debugger 페이지

일단, URL부터 투척!! [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)

디버거 페이지로 처음 들어가면 다음과 같은 화면을 볼 수 있다.

<p>
  {% img /upload/2014/Object-Debugger-1.gif "''" "'디버거 화면 캡쳐'" %}
</p>

이 페이지에서 2가지 기능을 사용할 수 가 있는데, 한 가지는 입력한 URL에 대해 현재 facebook에 존재하는
스크랩 정보를 확인 하는 기능("Show existing scrape information")이고 또 한 가지는 스크랩 정보를 새로
긁어오도록 하는 기능("Fetch new scrape information")이다.

스크랩 정보를 새로 긁어 오도록 하는 것은 말 그대로 기존에 캐싱된 정보를 삭제하고 현 시점을 기준으로
새롭게 정보를 긁어와 재캐싱하도록 하는 기능일 것이므로, 만일 페이지 내용이 바뀌었는데 해당 페이지를
공유했을 때 페이스북에 나타나는 정보가 과거의 것이라면 이 기능을 이용해서 갱신하도록 처리가 가능할
듯 싶다.

다음의 스크린샷은 실제 본 블로그 포스트 중 하나의 정보를 확인해 본 것이다.

<p>
  {% img /upload/2014/Object-Debugger-2.gif "''" "'디버거 실행 결과 화면 캡쳐'" %}
</p>

본 화면을 두고 하나하나 씩 짚어보자.

우선 첫 번째로 나타나는 항목인 "When and how we last scraped the URL"

여기에선 스크랩 정보가 언제 스크랩이 되었고, 해당 URL의 HTTP 상태코드, 긁어온 URL 주소와 해당 주소의
표준(canonical) URL을 확인 할 수 있다. 만일 스크랩 된 날짜가 페이지의 내용이 업데이트 된 날짜보다
이전이라면 이 정보를 통해 갱신의 필요를 가질 수도 있겠다.

두 번째로 보이는 항목은 "These are the raw tags that we found" 라는 항목으로, 여기에서는 facebook
scrapper가 긁어간 meta tag 요소를 HTML 형태로 표현해준다. 이 정보에서 어떤 요소가 정상적으로
들어오지 않는 지에 대한 오류 혹은 경고 메세지들도 나타나기 때문에 해당 페이지에 필요한 정보가 무엇이
있는지도 한 눈에 확인 해 볼 수 있다.
개인적으로 이 기능 완전 좋다. 강츄!! <span aria-hidden="true">乃</span>

세 번째 항목은 "Based on the raw tags, we constructed the following Open Graph properties" 항목으로,
바로 앞서 본 메타요소 정보를 기반으로 생성되어진 open graph 프로퍼티와 그 값들을 나타내준다. 이
정보를 통해 내가 원하는 정보들이 정확하게 들어가 있는지를 확인 할 수 있고, og:image로 설정한 것은 '
이미지 자체를 표현해주고 있기 때문에 더 할 나위 없이 편리하다.

다음 네번재 항목은 "When shared, this is what will be included"로 실제 facebook으로 공유하기를 했을
때(혹은 페이스북에 URL 입력 시) 입력박스(?)에 나타나게 될 표현 형태가 보여진다. 이를 통해 내가
입력한 open graph 정보들을 통해 실제 사용자가 페이스북에 공유할 때 어떤 형태로 나타나는지를
직관적으로 확인할 수 있어 원하는 형태와 일치하는지를 확인해 볼 수 있겠다.

마지막 항목인 "Urls"은 뭐에 쓰라고 나와 있는건지는 잘 모르겠…;;;

Graph API에 나타난 URL을 들어가보면 facebook scrapper가 긁어간 정보를 JSON 타입으로 뿌려주고 있음을
확인할 수 있었다. 아마도, JSON 형태로 받아서 쓸 수 있도록 제공을 하는 모양이다. Scraped URL에 나타난
URL로 들어가면 긁어와진 페이지의 HTML Source를 볼 수가 있는데 이건… 흠… 원하는 source code가
맞는지를 확인하라고 있는건지… ;; = _=a

## Comment

번 작업을 진행하면서 이 툴을 이용함을 통해 어떤 정보가 정상적으로 긁어가지지가 않은지 어떤 정보가
잘못 들어가 있는지 등을 한 눈에 확인 할 수 가 있었고 이는 굳이 facebook에 실제 테스트를 수행하기
이전에 먼저 발생가능 한 오류 사항을 검출하여 보완하고 재확인함을 통해 최종 결과물의 신뢰도를 한 층
더 끌어올리고 실 테스트에서 발생할 수 있는 오류를 줄임으로서 배포 시간을 좀 더 단축할 수 있게 되었다.
이건 그냥 짱이다 ㅋㅋㅋ