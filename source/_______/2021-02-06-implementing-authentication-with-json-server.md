---
title: json-server에 사용자 인증 구현하기
tags:
  - Authenticatoin
  - Authorization
  - Bearer Token
  - json-server
  - json-server-auth
  - mock api
  - JWT
_categories:
thumbnail: /upload/2021/thumbs/json-server-authentication.jpg
hero: /upload/2021/json-server-authentication.jpg
seo:
  description: |
    최근 진행했던 한 기업의 사전 과제에서 JWT 인증 처리를 포함한 Mock API 구현이 범위에
    있어 시도해 봤던 방법을 기록으로 남겨본다.
  image: /upload/2021/json-server-authentication.jpg
style: |
  .hero {
    &-wrapper {
      text-shadow:
        1px 1px 1em rgba(20, 12, 24, 0.9),
        -1px -1px 1em rgba(20, 12, 24, 0.5);
    }
    &__image {
      opacity: 0.5;
      filter: blur(0.35em)
    }
  }
date: 2021-02-06 14:10:27
---


최근 진행했던 한 기업의 사전 과제에서 JWT 인증 처리를 포함한 Mock API 구현이 범위에 있어
시도해 봤던 방법을 기록으로 남겨본다. (JSON server는 사용할 줄 안다는 가정하에서 포스팅한다.)

내 경우엔 mock API 구현에 편의를 위해 [JSON server](https://github.com/typicode/json-server)를
사용해 왔는데, 역시 이를 베이스로 하고 JWT 관련 패키지를 추가하여 구현을 시도해봤다.

## 추가 한 auth 관련 패키지

- [json-server-auth](https://github.com/jeremyben/json-server-auth)

  JSON server용으로 만들어진 JWT 인증 미들웨어다.
  다른 몇 가지 패키지들을 찾아보고 가장 간편하게 구축 가능하고 문서화가 잘 되어 있는 녀석을
  찾다보니 이 녀석으로 정착했다.

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

  패키지 이름 그대로 JWT의 구현체인데, JWT verifier가 필요해서 가져왔다 = _=a

- [cors](https://github.com/expressjs/cors)

  CORS 관련 설정을 위한 Express용 미들웨어로, HEADER를 조작하게 되면 pre-flight 요청을
  처리해야 하는데 여기서 CORS 문제가 발생되기 때문에 이를 해결하기 위해서 설치 했다.

## 기본 설정

사실 json-server-auth가 웬만한 것들은 알아서 처리해주고 있기 때문에 특별히 할 것은 없다.

해당 매뉴얼을 참고해서 미리 정의 된 API 이름을 그대로 가져다 쓰기만 하면 JWT 발급부터 오류까지
알아서 처리해 준다. (참고로 이 토큰의 유효시간은 1시간이다)

따라서, 해야 할 일이라고는 미리 정의 된 API 외 다른 이름을 쓰고 싶을 경우의 router rewrite,
CORS 설정 정도면 충분하다.

설정 방법은 [express 공식문서](https://expressjs.com/en/resources/middleware/cors.html)를
참고했다.

```javascript
const server = jsonServer.create();
const auth = require("json-server-auth");
const cors = require("cors");

/**
 * 과제에선 GET, POST, DELETE만 필요했기 때문에
 * 3가지 method만 작성했고,
 * 어차피 mock api이고 local에서 구동되는 거라
 * origin을 all(*)로 설정했다.
 */
server.use(
  cors({
    origin: "*",
    preflightContinue: false,
    methods: "GET,POST,DELETE"
  })
);
/**
 * 모든 router에 대해 preflight 요청 활성화
 */
server.options("*", cors());

// 중략

server.use(auth);
```

단지 이 기본 설정만으로 회원 가입, 로그인 시 JWT 발급이 가능하고 이후 클라이언트에서
API 호출 시 Authorization Header에 Bearer Token을 담아 던지기만 하면 된다.

## users/me 구현

그런데, json-server-auth는 회원 가입 혹은 로그인 시 accessToken만을 응답으로 내려주기
때문에 사용자를 식별할 방법이 없다.

아쉽게도 이 부분은 직접 구현을 해야 하는 부분으로 보였다.
역시 대부분 생각하는게 비슷한지 동일한 니즈를 가진 유저의 질문이
[issue](https://github.com/jeremyben/json-server-auth/issues/12)로 등록되어 있었고
해당 issue를 참고해서 별도로 구현했다.

```javascript
/**
 * JWT 검증을 위해 jsonwebtoken 모듈을 가져왔고,
 * JWT의 비밀키는 json-server-auth에서 가지고 있다
 */
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("json-server-auth/dist/constants").JWT_SECRET_KEY;

// 중략

server.get(`/users/me`, auth, (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).jsonp("Missing authorization header");
    return;
  }
  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer") {
    res.status(401).jsonp("Incorrect authorization scheme");
    return;
  }
  if (!token) {
    res.status(401).jsonp("Missing token");
    return;
  }

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    const { db } = req.app;
    // ... 은 그냥 나머지 property들
    const { id, email, ... } = db
      .get("users")
      .find({ email: data.email })
      .value();
    res.status(200).json({ id, email, ... });
  } catch (err) {
    res.status(401).jsonp(err.message);
  }
});
```

이렇게 해서 사용자 정보를 내려주는 users/me API도 구현했다.

생각보다 어렵지 않게 mock에서도 인증 구현이 되서 이후로도 요긴하게(?) 사용할 수 있을 것 같다.

## 아쉬운 부분

json-server-auth가 내부적으로 정확히 어떻게 동작하는지까지는 찾아보지 않았는데, mock api
구동 중에 post 등으로 발생된 리소스는 권한이 정상적으로 동작하는 반면, mock api가 구동 되기
전에 존재하는 리소스는 권한이 정상적으로 동작하지 않았다.

즉, 생성한 유저만 조회가 가능한 리소스를 설정해두었을 때, 테스트 중 mock api를 내렸다가 다시
올리면 기존 리소스가 사라지는 것은 아니기 때문에 기존 것이 전체가 조회 가능한 권한이 되어버리는
문제가 발생하기는 하더라...

그리고 또 한가지, mock API 작성과 동시에 swagger 문서를 만들었는데 swagger 사이트에 올려
API 테스트를 돌리려고 하면 토큰을 발급 받을 방법을 모르겠더라 = _=a
결국 Swagger 사이트에 올리면 인증 테스트를 할 수 없더라는... 쿨럭...

물론 로컬에 swagger도 설치해서 구동하면 되기는 하지만, 협업 시에는 response에 관련 된
yml만 작성해 올리는 걸로 만족해야 하나 싶다.