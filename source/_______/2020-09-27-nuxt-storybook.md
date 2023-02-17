---
title: Nuxt + Storybook 통합 하기
tags:
  - Nuxt
  - Storybook
  - Storybook에서 <nuxt-link> 사용
  - Storybook에서 <nuxt> 사용
  - Storybook Vuex
  - Storybook NuxtServerInit 사용
  - Storybook SCSS 오류
hero: /upload/2020/nuxt-storybook.png
seo:
  description: |
    Nuxt에 Storybook을 통합시키는데 생각보다 난관이 좀 있었다. 최신 버전의 Storybook에
    Nuxt를 통합할 때의 몇 가지 만날 수 있는 문제들과 해결 방법에 대해서 남겨본다.
  image:
    - /upload/2020/storybook-props-table.jpg
    - /upload/2020/nuxt-storybook.png
    - /upload/2020/storybook-addon-a11y.jpg
subtitle: Nuxt Storybook 통합 삽질기
_categories:
  - 개발노트
  - Front-End
thumbnail: /upload/2020/thumbs/nuxt-storybook.jpg
style: |
  .article__content{
    .figure {
      margin: 0;

      &__caption {
        margin-top: 1em;
        font-size: 0.85em;
        color: lighten(#000, 50%);
        text-align: center;

        @include respond-to('x-small') {
          max-width: 100%;
          font-size: 0.75em;
        }

        &::before {
          content:"[ ";
        }
        &::after {
          content:" ]";
        }
      }
    }
  }
date: 2020-09-27 16:02:45
---


최근 프로젝트를 진행하면서 본격적으로 Storybook을 도입하기로 해서 Nuxt에 Storybook을
통합하여 프로덕트를 만들어 갔다. (but... 뒤로 갈 수록 일정 부족으로 인해 story 작성을
포기한건 안 비밀... 쿨럭....)

Nuxt에 Storybook을 통합시키는데 생각보다 난관이 좀 있었다.
Storybook 자체 오류도 문제였지만, 트러블 슈팅을 위한 공식 자료를 찾기 어려웠을 뿐더러
개개인들이 블로그나 github issue에 달아둔 코멘트 등을 일일이 찾아서 올바르게(?) 동작하는
것을 솎아내야 하기에 제법 시간이 든 부분도 있었다.

사실 본래는 그 삽질들을 정리해서 포스팅 하려고 했는데,막상 포스팅 하려고 하니 Storybook이
major 버전 업데이트... 허허... 심지어 addon 자체가 변경되거나 지원이 애매했던 mdx 이슈도
해결되어서 최근 버전에 맞추어 내용을 변경하려다 보니 며칠을 더 소비했다.
무튼, 그리하여 최신 버전의 Storybook에 Nuxt를 통합할 때의 몇 가지 만날 수 있는 문제들과
해결 방법에 대해서 남겨본다.

## Storybook

이 포스팅을 찾은 건 이미 Storybook이 무언지 알고 내가 겪었던 동일한 문제를 해결하기 위해
검색하다 들어오는 경우가 더 많겠지만 그래도 일단 Storybook에 대한 이야기를 잠깐 언급해보면,
내가 Storybook을 써야겠다고 생각하게 된 건 2가지 이유에서였다.

하나는 문서화.
예전에는 (컴포넌트 단위 개발이 아니었을 때) JSDoc을 자바스크립트 코드에 대한 문서화 도구로
사용했었는데, Vue를 다루기 시작하면서 JSDoc이 애매한 감이 생기기 시작했다.
더구나 JSDoc은 개발자가 보고 이해할 문서이지 이걸 디자이너와 같이 보기에는 무리가 있는
문서도구였고, 컴포넌트의 렌더링 결과나 디자이너가 직접 값을 바꿔서 확인해보게 한다거나 하는
등을 하려고 하니 Storybook이 딱 적절하다 생각되었다.
나로서도 파일을 일일이 열어서 특정 컴포넌트에 어떤 타입의 값을
<code class="langague-javascript">props</code>로 내려줘야 하는지, 어느 값이 필수였고
아니었는지 등을 확인하려면 시간적 소모가 심하기 때문에 이를 일목 요연하게 볼 수 있는 것들이
필요했다.

{% raw %}
<figure class="figure">
  <img
    src="/upload/2020/storybook-props-table.jpg"
    alt="Button 컴포넌트에 대한 props, slot 설명이 표로 제공되고 각 props 데이터를 직접 수정해 볼 수 있다." >
  <figcaption class="figure__caption">
    Storybook을 통한 문서화 예
  </figcaption>
</figure>
{% endraw %}

또 한 가지는 접근성이었다.
컴포넌트 단위에서부터 접근성 이슈를 최소화 해두면 이후로 발생 가능한 접근성 이슈를 줄일 수
있지 않을까라는 생각이 들었고, 디자인 레벨에서 발생하는 접근성 이슈를 바로 확인 시켜줄 수 있지
않을까라는 생각에서였다.

참고로, Storybook 자체가 접근성 이슈를 확인시켜주는 것은 아니지만, addon에 Deque에서
만든 axe가 addon으로 제공되어 있기 때문에 addon을 추가하는 것만으로 접근성 이슈를 쉽게
확인 할 수 있다.

{% raw %}
<figure class="figure">
  <img
    src="/upload/2020/storybook-addon-a11y.jpg"
    alt="addon-a11y를 통해 접근성 검사를 실시간으로 해 볼 수 있다" >
  <figcaption class="figure__caption">
    Storybook addon-a11y 예
  </figcaption>
</figure>
{% endraw %}

글로는 위 내용이 와닿지 않는다면,
[Storybook Sample](https://mulder21c.github.io/storybook-nuxt-example/)을 만들어
두었으니 직접 둘러보시는 걸 추천한다. 백문이불여일견이다.

## Story는 어디에 둘 것인가?

Storybook을 처음 도입해 본 것이고, 주변에서 Atomic Design을 도입하면서 동시에
Storybook을 도입한 사례를 찾기가 쉽지 않아서 결국 또 맨 땅에 헤딩을 하면서 이 문제에
부딪혔다.

storybook을 설치해보면 stories라는 별도의 디렉토리를 생성되고 여기에 예제 파일들이 포함되어
있다. 처음에는 나도 여기에 스토리를 모으기 시작했다. 컴포넌트는 `component/atoms`,
`component/molecules`에 두면서 스토리는 `stories/atoms`, `stories/molecules`에 두는
식으로 말이다.

그런데 작업을 하다보니 이렇게 비효율적일 수가... ㅋㅋㅋ
Nuxt 작업을 해 보신 분들을 알리라... component 디렉토리를 펼쳐놓으면... 수 많은 디렉토리를
내려가야 's'로 시작하는 디렉토리를 만날 수 있다는 것을...

디렉토리를 찾아 왔다 갔다 하는 것도 스위칭 비용이 적지 않은데, 심지어 컴포넌트와 스토리가
멀찍이 떨어져 있으니 뭐 하나를 수정하려고 해도 쉽지 않았다.

결국 1개 컴포넌트 디렉토리에 vue single component 파일과, (s)css 파일과, mdx 파일 등
연관 된 파일들이 모두 같이 묶여 있는게 가장 손이 덜가더라...


## Nuxt/Storybook

사실 Nuxt에 Storybook을 통합시키는 가장 간단한 방법은 nuxt community에 등록(?) 되어
있는 nuxt/Storybook을 사용하는 방법이다.

다만, 이 방법을 사용할 경우 storybook 공식 문서에 기재된 걸 곧이 곧대로(?) 따라가면
계속 오류를 만날 수도 있다. 내가 그러했다... 하아...

Storybook 공식 기준으로는 controls, actions, backgrounds, docs, viewport, toobars
이 6가지 addon을 essentials라는 하나의 addon으로 통합시켜서 이를 사용하도록 권장하고
있는 반면 nuxt/storybook에서 essentials를 사용하면 계속 오류가 발생되어 동작하지 않는다.
내가 MDX 파일로 스토리를 작성해서인지는 모르겠지만, 오류 메세지 조차도 loader 문제로
출력하고 있기 때문에 addon-essentials가 문제일거라고는 생각조차 하기 어려웠다.
(이 문제 때문에 하루를 꼬박 버린걸 생각하면... 부들부들...)

나는 nuxt/storybook을 통한 통합과 한 땀 한 땀 직접 통합을 시도해 봤는데 지금까지의
대략적인 차이는 다음과 같다

|항목|nuxt/storybook 사용|한 땀 한 땀 직접 하기|
|:--:|:--:|:--:|
|addon-essentials| 미지원 | 가능 |
|&lt;nuxt-link> | 지원 | 가능 |
|&lt;nuxt>| 미지원 | 가능 |
|Vuex(module)| 지원 | 가능 |
|NuxtServerInit| 미지원 | 가능 |
|fetch| 지원 | 방법 못찾음 |
|asyncData| 미지원 | 방법 못찾음 |

더불어, Storybook을 static page로 빌드할 경우 nuxt/storybook을 사용했을 때
<code class="language-markup">&lt;nuxt /></code> 컴포넌트를 사용하기 위해 커스텀 한
것은 출력되지 않는 것도 확인 했다.

둘 중 어느 방법을 사용할지는 사용자의 선택일 듯 하다.
현재 나는 한 땀 한 땀 직접 하는 방법을 택하고 있기는 한데 nuxt/storybook이 미지원 되고
있는 것들을 빨리 해결해주면 넘어가고 싶기는 하다.
아직 storybook 코드에서 nuxt context에 접근하는 방법을 찾지 못해서 $axios라던가
위에서 언급된 asyncData, fetch 등이 호출되게 하는 방법을 모르겠다...

아래는 각 항목들을 해결한 방법들이다. 당연히 nuxt/storybook에서 미지원 되고 있는 것 중
직접 해결이 가능했던 것들은 동일하게 처리 가능하며, 처리 방법은 storybook을 별도로 설치해서
작성할 경우를 기준으로 한다. nuxt/storybook을 사용하는 경우는 적절히 변형해서 사용하면
된다.

## &lt;nuxt-link> 해결

이 문제는 `.storybook/preview.js` 파일에 다음의 코드를 삽입하여 해결할 수 있다.

```javascript
import Vue from 'vue';
import { action } from '@storybook/addon-actions';

Vue.component('nuxt-link', {
  props: [`to`],
  methods: {
    log() {
      action(`link target`)(this.to);
    },
  },
  template: '<a :href="to" @click.prevent="log()"><slot /></a>',
});
```

`preview.js` 파일에 삽입한 이유는 global하게 적용되도록 하기 위함인데 global이 아닌 특정
컴포넌트에만 적용되게 하고 싶다면 해당 컴포넌트의 스토리에 직접 적용하면 된다.

<code class="language-javascript">log</code> method를 둔 것은 해당 컴포넌트 동작이
링크 이동이기 때문에 클릭시 어디로 이동되는지를 로그를 통해 보여주기 위함이다.

nuxt/storybook에서는 href가 '#'으로 처리되어 있고, 동일하게 log를 찍어 주고 있다.

## &lt;nuxt /> 해결

<code class="language-markup">&lt;nuxt-link></code> 와 마찬가지로
<code class="language-markup">&lt;nuxt></code>는 Nuxt에만 존재하는 컴포넌트이기
때문에 Storybook에서는 처리하지 못해 오류가 발생된다.
더구나 <code class="language-markup">&lt;nuxt></code>는 라우터에 의해 결정되는
컴포넌트이기 때문에 <code class="language-markup">&lt;nuxt-link></code> 해결 방법과
같이 커스텀 컴포넌트를 만든다고 해결되지 않는다.

이 문제를 해결하기 위해서
['storybook-vue-router'](https://github.com/gvaldambrini/storybook-router)라는
별도의 모듈이 필요하다. 이 모듈은 storybook에서 router를 인식하는 컴포넌트를 사용할 수
있게 하는 데코레이터라고 소개 되어 있다.

물론 router를 인식하는 구성 요소일 뿐, nuxt를 지원하는 것이 아니기 때문에 이 모듈을
사용하는 것 외에, <code class="language-markup">&lt;nuxt></code>에 대한 커스텀
컴포넌트를 생성해야 한다.

일단 `.storybook/preview.js`에 커스텀 컴포넌트를 생성한다.

```js
Vue.component(`nuxt`, {
  template: `<router-view />`
});
```

이 컴포넌트를 <code class="language-jsx">&lt;router-view /></code>로 렌더링 시키면
이제 공은 storybook-vue-router 모듈로 넘어가 처리되게 된다.

<code class="language-markup">&lt;nuxt></code> 컴포넌트를
사용하는 컴포넌트에 해당 모듈을 불러들여 decorator로 등록한다.

```jsx|data-line="1,6-16"
import StoryRouter from 'storybook-vue-router';

<Meta
  title="Pages/Main"
  component={MainPage}
  decorators={[
    StoryRouter({}, {
      routes: [
        {
          path: `/`,
          component: MainPage,
          name: `index`
        }
      ]
    }),
  ]}
/>
```

이제 <code class="language-markup">&lt;nuxt></code>가 실제 페이지를 렌더링 하는 것을
확인 할 수 있다.

비슷한 방법으로 <code class="language-markup">&lt;nuxt-child></code> 역시 처리할
수 있으니 해당 모듈 문서를 참고해서 설정해보시길...

## Vuex 해결

nuxt를 사용하면 폴더 구조에 따라 자동으로 Vuex 모듈이 처리되는데 역시 Storybook에서는
이를 자동으로 받아들이지 않는다.

일단 Vuex의 처리는 Storybook에 수동으로 모듈을 등록해주면 된다.
`.storybook/store.js`를 생성하고 다음 예시를 참고하여 Vuex 모듈을 등록한다.

```javascript
import Vuex from 'vuex';
import main from '@/store';
// nuxt에 등록한 store import
import navigation from '@/store/navigation';

const store = new Vuex.Store({
  ...main,
  modules: {
    navigation: {
      namespaced: true,
      ...navigation,
    }
  }
});

export default store;
```

이후 Vuex에 접근해야 하는 컴포넌트의 스토리에 store를 추가해준다.

```jsx|data-line="2,3,8-11"
...
import store from '@/.storybook/store';
import { mapGetters } from 'vuex';
...
export const Template = (args) => {
  return {
    components: {MainPage},
    store,
    computed: {
      ...mapGetters('navigation', ['mainNavList', 'mainNavHeading'])
    },
    template: `<nuxt />`
  }
}

# Main Page

<Canvas>
  <Story name="MainPage">
    { Template.bind({}) }
  </Story>
</Canvas>
```

## NuxtServerInit 처리

Vuex를 등록하고 나서 또 하나의 난관(?)이 NuxtServerInit다.

NuxtServerInit은 Nuxt에서만 제공되는 액션 메서드이니 당연히(?) Storybook에서는 기본적으로
처리되지 않는다.

이를 처리하는 방법은 구글님께 여쭈어도 답을 찾지 못했는데, 의외의 곳에서 해결책을 찾았다.
앞서 등록한 store 객체에 nuxtServerInit 액션 메서드가 등록이 되어 있더라는!!!

하여 `.storybook/store.js`에 다음과 같이 코드를 추가해서 store를 불러들일 때 강제로
nuxtServerInit 메서드를 실행시키도록 처리해보았다.

```js
...

if (store._actions && store._actions.nuxtServerInit) {
  try {
    (async () => {
      await store.dispatch(`nuxtServerInit`);
    })();
  } catch (err) {
    throw err;
  }
}

export default store;
```

이후 NuxtServerInit에서 처리되는 데이터까지 들어와 스토리에 반영되는 것을 확인 할 수 있었다.

nuxt/storybook의 경우 NuxtServierInit을 처리 하기 위해서 이 방법을 쓰려면 바로 위의
[Vuex 해결](#Vuex-%ED%95%B4%EA%B2%B0) 부분을 같이 처리해 주어야 한다.

## SCSS 오류 해결

SCSS 혹은 SASS를 사용하고 있을 경우 Storybook에서는 이를 또 처리하지 못하고 오류를 뱉는다.

![오류 뱉기 퉤!](/upload/2020/throw-error.jpg)

때문에 node-sass, sass-loader를 추가로 설치해야 하고, `.storybook/main.js` 파일에
로더 설정을 해주어야 한다. 추가로 Nuxt에 styleResources로 컴포넌트에서 사용하는 리소스를
미리 등록해 둔게 있다면 이 역시 함께 설정을 해주어야 storybook에도 반영된다.

```javascript
const path = require(`path`);
const rootPath = path.resolve(__dirname, `../`);

module.exports = {
  ...
  webpackFinal: (config) => {
    config.resolve.alias[`@`] = rootPath;

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        `style-loader`,
        `css-loader`,
        {
          loader: `sass-loader`,
          options: {
            additionalData: `
              @import "@/assets/scss/helpers/_functions.scss";
              @import "@/assets/scss/helpers/_mixins.scss";
              @import "@/assets/scss/modules/_variables.scss";
            `,
          },
        }
      ],
      include: path.resolve(__dirname, `../`),
    });

    return config;
  },
};

```

일단 여기까지가 내가 해결한 방법들이다.

좀 더 나은 방법들이나 nuxt/storybook을 통하지 않고 nuxt context에 접근 가능한 방법을
알고 있는 분이 있다면 힌트 좀... ㅎㅎㅎ
