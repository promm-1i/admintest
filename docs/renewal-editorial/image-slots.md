# `/renewal-editorial` 이미지 교체 슬롯

현재 아래 슬롯은 모두 `/public/renewal-editorial/image-placeholder.svg`를 표시한다. 생성 이미지나 실제 화면 캡처가 준비되면 `src/pages/RenewalEditorial.tsx` 상단의 `MEDIA_SLOTS`에서 슬롯별 경로만 교체한다.

| 슬롯 | 용도 | 권장 최종 파일 |
|---|---|---|
| `hero` | 첫 화면 전체 배경 | `/renewal-editorial/media/hero.webp` |
| `intro` | 첫번째 화면의 문서·화면 이미지 | `/renewal-editorial/media/intro.webp` |
| `stories[0..2]` | 첫번째 화면의 스토리 카드 3장 | `/renewal-editorial/media/story-01.webp` ~ `story-03.webp` |
| `now` | sticky 확대 배경 | `/renewal-editorial/media/now.webp` |
| `values[0..2]` | 세로 카드 3장 | `/renewal-editorial/media/value-01.webp` ~ `value-03.webp` |
| `tomorrow[0..2]` | 다음 화면 카드 3장 | `/renewal-editorial/media/tomorrow-01.webp` ~ `tomorrow-03.webp` |
| `subpage` | 제작·기술력·문의 서브페이지 대표 이미지 | `/renewal-editorial/media/subpage.webp` |

템플릿 목록, 포트폴리오 목록과 포트폴리오 상세에 표시되는 실제 상품 미리보기 이미지는 임시 슬롯으로 바꾸지 않았다.
