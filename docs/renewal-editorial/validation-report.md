# NOVERIQ 우리은행 기반 구현 검수

검수일: 2026-09-20  
대상: `/renewal-editorial/*`

## 정적 비교

| 검수 창 | 원본 문서 높이 | 구현 문서 높이 | 차이 | 가로 스크롤 |
|---|---:|---:|---:|---:|
| 1440×900 | 9,630 | 9,630 | 0px | 0 |
| 768×900 | 10,174 | 10,175 | 1px | 0 |
| 390×844 | 10,308 | 10,309 | 1px | 0 |

세 해상도 모두 `header`, `greeting`, `first`, `now`, `now-value`, `latest`, `tomorrow`, `footer`의 y·height가 일치했다. 전체 문서 높이는 1440에서 0px, 768·390에서 1px 차이다.

직접 계산 스타일·렌더 박스 비교는 60개 대응 요소를 대상으로 실행했고 1440·768·390 모두 차이 0개였다. 스크롤 진행률 0·25·50·75·100%에서 상태 클래스, 좌표, opacity, transform, filter를 비교한 15개 조합도 차이 0개였다.

## 동작 확인

| 항목 | 결과 |
|---|---|
| 문구 자동 전환 | 최초 3초 대기, 1초 fade, 이후 전환 시작 간격 4초, 두 번째 문구 2초 scale·opacity 적용 |
| PAUSE/PLAY | `aria-pressed`, 영상 정지, scale 1→1.2, dim .5→.7 확인 |
| 화면 이탈 영상 | 히어로가 뷰포트 밖으로 나가면 자동 정지, 수동 PAUSE 상태는 유지 |
| 이야기 카드 | 스크롤 진입 후 600→320px, 2초 전환 종료 확인 |
| 이야기 내부 | 연도·제목·설명 Y 200→0, 이미지 scale 1.5·rotateX 45→기본값 확인 |
| 지금 우리는 | 150vh + 100vh sticky, scale .25→1, 텍스트 1/1.2초 지연, 1376px 초과에서 edge 40×20→80×40, 이하에서 40×20 유지 |
| 가치 카드 | 3장 .2/.4/.6초 순차 지연, 카드 안 제목·설명 상하 배치 적용 |
| 미래 구간 | 데스크톱 제목·문구·독립 카드 3장·광원·문의 전환 적용, 1023px 이하에서는 원본처럼 observer 클래스 미적용 |
| 모바일 첫 화면 | 원본의 장식 크기와 위치, 600px 이하 문서 이미지 비노출 적용 |
| 소식 목록 | 데스크톱 가로 배열과 모바일 `분류 | 제목·날짜` 배열 적용 |
| TOP·푸터 | 데스크톱 178px, 태블릿·모바일 54/55px TOP 구간과 원본형 하단 정보 배치 적용 |
| 데스크톱 메뉴 | hover/focus 메가메뉴 유지, pointer leave 시 닫힘 |
| 모바일 메뉴 | 버튼·details 구조 유지 |

22개 경로 × 3해상도, 총 66개 화면에서 HTTP 오류 0, 깨진 이미지 0, 가로 스크롤 0, 콘솔 오류 0을 확인했다. 데스크톱 메가메뉴, 모바일 메뉴·하위 메뉴, FAQ, PAUSE/PLAY, now 활성화도 통과했다.

## 코드 검사

- `npx oxlint src/pages/RenewalEditorial.tsx`: 통과
- `npx 21st review src/pages/RenewalEditorial.tsx --json`: 오류·경고·제안 0
- `npx vite build`: 통과
- `git diff --check`: 통과
- `node tools/ref-clone/qa_renewal_editorial.mjs`: 66개 화면, 실패 0
- `node tools/ref-clone/audit_woori_parity.mjs`: 3개 해상도, 차이 0
- `node tools/ref-clone/audit_woori_motion.mjs`: 15개 진행률 상태, 차이 0
- `node tools/ref-clone/measure_woori_hero.mjs`: 최초 3초·fade 1초·다음 전환 시작 4초 실측
- `npx tsc -b --pretty false`: 현재 작업 범위 밖의 기존 변경 파일 `src/components/site/PremiumCaseStudy.tsx`에서 `CheckCircle2` 미정의 2건으로 실패. 이번 작업 파일에서는 타입 오류가 보고되지 않았다.

## 남은 차이

- 우리은행 로고와 고유 문구는 복제하지 않고 NOVERIQ 문구·링크로 치환했다.
- 메인 히어로, 소개, 이야기, 지금 우리는, 가치, 미래와 일반 안내 서브페이지의 이미지 영역은 공통 임시 이미지로 표시했다. 이미지 생성 또는 실제 화면 캡처가 준비되면 [`image-slots.md`](./image-slots.md)에 적힌 슬롯별 경로만 교체하면 된다.
- 템플릿 목록과 포트폴리오 목록·상세의 실제 상품 미리보기는 임시 이미지 대상에서 제외했다.
- 원본이 사용하는 Wooridaum·Pretendard 파일은 로컬 자산으로 적용했다.

브랜드 콘텐츠와 임시 이미지가 다르므로 이미지 픽셀 단위 동일 판정은 하지 않는다. 레이아웃 치수와 모션 규칙은 위 검수 범위에서 원본 계산값과 일치한다. 최종 이미지 생성·캡처와 슬롯별 교체는 보류 상태다.

---

## 2026-09-20 2차 검증 (서브페이지 원본 대응 반영 후)

### 바뀐 것

- 서브페이지 골격을 원본 실측 구조로 교체했다. 이전 구현은 원본 확인 전에 만든 임의 디자인(`re-subvisual`, `re-centreville-*`, `re-postech-*`, `re-trinity-*`, `re-futures-*`) 위에 `!important` 로 덮어쓴 상태였다.
- 원본 골격 `page-info` + `hero.type-single` + `contents`/`section` + 카드·선형 목록 + 상세로 다시 짰다. 값은 `docs/renewal-editorial/subpage-spec.md` 에 기록했다.
- 죽은 규칙 540개를 걷어내 `RenewalEditorial.css` 가 122KB 에서 91KB 가 됐다.
- 새 도구 `tools/ref-clone/audit_woori_sub.mjs` 로 서브페이지를 원본과 대조한다.

### 결과

| 검사 | 범위 | 결과 |
|---|---|---|
| 경로 실행 검수 | 22경로 × 3해상도 = 66화면 | 실패 0, 가로 스크롤 0, 깨진 이미지 0, 콘솔 오류 0 |
| 메인 정적 대조 | 61쌍 × 3해상도 | 차이 0 |
| 메인 모션 대조 | 5지점 × 3해상도 = 15 | 차이 0 |
| 서브페이지 골격 대조 | 18경로 × 3해상도 = 54 | 차이 0 |
| 빌드 | `npx vite build` | 통과 |
| 페이지 타입검사 | `tsc --noEmit -p tsconfig.app.json` (RenewalEditorial) | 오류 0 |

메인 문서 높이는 1440 에서 9,630 으로 원본과 같고, 768 과 390 은 각각 1px 크다.

### 이전 보고에서 바로잡은 것

1. **메인 1440 "차이 0" 은 당시 도구로는 재현되지 않았다.** `audit_woori_parity.mjs` 의 고정 로직이 원본 선택자(`.greeting-swiper .swiper-slide`)에만 걸려 있어 로컬 쪽은 첫 화면 전환이 계속 돌아갔다. 같은 값으로 두 쪽을 모두 고정하도록 고친 뒤 다시 0이 됐다. 지금의 0은 "두 쪽을 같은 정지 상태로 세운 뒤 비교한 값"이며, 전환 중간 프레임이 같다는 뜻이 아니다.
2. **문서 높이 9,623 과 9,630 은 9,630 이 맞다.** `reference-measurements.md` 와 `layout-spec.md` 의 9,623 은 옛 기록이다.
3. **서브페이지는 원본 대응이 없는 상태였다.** 지금은 경로마다 기준 원본을 하나씩 고정했다.

### 아직 남은 것

- 이미지 슬롯 9종은 임시 이미지다. 프롬프트 확정과 생성이 남았다.
- 저장소 전체 `tsc -b` 는 `src/components/site/PremiumCaseStudy.tsx` 의 `CheckCircle2` 미임포트로 실패한다. 이 작업 범위 밖 파일이라 건드리지 않았다.
- DOM 전수 비교, 스크롤 1% 단위 모션 비교, 모든 포인터·키보드 경로 자동화는 하지 않았다.
- 원본 서브페이지 56쪽 중 골격 분류에 쓴 것은 13쪽이다. 나머지는 표본에 넣지 않았다.

---

## 2026-09-21 추가 수정

작업 범위 밖이라 미뤄 뒀던 항목과 사용자가 지적한 버그를 처리했다.

### 1. 모바일 흰 화면 (프리미엄 사례 상세 10쪽)

`src/components/site/PremiumCaseStudy.tsx` 가 `CheckCircle2` 를 쓰면서 import 하지 않아 렌더링 중 `ReferenceError` 가 났다. 해당 컴포넌트를 쓰는 프리미엄 사례 상세 10개 경로가 전부 빈 화면이었다. 데스크톱에서도 같은 증상이며 모바일에서 먼저 발견됐다.

- 영향 경로: `/samples/` 아래 clinic-f, artist-a, rentcar-f, rentcar-g, estate-f, estate-g, wedding-a, corporate-i, corporate-q, corporate-s
- 조치: lucide-react import 에 `CheckCircle2` 추가
- 확인: 내부 링크 38개를 390 폭에서 전수 방문해 본문이 비어 있는 쪽 0. 저장소 전체 `tsc -b` 도 통과로 바뀌었다.

### 2. 등장 애니메이션에 갇힌 본문

`[data-reveal]` 은 `opacity:0` 으로 시작해 IntersectionObserver 가 `is-visible` 을 붙여야 보인다. 높이가 큰 섹션은 관찰자가 한 번도 보고하지 않고 지나가는 경우가 있어 본문이 계속 투명하게 남았다. 스크롤 위치가 요소를 지났으면 바로 보이게 하는 처리를 더했다.

### 3. 모션 대조 도구의 소수점 비교

`audit_woori_motion.mjs` 가 `opacity` 를 문자열로 비교해 `1` 과 `0.999963` 을 차이로 잡았다. 숫자로 읽히는 값은 0.005 까지 같은 값으로 본다.

### 4. 넥스하버 템플릿의 원본 브랜드 잔존

`public/templates/corporate-r/` 에 레퍼런스 기업명 "선광" 이 291개 파일 984곳 남아 있었다. 전부 "넥스하버" 로 바꿨고 CSS 클래스 `ci_sunkwang_img` 도 `ci_nexharbor_img` 로 맞췄다. 템플릿 안에 남은 원본 브랜드 문자열은 0이다.

### 5. 프리미엄 디자인 라벨을 업종 대분류로

`premiumLabel` 이 "기업 A"~"기업 N" 처럼 알파벳이라 목록에서 무슨 업종인지 알 수 없었다. 22개 프리미엄 디자인 전부 업종 대분류로 바꿨다. 대응표는 `docs/premium-label-map.md` 에 있다.

### 최종 검증

| 검사 | 결과 |
|---|---|
| `npx vite build` | 통과 |
| `npx tsc -b` (저장소 전체) | 통과 |
| 경로 실행 검수 66화면 | 실패 0 |
| 메인 정적 대조 61쌍 × 3해상도 | 차이 0 |
| 메인 모션 대조 15지점 | 차이 0 |
| 서브페이지 골격 대조 54건 | 차이 0 |
| 모바일 390 전수 방문 (메인 38 + 리뉴얼 26) | 빈 화면 0 |
