---
title: 깃북 파일 저장 시 오류 문제 해결
category:
  - 개발노트
  - etc..
tags:
  - gitbook
  - 깃북
hero: /upload/2019/gitbook.png
date: 2019-02-07 20:30:48
seo:
  description: |
    로컬 서버를 띄운 상태에서 내용을 작성하고 파일을 저장하면, 자동으로 re-generate하고 새로고침 하게 되는데 이
    과정에서 오류가 발생하면서 서버가 죽어버린다.
---


한 동안 잘 사용하지 않다가 근래 다시 gitbook toolchain을 사용하고 있는데, gitbook toolchain이 가지고 있는
고질적인 문제가 있었다.

<code class="language-bash">gitbook serve</code> 명령을 통해 로컬 서버를 띄운 상태에서 내용을 작성하고
파일을 저장하면, 자동으로 re-generate하고 새로고침 하게 되는데 이 과정에서 오류가 발생하면서 서버가 죽어버린다.

처음엔 내가 뭘 잘못한건가 싶어서 여기저기 검색을 하고 다녔는데 알고보니 나만 이런게 아니더라는... [^1]

## 첫 번째 수정

무튼, 여차저차해서 처음 찾아낸 해결 방법은 로컬 서버를 띄운 뒤 <code class="language-bash">_book/</code>
디렉토리를 삭제하는 거였다.

```bash
$ gitbook serve

$ rm -rf ./_book
```

어떤 이유에서인지는 모르겠지만 rm 명령을 주어도 실제로 파일이 삭제되지는 않고, 해당 이슈를 해결되었다. <br>
하지만 로컬 서버를 띄울 때 마다 이 짓을 하려니 여간 귀찮은게 아니더라.

{% raw %}
<del>
{% endraw %}
결국 근본적인 해결책을 찾으러 출발...

온갖 파일들을 뒤져보고 github issue들을 뒤져보고 나서야 해결책을 찾을 수 있었다.

내용이 너무 길어질듯 해서 [github issue](https://github.com/GitbookIO/gitbook/issues/1379)로 가보면 남겨진
코드가 있...

{% raw %}
</del>
{% endraw %}

## 두 번째 수정

는 개뿔... 실패했다... (기존에 올려둔 코드가 있는데 간헐적으로 여전히 죽는 문제가 발견되었다. )

다시 해결책을 찾으러 긴긴 여행을... 가려다 다른 방법으로 해결책을 찾았다.

아예 npm script로 <code class="language-bash">rm -rf ./_book</code>을 실행되게 하면 될 것 아닌가?

해서 아예 Windows에서도 문제 없도록 `rimraf`를 설치하고 npm script로
<code class="language-bash">gitbook serve</code>와 <code class="language-bash">rimraf -rf ./_book</code>를
모두 실행하도록 변경했다.

```bash
$ npm install --save-dev rimraf
```

package.json에서

```json
{
  ...
  "scripts": {
    "preinstall": "(npm list gitbook-cli -g || npm install -g gitbook-cli) && (npm list rimraf -g || npm install rimraf -g)",
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "gitbook serve || rimraf -rf ./_book"
  },
  ...
}
```

이렇게 수정한 후,

{% raw %}
<del>
{% endraw %}
<code class="language-bash">$ npm start</code>로 gitbook을 실행하니 이젠 아무 문제 없이 잘 된다!!!!
{% raw %}
</del>
{% endraw %}

## 세 번째 수정

는... 역시 개뿔...

이게 노트북에서는 되는데 집 컴퓨터에서는 또 안되더라...

아무리 머리를 굴려봐도 안되는 이유는 결국 <code class="language-bash">rimraf -rf ./_book</code>의 실행
시점의 문제인듯 했다. 결국 안정적으로 _book 이 생성된 이후 해당 코드를 실행시키려면 병렬로 명령을 주되, 생성 시간
만큼 기다려주어야 하는 문제를 해결해야 했다.

일단 병렬로 NPM Script를 구동시키기 위해 'npm-run-all'을, 일정 시간 딜레이를 주기 위해 'delay-cli'를 사용해
보기로 했다.

```bash
$ npm install --save-dev npm-run-all delay-cli
```

그리고 병렬 구동을 위해 NPM script를 다시 수정...

<code class="language-bash">gitbook serve</code>와
<code class="language-bash">delay 30 && rimraf -rf ./_book</code>를 병렬로 수행시키도록 했고,
30초 딜레이를 준 것은 초기 generating에 걸리는 시간이 있어서 30초 정도로 우선 설정을 해두었다.

```json|data-line="6-8"
{
  ...
  "scripts": {
    "preinstall": "(npm list gitbook-cli -g || npm install -g gitbook-cli) && (npm list rimraf -g || npm install rimraf -g)",
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "gitbook serve",
    "fixrefresh": "delay 30 && rimraf -rf ./_book",
    "start": "run-p serve fixrefresh "
  },
  ...
}
```

더불어 <code class="language-javascript">npm list rimraf -g</code> 이 코드는 의도했던 것과 달리 0 depth로
설치된 것을 확인해주지 못해서 올바르게 돌아가지 못하고 있었던걸 나중에서야 발견...

다시 구글링을 통해 찾아보니 grep 말고는 답이 없겠더라... <br>
해당 코드를 <code class="bash">npm list --global --depth=0 rimraf | grep rimraf</code>로 바꾸어서 보니
이젠 잘 확인이 되어서 원하는 결과로 이어지기 시작했다.

```json|data-line="4"
{
  ...
  "scripts": {
    "preinstall": "(npm list gitbook-cli -g || npm install -g gitbook-cli) && (npm list --global --depth=0 rimraf | grep rimraf || npm install rimraf -g)",
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "gitbook serve",
    "fixrefresh": "delay 30 && rimraf -rf ./_book",
    "start": "run-p serve fixrefresh "
  },
  ...
}
```

이렇게 수정을 해 두고 나니 이제는 아무 문제없이 잘 되는 듯 했다. <br>
수정하고 거의 보름 가까이를 gitbook 콘텐츠를 수정하면서 테스트 해봤는데 아직까지 아무 문제 없이 원하는 대로
잘 갱신이 이루어지고 있다.


해결 코드를 PR로 열까 했는데, Gitbook에서 CLI에 대해 공식적으로 deprecation 선언을 해버린 상황이라[^2] PR을
여는게 의미가 있을까 싶어 그냥 두고 issue에만 코멘트로 남겨두었다.


[^1]: [gitbook github issue](https://github.com/GitbookIO/gitbook/issues/1379)를 뒤져보니 나와 같은
고통을 받는 이들이 있었다.
[^2]: [gitbook github README](https://github.com/GitbookIO/gitbook)를 보면 작년 12월 28일에 Deprecation
warning이 추가된 것을 확인할 수 있다.