# estate-a 이미지 슬롯 프롬프트 (상세판)

레퍼런스 실측 크기 기준. **생성은 표시 크기의 2배** 안팎으로, 파일명·크기 그대로 `assets/` 에 덮어쓰면 끝난다.
지금 들어 있는 파일은 같은 크기의 임시 플레이스홀더(하늘 그라데이션 + 집 실루엣, 회색 인테리어)다.
용량이 크면 `.webp` 로 바꾸고 `index.html` 의 `./assets/파일명` 만 같이 고친다. 구름·컷아웃 PNG 는 **투명 배경** 필수.

## 공통 규칙

- **톤**: 전체가 "저녁 블루아워의 고급 주택" 한 장면처럼 보여야 한다. 하늘은 청회색(#C3E5F7 → #316073 계열), 실내 조명은 따뜻한 앰버(2700K). 채도는 낮고 콘트라스트는 부드럽게.
- **재질**: 노출 콘크리트, 짙은 목재(월넛/티크), 통유리, 검정 금속 프레임, 옥상 조경. 값싼 렌더 느낌(플라스틱 질감·과한 반사)은 피한다.
- **카메라**: 건축 사진 규칙 — 수직선을 세운 정면 또는 3/4 뷰, 24~35mm, 낮은 눈높이. 광각 왜곡·어안 금지.
- **항상 붙이는 접미**:
  `photorealistic architectural photography, blue hour, warm interior lights glowing through glass, soft overcast sky, muted cool palette with amber accents, 35mm lens, straight verticals, ultra detailed, 8k`
- **항상 붙이는 네거티브**:
  `--no text, watermark, logo, signage, people, cars in foreground, cartoon, illustration, oversaturated, HDR halo, lens flare, fisheye, tilted horizon`
- 사람 사진(아바타·후기)만 예외: 자연광, 얕은 심도, 실제 인물 사진 톤.

## 슬롯 표

| # | 파일 | 표시 크기 (1440) | 생성 크기 | 용도 |
|---|---|---|---|---|
| 1 | `cloud.png` | 1752×948 (4곳 재사용) | 1752×948 투명 PNG | 히어로 구름 |
| 2 | `cloud-band.png` | 1505×464 (2곳) | 1505×464 투명 PNG | 히어로 하단 안개 띠 |
| 3 | `hero-house.jpg` | 1440×931 cover | 2880×1862 | 히어로 집 |
| 4 | `chip-1.jpg` ~ `chip-3.jpg` | 26×26 원형 | 52×52 | 히어로 칩 아바타 |
| 5 | `impact-1.jpg` | 314×338 cover r15 | 628×676 | Our Impact 좌 |
| 6 | `impact-2.jpg` | 314×338 cover r15 | 628×676 | Our Impact 우 |
| 7 | `about-pattern.jpg` | 1440×1060 cover, op .17 | 1440×1060 | About 배경 |
| 8 | `feat-1.jpg` ~ `feat-3.jpg` | 1440×900 cover (모바일 390×900 → 세로 소스) | 1200×1600 | 대표 매물 스택 |
| 9 | `svc-1.png` ~ `svc-3.png` | 556×512 contain, 하단 정렬 | 1112×1024 투명 PNG | 서비스 카드 집 컷아웃 |
| 10 | `list-1.jpg` ~ `list-4.jpg` | 620.5×420 cover r16 (모바일 350×420) | 900×1200 | 매물 카드 |
| 11 | `highlight.mp4` + `highlight-poster.jpg` | 400×276 → 최대 6배(2400×1653) | 1440×992, 6~8초 루프 | 하이라이트 영상 |
| 12 | `avatar-1.jpg` ~ `avatar-6.jpg` | 50×50 r7 | 100×100 | 후기 아바타 |
| 13 | `review-photo.jpg` | 350×500 cover r15 | 700×1000 | 강조 후기 인물 |
| 14 | `footer-sky.jpg` | 1408×1222 cover (아래 57% 부터 어둡게 마스크) | 1408×1222 | 푸터 하늘 |
| 15 | `footer-house.jpg` | 1408×844 cover (아래로 갈수록 검정에 녹음) | 1408×844 | 푸터 집 |

## 슬롯별 상세 프롬프트

### 1. `cloud.png` — 히어로 구름 (투명 PNG)
히어로 하늘 위에 4번 겹쳐 쓴다(회전 22°·-9°, 불투명도 .6/.7). 가장자리가 반드시 투명하게 사라져야 하고, 한쪽으로 치우친 덩어리가 아니라 가운데가 가장 짙은 타원형이어야 한다.
```
A single large cumulus cloud cutout isolated on a fully transparent background, soft cotton-like volume with bright white top and slightly grey-blue underside, wispy translucent edges that fade out completely, no hard outline, no sky behind it, centered, wide horizontal composition, photographic, high detail, alpha channel --ar 1752:948
```
후처리: 알파 가장자리 페더 30px 이상. 구름 밖은 알파 0.

### 2. `cloud-band.png` — 히어로 하단 안개 띠 (투명 PNG)
집 아랫부분을 덮어 흰 배경으로 녹이는 안개. 가운데 가로 띠는 완전 불투명 흰색, 위·아래로 갈수록 투명.
```
Horizontal band of dense white ground fog seen from the front, fully opaque bright white in the middle, dissolving to fully transparent toward the top and bottom edges, soft billowing texture like low clouds rolling over water, isolated on transparent background, no sky, no ground, ultra wide --ar 1505:464
```

### 3. `hero-house.jpg` — 히어로 집 (2880×1862)
레퍼런스는 테라스가 4단으로 쌓인 콘크리트·목재·유리 주택이 바다 절벽 위에 서 있고, 위쪽은 하늘이 그대로 이어져 텍스트가 놓인다. **상단 45% 는 빈 하늘**이어야 한다(그 위에 제목이 얹힌다). 집은 화면 중앙~하단, 앞마당은 젖은 검정 석재 바닥과 낮은 수영장.
```
Front view of a luxurious four-storey terraced modern house on a coastal cliff at blue hour, each floor stepping back with cantilevered concrete slabs, glass balustrades and lush rooftop planters, warm teak wood entrance and floor-to-ceiling windows glowing amber from inside, wide illuminated stone steps leading to a wet black stone courtyard with a still reflecting pool, low white sea fog drifting around the base, dark ocean and headland faintly visible on the left, the top half of the frame is empty soft blue-grey cloudy sky, symmetrical composition, eye level slightly below the ground floor, photorealistic architectural photography, 24mm, straight verticals, ultra detailed --ar 1.55:1
```

### 4. `chip-1.jpg` ~ `chip-3.jpg` — 칩 아바타 (52×52)
```
Close-up headshot of a smiling young woman with dark shoulder-length hair, natural window light, soft neutral background, shallow depth of field, candid portrait photography, square crop
```
2: `smiling man in his thirties with short dark hair and a light beard, warm skin tone` / 3: `smiling woman with light brown hair tied back, wearing a beige knit`. 얼굴이 원형 26px 안에서 보이도록 얼굴을 프레임 70% 이상 채운다.

### 5. `impact-1.jpg` — Our Impact 좌 (628×676)
```
Three-storey modern house with pale grey concrete volumes and warm walnut wood cladding, large black-framed windows, cantilevered upper floor, low-angle front three-quarter view from the driveway, overcast pale blue dusk sky, dry grasses and small trees in front, interior lights just switched on, photorealistic architectural photography, 35mm, straight verticals --ar 628:676
```

### 6. `impact-2.jpg` — Our Impact 우 (628×676)
```
Single-storey glass-walled modern house sitting on a green rolling hillside at dusk, flat dark roof with thin overhang, floor-to-ceiling glass glowing warm amber, gravel path and low shrubs in front, soft mist over the hills behind, muted green and blue-grey palette, photorealistic architectural photography, 35mm --ar 628:676
```

### 7. `about-pattern.jpg` — About 배경 패턴 (1440×1060)
회색 섹션 위에 불투명도 17% 로 깔리므로 아주 흐린 그림자 무늬면 된다. 형태가 뚜렷하면 안 된다.
```
Abstract soft shadow of a window frame and diagonal light streaks projected on a smooth white plaster wall, heavily blurred, very low contrast, only pale grey tones on white, no objects, minimal, seamless, wide --ar 1440:1060
```

### 8. `feat-1.jpg` ~ `feat-3.jpg` — 대표 매물 스택 (1200×1600, 세로)
화면 가득(1440×900) 깔리고 위에 어두운 마스크(30~65%)와 글래스 카드가 올라간다. **세로 소스**로 만들되 중앙 1200×750 안에 집이 다 들어오게 구도를 잡는다(데스크톱은 가운데를 잘라 쓴다).

feat-1 (한남 스카이 레지던스):
```
Two-storey modern house clad in black stained timber and stacked natural stone, double-height glass facade with warm interior light, covered outdoor terrace with a black steel pergola, long rectangular swimming pool in the foreground reflecting the house, two luxury cars parked under the carport on the right, palm trees and manicured hedges, dusk with deep blue sky, photorealistic architectural photography, 35mm, straight verticals, vertical composition --ar 3:4
```
feat-2 (성수 브릭 하우스):
```
Modern farmhouse-style home with a dark standing-seam metal roof, black board-and-batten siding and natural cedar accents, large gabled windows glowing warm from inside, wraparound porch with wicker chairs, gravel driveway winding through a meadow, forested hills and a soft orange-pink sunset sky behind, chimney with a thin trail of smoke, photorealistic architectural photography, vertical composition --ar 3:4
```
feat-3 (판교 레이크 빌라):
```
Futuristic two-storey villa with sweeping curved concrete roofs and continuous curved glass walls, sitting at the edge of a still dark lake that mirrors the whole building, dense pine forest behind, night blue hour, every room lit warm amber, stone deck and steps at the waterline, photorealistic architectural photography, vertical composition --ar 3:4
```

### 9. `svc-1.png` ~ `svc-3.png` — 서비스 카드 집 컷아웃 (1112×1024, 투명 PNG)
검정 카드 위에 `contain` 으로 하단 정렬되고, 아래쪽 45% 는 CSS 마스크로 서서히 투명해진다. 배경 없이 건물만 있어야 하고, 건물 아래에는 아주 짧은 지면·그림자만 둔다.
```
Cutout of a white cubic three-storey modern house isolated on a transparent background, stacked rectangular volumes with deep overhangs, floor-to-ceiling glass with warm interior light, small rooftop trees in planters, thin black window frames, three-quarter front view from slightly below, no sky, no landscape, only a thin sliver of dark ground under the building, clean edges, photorealistic, alpha channel --ar 1112:1024
```
svc-2: `same style, front elevation view, wider single-volume house with a long upper balcony` / svc-3: `same style, view from the terrace side, large corner terrace with glass railing and outdoor lounge`.

### 10. `list-1.jpg` ~ `list-4.jpg` — 매물 카드 (900×1200, 세로)
카드는 620×420 가로지만 모바일에서 350×420 로 잘리므로 세로 소스. 하단 55% 에 이름·가격이 얹히니 건물의 중요한 부분은 위쪽 절반에 둔다.

list-1 (언덕 위 전망 주택 · 임대):
```
Curved white modern house on a cliff above the sea, rounded cantilevered terraces with glass railings, two lounge chairs on the deck, calm evening ocean and distant coastline, warm interior glow, pale peach-blue dusk sky, photorealistic architectural photography, vertical --ar 3:4
```
list-2 (테라스 모던 하우스 · 매매):
```
White two-storey modern house with a large upper terrace, wooden pergola, plants and string lights, black-framed sliding glass doors, warm sunset light on the facade, pine trees on the left, photorealistic architectural photography, vertical --ar 3:4
```
list-3 (숲속 노란 코티지 · 매매):
```
Charming small yellow wooden cottage with a mossy curved shingle roof and a covered porch, surrounded by dense green forest and ferns, soft diffused daylight, stone path leading to the door, photorealistic, vertical --ar 3:4
```
list-4 (도심 어반 하우스 · 매매):
```
Contemporary urban house with white rendered volumes and dark grey natural stone base, cantilevered upper floor with glass balcony, warm lights inside, neighbouring houses softly out of focus, clear dusk sky, photorealistic architectural photography, vertical --ar 3:4
```

### 11. `highlight.mp4` + `highlight-poster.jpg` — 하이라이트 영상 (1440×992)
400×276 에서 시작해 스크롤에 따라 6배(화면 가득)까지 커지므로 화질이 좋아야 한다. 카메라가 아주 천천히 전진하는 6~8초 클립, 정방향+역방향 팰린드롬 루프. 워터마크가 우하단에 생기면 `crop` 으로 잘라낸다.
```
Slow cinematic push-in toward a single-storey flat-roof glass house at dusk, long reflecting pool in the foreground mirroring the warm lit interior, autumn red maple and tall pines behind, dramatic grey-blue clouds, still air, no people, photorealistic, 24fps, smooth dolly, 8 seconds --ar 1440:992
```
포스터는 영상 첫 프레임을 JPG 로 저장.

### 12. `avatar-1.jpg` ~ `avatar-6.jpg` — 후기 아바타 (100×100)
```
Natural-light portrait headshot, face filling most of the square frame, soft neutral background, slight smile, shallow depth of field, real photograph look, square crop
```
순서: 1 여성 20대 후반 검정 단발 / 2 남성 30대 안경 / 3 여성 30대 긴 머리 베이지 니트 / 4 남성 40대 짧은 머리 / 5 여성 20대 웨이브 / 6 남성 30대 수염, 네이비 셔츠.

### 13. `review-photo.jpg` — 강조 후기 인물 (700×1000)
카드 하단에 흰 이름이 올라가므로 아래쪽은 어두운 옷·배경이어야 한다.
```
Half-body portrait of a young woman wearing a dark grey knit beanie and a black wool coat, turning to look over her shoulder at the camera, standing on a city rooftop at dusk with blurred bokeh lights of office buildings behind, cool blue-grey tones, natural light, 85mm, shallow depth of field, vertical --ar 7:10
```

### 14. `footer-sky.jpg` — 푸터 하늘 (1408×1222)
위쪽에 흰 제목이 얹히고 아래 43% 는 검정으로 녹아 사라진다. 땅이 없는 순수 하늘.
```
Overcast blue-grey evening sky filled with soft layered clouds, subtle lighter glow near the top, no horizon, no ground, no sun, smooth gradients, photographic, wide --ar 1408:1222
```

### 15. `footer-house.jpg` — 푸터 집 (1408×844)
바닥은 마스크로 검정에 녹으므로 아래쪽이 어두운 젖은 바닥이면 자연스럽다. 위로는 3번 히어로 집과 같은 계열.
```
Wide front view of a curved multi-level modern house with rounded cantilevered floors and continuous glass balconies, warm amber light from every room, illuminated entrance steps, wet dark stone courtyard reflecting the lights in the foreground, sea cliff and low mist behind, blue hour, photorealistic architectural photography, 24mm, straight verticals --ar 5:3
```

## 교체 후 확인

1. 파일명·크기가 표와 같은지, PNG 4종(구름·띠·컷아웃 3)의 가장자리가 투명한지.
2. `bash tools/ref-clone/verify_template.sh estate-a` 로 깨진 이미지 0·콘솔 에러 0 확인, 썸네일 재캡처.
3. 로고·아이콘·화살표·워드마크는 인라인 SVG 라 교체할 것이 없다. 매물명·가격·문구는 `index.html` 에서 바로 바꾼다.
