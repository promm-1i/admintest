# neulsoop 늘숲 이미지 생성 프롬프트

## 생성 상태

- 현재 `public/neulsoop/assets/` 의 사진 84장은 **톤(평균 밝기)만 맞춘 임시 이미지(등고선 무늬)** 이며, 실제 사진은 아직 생성 전이다.
- 프롬프트 수: **84개** = `tools/ref-clone/photo-map-neulsoop.txt` 데이터 행 수(n1~n84).
- 이 중 5개(`connect-map.jpg`, `map-1~4.jpg`)는 사진 생성 대상이 아니며 아래에 **교체 지침**만 적었다. 실제 생성 대상은 79장.
- 생성 후 **파일명 그대로** `public/neulsoop/assets/` 에 덮어쓴다. HTML·CSS 수정은 필요 없다.

## 납품 기준

- 브랜드: `늘숲 / NEULSOOP` — 포트폴리오용 **가상 브랜드**(숲속 라이프스타일 스테이). 실존 숙소·브랜드와 무관하다.
- 저장 위치: `public/neulsoop/assets/`
- 파일명: 아래 항목의 파일명과 **완전히 동일**하게 저장.
- 픽셀 크기: 각 항목에 적힌 **생성 크기(photo-map 의 생성w×생성h)** 그대로. 표시 크기의 2배(레티나) 기준이므로 줄이거나 다른 비율로 만들지 않는다.
- 형식: sRGB, 고품질 JPG(품질 85 안팎). 이 브랜드에는 투명 PNG 자리가 없다.
- 공통 스타일: 도시에서 한 시간 거리, 한국 남부 지방 낮은 산자락 숲 가장자리에 자리한 조용한 라이프스타일 스테이의 에디토리얼 사진. 자연광 위주, 낮은 채도, 옅은 필름 그레인. 계절은 **늦여름에서 초가을**(짙은 초록에 이른 단풍 기미)로 통일. 재료는 오크·월넛 원목, 라임스톤·테라조, 리넨·울, 핸드메이드 도자기, 한지.
- 색 근거(`site.css` :root): 짙은 숲 `--forest #1F2823`(Stay·Rest 섹션 바탕), 히어로 바탕 `--kv #151418`, 따뜻한 회백 `--chip #E6E2E1` · `--line #D2CDC7`, 먹빛 갈색 글자 `--ink #3C3A34`, 포인트 세이지 `#8FA98B`. 사진은 이 팔레트(깊은 이끼 녹색·차콜·웜 그레이·오크 브라운)에 자연스럽게 섞여야 하며 채도 높은 원색·네온은 피한다.
- 공통 금지: 이미지 안의 글자·숫자·간판·로고·워터마크·표지판 문구, 책 표지·라벨의 읽히는 글자, 실존 호텔·리조트·브랜드 상표와 실존 건물의 재현, 레퍼런스 사이트 사진의 구도·피사체 모사, 과한 HDR·CG 렌더 느낌·과포화, 왜곡된 손·얼굴, 중복 인물.
- 인물 조건: 한국인 중심, 특정 실존 인물을 닮지 않게. 뒷모습·옆모습·손·원거리 등 **비식별** 구도 또는 연출 티가 나지 않는 자연스러운 스냅. 무지 의상(로고 없음), 과장된 광고 포즈 금지. 아이가 나오는 장면은 얼굴이 드러나지 않게.
- 허위 정보 금지: 수상·인증 마크, 실제 지명 간판, 가짜 후기용 인물 사진을 만들지 않는다. 지역은 "한국 남부 산자락 숲" 수준으로만 일반화한다.
- 실사진 교체 대상: 객실(room-*), 건물 외관(kv-about), 부대시설 슬라이드(rest-*), 입점 브랜드 카드(brand-*)는 **샘플 시연용으로 생성 가능, 실제 납품 시 실사진 교체** 대상이다(실제 운영 시 투숙객이 보는 공간·매장과 달라지면 안 되므로).
- 크롭 규칙(모바일 CSS 근거):
  - 히어로·서브 KV(2400×1500): `object-fit:cover` 로 `100svh` 를 채운다. 390×844 세로 화면에서는 가로 중앙 **약 28%** 만 남고, 첫 진입 시 1.15~1.25배에서 1배로 줄어드는 줌이 있어(`site.js` kv-zoom) 핵심 피사체는 **가로 중앙 28%·세로 중앙 80%** 안에, 가장자리 10%에는 중요한 요소를 두지 않는다.
  - 가로 띠(loc-*, life-* 2400×650): 모바일에서도 높이 390px 고정이라 가로 중앙 **약 27%** 만 보인다. 핵심 피사체는 가로 중앙 27%·위쪽 55% 안에.
  - 하단 띠 배너(cta-banner 2400×233): 모바일에서 가로 중앙 약 22%만 보이고 글자가 전면에 얹힌다. 특정 피사체 없이 고르게 어두운 결만.
  - 카드·슬라이드 이미지는 대부분 마우스 오버 시 1.1~1.15배 확대(`.zoom`)되므로 핵심 피사체를 **중앙 80%** 안에 둔다.
- **밝기 가이드**: 각 항목의 `목표 밝기`(photo-map 자리표시 밝기, 0~255 그레이 평균)를 노출 기준으로 삼는다. 흰 글자·밝은 글자의 대비가 이 밝기로 검증돼 있으므로 **±15 이내**로 맞춘다. 특히 히어로·KV·띠 이미지는 글자가 얹히는 영역이 목표보다 밝아지면 안 된다.
- 텍스트는 HTML 로 별도로 올라가므로 사진 안에는 어떤 글자도 넣지 않는다.

## 출력 크기와 수량

| 크기 | 수량 | 파일 |
|---|---:|---|
| 2400×1500 | 9 | hero-1~4, kv-about, kv-whatson, kv-lifestyle, kv-stay, kv-location |
| 2400×650 | 7 | loc-1~4, life-1~3 |
| 2400×233 | 1 | cta-banner |
| 1340×1280 | 1 | wo-main |
| 944×368 | 2 | wo-1, wo-2 |
| 768×932 | 3 | walk-1~3 |
| 1200×800 | 5 | rest-1~5 |
| 1140×716 | 1 | new-1 |
| 1458×1008 | 4 | story-1~4 |
| 774×520 | 6 | event-1~6 |
| 1208×810 | 2 | ls-event-1, ls-event-2 |
| 570×690 | 32 | brand-01~32 |
| 1000×1200 | 6 | room-1~6 |
| 1578×1184 | 1 | connect-map (생성 제외 · 교체 지침) |
| 1200×788 | 4 | map-1~4 (생성 제외 · 교체 지침) |
| **합계** | **84** | 생성 대상 79 + 교체 지침 5 |

공통 꼬리(English 끝에 붙임): `photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark`

---

## A. 메인 페이지 (`index.html`) · 17장

히어로 4장은 한 세트로 자동 전환(크로스페이드 + 줌아웃)된다. 네 장이 서로 다른 장면이되 같은 계절·같은 필름 톤으로 이어져야 한다. 글자는 화면 정중앙의 흰 워드마크 `NEULSOOP` 과 그 아래 한 줄 부제.

### A01 (n1) · `hero-1.jpg` · 2400×1500 · 숲길 계단 난간 너머 나뭇가지
사용 위치: 메인 첫 화면 슬라이드 1 (글자: 화면 정중앙 흰 워드마크·부제) · 목표 밝기 66
숲 비탈을 오르는 원목 계단의 손때 묻은 오크 난간을 전경에 흐리게 걸고, 그 너머로 참나무·단풍나무 가지가 겹겹이 뻗은 장면. 늦여름 오전, 잎 사이로 부드럽게 걸러진 빛, 50mm, 눈높이보다 약간 낮은 시점. 화면 정중앙(워드마크 자리)은 잎 그늘이 고르게 깔린 어두운 면으로 비워 두고, 난간과 계단의 선은 가로 중앙 28% 안에서 세로로 흐르게 해 모바일 크롭에도 남게 한다.
English: A worn oak handrail of wooden forest steps softly blurred in the foreground, layered oak and maple branches reaching beyond it in late-summer morning light filtered through leaves, 50mm, slightly low eye level, calm shadowed center for overlaid title, subject kept in the central vertical band; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A02 (n2) · `hero-2.jpg` · 2400×1500 · 새벽 안개 낀 늘숲 전경
사용 위치: 메인 첫 화면 슬라이드 2 (글자: 화면 정중앙 흰 워드마크·부제) · 목표 밝기 79
새벽 안개가 낮게 깔린 산자락 숲 사이에 낮은 목재·석재 스테이 건물 몇 동이 지붕만 드러난 원경. 해 뜨기 직전 푸른 회색 빛, 멀리 겹친 능선, 70mm 망원 압축, 약간 높은 언덕 시점. 건물은 가로 중앙 28% 안 하단 3분의 1에 작게 두고, 정중앙은 안개가 번진 단순한 면으로 남긴다. 특정 실존 건물을 닮지 않은 가상의 저층 건축.
English: Wide dawn view of a misty Korean mountainside forest with a few low timber-and-stone lodge roofs peeking through fog in the lower third center, layered ridgelines, blue-grey pre-sunrise light, 70mm telephoto compression from a gentle hilltop, soft foggy empty center for overlaid title; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A03 (n3) · `hero-3.jpg` · 2400×1500 · 객실 창가 너머 초록 정원
사용 위치: 메인 첫 화면 슬라이드 3 (글자: 화면 정중앙 흰 워드마크·부제) · 목표 밝기 70
어두운 객실 안쪽에서 바라본 큰 나무 창틀, 창밖에는 이끼와 고사리, 단풍나무가 있는 초록 정원. 실내는 그늘로 눌리고 창밖만 은은하게 밝은 오후 자연광, 35mm, 앉은 눈높이. 창틀 세로 멀리언이 가로 중앙 28% 안에 오도록 하고, 정중앙은 정원의 부드러운 초록 보케로 단순하게. 창가 벤치 위 리넨 쿠션 하나 정도만.
English: View from a dim guest room through a large wooden window frame onto a lush green garden of moss, ferns and a Japanese maple, interior in soft shadow, gentle afternoon daylight outside, 35mm at seated eye level, window mullion centered, soft green bokeh in the middle for overlaid title; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A04 (n4) · `hero-4.jpg` · 2400×1500 · 저녁 조명 라운지
사용 위치: 메인 첫 화면 슬라이드 4 (글자: 화면 정중앙 흰 워드마크·부제) · 목표 밝기 146
해 질 무렵 따뜻한 간접 조명이 켜진 넓은 라운지. 월넛 선반, 라임스톤 바닥, 낮은 울 소파와 한지 펜던트 조명, 통창 밖으로 푸른 황혼의 숲. 네 장 중 가장 밝은 장(목표 146)이므로 실내를 크림빛으로 밝게 노출하되 정중앙 워드마크 자리는 무늬 없는 벽면이나 흐린 창으로 두어 흰 글자가 묻히지 않을 정도의 중간 톤을 유지. 24mm, 서 있는 눈높이, 사람 없음.
English: A spacious lodge lounge at dusk with warm indirect lighting, walnut shelving, limestone floor, low wool sofas and hanji paper pendant lamps, floor-to-ceiling windows showing blue twilight forest, bright creamy interior exposure with a plain mid-tone wall at the center for overlaid title, 24mm standing eye level, no people; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A05 (n5) · `wo-main.jpg` · 1340×1280 · 피크닉 바구니와 책, 과일
사용 위치: What's On 대표 카드(왼쪽 큰 사진, 글자 없음, 오버 시 1.1배 확대) · 목표 밝기 134
잔디 위에 펼친 생지 리넨 담요, 버들 피크닉 바구니, 제목이 보이지 않게 덮어 둔 천 장정 책 두 권, 무화과·청포도·배가 담긴 도자기 접시. 초가을 오후 나무 그늘 사이 얼룩진 햇빛, 45도 내려다보는 시점, 50mm. 모바일에서 거의 같은 비율(350:320)로 쓰이므로 피사체를 중앙 80%에 모으고 가장자리는 잔디·담요 결로 여유.
English: A natural linen blanket on grass with a wicker picnic basket, two cloth-bound books with no visible titles, and a ceramic plate of figs, green grapes and pears, dappled early-autumn afternoon shade, 45-degree overhead angle, 50mm, subjects gathered in the central 80%; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A06 (n6) · `wo-1.jpg` · 944×368 · 텃밭 채소 샐러드
사용 위치: What's On 소식 카드 1 썸네일(글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 151
오크 테이블 위 유약이 흘러내린 백자 볼에 담은 잎채소·래디시·허브 샐러드, 옆에 린넨 냅킨과 나무 포크. 밝은 창가 오전 빛, 낮은 45도 측면 시점, 가로로 긴 구도. 모바일 비율(350:125)에서 좌우가 조금 더 잘리므로 볼은 가로 중앙 60% 안에.
English: A white ceramic bowl of garden leaves, radish and herb salad on an oak table with a linen napkin and wooden fork, bright morning window light, low 45-degree side angle, wide panoramic framing with the bowl in the central 60%; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A07 (n7) · `wo-2.jpg` · 944×368 · 로비 갤러리 관람객
사용 위치: What's On 소식 카드 2 썸네일(글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 133
흰 회벽 로비 갤러리에 걸린 나무·한지 추상 작품(글자·서명 없음)을 두 사람이 뒷모습으로 조용히 바라보는 장면. 천창 확산광, 35mm, 가로로 긴 구도. 인물은 가로 중앙 60% 안, 얼굴이 보이지 않게.
English: Two visitors seen from behind quietly viewing abstract wood and hanji paper artworks on white plaster walls in a lobby gallery, soft skylight, 35mm, wide framing with figures in the central 60%, faces not visible, artworks without any signature or caption; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A08 (n8) · `walk-1.jpg` · 768×932 · 숲속 베이커리 카페 커피잔
사용 위치: Stay, walk, eat 카드 1 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 170
통창 너머 초록 숲이 밝게 비치는 베이커리 카페 창가, 원목 카운터 위 핸드메이드 도자기 커피잔과 크루아상 한 개. 오전 역광에 가까운 밝은 빛, 세로 구도, 50mm, 앉은 눈높이. 컵과 빵은 중앙 하단 3분의 2 지점, 잔에 로고 없음.
English: A handmade ceramic coffee cup and a croissant on a wooden counter by a large window of a forest bakery cafe, bright morning back light with green trees outside, vertical framing, 50mm at seated eye level, cup centered in the lower two-thirds, unbranded cup; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A09 (n9) · `walk-2.jpg` · 768×932 · 서가가 둘러싼 북라운지
사용 위치: Stay, walk, eat 카드 2 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 78
천장까지 닿는 월넛 서가가 삼면을 두른 어두운 북라운지, 가운데 낮은 가죽 라운지 체어와 황동 스탠드 한 개가 켜진 저녁. 책등 글자는 읽히지 않게 흐리거나 무지 천 장정으로. 세로 구도, 35mm, 의자는 중앙.
English: A dim book lounge wrapped by floor-to-ceiling walnut bookshelves, one low leather lounge chair and a lit brass floor lamp in the center, evening mood, book spines blurred or plain cloth with no readable titles, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A10 (n10) · `walk-3.jpg` · 768×932 · 리넨·도자기 리빙 편집숍
사용 위치: Stay, walk, eat 카드 3 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 141
원목 선반에 개어 둔 생지·세이지색 리넨 침구와 잿빛 유약 도자기 그릇이 놓인 작은 리빙 편집숍. 창으로 드는 부드러운 오후 빛, 세로 구도, 50mm, 가격표·라벨 없음. 선반 중심을 화면 중앙 80% 안에.
English: A small lifestyle shop with folded natural and sage linen bedding and ash-glazed ceramic bowls on oak shelves, soft afternoon window light, vertical framing, 50mm, no price tags or labels, shelves centered; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A11 (n11) · `rest-1.jpg` · 1200×800 · 우드톤 라운지 소파
사용 위치: Rest in Excellence 슬라이드 1 (짙은 숲 `#1F2823` 바탕 위, 글자 없음, 오버 시 1.15배) · 목표 밝기 68 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
오크 루버 벽과 낮은 울 부클레 소파, 석재 사이드 테이블이 있는 어둑한 라운지. 창 한쪽에서 들어오는 늦은 오후 측광이 소파 등받이만 스치고 나머지는 부드러운 그늘. 3:2, 35mm, 앉은 눈높이. 슬라이드 다섯 장이 같은 어두운 숲 톤으로 이어지게.
English: A dim lounge with oak slat walls, a low wool boucle sofa and a stone side table, late afternoon side light grazing the sofa back while the rest stays in soft shadow, 3:2, 35mm at seated eye level; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A12 (n12) · `rest-2.jpg` · 1200×800 · 낮은 조명의 티 룸
사용 위치: Rest in Excellence 슬라이드 2 (글자 없음, 오버 시 1.15배) · 목표 밝기 98 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
좌식 원목 다탁 위에 찻주전자와 잔, 작은 꽃 한 가지가 놓인 티 룸. 한지 창을 통해 들어오는 은은한 확산광과 낮은 등불, 차에서 오르는 옅은 김. 3:2, 50mm, 앉은 눈높이, 다탁은 중앙.
English: A quiet tea room with a low wooden tea table set with a teapot, cups and a single flower sprig, soft diffused light through hanji paper screens and a low lantern, faint steam rising, 3:2, 50mm at seated eye level, table centered; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A13 (n13) · `rest-3.jpg` · 1200×800 · 창가 다이닝 테이블
사용 위치: Rest in Excellence 슬라이드 3 (글자 없음, 오버 시 1.15배) · 목표 밝기 47 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
해가 진 뒤 창가의 월넛 다이닝 테이블, 촛불 두 개와 비어 있는 도자기 접시 세팅, 창밖은 거의 검은 숲 실루엣. 매우 어두운 노출(목표 47), 촛불 주변만 따뜻하게. 3:2, 35mm.
English: A walnut dining table by the window after sunset with two candles and an empty ceramic place setting, near-black forest silhouette outside, very low-key exposure with warm glow only around the candles, 3:2, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A14 (n14) · `rest-4.jpg` · 1200×800 · 숲이 보이는 욕조
사용 위치: Rest in Excellence 슬라이드 4 (글자 없음, 오버 시 1.15배) · 목표 밝기 100 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
편백 또는 석재 욕조가 통창 앞에 놓인 욕실, 창밖으로 초록 숲이 가득. 흐린 날 오전의 부드러운 빛, 욕조 가장자리에 개어 둔 리넨 타월. 사람 없음. 3:2, 28mm, 욕조는 중앙.
English: A hinoki wood or stone soaking tub in front of a floor-to-ceiling window full of green forest, soft overcast morning light, a folded linen towel on the rim, no people, 3:2, 28mm, tub centered; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A15 (n15) · `rest-5.jpg` · 1200×800 · 테라스 데크 체어
사용 위치: Rest in Excellence 슬라이드 5 (글자 없음, 오버 시 1.15배) · 목표 밝기 60 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
숲을 향해 열린 목재 테라스 데크에 놓인 낮은 원목 데크 체어 두 개와 울 담요. 해 진 직후 푸른 시간, 깊은 초록 숲 배경, 어두운 노출. 3:2, 35mm, 의자는 중앙.
English: Two low wooden deck chairs with a wool throw on a timber terrace facing the forest, blue hour just after sunset, deep green forest backdrop, dark moody exposure, 3:2, 35mm, chairs centered; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A16 (n16) · `new-1.jpg` · 1140×716 · 꽃 설치 작품이 놓인 숲길 입구
사용 위치: New to Neulsoop 왼쪽 사진(글자는 오른쪽 별도 칸) · 목표 밝기 151
숲 산책로가 시작되는 자갈 입구에 마른 풀·들꽃·가지로 엮은 낮은 아치형 꽃 설치 작품. 밝은 흐린 날 오전의 고른 빛, 35mm, 서 있는 눈높이. 모바일에서 거의 정사각(256:252)으로 잘리므로 설치 작품과 길의 소실점은 가로 중앙 60% 안에. 표지판 없음.
English: A low arch-shaped floral installation woven from dried grasses, wildflowers and branches at the gravel entrance of a forest trail, bright even overcast morning light, 35mm standing eye level, installation and path vanishing point within the central 60% for a square mobile crop, no signage; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### A17 (n17) · `cta-banner.jpg` · 2400×233 · 유리창에 비친 나무 그림자
사용 위치: 전 페이지 하단 띠 배너(글자: 왼쪽 흰 제목·설명, 오른쪽 밝은 버튼 / 모바일은 글자가 전면에 얹힘) · 목표 밝기 76
어두운 유리창과 회벽 위에 나뭇잎 그림자와 반사가 가로로 길게 번진 추상적인 결. 특정 피사체 없이 좌우 전체가 고르게 어두운 중간 톤(목표 76)이어야 하며, 밝은 점이나 강한 하이라이트 금지. 망원으로 평면화한 결 사진.
English: Abstract ultra-wide texture of tree leaf shadows and soft reflections on dark glass and plaster wall, evenly dark mid-tone across the whole frame, no distinct subject, no bright highlights, flattened telephoto look; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

---

## B. 브랜드 소개 (`about.html`) · 6장

### B01 (n18) · `kv-about.jpg` · 2400×1500 · 숲에 둘러싸인 늘숲 건물 외관
사용 위치: 브랜드 소개 KV (글자: 하단 중앙 흰 대문자 제목 + 설명) · 목표 밝기 61 · 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체
울창한 참나무·소나무 숲에 반쯤 묻힌 낮은 2~4층 목재·노출 콘크리트 스테이 건물을 숲 바깥에서 바라본 장면. 흐린 저녁 무렵 창 몇 곳에 따뜻한 불빛, 전체는 어두운 숲 톤(목표 61). 건물은 가로 중앙 28%·화면 중간 높이에, 하단 30%(제목 자리)는 어두운 수풀로 단순하게. 실존 건축물을 닮지 않은 가상 건물, 간판 없음.
English: A low two-to-four-story timber and board-formed concrete lodge half hidden in dense oak and pine forest, seen from outside the woods on an overcast evening with a few warmly lit windows, dark forest mood, building in the central vertical band at mid-height, simple dark foliage in the bottom 30% for overlaid title, fictional architecture, no signage; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### B02 (n19) · `connect-map.jpg` · 1578×1184 · 주변 권역 일러스트 지도 자리 — 생성 제외(교체 지침)
사용 위치: 브랜드 소개 Connectivity 왼쪽 이미지(글자 없음) · 목표 밝기 80
사진 생성기로 만들지 않는다. 실제 운영 시에는 실제 권역 동선을 담은 지도(지도 API 캡처 또는 디자이너 작도, 라이선스 확인)로 교체한다. 샘플 시연용으로 두려면 **글자·지명·숫자 없는** 가상 동선 일러스트만 허용: 짙은 숲 녹색(`#1F2823` 계열) 바탕에 등고선 결, 세이지(`#8FA98B`) 선으로 이어진 점 몇 개와 가운데 숲 아이콘 하나, 평균 밝기 80 안팎. 1578×1184 JPG.
이유: 지도는 실제 위치·거리 정보이므로 생성 이미지로 만들면 허위 정보가 된다.

### B03 (n20) · `loc-1.jpg` · 2400×650 · 아침 숲 산책로
사용 위치: 브랜드 소개 Location 띠 1 (글자: 좌하단 굵은 제목 + 흰 설명, 모바일은 하단 전체) · 목표 밝기 78
아침 안개가 걷히며 낮은 햇살이 비스듬히 드는 흙길 숲 산책로, 길 양옆 고사리와 키 큰 나무 줄기. 70mm로 길을 정면에서 압축. 길의 소실점과 빛줄기는 가로 중앙 27%·위쪽 55% 안에, 하단 절반은 어두운 수풀 그늘로 글자 자리 확보.
English: Ultra-wide forest dirt trail as morning mist lifts, low slanting sunbeams, ferns and tall trunks on both sides, 70mm frontal compression, vanishing point and light shafts in the central 27% and upper half, darker undergrowth across the lower half for overlaid text; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### B04 (n21) · `loc-2.jpg` · 2400×650 · 계곡 물가 쉼터
사용 위치: 브랜드 소개 Location 띠 2 (글자: 좌하단 제목·설명) · 목표 밝기 58
이끼 낀 바위 사이로 흐르는 맑은 계곡 옆, 작은 원목 평상 쉼터. 숲 그늘 속 오후, 물살에만 은은한 반사광. 평상과 물줄기는 가로 중앙 27%·위쪽 55%, 하단은 어두운 바위와 물로 차분하게. 35mm, 낮은 시점.
English: Ultra-wide clear mountain stream flowing between mossy rocks beside a small wooden platform rest area, shaded forest afternoon with subtle highlights on the water, platform and stream in the central 27% and upper half, dark rocks and water in the lower half, 35mm low angle; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### B05 (n22) · `loc-3.jpg` · 2400×650 · 나무 사이 햇살
사용 위치: 브랜드 소개 Location 띠 3 (글자: 좌하단 제목·설명) · 목표 밝기 71
정원 가장자리 단풍나무와 자작나무 사이로 쏟아지는 늦은 오후 햇살, 잎 끝에 이른 노란빛. 역광 빛줄기와 보케는 가로 중앙 27%·위쪽에, 하단은 그늘진 잔디와 관목. 85mm, 얕은 심도.
English: Ultra-wide late-afternoon sunlight pouring between maple and birch trees at a garden edge, first hints of autumn yellow on leaf tips, backlit rays and bokeh in the central 27% upper area, shaded lawn and shrubs in the lower half, 85mm shallow depth of field; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### B06 (n23) · `loc-4.jpg` · 2400×650 · 조용한 서재 라운지
사용 위치: 브랜드 소개 Location 띠 4 (글자: 좌하단 제목·설명) · 목표 밝기 81
밤의 서재 라운지, 긴 월넛 책상 위 황동 스탠드 하나와 펼쳐진 노트(글자 없음), 뒤로 흐린 서가. 스탠드 빛과 책상은 가로 중앙 27%·위쪽 55%, 하단은 어두운 책상 앞면과 바닥. 50mm.
English: Ultra-wide quiet study lounge at night, a long walnut desk with a single brass lamp and an open blank notebook, softly blurred bookshelves behind, lamp and desk in the central 27% upper half, dark desk front and floor below, 50mm, book spines unreadable; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

---

## C. What's On (`whatson.html`) · 11장

### C01 (n24) · `kv-whatson.jpg` · 2400×1500 · 숲길을 걷는 사람들
사용 위치: What's On KV (글자: 하단 중앙 흰 대문자 제목 + 설명) · 목표 밝기 66
키 큰 나무 사이 흙길을 서너 명이 뒷모습으로 천천히 걷는 장면, 무지 니트·리넨 차림. 늦여름 오후 숲 그늘과 뒤쪽의 밝은 빛 틈. 인물은 가로 중앙 28%·화면 중간 높이, 하단 30%는 어두운 길바닥으로 비움. 50mm, 약간 떨어진 거리.
English: Three or four people seen from behind walking slowly along a dirt path between tall trees, plain knit and linen clothing, late-summer afternoon forest shade with a bright gap ahead, figures in the central vertical band at mid-height, dark path in the bottom 30% for overlaid title, 50mm from a distance; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C02 (n25) · `story-1.jpg` · 1458×1008 · 텃밭 채소 샐러드
사용 위치: 늘숲 이야기 슬라이드 1 (글자는 오른쪽 별도 칸) · 목표 밝기 151
텃밭 가장자리 원목 작업대 위, 막 딴 상추·케일·허브와 샐러드가 담긴 넓은 도자기 접시, 흙 묻은 손이 채소 한 줌을 올리는 순간(얼굴 없음). 밝은 아침 빛, 45도 시점, 35mm. A06 과 같은 요리지만 텃밭 배경이 보이는 다른 장면.
English: On a wooden work table at the edge of a kitchen garden, a wide ceramic platter of salad with freshly picked lettuce, kale and herbs, a soil-dusted hand adding a handful of greens, face not shown, bright morning light, 45-degree angle, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C03 (n26) · `story-2.jpg` · 1458×1008 · 주말 플리마켓
사용 위치: 늘숲 이야기 슬라이드 2 (글자는 오른쪽 별도 칸) · 목표 밝기 119
정원 잔디 위 원목 테이블에 손그릇·제철 과일·빵이 놓인 작은 장터, 몇 사람이 둘러보는 뒷모습과 손. 초가을 오전 흐린 빛, 35mm, 서 있는 눈높이. 가격표·현수막 글자 없음.
English: A small weekend market on a garden lawn with wooden tables of handmade bowls, seasonal fruit and bread, a few browsers seen from behind and their hands, soft overcast early-autumn morning, 35mm standing eye level, no price tags or banners; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C04 (n27) · `story-3.jpg` · 1458×1008 · 아이와 함께하는 숲 도서관
사용 위치: 늘숲 이야기 슬라이드 3 (글자는 오른쪽 별도 칸) · 목표 밝기 132
아이 눈높이 낮은 원목 그림책 서가와 쿠션, 창밖 나무가 보이는 작은 방에서 보호자와 아이가 나란히 앉아 그림책을 보는 뒷모습. 오후 창가 빛, 35mm, 낮은 시점. 아이 얼굴 비노출, 책 표지 글자 없음.
English: A parent and child sitting side by side from behind reading a picture book in a small room with low wooden children's bookshelves, floor cushions and trees outside the window, afternoon window light, 35mm low angle, child's face not visible, no readable covers; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C05 (n28) · `story-4.jpg` · 1458×1008 · 요가 클래스
사용 위치: 늘숲 이야기 슬라이드 4 (글자는 오른쪽 별도 칸) · 목표 밝기 77
이른 아침 정원 목재 데크에서 대여섯 명이 숲을 향해 같은 동작을 하는 요가 클래스, 옆·뒷모습 원거리. 옅은 안개와 차가운 녹색 톤, 70mm. 무지 운동복, 과장된 포즈 없이 차분하게.
English: An early-morning yoga class of five or six people on a wooden garden deck facing the forest, side and back views from a distance, light mist and cool green tones, 70mm, plain activewear, calm natural poses; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C06 (n29) · `event-1.jpg` · 774×520 · 와인 페어링 디너 테이블
사용 위치: 이벤트 카드 1 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 51
숲을 향한 긴 원목 테이블에 와인잔·코스 요리 한 접시·촛불이 놓인 저녁 디너. 어두운 저녁 노출(목표 51), 촛불과 잔의 반사만 따뜻하게. 병 라벨 없음 또는 등을 돌려 보이지 않게. 50mm, 앉은 눈높이.
English: An evening wine pairing dinner on a long wooden table facing the forest with wine glasses, a plated course and candles, low-key exposure with warm glints only from candles and glass, unlabeled bottles, 50mm seated eye level; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C07 (n30) · `event-2.jpg` · 774×520 · 화덕 피자와 타코
사용 위치: 이벤트 카드 2 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 94
장작 화덕 앞 원목 도마 위 갓 구운 화덕 피자와 타코 세 개, 뒤로 흐린 화덕 불빛. 늦은 오후, 따뜻하고 중간 밝기. 45도, 50mm.
English: A freshly baked wood-fired pizza and three tacos on a wooden board in front of a wood-burning oven with softly blurred fire glow behind, late afternoon, warm mid-tone exposure, 45-degree angle, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C08 (n31) · `event-3.jpg` · 774×520 · 숲속 요가 매트
사용 위치: 이벤트 카드 3 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 51
해 뜨기 전 숲속 목재 데크 위에 가지런히 펼친 빈 요가 매트 몇 장과 접은 담요. 사람 없음, 어두운 새벽 청록 톤(목표 51). 35mm, 약간 높은 시점.
English: Several empty yoga mats neatly rolled out with folded blankets on a wooden deck in the forest before sunrise, no people, dark teal dawn tones, 35mm slightly high angle; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C09 (n32) · `event-4.jpg` · 774×520 · 가을 플리마켓 좌판
사용 위치: 이벤트 카드 예비(현재 HTML 미참조 — 카드 추가 시 사용) · 목표 밝기 94
나무 상자에 담긴 사과·배·단호박, 옆에 짚 바구니와 도자기 몇 점이 놓인 가을 장터 좌판 클로즈업, 사람은 손만. 초가을 흐린 빛, 50mm. 가격표 없음.
English: Close-up of an autumn market stall with apples, pears and kabocha squash in wooden crates beside straw baskets and a few ceramics, only a vendor's hands visible, soft overcast early-autumn light, 50mm, no price tags; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C10 (n33) · `event-5.jpg` · 774×520 · 아이 숲 체험
사용 위치: 이벤트 카드 예비(현재 HTML 미참조) · 목표 밝기 51
숲 그늘 속에서 아이 둘이 돋보기로 이끼와 도토리를 들여다보는 손과 뒷모습, 얼굴 비노출. 짙은 숲 그늘(목표 51), 작은 빛 조각만. 35mm, 낮은 시점.
English: Two children seen from behind examining moss and acorns with magnifying glasses in deep forest shade, faces not visible, dark exposure with small patches of dappled light, 35mm low angle; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### C11 (n34) · `event-6.jpg` · 774×520 · 피크닉 세트
사용 위치: 이벤트 카드 예비(현재 HTML 미참조) · 목표 밝기 94
나무 그늘 아래 잔디에 놓인 원목 피크닉 트레이, 샌드위치·보온병·법랑 컵 두 개, 체크 리넨 천. A05 와 겹치지 않게 트레이 중심의 정물. 중간 밝기, 오후, 45도, 50mm.
English: A wooden picnic tray on grass under tree shade with sandwiches, a thermos and two enamel cups on a checked linen cloth, still-life centered on the tray, mid-tone afternoon light, 45-degree angle, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

---

## D. Lifestyle (`lifestyle.html`) · 35장

입점 브랜드 카드 32장(`brand-01~32`)은 570×690 세로 카드, 사진 위 글자 없음(데스크톱 오버 시 사진이 사라지고 회백 바탕 글자로 바뀜). 모바일 2열. 이름은 모두 가상 브랜드이며, 사진에는 매장 간판·로고·상품 라벨을 넣지 않는다. 32장이 한 그리드에 모이므로 같은 필름 톤·같은 자연광 계열로 통일하되 목표 밝기가 제각각이니 각각 맞춘다. **모두 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체**(입점 매장의 실제 공간·상품이어야 함).

### D01 (n35) · `kv-lifestyle.jpg` · 2400×1500 · 어두운 우드 파티션과 빛
사용 위치: Lifestyle KV (글자: 하단 중앙 흰 대문자 제목 + 설명) · 목표 밝기 26
짙은 월넛 세로 루버 파티션 사이로 가느다란 빛줄기 몇 가닥이 새어 드는 거의 검은 실내. 전체 매우 어둡게(목표 26), 빛줄기는 가로 중앙 28% 안에 세로로. 하단 30%는 완전히 어두운 바닥. 50mm, 정면.
English: A nearly black interior where a few thin shafts of light slip between dark walnut vertical slat partitions, very low-key exposure, light lines vertical within the central band, completely dark floor in the bottom 30% for overlaid title, 50mm frontal; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D02 (n36) · `brand-01.jpg` · 570×690 · 가람 도자 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 1 — 생활 도자기 · 목표 밝기 149
밝은 회백 벽 앞 원목 선반에 포개 놓은 백자·분청 생활 그릇, 창가 오후 빛. 세로 구도, 50mm, 그릇은 중앙.
English: Stacked everyday white porcelain and buncheong ceramic bowls on an oak shelf against a pale plaster wall, afternoon window light, vertical framing, 50mm, centered; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D03 (n37) · `brand-02.jpg` · 570×690 · 결 베이커리 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 2 — 천연 발효 빵과 드립 커피 · 목표 밝기 139
밀가루가 살짝 묻은 원목 작업대 위 캄파뉴 두 덩이와 드립 커피 서버. 밝은 아침 빛, 세로 구도, 45도, 50mm.
English: Two sourdough country loaves and a pour-over coffee server on a lightly floured wooden bench, bright morning light, vertical framing, 45-degree angle, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D04 (n38) · `brand-03.jpg` · 570×690 · 고요 필름 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 3 — 숲 다큐멘터리 작은 극장 · 목표 밝기 96
나무 좌석 몇 줄이 있는 작은 상영관, 스크린에는 흐린 숲 장면 빛만(글자 없음), 관객 두 명 뒷모습 실루엣. 세로 구도, 35mm.
English: A tiny screening room with a few rows of wooden seats, the screen showing only a soft blurred forest image, two audience silhouettes from behind, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D05 (n39) · `brand-04.jpg` · 570×690 · 구름 스파 (Wellness)
사용 위치: Lifestyle 입점 브랜드 카드 4 — 편백 욕조와 허브 족욕 · 목표 밝기 152
밝은 스파 공간의 편백 족욕통에 띄운 허브와 김, 옆에 흰 리넨 타월. 부드러운 확산광, 세로 구도, 50mm, 사람 없음.
English: A hinoki wood foot bath with floating herbs and gentle steam in a bright spa room, white linen towel beside it, soft diffused light, vertical framing, 50mm, no people; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D06 (n40) · `brand-05.jpg` · 570×690 · 나무결 공방 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 5 — 원목 트레이와 도마 · 목표 밝기 79
어두운 공방 작업대 위 자투리 원목으로 만든 트레이와 도마 몇 점, 대팻밥, 창 하나에서 드는 측광. 세로 구도, 50mm.
English: Small trays and cutting boards made from offcut hardwood on a dim workshop bench with wood shavings, single-window side light, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D07 (n41) · `brand-06.jpg` · 570×690 · 남새 밥상 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 6 — 제철 나물과 솥밥 · 목표 밝기 77
무쇠 솥밥과 나물 반찬 서너 가지가 차려진 어두운 원목 상, 위에서 내려다본 구도, 따뜻한 측광. 세로 구도, 50mm.
English: A cast-iron pot of rice with three or four seasonal namul side dishes on a dark wooden table, overhead view, warm side light, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D08 (n42) · `brand-07.jpg` · 570×690 · 너울 책방 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 7 — 독립 서점 · 목표 밝기 126
작은 서점의 원목 평대에 표지 글자가 보이지 않게 놓인 책들과 창가 초록. 오후 빛, 세로 구도, 35mm. 책은 무지 표지 또는 흐리게.
English: Books on an oak display table in a small independent bookshop with green window view, covers plain or blurred with no readable titles, afternoon light, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D09 (n43) · `brand-08.jpg` · 570×690 · 노을 요가 (Wellness)
사용 위치: Lifestyle 입점 브랜드 카드 8 — 해 질 녘 정원 데크 요가 · 목표 밝기 115
노을 무렵 정원 데크에서 한 사람이 숲을 향해 앉은 자세로 호흡하는 뒷모습, 따뜻한 역광. 세로 구도, 85mm.
English: One person seen from behind sitting in a calm yoga pose on a garden deck facing the forest at sunset, warm backlight, vertical framing, 85mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D10 (n44) · `brand-09.jpg` · 570×690 · 다솜 찻집 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 9 — 계절 블렌딩 차 · 목표 밝기 144
밝은 창가 원목 테이블 위 유리 찻주전자에 우러나는 연둣빛 잎차, 작은 찻잔 둘. 부드러운 오전 빛, 세로 구도, 50mm.
English: A glass teapot steeping pale green leaf tea with two small cups on a bright oak table by the window, soft morning light, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D11 (n45) · `brand-10.jpg` · 570×690 · 담쟁이 리빙 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 10 — 리넨 침구와 잠옷 · 목표 밝기 102
세이지·오트밀 리넨 침구와 잠옷을 걸어 둔 원목 행거, 차분한 중간 톤. 세로 구도, 50mm, 라벨 없음.
English: Sage and oatmeal linen bedding and sleepwear hung on a wooden rail, calm mid-tone light, vertical framing, 50mm, no labels; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D12 (n46) · `brand-11.jpg` · 570×690 · 도담 음악실 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 11 — 주말 실내악 공연 · 목표 밝기 180
밝은 흰 벽과 원목 바닥의 작은 음악실, 창가 빛 속 첼로 한 대와 보면대(악보 글자 흐림), 빈 나무 의자. 매우 밝은 하이키(목표 180), 세로 구도, 35mm.
English: A bright small music room with white walls and oak floor, a cello and a music stand with blurred sheet music in window light, empty wooden chairs, high-key exposure, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D13 (n47) · `brand-12.jpg` · 570×690 · 들녘 화덕 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 12 — 참나무 장작 화덕 · 목표 밝기 105
돔형 장작 화덕 입구에서 피자 필로 빵을 꺼내는 손, 불빛이 따뜻하게 비치는 중간 밝기. 세로 구도, 35mm.
English: Hands pulling bread out of a domed wood-fired oven with a pizza peel, warm fire glow, mid-tone exposure, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D14 (n48) · `brand-13.jpg` · 570×690 · 마루 명상 (Wellness)
사용 위치: Lifestyle 입점 브랜드 카드 13 — 소리 명상 · 목표 밝기 170
밝은 마루 바닥 위 싱잉볼과 방석 하나, 한지 창으로 드는 하얀 아침 빛. 밝은 하이키, 세로 구도, 50mm, 사람 없음.
English: A singing bowl and a floor cushion on a pale wooden floor with white morning light through hanji paper windows, bright high-key, vertical framing, 50mm, no people; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D15 (n49) · `brand-14.jpg` · 570×690 · 모래 향방 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 14 — 캔들과 디퓨저 · 목표 밝기 191
하얀 석회 선반 위 무지 유리병 디퓨저와 무지 캔들, 말린 솔가지. 아주 밝은 하이키(목표 191), 부드러운 그림자, 세로 구도, 50mm, 라벨 없음.
English: Unlabeled glass reed diffusers and plain candles with dried pine twigs on a white limewash shelf, very bright high-key exposure, soft shadows, vertical framing, 50mm, no labels; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D16 (n50) · `brand-15.jpg` · 570×690 · 물결 국수 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 15 — 맑은 육수 잔치국수 · 목표 밝기 83
어두운 원목 상 위 도자기 대접에 담긴 맑은 국물 잔치국수와 고명, 옅은 김. 위에서 비스듬히, 어두운 배경, 세로 구도, 50mm.
English: A ceramic bowl of clear-broth Korean noodle soup with garnish on a dark wooden table, faint steam, angled overhead view, dark background, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D17 (n51) · `brand-16.jpg` · 570×690 · 미리내 공방 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 16 — 나무와 한지 무드등 클래스 · 목표 밝기 107
작업대 위에서 두 손이 나무 틀에 한지를 붙이는 장면, 완성된 한지 무드등 하나가 은은하게 켜짐. 중간 밝기, 세로 구도, 50mm.
English: Two hands gluing hanji paper onto a wooden lamp frame on a workbench, one finished hanji mood lamp glowing softly nearby, mid-tone, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D18 (n52) · `brand-17.jpg` · 570×690 · 바람 젤라또 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 17 — 제철 과일 젤라또 · 목표 밝기 121
도자기 컵에 담긴 무화과·배 젤라또 두 스쿱과 작은 나무 스푼, 옆에 자른 과일. 밝은 중간 톤, 세로 구도, 50mm.
English: Two scoops of fig and pear gelato in a small ceramic cup with a wooden spoon and sliced fruit beside it, bright mid-tone, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D19 (n53) · `brand-18.jpg` · 570×690 · 별빛 문구 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 18 — 노트와 엽서, 여행 기록 도구 · 목표 밝기 125
원목 책상 위 무지 크라프트 노트, 나뭇잎 그림만 있는 엽서(글자 없음), 만년필과 색연필. 창가 빛, 위에서 내려다본 플랫레이, 세로 구도.
English: Plain kraft notebooks, postcards with only leaf drawings and no lettering, a fountain pen and colored pencils on an oak desk, window light, overhead flat lay, vertical framing; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D20 (n54) · `brand-19.jpg` · 570×690 · 보듬 마사지 (Wellness)
사용 위치: Lifestyle 입점 브랜드 카드 19 — 아로마 오일 전신 관리 · 목표 밝기 120
무지 갈색 유리 오일병 몇 개와 돌돌 만 흰 타월, 마사지 베드 가장자리. 부드러운 중간 톤, 세로 구도, 50mm, 사람 없음, 라벨 없음.
English: A few unlabeled amber glass oil bottles and rolled white towels at the edge of a massage bed, soft mid-tone light, vertical framing, 50mm, no people, no labels; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D21 (n55) · `brand-20.jpg` · 570×690 · 산들 비스트로 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 20 — 텃밭 채소와 로컬 치즈 브런치 · 목표 밝기 175
밝은 창가 테이블 위 채소 오픈 샌드위치와 치즈 조각, 수란이 올라간 브런치 접시. 하이키, 세로 구도, 45도, 50mm.
English: A brunch plate of open-faced vegetable sandwiches, local cheese slices and a poached egg on a bright window table, high-key, vertical framing, 45-degree angle, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D22 (n56) · `brand-21.jpg` · 570×690 · 새벽 사진관 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 21 — 필름 카메라 기록 · 목표 밝기 98
원목 선반 위 오래된 필름 카메라(브랜드 각인 보이지 않게) 한 대와 인화된 숲 사진 몇 장. 중간 톤, 세로 구도, 50mm.
English: A vintage film camera with no visible brand markings and a few printed forest photographs on a wooden shelf, mid-tone, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D23 (n57) · `brand-22.jpg` · 570×690 · 소담 식료품 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 22 — 꿀과 잼, 제철 장아찌 · 목표 밝기 124
무지 유리병에 담긴 꿀·잼·장아찌가 원목 선반에 줄지어 놓인 식료품점. 병뚜껑은 천으로 싸고 라벨 없음. 창가 빛, 세로 구도, 50mm.
English: Unlabeled glass jars of honey, jam and pickles lined up on an oak shelf in a small pantry shop, lids wrapped in cloth, window light, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D24 (n58) · `brand-23.jpg` · 570×690 · 숲밭 키친 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 23 — 샐러드와 수프 · 목표 밝기 115
도자기 그릇에 담긴 호박 수프와 작은 잎채소 샐러드, 나무 쟁반, 뒤로 흐린 텃밭 창. A06·C02 와 겹치지 않게 수프 중심. 중간 톤, 세로 구도, 50mm.
English: A ceramic bowl of pumpkin soup with a small leaf salad on a wooden tray, blurred kitchen-garden window behind, soup as the hero, mid-tone, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D25 (n59) · `brand-24.jpg` · 570×690 · 숨 사우나 (Wellness)
사용 위치: Lifestyle 입점 브랜드 카드 24 — 장작 난로 핀란드식 사우나 · 목표 밝기 126
나무 벤치와 장작 난로, 돌 위로 피어오르는 김이 있는 사우나 내부, 작은 창 너머 숲. 따뜻한 중간 톤, 세로 구도, 28mm, 사람 없음.
English: Inside a wood-fired Finnish-style sauna with timber benches, a wood stove and steam rising from the stones, a small window to the forest, warm mid-tone, vertical framing, 28mm, no people; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D26 (n60) · `brand-25.jpg` · 570×690 · 아름 플라워 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 25 — 정원 꽃다발 · 목표 밝기 136
작업대 위에서 두 손이 정원 들꽃과 그라스로 작은 다발을 묶는 장면, 크라프트 종이 포장(글자 없음). 밝은 중간 톤, 세로 구도, 50mm.
English: Two hands tying a small bouquet of garden wildflowers and grasses on a workbench, plain kraft paper wrap with no print, bright mid-tone, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D27 (n61) · `brand-26.jpg` · 570×690 · 온기 와인바 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 26 — 내추럴 와인 · 목표 밝기 198
아주 밝은 흰 대리석 바 위 와인잔 두 개(연한 오렌지 와인)와 라벨 없는 병, 창밖 밝은 숲. 목표 198의 매우 밝은 하이키 — 저녁 바 분위기 대신 낮의 밝은 바로 표현. 세로 구도, 50mm.
English: Two glasses of pale orange natural wine and an unlabeled bottle on a very bright white marble bar with a luminous forest window, daytime bar mood, very high-key exposure, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D28 (n62) · `brand-27.jpg` · 570×690 · 윤슬 갤러리 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 27 — 로비 기획 전시 · 목표 밝기 141
흰 벽에 걸린 추상 한지 작품 한 점과 좌대 위 목조 오브제, 천창 빛. 서명·캡션 없음. 세로 구도, 35mm, 사람 없음.
English: One abstract hanji artwork on a white wall and a carved wooden object on a plinth under skylight, no signature or caption, vertical framing, 35mm, no people; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D29 (n63) · `brand-28.jpg` · 570×690 · 이음 편집숍 (Shop)
사용 위치: Lifestyle 입점 브랜드 카드 28 — 로컬 공예품 편집숍 · 목표 밝기 71
어두운 월넛 진열장에 스포트 조명을 받은 유리·목공·금속 공예품 몇 점. 어두운 중저 톤, 세로 구도, 50mm.
English: A few glass, wood and metal craft pieces under spot lighting in a dark walnut display cabinet, low-key, vertical framing, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D30 (n64) · `brand-29.jpg` · 570×690 · 하늘 로스터리 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 29 — 소량 로스팅 원두와 핸드드립 · 목표 밝기 129
구리 주전자로 드리퍼에 물을 붓는 손, 옆에 원두가 담긴 무지 유리병. 중간 톤, 세로 구도, 50mm, 로스터 기계 상표 없음.
English: A hand pouring from a copper kettle into a pour-over dripper, unlabeled glass jar of coffee beans beside it, mid-tone, vertical framing, 50mm, no machine branding; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D31 (n65) · `brand-30.jpg` · 570×690 · 한결 필라테스 (Wellness)
사용 위치: Lifestyle 입점 브랜드 카드 30 — 소그룹 매트 필라테스 · 목표 밝기 162
밝은 목재 바닥 스튜디오에 가지런히 놓인 매트와 필라테스 링·폼롤러, 통창 너머 초록. 밝은 하이키, 세로 구도, 35mm, 사람 없음.
English: Mats with pilates rings and foam rollers neatly arranged in a bright studio with pale wood floors and a large green window, high-key, vertical framing, 35mm, no people; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D32 (n66) · `brand-31.jpg` · 570×690 · 해솔 목공소 (Culture)
사용 위치: Lifestyle 입점 브랜드 카드 31 — 주말 목공 원데이 클래스 · 목표 밝기 122
작업대에 벽걸이 도구와 클램프, 참가자 두 손이 사포로 작은 스툴을 다듬는 장면. 중간 톤, 세로 구도, 35mm. D06 과 달리 클래스(사람 손) 중심.
English: A participant's two hands sanding a small wooden stool on a workbench with clamps and wall-hung hand tools, mid-tone, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D33 (n67) · `brand-32.jpg` · 570×690 · 햇살 파티세리 (Eat&Drink)
사용 위치: Lifestyle 입점 브랜드 카드 32 — 과일 타르트와 구움 과자 · 목표 밝기 33
거의 검은 배경 위, 한 줄기 측광을 받은 무화과 타르트 한 조각과 마들렌 두 개. 매우 어두운 로우키(목표 33), 세로 구도, 85mm.
English: A slice of fig tart and two madeleines lit by a single slice of side light against a near-black background, very low-key exposure, vertical framing, 85mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D34 (n68) · `ls-event-1.jpg` · 1208×810 · 와인 페어링 디너 테이블
사용 위치: Lifestyle 이벤트 카드 1 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 51
C06(event-1)과 같은 행사지만 다른 컷: 테이블 끝에서 길게 내려다본 디너 세팅, 촛불 줄과 와인잔, 뒤로 어두운 숲 창. 로우키, 35mm, 라벨 없음.
English: A long dinner table setting seen from its end with a row of candles and wine glasses, dark forest window behind, low-key exposure, 35mm, unlabeled bottles; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### D35 (n69) · `ls-event-2.jpg` · 1208×810 · 화덕 피자와 타코
사용 위치: Lifestyle 이벤트 카드 2 (글자는 사진 아래, 오버 시 1.15배) · 목표 밝기 94
C07(event-2)과 다른 컷: 야외 테이블에 여럿이 나눠 먹는 피자와 타코 접시, 손만 보이게. 해 질 녘 따뜻한 중간 톤, 45도, 35mm.
English: Pizza and taco plates shared on an outdoor wooden table with only diners' hands visible, warm dusk mid-tone, 45-degree angle, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

---

## E. Stay (`stay.html`) · 10장

객실 패널 6장(room-1~6)은 부채꼴로 겹친 500×600 카드(데스크톱 ±2~4° 회전), 좌하단에 흰/회백 세리프 룸 이름(Grove·Forest·Moss·Stream·Canopy·Nest)이 얹힌다. 모바일은 280:392 세로 비율이라 좌우 약 7%씩 잘린다. 핵심은 가로 중앙 85%에 두고 좌하단 25%는 어둡고 단순하게. 6장 모두 같은 건물·같은 마감재의 다른 객실처럼 통일한다. **모두 샘플 시연용 생성 가능, 실제 납품 시 실사진 교체.**

### E01 (n70) · `kv-stay.jpg` · 2400×1500 · 라운지 의자와 스탠드 조명
사용 위치: Stay KV (글자: 하단 중앙 흰 제목 + 설명) · 목표 밝기 64
어두운 객실 라운지 코너에 놓인 가죽·원목 라운지 체어 하나와 켜진 리넨 갓 스탠드, 뒤로 커튼 틈의 저녁 숲. 의자와 스탠드는 가로 중앙 28%·화면 중간, 하단 30%는 어두운 러그로 비움. 35mm, 앉은 눈높이.
English: A leather-and-oak lounge chair and a lit linen-shade floor lamp in a dim guest-room corner, evening forest through a gap in the curtains, chair and lamp in the central vertical band at mid-height, dark rug in the bottom 30% for overlaid title, 35mm seated eye level; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E02 (n71) · `room-1.jpg` · 1000×1200 · Forest 룸 — 창 너머 숲
사용 위치: 객실 타입 패널 Forest (글자: 좌하단 룸 이름) · 목표 밝기 136
낮은 원목 침대와 흰 리넨 침구, 벽 한 면 가득한 창 너머 초록 숲. 밝은 오전 빛, 세로 구도, 28mm, 창은 중앙 상단, 좌하단은 침대 발치 그늘.
English: A low oak bed with white linen bedding and a full-wall window of green forest, bright morning light, vertical framing, 28mm, window in the upper center, shaded bed foot in the lower left; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E03 (n72) · `room-2.jpg` · 1000×1200 · Moss 룸 — 우드 서가
사용 위치: 객실 타입 패널 Moss (글자: 좌하단 룸 이름) · 목표 밝기 58
이끼색 울 헤드보드와 월넛 붙박이 서가가 있는 어두운 객실, 서가 간접등만 은은하게. 책등 글자 없음. 로우키, 세로 구도, 35mm.
English: A dark guest room with a moss-green wool headboard and built-in walnut bookshelves softly lit by indirect lighting, no readable spines, low-key, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E04 (n73) · `room-3.jpg` · 1000×1200 · Stream 룸 — 넓은 테이블
사용 위치: 객실 타입 패널 Stream (글자: 좌하단 룸 이름) · 목표 밝기 102
여러 명이 둘러앉을 수 있는 긴 원목 테이블과 벤치가 놓인 객실 거실 공간, 창밖으로 계곡 쪽 숲. 흐린 날 중간 톤, 세로 구도, 28mm.
English: A guest suite living area with a long oak table and benches for several people, window toward a forested stream valley, overcast mid-tone light, vertical framing, 28mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E05 (n74) · `room-4.jpg` · 1000×1200 · Canopy 룸 — 벽면 아트
사용 위치: 객실 타입 패널 Canopy (글자: 좌하단 룸 이름) · 목표 밝기 89
침대 위 벽에 걸린 큰 추상 텍스타일 아트(나뭇잎 그림자 느낌, 서명 없음)와 높은 박공 천장, 작은 고창으로 드는 빛. 중간 톤, 세로 구도, 28mm.
English: A large abstract textile artwork evoking leaf shadows, unsigned, above the bed under a high gabled ceiling, light from a small clerestory window, mid-tone, vertical framing, 28mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E06 (n75) · `room-5.jpg` · 1000×1200 · Nest 룸 — 라운지 체어
사용 위치: 객실 타입 패널 Nest (글자: 좌하단 룸 이름) · 목표 밝기 39
밤의 아늑한 소형 객실, 창가 둥근 라운지 체어와 울 담요, 작은 테이블 램프 하나만 켜진 매우 어두운 장면. 로우키(목표 39), 세로 구도, 35mm.
English: A cozy small guest room at night with a rounded lounge chair and wool throw by the window, only a small table lamp lit, very low-key, vertical framing, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E07 (n76) · `life-1.jpg` · 2400×650 · 중앙 정원 조감
사용 위치: Stay 라이프스타일 띠 1 (짙은 숲 바탕, 글자: 좌하단 회백 제목 + 흰 설명) · 목표 밝기 62
객실동 사이 중앙 정원을 높은 곳에서 내려다본 장면, 굽은 자갈길과 벤치, 단풍나무 몇 그루와 잔디. 해 질 녘 그늘, 어두운 초록 톤. 정원의 중심 동선은 가로 중앙 27%·위쪽 55%, 하단은 짙은 나무 그림자. 드론보다 낮은 건물 옥상 높이, 35mm.
English: Ultra-wide elevated view of a central garden between lodge wings with a curving gravel path, benches, a few maples and lawn, dusk shade in dark green tones, main path in the central 27% upper half, deep tree shadows along the bottom, rooftop-height viewpoint, 35mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E08 (n77) · `life-2.jpg` · 2400×650 · 숲길 산책로
사용 위치: Stay 라이프스타일 띠 2 (글자: 좌하단 제목·설명) · 목표 밝기 54
B03(loc-1)과 겹치지 않게: 숲 사이로 이어진 좁은 목재 데크 산책로가 커브를 그리며 사라지는 장면, 저녁 무렵 어두운 톤. 데크 커브는 가로 중앙 27%·위쪽 55%, 하단은 어두운 수풀. 표지판 없음. 50mm.
English: Ultra-wide narrow wooden boardwalk trail curving away between trees at early evening, dark tones, boardwalk curve in the central 27% upper half, dark undergrowth below, no signs, 50mm; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E09 (n78) · `life-3.jpg` · 2400×650 · 로비 갤러리
사용 위치: Stay 라이프스타일 띠 3 (글자: 좌하단 제목·설명) · 목표 밝기 74
로비와 이어진 라운지 겸 갤러리, 벽에 걸린 작품 두어 점과 낮은 소파, 저녁 간접 조명. A07 과 달리 사람 없는 공간 전경. 작품과 조명은 가로 중앙 27%·위쪽, 하단은 어두운 바닥과 소파 등받이. 24mm, 벽면 수평은 반듯하게.
English: Ultra-wide lobby lounge gallery with two artworks on the wall and low sofas under warm evening indirect lighting, no people, artworks and light in the central 27% upper area, dark floor and sofa backs along the bottom, level horizontals, 24mm, unsigned artworks; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### E10 (n84) · `room-6.jpg` · 1000×1200 · Grove 룸 — 통창 너머 숲 라운지형 객실
사용 위치: 객실 타입 패널 Grove (패널 첫 장, 글자: 좌하단 룸 이름) · 목표 밝기 52
두 면이 통창인 라운지형 객실, 낮은 소파와 러그, 창밖 짙은 숲이 흐린 저녁빛에 잠긴 장면. 실내 불은 거의 끈 로우키(목표 52), 세로 구도, 24mm. 좌하단은 어두운 러그로 비워 룸 이름이 읽히게.
English: A lounge-style guest room with floor-to-ceiling glass on two sides, a low sofa and rug, dense forest outside fading into overcast evening light, interior lights mostly off, low-key, vertical framing, 24mm, dark rug in the lower left; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

---

## F. 오시는 길 (`location.html`) · 5장

### F01 (n79) · `kv-location.jpg` · 2400×1500 · 로비를 오가는 사람들(흐림 효과)
사용 위치: 오시는 길 KV (글자: 하단 중앙 흰 제목 + 두 줄 설명) · 목표 밝기 89
석재 바닥과 원목 천장의 로비를 가방을 든 사람들이 오가는 장면, 느린 셔터로 인물은 흐르듯 번지고 공간은 선명. 얼굴 식별 불가. 오후 창빛, 중간 톤. 흐름의 중심은 가로 중앙 28%, 하단 30%는 어두운 바닥. 24mm, 삼각대 고정.
English: A lodge lobby with stone floor and timber ceiling, travelers with bags passing through rendered as motion blur by a slow shutter while the architecture stays sharp, faces unidentifiable, afternoon window light, mid-tone, flow centered in the central band, darker floor in the bottom 30% for overlaid title, 24mm tripod; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark

### F02 (n80) · `map-1.jpg` · 1200×788 · 기차로 오는 길 약도 — 생성 제외(교체 지침)
사용 위치: 오시는 길 탭 [기차] 왼쪽 약도 · 목표 밝기 230
사진 생성기로 만들지 않는다. 실제 운영 시에는 지도 API(카카오맵·네이버지도 등) 정적 지도 또는 라이선스를 확인한 지도 캡처로 교체한다. 샘플 시연용으로 두려면 **글자·역명·숫자 없는** 밝은 회백 바탕(평균 밝기 230 안팎) 선화 일러스트: 철도선 하나, 역 점 하나, 셔틀 경로 점선, 목적지 숲 아이콘 하나. 1200×788 JPG.
이유: 약도는 실제 경로 정보이므로 생성 이미지는 허위 안내가 된다.

### F03 (n81) · `map-2.jpg` · 1200×788 · 버스 정류장 약도 — 생성 제외(교체 지침)
사용 위치: 오시는 길 탭 [버스] 약도 · 목표 밝기 230
map-1 과 같은 방식. 실제 지도 API/캡처로 교체, 샘플이면 글자 없는 밝은 선화(도로선 + 정류장 점 + 도보 점선 + 목적지 아이콘), 평균 밝기 230 안팎. 1200×788 JPG.
이유: 정류장 위치는 실제 정보여야 한다.

### F04 (n82) · `map-3.jpg` · 1200×788 · 자전거 도로 약도 — 생성 제외(교체 지침)
사용 위치: 오시는 길 탭 [자전거] 약도 · 목표 밝기 230
map-1 과 같은 방식. 실제 지도 API/캡처로 교체, 샘플이면 글자 없는 밝은 선화(자전거 도로 곡선 + 거치대 점 + 목적지 아이콘), 평균 밝기 230 안팎. 1200×788 JPG.
이유: 자전거 도로 구간은 실제 정보여야 한다.

### F05 (n83) · `map-4.jpg` · 1200×788 · 자차 주차장 약도 — 생성 제외(교체 지침)
사용 위치: 오시는 길 탭 [자차] 약도 · 목표 밝기 230
map-1 과 같은 방식. 실제 지도 API/캡처 또는 단지 주차 동선도(설계 도면 기반)로 교체, 샘플이면 글자 없는 밝은 선화(진입로 + 주차면 블록 + 목적지 아이콘), 평균 밝기 230 안팎. 1200×788 JPG.
이유: 주차장·진입로 배치는 실제 단지 정보여야 한다.

---

## 생성 후 검증

1. `public/neulsoop/assets/` 에 photo-map 의 84개 파일이 모두 존재하는지 확인한다.
2. 각 파일의 픽셀 크기가 photo-map 의 생성w×생성h 와 정확히 일치하는지 확인한다.
3. 이미지 안에 글자·숫자·간판·로고·워터마크·읽히는 책 표지/라벨이 없는지 눈으로 확인한다.
4. 목표 밝기 ±15 이내인지 Pillow 로 확인한다.
   ```bash
   python3 - <<'EOF'
   from PIL import Image, ImageStat
   import pathlib
   for line in pathlib.Path('tools/ref-clone/photo-map-neulsoop.txt').read_text().splitlines()[1:]:
       c = line.split('\t'); f = c[2]; w, h = int(c[5]), int(c[6])
       target = int(c[7].rsplit('→', 1)[1])
       im = Image.open(f'public/neulsoop/assets/{f}')
       m = ImageStat.Stat(im.convert('L')).mean[0]
       ok = im.size == (w, h) and abs(m - target) <= 15
       print('OK ' if ok else 'NG ', f, im.size, round(m), target)
   EOF
   ```
5. 슬라이드 묶음의 톤 일관성: 메인 히어로 4장(hero-1~4), Rest 5장(rest-1~5), 늘숲 이야기 4장(story-1~4), 객실 패널 6장(room-1~6), 띠 이미지(loc-1~4, life-1~3), 브랜드 카드 32장이 계절·색온도·그레인에서 튀지 않는지 나란히 놓고 본다.
6. 재검사: `python3 tools/ref-clone/preflight.py neulsoop stay-onegrove` (두 번째 인자는 `ref-sites/` 폴더명. ref-sites 는 커밋하지 않으므로 크롤링한 PC에서 실행하고, 스크립트 안의 `REFS`·`ROOT` 경로를 그 PC에 맞춘다).
7. 사진이 바뀌었으므로 썸네일 `public/thumbs/neulsoop.jpg` 와 사례 캡처 `public/cases/neulsoop/` 를 다시 촬영한다.

---

## 부록 · og.jpg(1200×630) 참고 프롬프트

photo-map 에 없는 자리라 수량(84)에 넣지 않는다. 현재 `public/neulsoop/og.jpg` 도 임시 이미지이며, 교체 시 1200×630 JPG 로 저장.

**`og.jpg` · 1200×630 · 공유 썸네일** — 새벽 안개가 걷히는 숲 가장자리의 낮은 목재 스테이 건물과 창 몇 곳의 따뜻한 불빛, 짙은 숲 녹색 중심. SNS 미리보기에서 제목이 옆에 붙으므로 사진 안에는 글자 없이 가로 중앙에 건물을 작게 두고 주변은 숲과 안개로 여유. 목표 밝기 70 안팎.
English: A low timber lodge at the edge of a misty forest at dawn with a few warmly lit windows, deep forest green palette, lodge small in the horizontal center with generous forest and fog around it; photorealistic, quiet Korean forest lifestyle stay photography, soft natural light, muted moss green and warm oak palette, subtle film grain, no text, no logo, no watermark
