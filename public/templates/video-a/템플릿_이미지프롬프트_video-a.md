# video-a 이미지 슬롯 프롬프트 (레퍼런스 실측 크기 — 생성 시 표시 크기의 2배로)

| 슬롯 | 파일 | 표시 크기 | 프롬프트 |
|---|---|---|---|
| 플랫폼 카드 아이콘(쇼츠) | assets/icon-shorts.png (투명 PNG) | 204×204 | 3D glossy glass app icon of a vertical video play button, dark smoked glass with orange rim light, floating on pure dark background #100B08, studio product render, soft bottom glow |
| 플랫폼 카드 아이콘(릴스) | assets/icon-reels.png (투명 PNG) | 204×204 | 3D glossy glass app icon of a rounded-square camera reel with play triangle, dark smoked glass, orange rim light, dark background #100B08, studio render |
| 플랫폼 카드 아이콘(틱톡풍) | assets/icon-tiktok.png (투명 PNG) | 204×204 | 3D glossy glass music-note icon, dark smoked glass with orange edge glow, dark background #100B08, studio render |
| More content 패널 배경 | assets/mega-bg.png (투명 PNG · 이미 생성됨, 교체 불필요) | 1090×827 | Wide dark panel background, left side near-black #0D0805, right 40% glowing vertical orange-red gradient stripes like stage curtains, tiny warm sparkles, cinematic |
| 히어로 원통 카드 12장 | assets/hero-*.webp | 260×370 | 세로형 숏폼 영상 스틸(업종별 실사) — 사용자가 실제 작업물로 교체 |
| 마퀴 영상 카드 | assets/see-more-works-*.webp | 346×620 | 9:16 세로 영상 썸네일 — 사용자가 실제 작업물로 교체 |

- 아이콘은 CSS 도형으로 흉내내지 않는다(런북 §3-2). 같은 크기 슬롯 + 이 프롬프트로 생성해 교체한다.
- 생성 해상도: 표시 크기의 2배(레티나). 예: 204×204 → 408×408.

## 2026-09-06 추가 슬롯 (Claude 재작업)

| 슬롯 | 파일 | 표시 크기 | 프롬프트 |
|---|---|---|---|
| 편집 툴 아이콘 6장 (티커) | assets/tool-1.png ~ tool-6.png (투명 PNG, 220×220 생성) | 110×110 · r27 | 순서: 캡컷풍 검정 타일 / 다빈치 리졸브풍 컬러 구슬 3개 / Ae풍 보라 타일 "Ae" / Pr풍 보라 타일 "Pr" / 파이널컷풍 컬러 클래퍼 / 필모라풍 청록 타일. 각각 `glossy 3D app icon tile, rounded square, dark glass with subtle top highlight, [설명], centered, transparent background, no text except the two-letter mark, high detail` |
| 히어로 좌상단 글로우 | assets/glow-corner.png | 990×955 | **이미 생성됨(레퍼런스 알파 프로파일 실측으로 그림). 교체 불필요.** |
| More content 패널 배경 / 우측 스미어 | assets/mega-bg.png, assets/side-glow.png | 1090×827 / 799×640 | **이미 생성됨. 교체 불필요.** |

- 플랫폼 3D 아이콘 3장(icon-shorts/reels/tiktok.png)은 현재 유리질 사각 플레이스홀더. 위 표의 프롬프트로 생성해 같은 파일명(투명 PNG, 408×408)으로 덮어쓰면 끝.
