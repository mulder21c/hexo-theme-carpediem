---
root: false
targets:
  - '*'
description: Atoms/Molecules용 Storybook 스토리 작성 규칙 (에이전트 자동 생성용)
globs:
  - '**/*.stories.tsx'
cursor:
  alwaysApply: false
  description: Atoms/Molecules용 Storybook 스토리 작성 규칙 (에이전트 자동 생성용)
  globs:
    - '**/*.stories.tsx'
---
# Storybook Stories Rules

## 근거 문서
- 기대치: `docs/agents/testing-and-storybook.md` (시각 컴포넌트용 스토리, `play`는 스모크·회귀 보조, 유닛 테스트 대체 아님)

## 파일 위치·이름

- 구현과 같은 폴더에 두고 `index.stories.tsx` 또는 구현 파일명 기준 `Base.stories.tsx`, `IconButton.stories.tsx`처럼 co-locate.
- 확장자는 `*.stories.tsx`.

## `meta` 구성

- `component`: 스토리 주제가 되는 default export.
- `args`: 공통 기본값 (대표 size, label, 자주 쓰는 props).
- `argTypes`: `table.category`로 그룹화. 이 저장소에서 쓰는 카테고리는 **Appearance**, **Behavior**, **Content**, **State**, **Layout**, **HTML Attributes**. 유한 문자열 union은 `control: "select"`, 필요 시 `options` 배열.
- `parameters.docs.description.component`: `dedent`로 마크다운. 관례적 섹션: **Key Features**, **Behavior**, **Interactions**(해당 시), **Accessibility**, **Customization**, **Notes**. HTML 태그·prop 이름은 백틱으로 감싸기.
- `parameters.layout`: 필요 시만 설정 (예: Tooltip은 `fullscreen`, Radio는 `padded`). 대부분은 preview 기본에 맡김.
- `decorators`: flex 래퍼, `maxWidth`/`width`/`padding` 등 **레이아웃만** 인라인 `style`로 조정. `HexoProvider` 등 글로벌 설정은 `.storybook/preview.tsx`에 있으므로 스토리에서 중복하지 않음.

## 개별 스토리

- 최소 **하나의 대표 스토리** (`Default` 또는 상태를 드러내는 이름 예: `DefaultOff`, `Options`).
- export 이름은 **PascalCase**.
- 여러 인스턴스·복잡한 `children`·고정된 매트릭스는 `render` 사용; 비교 스토리에서는 `<Subject {...args} prop="a" />`처럼 **args spread** 후 변하는 prop만 덮어쓰기.
- 스토리가 특정 prop을 고정하면 `parameters.controls.exclude`로 해당 control 숨김.
- 스토리 단위 설명은 `parameters.docs.description.story` (문자열 또는 `dedent`).
- 변형 나열·가이드 성격 스토리는 기존 패턴에 맞춰 `parameters.viewMode: "docs"`를 **같은 파일 안 다른 스토리와 일관되게** 사용 (Button 계열의 Variants/Colors/Sizes 등).
- Molecule에서 `children`/`options` 등을 스토리북 control과 맞출 때 `argTypes`/`parameters.controls.exclude`를 스토리 단위로 조정해도 됨 (RadioGroup `WithChildren` 참고).

## `play` (상호작용·타이밍)

- 지연·포커스·호버·키보드 등 **사용자 주도 동작**이 중요하면 `play` 추가. `docs/agents/testing-and-storybook.md` 기준 스모크·회귀 용도.
- `within`, `expect`, `waitFor`, `userEvent`는 **`storybook/test`**에서 import. 단계 구분은 `step`.
- `waitFor`의 `timeout`은 컴포넌트 모듈의 **실제 지연 상수**를 import해 사용 (예: `*.ui.ts`의 `SHOW_DELAY`, `HIDE_DELAY`, `TRANSITION_DURATION`). 임의 ms 하드코딩 금지.
- 여러 오버레이를 `id`로 잡아야 할 때만 `@testing-library/dom`의 `queryByAttribute` 등 보조 사용.
- `window` / `document` / 전역 싱글톤(예: tooltip manager)은 **스토리의 `render` 또는 `play` 안**에만 두고, 테마 SSR 본문에는 넣지 않음. 정리는 기존 Tooltip·IconButton 스토리처럼 `destroy` 및 effect cleanup.
