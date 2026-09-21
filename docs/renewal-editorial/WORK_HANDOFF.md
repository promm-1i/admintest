# NOVERIQ `/renewal-editorial` 작업 인수인계 및 오류 회고

작성일: 2026-09-20  
저장소: `C:\web-project\mintcl-netlify-spa`  
로컬 주소: `http://127.0.0.1:4179/renewal-editorial`  
기준 원본: `https://spot.wooribank.com/pot/Dream?withyou=bp`

## 1. 이 문서의 목적

이 문서는 `/renewal-editorial` 작업에서 지금까지 구현한 내용, 원본 실측 자료, 생성한 페이지와 파일, 현재 검증 결과, 남은 차이, 잘못 진행하거나 잘못 보고한 내용을 한곳에 정리한 인수인계 문서다.

이 문서에서 사용하는 상태 표현은 다음과 같다.

- `확인`: 현재 코드와 실행 결과로 직접 확인한 내용
- `표본 일치`: 선택한 요소 또는 진행 지점에서는 차이가 없지만 전수 일치를 뜻하지 않음
- `미확인`: 아직 전수 검사하지 않은 내용
- `의도적 차이`: NOVERIQ 브랜드 적용이나 임시 이미지 사용처럼 사용자가 허용한 차이

현재 결과를 `100% 동일 구현` 또는 `완료`로 판정하면 안 된다. 원본 전체 요소와 모든 모션 프레임을 전수 검사하지 않았고, 이미지 생성·캡처도 보류 상태다.

## 2. 사용자 요구사항

작업 중 확인된 핵심 요구사항은 다음과 같다.

1. 임의로 새 디자인을 만들지 않는다.
2. 기준 사이트의 실제 소스, 레이아웃, 폰트, 크기, 간격과 동작을 확인한 뒤 구현한다.
3. 메인 한 페이지로 끝내지 않고 확장 가능한 다수의 서브페이지를 만든다.
4. 정적인 배치뿐 아니라 메뉴, hover, click, keyboard, touch, 슬라이드, sticky, pin, 패럴랙스와 스크롤 애니메이션을 포함한다.
5. 데스크톱, 태블릿, 모바일을 모두 구현한다.
6. 이미지 생성과 이미지 프롬프트 작업은 마지막 단계에 진행한다.
7. 이미지가 들어갈 영역은 크기, 비율, crop과 모션을 먼저 구현하고 임시 이미지로 둔다.
8. NOVERIQ의 실제 데이터, 템플릿, 포트폴리오, 문의, 공지와 FAQ 기능을 보존한다.
9. AI 문체가 드러나는 추상 문구, `AAA가 아니라 BBB입니다`, `결국 BBB입니다`, `핵심` 같은 반복 표현을 사용하지 않는다.
10. 사용자가 요청하기 전에는 커밋하거나 푸시하지 않는다.

## 3. 현재 구현 구조

### 3.1 라우팅

`src/App.tsx`에 다음 lazy route가 추가됐다.

```tsx
const RenewalEditorial = lazy(() => import("@/pages/RenewalEditorial"));
<Route path="/renewal-editorial/*" element={<RenewalEditorial />} />
```

실제 화면과 하위 라우팅은 `src/pages/RenewalEditorial.tsx`의 `RouteContent`에서 처리한다.

### 3.2 메인페이지 구간

| 순서 | 구현 구간 | 기준 원본 구간 | 현재 구현 내용 |
|---:|---|---|---|
| 1 | 헤더 | `header.header` | 데스크톱 GNB, 메가메뉴, 제작 문의, 언어, 모바일 메뉴 |
| 2 | 첫 화면 | `.greeting` | 전체 화면 미디어, 전환 문구, PAUSE/PLAY |
| 3 | 소개 | `.first-intro` | 큰 제목, 링크, 떠 있는 이미지 영역과 광원 |
| 4 | 이야기 3개 | `.first-stories` | 진입 시 높이 축소, 텍스트 이동, 이미지 3D 변환 |
| 5 | 지금 우리는 | `.now` | 150vh 트랙, 100vh sticky, 배경 확대 |
| 6 | 가치 카드 | `.now-value` | 세로 카드 3개, 순차 등장 |
| 7 | 소식 | `.latest` | 선형 목록 4개, hover 색상 전환 |
| 8 | 미래·문의 | `.tomorrow`, `.recruit` | 큰 제목, 중앙 문구, 카드 3개, 문의 영역 |
| 9 | 푸터 | `footer.footer` | TOP, 5열 메뉴, 연락처와 채널 링크 |

### 3.3 구현된 경로

고정 경로 22개를 QA 대상으로 사용한다.

#### 메인

- `/renewal-editorial`

#### 홈페이지 제작

- `/renewal-editorial/website/process`
- `/renewal-editorial/website/price`
- `/renewal-editorial/website/features`
- `/renewal-editorial/website/maintenance`

#### 기술력

- `/renewal-editorial/services/custom`
- `/renewal-editorial/services/admin-system`
- `/renewal-editorial/services/inquiry-reservation`
- `/renewal-editorial/services/search-filter`
- `/renewal-editorial/services/content-management`
- `/renewal-editorial/services/database-api`
- `/renewal-editorial/services/responsive`
- `/renewal-editorial/services/seo`

#### 디자인과 포트폴리오

- `/renewal-editorial/web-solutions`
- `/renewal-editorial/templates`
- `/renewal-editorial/samples`
- `/renewal-editorial/samples/corporate-q-template`
- `/renewal-editorial/samples/corporate-r-template`
- `/renewal-editorial/samples/corporate-s-template`
- `/renewal-editorial/samples/:slug` 동적 상세 경로 지원

#### 고객센터

- `/renewal-editorial/contact`
- `/renewal-editorial/notices`
- `/renewal-editorial/faq`
- `/renewal-editorial/notices/:id` 동적 상세 경로 지원

## 4. 폰트와 타이포그래피

원본에서 사용한 Wooridaum과 Pretendard 파일을 로컬 자산으로 등록했다.

### Wooridaum

- `public/fonts/woori/Wooridaum-Light.woff2`
- `public/fonts/woori/Wooridaum-Regular.woff2`
- `public/fonts/woori/Wooridaum-Bold.woff2`

### Pretendard

- `public/fonts/woori/Pretendard-Light.subset.woff2`
- `public/fonts/woori/Pretendard-Regular.subset.woff2`
- `public/fonts/woori/Pretendard-Medium.subset.woff2`
- `public/fonts/woori/Pretendard-SemiBold.subset.woff2`
- `public/fonts/woori/Pretendard-Bold.subset.woff2`

대표 요소 비교에 포함한 속성은 `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`이다.

현재 확인 결과는 메인페이지의 대응 요소 60개에 대한 `표본 일치`다. 모든 텍스트 노드와 모든 가상 요소를 전수 확인한 결과가 아니다.

## 5. 반응형과 실측값

최신 QA 결과의 메인 문서 높이는 다음과 같다.

| 검수 창 | 원본 높이 | 로컬 높이 | 차이 | 원본 가로 스크롤 | 로컬 가로 스크롤 |
|---|---:|---:|---:|---:|---:|
| 1440×900 | 9,630px | 9,630px | 0px | 0 | 0 |
| 768×900 | 10,174px | 10,175px | 1px | 0 | 0 |
| 390×844 | 10,308px | 10,309px | 1px | 0 | 0 |

관련 상세 기록:

- `docs/renewal-editorial/reference-measurements.md`
- `docs/renewal-editorial/layout-spec.md`
- `docs/renewal-editorial/qa/source-report.json`
- `docs/renewal-editorial/qa/report.json`

주의: `reference-measurements.md`와 `layout-spec.md`에는 이전 측정 당시의 9,623px 기록이 남아 있고, 최신 자동 QA는 9,630px을 기록했다. 현재 상태를 판단할 때는 최신 `source-report.json`과 `report.json`을 우선한다. 이 7px 기록 차이의 발생 시점과 원인은 별도로 정리하지 않았다.

## 6. 구현한 모션과 상호작용

### 6.1 첫 화면

- 최초 문구 대기 3초
- fade 전환 1초
- 이후 전환 시작 간격 4초
- 두 번째 문구 opacity와 scale 전환 2초
- PAUSE/PLAY 버튼의 `aria-pressed` 상태
- 정지 시 영상 scale과 dim 변화
- 첫 화면 이탈 시 영상 자동 정지
- 사용자가 직접 정지한 상태는 재진입 시 유지

현재 영상 파일은 연결하지 않았고 임시 이미지가 poster로 표시된다.

### 6.2 소개와 이야기 카드

- IntersectionObserver 진입 기준 50%
- 카드 높이 600px에서 데스크톱 320px로 전환
- 높이 전환 2초
- 연도, 제목과 설명의 Y 이동
- 이미지 scale 1.5와 rotateX 45도에서 기본값으로 전환

### 6.3 지금 우리는

- 150vh 트랙
- 100vh sticky 구간
- 이미지 opacity 0→1
- scale .25→1
- step과 title 지연 등장
- 상·하단 edge 장식

### 6.4 가치 카드

- IntersectionObserver 20% 기준
- opacity, scale, rotateX와 translateY 변화
- 카드별 .2초, .4초, .6초 지연

### 6.5 미래와 문의

- 1024px 이상에서만 observer 모션 적용
- 큰 제목 opacity와 blur 변화
- 중앙 문구 opacity, blur와 scale 복원
- 카드 비율과 간격 전환
- 문의 영역 opacity와 translateY 복원
- 1023px 이하에서는 정적 세로 카드 흐름

### 6.6 메뉴

- 데스크톱 hover와 focus 메가메뉴
- 모바일 버튼과 `details` 하위 메뉴
- Escape 키로 데스크톱 메뉴 닫기
- 메뉴 버튼에서 하위 메뉴로 포인터를 이동할 때 열린 상태 유지
- 메가메뉴 아래로 완전히 벗어날 때 닫기

메뉴 이동 중 사라지는 문제는 `Header`에 열린 메뉴 상태를 두고 헤더 전체의 `pointerleave`에서만 닫도록 수정했다.

## 7. 이미지 상태

### 7.1 현재 임시 이미지 슬롯

다음 슬롯은 모두 `public/renewal-editorial/image-placeholder.svg`를 표시한다.

- `hero`
- `intro`
- `stories[0..2]`
- `now`
- `values[0..2]`
- `tomorrow[0..2]`
- `subpage`

슬롯은 `src/pages/RenewalEditorial.tsx` 상단의 `MEDIA_SLOTS`에 모아뒀다. 최종 이미지나 화면 캡처가 준비되면 슬롯별 경로만 교체한다.

권장 파일 경로와 용도는 `docs/renewal-editorial/image-slots.md`에 적혀 있다.

### 7.2 임시 이미지로 바꾸지 않은 영역

- 템플릿 목록
- 포트폴리오 목록
- 포트폴리오 상세

이 영역은 실제 상품과 작업 사례의 미리보기이므로 기존 데이터를 유지했다.

### 7.3 보류 작업

- 이미지 프롬프트 최종 확정
- 이미지 생성
- 실제 사이트 화면 캡처
- 슬롯별 최종 파일 연결
- 이미지 crop과 `object-position`의 최종 실물 검수

## 8. 현재 검증 결과

### 8.1 22개 경로 × 3해상도

2026-09-20 현재 코드로 `node tools/ref-clone/qa_renewal_editorial.mjs`를 다시 실행했다.

- 검사 화면: 66개
- HTTP 오류: 0
- 깨진 이미지: 0
- 가로 스크롤: 0
- 콘솔 오류: 0
- 실패: 0

통과한 자동 상호작용:

- 데스크톱 메가메뉴 열기
- 모바일 메뉴 열기
- 모바일 하위 메뉴 열기
- FAQ 열기
- PAUSE/PLAY 전환
- 모바일 video 요소 존재
- 모바일 미래 구간의 정적 상태
- 지금 우리는 구간 활성화

이 검사는 각 서브페이지가 원본 서브페이지와 픽셀 단위로 같다는 의미가 아니다. 페이지 응답, 오버플로, 깨진 이미지, 콘솔 오류와 지정한 상호작용을 확인한 결과다.

### 8.2 메인 정적 표본 비교

`node tools/ref-clone/audit_woori_parity.mjs` 결과:

- 1440: 대응 요소 60개에서 차이 0
- 768: 대응 요소 60개에서 차이 0
- 390: 대응 요소 60개에서 차이 0

비교 항목:

- x, y, width, height
- display, position, overflow
- opacity, transform, filter
- 폰트, 크기, 굵기, 행간, 자간, 정렬
- margin, padding, gap
- border-radius, 배경색과 글자색

이 결과는 선택한 60개 대응 요소의 표본 검사다. DOM 전체와 모든 가상 요소의 전수검사가 아니다.

### 8.3 메인 모션 표본 비교

`node tools/ref-clone/audit_woori_motion.mjs` 결과:

- 1440의 0%, 25%, 50%, 75%, 100%: 차이 0
- 768의 0%, 25%, 50%, 75%, 100%: 차이 0
- 390의 0%, 25%, 50%, 75%, 100%: 차이 0
- 총 15개 비교 지점에서 차이 0

이 결과는 5개 진행률 지점의 표본 검사다. 애니메이션의 모든 프레임, 실제 휠 입력량과 감속 곡선 전수검사가 아니다.

### 8.4 화면 이미지 유사도

원본과 로컬의 전체 페이지 PNG를 같은 폭으로 축소한 뒤 SSIM을 계산한 값:

| 폭 | SSIM |
|---:|---:|
| 1440 | 86.51% |
| 768 | 87.48% |
| 390 | 85.37% |
| 평균 | 86.45% |

SSIM은 임시 이미지, 로고, 문구와 링크 차이까지 포함한다. 흰색 배경 면적의 영향을 받으므로 이 값을 사이트 완성도나 전수 동일률로 사용하면 안 된다.

### 8.5 코드 검사

- `npx vite build`: 통과
- `npx oxlint src/pages/RenewalEditorial.tsx`: 통과
- `npx 21st review src/pages/RenewalEditorial.tsx --json`: 오류·경고·제안 0
- `git diff --check`: 통과
- `npx tsc -b --pretty false`: 실패

타입검사 실패 위치:

```text
src/components/site/PremiumCaseStudy.tsx(363,26): Cannot find name 'CheckCircle2'
src/components/site/PremiumCaseStudy.tsx(400,24): Cannot find name 'CheckCircle2'
```

`PremiumCaseStudy.tsx`는 이 리뉴얼 작업 전에 이미 수정된 사용자 작업 파일이며, 현재 요청 범위에서 수정하지 않았다. 저장소 전체 타입검사는 통과 상태가 아니다.

## 9. 현재 남아 있는 차이와 미확인 항목

### 9.1 의도적 차이

- 우리은행 로고 대신 NOVERIQ 로고
- 우리은행 문구 대신 NOVERIQ 문구
- 우리은행 메뉴명 대신 NOVERIQ 메뉴명
- 우리은행 연락처와 링크 대신 NOVERIQ 연락처와 링크
- 우리은행 사진과 영상 대신 임시 이미지
- NOVERIQ 템플릿, 포트폴리오, 공지와 FAQ 데이터 유지

### 9.2 아직 전수 확인하지 않은 항목

- DOM 전체 요소와 모든 `::before`, `::after`의 좌표·스타일
- 모든 스크롤 픽셀의 중간 프레임
- 실제 휠 입력량별 이동 거리와 감속 시간
- 모든 duration, delay와 easing의 프레임 단위 비교
- 모든 hover 진입 경로와 이탈 경로
- 모든 키보드 포커스 순서와 조작
- 모든 touch와 swipe 동작
- 뒤로가기, 앞으로가기와 모든 URL hash 조합
- 원본의 모든 서브페이지와 NOVERIQ 각 서브페이지의 개별 대응표
- 서브페이지별 원본 좌표·모션·기능 픽셀 비교
- Safari, Firefox와 실제 모바일 브라우저 렌더링

### 9.3 현재 판정

- 66개 화면의 기본 실행 검수: 통과
- 메인 정적 표본 60개: 차이 0
- 메인 모션 표본 15개 지점: 차이 0
- 전체 페이지 시각 유사도 평균: 86.45%
- 전수 동일 구현: 미확인
- 최종 이미지: 미적용
- 전체 타입체크: 실패
- 커밋·푸시: 하지 않음

## 10. 작업 중 발생한 실수

### 실수 1. 원본 확인 전에 임의 디자인을 먼저 만들었다

초기에 사용자가 보낸 기준 사이트의 실제 소스와 하위 페이지를 충분히 조사하지 않고, 여러 레퍼런스의 분위기를 임의로 섞은 에디토리얼 디자인을 만들었다. 사용자가 요구한 역할은 새 디자인 제안이 아니라 원본 재현이었는데 이를 지키지 않았다.

영향:

- 레퍼런스의 특징이 화면에 드러나지 않았다.
- 글꼴과 화면 구조가 원본과 달랐다.
- 사용자가 같은 요구를 여러 번 반복해야 했다.

### 실수 2. 한 페이지 랜딩 구조로 범위를 축소했다

사용자는 별도 서브페이지를 많이 만들고 계속 확장할 수 있는 구조를 원했다. 그런데 한때 `/renewal-editorial` 한 페이지의 8개 구간으로만 구성하고 임의로 만든 하위 페이지 구조를 폐기하겠다고 잘못 해석했다.

영향:

- 사용자의 사이트 확장 계획과 반대되는 방향을 제안했다.
- 메인 재현과 서브페이지 구축을 별개의 요구로 보지 못했다.

### 실수 3. AI 문체와 임의 카피를 사용했다

원본 문구의 구체성과 리듬을 가져오기보다 추상적인 설명, `핵심`, 대비형 문장과 결론형 문장을 사용했다. 사용자가 금지한 `AAA가 아니라 BBB입니다`, `결국 BBB입니다`와 유사한 문장 구조가 포함됐다.

영향:

- 사이트가 실제 기업 사이트보다 AI가 만든 소개 페이지처럼 보였다.
- 디자인과 카피가 함께 인공적으로 느껴졌다.

### 실수 4. 한글 표시 문제를 레이아웃 문제로 잘못 판단했다

사용자가 한글이 이상하다고 지적했을 때 처음에는 잘림이나 배치 문제로 해석했다. 사용자가 지적한 핵심은 한글 표시와 폰트의 이상이었는데 원인을 정확히 분리하지 못했다.

영향:

- 문제 진단이 늦어졌다.
- 사용자가 같은 문제를 다시 설명해야 했다.

### 실수 5. 표본 검사를 전수 동일처럼 보고했다

대표 요소 60개와 스크롤 진행률 15개 지점에서 차이가 없다는 결과를 사이트 전체가 같은 것처럼 보고했다. 이 검사는 표본 검사이며 모든 요소와 모든 프레임을 확인한 것이 아니다.

영향:

- `100%`, `동일 구현`이라는 표현의 신뢰도가 떨어졌다.
- 실제로 남아 있던 메뉴 hover 문제가 뒤늦게 발견됐다.
- 사용자가 현재 일치율을 다시 확인해야 했다.

### 실수 6. 시각 유사도와 구조 일치를 구분하지 않았다

좌표와 계산 스타일이 같다는 것과 전체 화면이 시각적으로 같다는 것을 구분하지 않았다. 임시 이미지, 로고와 문구가 다른 상태에서는 픽셀 화면이 같을 수 없다.

영향:

- 정적 표본 100%와 전체 화면 유사도 86.45%가 서로 모순되는 보고처럼 보였다.
- 사용자가 무엇이 실제로 같은지 다시 질문해야 했다.

### 실수 7. 메가메뉴의 실제 포인터 이동 경로를 검사하지 않았다

기존 자동 검사는 메뉴 항목 위에 hover했을 때 드롭다운이 보이는지만 확인했다. 버튼에서 아래 하위 메뉴까지 커서를 실제로 이동하는 경로는 검사하지 않았다. 버튼 hover 영역과 드롭다운 사이에서 상태가 끊겼다.

수정:

- 열린 데스크톱 메뉴를 React state로 관리
- 헤더 내부에서는 열린 상태 유지
- 드롭다운 아래로 완전히 벗어나면 닫기
- 대각선으로 첫 번째 하위 링크까지 이동하는 Playwright 검증 실시

### 실수 8. 완료 보고 전에 남은 차이를 충분히 분리하지 않았다

이미지 생성·캡처, 전체 타입체크 실패, 서브페이지 원본 대응 미검수와 모든 모션 프레임 미검수를 남겨두고도 완료에 가까운 표현을 사용했다.

영향:

- 구현 완료, QA 통과와 원본 완전 일치의 경계가 흐려졌다.
- 이후 인수인계에서 다시 검증해야 하는 범위가 불명확해졌다.

### 실수 9. 측정 문서의 이전 값과 최신 값을 정리하지 않았다

기존 측정 문서에는 1440 문서 높이 9,623px이 남아 있고 최신 QA는 9,630px을 기록한다. 기록 생성 시점이 다른데 우선순위를 명시하지 않았다.

영향:

- 같은 폴더의 문서끼리 수치가 충돌한다.
- 현재 기준값을 다시 확인해야 한다.

## 11. 실수의 원인

1. 원본 재현 작업에서 스스로 디자인 판단을 추가했다.
2. 원본 사이트 전체를 먼저 목록화하지 않고 구현부터 시작했다.
3. 자동 검사 통과 범위를 실제 검사 범위보다 넓게 해석했다.
4. 정적 배치, 모션, 기능, 콘텐츠와 이미지를 별도 판정하지 않았다.
5. 사용자가 말한 `100%`를 전수검사 기준이 아니라 주요 특징 재현 기준으로 낮춰 해석했다.
6. 완료 보고에서 확인한 사실과 추정한 내용을 분리하지 않았다.

## 12. 이후 작업자가 지켜야 할 기준

### 12.1 구현 전

1. 허용된 차이 목록을 먼저 고정한다.
2. 원본 메인과 모든 대상 서브페이지 URL을 목록화한다.
3. 페이지별 DOM, CSS, JS, 라이브러리와 네트워크 자산을 조사한다.
4. 페이지별 섹션, 기능, 상태와 링크 매니페스트를 만든다.
5. 원본 대응표가 없는 페이지는 구현 완료로 판단하지 않는다.

### 12.2 정적 검수

1. 1440×900, 768×900, 390×844를 모두 검사한다.
2. 모든 주요 요소의 x, y, width, height를 비교한다.
3. 모든 텍스트의 font-family, size, weight, line-height와 letter-spacing을 비교한다.
4. 모든 이미지의 비율, crop과 object-position을 비교한다.
5. `::before`, `::after`와 fixed/sticky 요소를 포함한다.
6. 표본 검사 결과는 반드시 `표본`이라고 적는다.

### 12.3 모션 검수

1. 클래스 이름이나 라이브러리 이름이 아니라 최종 렌더링 동작을 비교한다.
2. 시작점, 종료점, duration, delay와 easing을 측정한다.
3. 스크롤 구간은 5개 지점만 보지 말고 최소 1% 단위 또는 프레임 캡처로 비교한다.
4. 휠 입력량, 이동 거리와 감속 시간을 별도로 측정한다.
5. sticky/pin 진입과 해제 위치를 확인한다.
6. desktop, tablet, mobile에서 각각 확인한다.

### 12.4 기능 검수

1. 메뉴를 단순 hover만 하지 말고 실제 포인터 이동 경로로 검사한다.
2. 하위 메뉴의 첫 항목, 중간 항목, 마지막 항목까지 이동한다.
3. 메뉴 밖 위·아래·좌·우 이탈을 검사한다.
4. Tab, Shift+Tab, Enter, Space와 Escape를 검사한다.
5. touch, swipe, 뒤로가기와 hash 복원을 검사한다.
6. 모든 내부 링크의 목적지와 404 여부를 확인한다.

### 12.5 보고 기준

- 확인하지 않은 항목이 하나라도 있으면 `100%`라고 쓰지 않는다.
- 표본 일치는 전체 일치로 바꾸어 표현하지 않는다.
- 빌드 성공과 타입체크 성공을 구분한다.
- 메인 검수와 서브페이지 검수를 구분한다.
- 의도적 차이와 구현 누락을 구분한다.
- 남은 차이를 숨기지 않는다.

## 13. 다음 작업 순서

1. 원본 전체 사이트맵과 NOVERIQ 목표 사이트맵을 1:1 대응시킨다.
2. 각 NOVERIQ 서브페이지가 참조할 우리은행 원본 서브페이지를 고정한다.
3. 서브페이지별 정적 좌표와 기능을 다시 실측한다.
4. 메인 DOM 전체와 가상 요소 전수 비교 도구를 만든다.
5. 스크롤 1% 단위 또는 영상 프레임 기반 모션 비교를 추가한다.
6. 메뉴의 모든 포인터·키보드 경로를 자동화한다.
7. 이미지 프롬프트를 확정한다.
8. 이미지를 한 장씩 생성하거나 실제 화면을 캡처한다.
9. `MEDIA_SLOTS`에 최종 파일을 연결한다.
10. crop, object-position과 모션 상태를 다시 검수한다.
11. 저장소 전체 타입 오류를 작업 범위 소유자와 확인한다.
12. 모든 검수 결과가 끝난 뒤에만 완료 여부를 판단한다.

## 14. 관련 파일

### 구현

- `src/App.tsx` — `/renewal-editorial/*` 라우트 등록
- `src/pages/RenewalEditorial.tsx` — 페이지, 데이터, 라우팅, 기능과 모션 상태
- `src/pages/RenewalEditorial.css` — 원본 대응 레이아웃, 반응형, 타이포그래피와 모션

### 이미지와 폰트

- `public/renewal-editorial/image-placeholder.svg` — 공통 임시 이미지
- `public/renewal-editorial/hero-edge.svg` — sticky 구간 edge 장식
- `public/fonts/woori/*` — Wooridaum과 Pretendard 로컬 폰트

### 사양과 기록

- `docs/renewal-editorial/reference-measurements.md`
- `docs/renewal-editorial/layout-spec.md`
- `docs/renewal-editorial/motion-spec.md`
- `docs/renewal-editorial/source-map.md`
- `docs/renewal-editorial/image-slots.md`
- `docs/renewal-editorial/validation-report.md`
- `docs/renewal-editorial/WORK_HANDOFF.md`

### QA 도구

- `tools/ref-clone/qa_renewal_editorial.mjs`
- `tools/ref-clone/audit_woori_parity.mjs`
- `tools/ref-clone/audit_woori_motion.mjs`
- `tools/ref-clone/measure_woori_hero.mjs`

### QA 결과

- `docs/renewal-editorial/qa/report.json`
- `docs/renewal-editorial/qa/source-report.json`
- `docs/renewal-editorial/qa/interactions.json`
- `docs/renewal-editorial/qa/style-parity.json`
- `docs/renewal-editorial/qa/motion-parity.json`
- `docs/renewal-editorial/qa/*.png`

## 15. Git 작업 경계

현재 작업 트리에는 이 작업 외의 사용자 변경 파일이 함께 있다. 아래 파일은 `/renewal-editorial` 작업 범위에서 수정하면 안 된다.

- `.21st/design.json`
- `src/components/site/PremiumCaseStudy.tsx`
- `tools/promo-cards/__pycache__/make_page_shots.cpython-311.pyc`
- `tools/promo-cards/make_page_shots.py`
- `tools/ref-clone/capture_premium_cases.mjs`

현재 `/renewal-editorial` 변경은 커밋하거나 푸시하지 않았다.

## 16. 재실행 명령

```powershell
cd C:\web-project\mintcl-netlify-spa

# 전체 22개 경로 × 3해상도
Remove-Item Env:QA_MAIN_ONLY -ErrorAction SilentlyContinue
node tools/ref-clone/qa_renewal_editorial.mjs

# 메인 정적 표본 비교
node tools/ref-clone/audit_woori_parity.mjs

# 메인 모션 표본 비교
node tools/ref-clone/audit_woori_motion.mjs

# 히어로 타이밍 측정
node tools/ref-clone/measure_woori_hero.mjs

# 코드 검사
npx oxlint src/pages/RenewalEditorial.tsx
npx 21st review src/pages/RenewalEditorial.tsx --json
npx vite build
npx tsc -b --pretty false
git diff --check
```

## 17. 최종 인수인계 문장

현재 `/renewal-editorial`은 우리은행 은행소개 메인의 주요 레이아웃과 모션을 NOVERIQ 데이터에 맞춰 구현했고, 22개 경로의 기본 실행 검수는 통과했다. 메인의 선택된 60개 정적 요소와 15개 모션 진행 지점에서는 차이가 발견되지 않았다. 이 결과는 표본 검사이며 전수 동일 구현을 증명하지 않는다. 브랜드, 문구, 링크와 이미지는 의도적으로 다르고, 이미지 슬롯은 임시 상태다. 전체 타입검사는 작업 범위 밖의 기존 오류로 실패한다. 서브페이지별 원본 대응 실측, DOM 전체 비교, 모든 모션 프레임과 입력 경로 검수가 남아 있으므로 현재 상태를 `100% 동일`, `완료`라고 보고하면 안 된다.

---

# 부록: 2026-09-20 2차 작업 기록

앞의 본문은 1차 작업자가 남긴 인수인계다. 그 뒤 진행한 내용을 아래에 덧붙인다. 본문과 어긋나는 항목은 이 부록이 우선한다.

## 한 일

1. **원본 서브페이지 수집** — `spot.wooribank.com` 은행소개 영역 하위 56개 코드를 수집하고 13쪽을 실측해 골격을 다섯 유형(A·A2·B·C·C2·D)으로 분류했다.
2. **NOVERIQ 경로별 기준 원본 고정** — 18개 경로마다 원본 한 쪽을 지정했다. `docs/renewal-editorial/subpage-spec.md` 참고.
3. **서브페이지 골격 교체** — 1차의 임의 디자인(`re-subvisual`, `re-centreville-*`, `re-postech-*`, `re-trinity-*`, `re-futures-*`)을 지우고 원본 골격으로 다시 짰다. CSS 죽은 규칙 540개를 걷어내 122KB → 91KB.
4. **새 검증 도구** — `tools/ref-clone/audit_woori_sub.mjs` 로 서브페이지를 원본과 대조한다. 54건(18경로 × 3해상도) 차이 0.
5. **기존 도구 결함 수정** — `audit_woori_parity.mjs` 의 고정 로직이 원본 쪽에만 적용돼 로컬은 첫 화면 전환이 계속 돌아가고 있었다. 두 쪽을 같은 값으로 고정하도록 고쳤다.
6. **누락 썸네일 생성** — `public/thumbs/hotel-e.jpg` 가 `samples.ts` 에만 있고 파일이 없어 목록에서 깨졌다. 기존 캡처 방식대로 만들었다.
7. **미리보기 설정** — `.claude/launch.json` 에 4179 포트 구성 `renewal` 을 추가했다. vite 가 기본으로 `localhost` 에만 바인딩해 검증 도구의 `127.0.0.1` 주소로는 붙지 않았다.

## 결과

| 검사 | 범위 | 결과 |
|---|---|---|
| 경로 실행 검수 | 66화면 | 실패 0 |
| 메인 정적 대조 | 61쌍 × 3해상도 | 차이 0 |
| 메인 모션 대조 | 15지점 | 차이 0 |
| 서브페이지 골격 대조 | 54건 | 차이 0 |

## 남은 것

- 이미지 슬롯 9종 임시 이미지. 프롬프트 확정과 생성.
- 저장소 전체 `tsc -b` 실패 (`PremiumCaseStudy.tsx` 의 `CheckCircle2` 미임포트, 작업 범위 밖).
- DOM 전수 비교, 스크롤 1% 단위 모션 비교, 포인터·키보드 전 경로 자동화.
- 원본 56쪽 중 43쪽은 골격 표본에 넣지 않았다.

## 판정

메인과 서브페이지 골격은 지정한 비교 항목에서 원본과 값이 같다. 전수 동일 구현은 아니다. 표본 범위와 비교하지 않은 항목은 위에 적힌 그대로다.
