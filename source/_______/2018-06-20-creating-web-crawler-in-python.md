---
title: 파이썬으로 웹 크롤러 만들기
tags:
  - 파이썬
  - python
  - 웹 크롤러
  - crawler
_categories:
  - 개발노트
  - etc..
hero: /upload/2018/web-crawler.jpg
date: 2018-06-20 15:07:24
viewer360:
seo:
  description: |
    파이썬 언어에 대한 배경 지식이 없는 상태에서 이미 많은 곳에 소개되어 있는 블로그들만을 참고하여 만들었음에도
    불구하고, (물론 아주 간단한 크롤러를 만든 것이기 때문에 그렇겠지만) 어렵지 않게 크롤러를 만들어 볼 수 있었기에
    잠깐 소개 정도로 올려본다.
---


내가 스탭으로 활동하고 있는 카페에는 하루에 십수개의 질문 게시글이 올라오고, 그 중 질문자의 일부는 답변을 받은 이후에 삭제하는 일이
빈번하게 일어나고 있다. 이에 대해 패널티를 주고 있지만, 매 순간마다 지켜보고 있기는 어려우니 답변을 받고 삭제하는 이들을 잡아내는 것이
쉬운 일만은 아니었다.

지난 주말에도 질문 하나가 올라온 것을 확인했고 해당 글에 대한 답변이 달린 것까지도 확인을 했는데, 월요일 오전에 다시 카페에 들어가봤을
때 해당 게시글이 삭제되어 있는 것을 확인할 수 있었고 주말동안 글을 수집하지 않았던 나는 해당 글의 질문자를 찾을 수 없었기 때문에
누가 또 답변자의 호의를 개무시하고 삭제했는지 찾을 방법이 없었다.

결국, 어제 미루고 미루어왔던 크롤러 만들기에 착수했고, 대략 4시간 정도의 시간을 소요해서 현재 정해둔 시간마다 자동으로 필요한 정보를
수집해서 서버에 로그가 쌓이고 있다.

파이썬 언어에 대한 배경 지식이 없는 상태에서 이미 많은 곳에 소개되어 있는 블로그들만을 참고하여 만들었음에도 불구하고, (물론 아주 간단한
크롤러를 만든 것이기 때문에 그렇겠지만) 어렵지 않게 크롤러를 만들어 볼 수 있었기에 잠깐 소개 정도로 올려본다.

크롤러를 만든 모든 코드를 다 올리자면 내용이 너무 길어질 수 있기 때문에, 로그인이 필요없는 부분까지만 올릴 예정... 로그인 처리 방식도
워낙 많이 소개가 되어 있기 때문에 검색해보면 쉽게 찾을 수 있다.

참고로, 내 개발환경은 Windows 2012 Server다. 예전에 Classic ASP를 써야 하는 일들이 잦아서 개인 서버를 임대해 두었는데 IIS로
올려둔 사이트들이 적지 않아서 그냥 계속 유지 중이기도 하고 어차피 24시간 지속적으로 수집이 되어야 하기 때문에 Windows 기반에서 만들었다.

## 준비사항

- [Python](https://www.python.org/downloads/) (Python 3.x 윈도우 설치파일의 경우 환경 변수까지 한 번에 등록해주어서
따로 환경 변수 등록이 필요하지 않더라)
- [ChromeDriver](http://chromedriver.chromium.org/downloads)

### Install Python Package

패키지 설치는 파워쉘 상에서 진행했고, selenium과 BeautifulSoup을 설치했다.

```bash
pip3 install selenium BeautifulSoup
```

python 3에는 pip3가 기본 포함되어 있기 때문에 따로 설치할 필요가 없다고 한다.

## 크롤러 만들기

### Import Packages

설치한 패키지들을 어플리케이션에서 사용할 수 있도록 import 하는 코드는 다음과 같다.

```python
from selenium import webdriver
from bs4 import BeautifulSoup as bs
```

### Drive Headless Chrome

크롤링 하는데 굳이 창을 띄울 필요는 없으니 headless chrome으로 페이지를 오픈하도록 한다.

{%raw%}
<pre class="line-numbers"><code class="language-python">options = webdriver.ChromeOptions()
options.add_argument('headless')

# replace '<i>chromedriver_path</i>' with path where your chromedriver is located.
driver = webdriver.Chrome(<i>chromedriver_path</i>, chrome_options=options)</code></pre>
{%endraw%}

#### Open The Page To Crawl

브라우저를 열었으니, 이제 크롤링하려고 하는 페이지의 주소를 불러들이면 된다.

{%raw%}
<pre class="line-numbers"><code class="language-python"># replace '<i>url</i>' with the url you want to crawl
driver.get(<i>url</i>)</code></pre>
{%endraw%}

### Get Data from page with BeautifulSoup

페이지를 불러들이고나면 이제 할일은 그저 데이터를 뽑아내는 일이다.
데이터를 얻어오는 것은 단지 HTML로부터 text를 추출하는 작업일 뿐이며, BeautifulSoup을 이용하면 CSS Selector를 이용하여
손쉽게 필요한 데이터들을 얻어올 수 있다. (물론, CSS Selector를 통해 DOM 객체를 가져오는 것이기 때문에 최소한 DOM을 알고 있어야
한다.)

```python
soup = bs(driver.page_source, "html.parser")

# 문서에서 `form[name=ArticleList] > table`에 해당하는 요소를 추출.
article_table = soup.select("form[name=ArticleList] > table")[0]

# 가져온 테이블로부터 `<tr>` 요소들을 2차 추출
article_list = article_table.select("tr")

# 추출된 tr 요소들로부터 필요한 텍스트 추출하기 위해 반복 처리
for article in article_list:
  # 네이버 카페의 경우, 표 라인을 그리는 용도의 tr이 존재하기 때문에
  # 해당 tr에서 데이터를 가져올 경우 오류가 발생한다.
  # 2개씩 건너서 탐색시키기 귀찮아서 그냥 try..except로....
  try:
    number = article.select(".list-count")[0].get_text()
    subject = article.select(".board-list a")[0].get_text()
    subject = html.escape(subject)
    ....

  except:
    pass
```

### Close Webdriver

필요한 데이터를 모두 가져와서 처리가 끝났다면, 열어둔 webdriver를 종료 해야 한다.
물론, 데이터를 얻어오는 과정 중에 추가적으로 다른 페이지를 열어볼 이유가 없다면 데이터를 가져오기 이전에 닫아도 문제되지 않는다.

```python
driver.quit()
```

이를 처리하지 않으면, 크롤러가 실행된 이후 서버에 chrome.exe 프로세스가 종료되지 않게 되고, 크롤러를 주기적으로 자동 실행되도록
스케쥴링을 걸어놓을 경우 이 프로세스가 지속해서 누적되어 메모리 누수의 범인이 된다.
