---
title: Nuxt Router kebab-case 처리
tags:
  - Nuxt Page Component
  - Nuxt Router name
  - Nuxt Router PascalCase
  - Nuxt Router kebab-case
_categories:
  - 개발노트
  - Front-End
thumbnail: /upload/2020/thumbs/nuxt-router-name.jpg
hero: /upload/2020/nuxt-router-name.jpg
seo:
  description: |
    다른 컴포넌트 파일들과의 일관성을 맞추기 위해서 page에만 적용할 별도의 규칙을 만드는 것도
    썩 마음에 들지 않아, 차라리 Nuxt에서 router를 생성할 때 파일명으로부터 kebab-case
    처리하도록 만들었다.
  image: /upload/2020/nuxt-router-name.jpg
date: 2020-10-17 17:51:36
style:
---


Nuxt를 사용할 때 page component 파일을 PascalCase 혹은 camelCase로 생성하게 되면
router name 역시 PascalCase, camelCase로 고스란히 생성된다.
물론 case-insensitive 처리해도 되지만, URL에 대소문자가 섞여 노출 되는게 썩 좋은 경험은
아니었어서 kebab-case로 노출되도록 변경이 필요했다.

단순하게 page component 파일을 생성할 때 파일명 자체를 kabab-case에 맞추어서 생성해도
충분히 되기는 한데, 다른 컴포넌트 파일들과의 일관성을 맞추기 위해서 page에만 적용할 별도의
규칙을 만드는 것도 썩 마음에 들지 않아, 차라리 Nuxt에서 router를 생성할 때 파일명으로부터
kebab-case 처리하도록 만들었다.

다행히(?) Nuxt에서는 라우터 확장을 위해 `extendRoutes` 옵션을 제공하고 있어 이를 활용하여
처리가 가능했다.

```javascript
const convertKebabCase = require('lodash/kebabCase');
...
router: {
  extendRoutes(routes, resolve) {
    routes.forEach(route => {
      route.path =
        route.path
          .split('/')
          .map(path => convertKebabCase(path))
          .join('/');
    });
  },
},
```

단순히 path를 segmentation하여 각각을 kebab-case로 변경시키고 다시 합치는 방식으로...

이렇게 해서 잘 되는 줄 알았...는데... dynamic router에서 다시 문제가 발생했다.
`lodash/convertKebabCase`가 dynamic router path에 붙어있는 ":"를 제거해버렸... ㅋㅋㅋ

하여, path에 ":"의 존재 여부에 따라 변경 되도록 바꾸었고,

```javascript|data-line="9-12"
const convertKebabCase = require('lodash/kebabCase');
...
router: {
  extendRoutes(routes, resolve) {
    routes.forEach(route => {
      route.path =
        route.path
          .split('/')
          .map(path => {
              if (/^\:/.test(path)) return path;
              return convertKebabCase(path);
            })
          .join('/');
    });
  },
},
```

현재까지는 아직 아무런 문제를 일으키지 않고 잘 돌아가고 있다