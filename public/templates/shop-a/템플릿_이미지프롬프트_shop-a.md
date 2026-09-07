# shop-a 이미지 슬롯 프롬프트 (레퍼런스 실측 크기 — 생성은 표시 크기의 2배)

> 공통 접미(상품 사진): `clean e-commerce product photo, soft studio light, light grey seamless background #F2F1EF, centered, no text, no logo, no watermark, high detail`
> 2026-09-07 사용자 생성 사진 45장 설치 완료 — 용량을 위해 전부 `.webp` 로 변환해 넣었다(JPG q82 · 컷아웃 PNG q88 알파 유지). 표의 파일명은 원본 기준이고 실제 파일은 같은 이름의 `.webp`. 다시 교체할 때도 같은 크기로 만들어 `.webp` 로 저장하면 된다.

| 슬롯 | 파일 | 표시 크기 (1440) | 생성 크기 | 프롬프트 |
|---|---|---|---|---|
| 히어로 1 신발 컷아웃 | `assets/hero-shoe.png` | 701×602 (하늘색 배경 위, 우측) | 1402×1204 투명 PNG | Dark grey running sneaker floating at a dynamic angle with loose laces, product cutout, transparent background |
| 히어로 2 배경 | `assets/hero-couch.jpg` | 1440×500 cover | 2880×1000 | Grey fabric sofa with four cushions in a bright minimal living room, wide shot, soft daylight --ar 2.88:1 |
| 히어로 3 배경 | `assets/hero-car.jpg` | 1440×500 cover (위에 검정 40% 오버레이) | 2880×1000 | Black convertible coupe parked on a quiet street at dusk, cinematic wide shot --ar 2.88:1 |
| 카테고리 원 7개 | `assets/cat-1.png` ~ `cat-7.png` | 130×130 (원형 크롭, 색 배경) | 260×334 투명 PNG | 순서: 네이비 티셔츠 / 검정 와이드 팬츠 / 카키 봄버 재킷 / 새틴 슬립 원피스 / 접힌 크림색 잠옷 / 카멜 가죽 소파 / 액자 속 추상화. 각각 `product cutout, front view, transparent background` |
| 특가 상품 4 | `assets/deal-1.jpg` ~ `deal-4.jpg` | 335×240 (cover) | 774×1000 | 플리츠 미디 스커트 입은 모델 하반신 / 흰 세라믹 볼 / 검정 데스크 램프 / 금빛 추상 액자 |
| 바지 4 | `assets/pants-1.jpg` ~ `pants-4.jpg` | 335×240 (cover) | 774×1000 | 카키 치노 / 검정 조거 / 청바지 / 검정 와이드 슬랙스 — 모두 flat lay, top view |
| 여성 배너 배경 | `assets/women-banner.jpg` | 1400×300 (cover, 사진 높이 497) | 2800×994 | Woman with curly hair in a black sleeveless top, upper body, light grey studio wall, room on the left for text --ar 2.82:1 |
| 여성 상품 5 | `assets/women-1.jpg` ~ `women-5.jpg` | 264×200 (cover) | 774×1000 | 접힌 크림 리넨 셔츠 / 민트 라운지 쇼츠 / 흰 코튼 탑 / 진청 데님 / 크림 니트 가디건 — flat lay |
| 트렌딩(메가메뉴) | `assets/trend-1.jpg` | 199×240 (cover) | 774×1000 | Light oak wooden coffee table, studio |
| 배너 카드 1 컷아웃 | `assets/banner-pajama.png` | 392×480 (라일락 카드 우측) | 784×960 투명 PNG | Stack of folded pale pink pajama shirts, product cutout, transparent background |
| 배너 카드 2 컷아웃 | `assets/banner-couch.png` | 432×432 (피치 카드 우측) | 864×864 투명 PNG | Cognac leather two-seat sofa, three-quarter view, product cutout, transparent background |
| 후기 아바타 4 | `assets/avatar-1.jpg` ~ `avatar-4.jpg` | 24×24 원형 | 96×96 | 자연광 인물 헤드샷 4종 (남/여/여/남) |
| 홈웨어 캐러셀 5 | `assets/home-1.jpg` ~ `home-5.jpg` | 297×374 (cover) | 594×748 | 검정 플로어 램프 / 추상 액자 / 베이지 다이닝 체어 / 진녹색 쿠션 / 카멜 가죽 소파 — 밝은 스튜디오 |
| 소셜 타일 8 | `assets/insta-1.jpg` ~ `insta-8.jpg` | 300×300 (r16) | 600×600 | 인스타그램 피드 느낌의 라이프스타일 정사각 사진 8종(착장·인테리어·디테일 컷) |
| 팝업 사진 | `assets/popup.jpg` | 400×480 (cover) | 800×960 | Living room corner with orange armchair, plants and a round mirror, warm daylight --ar 5:6 |

- 로고는 텍스트("LOFTMART"), 아이콘은 인라인 SVG, 결제 로고는 단순화한 SVG 배지 — 사진 파일 외에는 교체할 것이 없다.
- 상품명·가격·문구는 `index.html` 에서 바로 바꾼다. 카운트다운은 스크립트가 로드 시점 +30일로 계산한다.
