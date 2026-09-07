# fitness-a (펄스핏) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/fitness-a/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. 표시 크기의 2배(레티나)로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 어두운 체육관 · 따뜻한 텅스텐 조명 + 주황(#EC4D09) 포인트 광원 · 살짝 거친 필름 그레인 · 인물은 한국인 20~30대 · 로고/글자 없음.
- 카메라: 35~50mm, 얕은 심도, 눈높이. 과한 HDR · 채도 금지.
- 네거티브 공통: `text, watermark, logo, extra fingers, distorted face, blurry, cartoon, oversaturated`

## 슬롯 표

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| hero.jpg | 1440×900 | 2880×1800 | 히어로 전면 | Close-up portrait of a Korean female athlete in her late 20s, sweat on skin, wet hair strands, determined gaze slightly off camera, dark gym background with a warm orange rim light from the right, cinematic, shallow depth of field, photorealistic. 인물은 오른쪽 2/3에 두고 왼쪽 하단은 어둡게(글자 자리). |
| about-1.jpg | 520×300 | 1040×600 | About 좌 | Korean woman doing a cable fly on a machine, side profile, grey sports top, dark gym, warm spotlight, 16:9. |
| about-2.jpg | 520×300 | 1040×600 | About 우 | Korean man mid-deadlift with a loaded barbell, black shorts, red-lit gym background, low angle, 16:9. |
| svc-1-1 / -2 / -3.jpg | 80×76 · 166×127 · 96×85 | 320×304 · 664×508 · 384×340 | 서비스 01 활성 사진 3장 | (1) trainer correcting a client's squat form, (2) one-on-one coaching in a bright studio, (3) close-up of a stopwatch and clipboard. 세 장은 서로 다른 구도로. |
| svc-2-*.jpg | 같은 크기 | 같은 크기 | 서비스 02 영양 | (1) meal-prep containers with grilled chicken and greens, (2) a nutritionist explaining a plan on a tablet, (3) fresh fruit on a wooden board. |
| svc-3-*.jpg | 같은 크기 | 같은 크기 | 서비스 03 근력 | (1) kettlebell swing, (2) sled push on turf, (3) chalked hands gripping a barbell. |
| svc-4-*.jpg | 같은 크기 | 같은 크기 | 서비스 04 요가 | (1) warrior pose at sunrise in a studio, (2) group stretching class, (3) close-up of hands in a mudra on a mat. |
| svc-5-*.jpg | 같은 크기 | 같은 크기 | 서비스 05 기록 | (1) smartwatch showing heart-rate graph, (2) coach and client reviewing progress on a phone, (3) body-composition printout. |
| trainer-1.jpg | 437×566 | 874×1132 | 트레이너 1 | Studio portrait of a Korean female strength coach, long straight hair, black long-sleeve crop top, plain off-white background, soft front light, confident calm expression, 3:4, head in the upper third. |
| trainer-2.jpg | 437×566 | 874×1132 | 트레이너 2 | Korean male personal trainer with short hair and cycling helmet pushed back, sleeveless black top, tattooed arm, pastel pink-blue sunset sky background, 3:4. |
| trainer-3.jpg | 437×566 | 874×1132 | 트레이너 3 | Korean female yoga coach, arms raised overhead, lime-green turtleneck top, warm yellow wall background, 3:4. |
| trainer-1b / 2b / 3b.jpg | 200×211 | 400×422 | 호버 시 소형 사진 | 위 각 트레이너의 다른 컷 — 수업 중 옆모습, 미소, 근접. |
| why.jpg | 571×739 | 1142×1478 | Why 중앙 | Full-body shot of a shirtless Korean male athlete standing in a gym holding a shaker bottle, overhead panel lights, a strong orange floor light behind his legs, 3:4, subject centred. |
| plan-1.jpg | 373×246 | 746×492 | 스타터 카드 | Dark matte membership card mock-up, subtle olive-green blurred glow in the upper right, white "PULSEFIT" wordmark top-right with a small "BASIC" badge, NFC wave icon bottom-left, gear-shaped chip bottom-right, no other text. |
| plan-2.jpg | 373×246 | 746×492 | 프로그레스 카드 | 같은 구도, 글로우는 주황색, 배지 "PLATINUM". |
| plan-3.jpg | 373×246 | 746×492 | 커밋 카드 | 같은 구도, 글로우는 골드, 배지 "GOLD+". |
| review-1.jpg | 381×413 | 762×826 | 후기 1 | Korean woman with braided hair holding a barbell behind her neck, red laser-light gym backdrop, 1:1 크롭 가능하게 정사각으로. |
| review-2.jpg | 381×413 | 762×826 | 후기 2 | Korean man in a grey tank top wrapping his hand, dark gym, 1:1. |
| review-3.jpg | 381×413 | 762×826 | 후기 3 | Korean woman resting after a class, towel on shoulder, warm light, 1:1. |
| avatar-1 / 2 / 3.jpg | 55×55 | 220×220 | 후기 아바타 | 위 세 사람의 얼굴 근접 정사각. |
| cta-bg.jpg | 1360×512 | 2720×1024 | 앱 배너 배경 | Abstract vertical brush strokes in orange to golden yellow, painterly, soft blur, no objects, 21:9. |
| app.png | 511×620 | 1022×1240 | 앱 목업 (투명 PNG) | Two overlapping smartphone mock-ups at a slight angle showing a dark fitness app: a trainer photo card on the left phone, a class schedule list on the right phone, transparent background. |

## 설치 후 확인
- `bash tools/ref-clone/verify_template.sh fitness-a` 로 깨진 이미지 0 확인 → 썸네일 재생성.
