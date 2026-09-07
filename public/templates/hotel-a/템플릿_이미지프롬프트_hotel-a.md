# hotel-a (세레인 호텔 앤 리조트) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/hotel-a/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. 표시 크기의 2배(레티나)로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 유럽식 부티크 호텔 · 따뜻한 자연광 · 크림/아이보리(#FBF9EA)와 남색(#041027) 포인트 · 여유롭고 조용한 분위기 · 로고/글자 없음.
- 카메라: 35~50mm, 자연광, 살짝 따뜻한 화이트밸런스. 과한 HDR · 채도 금지. 인물은 한국인 30~40대 커플/여성.
- 네거티브 공통: `text, watermark, logo, extra fingers, distorted face, blurry, cartoon, oversaturated`

## 슬롯 표

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| hero.mp4 (+ hero.jpg 포스터) | 1440×900 | 2880×1800 · 6~12초 루프 | 히어로 전면 영상(어둡게 40% 덮임) | Cinematic slow-motion of a well-dressed Korean couple walking hand in hand across a sunlit historic European plaza in front of a cathedral, late afternoon light, camera slowly pushing in, 16:9. 영상이 없으면 같은 구도의 사진을 hero.jpg 로만 넣어도 됩니다(포스터로 표시). |
| about-1.jpg | 393×704 | 786×1408 | 소개 좌측 세로 사진(모바일에서는 남색 덮개 아래 배경) | Hotel breakfast table by a marble window: croissants, coffee, fresh fruit on white plates, warm morning light, 9:16 portrait. |
| about-2.jpg | 393×704 | 786×1408 | 소개 우측 세로 사진 | Minimal hotel bedroom with wood-panel wall, white linen bed, a small tree by the window, soft light, 9:16 portrait. |
| room-1.jpg | 602×602 | 1204×1204 | 객실 가운데 큰 사진(위에 THE VISTA RESIDENCE 글자가 걸침) | City-view suite living room with floor-to-ceiling windows, white bed, dark rug, warm ceiling lights, 1:1. |
| room-2.jpg | 502×502 | 1004×1004 | 객실 왼쪽(화면 밖으로 잘림) | Infinity pool villa at sunset overlooking the sea, wooden deck, 1:1. |
| room-3.jpg | 502×502 | 1004×1004 | 객실 오른쪽(화면 밖으로 잘림) | Terrace suite with glass railing and sea view, lounge chairs, morning light, 1:1. |
| exp-1.jpg | 660×990(세로) | 1320×1980 | 경험 01 Taste & Dine (닫힘 227×704 / 열림 660×497 크롭) | Traditional tea and breakfast set on a wooden tray, ceramic teapot, soft window light, 2:3 portrait, subject centred. |
| exp-2.jpg | 660×990 | 1320×1980 | 경험 02 Wellness & Rituals (기본 열림) | Korean woman in sage-green yoga wear meditating on a mat in a bright hotel room, candle beside, 2:3 portrait. |
| exp-3.jpg | 660×990 | 1320×1980 | 경험 03 Explore & Discover | Woman in a straw hat reading a paper map in an old stone alley, 2:3 portrait. |
| exp-4.jpg | 660×990 | 1320×1980 | 경험 04 Slow Moments | Couple relaxing on a sofa laughing, warm evening light, 2:3 portrait. |
| t-1 ~ t-4.jpg | 130×130 | 260×260 | 후기 왼쪽 프로필(남·여·남·여) | 정면 상반신 포트레이트, 단색 배경, 1:1. |
| ts-1 ~ ts-4.jpg | 207×207 | 414×414 | 후기 오른쪽 사진 | 호텔 공간 디테일(로비 조형물 · 라운지 · 바 · 정원) 1:1. |

## 그 밖의 파일
- `favicon.svg` — 남색 바탕에 이탤릭 S(교체 시 같은 이름).
- `og.jpg` — 1280×960 공유 썸네일(사진 교체 후 1440 캡처로 다시 만드세요).
- 로고는 `index.html` 안의 `#i-logo` SVG 심볼(글자 로고)입니다. 실제 로고가 있으면 그 심볼 내용을 교체하세요.
