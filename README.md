# Pattern Games

## Server

- 사용한 언어 : JS, Nodejs, Express
- DB : Mysql 8.0

### Server API

- REST API

  - Pattern

    > #### Pattern을 추가, 변경, 삭제하는 API
    >
    > type ( 3 x 3 인지, 4 x 4 인지를 입력 ), stage number, pattern 등을 입력받아
    > 새로운 패턴을 DB에 넣거나, 특정 stage를 삭제, 수정이 가능하다.

  - List

    > #### Pattern API를 Page의 형태로 구현하기 위한 API
    >
    > 관리자가 새로운 Pattern을 넣거나 난이도 이슈로 stage 순서를 변경, pattern을 변경 하는 등의 수정사항이 생기면 웹 페이지에서 간단한 입력과 버튼 클릭으로 API를 호출할 수 있도록
    > 만든 API.  
    > Web Page에 접속해서 관리자 계정으로 로그인하면 모든 stage pattern 정보와 일일 챌린지 패턴 내용을 수정할 수 있다.
    >
    > <img src=https://user-images.githubusercontent.com/68819204/149920529-906f0cb7-a70a-4ad1-b756-38ee0f30d33c.png width = "70%">

  - Ranking
    >
  - Admin
  - Public

## App

- 사용한 언어 : React-native, Expo
- Pattern, Svg, expo-av 등의 module 사용

### 게임 구성

- #### 게임 모드
- #### 리더 보드
- #### 오늘의 패턴
- #### 힌트

<p align="center">
<img src="/images/스테이지.png"></img>
</p>
<p align="center">
<img src="/images/44스테이지.png"></img>
</p>
<p align="center">
<img src="/images/스테이지모드선택.png"></img>
</p>
<p align="center">
<img src="/images/일반모드.png"></img>
</p>
