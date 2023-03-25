# Amorfati

Amorfati는 완전히 커스텀 할 수 있는 컴포넌트 기반의 Hexo 테마입니다.

[영어 ![](https://flagcdn.com/w20/us.webp)](../../README.md)

## 요구사항

- Node v16.16.0+
- Hexo v6.3.0

## 지원 브라우저

- 최신 브라우저
- IE 미지원

## 특징

<details>
  <summary> <b>컴포넌트 기반</b> </summary>

아토믹 디자인 시스템에서 영감을 받아, pug mixins를 이용하여 컴포넌트 기반으로
제작되었습니다.

이 테마에 사용 된 모든 컴포넌트는 `./components/`에 있습니다.  
각 컴포넌트는 `pug`, `scss` 및 UI 기능을 위해 선택적으로 `js`로 구성됩니다.

BEM CSS 방법론에 따라, 각 컴포넌트는 캐스캐이딩 문제를 완전히 방지하고 자체 스타일을 유지할
수 있습니다.

</details>

<details>
  <summary> <b>접근성</b> </summary>

가능한 WCAG 2.1 AA 레벨의 많은 항목을 준수하도록 노력하였습니다.   
Axe 도구를 이용하여 WCAG에 대한 적합성이 검사되었습니다.

</details>

<details>
  <summary> <b>자동 라이트/다크 모드 전환</b> </summary>

시스템 설정에 따른 자동 라이드/다크 모드를 지원합니다.  
물론 특정 모드로 고정도 가능합니다.

</details>

<details>
  <summary> <b>SEO 친화적</b> </summary>

- JSON-LD를 지원합니다.
- link relation types을 지원합니다.
- 서치 콘솔 등록을 위한 site verification meta 요소를 지원합니다.

</details>

<details>
  <summary> <b>포트스별 스타일</b> </summary>

포스트별 스타일을 지원합니다.  
SCSS로 스타일을 작성할 수 있고 사전 정의된 SCSS function 및 mixin을 사용할 수 있습니다.

</details>

<details>
  <summary> <b>댓글</b> </summary>

다양한 댓글 플랫폼을 지원합니다.

- commento
- disqus
- giscus
- livere
- remark
- utterance

특정 포스트에서만 댓글을 사용하지 않기 원한다면, front-matter에서 댓글을 비활성화 할 수 
있습니다.

</details>

<details>
  <summary> <b>외부 링크</b> </summary>

내비게이션에 외부 링크를 지원합니다.

</details>

<details>
  <summary> <b>검색</b> </summary>

alogila 검색을 지원합니다.

[hexo-algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch) 
설치가 필요합니다.  
search layout을 사용하는 빈 페이지를 생성하는 것만으로 검색 페이지를 활성화 할 수 있습니다.

</details>

<details>
  <summary> <b>다국어</b>  </summary>

`languages` 구성을 기반으로 i18n을 지원합니다.
현재 지원되는 언어는 다음과 같습니다.

- 영어
- 한국어

</details>

<details>
  <summary> <b>쉬운 커스터마이징</b> </summary>

컴포넌트의 파일을 수정하기만 하면, 이 컴포넌트를 사용하는 모든 곳에 자동으로 반영됩니다.

컬러, 글자, 테두리 같은 많은 스타일 속성들이 `source/css/modules/_root.scss`의 CSS 변수 
및 `source/css/modules/_variables.scss`의 SCSS 변수로 관리됩니다.

쉬운 디버깅을 위해 개발 모드에서 js 및 css에 대한 소스맵이 제공됩니다.

</details>

<details>
  <summary> <b>문법 강조</b> </summary>

  Prism.js 만 지원됩니다.

</details>

## 설치

먼저, 이 저장소를 클론합니다.

```bash
$ cd your/hexo/directory
$ git clone -b master --single-branch --depth=1 https://github.com/mulder21c/hexo-theme-amorfati-v2.git themes/amorfati
```

이후, 의존성 패키지를 설치합니다.

```bash
$ cd themes/amorfati
$ npm install
```

## Front matter

기본 설정은 [hexo 문서](https://hexo.io/docs/front-matter)에서 찾을 수 있습니다.

다음은 기본 설정외 추가 항목들로 모두 선택사항입니다.

```yml
# 포스트 부제목
subtitle: This is example.

# og:description 및 meta description에 사용되는 포스트 설명
description: You can use this item to customize the og:description

# hero로 사용되는 이미지 경로 또는 URL
hero: https://my.imag.es/hero.webp

# 포스트 목록에 표시할 이미지 경로 또는 URL
# 지정되지 않으면 hero가 대신 표시됩니다.
thumbnail: https://my.imag.es/hero.thumb.webp

# 포트스 별 스타일
# SCSS나 CSS로 작성할 수 있고, 제공 된 (s)css 변수, 믹스인, 함수를 사용할 수 있습니다.
style:
```

## 커스터마이징

### 헬퍼

[Helper 문서](./docs/en/script/helpers.md) 참고

### 컴포넌트

[컴포넌트 문서](./docs/en/pug/index.md) 참고

### 스타일 (SCSS)

믹스인 및 함수에 대한 자세한 내용은 [SCSS 문서](./docs/en/scss/document.md) 참고

다음은 SCSS 파일에 대한 간략한 설명입니다.

|    경로   |       파일명       | 설명                      |
| :-------: | :----------------: | :------------------------ |
|           |    `index.css`     | 진입점                    |
| `helpers` | `_functions.scss`  | SCSS 함수                 |
| `helpers` |   `_mixins.scss`   | SCSS 믹스인               |
| `modules` | `_animations.scss` | 애니메이션 키프레임 선언  |
| `modules` |    `_base.scss`    | 기본 스타일시트           |
| `modules` |    `_root.scss`    | `:root`로 적용된 CSS 변수 |
| `modules` | `_typography.scss` | 글꼴 선언                 |
| `modules` | `_variables.scss`  | SCSS 변수 선언            |


## 스크린샷

### 모바일 <i style="font-size: 0.75em;font-weight:normal">＜ 768px</i>

<details open>
  <summary>메인 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/mobile-main.webp" width="320" style="margin-top:1rem;max-width:100%" >

</details>
<details>
  <summary>메뉴 - 닫힘 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/mobile-menu.webp" width="320" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>메뉴 - 모두 열림 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/mobile-menu-open.webp" width="320" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>아카이브 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/mobile-archive.webp" width="320" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>검색 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/mobile-search.webp" width="320" style="margin-top:1rem;max-width:100%" >
  
</details>

### 태블릿 <i style="font-size: 0.75em;font-weight:normal">＜ 1024px</i>

<details open>
  <summary>메인 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/tablet-main.webp" width="720" style="margin-top:1rem;max-width:100%" >

</details>
<details>
  <summary>메뉴 - 닫힘 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/tablet-menu.webp" width="720" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>메뉴 - 모두 열림 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/tablet-menu-open.webp" width="720" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>아카이브 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/tablet-archive.webp" width="720" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>검색 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/tablet-search.webp" width="720" style="margin-top:1rem;max-width:100%" >
  
</details>

### PC <i style="font-size: 0.75em;font-weight:normal">＜ 1280px</i>

<details open>
  <summary>메인 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/pc-main.webp" width="1200" style="margin-top:1rem;max-width:100%" >

</details>
<details>
  <summary>메뉴 - 닫힘 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/pc-menu.webp" width="1200" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>메뉴 - 모두 열림 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/pc-menu-open.webp" width="1200" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>아카이브 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/pc-archive.webp" width="1200" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>검색 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/pc-search.webp" width="1200" style="margin-top:1rem;max-width:100%" >
  
</details>

### 대화면 <i style="font-size: 0.75em;font-weight:normal">≥ 1280px</i>

<details open>
  <summary>메인 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/larger-main.webp" width="1336" style="margin-top:1rem;max-width:100%" >

</details>
<details>
  <summary>메뉴 - 닫힘 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/larger-menu.webp" width="1336" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>메뉴 - 모두 열림 상태</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/larger-menu-open.webp" width="1336" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>아카이브 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/larger-archive.webp" width="1336" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>검색 페이지</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/larger-search.webp" width="1336" style="margin-top:1rem;max-width:100%" >
  
</details>
<details>
  <summary>스크롤바 (모든 스크린사이즈에 동일)</summary>
  
  <img src="https://cdn.mulder21c.io/images/amorfati/screenshots/with-scroll.webp" width="1336" style="margin-top:1rem;max-width:100%" >
  
</details>
