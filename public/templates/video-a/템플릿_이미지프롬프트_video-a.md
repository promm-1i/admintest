# video-a 이미지 슬롯 프롬프트 (레퍼런스 실측 크기 — 생성 시 표시 크기의 2배로)

| 슬롯 | 파일 | 표시 크기 | 프롬프트 |
|---|---|---|---|
| 플랫폼 카드 아이콘(쇼츠) | assets/start-growing-to-1.jpg | 204×204 | 3D glossy glass app icon of a vertical video play button, dark smoked glass with orange rim light, floating on pure dark background #100B08, studio product render, soft bottom glow |
| 플랫폼 카드 아이콘(릴스) | assets/start-growing-to-2.jpg | 204×204 | 3D glossy glass app icon of a rounded-square camera reel with play triangle, dark smoked glass, orange rim light, dark background #100B08, studio render |
| 플랫폼 카드 아이콘(틱톡풍) | assets/start-growing-to-3.jpg | 204×204 | 3D glossy glass music-note icon, dark smoked glass with orange edge glow, dark background #100B08, studio render |
| More content 패널 배경 | assets/mega-bg.jpg | 1090×827 | Wide dark panel background, left side near-black #0D0805, right 40% glowing vertical orange-red gradient stripes like stage curtains, tiny warm sparkles, cinematic |
| 히어로 원통 카드 12장 | assets/hero-*.jpg | 260×370 | 세로형 숏폼 영상 스틸(업종별 실사) — 사용자가 실제 작업물로 교체 |
| 마퀴 영상 카드 | assets/see-more-works-*.jpg | 346×620 | 9:16 세로 영상 썸네일 — 사용자가 실제 작업물로 교체 |

- 아이콘은 CSS 도형으로 흉내내지 않는다(런북 §3-2). 같은 크기 슬롯 + 이 프롬프트로 생성해 교체한다.
- 생성 해상도: 표시 크기의 2배(레티나). 예: 204×204 → 408×408.
