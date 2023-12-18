# Back office
견과유 프로젝트

# 프로젝트 소개
강아지를 사랑하는 펫시터들과 고객들의 교류를 도와주는 웹사이트

# 개발 기간
23.12.12일 ~ 23.12.18일

# 기술 스택

backend - Node.js, Express.js, Sequelize, Mysql, Aws S3
frontend - html, css, javascript
deployment - AWS
version control - Git

# API

#### 펫시터

펫시터에게 등록된 예약 목록 확인
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/book.controller.js#L6-L17

펫시터에게 등록된 리뷰 목록 확인
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L19-L31

#### 고객

본인이 등록한 예약 내역 확인
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/book.controller.js#L31-L42

본인이 작성한 리뷰 목록 확인
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L82-L96

#### 예약(고객)

날짜를 선택하고 요구사항을 입력해 예약 등록
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/book.controller.js#L44-L70
예약 삭제 기능
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/book.controller.js#L72-L92

#### 리뷰

본인이 등록한 예약에 대해 리뷰 작성
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L98-L148
예약 삭제시 리뷰도 같이 삭제
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L199-L233
리뷰 수정 기능
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L150-L197
리뷰 삭제 기능 
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L199-L233

#### 유저프로필

유저 정보 확인 가능
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/user.controller.js#L13-L44
회원탈퇴 기능
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/user.controller.js#L82-L95

#### 회원가입/로그인

jwt를 통해 구현
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/middlewares/authMiddleware.js#L7-L27
회원가입시 aws s3를 통해 이미지 업로드 구현

회원가입시 고객/펫시터 선택 가입 기능
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/auth.controller.js#L9-L36

#### 평점

리뷰 등록시 평점 작성
https://github.com/wlduq0150/pet_care/blob/64c3090969c9e27570e8e50cff447f2fc1402c37/src/controllers/review.controller.js#L125-L130
펫시터 조회시 평균 평점 계산
https://github.com/wlduq0150/pet_care_front/blob/604416ae3aeb7b407bb97fca30efc95700e10fb6/js/sitterProfile.js#L42-L47
