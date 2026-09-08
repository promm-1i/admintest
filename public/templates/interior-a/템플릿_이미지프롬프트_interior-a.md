# interior-a (여백 · yeobaek) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/interior-a/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. 표시 크기의 2배(레티나)로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 절제된 건축 스튜디오 · 자연광 중심 · 회색 콘크리트와 원목, 라임스톤 · 채도 낮게 · 사람은 거의 없음 · 로고와 글자 없음.
- 카메라: 24~35mm 광각, 수직선이 기울지 않게(원근 보정), 삼각대 느낌의 정적인 구도.
- 네거티브 공통: `text, watermark, logo, people, distorted perspective, fisheye, hdr, oversaturated, cluttered, cartoon`

## 슬롯 표

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| hero.jpg | 1420×1250 | 2840×2500 | 히어로 전면(위에 대형 워드마크가 흰 글씨로 얹힘) | Wide interior of a minimalist concrete lobby with a large circular opening, curved white walls, warm sunlight raking across a polished floor, deep shadows, architectural photography, 9:8. 화면 위쪽 절반은 밝고 단순하게(흰 워드마크가 올라갑니다). |
| studio.jpg | 193×271 | 386×542 | 소개 좌측 세로 사진 · 히어로 카드 안 작은 사진 | Black and white photo of a modern concrete building facade seen from below, strong diagonal lines, 3:4 portrait. |
| proj-1.jpg | 1420×900 | 2840×1800 | 시공 사례 1 · 한남 레지던스 | Warm residential living room with stone wall, linen sofa, oak floor, floor-to-ceiling window with sheer curtains, late afternoon light, 16:10. |
| proj-2.jpg | 1420×900 | 2840×1800 | 시공 사례 2 · 애월 스테이 | Bright white atrium with curved balconies and a large skylight, monumental geometry, 16:10. |
| proj-3.jpg | 1420×900 | 2840×1800 | 시공 사례 3 · 성수 오피스 | Dark office lounge with steel details, black metal frames, linear lighting strips, moody atmosphere, 16:10. |
| craft-1.jpg | 400×520 | 800×1040 | 강점 01 재료 | Close-up of a solid walnut table edge and grain, soft directional light, 3:4. |
| craft-2.jpg | 400×520 | 800×1040 | 강점 02 실내 | Living room with arched openings in a textured plaster wall, city view through the window, 3:4. |
| craft-3.jpg | 400×520 | 800×1040 | 강점 03 현장 | Dining corner with terracotta chairs and a round marble table, warm sunlight through blinds, 3:4. |
| craft-4.jpg | 400×520 | 800×1040 | 강점 04 절제 | Sculptural curved ceiling in sand-colored plaster above a still water feature, 3:4. |
| craft-5.jpg | 275×780 | 550×1560 | 마무리 우측 큰 세로 사진 | Arched corridor in warm limestone with repeating vaults, very tall vertical crop, 9:25. |
| craft-6.jpg | 275×455 | 550×910 | 마무리 우측 작은 세로 사진 | Minimal curved white structure over a still reflecting pool at dawn, pastel sky, 3:5. |
| testi.mp4 (+ testi.jpg 포스터) | 1260×840 | 2520×1680 · 8~12초 루프 | 후기 영상 | Korean man in his 40s in a dark shirt talking to camera in a concrete lobby with linear lighting, slow push-in, no audio needed, 3:2. 영상이 없으면 같은 구도의 사진을 testi.jpg 로만 넣어도 포스터로 표시됩니다. |
| avatar-1 ~ 3.jpg | 48×48 | 96×96 | 후기 카드 프로필 | 한국인 남녀 상반신 정면 포트레이트, 단색 배경, 1:1. |
| team-1.jpg | 489×300 | 978×600 | 팀 · 이서연 실내건축 | Korean woman architect in her 30s at a studio desk with material samples, natural light, 16:10. |
| team-2.jpg | 489×300 | 978×600 | 팀 · 박민재 스튜디오 리드 | Korean man in his 40s reviewing drawings at a large table, 16:10. |
| team-3.jpg | 489×300 | 978×600 | 팀 · 정하늘 디자인 리드 | Korean designer at a desk with a monitor showing a 3D model, 16:10. |
| cta.jpg | 1420×900 | 2840×1800 | 상담 섹션 배경(가운데 흰 카드가 덮음) | Bright staircase hall with skylight, white walls and wooden treads, symmetrical composition, 16:10. 가운데는 단순하게(흰 카드가 올라갑니다). |

## 그 밖의 파일
- `favicon.svg` — 어두운 사각형 안 흰 사각 프레임(교체 시 같은 이름).
- `og.jpg` — 1280×960 공유 썸네일(사진 교체 후 1440 캡처로 다시 만드세요).
- 워드마크는 `index.html` 안의 `#w-mark` · `#w-small` SVG 심볼(글자 로고 yeobaek)입니다. 실제 로고가 있으면 그 심볼 내용을 교체하세요.
- 협력사 로고 6개(`#c-1`~`#c-6`)도 SVG 글자 로고라 실제 로고로 교체하면 됩니다.
