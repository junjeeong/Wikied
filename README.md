## 지인의 위키를 작성하고 공유하는 플랫폼 Wikid!!
<img width="821" alt="스크린샷 2025-04-28 오후 3 01 54" src="https://github.com/user-attachments/assets/d01613be-510d-4c18-9cf9-d82ebb022bd6" />


## 💁‍♂️ 소개
Wikied는 위키나무를 벤치마킹해 제작한 사이드 프로젝트입니다.<br/>
나의 위키를 지인이 마음대로 수정할 수 있지만, 주인이 설정한 퀴즈에 정답을 맞추어야 가능하다는 점에서<br/>
지인과의 친밀도가 얼마나 높은지 테스트할 수 있는 친분의 장으로 활용하면 좋습니다.

- 제작기간: 24.10.18 ~ 24.11.05
- 제작 인원: FE 4명

## 👥팀원
| 정준영 | 전상민 | 김진 | 김원 | 
| :---: | :---: | :---: | :---: |
|<img src="https://avatars.githubusercontent.com/u/81373171?v=4" width="100" height="100">|<img src="https://avatars.githubusercontent.com/u/174448906?v=4" width="100" height="100">|<img src="https://avatars.githubusercontent.com/u/159109607?v=4" width="100" height="100">|<img src="https://avatars.githubusercontent.com/u/173790047?v=4" width="100" height="100">|
|<a href="https://github.com/junjeeong">junjeeong</a>|<a href="https://github.com/venise5224">junjeong</a>|<a href="https://github.com/jjeankim">jjeankim</a>|<a href="https://github.com/DrowsyzzZ">DrowsyzzZ</a>|

## 🛠️기술스택
<img src="https://github.com/user-attachments/assets/4eeacf3f-e690-43b3-aa52-18c8646497a5" width="12%" height="12%">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/6266651b-3fe4-4dcb-ae77-1c05da773eac" width="14%" height="14%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img width="144" height="144" src="https://img.icons8.com/color/96/javascript--v1.png" alt="javascript--v1"/> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/7fbce4f3-dbf9-42ea-abd5-34fea333eeff" width="12%" height="12%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/bc73becf-117b-473c-ac99-25e7076f54f6" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/6d770581-15e8-405e-81d3-7e0e7451a2f2" width="12%" height="12%"> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/c35c92b2-2070-4196-8964-c84864fae752" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/00d84e07-3e18-4a82-b147-bd0d4330f350" width="10%" height="10%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/user-attachments/assets/3d567d52-2883-450b-ac3f-d124bbc79689" width="9%" height="9%"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" width="12%" height="12%">

## 🏁 기능
1. 로그인/회원가입 페이지
- 유효한 이메일과 비밀번호를 입력하고 '로그인' 버튼을 클릭하면 `/` 페이지로 이동합니다.
- 비밀번호가 틀릴 경우 “비밀번호가 일치하지 않습니다.” 경고 창을 보여줍니다.
- 이메일 input에서 focus out 일 때, 값이 이메일 형식이 아닐 경우 input에 빨강색 테두리와 아래에 “이메일 형식으로 작성해 주세요.” 빨강색 에러 메세지가 보입니다.
- 비밀번호 input에서 focus out 일 때, 비밀번호 길이가 8자 미만일때 input에 빨강색 테두리와 아래에 “8자 이상 작성해 주세요.” 빨강색 에러 메세지가 보입니다.
- 로그인 성공시 엑세스 토큰이 발급됩니다. 이후 /login 페이지로 이동합니다.
- 이름 Input에서 focus out 일 때, 값이 열 자 이하가 아닐 경우 이름 input에 빨간색 테두리와 아래에 “열 자 이하로 작성해주세요.” 빨간색 에러 메세지가 보입니다.
- 이메일 input에서 focus out 일 때, 값이 이메일 형식이 아닐 경우 이메일 input에 빨강색 테두리와 아래에 “이메일 형식으로 작성해 주세요.” 빨강색 에러 메세지가 보입니다.
- 비밀번호 input에서 focus out 일때 비밀번호 input 값 길이가 8자이상이 아닐 경우 비밀번호 input에 빨간색 테두리와 아래에 “8자 이상 입력해주세요.”  빨강색 에러 메세지가 보입니다.
- 비밀번호 확인 input에서 focus out 일 때 비밀번호 input 값과 비밀번호 확인 input 값이 다를 경우 비밀번호 확인 input에 빨간색 테두리와 아래에 “비밀번호가 일치하지 않습니다.”  빨강색 에러 메세지가 보입니다.
- 활성화된 '가입하기' 버튼을 누르면 “가입이 완료되었습니다” alert 창을 보여주고 `/login` 페이지로 이동합니다.
2. 계정 설정 페이지
- 새 비밀번호 확인 input에서 focus out 일 때 새 비밀번호 input 값과 새 비밀번호 확인 input 값이 다를 경우 새 비밀번호 확인 input에 빨간색 테두리와 아래에 “비밀번호가 일치하지 않습니다.”  빨강색 에러 메세지가 보입니다.
- '변경하기'를 클릭하면 비밀번호가 변경됩니다.
- 질문과 답을 입력한 후 '생성하기'를 클릭하면 내 위키가 생성됩니다.
3. 내 위키 페이지
- '위키 참여하기' 버튼을 클릭하면 퀴즈 모달창이 나타납니다.
- 모달창의 정답을 맞추면 수정 가능 상태로 변경됩니다.
- 정답과 다르면 수정할 수 없습니다.
- 내 위키에 한해서 인적사항 [ 프로필 사진, 거주도시, MBTI, 직업, SNS, 생일, 별명, 혈액형, 국적]이 변경 가능합니다.
- 위키 내용 수정이 가능합니다.
- 5분 동안 수정이 가능하고, 5분 을 초과하면 “5분 이상 글을 쓰지 않아 접속이 끊어졌어요.” 모달창이 나타납니다.
- 확인을 누르면 수정 상태가 취소됩니다.
- '링크' 버튼을 누르면 내 위키에 참여할 수 있는 링크가 복사됩니다.
4. 위키 상세 페이지
- '위키 참여하기' 버튼을 클릭하면 퀴즈 모달창이 나타납니다.
- 모달창의 정답을 맞추면 수정 가능 상태로 변경됩니다.
- 내 위키가 아니면 [ 프로필 사진, 거주도시, MBTI, 직업, SNS, 생일, 별명, 혈액형, 국적]이 변경이 불가능합니다.
- 위키 내용은 수정이 가능합니다.
- 5분 동안 수정이 가능하고, 5분 을 초과하면 “5분 이상 글을 쓰지 않아 접속이 끊어졌어요.” 모달창이 나타납니다.
- 확인을 누르면 수정 상태가 취소됩니다.
- '링크' 버튼을 누르면 현재 위키에 참여할 수 있는 링크가 복사됩니다.
5. 위키 목록 페이지
- 위키 카드를 누르면 해당 위키 페이지로 이동합니다.
- 링크를 누르면 해당 위키 링크가 복사됩니다.
6. 나의 위키 갱신 알람
- '알림 아이콘' 버튼을 누르면 내 위키의 수정된 내역을 확인할 수 있습니다.
- 각 알림 'X' 버튼을 누르면 알림은 삭제됩니다
7. 자유게시판 목록 페이지
- 만들어지 게시물을 모두 보여줍니다.
- 베스트 게시글은 좋아요가 높은 순으로 보여줍니다
- 원하는 검색어를 입력하고 '검색' 버튼을 누르면 제목에 검색어의 일부가 포함되면 검색됩니다,
- 원하는 게시물을 클릭하면 게시물 상세 페이지로 이동합니다
8. 게시물 등록 페이지
- '목록으로' 버튼을 누르면 “/boards”페이지로 이동합니다.
- 값을 입력하고 '등록하기' 버튼을 누르면 게시물이 등록됩니다.
- 등록된 “/boards/{boardId}” 게시물 상세 페이지로 이동합니다.
9. 게시물 상세 페이지
- '목록으로' 버튼을 누르면 “/boards”페이지로 이동합니다.
- 내가 작성한 게시글에 대해서 ‘수정하기’ 버튼을 누르면 게시글을 수정할 수 있습니다.
- 내가 작성한 게시글에 대해서 ‘삭제하기’ 버튼을 누르면 게시글을 삭제할 수 있습니다.
- 해당 게시글에 댓글을 등록할 수 있습니다.
- 내가 작성한 댓글에 대해서 수정하기 버튼을 누르면 게시글을 수정 할 수 있습니다.
- 내가 작성한 댓글에 대해서 ‘삭제하기’ 버튼을 누르면 게시글을 삭제할 수 있습니다.

## 미리보기
[랜딩페이지]
https://github.com/user-attachments/assets/843e73bd-1681-4c51-98f7-a40aa3090c71

[로그인/회원가입]
https://github.com/user-attachments/assets/e43b2247-5059-4662-86f8-1fa0fe45f4c8


[위키 목록 페이지]
https://github.com/user-attachments/assets/3f57f4e6-53b6-4518-a2f3-560fb42040c2

[자유 게시판 페이지]
https://github.com/user-attachments/assets/cd372ecb-6af7-4c21-a785-82aca89073e1

[나의위키/설정 페이지]
https://github.com/user-attachments/assets/32d4518c-01ae-4ee3-b9f5-b994a6fff177


