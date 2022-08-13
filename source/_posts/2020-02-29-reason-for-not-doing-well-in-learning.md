---
title: 학습이 잘 되지 않는 이유
tags:
  - 학습
  - 공부
  - study
subtitle: 공부한다고 하는데 왜 머리에 안들어올까
categories:
  - 생각노트
  - in dailylife
thumbnail: /upload/2020/thumbs/headache.jpg
hero: /upload/2020/headache.jpg
seo:
  description: |
    학습 한다고 학습은 하는데 도무지 머리 속에 남지 않는 경우가 있다. 나도 겪어봤던 문제이고 지금도 종종 겪는 문제이기도 한데 이에 대한
    이야기를 한 번 해보려고 한다.
  image: /upload/2020/headache.jpg
style: |
  .article__content{
    &::after {
      @extend %clearfix;
    }
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
      &--left {
        @include respond-to('small') {
          float: left;
          margin-right: 1.25em;
          margin-bottom: 1em;
        }
      }
      &--right {
        @include respond-to('small') {
          float: right;
          margin-left: 1.25em;
          margin-bottom: 1em;
        }
      }
    }
  }
  .hidden {
    @extend %sr-only;
    display: inline-block;
  }
date: 2020-02-29 16:06:45
---


간만에 뻘글하나 남겨본다 = _=a

다른 사람들이 이야기 하는 학습이 이루어지 않는 이유는 다 접어두고, 학습 한다고 학습은
하는데 도무지 머리 속에 남지 않는 경우가 있다. 나도 겪어봤던 문제이고 지금도 종종
겪는 문제이기도 한데 이에 대한 이야기를 한 번 해보려고 한다.

## 어렵다는 선입견

오래전 RequireJS를 학습해야지~ 하고 공식 문서를 열어봤던 적이 있었다. 호기롭게 공식
사이트에 접속했다가 며칠 잠깐 보고 도무지 머리에 들어오지 않아서 접어버렸었다.

그리고 몇 년 후 다시 RequireJS를 써봐야겠다는 생각이 들어서 마음의 준비(?)를 하고
사이트에 접속 하여 차근차근 읽어가며 적용해보기 시작했고, 종래에는 RequireJS를 통해
프로토타입격을 만들어보는데 성공했다.

두 시점에서는 시간이라는 차이 말고는 다른 조건들이 크게 바뀐 것은 없었다.
있다면 단지 JavaScript라는 언어가 (상대적으로) 좀 더 익숙해졌다는 것과 영어 문서를
읽는 것이 좀 더 익숙해졌다는 정도의 차이 정도일듯 하다.

혹자는 그 시간 동안에 쌓인 지식과 경험으로 더 수월해진 것이다 할 수도 있겠으나,
부끄러운 이야기이지만 그 사이 쌓인 지식은 정말 별 볼일 없는 수준에 그쳤기 때문에 결정적
이유는 아니었다.

뒤돌아 보건데, 문서를 보고 또 봐도 머리 속에 들어오지 않은 이유는 <b>어렵다는 선입견</b> 이었다.

어디에서 나온 이야기였는지는 정확히 기억이 나지는 않지만, 공부하려고 앉으면 몸이 거부한다는
이야기가 있었다. 그것도 아주 처절하게...
이와 비슷한 맥락으로 이미 어렵다고 머리와 마음이 결정하고 거부하기 시작하면 그 이후로는
아무리 들여다 보아도 절대로 머리 속에 들어오지 않는다.

{% raw %}
<figure class="figure figure--right">
  <img
    src="/upload/2020/college-diary-webtoon.jpg"
    alt="놀 땐 놀았는데 공부할 때 공부가 안된다. 외워!! 외우라고! 이 멍청한 머리야!! ㅠㅠ" >
  <figcaption class="figure__caption">
    출처: 네이버웹툰 대학일기 96화
  </figcaption>
</figure>
{% endraw %}

RequireJS를 한 번 공부해봐야겠다고 생각했을 때가 딱 그러했다. 문서를 열어보는 순간
&lsquo;이건 어렵다&rsquo;, &lsquo;이걸 굳이 공부해서 내가 무슨 부귀 영화를
누리겠다고...&rsquo; 등등 온갖 학습을 거부하는 생각들이 머리 속을 돌아다녔고 당연히
학습이 이루어질리가 없었다.

다시 RequireJS를 학습 할 때에는 이미 마음의 준비(?)가 되어 있었고, 문서를 차근차근
읽어가며 시도해보기 시작하면서 코드를 작성하고 동작되는 결과를 보면서 점차적으로 이해가
이루어지고 종래에는 결과물로 나오기까지 이어졌다.

이와 같은 일은 최근에도 겪고 있다.
최근 업무를 진행하면서 Webpack 3에서 Webpack 4로 마이그레이션 작업을 진행하는데
Webpack에 대해서는 사실 이미 설정된 것만 건드려봤지 zero에서부터 시작해본 적도 없을 뿐더러
Webpack에 대한 동영상 강의를 수강하기도 했음에도 불구하고 &lsquo;Webpack은 어렵다&rsquo;
라는 선입견이 이미 머리 속에 가득해 있어서 마이그레이션의 첫 시도는 무참히 실패했다.

두 번째 마이그레이션 작업 시도할 때에는 이 선입견을 벗어버리려 애를 썼다.
심호흡부터 시작해서 몸과 머리 속의 긴장을 완화시키려 노력했고 어느 정도의 릴렉스가 이루어진
이후에 다시 문서를 차근차근 읽어가며 기존의 설정들을 최신 버전에 맞게 하나씩 하나씩 변경해
가기 시작했고 머지않아 마이그레이션을 성공적으로 마치게 되었다.

함수형 프로그래밍을 학습하고 타입스크립트를 학습하는데에도 마찬가지로 이것들이 작용하고
있고 나는 이 작용들을 벗기 위한 여러가지 시도를 진행해보고 있다.
