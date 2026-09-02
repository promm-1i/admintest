# A라인 템플릿 원본 소스

`public/templates/*-landing/` 과 `*-basic/` 은 **빌드 산출물**입니다. 직접 고치지 마세요.
여기 있는 원본을 고치고 빌드해서 산출물을 덮어쓰는 흐름으로 작업합니다.

원본 백업은 `C:\Users\진수\Downloads\` 에 그대로 두었습니다.

## 빌드

각 프로젝트에서:

```bash
npm install          # 최초 1회 (node_modules 는 이 저장소에 포함하지 않음)
npm run build:both   # dist-landing 과 dist-basic 을 함께 만든다
```

`build:both` = `build:landing` + `build:basic` 입니다.
랜딩형과 기본형은 **같은 소스에서 모드로 갈립니다** — `src/variant.ts` 의
`MOTION = import.meta.env.MODE !== 'basic'` 이 스크롤 등장·카운트업·탭 페이드를 끄고
`<html data-motion="off">` 를 붙여 CSS 전환까지 차단합니다.
그래서 히어로를 한 번 고치면 랜딩형·기본형 두 산출물에 함께 반영됩니다.

산출물 복사:

```
dist-landing/*  ->  public/templates/<업종>-landing/
dist-basic/*    ->  public/templates/<업종>-basic/
```

## 매핑

| 원본 프로젝트 | 업종 | 산출물 |
|---|---|---|
| `seum-academy` | 학원 | `academy-landing` · `academy-basic` |
| `auto-motorworks` | 자동차정비 | `auto-landing` · `auto-basic` |
| `beauty-muud` | 미용실 | `beauty-landing` · `beauty-basic` |
| `care-sonamu` | 요양 | `care-landing` · `care-basic` |
| `Premium Clinic Landing Page` | 병원 | `clinic-landing` · `clinic-basic` |
| `corp-brand` | 기업 | `corporate-landing` · `corporate-basic` |
| `craft-sonkkeut` | 공방 | `craft-landing` · `craft-basic` |
| `dental-onbit` | 치과 | `dental-landing` · `dental-basic` |
| `fit-coreleaf` | 헬스 | `fitness-landing` · `fitness-basic` |
| `flower-owol` | 꽃집 | `flower-landing` · `flower-basic` |
| `golf-ongreen` | 스크린골프 | `golf-landing` · `golf-basic` |
| `interior-ondo` | 인테리어 | `interior-landing` · `interior-basic` |
| `kids-forest` | 어린이집 | `kids-landing` · `kids-basic` |
| `law-haewon` | 법률 | `law-landing` · `law-basic` |
| `moving-clean` | 이사청소 | `moving-landing` · `moving-basic` |
| `photo-girok` | 사진관 | `photo-landing` · `photo-basic` |
| `realestate-jangbu` | 부동산 | `realestate-landing` · `realestate-basic` |
| `rentcar-route` | 렌트카 | `rentcar-landing` · `rentcar-basic` |
| `resto-bistro` | 음식점 | `restaurant-landing` · `restaurant-basic` |
| `stay-yeobaek` | 펜션 | `stay-landing` · `stay-basic` |
| `study-molip` | 스터디카페 | `study-landing` · `study-basic` |
| `tax-jeongdo` | 세무 | `tax-landing` · `tax-basic` |
| `vet-gyeote` | 동물병원 | `vet-landing` · `vet-basic` |

## 소스 구조

```
src/
  App.tsx      전 섹션이 한 파일에 (Hero 는 별도 function)
  index.css
  main.tsx
  variant.ts   landing / basic 분기
  images/      히어로 · 갤러리 원본 이미지
```

## 주의

- 빌드 산출물(`public/templates/*-landing`, `*-basic`)을 직접 수정하지 마세요.
  다시 빌드하면 전부 덮어써집니다.
- `node_modules` 는 저장소에 포함하지 않습니다. 각 프로젝트에서 `npm install` 하세요.
- 정적 템플릿 97종(`<업종>-b` ~ `-e`)은 이 구조와 무관합니다. 그쪽은 단일 `index.html` 입니다.
