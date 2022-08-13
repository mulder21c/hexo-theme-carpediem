---
title: babel 7 업데이트 후 node_modules 패키지가 변환되지 않는다면?
tags:
  - babel 7
  - node_modules
  - transpile
categories:
  - 개발노트
  - Front-End
thumbnail: /upload/2020/thumbs/es-notebook.jpg
hero: /upload/2020/es-notebook.jpg
seo:
  description: |
    babel 공식 문서의 Upgrade to Babel 7을 참고서 삼아 @babel로 업데이트를 진행하고,
    core-js를 설치하고 npm run serve 힘차게 두들기고 IE 10을 열었는데... 열었는데...
date: 2020-01-30 00:05:48
---


기존에 개발 된 프로덕트가 빌드하는데만 한 시간을 훌쩍 넘어가는 상황이 지속적으로 발생되어
빌드 속도 개선을 위한 일환으로 기존의 webpack 3.x를 4.x로 마이그레이션 작업을 진행하기로
했다. 헌데... webpack 4로 올리자니 기존에 사용되고 있던 패키지들의 버전이 문제가 되어
온갖 것들을 동시에 버전업 해야 하는 상황이 빚어져서 이렇게 진행하기에는 리스크가 클 것으로
판단하여 우선 babel부터 6.x에서 7.x로 마이그레이션을 진행하기로 했다.

babel 공식 문서의 [Upgrade to Babel 7](https://babeljs.io/docs/en/v7-migration)을
참고서 삼아 <code>@babel</code>로 업데이트를 진행하고, `core-js`를 설치하고

<q>오케이~ 시킨 건 다 한거 같다!</q> 하고 <code class="language-bash">npm run serve</code> 힘차게 두들기고
IE 10을 열었는데... 열었는데...

![IE 10 개발자도구 콘솔 탭 내 구문 오류 발생](/upload/2020/ie10-error.gif)

구문 오류가 발생한 곳을 까보니 노드 패키지로 설치한 'vue-mansonry'가 트랜스파일되지 않고
꿋꿋하게 <code>const</code> 키워드를 똬악...

Upgrade to Babel 7 문서에는 아무리 뒤져보아도 관련 내용을 찾지를 못하고 구글님께
제가 어찌하여야 <code>node_modules</code> 패키지를 트랜스파일 할 수 있겠습니까 여쭈어
몇 개의 아티클들을 거쳐 비로소
[babel 7 can't compile in node_modules](https://github.com/babel/babel/issues/8672)
라는 제목으로 올라온 babel github issue를 발견했다.

허망(?)하게도 솔루션은 매우 간단했는데...

<code>.babelrc</code> 파일을 <code>babel.config.js</code>로 변경 작성하는 거였다...

```javascript
// 기존의 .babelrc 파일
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [ "> 1%", "last 2 versions", "IE >= 10" ]
        },
        "modules": false,
        "useBuiltIns": true,
        "debug": true
      }
    ]
  ],
  "plugins": [
    "babel-plugin-transform-object-rest-spread",
    "babel-plugin-syntax-dynamic-import",
    "babel-plugin-transform-runtime"
  ]
}
```

바벨 가이드에 맞춰

```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 1%", "last 2 versions", "IE >= 10"]
        },
        useBuiltIns: "usage",
        corejs: 3,
        debug: true,
        shippedProposals: true
      }
    ]
  ];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime"
  ];

  return {
    presets,
    plugins
  };
};
```

이렇게 바꾸고 다시 실행해보니 이제는 IE 10에서 오류 없이 잘 나온다 휴...

github 이슈를 보니 [Usage &gt; config file](https://babeljs.io/docs/en/config-files#6x-vs-7x-babelrc-loading)
쪽에 관련 내용이 있었는데...
이 내용은 오히려 'Upgrade to Babel 7'에 있어야 하는게 맞지 않나 ㅠㅠ
