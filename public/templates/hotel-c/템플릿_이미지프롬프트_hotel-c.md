# 하람 호텔 (HARAM · hotel-c) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/hotel-c/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. **표시 크기의 2배(레티나)** 로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 남해안 부티크 호텔. 흰 회벽 · 테라코타 · 올리브 · 원목 · 리넨. 밝고 건조한 지중해풍 볕.
- 배경은 흰색과 rgb(242,242,242) 면 위에 놓입니다. 사진은 따뜻하되 과하지 않게.
- 카메라 28~50mm, 정오 직전 또는 늦은 오후.
- 네거티브 공통: `text, watermark, logo, signage, crowds, fisheye, hdr, oversaturated, cluttered, cartoon`

## 슬롯 표

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| hero.jpg | 1440×900 | 2880×1800 | 히어로 전면(아래에 흰 대형 워드마크) | Boutique hotel pool terrace facing the sea, palm trees, white parasols, wooden pergola bar, turquoise water, warm plaster walls, midday, 8:5. **아래 1/3은 단순하게** — 흰 워드마크 자리입니다. |
| dine-1.jpg | 565×739 | 1130×1478 | 다이닝 카드 1 · 바 메뉴(앰버) | Hotel bar interior with rattan pendant lights, timber ceiling, tiled counter, bar stools, a painting on the wall, warm daylight from a side window, 3:4. |
| dine-2.jpg | 565×739 | 1130×1478 | 다이닝 카드 2 · 레스토랑(그로브) | Warm restaurant interior at dusk, dark wood shelving with bottles and ceramics, linen curtains, wooden chairs, 3:4. |
| esc-1.jpg | 300×300 | 600×600 | 휴식 목록 1 · 쉼 | Terracotta courtyard with potted plants, a small round table and chairs, whitewashed steps, 1:1. |
| esc-2.jpg | 300×300 | 600×600 | 휴식 목록 2 · 식사 | Outdoor dining terrace under a timber pergola overlooking the sea, 1:1. |
| esc-3.jpg | 300×300 | 600×600 | 휴식 목록 3 · 산책 | Narrow village lane with ochre buildings, stone paving, plants on balconies, 1:1. |
| esc-4.jpg | 300×300 | 600×600 | 휴식 목록 4 · 숙면 | Guesthouse exterior with an orange-tiled roof, vine-covered pergola, evening light, 1:1. |
| room-1.jpg | 565×390 | 1130×780 | 객실 1 · 더블 디럭스 | Arched-alcove bedroom, white plaster walls, dark timber beams, patterned rug, two bedside lamps, 3:2. |
| room-2.jpg | 565×390 | 1130×780 | 객실 2 · 주니어 스위트 | Bright suite with a stone accent wall, two windows, a small sofa and desk, timber ceiling, 3:2. |
| room-3.jpg | 565×390 | 1130×780 | 객실 3 · 패밀리 스위트 | Large family room with an arched doorway, chandelier, two armchairs, tall linen curtains, terracotta floor, 3:2. |
| offer-1.jpg | 333×220 | 666×440 | 특별 요금 1 · 주말 리트릿 | Indoor spa pool under stone arches, timber ceiling, loungers beside the water, 3:2. |
| offer-2.jpg | 333×220 | 666×440 | 특별 요금 2 · 서머 이스케이프 | Sunlit courtyard with large terracotta pots, a white daybed, whitewashed arcade, 3:2. |
| sign.jpg | 110×44 | 220×88 | 총지배인 편지 서명 | 흰 배경에 검은 손글씨 서명 한 줄(이름은 읽히지 않아도 됩니다). 배경 완전 흰색, 5:2. |

## 그 밖의 파일
- `favicon.svg` — 짙은 초록(#1C3D2D) 바탕에 반달 링(교체 시 같은 이름).
- `og.jpg` — 1280×960 공유 썸네일(사진 교체 후 1440 캡처로 다시 만드세요).
- 워드마크와 브랜드 표시는 텍스트(`HARAM` / `하람`)입니다. 실제 로고가 있으면 그 자리를 이미지로 바꾸면 됩니다.
