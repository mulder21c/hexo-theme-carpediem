---
title: pass function as props in vue
tags:
  - vue
  - props
  - pass function
categories:
  - 개발노트
  - Front-End
seo:
  image: /upload/2021/props-function-vue.jpg
  description: |
    props로 이벤트 핸들러를 내려주고, 가장 기저에 있는 atom에 해당하는 컴포넌트가 이
    핸들러를 실행시키기만 하면 어떨까 하는 생각에 prop로 함수를 내려주는 방식을 생각해보게 됐다.
hero: /upload/2021/props-function-vue.jpg
thumbnail: /upload/2021/thumbs/props-function-vue.jpg
date: 2021-01-24 11:16:03
style:
---

## Event handling and Atomic Design System

Atomic Design System을 컴포넌트 설계 방법론으로 가져가면서, 각 컴포넌트에 독립적으로
고립(?)된 데이터 구조를 만들게 되면서 (이게 맞는 방식인지는 잘 모르겠지만) 불편함이 점점
발생되었던 것 중 하나가 유저 인터랙션에 의해 발생되는 데이터 변경을 위해 쌓여진 컴포넌트
구조를 따라 계속 이벤트를 전달하고 이벤트 리스너를 통해 처리하는 방식이었다.

예를 들자면

![유저 인터랙션으로 하위 컴포넌트로부터 상위 컴포넌트로의 이벤트 발생 과정](/upload/2021/event-flow-from-atom-to-page.svg)

이런 흐름 말이다.

Vue 공식 문서도 그렇고, 지금까지 보아온 대다수의 강의에서도 유저 인터랙션에 대한 데이터를
처리할 때 해당 데이터가 상위 컴포넌트에 존재할 경우, `$emit`을 이용하여 payload와 함께
하위 컴포넌트로부터 상위 컴포넌트로 차례로 올리고, 상위 컴포넌트에서 `v-on`으로 처리하는
방식을 사용하도록 안내하는 듯 하다.

Atomic Design Sytem을 적용하기 전에는 이러한 고민이 없었는데, 적용 이후로는 atom으로부터
실제 데이터가 바인딩 되는 page까지 5개 단계(?)를 거치게 되니 하위 컴포넌트에서 발생한
이벤트와 데이터를 다시 상위 컴포넌트로 by-pass 하기 위한 이벤트 처리가 뭐랄까... 조금
거슬린다고 할까?
심지어 Vue 개발자 도구로 데이터 흐름을 확인하려고 하면 한 번의 인터랙션에 여러 개의 emit이
로그로 출력되니 정신이 사납기까지 한 느낌이다 = _=a

그래서 `props`로 이벤트 핸들러를 내려주고, 가장 기저에 있는 atom에 해당하는 컴포넌트가 이
핸들러를 실행시키기만 하면 어떨까 하는 생각에 `prop`로 함수를 내려주는 방식을 생각해보게 됐다.

## Is it an anti-pattern?

일단 생각을 해 봤으니 이게 가한 것은 맞는지 확인 해 볼 필요가 있었다. (처음 생각해 본
방법이고 Vue 관련 문서나 강의에서도 한 번도 이런 케이스를 본 적이 없으니까..)

구글링 결과 공교롭게도(?) 가장 먼저 눈에 띈 내용은 이 방식이 안티 패턴이라는 내용이었다.
(혹 관련 내용이 궁금하다면 [How to Pass a Function as a Prop in Vue]([https://michaelnthiessen.com/pass-function-as-prop/](https://michaelnthiessen.com/pass-function-as-prop/))를
읽어보시길... 아, 중간에 구독하라고 전체 팝업창이 뜨기는 하는데 개발자라면 뭐... 다 쉽게
걷어내... 쿨럭... )

하지만 왜 인지 모르겠으나... 해당 글에서는 안티 패턴임을 설명하는데 하위 컴포넌트의 mounted
훅에서 props로 받은 함수를 실행하는 코드를 보여주고 있었다.
무튼 그러면서 잘못된 것은 아니지만, Vue의 컨셉에 맞게 이벤트를 활용하거나 슬롯을 사용하라는
결론을 내주는게 영...

또 다른 아티클 들에서는 단순하게 props로 함수를 내리는게 가능하다 라는 짤막한 소개 정도가
있었다.

하여 안티 패턴이라 소개하는 글을 잠시 무시하기로 하고(?) props로 함수를 내리는 방식을
사용해봤다.
아, 안티 패턴이라 소개하는 글을 무시하기로 한 것은 안티 패턴을 굳이 사용하겠다는 것이 아니라,
안티 패턴인 이유에 대한 명확한 근거를 찾을 수 없어서다. 차후에라도 이것이 안티 패턴이라는
명확한 근거를 찾게 된다면 당연히 과감히 버릴거다.

## Try it

```jsx
<template>
  <SignUpTemplate :handle-sign-up="signUp" />
</template>
<script>
export default {
  ...
  methods: {
    ...
    signUp({ email, password }) {
      users
        .postSignUp({ email, password })
        .then(...)
        .catch(...)
    }
  }
};
</script>
```

Page에서 이렇게 `signUp` 함수를 props로 내려주고

```jsx
<template>
  ...
  <SignUpForm :handle-submit="handleSignUp" />
  ...
</template>

<script>
export default {
  ...
  props: {
    ...
    handleSignUp: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  ...
};
</script>
```

템플릿에서 props로 받은 함수를 다시 하위 컴포넌트로 내려주고,

```jsx
<template>
  <form-container>
    ...
    <DefaultButton
      @click.native.prevent="handleClickSubmit"
    />
    ...
  </form-container>
</template>

<script>
import DefaultButton from "@atoms/Button/Default";
export default {
  components: {
  props: {
    handleSubmit: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  methods: {
    handleClickSubmit() {
      const { handleSubmit, email, password, passwordConfirm } = this;
      ...
      handleSubmit && handleSubmit({ email, password });
    }
  }
};
</script>
```

유저 인터랙션이 발생하는 하위 컴포넌트에서 해당 함수를 전달받아 실행하게 했다.
적용 결과는 당연히(?) 원하는 동작을 올바르게 수행해주었다.

이것보다는 modal  창을 포함하는 organism 컴포넌트에서 modal 창에 대한 제어와 modal 내부에
slot으로 끼워진 컴포넌트에 적용되는 부분이 이 방식을 더 잘 설명할 수 있을 것 같지만 너무
많은 코드가 삽입 되어야 해서 포스팅에는 간단한 위 코드로 적었다.

사실 event emit 방식으로도 충분히 대체도 가능하고 그것이 난이도나 복잡도가 더 높지는 않은
것 같기는 하다. 하지만, 뭐랄까 이 방식이 좀 더 dry한 느낌이 든달까? (기분탓이려나?)

무엇보다 개발자 도구에 여러 번에 걸친 이벤트 발생 로그를 보지 않아도 되니 한결 눈이 가벼워졌다.