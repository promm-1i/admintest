// 눈 재수술 — 머리 · 이해 · 고민 고르기
import { subVisual, approach, pick } from "../parts.mjs";

export default {
  path: "revision.html",
  noConsult: true, // 레퍼런스 sub_1·sub_2 는 상담 띠 없이 평평한 푸터
  title: "눈 재수술 | 여울성형외과",
  desc: "쌍꺼풀 풀림, 비대칭, 높은 라인처럼 이전 눈 수술 후의 불편을 원인부터 확인하는 눈 재수술을 안내합니다.",
  body: () => `
${subVisual({ en: "Revision Surgery", title: "이전 수술 후<br>다시 받는 수술", desc: "이전 수술 기록과 흉터, 남은 조직을 먼저 확인합니다.<br>고칠 수 있는 부분과<br class=\"mo-br\"> 어려운 부분, 가능한 범위를<br class=\"mo-br\"> 먼저 설명드립니다.", photo: "sub-revision.jpg", alt: "눈매를 가까이 담은 사진" })}
${approach({ en: "Before Surgery", title: "재수술 상담에서<br>먼저 확인하는<br>것들", texts: ["이전에 어떤 방법으로 수술했는지,<br>수술한 지 얼마나 지났는지.", "흉터와 유착, 남은 피부의 양도 확인합니다.<br>재수술이 가능한 시기인지<br class=\"pc-br\"> 함께 판단합니다."], photo: "approach-revision.jpg", alt: "창가 빛을 받은 얼굴 사진" })}
${pick("revision", { title: "어떤 점이 아쉬우신가요?", desc: "고민을 고르면 관련 재수술을 안내해 드립니다." })}`,
};
