# soran 소란 풀빌라 이미지 생성 프롬프트

## 생성 상태

- 현재 `public/soran/assets/` 의 사진 62장은 **톤만 맞춘 임시 이미지(등고선 무늬)** 이며, 실제 사진은 아직 생성 전이다.
- 프롬프트 수: **62개** = `tools/ref-clone/photo-map-soran.txt` 데이터 행 수(sr1~sr62).
- 생성한 사진은 아래 표기한 파일명 그대로 `public/soran/assets/` 에 덮어쓴다. HTML·CSS 수정은 필요 없다.
- 생성 제외(교체 지침만): F03 `location-map.jpg` 1장. 객실·시설 사진은 "샘플 시연용 생성 가능, 실제 납품 시 실사진 교체" 대상이다(항목마다 표기).

## 납품 기준

- 브랜드: `소란 풀빌라 (SORAN POOL VILLA)` — 포트폴리오용 **가상 브랜드**. 실존 숙소·지명·업체와 무관하다.
- 저장 위치: `public/soran/assets/`, **파일명 동일**(대소문자·하이픈 그대로).
- 크기: 항목마다 적힌 **생성 크기(photo-map 의 생성w×생성h) 그대로**. 비율·해상도 변경 금지(화면 표시 크기의 2배, 레티나 대응).
- 형식: sRGB, 고품질 JPG(품질 85~90). 이 브랜드에는 투명 PNG 자리가 없다.
- 공통 스타일: 한국 남해안 인근 소나무 숲 산자락에 놓인 **숲속 독채 풀빌라**. 매거진 화보 같은 조용한 건축·라이프스타일 사진, 자연광 위주, 낮은 채도의 부드러운 필름 톤. 재료는 밝은 석회 미장 벽, 오크·월넛 원목, 거친 화강석 데크, 린넨·코튼 패브릭, 라탄, 도자기. 색감은 `site.css` 토큰 기준 — 크림 바탕 `--bg #fdfcf4`, 짙은 솔숲 녹색 `--deep #21302b`·`--leaf #3c5a3b`·`--moss #3c4923`, 모래·베이지 `--sand #f4dabd`·`--tan #cdb9a1`, 올리브 `--olive #716c55`, 옅은 세이지 `--mist #d7decb`. 오렌지 `--flame #f54f21` 은 UI 포인트 색이므로 사진에서는 노을빛·불빛 정도로만 아주 작게.
- 공통 금지: 사진 안의 글자·숫자·간판·문패·로고·워터마크·읽히는 책 표지, 실존 호텔/리조트/풀빌라 브랜드의 상표·건물·인테리어 재현, 레퍼런스 사이트 사진 모사, 과한 HDR·CG 렌더 느낌·플라스틱 재질, 과포화 청록 물빛, 왜곡된 손·얼굴, 중복 인물.
- 인물 조건: 기본은 **인물 없는 공간 사진**. 인물이 필요한 컷(소규모 파티·수영 등)은 한국인 중심, 특정 실존 인물을 닮지 않게, 뒷모습·손·원거리 실루엣 등 비식별 또는 자연스러운 스냅으로만.
- 크롭 규칙(모바일 CSS 근거):
  - 히어로 2400×1500 (`.hero .swiper-slide` 100vh, 700px 이하 높이 450px): 폭 390px 폰에서 가로 **중앙 54%**만 보인다 → 핵심 피사체는 가로 중앙 50%, 세로 중앙 85% 안.
  - 풀폭 비주얼 2400×1617 (`.visual` 970 → 900px 이하 500 → 700px 이하 300px): 넓은 모니터·모바일 가로에서 세로 **중앙 60%**만 남을 수 있다 → 피사체는 세로 중앙 60% 안. 글자가 왼쪽에 올라가므로 피사체는 가운데~오른쪽.
  - 상단 사진 2400×1133 (`.top-pic` 680 → 모바일 300px): 모바일에서 가로 **중앙 60%** → 피사체는 가로 중앙 55% 안.
  - 객실 대형 슬라이드 1510×1774 (모바일 높이 60vw): 세로 **중앙 50%**만 보인다 → 피사체는 세로 중앙 45% 안.
  - 카드류(객실·스페셜 카드)는 호버 시 1.05배 확대 → 가장자리 5% 에 중요한 요소 금지.
- **밝기 가이드**: 항목마다 적힌 "목표 밝기"(0~255 그레이 평균, 레퍼런스 같은 칸 실측)를 노출 기준으로 쓴다. 사진 위 흰 글자·짙은 글자의 대비가 이 밝기에 맞춰 검증돼 있으므로 **±15 를 넘게 벗어나면 안 된다**. 어둡게 나오면 노출을 올리고, 밝게 나오면 하이라이트를 눌러 맞춘다.

## 출력 크기와 수량

| 크기 | 수량 | 파일 |
|---|---:|---|
| 2400×1500 | 16 | `hero-1~5`, `prologue-hero-1~4`, `room-hero-1~4`, `special-hero-1~3` |
| 2400×1617 | 3 | `visual-main`, `special-visual`, `reservation-visual` |
| 2400×1133 | 2 | `location-top`, `reservation-top` |
| 2320×892 | 1 | `special-wide` |
| 2160×1630 | 1 | `location-map` (생성 제외 · 교체 지침) |
| 1510×1774 | 3 | `room-slide-1~3` |
| 1040×1298 | 1 | `intro-arch` |
| 1020×1196 | 2 | `prologue-thumb-1~2` |
| 1000×850 | 6 | `menu-1~6` |
| 988×692 | 1 | `reservation-guide` |
| 800×800 | 1 | `popup-notice` |
| 798×1064 | 1 | `room-thumb` |
| 780×780 | 4 | `prologue-grid-1~4` |
| 774×978 | 5 | `room-dalbit`, `room-solsup`, `room-mulgyeol`, `room-noeul`, `room-baram` |
| 754×522 | 4 | `special-small-party`, `special-outdoor-pool`, `special-bbq-terrace`, `special-reservation` |
| 658×822 | 1 | `room-img-big` |
| 606×606 | 3 | `special-list-1~3` |
| 600×600 | 3 | `location-thumb`, `reservation-thumb-1~2` |
| 478×626 | 3 | `special-art-lounge`, `special-welcome-kit`, `special-private-pool` |
| 360×360 | 1 | `room-img-small` |
| **합계** | **62** | |

공통 영어 꼬리(모든 English 줄 끝): `photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark`

---

## A. 메인 페이지 (`index.html`) · 20장

### A01 (sr1) · `hero-1.jpg` · 2400×1500 · 한낮의 수영장과 독채
사용 위치: 메인 첫 화면 페이드 슬라이드 1 (글자 없음, 좌우 중앙에 흰 화살표, 상단 중앙 로고) · 목표 밝기 145 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
초여름 한낮, 소나무 숲을 등진 단층 독채 앞 직사각형 야외 수영장을 수영장 끝 눈높이(약 1.5m)에서 35mm 로 정면 촬영. 밝은 석회 미장 벽과 넓은 유리창, 화강석 데크, 물 위에 비친 솔잎 그늘. 독채와 수영장 중심축을 화면 가로 중앙에 두어 폰에서 중앙 54% 만 남아도 건물이 잘리지 않게 하고, 하늘은 위 15% 이내로 절제.
English: Midday early summer, a single-storey lime-plaster villa with wide glass doors behind a rectangular outdoor pool, pine forest behind, granite deck, shot at eye level from the pool's end with a 35mm lens, symmetrical composition centered, soft pine shadows on the water, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A02 (sr2) · `hero-2.jpg` · 2400×1500 · 테라스 너머 수영장
사용 위치: 메인 슬라이드 2 · 목표 밝기 151 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
오전 10시 무렵 밝은 확산광, 거실 안쪽에서 열린 폴딩 유리문 너머로 테라스와 수영장, 그 뒤 소나무 군락을 바라보는 실내→실외 구도. 전경에는 오크 마루 끝과 린넨 커튼 한 자락, 중경에 수영장 수면, 원경에 숲. 수영장과 문틀 중심은 가로 중앙 50% 안.
English: Late morning soft light, view from inside a living room through open folding glass doors to a stone terrace, a still outdoor pool and a stand of pines beyond, oak floor edge and a linen curtain in the foreground, 28mm lens at standing height, centered framing, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A03 (sr3) · `hero-3.jpg` · 2400×1500 · 숲 속 독채 부감
사용 위치: 메인 슬라이드 3 · 목표 밝기 146 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
맑은 오후, 약 15m 높이 드론 부감(45°)으로 소나무 숲 산자락에 폭 싸인 독채 한 채와 L자 수영장을 내려다본 장면. 평지붕 위 자갈, 데크의 선베드 두 개, 숲 그늘이 건물 가장자리를 감싼다. 건물과 수영장은 화면 한가운데, 주변은 숲 질감으로만 채워 가장자리는 단순하게.
English: Clear afternoon aerial view at 45 degrees from about 15 meters, a single villa with an L-shaped pool nestled in a pine forest on a gentle hillside, gravel flat roof, two sun loungers on the deck, forest canopy framing the edges, villa centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A04 (sr4) · `hero-4.jpg` · 2400×1500 · 해 질 녘 불 켜진 수영장
사용 위치: 메인 슬라이드 4 · 목표 밝기 104 (시리즈 중 가장 어두움) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
해가 진 직후 블루아워, 수영장 수중 조명이 은은한 청록빛, 거실 창에서 따뜻한 전구색 빛이 새어 나오는 독채. 하늘은 짙은 남청, 숲 실루엣은 거의 검은 녹색. 수면 반사와 창문 빛을 가로 중앙에 모으고, 전체가 너무 검게 떨어지지 않도록 평균 밝기 104 근처로 노출.
English: Blue hour just after sunset, softly lit pool with gentle underwater light, warm tungsten glow from the villa's windows, deep indigo sky, pine silhouettes, reflections centered in the frame, low-angle 35mm view from the far end of the pool, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A05 (sr5) · `hero-5.jpg` · 2400×1500 · 아침 안개와 수영장 가장자리
사용 위치: 메인 슬라이드 5 · 목표 밝기 139 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
이른 아침, 숲에 옅은 안개가 깔린 상태에서 수영장 모서리(인피니티처럼 낮은 석재 턱)와 그 너머 소나무 숲을 낮은 시점(무릎 높이)으로 촬영. 수면은 거울처럼 잔잔하고 안개 사이로 비스듬한 햇살. 수영장 모서리와 가장 굵은 소나무를 가로 중앙에 배치.
English: Early morning with light mist in the pine forest, low knee-height view across the stone edge of a calm mirror-like pool toward the trees, slanted soft sunbeams through the mist, pool corner centered, 35mm lens, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A06 (sr6) · `intro-arch.jpg` · 1040×1298 · 아치 속 거실
사용 위치: 메인 소개, 윗부분이 아치형으로 잘리는 세로 사진(아래 절반은 짙은 녹색 `--deep` 섹션 위로 걸침, 사진 위 글자 없음) · 목표 밝기 118 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
오후의 부드러운 창가 빛이 드는 거실. 낮은 리넨 소파, 월넛 원목 좌탁, 도자기 화병의 솔가지, 큰 창 밖의 소나무가 흐릿하게 보인다. 아치 마스크 때문에 위쪽 좌우 모서리가 잘리므로 소파·좌탁 등 핵심은 가로 중앙, 세로 30~85% 구간에 두고 윗부분은 벽과 창의 여백.
English: Vertical interior of a calm living room in soft afternoon window light, low linen sofa, walnut coffee table, ceramic vase with pine branches, blurred pines through a large window, main furniture centered in the lower two thirds, simple wall space at the top for an arch-shaped crop, 35mm at seated height, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A07 (sr7) · `room-dalbit.jpg` · 774×978 · 달빛(DALBIT) 거실
사용 위치: 객실 미리보기 카드 1 (윗부분 아치형 모양, 객실명은 사진 아래) · 목표 밝기 127 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
저녁 무렵의 차분한 거실. 옅은 회백색 벽, 둥근 달 모양 펜던트 조명(불 켜짐), 오트밀 톤 소파와 둥근 원목 테이블, 창밖은 해가 진 숲. 윗부분 31% 가 아치로 잘리고 호버 시 1.05배 확대되므로 가구는 가로 중앙·세로 하단 2/3 에.
English: Vertical view of a calm villa living room at early evening, off-white walls, a round moon-like pendant lamp glowing, oatmeal sofa and round wooden table, dusky forest through the window, furniture centered in the lower two thirds, 35mm, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A08 (sr8) · `room-solsup.jpg` · 774×978 · 솔숲(SOLSUP) 거실
사용 위치: 객실 미리보기 카드 2 (위쪽이 오각형 지붕 모양으로 잘림) · 목표 밝기 124 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
벽 한 면이 통유리로 솔숲을 향한 거실. 짙은 녹색 벨벳 암체어 하나와 오크 사이드테이블, 바닥까지 내려오는 숲 풍경이 실내를 초록빛으로 채운다. 오후 흐린 날의 확산광. 지붕 모양 크롭(상단 좌우 21%)을 고려해 의자는 중앙 하단.
English: Vertical living room with a floor-to-ceiling window facing a pine forest, one deep green velvet armchair and an oak side table, green forest light filling the room, overcast diffused afternoon light, chair centered low in the frame, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A09 (sr9) · `room-mulgyeol.jpg` · 774×978 · 물결(MULGYEOL) 거실
사용 위치: 객실 미리보기 카드 3 (상단 모서리가 비스듬히 잘림) · 목표 밝기 146 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
실내 개별 수영장과 맞닿은 밝은 거실. 수면 반사광이 흰 천장에 물결 무늬로 일렁이고, 라탄 라운지 의자와 흰 코튼 쿠션. 오전 햇빛. 수면과 의자를 세로 중앙 아래, 가장자리 5% 는 비워 둔다.
English: Vertical bright living room opening onto an indoor private pool, rippling water reflections on a white ceiling, rattan lounge chair with white cotton cushions, morning sun, pool edge and chair centered below the middle, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A10 (sr10) · `room-noeul.jpg` · 774×978 · 노을(NOEUL) 거실
사용 위치: 객실 미리보기 카드 4 (윗부분 아치형) · 목표 밝기 153 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
늦은 오후 낮게 들어오는 따뜻한 햇살이 모래색 벽과 테라코타 도자기에 긴 빛줄기를 드리운 거실. 베이지 린넨 데이베드, 낮은 원목 벤치. 창 방향으로 황금빛이 강하지만 과한 오렌지는 피한다. 가구는 중앙 하단.
English: Vertical living room in late afternoon golden light casting long sunbeams across sand-colored walls and terracotta ceramics, beige linen daybed and low wooden bench, warm but not over-saturated, furniture centered low, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A11 (sr11) · `room-baram.jpg` · 774×978 · 바람(BARAM) 거실
사용 위치: 객실 미리보기 카드 5 (오각형 지붕 모양) · 목표 밝기 118 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
열린 창으로 바람이 들어와 흰 거즈 커튼이 부풀어 오른 순간. 짙은 원목 마루, 낮은 좌식 소파, 창밖 소나무 가지가 흔들린다. 흐린 날의 차분한 빛으로 전체 톤은 중간보다 약간 어둡게. 커튼과 소파를 중앙에.
English: Vertical living room with a white gauze curtain billowing in the breeze from an open window, dark wood floor, low floor sofa, pine branches swaying outside, calm overcast light, slightly low-key exposure, curtain and sofa centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A12 (sr12) · `visual-main.jpg` · 2400×1617 · 실내 오브제 클로즈업
사용 위치: 메인 풀폭 비주얼 (글자: 좌상단 옅은 세이지 제목 "SLOW STAY…", 좌하단 흰 영문 3줄) · 목표 밝기 144 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
창가 원목 콘솔 위에 놓인 도자기 화병·찻잔·접힌 린넨을 50mm 로 가까이 촬영한 정물. 오후의 측광이 오른쪽에서 들어와 부드러운 그림자. 오브제는 화면 가로 55~85% 지점(오른쪽)과 세로 중앙 60% 안에 두고, 왼쪽 40% 는 흰 글자가 읽히도록 중간톤의 단순한 벽·그늘 면으로 남긴다.
English: Still life close-up on a wooden console by a window, ceramic vase, tea cup and folded linen, soft side light from the right, objects placed on the right side and vertically centered, the left 40 percent a plain mid-tone wall in soft shadow for overlaid text, 50mm lens, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A13 (sr13) · `special-art-lounge.jpg` · 478×626 · ART LOUNGE
사용 위치: 스페셜 미리보기 세로 카드 1 (제목은 사진 아래 오른쪽) · 목표 밝기 148
갤러리처럼 꾸민 라운지 한쪽 벽. 액자 없는 추상 캔버스(글자·서명 없음), 그 아래 낮은 석재 벤치와 조각 오브제, 천장 틈으로 들어오는 자연광. 캔버스와 벤치를 세로 중앙에, 가장자리 5% 는 비움.
English: Vertical corner of an art lounge, an unframed abstract canvas with no signature on a lime-plaster wall, a low stone bench and a small sculpture beneath, natural skylight, centered composition, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A14 (sr14) · `special-small-party.jpg` · 754×522 · SMALL PARTY
사용 위치: 스페셜 미리보기 가로 카드 2 · 목표 밝기 125
저녁 무렵 테라스의 긴 원목 테이블, 린넨 테이블보 위 와인잔·접시·작은 촛불, 뒤로 흐린 숲. 인물은 손과 팔만 살짝 보이거나 없음. 테이블 중앙부를 화면 가운데에.
English: Early evening terrace with a long wooden dining table, linen tablecloth, wine glasses, plates and small candles, blurred forest behind, only a couple of hands partly visible or no people, table centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A15 (sr15) · `special-welcome-kit.jpg` · 478×626 · WELCOME KIT
사용 위치: 스페셜 미리보기 세로 카드 3 · 목표 밝기 130
원목 트레이 위 라탄 바구니에 담긴 웰컴 키트 — 무지 크래프트 종이 포장, 과일, 작은 유리병 차, 린넨 냅킨. 라벨·스티커 글자 없음. 창가 측광, 45° 위에서 50mm.
English: Vertical welcome kit in a rattan basket on a wooden tray, plain kraft paper wrapping, fresh fruit, small glass jar of tea, linen napkin, no labels, soft window side light, 45-degree high angle, 50mm, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A16 (sr16) · `special-outdoor-pool.jpg` · 754×522 · OUTDOOR POOL
사용 위치: 스페셜 미리보기 가로 카드 4 · 목표 밝기 143 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
맑은 오후 야외 수영장을 긴 변 방향으로 담은 가로 사진. 화강석 데크, 선베드 두 개와 흰 파라솔(무지), 수영장 뒤 소나무 숲. 수영장은 가로 중앙.
English: Clear afternoon outdoor pool seen along its length, granite deck, two sun loungers and a plain white parasol, pine forest behind, pool centered, 35mm at standing height, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A17 (sr17) · `special-bbq-terrace.jpg` · 754×522 · BBQ TERRACE
사용 위치: 스페셜 미리보기 가로 카드 5 · 목표 밝기 97 (어두운 컷)
해가 진 뒤 테라스의 무쇠 바비큐 그릴에서 은은한 숯불과 연기, 줄전구의 따뜻한 빛, 뒤로 어두운 숲. 불꽃은 과장하지 않고 연기는 옅게. 그릴을 중앙에 두고 주변은 어둡게 떨어뜨려 평균 97 근처.
English: After sunset on a terrace, a cast-iron charcoal barbecue grill with a soft ember glow and thin smoke, warm string lights, dark forest behind, grill centered, low-key exposure, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A18 (sr18) · `special-private-pool.jpg` · 478×626 · PRIVATE POOL
사용 위치: 스페셜 미리보기 세로 카드 6 · 목표 밝기 162 (밝은 컷) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
천창에서 햇빛이 쏟아지는 실내 개별 수영장을 세로로. 흰 미장 벽, 옅은 청록 물, 수면 반사가 벽에 일렁임. 밝고 가벼운 하이키 톤. 수영장 계단과 천창 빛을 세로 중앙에.
English: Vertical indoor private pool under a skylight, white plaster walls, pale aqua water, rippling reflections on the walls, bright high-key tone, pool steps and light shaft centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A19 (sr19) · `special-reservation.jpg` · 754×522 · RESERVATION
사용 위치: 스페셜 미리보기 가로 카드 7 (예약 안내로 연결) · 목표 밝기 140 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
독채 입구로 이어지는 디딤돌 길과 오크 대문, 양옆 낮은 돌담과 소나무, 오후의 부드러운 빛. 문패·번호판 없음. "도착"의 느낌, 문을 가로 중앙에.
English: Stepping-stone path leading to an oak entrance door of a villa, low stone walls and pines on both sides, soft afternoon light, no nameplate or numbers, door centered, sense of arrival, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### A20 (sr62) · `popup-notice.jpg` · 800×800 · 공지 팝업 수면
사용 위치: 메인 공지 팝업 정사각 사진(모바일 312×312, 글자: 하단 40% 에 짙은 녹색 그라데이션 위 흰 글자 "야외수영장 6월 1일부터 운영") · 목표 밝기 216 (매우 밝음)
정오의 햇빛이 비치는 아주 밝은 수영장 수면과 흰 석재 가장자리를 위에서 내려다본 하이키 사진. 물결 빛무늬(코스틱), 옅은 아쿠아와 크림색. 가장자리 선과 빛무늬 포인트는 위쪽 60% 에 두고 아래쪽은 단순한 물면(그라데이션이 덮음).
English: Overhead high-key view of bright sunlit pool water and a white stone edge at noon, soft caustic light patterns, pale aqua and cream, points of interest in the upper 60 percent, simple water surface at the bottom, very bright exposure, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

---

## B. 공통 전체메뉴 (모든 페이지 `.gnb-pics`) · 6장

전체 메뉴를 열었을 때 오른쪽 500×425 라운드(15px) 사진. 메뉴 항목에 마우스를 올리면 해당 사진으로 교차 전환된다. 사진 위 글자 없음, 모바일(700px 이하)에서는 숨김. 6장을 같은 날 같은 색감의 시리즈로 맞추고 밝기는 목표값을 따른다.

### B01 (sr20) · `menu-1.jpg` · 1000×850 · PROLOGUE — 햇살 속 외벽
사용 위치: 메뉴 "PROLOGUE" 호버 사진 · 목표 밝기 182 (밝음) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
한낮의 밝은 햇빛을 받은 흰 미장 외벽과 처마 그림자, 앞에 솔가지 한 줄기가 드리운 건축 디테일 컷. 밝고 깨끗한 하이키 톤, 가운데 구성.
English: Bright midday architectural detail of a white lime-plaster villa wall with a crisp eave shadow and a pine branch in front, high-key, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### B02 (sr21) · `menu-2.jpg` · 1000×850 · ROOMS — 침실
사용 위치: 메뉴 "ROOMS" 호버 사진 · 목표 밝기 150 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
흰 린넨 침구가 정돈된 낮은 원목 침대, 창밖 소나무, 오전의 부드러운 빛. 침대를 중앙에.
English: Low wooden bed with crisp white linen, pines outside the window, soft morning light, bed centered, 35mm at standing height, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### B03 (sr22) · `menu-3.jpg` · 1000×850 · SPECIAL — 수영장 선베드
사용 위치: 메뉴 "SPECIAL" 호버 사진 · 목표 밝기 142 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
수영장 옆 선베드 위 접힌 흰 타월과 라탄 트레이의 음료 한 잔, 물가 가장자리, 오후 빛.
English: Folded white towel on a sun lounger beside the pool, a drink on a rattan tray, pool edge, afternoon light, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### B04 (sr23) · `menu-4.jpg` · 1000×850 · TRAVEL — 바다가 보이는 숲길
사용 위치: 메뉴 "TRAVEL" 호버 사진 · 목표 밝기 167
한국 남해안 인근 해안 숲길, 소나무 사이로 멀리 잔잔한 바다와 작은 섬들이 보이는 밝은 오전 풍경. 표지판·데크 안내문 없음. 실제 특정 관광지를 재현하지 않는 일반적인 풍경.
English: Coastal pine forest trail on Korea's southern coast, a calm sea and small islands glimpsed between pines, bright morning, no signposts, generic landscape not a specific landmark, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### B05 (sr24) · `menu-5.jpg` · 1000×850 · LOCATION — 진입로
사용 위치: 메뉴 "LOCATION" 호버 사진 · 목표 밝기 152
소나무 숲 사이로 완만하게 굽어 올라가는 좁은 포장 진입로, 오후 햇살과 숲 그림자의 줄무늬. 차량·표지판·차선 문자 없음. 길의 소실점을 가운데에.
English: Narrow paved access road gently curving up through a pine forest, stripes of afternoon sun and shadow, no cars, no signs, vanishing point centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### B06 (sr25) · `menu-6.jpg` · 1000×850 · RESERVATION — 창가 찻상
사용 위치: 메뉴 "RESERVATION" 호버 사진 · 목표 밝기 168 (밝음) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
밝은 창가 원목 테이블 위 백자 찻주전자와 찻잔 두 개, 창밖 흐린 솔숲. 하이키에 가까운 밝은 톤.
English: Bright window-side wooden table with a white porcelain teapot and two cups, soft blurred pines outside, near high-key tone, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

---

## C. 전경 페이지 (`prologue.html`) · 10장

### C01 (sr26) · `prologue-hero-1.jpg` · 2400×1500 · 밝은 외관 정면
사용 위치: 전경 히어로 페이드 슬라이드 1 (글자: 하단 중앙 흰 "PROLOGUE" 60px + 01/04 카운터) · 목표 밝기 158 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
맑은 오전, 독채 외관 정면을 약간 비스듬히 24mm 로. 흰 미장 벽, 낮은 평지붕, 큰 유리창, 앞마당 자갈과 잔디, 뒤로 솔숲. 건물은 가로 중앙·세로 중앙 위쪽, 하단 20% 는 흰 글자가 읽히도록 중간톤의 그늘진 잔디·자갈 면.
English: Clear morning, slightly angled front elevation of a single-storey villa with white plaster walls, flat roof and large windows, gravel and lawn forecourt, pines behind, 24mm, building centered in the upper middle, calm mid-tone shaded ground at the bottom for white caption text, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C02 (sr27) · `prologue-hero-2.jpg` · 2400×1500 · 숲 속 접근로와 독채
사용 위치: 전경 히어로 슬라이드 2 (하단 중앙 흰 글자) · 목표 밝기 141 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
소나무 줄기 사이로 보이는 독채들의 배치(2~3채가 거리를 두고 앉은 모습), 오후 측광, 숲 바닥의 솔잎. 건물들을 가로 중앙 50% 안에, 하단은 숲 바닥 그늘.
English: Two or three separate villas spaced apart among pine trunks, afternoon side light, pine needles on the forest floor, buildings within the central half of the frame, shaded forest floor at the bottom, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C03 (sr28) · `prologue-hero-3.jpg` · 2400×1500 · 처마 아래 중정
사용 위치: 전경 히어로 슬라이드 3 (하단 중앙 흰 글자) · 목표 밝기 122 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
깊은 처마 그늘 아래 석재 중정, 가운데 단풍나무 한 그루와 얕은 수반, 그 너머로 햇빛 받은 숲. 전체적으로 그늘진 중간톤, 나무와 수반은 중앙.
English: Stone courtyard under deep eaves, a single maple tree and a shallow water basin in the center, sunlit forest beyond, mostly shaded mid-tones, centered, 28mm, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C04 (sr29) · `prologue-hero-4.jpg` · 2400×1500 · 숲과 지붕선 원경
사용 위치: 전경 히어로 슬라이드 4 (하단 중앙 흰 글자) · 목표 밝기 154 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
맞은편 언덕에서 망원(85mm)으로 당겨 본 산자락: 솔숲 사이로 풀빌라의 낮은 지붕선과 수영장 한 조각, 멀리 옅은 바다 수평선(한국 남해안 느낌, 특정 지형 아님). 밝은 오후, 대기 원근감.
English: Telephoto 85mm view from an opposite hill of a pine-covered slope with low villa rooflines and a glimpse of a pool, faint sea horizon in the distance in the style of Korea's southern coast, bright afternoon haze, villas centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C05 (sr30) · `prologue-thumb-1.jpg` · 1020×1196 · 해 질 녘 외관
사용 위치: 전경 소개 coverflow 슬라이드 1 (왼쪽 아래 모서리에 원형 회전 글자 장식이 겹침, 모바일 폭 80%) · 목표 밝기 131 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
해 질 녘 하늘이 연한 살구색에서 청회색으로 넘어가는 시간, 실내 조명이 켜진 독채 외관을 세로로. 창문 빛과 외벽을 중앙~오른쪽 위에, 왼쪽 아래 모서리는 원형 장식이 겹치므로 어둡지 않은 단순한 잔디·데크 면.
English: Vertical villa exterior at dusk, sky fading from pale apricot to blue-grey, warm interior lights on, building in the center and upper right, a simple lawn or deck in the lower left corner for a circular overlay, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C06 (sr31) · `prologue-thumb-2.jpg` · 1020×1196 · 수영장에 비친 야경
사용 위치: 전경 소개 coverflow 슬라이드 2 · 목표 밝기 101 (어두운 컷) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
밤, 수영장 수면에 불 켜진 독채가 거울처럼 비친 세로 사진. 짙은 남색 하늘, 숲은 검은 녹색 실루엣, 창과 수중 조명만 은은하게. 반사선이 세로 중앙을 가로지르게.
English: Vertical night view, a lit villa mirrored in the still pool, deep navy sky, pines as dark green silhouettes, only windows and underwater lights glowing, reflection line crossing the vertical center, low-key, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C07 (sr32) · `prologue-grid-1.jpg` · 780×780 · 햇볕 가리개 아래 테라스
사용 위치: 전경 3×2 그리드 1번 칸(모바일 2열) · 목표 밝기 195 (매우 밝음)
한낮, 흰 캔버스 차양 아래 밝은 테라스. 흰 라운지 체어와 쿠션, 차양이 만든 부드러운 그늘과 강한 햇빛의 경계. 하이키 톤, 정사각 중앙 구성.
English: Square, midday bright terrace under a white canvas sunshade, white lounge chair and cushions, soft shade meeting strong sunlight, high-key tone, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C08 (sr33) · `prologue-grid-2.jpg` · 780×780 · 수영장 옆 음료 테이블
사용 위치: 전경 그리드 3번 칸 · 목표 밝기 137
수영장 가장자리 작은 석재 사이드테이블 위 유리잔 두 개와 레몬 조각, 뒤로 흐릿한 물빛. 오후, 50mm 근접.
English: Square close-up of a small stone side table at the pool edge with two glasses and lemon slices, blurred water behind, afternoon, 50mm, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C09 (sr34) · `prologue-grid-3.jpg` · 780×780 · 바비큐 그릴
사용 위치: 전경 그리드 4번 칸 · 목표 밝기 90 (어두운 컷)
저녁, 석재 조리대에 놓인 무쇠 그릴과 숯불의 붉은 기운, 옆에 원목 도마와 집게. 배경은 어두운 숲. 브랜드 각인 없음.
English: Square evening shot of a cast-iron grill with glowing charcoal on a stone counter, wooden board and tongs beside it, dark forest background, no brand marks, low-key, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### C10 (sr35) · `prologue-grid-4.jpg` · 780×780 · 객실 입구가 이어진 외벽
사용 위치: 전경 그리드 5번 칸 · 목표 밝기 156 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
밝은 미장 외벽을 따라 나란히 이어지는 원목 출입문 두 개와 돌계단, 벽에 드리운 솔가지 그림자. 호실 번호·문패 없음. 오후 측광.
English: Square view along a bright plaster wall with two oak entrance doors and stone steps, pine branch shadows on the wall, no room numbers or plates, afternoon side light, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

---

## D. 객실 상세 (`room.html`, 달빛 DALBIT) · 10장

이 페이지의 사진은 모두 한 객실(달빛)의 연속 컷이므로 같은 가구·벽색·바닥재로 일관되게 만든다. 모두 **샘플 시연용 생성 가능, 실제 납품 시 실사진 교체**.

### D01 (sr36) · `room-hero-1.jpg` · 2400×1500 · 거실과 수영장 창
사용 위치: 객실 히어로 페이드 슬라이드 1 (글자: 하단 중앙 흰 "DALBIT" + 01/04) · 목표 밝기 157 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
밝은 오전, 거실에서 통유리 너머 개별 수영장과 숲을 보는 넓은 컷(24mm, 서 있는 눈높이). 회백색 벽, 오트밀 소파, 달 모양 펜던트(꺼짐). 소파와 창을 가로 중앙에, 하단 20% 는 마루 면으로 단순하게.
English: Bright morning wide interior of a villa living room looking through floor-to-ceiling glass to a private pool and forest, off-white walls, oatmeal sofa, round moon-like pendant (off), 24mm at standing height, sofa and window centered, plain floor at the bottom, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D02 (sr37) · `room-hero-2.jpg` · 2400×1500 · 침실
사용 위치: 객실 히어로 슬라이드 2 · 목표 밝기 162 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
같은 객실의 침실. 흰 린넨 침구의 낮은 침대, 머리맡 원목 벽, 창밖 소나무. 부드럽고 밝은 확산광. 침대는 가로 중앙.
English: Same villa's bedroom, low bed with white linen, wooden headboard wall, pines outside, soft bright diffused light, bed centered, 28mm, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D03 (sr38) · `room-hero-3.jpg` · 2400×1500 · 창가 욕조
사용 위치: 객실 히어로 슬라이드 3 · 목표 밝기 152 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
큰 창 앞 흰 독립형 욕조, 석재 바닥, 창밖 숲 풍경, 욕조 옆 작은 원목 스툴과 접힌 타월. 욕조는 중앙.
English: Freestanding white bathtub in front of a large window with a forest view, stone floor, small wooden stool with a folded towel, tub centered, soft daylight, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D04 (sr39) · `room-hero-4.jpg` · 2400×1500 · 저녁 라운지 코너
사용 위치: 객실 히어로 슬라이드 4 · 목표 밝기 132 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
해 질 무렵, 달 모양 펜던트가 켜진 거실 라운지 코너. 창밖은 푸른 저녁 숲, 실내는 따뜻한 전구색. 펜던트와 라운지 체어를 중앙에.
English: Dusk, lounge corner of the same living room with the round moon pendant glowing, blue evening forest outside, warm interior light, pendant and lounge chair centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D05 (sr40) · `room-thumb.jpg` · 798×1064 · 소품 정물
사용 위치: 객실 상세 왼쪽 세로 사진(아래에서 위로 밀려 올라오는 등장 효과, 모바일에서는 숨김) · 목표 밝기 201 (매우 밝음) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
흰 벽 앞 흰 협탁 위 백자 화병의 마른 풀 한 줄기와 작은 돌 오브제. 하이키, 그림자 옅게. 오브제는 세로 중앙.
English: Vertical high-key still life, a white porcelain vase with a single dried grass stem and a small stone object on a white side table against a white wall, faint shadows, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D06 (sr41) · `room-slide-1.jpg` · 1510×1774 · 거실 세로 전경
사용 위치: 객실 상세 오른쪽 대형 슬라이드 1 (새 사진이 오른쪽에서 덮으며 들어옴, 모바일에서는 높이 60vw 로 세로 중앙만 보임) · 목표 밝기 150 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
달빛 객실 거실을 세로로. 소파·좌탁·펜던트가 한 화면에, 뒤로 창과 숲. 핵심 가구는 세로 중앙 45% 안에 모으고 위아래는 천장·마루 여백.
English: Vertical view of the same living room, sofa, coffee table and moon pendant together, window and forest behind, key furniture within the central 45 percent vertically, ceiling and floor as margins, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D07 (sr42) · `room-slide-2.jpg` · 1510×1774 · 개별 수영장 세로
사용 위치: 객실 상세 대형 슬라이드 2 · 목표 밝기 128 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
객실에 딸린 개별 수영장을 테라스에서 세로로. 오후 늦게 숲 그늘이 수면 절반을 덮은 중간톤. 수영장 계단과 데크 경계가 세로 중앙.
English: Vertical view of the room's private pool from its terrace, late afternoon forest shade covering half the water, mid-tones, pool steps and deck edge at the vertical center, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D08 (sr43) · `room-slide-3.jpg` · 1510×1774 · 침실 창가
사용 위치: 객실 상세 대형 슬라이드 3 · 목표 밝기 150 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
침대 모서리와 창가 좌식 벤치, 린넨 쿠션, 창밖 솔가지. 오전의 밝은 빛. 벤치와 침대 모서리는 세로 중앙.
English: Vertical bedroom corner, edge of the bed and a window seat with linen cushions, pine branches outside, bright morning light, subjects at the vertical center, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D09 (sr44) · `room-img-big.jpg` · 658×822 · 거실 가구 세로
사용 위치: 객실 정보 옆 세로 사진(등장 효과, 모바일 360/450 동일 비율) · 목표 밝기 113 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
월넛 원목 라운지 체어와 양모 러그, 그늘진 벽 앞. 차분하고 약간 어두운 톤. 오른쪽 아래 모서리에 작은 정사각 사진이 겹치므로 의자는 중앙~왼쪽 위.
English: Vertical walnut lounge chair on a wool rug against a shaded wall, calm slightly dark tone, chair placed center to upper left because a small photo overlaps the lower right corner, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### D10 (sr45) · `room-img-small.jpg` · 360×360 · 도자기 오브제
사용 위치: 큰 사진 오른쪽 아래에 겹쳐 스크롤 따라 움직이는 정사각 사진(모바일 숨김) · 목표 밝기 149 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
원목 선반 위 둥근 달항아리 모양 도자기 한 점을 정면 근접. 작은 크기에서도 형태가 읽히게 단순한 배경.
English: Square close-up of a single round moon-jar style ceramic on a wooden shelf, simple background readable at small size, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

---

## E. 야외수영장 (`special.html`) · 8장

### E01 (sr46) · `special-hero-1.jpg` · 2400×1500 · 수영장 전경
사용 위치: 야외수영장 히어로 페이드 슬라이드 1 (글자: 하단 중앙 흰 "OUTDOOR POOL" + 01/03) · 목표 밝기 157 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
맑은 오후 긴 야외 수영장 전경, 한쪽에 선베드 줄, 뒤로 솔숲 언덕. 수면은 옅은 녹청. 수영장 축을 가로 중앙에, 하단 20% 는 흰 글자를 위해 데크 그늘 면.
English: Clear afternoon wide view of a long outdoor pool, a row of sun loungers on one side, pine-covered hill behind, pale green-aqua water, pool axis centered, shaded deck at the bottom for white caption text, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E02 (sr47) · `special-hero-2.jpg` · 2400×1500 · 밝은 수면과 데크
사용 위치: 야외수영장 히어로 슬라이드 2 · 목표 밝기 162 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
정오 무렵 높은 시점(2층 높이)에서 수영장과 밝은 석재 데크를 비스듬히 내려다본 컷. 수영하는 사람 한 명이 멀리 작게(뒷모습, 비식별)이거나 없음.
English: Noon view from second-floor height looking down at the pool and pale stone deck, optionally one small distant swimmer seen from behind, bright and airy, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E03 (sr48) · `special-hero-3.jpg` · 2400×1500 · 늦은 오후 그늘 진 수영장
사용 위치: 야외수영장 히어로 슬라이드 3 · 목표 밝기 122 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
늦은 오후 숲 그림자가 수영장 대부분을 덮고, 먼 가장자리에만 햇빛이 남은 차분한 장면. 중간보다 어두운 톤.
English: Late afternoon, long forest shadows covering most of the pool, sunlight only on the far edge, calm and slightly low-key, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E04 (sr49) · `special-wide.jpg` · 2320×892 · 선베드와 타월
사용 위치: 야외수영장 와이드 사진 (오른쪽 아래 모서리에 짙은 녹색 필기체 "Outdoor pool" 이 사진 밖으로 걸쳐 겹침) · 목표 밝기 139 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
수영장 옆에 나란히 놓인 원목 선베드 세 개와 접힌 흰 타월, 옆으로 물가. 파노라마 가로 구도, 오후 빛. 선베드는 가로 중앙~왼쪽, 오른쪽 아래 20% 는 짙은 글자가 읽히게 밝은 데크 면.
English: Panoramic view of three wooden sun loungers with folded white towels beside the pool, afternoon light, loungers center-left, a bright plain deck in the lower right corner for dark overlaid script, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E05 (sr50) · `special-list-1.jpg` · 606×606 · 수영장 계단
사용 위치: 야외수영장 3열 정사각 사진 1 (오른쪽 위 모서리 라운드 80) · 목표 밝기 139 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
수영장 안으로 내려가는 석재 계단과 물 속 빛무늬, 위에서 45° 근접. 오른쪽 위 모서리는 둥글게 잘리므로 비움.
English: Square close-up of stone steps descending into the pool with caustic light underwater, 45-degree high angle, upper right corner kept empty for a rounded crop, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E06 (sr51) · `special-list-2.jpg` · 606×606 · 파라솔 그늘
사용 위치: 야외수영장 3열 정사각 사진 2 · 목표 밝기 177 (밝음) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
한낮, 흰 무지 파라솔 아래 선베드 한 개와 밝은 데크, 강한 햇빛. 하이키.
English: Square midday shot of one sun lounger under a plain white parasol on a bright deck, strong sunlight, high-key, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E07 (sr52) · `special-list-3.jpg` · 606×606 · 물가의 솔가지 반사
사용 위치: 야외수영장 3열 정사각 사진 3 · 목표 밝기 140 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
수영장 가장자리 너머로 드리운 솔가지와 그 반사가 수면에 비친 컷. 오후 측광.
English: Square view of pine branches overhanging the pool edge and their reflection on the water, afternoon side light, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### E08 (sr53) · `special-visual.jpg` · 2400×1617 · 수면 클로즈업
사용 위치: 야외수영장 풀폭 비주얼 (글자: 좌상단 옅은 세이지 제목, 좌하단 흰 영문) · 목표 밝기 156
햇빛이 비치는 수면의 물결과 빛무늬를 가까이, 오른쪽에 석재 가장자리 한 줄. 왼쪽 40% 는 무늬가 잔잔한 중간톤 물면으로 글자 자리, 포인트는 오른쪽·세로 중앙 60% 안.
English: Close-up of sunlit rippling pool water with caustic patterns, a stone edge line on the right, the left 40 percent calmer mid-tone water for overlaid text, details kept right of center and within the vertical middle, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

---

## F. 오시는 길 (`location.html`) · 3장

### F01 (sr54) · `location-top.jpg` · 2400×1133 · 산자락 아래 원경
사용 위치: 오시는 길 상단 풀폭 사진 (사진 위 글자 없음, 상단 로고·메뉴만, 모바일 높이 300px 로 가로 중앙 60%) · 목표 밝기 126 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
흐린 오후, 멀리서 70mm 로 본 소나무 산자락 아래 풀빌라 단지(지붕 몇 개). 앞쪽은 들판·낮은 돌담, 뒤로 겹겹이 옅어지는 능선. 한국 남해안 느낌의 일반 풍경, 도로 표지·간판 없음. 건물 무리를 가로 중앙 55% 안에.
English: Overcast afternoon, 70mm distant view of a few villa rooftops at the foot of a pine-covered hill, fields and low stone walls in front, layered fading ridgelines behind, generic Korean southern-coast countryside, no road signs, buildings within the central 55 percent, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### F02 (sr55) · `location-thumb.jpg` · 600×600 · 입구 정원
사용 위치: 오시는 길 정사각 사진 (윗모서리 라운드 50, 모바일 폭 40%) · 목표 밝기 156 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
입구 옆 작은 정원: 낮은 소나무 분재형 나무, 이끼·자갈, 디딤돌. 밝은 오전. 문패 없음. 나무를 중앙에.
English: Square small entrance garden with a low sculpted pine, moss, gravel and stepping stones, bright morning, no nameplate, tree centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### F03 (sr56) · `location-map.jpg` · 2160×1630 · 지도 자리 — 생성 제외(교체 지침)
사용 위치: 오시는 길 지도 상자 (위에 "소란 풀빌라" 말풍선 핀이 가로 44%·세로 43% 지점에 HTML 로 겹침, 모바일 300×350 세로 크롭) · 목표 밝기 236 (매우 밝음)
**생성하지 않는다.** 이유: 위치 안내는 실제 지도여야 하며, 생성 이미지는 존재하지 않는 도로·지명을 만들어 방문객을 잘못 안내할 수 있다.
교체 지침: 실제 운영 시 카카오맵·네이버 지도 등 지도 API 임베드 또는 정식 지도 캡처(이용 약관 준수)로 교체하고, HTML 의 `.map-pin` 은 지도 API 마커로 바꾼다. 포트폴리오 시연용으로만 현재 자리를 유지해야 한다면, **글자·도로명·지명이 전혀 없는** 가상 약도 일러스트(크림 바탕 `#f8f8f6` 위 옅은 회색 도로선, 세이지 `#d7decb` 녹지, 옅은 청회색 해안선, 평균 밝기 236 전후)로만 만들고, 핀이 놓이는 44%·43% 지점 주변에 도로가 교차하도록 그린다. 사진 생성기를 쓰지 말고 플랫 벡터 일러스트로 만든다.

---

## G. 예약 안내 (`reservation.html`) · 5장

### G01 (sr57) · `reservation-top.jpg` · 2400×1133 · 야외 수영장 상단
사용 위치: 예약 안내 상단 풀폭 사진 (사진 위 글자 없음, 모바일 가로 중앙 60%) · 목표 밝기 122 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
늦은 오후 수영장을 낮은 시점으로 가로지른 파노라마. 수면 위로 기울어진 햇빛, 데크 절반은 숲 그늘. 중간보다 약간 어두운 톤, 수영장 중심은 가로 중앙.
English: Late afternoon low panoramic view across the pool, slanting sunlight on the water, half of the deck in forest shade, slightly low-key, pool centered horizontally, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### G02 (sr58) · `reservation-thumb-1.jpg` · 600×600 · 웰컴 키트 바구니
사용 위치: 예약 안내 정사각 사진 1 (윗모서리 라운드 50, 모바일 폭 50%) · 목표 밝기 113
어두운 월넛 테이블 위 라탄 바구니 웰컴 키트(무지 포장, 과일, 찻잎 병), 창가 측광으로 명암이 뚜렷한 차분한 톤. A15 와 다른 각도·구성으로.
English: Square rattan welcome basket on a dark walnut table, plain wrapping, fruit and a jar of tea leaves, strong window side light, calm low-key mood, different angle from other welcome kit shot, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### G03 (sr59) · `reservation-thumb-2.jpg` · 600×600 · 테라스 소파와 쿠션
사용 위치: 예약 안내 정사각 사진 2 (윗모서리 라운드 50) · 목표 밝기 186 (밝음) · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
한낮 햇빛 가득한 테라스의 흰 야외 소파와 크림·세이지색 쿠션, 밝은 석재 바닥. 하이키.
English: Square bright terrace with a white outdoor sofa and cream and sage cushions on pale stone, full midday sun, high-key, centered, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### G04 (sr60) · `reservation-guide.jpg` · 988×692 · 라운지 의자와 협탁
사용 위치: 이용 안내 옆 가로 사진 (왼쪽 위·오른쪽 아래 모서리 라운드 50, 모바일 전체 폭 같은 비율) · 목표 밝기 141 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
창가 라운지 의자 한 개와 원목 협탁 위 책 한 권(표지 글자 없음)과 찻잔, 오후 빛. 라운드 모서리 두 곳은 비워 의자를 중앙에.
English: Lounge chair by a window with a wooden side table holding a plain-covered book and a tea cup, afternoon light, chair centered with empty top-left and bottom-right corners, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

### G05 (sr61) · `reservation-visual.jpg` · 2400×1617 · 해 질 녘 수영장과 선베드
사용 위치: 예약 안내 풀폭 비주얼 (글자: 좌상단 옅은 세이지 제목, 좌하단 흰 영문) · 목표 밝기 114 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
해 질 녘, 수영장 끝에 놓인 선베드 두 개와 불 켜진 수중 조명, 하늘은 옅은 살구색에서 청회색으로. 선베드와 수면 빛은 오른쪽·세로 중앙 60% 안, 왼쪽 40% 는 어두운 숲 그늘로 흰 글자 자리.
English: Dusk, two sun loungers at the end of a softly lit pool, sky fading from pale apricot to blue-grey, loungers and water glow on the right and vertically centered, the left 40 percent in dark forest shade for overlaid white text, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark

---

## 생성 후 검증

1. 파일 수: `public/soran/assets/` 에 photo-map 의 62개 파일이 모두 존재(`location-map.jpg` 는 교체본 또는 기존 임시본).
2. 픽셀 크기: 각 파일이 photo-map 의 생성w×생성h 와 정확히 일치.
3. 글자 없음: 이미지 안 글자·숫자·로고·간판 육안 검수(검수 시트로 한 번에 확인).
4. 밝기: Pillow 그레이 평균이 목표 밝기 ±15 이내.
   ```bash
   python3 - <<'EOF'
   from PIL import Image, ImageStat
   import re
   bad = 0
   for line in open('tools/ref-clone/photo-map-soran.txt', encoding='utf-8'):
       if line.startswith('#') or not line.strip(): continue
       c = line.rstrip('\n').split('\t')
       f, w, h = c[2], int(c[5]), int(c[6])
       target = int(re.search(r'밝기 (\d+)', c[7]).group(1))
       im = Image.open(f'public/soran/assets/{f}')
       mean = ImageStat.Stat(im.convert('L')).mean[0]
       ok = im.size == (w, h) and abs(mean - target) <= 15
       bad += not ok
       print('OK ' if ok else 'NG ', f, im.size, round(mean), target)
   print('NG', bad)
   EOF
   ```
5. 톤 일관성: 슬라이드 묶음(`hero-1~5`, `prologue-hero-1~4`, `room-hero-1~4`·`room-slide-1~3`, `special-hero-1~3`, `menu-1~6`)을 나란히 놓고 색온도·채도가 한 시리즈로 보이는지 확인. 객실(D) 사진은 같은 가구·벽색으로 이어지는지 확인.
6. 재검사: `python3 tools/ref-clone/preflight.py soran pension-lepavilion` (두 번째 인자는 `ref-sites/` 폴더명. ref-sites 는 커밋하지 않으므로 크롤링한 PC에서 실행하고, 스크립트 안의 `REFS`·`ROOT` 경로를 그 PC에 맞춘다).
7. 재촬영: 썸네일 `public/thumbs/soran.jpg` 와 사례 캡처 `public/cases/soran/` 를 새 사진 기준으로 다시 찍는다.

## og.jpg(1200×630) 참고 프롬프트

수량(62)에는 넣지 않는다. 현재 `public/soran/og.jpg` 가 있으므로 필요할 때만 교체한다. 저장 위치 `public/soran/og.jpg`, 1200×630 JPG, 목표 밝기 130 전후 권장(메인 히어로 평균대).
소나무 숲 산자락의 독채와 야외 수영장을 늦은 오후 빛으로 담은 가로 사진. 공유 미리보기에서 작게 보이므로 건물과 수면 반사를 가운데에 크게, 가장자리는 숲으로 단순하게.
English: Late afternoon view of a single villa and its outdoor pool on a pine-forest hillside, building and water reflection large in the center, forest framing the edges, photorealistic, quiet forest pool villa, natural light architectural and lifestyle photography, warm cream and deep pine green palette, soft film tone, no text, no logo, no watermark
