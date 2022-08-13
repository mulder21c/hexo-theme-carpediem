---
title: 웹팩 4 마이그레이션 삽질기
tags:
  - webpack 4
  - migration
  - 삽질기
categories:
  - 개발노트
  - Front-End
thumbnail: /upload/2020/thumbs/webpack-alpine-marmot.jpg
hero: /upload/2020/webpack-alpine-marmot.jpg
seo:
  description: |
    Webpack 3를 기반으로 구축된 서비스를 Webpack 4로 마이그레이션 작업을 진행했는데 꽤나
    많은 삽질이 동원 되어 차후에 이런 일이 또 있을까 하여 기록으로 남겨둔다.
style: |
  .strike {
    text-decoration: line-through;
  }
date: 2020-02-13 00:24:11
---


Webpack 3를 기반으로 구축된 서비스를 Webpack 4로 마이그레이션 작업을 진행했는데 꽤나 많은
삽질이 동원 되어 차후에 이런 일이 또 있을까 하여 기록으로 남겨둔다.

일단, 최초의 패키지 상태를 보면 (스압 주의...),

```json
"dependencies": {
  ...,
  "babel-runtime": "^6.26.0",
},
"devDependencies": {
  ...,
  "@kazupon/vue-i18n-loader": "^0.1.1",
  "autoprefixer": "^6.7.7",
  "babel-cli": "^6.26.0",
  "babel-core": "^6.26.3",
  "babel-eslint": "^7.2.3",
  "babel-loader": "^7.1.5",
  "babel-plugin-lodash": "^3.3.4",
  "babel-plugin-syntax-dynamic-import": "^6.18.0",
  "babel-plugin-transform-object-rest-spread": "^6.26.0",
  "babel-plugin-transform-runtime": "^6.23.0",
  "babel-polyfill": "^6.23.0",
  "babel-preset-env": "^1.7.0",
  "babel-register": "^6.24.1",
  "copy-webpack-plugin": "^4.5.1",
  "css-loader": "^0.28.11",
  "extract-text-webpack-plugin": "^3.0.2",
  "file-loader": "^0.11.1",
  "friendly-errors-webpack-plugin": "^1.7.0",
  "html-webpack-plugin": "^3.2.0",
  "iconfont-plugin-webpack": "^1.1.0",
  "lodash-webpack-plugin": "^0.11.5",
  "node-sass": "4.13.0",
  "postcss-loader": "^2.1.5",
  "sass-loader": "^6.0.6",
  "sass-resources-loader": "^1.3.3",
  "style-loader": "^0.20.3",
  "sw-precache-webpack-plugin": "^0.10.1",
  "url-loader": "^1.0.1",
  "vue-loader": "^13.7.3",
  "vue-ssr-webpack-plugin": "^1.0.2",
  "vue-style-loader": "^3.0.0",
  "vue-template-compiler": "^2.5.21",
  "webfonts-loader": "^4.1.0",
  "webpack": "^3.12.0",
  "webpack-dev-middleware": "^1.10.1",
  "webpack-hot-middleware": "^2.22.2",
  "webpack-manifest-plugin": "^2.0.2",
  "webpack-merge": "^4.1.4",
  "webpack-node-externals": "^1.7.2",
  "webpackbar": "^2.6.1",
  "yaml-loader": "^0.5.0"
}

```

## 마이그레이션 가이드는 가이드가 아니더라...

최초 작업이 들어갈 때 웹팩 공식 문서에 [To v4 from v3](https://webpack.js.org/migrate/4/)라고
이미 문서화 되어 있는 것이 있기에...

이 문서의 내용을 따라서

1. webpack에 관련된 플러그인들을 최신 버전으로 업데이트 하고
2. <code class="language-javascript">mode</code>를 설정하고
3. deprecated 된 플러그인을
4. 코드상 에서 제거하고 <code>CommonsChunkPlugin</code>을
   <code>optimization.splitChunks</code>로 돌리고,
5. <code>yaml-loader</code>의 <code>type</code>을 <code>javascript/auto</code>로
   변경하고, <code>json-loader</code>를 삭제하고.

시키는 대로 착실하게(?) 따라하고 호기롭게 <code class="language-bash">npm run dev</code>
명령을 호기롭게 딱! 쳤는데...

![안돼 안돌려줘 돌려줄 생각없어 빨리 되돌려놔 패러디](/upload/2020/no-run.jpg)

당연히 오류가 쫘아아아악... 돌아갈리가 없다... <span class="strike">왜지? 난 시키는 대로 했을 뿐인데</span>

마이그레이션 문서는 불친절했고 온갖 정보들을 찾아다니며 해결 해야만 했다.

## 바보야 문제는 Webpack만이 아니야

오류는 다방면(?)으로 발생했다. 하나를 고치면 또 다른 오류를 내 뱉고 또 하나를 손보면 또 다른
오류를 내뱉고...

처음에는 오류 하나 하나를 살펴보고 해결해 가면 되겠지 했으나 그건 <span class="strike">순진한</span>
멍충한 생각이었다.
오류를 해결해 가려면 해결해 갈 수록 의존성 패키지들의 끈끈한 의리가 도무지 해결이 되고 있는
건지 아닌지를 판단하기 어렵게 만들었...

이걸 땐 가뿐히... 변경 사항을 폐기하고 처음부터 다시.
일단 Webpack 버전을 올리지 않아도 문제가 없는 loader와 플러그인들부터 최신 버전으로 업데이트를
시도하기 시작했다.

그 첫 번째가 babel 6에서 7으로 업데이트.
이것 조차도 쉽지 않았는데 해당 부분은
[babel 7 업데이트 후 node_modules 패키지가 변환되지 않는다면?](/2020/01/30/migration-to-babel-7-from-babel-6)
여기에 포스팅 했으니까 이건 넘어가고...

### webpack 버전 안타는(?) loader와 plugins 업데이트하기

다음으로 시도한게 일단 Webpack 3에서도 문제가 없는 loader와 plugins들의 최신 버전을 설치
하는 거였다.

처음에는 모든 loader의 최신 버전 문서를 확인하고 문제가 없어 보이는 것들만 모아서 한 번에
업데이트 하고 개발 서버를 실행시켰는데... 또 다시 오류가... 허허...
(이제 각 loader들의 문서도 믿지 않기로했다... 특별히 언급되어 있지 않으면 일단 오류를 낼
잠재적 범인으로 간주하기로...)


심지어 왜 이 눔의 <code>path</code> 패키지는 자꾸 패키지 내부에 git repository를 만드는지...

```bash
$ npm install -D package@latest && npm run dev
```

과

```bash
$ rm node_modules/ -rf && npm install && rm node_modules/*/.git -rf
```

를 계속 반복해가면서 무식하게 업데이트를 진행하기 시작했다...

이렇게 해서 1차적로 안정적으로 몇 개 패키지를 올려놓고 나니 남은 패지키들이

```json
"css-loader": "^0.28.11",
"extract-text-webpack-plugin": "^3.0.2",
"postcss-loader": "^2.1.5",
"sass-loader": "^6.0.6",
"sass-resources-loader": "^1.3.3",
"sw-precache-webpack-plugin": "^0.10.1",
"vue-loader": "^13.7.3",
"vue-ssr-webpack-plugin": "^1.0.2",
"vue-style-loader": "^3.0.0",
"webpack": "^3.12.0",
"webpack-dev-middleware": "^1.10.1"
```

요것들 이더라. (반대로 이야기 하면 이것 외의 다른 패키지들은 바로 업데이트 쳐도 괜찮다는 것이니
혹 최초 패키지 상태의 것들 중 언급되지 않은 것은 고민하지 않고 업데이트 쳐도 된다는 얘기)

저 몇 개의 loader들은 webpack 4를 요구하는 통에 webapck과 동시에 버전업이 되어야 했고,
그 말 인즉슨... 이제부터 나오는 오류는 어쩔 수 없이 동시 다발적으로 봐야 한다는 말이었다.

### 본격적으로 webpack 4 update

이제 마음의 준비는 끝났고, <span class="strike">(오류를 만나도 당연히 여길테다)</span>

1. 이제 나머지 패키지들을 최신 버전으로 업데이트 하고
2. 문서를 따라 deprecated 된 플러그인들을 제거하고

  [Upgrade to Webpack 4](https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5)
  문서를 보면 deprecated 된 플러그인을 어떻게 <code>optimization</code> 옵션으로
  변경해야 하는지 나와있더라...

  Webpack 공식 문서에서는 deprecated 되어 optimization의 설정으로 옮겨 갔다는 설명이
  되어 있지 않더라. 아니... 이런건 마이그레이션 가이드에 있어야 하는거 아니냐구요...

3. <code>CommonsChunkPlugin</code>을 <code>optimization.splitChunks</code> 옵션으로
옮겨 놓고


개발 서버를 실행하니...

![나는 아직 빌드를 허락하지 않았다 노블레스 웹툰 패러디](/upload/2020/nobless.jpg)

<span class="strike">그럼 그렇지 될리가 없지... ㅋㅋㅋ</span>

당장 <code>extract-text-webpack-plugin</code>는 더 이상 안 쓰인다며 오류가...
<code>mini-css-extract-plugin</code>로 대체 되었다고 하여 일단 추출하지 않도록 하고
다시 개발 서버 런...

![나는 아직 빌드를 허락하지 않았다 노블레스 웹툰 패러디](/upload/2020/nobless.jpg)

우쒸... 또 오류다. 분명 하란 대로 다 했는데 이상하게 SCSS에서 오류가 발생한다.
수정된 설정을 다시 차근차근 뒤져봤지만 아무리 봐도 오류를 모르겠더라.

일단 SCSS는 번들링 하지 않도록 임시로 빼놓고 돌려도 오류가 난다. 오류 메세지를 읽어봐도
대체 왜 여기서 오류가 나는지를 모르겠더라.

webpack migration 가이드 중에 <code>json-loader</code>는 이제 제거 될 수 있다라는
것이 있어서 제거 했었는데, 아무래도 <code>ymal-loader</code>의 loader 설정에서

```json
{
  test: /\.yml$/,
  loader: "json-loader!yaml-loader",
  type: "javascript/auto",
},

```

앞에 붙어 있는 json-loader가 영 신경쓰였다. 혹시나 하는 마음에 json-loader를 다시 설치 했다.

![영화 매트릭스 코드들이 떨어지는 화면](/upload/2020/matrix-code.jpg)

어??? 어?!! 된다!!! 떴드아....

SCSS를 제외한걸 다시 번들링하도록 풀어줬다.

![영화 매트릭스 코드들이 떨어지는 화면](/upload/2020/matrix-code.jpg)

어??? 된다고?????!!! 왜??!!!! json-loader 설치한건데????
이해할 수 없으나... json-loader를 설치한 후에 SCSS 오류는 발생하지 않았다.
(webpack 공식문서 이 놈... 부들부들...)

하지만 아직 mini-css-extract-plugin이 남았다.
일단 설치하고 무작정 적용하고 런...

![나는 아직 빌드를 허락하지 않았다 노블레스 웹툰 패러디](/upload/2020/nobless.jpg)

<span class="strike">아 또 왜!!!!</span> 이번에도 SCSS 오류다. 단지 추출을 하도록 설정
했을 뿐인데 어째서 SCSS 오류가 발생하는것인지...

vue-loader의 문제인가 하여 다시 vue-loader의 문서를 확인해봤다. vue-loader v15부터는
vue component에 포함된 <code>&lt;style lang="scss"></code>도 순수 scss 파일처럼
다룬다는 내용을 찾았고, 기존 것이 dependency의 것을 추출하도록 사용되었었기 때문에
node_modules의 것과 src의 것을 분리하여 처리할 필요가 생겼다.

처음에는 <code>exclude</code>를 이용하여 한 쪽에는 <code>node_modules</code>를
제외하게 하고, 한 쪽에서는 <code>src</code>를 제외하게 해서 설정해 봤으나 또 다시 오류...

몇 번의 삽질을 진행하고 나서야

```json
{
  test: /(node_modules).+\.(css|scss)/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ]
},
{
  test: /\.(css|scss)/,
  exclude: [path.resolve(
    __dirname,
      "../node_modules/"
    ),
  ],
  use: [
    'vue-style-loader',
    'css-loader',
    'postcss-loader'
    'sass-loader',
    ...
  ]
},
```

로 분리시켜 성공했다.

정말이지 문서화의 중요성을 새삼 느끼는 작업이었다.
<span><span aria-hidden="true">= _=a</span><span class="sr-only">긁적긁적</span></span>

---

## 적용 결과

기존에 40분 남짓이 걸리던 빌드 시간이 11분 정도로 단축 된 것을 확인했다.
이후로 몇 번 더 빌드해보고 평균을 좀 더 확인해 봐야 알 수 있겠지만 그건 이제 불가능할거고...
폐업 전에 그래도 하나 또 해보고 빌드 시간 개선에 대한 의도는 거두었다는데 의의를 두어야겠다.