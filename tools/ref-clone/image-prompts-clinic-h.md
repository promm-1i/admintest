# clinic-h 여울성형외과 이미지 생성 프롬프트

## 생성 상태
- 현재 `public/yeoul/assets/` 의 사진 49장은 **톤만 맞춘 임시 이미지**다(흐린 베이지·갈색 면).
- 아래 프롬프트로 만든 사진을 `photo-map-clinic-h.txt` 의 파일명 그대로 덮어쓴다.
- 원장 사진(`director.jpg`), 공간 사진(`space-*`), 사례 사진(`case-*`)은 생성하지 말고 **실제 병원 사진으로만** 넣는다(의료광고 기준).

## 공통 스타일
- 포토리얼, 자연광, 따뜻한 베이지·브라운(#f5efe6 / #52463a 계열), 낮은 채도, 부드러운 필름 톤
- 한국인 20~40대, 특정 실존 인물을 닮지 않게, 과한 메이크업·보정 금지
- 금지: 이미지 속 글자·로고·워터마크, 수술 장면, 피·상처, 과장된 전후 비교, HDR
- 텍스트는 HTML 로 올라가므로 인물 핵심은 중앙 55% 안에 둔다

## 프롬프트
### 01. og-share — `og.jpg` (1200x630)
어두운 갈색 톤 속 눈매 클로즈업, 오른쪽에 여백. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 02. intro-face — `assets/intro.jpg` (2560x1440)
어두운 조명 속 한국인 여성의 눈가 클로즈업, 화면 위쪽에 눈, 60% 어둡게 덮임. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 03. intro-face-m — `assets/intro-m.jpg` (1080x2160)
같은 인물 세로 구도, 눈이 화면 위쪽 40% 지점. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 04. visual-first — `assets/visual-1.jpg` (1600x820)
눈을 감은 옆얼굴, 부드러운 창가 빛, 따뜻한 베이지. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 05. visual-revision — `assets/visual-2.jpg` (1600x820)
또렷하게 뜬 눈 한쪽 클로즈업, 속눈썹 결이 보이게. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 06. ring-1..4 — `assets/ring-1.jpg ~ ring-4.jpg` (1920x1200)
기준 4개(RESPECT·SUBTLE·PRECISE·HARMONY)를 표현한 추상 이미지: 피부결, 얇은 실크, 물결 반사, 균형 잡힌 얼굴 옆선. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 07. consult-band — `assets/consult.jpg · consult-2.jpg` (1920x2000)
입술과 턱선 클로즈업, 따뜻한 역광. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 08. sub-heroes — `assets/sub-first.jpg · sub-revision.jpg · sub-about.jpg` (2560x800)
가로로 긴 얼굴 크롭(눈 높이), 서브별 다른 인물·각도. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 09. approach — `assets/approach-first.jpg · approach-revision.jpg` (1088x1538)
정면 인물 반신 크롭, 차분한 표정. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 10. concern-1..10 — `assets/first-1~5.jpg · revision-1~5.jpg` (2016x720)
고민별 눈매 연출 사진(작은 눈·비대칭·강한 눈매·처진 눈꺼풀·눈밑 / 풀린 라인·짝눈·두꺼운 라인·효과 감소·전반적 아쉬움) — 과장 없는 자연광 인물. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 11. director — `assets/director.jpg` (1200x1200)
흰 가운 차림 원장 상반신, 밝은 베이지 배경 — 실제 원장 사진으로 교체. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 12. standard-1..4 — `assets/standard-1~4.jpg` (2400x928)
기준 4개 가로 이미지. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 13. space-* — `assets/space-entrance-1 · lobby-1~2 · waiting-1~2 · consult-1~3 · care-1~2.jpg` (2400x1030)
병원 실내 — 실제 병원 사진으로 교체. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 14. map — `assets/map.jpg` (1920x600)
현재는 그림 약도. 운영 시 지도 캡처 또는 지도 API. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 15. case-1..6 — `assets/case-1~6.jpg` (740x296)
동의받은 전후 눈 사진 — 실제 사례로만 교체. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

### 16. column-1..3 — `assets/column-1~2.jpg` (960x960)
상담실·기록지·회복 장면 등 칼럼 대표 사진. warm beige and soft brown palette, natural window light, photorealistic, editorial beauty clinic photography, no text.

