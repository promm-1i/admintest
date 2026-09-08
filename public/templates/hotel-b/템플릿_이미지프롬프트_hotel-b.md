# 별하 호텔 (BYEOLHA · hotel-b) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/hotel-b/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. **표시 크기의 2배(레티나)** 로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 도심 부티크 호텔. 크림(#F4F0E6) 배경 · 골드(#8C6D3F) 포인트 · 짙은 갈색 잉크.
- 놋쇠, 호두나무, 크림색 리넨, 낮은 조도의 저녁 조명. **사람이 나오는 컷은 모두 한국인으로.**
- 카메라 24~50mm, 수직선 유지.
- 네거티브 공통: `text, watermark, logo, signage, fisheye, hdr, oversaturated, cluttered, cartoon`

## 영상 슬롯

| 파일 | 표시 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|
| hero.mp4 (+ hero-poster.jpg) | 1440×900 | 히어로 전면 | 8초 루프. 저녁 객실을 아주 천천히 밀고 들어가는 카메라. 커튼이 살짝 흔들리고 스탠드가 켜져 있음. 사람 없음. 전체적으로 어둡게 — 위에 흰 워드마크와 문구가 얹힙니다. |
| cta.mp4 (+ cta-poster.jpg) | 1150×648 | 영상 섹션 | 8초 루프. 침대와 창을 천천히 훑는 카메라. 중앙은 어둡게 — 흰 글자 자리입니다. |

## 사진 슬롯

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| phil-1.jpg | 450×556 | 900×1112 | 철학 좌측 사진 | Hotel room with a ceiling fan, cream bedding, gold wall sconces, tall curtains, warm afternoon light, 4:5. |
| phil-2.jpg | 450×556 | 900×1112 | 철학 우측 사진 | Suite living area with a coffered ceiling, cove lighting, oak floor, heavy curtains, 4:5. |
| why.jpg | 455×582 | 910×1164 | 머무름의 이유 가운데 사진 | Hotel lobby corridor with a large chandelier, marble floor with an inlaid pattern, red velvet seating, symmetric composition, 4:5. |
| host-1.jpg | 583×521 | 1166×1042 | 방식 1 · 곁에 있는 사람 | Korean hotel staff in a white shirt smoothing a bed, warm lamp light, rolled towels in the foreground, 9:8. |
| host-2.jpg | 583×521 | 1166×1042 | 방식 2 · 준비된 객실 | Neatly made bed with cream linen, side table with a small vase, morning light, 9:8. |
| host-3.jpg | 583×521 | 1166×1042 | 방식 3 · 편안함과 안전 | Quiet hotel corridor at night, warm floor-level lighting, room doors receding, 9:8. |
| host-4.jpg | 583×521 | 1166×1042 | 방식 4 · 유연한 일정 | Window seat with a low table, city lights beyond the glass at dusk, 9:8. |
| host-5.jpg | 583×521 | 1166×1042 | 방식 5 · 예약부터 체크아웃까지 | Reception desk in walnut and brass, a Korean receptionist seen from behind, 9:8. |
| room-1.jpg | 667×480 | 1334×960 | 객실 · 베가 스위트 | Classic suite with a city view at night, cream and gold palette, patterned carpet, armchair and ottoman, 7:5. |
| room-2.jpg | 667×480 | 1334×960 | 객실 · 알타이르 룸 | Contemporary room with a work desk, two framed prints above the bed, striped carpet, 7:5. |
| room-3.jpg | 667×480 | 1334×960 | 객실 · 안타레스 스위트 | Suite with floor-to-ceiling glass opening to palms and daylight, large landscape painting, 7:5. |
| room-4.jpg | 667×480 | 1334×960 | 객실 · 카펠라 킹 | Cream and gold panelled room with twin lamps, a tray of glasses on the bed, 7:5. |
| art-1 ~ art-3.jpg | 412×294 | 824×588 | 아티클 카드 3장 | (1) 커튼이 걷힌 밝은 객실, (2) 산이 보이는 대형 창의 스위트, (3) 침대 옆 스탠드가 켜진 저녁 객실. 모두 7:5. |
| ig-1.jpg / ig-3.jpg | 240×400 | 480×800 | 인스타 좌·우 기울어진 카드 | (1) 정원으로 열린 객실, (3) 샹들리에가 있는 스위트. 모두 3:5. |
| ig-2.jpg | 285×448 | 570×896 | 인스타 가운데 카드 | Arched window with warm stained glass, bed in the foreground, 5:8. |
| face-1.jpg | 100×100 | 200×200 | 후기 대표 얼굴 | 한국인 인물 정면 상반신, 밝은 회색 배경, 자연스러운 미소, 1:1. |
| av-1 ~ av-3.jpg | 50×50 | 100×100 | 히어로 평점 칩의 작은 얼굴 3개 | 한국인 인물 정면, 서로 다른 연령대, 밝은 배경, 1:1. |
| tface-1 ~ tface-5.jpg | 48×48 | 96×96 | 후기 하단 얼굴 5개 | 후기 본문의 정유진 · 김도현 · 이하늘 · 박세훈 · 최나린에 맞춘 한국인 인물 5명, 밝은 배경, 1:1. `face-1.jpg` 는 `tface-1` 과 같은 인물로 뽑아 주세요. |

## 그 밖의 파일
- `favicon.svg` — 골드 바탕에 별 하나(교체 시 같은 이름).
- `og.jpg` — 1280×960 공유 썸네일(사진 교체 후 1440 캡처로 다시 만드세요).
- 워드마크는 텍스트(`Byeolha` / `BYEOLHA`)입니다. 실제 로고가 있으면 그 자리를 이미지로 바꾸면 됩니다.
