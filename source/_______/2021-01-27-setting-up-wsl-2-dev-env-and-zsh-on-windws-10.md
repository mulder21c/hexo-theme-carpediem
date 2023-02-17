---
title: 개발환경 WSL2 + zsh로 갈아타기
tags:
  - WSL 2
  - zsh
  - Windows 10
  - terminal
  - nvm
_categories:
  - 개발노트
  - Front-End
thumbnail: /upload/2021/thumbs/wsl2-zsh-on-windws-10.jpg
hero: /upload/2021/wsl2-zsh-on-windws-10.jpg
style: |
  .hero {
    &-wrapper {
      text-shadow:
        1px 1px 1em rgba(20, 12, 24, 0.9),
        -1px -1px 2em rgba(20, 12, 24, 1);
    }
    &__image {
      opacity: 0.35
    }
  }
seo:
  description: |
    본격적으로 WSL + zsh 환경을 기본 환경으로 설정하기로 하고, 개인적으로 필요한 추가
    설정을 차후에 필요할까 기록으로 남겨둔다.
  image: /upload/2021/wsl2-zsh-on-windws-10.jpg
date: 2021-01-28 00:32:57
---


## 기존 환경

얼마 전까지만 해도 VS Code의 터미널을 git bash로 (이하 bash) 설정해서 5년 가까이 bash
상에서 CLI를 사용해왔다. (아! 참고로 나는 Windows 10 사용자다. 맥이었으면 진즉부터
terminal을 썼겠지...)

이 블로그 테마를 제작 후에 몇 번 mac이나 linux 환경에서 테마 설치 오류에 대한 이슈가
올라왔었고, 최근에 어떤 사이트를 번역하는데 해당 사이트 빌드가 bash 상에서는 정상적으로
이루어지지 않아 확인해보니 linux 상에서는 올바르게 빌드 되어 linux 환경에 대한 필요가
생겨났다.

결국 미루고 미루던 WSL 사용을 시도하기로 하고 반 년 정도를 이 방식으로 써 본 것 같다.
(미루고 미룬 이유는 Windows를 못믿어서... = _=a 항상 예기치 않은 오류를 만들어주는
 Windows ... )

무튼, 반 년 정도의 사용 경험에서는 크게 문제를 느끼지 못해서 이제 본격적으로 WSL + zsh
환경을 기본 환경으로 설정하기로 하고, 개인적으로 필요한 추가 설정을 차후에 필요할까 기록으로
남겨둔다. (안녕 bash~ 오래 동안 고마웠어 ㅠ)

## WSL 1 or WSL 2 ?

WSL을 쓰기로 한 시점에 결정해야 할 것 중 하나는 일단 WSL 1을 쓸 것인가 혹은 WSL 2를 쓸
것인가 같다. 물론, WSL 2 구성까지 해 두면 언제든지 원하는 시점에 WSL 1과 2를 오갈 수 있고
따라서 WSL 2 구성 방법으로 포스팅 해두기는 했다.

내 경우엔 2가지를 다 써봤는데, 써보고 난 이후에 드는 생각은 일단 내 경우에는 WSL 1을 쓰는
게 아직은 낫지 않을까 싶다. MS에서는 WSL 2가 더 빠르고 전체 리눅스 커널 사용, 시스템 호출
호환성 등을 장점으로 들고 있지만 생각보다 만나게 되는 장애물이 많았다.

일단 몇 가지 선택에 필요한 기준에 따라 나누어 보면,
기존의 Windows 시스템에서 이미 프로젝트가 구성되어 있고 (Node든 뭐 다른 것이든) 여기에
WSL을 통합하는 거라면 WSL 1을 추천한다.
반면 개발 환경을 새로 설정 하는 상황이나 새로 설정하는 것을 감안 할 생각이고, 리눅스 시스템에
거부감이 없다면 WSL 2가 나을 것 같다.

이렇게 나눈 이유는, WSL 2에서는

- Windows 파일 시스템(`/mnt/`)으로의 접근이 체감 될 만큼 느리다.
- Windows 파일 시스템에 이미 구성된 프로젝트의 경우, 파일 변경을 감지 하지 못하는 듯 하다.
  (Node의 watch 기능이 정상적으로 동작해주지 못한다. 파일 시스템이 다르니 당연한 것 같기는
  한데 처음에 무척 당황했다.)
- Windows에서 VS Code를 열고 터미널을 WSL로 사용할 때, Windows에서 연 브라우저가
  localhost에 접근이 잘 되지 않는다.

  Windows 전원 옵션에 "빨리 켜기 기능"을 꺼두면 localhost 포워딩이 된다고 하는데, 실제로
  해봤을 때 localhost가 두 개의 다른 포트로 열렸을 때 하나만 되더라...

내 경우는 이미 Windows 시스템을 기반으로 프로젝트들이 구성되어 있었고 WSL을 통합 해보는 거라
위의 문제들을 겪고 말았다 ㅋ

물론 내 케이스가 아니라면 WSL 2가 더 나을 것 같기는 하다.

## Windows Terminal 설치

Windows에는 기본적으로 terminal이 존재하지 않기 때문에, windows terminal을
[Store](https://www.microsoft.com/ko-kr/p/windows-terminal/9n0dx20hk701)에서
별도로 설치해야 한다.

![Windows Terminal on Store](/upload/2021/windows-store-terminal.jpg)

## WSL 활성화

자세한 내용은 [공식문서](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)를
참고하자.

터미널(혹은 파워쉘)을 관리자 권한으로 실행 후, 다음을 차례대로 실행 하면된다. (물론 '제어판
&gt; 프로그램 &gt; 프로그램 및 기능 &gt; Windows 기능 켜기/끄기' 에서 GUI로 해도 된다.)

```jsx
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

실행이 종료 되었으면 "재시작"하자.

일시적인 상황이었는지는 모르겠지만, 최초 이 설정을 할 때 재시작하지 않고 컴퓨터를 종료했다가
다음 날 켜서 설정을 계속 이어가려고 했더니 안되더라 = _=a

### WSL 2 업데이트

WSL 2를 사용하려면 적어도 Windows 10 May 2020 Update가 설치되어 있어야 한다. Windows
10 May 2020 Update에 실제 리눅스 커널을 사용하는 WSL 2가 기본 탑재 되었다고 한다.
그런데 좀 이상한게, Windows 10 최신 업데이트를 쓰고 있음에도 불구하고 WSL 2를 사용하려면
별도 패키지를 다운 받아서 설치하고, 추가 설정을 해야 한다. (아니 WSL 2를 기본으로 탑재했으면
WSL 2를 기본으로 사용할 수 있어야지 왜 WSL 1을 기본으로 잡아주고 있고... WSL 2를 쓰기 위해
추가 설치를 왜 해야 하는가...? )

[MS WSL 설명서 페이지](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package)로
가서 Linux 커널 업데이트 패키지 다운로드 후 설치한다.

![Linux 커널 업데이트 설치 화면](/upload/2021/wsl-update.jpg)

### WSL 기본 버전을 2로 설정

터미널(혹은 파워쉘)에서 다음 명령을 시행한다.

이걸 먼저 실행해야 이후로 설치되는 리눅스 시스템이 WSL 2를 기반으로 한다.

```powershell
wsl --set-default-version 2
```

## Ubuntu  설치

다시 [Store](https://www.microsoft.com/ko-kr/store/apps/windows)에서 Ubuntu를
검색해서 설치 한다. (물론 우분투 말고 다른 리눅스 프로덕트를 선택해도 된다. 단지 내가
Ubuntu가 익숙해서 그렇다~~고 하지만 어차피 터미널인데?~~)

![Windows Store Ubuntu 검색 결과](/upload/2021/windows-store-ubuntu.jpg)

하지만 이 놈은 어디까지나 "배포" 패키지이므로 설치 후 최초 실행해야 우분투 설치가 진행된다.
시간이 조금 걸리니 기다리자.

설치가 완료되면 다음과 같이 설치가 완료되었다는 메세지와 함께 웰컴 투 우분투가 노출된다

![우분투 설치 완료 화면](/upload/2021/complete-install-ubuntu.jpg)

### 터미널 기본 프로필 Ubuntu로 설정

터미널에서도 Ubuntu가 기본으로 실행되도록 터미널 기본 프로필을 WSL로 설정한다.

터미널에서 설정으로 들어가면 관련 json 파일이 열리는데, 여기서 `defaultProfile` 값을
`profiles.list` 에서 Ubuntu 것의 `guid` 값으로 수정하기만 하면 된다.

```json|data-line="2,11"
{
  "defaultProfile": "{2c4de342-38b7-51cf-b940-2309a097f518}",
  ...
  "profiles":
    {
      ...
      "list":
      [
        ...
        {
          "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
          "hidden": false,
          "name": "Ubuntu",
          "source": "Windows.Terminal.Wsl",
          "colorScheme": "Dark+",
          "fontFace": "Hack"
        }
      ]
    },
}
```

## Git, zsh 설치

Ubuntu(WSL)를 실행하고, git과 zsh부터 설치한다.

일단 패키지 레파지토리 인덱스부터 업데이트 하고

```bash
sudo apt update
```

git과 zsh을 설치

```bash
sudo apt install git zsh
```

## Oh my zsh 설치 및 구성

### 설치

터미널에서 다음 명령을 실행하기만 하면 된다.

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

설치가 완료되면 다음과 같은 메세지를 볼 수 있다.

![oh my zsh 설치 완료 화면](/upload/2021/complete-install-oh-my-zsh.jpg)

### 테마 구성

역시 처음 설치했드면 꾸미기가 먼저다!!! 테마부터 변경한다.

테마는 [ohmyzsh github wiki](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)에서
마음에 드는 걸 선택하면 될 것 같다. 내 경우엔 많이 언급되는 `agnoster`를 쓰기로...

`~/.zshrc` 파일을 열어 `ZSH_THEME` 항목의 값을 변경하기만 하면 된다.

```bash
vi ~/.zshrc
```

```ini
ZSH_THEME="agnoster"
```

참고로 `agnoster` 테마를 쓰려면 [powerline font](https://github.com/powerline/fonts)를
써야 하는데, 내 경우엔 이미 Hack 폰트를 쓰고 있어서 별도로 설치하지 않고 터미널 설정에서
`profile.list`의 해당 항목에 fontFamily 값만 추가하여 해결했다.

```json|data-line="6"
{
  "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
  "hidden": false,
  "name": "Ubuntu",
  "source": "Windows.Terminal.Wsl",
  "fontFace": "Hack"
}
```

### 터미널 color scheme 구성

편한 눈을 위해(?) 각 컬러에 대한 상세 값을 설정할 수 있고, 개별적으로 설정이 어렵다면 이미
구성된 scheme들이 [windowsterminalthemes](https://windowsterminalthemes.dev/)에서
제공되고 있으니 이를 참고해서 구성도 가능하다.

설정은 마찬가지로 터미널 설정에서 이루어지고, `schemes` 항목에 color scheme을 추가하고,
`profiles.list`의 해당 항목에 `colorScheme` 값을 추가 한 color scheme의 `name`
값으로 설정하면 된다.

```json|data-line="10,16"
"profiles" :{
  "list": [
    ...,
    {
      "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
      "hidden": false,
      "name": "Ubuntu",
      "source": "Windows.Terminal.Wsl",
      "fontFace": "Hack",
      "colorScheme": "Dark+"
    }
  ],
},
"schemes": [
  {
    "name": "Dark+",
    "black": "#000000",
    ...
    "background": "#0e0e0e",
    "foreground": "#cccccc"
  }
],
```

## zsh plugins 설치

조금 더 편한 zsh 사용을 위해 플러그인을 설치한다.

### [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

이 플러그인은 이전에 입력했던 명령을 기반으로 명령을 타이핑 할 때마다 자동 완성을 제공하고
방향키로 해당 자동 완성을 사용할 수 있게 해준다.

다음 명령으로 설치하고,

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

`~/.zshrc` 파일을 열어 `plugins` 항목에 `zsh-autosuggestions`를 추가해준다.

```ini
plugins=(git zsh-autosuggestions)
```

### [syntax highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/)

이 플러그인은 명령어에 구문 강조를 적용해준다.
구문 강조가 적용되면 좋은 것 중 하나는 특정 명령을 사용할 수 있으면 녹색으로, 설치 되지 않음
등의 이유로 알 수 없는 명령이면 빨간색으로 나타난다.

다음 명령으로 설치하고,

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

`~/.zshrc` 파일을 열어 `plugins` 항목에 `zsh-syntax-highlighting`을 추가해준다.

```ini
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

## 터미널 프롬프트 변경

터미널을 열면 다음 화면처럼 username@hostname 형태로 프롬프트가 나오는데, VS Code에서
터미널을 열고 작업하면 이 프롬프트가 차지하는 공간이 적지 않아 보기 불편하다.

다행히 이것마저도 변경하거나 감출 수 있다!!

![기본으로는 user name과 host name이 모두 노출된다](/upload/2021/terminal-prompt-full-name.jpg)

`~/.zshrc` 파일을 열고 다음을 추가하면

```ini
prompt_context() {}
```

프롬프트가 사라진다. 두둔!!

![프롬프가 사라지고 경로만 남았다](/upload/2021/terminal-prompt-hide-name.jpg)

참고로 다음과 같이 수정하면 user name과 경로만 노출된다.

```ini
prompt_context() {
    if [[ "$USER" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
      prompt_segment black default "%(!.%{%F{yellow}%}.)$USER"
    fi
}
```

### Named directory 구성

하지만 아직 `/mnt/c/Users/{user name}/` 이 거슬린다.
심지어 이게 디렉토리 깊이가 깊어지면 이 또한 너무 길어진다. 하여 이 마저도 줄여보기로 한다.

역시 마찬가지로 `~/.zshrc` 파일을 열어 다음을 참고하여 환경에 맞게 추가한다.

내 경우엔 `c:\Users\mulder21c\Project`와 `c:\Users\mulder21c\Workspace`이 주 사용
디렉토리라 이 디렉토리들에 대한 경로를 변경하기로 했다.

```ini
hash -d mulder21c=/mnt/c/Users/mulder21c
hash -d Project=/mnt/c/Users/mulder21c/Project
hash -d Workspace=/mnt/c/Users/mulder21c/Workspace
```

터미널을 다시 열어보면 다음과 같이 지정한 이름으로 표시된다. (단 앞에 `~`이 붙는다.)

![named directory를 적용하고 경로가 한결 간결해졌다](/upload/2021/terminal-named-directory.jpg)

이제야 터미널이 좀 간결해진 것 같다.

## nvm 설치

마지막으로 node.js 환경을 위해 nvm을 설치한다.

터미널에서 다음 명령을 주면 자동으로 설치가 진행된다.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

참고로, Windows에 nvm for windows가 설치되어 있다면 충돌로 설치가 진행되지 않는다. 내
경우엔 더 이상 Windows 시스템에서 node를 실행할 생각이 없어서 과감히 제거하고 설치했다.

설치가 완료되면 나타난 메세지 중에 다음과 같은 메세지가 있다.

```ini
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

이걸 복사해서 `~/.zshrc`에 추가해야 한다.

이후 node 설치는 nvm을 이용하면 된다.

### auto `nvm` use  설정

마지막으로 아직 테스트 해보지는 않았지만, 최근 Node 10.x, Node 14.x, Node 15.x를 각
환경으로 하는 프로덕트를 왔다 갔다 하다가 Node 버전 문제로 node-sass가 오류를 내뱉는 상황을
자주 만나게 되었다. `nvm use` 하는 걸 까먹기도 했고 현재 프로덕트가 어느 버전에서 돌려야
하는지도 까먹기 일수였다 ;;;

하여 구성하는 김에 `.nvmrc`를 이용해서 자동으로 `nvm use`가 적용되게 하는 설정을 추가했다.

다음의 코드를 `~/.zshrc`에 추가하면되는데, 아직 테스트해보진 않아서 잘 되는지는 모르겠다 = _=a
뭐... stackoverflow에서 건져온 건데 추천이 많았으니 잘 되겠지...? /=ㅁ=/

```ini
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```