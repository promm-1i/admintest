/**
 * 프리미엄 디자인 상세를 "사례 소개"형으로 보여줄 때 쓰는 내용.
 * 화면 이미지는 public/cases/<템플릿 폴더>/ 에 템플릿 실물을 캡처해 둔다.
 * 본문에 적는 기능은 템플릿에 실제로 있는 것만 적는다 (동작하지 않는 버튼은 동작한다고 쓰지 않는다).
 */
export type CaseStudy = {
  /** 고객 관점 문구 개편을 마친 데이터는 공통 변환을 건너뛴다 */
  customerCopyReady?: boolean;
  /** 템플릿 속 브랜드 이름 (가상 브랜드) */
  brand: string;
  headline: string;
  summary: string;
  /** 템플릿 대표색 — 목업 띠·번호 원·체크 표시에만 쓴다 */
  brandColor: string;
  /** 모바일 판 배경. 어두운 템플릿이면 짙은 색을 주고 mobileDark 를 켠다 */
  tintColor: string;
  mobileDark?: boolean;
  /** 문단은 빈 줄(\n\n)로 나눈다 */
  overview: string;
  meta: { label: string; value: string }[];
  mainShot: string;
  /** 여러 페이지 디자인 — 페이지별 안내 카드 */
  pagesLabel?: string;
  pagesTitle?: string;
  pages?: { name: string; file: string; img: string; desc: string; items: string[] }[];
  /** 한 페이지 디자인 — 위에서부터 이어지는 섹션 흐름 */
  flowLabel?: string;
  flowTitle?: string;
  flow?: { name: string; desc: string }[];
  points: { title: string; body: string; items?: string[]; img: string; caption: string }[];
  detailsLabel?: string;
  detailsTitle?: string;
  details: { title: string; body: string }[];
  mobile: { title: string; body: string; shots: { img: string; caption: string }[] };
  faq: { q: string; a: string }[];
};
