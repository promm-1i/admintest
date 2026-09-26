# aurelle 아우렐 호텔 서울 이미지 생성 프롬프트

## 생성 상태

- 대상 템플릿: `public/aurelle/` (index · offer · rewards · faq · login)
- 현재 `public/aurelle/assets/`의 사진 39장은 **톤과 밝기만 맞춘 임시 이미지(등고선 무늬)**이며, 실제 사진은 아직 생성 전이다.
- 프롬프트 수: **39개** = `tools/ref-clone/photo-map-aurelle.txt` 데이터 행 수(a1~a39)
- 생성 후 아래 표기된 파일명 그대로 `public/aurelle/assets/`에 덮어쓴다.
- `og.jpg`는 photo-map에 없으므로 문서 끝에 참고 프롬프트 1개만 둔다(수량 39에 포함하지 않음).

## 납품 기준

- 브랜드: `AURELLE HOTEL SEOUL / 아우렐 호텔 서울` — 포트폴리오용 **가상 브랜드**. 서울 도심의 단일 럭셔리 호텔(체인 아님).
- 저장 위치: `public/aurelle/assets/`
- 파일명: 아래 제목의 파일명과 **완전히 동일**하게 저장
- 픽셀 크기: 각 항목의 **생성 크기(photo-map의 생성w×생성h) 그대로**. 비율을 바꾸거나 여백을 덧대지 않는다.
- 형식: sRGB 고품질 JPG(품질 85~90). 이 브랜드에는 투명 PNG 자리가 없다.
- 공통 스타일: 럭셔리 호텔 브로슈어·에디토리얼 사진. 절제된 모던 인테리어(월넛·오크 목재, 트래버틴·베이지 대리석, 린넨·부클레 패브릭, 브론즈 금속), 자연광 중심의 부드러운 빛, 얕지 않은 적정 심도. 색감은 `site.css` 토큰 기준 — 배경 아이보리 `#f8f7f4`, 딥 브라운 `#3d3936`, 토프 `#736c65`, 브론즈 포인트 `#8c6d3f`, 잉크 `#212121`. 다이닝 탭 패널 틴트(청록 `rgb(30,95,119)`, 브라운 `rgb(74,56,48)`, 딥그린 `rgb(61,88,73)`)와 라이프스타일 베일(남색 `rgb(13,27,45)`)이 사진 위에 얹히므로 사진 자체는 따뜻한 뉴트럴로 통일하고 채도 높은 원색은 피한다. 계절감은 메인 캠페인에 맞춰 **가을**(연말 프로모션 1장만 겨울).
- 공통 금지: 이미지 안의 글자·숫자·간판·로고·메뉴판·워터마크, 병·박스·어메니티의 라벨 문구, 실존 호텔·리조트·브랜드의 상표와 시그니처 인테리어, 실제 랜드마크 건물(남산타워·롯데월드타워 등)이 식별되는 스카이라인, 레퍼런스 사이트 사진의 구도·소품 모사, 과한 HDR·CG 렌더 질감·플라스틱 재질, 왜곡된 손·얼굴, 중복 인물.
- 인물 조건: 기본은 인물 없는 공간·정물 사진. 필요한 경우 한국인 중심, 실존 인물을 닮지 않게, 뒷모습·손·원거리 실루엣 등 비식별 또는 자연스러운 스냅. 광고 포즈 금지.
- 크롭 규칙(CSS 근거):
  - 메인 비주얼(`.mv-img`, object-fit:cover): PC 1440×700, 모바일(≤1000px) 높이 360px → 가로 **중앙 50%**만 남는다. 글자는 PC·모바일 모두 **좌하단 흰 글자**. 핵심 피사체는 가로 45~75%, 세로 25~80%.
  - 공간 아코디언(`.acc`): PC 펼침 900×600, 접힘 180×600 세로띠(블러·scale 1.15), 글자는 **하단 중앙**(좌우 14.5% 안쪽, 하단 53px). 모바일 351×400 → 가로 **중앙 58%**. 핵심 피사체는 중앙 55% 폭, 하단 30%는 단순하게.
  - 다이닝 탭(`.dn-cont .bg`): PC에서 **오른쪽 440px(약 30%)를 반투명 색 패널이 덮음** → 피사체는 왼쪽 65%. 모바일은 약 375×660 박스에서 가로 **중앙 25%**, 그중 **위쪽 220px(상단 1/3)**만 패널 밖으로 보인다 → 핵심 피사체를 가로 35~62%, 세로 10~50%에 둔다.
  - 라이프스타일(`.lf-sp`): 호버 시 폭이 약 220px~1100px로 변하고 scale 1.03→1.12, 기본은 90% 남색·회색 베일로 덮임. 모바일(≤760px) 전폭×320px. 핵심 피사체는 **가로 중앙 30%**, 가장자리 6% 여유.
  - 컬렉션(`.cl-it`): 336×356(모바일 335×320), 호버 블러·scale 1.1, 모바일은 하단 흰 글자 상시 표시 → 피사체는 중앙~상단 60%, 하단 35%는 차분하게.
  - 프로모션 카드: 440×330 → 모바일 약 335×220, 오퍼 페이지 추천 444×285·모바일 350:207 → 세로가 최대 약 20% 잘린다. 핵심 피사체는 **세로 중앙 75%**.
  - 리워즈 카드(`.ven-card`): 437×264 → 모바일 317×220, 좌우 약 13%씩 잘림. **사진 중앙에 흰 워드마크**가 얹힌다.
  - 슬라이드·애니메이션: 메인·프로모션·컬렉션 Swiper는 페이드/줌 없는 가로 슬라이드. 줌이 있는 곳은 라이프스타일(최대 1.12)·컬렉션 호버(1.1)·아코디언 접힘 띠(1.15)뿐.
- **밝기 가이드**: 각 항목의 `목표 밝기`(0~255 그레이 평균, photo-map 값)를 사진 노출 기준으로 쓴다. 현재 텍스트 대비·오버레이가 이 밝기에 맞춰 검증돼 있으므로 **±15를 넘지 않게** 노출·톤을 맞춘다. 49·58처럼 낮은 값은 로우키, 170 이상은 하이키 화이트 톤이다.
- 실사진 교체 표기: 호텔 자체 시설(외관·객실·수영장·레스토랑·라운지)과 판매 상품을 보여 주는 자리는 **샘플 시연용 생성 가능, 실제 납품 시 실사진 교체**. 실제 운영 시 생성 이미지로 시설을 대신하면 과장 광고가 되기 때문이다.

## 출력 크기와 수량

- 메인 비주얼 3장: `2400×1167px` (hero-1~3)
- 공간 아코디언 4장: `1800×1200px` (space-1~4)
- 프로모션 카드 8장: `880×660px` (promo-1~8)
- 다이닝 탭 3장: `2400×1067px` (dining-1~3)
- 라이프스타일 2장: `1474×824px` (life-1~2)
- 컬렉션 4장: `672×712px` (collection-1~4)
- 전체 메뉴 1장: `948×684px` (allmenu)
- 오퍼 대표 1장: `1026×640px` (offer-main)
- 오퍼 구성 5장: `960×596px` (offer-item-1~5)
- 클럽 소개 1장: `1180×800px` (club-hero)
- 선택형 혜택 3장: `874×492px` (club-select-1~3)
- 공간별 혜택 3장: `874×528px` (club-venue-1~3)
- 가입 배너 1장: `2400×372px` (club-cta)
- 합계 **39장** (모두 JPG)

---

## A. 메인 페이지 · 24장

### A01 (a1) · `hero-1.jpg` · 2400×1167 · 가을 햇살의 로비 라운지
사용 위치: 메인 첫 화면 슬라이드 1 "Autumn Retreat" (글자: 좌하단 흰 제목·설명, 그 아래 페이지 표시) · 목표 밝기 88
늦은 오후 가을 햇살이 높은 통창으로 비스듬히 들어오는 호텔 로비 라운지. 트래버틴 바닥, 월넛 낮은 테이블, 아이보리 부클레 라운지 체어가 창가를 따라 놓이고 따뜻한 간접 조명이 천장 몰딩을 비춘다. 로우키 노출로 화면 왼쪽 40%와 하단은 그늘진 단순한 벽·바닥으로 남겨 흰 글자 자리로 쓰고, 빛이 떨어지는 창가 좌석 무리를 가로 45~75%에 둔다. 35mm, 눈높이, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(호텔 로비 실공간).
English: Luxury hotel lobby lounge in late autumn afternoon, low sun raking through tall windows onto travertine floor, walnut tables and ivory boucle armchairs by the window, warm indirect cove lighting, low-key exposure with calm shadowed wall on the left and bottom for headline space, main seating group center-right, 35mm eye level, no people; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A02 (a2) · `hero-2.jpg` · 2400×1167 · 해 질 녘 스위트 창가
사용 위치: 메인 첫 화면 슬라이드 2 "스위트 시그니처 패키지" (글자: 좌하단 흰 글자) · 목표 밝기 96
해 질 녘 블루아워 직전, 고층 스위트 객실 창가에서 바라본 장면. 전면 통창 밖으로 불이 하나둘 켜지는 이름 없는 도심 스카이라인(식별 가능한 랜드마크 없음)이 흐릿하게 펼쳐지고, 창가에 린넨 커튼과 토프색 라운지 체어, 사이드 테이블 위 와인잔 하나. 실내는 따뜻한 스탠드 조명, 창밖은 푸른 황혼. 화면 왼쪽은 어두운 커튼과 벽으로 단순하게 두어 글자 여백을 만들고, 창과 체어는 가로 45~75%. 모바일 중앙 50%만 남아도 창가 좌석이 보여야 한다. 28~35mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(객실 실공간).
English: High-floor hotel suite window corner at dusk, floor-to-ceiling glass showing a generic city skyline with lights coming on (no recognizable landmarks), linen drapes, taupe lounge chair and side table with a single wine glass, warm lamp light inside against blue twilight, dark drape and wall on the left for headline space, chair and window center-right, 30mm; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A03 (a3) · `hero-3.jpg` · 2400×1167 · 야간 실내 수영장
사용 위치: 메인 첫 화면 슬라이드 3 "아쿠아 나이트" (글자: 좌하단 흰 글자) · 목표 밝기 121
밤의 호텔 실내 수영장. 석회석 타일 풀사이드, 잔잔한 수면 아래 따뜻한 수중 조명이 청록빛으로 번지고, 천장 라인 조명과 통창 밖 도시의 보케가 수면에 반사된다. 풀을 대각선으로 가로지르는 광각 구도, 화면 왼쪽 하단은 어두운 풀사이드 바닥과 물로 단순하게 두고, 풀 끝의 데이베드 두 개와 창을 가로 45~75%에 둔다. 인물 없음, 물결은 거의 없는 고요한 수면.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(수영장 실공간).
English: Hotel indoor swimming pool at night, limestone deck, calm water glowing with warm underwater lights turning soft teal, linear ceiling lights and blurred city bokeh through glass reflected on the surface, wide diagonal composition, dark simple poolside at lower left for headline space, two daybeds and windows center-right, no people; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A04 (a4) · `space-1.jpg` · 1800×1200 · 도심 속 호텔 외관
사용 위치: 메인 "공간" 아코디언 1 "아우렐 호텔 서울" (글자: 하단 중앙 흰 워드마크·설명·버튼, 접힘 시 중앙 흰 워드마크) · 목표 밝기 106
맑은 가을 하늘 아래 도심 속에 선 가상의 호텔 타워를 로우앵글로 올려다본 외관. 베이지 석재 파사드와 브론즈 수직 루버, 저층부에 캐노피와 가로수(단풍 든 은행나무). 실존 건물을 닮지 않은 절제된 모던 설계, 간판·로고 없음. 타워를 가로 중앙 55%에 세우고 하단 30%는 그늘진 가로수와 포디엄으로 단순하게. 24mm, 수직선 보정.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(호텔 외관).
English: Low-angle view of a fictional modern luxury hotel tower in a city center under clear autumn sky, beige stone facade with bronze vertical louvers, podium canopy and yellow ginkgo street trees, not resembling any real building, tower centered, calm shaded base in lower third, 24mm with corrected verticals; photorealistic, refined luxury hotel architectural photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A05 (a5) · `space-2.jpg` · 1800×1200 · 스위트 침실과 거실
사용 위치: 메인 "공간" 아코디언 2 "스위트 & 객실" (글자: 하단 중앙 흰 글자) · 목표 밝기 100
오후의 부드러운 창광이 드는 스위트 객실. 앞쪽은 토프 소파와 오크 커피 테이블의 거실, 열린 슬라이딩 도어 너머 흰 린넨 침구의 킹 베드가 보이는 깊이감 있는 구도. 벽은 따뜻한 그레이 패브릭 패널, 브론즈 스탠드. 침대와 도어 개구부를 가로 중앙 55%에 두고, 하단 30%는 러그와 바닥으로 차분하게. 28mm, 허리 높이 시점.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(객실 실공간).
English: Luxury hotel suite in soft afternoon window light, living area with taupe sofa and oak coffee table in foreground, open sliding door revealing king bed with white linen beyond, warm grey fabric wall panels, bronze floor lamp, bed and doorway centered, calm rug and floor in lower third, 28mm waist height; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A06 (a6) · `space-3.jpg` · 1800×1200 · 스파와 실내 수영장
사용 위치: 메인 "공간" 아코디언 3 "스파 & 인도어 풀" (글자: 하단 중앙 흰 글자) · 목표 밝기 86
저녁 무렵 조도를 낮춘 스파 존. 앞쪽에 짙은 석재 풀과 잔잔한 물, 뒤쪽 반투명 유리 너머 트리트먼트 룸의 따뜻한 조명, 벽면은 세로 결 월넛 패널. A03보다 가까운 시점과 어두운 톤으로 겹치지 않게. 수면의 반사와 벽 조명을 중앙 55%에, 하단은 어두운 물로 단순하게. 35mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(스파 실공간).
English: Dimly lit hotel spa zone in the evening, dark stone pool with still water in foreground, warm glow from treatment room behind frosted glass, vertical-grain walnut wall panels, reflections centered, dark simple water at bottom, 35mm; photorealistic, refined luxury hotel spa photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A07 (a7) · `space-4.jpg` · 1800×1200 · 루프탑 라운지 바 야경
사용 위치: 메인 "공간" 아코디언 4 "스카이 라운지" (글자: 하단 중앙 흰 글자) · 목표 밝기 99
밤의 최상층 라운지 바. 브론즈 바 카운터와 가죽 바 스툴, 뒤로 통창 가득 도시 야경 보케(랜드마크 식별 불가). 바 뒤 백바의 병들은 라벨 없는 실루엣. 카운터 조명과 창을 중앙 55%에, 하단은 어두운 카운터 앞면으로. 35mm, 약간 낮은 시점, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(라운지 실공간).
English: Rooftop hotel lounge bar at night, bronze bar counter and leather stools, floor-to-ceiling windows filled with soft city light bokeh (no landmarks), unlabeled bottle silhouettes on back bar, warm counter lighting centered, dark counter front at bottom, 35mm slightly low angle, no people; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A08 (a8) · `promo-1.jpg` · 880×660 · 창가 조식 테이블
사용 위치: 메인 프로모션 슬라이드 1 "Autumn Stay" (글자: 사진 아래 카드 본문, 사진 위 글자 없음) · 목표 밝기 127
아침 햇살이 드는 객실 창가 테이블에 차린 2인 조식. 흰 린넨 위 크루아상·과일·에그 베네딕트, 도자기 커피잔 두 개, 창밖은 흐린 도심. 45도 시점, 테이블을 세로 중앙 75%에 모은다. 50mm.
English: Breakfast for two on a window table in a hotel room, morning light, white linen with croissants, fruit and eggs benedict, two ceramic coffee cups, soft city view outside, 45-degree angle, table centered vertically, 50mm; photorealistic, refined luxury hotel food editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A09 (a9) · `promo-2.jpg` · 880×660 · 풀사이드 브런치
사용 위치: 메인 프로모션 슬라이드 2 "Poolside Brunch", 오퍼 페이지 "함께 보면 좋은 프로모션" 재사용 (사진 위 글자 없음) · 목표 밝기 166
밝은 주말 한낮, 실내 수영장 옆 테라스 테이블의 브런치 세팅. 흰 대리석 테이블 위 아보카도 토스트·과일 볼·오렌지 주스, 흐리게 보이는 밝은 청록 수면. 하이키 노출, 부드러운 확산광. 테이블을 세로 중앙 75%에 둔다. 50mm, 약간 높은 시점.
English: Bright weekend brunch setting on a poolside terrace table, white marble top with avocado toast, fruit bowl and orange juice, softly blurred pale teal pool behind, high-key diffused daylight, table centered vertically, 50mm slightly high angle; photorealistic, refined luxury hotel food editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A10 (a10) · `promo-3.jpg` · 880×660 · 가을 코스 요리
사용 위치: 메인 프로모션 슬라이드 3 "Taste of Season", 오퍼 페이지 추천 재사용 (사진 위 글자 없음) · 목표 밝기 120
짙은 월넛 테이블 위 가을 코스 한 상. 버섯과 밤을 곁들인 메인 접시, 작은 전채 두 가지, 레드 와인 한 잔, 단풍잎 하나. 측면 창광과 촛불의 따뜻한 대비, 미디엄 노출. 접시를 중앙에, 세로 상하 12%는 여유 공간. 60mm, 30도 시점.
English: Autumn tasting course on a dark walnut table, main plate with mushrooms and chestnuts, two small starters, a glass of red wine, a single maple leaf, side window light with warm candle glow, medium exposure, plate centered with vertical margin, 60mm 30-degree angle; photorealistic, refined luxury hotel fine dining photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A11 (a11) · `promo-4.jpg` · 880×660 · 스위트 욕실
사용 위치: 메인 프로모션 슬라이드 4 "Suite Escape" (사진 위 글자 없음) · 목표 밝기 118
베이지 대리석으로 마감한 스위트 욕실. 독립형 흰 욕조, 옆 원목 스툴 위 접은 수건과 라벨 없는 앰버색 어메니티 병, 간접 조명과 작은 창의 저녁빛. 욕조를 세로 중앙 75%에, 수평 구도. 35mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(객실 욕실).
English: Suite bathroom finished in beige marble, freestanding white bathtub, wooden stool with folded towels and unlabeled amber amenity bottles, soft indirect lighting and evening light from a small window, tub centered, level composition, 35mm; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A12 (a12) · `promo-5.jpg` · 880×660 · 클럽 라운지 애프터눈 티
사용 위치: 메인 프로모션 슬라이드 5 "Club Afternoon", 오퍼 페이지 추천 재사용 (사진 위 글자 없음) · 목표 밝기 170
밝은 창가 클럽 라운지 테이블의 애프터눈 티 세트. 3단 스탠드에 마카롱·스콘·작은 타르트, 흰 도자기 티포트와 찻잔, 하얀 린넨과 밝은 오후 역광. 하이키 노출, 크림·아이보리 톤. 스탠드를 중앙에 두고 위아래 여유. 50mm.
English: Afternoon tea set on a bright club lounge window table, three-tier stand with macarons, scones and small tarts, white porcelain teapot and cups, white linen, soft afternoon backlight, high-key cream and ivory tones, stand centered with vertical margin, 50mm; photorealistic, refined luxury hotel food editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A13 (a22) · `promo-6.jpg` · 880×660 · 창가 욕조와 입욕 어메니티
사용 위치: 메인 프로모션 슬라이드 6 "Spa Retreat" (사진 위 글자 없음) · 목표 밝기 146
큰 창 옆에 놓인 욕조 가장자리를 가까이 잡은 정물. 욕조 위 원목 트레이에 라벨 없는 입욕 솔트 유리병, 말린 유칼립투스, 흰 수건. 창밖은 밝게 날아간 낮 하늘. A11과 달리 클로즈업·밝은 톤. 트레이를 중앙에. 50mm.
English: Close-up of a bathtub rim beside a large window, wooden tray with unlabeled bath salt jar, dried eucalyptus and white towel, bright soft daylight with blown-out window, tray centered, 50mm; photorealistic, refined luxury hotel spa still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A14 (a23) · `promo-7.jpg` · 880×660 · 연말 장식 로비 라운지
사용 위치: 메인 프로모션 슬라이드 7 "Winter Holiday" (사진 위 글자 없음) · 목표 밝기 147
초겨울 저녁 무렵의 로비 라운지. 흰 조명이 감긴 절제된 크리스마스 트리, 골드·아이보리 오너먼트, 라운지 체어 옆 작은 케이크 세트와 찻잔. 과한 빨강 없이 브론즈·크림 톤. 트리와 테이블을 세로 중앙 75%에. 35mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(로비 실공간).
English: Hotel lobby lounge in early winter evening, understated Christmas tree with white lights and gold and ivory ornaments, small cake set and teacup beside a lounge chair, bronze and cream tones without heavy red, tree and table centered, 35mm, no people; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A15 (a24) · `promo-8.jpg` · 880×660 · 스카이 라운지 칵테일 두 잔
사용 위치: 메인 프로모션 슬라이드 8 "Sky Evening" (사진 위 글자 없음) · 목표 밝기 139
해 질 녘 스카이 라운지 창가석 테이블 위 칵테일 두 잔(앰버색 하나, 핑크빛 하나). 뒤로 노을빛 도심이 흐릿하게, 창 반사가 은은하다. 잔 두 개를 중앙에, 배경은 부드러운 보케. A07·A18보다 밝은 황혼 톤. 85mm.
English: Two cocktails, one amber and one blush pink, on a window table at a sky lounge at sunset, softly blurred glowing city behind, subtle glass reflections, glasses centered, creamy bokeh, 85mm; photorealistic, refined luxury hotel bar photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A16 (a13) · `dining-1.jpg` · 2400×1067 · 올데이 다이닝 뷔페
사용 위치: 메인 다이닝 탭 1 "라 테라스" (글자: 오른쪽 30% 청록 반투명 패널 위 흰 글자) · 목표 밝기 124
밝은 아침의 올데이 다이닝 뷔페 카운터. 트래버틴 카운터에 빵 바구니·과일·치즈 보드가 정돈되고, 뒤로 통창의 부드러운 자연광과 월넛 좌석. 카운터 중심을 가로 35~62%, 세로 상단 절반에 두고 오른쪽 30%는 패널이 덮으므로 단순한 벽·창으로. 모바일은 상단 1/3 중앙만 보이므로 음식이 그 안에 들어와야 한다. 28mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(레스토랑 실공간).
English: All-day dining buffet counter in bright morning light, travertine counter with bread baskets, fruit and cheese boards neatly arranged, soft window light and walnut seating behind, counter placed center-left in upper half, plain wall and window on the right third, 28mm, no people; photorealistic, refined luxury hotel restaurant photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A17 (a14) · `dining-2.jpg` · 2400×1067 · 한식 파인다이닝 코스
사용 위치: 메인 다이닝 탭 2 "온담" (글자: 오른쪽 30% 브라운 반투명 패널 위 흰 글자) · 목표 밝기 49
매우 어두운 로우키 조명 아래 짙은 목재 상 위에 놓인 한식 코스. 백자 그릇의 전복·나물·맑은 탕, 유기 수저, 한 줄기 스포트 조명만 음식에 떨어지고 주변은 깊은 그림자. 음식을 가로 35~62%, 세로 15~50%에 두고 오른쪽 30%는 거의 검은 여백. 50mm, 45도 시점.
English: Korean fine dining course on a dark wooden table under very low-key lighting, white porcelain bowls with abalone, seasoned greens and clear broth, brass spoon and chopsticks, a single spotlight on the food with deep shadows around, food center-left in upper half, near-black right third, 50mm 45-degree angle; photorealistic, refined luxury Korean fine dining photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A18 (a15) · `dining-3.jpg` · 2400×1067 · 루프탑 바 칵테일과 야경
사용 위치: 메인 다이닝 탭 3 "스카이 라운지" (글자: 오른쪽 30% 딥그린 반투명 패널 위 흰 글자) · 목표 밝기 135
초저녁 블루아워의 루프탑 바. 앞쪽 대리석 바 위 시그니처 칵테일 한 잔(투명 얼음, 시트러스 가니시)에 초점, 뒤로 밝은 황혼 하늘과 도시 불빛 보케. 목표 밝기가 높으므로 하늘이 아직 밝은 시점. 잔을 가로 35~62%, 세로 15~50%에, 오른쪽 30%는 단순한 하늘. 85mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(바 실공간).
English: Rooftop bar at early blue hour, signature cocktail with clear ice and citrus garnish on a marble bar in sharp focus, bright twilight sky and city light bokeh behind, glass placed center-left in upper half, simple sky on the right third, 85mm; photorealistic, refined luxury hotel bar photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A19 (a16) · `life-1.jpg` · 1474×824 · 레스토랑 창가 테이블
사용 위치: 메인 "멤버십 라이프스타일" 왼쪽 패널 "아우렐 클럽" (기본은 90% 남색 베일 아래, 호버 시 하단 그라데이션 위 좌하단 흰 글자) · 목표 밝기 176
하이키로 밝은 오전의 레스토랑 창가 2인 테이블. 흰 린넨, 유리잔, 작은 꽃병, 커다란 창의 밝은 확산광. 테이블을 가로 중앙 30%에 모으고 좌우는 밝은 창과 벽으로 늘어나도 괜찮게. 호버 확대 1.12를 고려해 가장자리 6%에 중요 요소 금지. 35mm, 인물 없음.
English: High-key bright morning restaurant window table for two, white linen, glassware and a small bud vase, large windows with soft diffused light, table concentrated in the central third, bright window and wall extending to both sides, nothing important near edges, 35mm, no people; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A20 (a17) · `life-2.jpg` · 1474×824 · 정원이 보이는 라운지 소파
사용 위치: 메인 "멤버십 라이프스타일" 오른쪽 패널 "아우렐 프라이빗" (기본은 90% 회색 베일 아래, 호버 시 좌하단 흰 글자) · 목표 밝기 150
통창 너머 단풍 든 작은 중정 정원이 보이는 프라이빗 라운지. 크림색 곡선 소파와 브론즈 사이드 테이블, 창밖 붉은 단풍과 낮은 석조 정원. 소파와 창의 중심을 가로 중앙 30%에, 가장자리 6% 여유. 28mm, 눈높이, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(라운지 실공간).
English: Private hotel lounge with a cream curved sofa and bronze side table facing floor-to-ceiling glass onto a small courtyard garden with red autumn maples and low stonework, sofa and window centered in the middle third, safe margins at edges, 28mm eye level, no people; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A21 (a18) · `collection-1.jpg` · 672×712 · 시그니처 향 정물
사용 위치: 메인 "아우렐 컬렉션" 1 "시그니처 센트" (글자: 모바일 상시·PC 호버 시 하단 흰 제목·버튼) · 목표 밝기 160
밝은 트래버틴 선반 위 라벨 없는 앰버 유리 디퓨저(리드 스틱)와 작은 향수 병, 옆에 말린 가지 하나. 창에서 들어온 부드러운 측광과 긴 그림자. 병들을 중앙~상단 60%에, 하단 35%는 매끈한 석재 면. 85mm, 정면 약간 위.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(판매 상품).
English: Unlabeled amber glass reed diffuser and small perfume bottle on a light travertine shelf with a single dried branch, soft side window light and long shadows, bottles in upper-center, smooth stone surface in lower third, 85mm slightly above eye level; photorealistic, refined luxury product still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A22 (a19) · `collection-2.jpg` · 672×712 · 호텔 침구 클로즈업
사용 위치: 메인 "아우렐 컬렉션" 2 "프리미엄 침구" (글자: 하단 흰 글자) · 목표 밝기 183
아침 햇살 속 흰 면 새틴 베개 두 개와 두툼한 구스 이불의 클로즈업. 주름과 직조 결이 살아 있는 하이키 화이트 톤, 모서리에 토프색 스로 한 자락. 베개를 중앙~상단에 두고 하단은 이불 면. 70mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(판매 상품).
English: Close-up of two white cotton sateen pillows and a plush down duvet in morning sunlight, visible weave and soft folds, high-key white tones with a corner of taupe throw, pillows upper-center, duvet surface below, 70mm; photorealistic, refined luxury bedding still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A23 (a20) · `collection-3.jpg` · 672×712 · 고메 선물 세트
사용 위치: 메인 "아우렐 컬렉션" 3 "고메" (글자: 하단 흰 글자) · 목표 밝기 87
짙은 월넛 테이블 위 선물 세트 연출. 라벨 없는 유리 소스 병 두 개, 무지 틴 케이스의 차, 린넨 끈으로 묶은 짙은 갈색 박스. 창 한쪽에서 들어오는 좁은 빛, 로우키 배경. 소품을 중앙~상단에, 하단은 어두운 목재. 60mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(판매 상품).
English: Gourmet gift set on a dark walnut table, two unlabeled glass sauce bottles, plain tea tin and a dark brown box tied with linen string, narrow window light, low-key background, items upper-center, dark wood below, 60mm; photorealistic, refined luxury product still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### A24 (a21) · `collection-4.jpg` · 672×712 · 계절 꽃다발
사용 위치: 메인 "아우렐 컬렉션" 4 "플라워 아틀리에" (글자: 하단 흰 글자) · 목표 밝기 136
가을 꽃다발 — 크림 장미, 버건디 다알리아, 말린 억새를 크라프트지와 린넨 리본으로 감싼 부케가 밝은 석재 카운터에 놓인 모습. 부드러운 측광, 중간 톤 배경. 꽃을 중앙~상단 60%에, 하단은 카운터. 85mm.
English: Autumn bouquet of cream roses, burgundy dahlias and dried pampas wrapped in kraft paper with a linen ribbon, lying on a light stone counter, soft side light, mid-tone background, flowers upper-center, counter below, 85mm; photorealistic, refined luxury floral still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

## B. 공통 · 전체 메뉴 · 1장

### B01 (a25) · `allmenu.jpg` · 948×684 · 맑은 날 외관과 도심
사용 위치: 모든 페이지 전체 메뉴(검은 배경) 우측 하단 474×342, 모바일에서는 숨김 (사진 위 글자 없음) · 목표 밝기 140
맑은 가을 낮, 조금 떨어진 거리에서 본 가상의 호텔 타워와 주변 도심 전경. A04보다 넓은 화각과 밝은 노출, 파란 하늘이 화면 상단 1/3. 타워를 중앙에, 실존 랜드마크·간판 없음. 35mm, 망원 압축 약간.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(호텔 외관).
English: Fictional luxury hotel tower and surrounding city blocks seen from a distance on a clear autumn day, wider and brighter than a close exterior shot, blue sky in upper third, tower centered, no real landmarks or signage, 35mm with slight compression; photorealistic, refined luxury hotel architectural photography, warm ivory and taupe palette, no text, no logo, no watermark.

## C. 오퍼 상세 페이지 · 6장

### C01 (a26) · `offer-main.jpg` · 1026×640 · 패키지 기프트 박스
사용 위치: 오퍼 상세 대표 520×320 (글자: 좌상단 빨간 리본 배지 96×32, 모바일 전폭×230) · 목표 밝기 170
하이키 객실 침대 위 연출. 흰 침구 위에 아이보리 무지 기프트 박스(리본), 라벨 없는 룸 스프레이 병, 접힌 가운. 부드러운 창광. 좌상단 20%×12%는 빈 침구 면으로 배지 자리, 박스를 중앙~약간 오른쪽에. 50mm, 위에서 45도.
English: High-key hotel bed styled with an ivory plain gift box with ribbon, unlabeled room spray bottle and a folded robe on white bedding, soft window light, empty bedding surface in the top-left corner, box center-right, 50mm 45-degree overhead; photorealistic, refined luxury hotel still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### C02 (a27) · `offer-item-1.jpg` · 960×596 · 디럭스 스위트 객실
사용 위치: 오퍼 "프로모션 주요 정보" 1 (사진 옆 본문, 사진 위 글자 없음) · 목표 밝기 150
밝은 낮의 디럭스 스위트 침실 전경. 흰 침구의 킹 베드, 토프 헤드보드, 창가 라운지 체어, 통창 밖 흐린 도심. A05와 다른 방향(침대를 정면)에서 촬영. 침대를 중앙 80%에. 24mm, 수직 보정.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(객실 실공간).
English: Deluxe suite bedroom in bright daylight, king bed with white linen facing camera, taupe upholstered headboard, window lounge chair, soft city view through glass, bed centered, 24mm corrected verticals; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

### C03 (a28) · `offer-item-2.jpg` · 960×596 · 올데이 다이닝 조식 뷔페
사용 위치: 오퍼 "프로모션 주요 정보" 2 (사진 위 글자 없음) · 목표 밝기 111
조식 뷔페의 핫 스테이션 클로즈업 — 구리 쇼핑 디시, 흰 도자기 볼의 샐러드와 요거트, 뒤로 흐릿한 레스토랑. A16보다 가깝고 한 단계 어두운 미디엄 톤. 음식을 중앙 80%에. 50mm.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(레스토랑 실공간).
English: Close-up of a breakfast buffet station, copper chafing dishes, white porcelain bowls of salad and yogurt, softly blurred restaurant behind, medium tones, food centered, 50mm; photorealistic, refined luxury hotel restaurant photography, warm ivory and taupe palette, no text, no logo, no watermark.

### C04 (a29) · `offer-item-3.jpg` · 960×596 · 웰컴 기프트
사용 위치: 오퍼 "프로모션 주요 정보" 3 (사진 위 글자 없음) · 목표 밝기 170
하이키 흰 대리석 위 웰컴 기프트 플랫레이. 라벨 없는 유리 향초, 글자 없는 무지 엽서 세 장, 린넨 파우치, 말린 꽃 한 줄기. 위에서 내려다본 탑뷰, 부드러운 그림자. 소품을 중앙 80%에.
English: High-key flat lay on white marble of a welcome gift, unlabeled glass candle, three blank postcards, linen pouch and a dried flower stem, top-down view with soft shadows, items centered; photorealistic, refined luxury still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### C05 (a30) · `offer-item-4.jpg` · 960×596 · 와인과 잔 두 개
사용 위치: 오퍼 "프로모션 주요 정보" 4 (사진 위 글자 없음) · 목표 밝기 146
객실 창가 사이드 테이블에 놓인 라벨 없는 레드 와인 한 병과 빈 와인잔 두 개, 작은 치즈 플레이트. 오후의 따뜻한 창광, 배경은 크림색 커튼. 병과 잔을 중앙 80%에. 50mm.
English: Unlabeled bottle of red wine with two empty wine glasses and a small cheese plate on a window side table in a hotel room, warm afternoon light, cream curtain background, bottle and glasses centered, 50mm; photorealistic, refined luxury hotel still life photography, warm ivory and taupe palette, no text, no logo, no watermark.

### C06 (a31) · `offer-item-5.jpg` · 960×596 · 피트니스·실내 수영장
사용 위치: 오퍼 "프로모션 주요 정보" 5 (사진 위 글자 없음) · 목표 밝기 156
밝은 낮의 실내 수영장, 통창으로 들어오는 자연광과 연한 청록 수면, 풀사이드 너머 유리벽 뒤로 피트니스 기구가 흐릿하게 보인다. A03·A06과 달리 밝은 낮 장면. 풀을 중앙 80%에. 24mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(수영장·피트니스 실공간).
English: Hotel indoor pool in bright daylight, natural light through tall windows, pale teal water, fitness equipment softly visible behind a glass wall beyond the poolside, pool centered, 24mm, no people; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

## D. 클럽 리워즈 페이지 · 8장

### D01 (a32) · `club-hero.jpg` · 1180×800 · 통창 클럽 라운지
사용 위치: 리워즈 소개 대표 590×400 (글자: 사진 정중앙 흰 로고 마크·AURELLE CLUB 워드마크, 모바일도 같은 비율) · 목표 밝기 58
밤의 클럽 라운지를 짙은 남색 톤으로 담은 로우키 장면. 통창 너머 도시 불빛 보케, 실내는 어두운 벨벳 소파 실루엣과 낮은 테이블 램프 몇 개. 로고가 올라갈 **정중앙 30% 영역은 어둡고 균일한 창 유리·밤하늘**로 비워 두고 빛 포인트는 가장자리 쪽으로. 35mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(라운지 실공간).
English: Low-key club lounge at night in deep navy tones, city light bokeh through floor-to-ceiling windows, dark velvet sofa silhouettes and a few low table lamps, dark even window area in the central third left clear for a logo, light points toward the edges, 35mm, no people; photorealistic, refined luxury hotel editorial photography, deep navy with warm taupe accents, no text, no logo, no watermark.

### D02 (a33) · `club-select-1.jpg` · 874×492 · 골드 — 객실 침구
사용 위치: 리워즈 "선택형 혜택" 골드 카드 (사진 아래 짙은 본문, 사진 위 글자 없음, 모바일 317×178 같은 비율) · 목표 밝기 176
하이키 객실 침대 모서리 — 흰 침구 위 접힌 토프색 스로와 작은 트레이의 찻잔. A22보다 넓게 침대 옆면과 협탁까지 보이는 구도. 피사체를 중앙 85%에. 50mm.
English: High-key hotel bed corner with white linen, folded taupe throw and a teacup on a small tray, wider than a close-up showing bed side and nightstand, subject centered, 50mm; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

### D03 (a34) · `club-select-2.jpg` · 874×492 · 플래티넘 — 테라스 맥주·피자
사용 위치: 리워즈 "선택형 혜택" 플래티넘 카드 (사진 위 글자 없음) · 목표 밝기 99
해 질 녘 호텔 테라스 테이블 위 화덕 피자 한 판과 라벨 없는 병·잔의 수제 맥주 두 잔. 따뜻한 스트링 조명과 저물어 가는 하늘, 미디엄 로우 톤. 테이블을 중앙 85%에. 35mm, 인물 없음.
English: Wood-fired pizza and two glasses of craft beer with an unlabeled bottle on a hotel terrace table at dusk, warm string lights and fading sky, medium-low tones, table centered, 35mm, no people; photorealistic, refined luxury hotel food photography, warm ivory and taupe palette, no text, no logo, no watermark.

### D04 (a35) · `club-select-3.jpg` · 874×492 · 블랙 — 파인다이닝 테이블
사용 위치: 리워즈 "선택형 혜택" 블랙 카드 (사진 위 글자 없음) · 목표 밝기 156
밝은 파인다이닝 레스토랑의 세팅된 테이블. 흰 린넨, 은 커트러리, 크리스털 잔, 작은 꽃 장식, 뒤로 밝은 창과 흐린 좌석. A17과 반대로 밝은 낮 톤. 테이블을 중앙 85%에. 35mm.
English: Set table in a bright fine dining restaurant, white linen, silver cutlery, crystal glasses and a small floral arrangement, bright windows and blurred seating behind, table centered, 35mm; photorealistic, refined luxury hotel fine dining photography, warm ivory and taupe palette, no text, no logo, no watermark.

### D05 (a36) · `club-venue-1.jpg` · 874×528 · 클럽 라운지
사용 위치: 리워즈 "공간별 혜택" 1 (글자: 사진 정중앙 흰 워드마크 "CLUB LOUNGE", 모바일 317×220 좌우 약 13% 잘림) · 목표 밝기 139
낮의 이그제큐티브 층 클럽 라운지. 창가 라운지 체어와 원목 라이브러리 선반(책등 글자 없음), 부드러운 창광. 흰 워드마크가 읽히도록 **중앙 영역은 중간 톤의 벽·선반**으로 두고 밝은 창은 좌우 가장자리로. 피사체를 가로 중앙 75%에. 28mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(라운지 실공간).
English: Executive floor club lounge in daytime, window lounge chairs and wooden library shelves with no readable spines, soft window light, mid-tone wall and shelving in the center for white overlay text, bright windows toward the side edges, subject within central 75% width, 28mm, no people; photorealistic, refined luxury hotel interior photography, warm ivory and taupe palette, no text, no logo, no watermark.

### D06 (a37) · `club-venue-2.jpg` · 874×528 · 스파·수영장
사용 위치: 리워즈 "공간별 혜택" 2 (글자: 중앙 흰 워드마크 "SPA & POOL") · 목표 밝기 146
낮의 스파 릴랙세이션 존 — 풀사이드 라운저 두 개와 접힌 흰 수건, 뒤로 잔잔한 실내 수영장과 석회석 벽. 중앙은 중간 톤 석재 벽으로 흰 글자 대비 확보. 가로 중앙 75%에 라운저. 35mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(스파 실공간).
English: Daytime spa relaxation area, two poolside loungers with folded white towels, calm indoor pool and limestone wall behind, mid-tone stone wall in the center for white overlay text, loungers within central 75% width, 35mm, no people; photorealistic, refined luxury hotel spa photography, warm ivory and taupe palette, no text, no logo, no watermark.

### D07 (a38) · `club-venue-3.jpg` · 874×528 · 루프탑 바
사용 위치: 리워즈 "공간별 혜택" 3 (글자: 중앙 흰 워드마크 "SKY LOUNGE & BAR") · 목표 밝기 82
밤의 루프탑 바를 넓게 — 테라스 쪽 낮은 소파석과 유리 난간, 멀리 도시 불빛, 따뜻한 테이블 램프. A07과 다른 야외 테라스 방향. 중앙은 어두운 밤하늘·유리로 워드마크 자리를 비운다. 28mm, 인물 없음.
실사진 교체: 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체(바 실공간).
English: Rooftop bar terrace at night, low lounge seating and glass railing, distant city lights, warm table lamps, dark night sky and glass in the center left clear for white overlay text, 28mm, no people; photorealistic, refined luxury hotel bar photography, warm ivory and taupe palette, no text, no logo, no watermark.

### D08 (a39) · `club-cta.jpg` · 2400×372 · 하늘색 그라데이션과 와인 병
사용 위치: 리워즈 하단 가입 배너 1360×211 (글자: 왼쪽 45%에 짙은 색 제목·설명·버튼, 모바일은 약 335×260으로 가로 중앙 20% 남짓만 보임) · 목표 밝기 182
초광폭 배너용 정물. 매우 밝은 하늘색→아이보리로 부드럽게 번지는 무지 배경 위, 화면 오른쪽 75~92% 구간에 라벨 없는 와인 병 한 병과 잔 하나가 옅은 그림자와 함께 놓인다. 왼쪽 70%와 가로 중앙은 소품 없는 매끈한 그라데이션만(짙은 글자 대비 확보, 모바일에서 병이 잘려도 무방). 하이키, 스튜디오 확산광. 85mm 정면.
English: Ultra-wide banner still life, very light sky-blue to ivory seamless gradient backdrop, one unlabeled wine bottle and a glass with soft shadow placed at the far right, left seventy percent and center completely clean gradient for dark overlay text, high-key diffused studio light, 85mm straight-on; photorealistic, refined luxury product photography, pale sky blue and ivory palette, no text, no logo, no watermark.

---

## 생성 제외(교체 지침) 항목

- 이 브랜드의 photo-map 39행에는 지도·약도·오시는 길·배치도 자리가 없다. 생성하면 안 되는 자리는 **0개**.
- 대신 호텔 자체 시설·판매 상품을 보여 주는 항목(A01~A07, A11, A14, A16, A18, A20~A23, B01, C02, C03, C06, D01, D05~D07)은 "샘플 시연용 생성 가능, 실제 납품 시 실사진 교체"로 표기했다.

## 생성 후 검증

1. 파일 수: `public/aurelle/assets/`에 아래 39개 JPG가 모두 존재하는지 확인한다(`site.css`·`site.js` 제외).
2. 픽셀 크기: 각 파일이 photo-map의 생성w×생성h와 정확히 같은지 확인한다.
3. 글자 검사: 이미지 안에 글자·숫자·로고·라벨이 없는지 육안 확인(병·박스·책등·창밖 간판 특히 주의).
4. 밝기: Pillow 그레이 평균이 목표 밝기 ±15 이내인지 확인한다.

   ```bash
   python3 - <<'PY'
   from PIL import Image, ImageStat
   import re
   for line in open('tools/ref-clone/photo-map-aurelle.txt', encoding='utf-8'):
       if line.startswith('#') or not line.strip():
           continue
       c = line.rstrip('\n').split('\t')
       fn, w, h = c[2], int(c[5]), int(c[6])
       target = int(re.search(r'목표 밝기 (\d+)', c[7]).group(1))
       im = Image.open(f'public/aurelle/assets/{fn}')
       mean = ImageStat.Stat(im.convert('L')).mean[0]
       ok = im.size == (w, h) and abs(mean - target) <= 15
       print(('OK ' if ok else 'NG '), fn, im.size, (w, h), round(mean), target)
   PY
   ```
5. 시리즈 톤: 메인 비주얼 3장, 공간 아코디언 4장, 프로모션 8장, 다이닝 3장, 컬렉션 4장, 오퍼 구성 5장, 리워즈 카드 6장이 각각 같은 색온도·질감으로 이어지는지 나란히 놓고 확인한다. 같은 묶음 안에서 장면이 겹치지 않는지도 본다.
6. 재검사: `python3 /tmp/claude-0/preflight_linux.py aurelle` 실행, 없으면 `python3 tools/ref-clone/preflight.py aurelle`.
7. 재촬영: 썸네일 `public/thumbs/aurelle.jpg`와 사례 캡처 `public/cases/aurelle/`를 새 사진 기준으로 다시 촬영한다.

## 부록 · og.jpg(1200×630) 참고 프롬프트

수량 39에 포함하지 않는다. 현재 `public/aurelle/og.jpg`(1200×630)를 교체할 때만 쓴다. 공유 미리보기에서 사이트 제목이 따로 붙으므로 사진 안에는 글자를 넣지 않는다.

가을 오후 햇살이 드는 호텔 로비 라운지를 넓게 잡은 장면. 트래버틴 바닥과 월넛 가구, 아이보리 라운지 체어, 통창 밖 흐린 도심. 중앙에 피사체를 모으고 가장자리는 단순하게(플랫폼별 정사각 크롭 대비). 목표 밝기 약 110.
English: Wide view of a luxury hotel lobby lounge in autumn afternoon sun, travertine floor, walnut furniture and ivory lounge chairs, soft city view through tall windows, subject centered with simple edges for square crops; photorealistic, refined luxury hotel editorial photography, warm ivory and taupe palette, no text, no logo, no watermark.
