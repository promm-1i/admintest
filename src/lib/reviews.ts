export type Review = {
  id: string;
  quote: string;
  author: string;
  project: string;
};

/**
 * 실제 고객 후기만 등록한다 (허위 후기 금지 — 신뢰를 파는 업종이라 역효과가 큼).
 * 새 후기가 들어오면 이 배열 맨 위에 추가한다.
 */
export const REVIEWS: Review[] = [];
