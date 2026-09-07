# estate-a 이미지 슬롯 프롬프트 (레퍼런스 실측 크기 — 생성은 표시 크기의 2배 안팎)

> 공통 접미(사진): `photorealistic architectural photography, blue hour, warm interior lights, no text, no logo, no watermark, high detail`
> 현재 `assets/` 안의 파일은 같은 크기의 임시 플레이스홀더(하늘 그라데이션 + 집 실루엣, 회색 인테리어). 아래 파일명·크기 그대로 덮어쓰면 끝난다. 구름·컷아웃(PNG)은 **투명 배경** 필수. 용량이 크면 `.webp` 로 바꾸고 `index.html` 의 `./assets/파일명` 만 같이 고친다.

| 슬롯 | 파일 | 표시 크기 (1440) | 생성 크기 | 프롬프트 |
|---|---|---|---|---|
| 히어로 구름 (4곳에서 재사용, 회전 22°/-9°, op .6/.7) | `assets/cloud.png` | 1752×948 | 1752×948 투명 PNG | Soft white cumulus cloud cutout, wispy translucent edges, isolated on transparent background |
| 히어로 집 | `assets/hero-house.jpg` | 1440×931 (cover) | 2880×1862 | Terraced modern glass house with stacked balconies and rooftop plants at dusk, warm lights inside, ocean cliff behind, wide front view, sky continues to the top edge --ar 1.55:1 |
| 히어로 칩 아바타 3 | `assets/chip-1.jpg` ~ `chip-3.jpg` | 26×26 원형 | 52×52 | 자연광 인물 헤드샷 3종 (여/남/여) |
| 임팩트 상단 구름 띠 (2곳) | `assets/cloud-band.png` | 1505×464 | 1505×464 투명 PNG | Horizontal band of dense white fog, fully opaque center fading to transparent top and bottom |
| 임팩트 사진 2 | `assets/impact-1.jpg`, `impact-2.jpg` | 314×338 (cover, r15) | 628×676 | 1: 3층 콘크리트·목재 모던 주택 정면, 흐린 하늘 / 2: 언덕 위 유리 주택, 녹색 구릉 배경 |
| About 배경 패턴 | `assets/about-pattern.jpg` | 1440×1060 (cover, op .17) | 1440×1060 | Blurred grey window-shadow pattern on white wall, soft diagonal light streaks, abstract |
| 대표 매물 3 (풀블리드 스택) | `assets/feat-1.jpg` ~ `feat-3.jpg` | 1440×900 (cover, 세로 소스 권장) | 1200×1600 | 1: 검정 목재·석재 2층 주택 + 수영장 + 차 2대, 저녁 / 2: 검정 금속지붕 농가풍 주택, 노을, 숲 / 3: 곡선 유리 빌라, 호수 반영, 밤 |
| 서비스 카드 집 컷아웃 3 | `assets/svc-1.png` ~ `svc-3.png` | 556×512 (contain, 하단 정렬) | 1112×1024 투명 PNG | 흰 큐브형 모던 3층 주택 컷아웃 3종(정면 / 측면 / 테라스 강조), 아래쪽이 점점 투명해지도록 마스크 처리됨 |
| 매물 카드 4 | `assets/list-1.jpg` ~ `list-4.jpg` | 620.5×420 (cover, r16, 세로 소스) | 900×1200 | 1: 바다 절벽 곡선 주택 / 2: 흰 2층 테라스 주택, 노을 / 3: 숲속 노란 코티지 / 4: 도심 흰색·석재 모던 주택 |
| 하이라이트 영상 | `assets/highlight.mp4` (+ 포스터 `highlight-poster.jpg`) | 400×276 → 최대 6배(2400×1653) | 1440×992 mp4 4~8초 루프 | 단층 유리 주택과 수영장, 저녁 구름, 카메라가 천천히 전진 (팰린드롬 루프) |
| 후기 아바타 6 | `assets/avatar-1.jpg` ~ `avatar-6.jpg` | 50×50 (r7) | 100×100 | 자연광 인물 헤드샷 6종 (여/남/여/남/여/남) |
| 강조 후기 사진 | `assets/review-photo.jpg` | 350×500 (cover, r15) | 700×1000 | 검정 코트에 비니를 쓴 인물 상반신, 도시 보케 배경, 세로 --ar 7:10 |
| 푸터 하늘 | `assets/footer-sky.jpg` | 1408×1222 (cover, 하단 마스크) | 1408×1222 | Overcast blue-grey evening sky with soft clouds, no ground |
| 푸터 집 | `assets/footer-house.jpg` | 1408×844 (cover, 하단 마스크) | 1408×844 | Curved multi-level modern house with glass balconies at dusk, sea behind, wide --ar 5:3 |

- 로고는 텍스트("HAUS" + 집 아이콘), 아이콘·화살표·소셜은 인라인 SVG, 푸터 대형 워드마크는 SVG 텍스트 — 사진·영상 외에는 교체할 것이 없다.
- 상품명·가격·문구는 `index.html` 에서 바로 바꾼다.
