# yoonseul 윤슬 풀빌라 이미지 생성 프롬프트

## 생성 상태

- 현재 `public/yoonseul/assets/` 의 사진 79장은 **톤만 맞춘 임시 이미지(등고선 무늬)** 이며, 실제 사진은 아직 생성 전이다.
- 프롬프트 수: **79개** = `tools/ref-clone/photo-map-yoonseul.txt` 데이터 행 수(y1–y79).
- 이 중 2개(D01 `site-map.jpg`, H02 `location-map.jpg`)는 생성하지 않고 교체 지침만 적었다. 생성 대상은 77장.
- 생성 후 아래에 적은 **파일명 그대로** `public/yoonseul/assets/` 에 덮어쓴다(HTML·CSS 수정 없음).

## 납품 기준

- 브랜드: `윤슬 풀빌라 (YOONSEUL POOL VILLA)` — 포트폴리오용 **가상 브랜드**. 실존 숙소가 아니다.
- 업종: 오션뷰 풀빌라 · 펜션(전 객실 개별 풀, 인피니티 메인 풀, 카페 라운지, 그릴 테라스). 지역은 **"한국 남해안" 수준으로 일반화**하고 실제 섬·해변·지명을 특정하지 않는다.
- 저장 위치: `public/yoonseul/assets/` · 파일명 동일 · 덮어쓰기.
- 크기: **photo-map 의 생성w×생성h 그대로**(각 항목 제목에 적은 픽셀 크기). 비율을 바꾸거나 여백을 붙이지 않는다.
- 형식: sRGB, 고품질 JPG(품질 85–90). 이 브랜드에는 투명 PNG 자리가 없다.
- 공통 스타일: 밝고 공기감 있는 한국 남해안 오션뷰 풀빌라 사진. 흰 스타코 벽·노출 콘크리트·밝은 오크 목재·린넨·라탄·테라초, 청록빛 풀과 바다. 색감은 site.css 토큰 근거로 **아쿠아 청록 `--pri #85bfc1` · 민트 `--sec #91c7b1` · 딥 네이비 `--navy #1c3a5e` · 거의 흰 배경 `--bg #f7f9fb`** — 채도는 낮고 하이라이트는 부드럽게, 물빛은 청록, 그림자는 차가운 네이비 쪽. 계절은 늦봄~초가을, 시간대는 항목별 지정.
- 렌즈 느낌: 전경·건축은 24–35mm 광각(수직선 보정), 인물·디테일은 50–85mm, 항공은 드론 부감(고도 60–120m).
- 공통 금지: 이미지 안의 글자·숫자·간판·객실 번호판·로고·워터마크, 실존 호텔·리조트·풀빌라 브랜드 상표나 알려진 건물 재현, 레퍼런스 사이트 사진 모사, 과한 HDR·CG 렌더 질감·플라스틱 물, 비현실적 인피니티 엣지(바다로 물이 쏟아지는 모습), 왜곡된 손·얼굴·중복 인물, 수영복 선정적 연출, 술병 라벨.
- 인물 조건: 한국인 중심 20–40대 커플·소규모 가족, 특정 실존 인물을 닮지 않게. 뒷모습·실루엣·손·원거리 스냅처럼 **비식별**로, 광고 포즈가 아닌 자연스러운 순간. 인물은 한 장에 1–2명까지.
- 크롭 규칙(CSS 근거):
  - 풀스크린 서브 히어로(`.sh`, 2400×1500): 모바일(≤768) 높이 75svh → 390×≈630 세로 화면이 되어 **가로 중앙 40%만 남는다**. 핵심 피사체는 가로 30–70% 안에.
  - 메인 인트로(`.mi`): 모바일 390×320 → 가로 중앙 약 75%. 항공 슬라이더(`.hs`): 모바일 390×350 → 가로 중앙 약 70%.
  - 스페셜 슬라이더(`.sp`): PC에서 슬라이드 배경이 가로로 0.5배 패럴랙스 이동 → **좌우 가장자리 10%에는 중요 요소를 두지 않는다**. 모바일(≤768)은 2열 카드 195×210 → 가로 중앙 약 58%.
  - 객실 대표(room-01~19, 1140×788): 모바일 메인 타일(≤1024)에서 첫 두 장(room-14·15)은 390×150 띠 → **세로 중앙 55%**, 나머지는 약 1:1 → 가로 중앙 75%. 객실 페이지 미리보기는 199:179 → 가로 중앙 77%. 공통 안전영역: 중앙 가로 55%·세로 55%.
  - ROOM VIEW(`roomview.jpg`): 1001–1280px 에서 가로 전체×50vh 띠 → 세로 중앙 30% 띠만 보임. 인물·창틀 핵심은 세로 35–65% 에.
  - 세로 영상 포스터·객실 큰 사진(prologue-film-2, room-main, special-film): ≤1024 에서 가로 100%×50vh 로 바뀌어 태블릿 가로에서 **세로 중앙 30–40% 띠**만 보인다.
  - 예약 콜라주(booking-2·4·5·6, 가로형): ≤1024 모바일 스와이퍼가 450:596 세로로 잘라 **가로 중앙 50%** 만 남는다.
  - 오시는 길 지도: 모바일 390:399 → 가로 중앙 51%.
- 애니메이션 여유: 스페셜 슬라이더 가로 패럴랙스(위), 스페셜 곡선 사진 hover 1.05배 확대 → 가장자리 3% 여유. 서브 히어로·항공·인트로는 확대(줌) 없이 fade 전환만 있으므로 추가 여유는 필요 없다. `data-parallax`(prologue-frame, room-detail, reser-option)는 사진 틀 전체가 위로 100px 움직여 크롭이 바뀌지 않는다.
- **밝기 가이드**: 각 항목의 `목표 밝기`(0–255 그레이 평균, photo-map 의 → 오른쪽 값)를 노출 기준으로 쓴다. 사진 위 흰 글자·네이비 글자의 대비(덮개 포함)가 이 밝기에서 검증돼 있으므로 **±15 이내**를 지킨다. 어두운 값(40–100)은 해질녘·블루아워·실내 역광 장면으로, 밝은 값(170 이상)은 한낮 하이키 장면으로 맞춘다.
- 텍스트는 모두 HTML 로 올라간다. 사진 안에는 어떤 글자도 만들지 않는다.

## 출력 크기와 수량

- 2400×1500 풀스크린 23장: 인트로 1 · 항공 5 · 스페셜 슬라이더 6 · 서브 히어로 11(프롤로그 3 · 객실 3 · 스페셜 3 · 오시는 길 1 · 예약 1)
- 1140×788 객실 대표 19장
- 800×1112 전체 메뉴 미리보기 6장
- 700×700 공지 팝업 5장
- 예약 콜라주 6장: 468×620 · 658×438 · 600×794 · 704×470 · 522×348 · 446×298
- 1440×1800 ROOM VIEW 1장
- 2400×1335 단지 배치도 1장(생성 제외) · 2400×1308 오시는 길 지도 1장(생성 제외)
- 프롤로그 7장: 2304×1620 · 2400×958 · 702×898 ×3 · 1312×1622 · 1312×810
- 객실 상세 4장: 1680×1530 · 784×1028 · 1944×1356 · 2400×813
- 스페셜 4장: 1440×1486 · 1040×720 · 840×642 · 840×1088
- 예약 안내 2장: 1296×906 · 1080×1328
- 합계 **79장**(생성 77 + 교체 지침 2)

---

## A. 메인 페이지 · 19장

### A01 (y1) · `intro-poster.jpg` · 2400×1500 · 바다로 열린 인피니티 풀
사용 위치: 메인 첫 화면 풀스크린(영상 자리 포스터, 글자: 중앙 대형 흰 글자 YOONSEUL · 28% 어둡게 덮임) · 목표 밝기 157
초여름 오전 10시, 흰 스타코 테라스 끝에서 바다 쪽으로 뻗은 인피니티 풀을 사람 눈높이(1.5m) 24mm 광각으로 정면 촬영. 풀 수면과 수평선이 화면 세로 55% 부근에서 하나로 이어지고, 수면에 잔잔한 윤슬이 반짝인다. 화면 중앙은 대형 글자가 올라가므로 복잡한 요소 없이 하늘·수평선·수면만 두고, 좌우 가장자리에 흰 벽과 선베드를 약간. 모바일은 가로 중앙 75%만 보이므로 수평선과 풀 가장자리는 중앙에 둔다.
English: Eye-level 24mm wide view of an infinity pool at the edge of a white stucco terrace opening onto a calm southern Korean sea on an early-summer morning, pool edge and horizon merging at mid-frame with soft sparkling glints, clean empty center for a title, white walls and a few loungers only at the far sides; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A02 (y2) · `aerial-1.jpg` · 2400×1500 · 한낮 단지 부감
사용 위치: 메인 항공 슬라이드 1(글자: 하단 10% 좌우의 흰 화살표·번호) · 목표 밝기 171
맑은 한낮, 드론 고도 약 100m에서 해안 절벽 위 계단식으로 놓인 흰 저층 풀빌라 10여 동과 각 동의 청록 개별 풀, 바다 쪽 인피니티 메인 풀을 45도 부감. 청록 얕은 바다와 흰 파도선이 화면 아래쪽, 초록 해송 숲이 위쪽을 채운다. 단지는 가로 중앙 70% 안에 모으고 하단 10%는 바다 면으로 단순하게.
English: Midday drone view from about 100m at 45 degrees over a cluster of low white modern pool villas stepped along a green coastal hillside, each with a small turquoise private pool and one larger infinity pool facing a shallow aqua sea with white surf lines, pine forest above; photorealistic, bright airy coastal pool villa aerial photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A03 (y3) · `aerial-2.jpg` · 2400×1500 · 흐린 날 해안선 부감
사용 위치: 메인 항공 슬라이드 2(글자: 하단 흰 화살표·번호) · 목표 밝기 112
옅은 구름이 낀 오후, 드론 고도 약 120m에서 단지와 굽은 해안선, 짙은 청록 바다를 더 넓게 담은 장면. 바다 면적이 화면의 절반을 넘고 바위 해안에 부서지는 흰 물결이 곡선을 그린다. A02와 같은 단지를 다른 방향(바다 쪽에서 육지 쪽)으로 본 구도로 시리즈 톤을 통일.
English: Overcast afternoon drone view from about 120m looking from the sea toward land, a curved rocky coastline with white foam, deep teal water filling half the frame, the same small white pool villa cluster on the hillside at center; photorealistic, calm muted coastal aerial photography, soft aqua-teal and navy palette, no text, no logo, no watermark.

### A04 (y4) · `aerial-3.jpg` · 2400×1500 · 수직 부감 풀과 지붕
사용 위치: 메인 항공 슬라이드 3(글자: 하단 흰 화살표·번호) · 목표 밝기 125
늦은 오후, 드론을 수직(탑다운)으로 내려 흰 평지붕과 개별 풀, 목재 데크, 바다 가장자리 바위가 기하학 패턴을 이루는 장면. 긴 그림자가 대각선으로 떨어지고, 바다 쪽은 짙은 청록. 풀과 지붕 패턴은 가로 중앙에 두고 하단은 어두운 바다 면.
English: Late-afternoon top-down drone shot of flat white roofs, rectangular turquoise private pools and oak decks forming a geometric pattern beside dark teal sea and rocks, long diagonal shadows; photorealistic, minimal architectural aerial photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A05 (y5) · `aerial-4.jpg` · 2400×1500 · 밤의 단지
사용 위치: 메인 항공 슬라이드 4(글자: 하단 흰 화살표·번호) · 목표 밝기 41
해가 진 뒤 30분 블루아워, 드론 고도 약 80m. 짙은 네이비 바다와 하늘 사이로 단지 창과 풀 수중조명이 따뜻한 호박색·청록으로 은은히 빛난다. 전체는 매우 어둡게(평균 41) 유지하고 밝은 점은 단지 부분에만. 단지는 중앙 70% 안.
English: Blue-hour drone view from about 80m, deep navy sea and sky, the small white villa cluster glowing softly with warm window light and underwater turquoise pool lights, overall very dark exposure; photorealistic, quiet night coastal aerial photography, navy and aqua palette, no text, no logo, no watermark.

### A06 (y6) · `aerial-5.jpg` · 2400×1500 · 아침 햇살 해안
사용 위치: 메인 항공 슬라이드 5(글자: 하단 흰 화살표·번호) · 목표 밝기 148
이른 아침 역광, 드론 고도 약 60m에서 수평선 쪽 햇빛이 바다에 긴 윤슬 띠를 만든다. 전경에 단지의 인피니티 풀과 테라스, 멀리 작은 섬 실루엣 두세 개(특정 섬 아님). 햇빛 띠는 가로 중앙에.
English: Early-morning backlit drone view from about 60m, a long band of sparkling sunlight on the sea toward the horizon, the villa's infinity pool and terrace in the foreground, two or three generic island silhouettes far away; photorealistic, luminous coastal aerial photography, soft aqua-teal and pale gold palette, no text, no logo, no watermark.

### A07 (y7) · `special-1.jpg` · 2400×1500 · Ocean View 창가
사용 위치: 메인·스페셜 슬라이더 1 OCEAN VIEW(글자: 중앙 흰 대형 제목, 중앙 방사형 어둡게 덮임) / 모바일 2열 카드(글자: 중앙 흰 라벨) · 목표 밝기 186 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
한낮, 흰 벽과 밝은 오크 바닥의 거실에서 바닥부터 천장까지 이어진 통창 너머로 바다가 가득 보이는 하이키 실내. 얇은 린넨 커튼이 바람에 살짝 날리고, 창가에 라탄 라운지체어 하나. 중앙은 밝은 바다·하늘 면으로 비워 두고, 가구는 가로 20–80% 안(좌우 10%는 패럴랙스로 가려짐).
English: High-key midday interior of a white-walled living room with light oak floor and floor-to-ceiling windows filled with calm sea, a sheer linen curtain drifting and one rattan lounge chair by the glass, bright open center; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A08 (y8) · `special-2.jpg` · 2400×1500 · Private Pool
사용 위치: 슬라이더 2 PRIVATE POOL(글자: 중앙 흰 제목) / 모바일 2열 카드 · 목표 밝기 111 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
늦은 오후 5시, 객실 테라스의 개별 풀을 풀 가장자리 낮은 시점(50cm) 28mm로 촬영. 짙은 청록 수면에 사선 햇빛이 흔들리고, 풀 끝은 수평선과 겹친다. 흰 벽 그림자가 화면 절반을 덮어 전체 밝기는 중간보다 어둡게. 풀과 수평선은 가로 중앙 58% 안.
English: Low 50cm view along a private terrace pool at 5pm, deep teal water with rippling diagonal sunlight, pool edge overlapping the sea horizon, soft shadow of a white wall covering half the frame; photorealistic, calm coastal pool villa photography, aqua-teal and navy palette, no text, no logo, no watermark.

### A09 (y9) · `special-3.jpg` · 2400×1500 · Infinity Pool
사용 위치: 슬라이더 3 INFINITY POOL(글자: 중앙 흰 제목) / 모바일 2열 카드 · 목표 밝기 148 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오전 11시, 메인 인피니티 풀을 측면 약간 높은 시점(3m)에서 35mm로 촬영. 풀 한가운데에서 한 사람이 바다 쪽으로 천천히 헤엄치는 작은 뒷모습(비식별), 풀 가장자리 흰 테라초와 선베드 줄. 인물은 가로 중앙.
English: Late-morning view from 3m height across a long infinity pool toward the sea, one small swimmer seen from behind gliding toward the horizon at center, white terrazzo edge and a row of loungers; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A10 (y10) · `special-4.jpg` · 2400×1500 · Sunset Deck 포토존
사용 위치: 슬라이더 4 SUNSET DECK(글자: 중앙 흰 제목) / 모바일 2열 카드 · 목표 밝기 144 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
해 지기 1시간 전, 바다 쪽으로 튀어나온 오크 전망 데크와 흰 사각 프레임 조형물(포토존)이 바다를 액자처럼 담는 장면. 수면 위로 금빛 윤슬이 길게 번지고, 데크 끝에 커플 뒷모습 실루엣이 작게. 프레임과 인물은 가로 중앙.
English: Golden hour an hour before sunset, an oak viewing deck projecting toward the sea with a simple white square frame sculpture framing the water, a long golden glint path on the sea, a small couple silhouette from behind at the deck end, centered; photorealistic, warm coastal pool villa photography, soft aqua-teal and pale gold palette, no text, no logo, no watermark.

### A11 (y11) · `special-5.jpg` · 2400×1500 · Lounge Cafe
사용 위치: 슬라이더 5 LOUNGE CAFE(글자: 중앙 흰 제목) / 모바일 2열 카드 · 목표 밝기 156 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오후 3시, 통창 너머 바다가 액자처럼 걸린 카페 라운지. 밝은 오크 긴 테이블, 흰 도자 컵 두 개와 작은 디저트 접시, 라탄 의자, 테이블 위로 창빛이 부드럽게 떨어진다. 사람 없음. 테이블은 화면 아래 중앙, 창과 바다는 중앙 위.
English: Afternoon café lounge with a floor-to-ceiling window framing the sea, a long light-oak table with two white ceramic cups and a small dessert plate, rattan chairs, soft window light, no people; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A12 (y12) · `special-6.jpg` · 2400×1500 · Grill Terrace
사용 위치: 슬라이더 6 GRILL TERRACE(글자: 중앙 흰 제목) / 모바일 2열 카드 · 목표 밝기 152 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
해 질 무렵 이른 저녁(아직 하늘이 밝은 시간), 바다가 보이는 테라스의 검은 무광 숯 그릴과 오크 테이블, 채소·해산물이 담긴 흰 접시, 얇은 연기. 뒤로 풀과 바다. 상표 없는 그릴, 술병 없음. 그릴과 테이블은 가로 중앙.
English: Early evening with the sky still bright, a matte black charcoal grill and oak table on a sea-view terrace, white plates of vegetables and seafood, a thin wisp of smoke, pool and sea behind, unbranded grill; photorealistic, relaxed coastal pool villa photography, soft aqua-teal and warm white palette, no text, no logo, no watermark.

### A13 (y13) · `booking-1.jpg` · 468×620 · 풀사이드 테이블
사용 위치: 예약 콜라주 1(세로, 글자 겹침 없음) / 모바일 스와이퍼 450:596 · 목표 밝기 166
한낮 풀사이드의 작은 흰 원형 사이드 테이블 위에 유리잔 두 개와 레몬 슬라이스, 뒤로 흐릿한 청록 풀. 50mm 얕은 심도, 위에서 약 30도 내려다본 세로 구도. 테이블은 중앙.
English: Midday poolside, a small round white side table with two clear glasses and lemon slices, blurred turquoise pool behind, 50mm shallow depth of field, vertical composition; photorealistic, bright airy coastal lifestyle photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A14 (y14) · `booking-2.jpg` · 658×438 · 햇살 비친 수면
사용 위치: 예약 콜라주 2(가로) / 모바일 450:596 로 가로 중앙 50%만 남음 · 목표 밝기 107
풀 수면을 위에서 내려다본 클로즈업, 청록 물 위로 햇빛 그물무늬(코스틱)가 흔들린다. 밝기는 중간보다 약간 어둡게, 패턴은 화면 전체에 고르게 두어 어디를 잘라도 성립하게.
English: Top-down close-up of pool water with shimmering sunlight caustic patterns on deep turquoise, evenly spread texture across the frame; photorealistic, calm abstract water photography, aqua-teal palette, no text, no logo, no watermark.

### A15 (y15) · `booking-3.jpg` · 600×794 · 노을 속 인물 실루엣
사용 위치: 예약 콜라주 3(세로) / 모바일 스와이퍼 · 목표 밝기 157
노을 직전 역광, 테라스 난간 옆에 선 여성의 뒷모습 실루엣(비식별), 린넨 원피스 자락이 바람에 날린다. 배경은 밝은 복숭아빛 하늘과 반짝이는 바다라 전체는 밝은 편. 인물은 세로 중앙.
English: Backlit just before sunset, a woman seen from behind beside a terrace railing, linen dress moving in the breeze, bright peach sky and glittering sea behind, vertical composition, anonymous; photorealistic, soft coastal lifestyle photography, pale aqua and peach palette, no text, no logo, no watermark.

### A16 (y16) · `booking-4.jpg` · 704×470 · 테라스 선베드
사용 위치: 예약 콜라주 4(가로) / 모바일 가로 중앙 50% · 목표 밝기 127
오후, 오크 데크 위 흰 쿠션 선베드 두 개와 접힌 수건, 파라솔 그림자가 선베드 절반을 덮는다. 선베드는 가로 중앙에 모으고 뒤로 풀·바다.
English: Afternoon oak terrace with two white-cushioned sun loungers and folded towels, a parasol shadow over half of them, pool and sea behind, loungers centered; photorealistic, relaxed coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### A17 (y17) · `booking-5.jpg` · 522×348 · 수평선과 난간
사용 위치: 예약 콜라주 5(가로) / 모바일 가로 중앙 50% · 목표 밝기 129
흐린 오전, 유리·스테인리스 난간 너머로 곧게 뻗은 수평선과 부드러운 회청색 바다. 85mm 망원 압축, 난간 기둥 하나가 중앙에 오는 미니멀 구도.
English: Overcast morning, a glass and stainless railing in the foreground with a straight horizon and soft blue-grey sea beyond, 85mm compression, one railing post at center, minimal; photorealistic, quiet coastal photography, muted aqua and grey palette, no text, no logo, no watermark.

### A18 (y18) · `booking-6.jpg` · 446×298 · 해질녘 거실
사용 위치: 예약 콜라주 6(가로) / 모바일 가로 중앙 50% · 목표 밝기 54
해가 진 직후, 조명을 낮춘 거실 실내. 통창 밖은 짙은 청회색 바다와 옅은 노을띠, 실내는 플로어 스탠드 한 개의 따뜻한 빛이 소파 일부만 비춘다. 전체는 어둡게(평균 54).
English: Just after sunset, a dim living room with one warm floor lamp lighting part of a linen sofa, floor-to-ceiling window showing dark blue-grey sea and a faint afterglow band, overall dark exposure; photorealistic, moody coastal interior photography, navy and warm amber palette, no text, no logo, no watermark.

### A19 (y19) · `roomview.jpg` · 1440×1800 · 창가에 기대 바다를 보는 인물
사용 위치: 메인 ROOM VIEW 좌측 고정 사진(글자: 좌상단 흰 제목·설명, 상단 55% 어둡게 그라데이션) · 목표 밝기 157
오전의 밝은 객실, 큰 창틀에 기대어 바다를 바라보는 여성의 옆·뒷모습(비식별), 흰 셔츠와 린넨 커튼, 창밖 청록 바다. 상단 40%는 흰 벽·천장처럼 단순하게 두어 글자 자리를 만들고, 인물과 창은 세로 35–65% 띠에 둔다(1001–1280px 에서 가로 띠로 잘림).
English: Bright morning guest room, a woman seen from the side and behind leaning on a large window frame looking at the turquoise sea, white shirt and linen curtain, simple white wall and ceiling in the upper 40%, subject in the middle vertical band; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

## B. 객실 대표 사진 · 19장

공통: 1140×788, 메인 ROOM VIEW 목록(글자: 이미지 하단에 네이비 대형 객실명이 40px 겹침 → 하단 띠는 밝고 단순하게) · 모바일 메인 타일(흰 글자, 40% 어둡게 덮임) · 객실 페이지 미리보기(199:179). 핵심은 중앙 가로 55%·세로 55%. 각 객실이 서로 다른 장면이 되게 하되 같은 건축 언어(흰 벽·오크·린넨·청록 풀)로 통일. **모두 실제 납품 시 실제 객실 사진으로 교체(샘플 시연용 생성 가능)** — 실제 숙소 운영 시 객실 모습과 다르면 오인 광고가 되기 때문.

### B01 (y20) · `room-01.jpg` · 1140×788 · 101 Yoonseul Suite A 거실과 풀
사용 위치: 101 YOONSEUL SUITE A 대표 · 모바일 메인 타일 3번(1:1 가깝게 잘림) · 목표 밝기 148
1층 스위트 거실에서 통창 너머 테라스 개별 풀과 바다를 보는 정면 구도, 한낮. 흰 소파와 오크 커피 테이블, 창 밖 풀이 가로 중앙.
English: Ground-floor suite living room at midday, white sofa and oak coffee table, floor-to-ceiling glass opening onto a terrace private pool and the sea, centered; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B02 (y21) · `room-02.jpg` · 1140×788 · 102 Yoonseul Suite A 테라스 풀
사용 위치: 102 YOONSEUL SUITE A 대표 · 목표 밝기 137
오후, 테라스에서 실내 쪽을 돌아본 역방향 구도: 앞쪽 개별 풀, 뒤로 열린 슬라이딩 창과 거실. 풀 수면에 실내가 비친다.
English: Afternoon reverse view from the terrace back toward the suite, private pool in the foreground reflecting the open sliding doors and living room; photorealistic, calm coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B03 (y22) · `room-03.jpg` · 1140×788 · 103 Yoonseul Suite A 침실 오션뷰
사용 위치: 103 YOONSEUL SUITE A 대표 · 목표 밝기 169
아침 하이키, 흰 침구의 퀸 침대 너머 창으로 바다와 풀 가장자리가 보인다. 침대 발치 쪽 눈높이 35mm.
English: High-key morning bedroom, queen bed with white linen, window beyond showing the sea and the edge of a private pool, eye-level 35mm; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B04 (y23) · `room-04.jpg` · 1140×788 · 104 Yoonseul Suite A 코너 창
사용 위치: 104 YOONSEUL SUITE A 대표 · 목표 밝기 162
한낮, 두 면이 유리인 코너 거실과 바깥 풀, 라탄 암체어와 작은 원목 사이드 테이블. 코너 창은 가로 중앙.
English: Midday corner living room with two glass walls, rattan armchair and small wooden side table, private pool and sea outside, corner centered; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B05 (y24) · `room-05.jpg` · 1140×788 · 107 Yoonseul Suite A 풀과 데이베드
사용 위치: 107 YOONSEUL SUITE A 대표 · 목표 밝기 133
늦은 오후, 개별 풀 옆 흰 캐노피 데이베드와 부드러운 그림자, 뒤로 바다. 풀 가장자리 낮은 시점.
English: Late afternoon, a white canopy daybed beside a private pool with soft shadows, sea behind, low viewpoint at pool edge; photorealistic, calm coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B06 (y25) · `room-06.jpg` · 1140×788 · 201 Yoonseul Suite B 2층 거실
사용 위치: 201 YOONSEUL SUITE B 대표 · 모바일 메인 타일 4번 · 목표 밝기 142
2층 거실, 높은 박공 천장과 노출 목재 서까래, 통창 밖 한 단 아래 풀과 넓은 바다. 오후 빛.
English: Second-floor living room with a high pitched ceiling and exposed timber rafters, floor-to-ceiling window looking down to a pool one level below and the wide sea, afternoon light; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B07 (y26) · `room-07.jpg` · 1140×788 · 202 Yoonseul Suite B 발코니 풀
사용 위치: 202 YOONSEUL SUITE B 대표 · 목표 밝기 147
2층 발코니에 놓인 좁고 긴 개별 풀, 유리 난간 너머 바다. 오전, 측면 시점.
English: A long narrow private pool on a second-floor balcony, glass railing and sea beyond, morning side view; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B08 (y27) · `room-08.jpg` · 1140×788 · 203 Yoonseul Suite B 다이닝
사용 위치: 203 YOONSEUL SUITE B 대표 · 목표 밝기 152
한낮, 오크 6인 식탁과 펜던트 조명, 뒤로 창 너머 풀과 바다. 식탁 위 빈 흰 그릇만.
English: Midday dining area with an oak six-seat table and a simple pendant lamp, empty white bowls, pool and sea through the window; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B09 (y28) · `room-09.jpg` · 1140×788 · 204 Yoonseul Suite B 침실 테라스
사용 위치: 204 YOONSEUL SUITE B 대표 · 목표 밝기 156
오전, 침실에서 열린 테라스로 이어지는 문, 흰 커튼이 문틀에 걸리고 밖은 풀과 수평선.
English: Morning bedroom opening onto a terrace, white curtain at the doorframe, pool and horizon outside; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B10 (y29) · `room-10.jpg` · 1140×788 · 207 Yoonseul Suite B 해질녘 풀
사용 위치: 207 YOONSEUL SUITE B 대표 · 목표 밝기 119
해 지기 직전, 개별 풀 수중조명이 막 켜지고 하늘은 옅은 라벤더. 거실 창에 따뜻한 빛. 중간보다 어둡게.
English: Just before sunset, a private pool with underwater lights just switched on, pale lavender sky, warm light in the living-room windows, slightly dark exposure; photorealistic, calm coastal pool villa photography, aqua-teal and soft lavender palette, no text, no logo, no watermark.

### B11 (y30) · `room-11.jpg` · 1140×788 · 212 Horizon Suite 파노라마 창
사용 위치: 212 HORIZON SUITE 대표 · 모바일 메인 타일 7번 · 목표 밝기 168
2층 최상위 스위트, 벽 전체가 유리인 넓은 거실과 수평선이 화면을 가로지르는 파노라마, 한낮 하이키. 로우 소파 한 세트.
English: Top-floor suite with a full-width glass wall, the horizon crossing the whole frame, a low sofa set, high-key midday; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B12 (y31) · `room-12.jpg` · 1140×788 · 105 Shimmer Superior A 2인 객실
사용 위치: 105 SHIMMER SUPERIOR A 대표 · 모바일 메인 타일 5번 · 목표 밝기 139
2인용 아담한 객실, 창가 쪽 침대와 작은 원형 풀(자쿠지형)이 테라스에 보인다. 오후.
English: Cozy two-person room, bed by the window and a small round plunge pool on the terrace outside, afternoon; photorealistic, calm coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B13 (y32) · `room-13.jpg` · 1140×788 · 106 Shimmer Superior B 욕조와 바다
사용 위치: 106 SHIMMER SUPERIOR B 대표 · 모바일 메인 타일 6번 · 목표 밝기 123
창가에 놓인 흰 독립 욕조와 바다 전망, 테라초 바닥, 오후 늦은 부드러운 빛. 중간보다 조금 어둡게.
English: Freestanding white bathtub by a large window with sea view, terrazzo floor, soft late-afternoon light, slightly dark exposure; photorealistic, calm coastal interior photography, soft aqua-teal and grey palette, no text, no logo, no watermark.

### B14 (y33) · `room-14.jpg` · 1140×788 · 205 Grand Suite A 대형 거실과 풀
사용 위치: 205 GRAND SUITE A 대표 · 모바일 메인 첫 타일(390×150 가로 띠 → 세로 중앙 55%) · 목표 밝기 129
넓은 2층 거실과 테라스의 대형 개별 풀이 한 화면에 수평으로 이어지는 와이드 구도. 핵심(풀·소파·수평선)을 세로 중앙 띠에 모은다. 오후.
English: Wide composition of a large second-floor living room flowing horizontally into a big terrace pool, sofa, pool and horizon aligned in the middle horizontal band, afternoon; photorealistic, calm coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B15 (y34) · `room-15.jpg` · 1140×788 · 206 Grand Suite B 풀 데크 전경
사용 위치: 206 GRAND SUITE B 대표 · 모바일 메인 둘째 타일(390×150 가로 띠) · 목표 밝기 129
테라스 끝에서 본 긴 풀 데크와 선베드 줄, 뒤로 건물 입면과 바다. 요소를 세로 중앙 띠에 수평으로 배열.
English: Long pool deck viewed from the terrace end, a row of loungers, villa facade and sea behind, elements arranged horizontally in the middle band; photorealistic, calm coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B16 (y35) · `room-16.jpg` · 1140×788 · 108 Breeze Deluxe A
사용 위치: 108 BREEZE DELUXE A 대표 · 모바일 메인 타일 8번 · 목표 밝기 154
실용적인 디럭스 객실, 흰 벽과 오크 수납장, 창 밖 작은 풀과 바다, 바람에 흔들리는 커튼. 오전.
English: Simple deluxe room with white walls and oak storage, curtain moving in the breeze, small pool and sea outside, morning; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B17 (y36) · `room-17.jpg` · 1140×788 · 208 Breeze Deluxe B
사용 위치: 208 BREEZE DELUXE B 대표 · 모바일 메인 타일 9번 · 목표 밝기 169
2층 디럭스, 하이키 한낮, 트윈 침대와 창가 좌식 벤치, 창 너머 바다.
English: Second-floor deluxe room at high-key midday, twin beds and a built-in window bench, sea beyond the glass; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B18 (y37) · `room-18.jpg` · 1140×788 · 110 Breeze Deluxe C
사용 위치: 110 BREEZE DELUXE C 대표 · 모바일 메인 타일 10번 · 목표 밝기 180
아주 밝은 오전, 흰 평상형 침대와 린넨, 창 밖 풀 가장자리가 반짝인다. 하이키.
English: Very bright morning, a low white platform bed with linen, sparkling pool edge outside the window, high-key; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### B19 (y38) · `room-19.jpg` · 1140×788 · 111 Breeze Deluxe C
사용 위치: 111 BREEZE DELUXE C 대표(ROOM VIEW 목록·객실 미리보기) · 목표 밝기 169
한낮, 거실 소파 뒤쪽에서 창과 테라스 풀을 바라본 구도, 쿠션 몇 개와 라탄 바구니. B18과 같은 타입이지만 다른 각도.
English: Midday view from behind a sofa toward the window and terrace pool, a few cushions and a rattan basket; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

## C. 전체 메뉴 미리보기 · 6장

공통: 800×1112 세로(0.72), PC 전체 메뉴 가운데 칸(모바일 비표시), 글자 겹침 없음. 여섯 장이 세로 시리즈로 이어지게 톤 통일.

### C01 (y39) · `menu-1.jpg` · 800×1112 · 프롤로그 — 흰 벽과 바다
사용 위치: 전체 메뉴 Yoonseul(프롤로그) 미리보기 · 목표 밝기 179
한낮 하이키, 곡선형 흰 스타코 벽 모서리 너머로 바다 한 조각과 파란 하늘. 세로 구도, 벽의 곡선이 화면 중앙을 가로지른다.
English: High-key midday, the curved corner of a white stucco wall with a slice of sea and blue sky beyond, vertical composition; photorealistic, minimal bright coastal architecture photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### C02 (y40) · `menu-2.jpg` · 800×1112 · 객실
사용 위치: 전체 메뉴 Rooms 미리보기 · 목표 밝기 141 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오후, 침실 창가의 흰 침구와 협탁, 세로로 긴 창에 바다가 담긴다.
English: Afternoon bedroom corner with white bedding and a nightstand, a tall window framing the sea, vertical; photorealistic, calm coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### C03 (y41) · `menu-3.jpg` · 800×1112 · 스페셜
사용 위치: 전체 메뉴 Special 미리보기 · 목표 밝기 148
인피니티 풀 가장자리를 세로로 내려다본 구도, 풀과 바다가 층을 이루고 수면 윤슬이 반짝인다.
English: Vertical view down an infinity pool edge, pool water and sea forming layered bands with sparkling glints; photorealistic, bright coastal pool villa photography, soft aqua-teal palette, no text, no logo, no watermark.

### C04 (y42) · `menu-4.jpg` · 800×1112 · 주변 여행
사용 위치: 전체 메뉴 Travel 미리보기 · 목표 밝기 127
한국 남해안의 일반적인 해안 산책로: 해송 사이 나무 데크길과 바위 해안, 흐린 오후. 특정 관광지·표지판 없음.
English: Generic southern Korean coastal walking trail, wooden boardwalk between pine trees above a rocky shore, overcast afternoon, no signage, vertical; photorealistic, calm coastal travel photography, muted teal and green palette, no text, no logo, no watermark.

### C05 (y43) · `menu-5.jpg` · 800×1112 · 오시는 길
사용 위치: 전체 메뉴 Location 미리보기 · 목표 밝기 190
아주 밝은 한낮, 해안도로에서 단지로 들어가는 흰 담장 진입로와 파란 하늘, 바다 조각. 번호판·표지판 없음.
English: Very bright midday, a white-walled entrance lane leading from a coastal road into the villa, blue sky and a slice of sea, no signs or plates, vertical; photorealistic, high-key coastal architecture photography, soft aqua and white palette, no text, no logo, no watermark.

### C06 (y44) · `menu-6.jpg` · 800×1112 · 예약 안내
사용 위치: 전체 메뉴 Reservation 미리보기 · 목표 밝기 150
오후, 입구 현관 벤치 위 접힌 흰 타월과 유리 물병, 뒤로 흐릿한 풀. 환영하는 느낌의 정물.
English: Afternoon still life at the entrance, folded white towels and a glass carafe on a wooden bench, blurred pool behind, welcoming mood, vertical; photorealistic, bright airy coastal lifestyle photography, soft aqua-teal and white palette, no text, no logo, no watermark.

## D. 단지 배치도 · 1장

### D01 (y45) · `site-map.jpg` · 2400×1335 · 단지 배치도 — 생성 제외(교체 지침)
사용 위치: 객실 상세 하단 배치도 · 모바일 메인 VIEW MORE 아래(검은 바탕, 높이 220px 가운데 크롭) · 목표 밝기 72
**생성하지 않는다.** 객실 번호가 정확히 표기돼야 하는 배치도라 이미지 생성기로 만들면 번호 오류·가짜 동선이 생기고 실제 단지와 다르면 오인을 준다. 실제 운영 시 설계사무소의 배치도 또는 실제 드론 사진 위에 디자이너가 객실 번호를 얹은 일러스트로 교체한다. 샘플 단계에서 바꾸려면 글자 없는 어두운 톤(평균 72 ± 15) 항공 일러스트를 만들고 객실 번호는 HTML/SVG 로 올린다. 모바일은 세로 중앙 약 30%만 보이므로 동 배치를 가로 띠로 모은다.

## E. 프롤로그 페이지 · 10장

### E01 (y46) · `hero-prologue-1.jpg` · 2400×1500 · 블루아워 단지
사용 위치: 프롤로그 서브 히어로 슬라이드 1(글자: 하단 중앙 흰 PROLOGUE와 화살표, 하단 45% 어둡게 그라데이션) · 목표 밝기 83
해가 진 뒤 블루아워, 바다 쪽에서 본 흰 풀빌라 입면과 수중조명 켜진 풀, 짙은 청색 하늘. 건물과 풀은 가로 30–70% 안(모바일 세로 크롭), 하단은 어두운 수면.
English: Blue hour after sunset, white pool villa facade seen from the sea side with underwater-lit pool and deep blue sky, building and pool within the central 40% width, dark water at the bottom; photorealistic, quiet coastal architecture photography, navy and aqua palette, no text, no logo, no watermark.

### E02 (y47) · `hero-prologue-2.jpg` · 2400×1500 · 흰 벽과 햇살
사용 위치: 프롤로그 서브 히어로 슬라이드 2(글자: 하단 중앙 흰 글자) · 목표 밝기 141
오후, 흰 벽에 대각선으로 드리운 햇살과 창 그림자, 벽 앞 좁은 풀 수면이 빛을 반사해 벽에 물결무늬가 일렁인다. 벽 모서리는 가로 중앙.
English: Afternoon sunlight falling diagonally across a white wall with window shadows, a narrow pool in front casting rippling water reflections onto the wall, wall corner centered; photorealistic, minimal bright coastal architecture photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### E03 (y48) · `hero-prologue-3.jpg` · 2400×1500 · 수평선의 오전
사용 위치: 프롤로그 서브 히어로 슬라이드 3(글자: 하단 중앙 흰 글자) · 목표 밝기 147
오전, 테라스 난간 없는 끝단에서 수평선을 향한 넓은 바다와 하늘, 전경에 풀 모서리 한 줄. 미니멀, 요소는 가로 중앙.
English: Morning, a wide sea and sky toward the horizon from a terrace edge, one line of pool corner in the foreground, minimal and centered; photorealistic, bright airy coastal photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### E04 (y57) · `prologue-film.jpg` · 2304×1620 · 소개 영상 포스터
사용 위치: 프롤로그 소개 영상 자리 포스터(80% 폭 16:9 상자에 cover, 글자 없음) · 목표 밝기 157 · 영상 제작 시 첫 프레임과 같은 장면으로 맞춘다
오전, 인피니티 풀 가장자리에 앉아 바다를 보는 커플 뒷모습(비식별), 넓은 청록 바다와 흰 테라스. 영상 첫 장면 같은 차분한 와이드, 인물은 가로 중앙.
English: Morning, a couple seen from behind sitting at the infinity pool edge looking at a wide turquoise sea, white terrace, calm cinematic wide frame, centered; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### E05 (y58) · `prologue-wide.jpg` · 2400×958 · 테라스 너머 건물 외관
사용 위치: 프롤로그 와이드(모바일 390×253 으로 가로 중앙 62%) · 목표 밝기 129
늦은 오후, 전경 오크 테라스 너머로 계단식 흰 풀빌라 동들이 가로로 이어지는 외관 파노라마, 뒤 언덕의 해송. 건물 핵심은 가로 중앙 60%.
English: Late-afternoon panorama over an oak terrace toward stepped white pool villa buildings stretching horizontally, pine hillside behind, key buildings in the central 60%; photorealistic, calm coastal architecture photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### E06 (y59) · `prologue-frame-1.jpg` · 702×898 · 흰 벽과 바다
사용 위치: 프롤로그 라인 목록 1 Glint Frame(PC 194×248, 모바일 351×449, 글자 겹침 없음) · 목표 밝기 168
한낮, 흰 벽에 뚫린 사각 개구부 너머로 바다가 액자처럼 보이는 세로 구도. 개구부는 중앙.
English: Midday, a square opening in a white wall framing the sea like a picture, vertical, opening centered; photorealistic, minimal bright coastal architecture photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### E07 (y60) · `prologue-frame-2.jpg` · 702×898 · 끝없는 푸른 수평선
사용 위치: 프롤로그 라인 목록 2 Still Horizon · 목표 밝기 142
오전, 풀 수면과 바다, 하늘이 세 층으로 나뉜 세로 미니멀 구도. 수평선은 세로 45% 지점.
English: Morning, vertical minimal frame of pool water, sea and sky as three calm bands, horizon at 45% height; photorealistic, serene coastal photography, soft aqua-teal palette, no text, no logo, no watermark.

### E08 (y61) · `prologue-frame-3.jpg` · 702×898 · 흰 벽에 드리운 햇살
사용 위치: 프롤로그 라인 목록 3 · 목표 밝기 150
오후, 흰 벽과 라탄 의자 한 개에 야자·해송 잎 그림자가 드리운 세로 정물.
English: Afternoon, shadows of pine or palm leaves falling on a white wall and a single rattan chair, vertical still life; photorealistic, soft bright coastal lifestyle photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### E09 (y62) · `prologue-film-2.jpg` · 1312×1622 · 하단 세로 영상 포스터
사용 위치: 프롤로그 하단 세로 영상 자리 포스터(PC 656×900, ≤1024 가로 100%×50vh 띠, 글자 겹침 없음) · 목표 밝기 140
오후, 풀 안에서 바다 쪽으로 서 있는 여성의 뒷모습 상반신 실루엣, 수면 윤슬. 인물은 세로 35–65% 띠 안에 두어 태블릿 가로 크롭에서도 남게.
English: Afternoon, a woman standing waist-deep in a pool facing the sea, seen from behind, sparkling water, subject kept in the middle vertical band; photorealistic, soft coastal lifestyle photography, soft aqua-teal palette, no text, no logo, no watermark.

### E10 (y63) · `prologue-still.jpg` · 1312×810 · 바위 해안과 풀
사용 위치: 프롤로그 하단 가로 사진(글자 겹침 없음) · 목표 밝기 135
늦은 오후, 풀 가장자리 너머로 짙은 회색 바위 해안과 흰 물보라, 35mm 가로 구도.
English: Late afternoon, beyond a pool edge a dark grey rocky shore with white spray, 35mm horizontal frame; photorealistic, calm coastal photography, aqua-teal and slate palette, no text, no logo, no watermark.

## F. 객실 상세 페이지 · 7장

### F01 (y49) · `hero-room-1.jpg` · 2400×1500 · 객실 히어로 거실
사용 위치: 객실 서브 히어로 슬라이드 1(글자: 하단 중앙 흰 ROOMS, 하단 어둡게) · 목표 밝기 143 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
한낮, 넓은 스위트 거실과 통창 너머 개별 풀·바다를 정면에서 담은 와이드. 소파와 창의 중심은 가로 30–70%.
English: Midday wide view of a spacious suite living room facing floor-to-ceiling glass with private pool and sea, sofa and window center within the middle 40% width; photorealistic, bright airy coastal pool villa interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### F02 (y50) · `hero-room-2.jpg` · 2400×1500 · 객실 히어로 침실
사용 위치: 객실 서브 히어로 슬라이드 2 · 목표 밝기 146 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오전, 흰 침구의 침대와 그 뒤 창 너머 바다, 커튼 사이 빛줄기. 침대는 가로 중앙.
English: Morning bedroom with white-linen bed centered, sea through the window behind, beams of light between curtains; photorealistic, bright airy coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### F03 (y51) · `hero-room-3.jpg` · 2400×1500 · 객실 히어로 테라스 풀
사용 위치: 객실 서브 히어로 슬라이드 3 · 목표 밝기 141 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오후, 테라스 개별 풀과 선베드 둘, 풀 끝이 바다와 겹친다. 풀은 가로 중앙.
English: Afternoon terrace private pool with two loungers, pool edge merging with the sea, centered; photorealistic, calm coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### F04 (y64) · `room-main.jpg` · 1680×1530 · 커튼 사이 바다와 의자
사용 위치: 객실 상세 큰 사진(PC 840×765, ≤1024 가로 100%×50vh, 글자 겹침 없음) · 목표 밝기 180 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
아주 밝은 한낮, 반쯤 열린 흰 린넨 커튼 사이로 바다가 보이고 창가에 라운지체어 하나. 커튼 틈과 의자는 세로 35–65% 띠, 가로 중앙.
English: Very bright midday, half-open white linen curtains revealing the sea with one lounge chair by the window, curtain gap and chair in the middle band; photorealistic, high-key coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### F05 (y65) · `room-side.jpg` · 784×1028 · 계단식 창가
사용 위치: 객실 상세 세로 사진(글자 겹침 없음) · 목표 밝기 176 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
밝은 오전, 창가에 계단처럼 단을 낸 흰 좌식 벤치와 쿠션, 창 밖 바다. 세로 구도.
English: Bright morning, a stepped white built-in window bench with cushions, sea outside, vertical; photorealistic, high-key coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### F06 (y66) · `room-detail.jpg` · 1944×1356 · 바다를 배경으로 한 손
사용 위치: 객실 상세 하단 사진(글자 겹침 없음) · 목표 밝기 133
오후, 테라스 난간 위에 놓인 손이 유리 찻잔을 쥔 클로즈업(얼굴 없음), 뒤로 흐릿한 바다. 85mm 얕은 심도, 손 모양은 자연스럽게 다섯 손가락.
English: Afternoon close-up of a hand holding a glass teacup on a terrace railing, blurred sea behind, no face, natural five-finger hand, 85mm shallow depth of field; photorealistic, calm coastal lifestyle photography, soft aqua-teal palette, no text, no logo, no watermark.

### F07 (y67) · `room-wide.jpg` · 2400×813 · 거실에서 본 오션뷰
사용 위치: 객실 상세 와이드(1440:488, 글자 겹침 없음) · 목표 밝기 141 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오후, 거실 깊숙한 곳에서 가로로 긴 창 전체와 바다를 담은 초광각 파노라마, 창틀이 화면 수평을 가로지른다.
English: Afternoon ultra-wide panorama from deep inside a living room showing a long horizontal window and the sea, window frame crossing the frame; photorealistic, calm coastal interior photography, soft aqua-teal and white palette, no text, no logo, no watermark.

## G. 스페셜 페이지 · 7장

### G01 (y52) · `hero-special-1.jpg` · 2400×1500 · 해질녘 바다
사용 위치: 스페셜 서브 히어로 슬라이드 1(글자: 하단 중앙 흰 SPECIAL) · 목표 밝기 98
해 지기 직후, 수면 위 남은 노을빛과 짙은 청록 바다, 전경에 풀 가장자리 실루엣. 노을빛 띠는 가로 중앙.
English: Just after sunset, remaining afterglow on the sea surface, deep teal water, pool edge silhouette in the foreground, glow centered; photorealistic, moody coastal photography, navy teal and soft coral palette, no text, no logo, no watermark.

### G02 (y53) · `hero-special-2.jpg` · 2400×1500 · 풀사이드 데이베드
사용 위치: 스페셜 서브 히어로 슬라이드 2 · 목표 밝기 149 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
한낮, 풀사이드 흰 데이베드와 얇은 캐노피, 뒤로 하늘·바다·풀이 한눈에. 데이베드는 가로 중앙.
English: Midday white poolside daybed with a sheer canopy, sky, sea and pool in one view behind, centered; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### G03 (y54) · `hero-special-3.jpg` · 2400×1500 · 밤의 풀
사용 위치: 스페셜 서브 히어로 슬라이드 3 · 목표 밝기 88
밤, 수중조명이 켜진 인피니티 풀과 어두운 바다, 하늘에 옅은 별. 풀의 청록 빛이 가로 중앙에 모인다.
English: Night, an infinity pool glowing turquoise from underwater lights against dark sea and a faintly starry sky, glow centered; photorealistic, quiet night coastal photography, navy and aqua palette, no text, no logo, no watermark.

### G04 (y68) · `special-film.jpg` · 1440×1486 · 파도 영상 포스터
사용 위치: 스페셜 영상 자리 포스터(PC 720×743, ≤1024 가로 100%×50vh, 글자 겹침 없음) · 목표 밝기 148
오전, 해변에 밀려오는 파도를 높은 곳에서 내려다본 거의 정사각 구도, 흰 거품과 청록 물. 파도선은 세로 중앙 띠.
English: Morning, waves rolling onto shore seen from above, white foam and turquoise water in a near-square frame, wave line in the middle band; photorealistic, calm coastal photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### G05 (y69) · `special-side.jpg` · 1040×720 · 부서지는 파도
사용 위치: 스페셜 청록 영역 사진(글자 겹침 없음) · 목표 밝기 173
밝은 한낮, 바위에 부서지는 흰 파도 클로즈업, 하이키, 1/1000초로 물방울 정지.
English: Bright midday, white waves breaking on rocks, high-key, fast shutter freezing droplets; photorealistic, bright coastal nature photography, soft aqua and white palette, no text, no logo, no watermark.

### G06 (y70) · `special-rhythm-1.jpg` · 840×642 · 노을 수면
사용 위치: 스페셜 곡선 영역 좌측 사진(hover 1.05배 확대 → 가장자리 3% 여유) · 목표 밝기 84
해 질 무렵, 어두운 수면 위 길게 번지는 금빛 윤슬, 망원 압축. 어둡게.
English: Dusk, a long golden glint path on dark water, telephoto compression, dark exposure, keep edges simple; photorealistic, moody coastal photography, navy and gold palette, no text, no logo, no watermark.

### G07 (y71) · `special-rhythm-2.jpg` · 840×1088 · 바다를 보는 인물
사용 위치: 스페셜 곡선 영역 우측 사진(hover 1.05배 확대) · 목표 밝기 127
늦은 오후, 전망 데크 끝에 앉아 바다를 바라보는 사람의 뒷모습(비식별), 세로 구도, 인물은 중앙 하단.
English: Late afternoon, a person seen from behind sitting at the end of a viewing deck looking at the sea, vertical, subject lower center; photorealistic, calm coastal lifestyle photography, soft aqua-teal palette, no text, no logo, no watermark.

## H. 오시는 길 페이지 · 2장

### H01 (y55) · `hero-location.jpg` · 2400×1500 · 단지 외관
사용 위치: 오시는 길 서브 히어로(영상 자리, 글자: 하단 중앙 흰 LOCATION) · 목표 밝기 141 · 실제 납품 시 실사진 교체(샘플 시연용 생성 가능)
오후, 해안도로 쪽에서 올려다본 흰 저층 풀빌라 단지 외관과 해송, 파란 하늘. 간판·번호 없음. 건물은 가로 30–70% 안.
English: Afternoon view looking up from a coastal road at low white pool villa buildings among pine trees, blue sky, no signs or numbers, buildings within the central 40% width; photorealistic, bright coastal architecture photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### H02 (y72) · `location-map.jpg` · 2400×1308 · 오시는 길 지도 — 생성 제외(교체 지침)
사용 위치: 오시는 길 지도 자리(PC 1440:785, 모바일 390:399 로 가로 중앙 51%, 아래 MAP·로드뷰·길찾기 바) · 목표 밝기 225
**생성하지 않는다.** 실제 위치 안내이므로 운영 시 카카오맵·네이버 지도 등 지도 API 임베드 또는 공식 지도 캡처로 교체한다(생성 지도는 가짜 도로·지명을 만들어 허위 안내가 됨). 샘플 단계에서 바꾸려면 **글자·지명 없는** 밝은 약도 일러스트(평균 225 ± 15, 흰 바탕에 연회색 도로·연청록 바다)로만 만들고, 위치 핀은 가로 중앙에 둔다.

## I. 예약 안내 페이지 · 3장

### I01 (y56) · `hero-reservation.jpg` · 2400×1500 · 수면 위 빛
사용 위치: 예약 안내 히어로(영상 자리 포스터, 글자: 하단 중앙 흰 RESERVATION) · 목표 밝기 148
한낮, 풀 수면 가까이 수평으로 본 윤슬과 물결, 배경은 흐릿한 바다와 하늘. 반짝임의 중심은 가로 중앙.
English: Midday, near-surface horizontal view of sparkling ripples on pool water, blurred sea and sky beyond, glints centered; photorealistic, bright abstract water photography, soft aqua-teal palette, no text, no logo, no watermark.

### I02 (y73) · `reser-info.jpg` · 1296×906 · 풀사이드 음료
사용 위치: 예약 안내 첫 사진(글자 겹침 없음) · 목표 밝기 165
밝은 오후, 풀 가장자리 테라초 위 유리잔 두 개의 시트러스 음료(라벨·병 없음)와 선글라스, 뒤로 흐릿한 풀과 바다.
English: Bright afternoon, two glasses of citrus drink and sunglasses on a terrazzo pool edge, no bottles or labels, blurred pool and sea behind; photorealistic, bright airy coastal lifestyle photography, soft aqua-teal and white palette, no text, no logo, no watermark.

### I03 (y74) · `reser-option.jpg` · 1080×1328 · 창가 의자와 바다
사용 위치: 부가 서비스 영역 세로 사진(글자 겹침 없음) · 목표 밝기 93
해 질 무렵 실내 역광, 창가 라운지체어 실루엣과 창밖 청회색 바다, 실내는 어둡게.
English: Dusk interior backlight, silhouette of a lounge chair by a window with blue-grey sea outside, dark interior, vertical; photorealistic, moody coastal interior photography, navy and soft teal palette, no text, no logo, no watermark.

## J. 메인 공지 팝업 · 5장

공통: 700×700 정사각, 이미지 위 **중앙에 네이비 글자가 덮개 없이 직접** 올라간다 → 중앙은 밝고 저대비로 비운다. 공지 내용과 어울리는 부드러운 배경 이미지.

### J01 (y75) · `popup-1.jpg` · 700×700 · 여름 시즌 예약 오픈
사용 위치: 메인 공지 팝업 1(글자: 중앙 네이비 제목·설명) · 목표 밝기 156
한여름 한낮, 옅은 청록 풀 수면을 위에서 부드럽게 흐리게 담은 파스텔 배경, 가장자리에만 풀 모서리의 흰 선.
English: Soft pastel top-down view of pale turquoise pool water in midsummer, gently blurred, a thin white pool edge only near the border, low-contrast center; photorealistic, airy coastal background photography, pale aqua palette, no text, no logo, no watermark.

### J02 (y76) · `popup-2.jpg` · 700×700 · 인피니티 풀 운영 안내
사용 위치: 메인 공지 팝업 2 · 목표 밝기 156
오전의 옅은 안개 속 인피니티 풀과 바다가 하나로 이어지는 흐린 하이키 장면, 중앙은 단색에 가까운 수면.
English: Hazy high-key morning, infinity pool and sea blending into one pale surface, near-uniform center; photorealistic, airy coastal background photography, pale aqua palette, no text, no logo, no watermark.

### J03 (y77) · `popup-3.jpg` · 700×700 · 연박 할인 안내
사용 위치: 메인 공지 팝업 3 · 목표 밝기 156
흰 린넨 침구 위로 아침 햇살이 부드럽게 번진 클로즈업, 한쪽 모서리에 창 너머 흐릿한 바다.
English: Soft close-up of white linen bedding in gentle morning light, a blurred sea through a window in one corner, low-contrast center; photorealistic, airy coastal background photography, pale aqua and white palette, no text, no logo, no watermark.

### J04 (y78) · `popup-4.jpg` · 700×700 · 라운지 카페 조식
사용 위치: 메인 공지 팝업 4 · 목표 밝기 157
밝은 오크 테이블 위 흰 도자 컵과 작은 빵 접시를 위에서 본 구도, 소품은 가장자리에 두고 중앙은 테이블 면으로 비운다.
English: Top-down light oak table with a white ceramic cup and a small bread plate placed near the edges, empty table surface at center; photorealistic, airy coastal lifestyle photography, pale aqua and warm white palette, no text, no logo, no watermark.

### J05 (y79) · `popup-5.jpg` · 700×700 · 그릴 테라스 이용
사용 위치: 메인 공지 팝업 5 · 목표 밝기 237(거의 흰색)
아주 밝은 하이키, 흰 린넨 테이블보와 가장자리에 살짝 보이는 그릴 집게·채소 한두 개. 전체가 거의 흰색(평균 237)이 되게 노출을 올린다.
English: Extremely high-key near-white image of a white linen tablecloth with a pair of grill tongs and one or two vegetables barely visible at the edge, almost entirely white; photorealistic, airy minimal background photography, white palette, no text, no logo, no watermark.

---

## 생성 후 검증

1. 파일 수: `public/yoonseul/assets/` 에 photo-map 의 79개 파일이 모두 있는지 확인(교체 지침 2개 포함 — 교체하지 않으면 임시 이미지가 남는다).
2. 픽셀 크기: 각 파일이 photo-map 의 생성w×생성h 와 정확히 같아야 한다.
3. 글자 없음: 이미지 안에 글자·숫자·간판·로고·워터마크가 없는지 눈으로 확인(특히 번호판, 수건·컵 로고, 그릴 상표).
4. 밝기: Pillow 로 그레이 평균이 목표 밝기 ±15 이내인지 확인.
   ```
   python3 - <<'E'
   from PIL import Image, ImageStat
   for l in open('tools/ref-clone/photo-map-yoonseul.txt'):
       if l.startswith('#') or not l.strip(): continue
       r = l.rstrip('\n').split('\t'); f = 'public/yoonseul/assets/' + r[2]
       im = Image.open(f); m = ImageStat.Stat(im.convert('L')).mean[0]
       tgt = float(r[7].split('→')[-1])
       ok = im.size == (int(r[5]), int(r[6])) and abs(m - tgt) <= 15
       print('OK ' if ok else 'NG ', r[0], r[2], im.size, round(m, 1), tgt)
   E
   ```
5. 시리즈 톤: 항공 5장(A02–A06), 스페셜 6장(A07–A12), 서브 히어로 묶음(E01–E03, F01–F03, G01–G03), 객실 19장, 메뉴 6장, 팝업 5장이 각각 같은 색감으로 보이는지 접촉 시트로 비교.
6. 재검사: `python3 tools/ref-clone/preflight.py yoonseul pension-coraltree` (두 번째 인자는 `ref-sites/` 폴더명. ref-sites 는 커밋하지 않으므로 크롤링한 PC에서 실행하고, 스크립트 안의 `REFS`·`ROOT` 경로를 그 PC에 맞춘다).
7. 썸네일 `public/thumbs/yoonseul.jpg` 와 사례 캡처 `public/cases/yoonseul/` 를 새 사진 기준으로 다시 촬영.

## og.jpg(1200×630) 참고 프롬프트

수량에 넣지 않는다. 현재 `public/yoonseul/og.jpg`(1200×630) 교체용.
오전의 인피니티 풀과 바다가 수평선에서 이어지는 와이드, 흰 테라스 가장자리, 글자가 올라갈 수 있게 왼쪽 40%는 하늘·수면으로 단순하게. SNS 미리보기에서 작게 보여도 풀·바다·흰 건물이 한눈에 읽히도록 대비를 약간 높게.
English: Wide morning view of an infinity pool merging with the sea at the horizon, white terrace edge, simple sky and water in the left 40%, clear readable shapes at small size; photorealistic, bright airy coastal pool villa photography, soft aqua-teal and white palette, no text, no logo, no watermark.
