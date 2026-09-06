# perfume-a 이미지 슬롯 프롬프트 (레퍼런스 실측 크기 — 생성은 표시 크기의 2배)

> 공통 접미: `photorealistic product photography, warm beige and cream palette, soft natural window light with dappled shadows, travertine stone and linen props, no text, no logo, no watermark, high detail`
> **2026-09-06 사진 9장 설치 완료** (사용자 생성본 → WebP q82, 1.49MB → 0.57MB). 아래 표는 재생성이 필요할 때 쓰는 프롬프트 기록. 파일 확장자는 `.webp` 로 바뀌었다(`hero.webp` 등). 사진 파일 외에는 교체할 것이 없다(로고·서명은 웹폰트, 아이콘은 SVG).

| 슬롯 | 파일 | 표시 크기 (1440) | 생성 크기 | 프롬프트 |
|---|---|---|---|---|
| 히어로 배경 | `assets/hero.jpg` | 1440×800 (cover · 모바일은 가운데 390 폭만 보임) | 2880×1600 | Luxury perfume bottle with black cap and cream label standing on a travertine stone block, **bottle placed on the right third**, left half is soft empty beige wall for headline text, dried baby's breath branch, silk fabric, golden afternoon light --ar 16:9 |
| 컬렉션 카드 1 (로즈 누아르) | `assets/product-1.jpg` | 387×500 | 774×1000 | Single rectangular perfume bottle with black cap, pale pink juice, cream label, centered on pure white studio background, soft shadow, catalog style --ar 3:4 |
| 컬렉션 카드 2 (베티버) | `assets/product-2.jpg` | 387×500 | 774×1000 | Same bottle design, pale green-ivory juice, cream label, centered on pure white studio background --ar 3:4 |
| 컬렉션 카드 3 (솔레이) | `assets/product-3.jpg` | 387×500 | 774×1000 | Same bottle design, warm golden-yellow juice, cream label, centered on pure white studio background --ar 3:4 |
| 브랜드 스토리 사진 | `assets/about.jpg` | 590×443 (r10) | 1180×886 | Perfume bottle beside its black-and-gold gift box on a marble tabletop, dark moody background, dried grass sprigs, warm rim light --ar 4:3 |
| 저널 카드 1 | `assets/journal-1.jpg` | 387×267 (r10) | 774×534 | Woman in silk blouse spraying perfume on her wrist at a vanity with mirror and white flowers, bright airy bedroom, soft focus --ar 3:2 |
| 저널 카드 2 | `assets/journal-2.jpg` | 387×267 (r10) | 774×534 | Flat lay of perfume ingredients: bergamot, vanilla pods, pink peony, amber resin, sandalwood sticks around a bottle on cream linen --ar 3:2 |
| 저널 카드 3 | `assets/journal-3.jpg` | 387×267 (r10) | 774×534 | Perfume bottle with an open cream booklet, gold jewelry tray, white magnolia, dappled sunlight on linen --ar 3:2 |
| 뉴스레터 패널 사진 | `assets/newsletter.jpg` | 550×413 (좌측 · 모바일 350×263) | 1100×826 | Perfume bottle on a small stone pedestal, golden lid and silk drape in foreground, travertine wall, warm directional light --ar 4:3 |

- 브랜드명 `오드 메종 / Ode Maison`, 문구, 가격은 `index.html` 에서 바로 바꾼다. 로고·창립자 서명은 Pinyon Script 웹폰트 텍스트라 글자만 바꾸면 된다.
- 특징 아이콘 4종·소셜 아이콘 3종은 Phosphor(MIT) 선 아이콘 SVG — 색은 `--gold` 변수 하나로 바뀐다.
