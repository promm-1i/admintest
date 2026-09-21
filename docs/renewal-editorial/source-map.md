# NOVERIQ 원본 대응표

작성일: 2026-09-20  
대상: `/renewal-editorial/*`  
단일 기준 원본: `https://spot.wooribank.com/pot/Dream?withyou=bp`

## 메인 페이지

| NOVERIQ 구간 | 우리은행 원본 | 적용한 구조·동작 |
|---|---|---|
| 헤더 | `header.header` | 흰색 110px 헤더, 중앙 메뉴, 우측 강조 버튼·언어·메뉴 버튼 |
| 첫 화면 | `.greeting` | 화면 높이형 둥근 미디어, fade 전환 문구, 3초 자동 전환, PAUSE/PLAY |
| 첫번째 화면 | `.first-intro` | 160px급 그라데이션 제목, 링크 3개, 떠 있는 미디어와 빛 번짐 |
| 이야기 3개 | `.first-stories` | 세로 카드 3개, 진입 전 600px/진입 후 320px(1440), 2초 높이 전환 |
| 지금 우리는 | `.now` | 150vh 트랙, 100vh sticky, 확대되며 나타나는 전폭 이미지 |
| 가치 카드 | `.now-value` | 3열 150% 세로 카드, 순차 scale·rotateX·translateY 전환 |
| 소식 목록 | `.latest` | 카드가 아닌 4개 선형 행, hover 시 파란색 면 전환 |
| 미래·문의 | `.tomorrow`, `.recruit` | 청록 그라데이션, 큰 제목 fade, 중앙 문구 scale, 유리 카드 3개, 문의 블록 |
| 푸터 | `footer.footer` | 20px 외곽 여백, 회색 라운드 패널, 5열 메뉴와 하단 정보 |

## 반응형 대응

| 구간 | 768px | 모바일 검수 창 |
|---|---|---|
| 헤더 | 56px, 데스크톱 메뉴 숨김 | 동일 |
| 첫 화면 | `100svh - 55px` | 동일 |
| 이야기 카드 | 600px, 간격 174px | 600px, 간격 174px |
| 지금 우리는 | 150vh sticky | 150vh sticky |
| 가치 카드 | 320×480 세로 3개 | 가용 폭×150% 세로 3개 |
| 소식 행 | 119px 4개 | 전체 915px, 4등분 |
| 미래 카드 | 400×264 세로 3개 | 가용 폭×202px 세로 3개 |
| 푸터 | 554px | 573px |

## 서브페이지

원본의 정보 상세페이지 구조를 기준으로 제목 중앙 정렬, 큰 둥근 비주얼, 긴 여백, 비대칭 본문과 선형 목록을 적용했다. NOVERIQ 경로와 데이터는 유지한다.

- `/website/process`, `/website/price`, `/website/features`, `/website/maintenance`
- `/services/custom`, `/services/admin-system`, `/services/inquiry-reservation`, `/services/search-filter`
- `/services/content-management`, `/services/database-api`, `/services/responsive`, `/services/seo`
- `/web-solutions`, `/templates`, `/samples`, `/samples/:slug`
- `/contact`, `/notices`, `/notices/:id`, `/faq`

## 유지한 NOVERIQ 요소

- 회사명, 연락처, 가격, 사례 데이터와 내부 경로
- 기존 프로젝트 이미지와 영상
- 문의·공지·FAQ의 실제 기능

우리은행 로고, 문구, 사진과 고유 자산은 복사하지 않았다.
