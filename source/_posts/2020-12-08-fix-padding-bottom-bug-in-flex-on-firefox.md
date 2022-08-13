---
title: colum flexbox에서 padding bottom 문제 해결
tags:
  - flex
  - flexbox
  - padding-bottom
  - firefox
  - overflow
categories:
  - 개발노트
  - HTML/CSS
hero: /upload/2020/fails-padding-bottom-in-flexbox.jpg
seo:
  image: /upload/2020/fails-padding-bottom-in-flexbox.jpg
  description: |
    Firefox에서 column flexbox에 하단에 적용해 둔 padding-bottom이 실종되는 상황을 
    만나게 되었다.
thumbnail: /upload/2020/thumbs/fails-padding-bottom-in-flexbox.jpg
style: |
  .hero {
    &-wrapper {
      text-shadow: 
        1px 1px 1em rgba(20, 12, 24, 0.9),
        -1px -1px 1em rgba(20, 12, 24, 0.5);
    }
    &__image {
      opacity: 0.35
    }
  }
  .article__content{
    &::after {
      @extend %clearfix;
    }
    .figure {

      &__caption {
        max-width: 334px;
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
date: 2020-12-08 19:12:13
subtitle:
---


FlexBox를 사용 하는 중 padding-bottom이 실종되는 상황을 만나게 되었다. 

정확하게는 Firefox에서 column flexbox에 발생 된 문제로 
<code class="language-css">overflow: auto</code>에 의해 스크롤이 발생되었을 때 
하단에 적용해 둔 padding이 실종되는 상황이다. 

물론, Chrome은 렌더링이 잘 된다... <s>힘내요 FireFox</s>

## 발견된 상황

### 적용된 코드

해당 문제와 관련 없는 코드는 삭제해 두었고, padding-top/bottom에 해당 하는 값은
식별이 쉽도록 일부러 100px을 넣어두었다.

```css
.frm {
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  margin: auto;
  padding: 100px 30px;
  ...
}
```

### 렌더링 된 화면 

{% raw %}
<figure class="figure">
  <img 
    src="/upload/2020/fails-padding-bottom-in-flexbox.jpg" 
    alt="" >
  <figcaption class="figure__caption">
    상단에는 padding이 적용되어 있지만, 하단에는 padding이 적용되지 않은 것 처럼 보여진다.
  </figcaption>
</figure>
{% endraw %}

## Fix it

찾아보니 FireFox와 Safari에서 발생되는 버그로 알려져 있더라.   
나는 Mac이 없는 관계로... Safari에서는 테스트를 해보지 못했지만, 같은 문제가 발생되더라도
동일한 방법으로 충분히 해결 될 거라고 생각한다. 

사실 이게 해결(?)이라기 보다는 trick에 가깝다고 봐야 할 것 같고, 아마도 특정 상황에서는 
사용하지 못하는 방법일 수도 있다. (왜 그런지는 코드를 보면 알 거다)

키는 <code class="language-css">::before</code>, 
<code class="language-css">::after</code> 가상 선택자에 있다.  
단지 아래와 같은 코드를 바꾸어주었을 뿐이다. 

```scss
.frm {
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  margin: auto;
  padding: 0 30px;
  ...
  
  &::before,
  &::after {
    flex: 0 0 100px;
    width: 100%;
    content: "";
  }
}
```

padding-top/bottom 에 해당하는 값을 가상선택자의 flex로 이동시켜주는 방식으로 요소 상/하
단에 그 만큼의 여백에 해당하는 빈 요소를 집어 넣은... 

참고로 <code class="langauge-css">width: 100%</code>를 넣은 건, width값이 0이면 
렌더링 되지 않아서다;; <s>나한테 왜이래 Firefox...</s>

<code class="language-css">::before</code>, 
<code class="language-css">::after</code>를 사용했기 때문에, 이미 이를 다른 스타일링을 
위해 사용하고 있다면 다소 이 방법을 사용하기는 어렵겠다. 

그저 Firefox와 Safari가 이 버그를 수정해주길 기다릴 뿐...
