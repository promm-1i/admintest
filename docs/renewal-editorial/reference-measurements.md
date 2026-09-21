# 우리은행 원본 실측 기록

원본: `https://spot.wooribank.com/pot/Dream?withyou=bp`  
측정일: 2026-09-20

## 1440×900

- 문서 9,630px (2026-09-20 재측정. 이전 기록 9,623px 은 폐기)
- 헤더 110px, 첫 화면 791px
- 첫번째 화면 3,154px: intro 814px, story 600px×3
- story 간격 20px, 하단 여백 500px
- 지금 우리는 1,350px(150vh)
- 가치 카드 633px, 앞 간격 160px
- 제작 안내 744px, 앞 간격 200px
- 미래·문의 1,373px, 앞 간격 178px
- 푸터 752px

## 768×900

- 문서 10,174px
- 헤더 56px, 첫 화면 845px
- 첫번째 화면 3,088px: intro 690px, story 600px×3, 간격 174px, 하단 250px
- 지금 우리는 1,350px
- 가치 카드 320×480px×3, 간격 20px, 전체 1,480px
- 제작 안내 601px: 제목 94px, 제목 아래 32px, 행 119px×4
- 미래·문의 1,891px: 카드 400×264px×3, 간격 20px
- 푸터 554px

## 모바일 동일 창 비교

- 문서 11,806px
- 헤더 56px, 첫 화면 1,527px
- 첫번째 화면 3,002px: intro 604px, story 600px×3, 간격 174px, 하단 250px
- 지금 우리는 2,373px(150vh)
- 가치 카드 266×399px×3, 간격 20px, 전체 1,237px
- 제작 안내 1,041px: 제목 94px, 행 목록 915px
- 미래·문의 1,687px: 카드 266×202px×3
- 푸터 573px

원본 CSS/JS에서 확인한 핵심 값은 `Swiper fade`, `speed:1000`, `autoplay.delay:3000`, `IntersectionObserver threshold 0.5`, 가치 카드 threshold 0.2다.

