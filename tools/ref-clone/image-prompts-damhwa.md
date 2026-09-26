# damhwa 담화재 이미지 생성 프롬프트

## 생성 상태

- 현재 `public/damhwa/assets/` 의 사진·PNG 75개는 **톤만 맞춘 임시 이미지(등고선 무늬)** 이며, 실제 사진은 아직 생성 전이다.
- 프롬프트 수: **75개** = `tools/ref-clone/photo-map-damhwa.txt` 데이터 행 수(d1~d75).
- 생성한 이미지는 photo-map 의 **파일명 그대로** `public/damhwa/assets/` 에 덮어쓴다(HTML·CSS 수정 없음).
- 생성 제외(교체 지침만 기재): `room-plan.jpg`(D13), `location-route.png`(E02), `location-map.jpg`(E03).
- 객실·시설 사진(객실 미리보기·객실 페이지·예약 좌측 등)은 **샘플 시연용 생성 가능, 실제 납품 시 실사진 교체** 대상이다(각 항목에 표기).
- `og.jpg`(1200×630)는 photo-map 에 없으므로 수량에서 빼고 문서 끝에 참고 프롬프트 1개만 둔다.

## 납품 기준

- 브랜드: `담화재(淡和齋) / DAMHWAJAE` — 포트폴리오 시연용 **가상 한옥 스테이 · 독채** 브랜드. 실존 숙소가 아니다.
- 총 생성 수량: **72장**(75행 중 생성 제외 3행 빼고). 저장 위치 `public/damhwa/assets/`, 파일명 동일.
- 크기: photo-map 의 **생성w×생성h 그대로**(표시 크기의 약 2배). 비율을 바꾸거나 잘라 맞추지 말고 처음부터 그 비율로 생성한다.
- 형식: sRGB JPG(품질 85~90, 과도한 샤픈 금지). 투명 자리(`intro-cloud-*.png`, `mount-*.png`)는 **PNG 알파 채널**.
- 공통 스타일: 한국 산간 계곡에 자리한 조용한 한옥 스테이의 에디토리얼 사진. 목재(육송 기둥·툇마루), 한지 창호, 회색 기와, 막돌 담장, 린넨·면 침구, 백자·분청 그릇. 낮은 채도, 부드러운 자연광과 해 질 녘 한지 조명, 은은한 필름 그레인. 색감은 site.css 토큰에 맞춘다 — 슬레이트 그레이 `--bg #464D52`, 차콜 `--dark #2E2E2E`, 거의 검정 `--deep #131313`, 객실 회청 `--room #393D3F`. 즉 전체적으로 **회청·먹색 바탕 + 따뜻한 나무·등불 포인트**, 선명한 원색 금지.
- 공통 금지: 이미지 안의 글자·숫자·간판·현판 글씨·로고·워터마크, 실존 호텔·리조트·한옥 스테이의 상표와 건물 재현, 문화재·고택 등 특정 실제 건물 모사, 레퍼런스 사이트 사진 모사, 과한 HDR·CG 렌더 느낌, 플라스틱 질감, 왜곡된 손·얼굴, 중복 인물.
- 인물 조건: 한국인 중심, 특정 실존 인물을 닮지 않게. 뒷모습·옆모습·손 위주의 비식별 컷 또는 자연스러운 스냅. 무지 의상(린넨·생활한복 느낌), 광고 포즈 금지.
- 지역 표현: "한국 내륙 산간 계곡" 수준으로 일반화. 실제 지명·산 이름·표지판이 드러나지 않게.
- 허위 금지: 수상·인증 표식, 가짜 후기 장면, 실제 브랜드 제품 패키지 없음.
- 크롭 규칙(모바일 CSS 근거):
  - 전체 화면 사진(`intro`·`hero`·`about-top`·`room-top`·`location-top`): PC 는 16:9 로 보이고 영상 포스터 자리(`hero`·`about-top`·`room-top`)는 위쪽이 60~90px 잘린다. 모바일(≤767px)은 세로 100svh 또는 480~500px 높이라 **가로 중앙 40%, 세로 20~80%** 안에 핵심 피사체를 둔다.
  - 가로 슬라이드(2400×1333): 모바일은 폭 100%-24px × 58vw(메인) / 200px(객실) → 중앙 85% 안전.
  - 전체메뉴 띠(2400×533, 4.5:1): 모바일 180~220px 높이 → **가로 중앙 45%** 안에 피사체.
  - 객실 갤러리(2400×1800): 모바일 370px 높이(거의 정사각) → 가로 중앙 50%.
  - 소개 중간(`about-video`): 모바일 420px 높이 + 35% 덮개 → 가로 중앙 45%.
  - 푸터(`footer-bg`): 위쪽 55~70% 는 배경색 그라데이션에 덮이고 모바일은 `object-position:center bottom` → 한옥 전경은 **아래 40%**.
  - 객실 대표(`room-main`, 세로): 모바일 390:335 가로 비율로 잘림 → **세로 중앙 70%** 안에.
  - 스페셜 카드·세로 슬라이드는 중앙 80% 안전.
- 움직임: 사계 박스는 활성 시 1.08배 확대 + 비활성은 흑백(grayscale) → 가장자리 4% 여유, 흑백에서도 명암 대비가 살아 있게. 인트로 구름은 1.05~1.07배 확대하며 걷힘 → 구름 가장자리 여유. 객실 갤러리는 아래에서 위로 밀려 올라오는 전환. 메인·객실 슬라이드는 페이드 전환이라 **같은 묶음은 밝기·색온도를 비슷하게**.
- **밝기 가이드**: 각 항목의 "목표 밝기"(0~255 그레이 평균, photo-map 기준)가 노출 기준이다. 사이트의 흰 글자·덮개 대비는 이 밝기로 검증돼 있으므로 **±15 이내**로 맞춘다. 30~70 대는 저녁·실내 저조도 무드, 130 이상은 밝은 낮·설경·커튼 역광.
- 텍스트는 HTML 로 올라가므로 사진 안에는 어떤 글자도 넣지 않는다.

## 출력 크기와 수량

- 2400×1500 · 6장: `intro`, `hero`, `about-top`, `about-video`, `room-top`, `location-top`
- 2400×1333 · 13장: `main-slide-1~6`, `room-slide-1~6`, `reservation-top`
- 2400×1800 · 5장: `footer-bg`, `room-gallery-1~4`
- 2400×1883 · 1장: `about-bg`
- 2400×1400 · 1장: `room-bg`
- 2400×533 · 6장: `menu-bg-1~6`
- 2400×1272 PNG · 2장: `intro-cloud-1~2`
- 1686×996 PNG · 2장 / 2400×793 PNG · 1장: `mount-1·3` / `mount-2`
- 646×1000 · 7장: `special-1~7`
- 720×1680 · 4장: `room-hover-1~4`
- 662×518 · 1장: `room-bg-m`
- 720×480 · 3장: `story-1~3`
- 410×660 · 8장: `about-slide-1~8`
- 620×680 · 2장, 960×1100 · 1장, 830×960 · 1장: `season-spring·autumn`, `season-summer`, `season-winter`
- 830×980 · 1장: `room-main`
- 742×742 · 4장: `reservation-1~4`
- 624×718 · 2장, 946×1086 · 1장: `reservation-thumb-1·3`, `reservation-thumb-2`
- 생성 제외 3개: `room-plan.jpg` 2400×1600, `location-route.png` 2312×2098, `location-map.jpg` 524×524
- 합계 75개(생성 72 + 교체 지침 3)

공통 꼬리(영어 프롬프트 끝에 붙임): `photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark`

---

## A. 메인 페이지 · 20장

### A01 (d1) · `intro.jpg` · 2400×1500 · 새벽 운무 능선
사용 위치: 메인 인트로 전체 화면(글자: 정중앙 검은 한자 淡和齋 + 한 줄 영문, 20% 검정 덮개, 모바일에서는 인트로 숨김) · 목표 밝기 86
새벽 직전, 겹겹이 이어진 산 능선 사이로 운무가 낮게 깔리고 먼 하늘에 옅은 분홍·회청 노을이 번지는 장면. 망원 200mm 느낌으로 압축한 능선 레이어, 시점은 맞은편 산 중턱 높이. 화면 정중앙은 검은 글자가 읽히도록 **밝고 평평한 안개 면**으로 비워 두고, 짙은 능선은 아래 1/3 과 좌우 가장자리로 보낸다. 구름 PNG 가 위아래를 덮었다 걷히므로 위·아래 20% 에는 중요한 요소를 두지 않는다.
English: Pre-dawn layered Korean mountain ridges with low mist filling the valleys and a faint pink and slate-blue glow in the sky, telephoto compression, the center of the frame a calm pale band of fog for overlaid text, darker ridges in the lower third and edges, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A02 (d2) · `intro-cloud-1.png` · 2400×1272 · 인트로 구름(위)
사용 위치: 인트로 위쪽 덮개 레이어(투명 PNG, 걷히며 위로 1.07배 확대·블러) · 목표 밝기 해당 없음(알파 레이어)
**투명 배경 PNG, 알파 채널.** 화면 위쪽 절반을 덮는 부드러운 흰 구름 덩어리. 위쪽 가장자리는 불투명하게 가득 차고 아래로 갈수록 솜처럼 흩어지며 투명해진다(아래 30% 는 거의 투명). 구름 색은 순백이 아닌 아주 옅은 회백(#EDEFF0 근처), 내부에 은은한 회색 음영. 사진 생성기로 알파가 어려우면 **검은 배경 위 흰 구름 사진 → 밝기를 알파로 변환**하거나 부드러운 에어브러시·수묵 번짐 일러스트로 만든다. 좌우 끝까지 이어지게(확대 여유).
English: Soft white cumulus cloud bank filling the top half of the frame, dense at the top edge and dissolving into wispy transparent tufts toward the bottom, pale grey-white with gentle internal shading, isolated on a fully transparent background with alpha channel, no text, no logo, no watermark

### A03 (d3) · `intro-cloud-2.png` · 2400×1272 · 인트로 구름(아래)
사용 위치: 인트로 아래쪽 덮개 레이어(투명 PNG, 아래로 걷힘) · 목표 밝기 해당 없음(알파 레이어)
**투명 배경 PNG, 알파 채널.** A02 와 짝을 이루되 뒤집힌 구성: 아래 가장자리가 불투명하게 차고 위로 갈수록 흩어져 투명해지는 흰 구름. 구름 덩이 모양은 A02 와 다르게(복제·좌우반전 금지). 위 30% 는 거의 투명. 알파 제작 방법은 A02 와 동일.
English: Soft white cloud bank rising from the bottom edge of the frame, dense at the bottom and dissolving upward into transparent wisps, pale grey-white with subtle shading, shapes different from the top layer, isolated on a fully transparent background with alpha channel, no text, no logo, no watermark

### A04 (d4) · `hero.jpg` · 2400×1500 · 처마 아래 마당과 산
사용 위치: 메인 첫 화면 영상 포스터(글자 없음, PC 16:9 로 위쪽 약 90px 잘림, 모바일 세로 100svh) · 목표 밝기 86
대청 안쪽 그늘에서 바깥을 내다보는 시점: 화면 위쪽을 가로지르는 깊은 처마와 서까래, 그 아래로 마사토 마당과 낮은 돌담, 멀리 운무 낀 산 능선. 이른 아침 흐린 빛, 처마와 기둥은 어둡고 마당과 산은 은은하게 밝다. 35mm, 앉은 눈높이. 모바일 세로 크롭을 위해 마당과 산이 만나는 지점을 **가로 중앙**에 두고, 처마 선은 위 15% 안쪽에서 시작한다.
English: View from the shaded wooden hall of a hanok looking out under deep eaves and rafters onto a raked earth courtyard, a low stone wall and misty mountain ridges beyond, overcast early morning light, dark timber frame against a softly lit landscape, 35mm at seated eye level, key view centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A05 (d5) · `main-slide-1.jpg` · 2400×1333 · 창호 너머 다실
사용 위치: 메인 사진 슬라이드 1/6(페이드 전환, 글자 없음, 모바일 58vw 높이) · 목표 밝기 85
반쯤 열린 한지 창호 문틀 너머로 들여다본 좌식 다실. 낮은 원목 찻상 위 백자 다관과 찻잔 두 개, 방석, 한지 창으로 스민 오후의 부드러운 측광. 문틀이 좌우 가장자리를 어둡게 감싸는 프레임 속 프레임 구도, 50mm, 앉은 높이. 찻상은 중앙 85% 안에.
English: Looking through a half-open hanji paper sliding door into a floor-seated tea room, a low solid-wood tea table with a white porcelain teapot and two cups, cushions, soft afternoon side light through paper windows, dark door frame framing the scene, 50mm at seated height, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A06 (d6) · `main-slide-2.jpg` · 2400×1333 · 중정과 디딤돌
사용 위치: 메인 사진 슬라이드 2/6 · 목표 밝기 90
ㅁ자 한옥 중정을 툇마루 높이에서 바라본 장면. 이끼 사이로 이어진 넓적한 화강암 디딤돌, 작은 단풍나무 한 그루, 사방을 두른 목조 기둥과 한지 창. 흐린 날의 고른 확산광, 젖은 돌의 은은한 반사. 24mm 광각, 디딤돌이 화면 아래 중앙에서 안쪽으로 이어지는 선.
English: Inner courtyard of a square hanok seen from the wooden veranda, flat granite stepping stones through moss leading inward, a single small maple tree, timber columns and paper windows on all sides, soft overcast diffused light with damp stone sheen, 24mm wide angle, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A07 (d7) · `main-slide-3.jpg` · 2400×1333 · 한지 조명 침실
사용 위치: 메인 사진 슬라이드 3/6 · 목표 밝기 113 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
낮은 원목 평상형 침대에 흰 린넨 침구, 머리맡의 한지 스탠드 조명, 서까래가 드러난 천장과 흰 회벽. 해 질 무렵 창밖의 옅은 푸른빛과 한지 조명의 따뜻한 빛이 섞인다. 35mm, 서 있는 눈높이보다 약간 낮게. 침대는 중앙에.
English: Hanok bedroom with a low solid-wood platform bed dressed in white linen, a hanji paper lamp glowing at the bedside, exposed rafters and white plaster walls, dusk blue from the window mixing with warm lamp light, 35mm slightly below standing eye level, bed centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A08 (d8) · `main-slide-4.jpg` · 2400×1333 · 노천 욕조와 정원
사용 위치: 메인 사진 슬라이드 4/6 · 목표 밝기 144 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
돌담으로 둘러싸인 개별 정원 안, 편백 원목 노천 욕조에 맑은 물이 가득하고 수면에 하늘과 나뭇잎이 비친다. 주변에 낮은 관목과 이끼, 자갈. 맑은 오전의 밝은 자연광(슬라이드 중 가장 밝은 컷). 35mm, 약간 높은 시점에서 비스듬히.
English: Private walled garden with an outdoor hinoki-wood soaking tub full of clear water reflecting sky and leaves, low shrubs, moss and pebbles around, bright clear morning daylight, 35mm from a slightly elevated angle, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A09 (d9) · `main-slide-5.jpg` · 2400×1333 · 기와 지붕 위 노을
사용 위치: 메인 사진 슬라이드 5/6 · 목표 밝기 84
겹쳐진 회색 기와 지붕의 곡선 너머로 저녁 노을이 주황·보라로 번지는 하늘. 지붕은 거의 실루엣, 용마루 선이 화면을 가로지른다. 망원 85mm, 지붕 높이와 비슷한 시점. 하늘이 위 60%, 지붕 곡선은 아래 40% 중앙.
English: Overlapping grey giwa tiled hanok rooflines in near silhouette under an evening sky glowing soft orange and violet, ridge line sweeping across the frame, 85mm at roof height, sky in the upper sixty percent, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A10 (d10) · `main-slide-6.jpg` · 2400×1333 · 달항아리 복도
사용 위치: 메인 사진 슬라이드 6/6 · 목표 밝기 91
긴 목조 복도 끝의 낮은 원목 받침 위에 놓인 백자 달항아리 하나. 한쪽 한지 창으로 들어온 빛이 마루 바닥에 길게 번진다. 복도의 소실점 구도, 50mm, 허리 높이. 달항아리는 중앙에서 약간 오른쪽.
English: A single white porcelain moon jar on a low wooden stand at the end of a long timber corridor, light from hanji windows on one side spreading across the polished wooden floor, one-point perspective, 50mm at waist height, jar just right of center, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A11 (d14) · `special-1.jpg` · 646×1000 · 온욕
사용 위치: 스페셜 카드 1(글자: 위 40px 영문, 중앙 큰 한자 溫浴, 아래 60px 설명, 활성 시 50% 덮개) · 목표 밝기 75
어두운 석조 실내 탕에서 따뜻한 물 위로 김이 피어오르는 세로 컷. 작은 창 하나에서 들어온 빛줄기가 김을 비춘다. 물과 김의 질감이 중심, 가장자리는 어둡게. 50mm, 수면 가까운 낮은 시점. 중앙·아래는 글자가 겹치므로 복잡한 사물 없이 김과 수면으로만.
English: Vertical shot of steam rising from warm water in a dark stone indoor bath, a single shaft of window light catching the steam, dark edges, low viewpoint near the water surface, 50mm, simple textures only, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A12 (d15) · `special-2.jpg` · 646×1000 · 다례
사용 위치: 스페셜 카드 2(세로 카드: 왼쪽 아래 세로쓰기 한자 茶禮, 아래 설명) · 목표 밝기 65
어두운 원목 찻상 위 분청 다완에 뜨거운 물을 따르는 손(얼굴 없음), 옆에 다관과 숙우. 옆 창의 좁은 빛이 손과 김을 비춘다. 위에서 45도로 내려다본 세로 구도, 손과 잔은 오른쪽 중앙에 두고 왼쪽 아래는 세로 글자 자리로 어둡게 비운다.
English: Vertical close-up of hands pouring hot water into a buncheong tea bowl on a dark wooden tea table, teapot and cooling bowl beside, narrow side light on hands and steam, 45-degree overhead angle, subject right of center, lower left kept dark and empty, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A13 (d16) · `special-3.jpg` · 646×1000 · 계절 밥상
사용 위치: 스페셜 카드 3(글자: 위 영문, 중앙 한자 季膳, 아래 설명) · 목표 밝기 65
검은 옻칠 소반 위에 놓인 정갈한 제철 한상 — 유기·백자 그릇에 나물, 구운 생선, 된장국, 흰 밥. 어두운 배경에 위쪽 측광, 그릇 윤곽이 은은히 빛난다. 거의 수직 부감, 상은 세로 화면 중앙~아래에 두고 위쪽은 어둡게.
English: Vertical near top-down shot of a refined seasonal Korean meal on a black lacquered small table, brass and white porcelain bowls with seasoned greens, grilled fish, soybean stew and rice, dark background with soft top-side light, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A14 (d17) · `special-4.jpg` · 646×1000 · 달빛 산책
사용 위치: 스페셜 카드 4(세로 카드: 왼쪽 아래 세로 한자 月步) · 목표 밝기 57
밤, 대숲 사이 돌길 위에 작은 한지 등불이 일정한 간격으로 놓여 안쪽으로 이어진다. 하늘에 옅은 달빛, 전체적으로 푸른 밤 톤에 등불만 따뜻하게. 35mm, 서 있는 눈높이, 길은 화면 중앙에서 위로 사라진다. 왼쪽 아래는 어둡게 비운다.
English: Night stone path through a bamboo grove lined with small hanji paper lanterns receding into the distance, faint moonlight, cool blue night tones with warm lantern glow, 35mm at standing eye level, path vanishing upward through the center, lower left dark, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A15 (d18) · `special-5.jpg` · 646×1000 · 보자기 선물
사용 위치: 스페셜 카드 5(글자: 위 영문, 중앙 한자 紀念, 아래 설명) · 목표 밝기 77
쪽빛·먹색 무지 보자기로 매듭지어 싼 작은 선물 꾸러미가 낡은 원목 선반 위에 놓여 있다. 창가 측광, 천의 결과 매듭이 선명하게. 50mm, 약간 위에서. 꾸러미는 세로 중앙보다 조금 아래, 라벨·글씨 없음.
English: A small gift wrapped and knotted in plain indigo and charcoal bojagi cloth resting on a worn wooden shelf, window side light revealing the fabric weave and knot, 50mm slightly from above, subject just below center, no labels, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A16 (d19) · `special-6.jpg` · 646×1000 · 계곡
사용 위치: 스페셜 카드 6(세로 카드: 왼쪽 아래 세로 한자 溪谷) · 목표 밝기 163
여름 오전, 맑은 계곡물이 둥근 화강암 바위 사이를 흘러내리고 양쪽에 연초록 숲이 드리운다. 밝고 투명한 물빛(카드 중 가장 밝은 컷). 느린 셔터로 살짝 부드러워진 물줄기, 24mm, 물가 낮은 시점. 흐름은 화면 위에서 아래 중앙으로.
English: Clear mountain stream flowing between rounded granite boulders on a summer morning, fresh green forest overhanging both banks, bright transparent water slightly softened by slow shutter, 24mm from a low streamside viewpoint, flow running down the center, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A17 (d20) · `special-7.jpg` · 646×1000 · 천연 어메니티
사용 위치: 스페셜 카드 7(글자: 위 영문, 중앙 한자 淸香, 아래 설명) · 목표 밝기 96
석판 위에 놓인 무지 수제 비누 두 개와 개어 둔 흰 면 수건, 작은 도자기 병, 편백 잎 한 가지. 부드러운 창가 확산광, 담백한 회색·아이보리 톤. 위에서 비스듬히, 소품은 세로 중앙 아래쪽에 모은다. 병·비누에 글자 없음.
English: Two plain handmade soaps and a folded white cotton towel on a slate stone tray with a small unlabeled ceramic bottle and a sprig of hinoki leaves, soft diffused window light, grey and ivory tones, angled from above, items grouped below center, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A18 (d27) · `story-1.jpg` · 720×480 · 달항아리 정물
사용 위치: 메인 하단 소개 작은 슬라이드 1/3(페이드, 글자 없음) · 목표 밝기 90
회벽 앞 원목 좌대 위의 달항아리 정물, 한쪽 창에서 들어온 부드러운 빛이 항아리 곡면에 그라데이션을 만든다. A10 과 다른 각도·배경(복도 아님, 벽 앞 단독). 85mm, 항아리 높이, 중앙 배치.
English: Still life of a white moon jar on a wooden plinth against a plain plaster wall, soft window light creating a gradient across its curved surface, 85mm at jar height, centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A19 (d28) · `story-2.jpg` · 720×480 · 창호 그림자
사용 위치: 메인 하단 소개 작은 슬라이드 2/3 · 목표 밝기 75
오후 햇빛이 한지 창살을 통과해 마루 바닥과 흰 벽에 격자 그림자를 드리운다. 주변은 어둡고 격자 빛만 또렷하게. 추상적 구도, 50mm.
English: Late afternoon sunlight passing through a lattice hanji window, casting a crisp grid of light and shadow across a wooden floor and white wall, surroundings dark, abstract composition, 50mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### A20 (d29) · `story-3.jpg` · 720×480 · 툇마루와 정원
사용 위치: 메인 하단 소개 작은 슬라이드 3/3 · 목표 밝기 77
오래된 툇마루 끝에 걸터앉은 시점에서 바라본 작은 정원: 반들반들한 마루 판재가 앞쪽을 채우고, 너머로 이끼 낀 돌과 소나무 한 그루. 흐린 저녁 빛. 35mm, 마루 높이.
English: Worn polished wooden veranda boards in the foreground leading to a small garden with mossy stones and a single pine, overcast early evening light, 35mm at veranda height, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

---

## B. 공통 요소(메인·서브 여러 페이지) · 16장

### B01 (d11) · `mount-1.png` · 1686×996 · 수묵 산 1
사용 위치: 메인 슬라이드 영역·소개 사계·객실·예약 하단에 opacity .2~.5 로 겹치는 장식(투명 PNG, 어두운 배경 위) · 목표 밝기 해당 없음(알파 레이어)
**투명 배경 PNG, 알파 채널.** 먹 번짐으로 그린 두세 겹의 산봉우리 실루엣. 사진 생성기로는 어려우므로 **수묵 붓 스타일 일러스트**로 만든다. 색은 거의 검은 먹색(#0A0A0A 근처), 봉우리 윗선은 진하고 아래로 갈수록 번지며 투명해진다. 화면의 좌하단~중앙에 무게, 가장자리는 자연스럽게 사라져 잘린 티가 나지 않게. 종이 질감·낙관·글씨 없음.
English: Korean ink-wash painting of two or three overlapping mountain peaks in near-black sumi ink, strong brush edge on the ridgelines fading into soft transparent wash toward the bottom, edges dissolving naturally, isolated on a fully transparent background with alpha channel, no paper texture, no seal, no text, no logo, no watermark

### B02 (d12) · `mount-2.png` · 2400×793 · 수묵 산 2(긴 능선)
사용 위치: 메인·소개·객실·예약 장식, 가로로 길게(1704~1900px) 깔림(투명 PNG) · 목표 밝기 해당 없음(알파 레이어)
**투명 배경 PNG, 알파 채널, 수묵 붓 스타일 일러스트.** 좌우로 길게 이어지는 완만한 능선 파노라마, 앞 능선은 진하고 뒤 능선은 옅게 2~3단. 좌우 끝은 번져 사라지게 해 어느 쪽이 잘려도 자연스럽게. 먹색, 아래쪽은 투명으로 페이드.
English: Long horizontal panorama of gently rolling mountain ridges in Korean ink-wash style, darker foreground ridge and paler receding ridges, both ends fading out softly, bottom fading to transparent, near-black sumi ink, isolated on a fully transparent background with alpha channel, no text, no logo, no watermark

### B03 (d13) · `mount-3.png` · 1686×996 · 수묵 산 3
사용 위치: 메인·소개·객실 장식(투명 PNG) · 목표 밝기 해당 없음(알파 레이어)
**투명 배경 PNG, 알파 채널, 수묵 붓 스타일 일러스트.** B01 과 다른 형태 — 오른쪽에 높은 봉우리 하나와 왼쪽으로 낮아지는 능선, 옅은 운무 여백. 먹색, 아래로 페이드. B01 을 좌우반전한 모양이 되지 않게.
English: Korean ink-wash painting of one tall peak on the right with a ridge descending to the left and pale mist gaps, near-black sumi ink fading to transparent at the bottom, distinct from a mirrored copy, isolated on a fully transparent background with alpha channel, no text, no logo, no watermark

### B04 (d21) · `room-bg.jpg` · 2400×1400 · 커튼에 드리운 빛
사용 위치: 객실 미리보기 배경(메인·객실 페이지 하단, 60% 검정 덮개 위에 4칸 흰 글자, 모바일에서는 숨김) · 목표 밝기 188
얇은 흰 린넨 커튼이 바닥까지 드리운 창 전면에 오전 햇빛이 비쳐 커튼 전체가 밝게 빛나고, 주름 결이 수직으로 반복된다. 창틀 나무가 살짝 비친다. 전체가 매우 밝고 고르게(4칸 세로 구획이 올라가므로 한쪽에 치우친 피사체 없이 균일한 질감). 50mm, 정면.
English: Floor-length sheer white linen curtains backlit by bright morning sun, the whole frame glowing evenly with repeating vertical folds, faint wooden window frame behind, very bright and uniform texture with no single focal object, frontal 50mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B05 (d22) · `room-hover-1.jpg` · 720×1680 · 청연 세로 컷
사용 위치: 객실 미리보기 1칸 호버(360×840, 40% 덮개, 중앙에 흰 글자, 태블릿 2열) · 목표 밝기 139 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
두 사람을 위한 객실 '청연'의 세로 컷: 위쪽에 서까래 천장과 한지 창, 중앙에 낮은 침대와 흰 침구, 아래쪽 문 너머로 작은 정원의 노천 욕조가 살짝 보인다. 밝은 낮 빛. 24mm 세로, 서 있는 눈높이. 중앙 1/3 은 글자가 올라가므로 단순한 면(침구·벽) 위주.
English: Tall vertical view of a two-person hanok guest room, rafter ceiling and paper windows at the top, low bed with white linens in the middle, a glimpse of a private garden soaking tub through the door at the bottom, bright daylight, 24mm vertical at standing eye level, simple surfaces in the middle third, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B06 (d23) · `room-hover-2.jpg` · 720×1680 · 청연 패밀리 세로 컷
사용 위치: 객실 미리보기 2칸 호버 · 목표 밝기 103 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
가족형 객실의 넓은 대청 거실: 낮은 원목 좌탁과 방석 여러 개, 안쪽으로 이어지는 두 개의 침실 문. 늦은 오후 따뜻한 빛. 세로 구도로 바닥 마루 결과 천장 서까래가 위아래를 채운다. 중앙 1/3 은 단순하게.
English: Tall vertical view of a spacious family hanok living hall with a low wooden table and several floor cushions, doorways leading to two bedrooms beyond, warm late-afternoon light, floorboards and rafters filling the top and bottom, calm middle area, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B07 (d24) · `room-hover-3.jpg` · 720×1680 · 소월 세로 컷
사용 위치: 객실 미리보기 3칸 호버 · 목표 밝기 107 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
'달을 보는' 독채 소월: 둥근 달창(원형 창)이 세로 화면 위쪽에 있고 창 너머 초저녁 푸른 하늘, 아래쪽에 창가 좌식 공간과 방석. 실내는 한지 스탠드의 따뜻한 빛. 세로 35mm.
English: Tall vertical view of a quiet hanok room with a round moon window in the upper part showing early-evening blue sky, a floor-seated nook with a cushion below, warm hanji lamp glow inside, 35mm vertical, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B08 (d25) · `room-hover-4.jpg` · 720×1680 · 운경 세로 컷
사용 위치: 객실 미리보기 4칸 호버 · 목표 밝기 127 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
'구름을 보는' 독채 운경: 활짝 열린 대청 분합문 너머로 운무 낀 산 능선이 정면에 펼쳐지고, 아래쪽은 반들한 대청마루. 흐린 낮의 밝은 확산광. 세로 24mm, 앉은 높이. 산은 세로 위쪽 40%, 마루는 아래.
English: Tall vertical view from an open-sided hanok hall with folding doors lifted, misty mountain ridges straight ahead in the upper part, polished wooden floor below, bright overcast diffused light, 24mm vertical at seated height, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B09 (d26) · `room-bg-m.jpg` · 662×518 · 모바일 커튼과 빛
사용 위치: 모바일 객실 미리보기 상단(331×259, 중앙에 흰 영문 Room Preview) · 목표 밝기 107
B04 와 같은 린넨 커튼 주제지만 모바일용으로 더 어둡게: 커튼 한쪽이 살짝 걷혀 창틀과 어두운 실내 벽이 함께 보이고 빛은 중앙에 부드럽게 모인다. 중앙은 흰 글자가 읽히도록 너무 밝지 않게.
English: Sheer linen curtain partly drawn aside revealing a wooden window frame and a dim interior wall, soft light gathered in the center but not blown out, moderate exposure, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B10 (d30) · `footer-bg.jpg` · 2400×1800 · 해 질 녘 한옥 전경
사용 위치: 모든 페이지 푸터 배경(위 55~70% 는 #464D52 그라데이션에 덮이고 그 위에 사이트맵·주소 흰 글자, 모바일 object-position 아래 기준) · 목표 밝기 81
해 질 녘, 산자락 아래 계곡가에 자리한 여러 채의 한옥 독채가 창호마다 따뜻한 불을 밝힌 전경. 위쪽 절반은 흐리고 평평한 회청 하늘(그라데이션에 묻힘), 한옥과 조명은 **아래 40%** 에 가로로 넓게 배치. 약간 높은 맞은편 언덕 시점, 50mm. 간판·현판 글씨 없음.
English: Dusk view of several hanok guesthouses along a mountain valley stream with warm light glowing through every paper window, upper half a flat overcast slate-blue sky, buildings and lights spread across the lower forty percent, from a slightly elevated opposite hillside, 50mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B11 (d31) · `menu-bg-1.jpg` · 2400×533 · 전체메뉴 띠 1 전경
사용 위치: 전체메뉴 상단 띠(1440×320, 중앙에 작은 흰 영문, 메뉴 항목 호버마다 페이드 교체, 모바일 180~220px) · 목표 밝기 57
초저녁 산그늘 속 담화재 한옥 전경을 가로로 길게: 기와 지붕선이 수평으로 이어지고 몇몇 창에 불이 켜짐, 뒤로 어두운 산. 파노라마 4.5:1, 망원 85mm. 한옥 무리는 **가로 중앙 45%** 안에.
English: Ultra-wide panoramic view of a hanok stay at early evening under mountain shade, tiled rooflines running horizontally, a few windows lit, dark mountain behind, 85mm telephoto, buildings in the central forty-five percent, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B12 (d32) · `menu-bg-2.jpg` · 2400×533 · 전체메뉴 띠 2 객실
사용 위치: 전체메뉴 띠(Rooms 호버) · 목표 밝기 120 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
객실 내부 가로 파노라마: 흰 침구의 낮은 침대, 한지 창, 원목 마루가 수평으로 이어진다. 밝은 낮 빛. 침대는 가로 중앙.
English: Ultra-wide panoramic interior of a hanok guest room, low bed with white linens, hanji windows and wooden floor running horizontally, bright daylight, bed centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B13 (d33) · `menu-bg-3.jpg` · 2400×533 · 전체메뉴 띠 3 온욕
사용 위치: 전체메뉴 띠(Special 호버) · 목표 밝기 75
어두운 석조 탕의 수면을 낮게 가로로 담은 컷, 김이 옆으로 흐르고 한쪽 창빛이 수면에 반사. A11 과 같은 톤, 다른 구도. 김과 빛은 가로 중앙.
English: Ultra-wide low shot across the surface of a dark stone bath with steam drifting sideways and window light reflecting on the water, reflection centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B14 (d34) · `menu-bg-4.jpg` · 2400×533 · 전체메뉴 띠 4 체험
사용 위치: 전체메뉴 띠(Experience 호버) · 목표 밝기 77
긴 원목 찻상 위에 다구·보자기 꾸러미·작은 도자기가 가로로 늘어선 체험 준비 장면, 사람 손 하나가 다완을 놓는 중(얼굴 없음). 창가 측광, 차분한 톤.
English: Ultra-wide view of a long wooden table with tea utensils, a bojagi-wrapped bundle and small ceramics arranged in a row, one hand placing a tea bowl, no face visible, window side light, calm tones, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B15 (d35) · `menu-bg-5.jpg` · 2400×533 · 전체메뉴 띠 5 로비
사용 위치: 전체메뉴 띠(Reservation 호버) · 목표 밝기 47
저녁의 어두운 로비 사랑채: 낮은 원목 카운터 대신 긴 좌탁, 벽 선반의 도자기, 한지 조명 몇 개만 켜진 저조도. 띠 가운데에 가장 밝은 조명이 오게. 사람 없음, 안내 데스크·명패·간판 글씨 없음.
English: Ultra-wide dim evening lobby of a hanok stay with a long low wooden table, ceramics on wall shelves and only a few hanji lamps lit, brightest lamp near the center, no people, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### B16 (d36) · `menu-bg-6.jpg` · 2400×533 · 전체메뉴 띠 6 프로모션
사용 위치: 전체메뉴 띠(Promotion 호버) · 목표 밝기 65
계절 선물 느낌의 가로 정물: 어두운 나무 위에 동백 가지 한 줄기, 백자 잔 두 개, 매듭 보자기. 한쪽 측광, 배경은 차콜. 정물은 가로 중앙.
English: Ultra-wide still life on dark wood, a camellia branch, two white porcelain cups and a knotted bojagi bundle, single side light against a charcoal background, arrangement centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

---

## C. 소개 페이지 (`about.html`) · 15장

### C01 (d37) · `about-top.jpg` · 2400×1500 · 운무 속 산과 지붕
사용 위치: 소개 상단 영상 포스터(100vh, 16:9 로 위쪽 60px 잘림, 정중앙 흰 제목, 모바일 480px) · 목표 밝기 104
짙은 운무가 흐르는 산 중턱, 안개 사이로 한옥 기와 지붕 두세 채가 반쯤 드러난다. 흐린 아침 은회색 톤. 정중앙은 흰 글자용으로 안개의 중간 밝기 면, 지붕은 가로 중앙 40% 안 아래쪽. 망원 135mm.
English: Thick mist drifting across a mountainside with two or three hanok tiled roofs half-revealed through the fog, silvery overcast morning tones, mid-grey fog in the center for overlaid white text, roofs in the lower center, 135mm telephoto, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C02 (d38) · `about-bg.jpg` · 2400×1883 · 설산 능선과 구름
사용 위치: 소개 본문 배경(1130px 높이, 좌상단~중앙에 제목·본문 흰 글자, 아래는 #131313 로 이어짐) · 목표 밝기 104
겨울 새벽, 눈 덮인 먼 산 능선 위로 구름이 흐른다. 위쪽 40% 는 **어두운 먹빛 하늘**(글자 대비용), 중간에 빛을 받은 설산 능선, 아래쪽은 다시 어두운 산그늘로 가라앉아 #131313 배경과 이어지게. 망원 200mm, 수평 구도.
English: Winter dawn above distant snow-covered mountain ridges with drifting clouds, the upper forty percent a dark ink-toned sky for white text, lit snowy ridgeline across the middle, lower part sinking into deep mountain shadow that blends into near-black, 200mm telephoto, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C03 (d39) · `about-slide-1.jpg` · 410×660 · 중정 수공간
사용 위치: 소개 가로 슬라이드 1/8(205×330 세로 카드, 글자 없음) · 목표 밝기 57
해 질 녘 중정의 얕은 돌 수반에 처마와 하늘이 비치는 세로 컷. 어두운 돌과 물, 수면에만 옅은 하늘빛. 위에서 비스듬히.
English: Vertical dusk view of a shallow stone water basin in a hanok courtyard reflecting the eaves and sky, dark stone and water with pale sky glow on the surface, angled from above, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C04 (d40) · `about-slide-2.jpg` · 410×660 · 툇마루를 걷는 사람
사용 위치: 소개 슬라이드 2/8 · 목표 밝기 99
린넨 옷을 입은 한국인 여성이 툇마루를 따라 걸어가는 뒷모습(얼굴 비식별), 옆으로 한지 창이 이어진다. 오전의 부드러운 빛. 세로 35mm, 인물은 중앙.
English: Vertical shot of a Korean woman in linen clothing walking away along a wooden veranda, back view, face not visible, paper windows alongside, soft morning light, 35mm, figure centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C05 (d41) · `about-slide-3.jpg` · 410×660 · 기와 지붕 선
사용 위치: 소개 슬라이드 3/8 · 목표 밝기 96
아래에서 올려다본 처마 끝과 기와 지붕의 곡선, 흐린 하늘 배경. 세로 화면을 사선으로 가르는 추녀선. 망원, 그래픽한 구도.
English: Vertical upward view of a hanok eave corner and curved tiled roof against an overcast sky, the upturned eave line cutting diagonally across the frame, telephoto graphic composition, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C06 (d42) · `about-slide-4.jpg` · 410×660 · 창 너머 꽃나무
사용 위치: 소개 슬라이드 4/8 · 목표 밝기 103
실내에서 열린 창틀 너머로 보이는 꽃 핀 매화 가지. 창틀은 어두운 프레임, 바깥은 부드러운 봄빛. 세로 50mm.
English: Vertical view from indoors through an open wooden window frame to a blossoming plum branch outside, dark frame with soft spring light beyond, 50mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C07 (d43) · `about-slide-5.jpg` · 410×660 · 실내 온욕탕
사용 위치: 소개 슬라이드 5/8 · 목표 밝기 70
편백 벽과 석조 바닥의 실내 온욕탕, 따뜻한 물 위로 김, 높은 창에서 내려오는 한 줄기 빛. 세로 24mm, 어두운 톤.
English: Vertical view of an indoor hinoki-walled bath with stone floor, steam above warm water and a single beam of light from a high window, dark moody tones, 24mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C08 (d44) · `about-slide-6.jpg` · 410×660 · 다실에 앉은 사람
사용 위치: 소개 슬라이드 6/8 · 목표 밝기 84
좌식 다실에 무릎 꿇고 앉아 찻잔을 두 손으로 든 한국인 남성의 옆모습(얼굴은 그늘로 비식별), 창가 측광. 세로 50mm, 인물 중앙.
English: Vertical side view of a Korean man kneeling in a floor-seated tea room holding a tea cup with both hands, face in shadow and not identifiable, window side light, 50mm, figure centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C09 (d45) · `about-slide-7.jpg` · 410×660 · 돌담길
사용 위치: 소개 슬라이드 7/8 · 목표 밝기 68
기와를 얹은 막돌 담장이 한쪽으로 이어지는 좁은 흙길, 흐린 늦은 오후, 담 위로 나뭇가지. 세로 35mm, 길은 안쪽으로 소실.
English: Vertical view of a narrow earth lane beside a rubble-stone wall capped with roof tiles, branches over the wall, overcast late afternoon, lane receding into the distance, 35mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C10 (d46) · `about-slide-8.jpg` · 410×660 · 저녁 조명의 처마
사용 위치: 소개 슬라이드 8/8 · 목표 밝기 125
블루아워, 처마 밑 서까래가 아래 조명으로 따뜻하게 밝혀지고 뒤 하늘은 밝은 푸른빛. 세로, 아래에서 올려다봄.
English: Vertical upward view of hanok rafters under the eaves warmly uplit at blue hour against a bright blue sky, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C11 (d47) · `about-video.jpg` · 2400×1500 · 바람 스치는 마당
사용 위치: 소개 중간 영상 포스터(900px, 오른쪽으로 짙어지는 검정 그라데이션 + 오른쪽 10% 지점에 흰 제목·본문, 모바일 420px + 35% 덮개) · 목표 밝기 68
늦은 오후, 한옥 마당 가장자리의 억새와 대나무가 바람에 한쪽으로 기울고 흙 마당에 긴 그림자. 피사체(억새·툇마루 모서리)는 **왼쪽~중앙**, 오른쪽 40% 는 어두운 담장과 그늘로 단순하게(글자 자리). 35mm, 서 있는 높이.
English: Late afternoon hanok courtyard edge with silver grass and bamboo bending in the wind and long shadows across the earth yard, subject on the left to center, right forty percent simple dark wall and shade for text, 35mm at standing height, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C12 (d48) · `season-spring.jpg` · 620×680 · 봄 꽃나무 길
사용 위치: 사계 박스 봄(310×340, 비활성 흑백·활성 1.08배 컬러, 중앙에 흰 글자) · 목표 밝기 153
벚꽃·매화가 활짝 핀 나무 아래 돌담 옆 흙길, 밝은 봄 오전. 흑백으로도 꽃과 그늘의 대비가 살게. 가장자리 4% 여유, 중앙은 너무 복잡하지 않게.
English: Earth path beside a stone wall under trees in full cherry and plum blossom, bright spring morning, strong tonal contrast that still reads in black and white, calm center, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C13 (d49) · `season-summer.jpg` · 960×1100 · 여름 숲과 중정
사용 위치: 사계 박스 여름(480×550) · 목표 밝기 120
짙푸른 여름 숲에 둘러싸인 한옥 중정, 이끼 마당과 열린 창호, 맑은 낮 빛. 녹음과 목조의 대비, 흑백에서도 명암이 분명하게.
English: Hanok courtyard surrounded by lush deep-green summer forest, moss yard and open lattice doors, clear midday light, strong contrast between greenery and timber that also works in black and white, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C14 (d50) · `season-autumn.jpg` · 620×680 · 가을 단풍 담장
사용 위치: 사계 박스 가을(310×340) · 목표 밝기 62
붉은 단풍이 기와 담장 위로 늘어진 늦가을 해 질 녘, 담장은 그늘 속, 단풍만 역광으로 빛난다. 전체는 어둡게.
English: Late autumn dusk with red maple leaves draping over a tiled stone wall, wall in shadow and leaves backlit and glowing, overall dark exposure, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### C15 (d51) · `season-winter.jpg` · 830×960 · 겨울 눈 쌓인 마당
사용 위치: 사계 박스 겨울(415×480) · 목표 밝기 127
눈이 소복이 쌓인 한옥 마당과 눈 얹힌 기와 지붕, 흐린 겨울 오후의 고른 빛. 발자국 없는 깨끗한 눈, 툇마루 아래 어두운 그늘로 대비.
English: Hanok courtyard under a fresh blanket of snow with snow-capped tiled roofs, even overcast winter afternoon light, untouched snow contrasted by dark shade beneath the veranda, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

---

## D. 객실 페이지 (`room.html`) · 13장

### D01 (d52) · `room-top.jpg` · 2400×1500 · 청연 객실 전경
사용 위치: 객실 상단 영상 포스터(100vh, 16:9 로 위쪽 60px 잘림, 정중앙 흰 제목, 모바일 500px) · 목표 밝기 73 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
저녁 무렵 청연 객실 전경: 넓은 대청 너머 침실 공간, 한지 조명 여러 개가 은은하게 켜지고 열린 창호 밖으로 어두워지는 정원. 전체적으로 어둡고 따뜻한 톤, 정중앙은 조명이 과하게 몰리지 않은 중간 밝기. 24mm, 가로 중앙 40% 에 침실 축.
English: Evening wide view of a hanok guest suite, open hall leading to the sleeping area, several hanji lamps softly lit, garden darkening beyond open lattice doors, dark warm tones with a moderately lit center, 24mm, main axis centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D02 (d53) · `room-main.jpg` · 830×980 · 침대와 간접 조명
사용 위치: 객실 대표 세로 사진(415×490, 모바일은 390:335 가로 비율로 잘림) · 목표 밝기 131 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
낮은 원목 침대와 흰 린넨, 머리판 뒤 벽을 타고 올라가는 따뜻한 간접 조명, 옆 한지 창으로 들어오는 낮 빛. 침대와 조명은 **세로 중앙 70%** 안에. 50mm.
English: Low solid-wood bed with white linen, warm indirect light washing up the wall behind the headboard, daylight through a hanji window beside, bed and light kept in the vertical middle seventy percent, 50mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D03 (d54) · `room-gallery-1.jpg` · 2400×1800 · 노천 온욕(밤)
사용 위치: 객실 갤러리 1/4(1440×1080 전체 폭, 왼쪽 6% 세로 썸네일 + 좌하단 20% 지점 흰 제목, 아래→위 전환, 모바일 370px) · 목표 밝기 32 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
깊은 밤, 개별 정원의 석조 노천 탕에 김이 오르고 물 속 조명과 등불 하나만 켜져 있다. 거의 검은 화면에 수면과 김만 은은하게(목표 32, 매우 어둡게). 탕은 가로 중앙~오른쪽, 좌하단은 글자 자리로 검게.
English: Deep night private garden with a stone outdoor bath, steam rising, only an underwater light and one lantern glowing, nearly black frame with softly lit water and steam, bath center-right, lower left dark for text, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D04 (d55) · `room-gallery-2.jpg` · 2400×1800 · 다실과 다구
사용 위치: 객실 갤러리 2/4 · 목표 밝기 81 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
객실 안 다실 코너: 낮은 찻상 위 다구 한 벌, 벽의 작은 족자 자리(글씨 없는 빈 한지), 창가 늦은 오후 빛. 찻상은 가로 중앙, 좌하단은 어둡게 단순하게.
English: Tea corner inside a hanok suite, a full tea set on a low table, a blank hanji hanging scroll with no writing, late afternoon window light, table centered, lower left calm and dark, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D05 (d56) · `room-gallery-3.jpg` · 2400×1800 · 창가 휴식 공간
사용 위치: 객실 갤러리 3/4 · 목표 밝기 73 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
큰 통창 앞 낮은 좌식 소파와 방석, 담요, 창밖은 비 오는 숲. 흐린 빛에 실내가 어둑하고 창만 은은히 밝다. 창은 가로 중앙.
English: Low floor sofa with cushions and a throw before a large window, rainy forest outside, dim interior with the window softly bright, window centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D06 (d57) · `room-gallery-4.jpg` · 2400×1800 · 소품과 선물 상자
사용 위치: 객실 갤러리 4/4 · 목표 밝기 83 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
객실 원목 선반 위 웰컴 기프트: 무지 오동나무 상자, 보자기 꾸러미, 작은 백자 향합, 말린 꽃. 측광, 소품은 가로 중앙.
English: Welcome gift on a wooden shelf in a hanok room, a plain paulownia box, a bojagi bundle, a small white porcelain incense case and dried flowers, side light, items centered, no labels, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D07 (d58) · `room-slide-1.jpg` · 2400×1333 · 트윈 침대와 거실
사용 위치: 객실 슬라이드 1/6(1260×700 페이드, 글자 없음, 모바일 200px 높이) · 목표 밝기 112 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
낮은 원목 트윈 침대 두 개와 앞쪽의 좌식 거실, 한지 창의 밝은 낮 빛. 24mm, 서 있는 높이, 중앙 85% 안에 가구.
English: Two low wooden twin beds with a floor-seated lounge area in front, bright daylight through hanji windows, 24mm at standing height, furniture within the central area, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D08 (d59) · `room-slide-2.jpg` · 2400×1333 · 욕실
사용 위치: 객실 슬라이드 2/6 · 목표 밝기 122 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
편백 욕조와 회색 석재 세면대, 작은 창으로 보이는 대나무, 밝고 깨끗한 낮 빛. 수전·용품에 로고 없음.
English: Bathroom with a hinoki tub and grey stone vanity, bamboo visible through a small window, bright clean daylight, fixtures without logos, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D09 (d60) · `room-slide-3.jpg` · 2400×1333 · 개별 정원
사용 위치: 객실 슬라이드 3/6 · 목표 밝기 92 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
객실에서 이어지는 작은 개별 정원: 이끼, 디딤돌, 낮은 돌담, 단풍나무, 한쪽에 툇마루. 흐린 날의 고른 빛.
English: Small private garden attached to a guest room, moss, stepping stones, a low stone wall, a maple tree and a veranda edge, even overcast light, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D10 (d61) · `room-slide-4.jpg` · 2400×1333 · 다실
사용 위치: 객실 슬라이드 4/6 · 목표 밝기 90 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
객실 안 작은 다실 전경(D04 보다 넓게): 좌식 찻상, 방석 두 개, 한지 창 두 면, 오후 빛. A05 와 다른 공간·각도.
English: Wider view of a small tea room inside a guest suite, floor tea table, two cushions, hanji windows on two walls, afternoon light, different angle from other tea shots, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D11 (d62) · `room-slide-5.jpg` · 2400×1333 · 파우더룸
사용 위치: 객실 슬라이드 5/6 · 목표 밝기 119 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
원목 화장대와 둥근 거울, 무지 도자기 용기, 흰 수건, 한지 창의 부드러운 빛. 거울에 인물·카메라 비치지 않게.
English: Wooden vanity with a round mirror, plain ceramic containers and white towels, soft hanji window light, no person or camera reflected in the mirror, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D12 (d63) · `room-slide-6.jpg` · 2400×1333 · 야간 조명 외관
사용 위치: 객실 슬라이드 6/6 · 목표 밝기 108 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
블루아워, 독채 한 채의 외관 — 창호 전체에 따뜻한 불이 들어오고 하늘은 아직 밝은 푸른빛. 정면 약간 비스듬히, 24mm, 건물은 중앙.
English: Blue-hour exterior of a single hanok guesthouse with every paper window warmly lit and the sky still bright blue, three-quarter front view, 24mm, building centered, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### D13 (d64) · `room-plan.jpg` · 2400×1600 · 청연 평면도 — 생성 제외
사용 위치: 객실 평면도 팝업(object-fit:contain) · 목표 밝기 해당 없음
**교체 지침:** 이미지 생성기로 만들지 않는다. 실제 운영 시 건축 도면을 바탕으로 CAD·일러스트로 그린 평면도(실·면적 표기 포함)를 2400×1600 JPG 로 넣는다. 샘플 단계에서는 현재 임시 이미지를 유지하거나 글자 없는 단순 선 도면으로만 대체한다.
이유: 평면도는 실제 공간 정보라 생성 이미지로 만들면 허위 정보가 된다.

---

## E. 오시는 길 (`location.html`) · 3장

### E01 (d65) · `location-top.jpg` · 2400×1500 · 벚꽃과 담장
사용 위치: 오시는 길 상단(100vh, 정중앙 흰 제목, 모바일 495px) · 목표 밝기 118
봄 오전, 기와 얹은 담장과 대문 위로 벚꽃 가지가 드리운다. 대문 위 현판 자리는 **글자 없는 빈 나무판**이거나 프레임 밖으로 뺀다. 벚꽃은 위쪽에서 드리우고 담장·대문은 가로 중앙 40% 안, 정중앙은 흰 글자가 읽히도록 너무 밝은 흰 꽃 덩어리를 두지 않는다. 50mm, 서 있는 높이.
English: Spring morning with cherry blossom branches hanging over a tiled stone wall and a wooden hanok gate, the signboard above the gate left blank or out of frame, gate centered, center not blown out by white blossoms, 50mm at standing height, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### E02 (d66) · `location-route.png` · 2312×2098 · 권역별 약도 일러스트 — 생성 제외
사용 위치: 오시는 길 약도(투명 PNG, 흰 선화, object-fit:cover) · 목표 밝기 해당 없음
**교체 지침:** 사진 생성기로 만들지 않는다. 디자이너가 벡터로 그린 **글자 없는 흰 선화 일러스트**(산 능선·물길·권역 방향 화살표 정도)를 투명 PNG 로 넣고, 권역별 소요 시간 등 모든 글자는 HTML 로 올리거나 벡터 편집 단계에서 정확한 값을 확인해 넣는다. 실제 경로·거리 정보는 운영자가 확인한 값만 사용.
이유: 약도의 경로·시간은 사실 정보라 생성 이미지로 만들면 틀린 위치·글자가 들어갈 위험이 크다.

### E03 (d67) · `location-map.jpg` · 524×524 · 위치 지도 — 생성 제외
사용 위치: 오시는 길 오른쪽 작은 지도(262×262) · 목표 밝기 해당 없음
**교체 지침:** 생성하지 않는다. 실제 운영 시 지도 서비스의 캡처(이용 약관·출처 표기 준수) 또는 지도 API 임베드로 교체한다. 샘플 단계에서는 현재 임시 이미지를 유지.
이유: 지도는 실제 위치 정보이므로 가상 생성하면 허위 위치가 된다.

---

## F. 예약 안내 (`reservation.html`) · 8장

### F01 (d68) · `reservation-top.jpg` · 2400×1333 · 도자기 라운지
사용 위치: 예약 상단(800px, 아래 564px 를 검정 그라데이션이 덮음, 정중앙 흰 제목, 모바일 480px) · 목표 밝기 71
저녁의 어두운 라운지, 벽면 원목 선반에 백자·분청 도자기가 간격을 두고 진열되고 각 칸에 작은 핀 조명. 선반은 **위쪽 55%**에 몰고 아래는 어두운 마루로 그라데이션에 자연스럽게 묻히게. 가로 중앙 40% 안에 가장 밝은 칸. 35mm.
English: Dim evening lounge with wall-mounted wooden shelves displaying white porcelain and buncheong ceramics, each niche softly spotlit, shelves concentrated in the upper fifty-five percent, dark wooden floor below fading into shadow, brightest niche centered, 35mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F02 (d69) · `reservation-1.jpg` · 742×742 · 달항아리(이용안내)
사용 위치: 예약 좌측 고정 이미지 1(371×371 정사각, 스크롤 단계별 페이드 교체) · 목표 밝기 78
어두운 회벽 앞 달항아리 한 점, 한쪽 측광으로 반달 모양의 하이라이트. A10·A18 과 다른 각도(약간 위에서, 배경 더 어둡게). 정사각 중앙.
English: A moon jar against a dark plaster wall with single side light forming a crescent highlight, seen slightly from above, darker than other moon jar shots, centered square, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F03 (d70) · `reservation-2.jpg` · 742×742 · 찻상(예약안내)
사용 위치: 예약 좌측 이미지 2 · 목표 밝기 166
밝은 창가의 흰 린넨 위에 놓인 작은 찻상과 백자 찻잔, 과감하게 밝은 하이키 톤(목표 166). 부감, 정사각 중앙.
English: Small tea tray with white porcelain cups on white linen by a bright window, airy high-key exposure, overhead view, centered square, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F04 (d71) · `reservation-3.jpg` · 742×742 · 객실 침구(객실요금)
사용 위치: 예약 좌측 이미지 3 · 목표 밝기 52 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
밤, 한지 스탠드 하나만 켜진 방의 흰 침구 클로즈업 — 이불 주름과 베개에 따뜻한 빛, 나머지는 어둠. 정사각, 50mm.
English: Night close-up of white bedding in a room lit only by a hanji lamp, warm light on the duvet folds and pillow, rest in darkness, square, 50mm, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F05 (d72) · `reservation-4.jpg` · 742×742 · 현관 등(환불사항)
사용 위치: 예약 좌측 이미지 4 · 목표 밝기 34
한밤 한옥 대문 옆 기둥에 걸린 작은 등 하나, 주변은 거의 검정(목표 34). 등 빛이 나무 기둥 결을 비춘다. 정사각 중앙.
English: Late night, a single small lantern hanging on a wooden post beside a hanok gate, surroundings almost black, lantern light revealing the wood grain, centered square, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F06 (d73) · `reservation-thumb-1.jpg` · 624×718 · 눈 내린 마당
사용 위치: 예약 하단 3장 구성 왼쪽(312×359, 모바일 숨김) · 목표 밝기 135
눈이 내리는 한옥 마당, 장독대에 소복한 눈, 흐린 겨울빛. C15 와 다른 장면(장독대 중심, 눈송이가 보이게).
English: Snow falling on a hanok yard with snow piled on earthenware jars, soft overcast winter light, visible snowflakes, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F07 (d74) · `reservation-thumb-2.jpg` · 946×1086 · 좌식 다실
사용 위치: 예약 하단 가운데 큰 사진(473×543, 모바일에서는 이 한 장만 180×229) · 목표 밝기 55
어두운 좌식 다실, 낮은 찻상과 방석, 반쯤 열린 창호 틈으로 들어온 좁은 빛. 모바일 크롭(약간 좌우 잘림)을 고려해 찻상은 가로 중앙 80% 안.
English: Dark floor-seated tea room with a low tea table and cushions, a narrow beam of light through a half-open lattice door, table within the central eighty percent, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

### F08 (d75) · `reservation-thumb-3.jpg` · 624×718 · 벽 장식 소품
사용 위치: 예약 하단 오른쪽(312×359, 모바일 숨김) · 목표 밝기 144
밝은 흰 회벽에 걸린 작은 목공예 선반과 마른 꽃가지, 도자기 한 점. 밝은 오전 확산광, 여백 많은 미니멀 정물.
English: Minimal still life on a bright white plaster wall, a small handcrafted wooden shelf with a dried flower branch and one ceramic piece, bright diffused morning light, generous negative space, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark

---

## 생성 후 검증

1. `public/damhwa/assets/` 에 photo-map 의 파일 **75개**가 모두 존재하는지 확인(생성 제외 3개는 임시 또는 교체본).
2. 각 파일 픽셀 크기가 photo-map 생성w×생성h 와 정확히 일치하는지, `.png` 는 RGBA 알파가 있는지 확인.
3. 이미지 안에 글자·숫자·현판 글씨·로고·워터마크가 없는지 육안 확인.
4. 목표 밝기 ±15 이내인지 Pillow 로 그레이 평균 측정:
   ```bash
   python3 - <<'PY'
   from PIL import Image, ImageStat
   import csv
   rows=[r for r in csv.reader(open('tools/ref-clone/photo-map-damhwa.txt',encoding='utf-8'),delimiter='\t') if r and not r[0].startswith('#')]
   for r in rows:
       f='public/damhwa/assets/'+r[2]; im=Image.open(f)
       ok=im.size==(int(r[5]),int(r[6]))
       tgt=r[7].split('평균')[-1].strip() if '평균' in r[7] else ''
       m=round(ImageStat.Stat(im.convert('L')).mean[0]) if im.mode!='RGBA' else '-'
       flag='' if (not tgt or m=='-' or abs(m-int(tgt))<=15) else ' <-- 밝기'
       print(r[0], r[2], im.size, 'OK' if ok else 'SIZE!', m, tgt, flag)
   PY
   ```
5. 슬라이드 묶음(메인 1~6, 객실 1~6, 스페셜 1~7, 소개 1~8, 스토리 1~3, 전체메뉴 띠 1~6, 객실 호버 1~4)의 색온도·그레인·톤이 한 시리즈로 보이는지, 장면이 서로 겹치지 않는지 확인.
6. 재검사: `python3 /tmp/claude-0/preflight_linux.py damhwa` (없으면 `python3 tools/ref-clone/preflight.py damhwa`).
7. 썸네일 `public/thumbs/damhwa.jpg` 와 사례 캡처 `public/cases/damhwa/` 를 새 이미지로 다시 촬영한다(1440px·768px·390px).

---

## 참고: og.jpg (1200×630) 프롬프트 — 수량 제외

사용 위치: `public/damhwa/og.jpg` 공유 미리보기(photo-map 에 없음, 현재 파일 교체 시 참고).
운무 낀 산 능선 아래 계곡가에 자리한 한옥 지붕 두세 채, 해 질 녘 창호에 따뜻한 불빛. 가로 중앙에 한옥, 위쪽은 회청 하늘 여백. 목표 밝기 80~100.
English: Misty mountain ridges above a valley stream with two or three hanok roofs and warm lit paper windows at dusk, buildings centered, calm slate-blue sky above, photorealistic, serene Korean hanok stay editorial photography, muted slate-grey and warm wood palette, soft natural light, subtle film grain, no text, no logo, no watermark
