// 첫 눈성형 — 머리 · 접근 · 고민 고르기
import { subVisual, approach, pick } from "../parts.mjs";

export default {
  path: "first.html",
  noConsult: true, // 레퍼런스 sub_1·sub_2 는 상담 띠 없이 평평한 푸터
  title: "첫 눈성형 | 여울성형외과",
  desc: "쌍꺼풀, 눈매교정, 트임처럼 처음 받는 눈 수술을 안내합니다. 고민에 맞는 안내를 골라 보세요.",
  body: () => `
${subVisual({ en: "First Eye Surgery", title: "처음 받는<br>눈 수술", desc: "쌍꺼풀, 눈매교정, 트임처럼 처음 받는 눈 수술입니다.<br>눈꺼풀 두께와 눈뜨는 힘을 확인한 뒤<br class=\"mo-br\"> 방법을 정합니다.", photo: "sub-first.jpg", alt: "눈을 감은 옆얼굴 사진" })}
${approach({ en: "Our Approach", title: "상담에서는<br>불편한 점과 원하는 모양을<br class=\"pc-br\"> 먼저 여쭙니다.", texts: ["사진을 보며 원하시는 라인 높이와 모양,<br>지금 불편한 점을 여쭙고<br>눈꺼풀 두께와 눈뜨는 힘을 확인합니다.", "그다음 어떤 수술이 맞는지 설명드립니다.<br>필요하지 않은 수술은 권하지 않습니다."], photo: "approach-first.jpg", alt: "정면을 바라보는 얼굴 사진" })}
${pick("first", { title: "어떤 눈매를 원하시나요?", desc: "가까운 고민을 고르면 관련 수술을 안내해 드립니다." })}`,
};
