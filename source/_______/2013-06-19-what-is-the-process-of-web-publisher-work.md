---
title: 웹 퍼블리셔의 업무 프로세스 어떻게 될까?
tags:
  - 웹 퍼블리셔
  - 업무 프로세스
  - 누가 쉽다고 했냐
_categories:
  - 생각노트
  - in occupation
date: 2013-06-19 09:42:42
hero: /upload/2013/html-code.gif
seo:
  description: |
    하나의 페이지, 사이트를 만들기 위해 퍼블리셔는 저 많은 프로세스를 거쳐야 하고, 많은 지식들이 동반되어져야 하며,
    많은 고민을 해야 하는 직업군이다. 제발, 금나와라 뚝딱! 식으로 하면 나오는줄로 알지 말고, 이 업무에 대해 어느
    정도 이해는 하고 업무 지시를 주기 바란다.
---



퍼블리셔로 일하다보면 퍼블리셔의 업무를 무슨 도깨비 방망이인줄 알고 페이지 나와라 뚝딱 하면 "짠~!!"
하고 바로 만들어 낼 줄로 아는, 퍼블리셔의 업무를 전혀 이해하지 못하는 타 분야인들이 너무 많다. <br>
그래서!!!!!! 퍼블리셔가 얼마나 머리를 많이 쓰는 지식 노동인지, 한 페이지를 만들기 위해 얼마나 많은
프로세스를 타는지 알리고자(?) 한 번 퍼블리셔의 업무 프로세스를 정리해봤다.

참고로 프로세스 중 JavaScript 사용 불가 환경에 대한 부분은 내 개인적인 작업 스타일(?)이다. <br>
개인적으로 JavaScript 에 대해서는 점진적 향상, 우아한 낮춤을 지향하고 있기 때문에
JavaScript가 지원되지 않는 부분까지 고려해서 하는 편이다.

{% raw %}
<div class="horizon-overflow">
  <table>
    <caption>웹 퍼블리셔 업무 프로세스</caption>
    <colgroup>
      <col style="width:20%">
      <col style="width:40%">
      <col style="width:40%">
    </colgroup>
    <thead>
      <tr>
        <th scope="col">작업 단계</th>
        <th scope="col">기술 구현 항목</th>
        <th scope="col">구현 항목별 코멘트</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="rowgroup" rowspan="2">스토리보드 검토</th>
        <td>UI/UX 기술 구현 가능 여부 확인</td>
        <td>구현 어려울 시 대체 기술 기획자 협의</td>
      </tr>
      <tr>
        <td>UI/UX 접근성 제고 여부 검토</td>
        <td>웹 컨텐츠 접근성 지침 2.0 을 기준으로 함<br>
          접근성 미제고시 UI/UX 접근성 제고 요청</td>
      </tr>
      <tr>
        <th scope="rowgroup" rowspan="2">웹 리소스 구조화</th>
        <td>리소스 폴더 구조 설계 및 생성</td>
        <td>개발자 협의</td>
      </tr>
      <tr>
        <td>파일 네이밍 가이드 수립</td>
        <td></td>
      </tr>
      <tr>
        <th scope="rowgroup" rowspan="5">시안 검토</th>
        <td>컨텐츠 분석 및 정보의 논리적 선형화</td>
        <td></td>
      </tr>
      <tr>
        <td>디자인에 따라 구역 분할</td>
        <td></td>
      </tr>
      <tr>
        <td>논리구조에 따른 HTML 문서 구조화</td>
        <td></td>
      </tr>
      <tr>
        <td>공통 CSS, JS 가이드 작성</td>
        <td></td>
      </tr>
      <tr>
        <td>디자인적 접근성 제고 여부 검토</td>
        <td>웹 컨텐츠 접근성 지침 2.0 을 기준으로 함<br>
          접근성 미제고시 시안 수정 요청</td>
      </tr>
      <tr>
        <th scope="rowgroup" rowspan="10">퍼블리싱</th>
        <td>CSS 가이드 수립, <br>
          문서내 ID / Class 구조화 및 정리</td>
        <td></td>
      </tr>
      <tr>
        <td>문서 구조에    따라<br>
          시안 PSD 슬라이싱 및 이미지 분할 저장</td>
        <td></td>
      </tr>
      <tr>
        <td>웹 표준,    웹접근성 지침을 기준으로<br>
          JavaScript 사용불가 환경 마크업 진행</td>
        <td></td>
      </tr>
      <tr>
        <td>마크업 유효성 검사</td>
        <td>W3C Markup Validator 이용</td>
      </tr>
      <tr>
        <td>CSS 작성</td>
        <td></td>
      </tr>
      <tr>
        <td>브라우저 렌더링 화면과 시안 비교</td>
        <td></td>
      </tr>
      <tr>
        <td>JavaScript 사용가능 환경 마크업 / CSS    추가 작성</td>
        <td></td>
      </tr>
      <tr>
        <td>JavaScript 개발</td>
        <td></td>
      </tr>
      <tr>
        <td>JavaScript 오류 테스트</td>
        <td>IE 8 ~ 10, Google Chrome, FireFox, Safari 등 Major 웹 브라우저 동작 테스트</td>
      </tr>
      <tr>
        <td>접근성 제고 검토</td>
        <td>웹 컨텐츠 접근성 지침 최신 버전 기준</td>
      </tr>
      <tr>
        <th scope="rowgroup" rowspan="2">개발 페이지 보수</th>
        <td>웹표준 검사</td>
        <td rowspan="2">일부 개발 코드 수정 요청</td>
      </tr>
      <tr>
        <td>접근성 제고 검사</td>
      </tr>
      <tr>
        <th scope="rowgroup" rowspan="4">산출물 최종 확인</th>
        <td>브라우저 테스트</td>
        <td>Major 웹 브라우저 렌더링 및 동작 테스트</td>
      </tr>
      <tr>
        <td>웹 표준 검사</td>
        <td>W3C Markup Validator 이용</td>
      </tr>
      <tr>
        <td>문서의 논리적/의미론적 구조 수동 검사</td>
        <td></td>
      </tr>
      <tr>
        <td>웹 접근성 최종 검토</td>
        <td>정량 / 정성 평가 진행</td>
      </tr>
    </tbody>
  </table>
</div>
{% endraw %}

족히 이 정도는 되지 않을까? <br>
퍼블리셔 산출물이 HTML, CSS , JS 정도로 빠지니까 단순해 보일거 같지만, 결코 단순한 작업이 아니라는
것 좀 알았으면 좋겠다.

하나의 페이지, 사이트를 만들기 위해 퍼블리셔는 저 많은 프로세스를 거쳐야 하고, 많은 지식들이
동반되어져야 하며, 많은 고민을 해야 하는 직업군이다. <br>
제발, 금나와라 뚝딱! 식으로 하면 나오는줄로 알지 말고, 이 업무에 대해 어느 정도 이해는 하고 업무
지시를 주기 바란다.