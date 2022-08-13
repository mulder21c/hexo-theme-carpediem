---
title: 접근 가능한 탭 UI 만들기
tags:
  - 웹 접근성
  - a11y
  - WAI-ARIA
  - tab UI
  - 탭 콘텐츠
categories:
  - 개발노트
  - A11Y
date: 2018-06-04 19:46:43
hero: /upload/2018/tab-ui.jpg
seo:
  description: |
    ARIA를 적용함으로서 스크린리더 사용자는 이것이 탭 UI의 형태를 가진 콘텐츠임을 인식할 수 있고, 따라서 현재
    어떤 콘텐츠를 탐색 중인지를 그려볼 수 가 있다.
---


## 기존 방식의 문제점

과거, WAI-ARIA가 본격적으로 도입되기 이전에는 탭 콘텐츠에 대한 접근성을 제공할 방법 자체가 제한이 많았기 때문에 웹 콘텐츠
접근성 지침(이하 KWCAG)의 기준을 최대한 벗어나지 않는 대체 방안들로 제공이 되었다.

그 중 대표적인 것이,

```html
<div>
  <ul>
    <li><a href="#tab1">tab 1</a></li>
    <li><a href="#tab2">tab 2</a></li>
    <li><a href="#tab3">tab 3</a></li>
  </ul>
  <div id="tab1">
    <h3>tab 1</h3>
    ...
  </div>
  <div id="tab2">
    <h3>tab 2</h3>
    ...
  </div>
  <div id="tab3">
    <h3>tab 3</h3>
    ...
  </div>
</div>
```

이러한 형태의 마크업을 사용하거나,

```html
<div>
  <a href="#tab1">tab 1</a>
  <div id="tab1">
    ...
  </div>
  <a href="#tab2">tab 2</a>
  <div id="tab2">
    ...
  </div>
  <a href="#tab3">tab 3</a>
  <div id="tab3">
    ...
  </div>
</div>
```

의 형태를 마크업을 사용하고 CSS로 tab 메뉴에 해당하는 anchor들을 배치시키는 방식들이 주로 사용되었다.

전자의 경우는 사실 탭 목록을 먼저 마크업 하고 이후 탭 패널에 해당하는 부분들이 각각 어떤 탭에 대한 내용인지를 알 수 없으면
접근성에 문제가 될 수 있다는 문제로 인해 탭 패널 내에 각각의 탭 메뉴에 해당하는 내용을 제목으로 두어 해결하는 방식이었고,

후자의 경우는 전자의 방법대로 하자면 탭 메뉴와 탭 패널의 제목이 다시 중복되어 제공되는 문제나, 시선의 흐름상 탭 메뉴 1 → 탭
패널 1 → 탭 메뉴 2 → 탭 패널 2 → 탭 메뉴 3 → 탭 패널 3으로 읽히는 것이 논리적 흐름에 맞다는 이유에서 나타난 방식 이었던
것으로 기억한다.

하지만 이것은 어디까지나 과거 탭 콘텐츠를 인식하게 할 수 있는 기술 기반이 미비했기 때문에 당시에 최대한 가능한 방법을 찾고 찾아서
나타나게 된 방식인 것이지, 이 방식이 탭 콘텐츠에 대한 접근성을 해소해 줄 수 있는 정답이 아니다. (헌데 일부는 이 방법들을
정답으로 알고 있거나, 전자의 코드나 후자의 코드만이 옳다고 딱잘라 말하는 이들이 더러 보인다.)

두 경우 모두 여전히 해결이 불가능한 문제들이 남아있게 된다. &mdash; 탭 UI의 형태를 가지고 있다는 정보 제공의 어려움, 기본으로
어느 탭이 활성화 되어 있지는지 인식이 어려운 문제, 불필요한 heading 사용(그리고 그로 인한 문서 개요 문제), 디자인에 따라 적용하기
어려운 경우가 발생될 수 있는 문제나 다음 탭을 인식하기 위해서는 이전 탭 패널의 내용을 거쳐지나가야만 하는 문제 (탭 패널의 내용이 너무
길 경우에는 최악의 상황이 된다)등등.

## Use ARIA

ARIA[^1]를 사용하게 되면 이러한 문제들을 해결할 수 있게 된다. ARIA를 적용함으로서 스크린리더 사용자는 이것이 탭 UI의 형태를 가진
콘텐츠임을 인식할 수 있고, 따라서 현재 어떤 콘텐츠를 탐색 중인지를 그려볼 수 가 있다.

WAI-ARIA의 Authoring Practice 문서에는 어떻게 작성해야 하는지에 대한 설명이 나와 있고, 그 설명에 따라서 HTML, CSS,
JavaScript를 작성하기만 하면 된다.

때문에 ARIA의 적용에 있어 문제가 될 수 있는 부분이 있다면, JavaScript를 다룰 줄 알아야 한다는 것. ARIA가 Rich Internet
Application에 대한 기술이므로 어쩌면 당연한 부분이다.

### 탭 UI의 기본 동작

- 탭 UI가 초기화 되면, 한 개 탭 패널을 노출시키고 이 탭 패널과 연관된 탭을 활성화 되었다고 표시
- 사용자가 다른 탭을 선택하면, 선택된 탭을 활성화 표시하고, 이전 탭 패널을 숨기고 활성화 된 탭과 연관된 탭 패널을 노출

### 탭 UI의 키보드 인터랙션

- <kbd>Tab</kbd>: 탭 목록[^2] 내부로 초점이 이동할 때, 활성화 되어 있는 탭으로 초점 이동. 탭 목록이 초점을 포함하고 있을 경우,
탭 패널이나 탭 패널 내부의 첫 번째 초점을 얻을 수 있는 요소로 초점 이동
- 초점이 탭 요소에 있을 때
  + <kbd>Left Arrow</kbd>: 이전 탭으로 초점 이동. 초점이 첫 번째 요소에 있었다면 마지막 탭으로 초점 이동.
  + <kbd>Right Arrow</kbd>: 다음 탭으로 초점 이동. 초점이 마지막 요소에 있었다면 첫 번째 탭으로 초점 이동.
- 탭 목록 내부에 초점이 있을 때
  + <kbd>Space</kbd>, <kbd>Enter</kbd>: 탭 활성화
  + <kbd>Home</kbd>: (선택적 제공) 첫 번째 탭으로 초점 이동
  + <kbd>End</kbd>: (선택적 제공) 마지막 탭으로 초점 이동
  + <kbd>Shift</kbd> + <kbd>F10</kbd>: 탭이 연관된 팝업 메뉴를 가질 경우 메뉴 노출
  + <kbd>Delete</kbd>: (선택적 제공) 탭이 삭제 가능하다면, 탭과 연관된 탭 패널을 모두 삭제하고, 나머지 탭이 존재한다면
  삭제된 다음 탭으로 초점을 이동시키고 활성화.

대다수 탭 UI를 만든다고 하면 마우스로 클릭하는 경우만 생각을 하고 만드는 경우가 허다한데, 실제로 키보드 인터랙션이 제공되지 않으면
포인팅 디바이스를 사용할 수 없는 사용자의 경우에는 전혀 사용할 수 없는 UI를 만드는 셈이 된다.

따라서, 탭 목록에서 마우스의 이동에 대응하는 방향키, 탭을 선택하는 행위로서 마우스 클릭에 대응하는 <kbd>Space</kbd>와
<kbd>Enter</kbd>는 최소한으로 제공되어야 한다.

혹자는 첫 번째 탭에서 두 번째 탭으로 이동하는 것에 <kbd>Tab</kbd>을 사용하면 되지 굳이 방향키로 대응해야 하느냐 한다면, 방향키로
하는 것이 더 적절하다 할 수 있다.

이유는, 탭 콘텐츠를 이용하는 사람의 논리적 흐름인데 첫 번째 탭의 것을 보고 싶은 사람은 다른 탭 메뉴를 확인 할 것 없이 바로 탭 패널로
시선을 이동시키면 된다. 또, 첫 번째 탭 레이블을 인식하고 나니 관심이 없는 콘텐츠라서 다음 탭이 무엇이 있는지를 확인하기 원하는 사람도
있을 수 있다. 이 경우라면 첫 번째 탭 이후 다음 탭으로 시선이 이동시키게 된다.

이를 <kbd>Tab</kbd> 키를 이용한 초점 이동만을 사용하게 되면 둘 중 하나를 포기해야 하는 상황이 되기 때문에, 탭 탐색과 탭 패널로의
탐색을 모두 만족시켜주는 키보드 인터랙션이 필요한 것이다.

### WAI-ARIA Roles, Properties, States

- 탭 목록에 해당하는 요소(element)에 tablist role 부여
  + AT[^3]가 "탭 목록"을 인식.
- 탭에 해당하는 요소(element)에 tab role 부여
  + AT가 해당 탭에 접근 시 "탭" 콘텐츠임을 알려주며, 인식 된 tablist role을 통해 총 몇 개의 탭 중 현재 몇 번째 탭을 탐색
  중인지를 알려줌. ex) "bar 탭 2/3"
- 탭에 대한 콘텐츠 패널에 해당하는 요소(element)에 tabpanel role 부여
  + AT가 해당 패널에 접근 시, "탭 패널" 콘텐츠임을 알려줌.[^4]
- 각 탭에 탭과 연관된 탭 패널을 참조하는 aria-controls property 부여
  + AT가 해당 탭 접근 시, 연관된 탭 패널 정보를 인식. [^5]
- 활성화 된 탭에 aria-selected state를 부여하고 true 값 설정, 나머지 탭들에는 false로 설정된 aria-selected state를 부여
  + AT가 aria-selected 상태에 따라 선택된 상태인지 미선택된 상태인지를 인식하고 사용자에게 알려줌. ex) "foo 탭 1/3 선택됨"
- 각 탭 패널에 이 패널과 연관된 탭 요소를 참조하는 aria-labelledby property 부여
  + AT가 접근한 "탭 패널" 콘텐츠의 label을 참조 인식하여 어떤 탭의 패널인지 사용자에게 알려줌. ex) "foo 속성 페이지"

## How to Make

그럼 이제 어떻게 만들어 가는지 과정을 차근차근 진행해보자.

### 마크업 구조 작성

마크업 구조를 잡는데에는 여러 가지 방법이 있다. 아래는 여러 방식 중의 한 가지일 뿐이니 마치 이렇게 하는 것만이 가능한 방법으로 오해하지
말자. 맹점은 ARIA 적용에 있다.

```html
<ul class="tablist">
  <li class="tab">foo</li>
  <li class="tab">bar</li>
  <li class="tab">baz</li>
</ul>
<div class="tabpanel">
  ...
</div>
<div class="tabpanel">
  ...
</div>
<div class="tabpanel">
  ...
</div>
```

일단 탭 목록에 해당하는 `ul.tablist`, 탭으로 사용되는 `li.tab`, 탭 패널에 해당하는 `div.tabpanel`을 마크업 해둔다.

### ARIA roles 적용

탭 목록, 탭, 탭 패널에 각각 `tablist`, `tab`, `tabpanel`을 적용한다.

```html
<ul class="tablist" role="tablist">
  <li class="tab" role="tab">boo</li>
  <li class="tab" role="tab">far</li>
  <li class="tab" role="tab">baz</li>
</ul>
<div class="tabpanel" role="tabpanel">
  ...
</div>
<div class="tabpanel" role="tabpanel">
  ...
</div>
<div class="tabpanel" role="tabpanel">
  ...
</div>
```

### ARIA Properties 적용

1. 탭에 연관된 탭 패널을 참조하는 aria-controls property 부여하기 위해 탭 패널에 id 값을 추가로 작성하여 연결
  ```html
  <ul class="tablist" role="tablist">
    <li class="tab" role="tab" aria-controls="tab-panel1">boo</li>
    <li class="tab" role="tab" aria-controls="tab-panel2">far</li>
    <li class="tab" role="tab" aria-controls="tab-panel3">baz</li>
  </ul>
  <div id="tab-panel1" class="tabpanel" role="tabpanel">
    ...
  </div>
  <div id="tab-panel2" class="tabpanel" role="tabpanel">
    ...
  </div>
  <div id="tab-panel3" class="tabpanel" role="tabpanel">
    ...
  </div>
  ```
2. 각 탭 패널에 이 패널과 연관된 탭 요소를 참조하는 aria-labelledby property 부여하기 위해 탭에 id 값을 추가로 작성하여 연결
  ```html
  <ul class="tablist" role="tablist">
    <li id="tab1" class="tab" role="tab" aria-controls="tab-panel1">boo</li>
    <li id="tab2" class="tab" role="tab" aria-controls="tab-panel2">far</li>
    <li id="tab3" class="tab" role="tab" aria-controls="tab-panel3">baz</li>
  </ul>
  <div id="tab-panel1" class="tabpanel" role="tabpanel" aria-labelledby="tab1">
    ...
  </div>
  <div id="tab-panel2" class="tabpanel" role="tabpanel" aria-labelledby="tab2">
    ...
  </div>
  <div id="tab-panel3" class="tabpanel" role="tabpanel" aria-labelledby="tab3">
    ...
  </div>
  ```

앞서 [WAI-ARIA Roles, Properties, States](#WAI-ARIA-Roles-Properties-States)에 기술 된 내용 중 State는
마크업에 포함시켜두지 않았는데, 이는 State의 값은 JavaScript에 의해 변경되어야 하기 때문에 탭 UI가 초기화 될 때 JavaScript에
의해 설정되게 하는 것이 더 적절할 것이기 때문이다.

### JavaScript 작성

JavaScript 작성에 대해서는 ARIA 적용과 키보드 인터랙션을 반영하는 방법을 설명하기 위해 플러그인이나 라이브러리 형태로 작성하지 않고,
절차적으로만 작성할 것이다. (실제 프로덕트에 사용될 코드는 이렇게 짜여지지 않는다는 말이다.) 또한, 쉬운 이해를 돕기 위해 jQuery로
작성한다. (jQuery가 좋기 때문이 아니라 jQuery의 메서드들 자체가 직관적으로 되어 있어서다.)

1. 초기화 &mdash; 첫 번째 탭과 첫 번째 탭에 연관된 탭 패널 활성화

  ```javascript
  // 시각적으로 활성화 표기를 위한 클래스 추가
  $(".tab:first-of-type, .tabpanel:first-of-type")
    .addClass("active");

  // 의미적으로 활성화 표기를 위해 true로 설정된 aria-selected 속성 추가
  $(".tab:first-of-type")
    .attr("aria-selected", "true");
  ```

2. 초기화 &mdash; 탭 목록 접근시 첫 번째 요소(활성화 되어 있는 요소)가 초점을 얻을 수 있도록, 첫 번째 탭 패널로 이동시 패널이
초점을 얻을 수 있도록 `tabindex` 속성(attribute) 추가

  ```javascript|data-line="3"
  $(".tab:first-of-type, .tabpanel:first-of-type")
    .addClass("active")
    .attr("tabindex", "0");
  ```

3. 탭 초점 이동(방향키)

  ```javascript
  $(".tab").on("keydown", function(event){
    event = event || window.event;
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var keycode = event.keyCode || event.which;

    switch(keycode){
      case 37:  // left arrow
        if(this.previousElementSibling){
          $(this)
            .attr("tabindex", "-1")
          .prev()
            .attr("tabindex", "0")
            .focus();
        }else{
          // 초점이 첫 번째 요소에 있었다면, 마지막 탭으로 초점 이동
          $(this)
            .attr("tabindex", "-1");
          $(".tab:last-of-type")
            .attr("tabindex", "0")
            .focus();
        }
        break;
      case 39:  // right arrow
        if(this.nextElementSibling){
          $(this)
            .attr("tabindex", "-1")
          .next()
            .attr("tabindex", "0")
            .focus();
        }else{
          // 초점이 마지막 요소에 있었다면, 첫 번째 탭으로 초점 이동
          $(this)
            .attr("tabindex", "-1");
          $(".tab:first-of-type")
            .attr("tabindex", "0")
            .focus();
        }
        break;
    }
  });
  ```

4. 탭 활성화 (Space / Enter 키)

  ```javascript
  $(".tab").on("keydown", function(event){
    ...

    switch(keycode){
      ...
      case 32:    // Space
      case 13:    // Enter
        // 선택된 탭 활성화
        $(this)
          .addClass("active")
          .attr("aria-selected", "true")
        // 기존 탭 비활성화
        .siblings()
          .removeClass("active")
          .attr("aria-selected", "false");
        // 연관된 탭 패널 활성화
        $("#" + $(this).attr("aria-controls"))
          .attr("tabindex", "0")
          .addClass("active")
        // 기존 탭 패널 비활성화
        .siblings(".tabpanel")
          .attr("tabindex", "-1")
          .removeClass("active");
        break;
    }
  });
  ```

5. 탭 패널 이동 &mdash; 활성화 된 탭에서 <kbd>Tab</kbd>키 누를 경우 연관된 탭 패널로 이동

  ```javascript
  $(".tablist").on("keydown", ".active", function(event){
    event = event || window.event;
    var keycode = event.keyCode || event.which;

    // tab 키 눌렀을 때 (shift + tab은 제외)
    if(!event.shiftKey && keycode === 9){
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      $("#" + $(this).attr("aria-controls"))
        .attr("tabindex", "0")
        .addClass("active")
        .focus()
      .siblings(".tabpanel")
        .attr("tabindex", "-1")
        .removeClass("active");
    }
  });
  ```

6. 마우스 클릭에 대한 이벤트 핸들링

  ```javascript
  $(".tab").on("mousedown", function(){
    // 선택된 탭 활성화
    $(this)
      .addClass("active")
      .attr({
        "tabindex": "0",
        "aria-selected": "true"
      })
      .focus()
    // 기존 탭 비활성화
    .siblings()
      .removeClass("active")
      .attr({
        "tabindex": "-1",
        "aria-selected": "false"
      });
    // 연관된 탭 패널 활성화
    $("#" + $(this).attr("aria-controls"))
      .attr("tabindex", "0")
      .addClass("active")
    // 기존 탭 패널 비활성화
    .siblings(".tabpanel")
      .attr("tabindex", "-1")
      .removeClass("active");
  });
  ```

이렇게 하면 가장 기본적인 탭 기능에 대해서는 적용이 끝난다.

이후 NVDA 등의 스크린리더로 접근해보면 ARIA를 적용하기 이전과 적용 후의 접근되는 내용은 사뭇 차이가 크다.
단순히 순서 없는 목록 링크의 나열과 텍스트들만 인식하는 것과 탭이라고 명시된 콘텐츠를 인식하는 것은 당연히 차이가 클 수 밖에 없다.

이미 적용 가능한 기술이 있고 최소한의 기능만을 제공하는데에는 그다지 어려움이 없음에도 불구하고 탭이라고 명시된 콘텐츠가 아니라 목록과
텍스트의 나열을 제공하는 것은 어찌보면 생산자로서 매우 게으른 행위일 수도 있다고 생각한다. "accessible tab ui"라는 키워드로
검색해서 지난 1년간의 자료만 찾아도 WAI-ARIA를 소개한 사례는 이제 너무 쉽게 찾아볼 수 있다.

JavaScript를 잘 못해서 어려울 수는 있다. 하지만, 앞선 것들을 처리하자면 결국 Markup을 다루는 이가 JavaScript를 다룰 줄은
알아야한다. JavaScript는 (Server-Side) 개발자가 해야 하는 것이다라는 되도 않는 이야기는 집어 넣으시라. JavaScript를
Client 담당자가 해야 할 이유는 차고 넘친다. 가장 기저에 존재하는 어려운건 하기 싫다는 이유는 JavaScript는 개발자가 해야 하는
것이다라는 이유가 결코 될 수 없다.

[^1]: 접근 가능한 리치 인터넷 어플리케이션(Accessible Rich Internet Application). [WAI-ARIA](https://www.w3.org/TR/wai-aria) 참고
[^2]: 탭 요소(element)들을 포함하고 있는 컨테이너
[^3]: 보조 기술(Assistive Technology). 본 포스팅에서는 주로 screen reader로 사용
[^4]: Screen Reader와 Web Browser의 조합에 따라 낭독 여부나 낭독 이름에 차이가 있음. FireFox + NVDA 환경에서는 "속성
페이지"로 낭독. Chrome + NVDA에서는 낭독하지 않음. (글을 쓰는 시점에서 NVDA는 2018.1.1 버전)
[^5]: JAWS + NVDA에서는 해당 속성을 통해 단축키로 연관된 탭 패널로 바로 이동하는 기능을 제공하지만, 그 외 Screen Reader의
경우는 지원하지 않는 것으로 알려져 있음. ([aria-controls is poop](http://www.heydonworks.com/article/aria-controls-is-poop) 참고)