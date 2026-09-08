# 고요재 (GOYOJAE · hotel-d) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/hotel-d/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. **표시 크기의 2배(레티나)** 로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 강원 대관령 해발 800m 산장. 어두운 숲 색(#081612) · 크림(#F3EFE6) · 구릿빛(#B78A63) 과 어울리는 색.
- 저채도, 안개, 젖은 돌, 그을린 원목, 리넨. 사람은 거의 없거나 뒷모습.
- 카메라 24~35mm, 수직선 유지, 해 뜨기 직전 또는 해 진 직후.
- 네거티브 공통: `text, watermark, logo, signage, people facing camera, fisheye, hdr, oversaturated, cluttered, cartoon`

## 슬롯 표

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| hero.jpg | 1440×780 | 2880×1560 | 히어로 전면(위에 흰 세리프 대형 문장) | Mountain suite interior at dusk, floor-to-ceiling window framing a fog-filled valley and conifer ridge, warm walnut floor, tan leather armchair, low linen bed, one warm lamp, 16:9. **왼쪽 아래 1/3은 어둡게** — 흰 글자 자리입니다. |
| room-1.jpg | 918×650 | 1836×1300 | 객실 1 · 파노라마 스위트(큰 카드) | Panorama suite with a stone bench, wide glass wall opening onto misty mountains, oak floor, leather bench at the foot of the bed, soft overcast light, 7:5. |
| room-2.jpg | 360×260 | 720×520 | 객실 2 · 포레스트 스튜디오 | Compact studio with a leather armchair beside a large window looking into fir trees, pale stone wall, 7:5. |
| room-3.jpg | 360×260 | 720×520 | 객실 3 · 고요재 레지던스 | Wide residence living room, low sofa, stone counter, mountain view through full-height glass, 7:5. |
| spa.jpg | 1440×760 | 2880×1520 | 온천 사우나 전면 | Indoor-outdoor thermal pool at blue hour, steam rising over still water, stone wall on the left, dark timber ceiling, forested ridge and low cloud beyond, 16:9. **아래 1/3 어둡게.** |
| dining.jpg | 835×720 | 1670×1440 | 다이닝 좌측 전면 | Warm restaurant interior at night, linen-topped tables, candle lanterns, wall sconces, dark timber beams, window reflecting the valley, 7:6. |
| cta.jpg | 1440×660 | 2880×1320 | 예약 섹션 전면(중앙에 흰 글자) | Low stone-and-timber lodge seen from below at sunrise, mist between mountain peaks behind, wild grass in the foreground, warm windows glowing, 22:10. **중앙을 어둡게** — 흰 글자 자리입니다. |

## 그 밖의 파일
- `favicon.svg` — 어두운 숲색 바탕에 산 능선 + 점(교체 시 같은 이름).
- `og.jpg` — 1280×960 공유 썸네일(사진 교체 후 1440 캡처로 다시 만드세요).
- 워드마크는 텍스트(`GOYOJAE`)입니다. 실제 로고가 있으면 그 자리를 이미지로 바꾸면 됩니다.
