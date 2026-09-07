# dental-a (루미덴탈) 이미지 슬롯 · 생성 프롬프트

저장 위치: `public/templates/dental-a/assets/` — 아래 파일명 그대로 덮어쓰면 됩니다. 표시 크기의 2배(레티나)로 뽑아 주세요. 지금 들어 있는 것은 같은 크기의 임시 플레이스홀더입니다.

## 공통 톤
- 밝고 깨끗한 치과 · 자연광 + 부드러운 화이트 조명 · 아이보리/세이지 톤(#F2F5EF 배경과 어울리게) · 인물은 한국인 · 로고/글자 없음.
- 카메라: 35~50mm, 얕은 심도, 눈높이. 과한 HDR · 채도 금지. 치아는 자연스러운 흰색(형광 흰색 금지).
- 네거티브 공통: `text, watermark, logo, extra fingers, distorted face, distorted teeth, blurry, cartoon, oversaturated`

## 슬롯 표

| 파일 | 표시 크기 | 뽑을 크기 | 쓰이는 곳 | 프롬프트 |
|---|---|---|---|---|
| hero.jpg | 571×598 | 1142×1196 | 히어로 우측 큰 사진(블러 배경 + 가운데 폴라로이드 280×348 창으로 선명하게 보임) | Close-up of a smiling Korean woman in her 20s showing healthy white teeth, soft natural light, cream background, photorealistic, subject centred (가운데 280×348 영역에 입·치아가 오도록). |
| about-1.jpg | 168×169 | 336×338 | About 문장 좌측 회전(-16°) 사진 | Dentist's gloved hands holding a dental mirror over a patient's mouth, bright clinic, 1:1. |
| about-2.jpg | 168×169 | 336×338 | About 문장 우측 회전(16°) 사진 | Korean woman laughing with clear aligner in hand, white background, 1:1. |
| svc-1.jpg | 265×329 | 530×658 | 서비스 01 일반 진료 | Dental model of teeth held in gloved hands, soft pink and white, 4:5. |
| svc-2.jpg | 265×329 | 530×658 | 서비스 02 심미 치료 | Korean woman holding a clear aligner up to her smile, cream background, 4:5. |
| svc-3.jpg | 265×329 | 530×658 | 서비스 03 임플란트 | Woman applying a whitening tray, close-up on smile, 4:5. |
| svc-4.jpg | 265×329 | 530×658 | 서비스 04 응급 진료 | Dentist in white coat examining a patient in a bright treatment room, 4:5. |
| svc-5.jpg | 265×329 | 530×658 | 서비스 05 치아 미백(모바일에서만 노출) | Dental models and whitening kit on a white table, 4:5. |
| why-1 ~ why-5.jpg | 549×524 | 1098×1048 | Why 항목별 우측 사진(항목 열 때 교체) | (1) Korean female dentist with dental mirror in bright clinic, (2) team of three dentists in white coats, (3) calm waiting lounge with wood and plants, (4) dentist explaining a treatment plan on a tablet, (5) dentist on the phone at reception. 거의 정사각. |
| before.jpg / after.jpg | 1440×900 | 2880×1800 | 치료 전/후 비교 슬라이더(전체 폭) | 같은 구도의 클로즈업 미소 두 장. before: slightly yellow, uneven teeth. after: bright, even smile. 얼굴 위치·조명 동일하게. |
| emergency.jpg | 930×538 | 1860×1076 | 응급 진료 | Dentist in mask treating a patient lying in the chair, overhead light, 16:9, 인물은 오른쪽. |
| tech-1.jpg | 536×358 | 1072×716 | 기술 01 디지털 진단 | Dentist with mask looking at a 3D dental scan on a monitor, 3:2. |
| tech-2.jpg | 536×358 | 1072×716 | 기술 02 치료 계획 | Monitor with a 3D jaw model in a treatment room, 3:2. |
| tech-3.jpg | 536×358 | 1072×716 | 기술 03 환자 설명 | Intraoral camera and scanner arm in a modern clinic, 3:2. |
| journey.jpg | 645×442 | 1290×884 | 진료 과정 상단 사진 | Male dentist with glasses treating a smiling patient, warm light, 3:2. |
| doc-1.jpg / doc-2.jpg / doc-4.jpg | 234×256 | 468×512 | 의료진 소형 카드 | 각각 한국인 치과의사 상반신 스튜디오 포트레이트(여·남·여), 흰 가운, 아이보리 배경, 미소, 얼굴이 위쪽 1/3. |
| doc-3.jpg | 358×368 | 716×736 | 의료진 큰 카드(대표원장) | Korean female dentist in white coat, arms crossed, warm smile, beige background, 1:1. |
| stories.jpg | 540×359 | 1080×718 | 환자 이야기 | Dentist and patient laughing together in the treatment chair, 3:2. |
| patient-1 ~ 3.jpg | 218×208 | 436×416 | 후기 환자 사진 | 후기별 환자(여·여·남) 자연광 미소 포트레이트, 1:1 크롭 가능하게. |
| drsmall-1 ~ 3.jpg | 181×168 | 362×336 | 후기 담당 의사 | 담당 의사(여·여·남) 흰 가운 상반신, 1:1 크롭 가능하게. |
| insight-1.jpg | 265×178 | 530×356 | 인사이트 1 | Dental models on a shelf, 3:2. |
| insight-2.jpg | 265×352 | 530×704 | 인사이트 2 (세로) | Dentist examining a child patient, 3:4. |
| insight-3.jpg | 265×178 | 530×356 | 인사이트 3 | Gloved hands holding dental tools over a model, 3:2. |
| insight-4.jpg | 265×290 | 530×580 | 인사이트 4 | Patient in chair receiving whitening treatment, 4:5 정도. |
| clinic.jpg | 644×318 | 1288×636 | 오시는 길 건물 사진 | Exterior of a modern low-rise clinic building with trees, daylight, 2:1. |

## 그 밖의 파일
- `favicon.svg` — 치아 아이콘(교체 시 같은 이름).
- `og.jpg` — 1200×630 공유 썸네일(사진 교체 후 1440 캡처로 다시 만드세요).
